"use client";

import { track } from "@vercel/analytics";

import ButtonPrimary from "@/components/ui/ButtonPrimary";

interface CvDownloadButtonProps {
  href: string;
}

export default function CvDownloadButton({ href }: CvDownloadButtonProps) {
  return (
    <ButtonPrimary
      className="w-fit"
      href={href}
      onClick={() => track("cv_download")}
      rel="noreferrer"
      target="_blank"
    >
      Download PDF
    </ButtonPrimary>
  );
}
