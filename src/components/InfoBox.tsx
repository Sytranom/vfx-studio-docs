import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfoCircle,
  faExclamationTriangle,
  faLightbulb,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";

type InfoBoxType = "note" | "warning" | "tip" | "pro-tip";

interface InfoBoxProps {
  type: InfoBoxType;
  children: React.ReactNode;
}

const typeStyles = {
    note: {
        container: "bg-blue-900/20 border-blue-500",
        title: "text-blue-400",
    },
    warning: {
        container: "bg-yellow-900/20 border-yellow-500",
        title: "text-yellow-400",
    },
    tip: {
        container: "bg-green-900/20 border-green-500",
        title: "text-green-400",
    },
    "pro-tip": {
        container: "bg-purple-900/20 border-purple-500",
        title: "text-purple-400",
    },
};

const icons = {
  note: faInfoCircle,
  warning: faExclamationTriangle,
  tip: faLightbulb,
  "pro-tip": faHeart,
};

const titles = {
  note: "Note",
  warning: "Warning",
  tip: "Quick Tip",
  "pro-tip": "Pro Tip",
};

const InfoBox: React.FC<InfoBoxProps> = ({ type, children }) => {
  const styles = typeStyles[type];
  
  return (
    <div className={`border-l-4 p-5 my-6 rounded-r-md ${styles.container}`}>
      <div className="flex items-center gap-3 mb-2">
        <FontAwesomeIcon icon={icons[type]} className={`text-lg ${styles.title}`} />
        <h4 className={`text-base font-semibold ${styles.title}`}>{titles[type]}</h4>
      </div>
      <div className="pl-8 text-text-secondary text-sm">
        {children}
      </div>
    </div>
  );
};

export default InfoBox;