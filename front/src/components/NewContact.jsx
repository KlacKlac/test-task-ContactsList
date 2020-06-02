import React, {createRef, useEffect} from 'react';

import { useFormik } from 'formik'

import iconSave from '../assets/images/icon-save.svg'
import iconReset from '../assets/images/icon-reset.svg'

function NewContact(props) {
  const { getContacts, setVisibleNewContact, contact } = props;
  const nameInput = createRef();
  const formik = useFormik({
    initialValues: {
      name: contact.name,
      content: contact.content,
      user_id: localStorage.user_id
    },
    onSubmit: values => {
      let data = null;
      let url = null;

      if (contact.contact_id) {
        url = 'http://127.0.0.1:5000/editContact';
        data = {
          ...values,
          contact_id: contact.contact_id
        }
      } else {
        url = 'http://127.0.0.1:5000/addContact';
        data = {
          ...values,
          user_id: localStorage.user_id,
        }
      }

      fetch(url, {
        method: 'POST',
        body: JSON.stringify(data)
      })
        .then(() => {
          setVisibleNewContact(false);
          getContacts();
        })
        .catch(data => console.error(data))
    },
  });
  const { values, handleChange, handleSubmit } = formik;
  
  useEffect(() => nameInput.current.focus(), [])
  
  return (
    <form className="Contacts__item" onSubmit={handleSubmit}>
      <input type="text" name="name" className="Contacts__input" value={values.name} onChange={handleChange} ref={nameInput} />
      <input type="text" name="content" className="Contacts__input" value={values.content} onChange={handleChange} />
      <div className="Contacts__buttons">
        <button type='submit' className="Contacts__item-btn Contacts__item-btn_save" title="Сохранить контакт" >
          <img src={iconSave} alt="icon" className="Contacts__icon Contacts__icon_save" />
        </button>
        <button type='reset' className="Contacts__item-btn Contacts__item-btn_reset" title="Отменить ввод" onClick={() => setVisibleNewContact(false)} >
          <img src={iconReset} alt="icon" className="Contacts__icon Contacts__icon_reset" />
        </button>
      </div>
    </form>
  )
}

export default NewContact;