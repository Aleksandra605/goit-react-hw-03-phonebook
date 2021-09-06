import React from 'react';
import shortid from 'shortid';
import PropTypes from 'prop-types';
import s from './form-styles.module.css';

class Form extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func,
  };

  state = { name: '', number: '', id: '' };

  handleChange = event => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value, id: shortid.generate() });
  };

  reset = () => {
    this.setState({ name: '', number: '', id: '' });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state);
    this.reset();
  };

  render() {
    const { name, number } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className={s.form}>
        <label className={s.label}>Name</label>
        <input
          className={s.input}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          required
          value={name}
          onChange={this.handleChange}
        />
        <label className={s.label}>Number</label>
        <input
          className={s.input}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
          required
          value={number}
          onChange={this.handleChange}
        />
        <button type="submit" className={s.btn}>
          Add to contacts
        </button>
      </form>
    );
  }
}

export default Form;
