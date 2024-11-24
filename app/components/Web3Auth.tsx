'use client';

import { useAccount, useDisconnect } from 'wagmi';
import { useState } from 'react';
import Image from 'next/image';

export default function Web3Auth() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Only render content after client-side hydration
  if (typeof window === 'undefined') {
    return null;
  }

  if (isConnected) {
    return (
      <div className="relative">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm">
            {address?.slice(2, 4)}
          </div>
        </button>

        {isMenuOpen && (
          <div className="absolute right-0 top-full mt-2 w-72 flex flex-col items-center gap-3 p-4 rounded-lg bg-white shadow-lg border">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white">
              {address?.slice(2, 4)}
            </div>
            <div className="w-full">
              <p className="text-sm text-gray-600 text-center mb-1">Connected with</p>
              <p className="font-mono text-sm truncate w-full text-center bg-gray-50 p-2 rounded">
                {address}
              </p>
            </div>
            <button
              onClick={() => {
                disconnect();
                setIsMenuOpen(false);
              }}
              className="w-full px-4 py-2 text-sm text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
            >
              Disconnect
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <w3m-button />
    </div>
  );
}
