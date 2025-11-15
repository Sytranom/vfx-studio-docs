import React from 'react';
// --- FIX for the server error ---
// Changed to direct imports to avoid bundler issues with the library's main entry point.
import Info from 'lucide-react/dist/esm/icons/info';
import AlertTriangle from 'lucide-react/dist/esm/icons/alert-triangle';
import XCircle from 'lucide-react/dist/esm/icons/x-circle';
import CheckCircle from 'lucide-react/dist/esm/icons/check-circle';
import Lightbulb from 'lucide-react/dist/esm/icons/lightbulb';
import type { LucideIcon } from 'lucide-react';

type CalloutType = 'info' | 'warning' | 'danger' | 'success' | 'tip';

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
}

const typeConfig: Record<
  CalloutType,
  { icon: LucideIcon; defaultTitle: string; classes: string }
> = {
  info: {
    icon: Info,
    defaultTitle: 'Info',
    classes: 'bg-blue-900/20 border-blue-500/80 text-blue-300',
  },
  warning: {
    icon: AlertTriangle,
    defaultTitle: 'Warning',
    classes: 'bg-amber-900/20 border-amber-500/80 text-amber-300',
  },
  danger: {
    icon: XCircle,
    defaultTitle: 'Danger',
    classes: 'bg-red-900/20 border-red-500/80 text-red-300',
  },
  success: {
    icon: CheckCircle,
    defaultTitle: 'Success',
    classes: 'bg-emerald-900/20 border-emerald-500/80 text-emerald-300',
  },
  tip: {
    icon: Lightbulb,
    defaultTitle: 'Pro Tip',
    classes: 'bg-violet-900/20 border-violet-500/80 text-violet-300',
  },
};

const Callout: React.FC<CalloutProps> = ({
  type = 'info',
  title,
  children,
}) => {
  const { icon: Icon, defaultTitle, classes } = typeConfig[type];
  const finalTitle = title || defaultTitle;

  return (
    <div
      className={`callout my-6 rounded-lg border-l-4 p-5 text-sm ${classes}`}
    >
      <div className="flex items-center gap-3 mb-2">
        <Icon className="h-5 w-5 flex-shrink-0" />
        <h4 className="flex-grow text-base font-semibold text-white">
          {finalTitle}
        </h4>
      </div>
      <div className="prose-styles pl-8">{children}</div>
    </div>
  );
};

export default Callout;