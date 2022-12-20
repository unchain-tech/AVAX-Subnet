import Link from "next/link";

type Props = {
  to: string;
  name: string;
};

export default function NavButton({ to, name }: Props) {
  return (
    <Link
      href={to}
      className="px-6 py-3 rounded-md bg-slate-400 hover:bg-blue-400 text-white duration-300 w-max self-center"
    >
      {name}
    </Link>
  );
}
