import { useMemo } from 'react';
import { Button, Row } from '.';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const getVisiblePages = (current: number, total: number): (number | string)[] => {
  const pages: (number | string)[] = [];

  if (total <= 11) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  pages.push(1);

  let left = current - 1;
  let right = current + 1;

  if (current <= 5) {
    left = 2;
    right = 9;
  }

  if (current >= total - 4) {
    left = total - 8;
    right = total - 1;
  }

  if (left > 2) {
    pages.push("...");
  }

  for (let i = left; i <= right; i++) {
    if (!pages.includes(i)) {
      pages.push(i);
    }
  }

  if (right < total - 2) {
    pages.push("...");
  }

  if (!pages.includes(total - 1)) pages.push(total - 1);
  if (!pages.includes(total)) pages.push(total);

  return pages;
};


export default function Pagination({
  totalPages,
  currentPage,
  onPageChange,
  className = '',
}: PaginationProps) {

  const visiblePages = useMemo(
    () => getVisiblePages(currentPage, totalPages),
    [currentPage, totalPages]
  );

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  if (totalPages === 0) return null;

  return (
    <Row className={`justify-center items-center gap-2 py-2 text-sm ${className}`}>

      <Button
        startIcon="ArrowLeft1"
        width={16}
        height={16}
        disabled={currentPage === 1}
        onClick={() => goToPage(currentPage - 1)}
        className={`px-2 border-0 active:ring-0 hover:bg-[#f7f8f7] bg-[#f7f8f7] ${
          currentPage === 1 ? 'opacity-30 cursor-not-allowed text-abyss' : 'cursor-pointer text-abyss'
        }`}
      />

      {visiblePages.map((page, idx) =>
        typeof page === 'number' ? (
          <div
            key={idx}
            onClick={() => goToPage(page)}
            className={`px-3 py-1 min-w-8 text-center cursor-pointer ${
              currentPage === page ? 'bg-smoke rounded text-black font-semibold' : 'text-abyss'
            }`}
          >
            {page}
          </div>
        ) : (
          <div key={idx} className="px-1.5">...</div>
        )
      )}

      <Button
        startIcon="ArrowRight1"
        width={16}
        height={16}
        disabled={currentPage === totalPages}
        onClick={() => goToPage(currentPage + 1)}
        className={`px-2 border-0 active:ring-0 hover:bg-[#f7f8f7] bg-[#f7f8f7] ${
          currentPage === totalPages ? 'opacity-30 cursor-not-allowed text-abyss' : 'cursor-pointer text-abyss'
        }`}
      />
    </Row>
  );
}
