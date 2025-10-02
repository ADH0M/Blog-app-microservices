import React from "react";

const Producer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="flex-1 glass-effect p-6 shadow-xl border border-white/20">
        <div className="flex items-center mb-6 pb-4 border-b border-white/20">
          <i className="fas fa-code text-green-400 text-2xl mr-3"></i>
          <h2 className="text-xl font-semibold">Producer Code</h2>
        </div>

        {children}
      </div>
    </div>
  );
};

export default Producer;
