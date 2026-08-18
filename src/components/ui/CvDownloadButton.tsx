"use client";

import { sendGAEvent } from "@next/third-parties/google";

import ButtonPrimary from "@/components/ui/ButtonPrimary";

interface CvDownloadButtonProps {
  href: string;
}

export default function CvDownloadButton({ href }: CvDownloadButtonProps) {
  return (
    <ButtonPrimary
      className="w-fit"
      href={href}
      onClick={() => sendGAEvent("event", "cv_download")}
      rel="noreferrer"
      target="_blank"
    >
      Download PDF
    </ButtonPrimary>
  );
}
