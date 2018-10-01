import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import classnames from 'classnames';

import scrollTo from '@/lib/scrollTo';
import { ScrollView } from '@/components';
import reduxPage from '@/store/reduxPage';

import Routes from './Routes';
import Session from './Session';
import permissions from './permissions';
import navMenuOptions from './menu';
import * as queries from './graphql';
import * as apollo from './apollo';
import dropdownOptions from './dropdownOptions';
import mapStateToProps from './mapStateToProps';
import { Header, NavMenu, ModalSessionExpiration } from './components';
import './style.scss';

const actions = {};

function getPagePath() {
  const { pathname } = window.location;
  return pathname.toLowerCase();
}

@connect(mapStateToProps, actions)
@permissions
@graphql(queries.user, { props: apollo.mapProps, options: apollo.queryOptions })
@reduxPage({ page: 'app' })
class App extends Component {
  static propTypes = {
    buildingData: PropTypes.shape({}),
    closeModal: PropTypes.func,
    collapseNav: PropTypes.bool,
    data: PropTypes.shape({
      loading: PropTypes.bool,
      me: PropTypes.shape({ expiration_date: PropTypes.string }),
    }),
    displayMenu: PropTypes.bool,
    getDefaultPage: PropTypes.func,
    hasPageAccess: PropTypes.func,
    isLoggedin: PropTypes.bool,
    role: PropTypes.string,
    setPageState: PropTypes.func,
    showSessionExpirationModal: PropTypes.bool,
    token: PropTypes.string,
    user: PropTypes.shape({
      first_name: PropTypes.string,
      last_name: PropTypes.string,
      role: PropTypes.string,
    }),
  };

  state = {
    pageSpinner: true,
    appError: undefined,
    appErrorInfo: undefined,
  };

  componentWillMount() {
    const { hasPageAccess, getDefaultPage, setPageState, history } = this.props;
    this.defaultPage = getDefaultPage();

    if (!hasPageAccess() && this.defaultPage) {
      history.push(this.defaultPage);
    }

    setPageState({ displayMenu: false });
    window.addEventListener('resize', this.onResize);
  }

  componentDidMount() {
    const { token } = this.props;
    const sectionContainer = document.getElementById('section-container');

    this.session = new Session(token, this.onSessionAlert);
    if (sectionContainer) {
      this.state.maxScrollHeight = sectionContainer.offsetHeight;
    }
  }

  componentWillUpdate(nextProps) {
    const { data = {} } = nextProps;
    const { networkStatus } = data;

    if (networkStatus >= 7 && this.state.pageSpinner === true) {
      this.state.pageSpinner = false;
    }

    if (nextProps.location.pathname !== this.props.location.pathname) {
      scrollTo();
    }
  }

  componentDidUpdate() {
    const { isLoggedin } = this.props;

    if (isLoggedin) {
      this.session.logAction();
    }
  }

  componentDidCatch(error, info) {
    this.setState({
      appError: error,
      appErrorInfo: info
    });

    console.log(info);
    console.log(error);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  onResize = () => {
    const sectionContainer = document.getElementById('section-container');

    if (sectionContainer) {
      this.setState({
        maxScrollHeight: sectionContainer.offsetHeight,
      });
    }
  };

  onSessionAlert = () => {
    const { openModal, showSessionExpirationModal } = this.props;

    if (!showSessionExpirationModal) {
      openModal('sessionExpiration');
    }
  };

  onSelectUserOption(option) {
    const { history } = this.props;

    switch (option.value) {
      case 'logout':
        history.push('/logout');
        break;
      case 'profile':
        history.push('/profile');
        break;
      default:
        return null;
    }

    return null;
  }

  getNavMenuOptions() {
    const { user: { role }, match: { params } } = this.props;

    if (navMenuOptions[role]) {
      return [].concat(navMenuOptions[role](params));
    }

    return [];
  }

  getMenuOptions = () => {
    const { user } = this.props;
    let options = dropdownOptions.DEFAULT();

    if (dropdownOptions[user.role]) {
      options = [].concat(dropdownOptions[user.role]());
    }
    return options;
  };

  getUser = () => {
    const { user, role } = this.props;
    const avatar = {
      ADMIN: '',
    };

    return {
      ...user,
      avatar: user.avatar !== '' ? user.avatar : avatar[role],
    };
  };

  renewSession = () => {
    const { data, closeModal } = this.props;

    closeModal('sessionExpiration');
    data
      .refetch()
      .then(() => {
        this.session.alertedExpiration = false;
      });
  };

  closeSessionModal = () => {
    const { closeModal } = this.props;
    closeModal('sessionExpiration');
  };

  hideMenu = () => {
    const { setPageState } = this.props;
    setPageState({ displayMenu: false });
  };

  showMenu = () => {
    const { setPageState } = this.props;
    setPageState({ displayMenu: true });
  };

  toggleNavCollapse = () => {
    const { setPageState, collapseNav } = this.props;
    setPageState({ collapseNav: !collapseNav });
  };

  render() {
    if (!this.props.isLoggedin) {
      return null;
    }

    const {
      buildingData = { buildings: { nodes: [] } },
      history,
      collapseNav,
      displayMenu,
      showSessionExpirationModal,
    } = this.props;

    const { buildings, refetch } = buildingData;
    const { maxScrollHeight, pageSpinner } = this.state;
    const contentStyleNames = classnames({
      content: true,
      expanded: collapseNav === true,
      full: !displayMenu,
    });
    const user = this.getUser();
    const routesActions = { hideMenu: this.hideMenu, showMenu: this.showMenu, reloadBuildings: refetch };

    return (
      <div id="app-container" styleName="app-container">
        <Header
          collapsed={collapseNav}
          user={user}
          options={this.getMenuOptions()}
          defaultPage={this.defaultPage}
          onSelectUserOption={option => this.onSelectUserOption(option)}
        />
        <div styleName="main-container">
          {displayMenu && (
            <NavMenu
              activePage={getPagePath()}
              collapsed={collapseNav}
              options={this.getNavMenuOptions()}
              onToggleCollapse={this.toggleNavCollapse}
              redirectTo={history.push}
            />
          )}
          <section styleName={contentStyleNames} id="section-container">
            <ScrollView autoHeightMax={maxScrollHeight} id="scroll">
              {!pageSpinner && (
                <Routes styleName="content-inner" user={user} buildings={buildings.nodes} actions={routesActions} />
              )}
            </ScrollView>
          </section>
        </div>
        {showSessionExpirationModal && (
          <ModalSessionExpiration onClose={this.closeSessionModal} onSubmit={this.renewSession} />
        )}
      </div>
    );
  }
}

export default App;
