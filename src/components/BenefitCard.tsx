import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface BenefitCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  titleColor?: string;
  descriptionColor?: string;
  backgroundColor?: string;
  iconColor?: string;
}

const BenefitCard: React.FC<BenefitCardProps> = ({
  title,
  description,
  icon,
  titleColor = 'text-olive-900',
  descriptionColor = 'text-olive-700',
  backgroundColor = 'bg-olive-100',
  iconColor = 'text-olive-800',
}) => {
  return (
    <Card className={backgroundColor}>
      <CardHeader>
        <CardTitle className="flex flex-col items-center">
          <div className={`flex justify-center mb-4 ${iconColor}`}>{icon}</div>
          <span className={`mt-4 text-xl ${titleColor}`}>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className={`text-center ${descriptionColor}`}>{description}</p>
      </CardContent>
    </Card>
  );
};

export default BenefitCard;
