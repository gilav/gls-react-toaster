import React from 'react';
import PropTypes from 'prop-types';


type propsTypes = {
    label: string,
    className: string,
    handleClick: () => void,
}

const Button = (props : propsTypes) => {
    const { label, className, handleClick } = props;

    return (
        <>
            <button 
                className={className}
                onClick={handleClick}
                >
                {label}
            </button>
        </>
    );

}

Button.propTypes = {
    label: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    handleClick: PropTypes.func
}

export default Button;
