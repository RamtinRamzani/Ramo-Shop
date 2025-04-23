export default function CartHeader({ title }: { title: string }) {
  return (
    <h2 className="~mb-2/8 ~text-2xl/4xl font-semibold capitalize max-sm:text-center">
      {title}
    </h2>
  );
}
