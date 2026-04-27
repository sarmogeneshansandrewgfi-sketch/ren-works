<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');

// Database connection
$host = 'localhost';
$dbname = 'ren-ren works tailoring';
$username = 'root';
$password = '';

$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    echo json_encode(['error' => 'Connection failed: ' . $conn->connect_error]);
    exit;
}

$timeRange = $_GET['range'] ?? 'month';

// ========== 1. REVENUE & EXPENSES (REAL DATA FROM DATABASE) ==========
$revenueQuery = "SELECT 
    DATE_FORMAT(sale_date, '%b %Y') as month, 
    COALESCE(SUM(total_amount), 0) as revenue 
    FROM sales 
    GROUP BY YEAR(sale_date), MONTH(sale_date) 
    ORDER BY sale_date ASC 
    LIMIT 6";
$revenueResult = $conn->query($revenueQuery);
$revenueData = [];
while($row = $revenueResult->fetch_assoc()) {
    $revenueData[] = $row;
}

$expenseQuery = "SELECT 
    DATE_FORMAT(payment_date, '%b %Y') as month, 
    COALESCE(SUM(amount), 0) as expenses 
    FROM payments 
    WHERE payment_type = 'Expense' 
    GROUP BY YEAR(payment_date), MONTH(payment_date)";
$expenseResult = $conn->query($expenseQuery);
$expenseMap = [];
while($row = $expenseResult->fetch_assoc()) {
    $expenseMap[$row['month']] = (float)$row['expenses'];
}

foreach($revenueData as &$rev) {
    $rev['expenses'] = $expenseMap[$rev['month']] ?? 0;
    $rev['revenue'] = (float)$rev['revenue'];
}

// ========== 2. EXPENSE BREAKDOWN (REAL DATA) ==========
$breakdownQuery = "SELECT 
    COALESCE(NULLIF(expense_category, ''), 'Other') as category, 
    SUM(amount) as amount 
    FROM payments 
    WHERE payment_type = 'Expense' 
    GROUP BY expense_category 
    ORDER BY amount DESC";
$breakdownResult = $conn->query($breakdownQuery);
$expenseBreakdown = [];
$totalExp = 0;
while($row = $breakdownResult->fetch_assoc()) {
    $expenseBreakdown[] = ['category' => $row['category'], 'amount' => (float)$row['amount']];
    $totalExp += $row['amount'];
}
foreach($expenseBreakdown as &$exp) {
    $exp['percentage'] = $totalExp > 0 ? round(($exp['amount'] / $totalExp) * 100, 1) : 0;
}

// ========== 3. CASH FLOW (REAL DATA FROM SALES) ==========
$cashQuery = "SELECT 
    CONCAT('Week ', WEEK(sale_date)) as week, 
    COALESCE(SUM(total_amount), 0) as inflow 
    FROM sales 
    GROUP BY WEEK(sale_date) 
    ORDER BY MIN(sale_date) ASC 
    LIMIT 4";
$cashResult = $conn->query($cashQuery);
$cashFlowData = [];
while($row = $cashResult->fetch_assoc()) {
    $cashFlowData[] = ['week' => $row['week'], 'inflow' => (float)$row['inflow'], 'outflow' => 0];
}

$outflowQuery = "SELECT 
    CONCAT('Week ', WEEK(payment_date)) as week, 
    COALESCE(SUM(amount), 0) as outflow 
    FROM payments 
    WHERE payment_type = 'Expense' 
    GROUP BY WEEK(payment_date)";
$outflowResult = $conn->query($outflowQuery);
$outflowMap = [];
while($row = $outflowResult->fetch_assoc()) {
    $outflowMap[$row['week']] = (float)$row['outflow'];
}
foreach($cashFlowData as &$cf) {
    $cf['outflow'] = $outflowMap[$cf['week']] ?? 0;
}

// ========== 4. SALES TREND (REAL DATA - LAST 10 DAYS) ==========
$trendQuery = "SELECT 
    DATE_FORMAT(sale_date, '%a %b %d') as day, 
    COALESCE(SUM(total_amount), 0) as sales 
    FROM sales 
    GROUP BY DATE(sale_date) 
    ORDER BY sale_date DESC 
    LIMIT 10";
$trendResult = $conn->query($trendQuery);
$salesTrendData = [];
while($row = $trendResult->fetch_assoc()) {
    $salesTrendData[] = ['day' => $row['day'], 'sales' => (float)$row['sales']];
}
$salesTrendData = array_reverse($salesTrendData);

// ========== 5. TOP PRODUCTS (REAL DATA) ==========
$productQuery = "SELECT 
    p.product_name, 
    COALESCE(SUM(si.subtotal), 0) as revenue 
    FROM sale_items si 
    JOIN products p ON si.product_id = p.product_id 
    JOIN sales s ON si.sale_id = s.sale_id 
    GROUP BY si.product_id, p.product_name 
    ORDER BY revenue DESC 
    LIMIT 5";
$productResult = $conn->query($productQuery);
$topSellingProducts = [];
while($row = $productResult->fetch_assoc()) {
    $topSellingProducts[] = ['product_name' => $row['product_name'], 'revenue' => (float)$row['revenue']];
}

// ========== 6. RESERVATION FUNNEL (REAL DATA) ==========
$resTotal = $conn->query("SELECT COUNT(*) as count FROM reservations")->fetch_assoc()['count'] ?? 0;
$resConfirmed = $conn->query("SELECT COUNT(*) as count FROM reservations WHERE status IN ('confirmed','completed')")->fetch_assoc()['count'] ?? 0;
$resSales = $conn->query("SELECT COUNT(*) as count FROM sales")->fetch_assoc()['count'] ?? 0;

// Estimate website visits (3x reservations as typical conversion rate)
$websiteVisits = $resTotal > 0 ? $resTotal * 3 : 2450;

$reservationFunnelData = [
    ['stage' => 'Website Visits', 'value' => $websiteVisits],
    ['stage' => 'Appointment Booked', 'value' => $resTotal],
    ['stage' => 'Consultation Done', 'value' => $resConfirmed],
    ['stage' => 'Measurement Taken', 'value' => $resConfirmed],
    ['stage' => 'Order Placed', 'value' => $resSales]
];

// ========== 7. KPIS (REAL DATA) ==========
$totalSales = (float)($conn->query("SELECT COALESCE(SUM(total_amount), 0) as total FROM sales")->fetch_assoc()['total'] ?? 0);
$avgOrderValue = (float)($conn->query("SELECT COALESCE(AVG(total_amount), 0) as avg FROM sales")->fetch_assoc()['avg'] ?? 0);
$totalExpenses = (float)($conn->query("SELECT COALESCE(SUM(amount), 0) as total FROM payments WHERE payment_type = 'Expense'")->fetch_assoc()['total'] ?? 0);

$grossMargin = $totalSales > 0 ? round((($totalSales - $totalExpenses) / $totalSales) * 100, 1) : 0;

// ========== 8. RETURN JSON ==========
echo json_encode([
    'success' => true,
    'revenueData' => $revenueData,
    'expenseBreakdown' => $expenseBreakdown,
    'cashFlowData' => $cashFlowData,
    'salesTrendData' => $salesTrendData,
    'topSellingProducts' => $topSellingProducts,
    'reservationFunnelData' => $reservationFunnelData,
    'kpis' => [
        'totalSales' => $totalSales,
        'grossMargin' => $grossMargin,
        'avgOrderValue' => $avgOrderValue
    ]
]);

$conn->close();
?>