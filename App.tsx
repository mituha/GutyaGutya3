
import React from 'react';
import Form from './components/Form';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-700 flex flex-col items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-md shadow-2xl rounded-xl p-8 md:p-12 border border-slate-600">
        <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-rose-400 to-lime-400 mb-6 text-center">
          ぐちゃぐちゃあっぷ        <a
          className="App-link"
          href="https://kakuyomu.jp/users/mituha"
          target="_blank"
          rel="noopener noreferrer"
        >
          .
        </a>
        </h1>
        <p className="text-slate-300 text-lg md:text-xl text-center">
          Welcome to your new application. This is the initial state.
        </p>
        <Form />
        <div className="mt-8 flex justify-center">
          <svg className="w-20 h-20 text-sky-400 animate-pulse" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
          </svg>
        </div>
      </div>
      <footer className="mt-12 text-center text-slate-500 text-sm">
        <p>&copy; {new Date().getFullYear()} GutyaGutya3. All rights reserved.</p>
        <p>Powered by React & Tailwind CSS.</p>
      </footer>
    </div>
  );
};

export default App;
