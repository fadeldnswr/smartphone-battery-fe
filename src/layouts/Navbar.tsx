import React from "react";

const Navbar = () => {
  return (
    <section>
      <nav className="grid grid-cols-4 mb-4 p-1">
        <div className="col-span-2">
          <h1 className="text-3xl font-bold pb-1">Smartphone Dashboard Analysis</h1>
          <p className="text-justify text-slate-400">Smartphone dashboard to monitor device health and performance
            to reduce electronic waste. Equipped with energy consumption analysis and battery impact analysis
            to provide insights for users.
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