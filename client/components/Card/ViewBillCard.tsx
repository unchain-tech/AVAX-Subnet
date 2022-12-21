import SubmitButton from "../Button/SubmitButton";

type Props = {
  title: string;
  onClick: () => void;
};

export default function ViewBillCard({ title, onClick }: Props) {
  return (
    <div className="flex justify-center my-10">
      <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
        <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">
          Card title
        </h5>
        <p className="text-gray-700 text-base mb-4">
          Some quick example text to build on the card title and make up the
          bulk of the card s content.
        </p>
        <SubmitButton title={title} onClick={onClick} />
      </div>
    </div>
  );
}
