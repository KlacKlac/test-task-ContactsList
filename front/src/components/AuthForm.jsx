import React, { useState } from 'react';

import { useFormik } from 'formik'
import * as Yup from 'yup'

function AuthForm(props) {
  const {setContacts, history} = props;
  const [responseError, setResponseError] = useState('');
  const shema = Yup.object().shape({
    login: Yup.string()
      .required('Введите логин')
      .min(3, 'Минимальная длина логина 3 символа')
      .max(25, 'Максимальна длина логина 25 символов'),
    password: Yup.string()
      .required('Введите пароль')
      .max(25, 'Максимальна длина пароля 25 символов')
      .min(3, 'Минимальная длина пароля 3 символа'),
  });
  const formik = useFormik({
    initialValues: {
      login: '',
      password: '',
    },
    validationSchema: shema,
    onSubmit: values => {
      fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        body: JSON.stringify(values),
      })
        .then(response => response.json())
        .then(data => {
          if(data.error) {
            setResponseError(data.error)
          } else if(data.contacts) {
            localStorage.setItem('authorization', true);
            localStorage.setItem('user_id', data.user_id);
            setContacts(data.contacts.reverse());
            history.push('/contacts');
          }
        })
        .catch(data => console.error(data))
    },
  });
  const { errors, values, touched, handleChange, handleSubmit } = formik;
  return (
    <form className="Form" onSubmit={handleSubmit}>
      <div className="Form__wrapper">
        <input
          className={`Form__input ${(touched.login && errors.login) && 'Form__input_invalid'}`}
          type="text"
          name="login"
          placeholder="Логин"
          value={values.login}
          onChange={handleChange}
        />
        {(touched.login && errors.login) && <div className="Form__invalid-message">{errors.login}</div>}
      </div>
      <div className="Form__wrapper">
        <input
          className={`Form__input ${(touched.password && errors.password) && 'Form__input_invalid'}`}
          type="text"
          name="password"
          placeholder="Пароль"
          value={values.password}
          onChange={handleChange}
        />
        {(touched.password && errors.password) && <div className="Form__invalid-message">{errors.password}</div>}
      </div>
      <button className="Form__btn" type='submit'>Войти</button>
      {responseError && <div className="Form__error">{responseError}</div>}
    </form>
  );
}

export default AuthForm;