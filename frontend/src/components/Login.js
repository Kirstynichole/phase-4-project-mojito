import React from 'react'
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import LoginForm from './LoginForm';

const Login = () => {
    const [accountForm, setAccountForm] = useState(false)



    return (
    <div className="h-screen items-center px-4" style={{ paddingTop: "100px" }}>
        <LoginForm submitText={"Login"}/>
        <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline"
            onClick={() => setAccountForm(!accountForm)}
        >
            Create Account
        </button>
        {accountForm ? (
        <LoginForm submitText={"Submit"}/>
        ) : ("")}
    </div>
    );
}

export default Login

