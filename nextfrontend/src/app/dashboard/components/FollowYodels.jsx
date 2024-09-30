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


'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import jwtDecode from 'jwt-decode'

interface Yodel {
    id: number;
    content: string;
    createdAt: string;
    author: {
      username: string;
    };
    // Add other fields from your API response if needed
  }

interface DecodedToken {
  userId: string
}

export default function FollowedYodels() {
  const [yodels, setYodels] = useState<Yodel[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchYodels = async () => {
      try {
        // Get the JWT token from local storage
        const token = localStorage.getItem('jwt')
        if (!token) {
          throw new Error('No JWT token found')
        }

        // Decode the token to get the user ID
        const decodedToken = jwtDecode<DecodedToken>(token)
        const userId = decodedToken.userId

        // Fetch the follow list
        const followListResponse = await axios.get(`http://localhost:4000/api/user/${userId}/followList`)
        const followList = followListResponse.data

        // Fetch yodels for each followed user
        const yodelPromises = followList.map((followedUserId: string) =>
          axios.get(`http://localhost:4000/api/yodels/user/${followedUserId}`)
        )
        const yodelResponses = await Promise.all(yodelPromises)

        // Combine all yodels into a single array
        const allYodels = yodelResponses.flatMap(response => response.data)

        // Sort yodels by creation date (newest first)
        allYodels.sort((a: Yodel, b: Yodel) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

        setYodels(allYodels)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching yodels:', err)
        setError('Failed to fetch yodels. Please try again later.')
        setLoading(false)
      }
    }

    fetchYodels()
  }, [])

  if (loading) {
    return <div className="text-center p-4">Loading...</div>
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">{error}</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Yodels from Followed Users</h1>
      {yodels.length === 0 ? (
        <p>No yodels found from followed users.</p>
      ) : (
        <ul className="space-y-4">
          {yodels.map((yodel) => (
            <li key={yodel.id} className="bg-white shadow rounded-lg p-4">
              <p className="text-gray-800">{yodel.content}</p>
              <p className="text-sm text-gray-500 mt-2">
                Posted on {new Date(yodel.createdAt).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}