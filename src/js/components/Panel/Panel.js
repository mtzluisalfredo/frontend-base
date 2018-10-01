import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import Button from '../Button';

function Panel(props) {
  const {
    id,
    title,
    subtitle,
    children,
    className,
    buttonText,
    onClick,
  } = props;

  return (
    <section id={id} styleName="container-box" className={className}>
      {title && (
        <header styleName={onClick ? 'has-button' : ''}>
          <h2>{title}</h2>
          {subtitle && (
            <div styleName="box-subtitle">{subtitle}</div>
          )}
          {onClick && (
            <Button color="alt-info" onClick={onClick}>
              {buttonText}
            </Button>
          )}
        </header>
      )}
      {children}
    </section>
  );
}

Panel.propTypes = {
  buttonText: PropTypes.node,
  children: PropTypes.node,
  className: PropTypes.string,
  id: PropTypes.string,
  subtitle: PropTypes.string,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

Panel.defaultProps = {
  className: '',
};

export default Panel;
