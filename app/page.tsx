import Image from "next/image";
import Header from './components/Header';
import Web3Auth from './components/Web3Auth';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-20 px-4">
        <div className="max-w-4xl mx-auto mt-16 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to Web3 Auth
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Connect your wallet to get started with our decentralized authentication system.
          </p>
          <div className="max-w-md mx-auto">
            <Web3Auth />
          </div>
        </div>
      </main>
    </div>
  );
}
