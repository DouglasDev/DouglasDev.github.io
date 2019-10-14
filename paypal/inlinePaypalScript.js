(function () {
    var STYLE = {
      BLOCK: 'block',
      INLINE_BLOCK: 'inline-block',
      NONE: 'none',
      VISIBLE: 'visible',
      HIDDEN: 'hidden'
    };

    function loop(method, delay, instances) {
      setTimeout(function () {
        method();
        instances -= 1;

        if (instances) {
          loop(method, delay, instances);
        }
      }, delay);
    }

    function getElements(selector, parent) {
      parent = parent || document;
      return Array.prototype.slice.call(parent.querySelectorAll(selector));
    }

    function showElement(el, displayType) {
      if (displayType === void 0) {
        displayType = STYLE.INLINE_BLOCK;
      }

      el.style.display = displayType;
    }

    function hideElement(el) {
      el.style.display = STYLE.NONE;
    }

    function makeElementVisible(el) {
      el.style.visibility = STYLE.VISIBLE;
    }

    function makeElementInvisible(el) {
      el.style.visibility = STYLE.HIDDEN;
    }

    function hasDimensions(el) {
      var rect = el.getBoundingClientRect();
      return Boolean(rect.height && rect.width);
    }

    function isHidden(el) {
      var computedStyle = window.getComputedStyle(el);
      return !computedStyle || computedStyle.display === STYLE.NONE;
    }

    function displayedElementsHaveDimensions(elements) {
      return elements.every(function (el) {
        return hasDimensions(el) || isHidden(el);
      });
    }

    function onDisplay(elements, method) {
      if (displayedElementsHaveDimensions(elements)) {
        method();
        return;
      }

      var interval = setInterval(function () {
        if (displayedElementsHaveDimensions(elements)) {
          clearInterval(interval);
          method();
        }
      }, 5);
    }

    function isOverflowing(el) {
      if (el.offsetWidth < el.scrollWidth || el.offsetHeight < el.scrollHeight) {
        return true;
      }

      var parent = el.parentNode;

      if (!parent) {
        return false;
      }

      var e = el.getBoundingClientRect(); // $FlowFixMe

      var p = parent.getBoundingClientRect();

      if (e.top < p.top || e.left < p.left || e.right > p.right || e.bottom > p.bottom) {
        return true;
      }

      if (e.left < 0 || e.top < 0 || e.left + e.width > window.innerWidth || e.top + e.height > window.innerHeight) {
        return true;
      }

      return false;
    }

    var images = getElements('.paypal-button .paypal-button-logo');
    var text = getElements('.paypal-button .paypal-button-text');
    var tagline = getElements('.paypal-button-tagline');
    var cards = getElements('.paypal-button-fundingicons .paypal-button-card');
    var optionals = getElements('.paypal-button-label-credit .paypal-button-logo-paypal');

    function toggleOptionals() {
      if (tagline.some(isOverflowing)) {
        tagline.forEach(makeElementInvisible);
      } else {
        tagline.forEach(makeElementVisible);
      }

      cards.forEach(function (el) {
        return showElement(el);
      });
      cards.filter(isOverflowing).forEach(hideElement);
      text.forEach(function (el) {
        return showElement(el);
      });
      optionals.forEach(function (el) {
        return showElement(el);
      });

      if (images.some(isOverflowing) || text.some(isOverflowing)) {
        text.forEach(hideElement);
        optionals.forEach(hideElement);
      } else {
        text.forEach(makeElementVisible);
        optionals.forEach(function (el) {
          return showElement(el);
        });
      }
    }

    function setupTabOutlineEvent() {
      var buttonsContainer = document.getElementsByClassName('paypal-button-container')[0];
      var tabKeyCode = 9;

      function handleMouseDownOnce() {
        buttonsContainer.classList.remove('paypal-should-focus');
        window.removeEventListener('mousedown', handleMouseDownOnce);
        window.addEventListener('keydown', handleFirstTab); // eslint-disable-line no-use-before-define
      }

      function handleFirstTab(e) {
        if (e.keyCode === tabKeyCode) {
          buttonsContainer.classList.add('paypal-should-focus');
          window.removeEventListener('keydown', handleFirstTab);
          window.addEventListener('mousedown', handleMouseDownOnce);
        }
      }

      buttonsContainer.classList.add('paypal-should-focus');
      window.addEventListener('keydown', handleFirstTab);
    }

    toggleOptionals();
    setupTabOutlineEvent();
    onDisplay(images, function () {
      images.forEach(makeElementVisible);
      toggleOptionals();
      document.addEventListener('DOMContentLoaded', toggleOptionals);
      window.addEventListener('load', toggleOptionals);
      window.addEventListener('resize', toggleOptionals);
      loop(toggleOptionals, 10, 10);
    });
  })();