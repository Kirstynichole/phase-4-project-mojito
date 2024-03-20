import React, { useState, useEffect } from 'react';
// import NewBudget from './NewBudget'

function ViewBudgets() {
    const [budgetData, setBudgetData] = useState([])
    const [userData, setUserData] = useState({})

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

        console.log(budgetData)
        console.log(userData)

    return (
        <div>
            <h1>This is your budget</h1>
            <h2>Total Income: ${userData && userData.income}</h2>
            <h2>Total Savings: ${userData && userData.savings}</h2>
            <h2>Total Budget: ${userData && userData.budget}</h2>
            {budgetData.map((item, index) => (
                <div key={index}>
                    <p>{item.category?.name}: ${item.category_budget}</p>
                    {/* Add more properties as needed */}
                </div>
))}            {/* <NewBudget /> */}
        </div>
    )
}

export default ViewBudgets;