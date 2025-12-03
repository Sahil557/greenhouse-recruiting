import React from "react";
import { twMerge } from "tailwind-merge";
import type { IconName } from "./Icon";
import Icon from "./Icon";

export type ButtonProps = {
  children?: React.ReactNode;
  variant?: "outlined";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  fullWidth?: boolean;
  loading?: boolean;
  startIcon?: IconName;
  endIcon?: IconName;
  width?: number;
  height?: number;
  className?: string;
  iconClassName?: string;
  iconSize?: number;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  children,
  variant = "outlined",
  size = "md",
  disabled = false,
  fullWidth = false,
  loading = false,
  startIcon,
  endIcon,
  className,
  iconClassName = "",
  width,
  height,
  onClick,
  ...props
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center gap-2 justify-center font-medium rounded transition-colors duration-200 focus:outline-none rounded-lg";

  const sizeClasses: Record<string, string> = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const variantClasses: Record<"outlined",
    Record<"primary", string>
  > = {
    outlined: {
      primary:
        "bg-[#f9fafb] text-success border border-success hover:bg-success/10 active:ring-4 active:ring-success/30 active:ring-offset-0 cursor-pointer disabled:bg-[#f7f8f7] disabled:text-orchid disabled:border-orchid disabled:cursor-not-allowed disabled:ring-0 disabled:ring-offset-0 transition-all duration-200 ease-out active:scale-[0.98]",
      },
  };

  const classes = twMerge(
    baseClasses,
    sizeClasses[size],
    variantClasses[variant].primary,
    fullWidth && "w-full",
    className
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return;
    if (onClick) onClick(event);
  };

  return (
    <button
      className={classes}
      disabled={disabled || loading}
      onClick={handleClick}
      {...props}
    >
      {loading && (
        <Icon
          name="Reset"
          width={width}
          height={height}
          className="animate-spin"
        />
      )}

      {!loading && startIcon && (
        <Icon
          name={startIcon}
          width={width}
          height={height}
          className={twMerge("mt-0.5", iconClassName)}
        />
      )}

      {children}

      {!loading && endIcon && (
        <Icon
          width={width}
          height={height}
          name={endIcon}
          className={twMerge("mt-0.5", iconClassName)}
        />
      )}
    </button>
  );
}
