import SubmitButton from "../Button/SubmitButton";

export type BillType = {
  amount: string;
  dueDate: string;
  issuer: string;
  recipient: string;
  active: boolean;
};

type Props = {
  title: string;
  button: string;
  onClick: () => void;
  bill: BillType;
};

export default function ViewBillCard({ title, button, onClick, bill }: Props) {
  return (
    <div className="flex justify-center my-10">
      <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
        <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">
          {title}
        </h5>
        <p className="text-gray-700 text-base mb-4">amount: {bill.amount}</p>
        <p className="text-gray-700 text-base mb-4">dueDate: {bill.dueDate}</p>
        <p className="text-gray-700 text-base mb-4">issuer: {bill.issuer}</p>
        <p className="text-gray-700 text-base mb-4">
          recipient: {bill.recipient}
        </p>
        <SubmitButton title={button} onClick={onClick} />
      </div>
    </div>
  );
}
