
import React from 'react';

interface OfferStackProps {
  onCtaClick: () => void;
}

export const OfferStack: React.FC<OfferStackProps> = ({ onCtaClick }) => {
  const bonuses = [
    { name: "The Invisible Shift Workbook (Digital PDF)", value: "$97", description: "" },
    { name: "Bonus 1: The Identity Reset Visuals™", value: "$27", description: "Watch your nervous system recalibrate in real time." },
    { name: "Bonus 2: The New Baseline Blueprint™", value: "$27", description: "See why effort stopped working — and what replaces it." },
    { name: "Bonus 3: The New Baseline Podcast™", value: "$47", description: "Short audio recalibrations for women rebuilding capacity." },
  ];

  return (
    <section className="py-24 bg-accent/30 px-6 lg:px-24">
      <div className="max-w-3xl mx-auto bg-white border-2 border-primary rounded-3xl p-8 md:p-12 shadow-2xl relative">
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-primary text-white px-8 py-2 rounded-full font-bold uppercase tracking-widest text-sm shadow-lg">
          Special Offer
        </div>

        <h2 className="text-3xl md:text-4xl font-black text-center mb-10 text-[#222222]">
          Get The Complete New Baseline System
        </h2>

        <div className="space-y-6 mb-12">
          {bonuses.map((item, idx) => (
            <div key={idx} className="flex justify-between items-start border-b border-gray-100 pb-4">
              <div className="flex flex-col">
                <span className="text-lg font-medium text-[#444444]">{item.name}</span>
                {item.description && <span className="text-sm text-gray-500 mt-1 italic">{item.description}</span>}
              </div>
              <span className="text-lg font-bold text-primary">{item.value}</span>
            </div>
          ))}
        </div>

        <div className="text-center space-y-4">
          <p className="text-xl text-gray-400 line-through font-bold">Total Value: $198</p>
          <p className="text-5xl md:text-6xl font-black text-[#222222]">Today Only: $27</p>
          <div className="pt-8">
            <button
              onClick={onCtaClick}
              className="w-full bg-primary text-white font-black py-6 rounded-xl shadow-xl hover-primary transition-all duration-300 text-xl uppercase tracking-tighter"
            >
              Secure My Workbook & Bonuses Now
            </button>
            <p className="mt-4 text-sm text-gray-500 italic">One-time payment. Instant digital access.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
