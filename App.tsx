
import React, { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { HeroVariantB } from './components/HeroVariantB';
import { ProblemSection } from './components/ProblemSection';
import { FeaturesSection } from './components/FeaturesSection';
import { OfferStack } from './components/OfferStack';
import { ParadigmShift } from './components/ParadigmShift';
import { Checkout } from './components/Checkout';
import { Guarantee } from './components/Guarantee';
import { Footer } from './components/Footer';

// A/B Test Configuration
const AB_TEST_KEY = 'hero_variant_test';

const App: React.FC = () => {
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);
  const [variant, setVariant] = useState<'A' | 'B'>('A');

  useEffect(() => {
    // Check if user already has a variant assigned
    const existingVariant = localStorage.getItem(AB_TEST_KEY);

    if (existingVariant === 'A' || existingVariant === 'B') {
      // User has been here before, keep them on same variant
      setVariant(existingVariant);
    } else {
      // New visitor - randomly assign variant (50/50)
      const randomVariant = Math.random() < 0.5 ? 'A' : 'B';
      setVariant(randomVariant);
      localStorage.setItem(AB_TEST_KEY, randomVariant);

      // Track variant assignment in Google Analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'ab_test_assigned', {
          variant: randomVariant,
          test_name: 'hero_headline_test'
        });
      }
    }
  }, []);

  // Make variant available globally for webhook tracking
  useEffect(() => {
    (window as any).abTestVariant = variant;
  }, [variant]);

  const scrollToCheckout = () => {
    const checkoutEl = document.getElementById('checkout-section');
    if (checkoutEl) {
      checkoutEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Render Hero based on variant */}
      {variant === 'A' ? (
        <Hero onCtaClick={scrollToCheckout} />
      ) : (
        <HeroVariantB onCtaClick={scrollToCheckout} />
      )}

      <ProblemSection />
      <FeaturesSection />
      <ParadigmShift />
      <OfferStack onCtaClick={scrollToCheckout} />
      <Checkout />
      <Guarantee />
      <Footer />
    </div>
  );
};

export default App;
