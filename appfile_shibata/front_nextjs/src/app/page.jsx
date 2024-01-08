"use client";
import Link from "next/link";

const Home = () => {
  return (

    <>

      <nav className="flex justify-between items-center px-8 py-4">

        <div className="flex items-center space-x-8">
          <img
            alt="Logo"
            className="h-8"
            height="32"
            src="/placeholder.svg"
            style={{
              aspectRatio: "32/32",
              objectFit: "cover",
            }}
            width="32"
          />
          <div className="hidden md:flex space-x-8">
            <Link className="text-primary hover:text-gray-800" href="/">
              About
            </Link>
            <Link className="text-gray-600 hover:text-gray-800" href="/">
              Service
            </Link>
            <Link className="text-gray-600 hover:text-gray-800" href="/">
              Features
            </Link>
            <Link className="text-gray-600 hover:text-gray-800" href="/">
              Price
            </Link>
            <Link className="text-gray-600 hover:text-gray-800" href="/">
              Team
            </Link>
          </div>
        </div>
        
          <Link href="/login">
            <button className="btn bg-primary text-nautral">Log in</button>
          </Link>
      </nav>

      <div className="flex flex-col lg:flex-row items-center gap-12 mt-12 lg:mt-24">

        <div className="w-full p-24">
          <h1 className="text-5xl font-bold mb-6">This app will give you experience and accelerate <span className="text-primary">reskilling</span></h1>
          <p className="text-gray-600 mb-6">
            Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.<br/> Elit sunt amet
            fugiat veniam occaecat fugiat aliqua.
          </p>
          <div className="flex gap-4">
            <button className="btn bg-black text-white hover:outline">Get started</button>
            <button className="btn bg-black text-white">Learn more</button>
          </div>
        </div>

        <div className="w-full">
          <img
            alt="Team working"
            className="rounded-lg float-right"
            height="600"
            src="/Top_Cover.png"
            style={{
              aspectRatio: "600/600",
              objectFit: "cover",
            }}
            width="600"
          />
        </div>

      </div>
    </>
  );
};

export default Home;