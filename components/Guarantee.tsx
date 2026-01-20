
import React from 'react';

export const Guarantee: React.FC = () => {
  return (
    <section className="py-20 bg-white px-6 lg:px-24 border-t border-gray-100">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="flex-shrink-0">
          <div className="w-32 h-32 md:w-48 md:h-48 border-4 border-primary rounded-full flex items-center justify-center p-4">
            <div className="w-full h-full border border-primary rounded-full flex flex-col items-center justify-center text-primary text-center leading-none">
              <span className="text-2xl md:text-3xl font-black">100%</span>
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-tighter">Guarantee</span>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">The "Permission Slip" Guarantee</h2>
          <p className="text-lg text-[#444444] leading-relaxed">
            If you don't feel more calm, supported, and energized within 30 days of following the New Baseline framework, just send us a quick email. We'll refund your $27 immediately—no questions asked. <strong>You keep the workbook and all the bonuses as our gift</strong> for giving it a try.
          </p>
        </div>
      </div>
    </section>
  );
};
