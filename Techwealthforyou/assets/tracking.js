function trackEvent(name, params = {}) {

  if (typeof gtag === "function") {

    let redirected = false;

    gtag('event', name, {
      ...params,

      event_callback: function() {
        if (params.redirect && !redirected) {
          redirected = true;
          window.location.href = params.redirect;
        }
      }
    });

    // 🔥 fallback
    if (params.redirect) {
      setTimeout(() => {
        if (!redirected) {
          window.location.href = params.redirect;
        }
      }, 1000);
    }

  }

}