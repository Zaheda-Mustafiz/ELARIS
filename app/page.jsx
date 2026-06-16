import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import PropertyHero from '../components/sections/PropertyHero';
import Services from '../components/sections/Services';
import Listings from '../components/sections/Listings';
import Marquee from '../components/sections/Marquee';
import LeadForm from '../components/sections/LeadForm';
import Footer from '../components/sections/Footer';

export default function Home() {
  return (
    <main style={{ overflowX: 'hidden' }}>
      <Hero />
      <About />
      <PropertyHero />
      <Services />
      <Listings />
      <Marquee />
      <LeadForm />
      <Footer />
    </main>
  );
}
