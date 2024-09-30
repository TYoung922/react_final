// "use client";
// import { useEffect, useState } from "react";
// import axios from "axios";

// interface Yodel {
//   id: number;
//   content: string;
//   createdAt: string;
//   author: {
//     username: string;
//   };
//   // Add other fields from your API response if needed
// }

// const Dashboard = () => {
//   const [yodels, setYodels] = useState<Yodel[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchYodels = async () => {
//       try {
//         const response = await axios.get<Yodel[]>(
//           "http://localhost:4000/api/yodels"
//         );
//         setYodels(response.data);
//       } catch (err: unknown) {
//         setError("Error fetching yodels");
//         console.log(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchYodels();
//   }, []);

//   if (loading) return <p>Loading yodels...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
//       <div className="space-y-4">
//         {yodels.length > 0 ? (
//           yodels.map((yodel) => (
//             <div key={yodel.id} className="border rounded-lg p-4 shadow-md">
//               <p className="text-lg font-semibold">{yodel.author.username}</p>
//               <p className="text-gray-600">{yodel.content}</p>
//               <small className="text-gray-500">
//                 {new Date(yodel.createdAt).toLocaleString()}
//               </small>
//             </div>
//           ))
//         ) : (
//           <p>No yodels found</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

// "use client"
// import React, { useState } from 'react';
// import TabButton from './components/TabButton'; // Import the TabButton component
// import AllYodels from './components/AllYodels'; // Import the AllYodels component

// const Tab_data = [
//     {
//       title: "All Yodels",
//       id: "all-yodels",
//       content: <AllYodels /> // Reference to the component you just created
//     },
//     {
//       title: "Following",
//       id: "following",
//       content: (
//         <div>
//           {/* You can create another component for followed Yodels here */}
//           <p>Showing Yodels from those you follow...</p>
//         </div>
//       )
//     }
//   ];

// const YodelsPage = () => {
//   const [activeTab, setActiveTab] = useState('all-yodels');

//   const handleTabClick = (id) => {
//     setActiveTab(id);
//   };

//   return (
//     <div className="p-4">
//       <div className="flex space-x-2 mb-4">
//         {Tab_data.map((tab) => (
//           <TabButton
//             key={tab.id}
//             label={tab.title}
//             isActive={activeTab === tab.id}
//             onClick={() => handleTabClick(tab.id)}
//           />
//         ))}
//       </div>

//       <div>
//         {Tab_data.find(tab => tab.id === activeTab)?.content}
//       </div>
//     </div>
//   );
// };

// export default YodelsPage;

"use client";

import DisplayYodels from "./components/selectYodels";
import Navbar from "./Navbar/Navbar";

export default function Dashboard() {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <DisplayYodels />
    </div>
  );
}
