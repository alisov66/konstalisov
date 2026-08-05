import Footer from "@/components/ui/Footer";

export default function PlaygroundPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-beige)] text-[var(--text-primary)]">
      <section className="mb-[var(--base-24)] p-10 min-[768px]:mb-[var(--base-30)]">
        <div className="mx-auto max-w-4xl rounded-[32px] border border-[var(--border-primary)] bg-[var(--bg-gray)] p-8">
          <h1 className="text-3xl font-semibold">Playground</h1>
          <p className="mt-3 text-base text-[var(--text-secondary)]">
            This space is intentionally empty while the new layout is being built.
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
