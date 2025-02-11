export function HeroSection() {
    return (
      <div className='min-h-[200px] sm:min-h-[250px] md:min-h-[300px] w-full rounded-md flex flex-col justify-center items-center 
      relative overflow-hidden mx-auto py-6 sm:py-8 md:py-10 bg-cover bg-center bg-no-repeat' 
      style={{
        backgroundImage: "url('/images/adopt.jpg')",
      }}>
            
            <div className='p-4 relative z-10 w-full text-center'>
                
                <h1
                    className="mt-20 md:mt-0 text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">Adopt  Now</h1>
                <p
                    className="mt-4 font-normal text-base md:text-lg text-white max-w-lg mx-auto">Home Shop </p>
                
            </div>
        </div>
    )
}
const testimonials = [
    {
      quote:
        "A fast-growing deciduous tree that adds vibrant color to landscapes, especially in the autumn season.",
      name: "Maple Tree",
      description: "Known for its distinct leaves and the production of maple syrup.",
      src: "/images/card1.jpg",
    },
    {
      quote:
        "A tall evergreen tree commonly used for timber and a popular choice for Christmas trees.",
      name: "Douglas Fir",
      description: "Native to North America, it adds a fresh, woodsy scent to forests.",
      src: "/images/card2.jpg",
    },
    {
      quote:
        "A symbol of strength and endurance, this tree has a long lifespan and provides food and shelter to wildlife.",
      name: "Oak Tree",
      description: "Famous for its sturdy wood and deep roots, often used in furniture and construction.",
      src: "/images/card3.jpg",
    },
    {
      quote:
        "A graceful tree with distinctive white bark that peels in paper-like layers, thriving in colder climates.",
      name: "Birch Tree",
      description: "Known for its elegant appearance and traditional uses in medicine and crafts.",
      src: "/images/card4.jpg",
    },
    {
      quote:
        "A resilient tree that thrives in arid regions, providing vital shade and preventing soil erosion.",
      name: "Acacia Tree",
      description: "Commonly found in savannas and deserts, it plays a crucial role in the ecosystem.",
      src: "/images/adopt.jpg",
    },
  ];

  import { AnimatedTestimonials } from "./ui/animated-testimonials";

export function AnimatedTestimonialsDemo() {
    return (
      <div className="
        absolute 
        inset-0
        w-full 
        h-full
        flex 
        items-center 
        justify-center
        overflow-hidden
        z-0
      ">
        <div className="w-full max-w-7xl mx-auto">
          <AnimatedTestimonials testimonials={testimonials} />
        </div>
      </div>
    );
  }
  import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export const AnimatedAdoptSection = () => {
  const plants = [
    {
      name: "Peace Lily",
      description: "A beautiful indoor plant known for its air-purifying qualities. Looking for a loving home where it can thrive and bring tranquility.",
      careLevel: "Easy",
      image: "/images/lily.jpg"
    },
    {
      name: "Spider Plant",
      description: "A resilient and fast-growing plant that produces lovely plantlets. Ready to spread joy in your space!",
      careLevel: "Very Easy",
      image: "/images/snakePlant.jpg"
    },
    {
      name: "Snake Plant",
      description: "Strong and striking, this plant is perfect for busy plant parents. Seeking a bright corner in your home.",
      careLevel: "Easy",
      image: "/api/placeholder/400/500"
    }
  ];

  return (
    <div className="w-full py-8">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-8"
      >
        {plants.map((plant, index) => (
          <motion.div
            key={plant.name}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            whileHover={{ scale: 1.05 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl"
          >
            <div className="relative h-64 overflow-hidden">
              <Image
                src={plant.image}
                alt={plant.name}
                className="object-cover transform hover:scale-110 transition-transform duration-500"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end"
              >
                <span className="text-white px-4 py-2 text-sm">Care Level: {plant.careLevel}</span>
              </motion.div>
            </div>
            
            <div className="p-6">
              <motion.h3 
                className="text-2xl font-bold text-white mb-3 font-['Libre_Baskerville']"
                style={{ textShadow: "0px 2px 2px rgba(0, 0, 0, 0.2)" }}
              >
                {plant.name}
              </motion.h3>
              
              <motion.p 
                className="text-gray-100 mb-4 leading-relaxed"
                style={{ textShadow: "0px 1px 1px rgba(0, 0, 0, 0.1)" }}
              >
                {plant.description}
              </motion.p>
              
              <motion.div 
                className="flex items-center justify-between"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-white/80 text-sm">Ready for Adoption</span>
                <motion.div 
                  className="w-3 h-3 bg-green-400 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
              </motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-center mt-12 px-4"
      >
        <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Every plant deserves a loving home. By adopting a plant, you're not just adding beauty to your space – you're giving a green friend a second chance to thrive.
        </p>
      </motion.div>
    </div>
  );
};


export const AnimatedPlantScene = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-12 p-3 min-h-[100px]">
      <img src="/images/TreeLoading.gif" alt="" />
      <motion.div 
        className="w-full md:w-1/2 space-y-6 text-white"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <h2 className="text-3xl md:text-4xl font-['Libre_Baskerville'] font-bold" style={{ textShadow: "0px 2px 2px rgba(0, 0, 0, 0.2)" }}>
          Give Life, Grow Hope
        </h2>
        
        <div className="space-y-4 text-lg md:text-xl leading-relaxed">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            Every tree you adopt is a promise to our planet. It's not just about growing plants – it's about nurturing life, purifying our air, and creating a greener tomorrow.
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            When you adopt a tree, you become part of a global movement. Your small action today creates shade, shelter, and sustenance for generations to come.
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            Join us in this green revolution. One tree at a time, we can build a forest of hope and healing for our Earth.
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};



