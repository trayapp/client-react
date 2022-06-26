export default function Input({
  handleChange,
  value,
  labelText,
  labelFor,
  id,
  name,
  type,
  isRequired = false,
  placeholder,
  customClass = "",
  autoComplete,
  helpText,
  error = null,
  errors,
}) {
  const fixedInputClass = `rounded-md appearance-none relative block w-full 
  px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 
  focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm`;
  return (
    <div className="my-5">
      <label htmlFor={labelFor} className="sr-only">
        {labelText}
      </label>
      <input
        onChange={handleChange}
        value={
          id === "storeNickname" || id === "username"
            ? value.toLocaleLowerCase()
            : value
        }
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={isRequired}
        className={
          fixedInputClass +
          " " +
          customClass +
          `${helpText || error ? ` my-auto` : ``}`
        }
        placeholder={placeholder}
      />
      {helpText && error === null ? (
        <p className="text-xs mt-1 font-semibold pl-1 opacity-80">{helpText}</p>
      ) : (
        <p className="text-xs mt-1 font-semibold">{error}</p>
      )}
    </div>
  );
}
