import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Contact() {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>Drive Car Go - {t('nav.contact')}</title>
      </Helmet>

      <div className="pt-32 pb-24 bg-dark dark:bg-[#121212] transition-colors duration-300 min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 dark:text-white transition-colors duration-300 mb-4">
              Get in Touch
            </h1>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">

            {/* Contact Info */}
            <div className="space-y-8">
              <h2 className="text-2xl font-heading text-gray-900 dark:text-white transition-colors duration-300 mb-6">Contact Information</h2>

              <div className="flex items-start space-x-4 rtl:space-x-reverse">
                <div className="bg-primary/10 p-3 rounded-full text-primary">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-gray-900 dark:text-white transition-colors duration-300 font-semibold mb-1">Our Location</h3>
                  <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300 text-sm">Aéroport Mohammed V, Casablanca, Morocco</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 rtl:space-x-reverse">
                <div className="bg-primary/10 p-3 rounded-full text-primary">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-gray-900 dark:text-white transition-colors duration-300 font-semibold mb-1">Phone Number</h3>
                  <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300 text-sm">+212 777 543 264</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 rtl:space-x-reverse">
                <div className="bg-primary/10 p-3 rounded-full text-primary">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-gray-900 dark:text-white transition-colors duration-300 font-semibold mb-1">Email Address</h3>
                  <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300 text-sm">contact@drivecargo.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 rtl:space-x-reverse">
                <div className="bg-primary/10 p-3 rounded-full text-primary">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-gray-900 dark:text-white transition-colors duration-300 font-semibold mb-1">Working Hours</h3>
                  <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300 text-sm">24/7 Support Available</p>
                </div>
              </div>
            </div>

            {/* Direct Message (Mocked) */}
            <div className="bg-white dark:bg-[#242424] p-8 border border-black/5 dark:border-white/5 shadow-xl shadow-black/5 transition-colors duration-300 relative rounded-2xl">
              <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 blur-3xl rounded-full"></div>

              <h2 className="text-2xl font-heading text-gray-900 dark:text-white transition-colors duration-300 mb-6 relative z-10">Send a Message</h2>
              <form className="space-y-4 relative z-10" onSubmit={(e) => { e.preventDefault(); alert("Thanks! We will contact you soon."); }}>
                <div>
                  <input type="text" placeholder="Your Name" required className="w-full bg-gray-50 dark:bg-[#1a1a1a] border border-black/10 dark:border-white/10 px-4 py-3 text-gray-900 dark:text-white dark:placeholder-gray-500 focus:outline-none focus:border-primary transition-colors duration-300" />
                </div>
                <div>
                  <input type="email" placeholder="Your Email" required className="w-full bg-gray-50 dark:bg-[#1a1a1a] border border-black/10 dark:border-white/10 px-4 py-3 text-gray-900 dark:text-white dark:placeholder-gray-500 focus:outline-none focus:border-primary transition-colors duration-300" />
                </div>
                <div>
                  <textarea placeholder="Your Message" rows="4" required className="w-full bg-gray-50 dark:bg-[#1a1a1a] border border-black/10 dark:border-white/10 px-4 py-3 text-gray-900 dark:text-white dark:placeholder-gray-500 focus:outline-none focus:border-primary transition-colors duration-300"></textarea>
                </div>
                <button type="submit" className="w-full bg-primary text-white font-semibold uppercase tracking-wider py-3 hover:bg-primary-hover hover:text-black transition-colors rounded-sm">
                  Send Message
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
