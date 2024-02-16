interface CookieProps {
  setCookie: (key: string, value: string) => void;
  getCookie: (key: string) => string | string;
  removeCookie: (key: string) => void;
}

export class CookieContainer {
  private setCookie: (key: string, value: string) => void;
  private getCookie: (key: string) => string | string;
  private removeCookie: (key: string) => void;
  constructor({ setCookie, getCookie, removeCookie }: CookieProps) {
    this.setCookie = setCookie;
    this.getCookie = getCookie;
    this.removeCookie = removeCookie;
  }

  set(key: string, value: string) {
    this.setCookie(key, value);
  }

  get(key: string) {
    if (typeof this.getCookie === 'function') {
      return this.getCookie(key);
    }
    return this.getCookie;
  }
}
