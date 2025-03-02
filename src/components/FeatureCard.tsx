type FeatureCardProps = {
    icon: React.ReactNode;
    title: string;
    description: string;
    titleColor?: string;
    descriptionColor?: string;
    backgroundColor?: string;
    iconColor?: string;
  };
  
  export function FeatureCard({
    icon,
    title,
    description,
    titleColor = 'text-olive-900',
    descriptionColor = 'text-olive-700',
    backgroundColor = 'bg-olive-100',
    iconColor = 'text-olive-800',
  }: FeatureCardProps) {
    return (
      <div className={`${backgroundColor} rounded-lg shadow-md p-6 text-center`}>
        <div className={`flex justify-center mb-4 ${iconColor}`}>{icon}</div>
        <h3 className={`${titleColor} text-xl font-semibold mb-2`}>{title}</h3>
        <p className={`${descriptionColor}`}>{description}</p>
      </div>
    );
  }
  