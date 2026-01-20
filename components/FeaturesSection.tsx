
import React from 'react';

const FeatureItem = ({ title, description, imgUrl, reversed }: { title: string; description: string; imgUrl: string; reversed?: boolean }) => (
  <div className={`flex flex-col ${reversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 py-16`}>
    <div className="flex-1 space-y-4">
      <h3 className="text-3xl font-bold text-[#222222]">{title}</h3>
      <p className="text-lg text-[#444444] leading-relaxed">{description}</p>
    </div>
    <div className="flex-1 w-full">
      <div className="aspect-[4/3] bg-accent/40 rounded-2xl overflow-hidden shadow-inner border border-primary/20 flex items-center justify-center">
        <img
          src={imgUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  </div>
);

export const FeaturesSection: React.FC = () => {
  return (
    <section className="py-20 px-6 lg:px-24 bg-[#f7f4f1]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">What's Inside The Workbook</h2>

        <FeatureItem
          title="The 'Inflammaging' Cure"
          description="Why your expensive skincare is actually aging you faster—and the 3-step 'skin minimalism' routine that restores your glow without chemical warfare."
          imgUrl="/feature-skin.jpg"
        />

        <FeatureItem
          title="The Cortisol Trap"
          reversed
          description="Why that 6 AM spin class might be the reason you're holding onto belly fat. Discover why walking and specific loading patterns are the ultimate hormone helpers."
          imgUrl="/feature-cortisol.jpg"
        />

        <FeatureItem
          title="The Protein Anchor"
          description="How to stabilize your blood sugar and mood without 'dieting' or cutting carbs completely. The simple logic that stops energy crashes."
          imgUrl="/feature-protein.jpg"
        />

        <FeatureItem
          title="Micro-Regulation"
          reversed
          description="The 5-minute 'lazy' boundaries that rebuild your nervous system capacity better than a week-long vacation. Exact steps to stop the 'wired but tired' cycle."
          imgUrl="/feature-regulation.jpg"
        />
      </div>
    </section>
  );
};
