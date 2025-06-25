export default {
  size() {
    var myWidth = 0,
      myHeight = 0;
    if (typeof window.innerWidth == "number") {
      //Non-IE
      myWidth = window.innerWidth;
      myHeight = window.innerHeight;
    } else if (
      document.documentElement &&
      (document.documentElement.clientWidth ||
        document.documentElement.clientHeight)
    ) {
      //IE 6+ in 'standards compliant mode'
      myWidth = document.documentElement.clientWidth;
      myHeight = document.documentElement.clientHeight;
    } else if (
      document.body &&
      (document.body.clientWidth || document.body.clientHeight)
    ) {
      //IE 4 compatible
      myWidth = document.body.clientWidth;
      myHeight = document.body.clientHeight;
    }
    return {
      height: myHeight,
      width: myWidth,
    };
  },
  load(type, url) {
    let recaptchaScript = null;
    if (type == "style") {
      recaptchaScript = document.createElement("link");
      recaptchaScript.setAttribute("rel", "stylesheet");
      recaptchaScript.setAttribute("href", url);
      document.head.appendChild(recaptchaScript);
    } else {
      recaptchaScript = document.createElement("script");
      recaptchaScript.setAttribute("src", url);
      document.head.appendChild(recaptchaScript);
    }
  },
  loadStyle(url) {
    return this.load("style", url);
  },
  loadScript(url) {
    return this.load("script", url);
  },
  deleteCookie(name) {
    document.cookie =
      name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  },
  setCookie(name, value) {
    document.cookie = name + "=" + value + "; Path=/;";
  },
};
