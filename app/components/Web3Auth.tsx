'use client';

import { useAccount, useDisconnect } from 'wagmi';
import { useState, useEffect } from 'react';

export default function Web3Auth() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Reset state when disconnected
  useEffect(() => {
    if (!isConnected) {
      setIsMenuOpen(false);
    }
  }, [isConnected]);

  if (!mounted) {
    return null;
  }

  const getShortAddress = () => {
    if (!address) return '';
    return `${address.slice(0, 4)}`;
  };

  const copyToClipboard = async () => {
    if (address) {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
      setIsMenuOpen(false);
      // Force a page reload to clear any cached states
      window.location.reload();
    } catch (error) {
      console.error('Error disconnecting:', error);
    }
  };

  const renderConnectedState = () => (
    <div className="relative inline-block">
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100"
      >
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm">
          {getShortAddress()}
        </div>
      </button>

      {isMenuOpen && (
        <div className="absolute right-0 top-full mt-2 w-72 flex flex-col items-center gap-3 p-4 rounded-lg bg-white shadow-lg border">
          <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white">
            {getShortAddress()}
          </div>
          <div className="w-full">
            <p className="text-sm text-gray-600 text-center mb-1">Connected with</p>
            <div className="relative flex items-center bg-gray-50 p-2 rounded">
              <p className="font-mono text-sm truncate flex-1 text-center text-gray-900 pr-8">
                {address}
              </p>
              <button
                onClick={copyToClipboard}
                className="absolute right-2 p-1.5 rounded-md hover:bg-gray-200 transition-colors"
                title="Copy to clipboard"
              >
                {copied ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-green-500">
                    <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-gray-500">
                    <path fillRule="evenodd" d="M7.502 6h7.128A3.375 3.375 0 0118 9.375v9.375a3 3 0 003-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 00-.673-.05A3 3 0 0015 1.5h-1.5a3 3 0 00-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6zM13.5 3A1.5 1.5 0 0012 4.5h4.5A1.5 1.5 0 0015 3h-1.5z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V9.375zM6 12a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V12zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM6 15a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V15zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM6 18a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V18zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <button
            onClick={handleDisconnect}
            className="w-full px-4 py-2 text-sm text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  );

  const renderDisconnectedState = () => (
    <div className="flex items-center gap-2">
      <w3m-button />
    </div>
  );

  return isConnected ? renderConnectedState() : renderDisconnectedState();
}
