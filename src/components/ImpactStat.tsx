import React from "react";

interface ImpactStatProps {
  number: number;
  value: string;
  label: string;
}

const ImpactStat: React.FC<ImpactStatProps> = ({ number, label }) => {
  return (
    <div>
      <p className="text-4xl font-bold mb-2 text-olive-900">{number}</p>
      <p className="text-xl text-olive-700">{label}</p>
    </div>
  );
};

export default ImpactStat;
