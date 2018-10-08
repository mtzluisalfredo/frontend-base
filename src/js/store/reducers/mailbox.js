const defaultState = {
  mails: [
    {
      id: 0,
      from: 'mhallatt0@walmart.com',
      to: 'cziem0@surveymonkey.com',
      subject: 'Office Assistant IV',
      body: 'condimentum curabitur in libero ut massa volutpat convallis morbi odio odio elementum eu interdum eu tinc',
      date: '3/31/2017',
      isReaded: false,
      avatar: 'https://robohash.org/dignissimosetsuscipit.jpg?size=50x50&set=set1',
      tag: 'Indigo',
      folder: 'inbox',
      attachements: [
        {
          file: 'http://dummyimage.com/250x250.jpg/5fa2dd/ffffff',
          name: 'ut_nulla_sed.jpeg',
        },
      ],
    },
    {
      id: 1,
      from: 'nmulbery1@seattletimes.com',
      to: 'idimont1@usa.gov',
      subject: 'Technical Writer',
      body: 'sit amet cursus id turpis integer aliquet massa id lobortis convallis tortor risus dapibus augue vel accu',
      date: '11/17/2016',
      isReaded: false,
      avatar: 'https://robohash.org/aliquamautdolore.jpg?size=50x50&set=set1',
      tag: 'Teal',
      folder: 'inbox',
      attachements: [
        {
          file: 'http://dummyimage.com/250x250.jpg/dddddd/000000',
          name: 'sodales_scelerisque_mauris.jpeg',
        },
      ],
    },
  ],
  selectedEmailID: null,
  hasErrored: false,
  currentSection: 'inbox',
  searchText: '',
};

export default (state = defaultState, action) => {
  const { type, emails, id, folder, hasErrored, searchText } = action;
  switch (type) {
    case 'FETCH_DATA_SUCCESS': {
      const newMails = emails.map(mail => { return { ...mail, folder: 'inbox' }; });
      const mails = state.mails.concat(newMails).map((mail, mailID) => { return { ...mail, mailID }; });
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
    default:
      return state;
  }
};
