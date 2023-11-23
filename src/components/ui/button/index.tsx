import classes from "./styles.module.scss";
import { ButtonHTMLAttributes, FC, PropsWithChildren } from "react";

const Button: FC<
  PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>
> = ({ children, ...props }) => {
  return (
    <button {...props} className={`${props.className} ${classes.button}`}>
      {children}
    </button>
  );
};

export default Button;
