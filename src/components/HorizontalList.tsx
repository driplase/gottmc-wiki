import { ReactNode } from "react";

export default function HorizontalList({
  children,
}: {
  children: ReactNode,
}) {
  return (
    <div className="horizontal-list">
      { children }
    </div>
  );
}