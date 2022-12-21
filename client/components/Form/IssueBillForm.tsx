import { useState } from "react";
import SubmitButton from "../Button/SubmitButton";
import InputField from "../Field/InputField";

type Props = {
  message: string;
};

export default function IssueBillForm({ message }: Props) {
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const onClickIssue = async () => {
    alert(JSON.stringify(recipient) + ":" + JSON.stringify(amount));
  };

  return (
    <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm h-fit my-auto">
      <form>
        <InputField
          label="Amount of AVAX"
          placeholder="Enter the amount of AVAX"
          onChange={(value) => setAmount(value)}
        />
        <InputField
          label="Recipient"
          placeholder="Enter the address of recipient"
          onChange={(value) => setRecipient(value)}
        />
        <SubmitButton title="issue" onClick={onClickIssue} />
      </form>
    </div>
  );
}
