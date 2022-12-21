import SubmitButton from "../Button/SubmitButton";
import InputField from "../Field/InputField";

type Props = {
  message: string;
};

const onClickIssue = async () => {
  alert("onClickIssue");
};

export default function IssueBillForm({ message }: Props) {
  return (
    <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm h-fit my-auto">
      <form>
        <InputField
          label="Recipient"
          placeholder="Enter the address of recipient"
        />
        <SubmitButton title="issue" onClick={onClickIssue} />
      </form>
    </div>
  );
}
