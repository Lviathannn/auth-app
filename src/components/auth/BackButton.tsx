"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {
  label: string;
  href: string;
};

export default function BackButton({ label, href }: Props) {
  return (
    <Button variant="link" size="sm" asChild className="w-full font-normal">
      <Link href={href}>{label}</Link>
    </Button>
  );
}
