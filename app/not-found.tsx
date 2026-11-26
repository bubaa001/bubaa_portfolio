import Link from "next/link";
export default function NotFound() {
  return (
    <section className="container-x grid min-h-[80vh] place-items-center text-center">
      <div>
        <h1 className="gradient-text text-8xl font-semibold">404</h1>
        <p className="mt-4 text-zinc-400">This page wandered off.</p>
        <Link href="/" className="btn-primary mt-8">Back home</Link>
      </div>
    </section>
  );
}
