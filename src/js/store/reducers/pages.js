import { types } from '../actions/pages';

const {
  CREATE_PAGE,
  REMOVE_PAGE,
  SET_PAGE_STATE,
  UPDATE_FILTERS,
  OPEN_MODAL,
  CLOSE_MODAL,
  RESET_MODAL,
  MODAL_ACTION,
  MODAL_ACTION_SUCCESS,
  MODAL_ACTION_FAIL,
} = types;

const defaultFilterState = {
  page: 1,
  pageSize: 25,
  orderBy: null,
  orderDesc: false,
};

const defaultModalState = {
  showModal: false,
  success: false,
  loading: false,
  error: null,
  data: null,
};

// Create a new page entry here, using the default filter and modal states
const defaultPage = {
  filters: defaultFilterState,
  modals: {},
};


const defaultState = {
  // <myPage>: {
  //   filters: defaultFilterState,
  //   modals: {
  //     <myModal>: defaultModalState,
  //   },
  // }
};

export const getPageState = (pageName, state) => state.pages[pageName] || defaultPage;

export default (state = defaultState, action) => {
  const { pageName, modalName, type, pageState, filters } = action;

  switch (type) {
    case CREATE_PAGE:
      return {
        ...state,
        [pageName]: {
          ...defaultPage,
          ...state[pageName],
        },
      };
    case REMOVE_PAGE:
      return {
        ...state,
        [pageName]: undefined,
      };
    case SET_PAGE_STATE:
      return {
        ...state,
        [pageName]: {
          ...state[pageName],
          ...pageState,
        },
      };
    case UPDATE_FILTERS:
      return {
        ...state,
        [pageName]: {
          ...state[pageName],
          filters,
        },
      };
    case OPEN_MODAL:
      return {
        ...state,
        [pageName]: {
          ...state[pageName],
          modals: {
            [modalName]: {
              ...defaultModalState,
              ...state[pageName].modals[modalName],
              showModal: true,
            },
          },
        },
      };
    case CLOSE_MODAL:
      return {
        ...state,
        [pageName]: {
          ...state[pageName],
          modals: {
            [modalName]: {
              ...defaultModalState,
            },
          },
        },
      };

    case RESET_MODAL:
      return {
        ...state,
        [pageName]: {
          ...state[pageName],
          [modalName]: {
            ...defaultModalState,
            showModal: true,
          },
        },
      };

    case MODAL_ACTION:
      return {
        ...state,
        [pageName]: {
          ...state[pageName],
          [modalName]: {
            ...defaultModalState,
            ...state[pageName].modals[modalName],
            loading: true,
            error: null,
          },
        },
      };

    case MODAL_ACTION_SUCCESS:
      return {
        ...state,
        [pageName]: {
          ...state[pageName],
          [modalName]: {
            ...defaultModalState,
            ...state[pageName].modals[modalName],
            success: true,
            loading: false,
            error: null,
            data: result.data,
          },
        },
      };

    case MODAL_ACTION_FAIL:
      return {
        ...state,
        [pageName]: {
          [modalName]: {
            ...defaultModalState,
            ...state[pageName].modals[modalName],
            loading: false,
            error,
          },
        },
      };

    default:
      return state;
  }
};
