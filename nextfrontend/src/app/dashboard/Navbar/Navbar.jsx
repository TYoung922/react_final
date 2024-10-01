// import React from "react";
// import { useRouter } from "next/navigation";
// import { useHistory } from "react-router-dom"; // or use next/router if using Next.js

// const Navbar = () => {
//   //   const history = useHistory(); // Use `useRouter()` if using Next.js

//   const handleStartYodeling = () => {
//     router.push("/dashboard/createYodel"); // Replace with your actual route
//   };
//   const router = useRouter();
//   const handleSearch = () => {
//     router.push("/dashboard/search"); // Replace with your actual route
//   };

//   const handleLogout = () => {
//     // Implement your logout logic here (e.g., clear local storage, redirect)
//     localStorage.removeItem("token");
//     router.push("/auth/login"); // Redirect to the login page
//   };

//   return (
//     <nav className="bg-gray-800 p-4 flex justify-between items-center">
//       <div className="text-white text-xl font-bold">Yodel </div>
//       <div className="flex space-x-4">
//         <button
//           onClick={handleStartYodeling}
//           className="text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded"
//         >
//           Start Yodeling
//         </button>
//         <button
//           onClick={handleSearch}
//           className="text-white bg-green-500 hover:bg-green-700 px-4 py-2 rounded"
//         >
//           Search
//         </button>
//         <button
//           onClick={handleLogout}
//           className="text-white bg-red-500 hover:bg-red-700 px-4 py-2 rounded"
//         >
//           Logout
//         </button>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React from "react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

  const handleStartYodeling = () => {
    router.push("/dashboard/createYodel");
  };

  const handleSearch = () => {
    router.push("/dashboard/search");
  };

  const handleExplore = () => {
    router.push("/dashboard");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/auth/login");
  };

  // Get the current pathname
  const currentPath = router.pathname;

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="text-1xl md:text-6xl font-bold leading-normal py-2 bg-gradient-to-r from-yellow-400 to-green-300 bg-clip-text text-transparent">
        Yodel
      </div>
      <div className="flex space-x-4">
        {currentPath !== "/dashboard" && (
          <button
            onClick={handleExplore}
            className="text-white bg-yellow-500 hover:bg-yellow-700 px-4 py-2 rounded"
          >
            Explore Yodels
          </button>
        )}
        <button
          onClick={handleStartYodeling}
          className="text-white bg-lime-500 hover:bg-lime-700 px-4 py-2 rounded"
        >
          Start Yodeling
        </button>
        <button
          onClick={handleSearch}
          className="text-white bg-emerald-500 hover:bg-emerald-700 px-4 py-2 rounded"
        >
          Search
        </button>
        <button
          onClick={handleLogout}
          className="text-white bg-red-500 hover:bg-red-700 px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
