import React, { ForwardedRef, forwardRef } from "react";

const Input = forwardRef(
  (
    props: {
      label?: string;
      type: string;
      placeholder: string;
      required: boolean;
    },
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    let label = props.label;
    // delete props['label'];
    let id = "form" + label?.replace(" ", "-").toLowerCase();

    return (
      <div className="relative mt-8 ">
        <input
          className="peer w-full h-10 border-2 rounded bg-transparent  placeholder-shown:border-slate-500 border-green-600 focus:outline-none placeholder-transparent p-2"
          {...props}
          id={id}
          ref={ref}
        />
        <label
          className="bg-white text-green-600 px-2 absolute left-1 -top-3  text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:bg-transparent peer-placeholder-shown:top-2 peer-placeholder-shown:left-2 transition-all delay-75 ease-in-out"
          htmlFor={id}
        >
          {label}
        </label>
      </div>
    );
  }
);

export default Input;
