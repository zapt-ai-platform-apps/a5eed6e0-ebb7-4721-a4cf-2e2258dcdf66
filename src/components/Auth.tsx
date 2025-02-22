import React from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { supabase } from '../supabaseClient';
import '../index.css';

const AuthComponent = (): JSX.Element => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-900">
      <a
        href="https://www.zapt.ai"
        target="_blank"
        rel="noopener noreferrer"
        className="mb-4 text-blue-600 cursor-pointer"
      >
        Sign in with ZAPT
      </a>
      <div className="w-full max-w-md">
        <Auth
          supabaseClient={supabase}
          providers={['google', 'facebook', 'apple']}
          magicLink={true}
          view="magic_link"
        />
      </div>
    </div>
  );
};

export default AuthComponent;