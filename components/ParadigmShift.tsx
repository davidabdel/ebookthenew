
import React from 'react';

export const ParadigmShift: React.FC = () => {
  const rows = [
    { old: "Push harder", new: "Recover smarter" },
    { old: "Clean eating (Restriction)", new: "Blood sugar stability" },
    { old: "More actives (skincare)", new: "Barrier repair first" },
    { old: "Self-blame & Discipline", new: "System shift & Biology" },
  ];

  return (
    <section className="py-20 bg-white px-6 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 uppercase tracking-tight">The Paradigm Shift</h2>
        <div className="overflow-hidden rounded-2xl border-2 border-primary shadow-lg">
          <div className="grid grid-cols-2 bg-accent text-[#222222]">
            <div className="p-6 font-bold text-xl border-r border-primary">THE OLD WAY</div>
            <div className="p-6 font-bold text-xl">THE NEW BASELINE</div>
          </div>
          {rows.map((row, idx) => (
            <div key={idx} className={`grid grid-cols-2 ${idx !== rows.length - 1 ? 'border-b border-primary' : ''}`}>
              <div className="p-6 text-lg text-gray-500 line-through bg-gray-50 border-r border-primary">
                {row.old}
              </div>
              <div className="p-6 text-lg font-semibold text-black bg-[#fdfaf8]">
                {row.new}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
