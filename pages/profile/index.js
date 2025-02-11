// import { useRouter } from "next/router";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { doc, getDoc } from "firebase/firestore";
// import Loading from "@/components/Loading";
// import { firestore } from "@/services/firebase.js";
// import { useUserContext } from "@/services/userContext";
// import { useUserStore } from "@/store/user";
// import GuardedPage from "@/components/GuardedPage";
// import { IconEdit, IconPaperclip } from "@tabler/icons-react";
// import Header from "@/components/Header";
// import Head from "next/head";

// export default function Profile() {
//   const router = useRouter();

//   const { user } = useUserContext();
//   const { userStore, setUser } = useUserStore();

//   const [loading, setLoading] = useState();

//   useEffect(() => {
//     const redirectToLogin = () => {
//       router.push("/dashboard");
//       return <Loading />;
//     };

//     user ? null : redirectToLogin();

//     if (user) {
//       setLoading(true);

//       const docRef = doc(firestore, "Users", user.email);

//       getDoc(docRef).then((docSnap) => {
//         const user = docSnap.data();

//         if (!docSnap.exists()) router.push("/profile/edit");

//         // window.localStorage.setItem("userStore", JSON.stringify(userStore));
//         setUser({ id: docSnap.id, ...user });
//       });
//     }
//     setLoading(false);
//   }, [user]);

//   const profileFields = [
//     {
//       label: "Name",
//       value: userStore?.username,
//     },
//     {
//       label: "Type",
//       value: userStore?.type,
//     },
//     {
//       label: "Pin Code",
//       value: userStore?.pinCode,
//     },
//     {
//       label: "Phone",
//       value: userStore?.phone,
//     },
//   ];

//   const ngoProfileFields = [
//     {
//       label: "NGO Id",
//       value: userStore?.ngoId,
//     },
//     {
//       label: "NGO Address",
//       value: userStore?.ngoAddress,
//     },
//   ];

//   return (
//     <>
//     <Head>
//         <title>Your Profile</title>
//     </Head>
//     <GuardedPage>
//       <Header title="Profile" />
//       {loading ? (
//         <Loading />
//       ) : (
//         <div className="container px-4 py-6 mx-auto">
//           <Link href="/profile/edit" className="flex justify-end w-full">
//             <div className="btn btn-primary btn-circle">
//               <IconEdit />
//             </div>
//           </Link>
//           <ProfileInformationSection
//             className="py-6"
//             title="Your Profile"
//             subtitle="Personal details and information."
//           >
//             {profileFields.map((field) => (
//               <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
//                 <dt className="text-sm font-medium leading-6 text-base-content">
//                   {field.label}
//                 </dt>
//                 <dd className="mt-1 text-sm leading-6 opacity-80 sm:col-span-2 sm:mt-0">
//                   {field.value}
//                 </dd>
//               </div>
//             ))}
//           </ProfileInformationSection>
//           {userStore?.type === "NGOs" && (
//             <ProfileInformationSection
//               className="py-6"
//               title="Your NGO"
//               subtitle="NGO details and information"
//             >
//               {ngoProfileFields.map((field) => (
//                 <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
//                   <dt className="text-sm font-medium leading-6 text-base-content">
//                     {field.label}
//                   </dt>
//                   <dd className="mt-1 text-sm leading-6 opacity-80 sm:col-span-2 sm:mt-0">
//                     {field.value}
//                   </dd>
//                 </div>
//               ))}
//             </ProfileInformationSection>
//           )}
//         </div>
//       )}
//     </GuardedPage>
//     </>
//   );
// }

// export function ProfileInformationSection({
//   title,
//   subtitle,
//   className,
//   children,
// }) {
//   return (
//     <div className={className}>
//       <div className="px-4 sm:px-0">
//         <h3 className="text-2xl font-semibold leading-7 text-base-content">
//           {title}
//         </h3>
//         <p className="max-w-2xl mt-1 text-sm leading-6 opacity-70">
//           {subtitle}
//         </p>
//       </div>
//       <div className="mt-6 border-t border-base-content">
//         <dl className="divide-y divide-base-content">{children}</dl>
//       </div>
//     </div>
//   );
// }
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import Head from "next/head";
import { User, Edit, Image, ChevronDown } from 'lucide-react';
import { firestore } from "@/services/firebase.js";
import { useUserContext } from "@/services/userContext";
import { useUserStore } from "@/store/user";
import Loading from "@/components/Loading";
import GuardedPage from "@/components/GuardedPage";
import Footer from "@/components/Footer";
export default function Profile() {
  const router = useRouter();
  const { user } = useUserContext();
  const { userStore, setUser } = useUserStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push("/dashboard");
      return;
    }

    const fetchUserData = async () => {
      setLoading(true);
      const docRef = doc(firestore, "Users", user.email);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        router.push("/profile/edit");
        return;
      }

      setUser({ id: docSnap.id, ...docSnap.data() });
      setLoading(false);
    };

    fetchUserData();
  }, [user]);

  if (loading) return <Loading />;

  return (
    <>
      <Head>
        <title>Your Profile</title>
      </Head>
      <GuardedPage>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
          {/* Hero Section */}
          <div className="relative">
            <div className="h-64 relative">
            <img 
            src="images/profile.jpg" 
            alt="Profile Cover"
            className="w-full h-full object-cover"
          />
              <div className="absolute right-4 top-4">
                <Image className="text-white cursor-pointer hover:opacity-80" size={24} />
              </div>
            </div>
            
            {/* Profile Info */}
            <div className="relative py-20 px-4 sm:px-6 lg:px-8 lg:py-20">
              <div className="absolute -mt-16 flex items-end space-x-5">
                <div className="h-32 w-32 rounded-full border-4 border-white dark:border-gray-800 bg-gray-200 dark:bg-gray-800 overflow-hidden">
                  <User className="h-full w-full p-4 text-gray-400" />
                </div>
                <div className="pb-4 flex flex-col sm:flex-row sm:items-center sm:space-x-5">
                  <div>
                    <h1 className="text-2xl font-medium text-gray-900 dark:text-gray-100">Your Profile</h1>
                    <p className="text-gray-500 dark:text-gray-400">Personal details and information</p>
                  </div>
                  <Link href="/profile/edit">
                    <button className="mt-4 h-7 w-20 sm:mt-0 px-4 py-2 bg-green-800 dark:bg-green-600 text-white rounded-lg hover:bg-green-700 dark:hover:bg-green-500 flex items-center">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="mt-22 pb-7 gap-2 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow dark:shadow-lg p-6 space-y-8 dark:border dark:border-gray-700">
              {/* Personal Information */}
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 dark:text-gray-200 opacity-80 text-lg mb-2">Full Name</label>
                  <input 
                    type="text" 
                    value={userStore?.username || ""}
                    className="w-full p-3 bg-gray-50 dark:bg-gray-700 rounded-lg opacity-40 dark:text-gray-300"
                    disabled
                  />
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-200 opacity-80 text-lg mb-2">Type</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={userStore?.type || ""}
                      className="w-full p-3 bg-gray-50 dark:bg-gray-700 rounded-lg opacity-40 dark:text-gray-300"
                      disabled
                    />
                    <ChevronDown className="absolute right-3 top-3 opacity-50 text-gray-500 dark:text-gray-400" />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-200 opacity-80 text-lg mb-2">Pincode</label>
                  <input 
                    type="text" 
                    value={userStore?.pinCode || ""}
                    className="w-full p-3 bg-gray-50 dark:bg-gray-700 rounded-lg opacity-40 dark:text-gray-300"
                    disabled
                  />
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-200 opacity-80 text-lg mb-2">Phone Number</label>
                  <input 
                    type="text" 
                    value={userStore?.phone || ""}
                    className="w-full p-3 bg-gray-50 dark:bg-gray-700 rounded-lg opacity-40 dark:text-gray-300"
                    disabled
                  />
                </div>
              </div>

              {/* NGO Information */}
              {userStore?.type === "NGOs" && (
                <div className="space-y-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h2 className="text-xl font-medium text-gray-900 dark:text-gray-100">NGO Information</h2>
                  
                  <div>
                    <label className="block text-gray-700 dark:text-gray-200 opacity-80 text-lg mb-2">NGO ID</label>
                    <input 
                      type="text" 
                      value={userStore?.ngoId || ""}
                      className="w-full p-3 bg-gray-50 dark:bg-gray-700 rounded-lg opacity-40 dark:text-gray-300"
                      disabled
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 dark:text-gray-200 opacity-80 text-lg mb-2">NGO Address</label>
                    <textarea 
                      value={userStore?.ngoAddress || ""}
                      className="w-full p-3 bg-gray-50 dark:bg-gray-700 rounded-lg opacity-40 dark:text-gray-300"
                      disabled
                      rows={3}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </GuardedPage>
      <Footer />
    </>
  );
}