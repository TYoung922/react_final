import React, { useTransition, useState } from "react";
import TabButton from "./TabButton";
import AllYodels from "./AllYodels.tsx";
import FollowedYodels from "./FollowYodels.tsx";
import FollowedUsersList from "./FollowList";

const Tab_data = [
  {
    title: "All Yodels",
    id: "allYodels",
    content: <AllYodels />,
  },
  {
    title: "Followed Users",
    id: "followedYodels",
    content: <FollowedYodels />,
  },
  {
    title: "Yodellers you follow",
    id: "yourFollows",
    content: <FollowedUsersList />,
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
        <TabButton
          selectTab={() => handleTabChange("followedYodels")}
          active={tab === "followedYodels"}
        >
          {" "}
          Explore Yodelers you follow{" "}
        </TabButton>{" "}
        <TabButton
          selectTab={() => handleTabChange("yourFollows")}
          active={tab === "yourFollows"}
        >
          {" "}
          Yodelers you follow{" "}
        </TabButton>{" "}
      </div>
      <div className="max-h-[60vh] overflow-y-auto max-w-lg mx-auto border-2 rounded-md shadow-inner bg-slate-100">
        {Tab_data.find((t) => t.id === tab).content}
      </div>
    </div>
  );
};

export default DisplayYodels;
