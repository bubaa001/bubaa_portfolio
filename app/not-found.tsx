import Link from "next/link";
export default function NotFound() {
  return (
    <section className="container-x py-32 text-center">
      <h1 className="text-6xl font-extrabold text-accent">404</h1>
      <p className="mt-4 text-slate-600 dark:text-slate-400">This page doesn&apos;t exist.</p>
      <Link href="/" className="btn-primary mt-8">Go home</Link>
    </section>
  );
}
