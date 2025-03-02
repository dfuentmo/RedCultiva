import Image from "next/image";

type FeatureCardProps = {
    icon: React.ReactNode;
    title: string;
    description: string;
    titleColor?: string;
    descriptionColor?: string;
    backgroundColor?: string;
    iconColor?: string;
    imageSrc?: string;
  };
  
  export function FeatureCard({
    icon,
    title,
    description,
    titleColor = 'text-olive-900',
    descriptionColor = 'text-olive-700',
    backgroundColor = 'bg-olive-100',
    iconColor = 'text-olive-800',
    imageSrc,
  }: FeatureCardProps) {
    return (
      <div className={`${backgroundColor} rounded-lg shadow-md overflow-hidden`}>
        {imageSrc && (
          <div className="relative h-40 w-full">
            <Image
              src={imageSrc}
              alt={title}
              fill
              style={{ objectFit: "cover" }}
              className="transition-transform duration-300 hover:scale-105"
            />
          </div>
        )}
        <div className="p-6 text-center">
          <div className={`flex justify-center mb-4 ${iconColor}`}>{icon}</div>
          <h3 className={`${titleColor} text-xl font-semibold mb-2`}>{title}</h3>
          <p className={`${descriptionColor}`}>{description}</p>
        </div>
      </div>
    );
  }
  