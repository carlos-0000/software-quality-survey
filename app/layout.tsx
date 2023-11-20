'use client';
import 'animate.css';
import './globals.scss';
import { UIShell } from '@/components';
import { ThemeProvider, SoftwareProvider } from '@/contexts';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <SoftwareProvider>
        <html lang="en">
          <head>
            <title>Calidad de Software</title>
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
