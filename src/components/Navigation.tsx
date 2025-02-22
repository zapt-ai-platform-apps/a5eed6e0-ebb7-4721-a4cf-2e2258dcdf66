import React from 'react';
import { Link } from 'react-router-dom';

type NavigationProps = {
  signOut: () => void;
  user: any;
};

const Navigation: React.FC<NavigationProps> = ({ signOut, user }) => {
  return (
    <nav className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center">
      <div className="flex space-x-4">
        <Link className="cursor-pointer" to="/dashboard">Dashboard</Link>
        <Link className="cursor-pointer" to="/books">Books</Link>
        <Link className="cursor-pointer" to="/members">Members</Link>
        <Link className="cursor-pointer" to="/transactions">Transactions</Link>
      </div>
      <div>
        {user && (
          <button
            onClick={signOut}
            className="cursor-pointer bg-blue-500 hover:bg-blue-700 px-3 py-1 rounded"
          >
            Sign Out
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navigation;