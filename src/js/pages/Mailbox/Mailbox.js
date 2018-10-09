import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Helmet } from '@/components';

import { PropTypes } from 'prop-types';

import { mailbox } from '@/store/actions';

import fetchData from '@/store/actions/mailbox';

import MailDetail from './MailDetail';
import SidebarHeader from './SidebarHeader';
import MailList from './MailList';
import SearchBar from './SearchBar';

import './style.scss';

const mapStateToProps = state => {
  const { mailbox: { mails } } = state;
  return { mails };
};

@connect(mapStateToProps, { ...mailbox, fetchData })
class Mailbox extends Component {
  static propTypes = {
    fetchData: PropTypes.func,
    intervalID: PropTypes.number,
    setIntervalID: PropTypes.func,
  };

  componentDidMount() {
    this.props.fetchData();
    const intervalID = setInterval(() => {
      this.props.fetchData();
    }, 90000);
    this.props.setIntervalID(intervalID);
  }

  componentWillUnmount() {
    clearInterval(this.props.intervalID);
  }

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
