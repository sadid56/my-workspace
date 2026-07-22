import { title } from "process";
import React from "react";

interface Props {
  title: string;
}

const LargeTitle: React.FC<Props> = ({ title }) => {
  return (
    <h1 className="uppercase text-[100px] md:text-[220px] text-slate-800 font-bold absolute  left-0 md:left-24 opacity-20 font-montserrat overflow-hidden">
      {title}
    </h1>
  );
};

export default LargeTitle;
