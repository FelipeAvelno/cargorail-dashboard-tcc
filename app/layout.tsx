import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: 'Dashboard Realtime',
  description: 'Dashboard com Supabase Realtime',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-neutral-900 text-white`}>
        {children}
      </body>
    </html>
  );
}
