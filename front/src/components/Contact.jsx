import React, { useState } from 'react';

import NewContact from './NewContact'

import iconEdit from '../assets/images/icon-edit.svg'
import iconDelete from '../assets/images/icon-remove.svg'

function Contact(props) {
  const { contact, getContacts } = props;
  const [editContact, setEditContact] = useState(false);
  if (editContact) {
    return <NewContact contact={contact} getContacts={getContacts} setVisibleNewContact={setEditContact} />
  } else  return (
    <div className="Contacts__item">
      <span className="Contacts__name">{contact.name}</span>
      <span className="Contacts__content">{contact.content}</span>
      <div className="Contacts__buttons">
        <button className="Contacts__item-btn Contacts__item-btn_edit" title="Редактировать контакт" onClick={() => setEditContact(true)}>
          <img src={iconEdit} alt="icon" className="Contacts__icon Contacts__icon_edit" />
        </button>
        <button className="Contacts__item-btn Contacts__item-btn_delete" title="Удалить контакт" onClick={() => deleteContact(contact.contact_id)}>
          <img src={iconDelete} alt="icon" className="Contacts__icon Contacts__icon_delete" />
        </button>
      </div>
    </div>
  )

  function deleteContact(id) {
    fetch('http://127.0.0.1:5000/delete', {
      method: 'POST',
      body: JSON.stringify({id: id})
    })
      .then(getContacts)
      .catch(data => console.error(data.error))
  }
}

export default Contact;