import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition, faArrowRight } from "@fortawesome/free-solid-svg-icons";

interface CardProps {
  href: string;
  icon: IconDefinition;
  title: string;
  children: React.ReactNode;
  disabled?: boolean;
}

const Card: React.FC<CardProps> = ({ href, icon, title, children, disabled }) => {
  const commonClasses = "bg-bg-surface border border-border-color rounded-lg p-6 transition-all duration-200 ease-in-out relative group";
  
  if (disabled) {
    return (
      <div className={`${commonClasses} opacity-50 cursor-not-allowed`}>
        <div className="text-2xl mb-4 text-primary-accent">
          <FontAwesomeIcon icon={icon} />
        </div>
        <h2 className="text-lg font-bold mb-2">{title}</h2>
        <p className="text-text-secondary text-sm leading-relaxed">
          {children}
        </p>
      </div>
    );
  }

  return (
    <Link href={href} className={`${commonClasses} hover:-translate-y-1 hover:border-primary-accent hover:shadow-2xl`}>
      <div className="text-2xl mb-4 text-primary-accent">
        <FontAwesomeIcon icon={icon} />
      </div>
      <h2 className="text-lg font-bold mb-2">{title}</h2>
      <p className="text-text-secondary text-sm leading-relaxed">
        {children}
      </p>
      <div className="absolute bottom-6 right-6 text-text-secondary transform -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 ease-in-out">
        <FontAwesomeIcon icon={faArrowRight} />
      </div>
    </Link>
  );
};

export default Card;