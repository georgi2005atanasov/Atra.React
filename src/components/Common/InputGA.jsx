/* eslint-disable react/prop-types */
const InputGA = ({
  name,
  value,
  setValue,
  placeholder,
  error,
  id,
  type,
  ...props
}) => {
  return (
    <div className="form-group mb-3">
      <label htmlFor={id} className="non-selectable">
        {name}
      </label>
      <input
        type={type}
        className="form-control non-selectable"
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required
        {...props}
      />
      {error && <h6 className="text-danger">{error}</h6>}
    </div>
  );
};

export default InputGA;
