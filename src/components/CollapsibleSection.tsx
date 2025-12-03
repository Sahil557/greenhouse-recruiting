/**
 * CollapsibleSection Component - SKELETON/STARTING POINT
 *
 * This is an incomplete component provided as a reference.
 * You need to implement the expand/collapse functionality.
 *
 * Requirements:
 * - Should expand/collapse when clicked
 * - Chevron should rotate 90 degrees when collapsed (point right) vs expanded (point down)
 * - Should have proper border styling
 * - Children should only show when expanded
 *
 * Design specs:
 * - Border: border-b border-[#e1e1e1]
 * - Button padding: py-3
 * - Font: text-[14px] font-medium text-[#15372c] leading-[19.5px]
 * - Chevron size: w-3.5 h-3.5
 * - Hover: hover:bg-gray-50
 */

import { useState, type ReactNode } from "react";
import { Column, Row, Typography, Icon } from "./index";

interface CollapsibleSectionItem {
  title: string;
  content: ReactNode;
}

interface CollapsibleSectionProps {
  items: CollapsibleSectionItem[];
  multiple?: boolean;
}

export default function CollapsibleSection({
  items,
  multiple = false,
}: CollapsibleSectionProps) {
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const toggle = (index: number) => {
    if (multiple) {
      setOpenIndexes((prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index)
          : [...prev, index]
      );
    } else {
      setOpenIndexes((prev) => (prev.includes(index) ? [] : [index]));
    }
  };

  return (
    <div className="">
      {items.map((item, index) => {
        const isOpen = openIndexes.includes(index);

        return (
          <div key={index}>
            <Column
              className={`border-t border-ink ${
                index === items.length - 1 ? "border-b border-ink" : ""
              }`}
            >
              <Row
                className={`w-full cursor-pointer py-3 transition-colors duration-200 ${
                  isOpen ? "bg-[#EAECF0]" : "hover:bg-[#EAECF0]"
                }`}
                onClick={() => toggle(index)}
              >
                <Typography variant="sm" weight="medium">
                  {item.title}
                </Typography>

                <Icon
                  name="ArrowRight1"
                  width={14}
                  height={14}
                  className={`transition-transform duration-200 ${
                    isOpen ? "rotate-90" : "rotate-0"
                  }`}
                />
              </Row>

              {isOpen && <div className="my-3">{item.content}</div>}
            </Column>
          </div>
        );
      })}
    </div>
  );
}
