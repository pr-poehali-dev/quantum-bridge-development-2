import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Featured from "@/components/Featured";
import Promo from "@/components/Promo";
import Pain from "@/components/Pain";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";
import WaitlistModal from "@/components/WaitlistModal";

const Index = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <main className="min-h-screen">
      <Header />
      <Hero onWaitlist={() => setModalOpen(true)} />
      <Pain />
      <Featured onWaitlist={() => setModalOpen(true)} />
      <Promo />
      <HowItWorks />
      <Footer />
      <WaitlistModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </main>
  );
};

export default Index;