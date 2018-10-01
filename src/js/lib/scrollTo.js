const CONTAINER_DIV = '#scroll > div';

module.exports = (x = 0, y = 0, selector = CONTAINER_DIV) => {
  document.querySelector(selector).scrollTo(x, y);
};
