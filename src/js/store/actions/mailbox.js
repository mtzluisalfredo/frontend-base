import mails from '../../../mail-data.json';

export const mailsFetchDataSuccess = items => {
  return {
    type: 'FETCH_DATA_SUCCESS',
    emails: items,
  };
};

export const mailsHasErrored = bool => {
  return {
    type: 'HAS_ERRORED',
    hasErrored: bool,
  };
};

export const openMail = id => {
  return {
    type: 'OPEN_MAIL',
    id,
  };
};

export const selectFolder = folder => {
  return {
    type: 'FILTER',
    folder,
  };
};

export const searchMails = value => {
  return {
    type: 'SEARCH_MAIL',
    searchText: value,
  };
};

export const deleteEmail = id => {
  return {
    type: 'MOVE_MAIL',
    folder: 'deleted',
    id,
  };
};

export const sendMailToSpam = id => {
  return {
    type: 'MOVE_MAIL',
    folder: 'spam',
    id,
  };
};

export const sendMailToInbox = id => {
  return {
    type: 'MOVE_MAIL',
    folder: 'inbox',
    id,
  };
};

export const markUnread = id => {
  return {
    type: 'MARK_UNREAD',
    id,
  };
};

export default function fetchData() {
  return dispatch => {
    dispatch(mailsFetchDataSuccess(mails));
  };
}
