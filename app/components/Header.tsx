'use client';

import Link from 'next/link';
import Web3Auth from './Web3Auth';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-gray-800">
            Web3 Auth
          </Link>
          
          <nav className="flex items-center">
            <Link href="/" className="text-gray-600 hover:text-gray-900 mr-4">
              Home
            </Link>
            <div className="relative">
              <Web3Auth />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
