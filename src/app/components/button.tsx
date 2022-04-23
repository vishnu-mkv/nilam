import React, { ForwardedRef, forwardRef } from "react";

const Button = forwardRef(
  (
    props: { type: string; children: string; onClick?: void },
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <div>
        <button className="bg-lime-500 px-4 py-2 rounded" {...props.type}>
          {props.children}
        </button>
      </div>
    );
  }
);

export default Button;
