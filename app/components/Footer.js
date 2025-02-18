'use client';

const data = new Date();
const year = data.getFullYear();

export default function Footer(){
    
    return(
        <div id="footer"><b>* S19 — obwodnica Kocka * {year} *</b></div>
    )
}