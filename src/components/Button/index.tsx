import type { ButtonHTMLAttributes, JSX } from "react";
import styles from "./button.module.css";
import { ButtonSpinner } from "@chakra-ui/react";

export type ColorVariantProps = "primary" | "secondary";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * @type {string}
   * @memberof ButtonProps
   */
  size: "sm" | "md" | "lg";
  /**
   * @type {string}
   * @memberof ButtonProps
   */
  variant: "contained" | "outlined";
  brand: ColorVariantProps;
  icon?: React.ReactElement;
  iconDir?: "left" | "right";
  text?: string | JSX.Element;
  textClass?: string;
  isLoading?: boolean;
}

type ButtonStyle = {
  padding: {
    [key in ButtonProps["size"]]: string;
  };

  textSize: {
    [key in ButtonProps["size"]]: string;
  };
  variant: {
    [key in ButtonProps["variant"]]: {
      background: {
        [key in ButtonProps["brand"]]?: string;
      };
      border?: {
        [key in ButtonProps["brand"]]?: string;
      };
      textColor: {
        [key in ButtonProps["brand"]]?: string;
      };
    };
  };
};

const buttonStyles: ButtonStyle = {
  padding: {
    lg: "!py-[13.2px] !px-[25px]",
    md: "!py-[13px] !px-5",
    sm: "!py-[9px] sm:!px-[18px] !px-[8px]",
  },
  textSize: {
    lg: "!text-base",
    md: "!text-sm",
    sm: "!text-sm",
  },
  variant: {
    contained: {
      textColor: {
        primary: "!text-white",
        secondary: "!text-black",
      },
      background: {
        primary: "!bg-[#1f2937] hover:!shadow",
        secondary: "!bg-[#f9e1c0] hover:!shadow",
      },
    },
    outlined: {
      textColor: {
        primary: "!text-[#1f2937] dark:!text-white hover:!text-white",
        secondary: "!text-[#f9e1c0] hover:!text-white",
      },
      background: {
        primary: "!bg-transparent hover:!bg-[#1f2937]",
        secondary: "!bg-transparent hover:!bg-[#f9e1c0] active:!bg-[#f9e1c0]",
      },
      border: {
        primary: "!border-solid !border !border-[#1f2937]",
        secondary: "!border-solid !border !border-[#f9e1c0]",
      },
    },
  },
};
/**
 * 
 * @param size {sm | md | lg}
 *  @param variant {contained | ghost | outlined}
 *  @param text {String}
 *  @param iconDir {'left' | 'right} - optional
 *  @param icon {JSX.Element} optional
 * @example 
 * <Button 
        size="sm" 
        brand="primary" 
        variant='outlined' 
        text='Button text' 
        icon={<Icon className='text-inherit' />}
    />
    @description This reusable button component provides the default styles for the brand colours 
    and also differs in variants (solid/contained, outlined, ghost) and sizes (sm, md, lg). 
    It also accepts SVG icons which has already been pre-defiend to have the same colour as the button text
 * @returns {JSX.Element}
 */

export function Button({
  size,
  variant = "contained",
  brand,
  text,
  iconDir,
  icon,
  className,
  textClass,
  disabled,
  isLoading = false,
  ...rest
}: ButtonProps): JSX.Element {
  const isDisabled = disabled || isLoading;

  return (
    <button
      className={`
        flex items-center justify-center 
        disabled:opacity-30 disabled:cursor-not-allowed 
        transition duration-300 font-normal rounded-3xl
        ${styles["button"]}
        ${buttonStyles.padding[size]} 
        ${buttonStyles.textSize[size]}
        ${buttonStyles.variant[variant].background[brand]}
        ${buttonStyles.variant[variant].textColor[brand]}
        ${buttonStyles.variant[variant].border?.[brand] || ""}
        ${className || ""} 
    `}
      {...rest}
      disabled={isDisabled}
    >
      {icon && (
        <div
          className={`${
            iconDir === "left" ? "order-first mr-1" : "order-last ml-1"
          } text-inherit p-0`}
        >
          {icon}
        </div>
      )}
      <div className={`${textClass ?? ""} font-medium flex items-center`}>
        <span
          className={`${
            iconDir === "left" ? "order-last" : "order-first text-left"
          }`}
        >
          {text}
        </span>
        {isLoading && <ButtonSpinner className="text-inherit relative ml-1" />}
      </div>
    </button>
  );
}

export default Button;
