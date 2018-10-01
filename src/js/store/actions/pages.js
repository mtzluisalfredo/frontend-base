import { createTypes, async } from 'redux-action-types';

export const types = createTypes(
  'pages/',
  'CREATE_PAGE',
  'REMOVE_PAGE',
  'SET_PAGE_STATE',
  'UPDATE_FILTERS',
  'OPEN_MODAL',
  'CLOSE_MODAL',
  'RESET_MODAL',
  async('MODAL_ACTION'),
);

export const modalActionTypes = [
  types.MODAL_ACTION,
  types.MODAL_ACTION_SUCCESS,
  types.MODAL_ACTION_FAIL,
];

export const createPage = (pageName, pageState) => dispatch => {
  dispatch({
    pageName,
    pageState,
    type: types.CREATE_PAGE,
  });
};

export const removePage = pageName => dispatch => {
  dispatch({
    pageName,
    type: types.CREATE_PAGE,
  });
};

export const setPageState = (pageName, pageState) => dispatch => {
  dispatch({
    pageName,
    pageState,
    type: types.SET_PAGE_STATE,
  });
};

export const updateFilters = (pageName, filters) => dispatch => {
  dispatch({
    filters,
    pageName,
    type: types.UPDATE_FILTERS,
  });
};

export const openModal = (pageName, modalName) => dispatch => {
  dispatch({
    modalName,
    pageName,
    type: types.OPEN_MODAL,
  });
};

export const closeModal = (pageName, modalName) => dispatch => {
  dispatch({
    modalName,
    pageName,
    type: types.CLOSE_MODAL,
  });
};

export const resetModal = (pageName, modalName) => dispatch => {
  dispatch({
    modalName,
    pageName,
    type: types.RESET_MODAL,
  });
};

export const modalAction = (pageName, modalName, promise) => {
  return {
    promise,
    modalName,
    pageName,
    types: modalActionTypes,
  };
};

