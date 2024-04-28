import { TriangleAlert } from "lucide-react";
type Props = {
  message?: string;
};

export default function FormError({ message }: Props) {
  if (!message) return null;
  return (
    <div className="flex items-center gap-x-2 rounded-md bg-destructive/15 p-3  text-sm text-destructive">
      <TriangleAlert size={16} />
      <p>{message}</p>
    </div>
  );
}
