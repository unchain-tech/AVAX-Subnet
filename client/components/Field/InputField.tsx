type Props = {
  label: string;
  placeholder: string;
};

export default function InputField({ label, placeholder }: Props) {
  return (
    <div className="form-group mb-6">
      <label
        form="input"
        className="form-label inline-block mb-2 text-gray-700"
      >
        {label}
      </label>
      <input
        type="text"
        className="form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        id="input"
        placeholder={placeholder}
      />
    </div>
  );
}
