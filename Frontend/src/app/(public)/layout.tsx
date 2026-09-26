import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import type {ReactNode} from "react";

interface PublicLayoutProps {
  children: ReactNode;
}

export default function PublicLayout({children}: PublicLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
