import { IconTrees } from "@tabler/icons-react";
import Link from "next/link";

export default function Header() {
  const routes = [
    { name: "Adopt", href: "plants" },
    { name: "Donate NGO", href: "donate" },
    { name: "Crowd Fund", href: "crowd-fund" },
    { name: "Login", href: "login" },
  ];

  return (
    <header className="sticky top-0 shadow-lg navbar bg-base-100">
      <div className="flex-1">
        <a className="gap-2 text-xl normal-case btn btn-ghost">
          <IconTrees className="text-emerald-500" /> Tree Transparency
        </a>
      </div>
      <div className="flex-none">
        <ul className="px-1 menu menu-horizontal">
          {routes.map((route) => (
            <li key={route.href}>
              <Link href={route.href}>{route.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}