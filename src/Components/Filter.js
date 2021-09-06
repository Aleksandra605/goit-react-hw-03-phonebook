import PropTypes from 'prop-types';
import s from './filter-styles.module.css';

const Filter = ({ value, onChange }) => {
  return (
    <div className={s.div}>
      <label className={s.label}>Find contacts by name</label>
      <input onChange={onChange} value={value} className={s.input}></input>
    </div>
  );
};

Filter.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default Filter;
