import React from "react";
import { motion } from "framer-motion";
// import AllYodels from "./AllYodels";

const variants = {
  default: { width: 0 },
  active: { width: "calc(100% - 0.75rem)" },
};

const TabButton = ({ active, selectTab, children }) => {
  const buttonClasses = active ? "text-black" : "text-slate-400";
  return (
    <button onClick={selectTab}>
      <p className={`mr-3 font-semibold hover:text-black ${buttonClasses}`}>
        {children}
      </p>
      <motion.div
        animate={active ? "active" : "default"}
        variants={variants}
        className="h-1 bg-green-600 mt-2 mr-3"
      ></motion.div>
    </button>
  );
};

export default TabButton;

// const Tab_data = [
//   {
//     title: "All Yodels",
//     id: "all-yodels",
//     content: <AllYodels />, // Reference to the component you just created
//   },
//   {
//     title: "Following",
//     id: "following",
//     content: (
//       <div>
//         {/* You can create another component for followed Yodels here */}
//         <p>Showing Yodels from those you follow...</p>
//       </div>
//     ),
//   },
// ];
