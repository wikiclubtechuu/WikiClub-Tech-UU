import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="flex min-h-[calc(100vh-50px)] flex-col items-center justify-center px-6 py-20 text-center">
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-blue-100">
          <span className="text-5xl" role="img" aria-label="Member Login">
            🔐
          </span>
        </div>

        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-600">
          WIKICLUB TECH
        </p>

        <h1 className="mb-4 text-3xl font-bold text-gray-950 sm:text-4xl md:text-5xl">
          Member Login Coming Soon
        </h1>

        <p className="mb-8 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
          The member login experience is being prepared. Please check back soon.
        </p>

        <Link
          href="/"
          className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-blue-700"
        >
          Back to Home
        </Link>
      </section>
    </main>
  );
}
