import Link from "next/link";

type Props = {
  to: string;
  name: string;
};

export default function NavButton({ to, name }: Props) {
  return (
    <Link href={to} className="bg-white">
      {name}
    </Link>
  );
}
