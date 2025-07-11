function Select({selectVal , value}) {
  return (
    <select class="form-select" aria-label="Default select example">
      <option selected>Open this select menu</option>
      <option value={selectVal}>One</option>
      <option value={selectVal}>Two</option>
      <option value={selectVal}>Three</option>
      
    </select>
  );
}

export default Select;
