export default function CartTitle({
  title,
  className,
}: {
  title?: string;
  className?: string;
}) {
  return (
    <div className={`capitalize mb-4 ${className}`}>
      <p className="~text-lg/2xl font-semibold">{title}</p>
      <button className="text-sm underline transition-all duration-200 underline-offset-4 hover:text-medium">
        collection →
      </button>
    </div>
  );
}
