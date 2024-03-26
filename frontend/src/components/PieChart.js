import React from "react";
import Plot from "react-plotly.js";
import { useState, useEffect } from "react";

function PieChart() {
    const [budgetData, setBudgetData] = useState([]);
    const [userData, setUserData] = useState({});

    useEffect(() => {
        fetch("http://localhost:5555/userdata")
        .then((response) => response.json())
        .then((data) => setUserData(data));
    }, []);

    useEffect(() => {
        fetch("http://localhost:5555/budgetdata")
        .then((response) => response.json())
        .then((data) => setBudgetData(data));
    }, []);

    const labels = budgetData.map((budget) => budget.category?.name);
    const values = budgetData.map((budget) => budget.category_budget);

    var data = [
        {
        values: values,
        labels: labels,
        type: "pie",
        textinfo: "label+percent",
        insidetextfont: { color: "#e5e7eb" }
        },
    ];

    return (
        <div
        style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
        }}
        >
        <Plot
            data={data}
            layout={{
            width: 475,
            height: 475,
            title: "Budget",
            color: "#e5e7eb",
            paper_bgcolor:'rgba(0,0,0,0)',
            plot_bgcolor:'rgba(0,0,0,0)',
            font:{
                color: "#e5e7eb",
                family: "Archivo Narrow"
            }
            }}
        />
        </div>
    );
}

export default PieChart;
