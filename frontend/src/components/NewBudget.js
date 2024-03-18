import React, { useState } from 'react';

function NewBudget() {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    const [month, setMonth] = useState('')
    const [income, setIncome] = useState(0);
    const [savings, setSavings] = useState(0)
    const budget = income - savings;

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
                <label>Income $</label>
                <input type="text" placeholder="1,000,000"></input>
                <br/>
                <label>Savings $</label>
                <input type="text" placeholder="100,000"></input>
                <br/>
                <p>{`Calculated Budget: $${budget}`}</p>
            </form>
        </div>
    )
}

export default NewBudget;