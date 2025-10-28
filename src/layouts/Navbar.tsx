import React from "react";

const Navbar = () => {
  return (
    <section>
      <nav className="grid grid-cols-4 mb-4 p-1">
        <div className="col-span-2">
          <h1 className="text-5xl font-bold mb-4 text-[#0A0E1F]">Smartphone Dashboard Analysis</h1>
          <p className="text-justify text-slate-400 font-sans">Smartphone dashboard to monitor device health and performance,
            equipped with energy consumption and battery impact analysis.
          </p>
        </div>
        <div className="text-right">
        </div> 
        <div className="text-right">
          <p>Login Sign Up</p>
        </div>
      </nav>
    </section>
  )
}

export default Navbar;