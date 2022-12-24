import { BillStatus, BillType } from "../../hooks/useContract";
import SubmitButton from "../Button/SubmitButton";

type Props = {
  title: string;
  buttonTitle: string;
  disable: boolean;
  onClick: () => void;
  bill: BillType;
};

export default function ViewBillCard({
  title,
  buttonTitle,
  disable,
  onClick,
  bill,
}: Props) {
  let bgColor = "bg-white";

  switch (bill.status) {
    case BillStatus.Dishonored:
      bgColor = "bg-red-300";
      break;
  }

  return (
    <div className={bgColor}>
      <div className="my-10 block p-5 rounded-lg shadow-lg w-fit">
        <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">
          {title}
        </h5>
        <p className="text-gray-700 text-base mb-4">amount: {bill.amount}</p>
        <p className="text-gray-700 text-base mb-4">
          dueDate: {bill.dueDate.toString()}
        </p>
        <p className="text-gray-700 text-base mb-4">issuer: {bill.issuer}</p>
        <p className="text-gray-700 text-base mb-4">
          recipient: {bill.recipient}
        </p>
        <SubmitButton title={buttonTitle} disable={disable} onClick={onClick} />
      </div>
    </div>
  );
}
