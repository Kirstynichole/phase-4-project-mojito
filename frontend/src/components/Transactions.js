import React, { useState, useEffect } from 'react';

function Transactions() {
    const [newName, setNewName] = useState("");
    const [newPrice, setNewPrice] = useState(0);
    const [newCategory, setNewCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [transactions, setTransactions] = useState([]);
    
    useEffect(() => {
        fetch("http://localhost:5555/categories")
          .then(response => response.json())
          .then(data => setCategories(data))
        }, []);

    const handlePostTransaction = (event) => {
        event.preventDefault();
        
        let id = 0
        categories.map(category => {
            if (category.name === newCategory) {
                id = category.id
            }
            return id
        })
        const transactionData = {
            name: newName,
            amount: newPrice,
            category_id: id,
            user_id: 1
        }
        fetch("http://localhost:5555/transactiondata", {
            method: "POST",
            headers: {
                "Content-Type": "Application/JSON",
            },
            body: JSON.stringify(transactionData)
        })
        .then(response => response.json())
        .then(newTransaction => {
            setNewName("");
            setNewPrice(0);
            setNewCategory("");
        })
    }

    useEffect(() => {
        fetch("http://localhost:5555/transactiondata")
          .then(response => response.json())
          .then(data => setTransactions(data))
        }, [transactions]);

    return (
        <div>
            <h1>Add a Transaction</h1>
            <form onSubmit={handlePostTransaction}>
                <label>Transaction Name</label>
                <input type="text" placeholder="Rent" value={newName} onChange={(event) => setNewName(event.target.value)}></input>
                <br/>
                <label>Price</label>
                <input type="number" value={newPrice} onChange={(event) => setNewPrice(event.target.value)}></input>
                <br/>
                <label>Category</label>
                <select onChange={(event) => setNewCategory(event.target.value)}>
                    <option>Choose a Category</option>
                    {categories.map((category) => (
                        <option key={category.name} value={category.name}>{category.name}</option>
                    ))}
                </select>
                <br/>
                <label>Date</label>
                <input type="date"></input>
                <br/>
                <button type="submit">Submit</button>
            </form>
            <h1>View your Transactions</h1>
            <table>
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Date</th>
                    </tr>
                    {transactions.map(transaction => (
                        <tr key={transaction.id}>
                            <td>{transaction ? transaction.name : ''}</td>
                            <td>${transaction ? transaction.amount : ''}</td>
                            <td>{transaction && transaction.category ? transaction.category.name : ''}</td>
                        </tr>
                    ))}
                    
                </tbody>
            </table>
        </div>
    )
}

export default Transactions;