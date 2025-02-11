// "use client";

// import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
// import { motion, AnimatePresence } from "framer-motion";
// import Image from "next/image";
// import { useEffect, useState } from "react";


// export const AnimatedTestimonials = ({
//   testimonials,
//   autoplay = false,
// }) => {
//   const [active, setActive] = useState(0);

//   const handleNext = () => {
//     setActive((prev) => (prev + 1) % testimonials.length);
//   };

//   const handlePrev = () => {
//     setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
//   };

//   const isActive = (index) => {
//     return index === active;
//   };

//   useEffect(() => {
//     if (autoplay) {
//       const interval = setInterval(handleNext, 5000);
//       return () => clearInterval(interval);
//     }
//   }, [autoplay]);

//   const randomRotateY = () => {
//     return Math.floor(Math.random() * 21) - 10;
//   };
//   return (
//     <div className="max-w-sm md:max-w-4xl mx-auto antialiased font-sans px-4 md:px-8 lg:px-12 py-20">
//       <div className="relative grid grid-cols-1 md:grid-cols-2  gap-20">
//         <div>
//           <div className="relative h-80 w-full">
//             <AnimatePresence>
//               {testimonials.map((testimonial, index) => (
//                 <motion.div
//                   key={testimonial.src}
//                   initial={{
//                     opacity: 0,
//                     scale: 0.9,
//                     z: -100,
//                     rotate: randomRotateY(),
//                   }}
//                   animate={{
//                     opacity: isActive(index) ? 1 : 0.7,
//                     scale: isActive(index) ? 1 : 0.95,
//                     z: isActive(index) ? 0 : -100,
//                     rotate: isActive(index) ? 0 : randomRotateY(),
//                     zIndex: isActive(index)
//                       ? 999
//                       : testimonials.length + 2 - index,
//                     y: isActive(index) ? [0, -80, 0] : 0,
//                   }}
//                   exit={{
//                     opacity: 0,
//                     scale: 0.9,
//                     z: 100,
//                     rotate: randomRotateY(),
//                   }}
//                   transition={{
//                     duration: 0.4,
//                     ease: "easeInOut",
//                   }}
//                   className="absolute inset-0 origin-bottom"
//                 >
//                   <Image
//                     src={testimonial.src}
//                     alt={testimonial.name}
//                     width={500}
//                     height={500}
//                     draggable={false}
//                     className="h-full w-full rounded-3xl object-cover object-center"
//                   />
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//           </div>
//         </div>
//         <div className="flex justify-between flex-col py-4">
//           <motion.div
//             key={active}
//             initial={{
//               y: 20,
//               opacity: 0,
//             }}
//             animate={{
//               y: 0,
//               opacity: 1,
//             }}
//             exit={{
//               y: -20,
//               opacity: 0,
//             }}
//             transition={{
//               duration: 0.2,
//               ease: "easeInOut",
//             }}
//           >
//             <h3 className="text-2xl font-bold dark:text-white text-black">
//               {testimonials[active].name}
//             </h3>
//             <p className="text-sm text-gray-500 dark:text-neutral-500">
//               {testimonials[active].designation}
//             </p>
//             <motion.p className="text-lg text-gray-500 mt-8 dark:text-neutral-300">
//               {testimonials[active].quote.split(" ").map((word, index) => (
//                 <motion.span
//                   key={index}
//                   initial={{
//                     filter: "blur(10px)",
//                     opacity: 0,
//                     y: 5,
//                   }}
//                   animate={{
//                     filter: "blur(0px)",
//                     opacity: 1,
//                     y: 0,
//                   }}
//                   transition={{
//                     duration: 0.2,
//                     ease: "easeInOut",
//                     delay: 0.02 * index,
//                   }}
//                   className="inline-block"
//                 >
//                   {word}&nbsp;
//                 </motion.span>
//               ))}
//             </motion.p>
//           </motion.div>
//           <div className="flex gap-4 pt-12 md:pt-0">
//             <button
//               onClick={handlePrev}
//               className="h-7 w-7 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center group/button"
//             >
//               <IconArrowLeft className="h-5 w-5 text-black dark:text-neutral-400 group-hover/button:rotate-12 transition-transform duration-300" />
//             </button>
//             <button
//               onClick={handleNext}
//               className="h-7 w-7 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center group/button"
//             >
//               <IconArrowRight className="h-5 w-5 text-black dark:text-neutral-400 group-hover/button:-rotate-12 transition-transform duration-300" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
"use client";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState, useMemo } from "react";



export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
}) => {
  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  const rotationValues = useMemo(() => 
    testimonials.map((_, i) => (i * 5) - 10),
    [testimonials.length]
  );

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index) => index === active;

  const getZIndex = (index) => {
    if (isActive(index)) return 10;
    return Math.max(1, testimonials.length + 2 - index);
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  // if (isMobile) {
  //   return (
  //     <div className="relative w-full mx-auto px-4 py-8">
  //       <div className="space-y-6">
  //         <div className="relative h-[300px] w-full">
  //           <AnimatePresence>
  //             {testimonials.map((testimonial, index) => (
  //               isActive(index) && (
  //                 <motion.div
  //                   key={testimonial.src}
  //                   initial={{ opacity: 0, scale: 0.9 }}
  //                   animate={{ opacity: 1, scale: 1 }}
  //                   exit={{ opacity: 0, scale: 0.9 }}
  //                   transition={{ duration: 0.4 }}
  //                   className="absolute inset-0"
  //                 >
  //                   <Image
  //                     src={testimonial.src}
  //                     alt={testimonial.name}
  //                     fill
  //                     priority={index === 0}
  //                     className="rounded-2xl object-cover shadow-lg"
  //                   />
  //                 </motion.div>
  //               )
  //             ))}
  //           </AnimatePresence>
  //         </div>
          
  //         <motion.div
  //           key={active}
  //           initial={{ y: 20, opacity: 0 }}
  //           animate={{ y: 0, opacity: 1 }}
  //           transition={{ duration: 0.2 }}
  //           className="text-center"
  //         >
  //           <h3 className="text-2xl font-bold mb-2 text-white font-['Libre_Baskerville']"
  //               style={{ textShadow: "0px 2px 2px rgba(0, 0, 0, 0.2)" }}>
  //             {testimonials[active].name}
  //           </h3>
  //           <p className="text-lg text-[#E6E6E6] mb-4 font-medium">
  //             {testimonials[active].description}
  //           </p>
  //           <p className="text-base text-white leading-relaxed">
  //             {testimonials[active].quote}
  //           </p>
  //         </motion.div>
          
  //         <div className="flex justify-center gap-4">
  //           <button
  //             onClick={handlePrev}
  //             className="h-10 w-10 rounded-full bg-[#698F47] hover:bg-[#557A32] flex items-center justify-center transition-all duration-300 shadow-lg"
  //           >
  //             <IconArrowLeft className="h-6 w-6 text-white" />
  //           </button>
  //           <button
  //             onClick={handleNext}
  //             className="h-10 w-10 rounded-full bg-[#698F47] hover:bg-[#557A32] flex items-center justify-center transition-all duration-300 shadow-lg"
  //           >
  //             <IconArrowRight className="h-6 w-6 text-white" />
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }
  if (isMobile) {
    return (
      <div className="relative w-full mx-auto px-4 mt-20"> {/* Added margin-top for navbar */}
        <div className="flex flex-col space-y-6 max-w-[375px] mx-auto"> {/* Added max-width and centered */}
          {/* Image Container */}
          <div className="relative h-[250px] w-full mt-4"> {/* Reduced height and added top margin */}
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                isActive(index) && (
                  <motion.div
                    key={testimonial.src}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={testimonial.src}
                      alt={testimonial.name}
                      fill
                      priority={index === 0}
                      className="rounded-2xl object-cover shadow-lg"
                    />
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </div>
          
          {/* Text Content */}
          <motion.div
            key={active}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="text-center px-2" /* Added horizontal padding */
          >
            <h3 className="text-xl font-bold mb-2 text-white font-['Libre_Baskerville']" /* Reduced font size */
                style={{ textShadow: "0px 2px 2px rgba(0, 0, 0, 0.2)" }}>
              {testimonials[active].name}
            </h3>
            <p className="text-base text-[#E6E6E6] mb-3 font-medium"> {/* Adjusted font size and margin */}
              {testimonials[active].description}
            </p>
            <p className="text-sm text-white leading-relaxed"> {/* Reduced font size */}
              {testimonials[active].quote}
            </p>
          </motion.div>
          
          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-4"> {/* Added top margin */}
            <button
              onClick={handlePrev}
              className="h-8 w-8 rounded-full bg-[#698F47] hover:bg-[#557A32] flex items-center justify-center transition-all duration-300 shadow-lg"
            >
              <IconArrowLeft className="h-4 w-4 text-white" />
            </button>
            <button
              onClick={handleNext}
              className="h-8 w-8 rounded-full bg-[#698F47] hover:bg-[#557A32] flex items-center justify-center transition-all duration-300 shadow-lg"
            >
              <IconArrowRight className="h-4 w-4 text-white" />
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="relative max-w-sm md:max-w-4xl mx-auto px-4 md:px-8 lg:px-12 py-10 z-0">
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-20 lg:gap-32">
        <div>
          <div className="relative h-[450px] w-full">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.src}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: rotationValues[index],
                    zIndex: 1
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : rotationValues[index],
                    zIndex: getZIndex(index),
                    y: isActive(index) ? [0, -80, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: rotationValues[index],
                    zIndex: 1
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-bottom"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={testimonial.src}
                      alt={testimonial.name}
                      width={900}
                      height={900}
                      priority={index === 0}
                      draggable={false}
                      className="h-full w-full rounded-3xl object-cover object-center shadow-xl"
                    />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex justify-between flex-col py-4">
          <motion.div
            key={active}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="space-y-6"
          >
            <h3 className="text-4xl lg:text-5xl font-bold text-white font-['Libre_Baskerville']"
                style={{ textShadow: "0px 3px 3px rgba(0, 0, 0, 0.2)" }}>
              {testimonials[active].name}
            </h3>
            <p className="text-xl lg:text-2xl text-[#E6E6E6] font-medium"
               style={{ textShadow: "0px 1px 2px rgba(0, 0, 0, 0.15)" }}>
              {testimonials[active].description}
            </p>
            <motion.p className="text-lg lg:text-xl text-white leading-relaxed">
              {testimonials[active].quote.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ filter: "blur(10px)", opacity: 0, y: 5 }}
                  animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                    delay: 0.02 * index,
                  }}
                  className="inline-block"
                  style={{ textShadow: "0px 1px 1px rgba(0, 0, 0, 0.1)" }}
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>
          <div className="flex gap-4 pt-8">
            <button
              onClick={handlePrev}
              className="h-12 w-12 rounded-full bg-[#698F47] hover:bg-[#557A32] flex items-center justify-center transition-all duration-300 shadow-lg group/button"
            >
              <IconArrowLeft className="h-6 w-6 text-white group-hover/button:rotate-12 transition-transform duration-300" />
            </button>
            <button
              onClick={handleNext}
              className="h-12 w-12 rounded-full bg-[#698F47] hover:bg-[#557A32] flex items-center justify-center transition-all duration-300 shadow-lg group/button"
            >
              <IconArrowRight className="h-6 w-6 text-white group-hover/button:-rotate-12 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedTestimonials;