// import Image from "next/image";
import Navbar from "./components/Navbar";
import Login from "./components/Login";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-yellow-400 to-green-300">
      <Navbar />
      <Login />
      {/* <div className="container">
        <h1 className="text-white text-center pt-10 mt-14">Hello world</h1> */}
      {/* </div> */}
    </main>
  );
}
