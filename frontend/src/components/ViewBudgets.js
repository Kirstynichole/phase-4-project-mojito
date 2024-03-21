import React, { useState, useEffect } from 'react';
// import NewBudget from './NewBudget'

function ViewBudgets() {
    const [budgetData, setBudgetData] = useState([])
    const [userData, setUserData] = useState({})
    const [edit, setEdit] = useState(false)
    const [editedBudgets, setEditedBudgets] = useState({});
    const [sum, setSum] = useState(0);

    useEffect(() => {
        fetch("http://localhost:5555/budgetdata")
        .then(response => response.json())
        .then(data => setBudgetData(data))
        }, [edit, budgetData]);

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
    
    const handleEditChange = (event, id) => {
        // Store the edited value in local state
        setEditedBudgets(prevState => ({
            ...prevState,
            [id]: event.target.value
        }));
    
        // Calculate the sum using the updated state
        let sum = 0;
        Object.values({
            ...editedBudgets, // Include the latest edited values
            [id]: event.target.value // Include the currently edited value
        }).forEach(val => {
            sum += parseInt(val || 0); // Parse the value to integer, default to 0 if it's null or undefined
        });
    
        setSum(sum);
    };
    

    const handleEditData = (event) => {
        event.preventDefault();
        
        // Iterate over the edited budgets and send PATCH requests
        Object.keys(editedBudgets).forEach(id => {
            fetch(`http://localhost:5555/budgetdata/${id}`, {
                method: "PATCH", 
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    "category_budget": parseFloat(editedBudgets[id])
                })
            })
            .then(response => response.json())
            .then(updatedBudget => {
                
                setBudgetData(prevState => prevState.map(budget => {
                    if (budget.id === id) {
                        return {
                            ...budget,
                            category_budget: parseFloat(editedBudgets[id])
                        };
                    }
                    return budget;
                }));
            })
            .catch(error => {
                console.error("Error:", error);
            });

        });
        setEdit(!edit);
        setEditedBudgets({});
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
            <form onSubmit={handleEditData}>
                {budgetData.map((budget, index) => (
                    <div key={index}>
                        <label>{budget.category?.name}</label>
                        <input 
                            type="number" 
                            defaultValue={budget.category_budget}
                            onChange={(event) => handleEditChange(event, budget.id)}
                        ></input>
                        <button onClick={() => handleDelete(budget.id)}>X</button>
                    </div>
                ))}
                <p>Total left to allocate: {userData.budget - sum}</p>
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