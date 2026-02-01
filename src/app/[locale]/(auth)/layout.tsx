export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="relative h-full">
      <section>
        {children}
      </section>
    </main>
  );
}
