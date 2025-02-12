// import React, { useState, useEffect } from "react";
// import { collection, getDocs } from "firebase/firestore";
// import { firestore } from "../services/firebase.js";
// import Header from "@/components/Header.jsx";
// import { IconCopy } from "@tabler/icons-react";
// import { useUserStore } from "@/store/user.js";
// import Head from "next/head.js";

// export default function Transactions() {
//   const [isFetching, setFetching] = useState(true);
//   const [payments, setPayments] = useState([]);
//   const {userStore} = useUserStore();

//   useEffect(() => {
//     fetchPayments();
//   }, []);

//   function fetchPayments() {
//     setFetching(true);
//     let data = [];

//     getDocs(collection(firestore, "payments")).then((querySnapshot) => {
//       querySnapshot.forEach((doc) => {
//         data.push(doc.data());
//       });

//       setFetching(false);
//       setPayments(data);
//     });
//   }

//   return (
//     <>
//       <Head>
//         <title>Donations</title>
//       </Head>
//       <Header title="Donations" />

//       <div className="container mx-auto mt-12 px-4 sm:px-6 lg:px-8">
//         {isFetching ? (
//           <div>Fetching</div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="table w-full table-compact">
//               <thead>
//                 <th>Payment ID</th>
//                 <th>Amount</th>
//                 <th>From</th>
//                 <th>To</th>
//                 <th>Hash</th>
//               </thead>
//               <tbody>
//                 {payments.filter(e => userStore.type === 'NGOs' ? e.toOrg.id === userStore.email : true).map((payment) => (
//                   <tr key={payment.razorpay_payment_id}>
//                     <th>{payment.razorpay_payment_id}</th>
//                     <td>{payment.amount}</td>
//                     <td>{payment.fromUser.name}</td>
//                     <td>{payment.toOrg?.username ?? ""}</td>
//                     <td className="input-group">
//                       <input
//                         className="input input-bordered"
//                         value={payment.hash}
//                       />
//                       <button className="btn">
//                         <IconCopy />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//                 <tr>
//                   <th>Total Donations</th>
//                   <td>{payments.filter(e => userStore.type === 'NGOs' ? e.toOrg.id === userStore.email : true).reduce((partialSum, a) => partialSum + parseInt(a.amount), 0)}</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }
import React, { useState, useEffect } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../services/firebase.js";
import { useUserStore } from "@/store/user.js";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent 
} from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Wallet, ArrowUpCircle, ArrowUpDown } from 'lucide-react';

export default function DonationsDashboard() {
  const [isFetching, setFetching] = useState(true);
  const [payments, setPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: 'timestamp', direction: 'desc' });
  const { userStore } = useUserStore();

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    setFetching(true);
    try {
      const querySnapshot = await getDocs(collection(firestore, "payments"));
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setPayments(data);
    } catch (error) {
      console.error("Error fetching payments:", error);
    } finally {
      setFetching(false);
    }
  };

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
    });
  };

  const filteredPayments = payments
    .filter(payment => userStore.type === 'NGOs' ? 
      payment.toOrg?.id === userStore.email : true)
    .filter(payment =>
      Object.values(payment).some(value => 
        value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

  const totalDonated = filteredPayments.reduce((sum, payment) => 
    sum + parseInt(payment.amount || 0), 0
  );

  if (isFetching) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading donations data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-gray-600 dark:text-gray-300">
                Total Contributions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline space-x-2">
                <Wallet className="w-6 h-6 text-green-500" />
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  ₹{totalDonated.toFixed(2)}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-gray-600 dark:text-gray-300">
                Total Transactions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline space-x-2">
                <ArrowUpCircle className="w-6 h-6 text-blue-500" />
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  {filteredPayments.length}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Table */}
        <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg">
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                Transaction History
              </CardTitle>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search transactions..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead 
                      className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => handleSort('razorpay_payment_id')}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Payment ID</span>
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => handleSort('amount')}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Amount</span>
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </TableHead>
                    <TableHead>From</TableHead>
                    <TableHead>To</TableHead>
                    <TableHead>Payment ID</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPayments.map((payment) => (
                    <TableRow key={payment.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <TableCell>
                        <Badge variant="outline" className="font-mono">
                          {payment.razorpay_payment_id}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium text-green-600 dark:text-green-400">
                        ₹{parseInt(payment.amount).toFixed(2)}
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        {payment.fromUser?.name || 'Anonymous'}
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        {payment.toOrg?.username || 'Unknown Organization'}
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        <span className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">
                          {payment.razorpay_payment_id}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}