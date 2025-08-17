import { NavLink } from "react-router";
import { FaBars, FaLaptopCode, FaTimes } from "react-icons/fa";
import { useState } from "react";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const ActiveLinkClass = ({ isActive }: { isActive: boolean }) => {
        return isActive ? 'text-blue-400 font-semibold' : 'transition hover:text-blue-400'
    }
    return (
        <nav className="bg-gray-800 border-b border-gray-700 shadow-md sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
                <NavLink to='/' className='flex items-center gap-2 text-lg font-bold text-blue-300'>
                    <FaLaptopCode className="text-blue-400 text-xl" />
                    <span>The Friendly Developer</span>
                </NavLink>

                {/* Desktop nav */}
                <div className="hidden md:flex items-center gap-6">
                    <div className="space-x-4 text-sm text-gray-300">
                        <NavLink className={ActiveLinkClass} to='/'>Home</NavLink>
                        <NavLink className={ActiveLinkClass} to='/projects'>Projects</NavLink>
                        <NavLink className={ActiveLinkClass} to='/blog'>Blog</NavLink>
                        <NavLink className={ActiveLinkClass} to='/about'>About</NavLink>
                        <NavLink className={ActiveLinkClass} to='/contact'>Contact</NavLink>
                    </div>
                </div>

                <div className="md:hidden flex items-center gap-4">
                    <button title="Menu" className="text-blue-400 text-xl cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
            </div>

            {/* Mobile nav */}
            {menuOpen && (
                <div className="md:hidden bg-gray-800 border-t border-gray-700 px-6 py-4 space-y-2 space-x-4 text-center">
                    <NavLink onClick={() => setMenuOpen(false)} className={ActiveLinkClass} to='/'>Home</NavLink>
                    <NavLink onClick={() => setMenuOpen(false)} className={ActiveLinkClass} to='/projects'>Projects</NavLink>
                    <NavLink onClick={() => setMenuOpen(false)} className={ActiveLinkClass} to='/blog'>Blog</NavLink>
                    <NavLink onClick={() => setMenuOpen(false)} className={ActiveLinkClass} to='/about'>About</NavLink>
                    <NavLink onClick={() => setMenuOpen(false)} className={ActiveLinkClass} to='/contact'>Contact</NavLink>
                </div>
            )}
        </nav>
    );
}

export default Navbar;