import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Car, CalendarCheck, Settings, LogOut } from "lucide-react";
import { Logo } from "../Logo";
import { cn } from "@/lib/cn";
import { logout } from "@/lib/auth";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/viaturas", label: "Viaturas", icon: Car },
  { href: "/admin/reservas", label: "Reservas", icon: CalendarCheck },
  { href: "/admin/definicoes", label: "Definições", icon: Settings }
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-64 flex-shrink-0 flex-col border-r border-night-700/60 bg-night-950 md:flex">
        <div className="border-b border-night-700/60 p-5">
          <Logo />
        </div>
        <nav className="flex flex-1 flex-col gap-1 p-3">
          {NAV.map((item) => {
            const Icon = item.icon;
            const active = item.exact
              ? pathname === item.href
              : pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition",
                  active
                    ? "bg-amber-400/10 text-amber-400"
                    : "text-bone-100 hover:bg-night-800"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
          <button
            type="button"
            onClick={handleLogout}
            className="mt-auto flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-ink-400 transition hover:bg-night-800 hover:text-rose-300"
          >
            <LogOut className="h-4 w-4" />
            Terminar sessão
          </button>
        </nav>
      </aside>
      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-night-700/60 bg-night-900 px-5 py-3 md:hidden">
          <Logo />
          <button
            type="button"
            onClick={handleLogout}
            className="btn-ghost"
          >
            <LogOut className="h-4 w-4" /> Sair
          </button>
        </header>
        <nav className="flex gap-1 overflow-x-auto border-b border-night-700/60 bg-night-900 p-2 md:hidden">
          {NAV.map((item) => {
            const Icon = item.icon;
            const active = item.exact
              ? pathname === item.href
              : pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex flex-shrink-0 items-center gap-2 rounded-full border px-3 py-2 text-xs",
                  active
                    ? "border-amber-400/50 bg-amber-400/10 text-amber-400"
                    : "border-night-600 text-bone-100"
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <main className="flex-1 p-5 sm:p-8">{children}</main>
      </div>
    </div>
  );
}
