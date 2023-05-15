import { useState } from "react";

export function useForm(inputValues, onChange = null) {
  const [form, setValue] = useState(inputValues);

  const handleChange = (event) => {
    const {value, name} = event.target;
    setValue({...form, [name]: value});
    if (typeof onChange === 'function') onChange();
  };
  return {form, handleChange, setValue};
}