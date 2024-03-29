import React from "react";
import { useOutletContext } from "react-router-dom";
import { useState } from "react";

const LoginForm = ({submitText, handleSubmit, handleChangeUsername, name, handleChangePassword, password}) => {


    return (
        <div >
        <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={handleSubmit}
        >
            <div className="mb-4">
            <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
            >
                Username
            </label>
            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                onChange={handleChangeUsername}
                value={name}
                placeholder="name"
            />
            </div>
            <div className="mb-6">
            <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
            >
                Password
            </label>
            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                onChange={handleChangePassword}
                value={password}
                placeholder="password"
            />
            </div>

            <div className="flex items-center justify-between">
            <button
                className="inline bg-mojitoBlue text-mojitoGrey p-2 rounded-xl border-2 border-mojitoBlue hover:bg-mojitoGrey hover:text-mojitoBlue mt-2 mr-5"
                type="button"
                onClick={handleSubmit}
            >
                {submitText}
            </button>
            </div>
        </form>
        </div>
    );
};

export default LoginForm;
