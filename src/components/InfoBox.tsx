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
  return (
    <div className={`info-box info-box-${type}`}>
      <div className="info-box-title">
        <FontAwesomeIcon icon={icons[type]} className="info-box-icon" />
        <h4>{titles[type]}</h4>
      </div>
      <div className="info-box-content">{children}</div>
    </div>
  );
};

export default InfoBox;
