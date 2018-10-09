const defaultState = {
  mails: [],
  selectedEmailID: null,
  hasErrored: false,
  currentSection: 'inbox',
  searchText: '',
  intervalID: null,
};

export default (state = defaultState, action) => {
  const { type, emails, id, folder, hasErrored, searchText, intervalID } = action;
  switch (type) {
    case 'FETCH_DATA_SUCCESS': {
      const newMails = emails.map(mail => { return { ...mail, folder: 'inbox' }; });
      const mails = state.mails.concat(newMails).map((mail, mailID) => { return { ...mail, id: mailID }; });
      return {
        ...state,
        mails,
      };
    }
    case 'MOVE_MAIL': {
      const mails = state.mails.map((mail, index) => {
        if (index === id) {
          return {
            ...mail,
            folder,
          };
        }
        return mail;
      });
      const selected = state.mails.find(mail => mail.folder === folder && mail.id === id);
      return {
        ...state,
        mails,
        selectedEmailID: selected ? selected.id : null,
      };
    }
    case 'OPEN_MAIL': {
      const mails = state.mails.map((mail, index) => {
        if (index === id) {
          return {
            ...mail,
            isReaded: true,
          };
        }
        return mail;
      });
      return {
        ...state,
        mails,
        selectedEmailID: id,
      };
    }
    case 'MARK_UNREAD': {
      const mails = state.mails.map((mail, index) => {
        if (index === id) {
          return {
            ...mail,
            isReaded: false,
          };
        }
        return mail;
      });
      return {
        ...state,
        mails,
      };
    }
    case 'HAS_ERRORED':
      return {
        ...state,
        hasErrored,
      };
    case 'FILTER':
      return {
        ...state,
        currentSection: folder,
      };
    case 'SEARCH_MAIL':
      return {
        ...state,
        searchText,
      };
    case 'SET_INTERVAL_ID':
      return {
        ...state,
        intervalID,
      };
    default:
      return state;
  }
};
