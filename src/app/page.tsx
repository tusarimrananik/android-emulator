'use client';

import React from 'react';
import { LawnchairProvider } from '@/context/LawnchairContext';
import { LawnchairPhone } from '@/components/phone/LawnchairPhone';

function LauncherWorkspace() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-black overflow-hidden select-none p-0">
      <div className="relative flex items-center justify-center">
        <LawnchairPhone />
      </div>
    </main>
  );
}

export default function Home() {
  return (
    <LawnchairProvider>
      <LauncherWorkspace />
    </LawnchairProvider>
  );
}
