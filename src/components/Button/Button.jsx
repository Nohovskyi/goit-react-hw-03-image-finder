import PropTypes from 'prop-types';
import css from './Button.module.css';

export const Button = ({ onClick, textChenge, disabled }) => {
  return (
    <div className={css.buttonWrap}>
      <button
        disabled={disabled}
        type="button"
        className={css.Button}
        onClick={() => onClick()}
      >
        {textChenge}
      </button>
    </div>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  textChenge: PropTypes.string.isRequired,
};