import React from "react";

const Input = React.forwardRef(({ 
  className = "",
  type = "text",
  error,
  ...props 
}, ref) => {
  const baseStyles = "flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";
  
  const errorStyles = error ? "border-red-500 focus-visible:ring-red-600" : "";

  return (
    <input
      type={type}
      className={`${baseStyles} ${errorStyles} ${className}`}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = "Input";

export { Input };