'use client';
import './globals.scss';
import { UIShell } from '@/components';
import { ThemeProvider } from '@/contexts';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <html lang="en">
        <head>
          <title>Carbon + Next.js</title>
        </head>
        <body>
          <UIShell content={children} />
        </body>
      </html>
    </ThemeProvider>
  );
};
export default RootLayout;
