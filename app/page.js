'use client';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import Features from '@/components/Features';
import OpenPlay from '@/components/OpenPlay';
import PartyPackages from '@/components/PartyPackages';
import Memberships from '@/components/Memberships';
import Gallery from '@/components/Gallery';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import Booking from '@/components/Booking';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <OpenPlay />
      <PartyPackages />
      <Memberships />
      <Gallery />
      <Testimonials />
      <FAQ />
      <Booking />
      <Contact />
      <Footer />
    </main>
  );
}
