export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-full flex justify-center items-center h-screen">
      {children}
    </main>
  );
}
