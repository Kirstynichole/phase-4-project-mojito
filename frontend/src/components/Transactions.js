import React, { useState, useEffect } from "react";

function Transactions() {
    const [newName, setNewName] = useState("");
    const [newPrice, setNewPrice] = useState(0);
    const [newCategory, setNewCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [reloadTransactions, setReloadTransactions] = useState(false);

    useEffect(() => {
        fetch("http://localhost:5555/categories")
        .then((response) => response.json())
        .then((data) => setCategories(data));
    }, []);

    const handlePostTransaction = (event) => {
        event.preventDefault();

        let id = 0;
        categories.map((category) => {
        if (category.name === newCategory) {
            id = category.id;
        }
        return id;
        });
        const transactionData = {
        name: newName,
        amount: newPrice,
        category_id: id,
        user_id: 1,
        };
        fetch("http://localhost:5555/transactiondata", {
        method: "POST",
        headers: {
            "Content-Type": "Application/JSON",
        },
        body: JSON.stringify(transactionData),
        })
        .then((response) => response.json())
        .then((newTransaction) => {
            setReloadTransactions((prevState) => !prevState);
            setNewName("");
            setNewPrice(0);
            setNewCategory("");
        });
    };

    useEffect(() => {
        fetch("http://localhost:5555/transactiondata")
        .then((response) => response.json())
        .then((data) => setTransactions(data));
    }, [reloadTransactions]);

    return (
        <div className="flex items-center justify-center h-full">
        <div className="mt-20 absolute top-20 px-8 lg:px-20 xl:px-40">
        <h1 className="w-full text-center font-header font-bold text-3xl">
            Add a Transaction
        </h1>
        <div className="border-dotted border-2 border-mojitoBlue flex bg-transparent text-mojitoBlue rounded-xl m-5 mt-10 p-5 py-10 px-8">
            <form className="flex-col w-full" onSubmit={handlePostTransaction}>
            <label>Transaction Name</label>
            <input
                type="text"
                placeholder="Rent"
                value={newName}
                onChange={(event) => setNewName(event.target.value)}
                className="p-2 m-2 bg-white rounded-md text-mojitoBlue focus:outline-none"
            ></input>
            <br />
            <label>Price</label>
            <input
                type="number"
                value={newPrice}
                onChange={(event) => setNewPrice(event.target.value)}
                className="p-2 m-2 bg-white rounded-md text-mojitoBlue focus:outline-none"
            ></input>
            <br />
            <label>Category</label>
            <select className="p-2 m-2 bg-white rounded-md text-mojitoBlue focus:outline-none" onChange={(event) => setNewCategory(event.target.value)}>
                <option>Choose a Category</option>
                {categories.map((category) => (
                <option key={category.name} value={category.name} >
                    {category.name}
                </option>
                ))}
            </select>
            <br />
            <label>Date</label>
            <input type="date" className="p-2 m-2 bg-white rounded-md text-mojitoBlue focus:outline-none"></input>
            <br />
            <button type="submit" className="inline bg-mojitoBlue text-mojitoGrey p-2 rounded-xl border-2 border-mojitoBlue hover:bg-mojitoGrey hover:text-mojitoBlue mt-2 mr-5">Submit</button>
            </form>
            <h1 className="font-header m-5 text-center">View your Transactions</h1>
            <div className="rounded-lg">
            <table className="rounded-lg items-center border-2 border-mojitoBlue p-5">
            <tbody className="text-center">
                <tr>
                <th className="items-center py-3 bg-mojitoPeriwinkle" >Name</th>
                <th className="items-center py-3 bg-mojitoPeriwinkle">Price</th>
                <th className="items-center py-3 bg-mojitoPeriwinkle">Category</th>
                <th className="items-center py-3 pr-4 bg-mojitoPeriwinkle">Date</th>
                </tr>
                {transactions.map((transaction) => (
                <tr className="hover:bg-mojitoPeriwinkle hover:scale-105" key={transaction.id}>
                    <td className="py-3 px-6">{transaction ? transaction.name : ""}</td>
                    <td className="py-3 px-6">${transaction ? transaction.amount : ""}</td>
                    <td>
                    {transaction && transaction.category
                        ? transaction.category.name
                        : ""}
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
            </div>
        </div>
        </div>
        </div>
    );
}

export default Transactions;
