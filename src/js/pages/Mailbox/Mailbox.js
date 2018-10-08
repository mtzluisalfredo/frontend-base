import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Helmet } from '@/components';

import { PropTypes } from 'prop-types';

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

@connect(mapStateToProps, { fetchData })
class Mailbox extends Component {
  static propTypes = {
    fetchData: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      intervalId: null,
    };
  }

  componentDidMount() {
    this.props.fetchData();
    const intervalId = setInterval(() => {
      this.props.fetchData();
    }, 90000);
    this.setState({ intervalId });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
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
