import React, { useState } from 'react';
import { BuildingSelector } from './components/BuildingSelector';
import { ParkingMap } from './components/ParkingMap';
import { ReservationForm } from './components/ReservationForm';
import { Header } from './components/Header';
import { motion, AnimatePresence } from 'framer-motion';
import type { ParkingSpot } from './types';
import { Toaster } from 'react-hot-toast';

const mockSpots: ParkingSpot[] = Array.from({ length: 50 }, (_, i) => ({
  id: `spot-${i + 1}`,
  building: 'A',
  number: `A${i + 1}`,
  isAvailable: Math.random() > 0.3,
}));

function App() {
  const [selectedBuilding, setSelectedBuilding] = useState<string | null>(null);
  const [selectedSpot, setSelectedSpot] = useState<ParkingSpot | null>(null);

  const handleReservation = (data: { startTime: Date; endTime: Date }) => {
    console.log('Reservation data:', { spot: selectedSpot, ...data });
    setSelectedSpot(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Toaster position="top-right" />
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {!selectedBuilding ? (
            <motion.div
              key="building-selector"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <section className="space-y-6">
                <div className="text-center max-w-2xl mx-auto mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Encuentra tu espacio de parqueo
                  </h2>
                  <p className="text-gray-600">
                    Selecciona el edificio donde deseas estacionarte para ver la disponibilidad en tiempo real
                  </p>
                </div>
                <BuildingSelector
                  selectedBuilding={selectedBuilding}
                  onSelectBuilding={setSelectedBuilding}
                />
              </section>
            </motion.div>
          ) : !selectedSpot ? (
            <motion.div
              key="parking-map"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <button
                onClick={() => setSelectedBuilding(null)}
                className="mb-6 text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2"
              >
                ← Volver a edificios
              </button>
              <ParkingMap
                building={selectedBuilding}
                spots={mockSpots}
                onSelectSpot={setSelectedSpot}
              />
            </motion.div>
          ) : (
            <motion.div
              key="reservation-form"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <ReservationForm
                spot={selectedSpot}
                onSubmit={handleReservation}
                onCancel={() => setSelectedSpot(null)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;