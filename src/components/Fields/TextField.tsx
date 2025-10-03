import type { InputProps } from "./InputField";

interface TextFieldProps
  extends Pick<
      InputProps,
      | "error"
      | "name"
      | "inputClassName"
      | "register"
      | "labelClassName"
      | "label"
      | "caption"
    >,
    React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const TextField: React.FC<TextFieldProps> = ({
  className,
  inputClassName,
  labelClassName,
  register,
  label,
  name,
  id,
  placeholder,
  error,
  disabled,
  caption,
  onChange,
  ...rest
}) => {
  return (
    <div className={`${className ?? ""} relative space-y-1 w-full`}>
      <label
        htmlFor={id ?? register?.name ?? name}
        className={`text-base text-[#4c4c4d] dark:text-white font-medium inline-flex gap-2 items-center ${
          labelClassName ? labelClassName : ""
        }`}
      >
        <span>{label}</span>
      </label>
      <div>
        <textarea
          aria-label="text-field"
          aria-labelledby="label"
          id={id ?? register?.name ?? name}
          onChange={onChange}
          placeholder={placeholder}
          className={`flex h-36 w-full items-center justify-center rounded-xl !border-[1.5px] !bg-[#eee8e3] dark:!bg-transparent !p-3 text-sm outline-none ${
            disabled
              ? "!border-none !bg-gray-100 dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)]"
              : error
              ? "border-red-500 text-red-500 placeholder:text-red-500"
              : "!border-[#4c4c4d] dark:!border-white/10"
          } ${inputClassName ?? ""}`}
          aria-errormessage={
            error ? `error-${id ?? register?.name}` : undefined
          }
          aria-invalid={error ? "true" : "false"}
          name={name}
          disabled={disabled}
          {...register}
          {...rest}
        />
        <span
          id={`error-${id ?? register?.name ?? name}`}
          className=" text-red-500 text-xs h-1 w-full inline-block"
        >
          {error ?? ""}
        </span>
      </div>
    </div>
  );
};

export default TextField;
