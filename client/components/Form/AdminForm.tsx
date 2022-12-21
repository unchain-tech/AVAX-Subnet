import { useState } from "react";
import SubmitButton from "../Button/SubmitButton";
import InputField from "../Field/InputField";

export default function AdminForm() {
  const [address, setAddress] = useState("");

  const onClickChange = async () => {
    alert(JSON.stringify(address));
  };

  return (
    <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm h-fit mx-auto">
      <form>
        <InputField
          label="Address to change access"
          placeholder="address"
          onChange={(value) => setAddress(value)}
        />
        <SubmitButton title="change" onClick={onClickChange} />
      </form>
    </div>
  );
}
