import { Input } from "@heroui/react";
import { SearchIcon2 } from "../../assets/icons";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function SearchInput() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    setSearchParams(params, { replace: true });
  };

  const handleClear = () => {
    setSearch("");
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.delete("search");
      return params;
    });
  };

  useEffect(() => {
    const searchValue = searchParams.get("search") || "";
    if (searchValue !== search) {
      setSearch(searchValue);
    }
  }, [searchParams, search]);

  return (
    <Input
      isClearable
      classNames={{
        label: "text-black/50 dark:text-white/90",
        input: [
          "bg-transparent",
          "text-black/90 dark:text-white/90",
          "placeholder:text-default-700/50 dark:placeholder:text-white/60",
        ],
        innerWrapper: "bg-transparent",
        inputWrapper: [
          "bg-default-200/50",
          "dark:bg-default/60",
          "backdrop-blur-xl",
          "backdrop-saturate-200",
          "hover:bg-default-200/70",
          "dark:hover:bg-default/70",
          "group-data-[focus=true]:bg-default-200/50",
          "dark:group-data-[focus=true]:bg-default/60",
          "!cursor-text",
        ],
      }}
      value={search}
      onChange={handleSearchChange}
      onClear={handleClear}
      placeholder="Type to search..."
      radius="sm"
      startContent={
        <SearchIcon2 className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
      }
    />
  );
}
