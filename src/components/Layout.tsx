import type { ReactNode } from 'react';
import CategoryTabs from './CategoryTabs';
interface LayoutProps {
  children: ReactNode;
}
export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col">
      <header className="px-4 py-3 border-b border-slate-700">
        <h1 className="text-xl font-bold text-center">MeasureBridge</h1>
      </header>
      <CategoryTabs />
      <main className="flex-1 flex flex-col items-center px-4 py-6">
        <div className="w-full max-w-md">
          {children}
        </div>
      </main>
    </div>
  );
}