import { NavLink } from "react-router-dom";
import { BiDrink } from "react-icons/bi";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
    const [nav, setNav] = useState(false);

    return (
        <nav className="flex text-center items-center justify-between w-full h-20 font-header fixed px-4 mt-3">
        <div className="text-4xl font-bold mt-2 ml-5">
            <NavLink
            onClick={nav ? () => setNav(!nav) : null}
            to="/"
            style={{ cursor: "pointer" }}
            >
            Mojito
            <BiDrink className="inline text-3xl transition-transform duration-300 transform hover:rotate-12" />
            </NavLink>
        </div>
        <div className="flex-grow"></div>
        <div className="hidden md:flex flex-grow justify-center items-center">
            <ul className="flex items-center justify-center border-double border-2 bg-mojitoGrey border-mojitoBlue p-1 m-3 mt-7 rounded-md">
            <div className="transition duration-200 ease-in-out hover:bg-mojitoBlue hover:text-mojitoGrey p-2 rounded-md">
                <li className="m-2" style={{ cursor: "pointer" }}>
                <NavLink to="spend">Spend </NavLink>
                </li>
            </div>
            <div className="hidden md:flex transition duration-200 ease-in-out hover:bg-mojitoBlue hover:text-mojitoGrey p-2 rounded-md">
                <li className="m-2" style={{ cursor: "pointer" }}>
                <NavLink to="viewbudgets">View Budgets</NavLink>
                </li>
            </div>
            <div className="transition duration-200 ease-in-out hover:bg-mojitoBlue hover:text-mojitoGrey p-2 rounded-md">
                <li className="m-2" style={{ cursor: "pointer" }}>
                <NavLink to="transactions">Transactions</NavLink>
                </li>
            </div>
            <div className="transition duration-200 ease-in-out hover:bg-mojitoBlue hover:text-mojitoGrey p-2 rounded-md">
                <li className="m-2" style={{ cursor: "pointer" }}>
                <NavLink to="newbudget">Set Budget</NavLink>
                </li>
            </div>
            <div className="transition duration-200 ease-in-out hover:bg-mojitoBlue hover:text-mojitoGrey p-2 rounded-md">
                <li className="m-2" style={{ cursor: "pointer" }}>
                <NavLink to="about">About</NavLink>
                </li>
            </div>
            </ul>
            <div className="ml-auto">
            <div className="font-bold bg-mojitoBlue text-mojitoGrey p-2 rounded-md hover:rounded-2xl mt-2 mr-5">
                <NavLink to="/" style={{ cursor: "pointer" }}>
                Login
                </NavLink>
            </div>
            </div>
        </div>
        <div
            className="cursor-pointer pr-2 z-10 text-mojitoBlue md:hidden"
            onClick={() => setNav(!nav)}
        >
            {nav ? <FaTimes size={20} /> : <FaBars size={20} />}
        </div>

        {nav && (
            <>
            <ul className="flex justify-center items-center absolute top-0 right-20 bg-mojitoPeriwinkle rounded-xl">
                <div className="transition ease-in-out hover:bg-mojitoBlue p-2 w-full text-center rounded-md">
                <li className="text-lg font-header cursor-pointer text-mojitoGrey">
                    <NavLink onClick={() => setNav(!nav)} to="spend">
                    Spend
                    </NavLink>
                </li>
                </div>
                <div className="transition ease-in-out hover:bg-mojitoBlue p-2 w-full text-center rounded-md">
                <li className="text-lg font-header cursor-pointer text-mojitoGrey">
                    <NavLink onClick={() => setNav(!nav)} to="viewbudgets">
                    View Budgets
                    </NavLink>
                </li>
                </div>
                <div className="transition ease-in-out hover:bg-mojitoBlue p-2 w-full text-center rounded-md">
                <li className="text-lg font-header cursor-pointer text-mojitoGrey">
                    <NavLink onClick={() => setNav(!nav)} to="transactions">
                    Transactions
                    </NavLink>
                </li>
                </div>
                <div className="transition ease-in-out hover:bg-mojitoBlue p-2 w-full text-center rounded-md">
                <li className="text-lg font-header cursor-pointer text-mojitoGrey">
                    <NavLink onClick={() => setNav(!nav)} to="newbudget">
                    Set Budget
                    </NavLink>
                </li>
                </div>
                <div className="transition ease-in-out hover:bg-mojitoBlue p-2 w-full text-center rounded-md">
                <li className="text-lg font-header cursor-pointer text-mojitoGrey">
                    <NavLink onClick={() => setNav(!nav)} to="about">
                    About
                    </NavLink>
                </li>
                </div>
                <div className="transition ease-in-out hover:bg-mojitoBlue p-2 w-full text-center rounded-md">
                <li className="text-lg font-header cursor-pointer text-mojitoGrey">
                    <NavLink onClick={() => setNav(!nav)} to="/">
                    Login
                    </NavLink>
                </li>
                </div>
            </ul>
            <div
                onClick={() => setNav(!nav)}
                className="cursor-pointer pr-4 text-mojitoGrey md:hidden"
            ></div>
            </>
        )}
        </nav>
    );
}

export default Navbar;
