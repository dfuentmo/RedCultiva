import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface StepCardProps {
  number: number;
  title: string;
  description: string;
}

const StepCard: React.FC<StepCardProps> = ({ number, title, description }) => {
  return (
    <Card className="bg-olive-100 bg-opacity-60 backdrop-blur-sm border border-olive-200/30 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center">
          <span className="flex items-center justify-center w-12 h-12 rounded-full bg-olive-700 text-olive-100 text-xl font-bold mr-4">{number}</span>
          <span className="text-xl text-olive-900">{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-olive-700">{description}</p>
      </CardContent>
    </Card>
  );
};

export default StepCard;
