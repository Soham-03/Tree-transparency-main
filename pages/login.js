// import { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import { useForm } from "react-hook-form";
// import {
//   IconX,
//   IconAlertCircle,
//   IconTrees,
//   IconBrandGoogle,
//   IconBrandTwitter,
//   IconCircleCheck,
//   IconAlertTriangle,
// } from "@tabler/icons-react";
// import { useUserContext } from "@/services/userContext";
// import Banner from "@/components/Banner";
// import { useSignInWithGoogle } from "react-firebase-hooks/auth";
// import { auth } from "@/services/firebase";
// import { useUserStore } from "@/store/user";
// import Head from "next/head";

// export default function Login() {
//   const [signInWithGoogle, googleUser] = useSignInWithGoogle(auth);
//   const { userStore, setUser } = useUserStore();

//   const { register, handleSubmit } = useForm();
//   const router = useRouter();

//   const {
//     error,
//     user,
//     handlePasswordlessRedirect,
//     loginWithGoogle,
//     passwordLessLogin,
//     emailSent,
//   } = useUserContext();

//   const redirectUser = () => {
//     const redirectLink = window.localStorage.getItem("redirectAfterLogin");
//     window.localStorage.removeItem("redirectAfterLogin");
//     if (redirectLink) {
//       router.push(redirectLink);
//     } else {
//       router.push("/profile");
//     }
//   };

//   useEffect(() => {
//     user || googleUser ? redirectUser() : null;

//     if (window.location.href.includes("apiKey"))
//       handlePasswordlessRedirect(window.location.href);
//   }, [user]);

//   const onSubmit = (data) => {
//     console.log(data);
//     if (data.email) passwordLessLogin(data.email);
//   };

//   return (
//     <>
//       <Head>
//         <title>Login Page</title>
//       </Head>
//       <div className="flex flex-col justify-center flex-1 min-h-full px-6 py-12 lg:px-8">
//         <div className="sm:mx-auto sm:w-full sm:max-w-sm">
//           <div className="flex justify-center">
//             <IconTrees size={80} />
//           </div>
//           <h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-center text-base-content">
//             Sign in to your account
//           </h2>
//         </div>

//         <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
//           <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
//             {/* Show error if there is any */}
//             {error && (
//               <div className="alert alert-error">
//                 <div>
//                   <IconAlertTriangle size={20} className="mr-2" />
//                   <div>
//                     <strong className="font-bold">Error!</strong>
//                     <span className="block sm:inline">{" " + error}</span>
//                     <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
//                       <IconX />
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {emailSent ? (
//               <div className="alert alert-success">
//                 <div>
//                   <IconCircleCheck size={30} className="mr-2" />
//                   <div>
//                     <h3 className="font-bold">Email sent successfully!</h3>
//                     <span className="text-xs">
//                       Login link sent to the above email address. Close this tab
//                       once you click that link.
//                     </span>
//                     <p className="text-xs">
//                       (Check your <b>Promotions</b> or <b>Spam folder</b>)
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ) : (
//               <div className="alert">
//                 <div>
//                   <IconAlertCircle size={30} className="mr-2" />
//                   <div>
//                     <h3 className="font-bold">No need to create an account!</h3>
//                     <span className="text-sm">
//                       We have already taken care of that for you. A login link
//                       would be sent to this email.
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Email */}
//             <div className="form-control">
//               <label htmlFor="email" className="label">
//                 Email address
//               </label>
//               <input
//                 className="input input-bordered"
//                 autoComplete="email"
//                 type="email"
//                 required
//                 {...register("email")}
//               />
//             </div>

//             {/* Password */}
//             {/* <div className="form-control">
//             <label className="label">
//               <span
//                 className="label-text"
//                 htmlFor="password"
//                 // className="block text-sm font-medium leading-6 text-base-content"
//               >
//                 Password
//               </span>
//               <span className="label-text-alt">
//                 <a
//                   href="#"
//                   className="font-semibold text-primary hover:text-secondary"
//                 >
//                   Forgot password?
//                 </a>
//               </span>
//             </label>
//             <input
//               type="password"
//               autoComplete="current-password"
//               required
//               className="input input-bordered"
//             />
//           </div> */}

//             <div className="form-control">
//               <button type="submit" className="btn btn-primary">
//                 Sign in
//               </button>
//             </div>

//             <div className="divider">Or continue with</div>

//             <div className="flex items-center justify-center gap-4">
//               <button
//                 onClick={() => {
//                   signInWithGoogle()
//                     .then((res) => {
//                       console.log("Success");
//                       console.log(res);

//                       setUser(res);
//                       router.push("/profile");
//                     })
//                     .catch((err) => console.error(err));
//                 }}
//                 className="flex flex-row items-center justify-center gap-2 btn btn-white w-full"
//               >
//                 <IconBrandGoogle /> Google
//               </button>
//             </div>
//           </form>

//           <p className="mt-10 text-sm text-center text-gray-500">
//             Not a member?
//             <a
//               href="#"
//               className="ml-2 font-semibold leading-6 text-primary hover:text-secondary"
//             >
//               Join and Donate us Now
//             </a>
//           </p>
//         </div>
//       </div>
//     </>
//   );
// }
// 'use client'

// import { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import { useForm } from "react-hook-form";
// import Head from "next/head";
// import {
//   IconX,
//   IconAlertCircle,
//   IconTrees,
//   IconBrandGoogle,
//   IconCircleCheck,
//   IconAlertTriangle,
// } from "@tabler/icons-react";
// import { useSignInWithGoogle } from "react-firebase-hooks/auth";
// import { auth } from "@/services/firebase";
// import { useUserStore } from "@/store/user";
// import { useUserContext } from "@/services/userContext";

// const LoginPage = () => {
//   const [isMobile, setIsMobile] = useState(false);
//   const [error, setError] = useState("");
//   const [emailSent, setEmailSent] = useState(false);
//   const { register, handleSubmit } = useForm();
//   const router = useRouter();
//   const [signInWithGoogle] = useSignInWithGoogle(auth);
//   const { setUser } = useUserStore();
  
//   const {
//     user,
//     handlePasswordlessRedirect,
//     loginWithGoogle,
//     passwordLessLogin,
//   } = useUserContext();

//   useEffect(() => {
//     const checkScreenSize = () => {
//       setIsMobile(window.innerWidth < 640);
//     };

//     checkScreenSize();
//     window.addEventListener("resize", checkScreenSize);
//     return () => window.removeEventListener("resize", checkScreenSize);
//   }, []);

//   useEffect(() => {
//     const redirectUser = () => {
//       const redirectLink = window.localStorage.getItem("redirectAfterLogin");
//       window.localStorage.removeItem("redirectAfterLogin");
//       router.push(redirectLink || "/profile");
//     };

//     if (user) {
//       redirectUser();
//     }

//     if (window.location.href.includes("apiKey")) {
//       handlePasswordlessRedirect(window.location.href);
//     }
//   }, [user, router]);

//   const onSubmit = async (data) => {
//     try {
//       if (data.email) {
//         await passwordLessLogin(data.email);
//         setEmailSent(true);
//       }
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const handleGoogleSignIn = async () => {
//     try {
//       const result = await signInWithGoogle();
//       if (result?.user) {
//         await loginWithGoogle(result.user);
//         setUser(result.user);
//       }
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const MobileView = () => (
//     <div className="flex items-center justify-center min-h-screen bg-[#E2E5E0] p-4">
//       <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
//         <div className="flex justify-center">
//           <IconTrees size={80} className="text-green-700" />
//         </div>
//         <h2 className="text-2xl font-bold text-center text-green-950 mb-6">
//           Get Started Now
//         </h2>
        
//         {error && (
//           <div className="alert alert-error mb-4">
//             <IconAlertTriangle size={20} className="mr-2" />
//             <span>{error}</span>
//             <button onClick={() => setError("")} className="absolute right-2">
//               <IconX size={20} />
//             </button>
//           </div>
//         )}

//         {emailSent ? (
//           <div className="alert alert-success mb-4">
//             <IconCircleCheck size={30} className="mr-2" />
//             <div>
//               <h3 className="font-bold">Email sent successfully!</h3>
//               <span className="text-xs">
//                 Login link sent to your email. Check Promotions/Spam folder.
//               </span>
//             </div>
//           </div>
//         ) : (
//           <div className="alert mb-4">
//             <IconAlertCircle size={30} className="mr-2" />
//             <div>
//               <h3 className="font-bold">No need to create an account!</h3>
//               <span className="text-sm">
//                 A login link will be sent to your email.
//               </span>
//             </div>
//           </div>
//         )}

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           <div>
//             <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
//               Email
//             </label>
//             <input
//               type="email"
//               {...register("email")}
//               placeholder="Enter your email"
//               className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-green-500 focus:border-green-500"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-green-700 text-white font-medium py-2 px-4 rounded-md hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
//           >
//             Sign in
//           </button>

//           <div className="flex items-center justify-center mt-4">
//             <div className="flex items-center w-full">
//               <hr className="flex-grow border-t border-gray-300" />
//               <span className="mx-4 text-gray-700 font-medium">OR</span>
//               <hr className="flex-grow border-t border-gray-300" />
//             </div>
//           </div>

//           <button
//             type="button"
//             onClick={handleGoogleSignIn}
//             className="w-full flex items-center justify-center text-gray-700 font-medium py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
//           >
//             <IconBrandGoogle size={24} className="mr-2" />
//             Sign in with Google
//           </button>
//         </form>

//         <p className="mt-6 text-sm text-center text-gray-500">
//           Not a member?
//           <a
//             href="#"
//             className="ml-2 font-semibold text-green-700 hover:text-green-800"
//           >
//             Join and Donate Now
//           </a>
//         </p>
//       </div>
//     </div>
//   );

//   const DesktopView = () => (
//     <div
//       className="flex items-center min-h-screen"
//       style={{
//         backgroundImage: "url('/images/image.png')",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       <div className="justify-center pl-20 w-full">
//         <div className="max-w-lg p-18 bg-transparent rounded-lg">
//           <h2 className="text-2xl font-bold text-center text-green-950 mb-6 drop-shadow-[2px_4px_6px_rgba(0,0,0,0.4)]">
//             Sign in to your account
//           </h2>

//           {error && (
//             <div className="alert alert-error mb-4">
//               <IconAlertTriangle size={20} className="mr-2" />
//               <span>{error}</span>
//               <button onClick={() => setError("")} className="absolute right-2">
//                 <IconX size={20} />
//               </button>
//             </div>
//           )}

//           {emailSent ? (
//             <div className="alert alert-success mb-4">
//               <IconCircleCheck size={30} className="mr-2" />
//               <div>
//                 <h3 className="font-bold">Email sent successfully!</h3>
//                 <span className="text-xs">
//                   Login link sent to your email. Check Promotions/Spam folder.
//                 </span>
//               </div>
//             </div>
//           ) : (
//             <div className="alert mb-4">
//               <IconAlertCircle size={30} className="mr-2" />
//               <div>
//                 <h3 className="font-bold">No need to create an account!</h3>
//                 <span className="text-sm">
//                   A login link will be sent to your email.
//                 </span>
//               </div>
//             </div>
//           )}

//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//             <div>
//               <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 {...register("email")}
//                 placeholder="Enter your email"
//                 className="w-full border border-gray-700 bg-transparent rounded-md px-3 py-2 focus:outline-none focus:ring-green-500 focus:border-green-500"
//                 required
//               />
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-green-700 text-white font-medium py-2 px-4 rounded-md hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
//             >
//               Sign in
//             </button>

//             <div className="flex items-center justify-center mt-4">
//               <div className="flex items-center w-full">
//                 <hr className="flex-grow border-t border-gray-700" />
//                 <span className="mx-4 text-gray-700 font-medium">OR</span>
//                 <hr className="flex-grow border-t border-gray-700" />
//               </div>
//             </div>

//             <button
//               type="button"
//               onClick={handleGoogleSignIn}
//               className="w-full flex items-center justify-center text-gray-700 font-medium py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
//             >
//               <IconBrandGoogle size={24} className="mr-2" />
//               Sign in with Google
//             </button>
//           </form>

//           <p className="mt-6 text-sm text-center text-gray-500">
//             Not a member?
//             <a
//               href="#"
//               className="ml-2 font-semibold text-green-700 hover:text-green-800"
//             >
//               Join and Donate Now
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <>
//       <Head>
//         <title>Login Page</title>
//       </Head>
//       {isMobile ? <MobileView /> : <DesktopView />}
//     </>
//   );
// };

// export default LoginPage;
'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Head from "next/head";
import {
  IconX,
  IconAlertCircle,
  IconTrees,
  IconBrandGoogle,
  IconCircleCheck,
  IconAlertTriangle,
} from "@tabler/icons-react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "@/services/firebase";
import { useUserStore } from "@/store/user";
import { useUserContext } from "@/services/userContext";

const LoginPage = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [signInWithGoogle, googleUser] = useSignInWithGoogle(auth);
  const { userStore, setUser } = useUserStore();
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const {
    error,
    user,
    handlePasswordlessRedirect,
    loginWithGoogle,
    passwordLessLogin,
    emailSent,
  } = useUserContext();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const redirectUser = () => {
    const redirectLink = window.localStorage.getItem("redirectAfterLogin");
    window.localStorage.removeItem("redirectAfterLogin");
    if (redirectLink) {
      router.push(redirectLink);
    } else {
      router.push("/profile");
    }
  };

  useEffect(() => {
    user || googleUser ? redirectUser() : null;

    if (window.location.href.includes("apiKey")) {
      handlePasswordlessRedirect(window.location.href);
    }
  }, [user]);

  const onSubmit = (data) => {
    console.log(data);
    if (data.email) passwordLessLogin(data.email);
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((res) => {
        console.log("Success");
        console.log(res);
        setUser(res);
        router.push("/profile");
      })
      .catch((err) => console.error(err));
  };

  const MobileView = () => (
    <div className="flex items-center justify-center min-h-screen bg-[#E2E5E0] p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-center">
          <IconTrees size={80} className="text-green-700" />
        </div>
        <h2 className="text-2xl font-bold text-center text-green-950 mb-6">
          Get Started Now
        </h2>
        
        {error && (
          <div className="alert alert-error mb-4">
            <IconAlertTriangle size={20} className="mr-2" />
            <span>{error}</span>
            <button onClick={() => setError("")} className="absolute right-2">
              <IconX size={20} />
            </button>
          </div>
        )}

        {emailSent ? (
          <div className="alert alert-success mb-4">
            <IconCircleCheck size={30} className="mr-2" />
            <div>
              <h3 className="font-bold">Email sent successfully!</h3>
              <span className="text-xs">
                Login link sent to your email. Check Promotions/Spam folder.
              </span>
            </div>
          </div>
        ) : (
          <div className="alert mb-4">
            <IconAlertCircle size={30} className="mr-2" />
            <div>
              <h3 className="font-bold">No need to create an account!</h3>
              <span className="text-sm">
                A login link will be sent to your email.
              </span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-700 text-white font-medium py-2 px-4 rounded-md hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Sign in
          </button>

          <div className="flex items-center justify-center mt-4">
            <div className="flex items-center w-full">
              <hr className="flex-grow border-t border-gray-300" />
              <span className="mx-4 text-gray-700 font-medium">OR</span>
              <hr className="flex-grow border-t border-gray-300" />
            </div>
          </div>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center text-gray-700 font-medium py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            <IconBrandGoogle size={24} className="mr-2" />
            Sign in with Google
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-500">
          Not a member?
          <a
            href="#"
            className="ml-2 font-semibold text-green-700 hover:text-green-800"
          >
            Join and Donate Now
          </a>
        </p>
      </div>
    </div>
  );

  const DesktopView = () => (
    <div
      className="flex items-center min-h-screen"
      style={{
        backgroundImage: "url('/images/image.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="justify-center pl-20 w-full">
        <div className="max-w-lg p-18 bg-transparent rounded-lg">
          <h2 className="text-2xl font-bold text-center text-green-950 mb-6 drop-shadow-[2px_4px_6px_rgba(0,0,0,0.4)]">
            Sign in to your account
          </h2>

          {error && (
            <div className="alert alert-error mb-4">
              <IconAlertTriangle size={20} className="mr-2" />
              <span>{error}</span>
              <button onClick={() => setError("")} className="absolute right-2">
                <IconX size={20} />
              </button>
            </div>
          )}

          {emailSent ? (
            <div className="alert alert-success mb-4">
              <IconCircleCheck size={30} className="mr-2" />
              <div>
                <h3 className="font-bold">Email sent successfully!</h3>
                <span className="text-xs">
                  Login link sent to your email. Check Promotions/Spam folder.
                </span>
              </div>
            </div>
          ) : (
            <div className="alert mb-4">
              <IconAlertCircle size={30} className="mr-2" />
              <div>
                <h3 className="font-bold">No need to create an account!</h3>
                <span className="text-sm">
                  A login link will be sent to your email.
                </span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                {...register("email")}
                placeholder="Enter your email"
                className="w-full border border-gray-700 bg-transparent rounded-md px-3 py-2 focus:outline-none focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-700 text-white font-medium py-2 px-4 rounded-md hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Sign in
            </button>

            <div className="flex items-center justify-center mt-4">
              <div className="flex items-center w-full">
                <hr className="flex-grow border-t border-gray-700" />
                <span className="mx-4 text-gray-700 font-medium">OR</span>
                <hr className="flex-grow border-t border-gray-700" />
              </div>
            </div>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center text-gray-700 font-medium py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              <IconBrandGoogle size={24} className="mr-2" />
              Sign in with Google
            </button>
          </form>

          <p className="mt-6 text-sm text-center text-gray-500">
            Not a member?
            <a
              href="#"
              className="ml-2 font-semibold text-green-700 hover:text-green-800"
            >
              Join and Donate Now
            </a>
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Head>
        <title>Login Page</title>
      </Head>
      {isMobile ? <MobileView /> : <DesktopView />}
    </>
  );
};

export default LoginPage;