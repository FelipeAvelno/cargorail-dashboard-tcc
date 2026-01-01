import { Inter } from "next/font/google";
import "./globals.css";
import MaintenanceScreen from "@/components/MaintenanceScreen";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: 'Dashboard Realtime',
  description: 'Dashboard com Supabase Realtime',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const isMaintenance = process.env.NEXT_PUBLIC_MAINTENANCE === 'true';

  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-neutral-900 text-white`}>
        {isMaintenance ? <MaintenanceScreen /> : children}
      </body>
    </html>
  );
}
