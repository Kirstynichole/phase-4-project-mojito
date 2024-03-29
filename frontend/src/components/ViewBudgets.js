import React, { useState, useEffect } from "react";
import PieChart from "./PieChart";
// import NewBudget from './NewBudget'

function ViewBudgets() {
    const [budgetData, setBudgetData] = useState([]);
    const [userData, setUserData] = useState({});
    const [edit, setEdit] = useState(false);
    const [editedBudgets, setEditedBudgets] = useState({});
    const [sum, setSum] = useState(0);
    const [reloadBudgetData, setReloadBudgetData] = useState(false);

    useEffect(() => {
        fetch("/budgetdata")
        .then((response) => response.json())
        .then((data) => setBudgetData(data));
    }, [edit, reloadBudgetData]);

    useEffect(() => {
        fetch("/userdata")
        .then((response) => response.json())
        .then((data) => setUserData(data));
    }, []);

    const handleDelete = (id) => {
        const confirmed = window.confirm(
        "Are you sure you want to delete this item?"
        );
        if (confirmed) {
        fetch(`/budgetdata/${id}`, {
            method: "DELETE",
        }).then((response) => {
            if (response.ok) {
            const filteredData = budgetData.filter((data) => data.id !== id);
            setBudgetData(filteredData);
            }
        });
        }
    };

    const handleEditChange = (event, id) => {
        // Store the edited value in local state
        setEditedBudgets((prevState) => ({
        ...prevState,
        [id]: event.target.value,
        }));

        // Calculate the sum using the updated state
        let sum = 0;
        Object.values({
        ...editedBudgets, // Include the latest edited values
        [id]: event.target.value, // Include the currently edited value
        }).forEach((val) => {
        sum += parseInt(val || 0); // Parse the value to integer, default to 0 if it's null or undefined
        });

        setSum(sum);
    };

    const handleEditData = (event) => {
        event.preventDefault();

        // Iterate over the edited budgets and send PATCH requests
        Object.keys(editedBudgets).forEach((id) => {
        fetch(`http://localhost:5555/budgetdata/${id}`, {
            method: "PATCH",
            headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            },
            body: JSON.stringify({
            category_budget: parseFloat(editedBudgets[id]),
            }),
        })
            .then((response) => response.json())
            .then((updatedBudget) => {
            setBudgetData((prevState) =>
                prevState.map((budget) => {
                if (budget.id === id) {
                    return {
                    ...budget,
                    category_budget: parseFloat(editedBudgets[id]),
                    };
                }
                return budget;
                })
            );
            })
            .catch((error) => {
            console.error("Error:", error);
            });
        });
        setReloadBudgetData(!reloadBudgetData);
        setEdit(!edit);
        setEditedBudgets({});
    };

    return (
        <div className="mt-20 px-8 lg:px-20 xl:px-40">
        <h1 className="font-header font-bold text-3xl text-center">
            Your Budget
        </h1>
        <div className="border-double border-2 border-mojitoGrey bg-mojitoBlue text-mojitoGrey rounded-xl m-5 my-10 p-5 py-10 px-8 flex flex-col lg:flex-row justify-between">
            <div className="mt-5 lg:w-1/2 lg:ml-10 lg:pr-4">
            <div className="flex items-center">
                <div className="border-2 text-2xl border-mojitoGrey border-double rounded-xl p-2 m-2">
                <h2>Total Income: ${userData && userData.income}</h2>
                <h2>Total Savings: ${userData && userData.savings}</h2>
                <h2>Total left to Budget: ${userData && userData.budget}</h2>
                </div>
            </div>
            <div className="border-2 rounded-xl border-mojitoBlue m-2 p-2">
            {edit ? (
                // Allow for edits of budget data
                <form onSubmit={handleEditData}>
                {budgetData.map((budget, index) => (
                    <div key={index}>
                    <label>{budget.category?.name}</label>
                    <input
                        type="number"
                        defaultValue={budget.category_budget}
                        className="p-1 m-2 bg-white rounded-md text-mojitoBlue focus:outline-none"
                        onChange={(event) => handleEditChange(event, budget.id)}
                    />
                    <button onClick={() => handleDelete(budget.id)}>X</button>
                    </div>
                ))}
                <p>Total left to allocate: {userData.budget - sum}</p>
                <button
                    className="bg-mojitoGrey text-mojitoBlue p-2 rounded-xl border-2 border-mojitoBlue hover:scale-105 mt-2 mr-5"
                    type="submit"
                >
                    Submit
                </button>
                </form>
            ) : (
                // show static data
                budgetData.map((budget, index) => (
                <div key={index}>
                    <p>
                    {budget.category?.name}: ${budget.category_budget}
                    </p>
                    {/* Add more properties as needed */}
                </div>
                ))
                
            )}
            {/* <NewBudget /> */}
            {!edit ? (
                <button
                className="bg-mojitoPeriwinkle text-mojitoBlue p-2 rounded-xl border-2 border-mojitoBlue hover:scale-105 mt-5 mr-3"
                onClick={() => setEdit(!edit)}
                >
                Edit
                </button>
            ) : null}
            </div>
            </div>
            <div className="lg:w-1/2 lg:pl-4 lg:-mt-20 lg:mr-10">
            <PieChart />
            </div>
        </div>
        </div>
    );
}

export default ViewBudgets;
