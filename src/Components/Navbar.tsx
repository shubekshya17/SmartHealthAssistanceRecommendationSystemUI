export default function Navbar() {
  return (
    <header>
      {/* First Navbar */}
      <nav className="flex items-center justify-start px-12 py-1 bg-[#F1F6F5] gap-4">
        <img src="/logo.png" alt="Logo" className="h-8" />
        <h2 className="text-xl font-bold text-black">Smart Health Assistance</h2>
      </nav>

 <nav className="h-1" style={{ backgroundColor: "black" }}></nav>
      {/* Second Navbar - empty blue bar */}
      <nav className="h-5" style={{ backgroundColor: "#DBEBF1" }}></nav>
    
      {/* Third Navbar */}
      <nav className="flex items-center justify-between px-12 py-3 bg-white h-8">
        {/* Left: Logo + Hospital Name */}
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Logo" className="h-5" />
          <span className="font-bold text-black">Hospital</span>
        </div>

        {/* Right: Search Bar */}
        <div>
          <input
            type="text"
            placeholder="Search..."
            style={{border: "2px solid #D0EBFF"}}
            className="border rounded-full px-3 py-1 text-xs focus:outline-grey-500 focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </nav>
    </header>
  );
}
