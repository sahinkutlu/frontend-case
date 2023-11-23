import classes from "./styles.module.scss";
import { InputHTMLAttributes, forwardRef, useState } from "react";
import CloseIcon from "@/assets/close.svg";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  onClear?: () => void;
  onEnter?: () => void;
}

const Input = forwardRef<HTMLInputElement, Props>(
  ({ icon, onClear, onEnter, ...props }, ref) => {
    const [value, setValue] = useState("");

    const showCloseIcon = value.length > 0;
    const showCustomIcon = icon && !showCloseIcon;

    const clearInput = () => {
      setValue("");
      onClear?.();
    };

    const handleOnChange = (value: string) => setValue(value);

    const handleOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") onEnter?.();
    };

    return (
      <div className={classes.wrapper}>
        <input
          ref={ref}
          value={value}
          onChange={(event) => handleOnChange(event.currentTarget.value)}
          onKeyDown={(event) => handleOnKeyDown(event)}
          {...props}
          className={`${props.className} ${classes.input}`}
        />
        {showCloseIcon && (
          <span
            className={`${classes.icon} ${classes.close}`}
            onClick={clearInput}
          >
            <img src={CloseIcon} />
          </span>
        )}
        {showCustomIcon && <span className={classes.icon}>{icon}</span>}
      </div>
    );
  }
);

export default Input;
