import React, { useState, useEffect } from 'react';
// import NewBudget from './NewBudget'

function ViewBudgets() {
    const [budgetData, setBudgetData] = useState([])
    const [userData, setUserData] = useState({})
    const [edit, setEdit] = useState(false)

    useEffect(() => {
        fetch("http://localhost:5555/budgetdata")
        .then(response => response.json())
        .then(data => setBudgetData(data))
        }, []);

    useEffect(() => {
        fetch("http://localhost:5555/userdata")
        .then(response => response.json())
        .then(data => setUserData(data))
        }, []);

        const handleDelete = (id) => {
            const confirmed = window.confirm("Are you sure you want to delete this item?");
            if (confirmed) {
                fetch(`http://localhost:5555/budgetdata/${id}`, {method: "DELETE"})
                .then(response => {
                    if (response.ok) {
                        const filteredData = budgetData.filter(data => data.id !== id);
                        setBudgetData(filteredData);
                    }
                });
            }
        };

    return (
        <div>
            <h1>This is your budget</h1>
            <button onClick={() => setEdit(!edit)}>Edit</button>
            <h2>Total Income: ${userData && userData.income}</h2>
            <h2>Total Savings: ${userData && userData.savings}</h2>
            <h2>Total Budget: ${userData && userData.budget}</h2>
            {edit ? 
            // Allow for edits of budget data
            <form>
                {budgetData.map((budget, index) => (
                    <div key={index}>
                        <label>{budget.category?.name}</label>
                        <input type="number" defaultValue={budget.category_budget}></input>
                        <button type="submit" onClick={() => handleDelete(budget.id)}>X</button>
                    </div>
                ))}
                <button type="submit">Submit</button>
            </form>
            :
            // show static data
            budgetData.map((budget, index) => (
                <div key={index}>
                    <p>{budget.category?.name}: ${budget.category_budget}</p>
                    {/* Add more properties as needed */}
                </div>
))}            {/* <NewBudget /> */}
        </div>
    )
}

export default ViewBudgets;