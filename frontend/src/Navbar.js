import { NavLink } from "react-router-dom";

function Navbar() {
    return (
        <nav>
            <div>
                <NavLink to="/">Home</NavLink>
            </div>
            <ul>
                <li>
                    <NavLink to="spend">Spend</NavLink>
                </li>
                <li>
                    <NavLink to="viewbudgets">View Budgets</NavLink>
                </li>
                <li>
                    <NavLink to="transactions">Transactions</NavLink>
                </li>
                <li>
                    <NavLink to="newbudget">Set Budget</NavLink>
                </li>
                <li>
                    <NavLink to="about">About</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;