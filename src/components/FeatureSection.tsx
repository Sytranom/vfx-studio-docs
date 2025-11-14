import React from 'react';
import Image from 'next/image';

interface FeatureSectionProps {
  title: string;
  imageUrl: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  reverse?: boolean;
  children: React.ReactNode;
}

const FeatureSection: React.FC<FeatureSectionProps> = ({
  title,
  imageUrl,
  imageAlt,
  imageWidth,
  imageHeight,
  reverse = false,
  children,
}) => {
  const textOrder = reverse ? 'md:col-start-1' : 'md:col-start-2';
  const imageOrder = reverse ? 'md:col-start-2' : 'md:col-start-1';

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center mb-24">
      <div className={`feature-image row-start-1 ${imageOrder} grid place-items-center`}>
        <Image
          src={imageUrl}
          alt={imageAlt}
          width={imageWidth}
          height={imageHeight}
          className="rounded-lg border border-border-color shadow-2xl"
        />
      </div>
      <div className={`feature-text ${textOrder}`}>
        <h2 className="text-3xl font-semibold mb-4">{title}</h2>
        <p className="text-text-secondary leading-relaxed">
          {children}
        </p>
      </div>
    </div>
  );
};

export default FeatureSection;