import { useEffect, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import CategoryTabs from './CategoryTabs';
interface LayoutProps {
  children: ReactNode;
}
export default function Layout({ children }: LayoutProps) {
  const { t, i18n } = useTranslation();
  useEffect(() => {
    document.title = t('app.metaTitle');
    document.querySelector('meta[name="description"]')?.setAttribute('content', t('app.metaDescription'));
    document.querySelector('meta[name="keywords"]')?.setAttribute('content', t('app.metaKeywords'));
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', t('app.ogDescription'));
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', t('app.twitterDescription'));
    document.querySelector('script[type="application/ld+json"]')!.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "MeasureBridge",
      "operatingSystem": "Web, Android",
      "applicationCategory": "Utility",
      "description": t('app.jsonLdDescription'),
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    });
  }, [t, i18n.language]);
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col">
      <header className="px-4 py-3 border-b border-slate-700">
        <h1 className="text-xl font-bold text-center">{t('app.title')}</h1>
      </header>
      <CategoryTabs />
      <main className="flex-1 flex flex-col items-center px-4 py-6">
        <div className="w-full max-w-md md:max-w-lg xl:max-w-xl">
          {children}
        </div>
      </main>
    </div>
  );
}