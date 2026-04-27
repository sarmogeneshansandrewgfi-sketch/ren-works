import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  Ruler, 
  Sparkles,
  ChevronRight,
  CheckCircle2,
  ArrowLeft,
  Shirt,
  ShoppingBag,
  Scissors
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';

interface ReservationData {
  clothingType: string;
  fabric: string;
  fullName: string;
  email: string;
  phone: string;
  appointmentDate: string;
  appointmentTime: string;
  specialRequests: string;
}

export const CustomClothingReservation: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [step, setStep] = useState(1);
  const [reservationData, setReservationData] = useState<ReservationData>({
    clothingType: '',
    fabric: '',
    fullName: '',
    email: '',
    phone: '',
    appointmentDate: '',
    appointmentTime: '',
    specialRequests: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const clothingTypes = [
    { id: 'suit', name: 'Custom Suit', icon: ShoppingBag, description: 'Full 3-piece or 2-piece suit', price: 'From $1,200' },
    { id: 'blazer', name: 'Custom Blazer', icon: Shirt, description: 'Tailored jacket', price: 'From $650' },
    { id: 'shirt', name: 'Custom Shirt', icon: Shirt, description: 'Dress or casual shirt', price: 'From $150' },
    { id: 'trousers', name: 'Custom Trousers', icon: Ruler, description: 'Tailored pants', price: 'From $250' },
    { id: 'dress', name: 'Custom Dress', icon: Sparkles, description: 'Formal or casual dress', price: 'From $450' },
    { id: 'other', name: 'Other Custom', icon: Scissors, description: 'Tell us what you need', price: 'Custom Quote' },
  ];

  const fabrics = [
    { id: 'wool', name: 'Premium Wool', description: 'Classic and versatile' },
    { id: 'silk', name: 'Italian Silk', description: 'Luxurious and elegant' },
    { id: 'cotton', name: 'Egyptian Cotton', description: 'Comfortable and breathable' },
    { id: 'linen', name: 'Pure Linen', description: 'Perfect for warm weather' },
    { id: 'cashmere', name: 'Cashmere Blend', description: 'Soft and premium' },
    { id: 'custom', name: 'Custom Fabric', description: 'Bring your own or consult' },
  ];

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
    '05:00 PM', '06:00 PM'
  ];

  const updateData = (field: keyof ReservationData, value: string) => {
    setReservationData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!reservationData.fullName || !reservationData.email || !reservationData.phone || 
        !reservationData.appointmentDate || !reservationData.appointmentTime) {
      toast.error('Please fill in all required fields');
      return;
    }
    setIsSubmitted(true);
    toast.success('Reservation confirmed!');
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-12 rounded-3xl shadow-xl text-center max-w-lg w-full border border-slate-100"
        >
          <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-amber-600" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Reservation Confirmed!</h2>
          <p className="text-slate-500 mb-6">
            Thank you for choosing Ren-Ren Works for your custom {clothingTypes.find(t => t.id === reservationData.clothingType)?.name || 'clothing'}.
          </p>
          
          <div className="bg-slate-50 rounded-2xl p-6 mb-8 text-left space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">Appointment Date:</span>
              <span className="font-bold text-slate-900">{new Date(reservationData.appointmentDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">Time:</span>
              <span className="font-bold text-slate-900">{reservationData.appointmentTime}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">Fabric:</span>
              <span className="font-bold text-slate-900">{fabrics.find(f => f.id === reservationData.fabric)?.name || 'To be discussed'}</span>
            </div>
          </div>

          <p className="text-sm text-slate-500 mb-8">
            A confirmation email has been sent to <span className="font-bold text-slate-700">{reservationData.email}</span>. 
            Our master tailors will prepare everything for your consultation.
          </p>

          <button 
            onClick={onBack}
            className="w-full py-4 bg-amber-500 text-slate-900 font-bold rounded-2xl hover:bg-amber-600 transition-colors"
          >
            Back to Shop
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 h-20 flex items-center justify-between">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Shop</span>
          </button>
          <div className="flex items-center gap-3">
            <div className="bg-amber-500 p-2 rounded-lg shadow-lg shadow-amber-200">
              <Scissors className="w-6 h-6 text-slate-900" />
            </div>
            <div>
              <h1 className="font-bold text-xl tracking-tight text-slate-900">Custom Reservation</h1>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Bespoke Tailoring</p>
            </div>
          </div>
          <div className="w-20" />
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-2">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center flex-1">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm transition-all ${
                  step >= s ? 'bg-amber-500 text-slate-900' : 'bg-slate-100 text-slate-400'
                }`}>
                  {s}
                </div>
                {s < 3 && (
                  <div className={`flex-1 h-1 mx-2 rounded-full transition-all ${
                    step > s ? 'bg-amber-500' : 'bg-slate-100'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs font-medium">
            <span className={step >= 1 ? 'text-slate-900' : 'text-slate-400'}>Select Type</span>
            <span className={step >= 2 ? 'text-slate-900' : 'text-slate-400'}>Contact Info</span>
            <span className={step >= 3 ? 'text-slate-900' : 'text-slate-400'}>Schedule</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {/* Step 1: Select Clothing Type & Fabric */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">What would you like to create?</h2>
                <p className="text-slate-500">Choose the type of custom clothing you'd like our master tailors to craft for you.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {clothingTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => updateData('clothingType', type.id)}
                    className={`p-6 rounded-2xl border-2 transition-all text-left hover:border-amber-500 hover:shadow-lg ${
                      reservationData.clothingType === type.id
                        ? 'border-amber-500 bg-amber-50 shadow-lg'
                        : 'border-slate-100 bg-white'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl ${
                        reservationData.clothingType === type.id ? 'bg-amber-500 text-slate-900' : 'bg-slate-50 text-slate-600'
                      }`}>
                        <type.icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-slate-900 mb-1">{type.name}</h3>
                        <p className="text-sm text-slate-500 mb-2">{type.description}</p>
                        <p className="text-sm font-bold text-amber-600">{type.price}</p>
                      </div>
                      {reservationData.clothingType === type.id && (
                        <CheckCircle2 className="w-5 h-5 text-amber-600" />
                      )}
                    </div>
                  </button>
                ))}
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Select Your Fabric</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {fabrics.map((fabric) => (
                    <button
                      key={fabric.id}
                      onClick={() => updateData('fabric', fabric.id)}
                      className={`p-5 rounded-2xl border-2 transition-all text-left hover:border-amber-500 ${
                        reservationData.fabric === fabric.id
                          ? 'border-amber-500 bg-amber-50'
                          : 'border-slate-100 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-slate-900">{fabric.name}</h4>
                        {reservationData.fabric === fabric.id && (
                          <CheckCircle2 className="w-5 h-5 text-amber-600" />
                        )}
                      </div>
                      <p className="text-sm text-slate-500">{fabric.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  if (!reservationData.clothingType || !reservationData.fabric) {
                    toast.error('Please select both clothing type and fabric');
                    return;
                  }
                  setStep(2);
                }}
                className="w-full py-4 bg-slate-900 text-white font-bold rounded-2xl shadow-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
              >
                Continue to Contact Info
                <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}

          {/* Step 2: Contact Information */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Your Contact Information</h2>
                <p className="text-slate-500">We'll use this to confirm your appointment and send updates.</p>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                    <User className="w-4 h-4" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={reservationData.fullName}
                    onChange={(e) => updateData('fullName', e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full p-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                    <Mail className="w-4 h-4" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={reservationData.email}
                    onChange={(e) => updateData('email', e.target.value)}
                    placeholder="your.email@example.com"
                    className="w-full p-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                    <Phone className="w-4 h-4" />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={reservationData.phone}
                    onChange={(e) => updateData('phone', e.target.value)}
                    placeholder="+1 (555) 123-4567"
                    className="w-full p-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                    <Ruler className="w-4 h-4" />
                    Special Requests or Notes
                  </label>
                  <textarea
                    value={reservationData.specialRequests}
                    onChange={(e) => updateData('specialRequests', e.target.value)}
                    placeholder="Any specific design preferences, measurements you already know, or special requirements..."
                    rows={4}
                    className="w-full p-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 py-4 border-2 border-slate-200 text-slate-700 font-bold rounded-2xl hover:border-slate-300 transition-all"
                >
                  Back
                </button>
                <button
                  onClick={() => {
                    if (!reservationData.fullName || !reservationData.email || !reservationData.phone) {
                      toast.error('Please fill in all required fields');
                      return;
                    }
                    setStep(3);
                  }}
                  className="flex-1 py-4 bg-slate-900 text-white font-bold rounded-2xl shadow-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
                >
                  Continue to Schedule
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Schedule Appointment */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Schedule Your Consultation</h2>
                <p className="text-slate-500">Select a date and time for your measurement and design consultation.</p>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                    <Calendar className="w-4 h-4" />
                    Appointment Date *
                  </label>
                  <input
                    type="date"
                    value={reservationData.appointmentDate}
                    onChange={(e) => updateData('appointmentDate', e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full p-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-3">
                    <Clock className="w-4 h-4" />
                    Appointment Time *
                  </label>
                  <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => updateData('appointmentTime', time)}
                        className={`p-3 rounded-xl border-2 transition-all font-medium text-sm ${
                          reservationData.appointmentTime === time
                            ? 'border-amber-500 bg-amber-50 text-amber-600'
                            : 'border-slate-200 hover:border-amber-300'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Summary */}
                <div className="pt-6 border-t border-slate-100">
                  <h4 className="font-bold text-slate-900 mb-4">Reservation Summary</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Clothing Type:</span>
                      <span className="font-bold text-slate-900">
                        {clothingTypes.find(t => t.id === reservationData.clothingType)?.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Fabric:</span>
                      <span className="font-bold text-slate-900">
                        {fabrics.find(f => f.id === reservationData.fabric)?.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Name:</span>
                      <span className="font-bold text-slate-900">{reservationData.fullName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Email:</span>
                      <span className="font-bold text-slate-900">{reservationData.email}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 py-4 border-2 border-slate-200 text-slate-700 font-bold rounded-2xl hover:border-slate-300 transition-all"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 py-4 bg-amber-500 text-slate-900 font-bold rounded-2xl shadow-xl shadow-amber-200 hover:bg-amber-600 transition-all flex items-center justify-center gap-2"
                >
                  Confirm Reservation
                  <CheckCircle2 className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};
