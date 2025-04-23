export default function InputForm({
  children,
  onSubmit,
  className,
}: {
  children: React.ReactNode;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  className?: string;
}) {
  return (
    <form
      className="w-full ~gap-4/8 md:flex-nowrap flex flex-col"
      onSubmit={onSubmit}
    >
      <div className={`px-6 ${className}`}>
        <div className="flex flex-col gap-y-10">{children}</div>
      </div>
    </form>
  );
}
