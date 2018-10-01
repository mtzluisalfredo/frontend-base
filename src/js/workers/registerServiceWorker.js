const registerServiceWorker = () => {
  if (!process.env.HOT) {
    const { workersUrl } = window;
    const url = workersUrl || 'js/workers.min.js';

    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register(url)
          .then(res => res)
          .catch(e => console.log('Service Worker registration has failed due to: ', e));
      });
    }
  }
};

export default registerServiceWorker;

