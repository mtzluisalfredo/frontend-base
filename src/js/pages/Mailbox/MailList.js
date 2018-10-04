import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { mailbox } from '@/store/actions';

import MailItem from './MailItem';
import './style.scss';

const mapStateToProps = state => {
  const { mailbox: { searchText, mails, currentSection, selectedEmailID } } = state;
  return {
    searchText,
    mails,
    currentSection,
    selectedEmailID,
  };
};

@connect(mapStateToProps, { ...mailbox })
class MailList extends Component {
  static propTypes = {
    currentSection: PropTypes.string,
    mails: PropTypes.array,
    openMail: PropTypes.func,
    searchText: PropTypes.string,
    selectedEmailID: PropTypes.number,
  };

  render() {
    const { mails, searchText, selectedEmailID, currentSection, openMail } = this.props;
    const displayMailsCurrentSection = mails.filter(({ folder }) => folder === currentSection);
    const displayMails = displayMailsCurrentSection.filter(mail =>
      mail.from.includes(searchText) ||
      mail.to.includes(searchText) ||
      mail.subject.includes(searchText) ||
      mail.body.includes(searchText));

    return (
      <div styleName="maillist">
        <ul>
          {
            displayMails.reverse().map(mail =>
              <MailItem mail={mail} key={mail.id} selectedEmailID={selectedEmailID} openMail={openMail} />)
          }
        </ul>
      </div>
    );
  }
}

export default MailList;
