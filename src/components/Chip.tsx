import React from 'react';
import { twMerge } from 'tailwind-merge';
import Icon from './Icon';

export type ChipProps = {
  label: React.ReactNode;
  onRemove?: () => void;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const Chip: React.FC<ChipProps> = ({ label, onRemove, className, ...props }) => {
  const classes = twMerge(
    'inline-flex items-center justify-center gap-1 bg-white border border-[#E1E1E1] rounded-full px-3 py-1 text-sm text-[13px] select-none',
    'cursor-default',
    className
  );

  return (
    <div
      className={classes}
      {...props}
    >
      <span>{label}</span>
      {onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="ml-1 cursor-pointer flex items-center justify-center"
        >
          <Icon name="Cross" width={14} height={14} />
        </button>
      )}
    </div>
  );
};

export default Chip;
