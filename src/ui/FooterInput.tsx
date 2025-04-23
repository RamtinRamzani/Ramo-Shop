export default function FooterInput({
  type,
  placeholder,
}: {
  type: string;
  placeholder: string;
}) {
  return (
    <input
      className="px-4 py-2 text-sm transition-all duration-300 border-2 rounded-full text-neutral-05 border-slate-300 bg-inherit placeholder:text-neutral-04 placeholder:capitalize focus:outline-none focus:ring focus:ring-secondary-orange focus:ring-opacity-50 ~w-32/64 sm:focus:w-72"
      type={type}
      placeholder={placeholder}
    />
  );
}
