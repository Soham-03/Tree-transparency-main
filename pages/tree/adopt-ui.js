'use client'
import { motion } from "framer-motion";
import Image from "next/image";
//  import { AnimatedTestimonialsDemo } from "@/components/Adopt";
// import { Button } from "@/components/ui/button";
// import { AnimatedAdoptSection } from "@/components/Adopt";
import { AnimatedPlantScene } from "@/components/Adopt";
import Link from "next/link";
import Footer from "@/components/Footer";
export default function Home() {
  return (
    <div>
    <main 
      className="min-h-screen antialiased "
      style={{
         background: "#96AD8A",
        // background: "linear-gradient(to bottom, #A8C0A0, #96AD8A, #86B049)", //ligth green  
        // background: "linear-gradient(to bottom, #5A7D3B, #86B049, #A8C0A0)"
        // background: "linear-gradient(to bottom, #96AD8A, #86B049, #FFD194)"

      }}
    >
      {/* Container for all content */}
      <div className="flex flex-col min-h-screen p-4 sm:p-6 lg:p-1  ">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full text-left sm:text-left mb-6 sm:mb-8"
        >
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl  font-bold font-['Libre_Baskerville'] text-[#E6E6E6] leading-tight break-words"
            style={{
              textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            }}
          >
            Plant Now
          </h1>
        </motion.div>

        {/* Main Content Section */}
        <div className="flex-grow w-full z-0 relative">
          <div className="  max-w-full overflow-x-hidden">
            <AnimatedPlantScene />
            
          </div>
        </div>

        {/* Footer Button Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="w-full mt-8 sm:mt-12"
        >
          <div className="flex justify-end lg:py-20 lg:px-10">
            <Link href="/Adopt/Cards">
            <button 
              className="bg-[#698F47] hover:bg-[#557A32] text-white text-base lg:text-3xl  sm:text-lg lg:px-10 sm:px-8 lg:py-15 sm:py-3 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl w-full sm:w-auto"
              style={{
                borderColor: "#86B049",
                borderWidth: "2px",
                textShadow: "0px 2px 2px rgba(0, 0, 0, 0.15)",
                maxWidth: "300px"
              }}
            >
              Adopt Now
            </button>
            </Link>
          
          </div>
        </motion.div>
      </div>
    </main>
    <Footer />
    </div>
  );
}