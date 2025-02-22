import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-200 text-center py-2">
      <a
        href="https://www.zapt.ai"
        target="_blank"
        rel="noopener noreferrer"
        className="cursor-pointer text-blue-600"
      >
        Made on ZAPT
      </a>
    </footer>
  );
};

export default Footer;