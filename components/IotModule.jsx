'use client'
import React from 'react';
import { ArrowLeft, Search, ShoppingCart, ArrowRight } from 'lucide-react';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
import Link from 'next/link';
import { useEffect,useState } from 'react';

export const IoTModulePage = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // if (isMobile) {
  //   return (
  //     <div className="min-h-screen bg-gradient-radial from-white to-[#F2EFEF]">
  //       {/* Mobile Layout */}
  //       <div className="flex flex-col min-h-screen">
  //         {/* Header */}
  //         <div className="text-center pt-8 px-4">
  //           <h1
  //             className="text-4xl font-bold font-poppins mb-2"
  //             style={{
  //               textShadow: '0px 4px 4px rgba(0, 0, 0, 0.3)',
  //               lineHeight: '1.2'
  //             }}
  //           >
  //             All-In-One
  //           </h1>
  //           <h2
  //             className="text-5xl font-bold font-poppins text-[#323131]"
  //             style={{
  //               lineHeight: '1.2'
  //             }}
  //           >
  //             IoT Module
  //           </h2>
  //         </div>

  //         {/* Main Content */}
  //         <div className="flex-1 flex flex-col px-4 mt-8">
  //           {/* Main Image */}
  //           <div className="relative w-full aspect-[3/2] mb-8">
  //             <img
  //               src='/images/iotModule.jpg'
  //               alt="IoT Module"
  //               className="w-full h-full object-contain"
  //               style={{
  //                 filter: 'drop-shadow(0px 1px 4px rgba(12, 12, 13, 0.05))',
  //               }}
  //             />
  //           </div>

  //           {/* Action Buttons Container - Fixed at bottom */}
  //           <div className="fixed bottom-0 left-0 right-0 bg-white bg-opacity-90 backdrop-blur-sm">
  //             <div className="max-w-md mx-auto px-4 py-4 flex flex-col gap-4">
  //               {/* Product Details Button */}
  //               {/* <Link href="/IotModule/Features/1" className="w-full">
  //                 <div className="bg-[#1F1F1F] rounded-2xl p-4 flex items-center justify-between hover:bg-[#2a2a2a] transition-colors">
  //                   <span className="text-white font-poppins font-bold">
  //                     See Product Details
  //                   </span>
  //                   <ArrowRight className="w-5 h-5 text-white flex-shrink-0" />
  //                 </div>
  //               </Link> */}
  //               <Link href='IotModule/Checkout' className="w-full">
  //                 <button className="w-full bg-[#323131] text-[#F8F6F6] py-4 rounded-2xl font-poppins font-bold hover:bg-[#454545] transition-colors">
  //                   See Product Details
  //                 </button>
  //               </Link>

  //               {/* Checkout Button */}
  //               <Link href='IotModule/Checkout' className="w-full">
  //                 <button className="w-full bg-[#323131] text-[#F8F6F6] py-4 rounded-2xl font-poppins font-bold hover:bg-[#454545] transition-colors">
  //                   CheckOut
  //                 </button>
  //               </Link>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }
  if (isMobile) {
    return (
      <div className="fixed inset-0 overflow-y-auto overscroll-y-none">
        {/* Animated gradient background */}
        <div 
          className="fixed inset-0 -z-10"
          style={{
            background: `
              radial-gradient(circle at 0% 0%, rgba(255, 255, 255, 0.8) 0%, transparent 50%),
              radial-gradient(circle at 100% 0%, rgba(242, 239, 239, 0.8) 0%, transparent 50%),
              radial-gradient(circle at 100% 100%, rgba(255, 255, 255, 0.8) 0%, transparent 50%),
              radial-gradient(circle at 0% 100%, rgba(242, 239, 239, 0.8) 0%, transparent 50%)
            `,
            animation: 'gradientShift 15s ease-in-out infinite',
          }}
        />
        <style jsx global>{`
          @keyframes gradientShift {
            0% {
              background-position: 0% 0%;
            }
            25% {
              background-position: 100% 0%;
            }
            50% {
              background-position: 100% 100%;
            }
            75% {
              background-position: 0% 100%;
            }
            100% {
              background-position: 0% 0%;
            }
          }
        `}</style>

        {/* Scrollable Content Container */}
        <div className="min-h-screen pb-[calc(8rem+env(safe-area-inset-bottom,0))]">
          {/* Header - Fixed size to prevent reflow */}
          <div className="text-center pt-20 px-4 h-[168px] flex flex-col justify-center">
            <h1
              className="text-4xl font-bold font-poppins mb-2 translate-z-0"
              style={{
                textShadow: '0px 4px 4px rgba(0, 0, 0, 0.3)',
                lineHeight: '1.2'
              }}
            >
              All-In-One
            </h1>
            <h2
              className="text-5xl font-bold font-poppins text-[#323131] translate-z-0"
              style={{
                lineHeight: '1.2'
              }}
            >
              IoT Module
            </h2>
          </div>
  
          {/* Main Content */}
          <div className="px-4 mt-8">
            {/* Main Image - Optimized for performance */}
            <div 
              className="relative w-full aspect-[3/2] mb-8"
              style={{ transform: 'translateZ(0)' }}
            >
              <img
                src='/images/iotModule.jpg'
                alt="IoT Module"
                className="w-full h-full object-contain"
                style={{
                  filter: 'drop-shadow(0px 1px 4px rgba(12, 12, 13, 0.05))',
                  willChange: 'transform',
                }}
                loading="eager"
                decoding="sync"
              />
            </div>
          </div>
        </div>
  
        {/* Fixed Bottom Navigation - Optimized for performance */}
        <div 
          className="fixed bottom-0 left-0 right-0 z-10"
          style={{ 
            transform: 'translate3d(0, 0, 0)',
            backgroundColor: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(8px)'
          }}
        >
          <div className="max-w-md mx-auto px-4 py-4 flex flex-col gap-4">
            <Link href='/IotModule/Features/1' className="w-full">
              <button 
                className="w-full bg-[#323131] text-[#F8F6F6] py-4 rounded-2xl font-poppins font-bold transition-colors hover:bg-[#424141] active:bg-[#222121]"
                style={{ 
                  transform: 'translateZ(0)',
                  WebkitTapHighlightColor: 'transparent'
                }}
              >
                See Product Details
              </button>
            </Link>
  
            <Link href='IotModule/Checkout' className="w-full">
              <button 
                className="w-full bg-[#323131] text-[#F8F6F6] py-4 rounded-2xl font-poppins font-bold transition-colors hover:bg-[#424141] active:bg-[#222121]"
                style={{ 
                  transform: 'translateZ(0)',
                  WebkitTapHighlightColor: 'transparent'
                }}
              >
                CheckOut
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  // Desktop Layout - Exactly as provided

  // return (
  //   <div className="relative w-full min-h-screen overflow-hidden"
  //     style={{
  //       background: 'radial-gradient(50% 50% at 50% 50%, #FFFFFF 0%, #F2EFEF 100%)'
  //     }}>
  //     <main className="max-w-7xl mx-auto px-4 md:px-8">
  //       {/* Heading */}
  //       <div className="text-center mb-8 md:mb-12 pt-8">
  //         <h1
  //           className="text-4xl sm:text-6xl lg:text-[85px] font-bold font-poppins mb-2"
  //           style={{
  //             textShadow: '0px 4px 4px rgba(0, 0, 0, 0.3)',
  //             lineHeight: '1.2'
  //           }}
  //         >
  //           All-In-One
  //         </h1>
  //         <h2
  //           className="text-5xl sm:text-7xl lg:text-[96px] font-bold font-poppins text-[#323131]"
  //           style={{
  //             lineHeight: '1.2'
  //           }}
  //         >
  //           IoT Module
  //         </h2>
  //       </div>

  //       <div className="relative w-full max-w-6xl mx-auto">
  //         <div className="relative w-full aspect-[2/1]">
  //           <img
  //             src='/images/iotModule.jpg'
  //             alt="IoT Module"
  //             className="absolute top-0 left-1/2 transform -translate-x-1/2 translate-y-6"
  //             style={{
  //               width: '550px',
  //               height: '350px',
  //               filter: 'drop-shadow(0px 1px 4px rgba(12, 12, 13, 0.05))',
  //             }}
  //           />
  //         </div>

  //         <div className="fixed inset-0 pointer-events-none">
  //           <div className="relative w-full h-full max-w-7xl mx-auto">
  //             {/* Left Button */}
              

  //             {/* Right Product Card */}
  //             <div className="absolute flex flex-col right-4 md:right-8 top-3/4 transform -translate-y-1/2 pointer-events-auto ">
  //               <div className="bg-[#1F1F1F] rounded-[30px] w-[200px] md:w-[239px]">
  //                 <div className="bg-[#F6F4F4] mx-3 md:mx-[15px] mt-4 md:mt-[22px] rounded-[30px] aspect-square">
  //                   {/* <img
  //                     src="/images/iotModule.jpg"
  //                     alt="IoT Module Preview"
  //                     className="absolute top-5 left-1/2 transform -translate-x-1/2 translate-y-6"
  //                     style={{
  //                       width: '150px',
  //                       height: '150px',
  //                       filter: 'drop-shadow(0px 1px 4px rgba(12, 12, 13, 0.05))',
  //                     }}
  //                   /> */}
  //                 </div>
  //                 <div className="p-4 flex items-center justify-between">
  //                   <Link href="/IotModule/Features/1">
  //                     <span className="text-white font-poppins font-bold text-sm md:text-base">
  //                       See Product Details
  //                     </span>
  //                   </Link>
  //                   <ArrowRight className="w-5 h-5 text-white flex-shrink-0" />
  //                 </div>
  //               </div>
  //             </div>
  //             {/* checkout */}
  //             <div className="absolute   top-[88%] transform -translate-y-1/2 pointer-events-auto">
  //               <Link href='IotModule/Checkout'>
  //                 <button className="bg-[#323131] text-[#F8F6F6] px-6 md:px-8 py-5 rounded-full font-poppins font-bold text-sm md:text-base w-auto md:w-[219px] whitespace-nowrap">
  //                   CheckOut
  //                 </button>
  //               </Link>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </main>
  //   </div>
  // );
  return (
    <div className="relative w-full min-h-screen overflow-hidden"
      style={{
        background: 'radial-gradient(50% 50% at 50% 50%, #FFFFFF 0%, #F2EFEF 100%)'
      }}>
      <main className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Heading */}
        <div className="text-center mb-8 md:mb-12 pt-8">
          <h1
            className="text-4xl sm:text-6xl lg:text-[85px] font-bold font-poppins mb-2"
            style={{
              textShadow: '0px 4px 4px rgba(0, 0, 0, 0.3)',
              lineHeight: '1.2'
            }}
          >
            All-In-One
          </h1>
          <h2
            className="text-5xl sm:text-7xl lg:text-[96px] font-bold font-poppins text-[#323131]"
            style={{
              lineHeight: '1.2'
            }}
          >
            IoT Module
          </h2>
        </div>

        <div className="relative w-full max-w-6xl mx-auto">
          <div className="relative w-full aspect-[2/1]">
            <img
              src='/images/iotModule.jpg'
              alt="IoT Module"
              className="absolute top-0 left-1/2 transform -translate-x-1/2 translate-y-6"
              style={{
                width: '550px',
                height: '350px',
                filter: 'drop-shadow(0px 1px 4px rgba(12, 12, 13, 0.05))',
              }}
            />
          </div>

          <div className="fixed inset-0 pointer-events-none">
            <div className="relative w-full h-full max-w-7xl mx-auto">
              {/* Right Product Card with Checkout Button */}
              <div className="absolute right-4 md:right-8 top-[88%] transform -translate-y-1/2 pointer-events-auto">
                <div className="bg-[#1F1F1F] rounded-[30px] w-[200px] md:w-[239px]">
                  {/* <div className="bg-[#F6F4F4] mx-3 md:mx-[15px] mt-4 md:mt-[22px] rounded-[30px] aspect-square">
                    <img
                      src="/images/iotModule.jpg"
                      alt="IoT Module Preview"
                      className="absolute top-5 left-1/2 transform -translate-x-1/2 translate-y-6"
                      style={{
                        width: '150px',
                        height: '150px',
                        filter: 'drop-shadow(0px 1px 4px rgba(12, 12, 13, 0.05))',
                      }}
                    />
                  </div> */}
                  <div className="p-4 flex items-center justify-between">
                    <Link href="/sensors/Features/1">
                      <span className="text-white font-poppins font-bold text-sm md:text-base">
                        See Product Details
                      </span>
                    </Link>
                    <ArrowRight className="w-5 h-5 text-white flex-shrink-0" />
                  </div>
                  {/* Added Checkout Button */}
                  <div className="px-4 pb-4">
                    <Link href='IotModule/Checkout'>
                      <button className="w-full bg-[#323131] text-[#F8F6F6] px-6 md:px-8 py-3 rounded-full font-poppins font-bold text-sm md:text-base hover:bg-[#454545] transition-colors">
                        CheckOut
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export  function Feature1Content() {
  return (
    <>
      <div className="flex items-center gap-4 mb-4">
        <div className="border-[5px] border-[#71A8DA] w-8 h-8" />
        <h2 className="text-4xl font-medium font-roboto text-[#71A8DA]">
          Esp 32 module
        </h2>
      </div>
      
     
      
      <p className="text-lg font-medium font-roboto leading-[21px] text-black">
      The ESP32 is a small, affordable chip that lets devices connect to Wi-Fi and Bluetooth. 
          It's powerful, energy-efficient, and enables devices to be controlled remotely or send 
          data over the internet, making the iot module smarter and more connected.
      </p>
    </>
  );
}
export  function Feature2Content() {
  return (
    <>
      <div className="flex items-center gap-4 mb-4">
        <div className="border-[5px] border-[#71A8DA] w-8 h-8" />
        <h2 className="text-3xl font-medium font-roboto text-[#71A8DA]">
        GSM Network Module
      </h2>
      </div>
      
    
      
      <p className="text-lg font-medium font-roboto leading-[21px] text-black">
        Our GSM network module provides reliable cellular connectivity for IoT devices. 
        It enables secure data transmission, remote monitoring, and real-time communication 
        across vast distances, making it perfect for industrial and commercial applications.
      </p>
    </>
  );
}

// app/iotModule/components/FeatureContent/Feature3Content.tsx
export  function Feature3Content() {
  return (
    <>
      <div className="flex items-center gap-4 mb-4">
        <div className="border-[5px] border-[#71A8DA] w-8 h-8" />
        <h2 className="text-4xl font-medium font-roboto text-[#71A8DA]">
        Smart Sensors
      </h2>
      </div>
      
      
      
      <p className="text-lg font-medium font-roboto leading-[21px] text-black">
        Equipped with advanced sensing capabilities, our smart sensors deliver precise 
        environmental monitoring. They can detect temperature, humidity, pressure, and 
        more, providing accurate data for informed decision-making in real-time.
      </p>
    </>
  );
}

// app/iotModule/components/FeatureContent/Feature4Content.tsx
export  function Feature4Content() {
  return (
    <>
      <div className="flex items-center gap-4 mb-4">
        <div className="border-[5px] border-[#71A8DA] w-8 h-8" />
        <h2 className="text-4xl font-medium font-roboto text-[#71A8DA]">
        Cloud Integration
      </h2>
      </div>
      
     
      
      <p className="text-lg font-medium font-roboto leading-[21px] text-black">
        Seamlessly connect your IoT devices to the cloud with our integrated solution. 
        Enable data storage, analytics, and remote device management through our secure 
        cloud platform, making your IoT deployment scalable and efficient.
      </p>
    </>
  );
}



  
  export function PaginationDemo({ currentFeatureId }) {
    const featureId = Number(currentFeatureId);
  
    return (
      <Pagination className="mt-8">
        <PaginationContent>
          {/* Previous Button */}
          <PaginationItem>
            <PaginationPrevious 
              href={featureId > 1 ? `/sensors/Features/${featureId - 1}` : '#'}
              className={featureId <= 1 ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>
  
          {/* Page Links */}
          {[1,2, 3, 4].map((pageNum) => (
            <PaginationItem key={pageNum}>
              <PaginationLink 
                href={`/sensors/Features/${pageNum}`}
                isActive={featureId === pageNum}
              >
                {pageNum}
              </PaginationLink>
            </PaginationItem>
          ))}
  
          {/* Next Button */}
          <PaginationItem>
            <PaginationNext 
              href={featureId < 4 ? `/sensors/Features/${featureId + 1}` : '#'}
              className={featureId >= 4 ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  }

  import { Roboto } from 'next/font/google';


  const roboto = Roboto({
    weight: ['400', '500', '700'],
    subsets: ['latin'],
    variable: '--font-roboto',
  });

  
  export function IoTModuleLayout({
    children,
    currentFeatureId,
  }) {
    return (
      <div 
        className={`relative w-full min-h-screen bg-[#7B996C] px-4 py-2 sm:px-6 lg:px-8 ${roboto.variable}`}
      >
        <div className="relative w-full max-w-[1370px] mx-auto my-2 bg-white rounded-[20px] sm:rounded-[30px] lg:rounded-[50px] p-4 sm:p-6 lg:p-8">
          {/* Header */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-roboto leading-tight sm:leading-snug lg:leading-[56px] text-black mb-6 sm:mb-8 lg:mb-16 max-w-full lg:max-w-[787px]">
            Unmatched Quality, Smart Features, and Innovative Technologies
          </h1>
  
          <div className="relative flex flex-col lg:flex-row lg:justify-between gap-8 lg:gap-12">
            {/* Left side - Feature specific content */}
            <div className="w-full lg:max-w-[369px] text-black order-2 lg:order-1">
              {children}
              <div className="mt-8 lg:mt-18">
                <PaginationDemo currentFeatureId={currentFeatureId} />
              </div>
            </div>
  
            {/* Right side - Consistent image */}
            <div className="relative w-full lg:w-[699px] h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] order-1 lg:order-2">
              <img
                src="/images/iotModule.jpg"
                alt="IoT Module"
                className="w-full h-full object-contain rounded-lg lg:rounded-none"
              />
               {/* <img
        src="/images/video.gif"
        alt="Animated GIF"
        className="absolute top-0 left-1/2 transform -translate-x-1/2 translate-y-6"
        style={{
          width: '550px',
          height: '350px',
          filter: 'drop-shadow(0px 1px 4px rgba(12, 12, 13, 0.05))',
        }}
      /> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
