import React from "react";
const DockText = ({ text }: { text: string }) => {
  return (
    <h1 className="text-3xl md:text-6xl font-bold pointer-events-none whitespace-pre-wrap bg-gradient-to-b bg-clip-text leading-none text-transparent from-white to-slate-900/10 text-center font-montserrat">
      {text}
    </h1>
  );
};

export default DockText;
