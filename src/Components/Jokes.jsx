import React from "react";
import { useState,useEffect } from "react";
export default function Jokes(){
    const App_ID ="";
    const APP_KEY ="";
    const[jokes,setJokes]=useState("");

    useEffect(()=>{
        const getJokes =async()=>{
            const response = await fetch()
        }
    })


    
    return (
        <>
            
            <h1>The Joke of the day:</h1>


        </>
    )
}