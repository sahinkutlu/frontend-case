import { FC } from "react";

import ErrorIcon from "../Icons/ErrorIcon";

const ErrorBox: FC<{ message: string; height: number }> = ({
  message,
  height,
}) => (
  <div className="flex flex-col items-center justify-center" role="alert">
    <ErrorIcon width={height} height={height} />
    <div className="flex flex-col items-center justify-center">
      <h1 className="mt-8 text-xl text-gray-800 md:text-2xl lg:text-3xl">
        Error
      </h1>
      <p className="mt-4 text-gray-600 md:text-lg lg:text-xl">{message}</p>E
    </div>
  </div>
);

export default ErrorBox;
