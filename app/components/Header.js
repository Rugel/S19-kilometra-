'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import logo from '../icon.svg';

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
                <Link href="/" className={getLinkClass('/')}>Obwodnica Kocka</Link>
                <Link href="/radzyn-kock" className={getLinkClass('/radzyn-kock')}>Radzyń Podlaski - Kock</Link>
            </nav>
        </header>
    )
}
