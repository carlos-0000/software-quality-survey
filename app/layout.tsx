'use client';
import './globals.scss';
import 'animate.css';
import { UIShell } from '@/components';
import { ThemeProvider, SoftwareProvider } from '@/contexts';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <SoftwareProvider>
        <html lang="en">
          <head>
            <title>Carbon + Next.js</title>
          </head>
          <body>
            <UIShell content={children} />
          </body>
        </html>
      </SoftwareProvider>
    </ThemeProvider>
  );
};
export default RootLayout;
