import React, { FC } from "react";
import { ReactNode } from "react";

export type AlertColor = "green" | "red" | "yellow";

const Alert: FC<{
  children?: ReactNode;
  color: AlertColor;
  [props: string]: any;
}> = ({ children, color, props }) => {
  return (
    <div
      id="alert-3"
      className={`flex p-4 mb-6 bg-${color}-100 rounded-lg dark:bg-${color}-200`}
      role="alert"
      {...props}
    >
      <div
        className={`ml-3 text-sm font-medium text-${color}-700 dark:text-${color}-800`}
      >
        {children}
      </div>
    </div>
  );
};

export default Alert;
