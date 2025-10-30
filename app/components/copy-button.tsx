'use client';

import { useCallback, useState } from "react";

type CopyButtonProps = {
  label?: string;
  text: string;
  className?: string;
};

export function CopyButton({
  label = "Copy",
  text,
  className,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (error) {
      console.error("Failed to copy workflow JSON", error);
    }
  }, [text]);

  return (
    <button type="button" onClick={handleCopy} className={className}>
      {copied ? "Copied!" : label}
    </button>
  );
}
