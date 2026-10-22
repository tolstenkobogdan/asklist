import './globals.css';
import Header from '@/components/Header';

export const metadata = {
  title: 'AskList — save the questions you were too shy to ask',
  description:
    'AskList helps students who hesitate to interrupt lectures save their questions so they remember to ask them later.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#4338ca',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
      </body>
    </html>
  );
}
