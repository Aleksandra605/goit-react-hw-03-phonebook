import PropTypes from 'prop-types';
import s from './contactsList-styles.module.css';

export default function ContactList({ contacts, onDelete }) {
  return (
    <ul className={s.list}>
      {contacts.map(contact => {
        const { name, number, id } = contact;
        return (
          <li key={id} className={s.item}>
            <p className={s.p}>
              {name} <span className={s.span}>{number}</span>
            </p>
            <button
              type="button"
              onClick={() => onDelete(id)}
              className={s.btn}
            >
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object),
  onDelete: PropTypes.func,
};
