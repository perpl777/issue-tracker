'use client';
import Link from 'next/link';
import React from 'react';
import { GiAlienBug } from 'react-icons/gi';
import { usePathname } from 'next/navigation';
import classnames from "classnames";

const NavBar = () => {
    const currentPath = usePathname();
    const links = [
        { label: "Dashboard", href: "/" },
        { label: "Issues", href: "/issues" }
    ]
    
    return (
        <nav className="flex space-x-6 border-b mb-5 px-5 py-5 items-center">
        <Link href="/"><GiAlienBug size='2em' /></Link>
        <ul className="flex space-x-6">
            { links.map(link =>
            <li key={link.href}>
                <Link
                    className={classnames({
                        "text-blue-300": link.href === currentPath,
                        "text-zinc-200": link.href !== currentPath,
                        "hover:text-sky-300 transition-colors": true
                    })}
                    href={link.href}
                >
                {link.label}
                </Link>
            </li>
            )}
        </ul>
        </nav>
    )
}

export default NavBar