function Input({name,type,id,placeholder,label}) {
  return (
    <input
      type={type}
      name={name}
      id={id}
      class="form-control"
      placeholder={placeholder}
      aria-label={label}
      aria-describedby="visible-addon"
    ></input>
  );
}

export default Input;
