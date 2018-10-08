import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { mailbox } from '@/store/actions';

import { Button } from '@/components';

import './style.scss';

const mapStateToProps = state => {
  const { mailbox: { mails, selectedEmailID } } = state;
  return {
    mails,
    selectedEmailID,
  };
};

@connect(mapStateToProps, { ...mailbox })
class MailDetail extends Component {
  static propTypes = {
    deleteEmail: PropTypes.func,
    mails: PropTypes.arrayOf(PropTypes.object),
    markUnread: PropTypes.func,
    selectedEmailID: PropTypes.number,
    sendMailToInbox: PropTypes.func,
    sendMailToSpam: PropTypes.func,
  }

  render() {
    const {
      mails,
      selectedEmailID,
      deleteEmail,
      sendMailToSpam,
      sendMailToInbox,
      markUnread,
    } = this.props;

    const selectedMail = mails[selectedEmailID];

    return (
      <div styleName="mail-detail">
        {selectedMail && (
          <div>
            <div styleName="header">
              <div styleName="left">
                {selectedMail.folder !== 'deleted' && (
                  <Button
                    color="primary"
                    styleName="btn delete"
                    onClick={() => deleteEmail(selectedEmailID)}
                  >
                    Delete
                  </Button>
                )}
                {selectedMail.folder !== 'spam' ? (
                  <Button
                    color="primary"
                    styleName="btn spam"
                    onClick={() => sendMailToSpam(selectedEmailID)}
                  >
                    Spam
                  </Button>
                ) : (
                  <Button
                    color="primary"
                    styleName="btn spam"
                    onClick={() => sendMailToInbox(selectedEmailID)}
                  >
                    Unspam
                  </Button>
                )}
              </div>
              <div>
                {selectedMail.isReaded && (
                  <Button
                    color="primary"
                    styleName="btn unread"
                    onClick={() => {
                      markUnread(selectedEmailID);
                      sendMailToInbox(selectedEmailID);
                    }}
                  >
                    Mark as unread
                  </Button>
                )}
              </div>
            </div>
            <div styleName="maildetail">
              <div styleName="from">
                <h2>From: {selectedMail.from}</h2>
              </div>
              <div styleName="tags">
                <h4>Tags:</h4>
                <ul>
                  <li styleName="tag">{selectedMail.tag}</li>
                </ul>
              </div>
              <div styleName="body">
                <p>{selectedMail.body}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default MailDetail;
