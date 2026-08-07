import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-6 text-center text-white">
      <h1 className="text-7xl font-black">404</h1>
      <p className="mt-4 text-slate-400">This page does not exist.</p>

      <Link
        to="/"
        className="mt-8 rounded-full bg-indigo-500 px-6 py-3 font-semibold hover:bg-indigo-400"
      >
        Go Home
      </Link>
    </div>
  );
}

export default NotFound;