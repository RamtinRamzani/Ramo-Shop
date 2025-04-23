export default function CartPlan({ text }: { text: string }) {
  return (
    <div>
      <span className="px-4 font-semibold capitalize bg-white rounded-md shadow-md">
        {text}
      </span>
    </div>
  );
}
