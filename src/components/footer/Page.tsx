import NavLink from "../../ui/NavLink";

export default function Page() {
  return (
    <div className="hidden md:block">
      <h2 className="mb-4 text-2xl font-semibold text-slate-300">Page</h2>

      <div className="flex flex-col gap-4">
        <NavLink to="/">home</NavLink>
        <NavLink to="/shop">shop</NavLink>
        <NavLink to="/product">product</NavLink>
        <NavLink to="/blog">blog</NavLink>
        <NavLink to="/contact">contact us</NavLink>
      </div>
    </div>
  );
}
