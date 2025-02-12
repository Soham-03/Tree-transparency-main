// // import { Fragment } from "react";
// // import { Disclosure, Menu, Transition } from "@headlessui/react";
// // import {
// //   IconMenu2,
// //   IconMoon,
// //   IconSun,
// //   IconTrees,
// //   IconUser,
// //   IconX,
// // } from "@tabler/icons-react";
// // import clsx from "clsx";
// // import Link from "next/link";
// // import { useUserStore } from "@/store/user";
// // import { useUserContext } from "@/services/userContext";
// // import { useRouter } from "next/router";
// // import { useTheme } from "next-themes";
// // import { IconScan } from "@tabler/icons-react";

// // const navigation = [
// //   { name: "Adopt", href: "/tree/adopt" },
// //   { name: "Growth Track", href: "/tree/growth-track" },
// //   { name: "IOT Track", href: "/sensors" },
// // ];

// // const donationsTab = { name: "Donations", href: "/donations" };

// // const commonProfileOptions = [
// //   { name: "Profile", href: "/profile" },
// //   { name: "My Trees", href: "/profile/adopted" },
// // ];

// // const ngoProfileOptions = [{ name: "Add Tree", href: "/tree/add" }];

// // const volunteerProfileOptions = [{ name: "Verify Tree", href: "/tree/verify" }];

// // const companiesProfileOptions = [{ name: "Donate", href: "/donate" }];

// // const individualProfileOptions = [{ name: "Donate", href: "/donate" }];

// // export default function Navbar() {
// //   const router = useRouter();
// //   const { userStore } = useUserStore();

// //   return (
// //     <Disclosure
// //       as="nav"
// //       className="sticky top-0 blur-filter backdrop-blur-lg bg-base-100/50 z-10 shadow-sm"
// //     >
// //       {({ open }) => (
// //         <>
// //           <div className="container px-2 mx-auto sm:px-6 lg:px-8">
// //             <div className="relative flex items-center justify-between h-16">
// //               <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
// //                 {/* Mobile menu button*/}
// //                 <Disclosure.Button className="inline-flex items-center justify-center p-2 duration-300 rounded-md text-base-content hover:bg-primary hover:text-base-content focus:outline-none focus:ring-2 focus:ring-inset focus:ring-base-content">
// //                   <span className="sr-only">Open main menu</span>
// //                   {open ? (
// //                     <IconX className="block w-6 h-6" aria-hidden="true" />
// //                   ) : (
// //                     <IconMenu2 className="block w-6 h-6" aria-hidden="true" />
// //                   )}
// //                 </Disclosure.Button>
// //               </div>
// //               <div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
// //                 <Link href="/" className="flex items-center flex-shrink-0">
// //                   <IconTrees size={30} className="text-primary" />
// //                 </Link>
// //                 <div className="hidden sm:ml-6 sm:block">
// //                   <div className="flex space-x-4">
// //                     {userStore &&
// //                       userStore.type &&
// //                       navigation.map((item) => (
// //                         <Link
// //                           key={item.name}
// //                           href={item.href}
// //                           className={clsx(
// //                             item.href === router.pathname
// //                               ? "bg-primary text-primary-content"
// //                               : "hover:bg-primary hover:text-primary-content",
// //                             "rounded-md px-3 py-2 text-sm font-medium duration-200"
// //                           )}
// //                         >
// //                           {item.name}
// //                         </Link>
// //                       ))}
// //                     {userStore &&
// //                       userStore.type !== "NGO" &&(
// //                         <Link
// //                           href={donationsTab.href}
// //                           className={clsx(
// //                             donationsTab.href === router.pathname
// //                               ? "bg-primary text-primary-content"
// //                               : "hover:bg-primary hover:text-primary-content",
// //                             "rounded-md px-3 py-2 text-sm font-medium duration-200"
// //                           )}
// //                         >
// //                           {donationsTab.name}
// //                         </Link>
// //                       )}
// //                     {userStore &&
// //                       userStore?.type === "Private Companies" &&
// //                       companiesProfileOptions.map((item) => (
// //                         <Link
// //                           key={item.href}
// //                           href={item.href}
// //                           className={clsx(
// //                             item.href === router.pathname
// //                               ? "bg-primary text-primary-content"
// //                               : "hover:bg-primary hover:text-primary-content",
// //                             "rounded-md px-3 py-2 text-sm font-medium duration-200"
// //                           )}
// //                         >
// //                           {item.name}
// //                         </Link>
// //                       ))}
// //                     {userStore &&
// //                       userStore?.type === "Individual" &&
// //                       individualProfileOptions.map((item) => (
// //                         <Link
// //                           key={item.href}
// //                           href={item.href}
// //                           className={clsx(
// //                             item.href === router.pathname
// //                               ? "bg-primary text-primary-content"
// //                               : "hover:bg-primary hover:text-primary-content",
// //                             "rounded-md px-3 py-2 text-sm font-medium duration-200"
// //                           )}
// //                         >
// //                           {item.name}
// //                         </Link>
// //                       ))}
// //                   </div>
// //                 </div>
// //               </div>
// //               <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
// //                 {/* Profile dropdown */}
// //                 <ProfileDropdown />
// //               </div>
// //             </div>
// //           </div>

// //           <Disclosure.Panel className="sm:hidden">
// //             <div className="px-2 pt-2 pb-3 space-y-1">
// //               {navigation.map((item) => (
// //                 <Disclosure.Button
// //                   key={item.name}
// //                   as="a"
// //                   href={item.href}
// //                   className={clsx(
// //                     item.href === router.pathname
// //                       ? "bg-primary text-primary-content"
// //                       : "hover:bg-primary hover:text-primary-content",
// //                     "duration-200 block rounded-md px-3 py-3 text-base font-medium"
// //                   )}
// //                 >
// //                   {item.name}
// //                 </Disclosure.Button>
// //               ))}
// //               {userStore && userStore.type !== "NGO" && (
// //                 <Disclosure.Button
// //                   as="a"
// //                   href={donationsTab.href}
// //                   className={clsx(
// //                     donationsTab.href === router.pathname
// //                       ? "bg-primary text-primary-content"
// //                       : "hover:bg-primary hover:text-primary-content",
// //                     "duration-200 block rounded-md px-3 py-3 text-base font-medium"
// //                   )}
// //                 >
// //                   {donationsTab.name}
// //                 </Disclosure.Button>
// //               )}
// //             </div>
// //           </Disclosure.Panel>
// //         </>
// //       )}
// //     </Disclosure>
// //   );
// // }

// // function ProfileDropdown() {
// //   const { theme, setTheme } = useTheme();
// //   const { userStore, clear } = useUserStore();
// //   const router = useRouter();
// //   const { logOutUser, user } = useUserContext();

// //   const handleSignOut = async () => {
// //     try {
// //       await logOutUser(user);
// //       clear();
// //       router.push("/");
// //     } catch (error) {
// //       console.error("Error signing out:", error);
// //     }
// //   };

// //   return !userStore.email ? (
// //     <Link href="/login" className="btn btn-primary">
// //       Login
// //     </Link>
// //   ) : (
// //     <Menu as="div" className="relative ml-3">
// //       <div className="flex items-center gap-1">
// //         <button
// //           className="btn btn-ghost btn-circle btn-sm"
// //           onClick={() => setTheme(theme === "emerald" ? "forest" : "emerald")}
// //         >
// //           {theme === "emerald" ? <IconMoon /> : <IconSun />}
// //         </button>
// //         <a href="/qr-scanner" className="btn btn-ghost btn-circle btn-sm">
// //           <IconScan />
// //         </a>
// //         <Menu.Button className="gap-2 btn btn-ghost btn-sm btn-circle">
// //           <span className="sr-only">Open user menu</span>
// //           {userStore.photoURL ? (
// //             <img
// //               className="w-8 h-8 rounded-full"
// //               src={userStore.photoURL}
// //               alt=""
// //             />
// //           ) : (
// //             <IconUser />
// //           )}
// //         </Menu.Button>
// //       </div>
// //       <Transition
// //         as={Fragment}
// //         enter="transition ease-out duration-100"
// //         enterFrom="transform opacity-0 scale-95"
// //         enterTo="transform opacity-100 scale-100"
// //         leave="transition ease-in duration-75"
// //         leaveFrom="transform opacity-100 scale-100"
// //         leaveTo="transform opacity-0 scale-95"
// //       >
// //         <Menu.Items className="absolute right-0 z-10 w-48 pb-1 mt-2 text-sm origin-top-right rounded-md shadow-lg bg-base-300 ring-1 ring-black ring-opacity-5 focus:outline-none">
// //           <Menu.Item>
// //             <div className="py-3 text-center bg-base-200">
// //               <span className="text-primary">{userStore.username}</span>
// //             </div>
// //           </Menu.Item>
// //           {userStore?.type === "NGOs" &&
// //             ngoProfileOptions.map((item) => (
// //               <Menu.Item key={item.href}>
// //                 <Link
// //                   href={item.href}
// //                   className="block px-4 py-2 duration-200 hover:bg-base-100"
// //                 >
// //                   {item.name}
// //                 </Link>
// //               </Menu.Item>
// //             ))}
// //           {userStore?.type === "Volunteers" &&
// //             volunteerProfileOptions.map((item) => (
// //               <Menu.Item key={item.href}>
// //                 <Link
// //                   href={item.href}
// //                   className="block px-4 py-2 duration-200 hover:bg-base-100"
// //                 >
// //                   {item.name}
// //                 </Link>
// //               </Menu.Item>
// //             ))}
// //           {commonProfileOptions.map((item) => (
// //             <Menu.Item key={item.href}>
// //               <Link
// //                 href={item.href}
// //                 className="block px-4 py-2 duration-200 hover:bg-base-100"
// //               >
// //                 {item.name}
// //               </Link>
// //             </Menu.Item>
// //           ))}
// //           <Menu.Item>
// //             <button
// //               onClick={handleSignOut}
// //               className="block w-full px-4 py-2 text-left duration-200 hover:bg-base-100"
// //             >
// //               Sign out
// //             </button>
// //           </Menu.Item>
// //         </Menu.Items>
// //       </Transition>
// //     </Menu>
// //   );
// // }

// import { Fragment } from "react";
// import { Disclosure, Menu, Transition } from "@headlessui/react";
// import {
//   IconMenu2,
//   IconMoon,
//   IconSun,
//   IconTrees,
//   IconUser,
//   IconX,
// } from "@tabler/icons-react";
// import clsx from "clsx";
// import Link from "next/link";
// import { useUserStore } from "@/store/user";
// import { useUserContext } from "@/services/userContext";
// import { useRouter } from "next/router";
// import { useTheme } from "next-themes";
// import { IconQrcodeOff } from "@tabler/icons-react";
// import { IconScan } from "@tabler/icons-react";

// const navigation = [
//   { name: "Adopt Saplings", href: "/tree/adopt" },
//   { name: "Your Donations", href: "/donations" },
//   { name: "Growth Track", href: "/tree/growth-track" },
//   { name: "Tracking With Module", href: "/sensors" },
// ];

// const commonProfileOptions = [
//   { name: "Profile", href: "/profile" },
//   { name: "My Trees", href: "/profile/adopted" },
// ];

// const ngoProfileOptions = [{ name: "Add Tree", href: "/tree/add" }];

// const volunteerProfileOptions = [{ name: "Verify Tree", href: "/tree/verify" }];

// const companiesProfileOptions = [{ name: "Donate", href: "/donate" }];

// const individualProfileOptions = [{ name: "Donate", href: "/donate" }];

// export default function Navbar() {
//   const router = useRouter();
//   const { userStore } = useUserStore();

//   return (
//     <Disclosure
//       as="nav"
//       className="sticky top-0 blur-filter backdrop-blur-lg bg-base-100/50 z-10 shadow-sm"
//     >
//       {({ open }) => (
//         <>
//           <div className="container px-2 mx-auto sm:px-6 lg:px-8">
//             <div className="relative flex items-center justify-between h-16">
//               <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
//                 {/* Mobile menu button*/}
//                 <Disclosure.Button className="inline-flex items-center justify-center p-2 duration-300 rounded-md text-base-content hover:bg-primary hover:text-base-content focus:outline-none focus:ring-2 focus:ring-inset focus:ring-base-content">
//                   <span className="sr-only">Open main menu</span>
//                   {open ? (
//                     <IconX className="block w-6 h-6" aria-hidden="true" />
//                   ) : (
//                     <IconMenu2 className="block w-6 h-6" aria-hidden="true" />
//                   )}
//                 </Disclosure.Button>
//               </div>
//               <div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
//                 <Link href="/" className="flex items-center flex-shrink-0">
//                   <IconTrees size={30} className="text-primary" />
//                 </Link>
//                 <div className="hidden sm:ml-6 sm:block">
//                   <div className="flex space-x-4">
//                     {userStore &&
//                       userStore.type &&
//                       navigation.map((item) => (
//                         <Link
//                           key={item.name}
//                           href={item.href}
//                           className={clsx(
//                             item.href === router.pathname
//                               ? "bg-primary text-primary-content"
//                               : "hover:bg-primary hover:text-primary-content",
//                             "rounded-md px-3 py-2 text-sm font-medium duration-200"
//                           )}
//                         >
//                           {item.name}
//                         </Link>
//                       ))}
//                     {userStore &&
//                       userStore?.type === "Private Companies" &&
//                       companiesProfileOptions.map((item) => (
//                         <Link
//                           href={item.href}
//                           className={clsx(
//                             item.href === router.pathname
//                               ? "bg-primary text-primary-content"
//                               : "hover:bg-primary hover:text-primary-content",
//                             "rounded-md px-3 py-2 text-sm font-medium duration-200"
//                           )}
//                         >
//                           {item.name}
//                         </Link>
//                       ))}
//                     {userStore &&
//                       userStore?.type === "Individual" &&
//                       individualProfileOptions.map((item) => (
//                         <Link
//                           href={item.href}
//                           className={clsx(
//                             item.href === router.pathname
//                               ? "bg-primary text-primary-content"
//                               : "hover:bg-primary hover:text-primary-content",
//                             "rounded-md px-3 py-2 text-sm font-medium duration-200"
//                           )}
//                         >
//                           {item.name}
//                         </Link>
//                       ))}
//                   </div>
//                 </div>
//               </div>
//               <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
//                 {/* Profile dropdown */}
//                 <ProfileDropdown />
//               </div>
//             </div>
//           </div>

//           <Disclosure.Panel className="sm:hidden">
//             <div className="px-2 pt-2 pb-3 space-y-1">
//               {navigation.map((item) => (
//                 <Disclosure.Button
//                   key={item.name}
//                   as="a"
//                   href={item.href}
//                   className={clsx(
//                     item.href === router.pathname
//                       ? "bg-primary text-primary-content"
//                       : "hover:bg-primary hover:text-primary-content",
//                     "duration-200 block rounded-md px-3 py-3 text-base font-medium"
//                   )}
//                 >
//                   {item.name}
//                 </Disclosure.Button>
//               ))}
//             </div>
//           </Disclosure.Panel>
//         </>
//       )}
//     </Disclosure>
//   );
// }

// function ProfileDropdown() {
//   const { theme, setTheme } = useTheme();
//   const { userStore, clear } = useUserStore();
//   const router = useRouter();
//   const { logOutUser, user } = useUserContext();

//   const handleSignOut = async () => {
//     try {
//       await logOutUser(user);
//       clear();
//       router.push("/");
//     } catch (error) {
//       console.error("Error signing out:", error);
//     }
//   };

//   return !userStore.email ? (
//     <Link href="/login" className="btn btn-primary">
//       Login
//     </Link>
//   ) : (
//     <Menu as="div" className="relative ml-3">
//       <div className="flex items-center gap-1">
//         <button
//           className="btn btn-ghost btn-circle btn-sm"
//           onClick={() => setTheme(theme === "emerald" ? "forest" : "emerald")}
//         >
//           {theme === "emerald" ? <IconMoon /> : <IconSun />}
//         </button>
//         <a href="/qr-scanner" className="btn btn-ghost btn-circle btn-sm">
//           <IconScan />
//         </a>
//         <Menu.Button className="gap-2 btn btn-ghost btn-sm btn-circle">
//           <span className="sr-only">Open user menu</span>
//           {userStore.photoURL ? (
//             <img
//               className="w-8 h-8 rounded-full"
//               src={userStore.photoURL}
//               alt=""
//             />
//           ) : (
//             <IconUser />
//           )}
//         </Menu.Button>
//       </div>
//       <Transition
//         as={Fragment}
//         enter="transition ease-out duration-100"
//         enterFrom="transform opacity-0 scale-95"
//         enterTo="transform opacity-100 scale-100"
//         leave="transition ease-in duration-75"
//         leaveFrom="transform opacity-100 scale-100"
//         leaveTo="transform opacity-0 scale-95"
//       >
//         <Menu.Items className="absolute right-0 z-10 w-48 pb-1 mt-2 text-sm origin-top-right rounded-md shadow-lg bg-base-300 ring-1 ring-black ring-opacity-5 focus:outline-none">
//           <Menu.Item>
//             <div className="py-3 text-center bg-base-200">
//               <span className="text-primary">{userStore.username}</span>
//             </div>
//           </Menu.Item>
//           {userStore?.type === "NGOs" &&
//             ngoProfileOptions.map((item) => (
//               <Menu.Item key={item.href}>
//                 <Link
//                   href={item.href}
//                   className="block px-4 py-2 duration-200 hover:bg-base-100"
//                 >
//                   {item.name}
//                 </Link>
//               </Menu.Item>
//             ))}
//           {userStore?.type === "Volunteers" &&
//             volunteerProfileOptions.map((item) => (
//               <Menu.Item key={item.href}>
//                 <Link
//                   href={item.href}
//                   className="block px-4 py-2 duration-200 hover:bg-base-100"
//                 >
//                   {item.name}
//                 </Link>
//               </Menu.Item>
//             ))}

//           {commonProfileOptions.map((item) => (
//             <Menu.Item key={item.href}>
//               <Link
//                 href={item.href}
//                 className="block px-4 py-2 duration-200 hover:bg-base-100"
//               >
//                 {item.name}
//               </Link>
//             </Menu.Item>
//           ))}
//           <Menu.Item>
//             <div
//               onClick={() => handleSignOut()}
//               className="block px-4 py-2 duration-200 hover:bg-base-100"
//             >
//               Sign out
//             </div>
//           </Menu.Item>
//         </Menu.Items>
//       </Transition>
//     </Menu>
//   );
// }

// Navbar.js
'use client'
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  IconMenu2,
  IconMoon,
  IconSun,
  IconTrees,
  IconUser,
  IconX,
  IconLeaf,
  IconHeartHandshake,
  IconPlant2,
  IconDeviceLaptop,
  IconUserCircle,
  IconWood,
  IconPlus,
  IconCheckupList,
  IconChevronDown,
  IconTemperature,
  IconDroplet,
  IconSun2,
  IconPlant
} from "@tabler/icons-react";


import clsx from "clsx";
import Link from "next/link";
import { useUserStore } from "@/store/user";
import { useUserContext } from "@/services/userContext";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import { IconScan } from "@tabler/icons-react";

const navigation = [
  { 
    name: "Adopt Trees", 
    href: "/tree/adopt",
    icon: IconHeartHandshake,
    description: "Give a tree a home" 
  },
  { 
    name: "Your Contributions", 
    href: "/donations",
    icon: IconHeartHandshake,
    description: "Track your impact" 
  },
  { 
    name: "Tracking using Images", 
    href: "/tree/growth-track",
    icon: IconPlant2,
    description: "Watch trees grow" 
  },
  { 
    name: "Track using Iot Module", 
    type: "dropdown",
    icon: IconDeviceLaptop,
    description: "Tech-powered monitoring",
    items: [
      {
        name: "About",
        href: "/sensors/About",
        icon: IconTemperature,
        description: "Features of Iot Module"
      },
      {
        name: "Sensors",
        href: "/sensors",
        icon: IconDroplet,
        description: "Track my tree"
      },
     
    ]
  },
  { 
    name: 
    "Support Growth", 
    href: "/donate",
    icon: IconHeartHandshake,
    description: "Your Donations" 
  },
    
  
];

const commonProfileOptions = [
  { 
    name: "Your Profile", 
    href: "/profile",
    icon: IconUserCircle,
    description: "Manage your account" 
  },
  { 
    name: "Your Forest", 
    href: "/profile/adopted",
    icon: IconWood,
    description: "View your adopted trees" 
  },
];

const ngoProfileOptions = [
  { 
    name: "Register New Tree", 
    href: "/tree/add",
    icon: IconPlus,
    description: "Add a tree to the network" 
  }
];

const volunteerProfileOptions = [
  { 
    name: "Verify Trees", 
    href: "/tree/verify",
    icon: IconCheckupList,
    description: "Help validate tree data" 
  }
];

const donationOptions = [
  { 
    name: "Support Growth", 
    href: "/donate",
    icon: IconLeaf,
    description: "Help us plant more trees" 
  }
];
function NavigationItem({ item, isMobile = false }) {
  const router = useRouter();
  
  if (item.type === "dropdown") {
    return (
      <Menu as="div" className="relative">
        {({ open }) => (
          <>
            <Menu.Button
              className={clsx(
                "px-3 py-2 rounded-lg text-sm font-medium transition-colors relative group inline-flex items-center gap-2",
                open
                  ? "bg-green-100 text-green-900 dark:bg-green-900/50 dark:text-green-100"
                  : "hover:bg-green-50 dark:hover:bg-green-900/30"
              )}
            >
              <item.icon size={18} />
              <span>{item.name}</span>
              <IconChevronDown
                className={clsx(
                  "w-4 h-4 transition-transform",
                  open ? "transform rotate-180" : ""
                )}
              />
            </Menu.Button>
            
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute left-0 mt-2 w-56 origin-top-left rounded-lg bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  {item.items.map((subItem) => (
                    <Menu.Item key={subItem.href}>
                      {({ active }) => (
                        <Link
                          href={subItem.href}
                          className={clsx(
                            "flex items-center gap-2 px-4 py-2 text-sm",
                            active ? "bg-gray-100 dark:bg-gray-700" : ""
                          )}
                        >
                          <subItem.icon size={18} />
                          <div>
                            <div>{subItem.name}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              {subItem.description}
                            </div>
                          </div>
                        </Link>
                      )}
                    </Menu.Item>
                  ))}
                </div>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    );
  }

  return (
    <Link
      href={item.href}
      className={clsx(
        "px-3 py-2 rounded-lg text-sm font-medium transition-colors relative group",
        item.href === router.pathname
          ? "bg-green-100 text-green-900 dark:bg-green-900/50 dark:text-green-100"
          : "hover:bg-green-50 dark:hover:bg-green-900/30"
      )}
    >
      <div className="flex items-center gap-2">
        <item.icon size={18} />
        <span>{item.name}</span>
      </div>
      
      <div className="absolute hidden group-hover:block left-1/2 -translate-x-1/2 top-full mt-1 px-3 py-1 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded whitespace-nowrap z-20">
        {item.description}
      </div>
    </Link>
  );
}
export default function Navbar() {
  const router = useRouter();
  const { userStore } = useUserStore();
  const { theme, setTheme } = useTheme();

  return (
    <Disclosure
      as="nav"
      className="sticky top-0 backdrop-blur-lg bg-white/80 dark:bg-base-100/80 z-10 shadow-sm border-b border-gray-200 dark:border-gray-800"
    >
      {({ open }) => (
        <>
          <div className="container px-2 mx-auto sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 duration-300 rounded-md hover:bg-green-50 dark:hover:bg-green-900/30 focus:outline-none">
                  <span className="sr-only">Open menu</span>
                  {open ? (
                    <IconX className="w-6 h-6" />
                  ) : (
                    <IconMenu2 className="w-6 h-6" />
                  )}
                </Disclosure.Button>
              </div>

              <div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
                <Link href="/" className="flex items-center flex-shrink-0 group">
                  <IconTrees size={32} className="text-green-600 dark:text-green-500 transition-transform group-hover:scale-110" />
                  <span className="ml-2 font-semibold text-gray-900 dark:text-gray-100">Tree_Transparency</span>
                </Link>

                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-1">
                    {userStore && userStore.type && navigation.map((item) => (
                      // <Link
                      //   key={item.name}
                      //   href={item.href}
                      //   className={clsx(
                      //     "px-3 py-2 rounded-lg text-sm font-medium transition-colors relative group",
                      //     item.href === router.pathname
                      //       ? "bg-green-100 text-green-900 dark:bg-green-900/50 dark:text-green-100"
                      //       : "hover:bg-green-50 dark:hover:bg-green-900/30"
                      //   )}
                      // >
                      //   <div className="flex items-center gap-2">
                      //     <item.icon size={18} />
                      //     <span>{item.name}</span>
                      //   </div>
                        
                      //   <div className="absolute hidden group-hover:block left-1/2 -translate-x-1/2 top-full mt-1 px-3 py-1 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded whitespace-nowrap z-20">
                      //     {item.description}
                      //   </div>
                      // </Link>
                      <NavigationItem key={item.name} item={item} />
                    ))}
                    
                    {userStore?.type === "Private Companies" && donationOptions.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={clsx(
                          "px-3 py-2 rounded-lg text-sm font-medium transition-colors relative group",
                          item.href === router.pathname
                            ? "bg-green-100 text-green-900"
                            : "hover:bg-green-50"
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <item.icon size={18} />
                          <span>{item.name}</span>
                        </div>
                        <div className="absolute hidden group-hover:block left-1/2 -translate-x-1/2 top-full mt-1 px-3 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap">
                          {item.description}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <div className="flex items-center gap-2">
                  <p></p>
                  <button
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    onClick={() => setTheme(theme === "emerald" ? "forest" : "emerald")}
                  >
                    {theme === "emerald" ? <IconMoon size={20} /> : <IconSun size={20} />}
                  </button>

                  <Link 
                    href="/qr-scanner"
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <IconScan size={20} />
                  </Link>

                  <ProfileDropdown />
                </div>
              </div>
            </div>
          </div>

          {/* <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={clsx(
                    "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                    item.href === router.pathname
                      ? "bg-green-100 text-green-900 dark:bg-green-900/50 dark:text-green-100"
                      : "hover:bg-green-50 dark:hover:bg-green-900/30"
                  )}
                >
                  <item.icon size={20} />
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{item.description}</div>
                  </div>
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel> */}
            {/* Modify mobile menu to handle dropdowns */}
            <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.type === "dropdown" ? (
                    <Menu as="div" className="w-full">
                      <Menu.Button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-green-50 dark:hover:bg-green-900/30">
                        <item.icon size={20} />
                        <div className="flex-1 text-left">
                          <div className="font-medium">{item.name}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">{item.description}</div>
                        </div>
                        <IconChevronDown className="w-4 h-4" />
                      </Menu.Button>
                      <Menu.Items className="mt-1 ml-4 space-y-1">
                        {item.items.map((subItem) => (
                          <Menu.Item key={subItem.href}>
                            <Link
                              href={subItem.href}
                              className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-green-50 dark:hover:bg-green-900/30"
                            >
                              <subItem.icon size={18} />
                              <div>
                                <div className="font-medium">{subItem.name}</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">{subItem.description}</div>
                              </div>
                            </Link>
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Menu>
                  ) : (
                    <NavigationItem item={item} isMobile />
                  )}
                </div>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

function ProfileDropdown() {
  const { theme, setTheme } = useTheme();
  const { userStore, clear } = useUserStore();
  const router = useRouter();
  const { logOutUser, user } = useUserContext();

  const handleSignOut = async () => {
    try {
      await logOutUser(user);
      clear();
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return !userStore.email ? (
    <Link href="/login" className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors">
      Login
    </Link>
  ) : (
    <Menu as="div" className="relative ml-3">
      <div>
        <Menu.Button className="flex items-center justify-center w-10 h-10 rounded-full bg-green-50 hover:bg-green-100 transition-colors">
          <span className="sr-only">Open user menu</span>
          {userStore.photoURL ? (
            <img
              className="w-8 h-8 rounded-full"
              src={userStore.photoURL}
              alt=""
            />
          ) : (
            <IconUser className="w-5 h-5 text-green-700" />
          )}
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 w-56 mt-2 origin-top-right bg-white dark:bg-gray-800 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-3 px-4 border-b dark:border-gray-700">
            <p className="text-sm text-gray-700 dark:text-gray-300">{userStore.username}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{userStore.type}</p>
          </div>

          <div className="py-1">
            {userStore?.type === "NGOs" && ngoProfileOptions.map((item) => (
              <Menu.Item key={item.href}>
                {({ active }) => (
                  <Link
                    href={item.href}
                    className={clsx(
                      "flex items-center gap-2 px-4 py-2 text-sm",
                      active ? "bg-gray-100 dark:bg-gray-700" : ""
                    )}
                  >
                    <item.icon size={18} />
                    <span>{item.name}</span>
                  </Link>
                )}
              </Menu.Item>
            ))}

            {userStore?.type === "Volunteers" && volunteerProfileOptions.map((item) => (
              <Menu.Item key={item.href}>
                {({ active }) => (
                  <Link
                    href={item.href}
                    className={clsx(
                      "flex items-center gap-2 px-4 py-2 text-sm",
                      active ? "bg-gray-100 dark:bg-gray-700" : ""
                    )}
                  >
                    <item.icon size={18} />
                    <span>{item.name}</span>
                  </Link>
                )}
              </Menu.Item>
            ))}

            {commonProfileOptions.map((item) => (
              <Menu.Item key={item.href}>
                {({ active }) => (
                  <Link
                    href={item.href}
                    className={clsx(
                      "flex items-center gap-2 px-4 py-2 text-sm",
                      active ? "bg-gray-100 dark:bg-gray-700" : ""
                    )}
                  >
                    <item.icon size={18} />
                    <span>{item.name}</span>
                  </Link>
                )}
              </Menu.Item>
            ))}
          </div>

          <div className="py-1 border-t dark:border-gray-700">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={handleSignOut}
                  className={clsx(
                    "flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600",
                    active ? "bg-gray-100 dark:bg-gray-700" : ""
                  )}
                >
                  <IconX size={18} />
                  <span>Sign out</span>
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
