import React from 'react';
import { Building, ParkingSquare, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

interface BuildingSelectorProps {
  selectedBuilding: string | null;
  onSelectBuilding: (building: string) => void;
}

const buildings = [
  {
    id: 'A',
    name: 'Edificio A',
    spots: 50,
    occupancy: '70%',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=500',
  },
  {
    id: 'Eble',
    name: 'Edificio Eble',
    spots: 75,
    occupancy: '45%',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=500',
  },
  {
    id: 'E',
    name: 'Edificio E',
    spots: 40,
    occupancy: '85%',
    image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=80&w=500',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  },
};

export const BuildingSelector: React.FC<BuildingSelectorProps> = ({
  selectedBuilding,
  onSelectBuilding,
}) => {
  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full max-w-6xl mx-auto px-4 sm:px-6"
    >
      {buildings.map((building) => (
        <motion.button
          key={building.id}
          variants={item}
          whileHover={{ y: -8, transition: { type: "spring", stiffness: 400 } }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelectBuilding(building.id)}
          className={twMerge(
            'relative overflow-hidden rounded-2xl group h-64 sm:h-80 w-full',
            'transition-all duration-300 ease-out',
            'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
          )}
        >
          <div className="absolute inset-0 w-full h-full">
            <img
              src={building.image}
              alt={building.name}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
          </div>

          <div className="absolute inset-0 p-6 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <h3 className="text-2xl font-bold text-white mb-2">{building.name}</h3>
              <Building className="w-6 h-6 text-white/80" />
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-white/90 bg-black/30 backdrop-blur-sm rounded-lg p-2">
                <ParkingSquare className="w-4 h-4" />
                <span className="text-sm">{building.spots} espacios totales</span>
              </div>
              
              <div className="flex items-center gap-2 text-white/90 bg-black/30 backdrop-blur-sm rounded-lg p-2">
                <Users className="w-4 h-4" />
                <span className="text-sm">Ocupación: {building.occupancy}</span>
              </div>
            </div>
          </div>

          <motion.div
            className="absolute bottom-0 left-0 w-full h-1 bg-blue-500"
            initial={{ scaleX: 0 }}
            whileHover={{ scaleX: 1 }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>
      ))}
    </motion.div>
  );
};