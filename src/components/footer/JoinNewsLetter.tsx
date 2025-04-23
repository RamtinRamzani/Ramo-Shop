import Input from "../../ui/FooterInput";

export default function JoinNewsLetter() {
  return (
    <div className="">
      <h2 className="mb-4 text-2xl font-semibold text-slate-300">
        Join Newsletter
      </h2>

      <div className="flex flex-col gap-8 max-sm:items-center">
        <span>
          Subscribe our newsletter to get more deals, new products and
          promotions
        </span>

        <Input type="text" placeholder="enter your email" />
      </div>
    </div>
  );
}
