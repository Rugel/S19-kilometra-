'use client';

const data = new Date();
const year = data.getFullYear();

export default function Footer() {
    return (
        <footer id="footer">
            &copy; {year} *** S19 Kock - Wola Skromowska ***
        </footer>
    );
}