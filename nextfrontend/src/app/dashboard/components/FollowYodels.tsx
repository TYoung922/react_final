// import React, { useEffect, useState } from "react";
// import jwt from "jsonwebtoken";

// const FollowedYodels = () => {
//   const [followedUsers, setFollowedUsers] = useState([]);
//   const [yodels, setYodels] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [userId, setUserId] = useState(null); // Start as null for easy checking
//   const [isMounted, setIsMounted] = useState(false); // New state to track component mount
//   const [token, setToken] = useState(null); // Store the token

//   useEffect(() => {
//     // Mark the component as mounted
//     setIsMounted(true);

//     // Get the token from local storage
//     const storedToken = localStorage.getItem("token");
//     console.log("Token from localStorage:", storedToken);

//     if (!storedToken) {
//       setError("Token not found.");
//       setLoading(false);
//       return;
//     }

//     // Decode the token to get the user ID
//     try {
//       const decoded = jwt.decode(storedToken);
//       console.log("Decoded JWT:", decoded);
//       if (decoded?.id) {
//         setUserId(decoded.id); // Set userId from the decoded token
//         setToken(storedToken); // Set the token for future use in fetch requests
//       } else {
//         throw new Error("User ID not found in token.");
//       }
//     } catch (error) {
//       console.error("Failed to decode token:", error);
//       setError("Failed to decode token.");
//       setLoading(false);
//       return;
//     }
//   }, []); // Run this only once on component mount

//   useEffect(() => {
//     if (!userId || !token) {
//       console.log("No userId or token found, skipping fetch");
//       return;
//     }

//     const fetchFollowedUsers = async () => {
//       console.log("Fetching followed users for userId:", userId);
//       try {
//         const response = await fetch(
//           `http://localhost:4000/api/user/${userId}/followList`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`, // Add the JWT token in the headers
//             },
//           }
//         );
//         if (!response.ok) {
//           throw new Error("Failed to fetch followed users");
//         }
//         const data = await response.json();
//         setFollowedUsers(data);
//         console.log("Followed Users:", data);

//         // Fetch Yodels for each followed user
//         await fetchYodels(data.map((user) => user.id));
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     const fetchYodels = async (followedUserIds) => {
//       console.log("Fetching Yodels for followed users:", followedUserIds);
//       try {
//         const yodelPromises = followedUserIds.map(async (followedUserId) => {
//           const response = await fetch(
//             `http://localhost:4000/api/yodels/user/${followedUserId}`,
//             {
//               headers: {
//                 Authorization: `Bearer ${token}`, // Add the JWT token in the headers
//               },
//             }
//           );
//           if (!response.ok) {
//             throw new Error(
//               `Failed to fetch Yodels for user ${followedUserId}`
//             );
//           }
//           return await response.json(); // Return the Yodels data for this user
//         });

//         const allYodels = await Promise.all(yodelPromises);
//         console.log("All fetched Yodels:", allYodels);
//         setYodels(allYodels.flat()); // Flatten the array to get a single array of Yodels
//       } catch (error) {
//         setError(error.message);
//       }
//     };

//     fetchFollowedUsers(); // Call the fetch function to get followed users and their Yodels
//   }, [userId, token]); // This effect depends on userId and token

//   // Return null until the component has mounted
//   if (!isMounted) return null;

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div>
//       <h1>Yodels from Followed Users</h1>
//       {yodels.length === 0 ? (
//         <p>No Yodels found from followed users.</p>
//       ) : (
//         <ul>
//           {yodels.map((yodel, index) => (
//             <li key={index}>
//               <p>{yodel.content}</p>
//               {/* Adjust according to your Yodel structure */}
//               <small>By User ID: {yodel.userId}</small> {/* Example field */}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default FollowedYodels;

// 'use client'

// import { useState, useEffect } from 'react'
// import axios from 'axios'
// import jwtDecode from 'jwt-decode'

// interface Yodel {
//     id: number;
//     content: string;
//     createdAt: string;
//     author: {
//       username: string;
//     };
//     // Add other fields from your API response if needed
//   }

// interface DecodedToken {
//   userId: string
// }

// export default function FollowedYodels() {
//   const [yodels, setYodels] = useState<Yodel[]>([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)

//   useEffect(() => {
//     const fetchYodels = async () => {
//       try {
//         // Get the JWT token from local storage
//         const token = localStorage.getItem('jwt')
//         if (!token) {
//           throw new Error('No JWT token found')
//         }

//         // Decode the token to get the user ID
//         const decodedToken = jwtDecode<DecodedToken>(token)
//         const userId = decodedToken.userId

//         // Fetch the follow list
//         const followListResponse = await axios.get(`http://localhost:4000/api/user/${userId}/followList`)
//         const followList = followListResponse.data

//         // Fetch yodels for each followed user
//         const yodelPromises = followList.map((followedUserId: string) =>
//           axios.get(`http://localhost:4000/api/yodels/user/${followedUserId}`)
//         )
//         const yodelResponses = await Promise.all(yodelPromises)

//         // Combine all yodels into a single array
//         const allYodels = yodelResponses.flatMap(response => response.data)

//         // Sort yodels by creation date (newest first)
//         allYodels.sort((a: Yodel, b: Yodel) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

//         setYodels(allYodels)
//         setLoading(false)
//       } catch (err) {
//         console.error('Error fetching yodels:', err)
//         setError('Failed to fetch yodels. Please try again later.')
//         setLoading(false)
//       }
//     }

//     fetchYodels()
//   }, [])

//   if (loading) {
//     return <div className="text-center p-4">Loading...</div>
//   }

//   if (error) {
//     return <div className="text-center p-4 text-red-500">{error}</div>
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Yodels from Followed Users</h1>
//       {yodels.length === 0 ? (
//         <p>No yodels found from followed users.</p>
//       ) : (
//         <ul className="space-y-4">
//           {yodels.map((yodel) => (
//             <li key={yodel.id} className="bg-white shadow rounded-lg p-4">
//               <p className="text-gray-800">{yodel.content}</p>
//               <p className="text-sm text-gray-500 mt-2">
//                 Posted on {new Date(yodel.createdAt).toLocaleDateString()}
//               </p>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   )
// }

"use client";

// import { useState, useEffect } from "react";
// import axios from "axios";
// import { jwtDecode } from "jwt-decode";

// const API_BASE_URL = "http://localhost:4000";

// export default function FollowedYodels() {
//   const [yodels, setYodels] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   // const token = localStorage.getItem("token")

//   useEffect(() => {
//     const fetchYodels = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) {
//           throw new Error("No token found");
//         }

//         let decodedToken;
//         try {
//           decodedToken = jwtDecode(token);
//         } catch (err) {
//           console.error("Error decoding token:", err);
//           throw new Error("Invalid token");
//         }

//         const userId = decodedToken.id;
//         console.log("Fetching data for user ID:", userId);

//         // Fetch the list of followed users
//         let followListResponse;
//         try {
//           followListResponse = await axios.get(
//             `${API_BASE_URL}/api/user/${userId}/followList`,
//             {
//               headers: { Authorization: `Bearer ${token}` },
//             }
//           );
//         } catch (err) {
//           console.error(
//             "Error fetching follow list:",
//             err.response?.data || err.message
//           );
//           throw new Error("Failed to fetch follow list");
//         }

//         const followedUsers = followListResponse.data;
//         console.log("Followed users:", followedUsers);

//         if (!Array.isArray(followedUsers) || followedUsers.length === 0) {
//           setYodels([]);
//           setLoading(false);
//           return;
//         }

//         // Fetch yodels for each followed user
//         const yodelPromises = followedUsers.map((followedUserId) =>
//           axios
//             .get(`${API_BASE_URL}/api/yodels/user/${followedUserId}`, {
//               headers: { Authorization: `Bearer ${token}` },
//             })
//             .catch((error) => {
//               console.error(
//                 `Error fetching yodels for user ${followedUserId}:`,
//                 error.response?.data || error.message
//               );
//               return { data: [] };
//             })
//         );

//         const yodelResponses = await Promise.all(yodelPromises);
//         const allYodels = yodelResponses.flatMap((response) => response.data);

//         console.log("Total yodels fetched:", allYodels.length);

//         // Sort yodels by creation date (most recent first)
//         allYodels.sort(
//           (a, b) =>
//             new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
//         );

//         setYodels(allYodels);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error in fetchYodels:", err);
//         setError(
//           err.message || "Failed to fetch yodels. Please try again later."
//         );
//         setLoading(false);
//       }
//     };

//     fetchYodels();
//   }, []);

//   if (loading) {
//     return <div className="text-center mt-8">Loading...</div>;
//   }

//   if (error) {
//     return (
//       <div className="text-center mt-8 text-red-500">
//         <p>{error}</p>
//         <p className="mt-4">
//           Please check the console for more detailed error information.
//         </p>
//       </div>
//     );
//   }

//   if (yodels.length === 0) {
//     return (
//       <div className="text-center mt-8">
//         No yodels found from users you follow.
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-4 mt-4">
//       {yodels.map((yodel) => (
//         <div key={yodel._id} className="border rounded-lg p-4 shadow-md">
//           <div className="flex items-center space-x-4">
//             {yodel.author?.profileImage ? (
//               <img
//                 src={yodel.author.profileImage}
//                 alt={`${yodel.author.username}'s profile`}
//                 className="w-10 h-10 rounded-full"
//               />
//             ) : (
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 fill="currentColor"
//                 className="w-10 h-10 text-gray-500"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             )}
//             <p className="text-lg font-semibold">
//               {yodel.author?.username || "Unknown"}
//             </p>
//           </div>
//           <p className="text-gray-600">{yodel.content}</p>
//           <small className="text-gray-500">
//             {new Date(yodel.createdAt).toLocaleString()}
//           </small>
//         </div>
//       ))}
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
// import { Card, CardContent } from "@/components/ui/card"

interface User {
  id: string;
  username: string;
}

interface Yodel {
  id: number;
  content: string;
  createdAt: string;
  author: {
    username: string;
    profileImage: string;
  };
}

export default function YodelFeed() {
  const [followedUsers, setFollowedUsers] = useState<User[]>([]);
  const [yodels, setYodels] = useState<Yodel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchYodels = async () => {
      try {
        // Get the current user's ID from local storage
        const currentUserId = localStorage.getItem("userId");
        if (!currentUserId) {
          throw new Error("User ID not found in local storage");
        }

        // Fetch the list of followed users
        const followListResponse = await fetch(
          `http://localhost:4000/api/user/${currentUserId}/followList`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!followListResponse.ok) {
          throw new Error("Failed to fetch follow list");
        }
        const followList: User[] = await followListResponse.json();
        setFollowedUsers(followList);

        // Fetch yodels for each followed user
        const yodelPromises = followList.map((user) =>
          fetch(`http://localhost:4000/api/yodels/user/${user.id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }).then((res) => res.json())
        );
        const yodelResults = await Promise.all(yodelPromises);
        const allYodels = yodelResults.flat();

        // Sort yodels by creation date, most recent first
        allYodels.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        setYodels(allYodels);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
        setLoading(false);
      }
    };

    fetchYodels();
  }, []);

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="max-w-md mx-auto p-4">
      {/* <h1 className="text-3xl font-bold mb-6">AllYodels</h1> */}
      <div className=" space-y-4">
        {yodels.length > 0 ? (
          yodels.map((yodel) => (
            <div
              key={yodel.id}
              className="bg-white border rounded-lg p-4 shadow-md"
            >
              <div className="flex items-center space-x-4">
                {yodel.author?.profileImage ? (
                  <img
                    src={yodel.author.profileImage}
                    alt={`${yodel.author.username}'s profile`}
                    className="w-10 h-10 rounded-full object-cover object-center"
                  />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-10 h-10 text-gray-500"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                <p className="text-lg font-semibold">{yodel.author.username}</p>
              </div>
              <p className="text-gray-600">{yodel.content}</p>
              <small className="text-gray-500">
                {new Date(yodel.createdAt).toLocaleString()}
              </small>
            </div>
          ))
        ) : (
          <p>No yodels found</p>
        )}
      </div>
    </div>
  );
}
