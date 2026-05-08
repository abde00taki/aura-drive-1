import { useState, useEffect } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Calendar, User, Phone, MapPin, ArrowLeft } from 'lucide-react';
import { cars } from '../data/cars';
import { generateWhatsAppLink, generateBookingMessage } from '../utils/whatsapp';

export default function BookingPage() {
  const { carId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    pickup: '',
    dropoff: ''
  });

  const car = cars.find(c => c.id === parseInt(carId));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!car) {
    return <Navigate to="/fleet" replace />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = generateBookingMessage(car, formData);
    const link = generateWhatsAppLink(message);
    window.location.href = link;
  };

  return (
    <>
      <Helmet>
        <title>Drive Car Go - {t('booking.step1')}</title>
      </Helmet>

      <div className="min-h-screen bg-dark dark:bg-[#121212] pt-32 pb-24 transition-colors duration-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-500 hover:text-primary transition-colors mb-8 group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0 group-hover:-translate-x-1 rtl:group-hover:translate-x-1 transition-transform" />
            <span className="uppercase tracking-wider font-semibold text-sm">{t('booking.back')}</span>
          </button>

          <div className="flex flex-col lg:flex-row gap-12">
            {/* Left Column: Car Details */}
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="bg-white dark:bg-[#242424] rounded-2xl p-6 md:p-8 shadow-xl border border-black/5 dark:border-white/5 animate-fade-in-up transition-colors duration-300">
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-8 group">
                  <img 
                    src={car.image} 
                    alt={car.model} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 rtl:right-4 rtl:left-auto bg-black/80 backdrop-blur-sm text-white px-4 py-2 text-sm uppercase tracking-wider font-bold shadow-lg rounded">
                    {car.year}
                  </div>
                </div>

                <div className="mb-8">
                  <p className="text-gray-500 dark:text-gray-400 text-lg mb-1">{car.brand}</p>
                  <h1 className="text-4xl font-heading font-bold text-gray-900 dark:text-white uppercase tracking-wide transition-colors duration-300">
                    {car.model}
                  </h1>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-gray-50 dark:bg-[#1a1a1a] p-4 rounded-lg border border-black/5 dark:border-white/5 transition-colors duration-300">
                    <span className="block text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider mb-1">Type</span>
                    <span className="font-semibold text-gray-900 dark:text-white capitalize transition-colors duration-300">{car.category}</span>
                  </div>
                  <div className="bg-gray-50 dark:bg-[#1a1a1a] p-4 rounded-lg border border-black/5 dark:border-white/5 transition-colors duration-300">
                    <span className="block text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider mb-1">Fuel</span>
                    <span className="font-semibold text-gray-900 dark:text-white transition-colors duration-300">{t(`fleet.fuel.${car.fuel}`)}</span>
                  </div>
                </div>

                {/* Pricing Table */}
                <div className="border-t border-black/5 dark:border-white/5 pt-8 transition-colors duration-300">
                  <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">Pricing</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-primary/5 dark:bg-primary/10 rounded-xl border border-primary/20 transition-colors duration-300">
                      <span className="text-gray-700 dark:text-gray-300 font-medium">{t('fleet.pricePerDay')}</span>
                      <span className="text-xl font-bold text-primary">{car.pricePerDay.toLocaleString('en-US')} MAD</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-white dark:bg-[#1a1a1a] rounded-xl border border-black/10 dark:border-white/10 transition-colors duration-300">
                      <span className="text-gray-700 dark:text-gray-300 font-medium">{t('fleet.pricePerWeek')}</span>
                      <span className="text-xl font-bold text-gray-900 dark:text-white transition-colors duration-300">{car.pricePerWeek.toLocaleString('en-US')} MAD</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-white dark:bg-[#1a1a1a] rounded-xl border border-black/10 dark:border-white/10 transition-colors duration-300">
                      <span className="text-gray-700 dark:text-gray-300 font-medium">{t('fleet.pricePerMonth')}</span>
                      <span className="text-xl font-bold text-gray-900 dark:text-white transition-colors duration-300">{car.pricePerMonth.toLocaleString('en-US')} MAD</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Booking Form */}
            <div className="w-full lg:w-1/2">
              <div className="bg-white dark:bg-[#242424] rounded-2xl p-6 md:p-8 shadow-xl border border-black/5 dark:border-white/5 sticky top-32 animate-fade-in-up transition-colors duration-300" style={{ animationDelay: '0.1s' }}>
                <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-300">{t('booking.step2')}</h2>
                <div className="w-16 h-1 bg-primary mb-8"></div>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="relative">
                    <User className="absolute top-3 left-3 rtl:right-3 rtl:left-auto w-5 h-5 text-gray-500 dark:text-gray-400" />
                    <input 
                      type="text" 
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t('booking.form.name')}
                      className="w-full bg-gray-50 dark:bg-[#1a1a1a] border border-black/10 dark:border-white/10 text-gray-900 dark:text-white pl-11 rtl:pr-11 rtl:pl-3 pr-3 py-3 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300"
                    />
                  </div>
                  
                  <div className="relative">
                    <Phone className="absolute top-3 left-3 rtl:right-3 rtl:left-auto w-5 h-5 text-gray-500 dark:text-gray-400" />
                    <input 
                      type="tel" 
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder={t('booking.form.phone')}
                      className="w-full bg-gray-50 dark:bg-[#1a1a1a] border border-black/10 dark:border-white/10 text-gray-900 dark:text-white pl-11 rtl:pr-11 rtl:pl-3 pr-3 py-3 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300"
                    />
                  </div>

                  <div className="relative">
                    <MapPin className="absolute top-3 left-3 rtl:right-3 rtl:left-auto w-5 h-5 text-gray-500 dark:text-gray-400" />
                    <input 
                      type="text" 
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleChange}
                      placeholder={t('booking.form.address')}
                      className="w-full bg-gray-50 dark:bg-[#1a1a1a] border border-black/10 dark:border-white/10 text-gray-900 dark:text-white pl-11 rtl:pr-11 rtl:pl-3 pr-3 py-3 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider pl-1">{t('booking.form.pickup')}</label>
                      <div className="relative">
                        <Calendar className="absolute top-3 left-3 rtl:right-3 rtl:left-auto w-5 h-5 text-gray-500 dark:text-gray-400" />
                        <input 
                          type="datetime-local" 
                          name="pickup"
                          required
                          value={formData.pickup}
                          onChange={handleChange}
                          className="w-full bg-gray-50 dark:bg-[#1a1a1a] border border-black/10 dark:border-white/10 text-gray-900 dark:text-white pl-11 rtl:pr-11 rtl:pl-3 pr-3 py-3 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300 [color-scheme:light] dark:[color-scheme:dark]"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider pl-1">{t('booking.form.dropoff')}</label>
                      <div className="relative">
                        <Calendar className="absolute top-3 left-3 rtl:right-3 rtl:left-auto w-5 h-5 text-gray-500 dark:text-gray-400" />
                        <input 
                          type="datetime-local" 
                          name="dropoff"
                          required
                          value={formData.dropoff}
                          onChange={handleChange}
                          className="w-full bg-gray-50 dark:bg-[#1a1a1a] border border-black/10 dark:border-white/10 text-gray-900 dark:text-white pl-11 rtl:pr-11 rtl:pl-3 pr-3 py-3 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300 [color-scheme:light] dark:[color-scheme:dark]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-6">
                    <button 
                      type="submit"
                      className="w-full py-4 bg-[#25D366] text-white font-bold tracking-widest uppercase rounded-lg shadow-lg hover:bg-[#20b858] hover:shadow-[#25D366]/30 transition-all flex items-center justify-center space-x-2"
                    >
                      <span>{t('booking.confirm')}</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
