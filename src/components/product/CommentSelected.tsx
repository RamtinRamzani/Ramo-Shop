import { Select, SelectItem } from "@heroui/react";

interface SelectedItem {
  id: string;
  label: string;
}

interface Review {
  id: number;
  img: string;
  name: string;
  stars: number;
  text: string;
}

export default function CommentSelected({
  selected,
  reviews,
}: {
  selected?: SelectedItem[];
  reviews: Review[];
}) {
  if (!selected || selected.length === 0) return null;

  return (
    <div className="mt-8">
      <div className="flex flex-col justify-between gap-y-4 sm:flex-row">
        <h3 className="text-xl font-semibold text-neutral-05 dark:text-grey-300">
          {reviews.length} Reviews
        </h3>
        <Select
          aria-label="Select reviews"
          isRequired
          className="w-full sm:w-44"
          defaultSelectedKeys={[selected[0]?.id]}
        >
          {selected.map((item) => (
            <SelectItem key={item.id}>{item.label}</SelectItem>
          ))}
        </Select>
      </div>
    </div>
  );
}
