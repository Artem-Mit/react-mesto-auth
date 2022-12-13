import {useState, useCallback} from 'react';

export function useFormAndValidation(inputValues) {
  const [ values, setValues ] = useState(inputValues);
  const [ errors, setErrors ] = useState(inputValues);
  const [ isValid, setIsValid ] = useState(true);

  const handleChange = (e) => {
    const {name, value} = e.target
    setValues({...values, [name]: value });
    setErrors({...errors, [name]: e.target.validationMessage});
    setIsValid(e.target.closest('form').checkValidity());
  };



  const resetForm = useCallback((newValues = inputValues, newErrors = inputValues, newIsValid = false) => {
    setValues(newValues);
    setErrors(newErrors);
    setIsValid(newIsValid);
  }, [setValues, setErrors, setIsValid, inputValues]);

  return { values, handleChange, errors, isValid, resetForm, setValues, setIsValid };
}
