// import Footer from "@/components/Footer";
// import {
//   IconBrandGithub,
//   IconBrandLinkedin,
//   IconChevronRight,
//   IconTrees,
// } from "@tabler/icons-react";
// import Head from "next/head";
// import Link from "next/link";

// export default function Home() {
//   return (
//     <>
//       <Head>
//         <title>Tree Transparency</title>
//       </Head>
//       <main >
//         <Hero />
//         <Statistics />
//         <Promo />
//         {/* <Team /> */}
//       </main>

//       <Footer />
//     </>
//   );
// }

// function BackgroundAsset({ position }) {
//   return (
//     <div
//       className="absolute inset-x-0 top-[calc(100%-1rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[5rem]"
//       aria-hidden="true"
//     >
//       <div
//         className={`relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-primary to-secondary opacity-30 ${
//           position !== "right"
//             ? "sm:left-[calc(2rem)]"
//             : "sm:right-[calc(50%-36rem)]"
//         } sm:w-[72.1875rem]`}
//         style={{
//           clipPath:
//             "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
//         }}
//       />
//     </div>
//   );
// }

// function Hero() {
//   return (
//     <div className="relative px-6 lg:px-8">
//       <div className="max-w-3xl py-32 mx-auto sm:py-48 lg:py-56">
//         <div className="flex items-center justify-center mb-6">
//           <IconTrees size={100} />
//         </div>
//         <div className="hidden sm:mb-8 sm:flex sm:justify-center">
//           <div className="relative px-3 py-1 text-sm leading-6 rounded-full opacity-70 ring-1 ring-base-content/10 hover:ring-base-content/20">
//             Announcing our next round of funding.{" "}
//             <a href="#" className="font-semibold text-primary">
//               <span className="absolute inset-0" aria-hidden="true" />
//               Read more <span aria-hidden="true">&rarr;</span>
//             </a>
//           </div>
//         </div>
//         <div className="text-center">
//           <h1 className="text-4xl font-bold tracking-tight text-base-content sm:text-6xl">
//             Maintain <span className="text-primary">Trees</span> Around You
//           </h1>
//           <p className="mt-6 text-lg leading-8 text-base-content">
//             A web 3.0 platform for maintaining tree transparency
//           </p>
//           <div className="flex items-center justify-center mt-10 gap-x-6">
//             <a href="#" className="btn btn-primary">
//               Get started
//             </a>
//             <Link href="/about" className="gap-2 btn btn-ghost">
//               Learn more <IconChevronRight />
//             </Link>
//           </div>
//         </div>
//       </div>
//       <BackgroundAsset />
//     </div>
//   );
// }

// function Promo() {
//   return (
//     <div className="relative">
//       <div className="relative h-full p-6 overflow-hidden">
//         <div className="pt-16 pb-80 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
//           <div className="relative px-4 mx-auto max-w-7xl sm:static sm:p-6 lg:p-8">
//             <div className="sm:max-w-lg">
//               <h1 className="text-4xl font-bold tracking-tight text-base-content font sm:text-6xl">
//                 Adopt Trees Now
//               </h1>
//               <p className="mt-4 text-xl opacity-70">
//                 The best time to plant a tree was 20 years ago. The second best
//                 time is now.
//               </p>
//             </div>
//             <div>
//               <div className="mt-10">
//                 {/* Decorative image grid */}
//                 <div
//                   aria-hidden="true"
//                   className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
//                 >
//                   <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
//                     <div className="flex items-center space-x-6 lg:space-x-8">
//                       <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
//                         <div className="h-64 overflow-hidden rounded-lg w-44 sm:opacity-0 lg:opacity-100">
//                           <img
//                             src="https://images.unsplash.com/photo-1565721567189-72a61209bb81?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjI2fHx0cmVlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60"
//                             alt=""
//                             className="object-cover object-center w-full h-full"
//                           />
//                         </div>
//                         <div className="h-64 overflow-hidden rounded-lg w-44">
//                           <img
//                             src="https://images.unsplash.com/photo-1599940824399-b87987ceb72a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1854&q=80"
//                             alt=""
//                             className="object-cover object-center w-full h-full"
//                           />
//                         </div>
//                       </div>
//                       <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
//                         <div className="h-64 overflow-hidden rounded-lg w-44">
//                           <img
//                             src="https://images.unsplash.com/photo-1508193638397-1c4234db14d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
//                             alt=""
//                             className="object-cover object-center w-full h-full"
//                           />
//                         </div>
//                         <div className="h-64 overflow-hidden rounded-lg w-44">
//                           <img
//                             src="https://images.unsplash.com/photo-1533579286939-3e7b8bec52f0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=876&q=80"
//                             alt=""
//                             className="object-cover object-center w-full h-full"
//                           />
//                         </div>
//                         <div className="h-64 overflow-hidden rounded-lg w-44">
//                           <img
//                             src="https://images.unsplash.com/photo-1528027575047-56782a87e021?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
//                             alt=""
//                             className="object-cover object-center w-full h-full"
//                           />
//                         </div>
//                       </div>
//                       <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
//                         <div className="h-64 overflow-hidden rounded-lg w-44">
//                           <img
//                             src="https://images.unsplash.com/photo-1614183733044-a2bbd68e0b5d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
//                             alt=""
//                             className="object-cover object-center w-full h-full"
//                           />
//                         </div>
//                         <div className="h-64 overflow-hidden rounded-lg w-44">
//                           <img
//                             src="https://images.unsplash.com/photo-1603976328262-4c1b46d7e6e8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
//                             alt=""
//                             className="object-cover object-center w-full h-full"
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <a
//                   href="/tree/adopt"
//                   className="inline-block px-8 py-3 font-medium text-center duration-300 border border-transparent rounded-md bg-primary text-primary-content hover:opacity-90"
//                 >
//                   Adopt Now
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <BackgroundAsset position={"right"} />
//     </div>
//   );
// }

// function Statistics() {
//   const stats = [
//     { id: 1, name: "Transactions every 24 hours", value: "44 million" },
//     { id: 2, name: "Assets under holding", value: "$119 trillion" },
//     { id: 3, name: "New users annually", value: "46,000" },
//   ];

//   return (
//     <div className="pb-24 sm:pb-32">
//       <div className="px-6 mx-auto max-w-7xl lg:px-8">
//         <dl className="grid grid-cols-1 text-center gap-x-8 gap-y-16 lg:grid-cols-3">
//           {stats.map((stat) => (
//             <div
//               key={stat.id}
//               className="flex flex-col max-w-xs mx-auto gap-y-4"
//             >
//               <dt className="leading-7 text-base-content opacity-70">
//                 {stat.name}
//               </dt>
//               <div className="order-first text-3xl font-semibold tracking-tight text-base-content sm:text-5xl">
//                 {stat.value}
//               </div>
//             </div>
//           ))}
//         </dl>
//       </div>
//     </div>
//   );
// }

// // function Team() {
// //   const members = [
// //     {
// //       name: "Soham Parab",
// //       github: "https://github.com/Soham-03",
// //       linkedin: "https://www.linkedin.com/in/sohamm-parab/",
// //       photo:
// //         "https://media.licdn.com/dms/image/v2/D4D03AQEQrHQMxXIzuA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1731864783340?e=1737590400&v=beta&t=pJ0sQ3-RwgdabrKkWgwsCpWATGjUiBNa1zVJe7FsBt8",
// //     },
// //     {
// //       name: "Bryce Miranda",
// //       github: "https://github.com/Soham-03",
// //       linkedin: "https://www.linkedin.com/in/brycemiranda5/",
// //       photo:
// //         "https://media.licdn.com/dms/image/v2/D4E03AQF-Je10MDScWg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1678540214598?e=1737590400&v=beta&t=g9rqhhfrPN6bBSOu_GZK9MEEmEGivwB7EL7YMftkvEY",
// //     },
// //     {
// //       name: "Ryan Valiaparambil",
// //       github: "https://github.com/vryan-06",
// //       linkedin: "https://www.linkedin.com/in/ryan-v-20690b1b9",
// //       photo:
// //         "https://media.licdn.com/dms/image/D4D03AQETGIPXlVevzQ/profile-displayphoto-shrink_400_400/0/1694248571377?e=1729123200&v=beta&t=XbA7roy4JTHsVQNWsDemBnSbnRADEhAbY8zYQegzL70",
// //     },
// //     {
// //       name: "Deon Gracias",
// //       github: "https://github.com/deon-gracias",
// //       linkedin: "https://linkedin.com/in/deongracias",
// //       photo:
// //         "https://media.licdn.com/dms/image/v2/D4D03AQGX_zVxbvcuSQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1687517395359?e=1729123200&v=beta&t=rQHQYLhQZ5BZn_1ZmUVxBmbmHG2Pf7ISSzVOb1XAqVs",
// //     },
// //     {
// //       name: "Vijay Prajapati",
// //       github: "https://github.com/Vijay-SP",
// //       linkedin: "https://linkedin.com/in/vijayyy",
// //       photo:
// //         "https://media.licdn.com/dms/image/v2/D4D03AQGWopv7kI7C9g/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1716182337493?e=1729123200&v=beta&t=4luiJRH-atD9vjs6iiNfWSWYOi7pxM_-aO9QZs_7ElM",
// //     },
// //     {
// //       name: "Hisbaan Sayed",
// //       github: "https://github.com/Hisbaansay",
// //       linkedin: "https://linkedin.com/in/hisbaansay",
// //       photo:
// //         "https://media.licdn.com/dms/image/v2/D4D03AQHOop9M4XfZAw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1716145589861?e=1729123200&v=beta&t=4oCe35_igb3KfBZp79PinYsxotdzZus4RV-Nf7BPiH8",
// //     },
// //     {
// //       name: "Mahek Intwala",
// //       github: "https://github.com/imahek28",
// //       linkedin: "https://www.linkedin.com/in/mahek-intwala-99aaa6235/",
// //       photo:
// //         "https://media.licdn.com/dms/image/C4D03AQEUYpJjnazBiw/profile-displayphoto-shrink_400_400/0/1661009981685?e=1729123200&v=beta&t=EU4zWqb2wL8bnXJHKMc8VAqbICwUNUYPLdAGty7SyCo",
// //     },
// //     {
// //       name: "Nikhil Ramraje",
// //       github: "",
// //       linkedin: "https://www.linkedin.com/in/nikhil-ramraje2810/",
// //       photo:
// //       "https://media.licdn.com/dms/image/D4D03AQGt2d_G9MvVnA/profile-displayphoto-shrink_400_400/0/1708105861798?e=1729123200&v=beta&t=5-7pVo7UxzGgU5v0CtvaurJmcA-uoUxBYIitrPCwRn8"
// //     }
// //   ];

// //   return (
// //     <div class="py-24 sm:py-32 relative">
// //       <div class="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
// //         <div class="max-w-2xl">
// //           <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">
// //             Meet our leadership
// //           </h2>
// //           <p class="mt-6 text-lg leading-8 opacity-80"></p>
// //         </div>
// //         <ul
// //           role="list"
// //           class="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2"
// //         >
// //           {members.map((member) => (
// //             <li key={member.name}>
// //               <div class="flex items-center gap-x-6">
// //                 <img
// //                   class="h-32 w-32 rounded-full"
// //                   src={member.photo || ""}
// //                   alt={member.name}
// //                 />
// //                 <div>
// //                   <h3 class="font-semibold leading-7 text-xl tracking-tight">
// //                     {member.name}
// //                   </h3>
// //                   <div className="flex gap-2 mt-2">
// //                     <Link
// //                       href={member.github}
// //                       className="duration-200 btn btn-circle hover:btn-primary"
// //                     >
// //                       <IconBrandGithub />
// //                     </Link>
// //                     <Link
// //                       href={member.linkedin}
// //                       className="duration-200 btn btn-circle hover:btn-primary"
// //                     >
// //                       <IconBrandLinkedin />
// //                     </Link>
// //                   </div>
// //                 </div>
// //               </div>
// //             </li>
// //           ))}
// //         </ul>
// //       </div>
// //     </div>
// //   );
// // }
import React from 'react';
import Link from 'next/link';
import { IconTrees, IconChevronRight } from '@tabler/icons-react';
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
const words = `One tree at a time`;

function TextGenerateEffectDemo() {
    return (
        <div className='min-h-screen w-full flex flex-col justify-center items-center 
            relative overflow-hidden mx-auto p-4 md:p-6 lg:p-8'>
            <div className='relative z-10 w-full max-w-4xl text-center'>
                <h1 className="
                    text-2xl 
                    sm:text-4xl 
                    md:text-5xl 
                    lg:text-6xl 
                    xl:text-7xl 
                    2xl:text-8xl 
                    font-bold 
                    bg-clip-text 
                    text-transparent 
                    bg-gradient-to-b 
                    from-neutral-50 
                    to-neutral-400 
                    leading-tight">
                    <TextGenerateEffect words={words} />
                </h1>
                
                <p className="
                    mt-4 
                    text-sm 
                    sm:text-base 
                    md:text-lg 
                    lg:text-2xl 
                    xl:text-3xl 
                    text-white 
                    max-w-[280px]
                    sm:max-w-md 
                    md:max-w-lg 
                    lg:max-w-xl
                    mx-auto 
                    mb-6">
                    Maintain the <span className="text-green-600">trees</span> around you
                </p>

                <div className="flex flex-col lg:flex-row sm:flex-row gap-4 justify-center items-center">
                    {['Get Started', 'Learn More'].map((text, index) => (
                        <Link 
                            key={text}
                            href={index === 0 ? '/login' : '/Adopt'} 
                            className="w-full sm:w-auto transform transition-all duration-300 hover:scale-105"
                        >
                            <button className="
                                w-full 
                                sm:w-auto 
                                px-4 
                                py-2.5 
                                sm:px-8 
                                md:px-10 
                                md:py-3
                                bg-black/50 
                                text-white 
                                text-sm 
                                sm:text-base 
                                rounded-lg 
                                font-semibold 
                                overflow-hidden 
                                transition-all 
                                duration-300 
                                hover:bg-black/70 
                                active:bg-black/60
                                focus:outline-none
                                focus:ring-2
                                focus:ring-green-500
                                focus:ring-opacity-50
                                whitespace-nowrap">
                                {text}
                            </button>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}


const BackgroundAsset = ({ position }) => (
  <div
    className="absolute inset-x-0 top-[calc(100%-1rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[5rem]"
    aria-hidden="true"
  >
    <div
      className={`relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-green-600 to-green-400 opacity-30 ${
        position !== "right"
          ? "sm:left-[calc(2rem)]"
          : "sm:right-[calc(50%-36rem)]"
      } sm:w-[72.1875rem]`}
      style={{
        clipPath:
          "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
      }}
    />
  </div>
);

const NumberStats = () => {
  const stats = [
      { value: "44 million", label: "Transactions Every 24 Hours" },
      { value: "$119 trillion", label: "Assets Under Holding" },
      { value: "46,000", label: "New Users Annually" }
  ];

  return (
      <div className="
          w-full
          max-w-7xl
          mx-auto
          px-4
          py-8
          md:py-12
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          lg:grid-cols-3 
          gap-8 
          md:gap-12
          text-white">
          {stats.map(({ value, label }) => (
              <div key={value} className="
                  flex 
                  flex-col 
                  items-center 
                  space-y-2
                  p-4
                  rounded-lg
                  backdrop-blur-sm
                  bg-black/5
                  transition-transform
                  duration-300
                  hover:scale-105">
                  <h3 className="
                      text-3xl
                      sm:text-4xl
                      md:text-5xl
                      lg:text-6xl
                      font-bold
                      text-center">
                      {value}
                  </h3>
                  <p className="
                      text-base
                      sm:text-lg
                      md:text-xl
                      lg:text-2xl
                      text-center
                      text-neutral-200">
                      {label}
                  </p>
              </div>
          ))}
      </div>
  );
};

// const Hero = () => {
//   return (
//     <div className="min-h-screen w-full flex flex-col justify-center items-center relative overflow-hidden mx-auto p-4 md:p-6 lg:p-8">
//       <div className="relative z-10 w-full max-w-4xl text-center">
//         <div className="flex items-center justify-center mb-6">
//           <IconTrees size={100} className="text-green-600" />
//         </div>
        
//         <div className="hidden sm:mb-8 sm:flex sm:justify-center">
//           <div className="relative px-3 py-1 text-sm leading-6 rounded-full text-base-content opacity-70 ring-1 ring-base-content/10 hover:ring-base-content/20">
//             Announcing our next round of funding.{" "}
//             <a href="#" className="font-semibold text-green-600">
//               <span className="absolute inset-0" aria-hidden="true" />
//               Read more <span aria-hidden="true">&rarr;</span>
//             </a>
//           </div>
//         </div>

//         <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 leading-tight">
//           <TextGenerateEffect words="One tree at a time" />
//         </h1>
        
//         <p className="mt-4 text-sm sm:text-base md:text-lg lg:text-2xl xl:text-3xl text-base-content max-w-[280px] sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto mb-6">
//           Maintain the <span className="text-green-600">trees</span> around you
//         </p>

//         <div className="flex flex-col lg:flex-row sm:flex-row gap-4 justify-center items-center">
//           {['Get Started', 'Learn More'].map((text, index) => (
//             <Link 
//               key={text}
//               href={index === 0 ? '/login' : '/Adopt'} 
//               className="w-full sm:w-auto transform transition-all duration-300 hover:scale-105"
//             >
//               <button className="w-full sm:w-auto px-4 py-2.5 sm:px-8 md:px-10 md:py-3 bg-black/50 text-white text-sm sm:text-base rounded-lg font-semibold overflow-hidden transition-all duration-300 hover:bg-black/70 active:bg-black/60 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 whitespace-nowrap">
//                 {text}
//                 {index === 1 && <IconChevronRight className="inline ml-2" />}
//               </button>
//             </Link>
//           ))}
//         </div>
//       </div>
//       <BackgroundAsset />
//     </div>
//   );
// };
 function AdoptTree() {
  return (
      <div className='h-screen w-full rounded-md flex flex-col justify-center items-center 
  relative overflow-hidden mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='relative z-10 w-full max-w-4xl text-center'>
              <h1
                  className="text-xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white leading-tight">
                 Adopt a tree now
              </h1>
              <p
                  className="mt-4 text-sm xs:text-base sm:text-lg md:text-xl text-white max-w-xs xs:max-w-sm sm:max-w-md md:max-w-lg mx-auto mb-6 sm:mb-8">
                  The best time to plant a tree was 20  years ago.The second best time is <span className="text-green-600">now</span>
              </p>
              <div className="flex   justify-center items-center space-y-4 ">
                  
                  <Link 
                      href={'/Adopt'} 
                      className="w-full xs:w-auto transform transition-transform duration-300 hover:scale-105"
                  >
                      <button className=" relative 
               xs:w-auto 
              px-6 py-2 sm:px-10 sm:py-3 
              bg-black/50 
              text-white 
              text-sm sm:text-base 
              rounded-lg 
              font-semibold 
              overflow-hidden 
              group 
              transition-all 
              duration-300 
              hover:bg-black/70 
              active:bg-black/60
              focus:outline-none
              focus:ring-2
              focus:ring-green-500
              focus:ring-opacity-50">
                          Adopt Now
                      </button>
                  </Link>
              </div>
              
          </div>
      </div>
  );
}

const LandingPage = () => {
  return (
    <main className="min-h-screen bg-cover bg-center bg-no-repeat antialiased"
    style={{
      backgroundImage: "url('/images/treeFinal.avif')", // Path to your image
    }} suppressHydrationWarning>
      <TextGenerateEffectDemo />
      <NumberStats />
      <AdoptTree />
    </main>
  );
};

export default LandingPage;