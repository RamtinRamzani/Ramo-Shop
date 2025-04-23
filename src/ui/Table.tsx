import { createContext, useContext, useState, useEffect } from "react";

const TableContext = createContext({ columns: "" });

function Table({
  // columns,
  children,
}: {
  columns: string;
  children: React.ReactNode;
}) {
  const [screenSize, setScreenSize] = useState<string>("");

  // Update columns based on screen size
  useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth >= 1024) {
        // large screens
        setScreenSize("2.4fr 1fr 1fr 1fr");
      } else {
        // small screens
        setScreenSize("2fr 1fr");
      }
    };

    updateColumns(); // Initial update
    window.addEventListener("resize", updateColumns);

    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  return (
    <TableContext.Provider value={{ columns: screenSize }}>
      <div role="table" className="text-sm rounded-lg overflow-hidden">
        {children}
      </div>
    </TableContext.Provider>
  );
}

function Header({ children }: { children: React.ReactNode }) {
  const { columns } = useContext(TableContext);

  return (
    <header
      role="row"
      style={{ gridTemplateColumns: columns }}
      className="grid gap-10 items-center py-4 border-b-2 border-gray-400 capitalize tracking-wide font-semibold text-gray-600 dark:text-grey-300"
    >
      {children}
    </header>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  const { columns } = useContext(TableContext);

  return (
    <div
      role="row"
      style={{ gridTemplateColumns: columns }}
      className="grid gap-10 items-center py-3 border-b border-gray-200 last:border-none"
    >
      {children}
    </div>
  );
}

function Body<T>({
  data,
  render,
}: {
  data: T[];
  render: (item: T, index: number) => React.ReactNode;
}) {
  if (!data.length)
    return (
      <p className="text-center font-medium text-lg my-6">
        No data to show at the moment
      </p>
    );

  return (
    <div className="my-1">{data.map((item, index) => render(item, index))}</div>
  );
}

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;

export default Table;
