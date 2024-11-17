import React from 'react';
import { Car, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import type { ParkingSpot } from '../types';
import { twMerge } from 'tailwind-merge';

interface ParkingMapProps {
  building: string;
  spots: ParkingSpot[];
  onSelectSpot: (spot: ParkingSpot) => void;
}

export const ParkingMap: React.FC<ParkingMapProps> = ({
  building,
  spots,
  onSelectSpot,
}) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 px-4 sm:px-6">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
          Espacios en {building}
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
          Selecciona un espacio disponible para realizar tu reserva
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-2xl shadow-xl p-4 sm:p-8"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-blue-500" />
              <span className="text-sm text-gray-600">Disponible</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-gray-300" />
              <span className="text-sm text-gray-600">Ocupado</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-yellow-600 bg-yellow-50 px-4 py-2 rounded-lg w-full sm:w-auto">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm font-medium">
              {spots.filter(s => s.isAvailable).length} espacios disponibles
            </span>
          </div>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-9 gap-2 sm:gap-4"
        >
          {spots.map((spot) => (
            <motion.button
              key={spot.id}
              variants={item}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => spot.isAvailable && onSelectSpot(spot)}
              disabled={!spot.isAvailable}
              className={twMerge(
                'aspect-square rounded-xl p-2 sm:p-4',
                'flex flex-col items-center justify-center',
                'transition-all duration-300 ease-in-out',
                spot.isAvailable
                  ? 'bg-blue-50 hover:bg-blue-100 cursor-pointer'
                  : 'bg-gray-100 cursor-not-allowed opacity-75'
              )}
            >
              <Car
                className={twMerge(
                  'w-6 h-6 sm:w-8 sm:h-8 mb-1 sm:mb-2',
                  spot.isAvailable ? 'text-blue-600' : 'text-gray-400'
                )}
              />
              <span
                className={twMerge(
                  'text-xs sm:text-sm font-medium',
                  spot.isAvailable ? 'text-blue-900' : 'text-gray-500'
                )}
              >
                {spot.number}
              </span>
            </motion.button>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};