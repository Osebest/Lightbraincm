import type { UseFormRegisterReturn } from "react-hook-form";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  caption?: string;
  label?: string;
  register?: UseFormRegisterReturn;
  labelClassName?: string;
  inputClassName?: string;
}

const InputField: React.FC<InputProps> = ({
  className,
  inputClassName,
  labelClassName,
  register,
  ...props
}) => {
  const { label, name, id, type, placeholder, error, disabled, onChange } =
    props;

  return (
    <div className={`${className ?? ""} relative space-y-1 w-full`}>
      <label
        htmlFor={id ?? register?.name ?? name}
        className={`text-base text-primary dark:text-white ml-3 font-medium ${
          labelClassName ? labelClassName : ""
        }`}
      >
        {label}
      </label>
      <div className="relative">
        <input
          onChange={onChange}
          disabled={disabled}
          type={type}
          id={id ?? register?.name ?? name}
          placeholder={placeholder}
          className={`flex h-12 w-full items-center justify-center rounded-2xl border bg-white/0 p-3 text-sm outline-none ${
            disabled
              ? "!border-none !bg-gray-100 dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)]"
              : error
              ? "border-state-error text-state-error placeholder:text-state-error"
              : "focus:border-primary-40 placeholder:text-primary-40 border-gray-200 text-primary dark:!border-white/10 dark:text-white"
          } ${inputClassName ?? ""}`}
          name={name}
          {...register}
          {...props}
        />
      </div>
      <span
        id={`error-${id ?? register?.name ?? name}`}
        className="text-state-error text-xs h-1 w-full inline-block"
      >
        {error ?? ""}
      </span>
    </div>
  );
};

export default InputField;
