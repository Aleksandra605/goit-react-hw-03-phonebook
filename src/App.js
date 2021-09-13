import './App.css';
import React from 'react';
import Form from './Components/Form';
import Filter from './Components/Filter';
import ContactList from './Components/ContactList';
import PropTypes from 'prop-types';

class App extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    number: PropTypes.string,
  };

  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };
  
   componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  formSubmitHandler = data => {
    let similar = this.state.contacts.find(obj => obj.name === data.name);

    similar !== undefined
      ? alert(`${data.name} is already in contacts.`)
      : this.setState(prevState => ({
          contacts: [...prevState.contacts, data],
        }));
  };

  changeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  getFilteredContacts = () => {
    const normalizedFilter = this.state.filter.toLocaleLowerCase();

    const filteredNames = this.state.contacts.filter(item =>
      item.name.toLocaleLowerCase().includes(normalizedFilter),
    );

    return filteredNames;
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(el => el.id !== id),
    }));
  };

  render() {
    const visibleContacts = this.getFilteredContacts();
    return (
      <div>
        <Form onSubmit={this.formSubmitHandler} />
        <Filter value={this.state.filter} onChange={this.changeFilter} />
        {this.state.filter !== '' ? (
          <ContactList
            contacts={visibleContacts}
            onDelete={this.deleteContact}
          />
        ) : (
          <ContactList
            contacts={this.state.contacts}
            onDelete={this.deleteContact}
          />
        )}
      </div>
    );
  }
}

export default App;
