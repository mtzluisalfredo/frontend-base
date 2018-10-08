import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { mailbox } from '@/store/actions';

import './style.scss';

function SearchBar(props) {
  const { searchMails } = props;
  let searchT;
  return (
    <div styleName="searchbar">
      <input
        type="text"
        ref={input => { searchT = input; }}
        onChange={() => { searchMails(searchT.value); }}
        placeholder="Search"
      />
    </div>
  );
}

SearchBar.propTypes = {
  searchMails: PropTypes.func,
};

export default connect(null, { ...mailbox })(SearchBar);
