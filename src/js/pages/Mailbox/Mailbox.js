import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Helmet } from '@/components';

import MailDetail from './MailDetail';
import SidebarHeader from './SidebarHeader';
import MailList from './MailList';
import SearchBar from './SearchBar';

import './style.scss';

const mapStateToProps = state => {
  const { mailbox: { mails } } = state;
  return { mails };
};

@connect(mapStateToProps)
class Mailbox extends Component {
  render() {
    return (
      <div styleName="mailbox">
        <Helmet>
          <title>Mailbox</title>
        </Helmet>
        <div styleName="sidebar">
          <SidebarHeader />
          <SearchBar />
          <MailList />
        </div>
        <div styleName="maildetail">
          <MailDetail />
        </div>
      </div>
    );
  }
}

export default Mailbox;
