import type { ReactNode, MouseEvent } from "react";
import { twMerge } from "tailwind-merge";
import { Button, Row, Typography } from ".";

interface ModalProps {
  title?: string;
  children: ReactNode;
  showFooter?: boolean;
  showAccept?: boolean;
  showDecline?: boolean;
  acceptText?: string;
  declineText?: string;
  onAccept?: () => void;
  onDecline?: () => void;
  className?: string;
  showShadow?: boolean;
  acceptDisabled?: boolean;
  closeOnBackdropClick?: boolean;
}

export default function Modal({
  title = "Modal Title",
  children,
  showFooter = true,
  showAccept = true,
  showDecline = true,
  acceptText = "Accept",
  declineText = "Cancel",
  acceptDisabled,
  onAccept = () => {},
  onDecline = () => {},
  className = "",
  showShadow = false,
  closeOnBackdropClick = false,
}: ModalProps) {
  const handleBackgroundClick = (e: MouseEvent<HTMLDivElement>) => {
    if (closeOnBackdropClick && e.currentTarget === e.target) {
      onDecline();
    }
  };

  return (
    <div
      className="fixed h-full inset-0 z-50 flex items-center justify-center bg-abyss/25 bg-opacity-50"
      aria-modal="true"
      role="dialog"
      onClick={handleBackgroundClick}
    >
      <div
        className={twMerge(
          "relative w-full max-w-lg max-h-[90vh] overflow-hidden bg-white rounded-lg shadow p-4",
          className,
          showShadow && "p-0"
        )}
      >
        <Row className={twMerge("sticky top-0 z-10 px-1", showShadow && "shadow p-4")}>
          <Typography variant="base" weight="medium">
            {title}
          </Typography>

          <Button
            width={16}
            height={16}
            startIcon="Cross"
            onClick={onDecline}
            className="cursor-pointer bg-white border-0 p-0 hover:bg-white"
          />
        </Row>

        <div
          className={twMerge(
            "overflow-y-auto py-4 max-h-[calc(95vh-120px)]",
            showShadow && "px-4"
          )}
        >
          {children}
        </div>

        {showFooter && (
          <Row
            className={twMerge(
              "sticky bottom-0 z-10 justify-end gap-2 px-1",
              showShadow && "pb-4 pr-4"
            )}
          >
            {showDecline && (
              <Button
                onClick={onDecline}
                className="px-5 py-1 hover:bg-success/20"
                
                variant="outlined"
              >
                {declineText}
              </Button>
            )}

            {showAccept && (
              <Button
                onClick={onAccept}
                className="px-5 py-1 bg-success/95 text-white hover:bg-success"
                disabled={acceptDisabled}
              >
                {acceptText}
              </Button>
            )}
          </Row>
        )}
      </div>
    </div>
  );
}
