import type { UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
  label: string;
  name: string;
  kind?: "text" | "phone" | "price" | "email";
  register: UseFormRegisterReturn;
  type: string;
  required: boolean;
  [key: string]: any;
}

export default function Input({
  label,
  name,
  kind = "text",
  register,
  type,
  required,
  ...rest
}: InputProps) {
  return (
    <div>
      <label
        className="mb-1 block text-sm font-semibold text-gray-700"
        htmlFor={name}
      >
        {label}
      </label>
      {kind === "text" && (
        <div className="rounded-md relative flex  items-center shadow-sm">
          <input
            id={name}
            {...rest}
            {...register}
            required={required}
            type={type}
            className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
      )}
      {kind === "price" && (
        <div className="rounded-md relative flex  items-center shadow-sm">
          <input
            id={name}
            {...rest}
            {...register}
            required={required}
            type={type}
            className="pl-7 appearance-none w-full px-3  py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          />
          <div className="absolute left-2 pointer-events-none pr-3 flex items-center">
            <span className="text-gray-500">₩</span>
          </div>
        </div>
      )}
      {kind === "email" && (
        <input
          id={name}
          type={type}
          required={required}
          className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          {...rest}
          {...register}
        />
      )}
      {kind === "phone" && (
        <div className="flex rounded-md shadow-sm">
          <span className="flex items-center justify-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 select-none text-sm">
            +82
          </span>
          <input
            id={name}
            {...rest}
            {...register}
            required={required}
            type={type}
            className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md rounded-l-none shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
      )}
    </div>
  );
}
