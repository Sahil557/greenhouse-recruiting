import { useState } from "react";
import { SearchInput } from "./SearchInput";
import { CollapsibleSection, Button, Radio, Dropdown } from ".";
import type { DropdownOption } from "./Dropdown";
import { accordionItems } from "../mock-data/accordionItems";
import { sortOptions } from "../mock-data/sortOptions";

interface SidebarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  selectedOptions: Record<string, string>;
  onOptionChange: (section: string, value: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  searchValue,
  onSearchChange,
  selectedOptions,
  onOptionChange,
}) => {
  const [fullTextSearch, setFullTextSearch] = useState(false);
  const [sortValue, setSortValue] = useState<DropdownOption>(sortOptions[0]);


  return (
    <aside className="w-[248px] bg-[#f7f8f7] min-h-screen px-6 pt-2 pb-6">
      {/* Search Input */}
      <SearchInput value={searchValue} onChange={onSearchChange} />

      {/* Full Text Search Toggle */}
      <div className="mt-2">
        <div className="flex items-center gap-2">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              id="fullTextSearch"
              checked={fullTextSearch}
              onChange={(e) => setFullTextSearch(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-[50px] h-[25px] bg-[#ccd4d1] rounded-full peer peer-checked:bg-success peer-focus:ring-2 peer-focus:ring-success/20 transition-colors duration-200 ease-in-out">
              <div
                className={`absolute left-0 top-0 w-[25px] h-[25px] bg-white border-[3px] rounded-full transition-transform duration-200 ease-in-out ${
                  fullTextSearch
                    ? "translate-x-[25px] border-success"
                    : "translate-x-0 border-[#ccd4d1]"
                }`}
              ></div>
            </div>
          </label>
          <label
            htmlFor="fullTextSearch"
            className="text-[13px] font-medium text-[#15372c] cursor-pointer leading-[19.5px]"
          >
            Full Text Search
          </label>
        </div>
        <p className="text-[11.6px] text-slate font-light leading-3 mt-1">
          (Includes resumes and notes)
        </p>
      </div>

      {/* Sort Dropdown (visual only) */}
      <div className="mt-4">
        <Dropdown
          options={sortOptions}
          value={sortValue}
          onChange={(option) => setSortValue(option)}
        />
      </div>

      {/* Filter Sections */}
      <div className="mt-4">
        {/* TODO: Add CollapsibleSection components for: */}
        {/* - Application Type */}
        {/* - Jobs */}
        {/* - CRM */}
        {/* - Profile Details */}
        {/* - Source */}
        {/* - Responsibility */}
        {/* - Pipeline Tasks */}
        {/* - Education */}
        {/* See CollapsibleSection.tsx for a starting point */}
        <CollapsibleSection
          items={accordionItems.map((item) => ({
            title: item.title,
            content: (
              <Radio
                name={item.title}
                options={item.options}
                value={selectedOptions[item.title] || ""}
                onChange={(value: string) => onOptionChange(item.title, value)}
                direction="column"
              />
            ),
          }))}
        />
      </div>

      {/* Reset Filters Button */}
      {Object.values(selectedOptions).some((value) => value) && (
        <Button
          startIcon="Reset"
          width={21}
          height={18}
          className="cursor-pointer mt-2 px-0 border-0 active:ring-0 hover:bg-mist bg-mist text-sky text-[13.9px] font-light flex items-center gap-2 hover:underline"
          onClick={() => onOptionChange("reset", "")}
        >
          Reset Filters
        </Button>
      )}
    </aside>
  );
};

export default Sidebar;
