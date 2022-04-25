import React from "react";

export default function Button({
  text,
  type,
  clickHandler,
}: {
  clickHandler: () => void;
  type: string;
  text: string;
}) {
  return (
    <button
      className="mx-auto bg-lime-500 p-6 py-2 my-6 rounded "
      onClick={() => clickHandler()}
    >
      {text}
    </button>
  );
}
