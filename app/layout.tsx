
import './global.css';
import ClientLayout from './components/ClientLayout';

export const metadata = {
  title: 'Assignment 2 - Web Application',
  description: 'Next.js application with HTML5 code generator and interactive pages',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}