"use client";
import FuzzyText from "./FuzzyText";

const Loading = () => {
  return (
    <div className='flex h-[100vh] items-center justify-center bg-mainBgColor fixed inset-0 z-50'>
      <div className=''>
        {/* Glitch Text */}
        <FuzzyText baseIntensity={0.3}>SADID</FuzzyText>
      </div>
    </div>
  );
};

export default Loading;
