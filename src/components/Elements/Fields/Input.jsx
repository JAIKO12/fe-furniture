/* eslint-disable react/no-unknown-property */
/* eslint-disable react/react-in-jsx-scope */
function Input(props) {
  const {
    type,
    name,
    id,
    value,
    onChange,
    onBlur,
    className,
    placeholder,
    autoComplete,
    icons,
    required,
    min,
    max,
  } = props;
  return (
    <input
      icons={icons}
      type={type}
      name={name}
      id={id}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      className={className}
      placeholder={placeholder}
      autoComplete={autoComplete}
      required={required}
      min={min}
      max={max}
    />
  );
}

export default Input;
