import React from 'react';
import { LiaLemonSolid } from "react-icons/lia";

function About() {
    return (
        <div className="mt-20 absolute top-20 px-8 lg:px-20 xl:px-40">
            <h1 className='w-full font-header font-bold text-3xl text-center'>About<LiaLemonSolid className="font-bold inline ml-1 mr-2" style={{ color: "#32CD32" }}/></h1>
            <div className='border-double border-2 border-mojitoGrey bg-mojitoBlue text-mojitoGrey rounded-xl m-5 mt-10 p-5 py-10 px-8'>
                <h2 className='underline text-center text-xl mb-7'>Welcome to Mojito</h2>
                <h3>Trying to get a better hold of your finances? Don't know how much you spend per month? Want to keep better track of or be more responsible with your spending on certain categories?</h3>
                <h3>Named after a recently deprecated app, Mint, Mojito allows you to set budgets on categories and easily track your spending against them.</h3>
            </div> 
            <ul className='mx-5 flex justify-between'>
                {/* <li className='flex-grow inline-block rounded-xl border-double border-2 border-mojitoBlue p-3 mx-1 bg-mojitoPeriwinkle'>Sign in</li> */}
                <li className='flex-grow inline-block rounded-xl border-double border-2 border-mojitoBlue p-3 mx-1 bg-mojitoPeriwinkle'>Add your monthly income and desired savings</li>
                <li className='flex-grow inline-block rounded-xl border-double border-2 border-mojitoBlue p-3 mx-1 bg-mojitoPeriwinkle'>Choose the categories you want to track</li>
                <li className='flex-grow inline-block rounded-xl border-double border-2 border-mojitoBlue p-3 mx-1 bg-mojitoPeriwinkle'>Add transactions</li>
                <li className='flex-grow inline-block rounded-xl border-double border-2 border-mojitoBlue p-3 mx-1 bg-mojitoPeriwinkle'>Get visibility on your finances!</li>
            </ul>
        </div>
    )
}

export default About;