// import React, { useState, useEffect } from "react";
// import { collection, getDocs } from "firebase/firestore";
// import Header from "@/components/Header.jsx";
// import { useSensorStore } from "@/store/sensor-data";
// import { IconPlus } from "@tabler/icons-react";
// import Link from "next/link";
// import { IconExternalLink } from "@tabler/icons-react";
// import { IconCircle } from "@tabler/icons-react";
// import { IconCircleFilled } from "@tabler/icons-react";

// export default function Sensors() {
//   const sensorStore = useSensorStore();
//   const FetchAPI =
//   function addSensor() {
//     sensorStore.addSensor(Date.now());
//   }

//   return (
//     <>
//       <Header title="Plant Status(A non-volunteer based growth tracking system)" />

//       <div className="container grid grid-cols-3 mx-auto mt-12 px-4 sm:px-6 lg:px-8 gap-6">
//         <button
//           onClick={FetchAPI}
//           className="bg-primary h-[200px] flex items-center justify-center gap-2 rounded-xl hover:opacity-90 duration-150"
//         >
//           <IconPlus />
//           <span className="text-xl">Add</span>
//         </button>
//         {Object.entries(sensorStore.data).map(([id, e], index) => (
//           <Link href={`/sensors/${id}`} alt="link" key={id} className="border-2 border-base-content/50 p-4 rounded-xl hover:border-primary duration-150">
//             <div className="flex flex-col justify-between h-full">
//               <div>
//                 <h6 className="font-thin">Plant </h6>
//                 <h3 className="font-bold text-xl text-base-content">
//                   <div>{id}</div>
//                 </h3>
//               </div>
//               <div className="flex gap-2">
//                 <IconCircleFilled className="text-primary animate-pulse" />
//                 <span>Active</span>
//               </div>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </>
//   );
// }
import React, { useState, useEffect } from "react";
import Header from "@/components/Header.jsx";
import Link from "next/link";
import { CircleDot, Leaf } from "lucide-react";

export default function Sensors() {
  const [nodes, setNodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNodes = async () => {
      try {
        const response = await fetch('/api/sensors');
        const data = await response.json();
        
        if (data.status === "success") {
          setNodes(data.uniqueNodeNames);
        } else {
          setError("Failed to fetch nodes");
        }
      } catch (err) {
        setError("Error connecting to the server");
      } finally {
        setLoading(false);
      }
    };

    fetchNodes();
  }, []);

  if (loading) {
    return (
      <>
        <Header title="Plant Status (A non-volunteer based growth tracking system)" />
        <div className="container mx-auto mt-12 px-4 flex justify-center items-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header title="Plant Status (A non-volunteer based growth tracking system)" />
        <div className="container mx-auto mt-12 px-4 text-center text-red-500">
          {error}
        </div>
      </>
    );
  }

  return (
    <>
      <Header title="Plant Status (A non-volunteer based growth tracking system)" />
      
      <div className="container mx-auto mt-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nodes.map((nodeName) => (
            <Link 
              href={`/sensors/${nodeName}`} 
              key={nodeName}
              className="block"
            >
              <div className="border rounded-lg hover:border-primary transition-colors duration-200 cursor-pointer h-full p-6 shadow-sm">
                <div className="flex flex-col h-full justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Leaf className="h-5 w-5 text-primary" />
                      <h6 className="text-sm text-gray-500">Plant Node</h6>
                    </div>
                    <h3 className="text-xl font-bold">{nodeName}</h3>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <CircleDot className="h-4 w-4 text-green-500 animate-pulse" />
                    <span className="text-sm text-gray-600">Active</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {nodes.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            No plant nodes found. Please check back later.
          </div>
        )}
      </div>
    </>
  );
}