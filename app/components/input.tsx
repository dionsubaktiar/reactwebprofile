interface InputProps {
  id: string;
  type: string;
  name: string;
  placeholder: string;
  inputName: string;
  value: string;
  onChangeValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputForm: React.FC<InputProps> = ({
  type,
  id,
  name,
  placeholder,
  inputName,
  value,
  onChangeValue,
}) => {
  return (
    <div className="my-3 flex-col">
      <label htmlFor={id} className="block font-medium leading-6">
        {inputName}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        id={id}
        value={value}
        onChange={onChangeValue}
        autoComplete="off"
        required
        className="block w-full rounded-md border-0 py-1.5 pl-7 ring-gray-400 text-black ring-1 ring-inset ring-inherit
         placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-customGreen-light sm:text-sm sm:leading-6"
      />
    </div>
  );
};

export default InputForm;
