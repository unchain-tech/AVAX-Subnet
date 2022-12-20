type Props = {
  message: string;
};

export default function ViewAccountCard({ message }: Props) {
  return (
    <div className="bg-slate-300 p-5 m-10">
      <div className="bg-slate-400 mb-3">
        <div>account: {message}</div>
      </div>
    </div>
  );
}
