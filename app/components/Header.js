'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import logo from '../icon.svg';

const isDev = process.env.NODE_ENV === "development";

export default function Header() {
    const pathname = usePathname();

    const getLinkClass = (path) => {
        return `nav-link ${pathname === path ? 'active' : ''}`;
    };

    return (
        <header className="header">
            <nav className="nav-menu">
                <Link href="/" className="logo-link" title="Strona główna">
                    <Image src={logo} alt="S19 Logo" width={36} height={36} priority />
                </Link>
                <Link href="/" className={getLinkClass('/')}>Radzyń Podlaski - Kock</Link>
                <Link href="/kock" className={getLinkClass('/kock')}>Obwodnica Kocka</Link>
                {isDev && <Link href="/builder" className={getLinkClass('/builder')}>Narzędzie OSM</Link>}
            </nav>
        </header>
    )
}
