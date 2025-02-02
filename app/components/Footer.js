'use client';
import React from "react";
const data = new Date();
const year = data.getFullYear();

export default function Footer(){
    
    return(
        <div id="footer"><b>* {year} * S19 — obwodnica Kocka * </b></div>
    )
}