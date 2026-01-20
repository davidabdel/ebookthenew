
import React from 'react';

export const ProblemSection: React.FC = () => {
  return (
    <section className="bg-white py-20 px-6 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
          You Didn't Fail. The System Failed You.
        </h2>
        <div className="space-y-6 text-xl leading-relaxed text-[#444444]">
          <p>
            You’ve followed the rules. You eat clean. You do the HIIT workouts. But suddenly, your energy crashes at 2 PM. Your skin is sensitive and dull. You feel "wired but tired" at night.
          </p>
          <p className="font-semibold text-black bg-accent/30 p-4 rounded-lg border-l-4 border-primary">
            Most advice treats these as discipline problems. But after 40, they are signs of <span className="text-primary font-bold">The Invisible Shift</span>.
          </p>
          <p>
            Your nervous system has changed, and the old rules of "pushing through" are actually destroying your collagen and spiking your cortisol. You can't out-hustle a changing biological landscape.
          </p>
        </div>
      </div>
    </section>
  );
};
