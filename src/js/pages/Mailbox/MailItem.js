import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './style.scss';

function MailItem(props) {
  const { mail, openMail, selectedEmailID } = props;
  const selected = selectedEmailID === mail.id;
  const { isReaded } = mail;
  return (
    <li
      styleName={classNames('item', {
        selected,
        'not-readed': !isReaded,
      })}
      onClick={() => openMail(mail.id)}
    >
      <div>
        <h4 styleName="from">
          {mail.from}
        </h4>
        <p>{mail.date}</p>
      </div>
      <div>
        <p styleName="subject">{mail.subject}</p>
        {mail.attachements && <p>Attachment</p>}
      </div>
    </li>
  );
}

MailItem.propTypes = {
  mail: PropTypes.object,
  openMail: PropTypes.func,
  selectedEmailID: PropTypes.number,
};

export default MailItem;
