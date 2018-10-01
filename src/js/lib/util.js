import moment from 'moment';

import base64toBlob from './base64toBlob';

function getValue(object = {}, key) {
  const path = key.split('.');
  let obj = { ...object };

  if (path.length < 2) {
    return obj[key];
  }

  for (let i = 0; i < path.length; i += 1) {
    obj = obj[path[i]];
  }

  return obj;
}

function padString(s = '', width = 2, fill = '0') {
  return s.toString().length >= width ? s : new Array(width + 1 - s.toString().length).join(fill) + s.toString();
}

export function findIndex(arr = [], value, key = 'id') {
  let index = -1;

  for (let i = 0, len = arr.length; i < len; i += 1) {
    if (getValue(arr[i], key) === value) {
      index = i;
      break;
    }
  }

  return index;
}

export function getQueryParam(name) {
  if (window.location && window.location.href) {
    const url = window.location.href;
    const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
    const results = regex.exec(url);

    if (!results || !results[2]) {
      return '';
    }

    return decodeURIComponent(results[2].trim());
  }

  return '';
}

export function base64toFile(base64, filename, mimeType) {
  return base64toBlob(base64, mimeType);
}

export function asyncScript(url, id, cb) {
  const scriptId = `js-${id}`;

  if (!document.getElementById(scriptId)) {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.id = scriptId;
    script.src = url;

    if (cb) {
      script.onload = cb;
    }

    document.getElementsByTagName('head')[0].appendChild(script);
  }
}

export function formatDateTime(dateTime) {
  return moment(dateTime).format('D MMM kk:mm');
}

export function formatTime(time) {
  return moment(time).format('kk:mm');
}

