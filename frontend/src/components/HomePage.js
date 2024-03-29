import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

const HomePage = () => {
    const { user } = useOutletContext();
    return (
        <div className="mt-20 font-header absolute top-20 px-4 lg:px-20">
        <h1 className="text-7xl md:text-9xl p-2">Finances on the rocks?</h1>
        <h2 className="text-5xl m-5 md:text-7xl text-mojitoPeriwinkle p-2">
            Budget with Mojito
        </h2>
        <button className="ml-8 m-5">
            {!user ? (
            <NavLink
                to="login"
                style={{ cursor: "pointer" }}
                className="p-3 text-4xl md:text-6xl border-2 rounded-xl bg-mojitoPeriwinkle hover:bg-mojitoBlue hover:text-mojitoGrey hover:border-mojitoPeriwinkle"
            >
                Get started{" "}
                <IoIosArrowForward className="inline text-3xl md:text-5xl" />
            </NavLink>
            ) : (
            <NavLink
                to="/newbudget"
                style={{ cursor: "pointer" }}
                className="p-3 text-4xl md:text-6xl border-2 rounded-xl bg-mojitoPeriwinkle hover:bg-mojitoBlue hover:text-mojitoGrey hover:border-mojitoPeriwinkle"
            >
                Get started{" "}
                <IoIosArrowForward className="inline text-3xl md:text-5xl" />
            </NavLink>
            )}
        </button>
        </div>
    );
};

export default HomePage;
