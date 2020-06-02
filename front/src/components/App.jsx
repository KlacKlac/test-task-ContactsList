import React, { useEffect, useState } from 'react';

import AuthForm from './AuthForm'
import ContactsList from './ContactsList'

import { Route, Switch, withRouter } from 'react-router-dom'
import { isAuth } from '../assets/scripts/helpers'

function App(props) {
  const { history } = props;
  const [contacts, setContacts] = useState(null);

  useEffect(() => {
    if (isAuth()) {
      getContacts()
    } else {
      history.replace('/')
    }
  }, [])

  return (
    <div className="App">
      <div className="wrapper">
        <Switch>
          <Route exact path="/">
            <AuthForm
              history={history}
              setContacts={setContacts}
            />
          </Route>
          <Route path="/contacts">
            <ContactsList
              history={history}
              contacts={contacts}
              getContacts={getContacts}
            />
          </Route>
        </Switch>
      </div>
    </div>
  )

  function getContacts() {
    fetch('http://127.0.0.1:5000/auth', {
      method: 'POST',
      body: JSON.stringify({ id: localStorage.user_id }),
    })
      .then(response => response.json())
      .then(data => {
        setContacts(data.contacts.reverse());
        history.push('/contacts');
      })
      .catch(data => console.error(data))
  }
}

export default withRouter(App);