'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
    const pathname = usePathname();

    const getLinkStyle = (path) => {
        const isActive = pathname === path;
        return {
            color: 'var(--text-color)',
            textDecoration: 'none',
            borderBottom: isActive ? '2px solid var(--success-color)' : '1px solid transparent',
            fontWeight: isActive ? '600' : '400',
            opacity: isActive ? 1 : 0.8,
            transition: 'all 0.3s ease'
        };
    };

    return (
        <header className="header">
            <nav style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', margin: '0.5rem 0', fontSize: '0.9rem' }}>
                <Link href="/" style={getLinkStyle('/')}>Obwodnica Kocka</Link>
                <Link href="/radzyn-kock" style={getLinkStyle('/radzyn-kock')}>Radzyń Podlaski - Kock</Link>
            </nav>
        </header>
    )
}
