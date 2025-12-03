import { useState, useEffect } from 'react';
import { Icon } from '.';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  debounceMs?: number;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = "Search candidates",
  debounceMs = 300,
}) => {
  const [localValue, setLocalValue] = useState(value);

  // Debounce the onChange callback
  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(localValue);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [localValue, debounceMs, onChange]);

  return (
    <div className="relative w-full bg-white">
      <div className="absolute left-1 top-1/2 -translate-y-1/2">
        <Icon name="Search" width={26} height={26} />
      </div>
      <input
        type="text"
        className="w-full h-8 pl-10 pr-3 pb-0.5 text-[13.7px] border border-[#cccccc] rounded-xs focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-slate placeholder:text-slate font-light"
        placeholder={placeholder}
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
      />
    </div>
  );
};
