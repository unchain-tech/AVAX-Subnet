type Props = {
  address: string;
};

export default function ViewAccountCard({ address }: Props) {
  return (
    <div className="block px-1 rounded-lg shadow-lg bg-white max-w-sm">
      <p className="text-gray-700 text-base mb-4">{address}</p>
    </div>
  );
}
