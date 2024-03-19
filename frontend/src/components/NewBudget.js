import React, { useEffect, useState } from 'react';

function NewBudget() {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    const [categories, setCategories] = useState([]);
    const [month, setMonth] = useState('');
    const [income, setIncome] = useState(0);
    const [savings, setSavings] = useState(0)
    const budget = income - savings;
    const [userCategories, setUserCategories] = useState([])

    const handleSetUserCategories = (event) => {
        event.preventDefault();
        // categoryName = event.target.value
        if (userCategories.includes(event.target.value)) {
            setUserCategories(userCategories.filter((category) => (category !== event.target.value)))
        } else {
            setUserCategories([...userCategories, event.target.value]);    
        }
    };

    useEffect(() => {
        fetch("http://localhost:5555/categories")
          .then(response => response.json())
          .then(data => setCategories(data))
        }, []);

    
    return (
        <div>
            <h1>Set Your Budget!</h1>
            <form>
                <label>Month</label>
                <select>
                    <option>Choose your month</option>
                    {months.map((month) => (
                        <option key={month}>{month}</option>
                    ))}
                </select>
                <br/>
                <label>Year</label>
                <input type="text" placeholder="2024"></input>
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
                    <button key={category.name} value={category.name} onClick={(event) => handleSetUserCategories(event)}>{category.name}</button>
                ))}
                <button>Add...</button>
                <br /><br /><br />
                {userCategories ? userCategories.map((category) => (
                    <div key={category}>
                        <label>{category}</label>
                        <input type="text" placeholder="0" ></input>
                    </div>
                )) : ""}
                <br /><br /><br />
                <button type="submit">Submit Budget</button>
           </form>
           </div>
    )
}

export default NewBudget;