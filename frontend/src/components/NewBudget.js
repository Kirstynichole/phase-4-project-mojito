import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function NewBudget() {
    const navigate = useNavigate();
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const years = [];
    const currentYear = 2024;
    for (let i = currentYear; i <= currentYear + 5; i++) {
        years.push(i)
    };

    const [categories, setCategories] = useState([]);
    const [month, setMonth] = useState('');
    const [year, setYear] = useState(0);
    const [income, setIncome] = useState(0);
    const [savings, setSavings] = useState(0);
    const budget = income - savings;
    const [userCategories, setUserCategories] = useState({});
    const [sum, setSum] = useState(0)

    const handleSetUserCategories = (event, category) => {
        event.preventDefault()
        setUserCategories(prevState => {
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
        setUserCategories(prevState => ({
            ...prevState,
            [category]: value
        }));
        let sum = 0
        Object.values({...userCategories, [category]: value}).forEach(val => {
            sum += parseInt(val || 0); // Parse the value to integer, default to 0 if it's null or undefined
        });
        setSum(sum);
    };
    useEffect(() => {
        fetch("http://localhost:5555/categories")
          .then(response => response.json())
          .then(data => setCategories(data))
        }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const userData = {
            income: income,
            savings: savings,
            budget: budget,
            user_id: 1
        }
        fetch("http://localhost:5555/userdata", {
            method: "POST",
            headers: {
                "Content-Type": "Application/JSON",
            },
            body: JSON.stringify(userData),
        })
        .then((response) => response.json())
        .then((newUserData) => {
            setIncome(0)
            setSavings(0)
        });
        for (let key in userCategories) {
            if (userCategories.hasOwnProperty(key)) {
                const categorySpend = {
                    category_budget: userCategories[key],
                    category_id: 1,
                    user_id: 1
                }

                fetch("http://localhost:5555/budgetdata", {
                    method: "POST",
                    headers: {
                        "Content-Type": "Application/JSON",
                    },
                    body: JSON.stringify(categorySpend),
                })
                    .then((response) => response.json())
                    .then((newBudget) => {
                        setUserCategories({})
                        navigate('/viewbudgets')
                    });
            };
        };
    };
    
    return (
        <div>
            <h1>Set Your Budget!</h1>
            <form onSubmit={handleSubmit}>
                <label>Month</label>
                <select value={month} onChange={(event) => setMonth(event.target.value)}>
                    {months.map((month) => (
                        <option key={month}>{month}</option>
                    ))}
                </select>
                <br/>
                <label>Year</label>
                <select value={year} onChange={(event) => setYear(event.target.value)}>
                    {years.map((year) => (
                        <option key={year}>{year}</option>
                    ))}
                </select>
                <br />
                <label>Income $</label>
                <input type="text" placeholder="1,000,000" value={income} onChange={(event) => setIncome(event.target.value)}></input>
                <br/>
                <label>Savings $</label>
                <input type="text" placeholder="100,000" value={savings} onChange={(event) => setSavings(event.target.value)}></input>
                <br/>
                <p>{`Calculated Budget: $${budget}`}</p>
        
                <h1>Choose your spending categories</h1>
                {categories.map((category) => (
                    <button key={category.name} value={category.name} onClick={(event) => handleSetUserCategories(event, category.name)}>{category.name}</button>
                ))}
                <br /><br /><br />
                {userCategories ? Object.keys(userCategories).map(category => (
                    <div key={category}>
                        <label>{category}</label>
                        <input 
                            type="number" 
                            value={userCategories[category] || ''} 
                            onChange={(e) => handleSpendingChange(category, e.target.value)} 
                        />
                        <br />
                    </div>
                )) : ""}
                
                {Object.keys(userCategories).length > 0 && <p>Budget left to allocate: {budget - sum}</p>}

                <br /><br /><br />
                <button type="submit">Submit Budget</button>
           </form>
           </div>
    )
}

export default NewBudget;