import './globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Bounce It Up | Indoor Fun Center — Livonia, MI',
  description:
    'Livonia\'s premier indoor fun center! Bounce houses, slides, obstacle courses, birthday parties, and open play for all ages.',
};

export const viewport = {
  themeColor: '#FF6B00',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Poppins:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <script src="https://jstest.authorize.net/v1/Accept.js" async />
      </head>
      <body className="bg-dark-900 text-white antialiased overflow-x-hidden">
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
