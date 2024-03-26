import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function NewBudget() {
    const navigate = useNavigate();
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const years = [];
    const currentYear = 2024;
    for (let i = currentYear; i <= currentYear + 5; i++) {
        years.push(i);
    }

    const [categories, setCategories] = useState([]);
    const [month, setMonth] = useState("");
    const [year, setYear] = useState(0);
    const [income, setIncome] = useState(0);
    const [savings, setSavings] = useState(0);
    const budget = income - savings;
    const [userCategories, setUserCategories] = useState({});
    const [sum, setSum] = useState(0);

    const handleSetUserCategories = (event, category) => {
        event.preventDefault();
        setUserCategories((prevState) => {
        const updatedState = { ...prevState };
        if (updatedState.hasOwnProperty(category)) {
            delete updatedState[category];
        } else {
            updatedState[category] = null;
        }
        return updatedState;
        });
    };

    const handleSpendingChange = (category, value) => {
        setUserCategories((prevState) => ({
        ...prevState,
        [category]: value,
        }));
        let sum = 0;
        Object.values({ ...userCategories, [category]: value }).forEach((val) => {
        sum += parseInt(val || 0); // Parse the value to integer, default to 0 if it's null or undefined
        });
        setSum(sum);
    };
    useEffect(() => {
        fetch("http://localhost:5555/categories")
        .then((response) => response.json())
        .then((data) => setCategories(data));
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const userData = {
        income: income,
        savings: savings,
        budget: budget,
        user_id: 1,
        };
        fetch("http://localhost:5555/userdata", {
        method: "POST",
        headers: {
            "Content-Type": "Application/JSON",
        },
        body: JSON.stringify(userData),
        })
        .then((response) => response.json())
        .then((newUserData) => {
            setIncome(0);
            setSavings(0);
        });
        for (let key in userCategories) {
        if (userCategories.hasOwnProperty(key)) {
            let id = 0;
            console.log(`id before submission is ${id}`);
            categories.map((category) => {
            if (category.name === key) {
                id = category.id;
            }
            return id;
            });
            console.log(`id after submission is ${id}`);
            const categorySpend = {
            category_budget: userCategories[key],
            category_id: id,
            user_id: 1,
            };

            fetch("http://localhost:5555/budgetdata", {
            method: "POST",
            headers: {
                "Content-Type": "Application/JSON",
            },
            body: JSON.stringify(categorySpend),
            })
            .then((response) => response.json())
            .then((newBudget) => {
                setUserCategories({});
                navigate("/viewbudgets");
            });
        }
        }
    };

    return (
        <div className="mt-20 absolute top-20 px-8 lg:px-20 xl:px-40">
        <h1 className="w-full font-header font-bold text-3xl text-center">
            Set Your Budget
        </h1>
        <div className="border-dotted border-2 border-mojitoBlue bg-transparent text-mojitoBlue rounded-xl m-5 mt-10 p-5 py-10 px-8">
            <form onSubmit={handleSubmit}>
            <div className="inline">
                <label>Month</label>
                <select
                value={month}
                onChange={(event) => setMonth(event.target.value)}
                className="p-2 m-2 bg-white rounded-md text-mojitoBlue focus:outline-none"
                >
                {months.map((month) => (
                    <option key={month}>{month}</option>
                ))}
                </select>
            </div>
            <div className="inline">
                <label>Year</label>
                <select
                value={year}
                onChange={(event) => setYear(event.target.value)}
                className="p-2 m-2 bg-white rounded-md text-mojitoBlue focus:outline-none"
                >
                {years.map((year) => (
                    <option key={year}>{year}</option>
                ))}
                </select>
            </div>
            <div >
                <label>Income $</label>
                <input
                type="text"
                placeholder="1,000,000"
                value={income}
                onChange={(event) => setIncome(event.target.value)}
                className="p-2 m-2 bg-white rounded-md text-mojitoBlue focus:outline-none"
                ></input>
            </div>
            <div >
                <label>Savings $</label>
                <input
                type="text"
                placeholder="100,000"
                value={savings}
                onChange={(event) => setSavings(event.target.value)}
                className="p-2 m-2 bg-white rounded-md text-mojitoBlue focus:outline-none"
                ></input>
            </div>
            <br />
            <p className="font-bold">{`Calculated Budget: $${budget}`}</p>
            <br />
            <h1>Choose your spending categories:</h1>
            {categories.map((category) => (
                <button
                key={category.name}
                value={category.name}
                onClick={(event) => handleSetUserCategories(event, category.name)}
                className="inline-block rounded-xl border-dotted border-2 border-mojitoBlue p-3 m-1 bg-mojitoPeriwinkle"
                >
                {category.name}
                </button>
            ))}
            <br />
            {userCategories
                ? Object.keys(userCategories).map((category) => (
                    <div key={category}>
                    <label>{category}</label>
                    <input
                        type="number"
                        value={userCategories[category] || ""}
                        className="p-1 m-2 bg-white rounded-md text-mojitoBlue focus:outline-none"
                        onChange={(e) =>
                        handleSpendingChange(category, e.target.value)
                        }
                    />
                    </div>
                ))
                : ""}

            {Object.keys(userCategories).length > 0 && (
                <p className="p-2 m-2">Budget left to allocate: {budget - sum}</p>
            )}
            <button
                type="submit"
                className="inline bg-mojitoBlue text-mojitoGrey p-2 rounded-xl border-2 border-mojitoBlue hover:bg-mojitoGrey hover:text-mojitoBlue mt-2 mr-5"
            >
                Submit Budget
            </button>
            </form>
        </div>
        </div>
    );
}

export default NewBudget;
