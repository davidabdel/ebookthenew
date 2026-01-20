
import React from 'react';

interface HeroProps {
  onCtaClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onCtaClick }) => {
  return (
    <section className="relative px-6 py-16 md:py-24 lg:px-24">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 order-2 md:order-1">
          <p className="text-sm font-bold tracking-widest text-primary uppercase">
            FOR WOMEN OVER 40 WHO ARE TIRED OF "PUSHING HARDER"
          </p>
          <h1 className="text-5xl md:text-7xl font-extrabold text-[#222222] leading-tight">
            How to Reset Your Energy, Skin, and Sanity by Doing <span className="italic text-brown">Less</span>... Not More.
          </h1>
          <p className="text-xl text-[#444444] leading-relaxed max-w-lg">
            Stop fighting the "Invisible Shift." Discover the framework that works <span className="font-semibold text-brown">with</span> your changing biology to heal burnout, not cause it.
          </p>
          <button
            onClick={onCtaClick}
            className="bg-primary text-white font-bold py-5 px-10 rounded-lg shadow-xl hover-primary transition-all duration-300 transform hover:scale-105 text-lg uppercase tracking-tight"
          >
            Yes! Send Me The Invisible Shift Workbook ($27)
          </button>
        </div>

        <div className="order-1 md:order-2 flex justify-center">
          <div className="relative group">
            {/* 3D Book Mockup with Updated Image */}
            <div className="w-[300px] h-[400px] md:w-[400px] md:h-[520px] bg-white rounded-r-lg shadow-2xl relative transform rotate-3 transition-transform group-hover:rotate-0 duration-500 border-l-[12px] border-[#333333] overflow-hidden">
              <img
                src="/book-cover.jpg"
                alt="The Invisible Shift - Reclaiming Energy, Skin, and Sanity After 40"
                className="w-full h-full object-cover"
              />
              {/* Spiral elements */}
              <div className="absolute -left-6 top-0 h-full flex flex-col justify-around py-4 z-10">
                {[...Array(18)].map((_, i) => (
                  <div key={i} className="w-10 h-2 bg-gradient-to-r from-gray-400 to-gray-200 rounded-full border-b border-gray-400 shadow-sm"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
