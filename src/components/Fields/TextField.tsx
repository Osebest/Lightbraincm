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
        className={`text-base text-primary dark:text-white ml-3 font-medium inline-flex gap-2 items-center ${
          labelClassName ? labelClassName : ""
        }`}
      >
        <span>{label}</span>
        {caption && (
          <span className="text-gray-500 text-xs font-medium">{`(${caption})`}</span>
        )}
      </label>
      <div>
        <textarea
          onChange={onChange}
          placeholder={placeholder}
          className={`flex h-36 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none ${
            disabled === true
              ? "!border-none !bg-gray-100 dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)]"
              : error
              ? "border-state-error text-state-error placeholder:text-state-error"
              : "focus:border-primary-40 placeholder:text-primary-40 border-gray-200 text-primary dark:!border-white/10 dark:text-white"
          } ${inputClassName ?? ""}`}
          name={name}
          disabled={disabled}
          {...register}
          {...rest}
        />
        <span
          id={`error-${id ?? register?.name ?? name}`}
          className=" text-state-error text-xs h-1 w-full inline-block"
        >
          {error ?? ""}
        </span>
      </div>
    </div>
  );
};

export default TextField;
