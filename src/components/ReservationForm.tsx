import React, { useState } from 'react';
import { Clock, DollarSign, Calendar, CreditCard, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import type { ParkingSpot } from '../types';
import toast from 'react-hot-toast';
import { twMerge } from 'tailwind-merge';

interface ReservationFormProps {
  spot: ParkingSpot;
  onSubmit: (data: { startTime: Date; endTime: Date }) => void;
  onCancel: () => void;
}

export const ReservationForm: React.FC<ReservationFormProps> = ({
  spot,
  onSubmit,
  onCancel,
}) => {
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('¡Reserva confirmada! Recibirás un correo con los detalles.', {
      duration: 4000,
      position: 'top-center',
      className: 'bg-blue-500 text-white',
    });
    onSubmit({
      startTime: new Date(startTime),
      endTime: new Date(endTime),
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
      className="max-w-2xl mx-auto px-4 sm:px-6"
    >
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <motion.div 
          initial={{ backgroundColor: "#2563eb", y: -20 }}
          animate={{ backgroundColor: "#1d4ed8", y: 0 }}
          className="bg-blue-600 text-white p-6"
        >
          <motion.h3 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl sm:text-2xl font-bold"
          >
            Reservar Espacio {spot.number}
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-blue-100 mt-2 text-sm sm:text-base"
          >
            Completa los detalles de tu reserva
          </motion.p>
        </motion.div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-2"
            >
              <label className="block text-sm font-medium text-gray-700">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span>Hora de inicio</span>
                </div>
                <input
                  type="datetime-local"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                  required
                />
              </label>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-2"
            >
              <label className="block text-sm font-medium text-gray-700">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span>Hora de finalización</span>
                </div>
                <input
                  type="datetime-local"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                  required
                />
              </label>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-blue-50 p-4 sm:p-6 rounded-xl space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-sm sm:text-base">Costo de reserva</span>
              </div>
              <span className="text-xl sm:text-2xl font-bold text-blue-600">$0.50</span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-blue-600">
              <CreditCard className="w-4 h-4" />
              <span>Pago seguro con tarjeta de crédito/débito</span>
            </div>
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={onCancel}
              className="w-full sm:w-1/2 px-6 py-3 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Cancelar
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full sm:w-1/2 px-6 py-3 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors flex items-center justify-center gap-2"
            >
              <span>Confirmar Reserva</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};