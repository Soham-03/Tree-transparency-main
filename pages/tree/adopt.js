// import { useEffect, useState } from "react";
// import {
//   getDoc,
//   collection,
//   deleteDoc,
//   doc,
//   updateDoc,
//   query,
//   orderBy,
//   where,
// } from "firebase/firestore";
// import { ethers } from "ethers";
// import { firestore } from "@/services/firebase";
// import { useUserContext } from "@/services/userContext";
// import TreeToken from "@/artifacts/contracts/TreeNFT.sol/TreeToken.json";
// import Link from "next/link";
// import { treeContractAddress } from "@/constants/contract-address";
// import Head from "next/head";
// import Image from "next/image";
// import { useCollectionOnce } from "react-firebase-hooks/firestore";
// import Loading from "@/components/Loading";
// import { IconExternalLink, IconSearch, IconFilter} from "@tabler/icons-react";
// import TreeCard from "@/components/TreeCard";

// export default function () {
//   const [trees, loadingTrees, errorTrees, reloadTrees] = useCollectionOnce(
//     collection(firestore, "Trees")
//   );

//   const { user } = useUserContext();
//   const [searchQuery, setSearchQuery] = useState("");
//   const [ageFilter, setAgeFilter] = useState("");
//   const [speciesFilter, setSpeciesFilter] = useState("");

//   const adoptTree = async (id) => {
//     const treeDocRef = doc(firestore, "Trees", id);
//     const treeSnapshot = await getDoc(treeDocRef);
//     const treeData = treeSnapshot.data();

//     const prevOwner = treeData?.prevOwner || [];
//     const prevOwnerEmails = prevOwner.map(reference => reference.id);

//     if (prevOwnerEmails.includes(user.email)) {
//       alert("You had previously adopted this tree");
//     } else {
//       await updateDoc(treeDocRef, {
//         isAdopted: true,
//         adoptedBy: doc(firestore, `Users/${user.email}`),
//       });
//       reloadTrees();
//       alert("Adopted Tree");
//     }
//   };

//   const handleSearch = (event) => {
//     setSearchQuery(event.target.value);
//   };

//   const handleFilterChange = (event) => {
//     setAgeFilter(event.target.value);
//   };

//   const handleSpeciesFilterChange = (event) => {
//     setSpeciesFilter(event.target.value);
//   };

//   return (
//     <>
//       <Head>
//         <title>Adopt Trees</title>
//       </Head>
//       <div className="container py-6 mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex flex-row justify-center items-center">
//         <div class="relative">
//   <input
//     class="appearance-none border-2 pl-10 border-gray-300 hover:border-gray-400 transition-colors rounded-md w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-green-600 focus:border-green-600 focus:shadow-outline"
//     id="username"
//     type="text"
//     placeholder="Search..."
//     value={searchQuery}
//     onChange={handleSearch}
//   />
//   <div class="absolute right-0 inset-y-0 flex items-center">
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       class="-ml-1 mr-3 h-5 w-5 text-gray-400 hover:text-gray-500"
//       fill="none"
//       viewBox="0 0 24 24"
//       stroke="currentColor"
//     >
//       <path
//         stroke-linecap="round"
//         stroke-linejoin="round"
//         stroke-width="2"
//         d="M6 18L18 6M6 6l12 12"
//       />
//     </svg>
//   </div>

//   <div class="absolute left-2 opacity-50 inset-y-0 flex items-center">
//   <IconSearch />
  
//   </div>
// </div>
         
//           <div className="flex justify-between items-center gap-4 px-6 ">
//             <select
//               className="border border-gray-300 px-4 py-2 ml-6 rounded-md  focus:ring focus:ring-green-200"
//               value={ageFilter}
//               onChange={handleFilterChange}
//             >
//               <option value="">Select Age</option>
//               {[...Array(10).keys()].map(year => (
//                 <option key={year + 1} value={year + 1}>{year + 1} year{year === 0 ? '' : 's'} old</option>
//               ))}
//               <option value="10+">10+ years old</option>
//             </select>
//             <select
//               className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-green-200"
//               value={speciesFilter}
//               onChange={handleSpeciesFilterChange}
//             >
//               <option value="">Select Species</option>
//               <option value="Medicinal Plant">Medicinal Plant</option>
//               <option value="Fruit Plant">Fruit Plant</option>
//               <option value="Shrubs">Shrubs</option>
//             </select>
//             <IconFilter />
//           </div>
//         </div>
//         {loadingTrees ? (
//           <Loading />
//         ) : (
//           <div className="grid grid-cols-1 mt-6 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
//             {errorTrees && <strong>Error: {JSON.stringify(error)}</strong>}
//             {trees &&
//               trees.docs
//                 .filter((tree) => {
//                   const treeData = tree.data();
//                   const nameMatch = treeData.name.toLowerCase().includes(searchQuery.toLowerCase());
//                   const ageMatch = !ageFilter || (ageFilter === "10+" && treeData.createdAt && Date.now() - treeData.createdAt.toMillis() >= 10 * 365 * 24 * 60 * 60 * 1000) || (ageFilter !== "10+" && treeData.createdAt && Date.now() - treeData.createdAt.toMillis() < (parseInt(ageFilter) * 365 * 24 * 60 * 60 * 1000) && Date.now() - treeData.createdAt.toMillis() >= ((parseInt(ageFilter) - 1) * 365 * 24 * 60 * 60 * 1000));
//                   const speciesMatch = !speciesFilter || treeData.species === speciesFilter;
//                   return nameMatch && ageMatch && speciesMatch && !treeData.adoptedBy && treeData.isVerified;
//                 })
//                 .map((tree) => (
//                   <div key={tree.id}>
//                     {/* Tree Card Component can be used for better code structure */}
//                     <div className="w-full overflow-hidden duration-200 bg-gray-200 rounded-md min-h-80 aspect-h-1 aspect-w-1 lg:aspect-none group-hover:opacity-75 lg:h-80">
//                       <Image
//                         width={200}
//                         height={320}
//                         src={tree.data().imageUrl}
//                         alt={tree.data().name}
//                         className="object-cover object-center w-full h-full lg:h-full lg:w-full"
//                       />
//                     </div>
//                     <div className="grid gap-2">
//                       <div className="flex justify-between mt-4">
//                         <div>
//                           <h3 className="font-bold text-md text-base-content">
//                             <div>{tree.data().name}</div>
//                           </h3>
//                           <p className="mt-1 text-sm text-base-content opacity-70">
//                             {tree.data().species} &middot; {tree.data().type}
//                           </p>
//                         </div>
//                         <div>
//                           <Link
//                             href={`/tree/${tree.id}`}
//                             className="btn btn-circle btn-md"
//                           >
//                             <IconExternalLink />
//                           </Link>
//                         </div>
//                       </div>
//                       {tree.data().adoptedBy ? (
//                         <button className="btn" disabled>
//                           Adopted
//                         </button>
//                       ) : (
//                         <button
//                           onClick={() => adoptTree(tree.id)}
//                           className="btn btn-primary"
//                         >
//                           Adopt
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// import { useEffect, useState } from 'react';
// import {
//   getDoc,
//   collection,
//   doc,
//   updateDoc,
//   query,
//   orderBy,
//   where,
// } from 'firebase/firestore';
// import { firestore } from '@/services/firebase';
// import { useUserContext } from '@/services/userContext';
// import Link from 'next/link';
// import Head from 'next/head';
// import Image from 'next/image';
// import { useCollectionOnce } from 'react-firebase-hooks/firestore';
// import Loading from '@/components/Loading';
// import { IconExternalLink, IconSearch, IconFilter } from '@tabler/icons-react';

// export default function AdoptTree() {
//   const [trees, loadingTrees, errorTrees, reloadTrees] = useCollectionOnce(
//     collection(firestore, 'Trees')
//   );
  
//   const { user } = useUserContext();
//   const [searchQuery, setSearchQuery] = useState('');
//   const [ageFilter, setAgeFilter] = useState('');
//   const [speciesFilter, setSpeciesFilter] = useState('');

//   const adoptTree = async (id) => {
//     try {
//       const treeDocRef = doc(firestore, 'Trees', id);
//       const treeSnapshot = await getDoc(treeDocRef);
//       const treeData = treeSnapshot.data();
  
//       const prevOwner = treeData?.prevOwner || [];
//       const prevOwnerEmails = prevOwner.map((reference) => reference.id);
  
//       if (prevOwnerEmails.includes(user.email)) {
//         alert('You had previously adopted this tree');
//       } else {
//         await updateDoc(treeDocRef, {
//           isAdopted: true,
//           adoptedBy: doc(firestore, `Users/${user.email}`),
//         });
//         reloadTrees();
//         alert('Adopted Tree');
//       }
//     } catch (error) {
//       console.error('Error adopting tree:', error);
//       alert('There was an error adopting the tree. Please try again.');
//     }
//   };
  

//   const handleSearch = (event) => {
//     setSearchQuery(event.target.value);
//   };

//   const handleFilterChange = (event) => {
//     setAgeFilter(event.target.value);
//   };

//   const handleSpeciesFilterChange = (event) => {
//     setSpeciesFilter(event.target.value);
//   };

//   return (
//     <>
//       <Head>
//         <title>Adopt Trees</title>
//       </Head>
//       <div className="container py-6 mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex flex-row justify-center items-center">
//           <div className="relative">
//             <input
//               className="appearance-none border-2 pl-10 border-gray-300 hover:border-gray-400 transition-colors rounded-md w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-green-600 focus:border-green-600 focus:shadow-outline"
//               id="search"
//               type="text"
//               placeholder="Search..."
//               value={searchQuery}
//               onChange={handleSearch}
//             />
//             <div className="absolute right-0 inset-y-0 flex items-center">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="-ml-1 mr-3 h-5 w-5 text-gray-400 hover:text-gray-500"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             </div>

//             <div className="absolute left-2 opacity-50 inset-y-0 flex items-center">
//               <IconSearch />
//             </div>
//           </div>

//           <div className="flex justify-between items-center gap-4 px-6">
//             <select
//               className="border border-gray-300 px-4 py-2 ml-6 rounded-md  focus:ring focus:ring-green-200"
//               value={ageFilter}
//               onChange={handleFilterChange}
//             >
//               <option value="">Select Age</option>
//               {[...Array(10).keys()].map((year) => (
//                 <option key={year + 1} value={year + 1}>
//                   {year + 1} year{year === 0 ? '' : 's'} old
//                 </option>
//               ))}
//               <option value="10+">10+ years old</option>
//             </select>
//             <select
//               className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-green-200"
//               value={speciesFilter}
//               onChange={handleSpeciesFilterChange}
//             >
//               <option value="">Select Species</option>
//               <option value="Medicinal Plant">Medicinal Plant</option>
//               <option value="Fruit Plant">Fruit Plant</option>
//               <option value="Shrubs">Shrubs</option>
//             </select>
//             <IconFilter />
//           </div>
//         </div>

//         {loadingTrees ? (
//           <Loading />
//         ) : (
//           <div className="grid grid-cols-1 mt-6 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
//             {errorTrees && <strong>Error: {JSON.stringify(error)}</strong>}
//             {trees &&
//               trees.docs
//                 .filter((tree) => {
//                   const treeData = tree.data();
//                   const nameMatch = treeData.name
//                     .toLowerCase()
//                     .includes(searchQuery.toLowerCase());
//                   const ageMatch =
//                     !ageFilter ||
//                     (ageFilter === '10+' &&
//                       treeData.createdAt &&
//                       Date.now() - treeData.createdAt.toMillis() >=
//                         10 * 365 * 24 * 60 * 60 * 1000) ||
//                     (ageFilter !== '10+' &&
//                       treeData.createdAt &&
//                       Date.now() - treeData.createdAt.toMillis() <
//                         parseInt(ageFilter) * 365 * 24 * 60 * 60 * 1000);
//                   const speciesMatch = !speciesFilter
//                     ? true
//                     : treeData.species === speciesFilter;

//                   return nameMatch && ageMatch && speciesMatch;
//                 })
//                 .map((tree) => {
//                   const treeData = tree.data();
//                   return (
//                     <div
//                       key={tree.id}
//                       className="group relative border border-gray-200 rounded-lg shadow-sm p-4"
//                     >
//                       <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
//                         <Image
//                           src={
//                             treeData.imageUrl ||
//                             'https://via.placeholder.com/600x600'
//                           }
//                           alt={treeData.name}
//                           layout="fill"
//                           objectFit="cover"
//                           className="w-full h-full object-center object-cover group-hover:opacity-75"
//                         />
//                       </div>
//                       <div className="mt-4 flex justify-between">
//                         <div>
//                           <h3 className="text-lg font-medium text-gray-900">
//                             <Link href={`tree/${tree.id}`}>
//                               <span aria-hidden="true" className="absolute inset-0" />
//                               {treeData.name}
//                             </Link>
//                           </h3>
//                           <p className="mt-1 text-sm text-gray-700">
//                             {treeData.species}
//                           </p>
//                         </div>
//                         <p className="text-sm font-medium text-gray-900">
//                           {treeData.age} years
//                         </p>
//                       </div>

//                       {treeData.isAdopted ? (
//                         <button
//                           className="mt-4 w-full bg-gray-400 text-white py-2 px-4 rounded-md"
//                           disabled
//                         >
//                           Already Adopted
//                         </button>
//                       ) : (
//                         <button
//                           className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md"
//                           onClick={() => adoptTree(tree.id)}
//                         >
//                           Adopt this Tree
//                         </button>
//                       )}
//                     </div>
//                   );
//                 })}
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// import { useEffect, useState } from 'react';
// import {
//   getDoc,
//   collection,
//   doc,
//   updateDoc,
// } from 'firebase/firestore';
// import { firestore } from '@/services/firebase';
// import { useUserContext } from '@/services/userContext';
// import Link from 'next/link';
// import Head from 'next/head';
// import Image from 'next/image';
// import { useCollectionOnce } from 'react-firebase-hooks/firestore';
// import Loading from '@/components/Loading';
// import { IconExternalLink, IconSearch, IconFilter } from '@tabler/icons-react';

// export default function AdoptTree() {
//   const [trees, loadingTrees, errorTrees, reloadTrees] = useCollectionOnce(
//     collection(firestore, 'Trees')
//   );

//   const { user } = useUserContext();
//   const [searchQuery, setSearchQuery] = useState('');
//   const [ageFilter, setAgeFilter] = useState('');
//   const [speciesFilter, setSpeciesFilter] = useState('');

//   const adoptTree = async (id) => {
//     try {
//       const treeDocRef = doc(firestore, 'Trees', id);
//       const treeSnapshot = await getDoc(treeDocRef);
//       const treeData = treeSnapshot.data();

//       const prevOwner = treeData?.prevOwner || [];
//       const prevOwnerEmails = prevOwner.map((reference) => reference.id);

//       if (prevOwnerEmails.includes(user.email)) {
//         alert('You had previously adopted this tree');
//       } else {
//         await updateDoc(treeDocRef, {
//           isAdopted: true,
//           adoptedBy: doc(firestore, `Users/${user.email}`),
//         });
//         reloadTrees();
//         alert('Adopted Tree');
//       }
//     } catch (error) {
//       console.error('Error adopting tree:', error);
//       alert('There was an error adopting the tree. Please try again.');
//     }
//   };

//   const handleSearch = (event) => {
//     setSearchQuery(event.target.value);
//   };

//   const handleFilterChange = (event) => {
//     setAgeFilter(event.target.value);
//   };

//   const handleSpeciesFilterChange = (event) => {
//     setSpeciesFilter(event.target.value);
//   };

//   return (
//     <>
//       <Head>
//         <title>Adopt Trees</title>
//       </Head>
//       <div className="container py-6 mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex flex-row justify-center items-center">
//           <div className="relative">
//             <input
//               className="appearance-none border-2 pl-10 border-gray-300 hover:border-gray-400 transition-colors rounded-md w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-green-600 focus:border-green-600 focus:shadow-outline"
//               id="search"
//               type="text"
//               placeholder="Search..."
//               value={searchQuery}
//               onChange={handleSearch}
//             />
//             <div className="absolute right-0 inset-y-0 flex items-center">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="-ml-1 mr-3 h-5 w-5 text-gray-400 hover:text-gray-500"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             </div>

//             <div className="absolute left-2 opacity-50 inset-y-0 flex items-center">
//               <IconSearch />
//             </div>
//           </div>

//           <div className="flex justify-between items-center gap-4 px-6">
//             <select
//               className="border border-gray-300 px-4 py-2 ml-6 rounded-md  focus:ring focus:ring-green-200"
//               value={ageFilter}
//               onChange={handleFilterChange}
//             >
//               <option value="">Select Age</option>
//               {[...Array(10).keys()].map((year) => (
//                 <option key={year + 1} value={year + 1}>
//                   {year + 1} year{year === 0 ? '' : 's'} old
//                 </option>
//               ))}
//               <option value="10+">10+ years old</option>
//             </select>
//             <select
//               className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-green-200"
//               value={speciesFilter}
//               onChange={handleSpeciesFilterChange}
//             >
//               <option value="">Select Species</option>
//               <option value="Medicinal Plant">Medicinal Plant</option>
//               <option value="Fruit Plant">Fruit Plant</option>
//               <option value="Shrubs">Shrubs</option>
//             </select>
//             <IconFilter />
//           </div>
//         </div>

//         {loadingTrees ? (
//           <Loading />
//         ) : (
//           <div className="grid grid-cols-1 mt-6 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
//             {errorTrees && <strong>Error: {JSON.stringify(errorTrees)}</strong>}
//             {trees &&
//               trees.docs
//                 .filter((tree) => {
//                   const treeData = tree.data();
//                   const nameMatch = treeData.name
//                     .toLowerCase()
//                     .includes(searchQuery.toLowerCase());
//                   const ageMatch =
//                     !ageFilter ||
//                     (ageFilter === '10+' &&
//                       treeData.createdAt &&
//                       Date.now() - treeData.createdAt.toMillis() >=
//                         10 * 365 * 24 * 60 * 60 * 1000) ||
//                     (ageFilter !== '10+' &&
//                       treeData.createdAt &&
//                       Date.now() - treeData.createdAt.toMillis() <
//                         parseInt(ageFilter) * 365 * 24 * 60 * 60 * 1000);
//                   const speciesMatch = !speciesFilter
//                     ? true
//                     : treeData.species === speciesFilter;

//                   return nameMatch && ageMatch && speciesMatch && !treeData.isAdopted;
//                 })
//                 .map((tree) => {
//                   const treeData = tree.data();
//                   return (
//                     <div
//                       key={tree.id}
//                       className="group relative border border-gray-200 rounded-lg shadow-sm p-4"
//                     >
//                       <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
//                         <Image
//                           src={
//                             treeData.imageUrl ||
//                             'https://via.placeholder.com/600x600'
//                           }
//                           alt={treeData.name}
//                           layout="fill"
//                           objectFit="cover"
//                           className="w-full h-full object-center object-cover group-hover:opacity-75"
//                         />
//                       </div>
//                       <div className="mt-4 flex justify-between">
//                         <div>
//                           <h3 className="text-lg font-medium text-gray-900">
//                             {treeData.name}
//                           </h3>
//                           <p className="mt-1 text-sm text-gray-700">
//                             {treeData.species}
//                           </p>
//                         </div>
//                         <p className="text-sm font-medium text-gray-900">
//                           {treeData.age} years
//                         </p>
//                       </div>

//                       {treeData.isAdopted ? (
//                         <button
//                           className="mt-4 w-full bg-gray-400 text-white py-2 px-4 rounded-md"
//                           disabled
//                         >
//                           Already Adopted
//                         </button>
//                       ) : (
//                         <button
//                           className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md"
//                           onClick={() => adoptTree(tree.id)}
//                         >
//                           Adopt this Tree
//                         </button>
//                       )}
//                     </div>
//                   );
//                 })}
//           </div>
//         )}
//       </div>
//     </>
//   );
// }


// import { useEffect, useState } from 'react';
// import {
//   getDoc,
//   collection,
//   doc,
//   updateDoc,
// } from 'firebase/firestore';
// import { firestore } from '@/services/firebase';
// import { useUserContext } from '@/services/userContext';
// import Link from 'next/link';
// import Head from 'next/head';
// import Image from 'next/image';
// import { useCollectionOnce } from 'react-firebase-hooks/firestore';
// import Loading from '@/components/Loading';
// import { IconExternalLink, IconSearch, IconFilter } from '@tabler/icons-react';

// export default function AdoptTree() {
//   const [trees, loadingTrees, errorTrees, reloadTrees] = useCollectionOnce(
//     collection(firestore, 'Trees')
//   );

//   const { user } = useUserContext();
//   const [searchQuery, setSearchQuery] = useState('');
//   const [ageFilter, setAgeFilter] = useState('');
//   const [speciesFilter, setSpeciesFilter] = useState('');

//   const adoptTree = async (id) => {
//     try {
//       const treeDocRef = doc(firestore, 'Trees', id);
//       const treeSnapshot = await getDoc(treeDocRef);
//       const treeData = treeSnapshot.data();

//       const prevOwner = treeData?.prevOwner || [];
//       const prevOwnerEmails = prevOwner.map((reference) => reference.id);

//       if (prevOwnerEmails.includes(user.email)) {
//         alert('You had previously adopted this tree');
//       } else {
//         await updateDoc(treeDocRef, {
//           isAdopted: true,
//           adoptedBy: doc(firestore, `Users/${user.email}`),
//         });
//         reloadTrees();
//         alert('Adopted Tree');
//       }
//     } catch (error) {
//       console.error('Error adopting tree:', error);
//       alert('There was an error adopting the tree. Please try again.');
//     }
//   };

//   const handleSearch = (event) => {
//     setSearchQuery(event.target.value);
//   };

//   const handleFilterChange = (event) => {
//     setAgeFilter(event.target.value);
//   };

//   const handleSpeciesFilterChange = (event) => {
//     setSpeciesFilter(event.target.value);
//   };

//   return (
//     <>
//       <Head>
//         <title>Adopt Trees</title>
//       </Head>
//       <div className="container py-6 mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex flex-row justify-center items-center">
//           <div className="relative">
//             <input
//               className="appearance-none border-2 pl-10 border-gray-300 hover:border-gray-400 transition-colors rounded-md w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-green-600 focus:border-green-600 focus:shadow-outline"
//               id="search"
//               type="text"
//               placeholder="Search..."
//               value={searchQuery}
//               onChange={handleSearch}
//             />
//             <div className="absolute right-0 inset-y-0 flex items-center">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="-ml-1 mr-3 h-5 w-5 text-gray-400 hover:text-gray-500"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             </div>

//             <div className="absolute left-2 opacity-50 inset-y-0 flex items-center">
//               <IconSearch />
//             </div>
//           </div>

//           <div className="flex justify-between items-center gap-4 px-6">
//             <select
//               className="border border-gray-300 px-4 py-2 ml-6 rounded-md  focus:ring focus:ring-green-200"
//               value={ageFilter}
//               onChange={handleFilterChange}
//             >
//               <option value="">Select Age</option>
//               {[...Array(10).keys()].map((year) => (
//                 <option key={year + 1} value={year + 1}>
//                   {year + 1} year{year === 0 ? '' : 's'} old
//                 </option>
//               ))}
//               <option value="10+">10+ years old</option>
//             </select>
//             <select
//               className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-green-200"
//               value={speciesFilter}
//               onChange={handleSpeciesFilterChange}
//             >
//               <option value="">Select Species</option>
//               <option value="Medicinal Plant">Medicinal Plant</option>
//               <option value="Fruit Plant">Fruit Plant</option>
//               <option value="Shrubs">Shrubs</option>
//             </select>
//             <IconFilter />
//           </div>
//         </div>

//         {loadingTrees ? (
//           <Loading />
//         ) : (
//           <div className="grid grid-cols-1 mt-6 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
//             {errorTrees && <strong>Error: {JSON.stringify(errorTrees)}</strong>}
//             {trees &&
//               trees.docs
//                 .filter((tree) => {
//                   const treeData = tree.data();
//                   const nameMatch = treeData.name
//                     .toLowerCase()
//                     .includes(searchQuery.toLowerCase());
//                   const ageMatch =
//                     !ageFilter ||
//                     (ageFilter === '10+' &&
//                       treeData.createdAt &&
//                       Date.now() - treeData.createdAt.toMillis() >=
//                         10 * 365 * 24 * 60 * 60 * 1000) ||
//                     (ageFilter !== '10+' &&
//                       treeData.createdAt &&
//                       Date.now() - treeData.createdAt.toMillis() <
//                         parseInt(ageFilter) * 365 * 24 * 60 * 60 * 1000);
//                   const speciesMatch = !speciesFilter
//                     ? true
//                     : treeData.species === speciesFilter;

//                   return nameMatch && ageMatch && speciesMatch && !treeData.isAdopted;
//                 })
//                 .map((tree) => {
//                   const treeData = tree.data();
//                   return (
//                     <div
//                       key={tree.id}
//                       className="group relative border border-gray-200 rounded-lg shadow-sm p-4"
//                     >
//                       <Link href={`/tree/${tree.id}`}>
//                         <a>
//                           <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
//                             <Image
//                               src={
//                                 treeData.imageUrl ||
//                                 'https://via.placeholder.com/600x600'
//                               }
//                               alt={treeData.name}
//                               layout="fill"
//                               objectFit="cover"
//                               className="w-full h-full object-center object-cover group-hover:opacity-75"
//                             />
//                           </div>
//                         </a>
//                       </Link>
//                       <div className="mt-4 flex justify-between">
//                         <div>
//                           <h3 className="text-lg font-medium text-gray-900">
//                             {treeData.name}
//                           </h3>
//                           <p className="mt-1 text-sm text-gray-700">
//                             {treeData.species}
//                           </p>
//                         </div>
//                         <p className="text-sm font-medium text-gray-900">
//                           {treeData.age} years
//                         </p>
//                       </div>

//                       {treeData.isAdopted ? (
//                         <button
//                           className="mt-4 w-full bg-gray-400 text-white py-2 px-4 rounded-md"
//                           disabled
//                         >
//                           Already Adopted
//                         </button>
//                       ) : (
//                         <button
//                           className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md"
//                           onClick={() => adoptTree(tree.id)}
//                         >
//                           Adopt this Tree
//                         </button>
//                       )}
//                     </div>
//                   );
//                 })}
//           </div>
//         )}
//       </div>
//     </>
//   );
// }


import { useEffect, useState } from 'react';
import {
  getDoc,
  collection,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { firestore } from '@/services/firebase';
import { useUserContext } from '@/services/userContext';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import { useCollectionOnce } from 'react-firebase-hooks/firestore';
import Loading from '@/components/Loading';
import { Search, Filter, Leaf, X } from 'lucide-react';
import { IconExternalLink, IconSearch, IconFilter } from '@tabler/icons-react';
import Footer from '@/components/Footer';
export default function AdoptTree() {
  const [trees, loadingTrees, errorTrees, reloadTrees] = useCollectionOnce(
    collection(firestore, 'Trees')
  );

  const { user } = useUserContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [ageFilter, setAgeFilter] = useState('');
  const [speciesFilter, setSpeciesFilter] = useState('');

  const adoptTree = async (id) => {
    try {
      const treeDocRef = doc(firestore, 'Trees', id);
      const treeSnapshot = await getDoc(treeDocRef);
      const treeData = treeSnapshot.data();

      const prevOwner = treeData?.prevOwner || [];
      const prevOwnerEmails = prevOwner.map((reference) => reference.id);

      if (prevOwnerEmails.includes(user.email)) {
        alert('You had previously adopted this tree');
      } else {
        await updateDoc(treeDocRef, {
          isAdopted: true,
          adoptedBy: doc(firestore, `Users/${user.email}`),
        });
        reloadTrees();
        alert('Adopted Tree');
      }
    } catch (error) {
      console.error('Error adopting tree:', error);
      alert('There was an error adopting the tree. Please try again.');
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterChange = (event) => {
    setAgeFilter(event.target.value);
  };

  const handleSpeciesFilterChange = (event) => {
    setSpeciesFilter(event.target.value);
  };

  return (
    <>
      <Head>
        <title>Adopt Trees</title>
      </Head>
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
      {/* <HeroSection /> */}
      {/* <div className="container py-6 mx-auto px-4 sm:px-6 lg:px-8"> */}
        {/* <div className="flex flex-row justify-center items-center">
          <div className="relative">
            <input
              className="appearance-none border-2 pl-10 border-gray-300 hover:border-gray-400 transition-colors rounded-md w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-green-600 focus:border-green-600 focus:shadow-outline"
              id="search"
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearch}
            />
            <div className="absolute right-0 inset-y-0 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="-ml-1 mr-3 h-5 w-5 text-gray-400 hover:text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>

            <div className="absolute left-2 opacity-50 inset-y-0 flex items-center">
              <IconSearch />
            </div>
          </div>

          <div className="flex justify-between items-center gap-4 px-6">
            <select
              className="border border-gray-300 px-4 py-2 ml-6 rounded-md focus:ring focus:ring-green-200"
              value={ageFilter}
              onChange={handleFilterChange}
            >
              <option value="">Select Age</option>
              {[...Array(10).keys()].map((year) => (
                <option key={year + 1} value={year + 1}>
                  {year + 1} year{year === 0 ? '' : 's'} old
                </option>
              ))}
              <option value="10+">10+ years old</option>
            </select>
            <select
              className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-green-200"
              value={speciesFilter}
              onChange={handleSpeciesFilterChange}
            >
              <option value="">Select Species</option>
              <option value="Medicinal Plant">Medicinal Plant</option>
              <option value="Fruit Plant">Fruit Plant</option>
              <option value="Shrubs">Shrubs</option>
            </select>
            <IconFilter />
          </div>
        </div> */}
        {/* //navbar */}
        {/* <nav className="h-20 top-0  left-0 w-full bg-[#7B996C] z-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
    <div className="flex flex-row justify-center items-center h-10 sm:h-16">
          <div className="relative gap-7">
            <input
              className="appearance-none border-2 pl-10 border-gray-300 hover:border-gray-400 transition-colors rounded-md w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-green-600 focus:border-green-600 focus:shadow-outline"
              id="search"
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearch}
            />
            <div className="absolute right-0 inset-y-0 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="-ml-1 mr-3 h-5 w-5 text-gray-400 hover:text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>

            <div className="absolute left-2 opacity-50 inset-y-0 flex items-center">
              <IconSearch />
            </div>
          </div>

          <div className="flex justify-between items-center gap-4 px-6">
            <select
              className="border border-gray-300 px-4 py-2 ml-6 rounded-md focus:ring focus:ring-green-200"
              value={ageFilter}
              onChange={handleFilterChange}
            >
              <option value="">Select Age</option>
              {[...Array(10).keys()].map((year) => (
                <option key={year + 1} value={year + 1}>
                  {year + 1} year{year === 0 ? '' : 's'} old
                </option>
              ))}
              <option value="10+">10+ years old</option>
            </select>
            <select
              className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-green-200"
              value={speciesFilter}
              onChange={handleSpeciesFilterChange}
            >
              <option value="">Select Species</option>
              <option value="Medicinal Plant">Medicinal Plant</option>
              <option value="Fruit Plant">Fruit Plant</option>
              <option value="Shrubs">Shrubs</option>
            </select>
            <IconFilter />
          </div>
        </div>
    </div>
</nav> */}

    <nav className="h-20 top-0 left-0 w-full  bg-[#7B996C] shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-center h-24 space-x-8">
          {/* Search Section */}
          <div className="relative w-96">
            <input
              className="w-full h-11 pl-12 pr-12 rounded-xl border-2 border-gray-200 
                         hover:border-green-400 focus:border-green-500 focus:ring-2 
                         focus:ring-green-400 focus:ring-opacity-50 transition-all
                         duration-200 bg-white/90 backdrop-blur-sm"
              id="search"
              type="text"
              placeholder="Search plants..."
              value={searchQuery}
              onChange={handleSearch}
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 hover:bg-gray-100 p-1 rounded-full transition-colors">
              <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
            </button>
          </div>

          {/* Filters Section */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <Leaf className="h-5 w-5 text-green-100" />
              <select
                className="h-11 px-4 rounded-xl border-2 border-gray-200 
                           hover:border-green-400 focus:border-green-500 
                           focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 
                           transition-all duration-200 bg-white/90 backdrop-blur-sm
                           cursor-pointer"
                value={ageFilter}
                onChange={handleFilterChange}
              >
                <option value="">Plant Age</option>
                {[...Array(10).keys()].map((year) => (
                  <option key={year + 1} value={year + 1}>
                    {year + 1} year{year === 0 ? '' : 's'} old
                  </option>
                ))}
                <option value="10+">10+ years old</option>
              </select>
            </div>

            <div className="flex items-center space-x-3">
              <Filter className="h-5 w-5 text-green-100" />
              <select
                className="h-11 px-4 rounded-xl border-2 border-gray-200 
                           hover:border-green-400 focus:border-green-500 
                           focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 
                           transition-all duration-200 bg-white/90 backdrop-blur-sm
                           cursor-pointer"
                value={speciesFilter}
                onChange={handleSpeciesFilterChange}
              >
                <option value="">Plant Species</option>
                <option value="Medicinal Plant">Medicinal Plant</option>
                <option value="Fruit Plant">Fruit Plant</option>
                <option value="Shrubs">Shrubs</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </nav>
  


        {loadingTrees ? (
          <Loading />
        ) : (
          
            <div className="w-full p-4 bg-white">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {errorTrees && <strong>Error: {JSON.stringify(errorTrees)}</strong>}
            {trees &&
              trees.docs
                .filter((tree) => {
                  const treeData = tree.data();
                  const nameMatch = treeData.name
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase());
                  const ageMatch =
                    !ageFilter ||
                    (ageFilter === '10+' &&
                      treeData.createdAt &&
                      Date.now() - treeData.createdAt.toMillis() >=
                        10 * 365 * 24 * 60 * 60 * 1000) ||
                    (ageFilter !== '10+' &&
                      treeData.createdAt &&
                      Date.now() - treeData.createdAt.toMillis() <
                        parseInt(ageFilter) * 365 * 24 * 60 * 60 * 1000);
                  const speciesMatch = !speciesFilter
                    ? true
                    : treeData.species === speciesFilter;

                  return nameMatch && ageMatch && speciesMatch;
                })
                .map((tree) => {
                  const treeData = tree.data();
                  return (
                    <div
                      key={tree.id}
                      className="w-full"
                    >
                      <div
                     
                      className="border border-gray-200 rounded-lg shadow-sm p-4 h-full transition-transform hover:scale-105" style={{background: '#E6ECE4'}}
                    >
                      <Link href={`/tree/${tree.id}`} passHref>
                        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8 cursor-pointer">
                          <Image
                            src={
                              treeData.imageUrl ||
                              'https://via.placeholder.com/600x600'
                            }
                            alt={treeData.name}
                            layout="fill"
                            objectFit="cover"
                            className="w-full h-full object-center object-cover group-hover:opacity-75"
                          />
                        </div>
                      </Link>
                      <div className="mt-4 flex justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">
                            {treeData.name}
                          </h3>
                          <p className="mt-1 text-sm text-gray-700">
                            {treeData.species}
                          </p>
                        </div>
                        <p className="text-sm font-medium text-gray-900">
                          {treeData.age} years
                        </p>
                      </div>

                      {treeData.isAdopted ? (
                        <button
                          className="mt-4 w-full bg-gray-400 text-white py-2 px-4 rounded-md"
                          disabled
                        >
                          Already Adopted
                        </button>
                      ) : (
                        <button
                          className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md"
                          onClick={() => adoptTree(tree.id)}
                        >
                          Adopt this Tree
                        </button>
                      )}
                    </div>
                    </div>
                  );
                })}
            </div>
            </div>
          
        )}
      {/* </div> */}
      <Footer />
    </>
  );
}


