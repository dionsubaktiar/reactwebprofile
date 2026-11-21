// Service: reactwebprofile | File: app/components/input.tsx
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
    <div className="my-3 space-y-1">
      <label htmlFor={id} className="block text-xs font-semibold text-slate-700 dark:text-zinc-300">
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
        className="w-full rounded-xl border border-slate-200 bg-white py-2.5 px-3 text-xs text-slate-900 shadow-xs focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white transition"
      />
    </div>
  );
};

export default InputForm;
