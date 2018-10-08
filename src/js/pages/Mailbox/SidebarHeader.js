import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Badge, Dropdown } from '@/components';

import { mailbox } from '@/store/actions';

import './style.scss';

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

  constructor(props) {
    super(props);
    this.state = {
      options: [
        {
          id: 0,
          label: 'inbox',
          value: 'inbox',
        },
        {
          id: 1,
          label: 'spam',
          value: 'spam',
        },
        {
          id: 2,
          label: 'deleted',
          value: 'deleted',
        },
      ],
    }
  }

  render() {
    const { currentSection, unreadCount, selectFolder } = this.props;

    return (
      <div styleName="sidebar-header">
        <div styleName="left">
          <h2 styleName="section">
            { currentSection }
          </h2>
          {
            unreadCount > 0 && currentSection === 'inbox' &&
            <Badge color="error" value={unreadCount} />
          }
        </div>
        <div styleName="dropdown">
          <Dropdown
            id="dropdown"
            name="section-dropdown"
            options={this.state.options}
            color={false}
            defaultOptionText="Sección"
            selectedOption={{ label: currentSection } || {}}
            styleName="section"
            onChange={e => selectFolder(e.value)}
            showActiveItem
          />
        </div>
      </div>
    );
  }
}

export default SidebarHeader;

