import './globals.css';

export const metadata = {
  title: 'Bounce It Up | Indoor Fun Center — Livonia, MI',
  description:
    'Livonia\'s premier indoor fun center! Bounce houses, slides, obstacle courses, birthday parties, and open play for all ages. Located at 30276 Plymouth Rd, Livonia MI 48150.',
  keywords: 'bounce house, indoor play, birthday party, Livonia Michigan, kids fun center, trampoline, obstacle course',
  openGraph: {
    title: 'Bounce It Up | Indoor Fun Center — Livonia, MI',
    description: 'The cleanest and most exciting indoor fun center in Michigan. Book your party today!',
    url: 'https://bounceituplivonia.com',
    siteName: 'Bounce It Up',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bounce It Up — Livonia, MI',
    description: 'Birthday parties, open play & memberships at Livonia\'s top indoor fun center!',
  },
};

export const viewport = {
  themeColor: '#FF6B00',
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
        {/* Authorized.net Accept.js */}
        <script
          src="https://jstest.authorize.net/v1/Accept.js"
          charSet="utf-8"
          async
        />
      </head>
      <body className="bg-dark-900 text-white antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
