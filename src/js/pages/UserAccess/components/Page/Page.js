import React from 'react';
import PropTypes from 'prop-types';

import Header from './Header';
import './style.scss';

function Page(props) {
  const { id, className, children } = props;

  return (
    <section id={id} className={className} styleName="page">
      <Header />
      <div styleName="page-body">
        <div className="container">
          <div styleName="form">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

Page.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  id: PropTypes.string,
};

export default Page;
