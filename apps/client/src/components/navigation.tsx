import Image from "next/image";

export default function Navigation() {
  return (
    <nav className="flex h-24 border-slate-200">
      <div className="flex items-center justify-center">
        <a
          href="/"
          className="text-2xl flex items-center space-x-3 font-bold p-4 hover:bg-slate-50 hover:rounded-2xl"
        >
          <Image
            src="/images/pokemon-logo.png"
            alt="Logo"
            width={200}
            height={72}
          />
          <h2 className="text-3xl text-red-500">App</h2>
        </a>
      </div>
    </nav>
  );
}
