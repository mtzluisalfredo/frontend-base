import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Badge } from '@/components';

import { mailbox } from '@/store/actions';

import './style.scss';
import capitalizeFirstLetter from '../../lib/capitalizeFirstLetter';

function countUnread(mails) {
  const unread = mails.filter(mail => mail.folder === 'inbox' && !mail.isReaded);
  return unread.length;
}

const mapStateToProps = state => {
  const { mailbox: { currentSection, mails } } = state;
  return {
    currentSection,
    unreadCount: countUnread(mails),
  };
};

@connect(mapStateToProps, { ...mailbox })
class SidebarHeader extends Component {
  static propTypes = {
    currentSection: PropTypes.string,
    selectFolder: PropTypes.func,
    unreadCount: PropTypes.number,
  }

  render() {
    const { currentSection, unreadCount, selectFolder } = this.props;

    return (
      <div styleName="sidebar-header">
        <div styleName="left">
          <h2 styleName="section">
            { capitalizeFirstLetter(currentSection) }
            &nbsp;
          </h2>
          {
            unreadCount > 0 && currentSection === 'inbox' &&
            <Badge color="primary" styleName="badge" value={unreadCount} />
          }
        </div>
        <div>
          <select
            value={currentSection}
            onChange={event => selectFolder(event.target.value)}
          >
            <option value="inbox">Inbox</option>
            <option value="spam">Spam</option>
            <option value="deleted">Deleted</option>
          </select>
        </div>
      </div>
    );
  }
}

export default SidebarHeader;

