// import AllYodels from "./AllYodels";
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

// "use client"
// import React, { useTransition, useState, useEffect} from "react"
// import TabButton from "./TabButton"
// import axios from "axios"

// interface Yodel {
//     id: number;
//     content: string;
//     createdAt: string;
//     author: {
//       username: string;
//       profileImage: string;
//     };
//     // Add other fields from your API response if needed
//   }

//   const SelectedY = () => {
//   const [yodels, setYodels] = useState<Yodel[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//       const fetchYodels = async () => {
//         try {
//           const response = await axios.get<Yodel[]>(
//             "http://localhost:4000/api/yodels"
//           );
//           setYodels(response.data);
//         } catch (err: unknown) {
//           setError("Error fetching yodels");
//           console.log(err);
//         } finally {
//           setLoading(false);
//         }
//       };

//       fetchYodels();
//     }, []);

//     if (loading) return <p>Loading yodels...</p>;
// if (error) return <p>{error}</p>;

// const Tab_data = [
//     {title: "All Yodels",
//         id: "all yodels",
//         content: (

//             <div className="container mx-auto p-4">
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
//         )
//     }
// ]

// //     const [yodels, setYodels] = useState<Yodel[]>([]);
// //     const [loading, setLoading] = useState<boolean>(true);
// //   const [error, setError] = useState<string | null>(null);

// return (

// )
// }

import React, { useTransition, useState } from "react";
import TabButton from "./TabButton";
import AllYodels from "./AllYodels.tsx";
// import FollowedYodels from "./FollowYodels";

const Tab_data = [
  {
    title: "All Yodels",
    id: "allYodels",
    content: <AllYodels />,
  },
  {
    title: "Followed Users",
    id: "followedYodels",
    // content: <FollowedYodels />,
  },
];

const DisplayYodels = () => {
  const [tab, setTab] = useState("allYodels");
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (id) => {
    startTransition(() => {
      setTab(id);
    });
    console.log(isPending);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Dashboard</h1>
      <div className="space-y-10 text-center">
        <TabButton
          selectTab={() => handleTabChange("allYodels")}
          active={tab === "allYodels"}
        >
          {" "}
          Explore All Yodels &nbsp; &nbsp;
        </TabButton>
        {/* <TabButton
          selectTab={() => handleTabChange("followedYodels")}
          active={tab === "followedYodels"}
        >
          {" "}
          Explore Yodelers you follow{" "}
        </TabButton>{" "} */}
      </div>
      <div className="border rounded-lg p-4 shadow-md">
        {Tab_data.find((t) => t.id === tab).content}
      </div>
    </div>
  );
};

export default DisplayYodels;
