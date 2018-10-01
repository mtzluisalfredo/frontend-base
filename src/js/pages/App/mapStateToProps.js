import { getPageState } from '@/store/reducers/pages';

function mapStateToProps(store) {
  const { session } = store;
  const page = getPageState('app', store);
  const { sessionExpiration } = page.modals || {};
  const { user = {}, token, role } = session;
  const isLoggedin = !!token;

  return {
    isLoggedin,
    user: {
      ...user,
      token,
    },
    token,
    role,
    sessionExpirationSeconds: session.expirationSeconds,
    showSessionExpirationModal: sessionExpiration ? sessionExpiration.showModal : false,
    collapseNav: page.collapseNav || false,
    displayMenu: page.displayMenu,
  };
}

export default mapStateToProps;
