// eslint-disable-next-line react/prop-types
const InputGA = ({ name, value, setValue, placeholder, id, type }) => {
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
      />
    </div>
  );
};

export default InputGA;
