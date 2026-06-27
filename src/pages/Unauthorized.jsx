import { Link } from "react-router-dom";

export default function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">

        <h1 className="text-3xl font-bold">
          Access Denied
        </h1>

        <p className="mt-3 text-gray-500">
          You don't have permission to access this page.
        </p>

        <Link
          to="/dashboard"
          className="mt-4 inline-block px-4 py-2 border rounded"
        >
          Go Back
        </Link>

      </div>
    </div>
  );
}