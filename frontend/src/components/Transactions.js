import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import { useOutletContext } from "react-router-dom";

function Transactions() {
    const [newName, setNewName] = useState("");
    const [newPrice, setNewPrice] = useState(0);
    const [newCategory, setNewCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [reloadTransactions, setReloadTransactions] = useState(false);
    const [dates, setDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");
    const [filteredMonth, setFilteredMonth] = useState("");
    const {user} = useOutletContext();
    console.log(user.id)

    useEffect(() => {
        fetch("/categories")
        .then((response) => response.json())
        .then((data) => setCategories(data));
    }, []);

    useEffect(() => {
        fetch("/dates")
        .then((response) => response.json())
        .then((data) => setDates(data));
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

        let dateId = 0;
        dates.map((date) => {
            if (date.month === selectedDate) {
                dateId = date.id;
            }
            return dateId;
        })

        const transactionData = {
        name: newName,
        amount: newPrice,
        category_id: id,
        user_id: user.id,
        date_id: dateId
        };
        fetch("/transactiondata", {
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
            setSelectedDate("");
        });
    };

    useEffect(() => {
        fetch("/transactiondata")
        .then((response) => response.json())
        .then((data) => setTransactions(data));
    }, [reloadTransactions]);

    useEffect(() => {
        fetch(`/transactiondata/${filteredMonth}`)
        .then((response) => response.json())
        .then((data) => setTransactions(data));
    }, [filteredMonth, reloadTransactions]);

    const handleFilteredMonth = (event) => {
        const month = event.target.value 
        dates.map((date) => {
            if (date.month === month) {
                setFilteredMonth(date.id);
            }
        })
    }
    const handleDeleteTransaction = (id) => {
        fetch(`/transactiondata/${id}`, {
            method: "DELETE",
        }).then((response) => {
            if (response.ok) {
            const filteredData = transactions.filter((data) => data.id !== id);
            setTransactions(filteredData);
            }
        });
    };

    return (
        <div className=" md:flex items-center justify-center h-full">
        <div className="mt-20 absolute top-20 px-8 lg:px-20 xl:px-40">
        <h1 className="w-full text-center font-header font-bold text-3xl">
            Add a Transaction
        </h1>
        <div className="md:flex border-dotted border-2 border-mojitoBlue flex bg-transparent text-mojitoBlue rounded-xl m-5 mt-10 p-5 py-10 px-8">
            <form className="flex-col w-full" onSubmit={handlePostTransaction}>
            <div className="flex flex-col">
            <div className="flex items-center">
            <label className="mr-2">Transaction Name</label>
            <input
                type="text"
                placeholder="Rent"
                value={newName}
                onChange={(event) => setNewName(event.target.value)}
                className="p-2 m-2 bg-white rounded-md text-mojitoBlue focus:outline-none"
            ></input>
            </div>
            </div>
            <div className="flex flex-col">
            <div className="flex items-center">
            <label>Price</label>
            <input
                type="number"
                value={newPrice}
                onChange={(event) => setNewPrice(event.target.value)}
                className="p-2 m-2 bg-white rounded-md text-mojitoBlue focus:outline-none"
            ></input>
            </div>
            </div>
            <div className="flex flex-col">
            <div className="flex items-center">
            <label>Category</label>
            <select className="p-2 m-2 bg-white rounded-md text-mojitoBlue focus:outline-none" onChange={(event) => setNewCategory(event.target.value)}>
                <option>Choose a Category</option>
                {categories.map((category) => (
                <option key={category.name} value={category.name} >
                    {category.name}
                </option>
                ))}
            </select>
            </div>
            </div>
            <div className="flex flex-col">
            <div className="flex items-center">
            <label>Month</label>
            <select className="p-2 m-2 bg-white rounded-md text-mojitoBlue focus:outline-none" onChange={(event) => setSelectedDate(event.target.value)}>
                <option>Select a Month</option>
                {dates.map((date) => (
                <option key={date.id} value={date.month}>{date.month}</option>
                ))}
            </select>
            </div>
            </div>
            <br/>
            <button type="submit" className="bg-mojitoBlue text-mojitoGrey p-2 rounded-xl border-2 border-mojitoBlue hover:bg-mojitoGrey hover:text-mojitoBlue mt-2 mr-5">Submit</button>
            </form>

            <div className="rounded-lg">
            <h1 className="font-header m-5 text-center text-bold">View your Transactions</h1>
            <select className="p-2 m-2 bg-white rounded-md text-mojitoBlue focus:outline-none" onChange={handleFilteredMonth}>
                <option>Select a Month</option>
                {dates.map((date) => (
                <option key={date.id} value={date.month}>{date.month}</option>
                ))}
            </select>
            
            <table className="min-w-10 rounded-lg items-center border-2 border-mojitoBlue p-5">
            <tbody className="text-center">
                <tr >
                <th className="items-center py-3 px-6 text-mojitoGrey bg-mojitoBlue" >Name</th>
                <th className="items-center py-3 px-6 text-mojitoGrey bg-mojitoBlue">Price</th>
                <th className="items-center py-3 px-6 text-mojitoGrey bg-mojitoBlue">Category</th>
                <th className="items-center py-3 px-6 text-mojitoGrey bg-mojitoBlue">Month</th>
                <th className="items-center py-3 px-3 text-mojitoGrey bg-mojitoBlue">Delete</th>
                </tr>
                {transactions.map((transaction) => (
                <tr className="hover:bg-mojitoPeriwinkle" key={transaction.id}>
                    <td className="py-3 px-6">{transaction ? transaction.name : ""}</td>
                    <td className="py-3 px-6">${transaction ? transaction.amount : ""}</td>
                    <td className="py-3 px-6">
                    {transaction && transaction.category
                        ? transaction.category.name
                        : ""}
                    </td>
                    <td className="py-3 px-6">
                        {transaction && transaction.date 
                        ? transaction.date.month
                        : ""}
                    </td>
                    <td>
                    <button onClick={() => handleDeleteTransaction(transaction.id)} className="font-bold">X</button>
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
