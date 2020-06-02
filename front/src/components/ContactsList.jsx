import React, { useState, useEffect } from 'react';

import Contact from './Contact'
import NewContact from './NewContact'

import iconLogout from '../assets/images/icon-logout.svg'
import iconAdd from '../assets/images/icon-add.svg'

function ContactsList(props) {
  const { history, getContacts } = props;
  const [visibleNewContact, setVisibleNewContact] = useState(false);
  const [contacts, setContacts] = useState(null);

  useEffect(() => {
    if(props.contacts){
      setContacts([...props.contacts])
    }
  }, [props.contacts])

  return (
    <div className="Contacts">
      <div className="Contacts__control">
        <button className="Contacts__btn Contacts__btn_logout" title="Сменить пользователя" onClick={logout} >
          <img className="Contacts__icon Contacts__icon_logout" src={iconLogout} alt="icon" />
        </button>
        <input onInput={ev => searchContacts(ev.target.value)} className="Contacts__search" placeholder="Поиск" type="text"/>
        <button className="Contacts__btn Contacts__btn_add" title="Добавить контакт" onClick={() => setVisibleNewContact(true)}>
          <img className="Contacts__icon Contacts__icon_add" src={iconAdd} alt="icon" />
        </button>
      </div>
      {visibleNewContact && <NewContact getContacts={getContacts} setVisibleNewContact={setVisibleNewContact} contact={{name: '', content: ''}} />}
      {!visibleNewContact && contacts && contacts.length === 0 &&
        <div className="Contacts__message">Список контактов пуст</div>
      }
      {contacts && contacts.length > 0 &&
        contacts.map(elem => <Contact contact={elem} getContacts={getContacts}  key={elem.contact_id} />)
      }
    </div>
  );
  function logout() {
    localStorage.removeItem('user_id');
    localStorage.setItem('authorization', false);
    history.replace('/');
  }

  function searchContacts(searchStr){
    searchStr = searchStr.trim();
    if(searchStr.length === 0) {
      setContacts(props.contacts);
    } else {
      const reg = new RegExp(searchStr);
      const filteredContacts = contacts.filter(elem => reg.test(elem.name) || reg.test(elem.content));
      setContacts(filteredContacts)
    }
  }
}

export default ContactsList;