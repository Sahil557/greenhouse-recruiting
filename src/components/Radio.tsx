type RadioOption = {
  disabled: boolean;
  label: string;
  value: string;
};

type RadioButtonProps = {
  name: string;
  options?: RadioOption[];
  value?: string;
  onChange: (value: string) => void;
  className?: string;
  direction?: "row" | "column";
  reverse?: boolean;
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
  error?: string;
};

const Radio = ({
  name,
  options,
  value,
  onChange,
  className = "",
  direction = "column",
  reverse = false,
  required = false,
  size = "medium",
  placeholder = "",
  error,
}: RadioButtonProps) => {
  const containerClasses = [
    "flex",
    direction === "row" ? "flex-row gap-6" : "flex-col gap-2",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const sizeClasses = {
    small: "w-3.5 h-3.5",
    medium: "w-4 h-4",
    large: "w-4.5 h-4.5",
  }[size || "medium"];

  const labelLayout = reverse ? "flex-row-reverse justify-between" : "flex-row";

  return (
    <div className="w-full">
      {placeholder && (
        <label className="block text-sm font-normal text-abyss mb-1.5">
          {placeholder}
          {required && <span className="text-alert ml-0.5">*</span>}
        </label>
      )}

      <div className={containerClasses}>
        {options?.map((option) => (
          <label
            key={option.value}
            className={`flex ${labelLayout} items-center gap-x-2 font-medium text-abyss`}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              required={required}
              disabled={option.disabled}
              className={`form-radio accent-success focus:ring-0 cursor-pointer ${sizeClasses}`}
            />
            <span className="text-sm text-slate cursor-pointer">
              {option.label}
            </span>
          </label>
        ))}
      </div>

      {error && (
        <p id={`${name}-error`} className="mt-1 text-xs text-alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default Radio;
