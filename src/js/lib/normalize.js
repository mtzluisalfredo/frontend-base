export function formatMoney(value, fixed = 0) {
  if (!value) {
    return value;
  }

  const re = new RegExp(/\d(?=(\d{3})+$)/, 'g');
  const hasDot = (/\./g).test(value);
  const [num, decimals] = String(value).split('.');
  const money = num.replace(re, '$&,');

  if (hasDot && fixed > 0) {
    return `${money}.${decimals.substr(0, fixed)}`;
  }

  return money;
}

export function normalizeMoney(value) {
  if (!value) {
    return value;
  }

  const onlyNums = value.replace(/[^\d.]/g, '');
  const hasDot = (/\./g).test(onlyNums);
  const [m, decimals] = onlyNums.split('.');
  const money = formatMoney(parseFloat(m));

  if (onlyNums.length === 0) {
    return '';
  }

  if (hasDot) {
    return `${money}.${decimals.substr(0, 2)}`;
  }

  return money;
}

export function normalizePhone(value) {
  if (!value) {
    return value;
  }

  const numbers = value.replace(/[^\d.]/g, '');
  const m = numbers.match(/^(\d{1,2})(\d{1,4})?(\d{1,4})?/);
  const length = numbers.length;

  if (length > 6) {
    return (`(${m[1]}) ${m[2]}-${m[3]}`).trim();
  } else if (length > 2) {
    return (`(${m[1]}) ${m[2]}`).trim();
  }

  return numbers;
}

export function normalizeCP(value) {
  if (!value) {
    return value;
  }

  const numbers = value.replace(/[^\d.]/g, '');
  const length = numbers.length;

  if (length > 5) {
    return numbers.substr(0, 5);
  }

  return numbers;
}

export function normalizeMXDate(value) {
  if (!value) {
    return value;
  }

  const numbers = value.replace(/[^\d.]/g, '');
  const m = numbers.match(/^(\d{1,2})(\d{1,2})?(\d{1,4})?/);
  const length = numbers.length;

  if (length > 4) {
    return (`${m[1]}/${m[2]}/${m[3]}`).trim();
  } else if (length > 2) {
    return (`${m[1]}/${m[2]}`).trim();
  }

  return numbers;
}

export function normalizeCard(value, previousValue) {
  if (!value) {
    return value;
  }

  const newValue = value.replace(/\s/g, '');
  const isInteger = /^[0-9]*$/.test(newValue);

  if (!isInteger || newValue.length > 16) {
    return previousValue;
  }

  return newValue.replace(/(.{4})/g, '$1 ').trim();
}

export function normalizeExpiration(value, previousValue) {
  if (!value) {
    return value;
  }

  const newValue = value.replace(/\s/g, '').replace('/', '');
  const isInteger = /^[0-9]*$/.test(newValue);
  const month = newValue.substring(0, 2) || null;
  const year = newValue.substring(2, 4) || '';

  if (!isInteger || newValue.length > 4) {
    return previousValue;
  }

  if (month) {
    return `${month} / ${year}`;
  }

  return '';
}

export function normalizeNumbers(value) {
  if (!value) {
    return value;
  }

  const numbers = value.replace(/[^\d.]/g, '');
  return numbers;
}
