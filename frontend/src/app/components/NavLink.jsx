// const { default: Link } = require("next/link");
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({ href, title }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`block py-2 pl-3 pr-4 text-[#ADB7BE] sm:text-xl rounded md:p-0 hover:text-white ${
        isActive ? "text-white border-b-2 border-primary-500" : ""
      }`}
    >
      {title}
    </Link>
  );
}

// export default NavLink;
