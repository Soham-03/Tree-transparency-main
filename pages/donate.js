import Head from "next/head";
import React, { useEffect, useState } from "react";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { auth } from "../services/firebase.js";
import { firestore } from "../services/firebase.js";
import { useUserContext } from "../services/userContext.js";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import { transactionDataContractAddress } from "@/constants/contract-address.js";
import TransactionData from "../artifacts/contracts/transact.sol/TransactionData.json";
import { IconCopy } from "@tabler/icons-react";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconChevronRight,
  IconTrees,
} from "@tabler/icons-react";
export default function pay() {
  const [org, setOrg] = useState("");
  const [amount, setAmount] = useState(0);
  const [paySuccess, setPaySuccess] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState("");
  let web3;
  const [transactionHash, setTransactionHash] = useState("");
  const { user } = useUserContext();
  const [orgs, setOrgs] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchNGO();
  }, []);

  function fetchNGO() {
    const docRef = collection(firestore, "Users");
    const q = query(docRef, where("type", "==", "NGOs"));
    getDocs(q)
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          const { username, ngoId } = doc.data();
          // console.log(doc.data())
          setOrgs((prevOrgs) => {
            const newOrg = { id: doc.id, username, ngoId };
            if (prevOrgs.some((org) => org.id === newOrg.id)) {
              return prevOrgs; // Element already exists, return previous state
            } else {
              return [...prevOrgs, newOrg]; // Add new element to the array
            }
          });
          console.log(orgs);
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function validateFormWithJS() {
    const amount = document.getElementById("amount").value;

    if (!amount) {
      alert("Please enter Amount.");
      return false;
    }
  }

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;

      script.onload = () => {
        resolve(true);
      };

      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  const addToChain = async (value) => {
    // Create Contract
    const [account] = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // const balance = await provider.getBalance(account);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      transactionDataContractAddress,
      TransactionData.abi,
      signer
    );

    const connection = contract.connect(signer);

    const result = await contract.addTransaction(connection.address, value);

    return result.hash;
  };

  const displayRazorpay = async (amount,  org) => {
    var myHeaders = new Headers();

    myHeaders.append(
      "Authorization",
      "Basic hDaah8khGYGdnPlIH0Bk0PCt"
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      amount: amount * 100,
      currency: "INR",
    });

    var requestOptions = {
      method: "POST",
      mode: "no-cors",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://api.razorpay.com/v1/orders", requestOptions)
      .then(async (result) => {
        const res = await loadScript(
          "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
          alert("you are offline");
          return;
        }

        const options = {
          key: "rzp_test_Vx5bKnJJCz2Jvb",
          amount: amount * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
          currency: "INR",
          name: "",
          description: "Test Transaction",
          handler: function (res) {
            addToChain(amount)
              .then((hash) => {
                console.log(hash);
                setTransactionHash(hash);
                addDoc(collection(firestore, "payments"), {
                  amount,
                  hash,
                  fromUser: {
                    name: auth.currentUser.displayName,
                    uid: auth.currentUser.uid,
                  },
                  toOrg: orgs.find((value) => value.id === org),
                  ...res,
                })
                  .then(() => console.log("Document was saved"))
                  .catch((e) => alert(`Error occured : ${JSON.stringify(e)}`));
              })
              .catch((err) => console.error(err));

            setPaySuccess(true);
            setPaymentDetails({
              ...res,
              amount,
            });
          },
          // "order_id": "order_KTL3lGufa5nvgB", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
          order_id: result.order_id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
          callback_url: "https://eneqd3r9zrjok.x.pipedream.net/",
          theme: {
            color: "#3399cc",
          },
        };
        var rzp1 = new Razorpay(options);
        rzp1.open();
      })
      .catch((error) => console.log("error", error));
    //     return;
  };

  // return (
  //   <div className="container mx-auto">
  //     <Head>
  //       <title>Make a Donation</title>
  //       <meta name="description" content="Donate to a cause you care about" />
  //       <link rel="icon" href="/favicon.ico" />
  //     </Head>

  //     <h1 className="text-5xl font-bold text-center mt-14">Make a Donation</h1>

  //     <p className="mt-4 mb-10 text-lg text-center">
  //       Your donation can make a difference in someone's life today.
  //     </p>

  //     {paySuccess ? (
  //       <SuccessPage
  //         payment_id={paymentDetails.razorpay_payment_id}
  //         amount={paymentDetails.amount}
  //         transactionHash={transactionHash}
  //       />
  //     ) : (
  //       <div className="container mx-auto space-y-4 px-4 sm:px-6 lg:px-8">
  //         <div className="form-control">
  //           <label htmlFor="charity" className="label">
  //             Select a NGO
  //           </label>
  //           <select
  //             className="select select-bordered"
  //             id="charity"
  //             value={org}
  //             onChange={(e) => setOrg(e.target.value)}
  //             required
  //           >
  //             <option value="Select">-- Please Select --</option>
  //             {orgs.map((e) => (
  //               <option value={e.id}>
  //                 {e.username} - {e.ngoId}
  //               </option>
  //             ))}
  //           </select>
  //         </div>

  //         <div className="form-control">
  //           <label htmlFor="amount" className="label">
  //             Donation Amount
  //           </label>
  //           <input
  //             className="input input-bordered"
  //             placeholder="Enter donation amount"
  //             type="number"
  //             id="amount"
  //             value={amount}
  //             onChange={(e) => setAmount(e.currentTarget.value)}
  //           />
  //         </div>

  //         <div className="flex flex-col items-center">
  //           <button
  //             className="w-full px-4 py-2 font-semibold text-white rounded-lg shadow-md btn btn-primary md:w-64 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
  //             onClick={() => displayRazorpay(amount, org)}
  //           >
  //             Donate Now
  //           </button>
  //           <div className="justify-center mt-6 text-sm font-medium text-gray-500 justify"></div>
  //         </div>
  //       </div>
  //     )}
  //   </div>
  // );
  return (
    <div className="container mx-auto">
      <Head>
        <title>Make a Donation</title>
        <meta name="description" content="Donate to a cause you care about" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <h1 className="text-5xl font-bold text-center mt-14">Make a Donation</h1>

      <p className="mt-4 mb-10 text-lg text-center">
        Your donation can make a difference in someone's life today.
      </p> */}
 <div className="flex flex-col min-h-screen w-full bg-white dark:bg-gray-900">
 <main className="w-full p-4 md:p-8">
 <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
  {/* left image Section */}
  <div className="relative w-full md:w-1/3">
              <div className="relative h-96 md:h-full rounded-3xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1631401551847-78450ef649d8?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
"
                  alt="Donation Background"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-[rgba(102,116,92,0.56)] rounded-3xl">
                  <h2 className="absolute bottom-8 left-0 right-0 text-4xl font-bold text-white text-center px-4">
                    Saving Tomorrow Starts Today
                  </h2>
                </div>
              </div>
            </div>

            {/* right form Section */}
            <div className="w-full md:w-2/3 bg-white dark:bg-gray-900 p-4">
              <div className="flex items-center gap-4 mb-8">
                <IconTrees size={24} className="text-[#6F965E]" />
                <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">Make a Donation</h1>
              </div>
              <p className="text-sm italic font-bold text-gray-400 dark:text-gray-500 mb-8">Your Support Makes a Difference!</p>
              {paySuccess ? (
        <SuccessPage
          payment_id={paymentDetails.razorpay_payment_id}
          amount={paymentDetails.amount}
          transactionHash={transactionHash}
        />
      ) : (
        <div className="container mx-auto space-y-4 px-4 sm:px-6 lg:px-8">
          <div className="form-control">
            <label htmlFor="charity" className="label">
              Select a NGO
            </label>
            <select
              className="select select-bordered"
              id="charity"
              value={org}
              onChange={(e) => setOrg(e.target.value)}
              required
            >
              <option value="Select">-- Please Select --</option>
              {orgs.map((e) => (
                <option value={e.id}>
                  {e.username} - {e.ngoId}
                </option>
              ))}
            </select>
          </div>

          <div className="form-control">
            <label htmlFor="amount" className="label">
              Donation Amount
            </label>
            <input
              className="input input-bordered"
              placeholder="Enter donation amount"
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.currentTarget.value)}
            />
          </div>

          <div className="flex flex-col items-center">
            {/* <button
              className="w-full px-4 py-2 font-semibold text-white rounded-lg shadow-md btn btn-primary md:w-64 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => displayRazorpay(amount, org)}
            >
              Donate Now
            </button> */}
            <p className="text-gray-400 dark:text-gray-500 text-xs text-center mb-8">
                All donations are final and non-refundable unless a processing error occurred. 
                If you encounter any issues, please contact us at [email].
              </p>
  
              {/* Action Buttons */}
              <div className="flex gap-4 flex-wrap">
                <button className="flex-1 min-w-[200px] p-3 border border-[#6F965E] text-[#6F965E] dark:border-[#8BB279] dark:text-[#8BB279] hover:bg-[#6F965E] hover:text-white dark:hover:bg-[#8BB279] dark:hover:text-gray-900 rounded-md transition-colors">
                  Cancel
                </button>
                <button className="flex-1 min-w-[200px] p-3 bg-[#6F965E] hover:bg-[#5A7D4B] dark:bg-[#8BB279] dark:hover:bg-[#9DC28A] text-white dark:text-gray-900 rounded-md transition-colors">
                  Go to checkout
                </button>
              </div>
            <div className="justify-center mt-6 text-sm font-medium text-gray-500 justify"></div>
          </div>
        </div>
      )}

    </div>

    

    {/* teh section ends here */}
 </div>
  </main>
 
 </div>
     
    </div>
  );
}
// export const DonationPage = () => {
//   return (
//     <div className="flex flex-col min-h-screen w-full bg-white dark:bg-gray-900">
//       {/* Main Content */}
//       <main className="w-full p-4 md:p-8">
//         <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
//           {/* Left Image Section */}
//           <div className="relative w-full md:w-1/3">
//             <div className="relative h-96 md:h-full rounded-3xl overflow-hidden">
//               <img 
//                 src="https://images.unsplash.com/photo-1631401551847-78450ef649d8?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
// "
//                 alt="Donation Background"
//                 className="w-full h-full object-cover"
//               />
//               <div className="absolute inset-0 bg-[rgba(102,116,92,0.56)] rounded-3xl">
//                 <h2 className="absolute bottom-8 left-0 right-0 text-4xl font-bold text-white text-center px-4">
//                   Saving Tomorrow Starts Today
//                 </h2>
//               </div>
//             </div>
//           </div>

//           {/* Right Form Section */}
//           <div className="w-full md:w-2/3 bg-white dark:bg-gray-900 p-4">
//             <div className="flex items-center gap-4 mb-8">
//               <IconTrees size={24} className="text-[#6F965E]" />
//               <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">Make a Donation</h1>
//             </div>
//             <p className="text-sm italic font-bold text-gray-400 dark:text-gray-500 mb-8">Your Support Makes a Difference!</p>

//             {/* NGO Selection */}
//             <div className="mb-8">
//               <label className="block text-gray-700 dark:text-gray-300 mb-2">Select an NGO</label>
//               <div className="relative">
//                 <input type="text" placeholder="Enter name of Ngo"
//                  className="block w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent placeholder-gray-400 transition duration-150 ease-in-out"  />
//                 {/* <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400" size={16} /> */}
//               </div>
//             </div>

//             {/* Amount Selection */}
//             <div className="mb-8">
//             <label className="block text-gray-700 dark:text-gray-300 mb-2">Donation Amount</label>
//               <div className="relative">
//                 <input type="text" placeholder="Enter amount"
//                  className="block w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent placeholder-gray-400 transition duration-150 ease-in-out"  />
//                 {/* <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400" size={16} /> */}
//               </div>
              
//             </div>

//             {/* Frequency Selection */}
//             {/* <div className="mb-8">
//               <h3 className="text-gray-700 dark:text-gray-300 mb-4">Choose a donation frequency</h3>
//               <div className="flex gap-4 flex-wrap">
//                 <label className="flex-1 min-w-[200px] flex items-center gap-3 p-3 bg-[#E2EADF] dark:bg-[#445543] text-gray-900 dark:text-white rounded cursor-pointer">
//                   <input type="radio" name="frequency" className="w-5 h-5 accent-[#6F965E]" />
//                   <span>Monthly</span>
//                 </label>
//                 <label className="flex-1 min-w-[200px] flex items-center gap-3 p-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded cursor-pointer">
//                   <input type="radio" name="frequency" className="w-5 h-5 accent-[#6F965E]" />
//                   <span>One time</span>
//                 </label>
//               </div>
//             </div>
//  */}
//             <p className="text-gray-400 dark:text-gray-500 text-xs text-center mb-8">
//               All donations are final and non-refundable unless a processing error occurred. 
//               If you encounter any issues, please contact us at [email].
//             </p>

//             {/* Action Buttons */}
//             <div className="flex gap-4 flex-wrap">
//               <button className="flex-1 min-w-[200px] p-3 border border-[#6F965E] text-[#6F965E] dark:border-[#8BB279] dark:text-[#8BB279] hover:bg-[#6F965E] hover:text-white dark:hover:bg-[#8BB279] dark:hover:text-gray-900 rounded-md transition-colors">
//                 Cancel
//               </button>
//               <button className="flex-1 min-w-[200px] p-3 bg-[#6F965E] hover:bg-[#5A7D4B] dark:bg-[#8BB279] dark:hover:bg-[#9DC28A] text-white dark:text-gray-900 rounded-md transition-colors">
//                 Go to checkout
//               </button>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

function SuccessPage({ payment_id, amount, transactionHash }) {
  return (
    <div className="max-w-xl mx-auto overflow-hidden shadow-lg rounded-2xl">
      <div className="px-6 py-8 text-white bg-success">
        <h2 className="text-4xl font-bold text-center">Payment Successful</h2>
      </div>
      <div className="p-8">
        <div className="grid divide-y">
          <div className="flex items-center justify-between p-4">
            <p>Payment ID</p>
            <p className="text-lg font-bold">{payment_id}</p>
          </div>
          <div className="flex items-center justify-between p-4">
            <p>Amount</p>
            <p className="text-lg font-bold text-success">₹{amount}</p>
          </div>
          <div className="flex items-center justify-between p-4">
            <p>Transaction Hash</p>
            <input
              className="input input-bordered"
              contentEditable={false}
              value={transactionHash}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
