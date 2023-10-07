"use client";

import { useRef, useState } from "react";

type TypeInput = {
  type: string;
  value: string;
  inputClass: string;
  labelName: string;
  labelData: string;
  labelClass: string;
};

function Input({
  type,
  inputClass,
  labelData,
  labelName,
  labelClass,
  value,
}: Partial<TypeInput>) {
  const inputRef = useRef<HTMLInputElement>(null);
  const labelRef = useRef<HTMLLabelElement>(null);
  const [inputValue, setValue] = useState<string | undefined>("");
  const [useType, setType] = useState("password");

  return (
    <div className="relative w-full">
      <input
        name={labelName}
        type={type === "password" ? useType : type}
        className={inputClass}
        ref={inputRef}
        value={value}
        onBlur={() => {
          if (!inputRef.current?.value) {
            labelRef.current?.classList.add("text-3xl");
          }
        }}
        onClick={() => {
          labelRef.current?.classList.remove("text-3xl");
        }}
        onChange={() => {
          if (inputRef.current?.value) {
            labelRef.current?.classList.remove("text-3xl");
          }
          if (type === "password") {
            setValue(() => inputRef.current?.value);
          }
        }}
      />
      <label
        htmlFor={labelName}
        ref={labelRef}
        className={"absolute left-1.5 top-1.5 text-3xl " + labelClass}
      >
        {labelData}
      </label>
      {type === "password" && inputValue && (
        <label
          onClick={(e) => {
            e.preventDefault();
            if (useType === "password") {
              setType("");
            } else {
              setType("password");
            }
          }}
          className={"absolute top-1.5 right-1.5 "}
        >
          {useType === "password" ? "표시" : "숨기기"}
        </label>
      )}
    </div>
  );
}

export default Input;
