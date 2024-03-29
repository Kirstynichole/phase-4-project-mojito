import React from 'react'
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import LoginForm from './LoginForm';


const Login = () => {
    const [accountForm, setAccountForm] = useState(false)
    const [newName, setNewName] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const { attemptLogin } = useOutletContext();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    function createUser(e) {
        e.preventDefault();
        const userData = {
            name: newName,
            password_hash: newPassword
        };
        fetch("/user", {
        method: "POST",
        headers: {
            "Content-Type": "Application/JSON",
        },
        body: JSON.stringify(userData),
        })
        .then((response) => response.json())
        .then((newUser) => {
            console.log(newName)
            console.log(newPassword)
            setNewName("");
            setNewPassword("");
            attemptLogin({ name: newName, password: newPassword });
        });
    }

    const handleChangeUsername = (e) => setName(e.target.value);
    const handleChangePassword = (e) => setPassword(e.target.value);

    const handleChangeNewUsername = (e) => setNewName(e.target.value);
    const handleChangeNewPassword = (e) => setNewPassword(e.target.value);

    function handleSubmit(e) {
        e.preventDefault();
        attemptLogin({ name: name, password: password });
    }

    return (
    <div className="h-screen items-center px-4" style={{ paddingTop: "100px" }}>
        <LoginForm submitText={"Login"} handleSubmit={handleSubmit} handleChangeUsername={handleChangeUsername} name={name} handleChangePassword={handleChangePassword} password={password}/>
        <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline"
            onClick={() => setAccountForm(!accountForm)}
        >
            Create Account
        </button>
        {accountForm ? (
        <LoginForm submitText={"Submit"} handleSubmit={createUser} handleChangeUsername={handleChangeNewUsername} name={newName} handleChangePassword={handleChangeNewPassword} password={newPassword}/>
        ) : ("")}
    </div>
    );
}

export default Login

