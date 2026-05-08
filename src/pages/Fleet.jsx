import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import CarCard from '../components/CarCard';
import { cars } from '../data/cars';
import clsx from 'clsx';

export default function Fleet() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState('all');

  const categories = ['all', 'economic', 'suv', 'luxury', 'minibus'];

  const filteredCars = filter === 'all' 
    ? cars 
    : cars.filter(c => c.category === filter);

  return (
    <>
      <Helmet>
        <title>Drive Car Go - {t('nav.fleet')}</title>
        <meta name="description" content={t('fleet.subtitle')} />
      </Helmet>

      <div className="pt-32 pb-16 bg-dark dark:bg-[#121212] transition-colors duration-300 min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
              {t('fleet.title')}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 font-light transition-colors duration-300">
              {t('fleet.subtitle')}
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={clsx(
                  'px-6 py-2 rounded-full uppercase tracking-wider text-xs font-semibold transition-all duration-300 border',
                  filter === cat 
                    ? 'bg-primary border-primary text-white shadow-md' 
                    : 'bg-white dark:bg-[#242424] border-black/10 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1a1a1a]'
                )}
              >
                {t(`fleet.filters.${cat}`)}
              </button>
            ))}
          </div>

          {/* Fleet Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCars.map(car => (
              <CarCard 
                key={car.id} 
                car={car} 
              />
            ))}
          </div>
          
          {filteredCars.length === 0 && (
            <div className="text-center py-20 text-gray-500">
              No cars found in this category.
            </div>
          )}
        </div>
      </div>

    </>
  );
}
