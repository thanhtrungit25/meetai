import React from 'react';

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props ) {
  return (
    <div className="bg-muted flex items-center justify-center min-h-svh p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        {children}
      </div>
    </div>
  );
};