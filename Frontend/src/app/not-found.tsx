export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">404</h1>

      <h2 className="mt-2 text-2xl font-semibold">
        Page Not Found
      </h2>

      <p className="mt-2 text-gray-500">
        The page you are looking for does not exist.
      </p>

      <a
        href="/"
        className="mt-6 rounded-lg bg-black px-5 py-2 text-white"
      >
        Go Home
      </a>
    </div>
  );
}