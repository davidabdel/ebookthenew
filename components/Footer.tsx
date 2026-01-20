
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-accent/20 py-12 px-6 lg:px-24 text-center border-t border-primary/10">
      <div className="max-w-6xl mx-auto space-y-6">
        <h3 className="text-2xl font-black uppercase tracking-widest text-[#222222]">THE NEW BASELINE</h3>
        <p className="text-sm text-gray-500 max-w-2xl mx-auto">
          Disclaimer: This is a digital workbook. Results may vary based on individual circumstances. Please consult with your healthcare professional before making significant lifestyle changes.
        </p>
        <div className="flex justify-center gap-8 text-xs font-bold text-gray-400 uppercase tracking-widest">
          <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-primary transition-colors">Contact Support</a>
        </div>
        <p className="text-xs text-gray-400 pt-8">
          © {new Date().getFullYear()} Olivia Wilson. All rights reserved.
          {' · '}
          <button
            onClick={() => {
              const current = localStorage.getItem('hero_variant_test');
              const newVariant = current === 'A' ? 'B' : 'A';
              localStorage.setItem('hero_variant_test', newVariant);
              window.location.reload();
            }}
            className="opacity-30 hover:opacity-100 transition-opacity text-[10px]"
            title="Toggle A/B variant"
          >
            v{(window as any).abTestVariant || 'A'}
          </button>
        </p>
      </div>
    </footer>
  );
};
