import Cookies from 'universal-cookie';

export const CookiesHelpers = (function () {
  let cookieInstance;

  function getCookieInstance() {
    if (!cookieInstance) {
      cookieInstance = new Cookies();
    }

    return cookieInstance;
  }

  function setCookie(key: string, value: any, hour = 100000) {
    const cookie = getCookieInstance();

    cookie.set(key, JSON.stringify(value), { maxAge: hour * 60 });
  }

  function getCookie(key: string) {
    const cookie = getCookieInstance();
    const result = cookie.get(key);

    return result;
  }

  return { setCookie, getCookie };
})();
