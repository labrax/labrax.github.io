function clean_cookies() {
    var cookies = window.document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        window.document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        window.document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;domain=";
        window.document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;domain=" + location.hostname.replace(/^www\./i, "");
    }
}

window.cookieconsent.initialise({
  "palette": {
    "popup": {
      "background": "#000"
    },
    "button": {
      "background": "#f1d600"
    }
  },
  "type": "opt-in",
  "content": {
    "href": "https://labrax.github.io/privacy_policy/"
  },
  onInitialise: function (status) {
    var type = this.options.type;
    var didConsent = this.hasConsented();
    if (type == 'opt-in' && didConsent) {
      // enable cookies
      loadGAonConsent();
    }
    if (type == 'opt-out' && !didConsent) {
      // disable cookies
      clean_cookies();
    }
  },
  onStatusChange: function(status, chosenBefore) {
    var type = this.options.type;
    var didConsent = this.hasConsented();
    if (type == 'opt-in') {
	  if(didConsent) {
        // enable cookies
		loadGAonConsent();
	  } else {
		clean_cookies();
	  }
    }
    if (type == 'opt-out') {
	  if(!didConsent) {
		  // disable cookies
	      clean_cookies();
	  } else {
		  loadGAonConsent();
	  }
    }
  },
  onRevokeChoice: function () {
    var type = this.options.type;
    if (type == 'opt-in') {
      // disable cookies
      clean_cookies();
    }
    if (type == 'opt-out') {
      // enable cookies
      loadGAonConsent();
    }
  }
});
