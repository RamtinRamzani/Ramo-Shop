import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div className="flex flex-col ~gap-4/2 items-center justify-center min-h-screen bg-bg-color text-white">
      <h2 className="~text-7xl/9xl font-bold text-neutral-06">404</h2>
      <p className="~text-md/lg text-neutral-600 text-center mx-6">
        We can't find the page you're looking for.
      </p>
      <Link
        to="/"
        className="~mt-6/10 ~px-4/10 ~py-3/5 bg-neutral-900 rounded-lg shadow hover:bg-neutral-06 transition"
      >
        Take Me Home
      </Link>
    </div>
  );
}
