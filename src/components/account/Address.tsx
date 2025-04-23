export default function Address() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-semibold ~text-sm/xl text-neutral-07 dark:text-grey-400 border border-neutral-02 dark:border-grey-700 rounded-md p-2">
        Just For Test
      </h2>
      <div className="p-4 border-2 rounded-md bg-neutral-02 dark:bg-grey-800 dark:border-grey-700 ">
        <p className="font-semibold text-neutral-07 dark:text-grey-300 ~text-base/lg">
          123 Main St
        </p>
        <p className="text-neutral-04">Springfield, IL 62701, USA</p>
      </div>
    </div>
  );
}
