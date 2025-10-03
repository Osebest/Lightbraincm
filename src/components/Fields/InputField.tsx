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
        className={`text-base text-[#4c4c4d] dark:text-white font-medium ${
          labelClassName ? labelClassName : ""
        }`}
      >
        {label}
      </label>
      <div className="relative">
        <input
          aria-label="input-field"
          aria-labelledby="label"
          onChange={onChange}
          disabled={disabled}
          type={type}
          id={id ?? register?.name ?? name}
          placeholder={placeholder}
          className={`flex h-12 w-full items-center justify-center rounded-2xl !border-[1.5px] !bg-[#eee8e3] dark:!bg-transparent !p-3 text-sm outline-none ${
            disabled
              ? "!border-none !bg-gray-100 dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)]"
              : error
              ? "border-red-500 text-red-500 placeholder:text-red-500"
              : "!border-[#4c4c4d] dark:!border-white/10"
          } ${inputClassName ?? ""}`}
          aria-invalid={error ? "true" : "false"}
          aria-errormessage={
            error ? `error-${id ?? register?.name}` : undefined
          }
          name={name}
          {...register}
          {...props}
        />
      </div>
      <span
        id={`error-${id ?? register?.name ?? name}`}
        className="text-red-500 text-xs h-1 w-full inline-block"
      >
        {error ?? ""}
      </span>
    </div>
  );
};

export default InputField;
