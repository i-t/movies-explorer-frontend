import { useCallback, useState } from 'react';

function useForm() {

  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [inputName, setInputName] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isSuccess, setIsSucces] = useState(false);

  function handleChange(e) {
    const input = e.target;
    setValues({
      ...values,
      [input.name]: input.value,
    })
    setErrors({
      ...errors,
      [input.name]: input.validationMessage,
    })
    setIsValid(e.target.closest('form').checkValidity());
    setInputName(input.name);
  }

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return {
    values,
    setValues,
    isSuccess,
    setIsSucces,
    errors,
    inputName,
    isValid,
    handleChange,
    resetForm
  }
}

export default useForm;
