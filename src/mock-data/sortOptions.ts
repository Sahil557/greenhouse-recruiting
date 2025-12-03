import type { DropdownOption } from "../components/Dropdown";

export const sortOptions: DropdownOption[] = [
  { label: "Last Activity (new to old)", value: "last-activity-new" },
  { label: "Last Activity (old to new)", value: "last-activity-old" },
  { label: "Name (A-Z)", value: "name-asc" },
  { label: "Name (Z-A)", value: "name-desc" },
];