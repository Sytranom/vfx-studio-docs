import React from 'react';

import {
  Info,
  AlertTriangle,
  XCircle,
  CheckCircle,
  Lightbulb,
  LucideIcon
} from 'lucide-react';

type CalloutType = 'info' | 'warning' | 'danger' | 'success' | 'tip';

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
}

const typeConfig: Record<
  CalloutType,
  { icon: LucideIcon; defaultTitle: string; className: string }
> = {
  info:    { icon: Info,          defaultTitle: 'Info',    className: 'callout--info' },
  warning: { icon: AlertTriangle, defaultTitle: 'Warning', className: 'callout--warning' },
  danger:  { icon: XCircle,       defaultTitle: 'Danger',  className: 'callout--danger' },
  success: { icon: CheckCircle,   defaultTitle: 'Success', className: 'callout--success' },
  tip:     { icon: Lightbulb,     defaultTitle: 'Pro Tip', className: 'callout--tip' },
};

const Callout: React.FC<CalloutProps> = ({
  type = 'info',
  title,
  children,
}) => {
  const { icon: Icon, defaultTitle, className } = typeConfig[type];
  const finalTitle = title || defaultTitle;

  return (
    
    <div className={`callout my-6 rounded-lg border-l-4 p-5 text-sm ${className}`}>
      <div className="flex items-center gap-3 mb-2">
        <Icon className="h-5 w-5 flex-shrink-0" />
        <h4 className="flex-grow text-base font-semibold">
          {finalTitle}
        </h4>
      </div>
      <div className="prose-styles pl-8">
        {children}
      </div>
    </div>
  );
};

export default Callout;