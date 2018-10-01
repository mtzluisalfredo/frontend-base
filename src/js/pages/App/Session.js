import moment from 'moment';
import { push } from 'react-router-redux';

import Store from '../../store/store';

const SECOND = 1000;

moment.locale('es', {
  months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
  monthsShort: 'Ene_Feb_Mar_Abr_May_Jun_Jul_Ago_Sep_Oct_Nov_Dic'.split('_'),
  weekdaysMin: 'DOM_LUN_MAR_MIE_JUE_VIE_SAB'.split('_'),
});

class Session {
  constructor(token, sessionExpirationAlertHandler) {
    this.interval = setInterval(this.tick, SECOND);
    this.sessionExpirationAlertHandler = sessionExpirationAlertHandler;
    this.alertedExpiration = false;

    if (!token) {
      this.closeSession();
    }

    this.unsubscribe = Store.subscribe(this.logAction);
    this.logAction();
  }

  logAction = () => {
    if (localStorage) {
      localStorage.setItem('state', JSON.stringify(Store.getState()));
    }
  };

  tick = () => {
    let expirationDate;
    const { alertedExpiration } = this;

    if (localStorage) {
      expirationDate = localStorage.getItem('expiration_date');
    }

    const seconds = moment(expirationDate).diff(moment(), 'seconds');
    const remainingSecondsToAlert = 5 * 60;

    if (seconds <= 0) {
      this.closeSession();
    }

    if (seconds >= 0 && (seconds <= remainingSecondsToAlert) && alertedExpiration === false) {
      this.alertedExpiration = true;
      this.sessionExpirationAlertHandler();
    }
  };

  closeSession = () => {
    const { pathname } = window.location;
    let redirect = '/logout';

    if (pathname !== '/' && pathname.trim() !== '') {
      redirect += `?redirect=${pathname}`;
    }

    clearInterval(this.interval);
    window.location = redirect;
  };
}

export default Session;
