const React      = require('react');
const classNames = require('classnames');

import BasicButton from './BasicButton';

const RadioButton = ({ checked, name, id, value, children, className, onClick }) => {
    const labelClassName = classNames({
        'button button--standard': true,
        'button--outline': typeof checked == 'null' || ! checked,
        [className]: true
    });

    return (
        <label className={labelClassName} onClick={onClick} htmlFor={id}>
            <input id={id} name={name} type="radio" className="clip" checked={checked} value={value}/>
            {children}
        </label>
    );
};

RadioButton.defaultProps = {
    className: ''
};

RadioButton.propTypes = {
    name: React.PropTypes.string.required,
    id: React.PropTypes.string.required
};

export default RadioButton;