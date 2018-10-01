import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';

import './style.scss';

function EmptyState(props) {
  const { className, icon, title, description, onClick, buttonText, buttonColor } = props;
  return (
    <section styleName="empty-state" className={className}>
      <div styleName="content">
        {icon}
        <h1>{title}</h1>
        {description && <span styleName="description">{description}</span>}
        {onClick && (
          <footer>
            <Button color={buttonColor} onClick={onClick}>
              {buttonText}
            </Button>
          </footer>
        )}
      </div>
    </section>
  );
}

EmptyState.propTypes = {
  buttonColor: PropTypes.string,
  buttonText: PropTypes.node,
  className: PropTypes.string,
  description: PropTypes.node,
  icon: PropTypes.node,
  title: PropTypes.string,
  onClick: PropTypes.func,
};

EmptyState.defaultProps = {
  action: false,
  buttonText: (
    <span>
      <i className="icon-add" /> Add
    </span>
  ),
  className: '',
};

export default EmptyState;
