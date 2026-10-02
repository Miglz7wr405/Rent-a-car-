import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { cn } from "@/lib/cn";

const NAV = [
  { href: "/", label: "Início" },
  { href: "/viaturas", label: "Viaturas" },
  { href: "/contactos", label: "Contactos" }
];

export function Header() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-night-700/60 bg-night-900/80 backdrop-blur">
      <div className="container-tight flex h-16 items-center justify-between">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => {
            const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "text-sm transition hover:text-amber-400",
                  active ? "text-amber-400" : "text-bone-100"
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <Link to="/viaturas" className="btn-primary">
            Reservar agora
          </Link>
        </nav>
        <button
          type="button"
          aria-label="Abrir menu"
          onClick={() => setOpen((v) => !v)}
          className="rounded-full border border-night-600 p-2 text-bone-100 md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open ? (
        <div className="border-t border-night-700/60 bg-night-900 md:hidden">
          <div className="container-tight flex flex-col gap-1 py-4">
            {NAV.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-sm text-bone-100 hover:bg-night-800"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/viaturas"
              onClick={() => setOpen(false)}
              className="btn-primary mt-2"
            >
              Reservar agora
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
