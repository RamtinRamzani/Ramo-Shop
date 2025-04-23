import { Select, SelectItem } from "@heroui/react";
import { useSearchParams } from "react-router-dom";

interface FilterProps {
  title: string;
  options: { value: string; label: string }[];
  filterField: string;
}

function Filter({ title, options, filterField }: FilterProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentField =
    searchParams.get(filterField) || options.at(0)?.value || "";

  function handleClick(value: string) {
    const newParams = new URLSearchParams(searchParams);
    if (value && value !== "all") {
      newParams.set(filterField, value);
    } else {
      newParams.delete(filterField);
    }

    setSearchParams(newParams);
  }

  return (
    <div className="sm:w-1/2 w-full self-end">
      <p className="mb-2 ~text-xs/sm font-semibold uppercase text-neutral-04 dark:text-grey-300">
        {title}
      </p>
      <Select
        aria-label={title}
        isRequired
        className="max-w-lg"
        defaultSelectedKeys={[currentField]}
        onSelectionChange={(value) =>
          handleClick(Array.from(value)[0] as string)
        }
      >
        {options.map((item) => (
          <SelectItem
            className="capitalize"
            key={item.value}
            onPress={() => handleClick(item.value)}
          >
            {item.label}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}

export default Filter;
