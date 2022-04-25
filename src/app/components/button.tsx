import React, { ForwardedRef, forwardRef } from "react";

const Button = forwardRef(
  (
    props: { type: string; children: string; onClick?: any },
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <button
        className="mx-auto bg-lime-500 px-8 py-2 my-6 rounded "
        {...props.type}
      >
        {props.children}
      </button>
    );
  }
);

export default Button;
