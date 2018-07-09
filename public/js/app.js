/*!
  * CoreUI v2.0.0 (https://coreui.io)
  * Copyright 2018 Łukasz Holeczek
  * Licensed under MIT (https://coreui.io)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('jquery'), require('perfect-scrollbar')) :
  typeof define === 'function' && define.amd ? define(['exports', 'jquery', 'perfect-scrollbar'], factory) :
  (factory((global.coreui = {}),global.jQuery,global.PerfectScrollbar));
}(this, (function (exports,$,PerfectScrollbar) { 'use strict';

  $ = $ && $.hasOwnProperty('default') ? $['default'] : $;
  PerfectScrollbar = PerfectScrollbar && PerfectScrollbar.hasOwnProperty('default') ? PerfectScrollbar['default'] : PerfectScrollbar;

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  /**
   * --------------------------------------------------------------------------
   * CoreUI (v2.0.0): ajax-load.js
   * Licensed under MIT (https://coreui.io/license)
   * --------------------------------------------------------------------------
   */

  var AjaxLoad = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'ajaxLoad';
    var VERSION = '2.0.0';
    var DATA_KEY = 'coreui.ajaxLoad';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var ClassName = {
      ACTIVE: 'active',
      NAV_PILLS: 'nav-pills',
      NAV_TABS: 'nav-tabs',
      OPEN: 'open',
      VIEW_SCRIPT: 'view-script'
    };
    var Event = {
      CLICK: 'click'
    };
    var Selector = {
      HEAD: 'head',
      NAV_DROPDOWN: '.sidebar-nav .nav-dropdown',
      NAV_LINK: '.sidebar-nav .nav-link',
      NAV_ITEM: '.sidebar-nav .nav-item',
      VIEW_SCRIPT: '.view-script'
    };
    var Default = {
      defaultPage: 'main.html',
      errorPage: '404.html',
      subpagesDirectory: 'views/'
    };

    var AjaxLoad =
    /*#__PURE__*/
    function () {
      function AjaxLoad(element, config) {
        this._config = this._getConfig(config);
        this._element = element;
        var url = location.hash.replace(/^#/, '');

        if (url !== '') {
          this.setUpUrl(url);
        } else {
          this.setUpUrl(this._config.defaultPage);
        }

        this._addEventListeners();
      } // Getters


      var _proto = AjaxLoad.prototype;

      // Public
      _proto.loadPage = function loadPage(url) {
        var element = this._element;
        var config = this._config;

        var loadScripts = function loadScripts(src, element) {
          if (element === void 0) {
            element = 0;
          }

          var script = document.createElement('script');
          script.type = 'text/javascript';
          script.src = src[element];
          script.className = ClassName.VIEW_SCRIPT; // eslint-disable-next-line no-multi-assign

          script.onload = script.onreadystatechange = function () {
            if (!this.readyState || this.readyState === 'complete') {
              if (src.length > element + 1) {
                loadScripts(src, element + 1);
              }
            }
          };

          var body = document.getElementsByTagName('body')[0];
          body.appendChild(script);
        };

        $$$1.ajax({
          type: 'GET',
          url: config.subpagesDirectory + url,
          dataType: 'html',
          beforeSend: function beforeSend() {
            $$$1(Selector.VIEW_SCRIPT).remove();
          },
          success: function success(result) {
            var wrapper = document.createElement('div');
            wrapper.innerHTML = result;
            var scripts = Array.from(wrapper.querySelectorAll('script')).map(function (script) {
              return script.attributes.getNamedItem('src').nodeValue;
            });
            wrapper.querySelectorAll('script').forEach(function (script) {
              return script.parentNode.removeChild(script);
            });
            $$$1('body').animate({
              scrollTop: 0
            }, 0);
            $$$1(element).html(wrapper);

            if (scripts.length) {
              loadScripts(scripts);
            }

            window.location.hash = url;
          },
          error: function error() {
            window.location.href = config.errorPage;
          }
        });
      };

      _proto.setUpUrl = function setUpUrl(url) {
        $$$1(Selector.NAV_LINK).removeClass(ClassName.ACTIVE);
        $$$1(Selector.NAV_DROPDOWN).removeClass(ClassName.OPEN);
        $$$1(Selector.NAV_DROPDOWN + ":has(a[href=\"" + url.replace(/^\//, '').split('?')[0] + "\"])").addClass(ClassName.OPEN);
        $$$1(Selector.NAV_ITEM + " a[href=\"" + url.replace(/^\//, '').split('?')[0] + "\"]").addClass(ClassName.ACTIVE);
        this.loadPage(url);
      };

      _proto.loadBlank = function loadBlank(url) {
        window.open(url);
      };

      _proto.loadTop = function loadTop(url) {
        window.location = url;
      }; // Private


      _proto._getConfig = function _getConfig(config) {
        config = Object.assign({}, Default, config);
        return config;
      };

      _proto._addEventListeners = function _addEventListeners() {
        var _this = this;

        $$$1(document).on(Event.CLICK, Selector.NAV_LINK + "[href!=\"#\"]", function (event) {
          event.preventDefault();
          event.stopPropagation();

          if (event.currentTarget.target === '_top') {
            _this.loadTop(event.currentTarget.href);
          } else if (event.currentTarget.target === '_blank') {
            _this.loadBlank(event.currentTarget.href);
          } else {
            _this.setUpUrl(event.currentTarget.pathname);
          }
        });
      }; // Static


      AjaxLoad._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $$$1(this).data(DATA_KEY);

          var _config = typeof config === 'object' && config;

          if (!data) {
            data = new AjaxLoad(this, _config);
            $$$1(this).data(DATA_KEY, data);
          }
        });
      };

      _createClass(AjaxLoad, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default;
        }
      }]);

      return AjaxLoad;
    }();
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */


    $$$1.fn[NAME] = AjaxLoad._jQueryInterface;
    $$$1.fn[NAME].Constructor = AjaxLoad;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return AjaxLoad._jQueryInterface;
    };

    return AjaxLoad;
  }($);

  /**
   * --------------------------------------------------------------------------
   * CoreUI (v2.0.0): toggle-classes.js
   * Licensed under MIT (https://coreui.io/license)
   * --------------------------------------------------------------------------
   */
  var removeClasses = function removeClasses(classNames) {
    return classNames.map(function (className) {
      return document.body.classList.contains(className);
    }).indexOf(true) !== -1;
  };

  var toggleClasses = function toggleClasses(toggleClass, classNames) {
    var breakpoint = classNames.indexOf(toggleClass);
    var newClassNames = classNames.slice(0, breakpoint + 1);

    if (removeClasses(newClassNames)) {
      newClassNames.map(function (className) {
        return document.body.classList.remove(className);
      });
    } else {
      document.body.classList.add(toggleClass);
    }
  };

  /**
   * --------------------------------------------------------------------------
   * CoreUI (v2.0.0): aside-menu.js
   * Licensed under MIT (https://coreui.io/license)
   * --------------------------------------------------------------------------
   */

  var AsideMenu = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'aside-menu';
    var VERSION = '2.0.0';
    var DATA_KEY = 'coreui.aside-menu';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var Event = {
      CLICK: 'click',
      LOAD_DATA_API: "load" + EVENT_KEY + DATA_API_KEY,
      TOGGLE: 'toggle'
    };
    var Selector = {
      BODY: 'body',
      ASIDE_MENU: '.aside-menu',
      ASIDE_MENU_TOGGLER: '.aside-menu-toggler'
    };
    var ShowClassNames = ['aside-menu-show', 'aside-menu-sm-show', 'aside-menu-md-show', 'aside-menu-lg-show', 'aside-menu-xl-show'];
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var AsideMenu =
    /*#__PURE__*/
    function () {
      function AsideMenu(element) {
        this._element = element;

        this._addEventListeners();
      } // Getters


      var _proto = AsideMenu.prototype;

      // Private
      _proto._addEventListeners = function _addEventListeners() {
        $$$1(Selector.ASIDE_MENU_TOGGLER).on(Event.CLICK, function (event) {
          event.preventDefault();
          event.stopPropagation();
          var toggle = event.currentTarget.dataset.toggle;
          toggleClasses(toggle, ShowClassNames);
        });
      }; // Static


      AsideMenu._jQueryInterface = function _jQueryInterface() {
        return this.each(function () {
          var $element = $$$1(this);
          var data = $element.data(DATA_KEY);

          if (!data) {
            data = new AsideMenu(this);
            $element.data(DATA_KEY, data);
          }
        });
      };

      _createClass(AsideMenu, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }]);

      return AsideMenu;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(window).on(Event.LOAD_DATA_API, function () {
      var asideMenu = $$$1(Selector.ASIDE_MENU);

      AsideMenu._jQueryInterface.call(asideMenu);
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = AsideMenu._jQueryInterface;
    $$$1.fn[NAME].Constructor = AsideMenu;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return AsideMenu._jQueryInterface;
    };

    return AsideMenu;
  }($);

  /**
   * --------------------------------------------------------------------------
   * CoreUI (v2.0.0): sidebar.js
   * Licensed under MIT (https://coreui.io/license)
   * --------------------------------------------------------------------------
   */

  var Sidebar = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'sidebar';
    var VERSION = '2.0.0';
    var DATA_KEY = 'coreui.sidebar';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var ClassName = {
      ACTIVE: 'active',
      BRAND_MINIMIZED: 'brand-minimized',
      NAV_DROPDOWN_TOGGLE: 'nav-dropdown-toggle',
      OPEN: 'open',
      SIDEBAR_FIXED: 'sidebar-fixed',
      SIDEBAR_MINIMIZED: 'sidebar-minimized',
      SIDEBAR_OFF_CANVAS: 'sidebar-off-canvas'
    };
    var Event = {
      CLICK: 'click',
      DESTROY: 'destroy',
      INIT: 'init',
      LOAD_DATA_API: "load" + EVENT_KEY + DATA_API_KEY,
      TOGGLE: 'toggle'
    };
    var Selector = {
      BODY: 'body',
      BRAND_MINIMIZER: '.brand-minimizer',
      NAV_DROPDOWN_TOGGLE: '.nav-dropdown-toggle',
      NAV_DROPDOWN_ITEMS: '.nav-dropdown-items',
      NAV_LINK: '.nav-link',
      NAVIGATION_CONTAINER: '.sidebar-nav',
      NAVIGATION: '.sidebar-nav > .nav',
      SIDEBAR: '.sidebar',
      SIDEBAR_MINIMIZER: '.sidebar-minimizer',
      SIDEBAR_TOGGLER: '.sidebar-toggler'
    };
    var ShowClassNames = ['sidebar-show', 'sidebar-sm-show', 'sidebar-md-show', 'sidebar-lg-show', 'sidebar-xl-show'];
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var Sidebar =
    /*#__PURE__*/
    function () {
      function Sidebar(element) {
        this._element = element;
        this.perfectScrollbar(Event.INIT);
        this.setActiveLink();

        this._addEventListeners();
      } // Getters


      var _proto = Sidebar.prototype;

      // Public
      _proto.perfectScrollbar = function perfectScrollbar(event) {
        if (typeof PerfectScrollbar !== 'undefined') {
          var ps;

          if (event === Event.INIT && !document.body.classList.contains(ClassName.SIDEBAR_MINIMIZED)) {
            ps = new PerfectScrollbar(document.querySelector(Selector.NAVIGATION_CONTAINER), {
              suppressScrollX: true
            });
          }

          if (event === Event.DESTROY) {
            ps = new PerfectScrollbar(document.querySelector(Selector.NAVIGATION_CONTAINER), {
              suppressScrollX: true
            });
            ps.destroy();
            ps = null;
          }

          if (event === Event.TOGGLE) {
            if (document.body.classList.contains(ClassName.SIDEBAR_MINIMIZED)) {
              ps = new PerfectScrollbar(document.querySelector(Selector.NAVIGATION_CONTAINER), {
                suppressScrollX: true
              });
              ps.destroy();
              ps = null;
            } else {
              ps = new PerfectScrollbar(document.querySelector(Selector.NAVIGATION_CONTAINER), {
                suppressScrollX: true
              });
            }
          }
        }
      };

      _proto.setActiveLink = function setActiveLink() {
        $$$1(Selector.NAVIGATION).find(Selector.NAV_LINK).each(function (key, value) {
          var link = value;
          var cUrl = String(window.location).split('?')[0];

          if (cUrl.substr(cUrl.length - 1) === '#') {
            cUrl = cUrl.slice(0, -1);
          }

          if ($$$1($$$1(link))[0].href === cUrl) {
            $$$1(link).addClass(ClassName.ACTIVE).parents(Selector.NAV_DROPDOWN_ITEMS).add(link).each(function (key, value) {
              link = value;
              $$$1(link).parent().addClass(ClassName.OPEN);
            });
          }
        });
      }; // Private


      _proto._addEventListeners = function _addEventListeners() {
        var _this = this;

        $$$1(Selector.BRAND_MINIMIZER).on(Event.CLICK, function (event) {
          event.preventDefault();
          event.stopPropagation();
          $$$1(Selector.BODY).toggleClass(ClassName.BRAND_MINIMIZED);
        });
        $$$1(Selector.NAV_DROPDOWN_TOGGLE).on(Event.CLICK, function (event) {
          event.preventDefault();
          event.stopPropagation();
          var dropdown = event.target;
          $$$1(dropdown).parent().toggleClass(ClassName.OPEN);
        });
        $$$1(Selector.SIDEBAR_MINIMIZER).on(Event.CLICK, function (event) {
          event.preventDefault();
          event.stopPropagation();
          $$$1(Selector.BODY).toggleClass(ClassName.SIDEBAR_MINIMIZED);

          _this.perfectScrollbar(Event.TOGGLE);
        });
        $$$1(Selector.SIDEBAR_TOGGLER).on(Event.CLICK, function (event) {
          event.preventDefault();
          event.stopPropagation();
          var toggle = event.currentTarget.dataset.toggle;
          toggleClasses(toggle, ShowClassNames);
        });
      }; // Static


      Sidebar._jQueryInterface = function _jQueryInterface() {
        return this.each(function () {
          var $element = $$$1(this);
          var data = $element.data(DATA_KEY);

          if (!data) {
            data = new Sidebar(this);
            $element.data(DATA_KEY, data);
          }
        });
      };

      _createClass(Sidebar, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }]);

      return Sidebar;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(window).on(Event.LOAD_DATA_API, function () {
      var sidebar = $$$1(Selector.SIDEBAR);

      Sidebar._jQueryInterface.call(sidebar);
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = Sidebar._jQueryInterface;
    $$$1.fn[NAME].Constructor = Sidebar;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Sidebar._jQueryInterface;
    };

    return Sidebar;
  }($);

  /**
   * --------------------------------------------------------------------------
   * CoreUI Utilities (v2.0.0): get-style.js
   * Licensed under MIT (https://coreui.io/license)
   * --------------------------------------------------------------------------
   */
  var getCssCustomProperties = function getCssCustomProperties() {
    var cssCustomProperties = {};
    var root = Object.entries(document.styleSheets).filter(function (value) {
      return value[1].cssText.substring(0, ':root'.length) === ':root';
    });

    if (root.length === 0) {
      root = Object.entries(document.styleSheets);
    }

    var rule = Object.entries(root[0][1].cssRules).filter(function (value) {
      return value[1].selectorText === '.ie-custom-properties';
    });
    var cssText = rule[0][1].style.cssText;
    cssText.split(';').forEach(function (property) {
      if (property) {
        var name = property.split(': ')[0];
        var value = property.split(': ')[1];
        cssCustomProperties["--" + name.trim()] = value.trim();
      }
    });
    return cssCustomProperties;
  };

  var minIEVersion = 10;

  var isIE1x = function isIE1x() {
    return Boolean(document.documentMode) && document.documentMode >= minIEVersion;
  };

  var isCustomProperty = function isCustomProperty(property) {
    return property.match(/^--.*/i);
  };

  var getStyle = function getStyle(property, element) {
    if (element === void 0) {
      element = document.body;
    }

    var style;

    if (isCustomProperty(property) && isIE1x()) {
      var cssCustomProperties = getCssCustomProperties();
      style = cssCustomProperties[property];
    } else {
      style = window.getComputedStyle(element, null).getPropertyValue(property).replace(/^\s/, '');
    }

    return style;
  };

  if (!Object.entries) {
    Object.entries = function (obj) {
      var ownProps = Object.keys(obj);
      var i = ownProps.length;
      var resArray = new Array(i);

      while (i--) {
        resArray[i] = [ownProps[i], obj[ownProps[i]]];
      }

      return resArray;
    };
  }

  /**
   * --------------------------------------------------------------------------
   * CoreUI Utilities (v2.0.0): hex-to-rgb.js
   * Licensed under MIT (https://coreui.io/license)
   * --------------------------------------------------------------------------
   */

  /* eslint-disable no-magic-numbers */
  var hexToRgb = function hexToRgb(color) {
    if (typeof color === 'undefined') {
      throw new Error('Hex color is not defined');
    }

    var hex = color.match(/^#(?:[0-9a-f]{3}){1,2}$/i);

    if (!hex) {
      throw new Error(color + " is not a valid hex color");
    }

    var r;
    var g;
    var b;

    if (color.length === 7) {
      r = parseInt(color.substring(1, 3), 16);
      g = parseInt(color.substring(3, 5), 16);
      b = parseInt(color.substring(5, 7), 16);
    } else {
      r = parseInt(color.substring(1, 2), 16);
      g = parseInt(color.substring(2, 3), 16);
      b = parseInt(color.substring(3, 5), 16);
    }

    return "rgba(" + r + ", " + g + ", " + b + ")";
  };

  /**
   * --------------------------------------------------------------------------
   * CoreUI Utilities (v2.0.0): hex-to-rgba.js
   * Licensed under MIT (https://coreui.io/license)
   * --------------------------------------------------------------------------
   */

  /* eslint-disable no-magic-numbers */
  var hexToRgba = function hexToRgba(color, opacity) {
    if (opacity === void 0) {
      opacity = 100;
    }

    if (typeof color === 'undefined') {
      throw new Error('Hex color is not defined');
    }

    var hex = color.match(/^#(?:[0-9a-f]{3}){1,2}$/i);

    if (!hex) {
      throw new Error(color + " is not a valid hex color");
    }

    var r;
    var g;
    var b;

    if (color.length === 7) {
      r = parseInt(color.substring(1, 3), 16);
      g = parseInt(color.substring(3, 5), 16);
      b = parseInt(color.substring(5, 7), 16);
    } else {
      r = parseInt(color.substring(1, 2), 16);
      g = parseInt(color.substring(2, 3), 16);
      b = parseInt(color.substring(3, 5), 16);
    }

    return "rgba(" + r + ", " + g + ", " + b + ", " + opacity / 100 + ")";
  };

  /**
   * --------------------------------------------------------------------------
   * CoreUI (v2.0.0): rgb-to-hex.js
   * Licensed under MIT (https://coreui.io/license)
   * --------------------------------------------------------------------------
   */

  /* eslint-disable no-magic-numbers */
  var rgbToHex = function rgbToHex(color) {
    if (typeof color === 'undefined') {
      throw new Error('Hex color is not defined');
    }

    var rgb = color.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);

    if (!rgb) {
      throw new Error(color + " is not a valid rgb color");
    }

    var r = "0" + parseInt(rgb[1], 10).toString(16);
    var g = "0" + parseInt(rgb[2], 10).toString(16);
    var b = "0" + parseInt(rgb[3], 10).toString(16);
    return "#" + r.slice(-2) + g.slice(-2) + b.slice(-2);
  };

  /**
   * --------------------------------------------------------------------------
   * CoreUI (v2.0.0): index.js
   * Licensed under MIT (https://coreui.io/license)
   * --------------------------------------------------------------------------
   */

  (function ($$$1) {
    if (typeof $$$1 === 'undefined') {
      throw new TypeError('CoreUI\'s JavaScript requires jQuery. jQuery must be included before CoreUI\'s JavaScript.');
    }

    var version = $$$1.fn.jquery.split(' ')[0].split('.');
    var minMajor = 1;
    var ltMajor = 2;
    var minMinor = 9;
    var minPatch = 1;
    var maxMajor = 4;

    if (version[0] < ltMajor && version[1] < minMinor || version[0] === minMajor && version[1] === minMinor && version[2] < minPatch || version[0] >= maxMajor) {
      throw new Error('CoreUI\'s JavaScript requires at least jQuery v1.9.1 but less than v4.0.0');
    }
  })($);
  window.getStyle = getStyle;
  window.hexToRgb = hexToRgb;
  window.hexToRgba = hexToRgba;
  window.rgbToHex = rgbToHex;

  exports.AjaxLoad = AjaxLoad;
  exports.AsideMenu = AsideMenu;
  exports.Sidebar = Sidebar;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=coreui.js.map

/*!
  * Bootstrap v4.1.1 (https://getbootstrap.com/)
  * Copyright 2011-2018 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('jquery'), require('popper.js')) :
  typeof define === 'function' && define.amd ? define(['exports', 'jquery', 'popper.js'], factory) :
  (factory((global.bootstrap = {}),global.jQuery,global.Popper));
}(this, (function (exports,$,Popper) { 'use strict';

  $ = $ && $.hasOwnProperty('default') ? $['default'] : $;
  Popper = Popper && Popper.hasOwnProperty('default') ? Popper['default'] : Popper;

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    }

    return target;
  }

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.1): util.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Util = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Private TransitionEnd Helpers
     * ------------------------------------------------------------------------
     */
    var TRANSITION_END = 'transitionend';
    var MAX_UID = 1000000;
    var MILLISECONDS_MULTIPLIER = 1000; // Shoutout AngusCroll (https://goo.gl/pxwQGp)

    function toType(obj) {
      return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
    }

    function getSpecialTransitionEndEvent() {
      return {
        bindType: TRANSITION_END,
        delegateType: TRANSITION_END,
        handle: function handle(event) {
          if ($$$1(event.target).is(this)) {
            return event.handleObj.handler.apply(this, arguments); // eslint-disable-line prefer-rest-params
          }

          return undefined; // eslint-disable-line no-undefined
        }
      };
    }

    function transitionEndEmulator(duration) {
      var _this = this;

      var called = false;
      $$$1(this).one(Util.TRANSITION_END, function () {
        called = true;
      });
      setTimeout(function () {
        if (!called) {
          Util.triggerTransitionEnd(_this);
        }
      }, duration);
      return this;
    }

    function setTransitionEndSupport() {
      $$$1.fn.emulateTransitionEnd = transitionEndEmulator;
      $$$1.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
    }
    /**
     * --------------------------------------------------------------------------
     * Public Util Api
     * --------------------------------------------------------------------------
     */


    var Util = {
      TRANSITION_END: 'bsTransitionEnd',
      getUID: function getUID(prefix) {
        do {
          // eslint-disable-next-line no-bitwise
          prefix += ~~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
        } while (document.getElementById(prefix));

        return prefix;
      },
      getSelectorFromElement: function getSelectorFromElement(element) {
        var selector = element.getAttribute('data-target');

        if (!selector || selector === '#') {
          selector = element.getAttribute('href') || '';
        }

        try {
          var $selector = $$$1(document).find(selector);
          return $selector.length > 0 ? selector : null;
        } catch (err) {
          return null;
        }
      },
      getTransitionDurationFromElement: function getTransitionDurationFromElement(element) {
        if (!element) {
          return 0;
        } // Get transition-duration of the element


        var transitionDuration = $$$1(element).css('transition-duration');
        var floatTransitionDuration = parseFloat(transitionDuration); // Return 0 if element or transition duration is not found

        if (!floatTransitionDuration) {
          return 0;
        } // If multiple durations are defined, take the first


        transitionDuration = transitionDuration.split(',')[0];
        return parseFloat(transitionDuration) * MILLISECONDS_MULTIPLIER;
      },
      reflow: function reflow(element) {
        return element.offsetHeight;
      },
      triggerTransitionEnd: function triggerTransitionEnd(element) {
        $$$1(element).trigger(TRANSITION_END);
      },
      // TODO: Remove in v5
      supportsTransitionEnd: function supportsTransitionEnd() {
        return Boolean(TRANSITION_END);
      },
      isElement: function isElement(obj) {
        return (obj[0] || obj).nodeType;
      },
      typeCheckConfig: function typeCheckConfig(componentName, config, configTypes) {
        for (var property in configTypes) {
          if (Object.prototype.hasOwnProperty.call(configTypes, property)) {
            var expectedTypes = configTypes[property];
            var value = config[property];
            var valueType = value && Util.isElement(value) ? 'element' : toType(value);

            if (!new RegExp(expectedTypes).test(valueType)) {
              throw new Error(componentName.toUpperCase() + ": " + ("Option \"" + property + "\" provided type \"" + valueType + "\" ") + ("but expected type \"" + expectedTypes + "\"."));
            }
          }
        }
      }
    };
    setTransitionEndSupport();
    return Util;
  }($);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.1): alert.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Alert = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'alert';
    var VERSION = '4.1.1';
    var DATA_KEY = 'bs.alert';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var Selector = {
      DISMISS: '[data-dismiss="alert"]'
    };
    var Event = {
      CLOSE: "close" + EVENT_KEY,
      CLOSED: "closed" + EVENT_KEY,
      CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
    };
    var ClassName = {
      ALERT: 'alert',
      FADE: 'fade',
      SHOW: 'show'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Alert =
    /*#__PURE__*/
    function () {
      function Alert(element) {
        this._element = element;
      } // Getters


      var _proto = Alert.prototype;

      // Public
      _proto.close = function close(element) {
        var rootElement = this._element;

        if (element) {
          rootElement = this._getRootElement(element);
        }

        var customEvent = this._triggerCloseEvent(rootElement);

        if (customEvent.isDefaultPrevented()) {
          return;
        }

        this._removeElement(rootElement);
      };

      _proto.dispose = function dispose() {
        $$$1.removeData(this._element, DATA_KEY);
        this._element = null;
      }; // Private


      _proto._getRootElement = function _getRootElement(element) {
        var selector = Util.getSelectorFromElement(element);
        var parent = false;

        if (selector) {
          parent = $$$1(selector)[0];
        }

        if (!parent) {
          parent = $$$1(element).closest("." + ClassName.ALERT)[0];
        }

        return parent;
      };

      _proto._triggerCloseEvent = function _triggerCloseEvent(element) {
        var closeEvent = $$$1.Event(Event.CLOSE);
        $$$1(element).trigger(closeEvent);
        return closeEvent;
      };

      _proto._removeElement = function _removeElement(element) {
        var _this = this;

        $$$1(element).removeClass(ClassName.SHOW);

        if (!$$$1(element).hasClass(ClassName.FADE)) {
          this._destroyElement(element);

          return;
        }

        var transitionDuration = Util.getTransitionDurationFromElement(element);
        $$$1(element).one(Util.TRANSITION_END, function (event) {
          return _this._destroyElement(element, event);
        }).emulateTransitionEnd(transitionDuration);
      };

      _proto._destroyElement = function _destroyElement(element) {
        $$$1(element).detach().trigger(Event.CLOSED).remove();
      }; // Static


      Alert._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var $element = $$$1(this);
          var data = $element.data(DATA_KEY);

          if (!data) {
            data = new Alert(this);
            $element.data(DATA_KEY, data);
          }

          if (config === 'close') {
            data[config](this);
          }
        });
      };

      Alert._handleDismiss = function _handleDismiss(alertInstance) {
        return function (event) {
          if (event) {
            event.preventDefault();
          }

          alertInstance.close(this);
        };
      };

      _createClass(Alert, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }]);

      return Alert;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(document).on(Event.CLICK_DATA_API, Selector.DISMISS, Alert._handleDismiss(new Alert()));
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = Alert._jQueryInterface;
    $$$1.fn[NAME].Constructor = Alert;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Alert._jQueryInterface;
    };

    return Alert;
  }($);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.1): button.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Button = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'button';
    var VERSION = '4.1.1';
    var DATA_KEY = 'bs.button';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var ClassName = {
      ACTIVE: 'active',
      BUTTON: 'btn',
      FOCUS: 'focus'
    };
    var Selector = {
      DATA_TOGGLE_CARROT: '[data-toggle^="button"]',
      DATA_TOGGLE: '[data-toggle="buttons"]',
      INPUT: 'input',
      ACTIVE: '.active',
      BUTTON: '.btn'
    };
    var Event = {
      CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY,
      FOCUS_BLUR_DATA_API: "focus" + EVENT_KEY + DATA_API_KEY + " " + ("blur" + EVENT_KEY + DATA_API_KEY)
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Button =
    /*#__PURE__*/
    function () {
      function Button(element) {
        this._element = element;
      } // Getters


      var _proto = Button.prototype;

      // Public
      _proto.toggle = function toggle() {
        var triggerChangeEvent = true;
        var addAriaPressed = true;
        var rootElement = $$$1(this._element).closest(Selector.DATA_TOGGLE)[0];

        if (rootElement) {
          var input = $$$1(this._element).find(Selector.INPUT)[0];

          if (input) {
            if (input.type === 'radio') {
              if (input.checked && $$$1(this._element).hasClass(ClassName.ACTIVE)) {
                triggerChangeEvent = false;
              } else {
                var activeElement = $$$1(rootElement).find(Selector.ACTIVE)[0];

                if (activeElement) {
                  $$$1(activeElement).removeClass(ClassName.ACTIVE);
                }
              }
            }

            if (triggerChangeEvent) {
              if (input.hasAttribute('disabled') || rootElement.hasAttribute('disabled') || input.classList.contains('disabled') || rootElement.classList.contains('disabled')) {
                return;
              }

              input.checked = !$$$1(this._element).hasClass(ClassName.ACTIVE);
              $$$1(input).trigger('change');
            }

            input.focus();
            addAriaPressed = false;
          }
        }

        if (addAriaPressed) {
          this._element.setAttribute('aria-pressed', !$$$1(this._element).hasClass(ClassName.ACTIVE));
        }

        if (triggerChangeEvent) {
          $$$1(this._element).toggleClass(ClassName.ACTIVE);
        }
      };

      _proto.dispose = function dispose() {
        $$$1.removeData(this._element, DATA_KEY);
        this._element = null;
      }; // Static


      Button._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $$$1(this).data(DATA_KEY);

          if (!data) {
            data = new Button(this);
            $$$1(this).data(DATA_KEY, data);
          }

          if (config === 'toggle') {
            data[config]();
          }
        });
      };

      _createClass(Button, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }]);

      return Button;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE_CARROT, function (event) {
      event.preventDefault();
      var button = event.target;

      if (!$$$1(button).hasClass(ClassName.BUTTON)) {
        button = $$$1(button).closest(Selector.BUTTON);
      }

      Button._jQueryInterface.call($$$1(button), 'toggle');
    }).on(Event.FOCUS_BLUR_DATA_API, Selector.DATA_TOGGLE_CARROT, function (event) {
      var button = $$$1(event.target).closest(Selector.BUTTON)[0];
      $$$1(button).toggleClass(ClassName.FOCUS, /^focus(in)?$/.test(event.type));
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = Button._jQueryInterface;
    $$$1.fn[NAME].Constructor = Button;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Button._jQueryInterface;
    };

    return Button;
  }($);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.1): carousel.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Carousel = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'carousel';
    var VERSION = '4.1.1';
    var DATA_KEY = 'bs.carousel';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var ARROW_LEFT_KEYCODE = 37; // KeyboardEvent.which value for left arrow key

    var ARROW_RIGHT_KEYCODE = 39; // KeyboardEvent.which value for right arrow key

    var TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch

    var Default = {
      interval: 5000,
      keyboard: true,
      slide: false,
      pause: 'hover',
      wrap: true
    };
    var DefaultType = {
      interval: '(number|boolean)',
      keyboard: 'boolean',
      slide: '(boolean|string)',
      pause: '(string|boolean)',
      wrap: 'boolean'
    };
    var Direction = {
      NEXT: 'next',
      PREV: 'prev',
      LEFT: 'left',
      RIGHT: 'right'
    };
    var Event = {
      SLIDE: "slide" + EVENT_KEY,
      SLID: "slid" + EVENT_KEY,
      KEYDOWN: "keydown" + EVENT_KEY,
      MOUSEENTER: "mouseenter" + EVENT_KEY,
      MOUSELEAVE: "mouseleave" + EVENT_KEY,
      TOUCHEND: "touchend" + EVENT_KEY,
      LOAD_DATA_API: "load" + EVENT_KEY + DATA_API_KEY,
      CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
    };
    var ClassName = {
      CAROUSEL: 'carousel',
      ACTIVE: 'active',
      SLIDE: 'slide',
      RIGHT: 'carousel-item-right',
      LEFT: 'carousel-item-left',
      NEXT: 'carousel-item-next',
      PREV: 'carousel-item-prev',
      ITEM: 'carousel-item'
    };
    var Selector = {
      ACTIVE: '.active',
      ACTIVE_ITEM: '.active.carousel-item',
      ITEM: '.carousel-item',
      NEXT_PREV: '.carousel-item-next, .carousel-item-prev',
      INDICATORS: '.carousel-indicators',
      DATA_SLIDE: '[data-slide], [data-slide-to]',
      DATA_RIDE: '[data-ride="carousel"]'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Carousel =
    /*#__PURE__*/
    function () {
      function Carousel(element, config) {
        this._items = null;
        this._interval = null;
        this._activeElement = null;
        this._isPaused = false;
        this._isSliding = false;
        this.touchTimeout = null;
        this._config = this._getConfig(config);
        this._element = $$$1(element)[0];
        this._indicatorsElement = $$$1(this._element).find(Selector.INDICATORS)[0];

        this._addEventListeners();
      } // Getters


      var _proto = Carousel.prototype;

      // Public
      _proto.next = function next() {
        if (!this._isSliding) {
          this._slide(Direction.NEXT);
        }
      };

      _proto.nextWhenVisible = function nextWhenVisible() {
        // Don't call next when the page isn't visible
        // or the carousel or its parent isn't visible
        if (!document.hidden && $$$1(this._element).is(':visible') && $$$1(this._element).css('visibility') !== 'hidden') {
          this.next();
        }
      };

      _proto.prev = function prev() {
        if (!this._isSliding) {
          this._slide(Direction.PREV);
        }
      };

      _proto.pause = function pause(event) {
        if (!event) {
          this._isPaused = true;
        }

        if ($$$1(this._element).find(Selector.NEXT_PREV)[0]) {
          Util.triggerTransitionEnd(this._element);
          this.cycle(true);
        }

        clearInterval(this._interval);
        this._interval = null;
      };

      _proto.cycle = function cycle(event) {
        if (!event) {
          this._isPaused = false;
        }

        if (this._interval) {
          clearInterval(this._interval);
          this._interval = null;
        }

        if (this._config.interval && !this._isPaused) {
          this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval);
        }
      };

      _proto.to = function to(index) {
        var _this = this;

        this._activeElement = $$$1(this._element).find(Selector.ACTIVE_ITEM)[0];

        var activeIndex = this._getItemIndex(this._activeElement);

        if (index > this._items.length - 1 || index < 0) {
          return;
        }

        if (this._isSliding) {
          $$$1(this._element).one(Event.SLID, function () {
            return _this.to(index);
          });
          return;
        }

        if (activeIndex === index) {
          this.pause();
          this.cycle();
          return;
        }

        var direction = index > activeIndex ? Direction.NEXT : Direction.PREV;

        this._slide(direction, this._items[index]);
      };

      _proto.dispose = function dispose() {
        $$$1(this._element).off(EVENT_KEY);
        $$$1.removeData(this._element, DATA_KEY);
        this._items = null;
        this._config = null;
        this._element = null;
        this._interval = null;
        this._isPaused = null;
        this._isSliding = null;
        this._activeElement = null;
        this._indicatorsElement = null;
      }; // Private


      _proto._getConfig = function _getConfig(config) {
        config = _objectSpread({}, Default, config);
        Util.typeCheckConfig(NAME, config, DefaultType);
        return config;
      };

      _proto._addEventListeners = function _addEventListeners() {
        var _this2 = this;

        if (this._config.keyboard) {
          $$$1(this._element).on(Event.KEYDOWN, function (event) {
            return _this2._keydown(event);
          });
        }

        if (this._config.pause === 'hover') {
          $$$1(this._element).on(Event.MOUSEENTER, function (event) {
            return _this2.pause(event);
          }).on(Event.MOUSELEAVE, function (event) {
            return _this2.cycle(event);
          });

          if ('ontouchstart' in document.documentElement) {
            // If it's a touch-enabled device, mouseenter/leave are fired as
            // part of the mouse compatibility events on first tap - the carousel
            // would stop cycling until user tapped out of it;
            // here, we listen for touchend, explicitly pause the carousel
            // (as if it's the second time we tap on it, mouseenter compat event
            // is NOT fired) and after a timeout (to allow for mouse compatibility
            // events to fire) we explicitly restart cycling
            $$$1(this._element).on(Event.TOUCHEND, function () {
              _this2.pause();

              if (_this2.touchTimeout) {
                clearTimeout(_this2.touchTimeout);
              }

              _this2.touchTimeout = setTimeout(function (event) {
                return _this2.cycle(event);
              }, TOUCHEVENT_COMPAT_WAIT + _this2._config.interval);
            });
          }
        }
      };

      _proto._keydown = function _keydown(event) {
        if (/input|textarea/i.test(event.target.tagName)) {
          return;
        }

        switch (event.which) {
          case ARROW_LEFT_KEYCODE:
            event.preventDefault();
            this.prev();
            break;

          case ARROW_RIGHT_KEYCODE:
            event.preventDefault();
            this.next();
            break;

          default:
        }
      };

      _proto._getItemIndex = function _getItemIndex(element) {
        this._items = $$$1.makeArray($$$1(element).parent().find(Selector.ITEM));
        return this._items.indexOf(element);
      };

      _proto._getItemByDirection = function _getItemByDirection(direction, activeElement) {
        var isNextDirection = direction === Direction.NEXT;
        var isPrevDirection = direction === Direction.PREV;

        var activeIndex = this._getItemIndex(activeElement);

        var lastItemIndex = this._items.length - 1;
        var isGoingToWrap = isPrevDirection && activeIndex === 0 || isNextDirection && activeIndex === lastItemIndex;

        if (isGoingToWrap && !this._config.wrap) {
          return activeElement;
        }

        var delta = direction === Direction.PREV ? -1 : 1;
        var itemIndex = (activeIndex + delta) % this._items.length;
        return itemIndex === -1 ? this._items[this._items.length - 1] : this._items[itemIndex];
      };

      _proto._triggerSlideEvent = function _triggerSlideEvent(relatedTarget, eventDirectionName) {
        var targetIndex = this._getItemIndex(relatedTarget);

        var fromIndex = this._getItemIndex($$$1(this._element).find(Selector.ACTIVE_ITEM)[0]);

        var slideEvent = $$$1.Event(Event.SLIDE, {
          relatedTarget: relatedTarget,
          direction: eventDirectionName,
          from: fromIndex,
          to: targetIndex
        });
        $$$1(this._element).trigger(slideEvent);
        return slideEvent;
      };

      _proto._setActiveIndicatorElement = function _setActiveIndicatorElement(element) {
        if (this._indicatorsElement) {
          $$$1(this._indicatorsElement).find(Selector.ACTIVE).removeClass(ClassName.ACTIVE);

          var nextIndicator = this._indicatorsElement.children[this._getItemIndex(element)];

          if (nextIndicator) {
            $$$1(nextIndicator).addClass(ClassName.ACTIVE);
          }
        }
      };

      _proto._slide = function _slide(direction, element) {
        var _this3 = this;

        var activeElement = $$$1(this._element).find(Selector.ACTIVE_ITEM)[0];

        var activeElementIndex = this._getItemIndex(activeElement);

        var nextElement = element || activeElement && this._getItemByDirection(direction, activeElement);

        var nextElementIndex = this._getItemIndex(nextElement);

        var isCycling = Boolean(this._interval);
        var directionalClassName;
        var orderClassName;
        var eventDirectionName;

        if (direction === Direction.NEXT) {
          directionalClassName = ClassName.LEFT;
          orderClassName = ClassName.NEXT;
          eventDirectionName = Direction.LEFT;
        } else {
          directionalClassName = ClassName.RIGHT;
          orderClassName = ClassName.PREV;
          eventDirectionName = Direction.RIGHT;
        }

        if (nextElement && $$$1(nextElement).hasClass(ClassName.ACTIVE)) {
          this._isSliding = false;
          return;
        }

        var slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);

        if (slideEvent.isDefaultPrevented()) {
          return;
        }

        if (!activeElement || !nextElement) {
          // Some weirdness is happening, so we bail
          return;
        }

        this._isSliding = true;

        if (isCycling) {
          this.pause();
        }

        this._setActiveIndicatorElement(nextElement);

        var slidEvent = $$$1.Event(Event.SLID, {
          relatedTarget: nextElement,
          direction: eventDirectionName,
          from: activeElementIndex,
          to: nextElementIndex
        });

        if ($$$1(this._element).hasClass(ClassName.SLIDE)) {
          $$$1(nextElement).addClass(orderClassName);
          Util.reflow(nextElement);
          $$$1(activeElement).addClass(directionalClassName);
          $$$1(nextElement).addClass(directionalClassName);
          var transitionDuration = Util.getTransitionDurationFromElement(activeElement);
          $$$1(activeElement).one(Util.TRANSITION_END, function () {
            $$$1(nextElement).removeClass(directionalClassName + " " + orderClassName).addClass(ClassName.ACTIVE);
            $$$1(activeElement).removeClass(ClassName.ACTIVE + " " + orderClassName + " " + directionalClassName);
            _this3._isSliding = false;
            setTimeout(function () {
              return $$$1(_this3._element).trigger(slidEvent);
            }, 0);
          }).emulateTransitionEnd(transitionDuration);
        } else {
          $$$1(activeElement).removeClass(ClassName.ACTIVE);
          $$$1(nextElement).addClass(ClassName.ACTIVE);
          this._isSliding = false;
          $$$1(this._element).trigger(slidEvent);
        }

        if (isCycling) {
          this.cycle();
        }
      }; // Static


      Carousel._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $$$1(this).data(DATA_KEY);

          var _config = _objectSpread({}, Default, $$$1(this).data());

          if (typeof config === 'object') {
            _config = _objectSpread({}, _config, config);
          }

          var action = typeof config === 'string' ? config : _config.slide;

          if (!data) {
            data = new Carousel(this, _config);
            $$$1(this).data(DATA_KEY, data);
          }

          if (typeof config === 'number') {
            data.to(config);
          } else if (typeof action === 'string') {
            if (typeof data[action] === 'undefined') {
              throw new TypeError("No method named \"" + action + "\"");
            }

            data[action]();
          } else if (_config.interval) {
            data.pause();
            data.cycle();
          }
        });
      };

      Carousel._dataApiClickHandler = function _dataApiClickHandler(event) {
        var selector = Util.getSelectorFromElement(this);

        if (!selector) {
          return;
        }

        var target = $$$1(selector)[0];

        if (!target || !$$$1(target).hasClass(ClassName.CAROUSEL)) {
          return;
        }

        var config = _objectSpread({}, $$$1(target).data(), $$$1(this).data());

        var slideIndex = this.getAttribute('data-slide-to');

        if (slideIndex) {
          config.interval = false;
        }

        Carousel._jQueryInterface.call($$$1(target), config);

        if (slideIndex) {
          $$$1(target).data(DATA_KEY).to(slideIndex);
        }

        event.preventDefault();
      };

      _createClass(Carousel, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default;
        }
      }]);

      return Carousel;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(document).on(Event.CLICK_DATA_API, Selector.DATA_SLIDE, Carousel._dataApiClickHandler);
    $$$1(window).on(Event.LOAD_DATA_API, function () {
      $$$1(Selector.DATA_RIDE).each(function () {
        var $carousel = $$$1(this);

        Carousel._jQueryInterface.call($carousel, $carousel.data());
      });
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = Carousel._jQueryInterface;
    $$$1.fn[NAME].Constructor = Carousel;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Carousel._jQueryInterface;
    };

    return Carousel;
  }($);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.1): collapse.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Collapse = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'collapse';
    var VERSION = '4.1.1';
    var DATA_KEY = 'bs.collapse';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var Default = {
      toggle: true,
      parent: ''
    };
    var DefaultType = {
      toggle: 'boolean',
      parent: '(string|element)'
    };
    var Event = {
      SHOW: "show" + EVENT_KEY,
      SHOWN: "shown" + EVENT_KEY,
      HIDE: "hide" + EVENT_KEY,
      HIDDEN: "hidden" + EVENT_KEY,
      CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
    };
    var ClassName = {
      SHOW: 'show',
      COLLAPSE: 'collapse',
      COLLAPSING: 'collapsing',
      COLLAPSED: 'collapsed'
    };
    var Dimension = {
      WIDTH: 'width',
      HEIGHT: 'height'
    };
    var Selector = {
      ACTIVES: '.show, .collapsing',
      DATA_TOGGLE: '[data-toggle="collapse"]'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Collapse =
    /*#__PURE__*/
    function () {
      function Collapse(element, config) {
        this._isTransitioning = false;
        this._element = element;
        this._config = this._getConfig(config);
        this._triggerArray = $$$1.makeArray($$$1("[data-toggle=\"collapse\"][href=\"#" + element.id + "\"]," + ("[data-toggle=\"collapse\"][data-target=\"#" + element.id + "\"]")));
        var tabToggles = $$$1(Selector.DATA_TOGGLE);

        for (var i = 0; i < tabToggles.length; i++) {
          var elem = tabToggles[i];
          var selector = Util.getSelectorFromElement(elem);

          if (selector !== null && $$$1(selector).filter(element).length > 0) {
            this._selector = selector;

            this._triggerArray.push(elem);
          }
        }

        this._parent = this._config.parent ? this._getParent() : null;

        if (!this._config.parent) {
          this._addAriaAndCollapsedClass(this._element, this._triggerArray);
        }

        if (this._config.toggle) {
          this.toggle();
        }
      } // Getters


      var _proto = Collapse.prototype;

      // Public
      _proto.toggle = function toggle() {
        if ($$$1(this._element).hasClass(ClassName.SHOW)) {
          this.hide();
        } else {
          this.show();
        }
      };

      _proto.show = function show() {
        var _this = this;

        if (this._isTransitioning || $$$1(this._element).hasClass(ClassName.SHOW)) {
          return;
        }

        var actives;
        var activesData;

        if (this._parent) {
          actives = $$$1.makeArray($$$1(this._parent).find(Selector.ACTIVES).filter("[data-parent=\"" + this._config.parent + "\"]"));

          if (actives.length === 0) {
            actives = null;
          }
        }

        if (actives) {
          activesData = $$$1(actives).not(this._selector).data(DATA_KEY);

          if (activesData && activesData._isTransitioning) {
            return;
          }
        }

        var startEvent = $$$1.Event(Event.SHOW);
        $$$1(this._element).trigger(startEvent);

        if (startEvent.isDefaultPrevented()) {
          return;
        }

        if (actives) {
          Collapse._jQueryInterface.call($$$1(actives).not(this._selector), 'hide');

          if (!activesData) {
            $$$1(actives).data(DATA_KEY, null);
          }
        }

        var dimension = this._getDimension();

        $$$1(this._element).removeClass(ClassName.COLLAPSE).addClass(ClassName.COLLAPSING);
        this._element.style[dimension] = 0;

        if (this._triggerArray.length > 0) {
          $$$1(this._triggerArray).removeClass(ClassName.COLLAPSED).attr('aria-expanded', true);
        }

        this.setTransitioning(true);

        var complete = function complete() {
          $$$1(_this._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).addClass(ClassName.SHOW);
          _this._element.style[dimension] = '';

          _this.setTransitioning(false);

          $$$1(_this._element).trigger(Event.SHOWN);
        };

        var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
        var scrollSize = "scroll" + capitalizedDimension;
        var transitionDuration = Util.getTransitionDurationFromElement(this._element);
        $$$1(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
        this._element.style[dimension] = this._element[scrollSize] + "px";
      };

      _proto.hide = function hide() {
        var _this2 = this;

        if (this._isTransitioning || !$$$1(this._element).hasClass(ClassName.SHOW)) {
          return;
        }

        var startEvent = $$$1.Event(Event.HIDE);
        $$$1(this._element).trigger(startEvent);

        if (startEvent.isDefaultPrevented()) {
          return;
        }

        var dimension = this._getDimension();

        this._element.style[dimension] = this._element.getBoundingClientRect()[dimension] + "px";
        Util.reflow(this._element);
        $$$1(this._element).addClass(ClassName.COLLAPSING).removeClass(ClassName.COLLAPSE).removeClass(ClassName.SHOW);

        if (this._triggerArray.length > 0) {
          for (var i = 0; i < this._triggerArray.length; i++) {
            var trigger = this._triggerArray[i];
            var selector = Util.getSelectorFromElement(trigger);

            if (selector !== null) {
              var $elem = $$$1(selector);

              if (!$elem.hasClass(ClassName.SHOW)) {
                $$$1(trigger).addClass(ClassName.COLLAPSED).attr('aria-expanded', false);
              }
            }
          }
        }

        this.setTransitioning(true);

        var complete = function complete() {
          _this2.setTransitioning(false);

          $$$1(_this2._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).trigger(Event.HIDDEN);
        };

        this._element.style[dimension] = '';
        var transitionDuration = Util.getTransitionDurationFromElement(this._element);
        $$$1(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      };

      _proto.setTransitioning = function setTransitioning(isTransitioning) {
        this._isTransitioning = isTransitioning;
      };

      _proto.dispose = function dispose() {
        $$$1.removeData(this._element, DATA_KEY);
        this._config = null;
        this._parent = null;
        this._element = null;
        this._triggerArray = null;
        this._isTransitioning = null;
      }; // Private


      _proto._getConfig = function _getConfig(config) {
        config = _objectSpread({}, Default, config);
        config.toggle = Boolean(config.toggle); // Coerce string values

        Util.typeCheckConfig(NAME, config, DefaultType);
        return config;
      };

      _proto._getDimension = function _getDimension() {
        var hasWidth = $$$1(this._element).hasClass(Dimension.WIDTH);
        return hasWidth ? Dimension.WIDTH : Dimension.HEIGHT;
      };

      _proto._getParent = function _getParent() {
        var _this3 = this;

        var parent = null;

        if (Util.isElement(this._config.parent)) {
          parent = this._config.parent; // It's a jQuery object

          if (typeof this._config.parent.jquery !== 'undefined') {
            parent = this._config.parent[0];
          }
        } else {
          parent = $$$1(this._config.parent)[0];
        }

        var selector = "[data-toggle=\"collapse\"][data-parent=\"" + this._config.parent + "\"]";
        $$$1(parent).find(selector).each(function (i, element) {
          _this3._addAriaAndCollapsedClass(Collapse._getTargetFromElement(element), [element]);
        });
        return parent;
      };

      _proto._addAriaAndCollapsedClass = function _addAriaAndCollapsedClass(element, triggerArray) {
        if (element) {
          var isOpen = $$$1(element).hasClass(ClassName.SHOW);

          if (triggerArray.length > 0) {
            $$$1(triggerArray).toggleClass(ClassName.COLLAPSED, !isOpen).attr('aria-expanded', isOpen);
          }
        }
      }; // Static


      Collapse._getTargetFromElement = function _getTargetFromElement(element) {
        var selector = Util.getSelectorFromElement(element);
        return selector ? $$$1(selector)[0] : null;
      };

      Collapse._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var $this = $$$1(this);
          var data = $this.data(DATA_KEY);

          var _config = _objectSpread({}, Default, $this.data(), typeof config === 'object' && config ? config : {});

          if (!data && _config.toggle && /show|hide/.test(config)) {
            _config.toggle = false;
          }

          if (!data) {
            data = new Collapse(this, _config);
            $this.data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config]();
          }
        });
      };

      _createClass(Collapse, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default;
        }
      }]);

      return Collapse;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
      // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
      if (event.currentTarget.tagName === 'A') {
        event.preventDefault();
      }

      var $trigger = $$$1(this);
      var selector = Util.getSelectorFromElement(this);
      $$$1(selector).each(function () {
        var $target = $$$1(this);
        var data = $target.data(DATA_KEY);
        var config = data ? 'toggle' : $trigger.data();

        Collapse._jQueryInterface.call($target, config);
      });
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = Collapse._jQueryInterface;
    $$$1.fn[NAME].Constructor = Collapse;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Collapse._jQueryInterface;
    };

    return Collapse;
  }($);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.1): dropdown.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Dropdown = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'dropdown';
    var VERSION = '4.1.1';
    var DATA_KEY = 'bs.dropdown';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

    var SPACE_KEYCODE = 32; // KeyboardEvent.which value for space key

    var TAB_KEYCODE = 9; // KeyboardEvent.which value for tab key

    var ARROW_UP_KEYCODE = 38; // KeyboardEvent.which value for up arrow key

    var ARROW_DOWN_KEYCODE = 40; // KeyboardEvent.which value for down arrow key

    var RIGHT_MOUSE_BUTTON_WHICH = 3; // MouseEvent.which value for the right button (assuming a right-handed mouse)

    var REGEXP_KEYDOWN = new RegExp(ARROW_UP_KEYCODE + "|" + ARROW_DOWN_KEYCODE + "|" + ESCAPE_KEYCODE);
    var Event = {
      HIDE: "hide" + EVENT_KEY,
      HIDDEN: "hidden" + EVENT_KEY,
      SHOW: "show" + EVENT_KEY,
      SHOWN: "shown" + EVENT_KEY,
      CLICK: "click" + EVENT_KEY,
      CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY,
      KEYDOWN_DATA_API: "keydown" + EVENT_KEY + DATA_API_KEY,
      KEYUP_DATA_API: "keyup" + EVENT_KEY + DATA_API_KEY
    };
    var ClassName = {
      DISABLED: 'disabled',
      SHOW: 'show',
      DROPUP: 'dropup',
      DROPRIGHT: 'dropright',
      DROPLEFT: 'dropleft',
      MENURIGHT: 'dropdown-menu-right',
      MENULEFT: 'dropdown-menu-left',
      POSITION_STATIC: 'position-static'
    };
    var Selector = {
      DATA_TOGGLE: '[data-toggle="dropdown"]',
      FORM_CHILD: '.dropdown form',
      MENU: '.dropdown-menu',
      NAVBAR_NAV: '.navbar-nav',
      VISIBLE_ITEMS: '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)'
    };
    var AttachmentMap = {
      TOP: 'top-start',
      TOPEND: 'top-end',
      BOTTOM: 'bottom-start',
      BOTTOMEND: 'bottom-end',
      RIGHT: 'right-start',
      RIGHTEND: 'right-end',
      LEFT: 'left-start',
      LEFTEND: 'left-end'
    };
    var Default = {
      offset: 0,
      flip: true,
      boundary: 'scrollParent',
      reference: 'toggle',
      display: 'dynamic'
    };
    var DefaultType = {
      offset: '(number|string|function)',
      flip: 'boolean',
      boundary: '(string|element)',
      reference: '(string|element)',
      display: 'string'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Dropdown =
    /*#__PURE__*/
    function () {
      function Dropdown(element, config) {
        this._element = element;
        this._popper = null;
        this._config = this._getConfig(config);
        this._menu = this._getMenuElement();
        this._inNavbar = this._detectNavbar();

        this._addEventListeners();
      } // Getters


      var _proto = Dropdown.prototype;

      // Public
      _proto.toggle = function toggle() {
        if (this._element.disabled || $$$1(this._element).hasClass(ClassName.DISABLED)) {
          return;
        }

        var parent = Dropdown._getParentFromElement(this._element);

        var isActive = $$$1(this._menu).hasClass(ClassName.SHOW);

        Dropdown._clearMenus();

        if (isActive) {
          return;
        }

        var relatedTarget = {
          relatedTarget: this._element
        };
        var showEvent = $$$1.Event(Event.SHOW, relatedTarget);
        $$$1(parent).trigger(showEvent);

        if (showEvent.isDefaultPrevented()) {
          return;
        } // Disable totally Popper.js for Dropdown in Navbar


        if (!this._inNavbar) {
          /**
           * Check for Popper dependency
           * Popper - https://popper.js.org
           */
          if (typeof Popper === 'undefined') {
            throw new TypeError('Bootstrap dropdown require Popper.js (https://popper.js.org)');
          }

          var referenceElement = this._element;

          if (this._config.reference === 'parent') {
            referenceElement = parent;
          } else if (Util.isElement(this._config.reference)) {
            referenceElement = this._config.reference; // Check if it's jQuery element

            if (typeof this._config.reference.jquery !== 'undefined') {
              referenceElement = this._config.reference[0];
            }
          } // If boundary is not `scrollParent`, then set position to `static`
          // to allow the menu to "escape" the scroll parent's boundaries
          // https://github.com/twbs/bootstrap/issues/24251


          if (this._config.boundary !== 'scrollParent') {
            $$$1(parent).addClass(ClassName.POSITION_STATIC);
          }

          this._popper = new Popper(referenceElement, this._menu, this._getPopperConfig());
        } // If this is a touch-enabled device we add extra
        // empty mouseover listeners to the body's immediate children;
        // only needed because of broken event delegation on iOS
        // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html


        if ('ontouchstart' in document.documentElement && $$$1(parent).closest(Selector.NAVBAR_NAV).length === 0) {
          $$$1(document.body).children().on('mouseover', null, $$$1.noop);
        }

        this._element.focus();

        this._element.setAttribute('aria-expanded', true);

        $$$1(this._menu).toggleClass(ClassName.SHOW);
        $$$1(parent).toggleClass(ClassName.SHOW).trigger($$$1.Event(Event.SHOWN, relatedTarget));
      };

      _proto.dispose = function dispose() {
        $$$1.removeData(this._element, DATA_KEY);
        $$$1(this._element).off(EVENT_KEY);
        this._element = null;
        this._menu = null;

        if (this._popper !== null) {
          this._popper.destroy();

          this._popper = null;
        }
      };

      _proto.update = function update() {
        this._inNavbar = this._detectNavbar();

        if (this._popper !== null) {
          this._popper.scheduleUpdate();
        }
      }; // Private


      _proto._addEventListeners = function _addEventListeners() {
        var _this = this;

        $$$1(this._element).on(Event.CLICK, function (event) {
          event.preventDefault();
          event.stopPropagation();

          _this.toggle();
        });
      };

      _proto._getConfig = function _getConfig(config) {
        config = _objectSpread({}, this.constructor.Default, $$$1(this._element).data(), config);
        Util.typeCheckConfig(NAME, config, this.constructor.DefaultType);
        return config;
      };

      _proto._getMenuElement = function _getMenuElement() {
        if (!this._menu) {
          var parent = Dropdown._getParentFromElement(this._element);

          this._menu = $$$1(parent).find(Selector.MENU)[0];
        }

        return this._menu;
      };

      _proto._getPlacement = function _getPlacement() {
        var $parentDropdown = $$$1(this._element).parent();
        var placement = AttachmentMap.BOTTOM; // Handle dropup

        if ($parentDropdown.hasClass(ClassName.DROPUP)) {
          placement = AttachmentMap.TOP;

          if ($$$1(this._menu).hasClass(ClassName.MENURIGHT)) {
            placement = AttachmentMap.TOPEND;
          }
        } else if ($parentDropdown.hasClass(ClassName.DROPRIGHT)) {
          placement = AttachmentMap.RIGHT;
        } else if ($parentDropdown.hasClass(ClassName.DROPLEFT)) {
          placement = AttachmentMap.LEFT;
        } else if ($$$1(this._menu).hasClass(ClassName.MENURIGHT)) {
          placement = AttachmentMap.BOTTOMEND;
        }

        return placement;
      };

      _proto._detectNavbar = function _detectNavbar() {
        return $$$1(this._element).closest('.navbar').length > 0;
      };

      _proto._getPopperConfig = function _getPopperConfig() {
        var _this2 = this;

        var offsetConf = {};

        if (typeof this._config.offset === 'function') {
          offsetConf.fn = function (data) {
            data.offsets = _objectSpread({}, data.offsets, _this2._config.offset(data.offsets) || {});
            return data;
          };
        } else {
          offsetConf.offset = this._config.offset;
        }

        var popperConfig = {
          placement: this._getPlacement(),
          modifiers: {
            offset: offsetConf,
            flip: {
              enabled: this._config.flip
            },
            preventOverflow: {
              boundariesElement: this._config.boundary
            }
          } // Disable Popper.js if we have a static display

        };

        if (this._config.display === 'static') {
          popperConfig.modifiers.applyStyle = {
            enabled: false
          };
        }

        return popperConfig;
      }; // Static


      Dropdown._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $$$1(this).data(DATA_KEY);

          var _config = typeof config === 'object' ? config : null;

          if (!data) {
            data = new Dropdown(this, _config);
            $$$1(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config]();
          }
        });
      };

      Dropdown._clearMenus = function _clearMenus(event) {
        if (event && (event.which === RIGHT_MOUSE_BUTTON_WHICH || event.type === 'keyup' && event.which !== TAB_KEYCODE)) {
          return;
        }

        var toggles = $$$1.makeArray($$$1(Selector.DATA_TOGGLE));

        for (var i = 0; i < toggles.length; i++) {
          var parent = Dropdown._getParentFromElement(toggles[i]);

          var context = $$$1(toggles[i]).data(DATA_KEY);
          var relatedTarget = {
            relatedTarget: toggles[i]
          };

          if (!context) {
            continue;
          }

          var dropdownMenu = context._menu;

          if (!$$$1(parent).hasClass(ClassName.SHOW)) {
            continue;
          }

          if (event && (event.type === 'click' && /input|textarea/i.test(event.target.tagName) || event.type === 'keyup' && event.which === TAB_KEYCODE) && $$$1.contains(parent, event.target)) {
            continue;
          }

          var hideEvent = $$$1.Event(Event.HIDE, relatedTarget);
          $$$1(parent).trigger(hideEvent);

          if (hideEvent.isDefaultPrevented()) {
            continue;
          } // If this is a touch-enabled device we remove the extra
          // empty mouseover listeners we added for iOS support


          if ('ontouchstart' in document.documentElement) {
            $$$1(document.body).children().off('mouseover', null, $$$1.noop);
          }

          toggles[i].setAttribute('aria-expanded', 'false');
          $$$1(dropdownMenu).removeClass(ClassName.SHOW);
          $$$1(parent).removeClass(ClassName.SHOW).trigger($$$1.Event(Event.HIDDEN, relatedTarget));
        }
      };

      Dropdown._getParentFromElement = function _getParentFromElement(element) {
        var parent;
        var selector = Util.getSelectorFromElement(element);

        if (selector) {
          parent = $$$1(selector)[0];
        }

        return parent || element.parentNode;
      }; // eslint-disable-next-line complexity


      Dropdown._dataApiKeydownHandler = function _dataApiKeydownHandler(event) {
        // If not input/textarea:
        //  - And not a key in REGEXP_KEYDOWN => not a dropdown command
        // If input/textarea:
        //  - If space key => not a dropdown command
        //  - If key is other than escape
        //    - If key is not up or down => not a dropdown command
        //    - If trigger inside the menu => not a dropdown command
        if (/input|textarea/i.test(event.target.tagName) ? event.which === SPACE_KEYCODE || event.which !== ESCAPE_KEYCODE && (event.which !== ARROW_DOWN_KEYCODE && event.which !== ARROW_UP_KEYCODE || $$$1(event.target).closest(Selector.MENU).length) : !REGEXP_KEYDOWN.test(event.which)) {
          return;
        }

        event.preventDefault();
        event.stopPropagation();

        if (this.disabled || $$$1(this).hasClass(ClassName.DISABLED)) {
          return;
        }

        var parent = Dropdown._getParentFromElement(this);

        var isActive = $$$1(parent).hasClass(ClassName.SHOW);

        if (!isActive && (event.which !== ESCAPE_KEYCODE || event.which !== SPACE_KEYCODE) || isActive && (event.which === ESCAPE_KEYCODE || event.which === SPACE_KEYCODE)) {
          if (event.which === ESCAPE_KEYCODE) {
            var toggle = $$$1(parent).find(Selector.DATA_TOGGLE)[0];
            $$$1(toggle).trigger('focus');
          }

          $$$1(this).trigger('click');
          return;
        }

        var items = $$$1(parent).find(Selector.VISIBLE_ITEMS).get();

        if (items.length === 0) {
          return;
        }

        var index = items.indexOf(event.target);

        if (event.which === ARROW_UP_KEYCODE && index > 0) {
          // Up
          index--;
        }

        if (event.which === ARROW_DOWN_KEYCODE && index < items.length - 1) {
          // Down
          index++;
        }

        if (index < 0) {
          index = 0;
        }

        items[index].focus();
      };

      _createClass(Dropdown, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default;
        }
      }, {
        key: "DefaultType",
        get: function get() {
          return DefaultType;
        }
      }]);

      return Dropdown;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(document).on(Event.KEYDOWN_DATA_API, Selector.DATA_TOGGLE, Dropdown._dataApiKeydownHandler).on(Event.KEYDOWN_DATA_API, Selector.MENU, Dropdown._dataApiKeydownHandler).on(Event.CLICK_DATA_API + " " + Event.KEYUP_DATA_API, Dropdown._clearMenus).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
      event.preventDefault();
      event.stopPropagation();

      Dropdown._jQueryInterface.call($$$1(this), 'toggle');
    }).on(Event.CLICK_DATA_API, Selector.FORM_CHILD, function (e) {
      e.stopPropagation();
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = Dropdown._jQueryInterface;
    $$$1.fn[NAME].Constructor = Dropdown;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Dropdown._jQueryInterface;
    };

    return Dropdown;
  }($, Popper);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.1): modal.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Modal = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'modal';
    var VERSION = '4.1.1';
    var DATA_KEY = 'bs.modal';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

    var Default = {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: true
    };
    var DefaultType = {
      backdrop: '(boolean|string)',
      keyboard: 'boolean',
      focus: 'boolean',
      show: 'boolean'
    };
    var Event = {
      HIDE: "hide" + EVENT_KEY,
      HIDDEN: "hidden" + EVENT_KEY,
      SHOW: "show" + EVENT_KEY,
      SHOWN: "shown" + EVENT_KEY,
      FOCUSIN: "focusin" + EVENT_KEY,
      RESIZE: "resize" + EVENT_KEY,
      CLICK_DISMISS: "click.dismiss" + EVENT_KEY,
      KEYDOWN_DISMISS: "keydown.dismiss" + EVENT_KEY,
      MOUSEUP_DISMISS: "mouseup.dismiss" + EVENT_KEY,
      MOUSEDOWN_DISMISS: "mousedown.dismiss" + EVENT_KEY,
      CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
    };
    var ClassName = {
      SCROLLBAR_MEASURER: 'modal-scrollbar-measure',
      BACKDROP: 'modal-backdrop',
      OPEN: 'modal-open',
      FADE: 'fade',
      SHOW: 'show'
    };
    var Selector = {
      DIALOG: '.modal-dialog',
      DATA_TOGGLE: '[data-toggle="modal"]',
      DATA_DISMISS: '[data-dismiss="modal"]',
      FIXED_CONTENT: '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top',
      STICKY_CONTENT: '.sticky-top',
      NAVBAR_TOGGLER: '.navbar-toggler'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Modal =
    /*#__PURE__*/
    function () {
      function Modal(element, config) {
        this._config = this._getConfig(config);
        this._element = element;
        this._dialog = $$$1(element).find(Selector.DIALOG)[0];
        this._backdrop = null;
        this._isShown = false;
        this._isBodyOverflowing = false;
        this._ignoreBackdropClick = false;
        this._scrollbarWidth = 0;
      } // Getters


      var _proto = Modal.prototype;

      // Public
      _proto.toggle = function toggle(relatedTarget) {
        return this._isShown ? this.hide() : this.show(relatedTarget);
      };

      _proto.show = function show(relatedTarget) {
        var _this = this;

        if (this._isTransitioning || this._isShown) {
          return;
        }

        if ($$$1(this._element).hasClass(ClassName.FADE)) {
          this._isTransitioning = true;
        }

        var showEvent = $$$1.Event(Event.SHOW, {
          relatedTarget: relatedTarget
        });
        $$$1(this._element).trigger(showEvent);

        if (this._isShown || showEvent.isDefaultPrevented()) {
          return;
        }

        this._isShown = true;

        this._checkScrollbar();

        this._setScrollbar();

        this._adjustDialog();

        $$$1(document.body).addClass(ClassName.OPEN);

        this._setEscapeEvent();

        this._setResizeEvent();

        $$$1(this._element).on(Event.CLICK_DISMISS, Selector.DATA_DISMISS, function (event) {
          return _this.hide(event);
        });
        $$$1(this._dialog).on(Event.MOUSEDOWN_DISMISS, function () {
          $$$1(_this._element).one(Event.MOUSEUP_DISMISS, function (event) {
            if ($$$1(event.target).is(_this._element)) {
              _this._ignoreBackdropClick = true;
            }
          });
        });

        this._showBackdrop(function () {
          return _this._showElement(relatedTarget);
        });
      };

      _proto.hide = function hide(event) {
        var _this2 = this;

        if (event) {
          event.preventDefault();
        }

        if (this._isTransitioning || !this._isShown) {
          return;
        }

        var hideEvent = $$$1.Event(Event.HIDE);
        $$$1(this._element).trigger(hideEvent);

        if (!this._isShown || hideEvent.isDefaultPrevented()) {
          return;
        }

        this._isShown = false;
        var transition = $$$1(this._element).hasClass(ClassName.FADE);

        if (transition) {
          this._isTransitioning = true;
        }

        this._setEscapeEvent();

        this._setResizeEvent();

        $$$1(document).off(Event.FOCUSIN);
        $$$1(this._element).removeClass(ClassName.SHOW);
        $$$1(this._element).off(Event.CLICK_DISMISS);
        $$$1(this._dialog).off(Event.MOUSEDOWN_DISMISS);

        if (transition) {
          var transitionDuration = Util.getTransitionDurationFromElement(this._element);
          $$$1(this._element).one(Util.TRANSITION_END, function (event) {
            return _this2._hideModal(event);
          }).emulateTransitionEnd(transitionDuration);
        } else {
          this._hideModal();
        }
      };

      _proto.dispose = function dispose() {
        $$$1.removeData(this._element, DATA_KEY);
        $$$1(window, document, this._element, this._backdrop).off(EVENT_KEY);
        this._config = null;
        this._element = null;
        this._dialog = null;
        this._backdrop = null;
        this._isShown = null;
        this._isBodyOverflowing = null;
        this._ignoreBackdropClick = null;
        this._scrollbarWidth = null;
      };

      _proto.handleUpdate = function handleUpdate() {
        this._adjustDialog();
      }; // Private


      _proto._getConfig = function _getConfig(config) {
        config = _objectSpread({}, Default, config);
        Util.typeCheckConfig(NAME, config, DefaultType);
        return config;
      };

      _proto._showElement = function _showElement(relatedTarget) {
        var _this3 = this;

        var transition = $$$1(this._element).hasClass(ClassName.FADE);

        if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
          // Don't move modal's DOM position
          document.body.appendChild(this._element);
        }

        this._element.style.display = 'block';

        this._element.removeAttribute('aria-hidden');

        this._element.scrollTop = 0;

        if (transition) {
          Util.reflow(this._element);
        }

        $$$1(this._element).addClass(ClassName.SHOW);

        if (this._config.focus) {
          this._enforceFocus();
        }

        var shownEvent = $$$1.Event(Event.SHOWN, {
          relatedTarget: relatedTarget
        });

        var transitionComplete = function transitionComplete() {
          if (_this3._config.focus) {
            _this3._element.focus();
          }

          _this3._isTransitioning = false;
          $$$1(_this3._element).trigger(shownEvent);
        };

        if (transition) {
          var transitionDuration = Util.getTransitionDurationFromElement(this._element);
          $$$1(this._dialog).one(Util.TRANSITION_END, transitionComplete).emulateTransitionEnd(transitionDuration);
        } else {
          transitionComplete();
        }
      };

      _proto._enforceFocus = function _enforceFocus() {
        var _this4 = this;

        $$$1(document).off(Event.FOCUSIN) // Guard against infinite focus loop
        .on(Event.FOCUSIN, function (event) {
          if (document !== event.target && _this4._element !== event.target && $$$1(_this4._element).has(event.target).length === 0) {
            _this4._element.focus();
          }
        });
      };

      _proto._setEscapeEvent = function _setEscapeEvent() {
        var _this5 = this;

        if (this._isShown && this._config.keyboard) {
          $$$1(this._element).on(Event.KEYDOWN_DISMISS, function (event) {
            if (event.which === ESCAPE_KEYCODE) {
              event.preventDefault();

              _this5.hide();
            }
          });
        } else if (!this._isShown) {
          $$$1(this._element).off(Event.KEYDOWN_DISMISS);
        }
      };

      _proto._setResizeEvent = function _setResizeEvent() {
        var _this6 = this;

        if (this._isShown) {
          $$$1(window).on(Event.RESIZE, function (event) {
            return _this6.handleUpdate(event);
          });
        } else {
          $$$1(window).off(Event.RESIZE);
        }
      };

      _proto._hideModal = function _hideModal() {
        var _this7 = this;

        this._element.style.display = 'none';

        this._element.setAttribute('aria-hidden', true);

        this._isTransitioning = false;

        this._showBackdrop(function () {
          $$$1(document.body).removeClass(ClassName.OPEN);

          _this7._resetAdjustments();

          _this7._resetScrollbar();

          $$$1(_this7._element).trigger(Event.HIDDEN);
        });
      };

      _proto._removeBackdrop = function _removeBackdrop() {
        if (this._backdrop) {
          $$$1(this._backdrop).remove();
          this._backdrop = null;
        }
      };

      _proto._showBackdrop = function _showBackdrop(callback) {
        var _this8 = this;

        var animate = $$$1(this._element).hasClass(ClassName.FADE) ? ClassName.FADE : '';

        if (this._isShown && this._config.backdrop) {
          this._backdrop = document.createElement('div');
          this._backdrop.className = ClassName.BACKDROP;

          if (animate) {
            $$$1(this._backdrop).addClass(animate);
          }

          $$$1(this._backdrop).appendTo(document.body);
          $$$1(this._element).on(Event.CLICK_DISMISS, function (event) {
            if (_this8._ignoreBackdropClick) {
              _this8._ignoreBackdropClick = false;
              return;
            }

            if (event.target !== event.currentTarget) {
              return;
            }

            if (_this8._config.backdrop === 'static') {
              _this8._element.focus();
            } else {
              _this8.hide();
            }
          });

          if (animate) {
            Util.reflow(this._backdrop);
          }

          $$$1(this._backdrop).addClass(ClassName.SHOW);

          if (!callback) {
            return;
          }

          if (!animate) {
            callback();
            return;
          }

          var backdropTransitionDuration = Util.getTransitionDurationFromElement(this._backdrop);
          $$$1(this._backdrop).one(Util.TRANSITION_END, callback).emulateTransitionEnd(backdropTransitionDuration);
        } else if (!this._isShown && this._backdrop) {
          $$$1(this._backdrop).removeClass(ClassName.SHOW);

          var callbackRemove = function callbackRemove() {
            _this8._removeBackdrop();

            if (callback) {
              callback();
            }
          };

          if ($$$1(this._element).hasClass(ClassName.FADE)) {
            var _backdropTransitionDuration = Util.getTransitionDurationFromElement(this._backdrop);

            $$$1(this._backdrop).one(Util.TRANSITION_END, callbackRemove).emulateTransitionEnd(_backdropTransitionDuration);
          } else {
            callbackRemove();
          }
        } else if (callback) {
          callback();
        }
      }; // ----------------------------------------------------------------------
      // the following methods are used to handle overflowing modals
      // todo (fat): these should probably be refactored out of modal.js
      // ----------------------------------------------------------------------


      _proto._adjustDialog = function _adjustDialog() {
        var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

        if (!this._isBodyOverflowing && isModalOverflowing) {
          this._element.style.paddingLeft = this._scrollbarWidth + "px";
        }

        if (this._isBodyOverflowing && !isModalOverflowing) {
          this._element.style.paddingRight = this._scrollbarWidth + "px";
        }
      };

      _proto._resetAdjustments = function _resetAdjustments() {
        this._element.style.paddingLeft = '';
        this._element.style.paddingRight = '';
      };

      _proto._checkScrollbar = function _checkScrollbar() {
        var rect = document.body.getBoundingClientRect();
        this._isBodyOverflowing = rect.left + rect.right < window.innerWidth;
        this._scrollbarWidth = this._getScrollbarWidth();
      };

      _proto._setScrollbar = function _setScrollbar() {
        var _this9 = this;

        if (this._isBodyOverflowing) {
          // Note: DOMNode.style.paddingRight returns the actual value or '' if not set
          //   while $(DOMNode).css('padding-right') returns the calculated value or 0 if not set
          // Adjust fixed content padding
          $$$1(Selector.FIXED_CONTENT).each(function (index, element) {
            var actualPadding = $$$1(element)[0].style.paddingRight;
            var calculatedPadding = $$$1(element).css('padding-right');
            $$$1(element).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + _this9._scrollbarWidth + "px");
          }); // Adjust sticky content margin

          $$$1(Selector.STICKY_CONTENT).each(function (index, element) {
            var actualMargin = $$$1(element)[0].style.marginRight;
            var calculatedMargin = $$$1(element).css('margin-right');
            $$$1(element).data('margin-right', actualMargin).css('margin-right', parseFloat(calculatedMargin) - _this9._scrollbarWidth + "px");
          }); // Adjust navbar-toggler margin

          $$$1(Selector.NAVBAR_TOGGLER).each(function (index, element) {
            var actualMargin = $$$1(element)[0].style.marginRight;
            var calculatedMargin = $$$1(element).css('margin-right');
            $$$1(element).data('margin-right', actualMargin).css('margin-right', parseFloat(calculatedMargin) + _this9._scrollbarWidth + "px");
          }); // Adjust body padding

          var actualPadding = document.body.style.paddingRight;
          var calculatedPadding = $$$1(document.body).css('padding-right');
          $$$1(document.body).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + this._scrollbarWidth + "px");
        }
      };

      _proto._resetScrollbar = function _resetScrollbar() {
        // Restore fixed content padding
        $$$1(Selector.FIXED_CONTENT).each(function (index, element) {
          var padding = $$$1(element).data('padding-right');

          if (typeof padding !== 'undefined') {
            $$$1(element).css('padding-right', padding).removeData('padding-right');
          }
        }); // Restore sticky content and navbar-toggler margin

        $$$1(Selector.STICKY_CONTENT + ", " + Selector.NAVBAR_TOGGLER).each(function (index, element) {
          var margin = $$$1(element).data('margin-right');

          if (typeof margin !== 'undefined') {
            $$$1(element).css('margin-right', margin).removeData('margin-right');
          }
        }); // Restore body padding

        var padding = $$$1(document.body).data('padding-right');

        if (typeof padding !== 'undefined') {
          $$$1(document.body).css('padding-right', padding).removeData('padding-right');
        }
      };

      _proto._getScrollbarWidth = function _getScrollbarWidth() {
        // thx d.walsh
        var scrollDiv = document.createElement('div');
        scrollDiv.className = ClassName.SCROLLBAR_MEASURER;
        document.body.appendChild(scrollDiv);
        var scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
        document.body.removeChild(scrollDiv);
        return scrollbarWidth;
      }; // Static


      Modal._jQueryInterface = function _jQueryInterface(config, relatedTarget) {
        return this.each(function () {
          var data = $$$1(this).data(DATA_KEY);

          var _config = _objectSpread({}, Default, $$$1(this).data(), typeof config === 'object' && config ? config : {});

          if (!data) {
            data = new Modal(this, _config);
            $$$1(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config](relatedTarget);
          } else if (_config.show) {
            data.show(relatedTarget);
          }
        });
      };

      _createClass(Modal, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default;
        }
      }]);

      return Modal;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
      var _this10 = this;

      var target;
      var selector = Util.getSelectorFromElement(this);

      if (selector) {
        target = $$$1(selector)[0];
      }

      var config = $$$1(target).data(DATA_KEY) ? 'toggle' : _objectSpread({}, $$$1(target).data(), $$$1(this).data());

      if (this.tagName === 'A' || this.tagName === 'AREA') {
        event.preventDefault();
      }

      var $target = $$$1(target).one(Event.SHOW, function (showEvent) {
        if (showEvent.isDefaultPrevented()) {
          // Only register focus restorer if modal will actually get shown
          return;
        }

        $target.one(Event.HIDDEN, function () {
          if ($$$1(_this10).is(':visible')) {
            _this10.focus();
          }
        });
      });

      Modal._jQueryInterface.call($$$1(target), config, this);
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = Modal._jQueryInterface;
    $$$1.fn[NAME].Constructor = Modal;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Modal._jQueryInterface;
    };

    return Modal;
  }($);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.1): tooltip.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Tooltip = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'tooltip';
    var VERSION = '4.1.1';
    var DATA_KEY = 'bs.tooltip';
    var EVENT_KEY = "." + DATA_KEY;
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var CLASS_PREFIX = 'bs-tooltip';
    var BSCLS_PREFIX_REGEX = new RegExp("(^|\\s)" + CLASS_PREFIX + "\\S+", 'g');
    var DefaultType = {
      animation: 'boolean',
      template: 'string',
      title: '(string|element|function)',
      trigger: 'string',
      delay: '(number|object)',
      html: 'boolean',
      selector: '(string|boolean)',
      placement: '(string|function)',
      offset: '(number|string)',
      container: '(string|element|boolean)',
      fallbackPlacement: '(string|array)',
      boundary: '(string|element)'
    };
    var AttachmentMap = {
      AUTO: 'auto',
      TOP: 'top',
      RIGHT: 'right',
      BOTTOM: 'bottom',
      LEFT: 'left'
    };
    var Default = {
      animation: true,
      template: '<div class="tooltip" role="tooltip">' + '<div class="arrow"></div>' + '<div class="tooltip-inner"></div></div>',
      trigger: 'hover focus',
      title: '',
      delay: 0,
      html: false,
      selector: false,
      placement: 'top',
      offset: 0,
      container: false,
      fallbackPlacement: 'flip',
      boundary: 'scrollParent'
    };
    var HoverState = {
      SHOW: 'show',
      OUT: 'out'
    };
    var Event = {
      HIDE: "hide" + EVENT_KEY,
      HIDDEN: "hidden" + EVENT_KEY,
      SHOW: "show" + EVENT_KEY,
      SHOWN: "shown" + EVENT_KEY,
      INSERTED: "inserted" + EVENT_KEY,
      CLICK: "click" + EVENT_KEY,
      FOCUSIN: "focusin" + EVENT_KEY,
      FOCUSOUT: "focusout" + EVENT_KEY,
      MOUSEENTER: "mouseenter" + EVENT_KEY,
      MOUSELEAVE: "mouseleave" + EVENT_KEY
    };
    var ClassName = {
      FADE: 'fade',
      SHOW: 'show'
    };
    var Selector = {
      TOOLTIP: '.tooltip',
      TOOLTIP_INNER: '.tooltip-inner',
      ARROW: '.arrow'
    };
    var Trigger = {
      HOVER: 'hover',
      FOCUS: 'focus',
      CLICK: 'click',
      MANUAL: 'manual'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Tooltip =
    /*#__PURE__*/
    function () {
      function Tooltip(element, config) {
        /**
         * Check for Popper dependency
         * Popper - https://popper.js.org
         */
        if (typeof Popper === 'undefined') {
          throw new TypeError('Bootstrap tooltips require Popper.js (https://popper.js.org)');
        } // private


        this._isEnabled = true;
        this._timeout = 0;
        this._hoverState = '';
        this._activeTrigger = {};
        this._popper = null; // Protected

        this.element = element;
        this.config = this._getConfig(config);
        this.tip = null;

        this._setListeners();
      } // Getters


      var _proto = Tooltip.prototype;

      // Public
      _proto.enable = function enable() {
        this._isEnabled = true;
      };

      _proto.disable = function disable() {
        this._isEnabled = false;
      };

      _proto.toggleEnabled = function toggleEnabled() {
        this._isEnabled = !this._isEnabled;
      };

      _proto.toggle = function toggle(event) {
        if (!this._isEnabled) {
          return;
        }

        if (event) {
          var dataKey = this.constructor.DATA_KEY;
          var context = $$$1(event.currentTarget).data(dataKey);

          if (!context) {
            context = new this.constructor(event.currentTarget, this._getDelegateConfig());
            $$$1(event.currentTarget).data(dataKey, context);
          }

          context._activeTrigger.click = !context._activeTrigger.click;

          if (context._isWithActiveTrigger()) {
            context._enter(null, context);
          } else {
            context._leave(null, context);
          }
        } else {
          if ($$$1(this.getTipElement()).hasClass(ClassName.SHOW)) {
            this._leave(null, this);

            return;
          }

          this._enter(null, this);
        }
      };

      _proto.dispose = function dispose() {
        clearTimeout(this._timeout);
        $$$1.removeData(this.element, this.constructor.DATA_KEY);
        $$$1(this.element).off(this.constructor.EVENT_KEY);
        $$$1(this.element).closest('.modal').off('hide.bs.modal');

        if (this.tip) {
          $$$1(this.tip).remove();
        }

        this._isEnabled = null;
        this._timeout = null;
        this._hoverState = null;
        this._activeTrigger = null;

        if (this._popper !== null) {
          this._popper.destroy();
        }

        this._popper = null;
        this.element = null;
        this.config = null;
        this.tip = null;
      };

      _proto.show = function show() {
        var _this = this;

        if ($$$1(this.element).css('display') === 'none') {
          throw new Error('Please use show on visible elements');
        }

        var showEvent = $$$1.Event(this.constructor.Event.SHOW);

        if (this.isWithContent() && this._isEnabled) {
          $$$1(this.element).trigger(showEvent);
          var isInTheDom = $$$1.contains(this.element.ownerDocument.documentElement, this.element);

          if (showEvent.isDefaultPrevented() || !isInTheDom) {
            return;
          }

          var tip = this.getTipElement();
          var tipId = Util.getUID(this.constructor.NAME);
          tip.setAttribute('id', tipId);
          this.element.setAttribute('aria-describedby', tipId);
          this.setContent();

          if (this.config.animation) {
            $$$1(tip).addClass(ClassName.FADE);
          }

          var placement = typeof this.config.placement === 'function' ? this.config.placement.call(this, tip, this.element) : this.config.placement;

          var attachment = this._getAttachment(placement);

          this.addAttachmentClass(attachment);
          var container = this.config.container === false ? document.body : $$$1(this.config.container);
          $$$1(tip).data(this.constructor.DATA_KEY, this);

          if (!$$$1.contains(this.element.ownerDocument.documentElement, this.tip)) {
            $$$1(tip).appendTo(container);
          }

          $$$1(this.element).trigger(this.constructor.Event.INSERTED);
          this._popper = new Popper(this.element, tip, {
            placement: attachment,
            modifiers: {
              offset: {
                offset: this.config.offset
              },
              flip: {
                behavior: this.config.fallbackPlacement
              },
              arrow: {
                element: Selector.ARROW
              },
              preventOverflow: {
                boundariesElement: this.config.boundary
              }
            },
            onCreate: function onCreate(data) {
              if (data.originalPlacement !== data.placement) {
                _this._handlePopperPlacementChange(data);
              }
            },
            onUpdate: function onUpdate(data) {
              _this._handlePopperPlacementChange(data);
            }
          });
          $$$1(tip).addClass(ClassName.SHOW); // If this is a touch-enabled device we add extra
          // empty mouseover listeners to the body's immediate children;
          // only needed because of broken event delegation on iOS
          // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html

          if ('ontouchstart' in document.documentElement) {
            $$$1(document.body).children().on('mouseover', null, $$$1.noop);
          }

          var complete = function complete() {
            if (_this.config.animation) {
              _this._fixTransition();
            }

            var prevHoverState = _this._hoverState;
            _this._hoverState = null;
            $$$1(_this.element).trigger(_this.constructor.Event.SHOWN);

            if (prevHoverState === HoverState.OUT) {
              _this._leave(null, _this);
            }
          };

          if ($$$1(this.tip).hasClass(ClassName.FADE)) {
            var transitionDuration = Util.getTransitionDurationFromElement(this.tip);
            $$$1(this.tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
          } else {
            complete();
          }
        }
      };

      _proto.hide = function hide(callback) {
        var _this2 = this;

        var tip = this.getTipElement();
        var hideEvent = $$$1.Event(this.constructor.Event.HIDE);

        var complete = function complete() {
          if (_this2._hoverState !== HoverState.SHOW && tip.parentNode) {
            tip.parentNode.removeChild(tip);
          }

          _this2._cleanTipClass();

          _this2.element.removeAttribute('aria-describedby');

          $$$1(_this2.element).trigger(_this2.constructor.Event.HIDDEN);

          if (_this2._popper !== null) {
            _this2._popper.destroy();
          }

          if (callback) {
            callback();
          }
        };

        $$$1(this.element).trigger(hideEvent);

        if (hideEvent.isDefaultPrevented()) {
          return;
        }

        $$$1(tip).removeClass(ClassName.SHOW); // If this is a touch-enabled device we remove the extra
        // empty mouseover listeners we added for iOS support

        if ('ontouchstart' in document.documentElement) {
          $$$1(document.body).children().off('mouseover', null, $$$1.noop);
        }

        this._activeTrigger[Trigger.CLICK] = false;
        this._activeTrigger[Trigger.FOCUS] = false;
        this._activeTrigger[Trigger.HOVER] = false;

        if ($$$1(this.tip).hasClass(ClassName.FADE)) {
          var transitionDuration = Util.getTransitionDurationFromElement(tip);
          $$$1(tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
        } else {
          complete();
        }

        this._hoverState = '';
      };

      _proto.update = function update() {
        if (this._popper !== null) {
          this._popper.scheduleUpdate();
        }
      }; // Protected


      _proto.isWithContent = function isWithContent() {
        return Boolean(this.getTitle());
      };

      _proto.addAttachmentClass = function addAttachmentClass(attachment) {
        $$$1(this.getTipElement()).addClass(CLASS_PREFIX + "-" + attachment);
      };

      _proto.getTipElement = function getTipElement() {
        this.tip = this.tip || $$$1(this.config.template)[0];
        return this.tip;
      };

      _proto.setContent = function setContent() {
        var $tip = $$$1(this.getTipElement());
        this.setElementContent($tip.find(Selector.TOOLTIP_INNER), this.getTitle());
        $tip.removeClass(ClassName.FADE + " " + ClassName.SHOW);
      };

      _proto.setElementContent = function setElementContent($element, content) {
        var html = this.config.html;

        if (typeof content === 'object' && (content.nodeType || content.jquery)) {
          // Content is a DOM node or a jQuery
          if (html) {
            if (!$$$1(content).parent().is($element)) {
              $element.empty().append(content);
            }
          } else {
            $element.text($$$1(content).text());
          }
        } else {
          $element[html ? 'html' : 'text'](content);
        }
      };

      _proto.getTitle = function getTitle() {
        var title = this.element.getAttribute('data-original-title');

        if (!title) {
          title = typeof this.config.title === 'function' ? this.config.title.call(this.element) : this.config.title;
        }

        return title;
      }; // Private


      _proto._getAttachment = function _getAttachment(placement) {
        return AttachmentMap[placement.toUpperCase()];
      };

      _proto._setListeners = function _setListeners() {
        var _this3 = this;

        var triggers = this.config.trigger.split(' ');
        triggers.forEach(function (trigger) {
          if (trigger === 'click') {
            $$$1(_this3.element).on(_this3.constructor.Event.CLICK, _this3.config.selector, function (event) {
              return _this3.toggle(event);
            });
          } else if (trigger !== Trigger.MANUAL) {
            var eventIn = trigger === Trigger.HOVER ? _this3.constructor.Event.MOUSEENTER : _this3.constructor.Event.FOCUSIN;
            var eventOut = trigger === Trigger.HOVER ? _this3.constructor.Event.MOUSELEAVE : _this3.constructor.Event.FOCUSOUT;
            $$$1(_this3.element).on(eventIn, _this3.config.selector, function (event) {
              return _this3._enter(event);
            }).on(eventOut, _this3.config.selector, function (event) {
              return _this3._leave(event);
            });
          }

          $$$1(_this3.element).closest('.modal').on('hide.bs.modal', function () {
            return _this3.hide();
          });
        });

        if (this.config.selector) {
          this.config = _objectSpread({}, this.config, {
            trigger: 'manual',
            selector: ''
          });
        } else {
          this._fixTitle();
        }
      };

      _proto._fixTitle = function _fixTitle() {
        var titleType = typeof this.element.getAttribute('data-original-title');

        if (this.element.getAttribute('title') || titleType !== 'string') {
          this.element.setAttribute('data-original-title', this.element.getAttribute('title') || '');
          this.element.setAttribute('title', '');
        }
      };

      _proto._enter = function _enter(event, context) {
        var dataKey = this.constructor.DATA_KEY;
        context = context || $$$1(event.currentTarget).data(dataKey);

        if (!context) {
          context = new this.constructor(event.currentTarget, this._getDelegateConfig());
          $$$1(event.currentTarget).data(dataKey, context);
        }

        if (event) {
          context._activeTrigger[event.type === 'focusin' ? Trigger.FOCUS : Trigger.HOVER] = true;
        }

        if ($$$1(context.getTipElement()).hasClass(ClassName.SHOW) || context._hoverState === HoverState.SHOW) {
          context._hoverState = HoverState.SHOW;
          return;
        }

        clearTimeout(context._timeout);
        context._hoverState = HoverState.SHOW;

        if (!context.config.delay || !context.config.delay.show) {
          context.show();
          return;
        }

        context._timeout = setTimeout(function () {
          if (context._hoverState === HoverState.SHOW) {
            context.show();
          }
        }, context.config.delay.show);
      };

      _proto._leave = function _leave(event, context) {
        var dataKey = this.constructor.DATA_KEY;
        context = context || $$$1(event.currentTarget).data(dataKey);

        if (!context) {
          context = new this.constructor(event.currentTarget, this._getDelegateConfig());
          $$$1(event.currentTarget).data(dataKey, context);
        }

        if (event) {
          context._activeTrigger[event.type === 'focusout' ? Trigger.FOCUS : Trigger.HOVER] = false;
        }

        if (context._isWithActiveTrigger()) {
          return;
        }

        clearTimeout(context._timeout);
        context._hoverState = HoverState.OUT;

        if (!context.config.delay || !context.config.delay.hide) {
          context.hide();
          return;
        }

        context._timeout = setTimeout(function () {
          if (context._hoverState === HoverState.OUT) {
            context.hide();
          }
        }, context.config.delay.hide);
      };

      _proto._isWithActiveTrigger = function _isWithActiveTrigger() {
        for (var trigger in this._activeTrigger) {
          if (this._activeTrigger[trigger]) {
            return true;
          }
        }

        return false;
      };

      _proto._getConfig = function _getConfig(config) {
        config = _objectSpread({}, this.constructor.Default, $$$1(this.element).data(), typeof config === 'object' && config ? config : {});

        if (typeof config.delay === 'number') {
          config.delay = {
            show: config.delay,
            hide: config.delay
          };
        }

        if (typeof config.title === 'number') {
          config.title = config.title.toString();
        }

        if (typeof config.content === 'number') {
          config.content = config.content.toString();
        }

        Util.typeCheckConfig(NAME, config, this.constructor.DefaultType);
        return config;
      };

      _proto._getDelegateConfig = function _getDelegateConfig() {
        var config = {};

        if (this.config) {
          for (var key in this.config) {
            if (this.constructor.Default[key] !== this.config[key]) {
              config[key] = this.config[key];
            }
          }
        }

        return config;
      };

      _proto._cleanTipClass = function _cleanTipClass() {
        var $tip = $$$1(this.getTipElement());
        var tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX);

        if (tabClass !== null && tabClass.length > 0) {
          $tip.removeClass(tabClass.join(''));
        }
      };

      _proto._handlePopperPlacementChange = function _handlePopperPlacementChange(data) {
        this._cleanTipClass();

        this.addAttachmentClass(this._getAttachment(data.placement));
      };

      _proto._fixTransition = function _fixTransition() {
        var tip = this.getTipElement();
        var initConfigAnimation = this.config.animation;

        if (tip.getAttribute('x-placement') !== null) {
          return;
        }

        $$$1(tip).removeClass(ClassName.FADE);
        this.config.animation = false;
        this.hide();
        this.show();
        this.config.animation = initConfigAnimation;
      }; // Static


      Tooltip._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $$$1(this).data(DATA_KEY);

          var _config = typeof config === 'object' && config;

          if (!data && /dispose|hide/.test(config)) {
            return;
          }

          if (!data) {
            data = new Tooltip(this, _config);
            $$$1(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config]();
          }
        });
      };

      _createClass(Tooltip, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default;
        }
      }, {
        key: "NAME",
        get: function get() {
          return NAME;
        }
      }, {
        key: "DATA_KEY",
        get: function get() {
          return DATA_KEY;
        }
      }, {
        key: "Event",
        get: function get() {
          return Event;
        }
      }, {
        key: "EVENT_KEY",
        get: function get() {
          return EVENT_KEY;
        }
      }, {
        key: "DefaultType",
        get: function get() {
          return DefaultType;
        }
      }]);

      return Tooltip;
    }();
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */


    $$$1.fn[NAME] = Tooltip._jQueryInterface;
    $$$1.fn[NAME].Constructor = Tooltip;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Tooltip._jQueryInterface;
    };

    return Tooltip;
  }($, Popper);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.1): popover.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Popover = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'popover';
    var VERSION = '4.1.1';
    var DATA_KEY = 'bs.popover';
    var EVENT_KEY = "." + DATA_KEY;
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var CLASS_PREFIX = 'bs-popover';
    var BSCLS_PREFIX_REGEX = new RegExp("(^|\\s)" + CLASS_PREFIX + "\\S+", 'g');

    var Default = _objectSpread({}, Tooltip.Default, {
      placement: 'right',
      trigger: 'click',
      content: '',
      template: '<div class="popover" role="tooltip">' + '<div class="arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div></div>'
    });

    var DefaultType = _objectSpread({}, Tooltip.DefaultType, {
      content: '(string|element|function)'
    });

    var ClassName = {
      FADE: 'fade',
      SHOW: 'show'
    };
    var Selector = {
      TITLE: '.popover-header',
      CONTENT: '.popover-body'
    };
    var Event = {
      HIDE: "hide" + EVENT_KEY,
      HIDDEN: "hidden" + EVENT_KEY,
      SHOW: "show" + EVENT_KEY,
      SHOWN: "shown" + EVENT_KEY,
      INSERTED: "inserted" + EVENT_KEY,
      CLICK: "click" + EVENT_KEY,
      FOCUSIN: "focusin" + EVENT_KEY,
      FOCUSOUT: "focusout" + EVENT_KEY,
      MOUSEENTER: "mouseenter" + EVENT_KEY,
      MOUSELEAVE: "mouseleave" + EVENT_KEY
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Popover =
    /*#__PURE__*/
    function (_Tooltip) {
      _inheritsLoose(Popover, _Tooltip);

      function Popover() {
        return _Tooltip.apply(this, arguments) || this;
      }

      var _proto = Popover.prototype;

      // Overrides
      _proto.isWithContent = function isWithContent() {
        return this.getTitle() || this._getContent();
      };

      _proto.addAttachmentClass = function addAttachmentClass(attachment) {
        $$$1(this.getTipElement()).addClass(CLASS_PREFIX + "-" + attachment);
      };

      _proto.getTipElement = function getTipElement() {
        this.tip = this.tip || $$$1(this.config.template)[0];
        return this.tip;
      };

      _proto.setContent = function setContent() {
        var $tip = $$$1(this.getTipElement()); // We use append for html objects to maintain js events

        this.setElementContent($tip.find(Selector.TITLE), this.getTitle());

        var content = this._getContent();

        if (typeof content === 'function') {
          content = content.call(this.element);
        }

        this.setElementContent($tip.find(Selector.CONTENT), content);
        $tip.removeClass(ClassName.FADE + " " + ClassName.SHOW);
      }; // Private


      _proto._getContent = function _getContent() {
        return this.element.getAttribute('data-content') || this.config.content;
      };

      _proto._cleanTipClass = function _cleanTipClass() {
        var $tip = $$$1(this.getTipElement());
        var tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX);

        if (tabClass !== null && tabClass.length > 0) {
          $tip.removeClass(tabClass.join(''));
        }
      }; // Static


      Popover._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $$$1(this).data(DATA_KEY);

          var _config = typeof config === 'object' ? config : null;

          if (!data && /destroy|hide/.test(config)) {
            return;
          }

          if (!data) {
            data = new Popover(this, _config);
            $$$1(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config]();
          }
        });
      };

      _createClass(Popover, null, [{
        key: "VERSION",
        // Getters
        get: function get() {
          return VERSION;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default;
        }
      }, {
        key: "NAME",
        get: function get() {
          return NAME;
        }
      }, {
        key: "DATA_KEY",
        get: function get() {
          return DATA_KEY;
        }
      }, {
        key: "Event",
        get: function get() {
          return Event;
        }
      }, {
        key: "EVENT_KEY",
        get: function get() {
          return EVENT_KEY;
        }
      }, {
        key: "DefaultType",
        get: function get() {
          return DefaultType;
        }
      }]);

      return Popover;
    }(Tooltip);
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */


    $$$1.fn[NAME] = Popover._jQueryInterface;
    $$$1.fn[NAME].Constructor = Popover;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Popover._jQueryInterface;
    };

    return Popover;
  }($);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.1): scrollspy.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var ScrollSpy = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'scrollspy';
    var VERSION = '4.1.1';
    var DATA_KEY = 'bs.scrollspy';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var Default = {
      offset: 10,
      method: 'auto',
      target: ''
    };
    var DefaultType = {
      offset: 'number',
      method: 'string',
      target: '(string|element)'
    };
    var Event = {
      ACTIVATE: "activate" + EVENT_KEY,
      SCROLL: "scroll" + EVENT_KEY,
      LOAD_DATA_API: "load" + EVENT_KEY + DATA_API_KEY
    };
    var ClassName = {
      DROPDOWN_ITEM: 'dropdown-item',
      DROPDOWN_MENU: 'dropdown-menu',
      ACTIVE: 'active'
    };
    var Selector = {
      DATA_SPY: '[data-spy="scroll"]',
      ACTIVE: '.active',
      NAV_LIST_GROUP: '.nav, .list-group',
      NAV_LINKS: '.nav-link',
      NAV_ITEMS: '.nav-item',
      LIST_ITEMS: '.list-group-item',
      DROPDOWN: '.dropdown',
      DROPDOWN_ITEMS: '.dropdown-item',
      DROPDOWN_TOGGLE: '.dropdown-toggle'
    };
    var OffsetMethod = {
      OFFSET: 'offset',
      POSITION: 'position'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var ScrollSpy =
    /*#__PURE__*/
    function () {
      function ScrollSpy(element, config) {
        var _this = this;

        this._element = element;
        this._scrollElement = element.tagName === 'BODY' ? window : element;
        this._config = this._getConfig(config);
        this._selector = this._config.target + " " + Selector.NAV_LINKS + "," + (this._config.target + " " + Selector.LIST_ITEMS + ",") + (this._config.target + " " + Selector.DROPDOWN_ITEMS);
        this._offsets = [];
        this._targets = [];
        this._activeTarget = null;
        this._scrollHeight = 0;
        $$$1(this._scrollElement).on(Event.SCROLL, function (event) {
          return _this._process(event);
        });
        this.refresh();

        this._process();
      } // Getters


      var _proto = ScrollSpy.prototype;

      // Public
      _proto.refresh = function refresh() {
        var _this2 = this;

        var autoMethod = this._scrollElement === this._scrollElement.window ? OffsetMethod.OFFSET : OffsetMethod.POSITION;
        var offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method;
        var offsetBase = offsetMethod === OffsetMethod.POSITION ? this._getScrollTop() : 0;
        this._offsets = [];
        this._targets = [];
        this._scrollHeight = this._getScrollHeight();
        var targets = $$$1.makeArray($$$1(this._selector));
        targets.map(function (element) {
          var target;
          var targetSelector = Util.getSelectorFromElement(element);

          if (targetSelector) {
            target = $$$1(targetSelector)[0];
          }

          if (target) {
            var targetBCR = target.getBoundingClientRect();

            if (targetBCR.width || targetBCR.height) {
              // TODO (fat): remove sketch reliance on jQuery position/offset
              return [$$$1(target)[offsetMethod]().top + offsetBase, targetSelector];
            }
          }

          return null;
        }).filter(function (item) {
          return item;
        }).sort(function (a, b) {
          return a[0] - b[0];
        }).forEach(function (item) {
          _this2._offsets.push(item[0]);

          _this2._targets.push(item[1]);
        });
      };

      _proto.dispose = function dispose() {
        $$$1.removeData(this._element, DATA_KEY);
        $$$1(this._scrollElement).off(EVENT_KEY);
        this._element = null;
        this._scrollElement = null;
        this._config = null;
        this._selector = null;
        this._offsets = null;
        this._targets = null;
        this._activeTarget = null;
        this._scrollHeight = null;
      }; // Private


      _proto._getConfig = function _getConfig(config) {
        config = _objectSpread({}, Default, typeof config === 'object' && config ? config : {});

        if (typeof config.target !== 'string') {
          var id = $$$1(config.target).attr('id');

          if (!id) {
            id = Util.getUID(NAME);
            $$$1(config.target).attr('id', id);
          }

          config.target = "#" + id;
        }

        Util.typeCheckConfig(NAME, config, DefaultType);
        return config;
      };

      _proto._getScrollTop = function _getScrollTop() {
        return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
      };

      _proto._getScrollHeight = function _getScrollHeight() {
        return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
      };

      _proto._getOffsetHeight = function _getOffsetHeight() {
        return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
      };

      _proto._process = function _process() {
        var scrollTop = this._getScrollTop() + this._config.offset;

        var scrollHeight = this._getScrollHeight();

        var maxScroll = this._config.offset + scrollHeight - this._getOffsetHeight();

        if (this._scrollHeight !== scrollHeight) {
          this.refresh();
        }

        if (scrollTop >= maxScroll) {
          var target = this._targets[this._targets.length - 1];

          if (this._activeTarget !== target) {
            this._activate(target);
          }

          return;
        }

        if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) {
          this._activeTarget = null;

          this._clear();

          return;
        }

        for (var i = this._offsets.length; i--;) {
          var isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (typeof this._offsets[i + 1] === 'undefined' || scrollTop < this._offsets[i + 1]);

          if (isActiveTarget) {
            this._activate(this._targets[i]);
          }
        }
      };

      _proto._activate = function _activate(target) {
        this._activeTarget = target;

        this._clear();

        var queries = this._selector.split(','); // eslint-disable-next-line arrow-body-style


        queries = queries.map(function (selector) {
          return selector + "[data-target=\"" + target + "\"]," + (selector + "[href=\"" + target + "\"]");
        });
        var $link = $$$1(queries.join(','));

        if ($link.hasClass(ClassName.DROPDOWN_ITEM)) {
          $link.closest(Selector.DROPDOWN).find(Selector.DROPDOWN_TOGGLE).addClass(ClassName.ACTIVE);
          $link.addClass(ClassName.ACTIVE);
        } else {
          // Set triggered link as active
          $link.addClass(ClassName.ACTIVE); // Set triggered links parents as active
          // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor

          $link.parents(Selector.NAV_LIST_GROUP).prev(Selector.NAV_LINKS + ", " + Selector.LIST_ITEMS).addClass(ClassName.ACTIVE); // Handle special case when .nav-link is inside .nav-item

          $link.parents(Selector.NAV_LIST_GROUP).prev(Selector.NAV_ITEMS).children(Selector.NAV_LINKS).addClass(ClassName.ACTIVE);
        }

        $$$1(this._scrollElement).trigger(Event.ACTIVATE, {
          relatedTarget: target
        });
      };

      _proto._clear = function _clear() {
        $$$1(this._selector).filter(Selector.ACTIVE).removeClass(ClassName.ACTIVE);
      }; // Static


      ScrollSpy._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $$$1(this).data(DATA_KEY);

          var _config = typeof config === 'object' && config;

          if (!data) {
            data = new ScrollSpy(this, _config);
            $$$1(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config]();
          }
        });
      };

      _createClass(ScrollSpy, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default;
        }
      }]);

      return ScrollSpy;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(window).on(Event.LOAD_DATA_API, function () {
      var scrollSpys = $$$1.makeArray($$$1(Selector.DATA_SPY));

      for (var i = scrollSpys.length; i--;) {
        var $spy = $$$1(scrollSpys[i]);

        ScrollSpy._jQueryInterface.call($spy, $spy.data());
      }
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = ScrollSpy._jQueryInterface;
    $$$1.fn[NAME].Constructor = ScrollSpy;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return ScrollSpy._jQueryInterface;
    };

    return ScrollSpy;
  }($);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.1): tab.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Tab = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'tab';
    var VERSION = '4.1.1';
    var DATA_KEY = 'bs.tab';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var Event = {
      HIDE: "hide" + EVENT_KEY,
      HIDDEN: "hidden" + EVENT_KEY,
      SHOW: "show" + EVENT_KEY,
      SHOWN: "shown" + EVENT_KEY,
      CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
    };
    var ClassName = {
      DROPDOWN_MENU: 'dropdown-menu',
      ACTIVE: 'active',
      DISABLED: 'disabled',
      FADE: 'fade',
      SHOW: 'show'
    };
    var Selector = {
      DROPDOWN: '.dropdown',
      NAV_LIST_GROUP: '.nav, .list-group',
      ACTIVE: '.active',
      ACTIVE_UL: '> li > .active',
      DATA_TOGGLE: '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
      DROPDOWN_TOGGLE: '.dropdown-toggle',
      DROPDOWN_ACTIVE_CHILD: '> .dropdown-menu .active'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Tab =
    /*#__PURE__*/
    function () {
      function Tab(element) {
        this._element = element;
      } // Getters


      var _proto = Tab.prototype;

      // Public
      _proto.show = function show() {
        var _this = this;

        if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && $$$1(this._element).hasClass(ClassName.ACTIVE) || $$$1(this._element).hasClass(ClassName.DISABLED)) {
          return;
        }

        var target;
        var previous;
        var listElement = $$$1(this._element).closest(Selector.NAV_LIST_GROUP)[0];
        var selector = Util.getSelectorFromElement(this._element);

        if (listElement) {
          var itemSelector = listElement.nodeName === 'UL' ? Selector.ACTIVE_UL : Selector.ACTIVE;
          previous = $$$1.makeArray($$$1(listElement).find(itemSelector));
          previous = previous[previous.length - 1];
        }

        var hideEvent = $$$1.Event(Event.HIDE, {
          relatedTarget: this._element
        });
        var showEvent = $$$1.Event(Event.SHOW, {
          relatedTarget: previous
        });

        if (previous) {
          $$$1(previous).trigger(hideEvent);
        }

        $$$1(this._element).trigger(showEvent);

        if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) {
          return;
        }

        if (selector) {
          target = $$$1(selector)[0];
        }

        this._activate(this._element, listElement);

        var complete = function complete() {
          var hiddenEvent = $$$1.Event(Event.HIDDEN, {
            relatedTarget: _this._element
          });
          var shownEvent = $$$1.Event(Event.SHOWN, {
            relatedTarget: previous
          });
          $$$1(previous).trigger(hiddenEvent);
          $$$1(_this._element).trigger(shownEvent);
        };

        if (target) {
          this._activate(target, target.parentNode, complete);
        } else {
          complete();
        }
      };

      _proto.dispose = function dispose() {
        $$$1.removeData(this._element, DATA_KEY);
        this._element = null;
      }; // Private


      _proto._activate = function _activate(element, container, callback) {
        var _this2 = this;

        var activeElements;

        if (container.nodeName === 'UL') {
          activeElements = $$$1(container).find(Selector.ACTIVE_UL);
        } else {
          activeElements = $$$1(container).children(Selector.ACTIVE);
        }

        var active = activeElements[0];
        var isTransitioning = callback && active && $$$1(active).hasClass(ClassName.FADE);

        var complete = function complete() {
          return _this2._transitionComplete(element, active, callback);
        };

        if (active && isTransitioning) {
          var transitionDuration = Util.getTransitionDurationFromElement(active);
          $$$1(active).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
        } else {
          complete();
        }
      };

      _proto._transitionComplete = function _transitionComplete(element, active, callback) {
        if (active) {
          $$$1(active).removeClass(ClassName.SHOW + " " + ClassName.ACTIVE);
          var dropdownChild = $$$1(active.parentNode).find(Selector.DROPDOWN_ACTIVE_CHILD)[0];

          if (dropdownChild) {
            $$$1(dropdownChild).removeClass(ClassName.ACTIVE);
          }

          if (active.getAttribute('role') === 'tab') {
            active.setAttribute('aria-selected', false);
          }
        }

        $$$1(element).addClass(ClassName.ACTIVE);

        if (element.getAttribute('role') === 'tab') {
          element.setAttribute('aria-selected', true);
        }

        Util.reflow(element);
        $$$1(element).addClass(ClassName.SHOW);

        if (element.parentNode && $$$1(element.parentNode).hasClass(ClassName.DROPDOWN_MENU)) {
          var dropdownElement = $$$1(element).closest(Selector.DROPDOWN)[0];

          if (dropdownElement) {
            $$$1(dropdownElement).find(Selector.DROPDOWN_TOGGLE).addClass(ClassName.ACTIVE);
          }

          element.setAttribute('aria-expanded', true);
        }

        if (callback) {
          callback();
        }
      }; // Static


      Tab._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var $this = $$$1(this);
          var data = $this.data(DATA_KEY);

          if (!data) {
            data = new Tab(this);
            $this.data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config]();
          }
        });
      };

      _createClass(Tab, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }]);

      return Tab;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
      event.preventDefault();

      Tab._jQueryInterface.call($$$1(this), 'show');
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = Tab._jQueryInterface;
    $$$1.fn[NAME].Constructor = Tab;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Tab._jQueryInterface;
    };

    return Tab;
  }($);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.1): index.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  (function ($$$1) {
    if (typeof $$$1 === 'undefined') {
      throw new TypeError('Bootstrap\'s JavaScript requires jQuery. jQuery must be included before Bootstrap\'s JavaScript.');
    }

    var version = $$$1.fn.jquery.split(' ')[0].split('.');
    var minMajor = 1;
    var ltMajor = 2;
    var minMinor = 9;
    var minPatch = 1;
    var maxMajor = 4;

    if (version[0] < ltMajor && version[1] < minMinor || version[0] === minMajor && version[1] === minMinor && version[2] < minPatch || version[0] >= maxMajor) {
      throw new Error('Bootstrap\'s JavaScript requires at least jQuery v1.9.1 but less than v4.0.0');
    }
  })($);

  exports.Util = Util;
  exports.Alert = Alert;
  exports.Button = Button;
  exports.Carousel = Carousel;
  exports.Collapse = Collapse;
  exports.Dropdown = Dropdown;
  exports.Modal = Modal;
  exports.Popover = Popover;
  exports.Scrollspy = ScrollSpy;
  exports.Tab = Tab;
  exports.Tooltip = Tooltip;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=bootstrap.js.map

/*!
 DataTables 1.10.18
 ©2008-2018 SpryMedia Ltd - datatables.net/license
*/
(function(h){"function"===typeof define&&define.amd?define(["jquery"],function(E){return h(E,window,document)}):"object"===typeof exports?module.exports=function(E,H){E||(E=window);H||(H="undefined"!==typeof window?require("jquery"):require("jquery")(E));return h(H,E,E.document)}:h(jQuery,window,document)})(function(h,E,H,k){function Z(a){var b,c,d={};h.each(a,function(e){if((b=e.match(/^([^A-Z]+?)([A-Z])/))&&-1!=="a aa ai ao as b fn i m o s ".indexOf(b[1]+" "))c=e.replace(b[0],b[2].toLowerCase()),
d[c]=e,"o"===b[1]&&Z(a[e])});a._hungarianMap=d}function J(a,b,c){a._hungarianMap||Z(a);var d;h.each(b,function(e){d=a._hungarianMap[e];if(d!==k&&(c||b[d]===k))"o"===d.charAt(0)?(b[d]||(b[d]={}),h.extend(!0,b[d],b[e]),J(a[d],b[d],c)):b[d]=b[e]})}function Ca(a){var b=n.defaults.oLanguage,c=b.sDecimal;c&&Da(c);if(a){var d=a.sZeroRecords;!a.sEmptyTable&&(d&&"No data available in table"===b.sEmptyTable)&&F(a,a,"sZeroRecords","sEmptyTable");!a.sLoadingRecords&&(d&&"Loading..."===b.sLoadingRecords)&&F(a,
a,"sZeroRecords","sLoadingRecords");a.sInfoThousands&&(a.sThousands=a.sInfoThousands);(a=a.sDecimal)&&c!==a&&Da(a)}}function eb(a){A(a,"ordering","bSort");A(a,"orderMulti","bSortMulti");A(a,"orderClasses","bSortClasses");A(a,"orderCellsTop","bSortCellsTop");A(a,"order","aaSorting");A(a,"orderFixed","aaSortingFixed");A(a,"paging","bPaginate");A(a,"pagingType","sPaginationType");A(a,"pageLength","iDisplayLength");A(a,"searching","bFilter");"boolean"===typeof a.sScrollX&&(a.sScrollX=a.sScrollX?"100%":
"");"boolean"===typeof a.scrollX&&(a.scrollX=a.scrollX?"100%":"");if(a=a.aoSearchCols)for(var b=0,c=a.length;b<c;b++)a[b]&&J(n.models.oSearch,a[b])}function fb(a){A(a,"orderable","bSortable");A(a,"orderData","aDataSort");A(a,"orderSequence","asSorting");A(a,"orderDataType","sortDataType");var b=a.aDataSort;"number"===typeof b&&!h.isArray(b)&&(a.aDataSort=[b])}function gb(a){if(!n.__browser){var b={};n.__browser=b;var c=h("<div/>").css({position:"fixed",top:0,left:-1*h(E).scrollLeft(),height:1,width:1,
overflow:"hidden"}).append(h("<div/>").css({position:"absolute",top:1,left:1,width:100,overflow:"scroll"}).append(h("<div/>").css({width:"100%",height:10}))).appendTo("body"),d=c.children(),e=d.children();b.barWidth=d[0].offsetWidth-d[0].clientWidth;b.bScrollOversize=100===e[0].offsetWidth&&100!==d[0].clientWidth;b.bScrollbarLeft=1!==Math.round(e.offset().left);b.bBounding=c[0].getBoundingClientRect().width?!0:!1;c.remove()}h.extend(a.oBrowser,n.__browser);a.oScroll.iBarWidth=n.__browser.barWidth}
function hb(a,b,c,d,e,f){var g,j=!1;c!==k&&(g=c,j=!0);for(;d!==e;)a.hasOwnProperty(d)&&(g=j?b(g,a[d],d,a):a[d],j=!0,d+=f);return g}function Ea(a,b){var c=n.defaults.column,d=a.aoColumns.length,c=h.extend({},n.models.oColumn,c,{nTh:b?b:H.createElement("th"),sTitle:c.sTitle?c.sTitle:b?b.innerHTML:"",aDataSort:c.aDataSort?c.aDataSort:[d],mData:c.mData?c.mData:d,idx:d});a.aoColumns.push(c);c=a.aoPreSearchCols;c[d]=h.extend({},n.models.oSearch,c[d]);ka(a,d,h(b).data())}function ka(a,b,c){var b=a.aoColumns[b],
d=a.oClasses,e=h(b.nTh);if(!b.sWidthOrig){b.sWidthOrig=e.attr("width")||null;var f=(e.attr("style")||"").match(/width:\s*(\d+[pxem%]+)/);f&&(b.sWidthOrig=f[1])}c!==k&&null!==c&&(fb(c),J(n.defaults.column,c),c.mDataProp!==k&&!c.mData&&(c.mData=c.mDataProp),c.sType&&(b._sManualType=c.sType),c.className&&!c.sClass&&(c.sClass=c.className),c.sClass&&e.addClass(c.sClass),h.extend(b,c),F(b,c,"sWidth","sWidthOrig"),c.iDataSort!==k&&(b.aDataSort=[c.iDataSort]),F(b,c,"aDataSort"));var g=b.mData,j=S(g),i=b.mRender?
S(b.mRender):null,c=function(a){return"string"===typeof a&&-1!==a.indexOf("@")};b._bAttrSrc=h.isPlainObject(g)&&(c(g.sort)||c(g.type)||c(g.filter));b._setter=null;b.fnGetData=function(a,b,c){var d=j(a,b,k,c);return i&&b?i(d,b,a,c):d};b.fnSetData=function(a,b,c){return N(g)(a,b,c)};"number"!==typeof g&&(a._rowReadObject=!0);a.oFeatures.bSort||(b.bSortable=!1,e.addClass(d.sSortableNone));a=-1!==h.inArray("asc",b.asSorting);c=-1!==h.inArray("desc",b.asSorting);!b.bSortable||!a&&!c?(b.sSortingClass=d.sSortableNone,
b.sSortingClassJUI=""):a&&!c?(b.sSortingClass=d.sSortableAsc,b.sSortingClassJUI=d.sSortJUIAscAllowed):!a&&c?(b.sSortingClass=d.sSortableDesc,b.sSortingClassJUI=d.sSortJUIDescAllowed):(b.sSortingClass=d.sSortable,b.sSortingClassJUI=d.sSortJUI)}function $(a){if(!1!==a.oFeatures.bAutoWidth){var b=a.aoColumns;Fa(a);for(var c=0,d=b.length;c<d;c++)b[c].nTh.style.width=b[c].sWidth}b=a.oScroll;(""!==b.sY||""!==b.sX)&&la(a);r(a,null,"column-sizing",[a])}function aa(a,b){var c=ma(a,"bVisible");return"number"===
typeof c[b]?c[b]:null}function ba(a,b){var c=ma(a,"bVisible"),c=h.inArray(b,c);return-1!==c?c:null}function V(a){var b=0;h.each(a.aoColumns,function(a,d){d.bVisible&&"none"!==h(d.nTh).css("display")&&b++});return b}function ma(a,b){var c=[];h.map(a.aoColumns,function(a,e){a[b]&&c.push(e)});return c}function Ga(a){var b=a.aoColumns,c=a.aoData,d=n.ext.type.detect,e,f,g,j,i,h,l,q,t;e=0;for(f=b.length;e<f;e++)if(l=b[e],t=[],!l.sType&&l._sManualType)l.sType=l._sManualType;else if(!l.sType){g=0;for(j=d.length;g<
j;g++){i=0;for(h=c.length;i<h;i++){t[i]===k&&(t[i]=B(a,i,e,"type"));q=d[g](t[i],a);if(!q&&g!==d.length-1)break;if("html"===q)break}if(q){l.sType=q;break}}l.sType||(l.sType="string")}}function ib(a,b,c,d){var e,f,g,j,i,m,l=a.aoColumns;if(b)for(e=b.length-1;0<=e;e--){m=b[e];var q=m.targets!==k?m.targets:m.aTargets;h.isArray(q)||(q=[q]);f=0;for(g=q.length;f<g;f++)if("number"===typeof q[f]&&0<=q[f]){for(;l.length<=q[f];)Ea(a);d(q[f],m)}else if("number"===typeof q[f]&&0>q[f])d(l.length+q[f],m);else if("string"===
typeof q[f]){j=0;for(i=l.length;j<i;j++)("_all"==q[f]||h(l[j].nTh).hasClass(q[f]))&&d(j,m)}}if(c){e=0;for(a=c.length;e<a;e++)d(e,c[e])}}function O(a,b,c,d){var e=a.aoData.length,f=h.extend(!0,{},n.models.oRow,{src:c?"dom":"data",idx:e});f._aData=b;a.aoData.push(f);for(var g=a.aoColumns,j=0,i=g.length;j<i;j++)g[j].sType=null;a.aiDisplayMaster.push(e);b=a.rowIdFn(b);b!==k&&(a.aIds[b]=f);(c||!a.oFeatures.bDeferRender)&&Ha(a,e,c,d);return e}function na(a,b){var c;b instanceof h||(b=h(b));return b.map(function(b,
e){c=Ia(a,e);return O(a,c.data,e,c.cells)})}function B(a,b,c,d){var e=a.iDraw,f=a.aoColumns[c],g=a.aoData[b]._aData,j=f.sDefaultContent,i=f.fnGetData(g,d,{settings:a,row:b,col:c});if(i===k)return a.iDrawError!=e&&null===j&&(K(a,0,"Requested unknown parameter "+("function"==typeof f.mData?"{function}":"'"+f.mData+"'")+" for row "+b+", column "+c,4),a.iDrawError=e),j;if((i===g||null===i)&&null!==j&&d!==k)i=j;else if("function"===typeof i)return i.call(g);return null===i&&"display"==d?"":i}function jb(a,
b,c,d){a.aoColumns[c].fnSetData(a.aoData[b]._aData,d,{settings:a,row:b,col:c})}function Ja(a){return h.map(a.match(/(\\.|[^\.])+/g)||[""],function(a){return a.replace(/\\\./g,".")})}function S(a){if(h.isPlainObject(a)){var b={};h.each(a,function(a,c){c&&(b[a]=S(c))});return function(a,c,f,g){var j=b[c]||b._;return j!==k?j(a,c,f,g):a}}if(null===a)return function(a){return a};if("function"===typeof a)return function(b,c,f,g){return a(b,c,f,g)};if("string"===typeof a&&(-1!==a.indexOf(".")||-1!==a.indexOf("[")||
-1!==a.indexOf("("))){var c=function(a,b,f){var g,j;if(""!==f){j=Ja(f);for(var i=0,m=j.length;i<m;i++){f=j[i].match(ca);g=j[i].match(W);if(f){j[i]=j[i].replace(ca,"");""!==j[i]&&(a=a[j[i]]);g=[];j.splice(0,i+1);j=j.join(".");if(h.isArray(a)){i=0;for(m=a.length;i<m;i++)g.push(c(a[i],b,j))}a=f[0].substring(1,f[0].length-1);a=""===a?g:g.join(a);break}else if(g){j[i]=j[i].replace(W,"");a=a[j[i]]();continue}if(null===a||a[j[i]]===k)return k;a=a[j[i]]}}return a};return function(b,e){return c(b,e,a)}}return function(b){return b[a]}}
function N(a){if(h.isPlainObject(a))return N(a._);if(null===a)return function(){};if("function"===typeof a)return function(b,d,e){a(b,"set",d,e)};if("string"===typeof a&&(-1!==a.indexOf(".")||-1!==a.indexOf("[")||-1!==a.indexOf("("))){var b=function(a,d,e){var e=Ja(e),f;f=e[e.length-1];for(var g,j,i=0,m=e.length-1;i<m;i++){g=e[i].match(ca);j=e[i].match(W);if(g){e[i]=e[i].replace(ca,"");a[e[i]]=[];f=e.slice();f.splice(0,i+1);g=f.join(".");if(h.isArray(d)){j=0;for(m=d.length;j<m;j++)f={},b(f,d[j],g),
a[e[i]].push(f)}else a[e[i]]=d;return}j&&(e[i]=e[i].replace(W,""),a=a[e[i]](d));if(null===a[e[i]]||a[e[i]]===k)a[e[i]]={};a=a[e[i]]}if(f.match(W))a[f.replace(W,"")](d);else a[f.replace(ca,"")]=d};return function(c,d){return b(c,d,a)}}return function(b,d){b[a]=d}}function Ka(a){return D(a.aoData,"_aData")}function oa(a){a.aoData.length=0;a.aiDisplayMaster.length=0;a.aiDisplay.length=0;a.aIds={}}function pa(a,b,c){for(var d=-1,e=0,f=a.length;e<f;e++)a[e]==b?d=e:a[e]>b&&a[e]--; -1!=d&&c===k&&a.splice(d,
1)}function da(a,b,c,d){var e=a.aoData[b],f,g=function(c,d){for(;c.childNodes.length;)c.removeChild(c.firstChild);c.innerHTML=B(a,b,d,"display")};if("dom"===c||(!c||"auto"===c)&&"dom"===e.src)e._aData=Ia(a,e,d,d===k?k:e._aData).data;else{var j=e.anCells;if(j)if(d!==k)g(j[d],d);else{c=0;for(f=j.length;c<f;c++)g(j[c],c)}}e._aSortData=null;e._aFilterData=null;g=a.aoColumns;if(d!==k)g[d].sType=null;else{c=0;for(f=g.length;c<f;c++)g[c].sType=null;La(a,e)}}function Ia(a,b,c,d){var e=[],f=b.firstChild,g,
j,i=0,m,l=a.aoColumns,q=a._rowReadObject,d=d!==k?d:q?{}:[],t=function(a,b){if("string"===typeof a){var c=a.indexOf("@");-1!==c&&(c=a.substring(c+1),N(a)(d,b.getAttribute(c)))}},G=function(a){if(c===k||c===i)j=l[i],m=h.trim(a.innerHTML),j&&j._bAttrSrc?(N(j.mData._)(d,m),t(j.mData.sort,a),t(j.mData.type,a),t(j.mData.filter,a)):q?(j._setter||(j._setter=N(j.mData)),j._setter(d,m)):d[i]=m;i++};if(f)for(;f;){g=f.nodeName.toUpperCase();if("TD"==g||"TH"==g)G(f),e.push(f);f=f.nextSibling}else{e=b.anCells;
f=0;for(g=e.length;f<g;f++)G(e[f])}if(b=b.firstChild?b:b.nTr)(b=b.getAttribute("id"))&&N(a.rowId)(d,b);return{data:d,cells:e}}function Ha(a,b,c,d){var e=a.aoData[b],f=e._aData,g=[],j,i,m,l,q;if(null===e.nTr){j=c||H.createElement("tr");e.nTr=j;e.anCells=g;j._DT_RowIndex=b;La(a,e);l=0;for(q=a.aoColumns.length;l<q;l++){m=a.aoColumns[l];i=c?d[l]:H.createElement(m.sCellType);i._DT_CellIndex={row:b,column:l};g.push(i);if((!c||m.mRender||m.mData!==l)&&(!h.isPlainObject(m.mData)||m.mData._!==l+".display"))i.innerHTML=
B(a,b,l,"display");m.sClass&&(i.className+=" "+m.sClass);m.bVisible&&!c?j.appendChild(i):!m.bVisible&&c&&i.parentNode.removeChild(i);m.fnCreatedCell&&m.fnCreatedCell.call(a.oInstance,i,B(a,b,l),f,b,l)}r(a,"aoRowCreatedCallback",null,[j,f,b,g])}e.nTr.setAttribute("role","row")}function La(a,b){var c=b.nTr,d=b._aData;if(c){var e=a.rowIdFn(d);e&&(c.id=e);d.DT_RowClass&&(e=d.DT_RowClass.split(" "),b.__rowc=b.__rowc?qa(b.__rowc.concat(e)):e,h(c).removeClass(b.__rowc.join(" ")).addClass(d.DT_RowClass));
d.DT_RowAttr&&h(c).attr(d.DT_RowAttr);d.DT_RowData&&h(c).data(d.DT_RowData)}}function kb(a){var b,c,d,e,f,g=a.nTHead,j=a.nTFoot,i=0===h("th, td",g).length,m=a.oClasses,l=a.aoColumns;i&&(e=h("<tr/>").appendTo(g));b=0;for(c=l.length;b<c;b++)f=l[b],d=h(f.nTh).addClass(f.sClass),i&&d.appendTo(e),a.oFeatures.bSort&&(d.addClass(f.sSortingClass),!1!==f.bSortable&&(d.attr("tabindex",a.iTabIndex).attr("aria-controls",a.sTableId),Ma(a,f.nTh,b))),f.sTitle!=d[0].innerHTML&&d.html(f.sTitle),Na(a,"header")(a,d,
f,m);i&&ea(a.aoHeader,g);h(g).find(">tr").attr("role","row");h(g).find(">tr>th, >tr>td").addClass(m.sHeaderTH);h(j).find(">tr>th, >tr>td").addClass(m.sFooterTH);if(null!==j){a=a.aoFooter[0];b=0;for(c=a.length;b<c;b++)f=l[b],f.nTf=a[b].cell,f.sClass&&h(f.nTf).addClass(f.sClass)}}function fa(a,b,c){var d,e,f,g=[],j=[],i=a.aoColumns.length,m;if(b){c===k&&(c=!1);d=0;for(e=b.length;d<e;d++){g[d]=b[d].slice();g[d].nTr=b[d].nTr;for(f=i-1;0<=f;f--)!a.aoColumns[f].bVisible&&!c&&g[d].splice(f,1);j.push([])}d=
0;for(e=g.length;d<e;d++){if(a=g[d].nTr)for(;f=a.firstChild;)a.removeChild(f);f=0;for(b=g[d].length;f<b;f++)if(m=i=1,j[d][f]===k){a.appendChild(g[d][f].cell);for(j[d][f]=1;g[d+i]!==k&&g[d][f].cell==g[d+i][f].cell;)j[d+i][f]=1,i++;for(;g[d][f+m]!==k&&g[d][f].cell==g[d][f+m].cell;){for(c=0;c<i;c++)j[d+c][f+m]=1;m++}h(g[d][f].cell).attr("rowspan",i).attr("colspan",m)}}}}function P(a){var b=r(a,"aoPreDrawCallback","preDraw",[a]);if(-1!==h.inArray(!1,b))C(a,!1);else{var b=[],c=0,d=a.asStripeClasses,e=
d.length,f=a.oLanguage,g=a.iInitDisplayStart,j="ssp"==y(a),i=a.aiDisplay;a.bDrawing=!0;g!==k&&-1!==g&&(a._iDisplayStart=j?g:g>=a.fnRecordsDisplay()?0:g,a.iInitDisplayStart=-1);var g=a._iDisplayStart,m=a.fnDisplayEnd();if(a.bDeferLoading)a.bDeferLoading=!1,a.iDraw++,C(a,!1);else if(j){if(!a.bDestroying&&!lb(a))return}else a.iDraw++;if(0!==i.length){f=j?a.aoData.length:m;for(j=j?0:g;j<f;j++){var l=i[j],q=a.aoData[l];null===q.nTr&&Ha(a,l);var t=q.nTr;if(0!==e){var G=d[c%e];q._sRowStripe!=G&&(h(t).removeClass(q._sRowStripe).addClass(G),
q._sRowStripe=G)}r(a,"aoRowCallback",null,[t,q._aData,c,j,l]);b.push(t);c++}}else c=f.sZeroRecords,1==a.iDraw&&"ajax"==y(a)?c=f.sLoadingRecords:f.sEmptyTable&&0===a.fnRecordsTotal()&&(c=f.sEmptyTable),b[0]=h("<tr/>",{"class":e?d[0]:""}).append(h("<td />",{valign:"top",colSpan:V(a),"class":a.oClasses.sRowEmpty}).html(c))[0];r(a,"aoHeaderCallback","header",[h(a.nTHead).children("tr")[0],Ka(a),g,m,i]);r(a,"aoFooterCallback","footer",[h(a.nTFoot).children("tr")[0],Ka(a),g,m,i]);d=h(a.nTBody);d.children().detach();
d.append(h(b));r(a,"aoDrawCallback","draw",[a]);a.bSorted=!1;a.bFiltered=!1;a.bDrawing=!1}}function T(a,b){var c=a.oFeatures,d=c.bFilter;c.bSort&&mb(a);d?ga(a,a.oPreviousSearch):a.aiDisplay=a.aiDisplayMaster.slice();!0!==b&&(a._iDisplayStart=0);a._drawHold=b;P(a);a._drawHold=!1}function nb(a){var b=a.oClasses,c=h(a.nTable),c=h("<div/>").insertBefore(c),d=a.oFeatures,e=h("<div/>",{id:a.sTableId+"_wrapper","class":b.sWrapper+(a.nTFoot?"":" "+b.sNoFooter)});a.nHolding=c[0];a.nTableWrapper=e[0];a.nTableReinsertBefore=
a.nTable.nextSibling;for(var f=a.sDom.split(""),g,j,i,m,l,q,k=0;k<f.length;k++){g=null;j=f[k];if("<"==j){i=h("<div/>")[0];m=f[k+1];if("'"==m||'"'==m){l="";for(q=2;f[k+q]!=m;)l+=f[k+q],q++;"H"==l?l=b.sJUIHeader:"F"==l&&(l=b.sJUIFooter);-1!=l.indexOf(".")?(m=l.split("."),i.id=m[0].substr(1,m[0].length-1),i.className=m[1]):"#"==l.charAt(0)?i.id=l.substr(1,l.length-1):i.className=l;k+=q}e.append(i);e=h(i)}else if(">"==j)e=e.parent();else if("l"==j&&d.bPaginate&&d.bLengthChange)g=ob(a);else if("f"==j&&
d.bFilter)g=pb(a);else if("r"==j&&d.bProcessing)g=qb(a);else if("t"==j)g=rb(a);else if("i"==j&&d.bInfo)g=sb(a);else if("p"==j&&d.bPaginate)g=tb(a);else if(0!==n.ext.feature.length){i=n.ext.feature;q=0;for(m=i.length;q<m;q++)if(j==i[q].cFeature){g=i[q].fnInit(a);break}}g&&(i=a.aanFeatures,i[j]||(i[j]=[]),i[j].push(g),e.append(g))}c.replaceWith(e);a.nHolding=null}function ea(a,b){var c=h(b).children("tr"),d,e,f,g,j,i,m,l,q,k;a.splice(0,a.length);f=0;for(i=c.length;f<i;f++)a.push([]);f=0;for(i=c.length;f<
i;f++){d=c[f];for(e=d.firstChild;e;){if("TD"==e.nodeName.toUpperCase()||"TH"==e.nodeName.toUpperCase()){l=1*e.getAttribute("colspan");q=1*e.getAttribute("rowspan");l=!l||0===l||1===l?1:l;q=!q||0===q||1===q?1:q;g=0;for(j=a[f];j[g];)g++;m=g;k=1===l?!0:!1;for(j=0;j<l;j++)for(g=0;g<q;g++)a[f+g][m+j]={cell:e,unique:k},a[f+g].nTr=d}e=e.nextSibling}}}function ra(a,b,c){var d=[];c||(c=a.aoHeader,b&&(c=[],ea(c,b)));for(var b=0,e=c.length;b<e;b++)for(var f=0,g=c[b].length;f<g;f++)if(c[b][f].unique&&(!d[f]||
!a.bSortCellsTop))d[f]=c[b][f].cell;return d}function sa(a,b,c){r(a,"aoServerParams","serverParams",[b]);if(b&&h.isArray(b)){var d={},e=/(.*?)\[\]$/;h.each(b,function(a,b){var c=b.name.match(e);c?(c=c[0],d[c]||(d[c]=[]),d[c].push(b.value)):d[b.name]=b.value});b=d}var f,g=a.ajax,j=a.oInstance,i=function(b){r(a,null,"xhr",[a,b,a.jqXHR]);c(b)};if(h.isPlainObject(g)&&g.data){f=g.data;var m="function"===typeof f?f(b,a):f,b="function"===typeof f&&m?m:h.extend(!0,b,m);delete g.data}m={data:b,success:function(b){var c=
b.error||b.sError;c&&K(a,0,c);a.json=b;i(b)},dataType:"json",cache:!1,type:a.sServerMethod,error:function(b,c){var d=r(a,null,"xhr",[a,null,a.jqXHR]);-1===h.inArray(!0,d)&&("parsererror"==c?K(a,0,"Invalid JSON response",1):4===b.readyState&&K(a,0,"Ajax error",7));C(a,!1)}};a.oAjaxData=b;r(a,null,"preXhr",[a,b]);a.fnServerData?a.fnServerData.call(j,a.sAjaxSource,h.map(b,function(a,b){return{name:b,value:a}}),i,a):a.sAjaxSource||"string"===typeof g?a.jqXHR=h.ajax(h.extend(m,{url:g||a.sAjaxSource})):
"function"===typeof g?a.jqXHR=g.call(j,b,i,a):(a.jqXHR=h.ajax(h.extend(m,g)),g.data=f)}function lb(a){return a.bAjaxDataGet?(a.iDraw++,C(a,!0),sa(a,ub(a),function(b){vb(a,b)}),!1):!0}function ub(a){var b=a.aoColumns,c=b.length,d=a.oFeatures,e=a.oPreviousSearch,f=a.aoPreSearchCols,g,j=[],i,m,l,k=X(a);g=a._iDisplayStart;i=!1!==d.bPaginate?a._iDisplayLength:-1;var t=function(a,b){j.push({name:a,value:b})};t("sEcho",a.iDraw);t("iColumns",c);t("sColumns",D(b,"sName").join(","));t("iDisplayStart",g);t("iDisplayLength",
i);var G={draw:a.iDraw,columns:[],order:[],start:g,length:i,search:{value:e.sSearch,regex:e.bRegex}};for(g=0;g<c;g++)m=b[g],l=f[g],i="function"==typeof m.mData?"function":m.mData,G.columns.push({data:i,name:m.sName,searchable:m.bSearchable,orderable:m.bSortable,search:{value:l.sSearch,regex:l.bRegex}}),t("mDataProp_"+g,i),d.bFilter&&(t("sSearch_"+g,l.sSearch),t("bRegex_"+g,l.bRegex),t("bSearchable_"+g,m.bSearchable)),d.bSort&&t("bSortable_"+g,m.bSortable);d.bFilter&&(t("sSearch",e.sSearch),t("bRegex",
e.bRegex));d.bSort&&(h.each(k,function(a,b){G.order.push({column:b.col,dir:b.dir});t("iSortCol_"+a,b.col);t("sSortDir_"+a,b.dir)}),t("iSortingCols",k.length));b=n.ext.legacy.ajax;return null===b?a.sAjaxSource?j:G:b?j:G}function vb(a,b){var c=ta(a,b),d=b.sEcho!==k?b.sEcho:b.draw,e=b.iTotalRecords!==k?b.iTotalRecords:b.recordsTotal,f=b.iTotalDisplayRecords!==k?b.iTotalDisplayRecords:b.recordsFiltered;if(d){if(1*d<a.iDraw)return;a.iDraw=1*d}oa(a);a._iRecordsTotal=parseInt(e,10);a._iRecordsDisplay=parseInt(f,
10);d=0;for(e=c.length;d<e;d++)O(a,c[d]);a.aiDisplay=a.aiDisplayMaster.slice();a.bAjaxDataGet=!1;P(a);a._bInitComplete||ua(a,b);a.bAjaxDataGet=!0;C(a,!1)}function ta(a,b){var c=h.isPlainObject(a.ajax)&&a.ajax.dataSrc!==k?a.ajax.dataSrc:a.sAjaxDataProp;return"data"===c?b.aaData||b[c]:""!==c?S(c)(b):b}function pb(a){var b=a.oClasses,c=a.sTableId,d=a.oLanguage,e=a.oPreviousSearch,f=a.aanFeatures,g='<input type="search" class="'+b.sFilterInput+'"/>',j=d.sSearch,j=j.match(/_INPUT_/)?j.replace("_INPUT_",
g):j+g,b=h("<div/>",{id:!f.f?c+"_filter":null,"class":b.sFilter}).append(h("<label/>").append(j)),f=function(){var b=!this.value?"":this.value;b!=e.sSearch&&(ga(a,{sSearch:b,bRegex:e.bRegex,bSmart:e.bSmart,bCaseInsensitive:e.bCaseInsensitive}),a._iDisplayStart=0,P(a))},g=null!==a.searchDelay?a.searchDelay:"ssp"===y(a)?400:0,i=h("input",b).val(e.sSearch).attr("placeholder",d.sSearchPlaceholder).on("keyup.DT search.DT input.DT paste.DT cut.DT",g?Oa(f,g):f).on("keypress.DT",function(a){if(13==a.keyCode)return!1}).attr("aria-controls",
c);h(a.nTable).on("search.dt.DT",function(b,c){if(a===c)try{i[0]!==H.activeElement&&i.val(e.sSearch)}catch(d){}});return b[0]}function ga(a,b,c){var d=a.oPreviousSearch,e=a.aoPreSearchCols,f=function(a){d.sSearch=a.sSearch;d.bRegex=a.bRegex;d.bSmart=a.bSmart;d.bCaseInsensitive=a.bCaseInsensitive};Ga(a);if("ssp"!=y(a)){wb(a,b.sSearch,c,b.bEscapeRegex!==k?!b.bEscapeRegex:b.bRegex,b.bSmart,b.bCaseInsensitive);f(b);for(b=0;b<e.length;b++)xb(a,e[b].sSearch,b,e[b].bEscapeRegex!==k?!e[b].bEscapeRegex:e[b].bRegex,
e[b].bSmart,e[b].bCaseInsensitive);yb(a)}else f(b);a.bFiltered=!0;r(a,null,"search",[a])}function yb(a){for(var b=n.ext.search,c=a.aiDisplay,d,e,f=0,g=b.length;f<g;f++){for(var j=[],i=0,m=c.length;i<m;i++)e=c[i],d=a.aoData[e],b[f](a,d._aFilterData,e,d._aData,i)&&j.push(e);c.length=0;h.merge(c,j)}}function xb(a,b,c,d,e,f){if(""!==b){for(var g=[],j=a.aiDisplay,d=Pa(b,d,e,f),e=0;e<j.length;e++)b=a.aoData[j[e]]._aFilterData[c],d.test(b)&&g.push(j[e]);a.aiDisplay=g}}function wb(a,b,c,d,e,f){var d=Pa(b,
d,e,f),f=a.oPreviousSearch.sSearch,g=a.aiDisplayMaster,j,e=[];0!==n.ext.search.length&&(c=!0);j=zb(a);if(0>=b.length)a.aiDisplay=g.slice();else{if(j||c||f.length>b.length||0!==b.indexOf(f)||a.bSorted)a.aiDisplay=g.slice();b=a.aiDisplay;for(c=0;c<b.length;c++)d.test(a.aoData[b[c]]._sFilterRow)&&e.push(b[c]);a.aiDisplay=e}}function Pa(a,b,c,d){a=b?a:Qa(a);c&&(a="^(?=.*?"+h.map(a.match(/"[^"]+"|[^ ]+/g)||[""],function(a){if('"'===a.charAt(0))var b=a.match(/^"(.*)"$/),a=b?b[1]:a;return a.replace('"',
"")}).join(")(?=.*?")+").*$");return RegExp(a,d?"i":"")}function zb(a){var b=a.aoColumns,c,d,e,f,g,j,i,h,l=n.ext.type.search;c=!1;d=0;for(f=a.aoData.length;d<f;d++)if(h=a.aoData[d],!h._aFilterData){j=[];e=0;for(g=b.length;e<g;e++)c=b[e],c.bSearchable?(i=B(a,d,e,"filter"),l[c.sType]&&(i=l[c.sType](i)),null===i&&(i=""),"string"!==typeof i&&i.toString&&(i=i.toString())):i="",i.indexOf&&-1!==i.indexOf("&")&&(va.innerHTML=i,i=Wb?va.textContent:va.innerText),i.replace&&(i=i.replace(/[\r\n]/g,"")),j.push(i);
h._aFilterData=j;h._sFilterRow=j.join("  ");c=!0}return c}function Ab(a){return{search:a.sSearch,smart:a.bSmart,regex:a.bRegex,caseInsensitive:a.bCaseInsensitive}}function Bb(a){return{sSearch:a.search,bSmart:a.smart,bRegex:a.regex,bCaseInsensitive:a.caseInsensitive}}function sb(a){var b=a.sTableId,c=a.aanFeatures.i,d=h("<div/>",{"class":a.oClasses.sInfo,id:!c?b+"_info":null});c||(a.aoDrawCallback.push({fn:Cb,sName:"information"}),d.attr("role","status").attr("aria-live","polite"),h(a.nTable).attr("aria-describedby",
b+"_info"));return d[0]}function Cb(a){var b=a.aanFeatures.i;if(0!==b.length){var c=a.oLanguage,d=a._iDisplayStart+1,e=a.fnDisplayEnd(),f=a.fnRecordsTotal(),g=a.fnRecordsDisplay(),j=g?c.sInfo:c.sInfoEmpty;g!==f&&(j+=" "+c.sInfoFiltered);j+=c.sInfoPostFix;j=Db(a,j);c=c.fnInfoCallback;null!==c&&(j=c.call(a.oInstance,a,d,e,f,g,j));h(b).html(j)}}function Db(a,b){var c=a.fnFormatNumber,d=a._iDisplayStart+1,e=a._iDisplayLength,f=a.fnRecordsDisplay(),g=-1===e;return b.replace(/_START_/g,c.call(a,d)).replace(/_END_/g,
c.call(a,a.fnDisplayEnd())).replace(/_MAX_/g,c.call(a,a.fnRecordsTotal())).replace(/_TOTAL_/g,c.call(a,f)).replace(/_PAGE_/g,c.call(a,g?1:Math.ceil(d/e))).replace(/_PAGES_/g,c.call(a,g?1:Math.ceil(f/e)))}function ha(a){var b,c,d=a.iInitDisplayStart,e=a.aoColumns,f;c=a.oFeatures;var g=a.bDeferLoading;if(a.bInitialised){nb(a);kb(a);fa(a,a.aoHeader);fa(a,a.aoFooter);C(a,!0);c.bAutoWidth&&Fa(a);b=0;for(c=e.length;b<c;b++)f=e[b],f.sWidth&&(f.nTh.style.width=v(f.sWidth));r(a,null,"preInit",[a]);T(a);e=
y(a);if("ssp"!=e||g)"ajax"==e?sa(a,[],function(c){var f=ta(a,c);for(b=0;b<f.length;b++)O(a,f[b]);a.iInitDisplayStart=d;T(a);C(a,!1);ua(a,c)},a):(C(a,!1),ua(a))}else setTimeout(function(){ha(a)},200)}function ua(a,b){a._bInitComplete=!0;(b||a.oInit.aaData)&&$(a);r(a,null,"plugin-init",[a,b]);r(a,"aoInitComplete","init",[a,b])}function Ra(a,b){var c=parseInt(b,10);a._iDisplayLength=c;Sa(a);r(a,null,"length",[a,c])}function ob(a){for(var b=a.oClasses,c=a.sTableId,d=a.aLengthMenu,e=h.isArray(d[0]),f=
e?d[0]:d,d=e?d[1]:d,e=h("<select/>",{name:c+"_length","aria-controls":c,"class":b.sLengthSelect}),g=0,j=f.length;g<j;g++)e[0][g]=new Option("number"===typeof d[g]?a.fnFormatNumber(d[g]):d[g],f[g]);var i=h("<div><label/></div>").addClass(b.sLength);a.aanFeatures.l||(i[0].id=c+"_length");i.children().append(a.oLanguage.sLengthMenu.replace("_MENU_",e[0].outerHTML));h("select",i).val(a._iDisplayLength).on("change.DT",function(){Ra(a,h(this).val());P(a)});h(a.nTable).on("length.dt.DT",function(b,c,d){a===
c&&h("select",i).val(d)});return i[0]}function tb(a){var b=a.sPaginationType,c=n.ext.pager[b],d="function"===typeof c,e=function(a){P(a)},b=h("<div/>").addClass(a.oClasses.sPaging+b)[0],f=a.aanFeatures;d||c.fnInit(a,b,e);f.p||(b.id=a.sTableId+"_paginate",a.aoDrawCallback.push({fn:function(a){if(d){var b=a._iDisplayStart,i=a._iDisplayLength,h=a.fnRecordsDisplay(),l=-1===i,b=l?0:Math.ceil(b/i),i=l?1:Math.ceil(h/i),h=c(b,i),k,l=0;for(k=f.p.length;l<k;l++)Na(a,"pageButton")(a,f.p[l],l,h,b,i)}else c.fnUpdate(a,
e)},sName:"pagination"}));return b}function Ta(a,b,c){var d=a._iDisplayStart,e=a._iDisplayLength,f=a.fnRecordsDisplay();0===f||-1===e?d=0:"number"===typeof b?(d=b*e,d>f&&(d=0)):"first"==b?d=0:"previous"==b?(d=0<=e?d-e:0,0>d&&(d=0)):"next"==b?d+e<f&&(d+=e):"last"==b?d=Math.floor((f-1)/e)*e:K(a,0,"Unknown paging action: "+b,5);b=a._iDisplayStart!==d;a._iDisplayStart=d;b&&(r(a,null,"page",[a]),c&&P(a));return b}function qb(a){return h("<div/>",{id:!a.aanFeatures.r?a.sTableId+"_processing":null,"class":a.oClasses.sProcessing}).html(a.oLanguage.sProcessing).insertBefore(a.nTable)[0]}
function C(a,b){a.oFeatures.bProcessing&&h(a.aanFeatures.r).css("display",b?"block":"none");r(a,null,"processing",[a,b])}function rb(a){var b=h(a.nTable);b.attr("role","grid");var c=a.oScroll;if(""===c.sX&&""===c.sY)return a.nTable;var d=c.sX,e=c.sY,f=a.oClasses,g=b.children("caption"),j=g.length?g[0]._captionSide:null,i=h(b[0].cloneNode(!1)),m=h(b[0].cloneNode(!1)),l=b.children("tfoot");l.length||(l=null);i=h("<div/>",{"class":f.sScrollWrapper}).append(h("<div/>",{"class":f.sScrollHead}).css({overflow:"hidden",
position:"relative",border:0,width:d?!d?null:v(d):"100%"}).append(h("<div/>",{"class":f.sScrollHeadInner}).css({"box-sizing":"content-box",width:c.sXInner||"100%"}).append(i.removeAttr("id").css("margin-left",0).append("top"===j?g:null).append(b.children("thead"))))).append(h("<div/>",{"class":f.sScrollBody}).css({position:"relative",overflow:"auto",width:!d?null:v(d)}).append(b));l&&i.append(h("<div/>",{"class":f.sScrollFoot}).css({overflow:"hidden",border:0,width:d?!d?null:v(d):"100%"}).append(h("<div/>",
{"class":f.sScrollFootInner}).append(m.removeAttr("id").css("margin-left",0).append("bottom"===j?g:null).append(b.children("tfoot")))));var b=i.children(),k=b[0],f=b[1],t=l?b[2]:null;if(d)h(f).on("scroll.DT",function(){var a=this.scrollLeft;k.scrollLeft=a;l&&(t.scrollLeft=a)});h(f).css(e&&c.bCollapse?"max-height":"height",e);a.nScrollHead=k;a.nScrollBody=f;a.nScrollFoot=t;a.aoDrawCallback.push({fn:la,sName:"scrolling"});return i[0]}function la(a){var b=a.oScroll,c=b.sX,d=b.sXInner,e=b.sY,b=b.iBarWidth,
f=h(a.nScrollHead),g=f[0].style,j=f.children("div"),i=j[0].style,m=j.children("table"),j=a.nScrollBody,l=h(j),q=j.style,t=h(a.nScrollFoot).children("div"),n=t.children("table"),o=h(a.nTHead),p=h(a.nTable),s=p[0],r=s.style,u=a.nTFoot?h(a.nTFoot):null,x=a.oBrowser,U=x.bScrollOversize,Xb=D(a.aoColumns,"nTh"),Q,L,R,w,Ua=[],y=[],z=[],A=[],B,C=function(a){a=a.style;a.paddingTop="0";a.paddingBottom="0";a.borderTopWidth="0";a.borderBottomWidth="0";a.height=0};L=j.scrollHeight>j.clientHeight;if(a.scrollBarVis!==
L&&a.scrollBarVis!==k)a.scrollBarVis=L,$(a);else{a.scrollBarVis=L;p.children("thead, tfoot").remove();u&&(R=u.clone().prependTo(p),Q=u.find("tr"),R=R.find("tr"));w=o.clone().prependTo(p);o=o.find("tr");L=w.find("tr");w.find("th, td").removeAttr("tabindex");c||(q.width="100%",f[0].style.width="100%");h.each(ra(a,w),function(b,c){B=aa(a,b);c.style.width=a.aoColumns[B].sWidth});u&&I(function(a){a.style.width=""},R);f=p.outerWidth();if(""===c){r.width="100%";if(U&&(p.find("tbody").height()>j.offsetHeight||
"scroll"==l.css("overflow-y")))r.width=v(p.outerWidth()-b);f=p.outerWidth()}else""!==d&&(r.width=v(d),f=p.outerWidth());I(C,L);I(function(a){z.push(a.innerHTML);Ua.push(v(h(a).css("width")))},L);I(function(a,b){if(h.inArray(a,Xb)!==-1)a.style.width=Ua[b]},o);h(L).height(0);u&&(I(C,R),I(function(a){A.push(a.innerHTML);y.push(v(h(a).css("width")))},R),I(function(a,b){a.style.width=y[b]},Q),h(R).height(0));I(function(a,b){a.innerHTML='<div class="dataTables_sizing">'+z[b]+"</div>";a.childNodes[0].style.height=
"0";a.childNodes[0].style.overflow="hidden";a.style.width=Ua[b]},L);u&&I(function(a,b){a.innerHTML='<div class="dataTables_sizing">'+A[b]+"</div>";a.childNodes[0].style.height="0";a.childNodes[0].style.overflow="hidden";a.style.width=y[b]},R);if(p.outerWidth()<f){Q=j.scrollHeight>j.offsetHeight||"scroll"==l.css("overflow-y")?f+b:f;if(U&&(j.scrollHeight>j.offsetHeight||"scroll"==l.css("overflow-y")))r.width=v(Q-b);(""===c||""!==d)&&K(a,1,"Possible column misalignment",6)}else Q="100%";q.width=v(Q);
g.width=v(Q);u&&(a.nScrollFoot.style.width=v(Q));!e&&U&&(q.height=v(s.offsetHeight+b));c=p.outerWidth();m[0].style.width=v(c);i.width=v(c);d=p.height()>j.clientHeight||"scroll"==l.css("overflow-y");e="padding"+(x.bScrollbarLeft?"Left":"Right");i[e]=d?b+"px":"0px";u&&(n[0].style.width=v(c),t[0].style.width=v(c),t[0].style[e]=d?b+"px":"0px");p.children("colgroup").insertBefore(p.children("thead"));l.scroll();if((a.bSorted||a.bFiltered)&&!a._drawHold)j.scrollTop=0}}function I(a,b,c){for(var d=0,e=0,
f=b.length,g,j;e<f;){g=b[e].firstChild;for(j=c?c[e].firstChild:null;g;)1===g.nodeType&&(c?a(g,j,d):a(g,d),d++),g=g.nextSibling,j=c?j.nextSibling:null;e++}}function Fa(a){var b=a.nTable,c=a.aoColumns,d=a.oScroll,e=d.sY,f=d.sX,g=d.sXInner,j=c.length,i=ma(a,"bVisible"),m=h("th",a.nTHead),l=b.getAttribute("width"),k=b.parentNode,t=!1,n,o,p=a.oBrowser,d=p.bScrollOversize;(n=b.style.width)&&-1!==n.indexOf("%")&&(l=n);for(n=0;n<i.length;n++)o=c[i[n]],null!==o.sWidth&&(o.sWidth=Eb(o.sWidthOrig,k),t=!0);if(d||
!t&&!f&&!e&&j==V(a)&&j==m.length)for(n=0;n<j;n++)i=aa(a,n),null!==i&&(c[i].sWidth=v(m.eq(n).width()));else{j=h(b).clone().css("visibility","hidden").removeAttr("id");j.find("tbody tr").remove();var s=h("<tr/>").appendTo(j.find("tbody"));j.find("thead, tfoot").remove();j.append(h(a.nTHead).clone()).append(h(a.nTFoot).clone());j.find("tfoot th, tfoot td").css("width","");m=ra(a,j.find("thead")[0]);for(n=0;n<i.length;n++)o=c[i[n]],m[n].style.width=null!==o.sWidthOrig&&""!==o.sWidthOrig?v(o.sWidthOrig):
"",o.sWidthOrig&&f&&h(m[n]).append(h("<div/>").css({width:o.sWidthOrig,margin:0,padding:0,border:0,height:1}));if(a.aoData.length)for(n=0;n<i.length;n++)t=i[n],o=c[t],h(Fb(a,t)).clone(!1).append(o.sContentPadding).appendTo(s);h("[name]",j).removeAttr("name");o=h("<div/>").css(f||e?{position:"absolute",top:0,left:0,height:1,right:0,overflow:"hidden"}:{}).append(j).appendTo(k);f&&g?j.width(g):f?(j.css("width","auto"),j.removeAttr("width"),j.width()<k.clientWidth&&l&&j.width(k.clientWidth)):e?j.width(k.clientWidth):
l&&j.width(l);for(n=e=0;n<i.length;n++)k=h(m[n]),g=k.outerWidth()-k.width(),k=p.bBounding?Math.ceil(m[n].getBoundingClientRect().width):k.outerWidth(),e+=k,c[i[n]].sWidth=v(k-g);b.style.width=v(e);o.remove()}l&&(b.style.width=v(l));if((l||f)&&!a._reszEvt)b=function(){h(E).on("resize.DT-"+a.sInstance,Oa(function(){$(a)}))},d?setTimeout(b,1E3):b(),a._reszEvt=!0}function Eb(a,b){if(!a)return 0;var c=h("<div/>").css("width",v(a)).appendTo(b||H.body),d=c[0].offsetWidth;c.remove();return d}function Fb(a,
b){var c=Gb(a,b);if(0>c)return null;var d=a.aoData[c];return!d.nTr?h("<td/>").html(B(a,c,b,"display"))[0]:d.anCells[b]}function Gb(a,b){for(var c,d=-1,e=-1,f=0,g=a.aoData.length;f<g;f++)c=B(a,f,b,"display")+"",c=c.replace(Yb,""),c=c.replace(/&nbsp;/g," "),c.length>d&&(d=c.length,e=f);return e}function v(a){return null===a?"0px":"number"==typeof a?0>a?"0px":a+"px":a.match(/\d$/)?a+"px":a}function X(a){var b,c,d=[],e=a.aoColumns,f,g,j,i;b=a.aaSortingFixed;c=h.isPlainObject(b);var m=[];f=function(a){a.length&&
!h.isArray(a[0])?m.push(a):h.merge(m,a)};h.isArray(b)&&f(b);c&&b.pre&&f(b.pre);f(a.aaSorting);c&&b.post&&f(b.post);for(a=0;a<m.length;a++){i=m[a][0];f=e[i].aDataSort;b=0;for(c=f.length;b<c;b++)g=f[b],j=e[g].sType||"string",m[a]._idx===k&&(m[a]._idx=h.inArray(m[a][1],e[g].asSorting)),d.push({src:i,col:g,dir:m[a][1],index:m[a]._idx,type:j,formatter:n.ext.type.order[j+"-pre"]})}return d}function mb(a){var b,c,d=[],e=n.ext.type.order,f=a.aoData,g=0,j,i=a.aiDisplayMaster,h;Ga(a);h=X(a);b=0;for(c=h.length;b<
c;b++)j=h[b],j.formatter&&g++,Hb(a,j.col);if("ssp"!=y(a)&&0!==h.length){b=0;for(c=i.length;b<c;b++)d[i[b]]=b;g===h.length?i.sort(function(a,b){var c,e,g,j,i=h.length,k=f[a]._aSortData,n=f[b]._aSortData;for(g=0;g<i;g++)if(j=h[g],c=k[j.col],e=n[j.col],c=c<e?-1:c>e?1:0,0!==c)return"asc"===j.dir?c:-c;c=d[a];e=d[b];return c<e?-1:c>e?1:0}):i.sort(function(a,b){var c,g,j,i,k=h.length,n=f[a]._aSortData,o=f[b]._aSortData;for(j=0;j<k;j++)if(i=h[j],c=n[i.col],g=o[i.col],i=e[i.type+"-"+i.dir]||e["string-"+i.dir],
c=i(c,g),0!==c)return c;c=d[a];g=d[b];return c<g?-1:c>g?1:0})}a.bSorted=!0}function Ib(a){for(var b,c,d=a.aoColumns,e=X(a),a=a.oLanguage.oAria,f=0,g=d.length;f<g;f++){c=d[f];var j=c.asSorting;b=c.sTitle.replace(/<.*?>/g,"");var i=c.nTh;i.removeAttribute("aria-sort");c.bSortable&&(0<e.length&&e[0].col==f?(i.setAttribute("aria-sort","asc"==e[0].dir?"ascending":"descending"),c=j[e[0].index+1]||j[0]):c=j[0],b+="asc"===c?a.sSortAscending:a.sSortDescending);i.setAttribute("aria-label",b)}}function Va(a,
b,c,d){var e=a.aaSorting,f=a.aoColumns[b].asSorting,g=function(a,b){var c=a._idx;c===k&&(c=h.inArray(a[1],f));return c+1<f.length?c+1:b?null:0};"number"===typeof e[0]&&(e=a.aaSorting=[e]);c&&a.oFeatures.bSortMulti?(c=h.inArray(b,D(e,"0")),-1!==c?(b=g(e[c],!0),null===b&&1===e.length&&(b=0),null===b?e.splice(c,1):(e[c][1]=f[b],e[c]._idx=b)):(e.push([b,f[0],0]),e[e.length-1]._idx=0)):e.length&&e[0][0]==b?(b=g(e[0]),e.length=1,e[0][1]=f[b],e[0]._idx=b):(e.length=0,e.push([b,f[0]]),e[0]._idx=0);T(a);"function"==
typeof d&&d(a)}function Ma(a,b,c,d){var e=a.aoColumns[c];Wa(b,{},function(b){!1!==e.bSortable&&(a.oFeatures.bProcessing?(C(a,!0),setTimeout(function(){Va(a,c,b.shiftKey,d);"ssp"!==y(a)&&C(a,!1)},0)):Va(a,c,b.shiftKey,d))})}function wa(a){var b=a.aLastSort,c=a.oClasses.sSortColumn,d=X(a),e=a.oFeatures,f,g;if(e.bSort&&e.bSortClasses){e=0;for(f=b.length;e<f;e++)g=b[e].src,h(D(a.aoData,"anCells",g)).removeClass(c+(2>e?e+1:3));e=0;for(f=d.length;e<f;e++)g=d[e].src,h(D(a.aoData,"anCells",g)).addClass(c+
(2>e?e+1:3))}a.aLastSort=d}function Hb(a,b){var c=a.aoColumns[b],d=n.ext.order[c.sSortDataType],e;d&&(e=d.call(a.oInstance,a,b,ba(a,b)));for(var f,g=n.ext.type.order[c.sType+"-pre"],j=0,i=a.aoData.length;j<i;j++)if(c=a.aoData[j],c._aSortData||(c._aSortData=[]),!c._aSortData[b]||d)f=d?e[j]:B(a,j,b,"sort"),c._aSortData[b]=g?g(f):f}function xa(a){if(a.oFeatures.bStateSave&&!a.bDestroying){var b={time:+new Date,start:a._iDisplayStart,length:a._iDisplayLength,order:h.extend(!0,[],a.aaSorting),search:Ab(a.oPreviousSearch),
columns:h.map(a.aoColumns,function(b,d){return{visible:b.bVisible,search:Ab(a.aoPreSearchCols[d])}})};r(a,"aoStateSaveParams","stateSaveParams",[a,b]);a.oSavedState=b;a.fnStateSaveCallback.call(a.oInstance,a,b)}}function Jb(a,b,c){var d,e,f=a.aoColumns,b=function(b){if(b&&b.time){var g=r(a,"aoStateLoadParams","stateLoadParams",[a,b]);if(-1===h.inArray(!1,g)&&(g=a.iStateDuration,!(0<g&&b.time<+new Date-1E3*g)&&!(b.columns&&f.length!==b.columns.length))){a.oLoadedState=h.extend(!0,{},b);b.start!==k&&
(a._iDisplayStart=b.start,a.iInitDisplayStart=b.start);b.length!==k&&(a._iDisplayLength=b.length);b.order!==k&&(a.aaSorting=[],h.each(b.order,function(b,c){a.aaSorting.push(c[0]>=f.length?[0,c[1]]:c)}));b.search!==k&&h.extend(a.oPreviousSearch,Bb(b.search));if(b.columns){d=0;for(e=b.columns.length;d<e;d++)g=b.columns[d],g.visible!==k&&(f[d].bVisible=g.visible),g.search!==k&&h.extend(a.aoPreSearchCols[d],Bb(g.search))}r(a,"aoStateLoaded","stateLoaded",[a,b])}}c()};if(a.oFeatures.bStateSave){var g=
a.fnStateLoadCallback.call(a.oInstance,a,b);g!==k&&b(g)}else c()}function ya(a){var b=n.settings,a=h.inArray(a,D(b,"nTable"));return-1!==a?b[a]:null}function K(a,b,c,d){c="DataTables warning: "+(a?"table id="+a.sTableId+" - ":"")+c;d&&(c+=". For more information about this error, please see http://datatables.net/tn/"+d);if(b)E.console&&console.log&&console.log(c);else if(b=n.ext,b=b.sErrMode||b.errMode,a&&r(a,null,"error",[a,d,c]),"alert"==b)alert(c);else{if("throw"==b)throw Error(c);"function"==
typeof b&&b(a,d,c)}}function F(a,b,c,d){h.isArray(c)?h.each(c,function(c,d){h.isArray(d)?F(a,b,d[0],d[1]):F(a,b,d)}):(d===k&&(d=c),b[c]!==k&&(a[d]=b[c]))}function Xa(a,b,c){var d,e;for(e in b)b.hasOwnProperty(e)&&(d=b[e],h.isPlainObject(d)?(h.isPlainObject(a[e])||(a[e]={}),h.extend(!0,a[e],d)):a[e]=c&&"data"!==e&&"aaData"!==e&&h.isArray(d)?d.slice():d);return a}function Wa(a,b,c){h(a).on("click.DT",b,function(b){h(a).blur();c(b)}).on("keypress.DT",b,function(a){13===a.which&&(a.preventDefault(),c(a))}).on("selectstart.DT",
function(){return!1})}function z(a,b,c,d){c&&a[b].push({fn:c,sName:d})}function r(a,b,c,d){var e=[];b&&(e=h.map(a[b].slice().reverse(),function(b){return b.fn.apply(a.oInstance,d)}));null!==c&&(b=h.Event(c+".dt"),h(a.nTable).trigger(b,d),e.push(b.result));return e}function Sa(a){var b=a._iDisplayStart,c=a.fnDisplayEnd(),d=a._iDisplayLength;b>=c&&(b=c-d);b-=b%d;if(-1===d||0>b)b=0;a._iDisplayStart=b}function Na(a,b){var c=a.renderer,d=n.ext.renderer[b];return h.isPlainObject(c)&&c[b]?d[c[b]]||d._:"string"===
typeof c?d[c]||d._:d._}function y(a){return a.oFeatures.bServerSide?"ssp":a.ajax||a.sAjaxSource?"ajax":"dom"}function ia(a,b){var c=[],c=Kb.numbers_length,d=Math.floor(c/2);b<=c?c=Y(0,b):a<=d?(c=Y(0,c-2),c.push("ellipsis"),c.push(b-1)):(a>=b-1-d?c=Y(b-(c-2),b):(c=Y(a-d+2,a+d-1),c.push("ellipsis"),c.push(b-1)),c.splice(0,0,"ellipsis"),c.splice(0,0,0));c.DT_el="span";return c}function Da(a){h.each({num:function(b){return za(b,a)},"num-fmt":function(b){return za(b,a,Ya)},"html-num":function(b){return za(b,
a,Aa)},"html-num-fmt":function(b){return za(b,a,Aa,Ya)}},function(b,c){x.type.order[b+a+"-pre"]=c;b.match(/^html\-/)&&(x.type.search[b+a]=x.type.search.html)})}function Lb(a){return function(){var b=[ya(this[n.ext.iApiIndex])].concat(Array.prototype.slice.call(arguments));return n.ext.internal[a].apply(this,b)}}var n=function(a){this.$=function(a,b){return this.api(!0).$(a,b)};this._=function(a,b){return this.api(!0).rows(a,b).data()};this.api=function(a){return a?new s(ya(this[x.iApiIndex])):new s(this)};
this.fnAddData=function(a,b){var c=this.api(!0),d=h.isArray(a)&&(h.isArray(a[0])||h.isPlainObject(a[0]))?c.rows.add(a):c.row.add(a);(b===k||b)&&c.draw();return d.flatten().toArray()};this.fnAdjustColumnSizing=function(a){var b=this.api(!0).columns.adjust(),c=b.settings()[0],d=c.oScroll;a===k||a?b.draw(!1):(""!==d.sX||""!==d.sY)&&la(c)};this.fnClearTable=function(a){var b=this.api(!0).clear();(a===k||a)&&b.draw()};this.fnClose=function(a){this.api(!0).row(a).child.hide()};this.fnDeleteRow=function(a,
b,c){var d=this.api(!0),a=d.rows(a),e=a.settings()[0],h=e.aoData[a[0][0]];a.remove();b&&b.call(this,e,h);(c===k||c)&&d.draw();return h};this.fnDestroy=function(a){this.api(!0).destroy(a)};this.fnDraw=function(a){this.api(!0).draw(a)};this.fnFilter=function(a,b,c,d,e,h){e=this.api(!0);null===b||b===k?e.search(a,c,d,h):e.column(b).search(a,c,d,h);e.draw()};this.fnGetData=function(a,b){var c=this.api(!0);if(a!==k){var d=a.nodeName?a.nodeName.toLowerCase():"";return b!==k||"td"==d||"th"==d?c.cell(a,b).data():
c.row(a).data()||null}return c.data().toArray()};this.fnGetNodes=function(a){var b=this.api(!0);return a!==k?b.row(a).node():b.rows().nodes().flatten().toArray()};this.fnGetPosition=function(a){var b=this.api(!0),c=a.nodeName.toUpperCase();return"TR"==c?b.row(a).index():"TD"==c||"TH"==c?(a=b.cell(a).index(),[a.row,a.columnVisible,a.column]):null};this.fnIsOpen=function(a){return this.api(!0).row(a).child.isShown()};this.fnOpen=function(a,b,c){return this.api(!0).row(a).child(b,c).show().child()[0]};
this.fnPageChange=function(a,b){var c=this.api(!0).page(a);(b===k||b)&&c.draw(!1)};this.fnSetColumnVis=function(a,b,c){a=this.api(!0).column(a).visible(b);(c===k||c)&&a.columns.adjust().draw()};this.fnSettings=function(){return ya(this[x.iApiIndex])};this.fnSort=function(a){this.api(!0).order(a).draw()};this.fnSortListener=function(a,b,c){this.api(!0).order.listener(a,b,c)};this.fnUpdate=function(a,b,c,d,e){var h=this.api(!0);c===k||null===c?h.row(b).data(a):h.cell(b,c).data(a);(e===k||e)&&h.columns.adjust();
(d===k||d)&&h.draw();return 0};this.fnVersionCheck=x.fnVersionCheck;var b=this,c=a===k,d=this.length;c&&(a={});this.oApi=this.internal=x.internal;for(var e in n.ext.internal)e&&(this[e]=Lb(e));this.each(function(){var e={},g=1<d?Xa(e,a,!0):a,j=0,i,e=this.getAttribute("id"),m=!1,l=n.defaults,q=h(this);if("table"!=this.nodeName.toLowerCase())K(null,0,"Non-table node initialisation ("+this.nodeName+")",2);else{eb(l);fb(l.column);J(l,l,!0);J(l.column,l.column,!0);J(l,h.extend(g,q.data()));var t=n.settings,
j=0;for(i=t.length;j<i;j++){var o=t[j];if(o.nTable==this||o.nTHead&&o.nTHead.parentNode==this||o.nTFoot&&o.nTFoot.parentNode==this){var s=g.bRetrieve!==k?g.bRetrieve:l.bRetrieve;if(c||s)return o.oInstance;if(g.bDestroy!==k?g.bDestroy:l.bDestroy){o.oInstance.fnDestroy();break}else{K(o,0,"Cannot reinitialise DataTable",3);return}}if(o.sTableId==this.id){t.splice(j,1);break}}if(null===e||""===e)this.id=e="DataTables_Table_"+n.ext._unique++;var p=h.extend(!0,{},n.models.oSettings,{sDestroyWidth:q[0].style.width,
sInstance:e,sTableId:e});p.nTable=this;p.oApi=b.internal;p.oInit=g;t.push(p);p.oInstance=1===b.length?b:q.dataTable();eb(g);Ca(g.oLanguage);g.aLengthMenu&&!g.iDisplayLength&&(g.iDisplayLength=h.isArray(g.aLengthMenu[0])?g.aLengthMenu[0][0]:g.aLengthMenu[0]);g=Xa(h.extend(!0,{},l),g);F(p.oFeatures,g,"bPaginate bLengthChange bFilter bSort bSortMulti bInfo bProcessing bAutoWidth bSortClasses bServerSide bDeferRender".split(" "));F(p,g,["asStripeClasses","ajax","fnServerData","fnFormatNumber","sServerMethod",
"aaSorting","aaSortingFixed","aLengthMenu","sPaginationType","sAjaxSource","sAjaxDataProp","iStateDuration","sDom","bSortCellsTop","iTabIndex","fnStateLoadCallback","fnStateSaveCallback","renderer","searchDelay","rowId",["iCookieDuration","iStateDuration"],["oSearch","oPreviousSearch"],["aoSearchCols","aoPreSearchCols"],["iDisplayLength","_iDisplayLength"]]);F(p.oScroll,g,[["sScrollX","sX"],["sScrollXInner","sXInner"],["sScrollY","sY"],["bScrollCollapse","bCollapse"]]);F(p.oLanguage,g,"fnInfoCallback");
z(p,"aoDrawCallback",g.fnDrawCallback,"user");z(p,"aoServerParams",g.fnServerParams,"user");z(p,"aoStateSaveParams",g.fnStateSaveParams,"user");z(p,"aoStateLoadParams",g.fnStateLoadParams,"user");z(p,"aoStateLoaded",g.fnStateLoaded,"user");z(p,"aoRowCallback",g.fnRowCallback,"user");z(p,"aoRowCreatedCallback",g.fnCreatedRow,"user");z(p,"aoHeaderCallback",g.fnHeaderCallback,"user");z(p,"aoFooterCallback",g.fnFooterCallback,"user");z(p,"aoInitComplete",g.fnInitComplete,"user");z(p,"aoPreDrawCallback",
g.fnPreDrawCallback,"user");p.rowIdFn=S(g.rowId);gb(p);var u=p.oClasses;h.extend(u,n.ext.classes,g.oClasses);q.addClass(u.sTable);p.iInitDisplayStart===k&&(p.iInitDisplayStart=g.iDisplayStart,p._iDisplayStart=g.iDisplayStart);null!==g.iDeferLoading&&(p.bDeferLoading=!0,e=h.isArray(g.iDeferLoading),p._iRecordsDisplay=e?g.iDeferLoading[0]:g.iDeferLoading,p._iRecordsTotal=e?g.iDeferLoading[1]:g.iDeferLoading);var v=p.oLanguage;h.extend(!0,v,g.oLanguage);v.sUrl&&(h.ajax({dataType:"json",url:v.sUrl,success:function(a){Ca(a);
J(l.oLanguage,a);h.extend(true,v,a);ha(p)},error:function(){ha(p)}}),m=!0);null===g.asStripeClasses&&(p.asStripeClasses=[u.sStripeOdd,u.sStripeEven]);var e=p.asStripeClasses,x=q.children("tbody").find("tr").eq(0);-1!==h.inArray(!0,h.map(e,function(a){return x.hasClass(a)}))&&(h("tbody tr",this).removeClass(e.join(" ")),p.asDestroyStripes=e.slice());e=[];t=this.getElementsByTagName("thead");0!==t.length&&(ea(p.aoHeader,t[0]),e=ra(p));if(null===g.aoColumns){t=[];j=0;for(i=e.length;j<i;j++)t.push(null)}else t=
g.aoColumns;j=0;for(i=t.length;j<i;j++)Ea(p,e?e[j]:null);ib(p,g.aoColumnDefs,t,function(a,b){ka(p,a,b)});if(x.length){var w=function(a,b){return a.getAttribute("data-"+b)!==null?b:null};h(x[0]).children("th, td").each(function(a,b){var c=p.aoColumns[a];if(c.mData===a){var d=w(b,"sort")||w(b,"order"),e=w(b,"filter")||w(b,"search");if(d!==null||e!==null){c.mData={_:a+".display",sort:d!==null?a+".@data-"+d:k,type:d!==null?a+".@data-"+d:k,filter:e!==null?a+".@data-"+e:k};ka(p,a)}}})}var U=p.oFeatures,
e=function(){if(g.aaSorting===k){var a=p.aaSorting;j=0;for(i=a.length;j<i;j++)a[j][1]=p.aoColumns[j].asSorting[0]}wa(p);U.bSort&&z(p,"aoDrawCallback",function(){if(p.bSorted){var a=X(p),b={};h.each(a,function(a,c){b[c.src]=c.dir});r(p,null,"order",[p,a,b]);Ib(p)}});z(p,"aoDrawCallback",function(){(p.bSorted||y(p)==="ssp"||U.bDeferRender)&&wa(p)},"sc");var a=q.children("caption").each(function(){this._captionSide=h(this).css("caption-side")}),b=q.children("thead");b.length===0&&(b=h("<thead/>").appendTo(q));
p.nTHead=b[0];b=q.children("tbody");b.length===0&&(b=h("<tbody/>").appendTo(q));p.nTBody=b[0];b=q.children("tfoot");if(b.length===0&&a.length>0&&(p.oScroll.sX!==""||p.oScroll.sY!==""))b=h("<tfoot/>").appendTo(q);if(b.length===0||b.children().length===0)q.addClass(u.sNoFooter);else if(b.length>0){p.nTFoot=b[0];ea(p.aoFooter,p.nTFoot)}if(g.aaData)for(j=0;j<g.aaData.length;j++)O(p,g.aaData[j]);else(p.bDeferLoading||y(p)=="dom")&&na(p,h(p.nTBody).children("tr"));p.aiDisplay=p.aiDisplayMaster.slice();
p.bInitialised=true;m===false&&ha(p)};g.bStateSave?(U.bStateSave=!0,z(p,"aoDrawCallback",xa,"state_save"),Jb(p,g,e)):e()}});b=null;return this},x,s,o,u,Za={},Mb=/[\r\n]/g,Aa=/<.*?>/g,Zb=/^\d{2,4}[\.\/\-]\d{1,2}[\.\/\-]\d{1,2}([T ]{1}\d{1,2}[:\.]\d{2}([\.:]\d{2})?)?$/,$b=RegExp("(\\/|\\.|\\*|\\+|\\?|\\||\\(|\\)|\\[|\\]|\\{|\\}|\\\\|\\$|\\^|\\-)","g"),Ya=/[',$£€¥%\u2009\u202F\u20BD\u20a9\u20BArfkɃΞ]/gi,M=function(a){return!a||!0===a||"-"===a?!0:!1},Nb=function(a){var b=parseInt(a,10);return!isNaN(b)&&
isFinite(a)?b:null},Ob=function(a,b){Za[b]||(Za[b]=RegExp(Qa(b),"g"));return"string"===typeof a&&"."!==b?a.replace(/\./g,"").replace(Za[b],"."):a},$a=function(a,b,c){var d="string"===typeof a;if(M(a))return!0;b&&d&&(a=Ob(a,b));c&&d&&(a=a.replace(Ya,""));return!isNaN(parseFloat(a))&&isFinite(a)},Pb=function(a,b,c){return M(a)?!0:!(M(a)||"string"===typeof a)?null:$a(a.replace(Aa,""),b,c)?!0:null},D=function(a,b,c){var d=[],e=0,f=a.length;if(c!==k)for(;e<f;e++)a[e]&&a[e][b]&&d.push(a[e][b][c]);else for(;e<
f;e++)a[e]&&d.push(a[e][b]);return d},ja=function(a,b,c,d){var e=[],f=0,g=b.length;if(d!==k)for(;f<g;f++)a[b[f]][c]&&e.push(a[b[f]][c][d]);else for(;f<g;f++)e.push(a[b[f]][c]);return e},Y=function(a,b){var c=[],d;b===k?(b=0,d=a):(d=b,b=a);for(var e=b;e<d;e++)c.push(e);return c},Qb=function(a){for(var b=[],c=0,d=a.length;c<d;c++)a[c]&&b.push(a[c]);return b},qa=function(a){var b;a:{if(!(2>a.length)){b=a.slice().sort();for(var c=b[0],d=1,e=b.length;d<e;d++){if(b[d]===c){b=!1;break a}c=b[d]}}b=!0}if(b)return a.slice();
b=[];var e=a.length,f,g=0,d=0;a:for(;d<e;d++){c=a[d];for(f=0;f<g;f++)if(b[f]===c)continue a;b.push(c);g++}return b};n.util={throttle:function(a,b){var c=b!==k?b:200,d,e;return function(){var b=this,g=+new Date,j=arguments;d&&g<d+c?(clearTimeout(e),e=setTimeout(function(){d=k;a.apply(b,j)},c)):(d=g,a.apply(b,j))}},escapeRegex:function(a){return a.replace($b,"\\$1")}};var A=function(a,b,c){a[b]!==k&&(a[c]=a[b])},ca=/\[.*?\]$/,W=/\(\)$/,Qa=n.util.escapeRegex,va=h("<div>")[0],Wb=va.textContent!==k,Yb=
/<.*?>/g,Oa=n.util.throttle,Rb=[],w=Array.prototype,ac=function(a){var b,c,d=n.settings,e=h.map(d,function(a){return a.nTable});if(a){if(a.nTable&&a.oApi)return[a];if(a.nodeName&&"table"===a.nodeName.toLowerCase())return b=h.inArray(a,e),-1!==b?[d[b]]:null;if(a&&"function"===typeof a.settings)return a.settings().toArray();"string"===typeof a?c=h(a):a instanceof h&&(c=a)}else return[];if(c)return c.map(function(){b=h.inArray(this,e);return-1!==b?d[b]:null}).toArray()};s=function(a,b){if(!(this instanceof
s))return new s(a,b);var c=[],d=function(a){(a=ac(a))&&(c=c.concat(a))};if(h.isArray(a))for(var e=0,f=a.length;e<f;e++)d(a[e]);else d(a);this.context=qa(c);b&&h.merge(this,b);this.selector={rows:null,cols:null,opts:null};s.extend(this,this,Rb)};n.Api=s;h.extend(s.prototype,{any:function(){return 0!==this.count()},concat:w.concat,context:[],count:function(){return this.flatten().length},each:function(a){for(var b=0,c=this.length;b<c;b++)a.call(this,this[b],b,this);return this},eq:function(a){var b=
this.context;return b.length>a?new s(b[a],this[a]):null},filter:function(a){var b=[];if(w.filter)b=w.filter.call(this,a,this);else for(var c=0,d=this.length;c<d;c++)a.call(this,this[c],c,this)&&b.push(this[c]);return new s(this.context,b)},flatten:function(){var a=[];return new s(this.context,a.concat.apply(a,this.toArray()))},join:w.join,indexOf:w.indexOf||function(a,b){for(var c=b||0,d=this.length;c<d;c++)if(this[c]===a)return c;return-1},iterator:function(a,b,c,d){var e=[],f,g,j,h,m,l=this.context,
n,o,u=this.selector;"string"===typeof a&&(d=c,c=b,b=a,a=!1);g=0;for(j=l.length;g<j;g++){var r=new s(l[g]);if("table"===b)f=c.call(r,l[g],g),f!==k&&e.push(f);else if("columns"===b||"rows"===b)f=c.call(r,l[g],this[g],g),f!==k&&e.push(f);else if("column"===b||"column-rows"===b||"row"===b||"cell"===b){o=this[g];"column-rows"===b&&(n=Ba(l[g],u.opts));h=0;for(m=o.length;h<m;h++)f=o[h],f="cell"===b?c.call(r,l[g],f.row,f.column,g,h):c.call(r,l[g],f,g,h,n),f!==k&&e.push(f)}}return e.length||d?(a=new s(l,a?
e.concat.apply([],e):e),b=a.selector,b.rows=u.rows,b.cols=u.cols,b.opts=u.opts,a):this},lastIndexOf:w.lastIndexOf||function(a,b){return this.indexOf.apply(this.toArray.reverse(),arguments)},length:0,map:function(a){var b=[];if(w.map)b=w.map.call(this,a,this);else for(var c=0,d=this.length;c<d;c++)b.push(a.call(this,this[c],c));return new s(this.context,b)},pluck:function(a){return this.map(function(b){return b[a]})},pop:w.pop,push:w.push,reduce:w.reduce||function(a,b){return hb(this,a,b,0,this.length,
1)},reduceRight:w.reduceRight||function(a,b){return hb(this,a,b,this.length-1,-1,-1)},reverse:w.reverse,selector:null,shift:w.shift,slice:function(){return new s(this.context,this)},sort:w.sort,splice:w.splice,toArray:function(){return w.slice.call(this)},to$:function(){return h(this)},toJQuery:function(){return h(this)},unique:function(){return new s(this.context,qa(this))},unshift:w.unshift});s.extend=function(a,b,c){if(c.length&&b&&(b instanceof s||b.__dt_wrapper)){var d,e,f,g=function(a,b,c){return function(){var d=
b.apply(a,arguments);s.extend(d,d,c.methodExt);return d}};d=0;for(e=c.length;d<e;d++)f=c[d],b[f.name]="function"===typeof f.val?g(a,f.val,f):h.isPlainObject(f.val)?{}:f.val,b[f.name].__dt_wrapper=!0,s.extend(a,b[f.name],f.propExt)}};s.register=o=function(a,b){if(h.isArray(a))for(var c=0,d=a.length;c<d;c++)s.register(a[c],b);else for(var e=a.split("."),f=Rb,g,j,c=0,d=e.length;c<d;c++){g=(j=-1!==e[c].indexOf("()"))?e[c].replace("()",""):e[c];var i;a:{i=0;for(var m=f.length;i<m;i++)if(f[i].name===g){i=
f[i];break a}i=null}i||(i={name:g,val:{},methodExt:[],propExt:[]},f.push(i));c===d-1?i.val=b:f=j?i.methodExt:i.propExt}};s.registerPlural=u=function(a,b,c){s.register(a,c);s.register(b,function(){var a=c.apply(this,arguments);return a===this?this:a instanceof s?a.length?h.isArray(a[0])?new s(a.context,a[0]):a[0]:k:a})};o("tables()",function(a){var b;if(a){b=s;var c=this.context;if("number"===typeof a)a=[c[a]];else var d=h.map(c,function(a){return a.nTable}),a=h(d).filter(a).map(function(){var a=h.inArray(this,
d);return c[a]}).toArray();b=new b(a)}else b=this;return b});o("table()",function(a){var a=this.tables(a),b=a.context;return b.length?new s(b[0]):a});u("tables().nodes()","table().node()",function(){return this.iterator("table",function(a){return a.nTable},1)});u("tables().body()","table().body()",function(){return this.iterator("table",function(a){return a.nTBody},1)});u("tables().header()","table().header()",function(){return this.iterator("table",function(a){return a.nTHead},1)});u("tables().footer()",
"table().footer()",function(){return this.iterator("table",function(a){return a.nTFoot},1)});u("tables().containers()","table().container()",function(){return this.iterator("table",function(a){return a.nTableWrapper},1)});o("draw()",function(a){return this.iterator("table",function(b){"page"===a?P(b):("string"===typeof a&&(a="full-hold"===a?!1:!0),T(b,!1===a))})});o("page()",function(a){return a===k?this.page.info().page:this.iterator("table",function(b){Ta(b,a)})});o("page.info()",function(){if(0===
this.context.length)return k;var a=this.context[0],b=a._iDisplayStart,c=a.oFeatures.bPaginate?a._iDisplayLength:-1,d=a.fnRecordsDisplay(),e=-1===c;return{page:e?0:Math.floor(b/c),pages:e?1:Math.ceil(d/c),start:b,end:a.fnDisplayEnd(),length:c,recordsTotal:a.fnRecordsTotal(),recordsDisplay:d,serverSide:"ssp"===y(a)}});o("page.len()",function(a){return a===k?0!==this.context.length?this.context[0]._iDisplayLength:k:this.iterator("table",function(b){Ra(b,a)})});var Sb=function(a,b,c){if(c){var d=new s(a);
d.one("draw",function(){c(d.ajax.json())})}if("ssp"==y(a))T(a,b);else{C(a,!0);var e=a.jqXHR;e&&4!==e.readyState&&e.abort();sa(a,[],function(c){oa(a);for(var c=ta(a,c),d=0,e=c.length;d<e;d++)O(a,c[d]);T(a,b);C(a,!1)})}};o("ajax.json()",function(){var a=this.context;if(0<a.length)return a[0].json});o("ajax.params()",function(){var a=this.context;if(0<a.length)return a[0].oAjaxData});o("ajax.reload()",function(a,b){return this.iterator("table",function(c){Sb(c,!1===b,a)})});o("ajax.url()",function(a){var b=
this.context;if(a===k){if(0===b.length)return k;b=b[0];return b.ajax?h.isPlainObject(b.ajax)?b.ajax.url:b.ajax:b.sAjaxSource}return this.iterator("table",function(b){h.isPlainObject(b.ajax)?b.ajax.url=a:b.ajax=a})});o("ajax.url().load()",function(a,b){return this.iterator("table",function(c){Sb(c,!1===b,a)})});var ab=function(a,b,c,d,e){var f=[],g,j,i,m,l,n;i=typeof b;if(!b||"string"===i||"function"===i||b.length===k)b=[b];i=0;for(m=b.length;i<m;i++){j=b[i]&&b[i].split&&!b[i].match(/[\[\(:]/)?b[i].split(","):
[b[i]];l=0;for(n=j.length;l<n;l++)(g=c("string"===typeof j[l]?h.trim(j[l]):j[l]))&&g.length&&(f=f.concat(g))}a=x.selector[a];if(a.length){i=0;for(m=a.length;i<m;i++)f=a[i](d,e,f)}return qa(f)},bb=function(a){a||(a={});a.filter&&a.search===k&&(a.search=a.filter);return h.extend({search:"none",order:"current",page:"all"},a)},cb=function(a){for(var b=0,c=a.length;b<c;b++)if(0<a[b].length)return a[0]=a[b],a[0].length=1,a.length=1,a.context=[a.context[b]],a;a.length=0;return a},Ba=function(a,b){var c,
d,e,f=[],g=a.aiDisplay;e=a.aiDisplayMaster;var j=b.search;c=b.order;d=b.page;if("ssp"==y(a))return"removed"===j?[]:Y(0,e.length);if("current"==d){c=a._iDisplayStart;for(d=a.fnDisplayEnd();c<d;c++)f.push(g[c])}else if("current"==c||"applied"==c)if("none"==j)f=e.slice();else if("applied"==j)f=g.slice();else{if("removed"==j){var i={};c=0;for(d=g.length;c<d;c++)i[g[c]]=null;f=h.map(e,function(a){return!i.hasOwnProperty(a)?a:null})}}else if("index"==c||"original"==c){c=0;for(d=a.aoData.length;c<d;c++)"none"==
j?f.push(c):(e=h.inArray(c,g),(-1===e&&"removed"==j||0<=e&&"applied"==j)&&f.push(c))}return f};o("rows()",function(a,b){a===k?a="":h.isPlainObject(a)&&(b=a,a="");var b=bb(b),c=this.iterator("table",function(c){var e=b,f;return ab("row",a,function(a){var b=Nb(a),i=c.aoData;if(b!==null&&!e)return[b];f||(f=Ba(c,e));if(b!==null&&h.inArray(b,f)!==-1)return[b];if(a===null||a===k||a==="")return f;if(typeof a==="function")return h.map(f,function(b){var c=i[b];return a(b,c._aData,c.nTr)?b:null});if(a.nodeName){var b=
a._DT_RowIndex,m=a._DT_CellIndex;if(b!==k)return i[b]&&i[b].nTr===a?[b]:[];if(m)return i[m.row]&&i[m.row].nTr===a?[m.row]:[];b=h(a).closest("*[data-dt-row]");return b.length?[b.data("dt-row")]:[]}if(typeof a==="string"&&a.charAt(0)==="#"){b=c.aIds[a.replace(/^#/,"")];if(b!==k)return[b.idx]}b=Qb(ja(c.aoData,f,"nTr"));return h(b).filter(a).map(function(){return this._DT_RowIndex}).toArray()},c,e)},1);c.selector.rows=a;c.selector.opts=b;return c});o("rows().nodes()",function(){return this.iterator("row",
function(a,b){return a.aoData[b].nTr||k},1)});o("rows().data()",function(){return this.iterator(!0,"rows",function(a,b){return ja(a.aoData,b,"_aData")},1)});u("rows().cache()","row().cache()",function(a){return this.iterator("row",function(b,c){var d=b.aoData[c];return"search"===a?d._aFilterData:d._aSortData},1)});u("rows().invalidate()","row().invalidate()",function(a){return this.iterator("row",function(b,c){da(b,c,a)})});u("rows().indexes()","row().index()",function(){return this.iterator("row",
function(a,b){return b},1)});u("rows().ids()","row().id()",function(a){for(var b=[],c=this.context,d=0,e=c.length;d<e;d++)for(var f=0,g=this[d].length;f<g;f++){var h=c[d].rowIdFn(c[d].aoData[this[d][f]]._aData);b.push((!0===a?"#":"")+h)}return new s(c,b)});u("rows().remove()","row().remove()",function(){var a=this;this.iterator("row",function(b,c,d){var e=b.aoData,f=e[c],g,h,i,m,l;e.splice(c,1);g=0;for(h=e.length;g<h;g++)if(i=e[g],l=i.anCells,null!==i.nTr&&(i.nTr._DT_RowIndex=g),null!==l){i=0;for(m=
l.length;i<m;i++)l[i]._DT_CellIndex.row=g}pa(b.aiDisplayMaster,c);pa(b.aiDisplay,c);pa(a[d],c,!1);0<b._iRecordsDisplay&&b._iRecordsDisplay--;Sa(b);c=b.rowIdFn(f._aData);c!==k&&delete b.aIds[c]});this.iterator("table",function(a){for(var c=0,d=a.aoData.length;c<d;c++)a.aoData[c].idx=c});return this});o("rows.add()",function(a){var b=this.iterator("table",function(b){var c,f,g,h=[];f=0;for(g=a.length;f<g;f++)c=a[f],c.nodeName&&"TR"===c.nodeName.toUpperCase()?h.push(na(b,c)[0]):h.push(O(b,c));return h},
1),c=this.rows(-1);c.pop();h.merge(c,b);return c});o("row()",function(a,b){return cb(this.rows(a,b))});o("row().data()",function(a){var b=this.context;if(a===k)return b.length&&this.length?b[0].aoData[this[0]]._aData:k;var c=b[0].aoData[this[0]];c._aData=a;h.isArray(a)&&c.nTr.id&&N(b[0].rowId)(a,c.nTr.id);da(b[0],this[0],"data");return this});o("row().node()",function(){var a=this.context;return a.length&&this.length?a[0].aoData[this[0]].nTr||null:null});o("row.add()",function(a){a instanceof h&&
a.length&&(a=a[0]);var b=this.iterator("table",function(b){return a.nodeName&&"TR"===a.nodeName.toUpperCase()?na(b,a)[0]:O(b,a)});return this.row(b[0])});var db=function(a,b){var c=a.context;if(c.length&&(c=c[0].aoData[b!==k?b:a[0]])&&c._details)c._details.remove(),c._detailsShow=k,c._details=k},Tb=function(a,b){var c=a.context;if(c.length&&a.length){var d=c[0].aoData[a[0]];if(d._details){(d._detailsShow=b)?d._details.insertAfter(d.nTr):d._details.detach();var e=c[0],f=new s(e),g=e.aoData;f.off("draw.dt.DT_details column-visibility.dt.DT_details destroy.dt.DT_details");
0<D(g,"_details").length&&(f.on("draw.dt.DT_details",function(a,b){e===b&&f.rows({page:"current"}).eq(0).each(function(a){a=g[a];a._detailsShow&&a._details.insertAfter(a.nTr)})}),f.on("column-visibility.dt.DT_details",function(a,b){if(e===b)for(var c,d=V(b),f=0,h=g.length;f<h;f++)c=g[f],c._details&&c._details.children("td[colspan]").attr("colspan",d)}),f.on("destroy.dt.DT_details",function(a,b){if(e===b)for(var c=0,d=g.length;c<d;c++)g[c]._details&&db(f,c)}))}}};o("row().child()",function(a,b){var c=
this.context;if(a===k)return c.length&&this.length?c[0].aoData[this[0]]._details:k;if(!0===a)this.child.show();else if(!1===a)db(this);else if(c.length&&this.length){var d=c[0],c=c[0].aoData[this[0]],e=[],f=function(a,b){if(h.isArray(a)||a instanceof h)for(var c=0,k=a.length;c<k;c++)f(a[c],b);else a.nodeName&&"tr"===a.nodeName.toLowerCase()?e.push(a):(c=h("<tr><td/></tr>").addClass(b),h("td",c).addClass(b).html(a)[0].colSpan=V(d),e.push(c[0]))};f(a,b);c._details&&c._details.detach();c._details=h(e);
c._detailsShow&&c._details.insertAfter(c.nTr)}return this});o(["row().child.show()","row().child().show()"],function(){Tb(this,!0);return this});o(["row().child.hide()","row().child().hide()"],function(){Tb(this,!1);return this});o(["row().child.remove()","row().child().remove()"],function(){db(this);return this});o("row().child.isShown()",function(){var a=this.context;return a.length&&this.length?a[0].aoData[this[0]]._detailsShow||!1:!1});var bc=/^([^:]+):(name|visIdx|visible)$/,Ub=function(a,b,
c,d,e){for(var c=[],d=0,f=e.length;d<f;d++)c.push(B(a,e[d],b));return c};o("columns()",function(a,b){a===k?a="":h.isPlainObject(a)&&(b=a,a="");var b=bb(b),c=this.iterator("table",function(c){var e=a,f=b,g=c.aoColumns,j=D(g,"sName"),i=D(g,"nTh");return ab("column",e,function(a){var b=Nb(a);if(a==="")return Y(g.length);if(b!==null)return[b>=0?b:g.length+b];if(typeof a==="function"){var e=Ba(c,f);return h.map(g,function(b,f){return a(f,Ub(c,f,0,0,e),i[f])?f:null})}var k=typeof a==="string"?a.match(bc):
"";if(k)switch(k[2]){case "visIdx":case "visible":b=parseInt(k[1],10);if(b<0){var n=h.map(g,function(a,b){return a.bVisible?b:null});return[n[n.length+b]]}return[aa(c,b)];case "name":return h.map(j,function(a,b){return a===k[1]?b:null});default:return[]}if(a.nodeName&&a._DT_CellIndex)return[a._DT_CellIndex.column];b=h(i).filter(a).map(function(){return h.inArray(this,i)}).toArray();if(b.length||!a.nodeName)return b;b=h(a).closest("*[data-dt-column]");return b.length?[b.data("dt-column")]:[]},c,f)},
1);c.selector.cols=a;c.selector.opts=b;return c});u("columns().header()","column().header()",function(){return this.iterator("column",function(a,b){return a.aoColumns[b].nTh},1)});u("columns().footer()","column().footer()",function(){return this.iterator("column",function(a,b){return a.aoColumns[b].nTf},1)});u("columns().data()","column().data()",function(){return this.iterator("column-rows",Ub,1)});u("columns().dataSrc()","column().dataSrc()",function(){return this.iterator("column",function(a,b){return a.aoColumns[b].mData},
1)});u("columns().cache()","column().cache()",function(a){return this.iterator("column-rows",function(b,c,d,e,f){return ja(b.aoData,f,"search"===a?"_aFilterData":"_aSortData",c)},1)});u("columns().nodes()","column().nodes()",function(){return this.iterator("column-rows",function(a,b,c,d,e){return ja(a.aoData,e,"anCells",b)},1)});u("columns().visible()","column().visible()",function(a,b){var c=this.iterator("column",function(b,c){if(a===k)return b.aoColumns[c].bVisible;var f=b.aoColumns,g=f[c],j=b.aoData,
i,m,l;if(a!==k&&g.bVisible!==a){if(a){var n=h.inArray(!0,D(f,"bVisible"),c+1);i=0;for(m=j.length;i<m;i++)l=j[i].nTr,f=j[i].anCells,l&&l.insertBefore(f[c],f[n]||null)}else h(D(b.aoData,"anCells",c)).detach();g.bVisible=a;fa(b,b.aoHeader);fa(b,b.aoFooter);b.aiDisplay.length||h(b.nTBody).find("td[colspan]").attr("colspan",V(b));xa(b)}});a!==k&&(this.iterator("column",function(c,e){r(c,null,"column-visibility",[c,e,a,b])}),(b===k||b)&&this.columns.adjust());return c});u("columns().indexes()","column().index()",
function(a){return this.iterator("column",function(b,c){return"visible"===a?ba(b,c):c},1)});o("columns.adjust()",function(){return this.iterator("table",function(a){$(a)},1)});o("column.index()",function(a,b){if(0!==this.context.length){var c=this.context[0];if("fromVisible"===a||"toData"===a)return aa(c,b);if("fromData"===a||"toVisible"===a)return ba(c,b)}});o("column()",function(a,b){return cb(this.columns(a,b))});o("cells()",function(a,b,c){h.isPlainObject(a)&&(a.row===k?(c=a,a=null):(c=b,b=null));
h.isPlainObject(b)&&(c=b,b=null);if(null===b||b===k)return this.iterator("table",function(b){var d=a,e=bb(c),f=b.aoData,g=Ba(b,e),j=Qb(ja(f,g,"anCells")),i=h([].concat.apply([],j)),l,m=b.aoColumns.length,n,o,u,s,r,v;return ab("cell",d,function(a){var c=typeof a==="function";if(a===null||a===k||c){n=[];o=0;for(u=g.length;o<u;o++){l=g[o];for(s=0;s<m;s++){r={row:l,column:s};if(c){v=f[l];a(r,B(b,l,s),v.anCells?v.anCells[s]:null)&&n.push(r)}else n.push(r)}}return n}if(h.isPlainObject(a))return a.column!==
k&&a.row!==k&&h.inArray(a.row,g)!==-1?[a]:[];c=i.filter(a).map(function(a,b){return{row:b._DT_CellIndex.row,column:b._DT_CellIndex.column}}).toArray();if(c.length||!a.nodeName)return c;v=h(a).closest("*[data-dt-row]");return v.length?[{row:v.data("dt-row"),column:v.data("dt-column")}]:[]},b,e)});var d=this.columns(b),e=this.rows(a),f,g,j,i,m;this.iterator("table",function(a,b){f=[];g=0;for(j=e[b].length;g<j;g++){i=0;for(m=d[b].length;i<m;i++)f.push({row:e[b][g],column:d[b][i]})}},1);var l=this.cells(f,
c);h.extend(l.selector,{cols:b,rows:a,opts:c});return l});u("cells().nodes()","cell().node()",function(){return this.iterator("cell",function(a,b,c){return(a=a.aoData[b])&&a.anCells?a.anCells[c]:k},1)});o("cells().data()",function(){return this.iterator("cell",function(a,b,c){return B(a,b,c)},1)});u("cells().cache()","cell().cache()",function(a){a="search"===a?"_aFilterData":"_aSortData";return this.iterator("cell",function(b,c,d){return b.aoData[c][a][d]},1)});u("cells().render()","cell().render()",
function(a){return this.iterator("cell",function(b,c,d){return B(b,c,d,a)},1)});u("cells().indexes()","cell().index()",function(){return this.iterator("cell",function(a,b,c){return{row:b,column:c,columnVisible:ba(a,c)}},1)});u("cells().invalidate()","cell().invalidate()",function(a){return this.iterator("cell",function(b,c,d){da(b,c,a,d)})});o("cell()",function(a,b,c){return cb(this.cells(a,b,c))});o("cell().data()",function(a){var b=this.context,c=this[0];if(a===k)return b.length&&c.length?B(b[0],
c[0].row,c[0].column):k;jb(b[0],c[0].row,c[0].column,a);da(b[0],c[0].row,"data",c[0].column);return this});o("order()",function(a,b){var c=this.context;if(a===k)return 0!==c.length?c[0].aaSorting:k;"number"===typeof a?a=[[a,b]]:a.length&&!h.isArray(a[0])&&(a=Array.prototype.slice.call(arguments));return this.iterator("table",function(b){b.aaSorting=a.slice()})});o("order.listener()",function(a,b,c){return this.iterator("table",function(d){Ma(d,a,b,c)})});o("order.fixed()",function(a){if(!a){var b=
this.context,b=b.length?b[0].aaSortingFixed:k;return h.isArray(b)?{pre:b}:b}return this.iterator("table",function(b){b.aaSortingFixed=h.extend(!0,{},a)})});o(["columns().order()","column().order()"],function(a){var b=this;return this.iterator("table",function(c,d){var e=[];h.each(b[d],function(b,c){e.push([c,a])});c.aaSorting=e})});o("search()",function(a,b,c,d){var e=this.context;return a===k?0!==e.length?e[0].oPreviousSearch.sSearch:k:this.iterator("table",function(e){e.oFeatures.bFilter&&ga(e,
h.extend({},e.oPreviousSearch,{sSearch:a+"",bRegex:null===b?!1:b,bSmart:null===c?!0:c,bCaseInsensitive:null===d?!0:d}),1)})});u("columns().search()","column().search()",function(a,b,c,d){return this.iterator("column",function(e,f){var g=e.aoPreSearchCols;if(a===k)return g[f].sSearch;e.oFeatures.bFilter&&(h.extend(g[f],{sSearch:a+"",bRegex:null===b?!1:b,bSmart:null===c?!0:c,bCaseInsensitive:null===d?!0:d}),ga(e,e.oPreviousSearch,1))})});o("state()",function(){return this.context.length?this.context[0].oSavedState:
null});o("state.clear()",function(){return this.iterator("table",function(a){a.fnStateSaveCallback.call(a.oInstance,a,{})})});o("state.loaded()",function(){return this.context.length?this.context[0].oLoadedState:null});o("state.save()",function(){return this.iterator("table",function(a){xa(a)})});n.versionCheck=n.fnVersionCheck=function(a){for(var b=n.version.split("."),a=a.split("."),c,d,e=0,f=a.length;e<f;e++)if(c=parseInt(b[e],10)||0,d=parseInt(a[e],10)||0,c!==d)return c>d;return!0};n.isDataTable=
n.fnIsDataTable=function(a){var b=h(a).get(0),c=!1;if(a instanceof n.Api)return!0;h.each(n.settings,function(a,e){var f=e.nScrollHead?h("table",e.nScrollHead)[0]:null,g=e.nScrollFoot?h("table",e.nScrollFoot)[0]:null;if(e.nTable===b||f===b||g===b)c=!0});return c};n.tables=n.fnTables=function(a){var b=!1;h.isPlainObject(a)&&(b=a.api,a=a.visible);var c=h.map(n.settings,function(b){if(!a||a&&h(b.nTable).is(":visible"))return b.nTable});return b?new s(c):c};n.camelToHungarian=J;o("$()",function(a,b){var c=
this.rows(b).nodes(),c=h(c);return h([].concat(c.filter(a).toArray(),c.find(a).toArray()))});h.each(["on","one","off"],function(a,b){o(b+"()",function(){var a=Array.prototype.slice.call(arguments);a[0]=h.map(a[0].split(/\s/),function(a){return!a.match(/\.dt\b/)?a+".dt":a}).join(" ");var d=h(this.tables().nodes());d[b].apply(d,a);return this})});o("clear()",function(){return this.iterator("table",function(a){oa(a)})});o("settings()",function(){return new s(this.context,this.context)});o("init()",function(){var a=
this.context;return a.length?a[0].oInit:null});o("data()",function(){return this.iterator("table",function(a){return D(a.aoData,"_aData")}).flatten()});o("destroy()",function(a){a=a||!1;return this.iterator("table",function(b){var c=b.nTableWrapper.parentNode,d=b.oClasses,e=b.nTable,f=b.nTBody,g=b.nTHead,j=b.nTFoot,i=h(e),f=h(f),k=h(b.nTableWrapper),l=h.map(b.aoData,function(a){return a.nTr}),o;b.bDestroying=!0;r(b,"aoDestroyCallback","destroy",[b]);a||(new s(b)).columns().visible(!0);k.off(".DT").find(":not(tbody *)").off(".DT");
h(E).off(".DT-"+b.sInstance);e!=g.parentNode&&(i.children("thead").detach(),i.append(g));j&&e!=j.parentNode&&(i.children("tfoot").detach(),i.append(j));b.aaSorting=[];b.aaSortingFixed=[];wa(b);h(l).removeClass(b.asStripeClasses.join(" "));h("th, td",g).removeClass(d.sSortable+" "+d.sSortableAsc+" "+d.sSortableDesc+" "+d.sSortableNone);f.children().detach();f.append(l);g=a?"remove":"detach";i[g]();k[g]();!a&&c&&(c.insertBefore(e,b.nTableReinsertBefore),i.css("width",b.sDestroyWidth).removeClass(d.sTable),
(o=b.asDestroyStripes.length)&&f.children().each(function(a){h(this).addClass(b.asDestroyStripes[a%o])}));c=h.inArray(b,n.settings);-1!==c&&n.settings.splice(c,1)})});h.each(["column","row","cell"],function(a,b){o(b+"s().every()",function(a){var d=this.selector.opts,e=this;return this.iterator(b,function(f,g,h,i,m){a.call(e[b](g,"cell"===b?h:d,"cell"===b?d:k),g,h,i,m)})})});o("i18n()",function(a,b,c){var d=this.context[0],a=S(a)(d.oLanguage);a===k&&(a=b);c!==k&&h.isPlainObject(a)&&(a=a[c]!==k?a[c]:
a._);return a.replace("%d",c)});n.version="1.10.18";n.settings=[];n.models={};n.models.oSearch={bCaseInsensitive:!0,sSearch:"",bRegex:!1,bSmart:!0};n.models.oRow={nTr:null,anCells:null,_aData:[],_aSortData:null,_aFilterData:null,_sFilterRow:null,_sRowStripe:"",src:null,idx:-1};n.models.oColumn={idx:null,aDataSort:null,asSorting:null,bSearchable:null,bSortable:null,bVisible:null,_sManualType:null,_bAttrSrc:!1,fnCreatedCell:null,fnGetData:null,fnSetData:null,mData:null,mRender:null,nTh:null,nTf:null,
sClass:null,sContentPadding:null,sDefaultContent:null,sName:null,sSortDataType:"std",sSortingClass:null,sSortingClassJUI:null,sTitle:null,sType:null,sWidth:null,sWidthOrig:null};n.defaults={aaData:null,aaSorting:[[0,"asc"]],aaSortingFixed:[],ajax:null,aLengthMenu:[10,25,50,100],aoColumns:null,aoColumnDefs:null,aoSearchCols:[],asStripeClasses:null,bAutoWidth:!0,bDeferRender:!1,bDestroy:!1,bFilter:!0,bInfo:!0,bLengthChange:!0,bPaginate:!0,bProcessing:!1,bRetrieve:!1,bScrollCollapse:!1,bServerSide:!1,
bSort:!0,bSortMulti:!0,bSortCellsTop:!1,bSortClasses:!0,bStateSave:!1,fnCreatedRow:null,fnDrawCallback:null,fnFooterCallback:null,fnFormatNumber:function(a){return a.toString().replace(/\B(?=(\d{3})+(?!\d))/g,this.oLanguage.sThousands)},fnHeaderCallback:null,fnInfoCallback:null,fnInitComplete:null,fnPreDrawCallback:null,fnRowCallback:null,fnServerData:null,fnServerParams:null,fnStateLoadCallback:function(a){try{return JSON.parse((-1===a.iStateDuration?sessionStorage:localStorage).getItem("DataTables_"+
a.sInstance+"_"+location.pathname))}catch(b){}},fnStateLoadParams:null,fnStateLoaded:null,fnStateSaveCallback:function(a,b){try{(-1===a.iStateDuration?sessionStorage:localStorage).setItem("DataTables_"+a.sInstance+"_"+location.pathname,JSON.stringify(b))}catch(c){}},fnStateSaveParams:null,iStateDuration:7200,iDeferLoading:null,iDisplayLength:10,iDisplayStart:0,iTabIndex:0,oClasses:{},oLanguage:{oAria:{sSortAscending:": activate to sort column ascending",sSortDescending:": activate to sort column descending"},
oPaginate:{sFirst:"First",sLast:"Last",sNext:"Next",sPrevious:"Previous"},sEmptyTable:"No data available in table",sInfo:"Showing _START_ to _END_ of _TOTAL_ entries",sInfoEmpty:"Showing 0 to 0 of 0 entries",sInfoFiltered:"(filtered from _MAX_ total entries)",sInfoPostFix:"",sDecimal:"",sThousands:",",sLengthMenu:"Show _MENU_ entries",sLoadingRecords:"Loading...",sProcessing:"Processing...",sSearch:"Search:",sSearchPlaceholder:"",sUrl:"",sZeroRecords:"No matching records found"},oSearch:h.extend({},
n.models.oSearch),sAjaxDataProp:"data",sAjaxSource:null,sDom:"lfrtip",searchDelay:null,sPaginationType:"simple_numbers",sScrollX:"",sScrollXInner:"",sScrollY:"",sServerMethod:"GET",renderer:null,rowId:"DT_RowId"};Z(n.defaults);n.defaults.column={aDataSort:null,iDataSort:-1,asSorting:["asc","desc"],bSearchable:!0,bSortable:!0,bVisible:!0,fnCreatedCell:null,mData:null,mRender:null,sCellType:"td",sClass:"",sContentPadding:"",sDefaultContent:null,sName:"",sSortDataType:"std",sTitle:null,sType:null,sWidth:null};
Z(n.defaults.column);n.models.oSettings={oFeatures:{bAutoWidth:null,bDeferRender:null,bFilter:null,bInfo:null,bLengthChange:null,bPaginate:null,bProcessing:null,bServerSide:null,bSort:null,bSortMulti:null,bSortClasses:null,bStateSave:null},oScroll:{bCollapse:null,iBarWidth:0,sX:null,sXInner:null,sY:null},oLanguage:{fnInfoCallback:null},oBrowser:{bScrollOversize:!1,bScrollbarLeft:!1,bBounding:!1,barWidth:0},ajax:null,aanFeatures:[],aoData:[],aiDisplay:[],aiDisplayMaster:[],aIds:{},aoColumns:[],aoHeader:[],
aoFooter:[],oPreviousSearch:{},aoPreSearchCols:[],aaSorting:null,aaSortingFixed:[],asStripeClasses:null,asDestroyStripes:[],sDestroyWidth:0,aoRowCallback:[],aoHeaderCallback:[],aoFooterCallback:[],aoDrawCallback:[],aoRowCreatedCallback:[],aoPreDrawCallback:[],aoInitComplete:[],aoStateSaveParams:[],aoStateLoadParams:[],aoStateLoaded:[],sTableId:"",nTable:null,nTHead:null,nTFoot:null,nTBody:null,nTableWrapper:null,bDeferLoading:!1,bInitialised:!1,aoOpenRows:[],sDom:null,searchDelay:null,sPaginationType:"two_button",
iStateDuration:0,aoStateSave:[],aoStateLoad:[],oSavedState:null,oLoadedState:null,sAjaxSource:null,sAjaxDataProp:null,bAjaxDataGet:!0,jqXHR:null,json:k,oAjaxData:k,fnServerData:null,aoServerParams:[],sServerMethod:null,fnFormatNumber:null,aLengthMenu:null,iDraw:0,bDrawing:!1,iDrawError:-1,_iDisplayLength:10,_iDisplayStart:0,_iRecordsTotal:0,_iRecordsDisplay:0,oClasses:{},bFiltered:!1,bSorted:!1,bSortCellsTop:null,oInit:null,aoDestroyCallback:[],fnRecordsTotal:function(){return"ssp"==y(this)?1*this._iRecordsTotal:
this.aiDisplayMaster.length},fnRecordsDisplay:function(){return"ssp"==y(this)?1*this._iRecordsDisplay:this.aiDisplay.length},fnDisplayEnd:function(){var a=this._iDisplayLength,b=this._iDisplayStart,c=b+a,d=this.aiDisplay.length,e=this.oFeatures,f=e.bPaginate;return e.bServerSide?!1===f||-1===a?b+d:Math.min(b+a,this._iRecordsDisplay):!f||c>d||-1===a?d:c},oInstance:null,sInstance:null,iTabIndex:0,nScrollHead:null,nScrollFoot:null,aLastSort:[],oPlugins:{},rowIdFn:null,rowId:null};n.ext=x={buttons:{},
classes:{},builder:"-source-",errMode:"alert",feature:[],search:[],selector:{cell:[],column:[],row:[]},internal:{},legacy:{ajax:null},pager:{},renderer:{pageButton:{},header:{}},order:{},type:{detect:[],search:{},order:{}},_unique:0,fnVersionCheck:n.fnVersionCheck,iApiIndex:0,oJUIClasses:{},sVersion:n.version};h.extend(x,{afnFiltering:x.search,aTypes:x.type.detect,ofnSearch:x.type.search,oSort:x.type.order,afnSortData:x.order,aoFeatures:x.feature,oApi:x.internal,oStdClasses:x.classes,oPagination:x.pager});
h.extend(n.ext.classes,{sTable:"dataTable",sNoFooter:"no-footer",sPageButton:"paginate_button",sPageButtonActive:"current",sPageButtonDisabled:"disabled",sStripeOdd:"odd",sStripeEven:"even",sRowEmpty:"dataTables_empty",sWrapper:"dataTables_wrapper",sFilter:"dataTables_filter",sInfo:"dataTables_info",sPaging:"dataTables_paginate paging_",sLength:"dataTables_length",sProcessing:"dataTables_processing",sSortAsc:"sorting_asc",sSortDesc:"sorting_desc",sSortable:"sorting",sSortableAsc:"sorting_asc_disabled",
sSortableDesc:"sorting_desc_disabled",sSortableNone:"sorting_disabled",sSortColumn:"sorting_",sFilterInput:"",sLengthSelect:"",sScrollWrapper:"dataTables_scroll",sScrollHead:"dataTables_scrollHead",sScrollHeadInner:"dataTables_scrollHeadInner",sScrollBody:"dataTables_scrollBody",sScrollFoot:"dataTables_scrollFoot",sScrollFootInner:"dataTables_scrollFootInner",sHeaderTH:"",sFooterTH:"",sSortJUIAsc:"",sSortJUIDesc:"",sSortJUI:"",sSortJUIAscAllowed:"",sSortJUIDescAllowed:"",sSortJUIWrapper:"",sSortIcon:"",
sJUIHeader:"",sJUIFooter:""});var Kb=n.ext.pager;h.extend(Kb,{simple:function(){return["previous","next"]},full:function(){return["first","previous","next","last"]},numbers:function(a,b){return[ia(a,b)]},simple_numbers:function(a,b){return["previous",ia(a,b),"next"]},full_numbers:function(a,b){return["first","previous",ia(a,b),"next","last"]},first_last_numbers:function(a,b){return["first",ia(a,b),"last"]},_numbers:ia,numbers_length:7});h.extend(!0,n.ext.renderer,{pageButton:{_:function(a,b,c,d,e,
f){var g=a.oClasses,j=a.oLanguage.oPaginate,i=a.oLanguage.oAria.paginate||{},m,l,n=0,o=function(b,d){var k,s,u,r,v=function(b){Ta(a,b.data.action,true)};k=0;for(s=d.length;k<s;k++){r=d[k];if(h.isArray(r)){u=h("<"+(r.DT_el||"div")+"/>").appendTo(b);o(u,r)}else{m=null;l="";switch(r){case "ellipsis":b.append('<span class="ellipsis">&#x2026;</span>');break;case "first":m=j.sFirst;l=r+(e>0?"":" "+g.sPageButtonDisabled);break;case "previous":m=j.sPrevious;l=r+(e>0?"":" "+g.sPageButtonDisabled);break;case "next":m=
j.sNext;l=r+(e<f-1?"":" "+g.sPageButtonDisabled);break;case "last":m=j.sLast;l=r+(e<f-1?"":" "+g.sPageButtonDisabled);break;default:m=r+1;l=e===r?g.sPageButtonActive:""}if(m!==null){u=h("<a>",{"class":g.sPageButton+" "+l,"aria-controls":a.sTableId,"aria-label":i[r],"data-dt-idx":n,tabindex:a.iTabIndex,id:c===0&&typeof r==="string"?a.sTableId+"_"+r:null}).html(m).appendTo(b);Wa(u,{action:r},v);n++}}}},s;try{s=h(b).find(H.activeElement).data("dt-idx")}catch(u){}o(h(b).empty(),d);s!==k&&h(b).find("[data-dt-idx="+
s+"]").focus()}}});h.extend(n.ext.type.detect,[function(a,b){var c=b.oLanguage.sDecimal;return $a(a,c)?"num"+c:null},function(a){if(a&&!(a instanceof Date)&&!Zb.test(a))return null;var b=Date.parse(a);return null!==b&&!isNaN(b)||M(a)?"date":null},function(a,b){var c=b.oLanguage.sDecimal;return $a(a,c,!0)?"num-fmt"+c:null},function(a,b){var c=b.oLanguage.sDecimal;return Pb(a,c)?"html-num"+c:null},function(a,b){var c=b.oLanguage.sDecimal;return Pb(a,c,!0)?"html-num-fmt"+c:null},function(a){return M(a)||
"string"===typeof a&&-1!==a.indexOf("<")?"html":null}]);h.extend(n.ext.type.search,{html:function(a){return M(a)?a:"string"===typeof a?a.replace(Mb," ").replace(Aa,""):""},string:function(a){return M(a)?a:"string"===typeof a?a.replace(Mb," "):a}});var za=function(a,b,c,d){if(0!==a&&(!a||"-"===a))return-Infinity;b&&(a=Ob(a,b));a.replace&&(c&&(a=a.replace(c,"")),d&&(a=a.replace(d,"")));return 1*a};h.extend(x.type.order,{"date-pre":function(a){a=Date.parse(a);return isNaN(a)?-Infinity:a},"html-pre":function(a){return M(a)?
"":a.replace?a.replace(/<.*?>/g,"").toLowerCase():a+""},"string-pre":function(a){return M(a)?"":"string"===typeof a?a.toLowerCase():!a.toString?"":a.toString()},"string-asc":function(a,b){return a<b?-1:a>b?1:0},"string-desc":function(a,b){return a<b?1:a>b?-1:0}});Da("");h.extend(!0,n.ext.renderer,{header:{_:function(a,b,c,d){h(a.nTable).on("order.dt.DT",function(e,f,g,h){if(a===f){e=c.idx;b.removeClass(c.sSortingClass+" "+d.sSortAsc+" "+d.sSortDesc).addClass(h[e]=="asc"?d.sSortAsc:h[e]=="desc"?d.sSortDesc:
c.sSortingClass)}})},jqueryui:function(a,b,c,d){h("<div/>").addClass(d.sSortJUIWrapper).append(b.contents()).append(h("<span/>").addClass(d.sSortIcon+" "+c.sSortingClassJUI)).appendTo(b);h(a.nTable).on("order.dt.DT",function(e,f,g,h){if(a===f){e=c.idx;b.removeClass(d.sSortAsc+" "+d.sSortDesc).addClass(h[e]=="asc"?d.sSortAsc:h[e]=="desc"?d.sSortDesc:c.sSortingClass);b.find("span."+d.sSortIcon).removeClass(d.sSortJUIAsc+" "+d.sSortJUIDesc+" "+d.sSortJUI+" "+d.sSortJUIAscAllowed+" "+d.sSortJUIDescAllowed).addClass(h[e]==
"asc"?d.sSortJUIAsc:h[e]=="desc"?d.sSortJUIDesc:c.sSortingClassJUI)}})}}});var Vb=function(a){return"string"===typeof a?a.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"):a};n.render={number:function(a,b,c,d,e){return{display:function(f){if("number"!==typeof f&&"string"!==typeof f)return f;var g=0>f?"-":"",h=parseFloat(f);if(isNaN(h))return Vb(f);h=h.toFixed(c);f=Math.abs(h);h=parseInt(f,10);f=c?b+(f-h).toFixed(c).substring(2):"";return g+(d||"")+h.toString().replace(/\B(?=(\d{3})+(?!\d))/g,
a)+f+(e||"")}}},text:function(){return{display:Vb}}};h.extend(n.ext.internal,{_fnExternApiFunc:Lb,_fnBuildAjax:sa,_fnAjaxUpdate:lb,_fnAjaxParameters:ub,_fnAjaxUpdateDraw:vb,_fnAjaxDataSrc:ta,_fnAddColumn:Ea,_fnColumnOptions:ka,_fnAdjustColumnSizing:$,_fnVisibleToColumnIndex:aa,_fnColumnIndexToVisible:ba,_fnVisbleColumns:V,_fnGetColumns:ma,_fnColumnTypes:Ga,_fnApplyColumnDefs:ib,_fnHungarianMap:Z,_fnCamelToHungarian:J,_fnLanguageCompat:Ca,_fnBrowserDetect:gb,_fnAddData:O,_fnAddTr:na,_fnNodeToDataIndex:function(a,
b){return b._DT_RowIndex!==k?b._DT_RowIndex:null},_fnNodeToColumnIndex:function(a,b,c){return h.inArray(c,a.aoData[b].anCells)},_fnGetCellData:B,_fnSetCellData:jb,_fnSplitObjNotation:Ja,_fnGetObjectDataFn:S,_fnSetObjectDataFn:N,_fnGetDataMaster:Ka,_fnClearTable:oa,_fnDeleteIndex:pa,_fnInvalidate:da,_fnGetRowElements:Ia,_fnCreateTr:Ha,_fnBuildHead:kb,_fnDrawHead:fa,_fnDraw:P,_fnReDraw:T,_fnAddOptionsHtml:nb,_fnDetectHeader:ea,_fnGetUniqueThs:ra,_fnFeatureHtmlFilter:pb,_fnFilterComplete:ga,_fnFilterCustom:yb,
_fnFilterColumn:xb,_fnFilter:wb,_fnFilterCreateSearch:Pa,_fnEscapeRegex:Qa,_fnFilterData:zb,_fnFeatureHtmlInfo:sb,_fnUpdateInfo:Cb,_fnInfoMacros:Db,_fnInitialise:ha,_fnInitComplete:ua,_fnLengthChange:Ra,_fnFeatureHtmlLength:ob,_fnFeatureHtmlPaginate:tb,_fnPageChange:Ta,_fnFeatureHtmlProcessing:qb,_fnProcessingDisplay:C,_fnFeatureHtmlTable:rb,_fnScrollDraw:la,_fnApplyToChildren:I,_fnCalculateColumnWidths:Fa,_fnThrottle:Oa,_fnConvertToWidth:Eb,_fnGetWidestNode:Fb,_fnGetMaxLenString:Gb,_fnStringToCss:v,
_fnSortFlatten:X,_fnSort:mb,_fnSortAria:Ib,_fnSortListener:Va,_fnSortAttachListener:Ma,_fnSortingClasses:wa,_fnSortData:Hb,_fnSaveState:xa,_fnLoadState:Jb,_fnSettingsFromNode:ya,_fnLog:K,_fnMap:F,_fnBindAction:Wa,_fnCallbackReg:z,_fnCallbackFire:r,_fnLengthOverflow:Sa,_fnRenderer:Na,_fnDataSource:y,_fnRowAttributes:La,_fnExtend:Xa,_fnCalculateEnd:function(){}});h.fn.dataTable=n;n.$=h;h.fn.dataTableSettings=n.settings;h.fn.dataTableExt=n.ext;h.fn.DataTable=function(a){return h(this).dataTable(a).api()};
h.each(n,function(a,b){h.fn.DataTable[a]=b});return h.fn.dataTable});

/*!
 DataTables Bootstrap 3 integration
 ©2011-2015 SpryMedia Ltd - datatables.net/license
*/
(function(b){"function"===typeof define&&define.amd?define(["jquery","datatables.net"],function(a){return b(a,window,document)}):"object"===typeof exports?module.exports=function(a,e){a||(a=window);if(!e||!e.fn.dataTable)e=require("datatables.net")(a,e).$;return b(e,a,a.document)}:b(jQuery,window,document)})(function(b,a,e,m){var c=b.fn.dataTable;b.extend(!0,c.defaults,{dom:"<'ui stackable grid'<'row'<'eight wide column'l><'right aligned eight wide column'f>><'row dt-table'<'sixteen wide column'tr>><'row'<'seven wide column'i><'right aligned nine wide column'p>>>",
renderer:"semanticUI"});b.extend(c.ext.classes,{sWrapper:"dataTables_wrapper dt-semanticUI",sFilter:"dataTables_filter ui input",sProcessing:"dataTables_processing ui segment",sPageButton:"paginate_button item"});c.ext.renderer.pageButton.semanticUI=function(h,a,r,s,j,n){var o=new c.Api(h),t=h.oClasses,k=h.oLanguage.oPaginate,u=h.oLanguage.oAria.paginate||{},f,g,p=0,q=function(a,e){var c,i,l,d,m=function(a){a.preventDefault();!b(a.currentTarget).hasClass("disabled")&&o.page()!=a.data.action&&o.page(a.data.action).draw("page")};
c=0;for(i=e.length;c<i;c++)if(d=e[c],b.isArray(d))q(a,d);else{g=f="";switch(d){case "ellipsis":f="&#x2026;";g="disabled";break;case "first":f=k.sFirst;g=d+(0<j?"":" disabled");break;case "previous":f=k.sPrevious;g=d+(0<j?"":" disabled");break;case "next":f=k.sNext;g=d+(j<n-1?"":" disabled");break;case "last":f=k.sLast;g=d+(j<n-1?"":" disabled");break;default:f=d+1,g=j===d?"active":""}l=-1===g.indexOf("disabled")?"a":"div";f&&(l=b("<"+l+">",{"class":t.sPageButton+" "+g,id:0===r&&"string"===typeof d?
h.sTableId+"_"+d:null,href:"#","aria-controls":h.sTableId,"aria-label":u[d],"data-dt-idx":p,tabindex:h.iTabIndex}).html(f).appendTo(a),h.oApi._fnBindAction(l,{action:d},m),p++)}},i;try{i=b(a).find(e.activeElement).data("dt-idx")}catch(v){}q(b(a).empty().html('<div class="ui stackable pagination menu"/>').children(),s);i!==m&&b(a).find("[data-dt-idx="+i+"]").focus()};b(e).on("init.dt",function(a,e){if("dt"===a.namespace){var c=new b.fn.dataTable.Api(e);b.fn.dropdown&&b("div.dataTables_length select",
c.table().container()).dropdown();b("div.dataTables_filter.ui.input",c.table().container()).removeClass("input").addClass("form");b("div.dataTables_filter input",c.table().container()).wrap('<span class="ui input" />')}});return c});

 /*
 * # Semantic UI - 2.3.1
 * https://github.com/Semantic-Org/Semantic-UI
 * http://www.semantic-ui.com/
 *
 * Copyright 2014 Contributors
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 */
!function(e,t,n,i){e.site=e.fn.site=function(o){var a,r,s=(new Date).getTime(),l=[],c=arguments[0],u="string"==typeof c,d=[].slice.call(arguments,1),f=e.isPlainObject(o)?e.extend(!0,{},e.site.settings,o):e.extend({},e.site.settings),m=f.namespace,g=f.error,p="module-"+m,h=e(n),v=this,b=h.data(p);return a={initialize:function(){a.instantiate()},instantiate:function(){a.verbose("Storing instance of site",a),b=a,h.data(p,a)},normalize:function(){a.fix.console(),a.fix.requestAnimationFrame()},fix:{console:function(){a.debug("Normalizing window.console"),console!==i&&console.log!==i||(a.verbose("Console not available, normalizing events"),a.disable.console()),void 0!==console.group&&void 0!==console.groupEnd&&void 0!==console.groupCollapsed||(a.verbose("Console group not available, normalizing events"),t.console.group=function(){},t.console.groupEnd=function(){},t.console.groupCollapsed=function(){}),void 0===console.markTimeline&&(a.verbose("Mark timeline not available, normalizing events"),t.console.markTimeline=function(){})},consoleClear:function(){a.debug("Disabling programmatic console clearing"),t.console.clear=function(){}},requestAnimationFrame:function(){a.debug("Normalizing requestAnimationFrame"),t.requestAnimationFrame===i&&(a.debug("RequestAnimationFrame not available, normalizing event"),t.requestAnimationFrame=t.requestAnimationFrame||t.mozRequestAnimationFrame||t.webkitRequestAnimationFrame||t.msRequestAnimationFrame||function(e){setTimeout(e,0)})}},moduleExists:function(t){return e.fn[t]!==i&&e.fn[t].settings!==i},enabled:{modules:function(t){var n=[];return t=t||f.modules,e.each(t,function(e,t){a.moduleExists(t)&&n.push(t)}),n}},disabled:{modules:function(t){var n=[];return t=t||f.modules,e.each(t,function(e,t){a.moduleExists(t)||n.push(t)}),n}},change:{setting:function(t,n,o,r){o="string"==typeof o?"all"===o?f.modules:[o]:o||f.modules,r=r===i||r,e.each(o,function(i,o){var s,l=!a.moduleExists(o)||(e.fn[o].settings.namespace||!1);a.moduleExists(o)&&(a.verbose("Changing default setting",t,n,o),e.fn[o].settings[t]=n,r&&l&&(s=e(":data(module-"+l+")")).length>0&&(a.verbose("Modifying existing settings",s),s[o]("setting",t,n)))})},settings:function(t,n,o){n="string"==typeof n?[n]:n||f.modules,o=o===i||o,e.each(n,function(n,i){var r;a.moduleExists(i)&&(a.verbose("Changing default setting",t,i),e.extend(!0,e.fn[i].settings,t),o&&m&&(r=e(":data(module-"+m+")")).length>0&&(a.verbose("Modifying existing settings",r),r[i]("setting",t)))})}},enable:{console:function(){a.console(!0)},debug:function(e,t){e=e||f.modules,a.debug("Enabling debug for modules",e),a.change.setting("debug",!0,e,t)},verbose:function(e,t){e=e||f.modules,a.debug("Enabling verbose debug for modules",e),a.change.setting("verbose",!0,e,t)}},disable:{console:function(){a.console(!1)},debug:function(e,t){e=e||f.modules,a.debug("Disabling debug for modules",e),a.change.setting("debug",!1,e,t)},verbose:function(e,t){e=e||f.modules,a.debug("Disabling verbose debug for modules",e),a.change.setting("verbose",!1,e,t)}},console:function(e){if(e){if(b.cache.console===i)return void a.error(g.console);a.debug("Restoring console function"),t.console=b.cache.console}else a.debug("Disabling console function"),b.cache.console=t.console,t.console={clear:function(){},error:function(){},group:function(){},groupCollapsed:function(){},groupEnd:function(){},info:function(){},log:function(){},markTimeline:function(){},warn:function(){}}},destroy:function(){a.verbose("Destroying previous site for",h),h.removeData(p)},cache:{},setting:function(t,n){if(e.isPlainObject(t))e.extend(!0,f,t);else{if(n===i)return f[t];f[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,a,t);else{if(n===i)return a[t];a[t]=n}},debug:function(){f.debug&&(f.performance?a.performance.log(arguments):(a.debug=Function.prototype.bind.call(console.info,console,f.name+":"),a.debug.apply(console,arguments)))},verbose:function(){f.verbose&&f.debug&&(f.performance?a.performance.log(arguments):(a.verbose=Function.prototype.bind.call(console.info,console,f.name+":"),a.verbose.apply(console,arguments)))},error:function(){a.error=Function.prototype.bind.call(console.error,console,f.name+":"),a.error.apply(console,arguments)},performance:{log:function(e){var t,n;f.performance&&(n=(t=(new Date).getTime())-(s||t),s=t,l.push({Element:v,Name:e[0],Arguments:[].slice.call(e,1)||"","Execution Time":n})),clearTimeout(a.performance.timer),a.performance.timer=setTimeout(a.performance.display,500)},display:function(){var t=f.name+":",n=0;s=!1,clearTimeout(a.performance.timer),e.each(l,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",(console.group!==i||console.table!==i)&&l.length>0&&(console.groupCollapsed(t),console.table?console.table(l):e.each(l,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),l=[]}},invoke:function(t,n,o){var s,l,c,u=b;return n=n||d,o=v||o,"string"==typeof t&&u!==i&&(t=t.split(/[\. ]/),s=t.length-1,e.each(t,function(n,o){var r=n!=s?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(u[r])&&n!=s)u=u[r];else{if(u[r]!==i)return l=u[r],!1;if(!e.isPlainObject(u[o])||n==s)return u[o]!==i?(l=u[o],!1):(a.error(g.method,t),!1);u=u[o]}})),e.isFunction(l)?c=l.apply(o,n):l!==i&&(c=l),e.isArray(r)?r.push(c):r!==i?r=[r,c]:c!==i&&(r=c),l}},u?(b===i&&a.initialize(),a.invoke(c)):(b!==i&&a.destroy(),a.initialize()),r!==i?r:this},e.site.settings={name:"Site",namespace:"site",error:{console:"Console cannot be restored, most likely it was overwritten outside of module",method:"The method you called is not defined."},debug:!1,verbose:!1,performance:!0,modules:["accordion","api","checkbox","dimmer","dropdown","embed","form","modal","nag","popup","rating","shape","sidebar","state","sticky","tab","transition","visit","visibility"],siteNamespace:"site",namespaceStub:{cache:{},config:{},sections:{},section:{},utilities:{}}},e.extend(e.expr[":"],{data:e.expr.createPseudo?e.expr.createPseudo(function(t){return function(n){return!!e.data(n,t)}}):function(t,n,i){return!!e.data(t,i[3])}})}(jQuery,window,document),function(e,t,n,i){"use strict";t=void 0!==t&&t.Math==Math?t:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")(),e.fn.form=function(t){var o,a=e(this),r=a.selector||"",s=(new Date).getTime(),l=[],c=arguments[0],u=arguments[1],d="string"==typeof c,f=[].slice.call(arguments,1);return a.each(function(){var m,g,p,h,v,b,y,x,C,w,S,k,T,A,R,P,E=e(this),F=this,O=[],D=!1;(P={initialize:function(){P.get.settings(),d?(R===i&&P.instantiate(),P.invoke(c)):(R!==i&&R.invoke("destroy"),P.verbose("Initializing form validation",E,v),P.bindEvents(),P.set.defaults(),P.instantiate())},instantiate:function(){P.verbose("Storing instance of module",P),R=P,E.data(T,P)},destroy:function(){P.verbose("Destroying previous module",R),P.removeEvents(),E.removeData(T)},refresh:function(){P.verbose("Refreshing selector cache"),m=E.find(x.field),g=E.find(x.group),p=E.find(x.message),E.find(x.prompt),h=E.find(x.submit),E.find(x.clear),E.find(x.reset)},submit:function(){P.verbose("Submitting form",E),E.submit()},attachEvents:function(t,n){n=n||"submit",e(t).on("click"+A,function(e){P[n](),e.preventDefault()})},bindEvents:function(){P.verbose("Attaching form events"),E.on("submit"+A,P.validate.form).on("blur"+A,x.field,P.event.field.blur).on("click"+A,x.submit,P.submit).on("click"+A,x.reset,P.reset).on("click"+A,x.clear,P.clear),v.keyboardShortcuts&&E.on("keydown"+A,x.field,P.event.field.keydown),m.each(function(){var t=e(this),n=t.prop("type"),i=P.get.changeEvent(n,t);e(this).on(i+A,P.event.field.change)})},clear:function(){m.each(function(){var t=e(this),n=t.parent(),i=t.closest(g),o=i.find(x.prompt),a=t.data(y.defaultValue)||"",r=n.is(x.uiCheckbox),s=n.is(x.uiDropdown);i.hasClass(C.error)&&(P.verbose("Resetting error on field",i),i.removeClass(C.error),o.remove()),s?(P.verbose("Resetting dropdown value",n,a),n.dropdown("clear")):r?t.prop("checked",!1):(P.verbose("Resetting field value",t,a),t.val(""))})},reset:function(){m.each(function(){var t=e(this),n=t.parent(),o=t.closest(g),a=o.find(x.prompt),r=t.data(y.defaultValue),s=n.is(x.uiCheckbox),l=n.is(x.uiDropdown),c=o.hasClass(C.error);r!==i&&(c&&(P.verbose("Resetting error on field",o),o.removeClass(C.error),a.remove()),l?(P.verbose("Resetting dropdown value",n,r),n.dropdown("restore defaults")):s?(P.verbose("Resetting checkbox value",n,r),t.prop("checked",r)):(P.verbose("Resetting field value",t,r),t.val(r)))})},determine:{isValid:function(){var t=!0;return e.each(b,function(e,n){P.validate.field(n,e,!0)||(t=!1)}),t}},is:{bracketedRule:function(e){return e.type&&e.type.match(v.regExp.bracket)},shorthandFields:function(e){var t=e[Object.keys(e)[0]];return P.is.shorthandRules(t)},shorthandRules:function(t){return"string"==typeof t||e.isArray(t)},empty:function(e){return!e||0===e.length||(e.is('input[type="checkbox"]')?!e.is(":checked"):P.is.blank(e))},blank:function(t){return""===e.trim(t.val())},valid:function(t){var n=!0;return t?(P.verbose("Checking if field is valid",t),P.validate.field(b[t],t,!1)):(P.verbose("Checking if form is valid"),e.each(b,function(e,t){P.is.valid(e)||(n=!1)}),n)}},removeEvents:function(){E.off(A),m.off(A),h.off(A),m.off(A)},event:{field:{keydown:function(t){var n=e(this),i=t.which,o=n.is(x.input),a=n.is(x.checkbox),r=n.closest(x.uiDropdown).length>0,s=13;i==27&&(P.verbose("Escape key pressed blurring field"),n.blur()),t.ctrlKey||i!=s||!o||r||a||(D||(n.one("keyup"+A,P.event.field.keyup),P.submit(),P.debug("Enter pressed on input submitting form")),D=!0)},keyup:function(){D=!1},blur:function(t){var n=e(this),i=n.closest(g),o=P.get.validation(n);i.hasClass(C.error)?(P.debug("Revalidating field",n,o),o&&P.validate.field(o)):"blur"==v.on&&o&&P.validate.field(o)},change:function(t){var n=e(this),i=n.closest(g),o=P.get.validation(n);o&&("change"==v.on||i.hasClass(C.error)&&v.revalidate)&&(clearTimeout(P.timer),P.timer=setTimeout(function(){P.debug("Revalidating field",n,P.get.validation(n)),P.validate.field(o)},v.delay))}}},get:{ancillaryValue:function(e){return!(!e.type||!e.value&&!P.is.bracketedRule(e))&&(e.value!==i?e.value:e.type.match(v.regExp.bracket)[1]+"")},ruleName:function(e){return P.is.bracketedRule(e)?e.type.replace(e.type.match(v.regExp.bracket)[0],""):e.type},changeEvent:function(e,t){return"checkbox"==e||"radio"==e||"hidden"==e||t.is("select")?"change":P.get.inputEvent()},inputEvent:function(){return n.createElement("input").oninput!==i?"input":n.createElement("input").onpropertychange!==i?"propertychange":"keyup"},fieldsFromShorthand:function(t){var n={};return e.each(t,function(t,i){"string"==typeof i&&(i=[i]),n[t]={rules:[]},e.each(i,function(e,i){n[t].rules.push({type:i})})}),n},prompt:function(t,n){var i,o,a=P.get.ruleName(t),r=P.get.ancillaryValue(t),s=P.get.field(n.identifier),l=s.val(),c=e.isFunction(t.prompt)?t.prompt(l):t.prompt||v.prompt[a]||v.text.unspecifiedRule,u=-1!==c.search("{value}"),d=-1!==c.search("{name}");return u&&(c=c.replace("{value}",s.val())),d&&(o=1==(i=s.closest(x.group).find("label").eq(0)).length?i.text():s.prop("placeholder")||v.text.unspecifiedField,c=c.replace("{name}",o)),c=(c=c.replace("{identifier}",n.identifier)).replace("{ruleValue}",r),t.prompt||P.verbose("Using default validation prompt for type",c,a),c},settings:function(){if(e.isPlainObject(t)){var n=Object.keys(t);n.length>0&&(t[n[0]].identifier!==i&&t[n[0]].rules!==i)?(v=e.extend(!0,{},e.fn.form.settings,u),b=e.extend({},e.fn.form.settings.defaults,t),P.error(v.error.oldSyntax,F),P.verbose("Extending settings from legacy parameters",b,v)):(t.fields&&P.is.shorthandFields(t.fields)&&(t.fields=P.get.fieldsFromShorthand(t.fields)),v=e.extend(!0,{},e.fn.form.settings,t),b=e.extend({},e.fn.form.settings.defaults,v.fields),P.verbose("Extending settings",b,v))}else v=e.fn.form.settings,b=e.fn.form.settings.defaults,P.verbose("Using default form validation",b,v);k=v.namespace,y=v.metadata,x=v.selector,C=v.className,w=v.regExp,S=v.error,T="module-"+k,A="."+k,R=E.data(T),P.refresh()},field:function(t){return P.verbose("Finding field with identifier",t),t=P.escape.string(t),m.filter("#"+t).length>0?m.filter("#"+t):m.filter('[name="'+t+'"]').length>0?m.filter('[name="'+t+'"]'):m.filter('[name="'+t+'[]"]').length>0?m.filter('[name="'+t+'[]"]'):m.filter("[data-"+y.validate+'="'+t+'"]').length>0?m.filter("[data-"+y.validate+'="'+t+'"]'):e("<input/>")},fields:function(t){var n=e();return e.each(t,function(e,t){n=n.add(P.get.field(t))}),n},validation:function(t){var n,i;return!!b&&(e.each(b,function(e,o){i=o.identifier||e,P.get.field(i)[0]==t[0]&&(o.identifier=i,n=o)}),n||!1)},value:function(e){var t=[];return t.push(e),P.get.values.call(F,t)[e]},values:function(t){var n={};return(e.isArray(t)?P.get.fields(t):m).each(function(t,o){var a=e(o),r=(a.prop("type"),a.prop("name")),s=a.val(),l=a.is(x.checkbox),c=a.is(x.radio),u=-1!==r.indexOf("[]"),d=!!l&&a.is(":checked");r&&(u?(r=r.replace("[]",""),n[r]||(n[r]=[]),l?d?n[r].push(s||!0):n[r].push(!1):n[r].push(s)):c?n[r]!==i&&0!=n[r]||(n[r]=!!d&&(s||!0)):n[r]=l?!!d&&(s||!0):s)}),n}},has:{field:function(e){return P.verbose("Checking for existence of a field with identifier",e),"string"!=typeof(e=P.escape.string(e))&&P.error(S.identifier,e),m.filter("#"+e).length>0||(m.filter('[name="'+e+'"]').length>0||m.filter("[data-"+y.validate+'="'+e+'"]').length>0)}},escape:{string:function(e){return(e=String(e)).replace(w.escape,"\\$&")}},add:{rule:function(e,t){P.add.field(e,t)},field:function(t,n){var i={};P.is.shorthandRules(n)?(n=e.isArray(n)?n:[n],i[t]={rules:[]},e.each(n,function(e,n){i[t].rules.push({type:n})})):i[t]=n,b=e.extend({},b,i),P.debug("Adding rules",i,b)},fields:function(t){var n;n=t&&P.is.shorthandFields(t)?P.get.fieldsFromShorthand(t):t,b=e.extend({},b,n)},prompt:function(t,n){var o=P.get.field(t).closest(g),a=o.children(x.prompt),r=0!==a.length;n="string"==typeof n?[n]:n,P.verbose("Adding field error state",t),o.addClass(C.error),v.inline&&(r||(a=v.templates.prompt(n)).appendTo(o),a.html(n[0]),r?P.verbose("Inline errors are disabled, no inline error added",t):v.transition&&e.fn.transition!==i&&E.transition("is supported")?(P.verbose("Displaying error with css transition",v.transition),a.transition(v.transition+" in",v.duration)):(P.verbose("Displaying error with fallback javascript animation"),a.fadeIn(v.duration)))},errors:function(e){P.debug("Adding form error messages",e),P.set.error(),p.html(v.templates.error(e))}},remove:{rule:function(t,n){var o=e.isArray(n)?n:[n];if(n==i)return P.debug("Removed all rules"),void(b[t].rules=[]);b[t]!=i&&e.isArray(b[t].rules)&&e.each(b[t].rules,function(e,n){-1!==o.indexOf(n.type)&&(P.debug("Removed rule",n.type),b[t].rules.splice(e,1))})},field:function(t){var n=e.isArray(t)?t:[t];e.each(n,function(e,t){P.remove.rule(t)})},rules:function(t,n){e.isArray(t)?e.each(fields,function(e,t){P.remove.rule(t,n)}):P.remove.rule(t,n)},fields:function(e){P.remove.field(e)},prompt:function(t){var n=P.get.field(t).closest(g),o=n.children(x.prompt);n.removeClass(C.error),v.inline&&o.is(":visible")&&(P.verbose("Removing prompt for field",t),v.transition&&e.fn.transition!==i&&E.transition("is supported")?o.transition(v.transition+" out",v.duration,function(){o.remove()}):o.fadeOut(v.duration,function(){o.remove()}))}},set:{success:function(){E.removeClass(C.error).addClass(C.success)},defaults:function(){m.each(function(){var t=e(this),n=t.filter(x.checkbox).length>0?t.is(":checked"):t.val();t.data(y.defaultValue,n)})},error:function(){E.removeClass(C.success).addClass(C.error)},value:function(e,t){var n={};return n[e]=t,P.set.values.call(F,n)},values:function(t){e.isEmptyObject(t)||e.each(t,function(t,n){var i,o=P.get.field(t),a=o.parent(),r=e.isArray(n),s=a.is(x.uiCheckbox),l=a.is(x.uiDropdown),c=o.is(x.radio)&&s;o.length>0&&(r&&s?(P.verbose("Selecting multiple",n,o),a.checkbox("uncheck"),e.each(n,function(e,t){i=o.filter('[value="'+t+'"]'),a=i.parent(),i.length>0&&a.checkbox("check")})):c?(P.verbose("Selecting radio value",n,o),o.filter('[value="'+n+'"]').parent(x.uiCheckbox).checkbox("check")):s?(P.verbose("Setting checkbox value",n,a),!0===n?a.checkbox("check"):a.checkbox("uncheck")):l?(P.verbose("Setting dropdown value",n,a),a.dropdown("set selected",n)):(P.verbose("Setting field value",n,o),o.val(n)))})}},validate:{form:function(e,t){var n=P.get.values();if(D)return!1;if(O=[],P.determine.isValid()){if(P.debug("Form has no validation errors, submitting"),P.set.success(),!0!==t)return v.onSuccess.call(F,e,n)}else if(P.debug("Form has errors"),P.set.error(),v.inline||P.add.errors(O),E.data("moduleApi")!==i&&e.stopImmediatePropagation(),!0!==t)return v.onFailure.call(F,O,n)},field:function(t,n,o){o=o===i||o,"string"==typeof t&&(P.verbose("Validating field",t),n=t,t=b[t]);var a=t.identifier||n,r=P.get.field(a),s=!!t.depends&&P.get.field(t.depends),l=!0,c=[];return t.identifier||(P.debug("Using field name as identifier",a),t.identifier=a),r.prop("disabled")?(P.debug("Field is disabled. Skipping",a),l=!0):t.optional&&P.is.blank(r)?(P.debug("Field is optional and blank. Skipping",a),l=!0):t.depends&&P.is.empty(s)?(P.debug("Field depends on another value that is not present or empty. Skipping",s),l=!0):t.rules!==i&&e.each(t.rules,function(e,n){P.has.field(a)&&!P.validate.rule(t,n)&&(P.debug("Field is invalid",a,n.type),c.push(P.get.prompt(n,t)),l=!1)}),l?(o&&(P.remove.prompt(a,c),v.onValid.call(r)),!0):(o&&(O=O.concat(c),P.add.prompt(a,c),v.onInvalid.call(r,c)),!1)},rule:function(t,n){var o=P.get.field(t.identifier),a=(n.type,o.val()),r=P.get.ancillaryValue(n),s=P.get.ruleName(n),l=v.rules[s];if(e.isFunction(l))return a=a===i||""===a||null===a?"":e.trim(a+""),l.call(o,a,r);P.error(S.noRule,s)}},setting:function(t,n){if(e.isPlainObject(t))e.extend(!0,v,t);else{if(n===i)return v[t];v[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,P,t);else{if(n===i)return P[t];P[t]=n}},debug:function(){!v.silent&&v.debug&&(v.performance?P.performance.log(arguments):(P.debug=Function.prototype.bind.call(console.info,console,v.name+":"),P.debug.apply(console,arguments)))},verbose:function(){!v.silent&&v.verbose&&v.debug&&(v.performance?P.performance.log(arguments):(P.verbose=Function.prototype.bind.call(console.info,console,v.name+":"),P.verbose.apply(console,arguments)))},error:function(){v.silent||(P.error=Function.prototype.bind.call(console.error,console,v.name+":"),P.error.apply(console,arguments))},performance:{log:function(e){var t,n;v.performance&&(n=(t=(new Date).getTime())-(s||t),s=t,l.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:F,"Execution Time":n})),clearTimeout(P.performance.timer),P.performance.timer=setTimeout(P.performance.display,500)},display:function(){var t=v.name+":",n=0;s=!1,clearTimeout(P.performance.timer),e.each(l,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",r&&(t+=" '"+r+"'"),a.length>1&&(t+=" ("+a.length+")"),(console.group!==i||console.table!==i)&&l.length>0&&(console.groupCollapsed(t),console.table?console.table(l):e.each(l,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),l=[]}},invoke:function(t,n,a){var r,s,l,c=R;return n=n||f,a=F||a,"string"==typeof t&&c!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(c[a])&&n!=r)c=c[a];else{if(c[a]!==i)return s=c[a],!1;if(!e.isPlainObject(c[o])||n==r)return c[o]!==i&&(s=c[o],!1);c=c[o]}})),e.isFunction(s)?l=s.apply(a,n):s!==i&&(l=s),e.isArray(o)?o.push(l):o!==i?o=[o,l]:l!==i&&(o=l),s}}).initialize()}),o!==i?o:this},e.fn.form.settings={name:"Form",namespace:"form",debug:!1,verbose:!1,performance:!0,fields:!1,keyboardShortcuts:!0,on:"submit",inline:!1,delay:200,revalidate:!0,transition:"scale",duration:200,onValid:function(){},onInvalid:function(){},onSuccess:function(){return!0},onFailure:function(){return!1},metadata:{defaultValue:"default",validate:"validate"},regExp:{htmlID:/^[a-zA-Z][\w:.-]*$/g,bracket:/\[(.*)\]/i,decimal:/^\d+\.?\d*$/,email:/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i,escape:/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,flags:/^\/(.*)\/(.*)?/,integer:/^\-?\d+$/,number:/^\-?\d*(\.\d+)?$/,url:/(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/i},text:{unspecifiedRule:"Please enter a valid value",unspecifiedField:"This field"},prompt:{empty:"{name} must have a value",checked:"{name} must be checked",email:"{name} must be a valid e-mail",url:"{name} must be a valid url",regExp:"{name} is not formatted correctly",integer:"{name} must be an integer",decimal:"{name} must be a decimal number",number:"{name} must be set to a number",is:'{name} must be "{ruleValue}"',isExactly:'{name} must be exactly "{ruleValue}"',not:'{name} cannot be set to "{ruleValue}"',notExactly:'{name} cannot be set to exactly "{ruleValue}"',contain:'{name} must contain "{ruleValue}"',containExactly:'{name} must contain exactly "{ruleValue}"',doesntContain:'{name} cannot contain  "{ruleValue}"',doesntContainExactly:'{name} cannot contain exactly "{ruleValue}"',minLength:"{name} must be at least {ruleValue} characters",length:"{name} must be at least {ruleValue} characters",exactLength:"{name} must be exactly {ruleValue} characters",maxLength:"{name} cannot be longer than {ruleValue} characters",match:"{name} must match {ruleValue} field",different:"{name} must have a different value than {ruleValue} field",creditCard:"{name} must be a valid credit card number",minCount:"{name} must have at least {ruleValue} choices",exactCount:"{name} must have exactly {ruleValue} choices",maxCount:"{name} must have {ruleValue} or less choices"},selector:{checkbox:'input[type="checkbox"], input[type="radio"]',clear:".clear",field:"input, textarea, select",group:".field",input:"input",message:".error.message",prompt:".prompt.label",radio:'input[type="radio"]',reset:'.reset:not([type="reset"])',submit:'.submit:not([type="submit"])',uiCheckbox:".ui.checkbox",uiDropdown:".ui.dropdown"},className:{error:"error",label:"ui prompt label",pressed:"down",success:"success"},error:{identifier:"You must specify a string identifier for each field",method:"The method you called is not defined.",noRule:"There is no rule matching the one you specified",oldSyntax:"Starting in 2.0 forms now only take a single settings object. Validation settings converted to new syntax automatically."},templates:{error:function(t){var n='<ul class="list">';return e.each(t,function(e,t){n+="<li>"+t+"</li>"}),e(n+="</ul>")},prompt:function(t){return e("<div/>").addClass("ui basic red pointing prompt label").html(t[0])}},rules:{empty:function(t){return!(t===i||""===t||e.isArray(t)&&0===t.length)},checked:function(){return e(this).filter(":checked").length>0},email:function(t){return e.fn.form.settings.regExp.email.test(t)},url:function(t){return e.fn.form.settings.regExp.url.test(t)},regExp:function(t,n){if(n instanceof RegExp)return t.match(n);var i,o=n.match(e.fn.form.settings.regExp.flags);return o&&(n=o.length>=2?o[1]:n,i=o.length>=3?o[2]:""),t.match(new RegExp(n,i))},integer:function(t,n){var o,a,r,s=e.fn.form.settings.regExp.integer;return n&&-1===["",".."].indexOf(n)&&(-1==n.indexOf("..")?s.test(n)&&(o=a=n-0):(r=n.split("..",2),s.test(r[0])&&(o=r[0]-0),s.test(r[1])&&(a=r[1]-0))),s.test(t)&&(o===i||t>=o)&&(a===i||t<=a)},decimal:function(t){return e.fn.form.settings.regExp.decimal.test(t)},number:function(t){return e.fn.form.settings.regExp.number.test(t)},is:function(e,t){return t="string"==typeof t?t.toLowerCase():t,(e="string"==typeof e?e.toLowerCase():e)==t},isExactly:function(e,t){return e==t},not:function(e,t){return(e="string"==typeof e?e.toLowerCase():e)!=(t="string"==typeof t?t.toLowerCase():t)},notExactly:function(e,t){return e!=t},contains:function(t,n){return n=n.replace(e.fn.form.settings.regExp.escape,"\\$&"),-1!==t.search(new RegExp(n,"i"))},containsExactly:function(t,n){return n=n.replace(e.fn.form.settings.regExp.escape,"\\$&"),-1!==t.search(new RegExp(n))},doesntContain:function(t,n){return n=n.replace(e.fn.form.settings.regExp.escape,"\\$&"),-1===t.search(new RegExp(n,"i"))},doesntContainExactly:function(t,n){return n=n.replace(e.fn.form.settings.regExp.escape,"\\$&"),-1===t.search(new RegExp(n))},minLength:function(e,t){return e!==i&&e.length>=t},length:function(e,t){return e!==i&&e.length>=t},exactLength:function(e,t){return e!==i&&e.length==t},maxLength:function(e,t){return e!==i&&e.length<=t},match:function(t,n){var o;e(this);return e('[data-validate="'+n+'"]').length>0?o=e('[data-validate="'+n+'"]').val():e("#"+n).length>0?o=e("#"+n).val():e('[name="'+n+'"]').length>0?o=e('[name="'+n+'"]').val():e('[name="'+n+'[]"]').length>0&&(o=e('[name="'+n+'[]"]')),o!==i&&t.toString()==o.toString()},different:function(t,n){var o;e(this);return e('[data-validate="'+n+'"]').length>0?o=e('[data-validate="'+n+'"]').val():e("#"+n).length>0?o=e("#"+n).val():e('[name="'+n+'"]').length>0?o=e('[name="'+n+'"]').val():e('[name="'+n+'[]"]').length>0&&(o=e('[name="'+n+'[]"]')),o!==i&&t.toString()!==o.toString()},creditCard:function(t,n){var i,o,a={visa:{pattern:/^4/,length:[16]},amex:{pattern:/^3[47]/,length:[15]},mastercard:{pattern:/^5[1-5]/,length:[16]},discover:{pattern:/^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)/,length:[16]},unionPay:{pattern:/^(62|88)/,length:[16,17,18,19]},jcb:{pattern:/^35(2[89]|[3-8][0-9])/,length:[16]},maestro:{pattern:/^(5018|5020|5038|6304|6759|676[1-3])/,length:[12,13,14,15,16,17,18,19]},dinersClub:{pattern:/^(30[0-5]|^36)/,length:[14]},laser:{pattern:/^(6304|670[69]|6771)/,length:[16,17,18,19]},visaElectron:{pattern:/^(4026|417500|4508|4844|491(3|7))/,length:[16]}},r={},s=!1,l="string"==typeof n&&n.split(",");if("string"==typeof t&&0!==t.length){if(t=t.replace(/[\-]/g,""),l&&(e.each(l,function(n,i){(o=a[i])&&(r={length:-1!==e.inArray(t.length,o.length),pattern:-1!==t.search(o.pattern)}).length&&r.pattern&&(s=!0)}),!s))return!1;if((i={number:-1!==e.inArray(t.length,a.unionPay.length),pattern:-1!==t.search(a.unionPay.pattern)}).number&&i.pattern)return!0;for(var c=t.length,u=0,d=[[0,1,2,3,4,5,6,7,8,9],[0,2,4,6,8,1,3,5,7,9]],f=0;c--;)f+=d[u][parseInt(t.charAt(c),10)],u^=1;return f%10==0&&f>0}},minCount:function(e,t){return 0==t||(1==t?""!==e:e.split(",").length>=t)},exactCount:function(e,t){return 0==t?""===e:1==t?""!==e&&-1===e.search(","):e.split(",").length==t},maxCount:function(e,t){return 0!=t&&(1==t?-1===e.search(","):e.split(",").length<=t)}}}}(jQuery,window,document),function(e,t,n,i){"use strict";t=void 0!==t&&t.Math==Math?t:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")(),e.fn.accordion=function(n){var o,a=e(this),r=(new Date).getTime(),s=[],l=arguments[0],c="string"==typeof l,u=[].slice.call(arguments,1);t.requestAnimationFrame||t.mozRequestAnimationFrame||t.webkitRequestAnimationFrame||t.msRequestAnimationFrame;return a.each(function(){var d,f,m=e.isPlainObject(n)?e.extend(!0,{},e.fn.accordion.settings,n):e.extend({},e.fn.accordion.settings),g=m.className,p=m.namespace,h=m.selector,v=m.error,b="."+p,y="module-"+p,x=a.selector||"",C=e(this),w=C.find(h.title),S=C.find(h.content),k=this,T=C.data(y);f={initialize:function(){f.debug("Initializing",C),f.bind.events(),m.observeChanges&&f.observeChanges(),f.instantiate()},instantiate:function(){T=f,C.data(y,f)},destroy:function(){f.debug("Destroying previous instance",C),C.off(b).removeData(y)},refresh:function(){w=C.find(h.title),S=C.find(h.content)},observeChanges:function(){"MutationObserver"in t&&((d=new MutationObserver(function(e){f.debug("DOM tree modified, updating selector cache"),f.refresh()})).observe(k,{childList:!0,subtree:!0}),f.debug("Setting up mutation observer",d))},bind:{events:function(){f.debug("Binding delegated events"),C.on(m.on+b,h.trigger,f.event.click)}},event:{click:function(){f.toggle.call(this)}},toggle:function(t){var n=t!==i?"number"==typeof t?w.eq(t):e(t).closest(h.title):e(this).closest(h.title),o=n.next(S),a=o.hasClass(g.animating),r=o.hasClass(g.active),s=r&&!a,l=!r&&a;f.debug("Toggling visibility of content",n),s||l?m.collapsible?f.close.call(n):f.debug("Cannot close accordion content collapsing is disabled"):f.open.call(n)},open:function(t){var n=t!==i?"number"==typeof t?w.eq(t):e(t).closest(h.title):e(this).closest(h.title),o=n.next(S),a=o.hasClass(g.animating);o.hasClass(g.active)||a?f.debug("Accordion already open, skipping",o):(f.debug("Opening accordion content",n),m.onOpening.call(o),m.onChanging.call(o),m.exclusive&&f.closeOthers.call(n),n.addClass(g.active),o.stop(!0,!0).addClass(g.animating),m.animateChildren&&(e.fn.transition!==i&&C.transition("is supported")?o.children().transition({animation:"fade in",queue:!1,useFailSafe:!0,debug:m.debug,verbose:m.verbose,duration:m.duration}):o.children().stop(!0,!0).animate({opacity:1},m.duration,f.resetOpacity)),o.slideDown(m.duration,m.easing,function(){o.removeClass(g.animating).addClass(g.active),f.reset.display.call(this),m.onOpen.call(this),m.onChange.call(this)}))},close:function(t){var n=t!==i?"number"==typeof t?w.eq(t):e(t).closest(h.title):e(this).closest(h.title),o=n.next(S),a=o.hasClass(g.animating),r=o.hasClass(g.active);!r&&!(!r&&a)||r&&a||(f.debug("Closing accordion content",o),m.onClosing.call(o),m.onChanging.call(o),n.removeClass(g.active),o.stop(!0,!0).addClass(g.animating),m.animateChildren&&(e.fn.transition!==i&&C.transition("is supported")?o.children().transition({animation:"fade out",queue:!1,useFailSafe:!0,debug:m.debug,verbose:m.verbose,duration:m.duration}):o.children().stop(!0,!0).animate({opacity:0},m.duration,f.resetOpacity)),o.slideUp(m.duration,m.easing,function(){o.removeClass(g.animating).removeClass(g.active),f.reset.display.call(this),m.onClose.call(this),m.onChange.call(this)}))},closeOthers:function(t){var n,o,a,r=t!==i?w.eq(t):e(this).closest(h.title),s=r.parents(h.content).prev(h.title),l=r.closest(h.accordion),c=h.title+"."+g.active+":visible",u=h.content+"."+g.active+":visible";m.closeNested?a=(n=l.find(c).not(s)).next(S):(n=l.find(c).not(s),o=l.find(u).find(c).not(s),a=(n=n.not(o)).next(S)),n.length>0&&(f.debug("Exclusive enabled, closing other content",n),n.removeClass(g.active),a.removeClass(g.animating).stop(!0,!0),m.animateChildren&&(e.fn.transition!==i&&C.transition("is supported")?a.children().transition({animation:"fade out",useFailSafe:!0,debug:m.debug,verbose:m.verbose,duration:m.duration}):a.children().stop(!0,!0).animate({opacity:0},m.duration,f.resetOpacity)),a.slideUp(m.duration,m.easing,function(){e(this).removeClass(g.active),f.reset.display.call(this)}))},reset:{display:function(){f.verbose("Removing inline display from element",this),e(this).css("display",""),""===e(this).attr("style")&&e(this).attr("style","").removeAttr("style")},opacity:function(){f.verbose("Removing inline opacity from element",this),e(this).css("opacity",""),""===e(this).attr("style")&&e(this).attr("style","").removeAttr("style")}},setting:function(t,n){if(f.debug("Changing setting",t,n),e.isPlainObject(t))e.extend(!0,m,t);else{if(n===i)return m[t];e.isPlainObject(m[t])?e.extend(!0,m[t],n):m[t]=n}},internal:function(t,n){if(f.debug("Changing internal",t,n),n===i)return f[t];e.isPlainObject(t)?e.extend(!0,f,t):f[t]=n},debug:function(){!m.silent&&m.debug&&(m.performance?f.performance.log(arguments):(f.debug=Function.prototype.bind.call(console.info,console,m.name+":"),f.debug.apply(console,arguments)))},verbose:function(){!m.silent&&m.verbose&&m.debug&&(m.performance?f.performance.log(arguments):(f.verbose=Function.prototype.bind.call(console.info,console,m.name+":"),f.verbose.apply(console,arguments)))},error:function(){m.silent||(f.error=Function.prototype.bind.call(console.error,console,m.name+":"),f.error.apply(console,arguments))},performance:{log:function(e){var t,n;m.performance&&(n=(t=(new Date).getTime())-(r||t),r=t,s.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:k,"Execution Time":n})),clearTimeout(f.performance.timer),f.performance.timer=setTimeout(f.performance.display,500)},display:function(){var t=m.name+":",n=0;r=!1,clearTimeout(f.performance.timer),e.each(s,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",x&&(t+=" '"+x+"'"),(console.group!==i||console.table!==i)&&s.length>0&&(console.groupCollapsed(t),console.table?console.table(s):e.each(s,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),s=[]}},invoke:function(t,n,a){var r,s,l,c=T;return n=n||u,a=k||a,"string"==typeof t&&c!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(c[a])&&n!=r)c=c[a];else{if(c[a]!==i)return s=c[a],!1;if(!e.isPlainObject(c[o])||n==r)return c[o]!==i?(s=c[o],!1):(f.error(v.method,t),!1);c=c[o]}})),e.isFunction(s)?l=s.apply(a,n):s!==i&&(l=s),e.isArray(o)?o.push(l):o!==i?o=[o,l]:l!==i&&(o=l),s}},c?(T===i&&f.initialize(),f.invoke(l)):(T!==i&&T.invoke("destroy"),f.initialize())}),o!==i?o:this},e.fn.accordion.settings={name:"Accordion",namespace:"accordion",silent:!1,debug:!1,verbose:!1,performance:!0,on:"click",observeChanges:!0,exclusive:!0,collapsible:!0,closeNested:!1,animateChildren:!0,duration:350,easing:"easeOutQuad",onOpening:function(){},onClosing:function(){},onChanging:function(){},onOpen:function(){},onClose:function(){},onChange:function(){},error:{method:"The method you called is not defined"},className:{active:"active",animating:"animating"},selector:{accordion:".accordion",title:".title",trigger:".title",content:".content"}},e.extend(e.easing,{easeOutQuad:function(e,t,n,i,o){return-i*(t/=o)*(t-2)+n}})}(jQuery,window,document),function(e,t,n,i){"use strict";t=void 0!==t&&t.Math==Math?t:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")(),e.fn.checkbox=function(o){var a,r=e(this),s=r.selector||"",l=(new Date).getTime(),c=[],u=arguments[0],d="string"==typeof u,f=[].slice.call(arguments,1);return r.each(function(){var r,m,g=e.extend(!0,{},e.fn.checkbox.settings,o),p=g.className,h=g.namespace,v=g.selector,b=g.error,y="."+h,x="module-"+h,C=e(this),w=e(this).children(v.label),S=e(this).children(v.input),k=S[0],T=!1,A=!1,R=C.data(x),P=this;m={initialize:function(){m.verbose("Initializing checkbox",g),m.create.label(),m.bind.events(),m.set.tabbable(),m.hide.input(),m.observeChanges(),m.instantiate(),m.setup()},instantiate:function(){m.verbose("Storing instance of module",m),R=m,C.data(x,m)},destroy:function(){m.verbose("Destroying module"),m.unbind.events(),m.show.input(),C.removeData(x)},fix:{reference:function(){C.is(v.input)&&(m.debug("Behavior called on <input> adjusting invoked element"),C=C.closest(v.checkbox),m.refresh())}},setup:function(){m.set.initialLoad(),m.is.indeterminate()?(m.debug("Initial value is indeterminate"),m.indeterminate()):m.is.checked()?(m.debug("Initial value is checked"),m.check()):(m.debug("Initial value is unchecked"),m.uncheck()),m.remove.initialLoad()},refresh:function(){w=C.children(v.label),S=C.children(v.input),k=S[0]},hide:{input:function(){m.verbose("Modifying <input> z-index to be unselectable"),S.addClass(p.hidden)}},show:{input:function(){m.verbose("Modifying <input> z-index to be selectable"),S.removeClass(p.hidden)}},observeChanges:function(){"MutationObserver"in t&&((r=new MutationObserver(function(e){m.debug("DOM tree modified, updating selector cache"),m.refresh()})).observe(P,{childList:!0,subtree:!0}),m.debug("Setting up mutation observer",r))},attachEvents:function(t,n){var i=e(t);n=e.isFunction(m[n])?m[n]:m.toggle,i.length>0?(m.debug("Attaching checkbox events to element",t,n),i.on("click"+y,n)):m.error(b.notFound)},event:{click:function(t){var n=e(t.target);n.is(v.input)?m.verbose("Using default check action on initialized checkbox"):n.is(v.link)?m.debug("Clicking link inside checkbox, skipping toggle"):(m.toggle(),S.focus(),t.preventDefault())},keydown:function(e){var t=e.which,n=13,i=32;t==27?(m.verbose("Escape key pressed blurring field"),S.blur(),A=!0):e.ctrlKey||t!=i&&t!=n?A=!1:(m.verbose("Enter/space key pressed, toggling checkbox"),m.toggle(),A=!0)},keyup:function(e){A&&e.preventDefault()}},check:function(){m.should.allowCheck()&&(m.debug("Checking checkbox",S),m.set.checked(),m.should.ignoreCallbacks()||(g.onChecked.call(k),g.onChange.call(k)))},uncheck:function(){m.should.allowUncheck()&&(m.debug("Unchecking checkbox"),m.set.unchecked(),m.should.ignoreCallbacks()||(g.onUnchecked.call(k),g.onChange.call(k)))},indeterminate:function(){m.should.allowIndeterminate()?m.debug("Checkbox is already indeterminate"):(m.debug("Making checkbox indeterminate"),m.set.indeterminate(),m.should.ignoreCallbacks()||(g.onIndeterminate.call(k),g.onChange.call(k)))},determinate:function(){m.should.allowDeterminate()?m.debug("Checkbox is already determinate"):(m.debug("Making checkbox determinate"),m.set.determinate(),m.should.ignoreCallbacks()||(g.onDeterminate.call(k),g.onChange.call(k)))},enable:function(){m.is.enabled()?m.debug("Checkbox is already enabled"):(m.debug("Enabling checkbox"),m.set.enabled(),g.onEnable.call(k),g.onEnabled.call(k))},disable:function(){m.is.disabled()?m.debug("Checkbox is already disabled"):(m.debug("Disabling checkbox"),m.set.disabled(),g.onDisable.call(k),g.onDisabled.call(k))},get:{radios:function(){var t=m.get.name();return e('input[name="'+t+'"]').closest(v.checkbox)},otherRadios:function(){return m.get.radios().not(C)},name:function(){return S.attr("name")}},is:{initialLoad:function(){return T},radio:function(){return S.hasClass(p.radio)||"radio"==S.attr("type")},indeterminate:function(){return S.prop("indeterminate")!==i&&S.prop("indeterminate")},checked:function(){return S.prop("checked")!==i&&S.prop("checked")},disabled:function(){return S.prop("disabled")!==i&&S.prop("disabled")},enabled:function(){return!m.is.disabled()},determinate:function(){return!m.is.indeterminate()},unchecked:function(){return!m.is.checked()}},should:{allowCheck:function(){return m.is.determinate()&&m.is.checked()&&!m.should.forceCallbacks()?(m.debug("Should not allow check, checkbox is already checked"),!1):!1!==g.beforeChecked.apply(k)||(m.debug("Should not allow check, beforeChecked cancelled"),!1)},allowUncheck:function(){return m.is.determinate()&&m.is.unchecked()&&!m.should.forceCallbacks()?(m.debug("Should not allow uncheck, checkbox is already unchecked"),!1):!1!==g.beforeUnchecked.apply(k)||(m.debug("Should not allow uncheck, beforeUnchecked cancelled"),!1)},allowIndeterminate:function(){return m.is.indeterminate()&&!m.should.forceCallbacks()?(m.debug("Should not allow indeterminate, checkbox is already indeterminate"),!1):!1!==g.beforeIndeterminate.apply(k)||(m.debug("Should not allow indeterminate, beforeIndeterminate cancelled"),!1)},allowDeterminate:function(){return m.is.determinate()&&!m.should.forceCallbacks()?(m.debug("Should not allow determinate, checkbox is already determinate"),!1):!1!==g.beforeDeterminate.apply(k)||(m.debug("Should not allow determinate, beforeDeterminate cancelled"),!1)},forceCallbacks:function(){return m.is.initialLoad()&&g.fireOnInit},ignoreCallbacks:function(){return T&&!g.fireOnInit}},can:{change:function(){return!(C.hasClass(p.disabled)||C.hasClass(p.readOnly)||S.prop("disabled")||S.prop("readonly"))},uncheck:function(){return"boolean"==typeof g.uncheckable?g.uncheckable:!m.is.radio()}},set:{initialLoad:function(){T=!0},checked:function(){m.verbose("Setting class to checked"),C.removeClass(p.indeterminate).addClass(p.checked),m.is.radio()&&m.uncheckOthers(),m.is.indeterminate()||!m.is.checked()?(m.verbose("Setting state to checked",k),S.prop("indeterminate",!1).prop("checked",!0),m.trigger.change()):m.debug("Input is already checked, skipping input property change")},unchecked:function(){m.verbose("Removing checked class"),C.removeClass(p.indeterminate).removeClass(p.checked),m.is.indeterminate()||!m.is.unchecked()?(m.debug("Setting state to unchecked"),S.prop("indeterminate",!1).prop("checked",!1),m.trigger.change()):m.debug("Input is already unchecked")},indeterminate:function(){m.verbose("Setting class to indeterminate"),C.addClass(p.indeterminate),m.is.indeterminate()?m.debug("Input is already indeterminate, skipping input property change"):(m.debug("Setting state to indeterminate"),S.prop("indeterminate",!0),m.trigger.change())},determinate:function(){m.verbose("Removing indeterminate class"),C.removeClass(p.indeterminate),m.is.determinate()?m.debug("Input is already determinate, skipping input property change"):(m.debug("Setting state to determinate"),S.prop("indeterminate",!1))},disabled:function(){m.verbose("Setting class to disabled"),C.addClass(p.disabled),m.is.disabled()?m.debug("Input is already disabled, skipping input property change"):(m.debug("Setting state to disabled"),S.prop("disabled","disabled"),m.trigger.change())},enabled:function(){m.verbose("Removing disabled class"),C.removeClass(p.disabled),m.is.enabled()?m.debug("Input is already enabled, skipping input property change"):(m.debug("Setting state to enabled"),S.prop("disabled",!1),m.trigger.change())},tabbable:function(){m.verbose("Adding tabindex to checkbox"),S.attr("tabindex")===i&&S.attr("tabindex",0)}},remove:{initialLoad:function(){T=!1}},trigger:{change:function(){var e=n.createEvent("HTMLEvents"),t=S[0];t&&(m.verbose("Triggering native change event"),e.initEvent("change",!0,!1),t.dispatchEvent(e))}},create:{label:function(){S.prevAll(v.label).length>0?(S.prev(v.label).detach().insertAfter(S),m.debug("Moving existing label",w)):m.has.label()||(w=e("<label>").insertAfter(S),m.debug("Creating label",w))}},has:{label:function(){return w.length>0}},bind:{events:function(){m.verbose("Attaching checkbox events"),C.on("click"+y,m.event.click).on("keydown"+y,v.input,m.event.keydown).on("keyup"+y,v.input,m.event.keyup)}},unbind:{events:function(){m.debug("Removing events"),C.off(y)}},uncheckOthers:function(){var e=m.get.otherRadios();m.debug("Unchecking other radios",e),e.removeClass(p.checked)},toggle:function(){m.can.change()?m.is.indeterminate()||m.is.unchecked()?(m.debug("Currently unchecked"),m.check()):m.is.checked()&&m.can.uncheck()&&(m.debug("Currently checked"),m.uncheck()):m.is.radio()||m.debug("Checkbox is read-only or disabled, ignoring toggle")},setting:function(t,n){if(m.debug("Changing setting",t,n),e.isPlainObject(t))e.extend(!0,g,t);else{if(n===i)return g[t];e.isPlainObject(g[t])?e.extend(!0,g[t],n):g[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,m,t);else{if(n===i)return m[t];m[t]=n}},debug:function(){!g.silent&&g.debug&&(g.performance?m.performance.log(arguments):(m.debug=Function.prototype.bind.call(console.info,console,g.name+":"),m.debug.apply(console,arguments)))},verbose:function(){!g.silent&&g.verbose&&g.debug&&(g.performance?m.performance.log(arguments):(m.verbose=Function.prototype.bind.call(console.info,console,g.name+":"),m.verbose.apply(console,arguments)))},error:function(){g.silent||(m.error=Function.prototype.bind.call(console.error,console,g.name+":"),m.error.apply(console,arguments))},performance:{log:function(e){var t,n;g.performance&&(n=(t=(new Date).getTime())-(l||t),l=t,c.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:P,"Execution Time":n})),clearTimeout(m.performance.timer),m.performance.timer=setTimeout(m.performance.display,500)},display:function(){var t=g.name+":",n=0;l=!1,clearTimeout(m.performance.timer),e.each(c,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",s&&(t+=" '"+s+"'"),(console.group!==i||console.table!==i)&&c.length>0&&(console.groupCollapsed(t),console.table?console.table(c):e.each(c,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),c=[]}},invoke:function(t,n,o){var r,s,l,c=R;return n=n||f,o=P||o,"string"==typeof t&&c!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(c[a])&&n!=r)c=c[a];else{if(c[a]!==i)return s=c[a],!1;if(!e.isPlainObject(c[o])||n==r)return c[o]!==i?(s=c[o],!1):(m.error(b.method,t),!1);c=c[o]}})),e.isFunction(s)?l=s.apply(o,n):s!==i&&(l=s),e.isArray(a)?a.push(l):a!==i?a=[a,l]:l!==i&&(a=l),s}},d?(R===i&&m.initialize(),m.invoke(u)):(R!==i&&R.invoke("destroy"),m.initialize())}),a!==i?a:this},e.fn.checkbox.settings={name:"Checkbox",namespace:"checkbox",silent:!1,debug:!1,verbose:!0,performance:!0,uncheckable:"auto",fireOnInit:!1,onChange:function(){},beforeChecked:function(){},beforeUnchecked:function(){},beforeDeterminate:function(){},beforeIndeterminate:function(){},onChecked:function(){},onUnchecked:function(){},onDeterminate:function(){},onIndeterminate:function(){},onEnable:function(){},onDisable:function(){},onEnabled:function(){},onDisabled:function(){},className:{checked:"checked",indeterminate:"indeterminate",disabled:"disabled",hidden:"hidden",radio:"radio",readOnly:"read-only"},error:{method:"The method you called is not defined"},selector:{checkbox:".ui.checkbox",label:"label, .box",input:'input[type="checkbox"], input[type="radio"]',link:"a[href]"}}}(jQuery,window,document),function(e,t,n,i){"use strict";t=void 0!==t&&t.Math==Math?t:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")(),e.fn.dimmer=function(t){var o,a=e(this),r=(new Date).getTime(),s=[],l=arguments[0],c="string"==typeof l,u=[].slice.call(arguments,1);return a.each(function(){var d,f,m,g=e.isPlainObject(t)?e.extend(!0,{},e.fn.dimmer.settings,t):e.extend({},e.fn.dimmer.settings),p=g.selector,h=g.namespace,v=g.className,b=g.error,y="."+h,x="module-"+h,C=a.selector||"",w="ontouchstart"in n.documentElement?"touchstart":"click",S=e(this),k=this,T=S.data(x);(m={preinitialize:function(){m.is.dimmer()?(f=S.parent(),d=S):(f=S,d=m.has.dimmer()?g.dimmerName?f.find(p.dimmer).filter("."+g.dimmerName):f.find(p.dimmer):m.create(),m.set.variation())},initialize:function(){m.debug("Initializing dimmer",g),m.bind.events(),m.set.dimmable(),m.instantiate()},instantiate:function(){m.verbose("Storing instance of module",m),T=m,S.data(x,T)},destroy:function(){m.verbose("Destroying previous module",d),m.unbind.events(),m.remove.variation(),f.off(y)},bind:{events:function(){"hover"==g.on?f.on("mouseenter"+y,m.show).on("mouseleave"+y,m.hide):"click"==g.on&&f.on(w+y,m.toggle),m.is.page()&&(m.debug("Setting as a page dimmer",f),m.set.pageDimmer()),m.is.closable()&&(m.verbose("Adding dimmer close event",d),f.on(w+y,p.dimmer,m.event.click))}},unbind:{events:function(){S.removeData(x),f.off(y)}},event:{click:function(t){m.verbose("Determining if event occured on dimmer",t),(0===d.find(t.target).length||e(t.target).is(p.content))&&(m.hide(),t.stopImmediatePropagation())}},addContent:function(t){var n=e(t);m.debug("Add content to dimmer",n),n.parent()[0]!==d[0]&&n.detach().appendTo(d)},create:function(){var t=e(g.template.dimmer());return g.dimmerName&&(m.debug("Creating named dimmer",g.dimmerName),t.addClass(g.dimmerName)),t.appendTo(f),t},show:function(t){t=e.isFunction(t)?t:function(){},m.debug("Showing dimmer",d,g),m.is.dimmed()&&!m.is.animating()||!m.is.enabled()?m.debug("Dimmer is already shown or disabled"):(m.animate.show(t),g.onShow.call(k),g.onChange.call(k))},hide:function(t){t=e.isFunction(t)?t:function(){},m.is.dimmed()||m.is.animating()?(m.debug("Hiding dimmer",d),m.animate.hide(t),g.onHide.call(k),g.onChange.call(k)):m.debug("Dimmer is not visible")},toggle:function(){m.verbose("Toggling dimmer visibility",d),m.is.dimmed()?m.hide():m.show()},animate:{show:function(t){t=e.isFunction(t)?t:function(){},g.useCSS&&e.fn.transition!==i&&d.transition("is supported")?("auto"!==g.opacity&&m.set.opacity(),d.transition({displayType:"flex",animation:g.transition+" in",queue:!1,duration:m.get.duration(),useFailSafe:!0,onStart:function(){m.set.dimmed()},onComplete:function(){m.set.active(),t()}})):(m.verbose("Showing dimmer animation with javascript"),m.set.dimmed(),"auto"==g.opacity&&(g.opacity=.8),d.stop().css({opacity:0,width:"100%",height:"100%"}).fadeTo(m.get.duration(),g.opacity,function(){d.removeAttr("style"),m.set.active(),t()}))},hide:function(t){t=e.isFunction(t)?t:function(){},g.useCSS&&e.fn.transition!==i&&d.transition("is supported")?(m.verbose("Hiding dimmer with css"),d.transition({displayType:"flex",animation:g.transition+" out",queue:!1,duration:m.get.duration(),useFailSafe:!0,onStart:function(){m.remove.dimmed()},onComplete:function(){m.remove.active(),t()}})):(m.verbose("Hiding dimmer with javascript"),m.remove.dimmed(),d.stop().fadeOut(m.get.duration(),function(){m.remove.active(),d.removeAttr("style"),t()}))}},get:{dimmer:function(){return d},duration:function(){return"object"==typeof g.duration?m.is.active()?g.duration.hide:g.duration.show:g.duration}},has:{dimmer:function(){return g.dimmerName?S.find(p.dimmer).filter("."+g.dimmerName).length>0:S.find(p.dimmer).length>0}},is:{active:function(){return d.hasClass(v.active)},animating:function(){return d.is(":animated")||d.hasClass(v.animating)},closable:function(){return"auto"==g.closable?"hover"!=g.on:g.closable},dimmer:function(){return S.hasClass(v.dimmer)},dimmable:function(){return S.hasClass(v.dimmable)},dimmed:function(){return f.hasClass(v.dimmed)},disabled:function(){return f.hasClass(v.disabled)},enabled:function(){return!m.is.disabled()},page:function(){return f.is("body")},pageDimmer:function(){return d.hasClass(v.pageDimmer)}},can:{show:function(){return!d.hasClass(v.disabled)}},set:{opacity:function(e){var t=d.css("background-color"),n=t.split(","),i=n&&3==n.length,o=n&&4==n.length;e=0===g.opacity?0:g.opacity||e,i||o?(n[3]=e+")",t=n.join(",")):t="rgba(0, 0, 0, "+e+")",m.debug("Setting opacity to",e),d.css("background-color",t)},active:function(){d.addClass(v.active)},dimmable:function(){f.addClass(v.dimmable)},dimmed:function(){f.addClass(v.dimmed)},pageDimmer:function(){d.addClass(v.pageDimmer)},disabled:function(){d.addClass(v.disabled)},variation:function(e){(e=e||g.variation)&&d.addClass(e)}},remove:{active:function(){d.removeClass(v.active)},dimmed:function(){f.removeClass(v.dimmed)},disabled:function(){d.removeClass(v.disabled)},variation:function(e){(e=e||g.variation)&&d.removeClass(e)}},setting:function(t,n){if(m.debug("Changing setting",t,n),e.isPlainObject(t))e.extend(!0,g,t);else{if(n===i)return g[t];e.isPlainObject(g[t])?e.extend(!0,g[t],n):g[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,m,t);else{if(n===i)return m[t];m[t]=n}},debug:function(){!g.silent&&g.debug&&(g.performance?m.performance.log(arguments):(m.debug=Function.prototype.bind.call(console.info,console,g.name+":"),m.debug.apply(console,arguments)))},verbose:function(){!g.silent&&g.verbose&&g.debug&&(g.performance?m.performance.log(arguments):(m.verbose=Function.prototype.bind.call(console.info,console,g.name+":"),m.verbose.apply(console,arguments)))},error:function(){g.silent||(m.error=Function.prototype.bind.call(console.error,console,g.name+":"),m.error.apply(console,arguments))},performance:{log:function(e){var t,n;g.performance&&(n=(t=(new Date).getTime())-(r||t),r=t,s.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:k,"Execution Time":n})),clearTimeout(m.performance.timer),m.performance.timer=setTimeout(m.performance.display,500)},display:function(){var t=g.name+":",n=0;r=!1,clearTimeout(m.performance.timer),e.each(s,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",C&&(t+=" '"+C+"'"),a.length>1&&(t+=" ("+a.length+")"),(console.group!==i||console.table!==i)&&s.length>0&&(console.groupCollapsed(t),console.table?console.table(s):e.each(s,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),s=[]}},invoke:function(t,n,a){var r,s,l,c=T;return n=n||u,a=k||a,"string"==typeof t&&c!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(c[a])&&n!=r)c=c[a];else{if(c[a]!==i)return s=c[a],!1;if(!e.isPlainObject(c[o])||n==r)return c[o]!==i?(s=c[o],!1):(m.error(b.method,t),!1);c=c[o]}})),e.isFunction(s)?l=s.apply(a,n):s!==i&&(l=s),e.isArray(o)?o.push(l):o!==i?o=[o,l]:l!==i&&(o=l),s}}).preinitialize(),c?(T===i&&m.initialize(),m.invoke(l)):(T!==i&&T.invoke("destroy"),m.initialize())}),o!==i?o:this},e.fn.dimmer.settings={name:"Dimmer",namespace:"dimmer",silent:!1,debug:!1,verbose:!1,performance:!0,dimmerName:!1,variation:!1,closable:"auto",useCSS:!0,transition:"fade",on:!1,opacity:"auto",duration:{show:500,hide:500},onChange:function(){},onShow:function(){},onHide:function(){},error:{method:"The method you called is not defined."},className:{active:"active",animating:"animating",dimmable:"dimmable",dimmed:"dimmed",dimmer:"dimmer",disabled:"disabled",hide:"hide",pageDimmer:"page",show:"show"},selector:{dimmer:"> .ui.dimmer",content:".ui.dimmer > .content, .ui.dimmer > .content > .center"},template:{dimmer:function(){return e("<div />").attr("class","ui dimmer")}}}}(jQuery,window,document),function(e,t,n,i){"use strict";t=void 0!==t&&t.Math==Math?t:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")(),e.fn.dropdown=function(o){var a,r=e(this),s=e(n),l=r.selector||"",c="ontouchstart"in n.documentElement,u=(new Date).getTime(),d=[],f=arguments[0],m="string"==typeof f,g=[].slice.call(arguments,1);return r.each(function(p){var h,v,b,y,x,C,w,S,k=e.isPlainObject(o)?e.extend(!0,{},e.fn.dropdown.settings,o):e.extend({},e.fn.dropdown.settings),T=k.className,A=k.message,R=k.fields,P=k.keys,E=k.metadata,F=k.namespace,O=k.regExp,D=k.selector,q=k.error,j=k.templates,z="."+F,I="module-"+F,M=e(this),L=e(k.context),V=M.find(D.text),N=M.find(D.search),H=M.find(D.sizer),U=M.find(D.input),W=M.find(D.icon),B=M.prev().find(D.text).length>0?M.prev().find(D.text):M.prev(),Q=M.children(D.menu),X=Q.find(D.item),$=!1,Y=!1,Z=!1,K=this,J=M.data(I);S={initialize:function(){S.debug("Initializing dropdown",k),S.is.alreadySetup()?S.setup.reference():(S.setup.layout(),k.values&&S.change.values(k.values),S.refreshData(),S.save.defaults(),S.restore.selected(),S.create.id(),S.bind.events(),S.observeChanges(),S.instantiate())},instantiate:function(){S.verbose("Storing instance of dropdown",S),J=S,M.data(I,S)},destroy:function(){S.verbose("Destroying previous dropdown",M),S.remove.tabbable(),M.off(z).removeData(I),Q.off(z),s.off(y),S.disconnect.menuObserver(),S.disconnect.selectObserver()},observeChanges:function(){"MutationObserver"in t&&(C=new MutationObserver(S.event.select.mutation),w=new MutationObserver(S.event.menu.mutation),S.debug("Setting up mutation observer",C,w),S.observe.select(),S.observe.menu())},disconnect:{menuObserver:function(){w&&w.disconnect()},selectObserver:function(){C&&C.disconnect()}},observe:{select:function(){S.has.input()&&C.observe(M[0],{childList:!0,subtree:!0})},menu:function(){S.has.menu()&&w.observe(Q[0],{childList:!0,subtree:!0})}},create:{id:function(){x=(Math.random().toString(16)+"000000000").substr(2,8),y="."+x,S.verbose("Creating unique id for element",x)},userChoice:function(t){var n,o,a;return!!(t=t||S.get.userValues())&&(t=e.isArray(t)?t:[t],e.each(t,function(t,r){!1===S.get.item(r)&&(a=k.templates.addition(S.add.variables(A.addResult,r)),o=e("<div />").html(a).attr("data-"+E.value,r).attr("data-"+E.text,r).addClass(T.addition).addClass(T.item),k.hideAdditions&&o.addClass(T.hidden),n=n===i?o:n.add(o),S.verbose("Creating user choices for value",r,o))}),n)},userLabels:function(t){var n=S.get.userValues();n&&(S.debug("Adding user labels",n),e.each(n,function(e,t){S.verbose("Adding custom user value"),S.add.label(t,t)}))},menu:function(){Q=e("<div />").addClass(T.menu).appendTo(M)},sizer:function(){H=e("<span />").addClass(T.sizer).insertAfter(N)}},search:function(e){e=e!==i?e:S.get.query(),S.verbose("Searching for query",e),S.has.minCharacters(e)?S.filter(e):S.hide()},select:{firstUnfiltered:function(){S.verbose("Selecting first non-filtered element"),S.remove.selectedItem(),X.not(D.unselectable).not(D.addition+D.hidden).eq(0).addClass(T.selected)},nextAvailable:function(e){var t=(e=e.eq(0)).nextAll(D.item).not(D.unselectable).eq(0),n=e.prevAll(D.item).not(D.unselectable).eq(0);t.length>0?(S.verbose("Moving selection to",t),t.addClass(T.selected)):(S.verbose("Moving selection to",n),n.addClass(T.selected))}},setup:{api:function(){var e={debug:k.debug,urlData:{value:S.get.value(),query:S.get.query()},on:!1};S.verbose("First request, initializing API"),M.api(e)},layout:function(){M.is("select")&&(S.setup.select(),S.setup.returnedObject()),S.has.menu()||S.create.menu(),S.is.search()&&!S.has.search()&&(S.verbose("Adding search input"),N=e("<input />").addClass(T.search).prop("autocomplete","off").insertBefore(V)),S.is.multiple()&&S.is.searchSelection()&&!S.has.sizer()&&S.create.sizer(),k.allowTab&&S.set.tabbable()},select:function(){var t=S.get.selectValues();S.debug("Dropdown initialized on a select",t),M.is("select")&&(U=M),U.parent(D.dropdown).length>0?(S.debug("UI dropdown already exists. Creating dropdown menu only"),M=U.closest(D.dropdown),S.has.menu()||S.create.menu(),Q=M.children(D.menu),S.setup.menu(t)):(S.debug("Creating entire dropdown from select"),M=e("<div />").attr("class",U.attr("class")).addClass(T.selection).addClass(T.dropdown).html(j.dropdown(t)).insertBefore(U),U.hasClass(T.multiple)&&!1===U.prop("multiple")&&(S.error(q.missingMultiple),U.prop("multiple",!0)),U.is("[multiple]")&&S.set.multiple(),U.prop("disabled")&&(S.debug("Disabling dropdown"),M.addClass(T.disabled)),U.removeAttr("class").detach().prependTo(M)),S.refresh()},menu:function(e){Q.html(j.menu(e,R)),X=Q.find(D.item)},reference:function(){S.debug("Dropdown behavior was called on select, replacing with closest dropdown"),M=M.parent(D.dropdown),J=M.data(I),K=M.get(0),S.refresh(),S.setup.returnedObject()},returnedObject:function(){var e=r.slice(0,p),t=r.slice(p+1);r=e.add(M).add(t)}},refresh:function(){S.refreshSelectors(),S.refreshData()},refreshItems:function(){X=Q.find(D.item)},refreshSelectors:function(){S.verbose("Refreshing selector cache"),V=M.find(D.text),N=M.find(D.search),U=M.find(D.input),W=M.find(D.icon),B=M.prev().find(D.text).length>0?M.prev().find(D.text):M.prev(),Q=M.children(D.menu),X=Q.find(D.item)},refreshData:function(){S.verbose("Refreshing cached metadata"),X.removeData(E.text).removeData(E.value)},clearData:function(){S.verbose("Clearing metadata"),X.removeData(E.text).removeData(E.value),M.removeData(E.defaultText).removeData(E.defaultValue).removeData(E.placeholderText)},toggle:function(){S.verbose("Toggling menu visibility"),S.is.active()?S.hide():S.show()},show:function(t){if(t=e.isFunction(t)?t:function(){},!S.can.show()&&S.is.remote()&&(S.debug("No API results retrieved, searching before show"),S.queryRemote(S.get.query(),S.show)),S.can.show()&&!S.is.active()){if(S.debug("Showing dropdown"),!S.has.message()||S.has.maxSelections()||S.has.allResultsFiltered()||S.remove.message(),S.is.allFiltered())return!0;!1!==k.onShow.call(K)&&S.animate.show(function(){S.can.click()&&S.bind.intent(),S.has.menuSearch()&&S.focusSearch(),S.set.visible(),t.call(K)})}},hide:function(t){t=e.isFunction(t)?t:function(){},S.is.active()&&!S.is.animatingOutward()&&(S.debug("Hiding dropdown"),!1!==k.onHide.call(K)&&S.animate.hide(function(){S.remove.visible(),t.call(K)}))},hideOthers:function(){S.verbose("Finding other dropdowns to hide"),r.not(M).has(D.menu+"."+T.visible).dropdown("hide")},hideMenu:function(){S.verbose("Hiding menu  instantaneously"),S.remove.active(),S.remove.visible(),Q.transition("hide")},hideSubMenus:function(){var e=Q.children(D.item).find(D.menu);S.verbose("Hiding sub menus",e),e.transition("hide")},bind:{events:function(){c&&S.bind.touchEvents(),S.bind.keyboardEvents(),S.bind.inputEvents(),S.bind.mouseEvents()},touchEvents:function(){S.debug("Touch device detected binding additional touch events"),S.is.searchSelection()||S.is.single()&&M.on("touchstart"+z,S.event.test.toggle),Q.on("touchstart"+z,D.item,S.event.item.mouseenter)},keyboardEvents:function(){S.verbose("Binding keyboard events"),M.on("keydown"+z,S.event.keydown),S.has.search()&&M.on(S.get.inputEvent()+z,D.search,S.event.input),S.is.multiple()&&s.on("keydown"+y,S.event.document.keydown)},inputEvents:function(){S.verbose("Binding input change events"),M.on("change"+z,D.input,S.event.change)},mouseEvents:function(){S.verbose("Binding mouse events"),S.is.multiple()&&M.on("click"+z,D.label,S.event.label.click).on("click"+z,D.remove,S.event.remove.click),S.is.searchSelection()?(M.on("mousedown"+z,S.event.mousedown).on("mouseup"+z,S.event.mouseup).on("mousedown"+z,D.menu,S.event.menu.mousedown).on("mouseup"+z,D.menu,S.event.menu.mouseup).on("click"+z,D.icon,S.event.icon.click).on("focus"+z,D.search,S.event.search.focus).on("click"+z,D.search,S.event.search.focus).on("blur"+z,D.search,S.event.search.blur).on("click"+z,D.text,S.event.text.focus),S.is.multiple()&&M.on("click"+z,S.event.click)):("click"==k.on?M.on("click"+z,D.icon,S.event.icon.click).on("click"+z,S.event.test.toggle):"hover"==k.on?M.on("mouseenter"+z,S.delay.show).on("mouseleave"+z,S.delay.hide):M.on(k.on+z,S.toggle),M.on("mousedown"+z,S.event.mousedown).on("mouseup"+z,S.event.mouseup).on("focus"+z,S.event.focus),S.has.menuSearch()?M.on("blur"+z,D.search,S.event.search.blur):M.on("blur"+z,S.event.blur)),Q.on("mouseenter"+z,D.item,S.event.item.mouseenter).on("mouseleave"+z,D.item,S.event.item.mouseleave).on("click"+z,D.item,S.event.item.click)},intent:function(){S.verbose("Binding hide intent event to document"),c&&s.on("touchstart"+y,S.event.test.touch).on("touchmove"+y,S.event.test.touch),s.on("click"+y,S.event.test.hide)}},unbind:{intent:function(){S.verbose("Removing hide intent event from document"),c&&s.off("touchstart"+y).off("touchmove"+y),s.off("click"+y)}},filter:function(e){var t=e!==i?e:S.get.query(),n=function(){S.is.multiple()&&S.filterActive(),(e||!e&&0==S.get.activeItem().length)&&S.select.firstUnfiltered(),S.has.allResultsFiltered()?k.onNoResults.call(K,t)?k.allowAdditions?k.hideAdditions&&(S.verbose("User addition with no menu, setting empty style"),S.set.empty(),S.hideMenu()):(S.verbose("All items filtered, showing message",t),S.add.message(A.noResults)):(S.verbose("All items filtered, hiding dropdown",t),S.hideMenu()):(S.remove.empty(),S.remove.message()),k.allowAdditions&&S.add.userSuggestion(e),S.is.searchSelection()&&S.can.show()&&S.is.focusedOnSearch()&&S.show()};k.useLabels&&S.has.maxSelections()||(k.apiSettings?S.can.useAPI()?S.queryRemote(t,function(){k.filterRemoteData&&S.filterItems(t),n()}):S.error(q.noAPI):(S.filterItems(t),n()))},queryRemote:function(t,n){var i={errorDuration:!1,cache:"local",throttle:k.throttle,urlData:{query:t},onError:function(){S.add.message(A.serverError),n()},onFailure:function(){S.add.message(A.serverError),n()},onSuccess:function(e){S.remove.message(),S.setup.menu({values:e[R.remoteValues]}),n()}};M.api("get request")||S.setup.api(),i=e.extend(!0,{},i,k.apiSettings),M.api("setting",i).api("query")},filterItems:function(t){var n=t!==i?t:S.get.query(),o=null,a=S.escape.string(n),r=new RegExp("^"+a,"igm");S.has.query()&&(o=[],S.verbose("Searching for matching values",n),X.each(function(){var t,i,a=e(this);if("both"==k.match||"text"==k.match){if(-1!==(t=String(S.get.choiceText(a,!1))).search(r))return o.push(this),!0;if("exact"===k.fullTextSearch&&S.exactSearch(n,t))return o.push(this),!0;if(!0===k.fullTextSearch&&S.fuzzySearch(n,t))return o.push(this),!0}if("both"==k.match||"value"==k.match){if(-1!==(i=String(S.get.choiceValue(a,t))).search(r))return o.push(this),!0;if("exact"===k.fullTextSearch&&S.exactSearch(n,i))return o.push(this),!0;if(!0===k.fullTextSearch&&S.fuzzySearch(n,i))return o.push(this),!0}})),S.debug("Showing only matched items",n),S.remove.filteredItem(),o&&X.not(o).addClass(T.filtered)},fuzzySearch:function(e,t){var n=t.length,i=e.length;if(e=e.toLowerCase(),t=t.toLowerCase(),i>n)return!1;if(i===n)return e===t;e:for(var o=0,a=0;o<i;o++){for(var r=e.charCodeAt(o);a<n;)if(t.charCodeAt(a++)===r)continue e;return!1}return!0},exactSearch:function(e,t){return e=e.toLowerCase(),(t=t.toLowerCase()).indexOf(e)>-1},filterActive:function(){k.useLabels&&X.filter("."+T.active).addClass(T.filtered)},focusSearch:function(e){S.has.search()&&!S.is.focusedOnSearch()&&(e?(M.off("focus"+z,D.search),N.focus(),M.on("focus"+z,D.search,S.event.search.focus)):N.focus())},forceSelection:function(){var e=X.not(T.filtered).filter("."+T.selected).eq(0),t=X.not(T.filtered).filter("."+T.active).eq(0),n=e.length>0?e:t;if(n.length>0&&!S.is.multiple())return S.debug("Forcing partial selection to selected item",n),void S.event.item.click.call(n,{},!0);k.allowAdditions?(S.set.selected(S.get.query()),S.remove.searchTerm()):S.remove.searchTerm()},change:{values:function(t){k.allowAdditions||S.clear(),S.debug("Creating dropdown with specified values",t),S.setup.menu({values:t}),e.each(t,function(e,t){if(1==t.selected)return S.debug("Setting initial selection to",t.value),S.set.selected(t.value),!0})}},event:{change:function(){Z||(S.debug("Input changed, updating selection"),S.set.selected())},focus:function(){k.showOnFocus&&!$&&S.is.hidden()&&!v&&S.show()},blur:function(e){v=n.activeElement===this,$||v||(S.remove.activeLabel(),S.hide())},mousedown:function(){S.is.searchSelection()?b=!0:$=!0},mouseup:function(){S.is.searchSelection()?b=!1:$=!1},click:function(t){e(t.target).is(M)&&(S.is.focusedOnSearch()?S.show():S.focusSearch())},search:{focus:function(){$=!0,S.is.multiple()&&S.remove.activeLabel(),k.showOnFocus&&S.search()},blur:function(e){v=n.activeElement===this,S.is.searchSelection()&&!b&&(Y||v||(k.forceSelection&&S.forceSelection(),S.hide())),b=!1}},icon:{click:function(e){S.toggle()}},text:{focus:function(e){$=!0,S.focusSearch()}},input:function(e){(S.is.multiple()||S.is.searchSelection())&&S.set.filtered(),clearTimeout(S.timer),S.timer=setTimeout(S.search,k.delay.search)},label:{click:function(t){var n=e(this),i=M.find(D.label),o=i.filter("."+T.active),a=n.nextAll("."+T.active),r=n.prevAll("."+T.active),s=a.length>0?n.nextUntil(a).add(o).add(n):n.prevUntil(r).add(o).add(n);t.shiftKey?(o.removeClass(T.active),s.addClass(T.active)):t.ctrlKey?n.toggleClass(T.active):(o.removeClass(T.active),n.addClass(T.active)),k.onLabelSelect.apply(this,i.filter("."+T.active))}},remove:{click:function(){var t=e(this).parent();t.hasClass(T.active)?S.remove.activeLabels():S.remove.activeLabels(t)}},test:{toggle:function(e){var t=S.is.multiple()?S.show:S.toggle;S.is.bubbledLabelClick(e)||S.is.bubbledIconClick(e)||S.determine.eventOnElement(e,t)&&e.preventDefault()},touch:function(e){S.determine.eventOnElement(e,function(){"touchstart"==e.type?S.timer=setTimeout(function(){S.hide()},k.delay.touch):"touchmove"==e.type&&clearTimeout(S.timer)}),e.stopPropagation()},hide:function(e){S.determine.eventInModule(e,S.hide)}},select:{mutation:function(t){S.debug("<select> modified, recreating menu");var n=!1;e.each(t,function(t,i){if(e(i.target).is("select")||e(i.addedNodes).is("select"))return n=!0,!0}),n&&(S.disconnect.selectObserver(),S.refresh(),S.setup.select(),S.set.selected(),S.observe.select())}},menu:{mutation:function(t){var n=t[0],i=n.addedNodes?e(n.addedNodes[0]):e(!1),o=n.removedNodes?e(n.removedNodes[0]):e(!1),a=i.add(o),r=a.is(D.addition)||a.closest(D.addition).length>0,s=a.is(D.message)||a.closest(D.message).length>0;r||s?(S.debug("Updating item selector cache"),S.refreshItems()):(S.debug("Menu modified, updating selector cache"),S.refresh())},mousedown:function(){Y=!0},mouseup:function(){Y=!1}},item:{mouseenter:function(t){var n=e(t.target),i=e(this),o=i.children(D.menu),a=i.siblings(D.item).children(D.menu),r=o.length>0;!(o.find(n).length>0)&&r&&(clearTimeout(S.itemTimer),S.itemTimer=setTimeout(function(){S.verbose("Showing sub-menu",o),e.each(a,function(){S.animate.hide(!1,e(this))}),S.animate.show(!1,o)},k.delay.show),t.preventDefault())},mouseleave:function(t){var n=e(this).children(D.menu);n.length>0&&(clearTimeout(S.itemTimer),S.itemTimer=setTimeout(function(){S.verbose("Hiding sub-menu",n),S.animate.hide(!1,n)},k.delay.hide))},click:function(t,i){var o=e(this),a=e(t?t.target:""),r=o.find(D.menu),s=S.get.choiceText(o),l=S.get.choiceValue(o,s),c=r.length>0,u=r.find(a).length>0;S.has.menuSearch()&&e(n.activeElement).blur(),u||c&&!k.allowCategorySelection||(S.is.searchSelection()&&(k.allowAdditions&&S.remove.userAddition(),S.remove.searchTerm(),S.is.focusedOnSearch()||1==i||S.focusSearch(!0)),k.useLabels||(S.remove.filteredItem(),S.set.scrollPosition(o)),S.determine.selectAction.call(this,s,l))}},document:{keydown:function(e){var t=e.which;if(S.is.inObject(t,P)){var n=M.find(D.label),i=n.filter("."+T.active),o=(i.data(E.value),n.index(i)),a=n.length,r=i.length>0,s=i.length>1,l=0===o,c=o+1==a,u=S.is.searchSelection(),d=S.is.focusedOnSearch(),f=S.is.focused(),m=d&&0===S.get.caretPosition();if(u&&!r&&!d)return;t==P.leftArrow?!f&&!m||r?r&&(e.shiftKey?S.verbose("Adding previous label to selection"):(S.verbose("Selecting previous label"),n.removeClass(T.active)),l&&!s?i.addClass(T.active):i.prev(D.siblingLabel).addClass(T.active).end(),e.preventDefault()):(S.verbose("Selecting previous label"),n.last().addClass(T.active)):t==P.rightArrow?(f&&!r&&n.first().addClass(T.active),r&&(e.shiftKey?S.verbose("Adding next label to selection"):(S.verbose("Selecting next label"),n.removeClass(T.active)),c?u?d?n.removeClass(T.active):S.focusSearch():s?i.next(D.siblingLabel).addClass(T.active):i.addClass(T.active):i.next(D.siblingLabel).addClass(T.active),e.preventDefault())):t==P.deleteKey||t==P.backspace?r?(S.verbose("Removing active labels"),c&&u&&!d&&S.focusSearch(),i.last().next(D.siblingLabel).addClass(T.active),S.remove.activeLabels(i),e.preventDefault()):m&&!r&&t==P.backspace&&(S.verbose("Removing last label on input backspace"),i=n.last().addClass(T.active),S.remove.activeLabels(i)):i.removeClass(T.active)}}},keydown:function(e){var t=e.which;if(S.is.inObject(t,P)){var n,i=X.not(D.unselectable).filter("."+T.selected).eq(0),o=Q.children("."+T.active).eq(0),a=i.length>0?i:o,r=a.length>0?a.siblings(":not(."+T.filtered+")").addBack():Q.children(":not(."+T.filtered+")"),s=a.children(D.menu),l=a.closest(D.menu),c=l.hasClass(T.visible)||l.hasClass(T.animating)||l.parent(D.menu).length>0,u=s.length>0,d=a.length>0,f=a.not(D.unselectable).length>0,m=t==P.delimiter&&k.allowAdditions&&S.is.multiple();if(k.allowAdditions&&k.hideAdditions&&(t==P.enter||m)&&f&&(S.verbose("Selecting item from keyboard shortcut",a),S.event.item.click.call(a,e),S.is.searchSelection()&&S.remove.searchTerm()),S.is.visible()){if((t==P.enter||m)&&(t==P.enter&&d&&u&&!k.allowCategorySelection?(S.verbose("Pressed enter on unselectable category, opening sub menu"),t=P.rightArrow):f&&(S.verbose("Selecting item from keyboard shortcut",a),S.event.item.click.call(a,e),S.is.searchSelection()&&S.remove.searchTerm()),e.preventDefault()),d&&(t==P.leftArrow&&l[0]!==Q[0]&&(S.verbose("Left key pressed, closing sub-menu"),S.animate.hide(!1,l),a.removeClass(T.selected),l.closest(D.item).addClass(T.selected),e.preventDefault()),t==P.rightArrow&&u&&(S.verbose("Right key pressed, opening sub-menu"),S.animate.show(!1,s),a.removeClass(T.selected),s.find(D.item).eq(0).addClass(T.selected),e.preventDefault())),t==P.upArrow){if(n=d&&c?a.prevAll(D.item+":not("+D.unselectable+")").eq(0):X.eq(0),r.index(n)<0)return S.verbose("Up key pressed but reached top of current menu"),void e.preventDefault();S.verbose("Up key pressed, changing active item"),a.removeClass(T.selected),n.addClass(T.selected),S.set.scrollPosition(n),k.selectOnKeydown&&S.is.single()&&S.set.selectedItem(n),e.preventDefault()}if(t==P.downArrow){if(0===(n=d&&c?n=a.nextAll(D.item+":not("+D.unselectable+")").eq(0):X.eq(0)).length)return S.verbose("Down key pressed but reached bottom of current menu"),void e.preventDefault();S.verbose("Down key pressed, changing active item"),X.removeClass(T.selected),n.addClass(T.selected),S.set.scrollPosition(n),k.selectOnKeydown&&S.is.single()&&S.set.selectedItem(n),e.preventDefault()}t==P.pageUp&&(S.scrollPage("up"),e.preventDefault()),t==P.pageDown&&(S.scrollPage("down"),e.preventDefault()),t==P.escape&&(S.verbose("Escape key pressed, closing dropdown"),S.hide())}else m&&e.preventDefault(),t!=P.downArrow||S.is.visible()||(S.verbose("Down key pressed, showing dropdown"),S.show(),e.preventDefault())}else S.has.search()||S.set.selectedLetter(String.fromCharCode(t))}},trigger:{change:function(){var e=n.createEvent("HTMLEvents"),t=U[0];t&&(S.verbose("Triggering native change event"),e.initEvent("change",!0,!1),t.dispatchEvent(e))}},determine:{selectAction:function(t,n){S.verbose("Determining action",k.action),e.isFunction(S.action[k.action])?(S.verbose("Triggering preset action",k.action,t,n),S.action[k.action].call(K,t,n,this)):e.isFunction(k.action)?(S.verbose("Triggering user action",k.action,t,n),k.action.call(K,t,n,this)):S.error(q.action,k.action)},eventInModule:function(t,i){var o=e(t.target),a=o.closest(n.documentElement).length>0,r=o.closest(M).length>0;return i=e.isFunction(i)?i:function(){},a&&!r?(S.verbose("Triggering event",i),i(),!0):(S.verbose("Event occurred in dropdown, canceling callback"),!1)},eventOnElement:function(t,i){var o=e(t.target),a=o.closest(D.siblingLabel),r=n.body.contains(t.target),s=0===M.find(a).length,l=0===o.closest(Q).length;return i=e.isFunction(i)?i:function(){},r&&s&&l?(S.verbose("Triggering event",i),i(),!0):(S.verbose("Event occurred in dropdown menu, canceling callback"),!1)}},action:{nothing:function(){},activate:function(t,n,o){if(n=n!==i?n:t,S.can.activate(e(o))){if(S.set.selected(n,e(o)),S.is.multiple()&&!S.is.allFiltered())return;S.hideAndClear()}},select:function(t,n,o){if(n=n!==i?n:t,S.can.activate(e(o))){if(S.set.value(n,t,e(o)),S.is.multiple()&&!S.is.allFiltered())return;S.hideAndClear()}},combo:function(t,n,o){n=n!==i?n:t,S.set.selected(n,e(o)),S.hideAndClear()},hide:function(e,t,n){S.set.value(t,e),S.hideAndClear()}},get:{id:function(){return x},defaultText:function(){return M.data(E.defaultText)},defaultValue:function(){return M.data(E.defaultValue)},placeholderText:function(){return"auto"!=k.placeholder&&"string"==typeof k.placeholder?k.placeholder:M.data(E.placeholderText)||""},text:function(){return V.text()},query:function(){return e.trim(N.val())},searchWidth:function(e){return e=e!==i?e:N.val(),H.text(e),Math.ceil(H.width()+1)},selectionCount:function(){var t=S.get.values();return S.is.multiple()?e.isArray(t)?t.length:0:""!==S.get.value()?1:0},transition:function(e){return"auto"==k.transition?S.is.upward(e)?"slide up":"slide down":k.transition},userValues:function(){var t=S.get.values();return!!t&&(t=e.isArray(t)?t:[t],e.grep(t,function(e){return!1===S.get.item(e)}))},uniqueArray:function(t){return e.grep(t,function(n,i){return e.inArray(n,t)===i})},caretPosition:function(){var e,t,i=N.get(0);return"selectionStart"in i?i.selectionStart:n.selection?(i.focus(),t=(e=n.selection.createRange()).text.length,e.moveStart("character",-i.value.length),e.text.length-t):void 0},value:function(){var t=U.length>0?U.val():M.data(E.value),n=e.isArray(t)&&1===t.length&&""===t[0];return t===i||n?"":t},values:function(){var e=S.get.value();return""===e?"":!S.has.selectInput()&&S.is.multiple()?"string"==typeof e?e.split(k.delimiter):"":e},remoteValues:function(){var t=S.get.values(),n=!1;return t&&("string"==typeof t&&(t=[t]),e.each(t,function(e,t){var i=S.read.remoteData(t);S.verbose("Restoring value from session data",i,t),i&&(n||(n={}),n[t]=i)})),n},choiceText:function(t,n){if(n=n!==i?n:k.preserveHTML,t)return t.find(D.menu).length>0&&(S.verbose("Retrieving text of element with sub-menu"),(t=t.clone()).find(D.menu).remove(),t.find(D.menuIcon).remove()),t.data(E.text)!==i?t.data(E.text):n?e.trim(t.html()):e.trim(t.text())},choiceValue:function(t,n){return n=n||S.get.choiceText(t),!!t&&(t.data(E.value)!==i?String(t.data(E.value)):"string"==typeof n?e.trim(n.toLowerCase()):String(n))},inputEvent:function(){var e=N[0];return!!e&&(e.oninput!==i?"input":e.onpropertychange!==i?"propertychange":"keyup")},selectValues:function(){var t={values:[]};return M.find("option").each(function(){var n=e(this),o=n.html(),a=n.attr("disabled"),r=n.attr("value")!==i?n.attr("value"):o;"auto"===k.placeholder&&""===r?t.placeholder=o:t.values.push({name:o,value:r,disabled:a})}),k.placeholder&&"auto"!==k.placeholder&&(S.debug("Setting placeholder value to",k.placeholder),t.placeholder=k.placeholder),k.sortSelect?(t.values.sort(function(e,t){return e.name>t.name?1:-1}),S.debug("Retrieved and sorted values from select",t)):S.debug("Retrieved values from select",t),t},activeItem:function(){return X.filter("."+T.active)},selectedItem:function(){var e=X.not(D.unselectable).filter("."+T.selected);return e.length>0?e:X.eq(0)},itemWithAdditions:function(e){var t=S.get.item(e),n=S.create.userChoice(e);return n&&n.length>0&&(t=t.length>0?t.add(n):n),t},item:function(t,n){var o,a,r=!1;return t=t!==i?t:S.get.values()!==i?S.get.values():S.get.text(),o=a?t.length>0:t!==i&&null!==t,a=S.is.multiple()&&e.isArray(t),n=""===t||0===t||(n||!1),o&&X.each(function(){var o=e(this),s=S.get.choiceText(o),l=S.get.choiceValue(o,s);if(null!==l&&l!==i)if(a)-1===e.inArray(String(l),t)&&-1===e.inArray(s,t)||(r=r?r.add(o):o);else if(n){if(S.verbose("Ambiguous dropdown value using strict type check",o,t),l===t||s===t)return r=o,!0}else if(String(l)==String(t)||s==t)return S.verbose("Found select item by value",l,t),r=o,!0}),r}},check:{maxSelections:function(e){return!k.maxSelections||((e=e!==i?e:S.get.selectionCount())>=k.maxSelections?(S.debug("Maximum selection count reached"),k.useLabels&&(X.addClass(T.filtered),S.add.message(A.maxSelections)),!0):(S.verbose("No longer at maximum selection count"),S.remove.message(),S.remove.filteredItem(),S.is.searchSelection()&&S.filterItems(),!1))}},restore:{defaults:function(){S.clear(),S.restore.defaultText(),S.restore.defaultValue()},defaultText:function(){var e=S.get.defaultText();e===S.get.placeholderText?(S.debug("Restoring default placeholder text",e),S.set.placeholderText(e)):(S.debug("Restoring default text",e),S.set.text(e))},placeholderText:function(){S.set.placeholderText()},defaultValue:function(){var e=S.get.defaultValue();e!==i&&(S.debug("Restoring default value",e),""!==e?(S.set.value(e),S.set.selected()):(S.remove.activeItem(),S.remove.selectedItem()))},labels:function(){k.allowAdditions&&(k.useLabels||(S.error(q.labels),k.useLabels=!0),S.debug("Restoring selected values"),S.create.userLabels()),S.check.maxSelections()},selected:function(){S.restore.values(),S.is.multiple()?(S.debug("Restoring previously selected values and labels"),S.restore.labels()):S.debug("Restoring previously selected values")},values:function(){S.set.initialLoad(),k.apiSettings&&k.saveRemoteData&&S.get.remoteValues()?S.restore.remoteValues():S.set.selected(),S.remove.initialLoad()},remoteValues:function(){var t=S.get.remoteValues();S.debug("Recreating selected from session data",t),t&&(S.is.single()?e.each(t,function(e,t){S.set.text(t)}):e.each(t,function(e,t){S.add.label(e,t)}))}},read:{remoteData:function(e){var n;if(t.Storage!==i)return(n=sessionStorage.getItem(e))!==i&&n;S.error(q.noStorage)}},save:{defaults:function(){S.save.defaultText(),S.save.placeholderText(),S.save.defaultValue()},defaultValue:function(){var e=S.get.value();S.verbose("Saving default value as",e),M.data(E.defaultValue,e)},defaultText:function(){var e=S.get.text();S.verbose("Saving default text as",e),M.data(E.defaultText,e)},placeholderText:function(){var e;!1!==k.placeholder&&V.hasClass(T.placeholder)&&(e=S.get.text(),S.verbose("Saving placeholder text as",e),M.data(E.placeholderText,e))},remoteData:function(e,n){t.Storage!==i?(S.verbose("Saving remote data to session storage",n,e),sessionStorage.setItem(n,e)):S.error(q.noStorage)}},clear:function(){S.is.multiple()&&k.useLabels?S.remove.labels():(S.remove.activeItem(),S.remove.selectedItem()),S.set.placeholderText(),S.clearValue()},clearValue:function(){S.set.value("")},scrollPage:function(e,t){var n,i,o=t||S.get.selectedItem(),a=o.closest(D.menu),r=a.outerHeight(),s=a.scrollTop(),l=X.eq(0).outerHeight(),c=Math.floor(r/l),u=(a.prop("scrollHeight"),"up"==e?s-l*c:s+l*c),d=X.not(D.unselectable);i="up"==e?d.index(o)-c:d.index(o)+c,(n=("up"==e?i>=0:i<d.length)?d.eq(i):"up"==e?d.first():d.last()).length>0&&(S.debug("Scrolling page",e,n),o.removeClass(T.selected),n.addClass(T.selected),k.selectOnKeydown&&S.is.single()&&S.set.selectedItem(n),a.scrollTop(u))},set:{filtered:function(){var e=S.is.multiple(),t=S.is.searchSelection(),n=e&&t,i=t?S.get.query():"",o="string"==typeof i&&i.length>0,a=S.get.searchWidth(),r=""!==i;e&&o&&(S.verbose("Adjusting input width",a,k.glyphWidth),N.css("width",a)),o||n&&r?(S.verbose("Hiding placeholder text"),V.addClass(T.filtered)):(!e||n&&!r)&&(S.verbose("Showing placeholder text"),V.removeClass(T.filtered))},empty:function(){M.addClass(T.empty)},loading:function(){M.addClass(T.loading)},placeholderText:function(e){e=e||S.get.placeholderText(),S.debug("Setting placeholder text",e),S.set.text(e),V.addClass(T.placeholder)},tabbable:function(){S.is.searchSelection()?(S.debug("Added tabindex to searchable dropdown"),N.val("").attr("tabindex",0),Q.attr("tabindex",-1)):(S.debug("Added tabindex to dropdown"),M.attr("tabindex")===i&&(M.attr("tabindex",0),Q.attr("tabindex",-1)))},initialLoad:function(){S.verbose("Setting initial load"),h=!0},activeItem:function(e){k.allowAdditions&&e.filter(D.addition).length>0?e.addClass(T.filtered):e.addClass(T.active)},partialSearch:function(e){var t=S.get.query().length;N.val(e.substr(0,t))},scrollPosition:function(e,t){var n,o,a,r,s,l;n=(e=e||S.get.selectedItem()).closest(D.menu),o=e&&e.length>0,t=t!==i&&t,e&&n.length>0&&o&&(e.position().top,n.addClass(T.loading),a=(r=n.scrollTop())-n.offset().top+e.offset().top,t||(l=r+n.height()<a+5,s=a-5<r),S.debug("Scrolling to active item",a),(t||s||l)&&n.scrollTop(a),n.removeClass(T.loading))},text:function(e){"select"!==k.action&&("combo"==k.action?(S.debug("Changing combo button text",e,B),k.preserveHTML?B.html(e):B.text(e)):(e!==S.get.placeholderText()&&V.removeClass(T.placeholder),S.debug("Changing text",e,V),V.removeClass(T.filtered),k.preserveHTML?V.html(e):V.text(e)))},selectedItem:function(e){var t=S.get.choiceValue(e),n=S.get.choiceText(e,!1),i=S.get.choiceText(e,!0);S.debug("Setting user selection to item",e),S.remove.activeItem(),S.set.partialSearch(n),S.set.activeItem(e),S.set.selected(t,e),S.set.text(i)},selectedLetter:function(t){var n,i=X.filter("."+T.selected),o=!1;i.length>0&&S.has.firstLetter(i,t)&&(n=i.nextAll(X).eq(0),S.has.firstLetter(n,t)&&(o=n)),o||X.each(function(){if(S.has.firstLetter(e(this),t))return o=e(this),!1}),o&&(S.verbose("Scrolling to next value with letter",t),S.set.scrollPosition(o),i.removeClass(T.selected),o.addClass(T.selected),k.selectOnKeydown&&S.is.single()&&S.set.selectedItem(o))},direction:function(e){"auto"==k.direction?(S.remove.upward(),S.can.openDownward(e)?S.remove.upward(e):S.set.upward(e),S.is.leftward(e)||S.can.openRightward(e)||S.set.leftward(e)):"upward"==k.direction&&S.set.upward(e)},upward:function(e){(e||M).addClass(T.upward)},leftward:function(e){(e||Q).addClass(T.leftward)},value:function(e,t,n){var o=S.escape.value(e),a=U.length>0,r=S.get.values(),s=e!==i?String(e):e;if(a){if(!k.allowReselection&&s==r&&(S.verbose("Skipping value update already same value",e,r),!S.is.initialLoad()))return;S.is.single()&&S.has.selectInput()&&S.can.extendSelect()&&(S.debug("Adding user option",e),S.add.optionValue(e)),S.debug("Updating input value",o,r),Z=!0,U.val(o),!1===k.fireOnInit&&S.is.initialLoad()?S.debug("Input native change event ignored on initial load"):S.trigger.change(),Z=!1}else S.verbose("Storing value in metadata",o,U),o!==r&&M.data(E.value,s);!1===k.fireOnInit&&S.is.initialLoad()?S.verbose("No callback on initial load",k.onChange):k.onChange.call(K,e,t,n)},active:function(){M.addClass(T.active)},multiple:function(){M.addClass(T.multiple)},visible:function(){M.addClass(T.visible)},exactly:function(e,t){S.debug("Setting selected to exact values"),S.clear(),S.set.selected(e,t)},selected:function(t,n){var i=S.is.multiple();(n=k.allowAdditions?n||S.get.itemWithAdditions(t):n||S.get.item(t))&&(S.debug("Setting selected menu item to",n),S.is.multiple()&&S.remove.searchWidth(),S.is.single()?(S.remove.activeItem(),S.remove.selectedItem()):k.useLabels&&S.remove.selectedItem(),n.each(function(){var t=e(this),o=S.get.choiceText(t),a=S.get.choiceValue(t,o),r=t.hasClass(T.filtered),s=t.hasClass(T.active),l=t.hasClass(T.addition),c=i&&1==n.length;i?!s||l?(k.apiSettings&&k.saveRemoteData&&S.save.remoteData(o,a),k.useLabels?(S.add.label(a,o,c),S.add.value(a,o,t),S.set.activeItem(t),S.filterActive(),S.select.nextAvailable(n)):(S.add.value(a,o,t),S.set.text(S.add.variables(A.count)),S.set.activeItem(t))):r||(S.debug("Selected active value, removing label"),S.remove.selected(a)):(k.apiSettings&&k.saveRemoteData&&S.save.remoteData(o,a),S.set.text(o),S.set.value(a,o,t),t.addClass(T.active).addClass(T.selected))}))}},add:{label:function(t,n,i){var o,a=S.is.searchSelection()?N:V,r=S.escape.value(t);k.ignoreCase&&(r=r.toLowerCase()),o=e("<a />").addClass(T.label).attr("data-"+E.value,r).html(j.label(r,n)),o=k.onLabelCreate.call(o,r,n),S.has.label(t)?S.debug("User selection already exists, skipping",r):(k.label.variation&&o.addClass(k.label.variation),!0===i?(S.debug("Animating in label",o),o.addClass(T.hidden).insertBefore(a).transition(k.label.transition,k.label.duration)):(S.debug("Adding selection label",o),o.insertBefore(a)))},message:function(t){var n=Q.children(D.message),i=k.templates.message(S.add.variables(t));n.length>0?n.html(i):n=e("<div/>").html(i).addClass(T.message).appendTo(Q)},optionValue:function(t){var n=S.escape.value(t);U.find('option[value="'+S.escape.string(n)+'"]').length>0||(S.disconnect.selectObserver(),S.is.single()&&(S.verbose("Removing previous user addition"),U.find("option."+T.addition).remove()),e("<option/>").prop("value",n).addClass(T.addition).html(t).appendTo(U),S.verbose("Adding user addition as an <option>",t),S.observe.select())},userSuggestion:function(e){var t,n=Q.children(D.addition),i=S.get.item(e),o=i&&i.not(D.addition).length,a=n.length>0;k.useLabels&&S.has.maxSelections()||(""===e||o?n.remove():(a?(n.data(E.value,e).data(E.text,e).attr("data-"+E.value,e).attr("data-"+E.text,e).removeClass(T.filtered),k.hideAdditions||(t=k.templates.addition(S.add.variables(A.addResult,e)),n.html(t)),S.verbose("Replacing user suggestion with new value",n)):((n=S.create.userChoice(e)).prependTo(Q),S.verbose("Adding item choice to menu corresponding with user choice addition",n)),k.hideAdditions&&!S.is.allFiltered()||n.addClass(T.selected).siblings().removeClass(T.selected),S.refreshItems()))},variables:function(e,t){var n,i,o=-1!==e.search("{count}"),a=-1!==e.search("{maxCount}"),r=-1!==e.search("{term}");return S.verbose("Adding templated variables to message",e),o&&(n=S.get.selectionCount(),e=e.replace("{count}",n)),a&&(n=S.get.selectionCount(),e=e.replace("{maxCount}",k.maxSelections)),r&&(i=t||S.get.query(),e=e.replace("{term}",i)),e},value:function(t,n,i){var o,a=S.get.values();S.has.value(t)?S.debug("Value already selected"):""!==t?(e.isArray(a)?(o=a.concat([t]),o=S.get.uniqueArray(o)):o=[t],S.has.selectInput()?S.can.extendSelect()&&(S.debug("Adding value to select",t,o,U),S.add.optionValue(t)):(o=o.join(k.delimiter),S.debug("Setting hidden input to delimited value",o,U)),!1===k.fireOnInit&&S.is.initialLoad()?S.verbose("Skipping onadd callback on initial load",k.onAdd):k.onAdd.call(K,t,n,i),S.set.value(o,t,n,i),S.check.maxSelections()):S.debug("Cannot select blank values from multiselect")}},remove:{active:function(){M.removeClass(T.active)},activeLabel:function(){M.find(D.label).removeClass(T.active)},empty:function(){M.removeClass(T.empty)},loading:function(){M.removeClass(T.loading)},initialLoad:function(){h=!1},upward:function(e){(e||M).removeClass(T.upward)},leftward:function(e){(e||Q).removeClass(T.leftward)},visible:function(){M.removeClass(T.visible)},activeItem:function(){X.removeClass(T.active)},filteredItem:function(){k.useLabels&&S.has.maxSelections()||(k.useLabels&&S.is.multiple()?X.not("."+T.active).removeClass(T.filtered):X.removeClass(T.filtered),S.remove.empty())},optionValue:function(e){var t=S.escape.value(e),n=U.find('option[value="'+S.escape.string(t)+'"]');n.length>0&&n.hasClass(T.addition)&&(C&&(C.disconnect(),S.verbose("Temporarily disconnecting mutation observer")),n.remove(),S.verbose("Removing user addition as an <option>",t),C&&C.observe(U[0],{childList:!0,subtree:!0}))},message:function(){Q.children(D.message).remove()},searchWidth:function(){N.css("width","")},searchTerm:function(){S.verbose("Cleared search term"),N.val(""),S.set.filtered()},userAddition:function(){X.filter(D.addition).remove()},selected:function(t,n){if(!(n=k.allowAdditions?n||S.get.itemWithAdditions(t):n||S.get.item(t)))return!1;n.each(function(){var t=e(this),n=S.get.choiceText(t),i=S.get.choiceValue(t,n);S.is.multiple()?k.useLabels?(S.remove.value(i,n,t),S.remove.label(i)):(S.remove.value(i,n,t),0===S.get.selectionCount()?S.set.placeholderText():S.set.text(S.add.variables(A.count))):S.remove.value(i,n,t),t.removeClass(T.filtered).removeClass(T.active),k.useLabels&&t.removeClass(T.selected)})},selectedItem:function(){X.removeClass(T.selected)},value:function(e,t,n){var i,o=S.get.values();S.has.selectInput()?(S.verbose("Input is <select> removing selected option",e),i=S.remove.arrayValue(e,o),S.remove.optionValue(e)):(S.verbose("Removing from delimited values",e),i=(i=S.remove.arrayValue(e,o)).join(k.delimiter)),!1===k.fireOnInit&&S.is.initialLoad()?S.verbose("No callback on initial load",k.onRemove):k.onRemove.call(K,e,t,n),S.set.value(i,t,n),S.check.maxSelections()},arrayValue:function(t,n){return e.isArray(n)||(n=[n]),n=e.grep(n,function(e){return t!=e}),S.verbose("Removed value from delimited string",t,n),n},label:function(e,t){var n=M.find(D.label).filter("[data-"+E.value+'="'+S.escape.string(e)+'"]');S.verbose("Removing label",n),n.remove()},activeLabels:function(e){e=e||M.find(D.label).filter("."+T.active),S.verbose("Removing active label selections",e),S.remove.labels(e)},labels:function(t){t=t||M.find(D.label),S.verbose("Removing labels",t),t.each(function(){var t=e(this),n=t.data(E.value),o=n!==i?String(n):n,a=S.is.userValue(o);!1!==k.onLabelRemove.call(t,n)?(S.remove.message(),a?(S.remove.value(o),S.remove.label(o)):S.remove.selected(o)):S.debug("Label remove callback cancelled removal")})},tabbable:function(){S.is.searchSelection()?(S.debug("Searchable dropdown initialized"),N.removeAttr("tabindex"),Q.removeAttr("tabindex")):(S.debug("Simple selection dropdown initialized"),M.removeAttr("tabindex"),Q.removeAttr("tabindex"))}},has:{menuSearch:function(){return S.has.search()&&N.closest(Q).length>0},search:function(){return N.length>0},sizer:function(){return H.length>0},selectInput:function(){return U.is("select")},minCharacters:function(e){return!k.minCharacters||(e=e!==i?String(e):String(S.get.query())).length>=k.minCharacters},firstLetter:function(e,t){var n;return!(!e||0===e.length||"string"!=typeof t)&&(n=S.get.choiceText(e,!1),(t=t.toLowerCase())==String(n).charAt(0).toLowerCase())},input:function(){return U.length>0},items:function(){return X.length>0},menu:function(){return Q.length>0},message:function(){return 0!==Q.children(D.message).length},label:function(e){var t=S.escape.value(e),n=M.find(D.label);return k.ignoreCase&&(t=t.toLowerCase()),n.filter("[data-"+E.value+'="'+S.escape.string(t)+'"]').length>0},maxSelections:function(){return k.maxSelections&&S.get.selectionCount()>=k.maxSelections},allResultsFiltered:function(){var e=X.not(D.addition);return e.filter(D.unselectable).length===e.length},userSuggestion:function(){return Q.children(D.addition).length>0},query:function(){return""!==S.get.query()},value:function(e){return k.ignoreCase?S.has.valueIgnoringCase(e):S.has.valueMatchingCase(e)},valueMatchingCase:function(t){var n=S.get.values();return!!(e.isArray(n)?n&&-1!==e.inArray(t,n):n==t)},valueIgnoringCase:function(t){var n=S.get.values(),i=!1;return e.isArray(n)||(n=[n]),e.each(n,function(e,n){if(String(t).toLowerCase()==String(n).toLowerCase())return i=!0,!1}),i}},is:{active:function(){return M.hasClass(T.active)},animatingInward:function(){return Q.transition("is inward")},animatingOutward:function(){return Q.transition("is outward")},bubbledLabelClick:function(t){return e(t.target).is("select, input")&&M.closest("label").length>0},bubbledIconClick:function(t){return e(t.target).closest(W).length>0},alreadySetup:function(){return M.is("select")&&M.parent(D.dropdown).data(I)!==i&&0===M.prev().length},animating:function(e){return e?e.transition&&e.transition("is animating"):Q.transition&&Q.transition("is animating")},leftward:function(e){return(e||Q).hasClass(T.leftward)},disabled:function(){return M.hasClass(T.disabled)},focused:function(){return n.activeElement===M[0]},focusedOnSearch:function(){return n.activeElement===N[0]},allFiltered:function(){return(S.is.multiple()||S.has.search())&&!(0==k.hideAdditions&&S.has.userSuggestion())&&!S.has.message()&&S.has.allResultsFiltered()},hidden:function(e){return!S.is.visible(e)},initialLoad:function(){return h},inObject:function(t,n){var i=!1;return e.each(n,function(e,n){if(n==t)return i=!0,!0}),i},multiple:function(){return M.hasClass(T.multiple)},remote:function(){return k.apiSettings&&S.can.useAPI()},single:function(){return!S.is.multiple()},selectMutation:function(t){var n=!1;return e.each(t,function(t,i){if(i.target&&e(i.target).is("select"))return n=!0,!0}),n},search:function(){return M.hasClass(T.search)},searchSelection:function(){return S.has.search()&&1===N.parent(D.dropdown).length},selection:function(){return M.hasClass(T.selection)},userValue:function(t){return-1!==e.inArray(t,S.get.userValues())},upward:function(e){return(e||M).hasClass(T.upward)},visible:function(e){return e?e.hasClass(T.visible):Q.hasClass(T.visible)},verticallyScrollableContext:function(){var e=L.get(0)!==t&&L.css("overflow-y");return"auto"==e||"scroll"==e},horizontallyScrollableContext:function(){var e=L.get(0)!==t&&L.css("overflow-X");return"auto"==e||"scroll"==e}},can:{activate:function(e){return!!k.useLabels||(!S.has.maxSelections()||!(!S.has.maxSelections()||!e.hasClass(T.active)))},openDownward:function(e){var n,i,o=e||Q,a=!0;return o.addClass(T.loading),i={context:{offset:L.get(0)===t?{top:0,left:0}:L.offset(),scrollTop:L.scrollTop(),height:L.outerHeight()},menu:{offset:o.offset(),height:o.outerHeight()}},S.is.verticallyScrollableContext()&&(i.menu.offset.top+=i.context.scrollTop),(n={above:i.context.scrollTop<=i.menu.offset.top-i.context.offset.top-i.menu.height,below:i.context.scrollTop+i.context.height>=i.menu.offset.top-i.context.offset.top+i.menu.height}).below?(S.verbose("Dropdown can fit in context downward",n),a=!0):n.below||n.above?(S.verbose("Dropdown cannot fit below, opening upward",n),a=!1):(S.verbose("Dropdown cannot fit in either direction, favoring downward",n),a=!0),o.removeClass(T.loading),a},openRightward:function(e){var n,i,o=e||Q,a=!0;return o.addClass(T.loading),i={context:{offset:L.get(0)===t?{top:0,left:0}:L.offset(),scrollLeft:L.scrollLeft(),width:L.outerWidth()},menu:{offset:o.offset(),width:o.outerWidth()}},S.is.horizontallyScrollableContext()&&(i.menu.offset.left+=i.context.scrollLeft),(n=i.menu.offset.left-i.context.offset.left+i.menu.width>=i.context.scrollLeft+i.context.width)&&(S.verbose("Dropdown cannot fit in context rightward",n),a=!1),o.removeClass(T.loading),a},click:function(){return c||"click"==k.on},extendSelect:function(){return k.allowAdditions||k.apiSettings},show:function(){return!S.is.disabled()&&(S.has.items()||S.has.message())},useAPI:function(){return e.fn.api!==i}},animate:{show:function(t,n){var o,a=n||Q,r=n?function(){}:function(){S.hideSubMenus(),S.hideOthers(),S.set.active()};t=e.isFunction(t)?t:function(){},S.verbose("Doing menu show animation",a),S.set.direction(n),o=S.get.transition(n),S.is.selection()&&S.set.scrollPosition(S.get.selectedItem(),!0),(S.is.hidden(a)||S.is.animating(a))&&("none"==o?(r(),a.transition("show"),t.call(K)):e.fn.transition!==i&&M.transition("is supported")?a.transition({animation:o+" in",debug:k.debug,verbose:k.verbose,duration:k.duration,queue:!0,onStart:r,onComplete:function(){t.call(K)}}):S.error(q.noTransition,o))},hide:function(t,n){var o=n||Q,a=(n?k.duration:k.duration,n?function(){}:function(){S.can.click()&&S.unbind.intent(),S.remove.active()}),r=S.get.transition(n);t=e.isFunction(t)?t:function(){},(S.is.visible(o)||S.is.animating(o))&&(S.verbose("Doing menu hide animation",o),"none"==r?(a(),o.transition("hide"),t.call(K)):e.fn.transition!==i&&M.transition("is supported")?o.transition({animation:r+" out",duration:k.duration,debug:k.debug,verbose:k.verbose,queue:!1,onStart:a,onComplete:function(){t.call(K)}}):S.error(q.transition))}},hideAndClear:function(){S.remove.searchTerm(),S.has.maxSelections()||(S.has.search()?S.hide(function(){S.remove.filteredItem()}):S.hide())},delay:{show:function(){S.verbose("Delaying show event to ensure user intent"),clearTimeout(S.timer),S.timer=setTimeout(S.show,k.delay.show)},hide:function(){S.verbose("Delaying hide event to ensure user intent"),clearTimeout(S.timer),S.timer=setTimeout(S.hide,k.delay.hide)}},escape:{value:function(t){var n=e.isArray(t),i="string"==typeof t,o=!i&&!n,a=i&&-1!==t.search(O.quote),r=[];return o||!a?t:(S.debug("Encoding quote values for use in select",t),n?(e.each(t,function(e,t){r.push(t.replace(O.quote,"&quot;"))}),r):t.replace(O.quote,"&quot;"))},string:function(e){return(e=String(e)).replace(O.escape,"\\$&")}},setting:function(t,n){if(S.debug("Changing setting",t,n),e.isPlainObject(t))e.extend(!0,k,t);else{if(n===i)return k[t];e.isPlainObject(k[t])?e.extend(!0,k[t],n):k[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,S,t);else{if(n===i)return S[t];S[t]=n}},debug:function(){!k.silent&&k.debug&&(k.performance?S.performance.log(arguments):(S.debug=Function.prototype.bind.call(console.info,console,k.name+":"),S.debug.apply(console,arguments)))},verbose:function(){!k.silent&&k.verbose&&k.debug&&(k.performance?S.performance.log(arguments):(S.verbose=Function.prototype.bind.call(console.info,console,k.name+":"),S.verbose.apply(console,arguments)))},error:function(){k.silent||(S.error=Function.prototype.bind.call(console.error,console,k.name+":"),S.error.apply(console,arguments))},performance:{log:function(e){var t,n;k.performance&&(n=(t=(new Date).getTime())-(u||t),u=t,d.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:K,"Execution Time":n})),clearTimeout(S.performance.timer),S.performance.timer=setTimeout(S.performance.display,500)},display:function(){var t=k.name+":",n=0;u=!1,clearTimeout(S.performance.timer),e.each(d,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",l&&(t+=" '"+l+"'"),(console.group!==i||console.table!==i)&&d.length>0&&(console.groupCollapsed(t),console.table?console.table(d):e.each(d,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),d=[]}},invoke:function(t,n,o){var r,s,l,c=J;return n=n||g,o=K||o,"string"==typeof t&&c!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(c[a])&&n!=r)c=c[a];else{if(c[a]!==i)return s=c[a],!1;if(!e.isPlainObject(c[o])||n==r)return c[o]!==i?(s=c[o],!1):(S.error(q.method,t),!1);c=c[o]}})),e.isFunction(s)?l=s.apply(o,n):s!==i&&(l=s),e.isArray(a)?a.push(l):a!==i?a=[a,l]:l!==i&&(a=l),s}},m?(J===i&&S.initialize(),S.invoke(f)):(J!==i&&J.invoke("destroy"),S.initialize())}),a!==i?a:r},e.fn.dropdown.settings={silent:!1,debug:!1,verbose:!1,performance:!0,on:"click",action:"activate",values:!1,apiSettings:!1,selectOnKeydown:!0,minCharacters:0,filterRemoteData:!1,saveRemoteData:!0,throttle:200,context:t,direction:"auto",keepOnScreen:!0,match:"both",fullTextSearch:!1,placeholder:"auto",preserveHTML:!0,sortSelect:!1,forceSelection:!0,allowAdditions:!1,ignoreCase:!1,hideAdditions:!0,maxSelections:!1,useLabels:!0,delimiter:",",showOnFocus:!0,allowReselection:!1,allowTab:!0,allowCategorySelection:!1,fireOnInit:!1,transition:"auto",duration:200,glyphWidth:1.037,label:{transition:"scale",duration:200,variation:!1},delay:{hide:300,show:200,search:20,touch:50},onChange:function(e,t,n){},onAdd:function(e,t,n){},onRemove:function(e,t,n){},onLabelSelect:function(e){},onLabelCreate:function(t,n){return e(this)},onLabelRemove:function(e){return!0},onNoResults:function(e){return!0},onShow:function(){},onHide:function(){},name:"Dropdown",namespace:"dropdown",message:{addResult:"Add <b>{term}</b>",count:"{count} selected",maxSelections:"Max {maxCount} selections",noResults:"No results found.",serverError:"There was an error contacting the server"},error:{action:"You called a dropdown action that was not defined",alreadySetup:"Once a select has been initialized behaviors must be called on the created ui dropdown",labels:"Allowing user additions currently requires the use of labels.",missingMultiple:"<select> requires multiple property to be set to correctly preserve multiple values",method:"The method you called is not defined.",noAPI:"The API module is required to load resources remotely",noStorage:"Saving remote data requires session storage",noTransition:"This module requires ui transitions <https://github.com/Semantic-Org/UI-Transition>"},regExp:{escape:/[-[\]{}()*+?.,\\^$|#\s]/g,quote:/"/g},metadata:{defaultText:"defaultText",defaultValue:"defaultValue",placeholderText:"placeholder",text:"text",value:"value"},fields:{remoteValues:"results",values:"values",disabled:"disabled",name:"name",value:"value",text:"text"},keys:{backspace:8,delimiter:188,deleteKey:46,enter:13,escape:27,pageUp:33,pageDown:34,leftArrow:37,upArrow:38,rightArrow:39,downArrow:40},selector:{addition:".addition",dropdown:".ui.dropdown",hidden:".hidden",icon:"> .dropdown.icon",input:'> input[type="hidden"], > select',item:".item",label:"> .label",remove:"> .label > .delete.icon",siblingLabel:".label",menu:".menu",message:".message",menuIcon:".dropdown.icon",search:"input.search, .menu > .search > input, .menu input.search",sizer:"> input.sizer",text:"> .text:not(.icon)",unselectable:".disabled, .filtered"},className:{active:"active",addition:"addition",animating:"animating",disabled:"disabled",empty:"empty",dropdown:"ui dropdown",filtered:"filtered",hidden:"hidden transition",item:"item",label:"ui label",loading:"loading",menu:"menu",message:"message",multiple:"multiple",placeholder:"default",sizer:"sizer",search:"search",selected:"selected",selection:"selection",upward:"upward",leftward:"left",visible:"visible"}},e.fn.dropdown.settings.templates={dropdown:function(t){var n=t.placeholder||!1,i=(t.values,"");return i+='<i class="dropdown icon"></i>',t.placeholder?i+='<div class="default text">'+n+"</div>":i+='<div class="text"></div>',i+='<div class="menu">',e.each(t.values,function(e,t){i+=t.disabled?'<div class="disabled item" data-value="'+t.value+'">'+t.name+"</div>":'<div class="item" data-value="'+t.value+'">'+t.name+"</div>"}),i+="</div>"},menu:function(t,n){var i=t[n.values]||{},o="";return e.each(i,function(e,t){var i=t[n.text]?'data-text="'+t[n.text]+'"':"",a=t[n.disabled]?"disabled ":"";o+='<div class="'+a+'item" data-value="'+t[n.value]+'"'+i+">",o+=t[n.name],o+="</div>"}),o},label:function(e,t){return t+'<i class="delete icon"></i>'},message:function(e){return e},addition:function(e){return e}}}(jQuery,window,document),function(e,t,n,i){"use strict";t=void 0!==t&&t.Math==Math?t:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")(),e.fn.embed=function(n){var o,a=e(this),r=a.selector||"",s=(new Date).getTime(),l=[],c=arguments[0],u="string"==typeof c,d=[].slice.call(arguments,1);return a.each(function(){var f,m=e.isPlainObject(n)?e.extend(!0,{},e.fn.embed.settings,n):e.extend({},e.fn.embed.settings),g=m.selector,p=m.className,h=m.sources,v=m.error,b=m.metadata,y=m.namespace,x=m.templates,C="."+y,w="module-"+y,S=(e(t),e(this)),k=(S.find(g.placeholder),S.find(g.icon),S.find(g.embed)),T=this,A=S.data(w);f={initialize:function(){f.debug("Initializing embed"),f.determine.autoplay(),f.create(),f.bind.events(),f.instantiate()},instantiate:function(){f.verbose("Storing instance of module",f),A=f,S.data(w,f)},destroy:function(){f.verbose("Destroying previous instance of embed"),f.reset(),S.removeData(w).off(C)},refresh:function(){f.verbose("Refreshing selector cache"),S.find(g.placeholder),S.find(g.icon),k=S.find(g.embed)},bind:{events:function(){f.has.placeholder()&&(f.debug("Adding placeholder events"),S.on("click"+C,g.placeholder,f.createAndShow).on("click"+C,g.icon,f.createAndShow))}},create:function(){f.get.placeholder()?f.createPlaceholder():f.createAndShow()},createPlaceholder:function(e){var t=f.get.icon(),n=f.get.url();f.generate.embed(n);e=e||f.get.placeholder(),S.html(x.placeholder(e,t)),f.debug("Creating placeholder for embed",e,t)},createEmbed:function(t){f.refresh(),t=t||f.get.url(),k=e("<div/>").addClass(p.embed).html(f.generate.embed(t)).appendTo(S),m.onCreate.call(T,t),f.debug("Creating embed object",k)},changeEmbed:function(e){k.html(f.generate.embed(e))},createAndShow:function(){f.createEmbed(),f.show()},change:function(e,t,n){f.debug("Changing video to ",e,t,n),S.data(b.source,e).data(b.id,t),n?S.data(b.url,n):S.removeData(b.url),f.has.embed()?f.changeEmbed():f.create()},reset:function(){f.debug("Clearing embed and showing placeholder"),f.remove.active(),f.remove.embed(),f.showPlaceholder(),m.onReset.call(T)},show:function(){f.debug("Showing embed"),f.set.active(),m.onDisplay.call(T)},hide:function(){f.debug("Hiding embed"),f.showPlaceholder()},showPlaceholder:function(){f.debug("Showing placeholder image"),f.remove.active(),m.onPlaceholderDisplay.call(T)},get:{id:function(){return m.id||S.data(b.id)},placeholder:function(){return m.placeholder||S.data(b.placeholder)},icon:function(){return m.icon?m.icon:S.data(b.icon)!==i?S.data(b.icon):f.determine.icon()},source:function(e){return m.source?m.source:S.data(b.source)!==i?S.data(b.source):f.determine.source()},type:function(){var e=f.get.source();return h[e]!==i&&h[e].type},url:function(){return m.url?m.url:S.data(b.url)!==i?S.data(b.url):f.determine.url()}},determine:{autoplay:function(){f.should.autoplay()&&(m.autoplay=!0)},source:function(t){var n=!1;return(t=t||f.get.url())&&e.each(h,function(e,i){if(-1!==t.search(i.domain))return n=e,!1}),n},icon:function(){var e=f.get.source();return h[e]!==i&&h[e].icon},url:function(){var e,t=m.id||S.data(b.id),n=m.source||S.data(b.source);return(e=h[n]!==i&&h[n].url.replace("{id}",t))&&S.data(b.url,e),e}},set:{active:function(){S.addClass(p.active)}},remove:{active:function(){S.removeClass(p.active)},embed:function(){k.empty()}},encode:{parameters:function(e){var t,n=[];for(t in e)n.push(encodeURIComponent(t)+"="+encodeURIComponent(e[t]));return n.join("&amp;")}},generate:{embed:function(e){f.debug("Generating embed html");var t,n,i=f.get.source();return(e=f.get.url(e))?(n=f.generate.parameters(i),t=x.iframe(e,n)):f.error(v.noURL,S),t},parameters:function(t,n){var o=h[t]&&h[t].parameters!==i?h[t].parameters(m):{};return(n=n||m.parameters)&&(o=e.extend({},o,n)),o=m.onEmbed(o),f.encode.parameters(o)}},has:{embed:function(){return k.length>0},placeholder:function(){return m.placeholder||S.data(b.placeholder)}},should:{autoplay:function(){return"auto"===m.autoplay?m.placeholder||S.data(b.placeholder)!==i:m.autoplay}},is:{video:function(){return"video"==f.get.type()}},setting:function(t,n){if(f.debug("Changing setting",t,n),e.isPlainObject(t))e.extend(!0,m,t);else{if(n===i)return m[t];e.isPlainObject(m[t])?e.extend(!0,m[t],n):m[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,f,t);else{if(n===i)return f[t];f[t]=n}},debug:function(){!m.silent&&m.debug&&(m.performance?f.performance.log(arguments):(f.debug=Function.prototype.bind.call(console.info,console,m.name+":"),f.debug.apply(console,arguments)))},verbose:function(){!m.silent&&m.verbose&&m.debug&&(m.performance?f.performance.log(arguments):(f.verbose=Function.prototype.bind.call(console.info,console,m.name+":"),f.verbose.apply(console,arguments)))},error:function(){m.silent||(f.error=Function.prototype.bind.call(console.error,console,m.name+":"),f.error.apply(console,arguments))},performance:{log:function(e){var t,n;m.performance&&(n=(t=(new Date).getTime())-(s||t),s=t,l.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:T,"Execution Time":n})),clearTimeout(f.performance.timer),f.performance.timer=setTimeout(f.performance.display,500)},display:function(){var t=m.name+":",n=0;s=!1,clearTimeout(f.performance.timer),e.each(l,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",r&&(t+=" '"+r+"'"),a.length>1&&(t+=" ("+a.length+")"),(console.group!==i||console.table!==i)&&l.length>0&&(console.groupCollapsed(t),console.table?console.table(l):e.each(l,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),l=[]}},invoke:function(t,n,a){var r,s,l,c=A;return n=n||d,a=T||a,"string"==typeof t&&c!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(c[a])&&n!=r)c=c[a];else{if(c[a]!==i)return s=c[a],!1;if(!e.isPlainObject(c[o])||n==r)return c[o]!==i?(s=c[o],!1):(f.error(v.method,t),!1);c=c[o]}})),e.isFunction(s)?l=s.apply(a,n):s!==i&&(l=s),e.isArray(o)?o.push(l):o!==i?o=[o,l]:l!==i&&(o=l),s}},u?(A===i&&f.initialize(),f.invoke(c)):(A!==i&&A.invoke("destroy"),f.initialize())}),o!==i?o:this},e.fn.embed.settings={name:"Embed",namespace:"embed",silent:!1,debug:!1,verbose:!1,performance:!0,icon:!1,source:!1,url:!1,id:!1,autoplay:"auto",color:"#444444",hd:!0,brandedUI:!1,parameters:!1,onDisplay:function(){},onPlaceholderDisplay:function(){},onReset:function(){},onCreate:function(e){},onEmbed:function(e){return e},metadata:{id:"id",icon:"icon",placeholder:"placeholder",source:"source",url:"url"},error:{noURL:"No URL specified",method:"The method you called is not defined"},className:{active:"active",embed:"embed"},selector:{embed:".embed",placeholder:".placeholder",icon:".icon"},sources:{youtube:{name:"youtube",type:"video",icon:"video play",domain:"youtube.com",url:"//www.youtube.com/embed/{id}",parameters:function(e){return{autohide:!e.brandedUI,autoplay:e.autoplay,color:e.color||i,hq:e.hd,jsapi:e.api,modestbranding:!e.brandedUI}}},vimeo:{name:"vimeo",type:"video",icon:"video play",domain:"vimeo.com",url:"//player.vimeo.com/video/{id}",parameters:function(e){return{api:e.api,autoplay:e.autoplay,byline:e.brandedUI,color:e.color||i,portrait:e.brandedUI,title:e.brandedUI}}}},templates:{iframe:function(e,t){var n=e;return t&&(n+="?"+t),'<iframe src="'+n+'" width="100%" height="100%" frameborder="0" scrolling="no" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>'},placeholder:function(e,t){var n="";return t&&(n+='<i class="'+t+' icon"></i>'),e&&(n+='<img class="placeholder" src="'+e+'">'),n}},api:!1,onPause:function(){},onPlay:function(){},onStop:function(){}}}(jQuery,window,document),function(e,t,n,i){"use strict";t=void 0!==t&&t.Math==Math?t:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")(),e.fn.modal=function(o){var a,r=e(this),s=e(t),l=e(n),c=e("body"),u=r.selector||"",d=(new Date).getTime(),f=[],m=arguments[0],g="string"==typeof m,p=[].slice.call(arguments,1),h=t.requestAnimationFrame||t.mozRequestAnimationFrame||t.webkitRequestAnimationFrame||t.msRequestAnimationFrame||function(e){setTimeout(e,0)};return r.each(function(){var r,v,b,y,x,C,w,S,k,T=e.isPlainObject(o)?e.extend(!0,{},e.fn.modal.settings,o):e.extend({},e.fn.modal.settings),A=T.selector,R=T.className,P=T.namespace,E=T.error,F="."+P,O="module-"+P,D=e(this),q=e(T.context),j=D.find(A.close),z=this,I=D.data(O),M=!1;k={initialize:function(){k.verbose("Initializing dimmer",q),k.create.id(),k.create.dimmer(),k.refreshModals(),k.bind.events(),T.observeChanges&&k.observeChanges(),k.instantiate()},instantiate:function(){k.verbose("Storing instance of modal"),I=k,D.data(O,I)},create:{dimmer:function(){var t={debug:T.debug,variation:!T.centered&&"top aligned",dimmerName:"modals"},n=e.extend(!0,t,T.dimmerSettings);e.fn.dimmer!==i?(k.debug("Creating dimmer"),y=q.dimmer(n),T.detachable?(k.verbose("Modal is detachable, moving content into dimmer"),y.dimmer("add content",D)):k.set.undetached(),x=y.dimmer("get dimmer")):k.error(E.dimmer)},id:function(){w=(Math.random().toString(16)+"000000000").substr(2,8),C="."+w,k.verbose("Creating unique id for element",w)}},destroy:function(){k.verbose("Destroying previous modal"),D.removeData(O).off(F),s.off(C),x.off(C),j.off(F),q.dimmer("destroy")},observeChanges:function(){"MutationObserver"in t&&((S=new MutationObserver(function(e){k.debug("DOM tree modified, refreshing"),k.refresh()})).observe(z,{childList:!0,subtree:!0}),k.debug("Setting up mutation observer",S))},refresh:function(){k.remove.scrolling(),k.cacheSizes(),k.set.screenHeight(),k.set.type()},refreshModals:function(){v=D.siblings(A.modal),r=v.add(D)},attachEvents:function(t,n){var i=e(t);n=e.isFunction(k[n])?k[n]:k.toggle,i.length>0?(k.debug("Attaching modal events to element",t,n),i.off(F).on("click"+F,n)):k.error(E.notFound,t)},bind:{events:function(){k.verbose("Attaching events"),D.on("click"+F,A.close,k.event.close).on("click"+F,A.approve,k.event.approve).on("click"+F,A.deny,k.event.deny),s.on("resize"+C,k.event.resize)}},get:{id:function(){return(Math.random().toString(16)+"000000000").substr(2,8)}},event:{approve:function(){M||!1===T.onApprove.call(z,e(this))?k.verbose("Approve callback returned false cancelling hide"):(M=!0,k.hide(function(){M=!1}))},deny:function(){M||!1===T.onDeny.call(z,e(this))?k.verbose("Deny callback returned false cancelling hide"):(M=!0,k.hide(function(){M=!1}))},close:function(){k.hide()},click:function(t){if(T.closable){var i=e(t.target).closest(A.modal).length>0,o=e.contains(n.documentElement,t.target);!i&&o&&k.is.active()&&(k.debug("Dimmer clicked, hiding all modals"),k.remove.clickaway(),T.allowMultiple?k.hide():k.hideAll())}else k.verbose("Dimmer clicked but closable setting is disabled")},debounce:function(e,t){clearTimeout(k.timer),k.timer=setTimeout(e,t)},keyboard:function(e){27==e.which&&(T.closable?(k.debug("Escape key pressed hiding modal"),k.hide()):k.debug("Escape key pressed, but closable is set to false"),e.preventDefault())},resize:function(){y.dimmer("is active")&&(k.is.animating()||k.is.active())&&h(k.refresh)}},toggle:function(){k.is.active()||k.is.animating()?k.hide():k.show()},show:function(t){t=e.isFunction(t)?t:function(){},k.refreshModals(),k.set.dimmerSettings(),k.showModal(t)},hide:function(t){t=e.isFunction(t)?t:function(){},k.refreshModals(),k.hideModal(t)},showModal:function(t){t=e.isFunction(t)?t:function(){},k.is.animating()||!k.is.active()?(k.showDimmer(),k.cacheSizes(),k.set.screenHeight(),k.set.type(),k.set.clickaway(),!T.allowMultiple&&k.others.active()?k.hideOthers(k.showModal):(T.allowMultiple&&T.detachable&&D.detach().appendTo(x),T.onShow.call(z),T.transition&&e.fn.transition!==i&&D.transition("is supported")?(k.debug("Showing modal with css animations"),D.transition({debug:T.debug,animation:T.transition+" in",queue:T.queue,duration:T.duration,useFailSafe:!0,onComplete:function(){T.onVisible.apply(z),T.keyboardShortcuts&&k.add.keyboardShortcuts(),k.save.focus(),k.set.active(),T.autofocus&&k.set.autofocus(),t()}})):k.error(E.noTransition))):k.debug("Modal is already visible")},hideModal:function(t,n){t=e.isFunction(t)?t:function(){},k.debug("Hiding modal"),!1!==T.onHide.call(z,e(this))?(k.is.animating()||k.is.active())&&(T.transition&&e.fn.transition!==i&&D.transition("is supported")?(k.remove.active(),D.transition({debug:T.debug,animation:T.transition+" out",queue:T.queue,duration:T.duration,useFailSafe:!0,onStart:function(){k.others.active()||n||k.hideDimmer(),T.keyboardShortcuts&&k.remove.keyboardShortcuts()},onComplete:function(){T.onHidden.call(z),k.restore.focus(),t()}})):k.error(E.noTransition)):k.verbose("Hide callback returned false cancelling hide")},showDimmer:function(){y.dimmer("is animating")||!y.dimmer("is active")?(k.debug("Showing dimmer"),y.dimmer("show")):k.debug("Dimmer already visible")},hideDimmer:function(){y.dimmer("is animating")||y.dimmer("is active")?y.dimmer("hide",function(){k.remove.clickaway(),k.remove.screenHeight()}):k.debug("Dimmer is not visible cannot hide")},hideAll:function(t){var n=r.filter("."+R.active+", ."+R.animating);t=e.isFunction(t)?t:function(){},n.length>0&&(k.debug("Hiding all visible modals"),k.hideDimmer(),n.modal("hide modal",t))},hideOthers:function(t){var n=v.filter("."+R.active+", ."+R.animating);t=e.isFunction(t)?t:function(){},n.length>0&&(k.debug("Hiding other modals",v),n.modal("hide modal",t,!0))},others:{active:function(){return v.filter("."+R.active).length>0},animating:function(){return v.filter("."+R.animating).length>0}},add:{keyboardShortcuts:function(){k.verbose("Adding keyboard shortcuts"),l.on("keyup"+F,k.event.keyboard)}},save:{focus:function(){e(n.activeElement).closest(D).length>0||(b=e(n.activeElement).blur())}},restore:{focus:function(){b&&b.length>0&&b.focus()}},remove:{active:function(){D.removeClass(R.active)},clickaway:function(){x.off("click"+C)},bodyStyle:function(){""===c.attr("style")&&(k.verbose("Removing style attribute"),c.removeAttr("style"))},screenHeight:function(){k.debug("Removing page height"),c.css("height","")},keyboardShortcuts:function(){k.verbose("Removing keyboard shortcuts"),l.off("keyup"+F)},scrolling:function(){y.removeClass(R.scrolling),D.removeClass(R.scrolling)}},cacheSizes:function(){D.addClass(R.loading);var o=D.prop("scrollHeight"),a=D.outerHeight();k.cache!==i&&0===a||(k.cache={pageHeight:e(n).outerHeight(),height:a+T.offset,scrollHeight:o+T.offset,contextHeight:"body"==T.context?e(t).height():y.height()},k.cache.topOffset=-k.cache.height/2),D.removeClass(R.loading),k.debug("Caching modal and container sizes",k.cache)},can:{fit:function(){var e=k.cache.contextHeight,t=k.cache.contextHeight/2,n=k.cache.topOffset,i=k.cache.scrollHeight,o=k.cache.height,a=T.padding;return i>o?t+n+i+a<e:o+2*a<e}},is:{active:function(){return D.hasClass(R.active)},animating:function(){return D.transition("is supported")?D.transition("is animating"):D.is(":visible")},scrolling:function(){return y.hasClass(R.scrolling)},modernBrowser:function(){return!(t.ActiveXObject||"ActiveXObject"in t)}},set:{autofocus:function(){var e=D.find("[tabindex], :input").filter(":visible"),t=e.filter("[autofocus]"),n=t.length>0?t.first():e.first();n.length>0&&n.focus()},clickaway:function(){x.on("click"+C,k.event.click)},dimmerSettings:function(){if(e.fn.dimmer!==i){var t={debug:T.debug,dimmerName:"modals",closable:"auto",variation:!T.centered&&"top aligned",duration:{show:T.duration,hide:T.duration}},n=e.extend(!0,t,T.dimmerSettings);T.inverted?(n.variation=n.variation!==i?n.variation+" inverted":"inverted",x.addClass(R.inverted)):x.removeClass(R.inverted),T.blurring?y.addClass(R.blurring):y.removeClass(R.blurring),q.dimmer("setting",n)}else k.error(E.dimmer)},screenHeight:function(){k.can.fit()?c.css("height",""):(k.debug("Modal is taller than page content, resizing page height"),c.css("height",k.cache.height+2*T.padding))},active:function(){D.addClass(R.active)},scrolling:function(){y.addClass(R.scrolling),D.addClass(R.scrolling)},type:function(){k.can.fit()?(k.verbose("Modal fits on screen"),k.others.active()||k.others.animating()||k.remove.scrolling()):(k.verbose("Modal cannot fit on screen setting to scrolling"),k.set.scrolling())},undetached:function(){y.addClass(R.undetached)}},setting:function(t,n){if(k.debug("Changing setting",t,n),e.isPlainObject(t))e.extend(!0,T,t);else{if(n===i)return T[t];e.isPlainObject(T[t])?e.extend(!0,T[t],n):T[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,k,t);else{if(n===i)return k[t];k[t]=n}},debug:function(){!T.silent&&T.debug&&(T.performance?k.performance.log(arguments):(k.debug=Function.prototype.bind.call(console.info,console,T.name+":"),k.debug.apply(console,arguments)))},verbose:function(){!T.silent&&T.verbose&&T.debug&&(T.performance?k.performance.log(arguments):(k.verbose=Function.prototype.bind.call(console.info,console,T.name+":"),k.verbose.apply(console,arguments)))},error:function(){T.silent||(k.error=Function.prototype.bind.call(console.error,console,T.name+":"),k.error.apply(console,arguments))},performance:{log:function(e){var t,n;T.performance&&(n=(t=(new Date).getTime())-(d||t),d=t,f.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:z,"Execution Time":n})),clearTimeout(k.performance.timer),k.performance.timer=setTimeout(k.performance.display,500)},display:function(){var t=T.name+":",n=0;d=!1,clearTimeout(k.performance.timer),e.each(f,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",u&&(t+=" '"+u+"'"),(console.group!==i||console.table!==i)&&f.length>0&&(console.groupCollapsed(t),console.table?console.table(f):e.each(f,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),f=[]}},invoke:function(t,n,o){var r,s,l,c=I;return n=n||p,o=z||o,"string"==typeof t&&c!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(c[a])&&n!=r)c=c[a];else{if(c[a]!==i)return s=c[a],!1;if(!e.isPlainObject(c[o])||n==r)return c[o]!==i&&(s=c[o],!1);c=c[o]}})),e.isFunction(s)?l=s.apply(o,n):s!==i&&(l=s),e.isArray(a)?a.push(l):a!==i?a=[a,l]:l!==i&&(a=l),s}},g?(I===i&&k.initialize(),k.invoke(m)):(I!==i&&I.invoke("destroy"),k.initialize())}),a!==i?a:this},e.fn.modal.settings={name:"Modal",namespace:"modal",silent:!1,debug:!1,verbose:!1,performance:!0,observeChanges:!1,allowMultiple:!1,detachable:!0,closable:!0,autofocus:!0,inverted:!1,blurring:!1,centered:!0,dimmerSettings:{closable:!1,useCSS:!0},keyboardShortcuts:!0,context:"body",queue:!1,duration:500,offset:0,transition:"scale",padding:50,onShow:function(){},onVisible:function(){},onHide:function(){return!0},onHidden:function(){},onApprove:function(){return!0},onDeny:function(){return!0},selector:{close:"> .close",approve:".actions .positive, .actions .approve, .actions .ok",deny:".actions .negative, .actions .deny, .actions .cancel",modal:".ui.modal"},error:{dimmer:"UI Dimmer, a required component is not included in this page",method:"The method you called is not defined.",notFound:"The element you specified could not be found"},className:{active:"active",animating:"animating",blurring:"blurring",inverted:"inverted",loading:"loading",scrolling:"scrolling",undetached:"undetached"}}}(jQuery,window,document),function(e,t,n,i){"use strict";t=void 0!==t&&t.Math==Math?t:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")(),e.fn.nag=function(n){var o,a=e(this),r=a.selector||"",s=(new Date).getTime(),l=[],c=arguments[0],u="string"==typeof c,d=[].slice.call(arguments,1);return a.each(function(){var a,f=e.isPlainObject(n)?e.extend(!0,{},e.fn.nag.settings,n):e.extend({},e.fn.nag.settings),m=(f.className,f.selector),g=f.error,p=f.namespace,h="."+p,v=p+"-module",b=e(this),y=(b.find(m.close),f.context?e(f.context):e("body")),x=this,C=b.data(v);t.requestAnimationFrame||t.mozRequestAnimationFrame||t.webkitRequestAnimationFrame||t.msRequestAnimationFrame;a={initialize:function(){a.verbose("Initializing element"),b.on("click"+h,m.close,a.dismiss).data(v,a),f.detachable&&b.parent()[0]!==y[0]&&b.detach().prependTo(y),f.displayTime>0&&setTimeout(a.hide,f.displayTime),a.show()},destroy:function(){a.verbose("Destroying instance"),b.removeData(v).off(h)},show:function(){a.should.show()&&!b.is(":visible")&&(a.debug("Showing nag",f.animation.show),"fade"==f.animation.show?b.fadeIn(f.duration,f.easing):b.slideDown(f.duration,f.easing))},hide:function(){a.debug("Showing nag",f.animation.hide),"fade"==f.animation.show?b.fadeIn(f.duration,f.easing):b.slideUp(f.duration,f.easing)},onHide:function(){a.debug("Removing nag",f.animation.hide),b.remove(),f.onHide&&f.onHide()},dismiss:function(e){f.storageMethod&&a.storage.set(f.key,f.value),a.hide(),e.stopImmediatePropagation(),e.preventDefault()},should:{show:function(){return f.persist?(a.debug("Persistent nag is set, can show nag"),!0):a.storage.get(f.key)!=f.value.toString()?(a.debug("Stored value is not set, can show nag",a.storage.get(f.key)),!0):(a.debug("Stored value is set, cannot show nag",a.storage.get(f.key)),!1)}},get:{storageOptions:function(){var e={};return f.expires&&(e.expires=f.expires),f.domain&&(e.domain=f.domain),f.path&&(e.path=f.path),e}},clear:function(){a.storage.remove(f.key)},storage:{set:function(n,o){var r=a.get.storageOptions();if("localstorage"==f.storageMethod&&t.localStorage!==i)t.localStorage.setItem(n,o),a.debug("Value stored using local storage",n,o);else if("sessionstorage"==f.storageMethod&&t.sessionStorage!==i)t.sessionStorage.setItem(n,o),a.debug("Value stored using session storage",n,o);else{if(e.cookie===i)return void a.error(g.noCookieStorage);e.cookie(n,o,r),a.debug("Value stored using cookie",n,o,r)}},get:function(n,o){var r;return"localstorage"==f.storageMethod&&t.localStorage!==i?r=t.localStorage.getItem(n):"sessionstorage"==f.storageMethod&&t.sessionStorage!==i?r=t.sessionStorage.getItem(n):e.cookie!==i?r=e.cookie(n):a.error(g.noCookieStorage),"undefined"!=r&&"null"!=r&&r!==i&&null!==r||(r=i),r},remove:function(n){var o=a.get.storageOptions();"localstorage"==f.storageMethod&&t.localStorage!==i?t.localStorage.removeItem(n):"sessionstorage"==f.storageMethod&&t.sessionStorage!==i?t.sessionStorage.removeItem(n):e.cookie!==i?e.removeCookie(n,o):a.error(g.noStorage)}},setting:function(t,n){if(a.debug("Changing setting",t,n),e.isPlainObject(t))e.extend(!0,f,t);else{if(n===i)return f[t];e.isPlainObject(f[t])?e.extend(!0,f[t],n):f[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,a,t);else{if(n===i)return a[t];a[t]=n}},debug:function(){!f.silent&&f.debug&&(f.performance?a.performance.log(arguments):(a.debug=Function.prototype.bind.call(console.info,console,f.name+":"),a.debug.apply(console,arguments)))},verbose:function(){!f.silent&&f.verbose&&f.debug&&(f.performance?a.performance.log(arguments):(a.verbose=Function.prototype.bind.call(console.info,console,f.name+":"),a.verbose.apply(console,arguments)))},error:function(){f.silent||(a.error=Function.prototype.bind.call(console.error,console,f.name+":"),a.error.apply(console,arguments))},performance:{log:function(e){var t,n;f.performance&&(n=(t=(new Date).getTime())-(s||t),s=t,l.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:x,"Execution Time":n})),clearTimeout(a.performance.timer),a.performance.timer=setTimeout(a.performance.display,500)},display:function(){var t=f.name+":",n=0;s=!1,clearTimeout(a.performance.timer),e.each(l,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",r&&(t+=" '"+r+"'"),(console.group!==i||console.table!==i)&&l.length>0&&(console.groupCollapsed(t),console.table?console.table(l):e.each(l,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),l=[]}},invoke:function(t,n,r){var s,l,c,u=C;return n=n||d,r=x||r,"string"==typeof t&&u!==i&&(t=t.split(/[\. ]/),s=t.length-1,e.each(t,function(n,o){var r=n!=s?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(u[r])&&n!=s)u=u[r];else{if(u[r]!==i)return l=u[r],!1;if(!e.isPlainObject(u[o])||n==s)return u[o]!==i?(l=u[o],!1):(a.error(g.method,t),!1);u=u[o]}})),e.isFunction(l)?c=l.apply(r,n):l!==i&&(c=l),e.isArray(o)?o.push(c):o!==i?o=[o,c]:c!==i&&(o=c),l}},u?(C===i&&a.initialize(),a.invoke(c)):(C!==i&&C.invoke("destroy"),a.initialize())}),o!==i?o:this},e.fn.nag.settings={name:"Nag",silent:!1,debug:!1,verbose:!1,performance:!0,namespace:"Nag",persist:!1,displayTime:0,animation:{show:"slide",hide:"slide"},context:!1,detachable:!1,expires:30,domain:!1,path:"/",storageMethod:"cookie",key:"nag",value:"dismiss",error:{noCookieStorage:"$.cookie is not included. A storage solution is required.",noStorage:"Neither $.cookie or store is defined. A storage solution is required for storing state",method:"The method you called is not defined."},className:{bottom:"bottom",fixed:"fixed"},selector:{close:".close.icon"},speed:500,easing:"easeOutQuad",onHide:function(){}},e.extend(e.easing,{easeOutQuad:function(e,t,n,i,o){return-i*(t/=o)*(t-2)+n}})}(jQuery,window,document),function(e,t,n,i){"use strict";t=void 0!==t&&t.Math==Math?t:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")(),e.fn.popup=function(o){var a,r=e(this),s=e(n),l=e(t),c=e("body"),u=r.selector||"",d=(new Date).getTime(),f=[],m=arguments[0],g="string"==typeof m,p=[].slice.call(arguments,1);return r.each(function(){var r,h,v,b,y,x,C=e.isPlainObject(o)?e.extend(!0,{},e.fn.popup.settings,o):e.extend({},e.fn.popup.settings),w=C.selector,S=C.className,k=C.error,T=C.metadata,A=C.namespace,R="."+C.namespace,P="module-"+A,E=e(this),F=e(C.context),O=e(C.scrollContext),D=e(C.boundary),q=C.target?e(C.target):E,j=0,z=!1,I=!1,M=this,L=E.data(P);x={initialize:function(){x.debug("Initializing",E),x.createID(),x.bind.events(),!x.exists()&&C.preserve&&x.create(),C.observeChanges&&x.observeChanges(),x.instantiate()},instantiate:function(){x.verbose("Storing instance",x),L=x,E.data(P,L)},observeChanges:function(){"MutationObserver"in t&&((v=new MutationObserver(x.event.documentChanged)).observe(n,{childList:!0,subtree:!0}),x.debug("Setting up mutation observer",v))},refresh:function(){C.popup?r=e(C.popup).eq(0):C.inline&&(r=q.nextAll(w.popup).eq(0),C.popup=r),C.popup?(r.addClass(S.loading),h=x.get.offsetParent(),r.removeClass(S.loading),C.movePopup&&x.has.popup()&&x.get.offsetParent(r)[0]!==h[0]&&(x.debug("Moving popup to the same offset parent as target"),r.detach().appendTo(h))):h=C.inline?x.get.offsetParent(q):x.has.popup()?x.get.offsetParent(r):c,h.is("html")&&h[0]!==c[0]&&(x.debug("Setting page as offset parent"),h=c),x.get.variation()&&x.set.variation()},reposition:function(){x.refresh(),x.set.position()},destroy:function(){x.debug("Destroying previous module"),v&&v.disconnect(),r&&!C.preserve&&x.removePopup(),clearTimeout(x.hideTimer),clearTimeout(x.showTimer),x.unbind.close(),x.unbind.events(),E.removeData(P)},event:{start:function(t){var n=e.isPlainObject(C.delay)?C.delay.show:C.delay;clearTimeout(x.hideTimer),I||(x.showTimer=setTimeout(x.show,n))},end:function(){var t=e.isPlainObject(C.delay)?C.delay.hide:C.delay;clearTimeout(x.showTimer),x.hideTimer=setTimeout(x.hide,t)},touchstart:function(e){I=!0,x.show()},resize:function(){x.is.visible()&&x.set.position()},documentChanged:function(t){[].forEach.call(t,function(t){t.removedNodes&&[].forEach.call(t.removedNodes,function(t){(t==M||e(t).find(M).length>0)&&(x.debug("Element removed from DOM, tearing down events"),x.destroy())})})},hideGracefully:function(t){var i=e(t.target),o=e.contains(n.documentElement,t.target),a=i.closest(w.popup).length>0;t&&!a&&o?(x.debug("Click occurred outside popup hiding popup"),x.hide()):x.debug("Click was inside popup, keeping popup open")}},create:function(){var t=x.get.html(),n=x.get.title(),i=x.get.content();t||i||n?(x.debug("Creating pop-up html"),t||(t=C.templates.popup({title:n,content:i})),r=e("<div/>").addClass(S.popup).data(T.activator,E).html(t),C.inline?(x.verbose("Inserting popup element inline",r),r.insertAfter(E)):(x.verbose("Appending popup element to body",r),r.appendTo(F)),x.refresh(),x.set.variation(),C.hoverable&&x.bind.popup(),C.onCreate.call(r,M)):0!==q.next(w.popup).length?(x.verbose("Pre-existing popup found"),C.inline=!0,C.popup=q.next(w.popup).data(T.activator,E),x.refresh(),C.hoverable&&x.bind.popup()):C.popup?(e(C.popup).data(T.activator,E),x.verbose("Used popup specified in settings"),x.refresh(),C.hoverable&&x.bind.popup()):x.debug("No content specified skipping display",M)},createID:function(){y=(Math.random().toString(16)+"000000000").substr(2,8),b="."+y,x.verbose("Creating unique id for element",y)},toggle:function(){x.debug("Toggling pop-up"),x.is.hidden()?(x.debug("Popup is hidden, showing pop-up"),x.unbind.close(),x.show()):(x.debug("Popup is visible, hiding pop-up"),x.hide())},show:function(e){if(e=e||function(){},x.debug("Showing pop-up",C.transition),x.is.hidden()&&(!x.is.active()||!x.is.dropdown())){if(x.exists()||x.create(),!1===C.onShow.call(r,M))return void x.debug("onShow callback returned false, cancelling popup animation");C.preserve||C.popup||x.refresh(),r&&x.set.position()&&(x.save.conditions(),C.exclusive&&x.hideAll(),x.animate.show(e))}},hide:function(e){if(e=e||function(){},x.is.visible()||x.is.animating()){if(!1===C.onHide.call(r,M))return void x.debug("onHide callback returned false, cancelling popup animation");x.remove.visible(),x.unbind.close(),x.restore.conditions(),x.animate.hide(e)}},hideAll:function(){e(w.popup).filter("."+S.popupVisible).each(function(){e(this).data(T.activator).popup("hide")})},exists:function(){return!!r&&(C.inline||C.popup?x.has.popup():r.closest(F).length>=1)},removePopup:function(){x.has.popup()&&!C.popup&&(x.debug("Removing popup",r),r.remove(),r=i,C.onRemove.call(r,M))},save:{conditions:function(){x.cache={title:E.attr("title")},x.cache.title&&E.removeAttr("title"),x.verbose("Saving original attributes",x.cache.title)}},restore:{conditions:function(){return x.cache&&x.cache.title&&(E.attr("title",x.cache.title),x.verbose("Restoring original attributes",x.cache.title)),!0}},supports:{svg:function(){return"undefined"==typeof SVGGraphicsElement}},animate:{show:function(t){t=e.isFunction(t)?t:function(){},C.transition&&e.fn.transition!==i&&E.transition("is supported")?(x.set.visible(),r.transition({animation:C.transition+" in",queue:!1,debug:C.debug,verbose:C.verbose,duration:C.duration,onComplete:function(){x.bind.close(),t.call(r,M),C.onVisible.call(r,M)}})):x.error(k.noTransition)},hide:function(t){t=e.isFunction(t)?t:function(){},x.debug("Hiding pop-up"),!1!==C.onHide.call(r,M)?C.transition&&e.fn.transition!==i&&E.transition("is supported")?r.transition({animation:C.transition+" out",queue:!1,duration:C.duration,debug:C.debug,verbose:C.verbose,onComplete:function(){x.reset(),t.call(r,M),C.onHidden.call(r,M)}}):x.error(k.noTransition):x.debug("onHide callback returned false, cancelling popup animation")}},change:{content:function(e){r.html(e)}},get:{html:function(){return E.removeData(T.html),E.data(T.html)||C.html},title:function(){return E.removeData(T.title),E.data(T.title)||C.title},content:function(){return E.removeData(T.content),E.data(T.content)||C.content||E.attr("title")},variation:function(){return E.removeData(T.variation),E.data(T.variation)||C.variation},popup:function(){return r},popupOffset:function(){return r.offset()},calculations:function(){var e,n=x.get.offsetParent(r),i=q[0],o=D[0]==t,a=C.inline||C.popup&&C.movePopup?q.position():q.offset(),s=o?{top:0,left:0}:D.offset(),c={},u=o?{top:l.scrollTop(),left:l.scrollLeft()}:{top:0,left:0};if(c={target:{element:q[0],width:q.outerWidth(),height:q.outerHeight(),top:a.top,left:a.left,margin:{}},popup:{width:r.outerWidth(),height:r.outerHeight()},parent:{width:h.outerWidth(),height:h.outerHeight()},screen:{top:s.top,left:s.left,scroll:{top:u.top,left:u.left},width:D.width(),height:D.height()}},n.get(0)!==h.get(0)){var d=n.offset();c.target.top-=d.top,c.target.left-=d.left,c.parent.width=n.outerWidth(),c.parent.height=n.outerHeight()}return C.setFluidWidth&&x.is.fluid()&&(c.container={width:r.parent().outerWidth()},c.popup.width=c.container.width),c.target.margin.top=C.inline?parseInt(t.getComputedStyle(i).getPropertyValue("margin-top"),10):0,c.target.margin.left=C.inline?x.is.rtl()?parseInt(t.getComputedStyle(i).getPropertyValue("margin-right"),10):parseInt(t.getComputedStyle(i).getPropertyValue("margin-left"),10):0,e=c.screen,c.boundary={top:e.top+e.scroll.top,bottom:e.top+e.scroll.top+e.height,left:e.left+e.scroll.left,right:e.left+e.scroll.left+e.width},c},id:function(){return y},startEvent:function(){return"hover"==C.on?"mouseenter":"focus"==C.on&&"focus"},scrollEvent:function(){return"scroll"},endEvent:function(){return"hover"==C.on?"mouseleave":"focus"==C.on&&"blur"},distanceFromBoundary:function(e,t){var n,i,o={};return n=(t=t||x.get.calculations()).popup,i=t.boundary,e&&(o={top:e.top-i.top,left:e.left-i.left,right:i.right-(e.left+n.width),bottom:i.bottom-(e.top+n.height)},x.verbose("Distance from boundaries determined",e,o)),o},offsetParent:function(t){var n=(t!==i?t[0]:q[0]).parentNode,o=e(n);if(n)for(var a="none"===o.css("transform"),r="static"===o.css("position"),s=o.is("body");n&&!s&&r&&a;)n=n.parentNode,a="none"===(o=e(n)).css("transform"),r="static"===o.css("position"),s=o.is("body");return o&&o.length>0?o:e()},positions:function(){return{"top left":!1,"top center":!1,"top right":!1,"bottom left":!1,"bottom center":!1,"bottom right":!1,"left center":!1,"right center":!1}},nextPosition:function(e){var t=e.split(" "),n=t[0],i=t[1],o="top"==n||"bottom"==n,a=!1,r=!1,s=!1;return z||(x.verbose("All available positions available"),z=x.get.positions()),x.debug("Recording last position tried",e),z[e]=!0,"opposite"===C.prefer&&(s=(s=[{top:"bottom",bottom:"top",left:"right",right:"left"}[n],i]).join(" "),a=!0===z[s],x.debug("Trying opposite strategy",s)),"adjacent"===C.prefer&&o&&(s=(s=[n,{left:"center",center:"right",right:"left"}[i]]).join(" "),r=!0===z[s],x.debug("Trying adjacent strategy",s)),(r||a)&&(x.debug("Using backup position",s),s={"top left":"top center","top center":"top right","top right":"right center","right center":"bottom right","bottom right":"bottom center","bottom center":"bottom left","bottom left":"left center","left center":"top left"}[e]),s}},set:{position:function(e,t){if(0!==q.length&&0!==r.length){var n,o,a,s,l,c,u,d;if(t=t||x.get.calculations(),e=e||E.data(T.position)||C.position,n=E.data(T.offset)||C.offset,o=C.distanceAway,a=t.target,s=t.popup,l=t.parent,x.should.centerArrow(t)&&(x.verbose("Adjusting offset to center arrow on small target element"),"top left"!=e&&"bottom left"!=e||(n+=a.width/2,n-=C.arrowPixelsFromEdge),"top right"!=e&&"bottom right"!=e||(n-=a.width/2,n+=C.arrowPixelsFromEdge)),0===a.width&&0===a.height&&!x.is.svg(a.element))return x.debug("Popup target is hidden, no action taken"),!1;switch(C.inline&&(x.debug("Adding margin to calculation",a.margin),"left center"==e||"right center"==e?(n+=a.margin.top,o+=-a.margin.left):"top left"==e||"top center"==e||"top right"==e?(n+=a.margin.left,o-=a.margin.top):(n+=a.margin.left,o+=a.margin.top)),x.debug("Determining popup position from calculations",e,t),x.is.rtl()&&(e=e.replace(/left|right/g,function(e){return"left"==e?"right":"left"}),x.debug("RTL: Popup position updated",e)),j==C.maxSearchDepth&&"string"==typeof C.lastResort&&(e=C.lastResort),e){case"top left":c={top:"auto",bottom:l.height-a.top+o,left:a.left+n,right:"auto"};break;case"top center":c={bottom:l.height-a.top+o,left:a.left+a.width/2-s.width/2+n,top:"auto",right:"auto"};break;case"top right":c={bottom:l.height-a.top+o,right:l.width-a.left-a.width-n,top:"auto",left:"auto"};break;case"left center":c={top:a.top+a.height/2-s.height/2+n,right:l.width-a.left+o,left:"auto",bottom:"auto"};break;case"right center":c={top:a.top+a.height/2-s.height/2+n,left:a.left+a.width+o,bottom:"auto",right:"auto"};break;case"bottom left":c={top:a.top+a.height+o,left:a.left+n,bottom:"auto",right:"auto"};break;case"bottom center":c={top:a.top+a.height+o,left:a.left+a.width/2-s.width/2+n,bottom:"auto",right:"auto"};break;case"bottom right":c={top:a.top+a.height+o,right:l.width-a.left-a.width-n,left:"auto",bottom:"auto"}}if(c===i&&x.error(k.invalidPosition,e),x.debug("Calculated popup positioning values",c),r.css(c).removeClass(S.position).addClass(e).addClass(S.loading),u=x.get.popupOffset(),d=x.get.distanceFromBoundary(u,t),x.is.offstage(d,e)){if(x.debug("Position is outside viewport",e),j<C.maxSearchDepth)return j++,e=x.get.nextPosition(e),x.debug("Trying new position",e),!!r&&x.set.position(e,t);if(!C.lastResort)return x.debug("Popup could not find a position to display",r),x.error(k.cannotPlace,M),x.remove.attempts(),x.remove.loading(),x.reset(),C.onUnplaceable.call(r,M),!1;x.debug("No position found, showing with last position")}return x.debug("Position is on stage",e),x.remove.attempts(),x.remove.loading(),C.setFluidWidth&&x.is.fluid()&&x.set.fluidWidth(t),!0}x.error(k.notFound)},fluidWidth:function(e){e=e||x.get.calculations(),x.debug("Automatically setting element width to parent width",e.parent.width),r.css("width",e.container.width)},variation:function(e){(e=e||x.get.variation())&&x.has.popup()&&(x.verbose("Adding variation to popup",e),r.addClass(e))},visible:function(){E.addClass(S.visible)}},remove:{loading:function(){r.removeClass(S.loading)},variation:function(e){(e=e||x.get.variation())&&(x.verbose("Removing variation",e),r.removeClass(e))},visible:function(){E.removeClass(S.visible)},attempts:function(){x.verbose("Resetting all searched positions"),j=0,z=!1}},bind:{events:function(){x.debug("Binding popup events to module"),"click"==C.on&&E.on("click"+R,x.toggle),"hover"==C.on&&E.on("touchstart"+R,x.event.touchstart),x.get.startEvent()&&E.on(x.get.startEvent()+R,x.event.start).on(x.get.endEvent()+R,x.event.end),C.target&&x.debug("Target set to element",q),l.on("resize"+b,x.event.resize)},popup:function(){x.verbose("Allowing hover events on popup to prevent closing"),r&&x.has.popup()&&r.on("mouseenter"+R,x.event.start).on("mouseleave"+R,x.event.end)},close:function(){(!0===C.hideOnScroll||"auto"==C.hideOnScroll&&"click"!=C.on)&&x.bind.closeOnScroll(),"hover"==C.on&&I&&x.bind.touchClose(),"click"==C.on&&C.closable&&x.bind.clickaway()},closeOnScroll:function(){x.verbose("Binding scroll close event to document"),O.one(x.get.scrollEvent()+b,x.event.hideGracefully)},touchClose:function(){x.verbose("Binding popup touchclose event to document"),s.on("touchstart"+b,function(e){x.verbose("Touched away from popup"),x.event.hideGracefully.call(M,e)})},clickaway:function(){x.verbose("Binding popup close event to document"),s.on("click"+b,function(e){x.verbose("Clicked away from popup"),x.event.hideGracefully.call(M,e)})}},unbind:{events:function(){l.off(b),E.off(R)},close:function(){s.off(b),O.off(b)}},has:{popup:function(){return r&&r.length>0}},should:{centerArrow:function(e){return!x.is.basic()&&e.target.width<=2*C.arrowPixelsFromEdge}},is:{offstage:function(t,n){var i=[];return e.each(t,function(e,t){t<-C.jitter&&(x.debug("Position exceeds allowable distance from edge",e,t,n),i.push(e))}),i.length>0},svg:function(e){return x.supports.svg()&&e instanceof SVGGraphicsElement},basic:function(){return E.hasClass(S.basic)},active:function(){return E.hasClass(S.active)},animating:function(){return r!==i&&r.hasClass(S.animating)},fluid:function(){return r!==i&&r.hasClass(S.fluid)},visible:function(){return r!==i&&r.hasClass(S.popupVisible)},dropdown:function(){return E.hasClass(S.dropdown)},hidden:function(){return!x.is.visible()},rtl:function(){return"rtl"==E.css("direction")}},reset:function(){x.remove.visible(),C.preserve?e.fn.transition!==i&&r.transition("remove transition"):x.removePopup()},setting:function(t,n){if(e.isPlainObject(t))e.extend(!0,C,t);else{if(n===i)return C[t];C[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,x,t);else{if(n===i)return x[t];x[t]=n}},debug:function(){!C.silent&&C.debug&&(C.performance?x.performance.log(arguments):(x.debug=Function.prototype.bind.call(console.info,console,C.name+":"),x.debug.apply(console,arguments)))},verbose:function(){!C.silent&&C.verbose&&C.debug&&(C.performance?x.performance.log(arguments):(x.verbose=Function.prototype.bind.call(console.info,console,C.name+":"),x.verbose.apply(console,arguments)))},error:function(){C.silent||(x.error=Function.prototype.bind.call(console.error,console,C.name+":"),x.error.apply(console,arguments))},performance:{log:function(e){var t,n;C.performance&&(n=(t=(new Date).getTime())-(d||t),d=t,f.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:M,"Execution Time":n})),clearTimeout(x.performance.timer),x.performance.timer=setTimeout(x.performance.display,500)},display:function(){var t=C.name+":",n=0;d=!1,clearTimeout(x.performance.timer),e.each(f,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",u&&(t+=" '"+u+"'"),(console.group!==i||console.table!==i)&&f.length>0&&(console.groupCollapsed(t),console.table?console.table(f):e.each(f,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),f=[]}},invoke:function(t,n,o){var r,s,l,c=L;return n=n||p,o=M||o,"string"==typeof t&&c!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(c[a])&&n!=r)c=c[a];else{if(c[a]!==i)return s=c[a],!1;if(!e.isPlainObject(c[o])||n==r)return c[o]!==i&&(s=c[o],!1);c=c[o]}})),e.isFunction(s)?l=s.apply(o,n):s!==i&&(l=s),e.isArray(a)?a.push(l):a!==i?a=[a,l]:l!==i&&(a=l),s}},g?(L===i&&x.initialize(),x.invoke(m)):(L!==i&&L.invoke("destroy"),x.initialize())}),a!==i?a:this},e.fn.popup.settings={name:"Popup",silent:!1,debug:!1,verbose:!1,performance:!0,namespace:"popup",observeChanges:!0,onCreate:function(){},onRemove:function(){},onShow:function(){},onVisible:function(){},onHide:function(){},onUnplaceable:function(){},onHidden:function(){},on:"hover",boundary:t,addTouchEvents:!0,position:"top left",variation:"",movePopup:!0,target:!1,popup:!1,inline:!1,preserve:!1,hoverable:!1,content:!1,html:!1,title:!1,closable:!0,hideOnScroll:"auto",exclusive:!1,context:"body",scrollContext:t,prefer:"opposite",lastResort:!1,arrowPixelsFromEdge:20,delay:{show:50,hide:70},setFluidWidth:!0,duration:200,transition:"scale",distanceAway:0,jitter:2,offset:0,maxSearchDepth:15,error:{invalidPosition:"The position you specified is not a valid position",cannotPlace:"Popup does not fit within the boundaries of the viewport",method:"The method you called is not defined.",noTransition:"This module requires ui transitions <https://github.com/Semantic-Org/UI-Transition>",notFound:"The target or popup you specified does not exist on the page"},metadata:{activator:"activator",content:"content",html:"html",offset:"offset",position:"position",title:"title",variation:"variation"},className:{active:"active",basic:"basic",animating:"animating",dropdown:"dropdown",fluid:"fluid",loading:"loading",popup:"ui popup",position:"top left center bottom right",visible:"visible",popupVisible:"visible"},selector:{popup:".ui.popup"},templates:{escape:function(e){var t={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"};return/[&<>"'`]/.test(e)?e.replace(/[&<>"'`]/g,function(e){return t[e]}):e},popup:function(t){var n="",o=e.fn.popup.settings.templates.escape;return typeof t!==i&&(typeof t.title!==i&&t.title&&(t.title=o(t.title),n+='<div class="header">'+t.title+"</div>"),typeof t.content!==i&&t.content&&(t.content=o(t.content),n+='<div class="content">'+t.content+"</div>")),n}}}}(jQuery,window,document),function(e,t,n,i){"use strict";void 0!==(t=void 0!==t&&t.Math==Math?t:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")())&&t.Math==Math||("undefined"!=typeof self&&self.Math==Math?self:Function("return this")());e.fn.progress=function(t){var o,a=e(this),r=a.selector||"",s=(new Date).getTime(),l=[],c=arguments[0],u="string"==typeof c,d=[].slice.call(arguments,1);return a.each(function(){var a,f=e.isPlainObject(t)?e.extend(!0,{},e.fn.progress.settings,t):e.extend({},e.fn.progress.settings),m=f.className,g=f.metadata,p=f.namespace,h=f.selector,v=f.error,b="."+p,y="module-"+p,x=e(this),C=e(this).find(h.bar),w=e(this).find(h.progress),S=e(this).find(h.label),k=this,T=x.data(y),A=!1;a={initialize:function(){a.debug("Initializing progress bar",f),a.set.duration(),a.set.transitionEvent(),a.read.metadata(),a.read.settings(),a.instantiate()},instantiate:function(){a.verbose("Storing instance of progress",a),T=a,x.data(y,a)},destroy:function(){a.verbose("Destroying previous progress for",x),clearInterval(T.interval),a.remove.state(),x.removeData(y),T=i},reset:function(){a.remove.nextValue(),a.update.progress(0)},complete:function(){(a.percent===i||a.percent<100)&&(a.remove.progressPoll(),a.set.percent(100))},read:{metadata:function(){var e={percent:x.data(g.percent),total:x.data(g.total),value:x.data(g.value)};e.percent&&(a.debug("Current percent value set from metadata",e.percent),a.set.percent(e.percent)),e.total&&(a.debug("Total value set from metadata",e.total),a.set.total(e.total)),e.value&&(a.debug("Current value set from metadata",e.value),a.set.value(e.value),a.set.progress(e.value))},settings:function(){!1!==f.total&&(a.debug("Current total set in settings",f.total),a.set.total(f.total)),!1!==f.value&&(a.debug("Current value set in settings",f.value),a.set.value(f.value),a.set.progress(a.value)),!1!==f.percent&&(a.debug("Current percent set in settings",f.percent),a.set.percent(f.percent))}},bind:{transitionEnd:function(e){var t=a.get.transitionEnd();C.one(t+b,function(t){clearTimeout(a.failSafeTimer),e.call(this,t)}),a.failSafeTimer=setTimeout(function(){C.triggerHandler(t)},f.duration+f.failSafeDelay),a.verbose("Adding fail safe timer",a.timer)}},increment:function(e){var t,n;a.has.total()?n=(t=a.get.value())+(e=e||1):(n=(t=a.get.percent())+(e=e||a.get.randomValue()),100,a.debug("Incrementing percentage by",t,n)),n=a.get.normalizedValue(n),a.set.progress(n)},decrement:function(e){var t,n;a.get.total()?(n=(t=a.get.value())-(e=e||1),a.debug("Decrementing value by",e,t)):(n=(t=a.get.percent())-(e=e||a.get.randomValue()),a.debug("Decrementing percentage by",e,t)),n=a.get.normalizedValue(n),a.set.progress(n)},has:{progressPoll:function(){return a.progressPoll},total:function(){return!1!==a.get.total()}},get:{text:function(e){var t=a.value||0,n=a.total||0,i=A?a.get.displayPercent():a.percent||0,o=a.total>0?n-t:100-i;return e=(e=e||"").replace("{value}",t).replace("{total}",n).replace("{left}",o).replace("{percent}",i),a.verbose("Adding variables to progress bar text",e),e},normalizedValue:function(e){if(e<0)return a.debug("Value cannot decrement below 0"),0;if(a.has.total()){if(e>a.total)return a.debug("Value cannot increment above total",a.total),a.total}else if(e>100)return a.debug("Value cannot increment above 100 percent"),100;return e},updateInterval:function(){return"auto"==f.updateInterval?f.duration:f.updateInterval},randomValue:function(){return a.debug("Generating random increment percentage"),Math.floor(Math.random()*f.random.max+f.random.min)},numericValue:function(e){return"string"==typeof e?""!==e.replace(/[^\d.]/g,"")&&+e.replace(/[^\d.]/g,""):e},transitionEnd:function(){var e,t=n.createElement("element"),o={transition:"transitionend",OTransition:"oTransitionEnd",MozTransition:"transitionend",WebkitTransition:"webkitTransitionEnd"};for(e in o)if(t.style[e]!==i)return o[e]},displayPercent:function(){var e=C.width(),t=x.width(),n=e>parseInt(C.css("min-width"),10)?e/t*100:a.percent;return f.precision>0?Math.round(n*(10*f.precision))/(10*f.precision):Math.round(n)},percent:function(){return a.percent||0},value:function(){return a.nextValue||a.value||0},total:function(){return a.total||!1}},create:{progressPoll:function(){a.progressPoll=setTimeout(function(){a.update.toNextValue(),a.remove.progressPoll()},a.get.updateInterval())}},is:{complete:function(){return a.is.success()||a.is.warning()||a.is.error()},success:function(){return x.hasClass(m.success)},warning:function(){return x.hasClass(m.warning)},error:function(){return x.hasClass(m.error)},active:function(){return x.hasClass(m.active)},visible:function(){return x.is(":visible")}},remove:{progressPoll:function(){a.verbose("Removing progress poll timer"),a.progressPoll&&(clearTimeout(a.progressPoll),delete a.progressPoll)},nextValue:function(){a.verbose("Removing progress value stored for next update"),delete a.nextValue},state:function(){a.verbose("Removing stored state"),delete a.total,delete a.percent,delete a.value},active:function(){a.verbose("Removing active state"),x.removeClass(m.active)},success:function(){a.verbose("Removing success state"),x.removeClass(m.success)},warning:function(){a.verbose("Removing warning state"),x.removeClass(m.warning)},error:function(){a.verbose("Removing error state"),x.removeClass(m.error)}},set:{barWidth:function(e){e>100?a.error(v.tooHigh,e):e<0?a.error(v.tooLow,e):(C.css("width",e+"%"),x.attr("data-percent",parseInt(e,10)))},duration:function(e){e="number"==typeof(e=e||f.duration)?e+"ms":e,a.verbose("Setting progress bar transition duration",e),C.css({"transition-duration":e})},percent:function(e){e="string"==typeof e?+e.replace("%",""):e,e=f.precision>0?Math.round(e*(10*f.precision))/(10*f.precision):Math.round(e),a.percent=e,a.has.total()||(a.value=f.precision>0?Math.round(e/100*a.total*(10*f.precision))/(10*f.precision):Math.round(e/100*a.total*10)/10,f.limitValues&&(a.value=a.value>100?100:a.value<0?0:a.value)),a.set.barWidth(e),a.set.labelInterval(),a.set.labels(),f.onChange.call(k,e,a.value,a.total)},labelInterval:function(){clearInterval(a.interval),a.bind.transitionEnd(function(){a.verbose("Bar finished animating, removing continuous label updates"),clearInterval(a.interval),A=!1,a.set.labels()}),A=!0,a.interval=setInterval(function(){e.contains(n.documentElement,k)||(clearInterval(a.interval),A=!1),a.set.labels()},f.framerate)},labels:function(){a.verbose("Setting both bar progress and outer label text"),a.set.barLabel(),a.set.state()},label:function(e){(e=e||"")&&(e=a.get.text(e),a.verbose("Setting label to text",e),S.text(e))},state:function(e){100===(e=e!==i?e:a.percent)?f.autoSuccess&&!(a.is.warning()||a.is.error()||a.is.success())?(a.set.success(),a.debug("Automatically triggering success at 100%")):(a.verbose("Reached 100% removing active state"),a.remove.active(),a.remove.progressPoll()):e>0?(a.verbose("Adjusting active progress bar label",e),a.set.active()):(a.remove.active(),a.set.label(f.text.active))},barLabel:function(e){e!==i?w.text(a.get.text(e)):"ratio"==f.label&&a.total?(a.verbose("Adding ratio to bar label"),w.text(a.get.text(f.text.ratio))):"percent"==f.label&&(a.verbose("Adding percentage to bar label"),w.text(a.get.text(f.text.percent)))},active:function(e){e=e||f.text.active,a.debug("Setting active state"),f.showActivity&&!a.is.active()&&x.addClass(m.active),a.remove.warning(),a.remove.error(),a.remove.success(),(e=f.onLabelUpdate("active",e,a.value,a.total))&&a.set.label(e),a.bind.transitionEnd(function(){f.onActive.call(k,a.value,a.total)})},success:function(e){e=e||f.text.success||f.text.active,a.debug("Setting success state"),x.addClass(m.success),a.remove.active(),a.remove.warning(),a.remove.error(),a.complete(),f.text.success?(e=f.onLabelUpdate("success",e,a.value,a.total),a.set.label(e)):(e=f.onLabelUpdate("active",e,a.value,a.total),a.set.label(e)),a.bind.transitionEnd(function(){f.onSuccess.call(k,a.total)})},warning:function(e){e=e||f.text.warning,a.debug("Setting warning state"),x.addClass(m.warning),a.remove.active(),a.remove.success(),a.remove.error(),a.complete(),(e=f.onLabelUpdate("warning",e,a.value,a.total))&&a.set.label(e),a.bind.transitionEnd(function(){f.onWarning.call(k,a.value,a.total)})},error:function(e){e=e||f.text.error,a.debug("Setting error state"),x.addClass(m.error),a.remove.active(),a.remove.success(),a.remove.warning(),a.complete(),(e=f.onLabelUpdate("error",e,a.value,a.total))&&a.set.label(e),a.bind.transitionEnd(function(){f.onError.call(k,a.value,a.total)})},transitionEvent:function(){a.get.transitionEnd()},total:function(e){a.total=e},value:function(e){a.value=e},progress:function(e){a.has.progressPoll()?(a.debug("Updated within interval, setting next update to use new value",e),a.set.nextValue(e)):(a.debug("First update in progress update interval, immediately updating",e),a.update.progress(e),a.create.progressPoll())},nextValue:function(e){a.nextValue=e}},update:{toNextValue:function(){var e=a.nextValue;e&&(a.debug("Update interval complete using last updated value",e),a.update.progress(e),a.remove.nextValue())},progress:function(e){var t;!1===(e=a.get.numericValue(e))&&a.error(v.nonNumeric,e),e=a.get.normalizedValue(e),a.has.total()?(a.set.value(e),t=e/a.total*100,a.debug("Calculating percent complete from total",t),a.set.percent(t)):(t=e,a.debug("Setting value to exact percentage value",t),a.set.percent(t))}},setting:function(t,n){if(a.debug("Changing setting",t,n),e.isPlainObject(t))e.extend(!0,f,t);else{if(n===i)return f[t];e.isPlainObject(f[t])?e.extend(!0,f[t],n):f[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,a,t);else{if(n===i)return a[t];a[t]=n}},debug:function(){!f.silent&&f.debug&&(f.performance?a.performance.log(arguments):(a.debug=Function.prototype.bind.call(console.info,console,f.name+":"),a.debug.apply(console,arguments)))},verbose:function(){!f.silent&&f.verbose&&f.debug&&(f.performance?a.performance.log(arguments):(a.verbose=Function.prototype.bind.call(console.info,console,f.name+":"),a.verbose.apply(console,arguments)))},error:function(){f.silent||(a.error=Function.prototype.bind.call(console.error,console,f.name+":"),a.error.apply(console,arguments))},performance:{log:function(e){var t,n;f.performance&&(n=(t=(new Date).getTime())-(s||t),s=t,l.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:k,"Execution Time":n})),clearTimeout(a.performance.timer),a.performance.timer=setTimeout(a.performance.display,500)},display:function(){var t=f.name+":",n=0;s=!1,clearTimeout(a.performance.timer),e.each(l,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",r&&(t+=" '"+r+"'"),(console.group!==i||console.table!==i)&&l.length>0&&(console.groupCollapsed(t),console.table?console.table(l):e.each(l,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),l=[]}},invoke:function(t,n,r){var s,l,c,u=T;return n=n||d,r=k||r,"string"==typeof t&&u!==i&&(t=t.split(/[\. ]/),s=t.length-1,e.each(t,function(n,o){var r=n!=s?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(u[r])&&n!=s)u=u[r];else{if(u[r]!==i)return l=u[r],!1;if(!e.isPlainObject(u[o])||n==s)return u[o]!==i?(l=u[o],!1):(a.error(v.method,t),!1);u=u[o]}})),e.isFunction(l)?c=l.apply(r,n):l!==i&&(c=l),e.isArray(o)?o.push(c):o!==i?o=[o,c]:c!==i&&(o=c),l}},u?(T===i&&a.initialize(),a.invoke(c)):(T!==i&&T.invoke("destroy"),a.initialize())}),o!==i?o:this},e.fn.progress.settings={name:"Progress",namespace:"progress",silent:!1,debug:!1,verbose:!1,performance:!0,random:{min:2,max:5},duration:300,updateInterval:"auto",autoSuccess:!0,showActivity:!0,limitValues:!0,label:"percent",precision:0,framerate:1e3/30,percent:!1,total:!1,value:!1,failSafeDelay:100,onLabelUpdate:function(e,t,n,i){return t},onChange:function(e,t,n){},onSuccess:function(e){},onActive:function(e,t){},onError:function(e,t){},onWarning:function(e,t){},error:{method:"The method you called is not defined.",nonNumeric:"Progress value is non numeric",tooHigh:"Value specified is above 100%",tooLow:"Value specified is below 0%"},regExp:{variable:/\{\$*[A-z0-9]+\}/g},metadata:{percent:"percent",total:"total",value:"value"},selector:{bar:"> .bar",label:"> .label",progress:".bar > .progress"},text:{active:!1,error:!1,success:!1,warning:!1,percent:"{percent}%",ratio:"{value} of {total}"},className:{active:"active",error:"error",success:"success",warning:"warning"}}}(jQuery,window,document),function(e,t,n,i){"use strict";t=void 0!==t&&t.Math==Math?t:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")(),e.fn.rating=function(t){var n,o=e(this),a=o.selector||"",r=(new Date).getTime(),s=[],l=arguments[0],c="string"==typeof l,u=[].slice.call(arguments,1);return o.each(function(){var d,f,m=e.isPlainObject(t)?e.extend(!0,{},e.fn.rating.settings,t):e.extend({},e.fn.rating.settings),g=m.namespace,p=m.className,h=m.metadata,v=m.selector,b=(m.error,"."+g),y="module-"+g,x=this,C=e(this).data(y),w=e(this),S=w.find(v.icon);f={initialize:function(){f.verbose("Initializing rating module",m),0===S.length&&f.setup.layout(),m.interactive?f.enable():f.disable(),f.set.initialLoad(),f.set.rating(f.get.initialRating()),f.remove.initialLoad(),f.instantiate()},instantiate:function(){f.verbose("Instantiating module",m),C=f,w.data(y,f)},destroy:function(){f.verbose("Destroying previous instance",C),f.remove.events(),w.removeData(y)},refresh:function(){S=w.find(v.icon)},setup:{layout:function(){var t=f.get.maxRating(),n=e.fn.rating.settings.templates.icon(t);f.debug("Generating icon html dynamically"),w.html(n),f.refresh()}},event:{mouseenter:function(){var t=e(this);t.nextAll().removeClass(p.selected),w.addClass(p.selected),t.addClass(p.selected).prevAll().addClass(p.selected)},mouseleave:function(){w.removeClass(p.selected),S.removeClass(p.selected)},click:function(){var t=e(this),n=f.get.rating(),i=S.index(t)+1;("auto"==m.clearable?1===S.length:m.clearable)&&n==i?f.clearRating():f.set.rating(i)}},clearRating:function(){f.debug("Clearing current rating"),f.set.rating(0)},bind:{events:function(){f.verbose("Binding events"),w.on("mouseenter"+b,v.icon,f.event.mouseenter).on("mouseleave"+b,v.icon,f.event.mouseleave).on("click"+b,v.icon,f.event.click)}},remove:{events:function(){f.verbose("Removing events"),w.off(b)},initialLoad:function(){d=!1}},enable:function(){f.debug("Setting rating to interactive mode"),f.bind.events(),w.removeClass(p.disabled)},disable:function(){f.debug("Setting rating to read-only mode"),f.remove.events(),w.addClass(p.disabled)},is:{initialLoad:function(){return d}},get:{initialRating:function(){return w.data(h.rating)!==i?(w.removeData(h.rating),w.data(h.rating)):m.initialRating},maxRating:function(){return w.data(h.maxRating)!==i?(w.removeData(h.maxRating),w.data(h.maxRating)):m.maxRating},rating:function(){var e=S.filter("."+p.active).length;return f.verbose("Current rating retrieved",e),e}},set:{rating:function(e){var t=e-1>=0?e-1:0,n=S.eq(t);w.removeClass(p.selected),S.removeClass(p.selected).removeClass(p.active),e>0&&(f.verbose("Setting current rating to",e),n.prevAll().addBack().addClass(p.active)),f.is.initialLoad()||m.onRate.call(x,e)},initialLoad:function(){d=!0}},setting:function(t,n){if(f.debug("Changing setting",t,n),e.isPlainObject(t))e.extend(!0,m,t);else{if(n===i)return m[t];e.isPlainObject(m[t])?e.extend(!0,m[t],n):m[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,f,t);else{if(n===i)return f[t];f[t]=n}},debug:function(){!m.silent&&m.debug&&(m.performance?f.performance.log(arguments):(f.debug=Function.prototype.bind.call(console.info,console,m.name+":"),f.debug.apply(console,arguments)))},verbose:function(){!m.silent&&m.verbose&&m.debug&&(m.performance?f.performance.log(arguments):(f.verbose=Function.prototype.bind.call(console.info,console,m.name+":"),f.verbose.apply(console,arguments)))},error:function(){m.silent||(f.error=Function.prototype.bind.call(console.error,console,m.name+":"),f.error.apply(console,arguments))},performance:{log:function(e){var t,n;m.performance&&(n=(t=(new Date).getTime())-(r||t),r=t,s.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:x,"Execution Time":n})),clearTimeout(f.performance.timer),f.performance.timer=setTimeout(f.performance.display,500)},display:function(){var t=m.name+":",n=0;r=!1,clearTimeout(f.performance.timer),e.each(s,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",a&&(t+=" '"+a+"'"),o.length>1&&(t+=" ("+o.length+")"),(console.group!==i||console.table!==i)&&s.length>0&&(console.groupCollapsed(t),console.table?console.table(s):e.each(s,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),s=[]}},invoke:function(t,o,a){var r,s,l,c=C;return o=o||u,a=x||a,"string"==typeof t&&c!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(c[a])&&n!=r)c=c[a];else{if(c[a]!==i)return s=c[a],!1;if(!e.isPlainObject(c[o])||n==r)return c[o]!==i&&(s=c[o],!1);c=c[o]}})),e.isFunction(s)?l=s.apply(a,o):s!==i&&(l=s),e.isArray(n)?n.push(l):n!==i?n=[n,l]:l!==i&&(n=l),s}},c?(C===i&&f.initialize(),f.invoke(l)):(C!==i&&C.invoke("destroy"),f.initialize())}),n!==i?n:this},e.fn.rating.settings={name:"Rating",namespace:"rating",slent:!1,debug:!1,verbose:!1,performance:!0,initialRating:0,interactive:!0,maxRating:4,clearable:"auto",fireOnInit:!1,onRate:function(e){},error:{method:"The method you called is not defined",noMaximum:"No maximum rating specified. Cannot generate HTML automatically"},metadata:{rating:"rating",maxRating:"maxRating"},className:{active:"active",disabled:"disabled",selected:"selected",loading:"loading"},selector:{icon:".icon"},templates:{icon:function(e){for(var t=1,n="";t<=e;)n+='<i class="icon"></i>',t++;return n}}}}(jQuery,window,document),function(e,t,n,i){"use strict";t=void 0!==t&&t.Math==Math?t:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")(),e.fn.search=function(o){var a,r=e(this),s=r.selector||"",l=(new Date).getTime(),c=[],u=arguments[0],d="string"==typeof u,f=[].slice.call(arguments,1);return e(this).each(function(){var m,g=e.isPlainObject(o)?e.extend(!0,{},e.fn.search.settings,o):e.extend({},e.fn.search.settings),p=g.className,h=g.metadata,v=g.regExp,b=g.fields,y=g.selector,x=g.error,C=g.namespace,w="."+C,S=C+"-module",k=e(this),T=k.find(y.prompt),A=k.find(y.searchButton),R=k.find(y.results),P=k.find(y.result),E=(k.find(y.category),this),F=k.data(S),O=!1,D=!1;m={initialize:function(){m.verbose("Initializing module"),m.get.settings(),m.determine.searchFields(),m.bind.events(),m.set.type(),m.create.results(),m.instantiate()},instantiate:function(){m.verbose("Storing instance of module",m),F=m,k.data(S,m)},destroy:function(){m.verbose("Destroying instance"),k.off(w).removeData(S)},refresh:function(){m.debug("Refreshing selector cache"),T=k.find(y.prompt),A=k.find(y.searchButton),k.find(y.category),R=k.find(y.results),P=k.find(y.result)},refreshResults:function(){R=k.find(y.results),P=k.find(y.result)},bind:{events:function(){m.verbose("Binding events to search"),g.automatic&&(k.on(m.get.inputEvent()+w,y.prompt,m.event.input),T.attr("autocomplete","off")),k.on("focus"+w,y.prompt,m.event.focus).on("blur"+w,y.prompt,m.event.blur).on("keydown"+w,y.prompt,m.handleKeyboard).on("click"+w,y.searchButton,m.query).on("mousedown"+w,y.results,m.event.result.mousedown).on("mouseup"+w,y.results,m.event.result.mouseup).on("click"+w,y.result,m.event.result.click)}},determine:{searchFields:function(){o&&o.searchFields!==i&&(g.searchFields=o.searchFields)}},event:{input:function(){g.searchDelay?(clearTimeout(m.timer),m.timer=setTimeout(function(){m.is.focused()&&m.query()},g.searchDelay)):m.query()},focus:function(){m.set.focus(),g.searchOnFocus&&m.has.minimumCharacters()&&m.query(function(){m.can.show()&&m.showResults()})},blur:function(e){var t=function(){m.cancel.query(),m.remove.focus(),m.timer=setTimeout(m.hideResults,g.hideDelay)};n.activeElement===this||(D=!1,m.resultsClicked?(m.debug("Determining if user action caused search to close"),k.one("click.close"+w,y.results,function(e){m.is.inMessage(e)||O?T.focus():(O=!1,m.is.animating()||m.is.hidden()||t())})):(m.debug("Input blurred without user action, closing results"),t()))},result:{mousedown:function(){m.resultsClicked=!0},mouseup:function(){m.resultsClicked=!1},click:function(n){m.debug("Search result selected");var i=e(this),o=i.find(y.title).eq(0),a=i.is("a[href]")?i:i.find("a[href]").eq(0),r=a.attr("href")||!1,s=a.attr("target")||!1,l=(o.html(),o.length>0&&o.text()),c=m.get.results(),u=i.data(h.result)||m.get.result(l,c);if(e.isFunction(g.onSelect)&&!1===g.onSelect.call(E,u,c))return m.debug("Custom onSelect callback cancelled default select action"),void(O=!0);m.hideResults(),l&&m.set.value(l),r&&(m.verbose("Opening search link found in result",a),"_blank"==s||n.ctrlKey?t.open(r):t.location.href=r)}}},handleKeyboard:function(e){var t,n=k.find(y.result),i=k.find(y.category),o=n.filter("."+p.active),a=n.index(o),r=n.length,s=o.length>0,l=e.which,c=13,u=38,d=40;if(l==27&&(m.verbose("Escape key pressed, blurring search field"),m.hideResults(),D=!0),m.is.visible())if(l==c){if(m.verbose("Enter key pressed, selecting active result"),n.filter("."+p.active).length>0)return m.event.result.click.call(n.filter("."+p.active),e),e.preventDefault(),!1}else l==u&&s?(m.verbose("Up key pressed, changing active result"),t=a-1<0?a:a-1,i.removeClass(p.active),n.removeClass(p.active).eq(t).addClass(p.active).closest(i).addClass(p.active),e.preventDefault()):l==d&&(m.verbose("Down key pressed, changing active result"),t=a+1>=r?a:a+1,i.removeClass(p.active),n.removeClass(p.active).eq(t).addClass(p.active).closest(i).addClass(p.active),e.preventDefault());else l==c&&(m.verbose("Enter key pressed, executing query"),m.query(),m.set.buttonPressed(),T.one("keyup",m.remove.buttonFocus))},setup:{api:function(t,n){var i={debug:g.debug,on:!1,cache:!0,action:"search",urlData:{query:t},onSuccess:function(e){m.parse.response.call(E,e,t),n()},onFailure:function(){m.displayMessage(x.serverError),n()},onAbort:function(e){},onError:m.error};e.extend(!0,i,g.apiSettings),m.verbose("Setting up API request",i),k.api(i)}},can:{useAPI:function(){return e.fn.api!==i},show:function(){return m.is.focused()&&!m.is.visible()&&!m.is.empty()},transition:function(){return g.transition&&e.fn.transition!==i&&k.transition("is supported")}},is:{animating:function(){return R.hasClass(p.animating)},hidden:function(){return R.hasClass(p.hidden)},inMessage:function(t){if(t.target){var i=e(t.target);return e.contains(n.documentElement,t.target)&&i.closest(y.message).length>0}},empty:function(){return""===R.html()},visible:function(){return R.filter(":visible").length>0},focused:function(){return T.filter(":focus").length>0}},get:{settings:function(){e.isPlainObject(o)&&o.searchFullText&&(g.fullTextSearch=o.searchFullText,m.error(g.error.oldSearchSyntax,E))},inputEvent:function(){var e=T[0];return e!==i&&e.oninput!==i?"input":e!==i&&e.onpropertychange!==i?"propertychange":"keyup"},value:function(){return T.val()},results:function(){return k.data(h.results)},result:function(t,n){var o=["title","id"],a=!1;return t=t!==i?t:m.get.value(),n=n!==i?n:m.get.results(),"category"===g.type?(m.debug("Finding result that matches",t),e.each(n,function(n,i){if(e.isArray(i.results)&&(a=m.search.object(t,i.results,o)[0]))return!1})):(m.debug("Finding result in results object",t),a=m.search.object(t,n,o)[0]),a||!1}},select:{firstResult:function(){m.verbose("Selecting first result"),P.first().addClass(p.active)}},set:{focus:function(){k.addClass(p.focus)},loading:function(){k.addClass(p.loading)},value:function(e){m.verbose("Setting search input value",e),T.val(e)},type:function(e){e=e||g.type,"category"==g.type&&k.addClass(g.type)},buttonPressed:function(){A.addClass(p.pressed)}},remove:{loading:function(){k.removeClass(p.loading)},focus:function(){k.removeClass(p.focus)},buttonPressed:function(){A.removeClass(p.pressed)}},query:function(t){t=e.isFunction(t)?t:function(){};var n=m.get.value(),i=m.read.cache(n);t=t||function(){},m.has.minimumCharacters()?(i?(m.debug("Reading result from cache",n),m.save.results(i.results),m.addResults(i.html),m.inject.id(i.results),t()):(m.debug("Querying for",n),e.isPlainObject(g.source)||e.isArray(g.source)?(m.search.local(n),t()):m.can.useAPI()?m.search.remote(n,t):(m.error(x.source),t())),g.onSearchQuery.call(E,n)):m.hideResults()},search:{local:function(e){var t,n=m.search.object(e,g.content);m.set.loading(),m.save.results(n),m.debug("Returned full local search results",n),g.maxResults>0&&(m.debug("Using specified max results",n),n=n.slice(0,g.maxResults)),"category"==g.type&&(n=m.create.categoryResults(n)),t=m.generateResults({results:n}),m.remove.loading(),m.addResults(t),m.inject.id(n),m.write.cache(e,{html:t,results:n})},remote:function(t,n){n=e.isFunction(n)?n:function(){},k.api("is loading")&&k.api("abort"),m.setup.api(t,n),k.api("query")},object:function(t,n,o){var a=[],r=[],s=[],l=t.toString().replace(v.escape,"\\$&"),c=new RegExp(v.beginsWith+l,"i"),u=function(t,n){var i=-1==e.inArray(n,a),o=-1==e.inArray(n,s),l=-1==e.inArray(n,r);i&&o&&l&&t.push(n)};return n=n||g.source,o=o!==i?o:g.searchFields,e.isArray(o)||(o=[o]),n===i||!1===n?(m.error(x.source),[]):(e.each(o,function(i,o){e.each(n,function(e,n){"string"==typeof n[o]&&(-1!==n[o].search(c)?u(a,n):"exact"===g.fullTextSearch&&m.exactSearch(t,n[o])?u(r,n):1==g.fullTextSearch&&m.fuzzySearch(t,n[o])&&u(s,n))})}),e.merge(r,s),e.merge(a,r),a)}},exactSearch:function(e,t){return e=e.toLowerCase(),(t=t.toLowerCase()).indexOf(e)>-1},fuzzySearch:function(e,t){var n=t.length,i=e.length;if("string"!=typeof e)return!1;if(e=e.toLowerCase(),t=t.toLowerCase(),i>n)return!1;if(i===n)return e===t;e:for(var o=0,a=0;o<i;o++){for(var r=e.charCodeAt(o);a<n;)if(t.charCodeAt(a++)===r)continue e;return!1}return!0},parse:{response:function(e,t){var n=m.generateResults(e);m.verbose("Parsing server response",e),e!==i&&t!==i&&e[b.results]!==i&&(m.addResults(n),m.inject.id(e[b.results]),m.write.cache(t,{html:n,results:e[b.results]}),m.save.results(e[b.results]))}},cancel:{query:function(){m.can.useAPI()&&k.api("abort")}},has:{minimumCharacters:function(){return m.get.value().length>=g.minCharacters},results:function(){return 0!==R.length&&""!=R.html()}},clear:{cache:function(e){var t=k.data(h.cache);e?e&&t&&t[e]&&(m.debug("Removing value from cache",e),delete t[e],k.data(h.cache,t)):(m.debug("Clearing cache",e),k.removeData(h.cache))}},read:{cache:function(e){var t=k.data(h.cache);return!!g.cache&&(m.verbose("Checking cache for generated html for query",e),"object"==typeof t&&t[e]!==i&&t[e])}},create:{categoryResults:function(t){var n={};return e.each(t,function(e,t){t.category&&(n[t.category]===i?(m.verbose("Creating new category of results",t.category),n[t.category]={name:t.category,results:[t]}):n[t.category].results.push(t))}),n},id:function(e,t){var n,o=e+1;return t!==i?(n=String.fromCharCode(97+t)+o,m.verbose("Creating category result id",n)):(n=o,m.verbose("Creating result id",n)),n},results:function(){0===R.length&&(R=e("<div />").addClass(p.results).appendTo(k))}},inject:{result:function(e,t,n){m.verbose("Injecting result into results");var o=n!==i?R.children().eq(n).children(y.results).first().children(y.result).eq(t):R.children(y.result).eq(t);m.verbose("Injecting results metadata",o),o.data(h.result,e)},id:function(t){m.debug("Injecting unique ids into results");var n=0,o=0;return"category"===g.type?e.each(t,function(t,a){o=0,e.each(a.results,function(e,t){var r=a.results[e];r.id===i&&(r.id=m.create.id(o,n)),m.inject.result(r,o,n),o++}),n++}):e.each(t,function(e,n){var a=t[e];a.id===i&&(a.id=m.create.id(o)),m.inject.result(a,o),o++}),t}},save:{results:function(e){m.verbose("Saving current search results to metadata",e),k.data(h.results,e)}},write:{cache:function(e,t){var n=k.data(h.cache)!==i?k.data(h.cache):{};g.cache&&(m.verbose("Writing generated html to cache",e,t),n[e]=t,k.data(h.cache,n))}},addResults:function(t){if(e.isFunction(g.onResultsAdd)&&!1===g.onResultsAdd.call(R,t))return m.debug("onResultsAdd callback cancelled default action"),!1;t?(R.html(t),m.refreshResults(),g.selectFirstResult&&m.select.firstResult(),m.showResults()):m.hideResults(function(){R.empty()})},showResults:function(t){t=e.isFunction(t)?t:function(){},D||!m.is.visible()&&m.has.results()&&(m.can.transition()?(m.debug("Showing results with css animations"),R.transition({animation:g.transition+" in",debug:g.debug,verbose:g.verbose,duration:g.duration,onComplete:function(){t()},queue:!0})):(m.debug("Showing results with javascript"),R.stop().fadeIn(g.duration,g.easing)),g.onResultsOpen.call(R))},hideResults:function(t){t=e.isFunction(t)?t:function(){},m.is.visible()&&(m.can.transition()?(m.debug("Hiding results with css animations"),R.transition({animation:g.transition+" out",debug:g.debug,verbose:g.verbose,duration:g.duration,onComplete:function(){t()},queue:!0})):(m.debug("Hiding results with javascript"),R.stop().fadeOut(g.duration,g.easing)),g.onResultsClose.call(R))},generateResults:function(t){m.debug("Generating html from response",t);var n=g.templates[g.type],i=e.isPlainObject(t[b.results])&&!e.isEmptyObject(t[b.results]),o=e.isArray(t[b.results])&&t[b.results].length>0,a="";return i||o?(g.maxResults>0&&(i?"standard"==g.type&&m.error(x.maxResults):t[b.results]=t[b.results].slice(0,g.maxResults)),e.isFunction(n)?a=n(t,b):m.error(x.noTemplate,!1)):g.showNoResults&&(a=m.displayMessage(x.noResults,"empty")),g.onResults.call(E,t),a},displayMessage:function(e,t){return t=t||"standard",m.debug("Displaying message",e,t),m.addResults(g.templates.message(e,t)),g.templates.message(e,t)},setting:function(t,n){if(e.isPlainObject(t))e.extend(!0,g,t);else{if(n===i)return g[t];g[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,m,t);else{if(n===i)return m[t];m[t]=n}},debug:function(){!g.silent&&g.debug&&(g.performance?m.performance.log(arguments):(m.debug=Function.prototype.bind.call(console.info,console,g.name+":"),m.debug.apply(console,arguments)))},verbose:function(){!g.silent&&g.verbose&&g.debug&&(g.performance?m.performance.log(arguments):(m.verbose=Function.prototype.bind.call(console.info,console,g.name+":"),m.verbose.apply(console,arguments)))},error:function(){g.silent||(m.error=Function.prototype.bind.call(console.error,console,g.name+":"),m.error.apply(console,arguments))},performance:{log:function(e){var t,n;g.performance&&(n=(t=(new Date).getTime())-(l||t),l=t,c.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:E,"Execution Time":n})),clearTimeout(m.performance.timer),m.performance.timer=setTimeout(m.performance.display,500)},display:function(){var t=g.name+":",n=0;l=!1,clearTimeout(m.performance.timer),e.each(c,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",s&&(t+=" '"+s+"'"),r.length>1&&(t+=" ("+r.length+")"),(console.group!==i||console.table!==i)&&c.length>0&&(console.groupCollapsed(t),console.table?console.table(c):e.each(c,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),c=[]}},invoke:function(t,n,o){var r,s,l,c=F;return n=n||f,o=E||o,"string"==typeof t&&c!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(c[a])&&n!=r)c=c[a];else{if(c[a]!==i)return s=c[a],!1;if(!e.isPlainObject(c[o])||n==r)return c[o]!==i&&(s=c[o],!1);c=c[o]}})),e.isFunction(s)?l=s.apply(o,n):s!==i&&(l=s),e.isArray(a)?a.push(l):a!==i?a=[a,l]:l!==i&&(a=l),s}},d?(F===i&&m.initialize(),m.invoke(u)):(F!==i&&F.invoke("destroy"),m.initialize())}),a!==i?a:this},e.fn.search.settings={name:"Search",namespace:"search",silent:!1,debug:!1,verbose:!1,performance:!0,type:"standard",minCharacters:1,selectFirstResult:!1,apiSettings:!1,source:!1,searchOnFocus:!0,searchFields:["title","description"],displayField:"",fullTextSearch:"exact",automatic:!0,hideDelay:0,searchDelay:200,maxResults:7,cache:!0,showNoResults:!0,transition:"scale",duration:200,easing:"easeOutExpo",onSelect:!1,onResultsAdd:!1,onSearchQuery:function(e){},onResults:function(e){},onResultsOpen:function(){},onResultsClose:function(){},className:{animating:"animating",active:"active",empty:"empty",focus:"focus",hidden:"hidden",loading:"loading",results:"results",pressed:"down"},error:{source:"Cannot search. No source used, and Semantic API module was not included",noResults:"Your search returned no results",logging:"Error in debug logging, exiting.",noEndpoint:"No search endpoint was specified",noTemplate:"A valid template name was not specified.",oldSearchSyntax:"searchFullText setting has been renamed fullTextSearch for consistency, please adjust your settings.",serverError:"There was an issue querying the server.",maxResults:"Results must be an array to use maxResults setting",method:"The method you called is not defined."},metadata:{cache:"cache",results:"results",result:"result"},regExp:{escape:/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,beginsWith:"(?:s|^)"},fields:{categories:"results",categoryName:"name",categoryResults:"results",description:"description",image:"image",price:"price",results:"results",title:"title",url:"url",action:"action",actionText:"text",actionURL:"url"},selector:{prompt:".prompt",searchButton:".search.button",results:".results",message:".results > .message",category:".category",result:".result",title:".title, .name"},templates:{escape:function(e){var t={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"};return/[&<>"'`]/.test(e)?e.replace(/[&<>"'`]/g,function(e){return t[e]}):e},message:function(e,t){var n="";return e!==i&&t!==i&&(n+='<div class="message '+t+'">',n+="empty"==t?'<div class="header">No Results</div class="header"><div class="description">'+e+'</div class="description">':' <div class="description">'+e+"</div>",n+="</div>"),n},category:function(t,n){var o="";e.fn.search.settings.templates.escape;return t[n.categoryResults]!==i&&(e.each(t[n.categoryResults],function(t,a){a[n.results]!==i&&a.results.length>0&&(o+='<div class="category">',a[n.categoryName]!==i&&(o+='<div class="name">'+a[n.categoryName]+"</div>"),o+='<div class="results">',e.each(a.results,function(e,t){t[n.url]?o+='<a class="result" href="'+t[n.url]+'">':o+='<a class="result">',t[n.image]!==i&&(o+='<div class="image"> <img src="'+t[n.image]+'"></div>'),o+='<div class="content">',t[n.price]!==i&&(o+='<div class="price">'+t[n.price]+"</div>"),t[n.title]!==i&&(o+='<div class="title">'+t[n.title]+"</div>"),t[n.description]!==i&&(o+='<div class="description">'+t[n.description]+"</div>"),o+="</div>",o+="</a>"}),o+="</div>",o+="</div>")}),t[n.action]&&(o+='<a href="'+t[n.action][n.actionURL]+'" class="action">'+t[n.action][n.actionText]+"</a>"),o)},standard:function(t,n){var o="";return t[n.results]!==i&&(e.each(t[n.results],function(e,t){t[n.url]?o+='<a class="result" href="'+t[n.url]+'">':o+='<a class="result">',t[n.image]!==i&&(o+='<div class="image"> <img src="'+t[n.image]+'"></div>'),o+='<div class="content">',t[n.price]!==i&&(o+='<div class="price">'+t[n.price]+"</div>"),t[n.title]!==i&&(o+='<div class="title">'+t[n.title]+"</div>"),t[n.description]!==i&&(o+='<div class="description">'+t[n.description]+"</div>"),o+="</div>",o+="</a>"}),t[n.action]&&(o+='<a href="'+t[n.action][n.actionURL]+'" class="action">'+t[n.action][n.actionText]+"</a>"),o)}}}}(jQuery,window,document),function(e,t,n,i){"use strict";t=void 0!==t&&t.Math==Math?t:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")(),e.fn.shape=function(o){var a,r=e(this),s=(e("body"),(new Date).getTime()),l=[],c=arguments[0],u="string"==typeof c,d=[].slice.call(arguments,1),f=t.requestAnimationFrame||t.mozRequestAnimationFrame||t.webkitRequestAnimationFrame||t.msRequestAnimationFrame||function(e){setTimeout(e,0)};return r.each(function(){var t,m,g,p=r.selector||"",h=e.isPlainObject(o)?e.extend(!0,{},e.fn.shape.settings,o):e.extend({},e.fn.shape.settings),v=h.namespace,b=h.selector,y=h.error,x=h.className,C="."+v,w="module-"+v,S=e(this),k=S.find(b.sides),T=S.find(b.side),A=!1,R=this,P=S.data(w);g={initialize:function(){g.verbose("Initializing module for",R),g.set.defaultSide(),g.instantiate()},instantiate:function(){g.verbose("Storing instance of module",g),P=g,S.data(w,P)},destroy:function(){g.verbose("Destroying previous module for",R),S.removeData(w).off(C)},refresh:function(){g.verbose("Refreshing selector cache for",R),S=e(R),k=e(this).find(b.shape),T=e(this).find(b.side)},repaint:function(){g.verbose("Forcing repaint event");(k[0]||n.createElement("div")).offsetWidth},animate:function(e,n){g.verbose("Animating box with properties",e),n=n||function(e){g.verbose("Executing animation callback"),e!==i&&e.stopPropagation(),g.reset(),g.set.active()},h.beforeChange.call(m[0]),g.get.transitionEvent()?(g.verbose("Starting CSS animation"),S.addClass(x.animating),k.css(e).one(g.get.transitionEvent(),n),g.set.duration(h.duration),f(function(){S.addClass(x.animating),t.addClass(x.hidden)})):n()},queue:function(e){g.debug("Queueing animation of",e),k.one(g.get.transitionEvent(),function(){g.debug("Executing queued animation"),setTimeout(function(){S.shape(e)},0)})},reset:function(){g.verbose("Animating states reset"),S.removeClass(x.animating).attr("style","").removeAttr("style"),k.attr("style","").removeAttr("style"),T.attr("style","").removeAttr("style").removeClass(x.hidden),m.removeClass(x.animating).attr("style","").removeAttr("style")},is:{complete:function(){return T.filter("."+x.active)[0]==m[0]},animating:function(){return S.hasClass(x.animating)}},set:{defaultSide:function(){t=S.find("."+h.className.active),m=t.next(b.side).length>0?t.next(b.side):S.find(b.side).first(),A=!1,g.verbose("Active side set to",t),g.verbose("Next side set to",m)},duration:function(e){e="number"==typeof(e=e||h.duration)?e+"ms":e,g.verbose("Setting animation duration",e),(h.duration||0===h.duration)&&k.add(T).css({"-webkit-transition-duration":e,"-moz-transition-duration":e,"-ms-transition-duration":e,"-o-transition-duration":e,"transition-duration":e})},currentStageSize:function(){var e=S.find("."+h.className.active),t=e.outerWidth(!0),n=e.outerHeight(!0);S.css({width:t,height:n})},stageSize:function(){var e=S.clone().addClass(x.loading),t=e.find("."+h.className.active),n=A?e.find(b.side).eq(A):t.next(b.side).length>0?t.next(b.side):e.find(b.side).first(),i="next"==h.width?n.outerWidth(!0):"initial"==h.width?S.width():h.width,o="next"==h.height?n.outerHeight(!0):"initial"==h.height?S.height():h.height;t.removeClass(x.active),n.addClass(x.active),e.insertAfter(S),e.remove(),"auto"!=h.width&&(S.css("width",i+h.jitter),g.verbose("Specifying width during animation",i)),"auto"!=h.height&&(S.css("height",o+h.jitter),g.verbose("Specifying height during animation",o))},nextSide:function(e){A=e,m=T.filter(e),A=T.index(m),0===m.length&&(g.set.defaultSide(),g.error(y.side)),g.verbose("Next side manually set to",m)},active:function(){g.verbose("Setting new side to active",m),T.removeClass(x.active),m.addClass(x.active),h.onChange.call(m[0]),g.set.defaultSide()}},flip:{up:function(){if(!g.is.complete()||g.is.animating()||h.allowRepeats)if(g.is.animating())g.queue("flip up");else{g.debug("Flipping up",m);var e=g.get.transform.up();g.set.stageSize(),g.stage.above(),g.animate(e)}else g.debug("Side already visible",m)},down:function(){if(!g.is.complete()||g.is.animating()||h.allowRepeats)if(g.is.animating())g.queue("flip down");else{g.debug("Flipping down",m);var e=g.get.transform.down();g.set.stageSize(),g.stage.below(),g.animate(e)}else g.debug("Side already visible",m)},left:function(){if(!g.is.complete()||g.is.animating()||h.allowRepeats)if(g.is.animating())g.queue("flip left");else{g.debug("Flipping left",m);var e=g.get.transform.left();g.set.stageSize(),g.stage.left(),g.animate(e)}else g.debug("Side already visible",m)},right:function(){if(!g.is.complete()||g.is.animating()||h.allowRepeats)if(g.is.animating())g.queue("flip right");else{g.debug("Flipping right",m);var e=g.get.transform.right();g.set.stageSize(),g.stage.right(),g.animate(e)}else g.debug("Side already visible",m)},over:function(){!g.is.complete()||g.is.animating()||h.allowRepeats?g.is.animating()?g.queue("flip over"):(g.debug("Flipping over",m),g.set.stageSize(),g.stage.behind(),g.animate(g.get.transform.over())):g.debug("Side already visible",m)},back:function(){!g.is.complete()||g.is.animating()||h.allowRepeats?g.is.animating()?g.queue("flip back"):(g.debug("Flipping back",m),g.set.stageSize(),g.stage.behind(),g.animate(g.get.transform.back())):g.debug("Side already visible",m)}},get:{transform:{up:function(){return{transform:"translateY("+-(t.outerHeight(!0)-m.outerHeight(!0))/2+"px) translateZ("+-t.outerHeight(!0)/2+"px) rotateX(-90deg)"}},down:function(){return{transform:"translateY("+-(t.outerHeight(!0)-m.outerHeight(!0))/2+"px) translateZ("+-t.outerHeight(!0)/2+"px) rotateX(90deg)"}},left:function(){return{transform:"translateX("+-(t.outerWidth(!0)-m.outerWidth(!0))/2+"px) translateZ("+-t.outerWidth(!0)/2+"px) rotateY(90deg)"}},right:function(){return{transform:"translateX("+-(t.outerWidth(!0)-m.outerWidth(!0))/2+"px) translateZ("+-t.outerWidth(!0)/2+"px) rotateY(-90deg)"}},over:function(){return{transform:"translateX("+-(t.outerWidth(!0)-m.outerWidth(!0))/2+"px) rotateY(180deg)"}},back:function(){return{transform:"translateX("+-(t.outerWidth(!0)-m.outerWidth(!0))/2+"px) rotateY(-180deg)"}}},transitionEvent:function(){var e,t=n.createElement("element"),o={transition:"transitionend",OTransition:"oTransitionEnd",MozTransition:"transitionend",WebkitTransition:"webkitTransitionEnd"};for(e in o)if(t.style[e]!==i)return o[e]},nextSide:function(){return t.next(b.side).length>0?t.next(b.side):S.find(b.side).first()}},stage:{above:function(){var e={origin:(t.outerHeight(!0)-m.outerHeight(!0))/2,depth:{active:m.outerHeight(!0)/2,next:t.outerHeight(!0)/2}};g.verbose("Setting the initial animation position as above",m,e),k.css({transform:"translateZ(-"+e.depth.active+"px)"}),t.css({transform:"rotateY(0deg) translateZ("+e.depth.active+"px)"}),m.addClass(x.animating).css({top:e.origin+"px",transform:"rotateX(90deg) translateZ("+e.depth.next+"px)"})},below:function(){var e={origin:(t.outerHeight(!0)-m.outerHeight(!0))/2,depth:{active:m.outerHeight(!0)/2,next:t.outerHeight(!0)/2}};g.verbose("Setting the initial animation position as below",m,e),k.css({transform:"translateZ(-"+e.depth.active+"px)"}),t.css({transform:"rotateY(0deg) translateZ("+e.depth.active+"px)"}),m.addClass(x.animating).css({top:e.origin+"px",transform:"rotateX(-90deg) translateZ("+e.depth.next+"px)"})},left:function(){var e=t.outerWidth(!0),n=m.outerWidth(!0),i={origin:(e-n)/2,depth:{active:n/2,next:e/2}};g.verbose("Setting the initial animation position as left",m,i),k.css({transform:"translateZ(-"+i.depth.active+"px)"}),t.css({transform:"rotateY(0deg) translateZ("+i.depth.active+"px)"}),m.addClass(x.animating).css({left:i.origin+"px",transform:"rotateY(-90deg) translateZ("+i.depth.next+"px)"})},right:function(){var e=t.outerWidth(!0),n=m.outerWidth(!0),i={origin:(e-n)/2,depth:{active:n/2,next:e/2}};g.verbose("Setting the initial animation position as left",m,i),k.css({transform:"translateZ(-"+i.depth.active+"px)"}),t.css({transform:"rotateY(0deg) translateZ("+i.depth.active+"px)"}),m.addClass(x.animating).css({left:i.origin+"px",transform:"rotateY(90deg) translateZ("+i.depth.next+"px)"})},behind:function(){var e=t.outerWidth(!0),n=m.outerWidth(!0),i={origin:(e-n)/2,depth:{active:n/2,next:e/2}};g.verbose("Setting the initial animation position as behind",m,i),t.css({transform:"rotateY(0deg)"}),m.addClass(x.animating).css({left:i.origin+"px",transform:"rotateY(-180deg)"})}},setting:function(t,n){if(g.debug("Changing setting",t,n),e.isPlainObject(t))e.extend(!0,h,t);else{if(n===i)return h[t];e.isPlainObject(h[t])?e.extend(!0,h[t],n):h[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,g,t);else{if(n===i)return g[t];g[t]=n}},debug:function(){!h.silent&&h.debug&&(h.performance?g.performance.log(arguments):(g.debug=Function.prototype.bind.call(console.info,console,h.name+":"),g.debug.apply(console,arguments)))},verbose:function(){!h.silent&&h.verbose&&h.debug&&(h.performance?g.performance.log(arguments):(g.verbose=Function.prototype.bind.call(console.info,console,h.name+":"),g.verbose.apply(console,arguments)))},error:function(){h.silent||(g.error=Function.prototype.bind.call(console.error,console,h.name+":"),g.error.apply(console,arguments))},performance:{log:function(e){var t,n;h.performance&&(n=(t=(new Date).getTime())-(s||t),s=t,l.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:R,"Execution Time":n})),clearTimeout(g.performance.timer),g.performance.timer=setTimeout(g.performance.display,500)},display:function(){var t=h.name+":",n=0;s=!1,clearTimeout(g.performance.timer),e.each(l,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",p&&(t+=" '"+p+"'"),r.length>1&&(t+=" ("+r.length+")"),(console.group!==i||console.table!==i)&&l.length>0&&(console.groupCollapsed(t),console.table?console.table(l):e.each(l,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),l=[]}},invoke:function(t,n,o){var r,s,l,c=P;return n=n||d,o=R||o,"string"==typeof t&&c!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(c[a])&&n!=r)c=c[a];else{if(c[a]!==i)return s=c[a],!1;if(!e.isPlainObject(c[o])||n==r)return c[o]!==i&&(s=c[o],!1);c=c[o]}})),e.isFunction(s)?l=s.apply(o,n):s!==i&&(l=s),e.isArray(a)?a.push(l):a!==i?a=[a,l]:l!==i&&(a=l),s}},u?(P===i&&g.initialize(),g.invoke(c)):(P!==i&&P.invoke("destroy"),g.initialize())}),a!==i?a:this},e.fn.shape.settings={name:"Shape",silent:!1,debug:!1,verbose:!1,jitter:0,performance:!0,namespace:"shape",width:"initial",height:"initial",beforeChange:function(){},onChange:function(){},allowRepeats:!1,duration:!1,error:{side:"You tried to switch to a side that does not exist.",method:"The method you called is not defined"},className:{animating:"animating",hidden:"hidden",loading:"loading",active:"active"},selector:{sides:".sides",side:".side"}}}(jQuery,window,document),function(e,t,n,i){"use strict";t=void 0!==t&&t.Math==Math?t:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")(),e.fn.sidebar=function(o){var a,r=e(this),s=e(t),l=e(n),c=e("html"),u=e("head"),d=r.selector||"",f=(new Date).getTime(),m=[],g=arguments[0],p="string"==typeof g,h=[].slice.call(arguments,1),v=t.requestAnimationFrame||t.mozRequestAnimationFrame||t.webkitRequestAnimationFrame||t.msRequestAnimationFrame||function(e){setTimeout(e,0)};return r.each(function(){var r,b,y,x,C,w,S=e.isPlainObject(o)?e.extend(!0,{},e.fn.sidebar.settings,o):e.extend({},e.fn.sidebar.settings),k=S.selector,T=S.className,A=S.namespace,R=S.regExp,P=S.error,E="."+A,F="module-"+A,O=e(this),D=e(S.context),q=O.children(k.sidebar),j=(D.children(k.fixed),D.children(k.pusher)),z=this,I=O.data(F);w={initialize:function(){w.debug("Initializing sidebar",o),w.create.id(),C=w.get.transitionEvent(),S.delaySetup?v(w.setup.layout):w.setup.layout(),v(function(){w.setup.cache()}),w.instantiate()},instantiate:function(){w.verbose("Storing instance of module",w),I=w,O.data(F,w)},create:{id:function(){y=(Math.random().toString(16)+"000000000").substr(2,8),b="."+y,w.verbose("Creating unique id for element",y)}},destroy:function(){w.verbose("Destroying previous module for",O),O.off(E).removeData(F),w.is.ios()&&w.remove.ios(),D.off(b),s.off(b),l.off(b)},event:{clickaway:function(e){var t=j.find(e.target).length>0||j.is(e.target),n=D.is(e.target);t&&(w.verbose("User clicked on dimmed page"),w.hide()),n&&(w.verbose("User clicked on dimmable context (scaled out page)"),w.hide())},touch:function(e){},containScroll:function(e){z.scrollTop<=0&&(z.scrollTop=1),z.scrollTop+z.offsetHeight>=z.scrollHeight&&(z.scrollTop=z.scrollHeight-z.offsetHeight-1)},scroll:function(t){0===e(t.target).closest(k.sidebar).length&&t.preventDefault()}},bind:{clickaway:function(){w.verbose("Adding clickaway events to context",D),S.closable&&D.on("click"+b,w.event.clickaway).on("touchend"+b,w.event.clickaway)},scrollLock:function(){S.scrollLock&&(w.debug("Disabling page scroll"),s.on("DOMMouseScroll"+b,w.event.scroll)),w.verbose("Adding events to contain sidebar scroll"),l.on("touchmove"+b,w.event.touch),O.on("scroll"+E,w.event.containScroll)}},unbind:{clickaway:function(){w.verbose("Removing clickaway events from context",D),D.off(b)},scrollLock:function(){w.verbose("Removing scroll lock from page"),l.off(b),s.off(b),O.off("scroll"+E)}},add:{inlineCSS:function(){var t,n=w.cache.width||O.outerWidth(),i=w.cache.height||O.outerHeight(),o=w.is.rtl(),a=w.get.direction(),s={left:n,right:-n,top:i,bottom:-i};o&&(w.verbose("RTL detected, flipping widths"),s.left=-n,s.right=n),t="<style>","left"===a||"right"===a?(w.debug("Adding CSS rules for animation distance",n),t+=" .ui.visible."+a+".sidebar ~ .fixed, .ui.visible."+a+".sidebar ~ .pusher {   -webkit-transform: translate3d("+s[a]+"px, 0, 0);           transform: translate3d("+s[a]+"px, 0, 0); }"):"top"!==a&&"bottom"!=a||(t+=" .ui.visible."+a+".sidebar ~ .fixed, .ui.visible."+a+".sidebar ~ .pusher {   -webkit-transform: translate3d(0, "+s[a]+"px, 0);           transform: translate3d(0, "+s[a]+"px, 0); }"),w.is.ie()&&("left"===a||"right"===a?(w.debug("Adding CSS rules for animation distance",n),t+=" body.pushable > .ui.visible."+a+".sidebar ~ .pusher:after {   -webkit-transform: translate3d("+s[a]+"px, 0, 0);           transform: translate3d("+s[a]+"px, 0, 0); }"):"top"!==a&&"bottom"!=a||(t+=" body.pushable > .ui.visible."+a+".sidebar ~ .pusher:after {   -webkit-transform: translate3d(0, "+s[a]+"px, 0);           transform: translate3d(0, "+s[a]+"px, 0); }"),t+=" body.pushable > .ui.visible.left.sidebar ~ .ui.visible.right.sidebar ~ .pusher:after, body.pushable > .ui.visible.right.sidebar ~ .ui.visible.left.sidebar ~ .pusher:after {   -webkit-transform: translate3d(0px, 0, 0);           transform: translate3d(0px, 0, 0); }"),r=e(t+="</style>").appendTo(u),w.debug("Adding sizing css to head",r)}},refresh:function(){w.verbose("Refreshing selector cache"),D=e(S.context),q=D.children(k.sidebar),j=D.children(k.pusher),D.children(k.fixed),w.clear.cache()},refreshSidebars:function(){w.verbose("Refreshing other sidebars"),q=D.children(k.sidebar)},repaint:function(){w.verbose("Forcing repaint event"),z.style.display="none";z.offsetHeight;z.scrollTop=z.scrollTop,z.style.display=""},setup:{cache:function(){w.cache={width:O.outerWidth(),height:O.outerHeight(),rtl:"rtl"==O.css("direction")}},layout:function(){0===D.children(k.pusher).length&&(w.debug("Adding wrapper element for sidebar"),w.error(P.pusher),j=e('<div class="pusher" />'),D.children().not(k.omitted).not(q).wrapAll(j),w.refresh()),0!==O.nextAll(k.pusher).length&&O.nextAll(k.pusher)[0]===j[0]||(w.debug("Moved sidebar to correct parent element"),w.error(P.movedSidebar,z),O.detach().prependTo(D),w.refresh()),w.clear.cache(),w.set.pushable(),w.set.direction()}},attachEvents:function(t,n){var i=e(t);n=e.isFunction(w[n])?w[n]:w.toggle,i.length>0?(w.debug("Attaching sidebar events to element",t,n),i.on("click"+E,n)):w.error(P.notFound,t)},show:function(t){if(t=e.isFunction(t)?t:function(){},w.is.hidden()){if(w.refreshSidebars(),S.overlay&&(w.error(P.overlay),S.transition="overlay"),w.refresh(),w.othersActive())if(w.debug("Other sidebars currently visible"),S.exclusive){if("overlay"!=S.transition)return void w.hideOthers(w.show);w.hideOthers()}else S.transition="overlay";w.pushPage(function(){t.call(z),S.onShow.call(z)}),S.onChange.call(z),S.onVisible.call(z)}else w.debug("Sidebar is already visible")},hide:function(t){t=e.isFunction(t)?t:function(){},(w.is.visible()||w.is.animating())&&(w.debug("Hiding sidebar",t),w.refreshSidebars(),w.pullPage(function(){t.call(z),S.onHidden.call(z)}),S.onChange.call(z),S.onHide.call(z))},othersAnimating:function(){return q.not(O).filter("."+T.animating).length>0},othersVisible:function(){return q.not(O).filter("."+T.visible).length>0},othersActive:function(){return w.othersVisible()||w.othersAnimating()},hideOthers:function(e){var t=q.not(O).filter("."+T.visible),n=t.length,i=0;e=e||function(){},t.sidebar("hide",function(){++i==n&&e()})},toggle:function(){w.verbose("Determining toggled direction"),w.is.hidden()?w.show():w.hide()},pushPage:function(t){var n,i,o,a=w.get.transition(),r="overlay"===a||w.othersActive()?O:j;t=e.isFunction(t)?t:function(){},"scale down"==S.transition&&w.scrollToTop(),w.set.transition(a),w.repaint(),n=function(){w.bind.clickaway(),w.add.inlineCSS(),w.set.animating(),w.set.visible()},i=function(){w.set.dimmed()},o=function(e){e.target==r[0]&&(r.off(C+b,o),w.remove.animating(),w.bind.scrollLock(),t.call(z))},r.off(C+b),r.on(C+b,o),v(n),S.dimPage&&!w.othersVisible()&&v(i)},pullPage:function(t){var n,i,o=w.get.transition(),a="overlay"==o||w.othersActive()?O:j;t=e.isFunction(t)?t:function(){},w.verbose("Removing context push state",w.get.direction()),w.unbind.clickaway(),w.unbind.scrollLock(),n=function(){w.set.transition(o),w.set.animating(),w.remove.visible(),S.dimPage&&!w.othersVisible()&&j.removeClass(T.dimmed)},i=function(e){e.target==a[0]&&(a.off(C+b,i),w.remove.animating(),w.remove.transition(),w.remove.inlineCSS(),("scale down"==o||S.returnScroll&&w.is.mobile())&&w.scrollBack(),t.call(z))},a.off(C+b),a.on(C+b,i),v(n)},scrollToTop:function(){w.verbose("Scrolling to top of page to avoid animation issues"),x=e(t).scrollTop(),O.scrollTop(0),t.scrollTo(0,0)},scrollBack:function(){w.verbose("Scrolling back to original page position"),t.scrollTo(0,x)},clear:{cache:function(){w.verbose("Clearing cached dimensions"),w.cache={}}},set:{ios:function(){c.addClass(T.ios)},pushed:function(){D.addClass(T.pushed)},pushable:function(){D.addClass(T.pushable)},dimmed:function(){j.addClass(T.dimmed)},active:function(){O.addClass(T.active)},animating:function(){O.addClass(T.animating)},transition:function(e){e=e||w.get.transition(),O.addClass(e)},direction:function(e){e=e||w.get.direction(),O.addClass(T[e])},visible:function(){O.addClass(T.visible)},overlay:function(){O.addClass(T.overlay)}},remove:{inlineCSS:function(){w.debug("Removing inline css styles",r),r&&r.length>0&&r.remove()},ios:function(){c.removeClass(T.ios)},pushed:function(){D.removeClass(T.pushed)},pushable:function(){D.removeClass(T.pushable)},active:function(){O.removeClass(T.active)},animating:function(){O.removeClass(T.animating)},transition:function(e){e=e||w.get.transition(),O.removeClass(e)},direction:function(e){e=e||w.get.direction(),O.removeClass(T[e])},visible:function(){O.removeClass(T.visible)},overlay:function(){O.removeClass(T.overlay)}},get:{direction:function(){return O.hasClass(T.top)?T.top:O.hasClass(T.right)?T.right:O.hasClass(T.bottom)?T.bottom:T.left},transition:function(){var e,t=w.get.direction();return e=w.is.mobile()?"auto"==S.mobileTransition?S.defaultTransition.mobile[t]:S.mobileTransition:"auto"==S.transition?S.defaultTransition.computer[t]:S.transition,w.verbose("Determined transition",e),e},transitionEvent:function(){var e,t=n.createElement("element"),o={transition:"transitionend",OTransition:"oTransitionEnd",MozTransition:"transitionend",WebkitTransition:"webkitTransitionEnd"};for(e in o)if(t.style[e]!==i)return o[e]}},is:{ie:function(){return!t.ActiveXObject&&"ActiveXObject"in t||"ActiveXObject"in t},ios:function(){var e=navigator.userAgent,t=e.match(R.ios),n=e.match(R.mobileChrome);return!(!t||n)&&(w.verbose("Browser was found to be iOS",e),!0)},mobile:function(){var e=navigator.userAgent;return e.match(R.mobile)?(w.verbose("Browser was found to be mobile",e),!0):(w.verbose("Browser is not mobile, using regular transition",e),!1)},hidden:function(){return!w.is.visible()},visible:function(){return O.hasClass(T.visible)},open:function(){return w.is.visible()},closed:function(){return w.is.hidden()},vertical:function(){return O.hasClass(T.top)},animating:function(){return D.hasClass(T.animating)},rtl:function(){return w.cache.rtl===i&&(w.cache.rtl="rtl"==O.css("direction")),w.cache.rtl}},setting:function(t,n){if(w.debug("Changing setting",t,n),e.isPlainObject(t))e.extend(!0,S,t);else{if(n===i)return S[t];e.isPlainObject(S[t])?e.extend(!0,S[t],n):S[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,w,t);else{if(n===i)return w[t];w[t]=n}},debug:function(){!S.silent&&S.debug&&(S.performance?w.performance.log(arguments):(w.debug=Function.prototype.bind.call(console.info,console,S.name+":"),w.debug.apply(console,arguments)))},verbose:function(){!S.silent&&S.verbose&&S.debug&&(S.performance?w.performance.log(arguments):(w.verbose=Function.prototype.bind.call(console.info,console,S.name+":"),w.verbose.apply(console,arguments)))},error:function(){S.silent||(w.error=Function.prototype.bind.call(console.error,console,S.name+":"),w.error.apply(console,arguments))},performance:{log:function(e){var t,n;S.performance&&(n=(t=(new Date).getTime())-(f||t),f=t,m.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:z,"Execution Time":n})),clearTimeout(w.performance.timer),w.performance.timer=setTimeout(w.performance.display,500)},display:function(){var t=S.name+":",n=0;f=!1,clearTimeout(w.performance.timer),e.each(m,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",d&&(t+=" '"+d+"'"),(console.group!==i||console.table!==i)&&m.length>0&&(console.groupCollapsed(t),console.table?console.table(m):e.each(m,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),m=[]}},invoke:function(t,n,o){var r,s,l,c=I;return n=n||h,o=z||o,"string"==typeof t&&c!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(c[a])&&n!=r)c=c[a];else{if(c[a]!==i)return s=c[a],!1;if(!e.isPlainObject(c[o])||n==r)return c[o]!==i?(s=c[o],!1):(w.error(P.method,t),!1);c=c[o]}})),e.isFunction(s)?l=s.apply(o,n):s!==i&&(l=s),e.isArray(a)?a.push(l):a!==i?a=[a,l]:l!==i&&(a=l),s}},p?(I===i&&w.initialize(),w.invoke(g)):(I!==i&&w.invoke("destroy"),w.initialize())}),a!==i?a:this},e.fn.sidebar.settings={name:"Sidebar",namespace:"sidebar",silent:!1,debug:!1,verbose:!1,performance:!0,transition:"auto",mobileTransition:"auto",defaultTransition:{computer:{left:"uncover",right:"uncover",top:"overlay",bottom:"overlay"},mobile:{left:"uncover",right:"uncover",top:"overlay",bottom:"overlay"}},context:"body",exclusive:!1,closable:!0,dimPage:!0,scrollLock:!1,returnScroll:!1,delaySetup:!1,duration:500,onChange:function(){},onShow:function(){},onHide:function(){},onHidden:function(){},onVisible:function(){},className:{active:"active",animating:"animating",dimmed:"dimmed",ios:"ios",pushable:"pushable",pushed:"pushed",right:"right",top:"top",left:"left",bottom:"bottom",visible:"visible"},selector:{fixed:".fixed",omitted:"script, link, style, .ui.modal, .ui.dimmer, .ui.nag, .ui.fixed",pusher:".pusher",sidebar:".ui.sidebar"},regExp:{ios:/(iPad|iPhone|iPod)/g,mobileChrome:/(CriOS)/g,mobile:/Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/g},error:{method:"The method you called is not defined.",pusher:"Had to add pusher element. For optimal performance make sure body content is inside a pusher element",movedSidebar:"Had to move sidebar. For optimal performance make sure sidebar and pusher are direct children of your body tag",overlay:"The overlay setting is no longer supported, use animation: overlay",notFound:"There were no elements that matched the specified selector"}}}(jQuery,window,document),function(e,t,n,i){"use strict";t=void 0!==t&&t.Math==Math?t:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")(),e.fn.sticky=function(o){var a,r=e(this),s=r.selector||"",l=(new Date).getTime(),c=[],u=arguments[0],d="string"==typeof u,f=[].slice.call(arguments,1);return r.each(function(){var r,m,g,p,h,v=e.isPlainObject(o)?e.extend(!0,{},e.fn.sticky.settings,o):e.extend({},e.fn.sticky.settings),b=v.className,y=v.namespace,x=v.error,C="."+y,w="module-"+y,S=e(this),k=e(t),T=e(v.scrollContext),A=(S.selector,S.data(w)),R=t.requestAnimationFrame||t.mozRequestAnimationFrame||t.webkitRequestAnimationFrame||t.msRequestAnimationFrame||function(e){setTimeout(e,0)},P=this;h={initialize:function(){h.determineContainer(),h.determineContext(),h.verbose("Initializing sticky",v,r),h.save.positions(),h.checkErrors(),h.bind.events(),v.observeChanges&&h.observeChanges(),h.instantiate()},instantiate:function(){h.verbose("Storing instance of module",h),A=h,S.data(w,h)},destroy:function(){h.verbose("Destroying previous instance"),h.reset(),g&&g.disconnect(),p&&p.disconnect(),k.off("load"+C,h.event.load).off("resize"+C,h.event.resize),T.off("scrollchange"+C,h.event.scrollchange),S.removeData(w)},observeChanges:function(){"MutationObserver"in t&&(g=new MutationObserver(h.event.documentChanged),p=new MutationObserver(h.event.changed),g.observe(n,{childList:!0,subtree:!0}),p.observe(P,{childList:!0,subtree:!0}),p.observe(m[0],{childList:!0,subtree:!0}),h.debug("Setting up mutation observer",p))},determineContainer:function(){r=v.container?e(v.container):S.offsetParent()},determineContext:function(){0!==(m=v.context?e(v.context):r).length||h.error(x.invalidContext,v.context,S)},checkErrors:function(){if(h.is.hidden()&&h.error(x.visible,S),h.cache.element.height>h.cache.context.height)return h.reset(),void h.error(x.elementSize,S)},bind:{events:function(){k.on("load"+C,h.event.load).on("resize"+C,h.event.resize),T.off("scroll"+C).on("scroll"+C,h.event.scroll).on("scrollchange"+C,h.event.scrollchange)}},event:{changed:function(e){clearTimeout(h.timer),h.timer=setTimeout(function(){h.verbose("DOM tree modified, updating sticky menu",e),h.refresh()},100)},documentChanged:function(t){[].forEach.call(t,function(t){t.removedNodes&&[].forEach.call(t.removedNodes,function(t){(t==P||e(t).find(P).length>0)&&(h.debug("Element removed from DOM, tearing down events"),h.destroy())})})},load:function(){h.verbose("Page contents finished loading"),R(h.refresh)},resize:function(){h.verbose("Window resized"),R(h.refresh)},scroll:function(){R(function(){T.triggerHandler("scrollchange"+C,T.scrollTop())})},scrollchange:function(e,t){h.stick(t),v.onScroll.call(P)}},refresh:function(e){h.reset(),v.context||h.determineContext(),e&&h.determineContainer(),h.save.positions(),h.stick(),v.onReposition.call(P)},supports:{sticky:function(){var t=e("<div/>");t[0];return t.addClass(b.supported),t.css("position").match("sticky")}},save:{lastScroll:function(e){h.lastScroll=e},elementScroll:function(e){h.elementScroll=e},positions:function(){var e={height:T.height()},t={margin:{top:parseInt(S.css("margin-top"),10),bottom:parseInt(S.css("margin-bottom"),10)},offset:S.offset(),width:S.outerWidth(),height:S.outerHeight()},n={offset:m.offset(),height:m.outerHeight()};r.outerHeight();h.is.standardScroll()||(h.debug("Non-standard scroll. Removing scroll offset from element offset"),e.top=T.scrollTop(),e.left=T.scrollLeft(),t.offset.top+=e.top,n.offset.top+=e.top,t.offset.left+=e.left,n.offset.left+=e.left),h.cache={fits:t.height+v.offset<=e.height,sameHeight:t.height==n.height,scrollContext:{height:e.height},element:{margin:t.margin,top:t.offset.top-t.margin.top,left:t.offset.left,width:t.width,height:t.height,bottom:t.offset.top+t.height},context:{top:n.offset.top,height:n.height,bottom:n.offset.top+n.height}},h.set.containerSize(),h.stick(),h.debug("Caching element positions",h.cache)}},get:{direction:function(e){var t="down";return e=e||T.scrollTop(),h.lastScroll!==i&&(h.lastScroll<e?t="down":h.lastScroll>e&&(t="up")),t},scrollChange:function(e){return e=e||T.scrollTop(),h.lastScroll?e-h.lastScroll:0},currentElementScroll:function(){return h.elementScroll?h.elementScroll:h.is.top()?Math.abs(parseInt(S.css("top"),10))||0:Math.abs(parseInt(S.css("bottom"),10))||0},elementScroll:function(e){e=e||T.scrollTop();var t=h.cache.element,n=h.cache.scrollContext,i=h.get.scrollChange(e),o=t.height-n.height+v.offset,a=h.get.currentElementScroll(),r=a+i;return a=h.cache.fits||r<0?0:r>o?o:r}},remove:{lastScroll:function(){delete h.lastScroll},elementScroll:function(e){delete h.elementScroll},minimumSize:function(){r.css("min-height","")},offset:function(){S.css("margin-top","")}},set:{offset:function(){h.verbose("Setting offset on element",v.offset),S.css("margin-top",v.offset)},containerSize:function(){var e=r.get(0).tagName;"HTML"===e||"body"==e?h.determineContainer():Math.abs(r.outerHeight()-h.cache.context.height)>v.jitter&&(h.debug("Context has padding, specifying exact height for container",h.cache.context.height),r.css({height:h.cache.context.height}))},minimumSize:function(){var e=h.cache.element;r.css("min-height",e.height)},scroll:function(e){h.debug("Setting scroll on element",e),h.elementScroll!=e&&(h.is.top()&&S.css("bottom","").css("top",-e),h.is.bottom()&&S.css("top","").css("bottom",e))},size:function(){0!==h.cache.element.height&&0!==h.cache.element.width&&(P.style.setProperty("width",h.cache.element.width+"px","important"),P.style.setProperty("height",h.cache.element.height+"px","important"))}},is:{standardScroll:function(){return T[0]==t},top:function(){return S.hasClass(b.top)},bottom:function(){return S.hasClass(b.bottom)},initialPosition:function(){return!h.is.fixed()&&!h.is.bound()},hidden:function(){return!S.is(":visible")},bound:function(){return S.hasClass(b.bound)},fixed:function(){return S.hasClass(b.fixed)}},stick:function(e){var t=e||T.scrollTop(),n=h.cache,i=n.fits,o=n.sameHeight,a=n.element,r=n.scrollContext,s=n.context,l=h.is.bottom()&&v.pushing?v.bottomOffset:v.offset,c=(e={top:t+l,bottom:t+l+r.height},h.get.direction(e.top),i?0:h.get.elementScroll(e.top)),u=!i;0!==a.height&&!o&&(h.is.initialPosition()?e.top>=s.bottom?(h.debug("Initial element position is bottom of container"),h.bindBottom()):e.top>a.top&&(a.height+e.top-c>=s.bottom?(h.debug("Initial element position is bottom of container"),h.bindBottom()):(h.debug("Initial element position is fixed"),h.fixTop())):h.is.fixed()?h.is.top()?e.top<=a.top?(h.debug("Fixed element reached top of container"),h.setInitialPosition()):a.height+e.top-c>=s.bottom?(h.debug("Fixed element reached bottom of container"),h.bindBottom()):u&&(h.set.scroll(c),h.save.lastScroll(e.top),h.save.elementScroll(c)):h.is.bottom()&&(e.bottom-a.height<=a.top?(h.debug("Bottom fixed rail has reached top of container"),h.setInitialPosition()):e.bottom>=s.bottom?(h.debug("Bottom fixed rail has reached bottom of container"),h.bindBottom()):u&&(h.set.scroll(c),h.save.lastScroll(e.top),h.save.elementScroll(c))):h.is.bottom()&&(e.top<=a.top?(h.debug("Jumped from bottom fixed to top fixed, most likely used home/end button"),h.setInitialPosition()):v.pushing?h.is.bound()&&e.bottom<=s.bottom&&(h.debug("Fixing bottom attached element to bottom of browser."),h.fixBottom()):h.is.bound()&&e.top<=s.bottom-a.height&&(h.debug("Fixing bottom attached element to top of browser."),h.fixTop())))},bindTop:function(){h.debug("Binding element to top of parent container"),h.remove.offset(),S.css({left:"",top:"",marginBottom:""}).removeClass(b.fixed).removeClass(b.bottom).addClass(b.bound).addClass(b.top),v.onTop.call(P),v.onUnstick.call(P)},bindBottom:function(){h.debug("Binding element to bottom of parent container"),h.remove.offset(),S.css({left:"",top:""}).removeClass(b.fixed).removeClass(b.top).addClass(b.bound).addClass(b.bottom),v.onBottom.call(P),v.onUnstick.call(P)},setInitialPosition:function(){h.debug("Returning to initial position"),h.unfix(),h.unbind()},fixTop:function(){h.debug("Fixing element to top of page"),v.setSize&&h.set.size(),h.set.minimumSize(),h.set.offset(),S.css({left:h.cache.element.left,bottom:"",marginBottom:""}).removeClass(b.bound).removeClass(b.bottom).addClass(b.fixed).addClass(b.top),v.onStick.call(P)},fixBottom:function(){h.debug("Sticking element to bottom of page"),v.setSize&&h.set.size(),h.set.minimumSize(),h.set.offset(),S.css({left:h.cache.element.left,bottom:"",marginBottom:""}).removeClass(b.bound).removeClass(b.top).addClass(b.fixed).addClass(b.bottom),v.onStick.call(P)},unbind:function(){h.is.bound()&&(h.debug("Removing container bound position on element"),h.remove.offset(),S.removeClass(b.bound).removeClass(b.top).removeClass(b.bottom))},unfix:function(){h.is.fixed()&&(h.debug("Removing fixed position on element"),h.remove.minimumSize(),h.remove.offset(),S.removeClass(b.fixed).removeClass(b.top).removeClass(b.bottom),v.onUnstick.call(P))},reset:function(){h.debug("Resetting elements position"),h.unbind(),h.unfix(),h.resetCSS(),h.remove.offset(),h.remove.lastScroll()},resetCSS:function(){S.css({width:"",height:""}),r.css({height:""})},setting:function(t,n){if(e.isPlainObject(t))e.extend(!0,v,t);else{if(n===i)return v[t];v[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,h,t);else{if(n===i)return h[t];h[t]=n}},debug:function(){!v.silent&&v.debug&&(v.performance?h.performance.log(arguments):(h.debug=Function.prototype.bind.call(console.info,console,v.name+":"),h.debug.apply(console,arguments)))},verbose:function(){!v.silent&&v.verbose&&v.debug&&(v.performance?h.performance.log(arguments):(h.verbose=Function.prototype.bind.call(console.info,console,v.name+":"),h.verbose.apply(console,arguments)))},error:function(){v.silent||(h.error=Function.prototype.bind.call(console.error,console,v.name+":"),h.error.apply(console,arguments))},performance:{log:function(e){var t,n;v.performance&&(n=(t=(new Date).getTime())-(l||t),l=t,c.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:P,"Execution Time":n})),clearTimeout(h.performance.timer),h.performance.timer=setTimeout(h.performance.display,0)},display:function(){var t=v.name+":",n=0;l=!1,clearTimeout(h.performance.timer),e.each(c,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",s&&(t+=" '"+s+"'"),(console.group!==i||console.table!==i)&&c.length>0&&(console.groupCollapsed(t),console.table?console.table(c):e.each(c,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),c=[]}},invoke:function(t,n,o){var r,s,l,c=A;return n=n||f,o=P||o,"string"==typeof t&&c!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(c[a])&&n!=r)c=c[a];else{if(c[a]!==i)return s=c[a],!1;if(!e.isPlainObject(c[o])||n==r)return c[o]!==i&&(s=c[o],!1);c=c[o]}})),e.isFunction(s)?l=s.apply(o,n):s!==i&&(l=s),e.isArray(a)?a.push(l):a!==i?a=[a,l]:l!==i&&(a=l),s}},d?(A===i&&h.initialize(),h.invoke(u)):(A!==i&&A.invoke("destroy"),h.initialize())}),a!==i?a:this},e.fn.sticky.settings={name:"Sticky",namespace:"sticky",silent:!1,debug:!1,verbose:!0,performance:!0,pushing:!1,context:!1,container:!1,scrollContext:t,offset:0,bottomOffset:0,jitter:5,setSize:!0,observeChanges:!1,onReposition:function(){},onScroll:function(){},onStick:function(){},onUnstick:function(){},onTop:function(){},onBottom:function(){},error:{container:"Sticky element must be inside a relative container",visible:"Element is hidden, you must call refresh after element becomes visible. Use silent setting to surpress this warning in production.",method:"The method you called is not defined.",invalidContext:"Context specified does not exist",elementSize:"Sticky element is larger than its container, cannot create sticky."},className:{bound:"bound",fixed:"fixed",supported:"native",top:"top",bottom:"bottom"}}}(jQuery,window,document),function(e,t,n,i){"use strict";t=void 0!==t&&t.Math==Math?t:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")(),e.fn.tab=function(o){var a,r=e.isFunction(this)?e(t):e(this),s=r.selector||"",l=(new Date).getTime(),c=[],u=arguments[0],d="string"==typeof u,f=[].slice.call(arguments,1),m=!1;return r.each(function(){var g,p,h,v,b,y,x=e.isPlainObject(o)?e.extend(!0,{},e.fn.tab.settings,o):e.extend({},e.fn.tab.settings),C=x.className,w=x.metadata,S=x.selector,k=x.error,T="."+x.namespace,A="module-"+x.namespace,R=e(this),P={},E=!0,F=0,O=this,D=R.data(A);b={initialize:function(){b.debug("Initializing tab menu item",R),b.fix.callbacks(),b.determineTabs(),b.debug("Determining tabs",x.context,p),x.auto&&b.set.auto(),b.bind.events(),x.history&&!m&&(b.initializeHistory(),m=!0),b.instantiate()},instantiate:function(){b.verbose("Storing instance of module",b),D=b,R.data(A,b)},destroy:function(){b.debug("Destroying tabs",R),R.removeData(A).off(T)},bind:{events:function(){e.isWindow(O)||(b.debug("Attaching tab activation events to element",R),R.on("click"+T,b.event.click))}},determineTabs:function(){var t;"parent"===x.context?(R.closest(S.ui).length>0?(t=R.closest(S.ui),b.verbose("Using closest UI element as parent",t)):t=R,g=t.parent(),b.verbose("Determined parent element for creating context",g)):x.context?(g=e(x.context),b.verbose("Using selector for tab context",x.context,g)):g=e("body"),x.childrenOnly?(p=g.children(S.tabs),b.debug("Searching tab context children for tabs",g,p)):(p=g.find(S.tabs),b.debug("Searching tab context for tabs",g,p))},fix:{callbacks:function(){e.isPlainObject(o)&&(o.onTabLoad||o.onTabInit)&&(o.onTabLoad&&(o.onLoad=o.onTabLoad,delete o.onTabLoad,b.error(k.legacyLoad,o.onLoad)),o.onTabInit&&(o.onFirstLoad=o.onTabInit,delete o.onTabInit,b.error(k.legacyInit,o.onFirstLoad)),x=e.extend(!0,{},e.fn.tab.settings,o))}},initializeHistory:function(){if(b.debug("Initializing page state"),e.address===i)return b.error(k.state),!1;if("state"==x.historyType){if(b.debug("Using HTML5 to manage state"),!1===x.path)return b.error(k.path),!1;e.address.history(!0).state(x.path)}e.address.bind("change",b.event.history.change)},event:{click:function(t){var n=e(this).data(w.tab);n!==i?(x.history?(b.verbose("Updating page state",t),e.address.value(n)):(b.verbose("Changing tab",t),b.changeTab(n)),t.preventDefault()):b.debug("No tab specified")},history:{change:function(t){var n=t.pathNames.join("/")||b.get.initialPath(),o=x.templates.determineTitle(n)||!1;b.performance.display(),b.debug("History change event",n,t),y=t,n!==i&&b.changeTab(n),o&&e.address.title(o)}}},refresh:function(){h&&(b.debug("Refreshing tab",h),b.changeTab(h))},cache:{read:function(e){return e!==i&&P[e]},add:function(e,t){e=e||h,b.debug("Adding cached content for",e),P[e]=t},remove:function(e){e=e||h,b.debug("Removing cached content for",e),delete P[e]}},set:{auto:function(){var t="string"==typeof x.path?x.path.replace(/\/$/,"")+"/{$tab}":"/{$tab}";b.verbose("Setting up automatic tab retrieval from server",t),e.isPlainObject(x.apiSettings)?x.apiSettings.url=t:x.apiSettings={url:t}},loading:function(e){var t=b.get.tabElement(e);t.hasClass(C.loading)||(b.verbose("Setting loading state for",t),t.addClass(C.loading).siblings(p).removeClass(C.active+" "+C.loading),t.length>0&&x.onRequest.call(t[0],e))},state:function(t){e.address.value(t)}},changeTab:function(n){var i=t.history&&t.history.pushState&&x.ignoreFirstLoad&&E,o=x.auto||e.isPlainObject(x.apiSettings),a=o&&!i?b.utilities.pathToArray(n):b.get.defaultPathArray(n);n=b.utilities.arrayToPath(a),e.each(a,function(t,r){var s,l,c,u,d=a.slice(0,t+1),f=b.utilities.arrayToPath(d),m=b.is.tab(f),p=t+1==a.length,S=b.get.tabElement(f);if(b.verbose("Looking for tab",r),m){if(b.verbose("Tab was found",r),h=f,v=b.utilities.filterArray(a,d),p?u=!0:(l=a.slice(0,t+2),c=b.utilities.arrayToPath(l),(u=!b.is.tab(c))&&b.verbose("Tab parameters found",l)),u&&o)return i?(b.debug("Ignoring remote content on first tab load",f),E=!1,b.cache.add(n,S.html()),b.activate.all(f),x.onFirstLoad.call(S[0],f,v,y),x.onLoad.call(S[0],f,v,y)):(b.activate.navigation(f),b.fetch.content(f,n)),!1;b.debug("Opened local tab",f),b.activate.all(f),b.cache.read(f)||(b.cache.add(f,!0),b.debug("First time tab loaded calling tab init"),x.onFirstLoad.call(S[0],f,v,y)),x.onLoad.call(S[0],f,v,y)}else{if(-1!=n.search("/")||""===n)return b.error(k.missingTab,R,g,f),!1;if(f=(s=e("#"+n+', a[name="'+n+'"]')).closest("[data-tab]").data(w.tab),S=b.get.tabElement(f),s&&s.length>0&&f)return b.debug("Anchor link used, opening parent tab",S,s),S.hasClass(C.active)||setTimeout(function(){b.scrollTo(s)},0),b.activate.all(f),b.cache.read(f)||(b.cache.add(f,!0),b.debug("First time tab loaded calling tab init"),x.onFirstLoad.call(S[0],f,v,y)),x.onLoad.call(S[0],f,v,y),!1}})},scrollTo:function(t){var i=!!(t&&t.length>0)&&t.offset().top;!1!==i&&(b.debug("Forcing scroll to an in-page link in a hidden tab",i,t),e(n).scrollTop(i))},update:{content:function(t,n,o){var a=b.get.tabElement(t),r=a[0];o=o!==i?o:x.evaluateScripts,"string"==typeof x.cacheType&&"dom"==x.cacheType.toLowerCase()&&"string"!=typeof n?a.empty().append(e(n).clone(!0)):o?(b.debug("Updating HTML and evaluating inline scripts",t,n),a.html(n)):(b.debug("Updating HTML",t,n),r.innerHTML=n)}},fetch:{content:function(t,n){var o,a,r=b.get.tabElement(t),s={dataType:"html",encodeParameters:!1,on:"now",cache:x.alwaysRefresh,headers:{"X-Remote":!0},onSuccess:function(e){"response"==x.cacheType&&b.cache.add(n,e),b.update.content(t,e),t==h?(b.debug("Content loaded",t),b.activate.tab(t)):b.debug("Content loaded in background",t),x.onFirstLoad.call(r[0],t,v,y),x.onLoad.call(r[0],t,v,y),x.loadOnce?b.cache.add(n,!0):"string"==typeof x.cacheType&&"dom"==x.cacheType.toLowerCase()&&r.children().length>0?setTimeout(function(){var e=r.children().clone(!0);e=e.not("script"),b.cache.add(n,e)},0):b.cache.add(n,r.html())},urlData:{tab:n}},l=r.api("get request")||!1,c=l&&"pending"===l.state();n=n||t,a=b.cache.read(n),x.cache&&a?(b.activate.tab(t),b.debug("Adding cached content",n),x.loadOnce||("once"==x.evaluateScripts?b.update.content(t,a,!1):b.update.content(t,a)),x.onLoad.call(r[0],t,v,y)):c?(b.set.loading(t),b.debug("Content is already loading",n)):e.api!==i?(o=e.extend(!0,{},x.apiSettings,s),b.debug("Retrieving remote content",n,o),b.set.loading(t),r.api(o)):b.error(k.api)}},activate:{all:function(e){b.activate.tab(e),b.activate.navigation(e)},tab:function(e){var t=b.get.tabElement(e),n="siblings"==x.deactivate?t.siblings(p):p.not(t),i=t.hasClass(C.active);b.verbose("Showing tab content for",t),i||(t.addClass(C.active),n.removeClass(C.active+" "+C.loading),t.length>0&&x.onVisible.call(t[0],e))},navigation:function(e){var t=b.get.navElement(e),n="siblings"==x.deactivate?t.siblings(r):r.not(t),i=t.hasClass(C.active);b.verbose("Activating tab navigation for",t,e),i||(t.addClass(C.active),n.removeClass(C.active+" "+C.loading))}},deactivate:{all:function(){b.deactivate.navigation(),b.deactivate.tabs()},navigation:function(){r.removeClass(C.active)},tabs:function(){p.removeClass(C.active+" "+C.loading)}},is:{tab:function(e){return e!==i&&b.get.tabElement(e).length>0}},get:{initialPath:function(){return r.eq(0).data(w.tab)||p.eq(0).data(w.tab)},path:function(){return e.address.value()},defaultPathArray:function(e){return b.utilities.pathToArray(b.get.defaultPath(e))},defaultPath:function(e){var t=r.filter("[data-"+w.tab+'^="'+e+'/"]').eq(0).data(w.tab)||!1;if(t){if(b.debug("Found default tab",t),F<x.maxDepth)return F++,b.get.defaultPath(t);b.error(k.recursion)}else b.debug("No default tabs found for",e,p);return F=0,e},navElement:function(e){return e=e||h,r.filter("[data-"+w.tab+'="'+e+'"]')},tabElement:function(e){var t,n,i,o;return e=e||h,i=b.utilities.pathToArray(e),o=b.utilities.last(i),t=p.filter("[data-"+w.tab+'="'+e+'"]'),n=p.filter("[data-"+w.tab+'="'+o+'"]'),t.length>0?t:n},tab:function(){return h}},utilities:{filterArray:function(t,n){return e.grep(t,function(t){return-1==e.inArray(t,n)})},last:function(t){return!!e.isArray(t)&&t[t.length-1]},pathToArray:function(e){return e===i&&(e=h),"string"==typeof e?e.split("/"):[e]},arrayToPath:function(t){return!!e.isArray(t)&&t.join("/")}},setting:function(t,n){if(b.debug("Changing setting",t,n),e.isPlainObject(t))e.extend(!0,x,t);else{if(n===i)return x[t];e.isPlainObject(x[t])?e.extend(!0,x[t],n):x[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,b,t);else{if(n===i)return b[t];b[t]=n}},debug:function(){!x.silent&&x.debug&&(x.performance?b.performance.log(arguments):(b.debug=Function.prototype.bind.call(console.info,console,x.name+":"),b.debug.apply(console,arguments)))},verbose:function(){!x.silent&&x.verbose&&x.debug&&(x.performance?b.performance.log(arguments):(b.verbose=Function.prototype.bind.call(console.info,console,x.name+":"),b.verbose.apply(console,arguments)))},error:function(){x.silent||(b.error=Function.prototype.bind.call(console.error,console,x.name+":"),b.error.apply(console,arguments))},performance:{log:function(e){var t,n;x.performance&&(n=(t=(new Date).getTime())-(l||t),l=t,c.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:O,"Execution Time":n})),clearTimeout(b.performance.timer),b.performance.timer=setTimeout(b.performance.display,500)},display:function(){var t=x.name+":",n=0;l=!1,clearTimeout(b.performance.timer),e.each(c,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",s&&(t+=" '"+s+"'"),(console.group!==i||console.table!==i)&&c.length>0&&(console.groupCollapsed(t),console.table?console.table(c):e.each(c,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),c=[]}},invoke:function(t,n,o){var r,s,l,c=D;return n=n||f,o=O||o,"string"==typeof t&&c!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(c[a])&&n!=r)c=c[a];else{if(c[a]!==i)return s=c[a],!1;if(!e.isPlainObject(c[o])||n==r)return c[o]!==i?(s=c[o],!1):(b.error(k.method,t),!1);c=c[o]}})),e.isFunction(s)?l=s.apply(o,n):s!==i&&(l=s),e.isArray(a)?a.push(l):a!==i?a=[a,l]:l!==i&&(a=l),s}},d?(D===i&&b.initialize(),b.invoke(u)):(D!==i&&D.invoke("destroy"),b.initialize())}),a!==i?a:this},e.tab=function(){e(t).tab.apply(this,arguments)},e.fn.tab.settings={name:"Tab",namespace:"tab",silent:!1,debug:!1,verbose:!1,performance:!0,auto:!1,history:!1,historyType:"hash",path:!1,context:!1,childrenOnly:!1,maxDepth:25,deactivate:"siblings",alwaysRefresh:!1,cache:!0,loadOnce:!1,cacheType:"response",ignoreFirstLoad:!1,apiSettings:!1,evaluateScripts:"once",onFirstLoad:function(e,t,n){},onLoad:function(e,t,n){},onVisible:function(e,t,n){},onRequest:function(e,t,n){},templates:{determineTitle:function(e){}},error:{api:"You attempted to load content without API module",method:"The method you called is not defined",missingTab:"Activated tab cannot be found. Tabs are case-sensitive.",noContent:"The tab you specified is missing a content url.",path:"History enabled, but no path was specified",recursion:"Max recursive depth reached",legacyInit:"onTabInit has been renamed to onFirstLoad in 2.0, please adjust your code.",legacyLoad:"onTabLoad has been renamed to onLoad in 2.0. Please adjust your code",state:"History requires Asual's Address library <https://github.com/asual/jquery-address>"},metadata:{tab:"tab",loaded:"loaded",promise:"promise"},className:{loading:"loading",active:"active"},selector:{tabs:".ui.tab",ui:".ui"}}}(jQuery,window,document),function(e,t,n,i){"use strict";t=void 0!==t&&t.Math==Math?t:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")(),e.fn.transition=function(){var o,a=e(this),r=a.selector||"",s=(new Date).getTime(),l=[],c=arguments,u=c[0],d=[].slice.call(arguments,1),f="string"==typeof u;t.requestAnimationFrame||t.mozRequestAnimationFrame||t.webkitRequestAnimationFrame||t.msRequestAnimationFrame;return a.each(function(t){var m,g,p,h,v,b,y,x,C,w=e(this),S=this;(C={initialize:function(){m=C.get.settings.apply(S,c),h=m.className,p=m.error,v=m.metadata,x="."+m.namespace,y="module-"+m.namespace,g=w.data(y)||C,b=C.get.animationEndEvent(),f&&(f=C.invoke(u)),!1===f&&(C.verbose("Converted arguments into settings object",m),m.interval?C.delay(m.animate):C.animate(),C.instantiate())},instantiate:function(){C.verbose("Storing instance of module",C),g=C,w.data(y,g)},destroy:function(){C.verbose("Destroying previous module for",S),w.removeData(y)},refresh:function(){C.verbose("Refreshing display type on next animation"),delete C.displayType},forceRepaint:function(){C.verbose("Forcing element repaint");var e=w.parent(),t=w.next();0===t.length?w.detach().appendTo(e):w.detach().insertBefore(t)},repaint:function(){C.verbose("Repainting element");S.offsetWidth},delay:function(e){var n,o=C.get.animationDirection();o||(o=C.can.transition()?C.get.direction():"static"),e=e!==i?e:m.interval,n="auto"==m.reverse&&o==h.outward||1==m.reverse?(a.length-t)*m.interval:t*m.interval,C.debug("Delaying animation by",n),setTimeout(C.animate,n)},animate:function(e){if(m=e||m,!C.is.supported())return C.error(p.support),!1;if(C.debug("Preparing animation",m.animation),C.is.animating()){if(m.queue)return!m.allowRepeats&&C.has.direction()&&C.is.occurring()&&!0!==C.queuing?C.debug("Animation is currently occurring, preventing queueing same animation",m.animation):C.queue(m.animation),!1;if(!m.allowRepeats&&C.is.occurring())return C.debug("Animation is already occurring, will not execute repeated animation",m.animation),!1;C.debug("New animation started, completing previous early",m.animation),g.complete()}C.can.animate()?C.set.animating(m.animation):C.error(p.noAnimation,m.animation,S)},reset:function(){C.debug("Resetting animation to beginning conditions"),C.remove.animationCallbacks(),C.restore.conditions(),C.remove.animating()},queue:function(e){C.debug("Queueing animation of",e),C.queuing=!0,w.one(b+".queue"+x,function(){C.queuing=!1,C.repaint(),C.animate.apply(this,m)})},complete:function(e){C.debug("Animation complete",m.animation),C.remove.completeCallback(),C.remove.failSafe(),C.is.looping()||(C.is.outward()?(C.verbose("Animation is outward, hiding element"),C.restore.conditions(),C.hide()):C.is.inward()?(C.verbose("Animation is outward, showing element"),C.restore.conditions(),C.show()):(C.verbose("Static animation completed"),C.restore.conditions(),m.onComplete.call(S)))},force:{visible:function(){var e=w.attr("style"),t=C.get.userStyle(),n=C.get.displayType(),o=t+"display: "+n+" !important;",a=w.css("display"),r=e===i||""===e;a!==n?(C.verbose("Overriding default display to show element",n),w.attr("style",o)):r&&w.removeAttr("style")},hidden:function(){var e=w.attr("style"),t=w.css("display"),n=e===i||""===e;"none"===t||C.is.hidden()?n&&w.removeAttr("style"):(C.verbose("Overriding default display to hide element"),w.css("display","none"))}},has:{direction:function(t){var n=!1;return"string"==typeof(t=t||m.animation)&&(t=t.split(" "),e.each(t,function(e,t){t!==h.inward&&t!==h.outward||(n=!0)})),n},inlineDisplay:function(){var t=w.attr("style")||"";return e.isArray(t.match(/display.*?;/,""))}},set:{animating:function(e){var t;C.remove.completeCallback(),e=e||m.animation,t=C.get.animationClass(e),C.save.animation(t),C.force.visible(),C.remove.hidden(),C.remove.direction(),C.start.animation(t)},duration:function(e,t){((t="number"==typeof(t=t||m.duration)?t+"ms":t)||0===t)&&(C.verbose("Setting animation duration",t),w.css({"animation-duration":t}))},direction:function(e){(e=e||C.get.direction())==h.inward?C.set.inward():C.set.outward()},looping:function(){C.debug("Transition set to loop"),w.addClass(h.looping)},hidden:function(){w.addClass(h.transition).addClass(h.hidden)},inward:function(){C.debug("Setting direction to inward"),w.removeClass(h.outward).addClass(h.inward)},outward:function(){C.debug("Setting direction to outward"),w.removeClass(h.inward).addClass(h.outward)},visible:function(){w.addClass(h.transition).addClass(h.visible)}},start:{animation:function(e){e=e||C.get.animationClass(),C.debug("Starting tween",e),w.addClass(e).one(b+".complete"+x,C.complete),m.useFailSafe&&C.add.failSafe(),C.set.duration(m.duration),m.onStart.call(S)}},save:{animation:function(e){C.cache||(C.cache={}),C.cache.animation=e},displayType:function(e){"none"!==e&&w.data(v.displayType,e)},transitionExists:function(t,n){e.fn.transition.exists[t]=n,C.verbose("Saving existence of transition",t,n)}},restore:{conditions:function(){var e=C.get.currentAnimation();e&&(w.removeClass(e),C.verbose("Removing animation class",C.cache)),C.remove.duration()}},add:{failSafe:function(){var e=C.get.duration();C.timer=setTimeout(function(){w.triggerHandler(b)},e+m.failSafeDelay),C.verbose("Adding fail safe timer",C.timer)}},remove:{animating:function(){w.removeClass(h.animating)},animationCallbacks:function(){C.remove.queueCallback(),C.remove.completeCallback()},queueCallback:function(){w.off(".queue"+x)},completeCallback:function(){w.off(".complete"+x)},display:function(){w.css("display","")},direction:function(){w.removeClass(h.inward).removeClass(h.outward)},duration:function(){w.css("animation-duration","")},failSafe:function(){C.verbose("Removing fail safe timer",C.timer),C.timer&&clearTimeout(C.timer)},hidden:function(){w.removeClass(h.hidden)},visible:function(){w.removeClass(h.visible)},looping:function(){C.debug("Transitions are no longer looping"),C.is.looping()&&(C.reset(),w.removeClass(h.looping))},transition:function(){w.removeClass(h.visible).removeClass(h.hidden)}},get:{settings:function(t,n,i){return"object"==typeof t?e.extend(!0,{},e.fn.transition.settings,t):"function"==typeof i?e.extend({},e.fn.transition.settings,{animation:t,onComplete:i,duration:n}):"string"==typeof n||"number"==typeof n?e.extend({},e.fn.transition.settings,{animation:t,duration:n}):"object"==typeof n?e.extend({},e.fn.transition.settings,n,{animation:t}):"function"==typeof n?e.extend({},e.fn.transition.settings,{animation:t,onComplete:n}):e.extend({},e.fn.transition.settings,{animation:t})},animationClass:function(e){var t=e||m.animation,n=C.can.transition()&&!C.has.direction()?C.get.direction()+" ":"";return h.animating+" "+h.transition+" "+n+t},currentAnimation:function(){return!(!C.cache||C.cache.animation===i)&&C.cache.animation},currentDirection:function(){return C.is.inward()?h.inward:h.outward},direction:function(){return C.is.hidden()||!C.is.visible()?h.inward:h.outward},animationDirection:function(t){var n;return"string"==typeof(t=t||m.animation)&&(t=t.split(" "),e.each(t,function(e,t){t===h.inward?n=h.inward:t===h.outward&&(n=h.outward)})),n||!1},duration:function(e){return!1===(e=e||m.duration)&&(e=w.css("animation-duration")||0),"string"==typeof e?e.indexOf("ms")>-1?parseFloat(e):1e3*parseFloat(e):e},displayType:function(e){return e=e===i||e,m.displayType?m.displayType:(e&&w.data(v.displayType)===i&&C.can.transition(!0),w.data(v.displayType))},userStyle:function(e){return(e=e||w.attr("style")||"").replace(/display.*?;/,"")},transitionExists:function(t){return e.fn.transition.exists[t]},animationStartEvent:function(){var e,t=n.createElement("div"),o={animation:"animationstart",OAnimation:"oAnimationStart",MozAnimation:"mozAnimationStart",WebkitAnimation:"webkitAnimationStart"};for(e in o)if(t.style[e]!==i)return o[e];return!1},animationEndEvent:function(){var e,t=n.createElement("div"),o={animation:"animationend",OAnimation:"oAnimationEnd",MozAnimation:"mozAnimationEnd",WebkitAnimation:"webkitAnimationEnd"};for(e in o)if(t.style[e]!==i)return o[e];return!1}},can:{transition:function(t){var n,o,a,r,s,l,c=m.animation,u=C.get.transitionExists(c),d=C.get.displayType(!1);if(u===i||t){if(C.verbose("Determining whether animation exists"),n=w.attr("class"),o=w.prop("tagName"),r=(a=e("<"+o+" />").addClass(n).insertAfter(w)).addClass(c).removeClass(h.inward).removeClass(h.outward).addClass(h.animating).addClass(h.transition).css("animationName"),s=a.addClass(h.inward).css("animationName"),d||(d=a.attr("class",n).removeAttr("style").removeClass(h.hidden).removeClass(h.visible).show().css("display"),C.verbose("Determining final display state",d),C.save.displayType(d)),a.remove(),r!=s)C.debug("Direction exists for animation",c),l=!0;else{if("none"==r||!r)return void C.debug("No animation defined in css",c);C.debug("Static animation found",c,d),l=!1}C.save.transitionExists(c,l)}return u!==i?u:l},animate:function(){return C.can.transition()!==i}},is:{animating:function(){return w.hasClass(h.animating)},inward:function(){return w.hasClass(h.inward)},outward:function(){return w.hasClass(h.outward)},looping:function(){return w.hasClass(h.looping)},occurring:function(e){return e="."+(e=e||m.animation).replace(" ","."),w.filter(e).length>0},visible:function(){return w.is(":visible")},hidden:function(){return"hidden"===w.css("visibility")},supported:function(){return!1!==b}},hide:function(){C.verbose("Hiding element"),C.is.animating()&&C.reset(),S.blur(),C.remove.display(),C.remove.visible(),C.set.hidden(),C.force.hidden(),m.onHide.call(S),m.onComplete.call(S)},show:function(e){C.verbose("Showing element",e),C.remove.hidden(),C.set.visible(),C.force.visible(),m.onShow.call(S),m.onComplete.call(S)},toggle:function(){C.is.visible()?C.hide():C.show()},stop:function(){C.debug("Stopping current animation"),w.triggerHandler(b)},stopAll:function(){C.debug("Stopping all animation"),C.remove.queueCallback(),w.triggerHandler(b)},clear:{queue:function(){C.debug("Clearing animation queue"),C.remove.queueCallback()}},enable:function(){C.verbose("Starting animation"),w.removeClass(h.disabled)},disable:function(){C.debug("Stopping animation"),w.addClass(h.disabled)},setting:function(t,n){if(C.debug("Changing setting",t,n),e.isPlainObject(t))e.extend(!0,m,t);else{if(n===i)return m[t];e.isPlainObject(m[t])?e.extend(!0,m[t],n):m[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,C,t);else{if(n===i)return C[t];C[t]=n}},debug:function(){!m.silent&&m.debug&&(m.performance?C.performance.log(arguments):(C.debug=Function.prototype.bind.call(console.info,console,m.name+":"),C.debug.apply(console,arguments)))},verbose:function(){!m.silent&&m.verbose&&m.debug&&(m.performance?C.performance.log(arguments):(C.verbose=Function.prototype.bind.call(console.info,console,m.name+":"),C.verbose.apply(console,arguments)))},error:function(){m.silent||(C.error=Function.prototype.bind.call(console.error,console,m.name+":"),C.error.apply(console,arguments))},performance:{log:function(e){var t,n;m.performance&&(n=(t=(new Date).getTime())-(s||t),s=t,l.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:S,"Execution Time":n})),clearTimeout(C.performance.timer),C.performance.timer=setTimeout(C.performance.display,500)},display:function(){var t=m.name+":",n=0;s=!1,clearTimeout(C.performance.timer),e.each(l,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",r&&(t+=" '"+r+"'"),a.length>1&&(t+=" ("+a.length+")"),(console.group!==i||console.table!==i)&&l.length>0&&(console.groupCollapsed(t),console.table?console.table(l):e.each(l,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),l=[]}},invoke:function(t,n,a){var r,s,l,c=g;return n=n||d,a=S||a,"string"==typeof t&&c!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(c[a])&&n!=r)c=c[a];else{if(c[a]!==i)return s=c[a],!1;if(!e.isPlainObject(c[o])||n==r)return c[o]!==i&&(s=c[o],!1);c=c[o]}})),e.isFunction(s)?l=s.apply(a,n):s!==i&&(l=s),e.isArray(o)?o.push(l):o!==i?o=[o,l]:l!==i&&(o=l),s!==i&&s}}).initialize()}),o!==i?o:this},e.fn.transition.exists={},e.fn.transition.settings={name:"Transition",silent:!1,debug:!1,verbose:!1,performance:!0,namespace:"transition",interval:0,reverse:"auto",onStart:function(){},onComplete:function(){},onShow:function(){},onHide:function(){},useFailSafe:!0,failSafeDelay:100,allowRepeats:!1,displayType:!1,animation:"fade",duration:!1,queue:!0,metadata:{displayType:"display"},className:{animating:"animating",disabled:"disabled",hidden:"hidden",inward:"in",loading:"loading",looping:"looping",outward:"out",transition:"transition",visible:"visible"},error:{noAnimation:"Element is no longer attached to DOM. Unable to animate.  Use silent setting to surpress this warning in production.",repeated:"That animation is already occurring, cancelling repeated animation",method:"The method you called is not defined",support:"This browser does not support CSS animations"}}}(jQuery,window,document),function(e,t,n,i){"use strict";t=void 0!==t&&t.Math==Math?t:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();e.api=e.fn.api=function(n){var o,a=e.isFunction(this)?e(t):e(this),r=a.selector||"",s=(new Date).getTime(),l=[],c=arguments[0],u="string"==typeof c,d=[].slice.call(arguments,1);return a.each(function(){var a,f,m,g,p,h,v=e.isPlainObject(n)?e.extend(!0,{},e.fn.api.settings,n):e.extend({},e.fn.api.settings),b=v.namespace,y=v.metadata,x=v.selector,C=v.error,w=v.className,S="."+b,k="module-"+b,T=e(this),A=T.closest(x.form),R=v.stateContext?e(v.stateContext):T,P=this,E=R[0],F=T.data(k);h={initialize:function(){u||h.bind.events(),h.instantiate()},instantiate:function(){h.verbose("Storing instance of module",h),F=h,T.data(k,F)},destroy:function(){h.verbose("Destroying previous module for",P),T.removeData(k).off(S)},bind:{events:function(){var e=h.get.event();e?(h.verbose("Attaching API events to element",e),T.on(e+S,h.event.trigger)):"now"==v.on&&(h.debug("Querying API endpoint immediately"),h.query())}},decode:{json:function(e){if(e!==i&&"string"==typeof e)try{e=JSON.parse(e)}catch(e){}return e}},read:{cachedResponse:function(e){var n;if(t.Storage!==i)return n=sessionStorage.getItem(e),h.debug("Using cached response",e,n),n=h.decode.json(n);h.error(C.noStorage)}},write:{cachedResponse:function(n,o){o&&""===o?h.debug("Response empty, not caching",o):t.Storage!==i?(e.isPlainObject(o)&&(o=JSON.stringify(o)),sessionStorage.setItem(n,o),h.verbose("Storing cached response for url",n,o)):h.error(C.noStorage)}},query:function(){if(h.is.disabled())h.debug("Element is disabled API request aborted");else{if(h.is.loading()){if(!v.interruptRequests)return void h.debug("Cancelling request, previous request is still pending");h.debug("Interrupting previous request"),h.abort()}if(v.defaultData&&e.extend(!0,v.urlData,h.get.defaultData()),v.serializeForm&&(v.data=h.add.formData(v.data)),!1===(f=h.get.settings()))return h.cancelled=!0,void h.error(C.beforeSend);if(h.cancelled=!1,(m=h.get.templatedURL())||h.is.mocked()){if((m=h.add.urlData(m))||h.is.mocked()){if(f.url=v.base+m,a=e.extend(!0,{},v,{type:v.method||v.type,data:g,url:v.base+m,beforeSend:v.beforeXHR,success:function(){},failure:function(){},complete:function(){}}),h.debug("Querying URL",a.url),h.verbose("Using AJAX settings",a),"local"===v.cache&&h.read.cachedResponse(m))return h.debug("Response returned from local cache"),h.request=h.create.request(),void h.request.resolveWith(E,[h.read.cachedResponse(m)]);v.throttle?v.throttleFirstRequest||h.timer?(h.debug("Throttling request",v.throttle),clearTimeout(h.timer),h.timer=setTimeout(function(){h.timer&&delete h.timer,h.debug("Sending throttled request",g,a.method),h.send.request()},v.throttle)):(h.debug("Sending request",g,a.method),h.send.request(),h.timer=setTimeout(function(){},v.throttle)):(h.debug("Sending request",g,a.method),h.send.request())}}else h.error(C.missingURL)}},should:{removeError:function(){return!0===v.hideError||"auto"===v.hideError&&!h.is.form()}},is:{disabled:function(){return T.filter(x.disabled).length>0},expectingJSON:function(){return"json"===v.dataType||"jsonp"===v.dataType},form:function(){return T.is("form")||R.is("form")},mocked:function(){return v.mockResponse||v.mockResponseAsync||v.response||v.responseAsync},input:function(){return T.is("input")},loading:function(){return!!h.request&&"pending"==h.request.state()},abortedRequest:function(e){return e&&e.readyState!==i&&0===e.readyState?(h.verbose("XHR request determined to be aborted"),!0):(h.verbose("XHR request was not aborted"),!1)},validResponse:function(t){return h.is.expectingJSON()&&e.isFunction(v.successTest)?(h.debug("Checking JSON returned success",v.successTest,t),v.successTest(t)?(h.debug("Response passed success test",t),!0):(h.debug("Response failed success test",t),!1)):(h.verbose("Response is not JSON, skipping validation",v.successTest,t),!0)}},was:{cancelled:function(){return h.cancelled||!1},succesful:function(){return h.request&&"resolved"==h.request.state()},failure:function(){return h.request&&"rejected"==h.request.state()},complete:function(){return h.request&&("resolved"==h.request.state()||"rejected"==h.request.state())}},add:{urlData:function(t,n){var o,a;return t&&(o=t.match(v.regExp.required),a=t.match(v.regExp.optional),n=n||v.urlData,o&&(h.debug("Looking for required URL variables",o),e.each(o,function(o,a){var r=-1!==a.indexOf("$")?a.substr(2,a.length-3):a.substr(1,a.length-2),s=e.isPlainObject(n)&&n[r]!==i?n[r]:T.data(r)!==i?T.data(r):R.data(r)!==i?R.data(r):n[r];if(s===i)return h.error(C.requiredParameter,r,t),t=!1,!1;h.verbose("Found required variable",r,s),s=v.encodeParameters?h.get.urlEncodedValue(s):s,t=t.replace(a,s)})),a&&(h.debug("Looking for optional URL variables",o),e.each(a,function(o,a){var r=-1!==a.indexOf("$")?a.substr(3,a.length-4):a.substr(2,a.length-3),s=e.isPlainObject(n)&&n[r]!==i?n[r]:T.data(r)!==i?T.data(r):R.data(r)!==i?R.data(r):n[r];s!==i?(h.verbose("Optional variable Found",r,s),t=t.replace(a,s)):(h.verbose("Optional variable not found",r),t=-1!==t.indexOf("/"+a)?t.replace("/"+a,""):t.replace(a,""))}))),t},formData:function(t){var n=e.fn.serializeObject!==i,o=n?A.serializeObject():A.serialize();return t=t||v.data,e.isPlainObject(t)?n?(h.debug("Extending existing data with form data",t,o),t=e.extend(!0,{},t,o)):(h.error(C.missingSerialize),h.debug("Cant extend data. Replacing data with form data",t,o),t=o):(h.debug("Adding form data",o),t=o),t}},send:{request:function(){h.set.loading(),h.request=h.create.request(),h.is.mocked()?h.mockedXHR=h.create.mockedXHR():h.xhr=h.create.xhr(),v.onRequest.call(E,h.request,h.xhr)}},event:{trigger:function(e){h.query(),"submit"!=e.type&&"click"!=e.type||e.preventDefault()},xhr:{always:function(){},done:function(t,n,i){var o=this,a=(new Date).getTime()-p,r=v.loadingDuration-a,s=!!e.isFunction(v.onResponse)&&(h.is.expectingJSON()?v.onResponse.call(o,e.extend(!0,{},t)):v.onResponse.call(o,t));r=r>0?r:0,s&&(h.debug("Modified API response in onResponse callback",v.onResponse,s,t),t=s),r>0&&h.debug("Response completed early delaying state change by",r),setTimeout(function(){h.is.validResponse(t)?h.request.resolveWith(o,[t,i]):h.request.rejectWith(o,[i,"invalid"])},r)},fail:function(e,t,n){var i=this,o=(new Date).getTime()-p,a=v.loadingDuration-o;(a=a>0?a:0)>0&&h.debug("Response completed early delaying state change by",a),setTimeout(function(){h.is.abortedRequest(e)?h.request.rejectWith(i,[e,"aborted",n]):h.request.rejectWith(i,[e,"error",t,n])},a)}},request:{done:function(e,t){h.debug("Successful API Response",e),"local"===v.cache&&m&&(h.write.cachedResponse(m,e),h.debug("Saving server response locally",h.cache)),v.onSuccess.call(E,e,T,t)},complete:function(e,t){var n,i;h.was.succesful()?(i=e,n=t):(n=e,i=h.get.responseFromXHR(n)),h.remove.loading(),v.onComplete.call(E,i,T,n)},fail:function(e,t,n){var o=h.get.responseFromXHR(e),r=h.get.errorFromRequest(o,t,n);if("aborted"==t)return h.debug("XHR Aborted (Most likely caused by page navigation or CORS Policy)",t,n),v.onAbort.call(E,t,T,e),!0;"invalid"==t?h.debug("JSON did not pass success test. A server-side error has most likely occurred",o):"error"==t&&e!==i&&(h.debug("XHR produced a server error",t,n),200!=e.status&&n!==i&&""!==n&&h.error(C.statusMessage+n,a.url),v.onError.call(E,r,T,e)),v.errorDuration&&"aborted"!==t&&(h.debug("Adding error state"),h.set.error(),h.should.removeError()&&setTimeout(h.remove.error,v.errorDuration)),h.debug("API Request failed",r,e),v.onFailure.call(E,o,T,e)}}},create:{request:function(){return e.Deferred().always(h.event.request.complete).done(h.event.request.done).fail(h.event.request.fail)},mockedXHR:function(){var t,n,i,o=v.mockResponse||v.response,a=v.mockResponseAsync||v.responseAsync;return i=e.Deferred().always(h.event.xhr.complete).done(h.event.xhr.done).fail(h.event.xhr.fail),o?(e.isFunction(o)?(h.debug("Using specified synchronous callback",o),n=o.call(E,f)):(h.debug("Using settings specified response",o),n=o),i.resolveWith(E,[n,!1,{responseText:n}])):e.isFunction(a)&&(t=function(e){h.debug("Async callback returned response",e),e?i.resolveWith(E,[e,!1,{responseText:e}]):i.rejectWith(E,[{responseText:e},!1,!1])},h.debug("Using specified async response callback",a),a.call(E,f,t)),i},xhr:function(){var t;return t=e.ajax(a).always(h.event.xhr.always).done(h.event.xhr.done).fail(h.event.xhr.fail),h.verbose("Created server request",t,a),t}},set:{error:function(){h.verbose("Adding error state to element",R),R.addClass(w.error)},loading:function(){h.verbose("Adding loading state to element",R),R.addClass(w.loading),p=(new Date).getTime()}},remove:{error:function(){h.verbose("Removing error state from element",R),R.removeClass(w.error)},loading:function(){h.verbose("Removing loading state from element",R),R.removeClass(w.loading)}},get:{responseFromXHR:function(t){return!!e.isPlainObject(t)&&(h.is.expectingJSON()?h.decode.json(t.responseText):t.responseText)},errorFromRequest:function(t,n,o){return e.isPlainObject(t)&&t.error!==i?t.error:v.error[n]!==i?v.error[n]:o},request:function(){return h.request||!1},xhr:function(){return h.xhr||!1},settings:function(){var t;return(t=v.beforeSend.call(E,v))&&(t.success!==i&&(h.debug("Legacy success callback detected",t),h.error(C.legacyParameters,t.success),t.onSuccess=t.success),t.failure!==i&&(h.debug("Legacy failure callback detected",t),h.error(C.legacyParameters,t.failure),t.onFailure=t.failure),t.complete!==i&&(h.debug("Legacy complete callback detected",t),h.error(C.legacyParameters,t.complete),t.onComplete=t.complete)),t===i&&h.error(C.noReturnedValue),!1===t?t:t!==i?e.extend(!0,{},t):e.extend(!0,{},v)},urlEncodedValue:function(e){var n=t.decodeURIComponent(e),i=t.encodeURIComponent(e);return n!==e?(h.debug("URL value is already encoded, avoiding double encoding",e),e):(h.verbose("Encoding value using encodeURIComponent",e,i),i)},defaultData:function(){var t={};return e.isWindow(P)||(h.is.input()?t.value=T.val():h.is.form()||(t.text=T.text())),t},event:function(){return e.isWindow(P)||"now"==v.on?(h.debug("API called without element, no events attached"),!1):"auto"==v.on?T.is("input")?P.oninput!==i?"input":P.onpropertychange!==i?"propertychange":"keyup":T.is("form")?"submit":"click":v.on},templatedURL:function(e){if(e=e||T.data(y.action)||v.action||!1,m=T.data(y.url)||v.url||!1)return h.debug("Using specified url",m),m;if(e){if(h.debug("Looking up url for action",e,v.api),v.api[e]===i&&!h.is.mocked())return void h.error(C.missingAction,v.action,v.api);m=v.api[e]}else h.is.form()&&(m=T.attr("action")||R.attr("action")||!1,h.debug("No url or action specified, defaulting to form action",m));return m}},abort:function(){var e=h.get.xhr();e&&"resolved"!==e.state()&&(h.debug("Cancelling API request"),e.abort())},reset:function(){h.remove.error(),h.remove.loading()},setting:function(t,n){if(h.debug("Changing setting",t,n),e.isPlainObject(t))e.extend(!0,v,t);else{if(n===i)return v[t];e.isPlainObject(v[t])?e.extend(!0,v[t],n):v[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,h,t);else{if(n===i)return h[t];h[t]=n}},debug:function(){!v.silent&&v.debug&&(v.performance?h.performance.log(arguments):(h.debug=Function.prototype.bind.call(console.info,console,v.name+":"),h.debug.apply(console,arguments)))},verbose:function(){!v.silent&&v.verbose&&v.debug&&(v.performance?h.performance.log(arguments):(h.verbose=Function.prototype.bind.call(console.info,console,v.name+":"),h.verbose.apply(console,arguments)))},error:function(){v.silent||(h.error=Function.prototype.bind.call(console.error,console,v.name+":"),h.error.apply(console,arguments))},performance:{log:function(e){var t,n;v.performance&&(n=(t=(new Date).getTime())-(s||t),s=t,l.push({Name:e[0],Arguments:[].slice.call(e,1)||"","Execution Time":n})),clearTimeout(h.performance.timer),h.performance.timer=setTimeout(h.performance.display,500)},display:function(){var t=v.name+":",n=0;s=!1,clearTimeout(h.performance.timer),e.each(l,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",r&&(t+=" '"+r+"'"),(console.group!==i||console.table!==i)&&l.length>0&&(console.groupCollapsed(t),console.table?console.table(l):e.each(l,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),l=[]}},invoke:function(t,n,a){var r,s,l,c=F;return n=n||d,a=P||a,"string"==typeof t&&c!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(c[a])&&n!=r)c=c[a];else{if(c[a]!==i)return s=c[a],!1;if(!e.isPlainObject(c[o])||n==r)return c[o]!==i?(s=c[o],!1):(h.error(C.method,t),!1);c=c[o]}})),e.isFunction(s)?l=s.apply(a,n):s!==i&&(l=s),e.isArray(o)?o.push(l):o!==i?o=[o,l]:l!==i&&(o=l),s}},u?(F===i&&h.initialize(),h.invoke(c)):(F!==i&&F.invoke("destroy"),h.initialize())}),o!==i?o:this},e.api.settings={name:"API",namespace:"api",debug:!1,verbose:!1,performance:!0,api:{},cache:!0,interruptRequests:!0,on:"auto",stateContext:!1,loadingDuration:0,hideError:"auto",errorDuration:2e3,encodeParameters:!0,action:!1,url:!1,base:"",urlData:{},defaultData:!0,serializeForm:!1,throttle:0,throttleFirstRequest:!0,method:"get",data:{},dataType:"json",mockResponse:!1,mockResponseAsync:!1,response:!1,responseAsync:!1,beforeSend:function(e){return e},beforeXHR:function(e){},onRequest:function(e,t){},onResponse:!1,onSuccess:function(e,t){},onComplete:function(e,t){},onFailure:function(e,t){},onError:function(e,t){},onAbort:function(e,t){},successTest:!1,error:{beforeSend:"The before send function has aborted the request",error:"There was an error with your request",exitConditions:"API Request Aborted. Exit conditions met",JSONParse:"JSON could not be parsed during error handling",legacyParameters:"You are using legacy API success callback names",method:"The method you called is not defined",missingAction:"API action used but no url was defined",missingSerialize:"jquery-serialize-object is required to add form data to an existing data object",missingURL:"No URL specified for api event",noReturnedValue:"The beforeSend callback must return a settings object, beforeSend ignored.",noStorage:"Caching responses locally requires session storage",parseError:"There was an error parsing your request",requiredParameter:"Missing a required URL parameter: ",statusMessage:"Server gave an error: ",timeout:"Your request timed out"},regExp:{required:/\{\$*[A-z0-9]+\}/g,optional:/\{\/\$*[A-z0-9]+\}/g},className:{loading:"loading",error:"error"},selector:{disabled:".disabled",form:"form"},metadata:{action:"action",url:"url"}}}(jQuery,window,document),function(e,t,n,i){"use strict";t=void 0!==t&&t.Math==Math?t:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")(),e.fn.visibility=function(o){var a,r=e(this),s=r.selector||"",l=(new Date).getTime(),c=[],u=arguments[0],d="string"==typeof u,f=[].slice.call(arguments,1),m=r.length,g=0;return r.each(function(){var r,p,h,v,b=e.isPlainObject(o)?e.extend(!0,{},e.fn.visibility.settings,o):e.extend({},e.fn.visibility.settings),y=b.className,x=b.namespace,C=b.error,w=b.metadata,S="."+x,k="module-"+x,T=e(t),A=e(this),R=e(b.context),P=(A.selector,A.data(k)),E=t.requestAnimationFrame||t.mozRequestAnimationFrame||t.webkitRequestAnimationFrame||t.msRequestAnimationFrame||function(e){setTimeout(e,0)},F=this,O=!1;v={initialize:function(){v.debug("Initializing",b),v.setup.cache(),v.should.trackChanges()&&("image"==b.type&&v.setup.image(),"fixed"==b.type&&v.setup.fixed(),b.observeChanges&&v.observeChanges(),v.bind.events()),v.save.position(),v.is.visible()||v.error(C.visible,A),b.initialCheck&&v.checkVisibility(),v.instantiate()},instantiate:function(){v.debug("Storing instance",v),A.data(k,v),P=v},destroy:function(){v.verbose("Destroying previous module"),h&&h.disconnect(),p&&p.disconnect(),T.off("load"+S,v.event.load).off("resize"+S,v.event.resize),R.off("scroll"+S,v.event.scroll).off("scrollchange"+S,v.event.scrollchange),"fixed"==b.type&&(v.resetFixed(),v.remove.placeholder()),A.off(S).removeData(k)},observeChanges:function(){"MutationObserver"in t&&(p=new MutationObserver(v.event.contextChanged),h=new MutationObserver(v.event.changed),p.observe(n,{childList:!0,subtree:!0}),h.observe(F,{childList:!0,subtree:!0}),v.debug("Setting up mutation observer",h))},bind:{events:function(){v.verbose("Binding visibility events to scroll and resize"),b.refreshOnLoad&&T.on("load"+S,v.event.load),T.on("resize"+S,v.event.resize),R.off("scroll"+S).on("scroll"+S,v.event.scroll).on("scrollchange"+S,v.event.scrollchange)}},event:{changed:function(e){v.verbose("DOM tree modified, updating visibility calculations"),v.timer=setTimeout(function(){v.verbose("DOM tree modified, updating sticky menu"),v.refresh()},100)},contextChanged:function(t){[].forEach.call(t,function(t){t.removedNodes&&[].forEach.call(t.removedNodes,function(t){(t==F||e(t).find(F).length>0)&&(v.debug("Element removed from DOM, tearing down events"),v.destroy())})})},resize:function(){v.debug("Window resized"),b.refreshOnResize&&E(v.refresh)},load:function(){v.debug("Page finished loading"),E(v.refresh)},scroll:function(){b.throttle?(clearTimeout(v.timer),v.timer=setTimeout(function(){R.triggerHandler("scrollchange"+S,[R.scrollTop()])},b.throttle)):E(function(){R.triggerHandler("scrollchange"+S,[R.scrollTop()])})},scrollchange:function(e,t){v.checkVisibility(t)}},precache:function(t,i){t instanceof Array||(t=[t]);for(var o=t.length,a=0,r=[],s=n.createElement("img"),l=function(){++a>=t.length&&e.isFunction(i)&&i()};o--;)(s=n.createElement("img")).onload=l,s.onerror=l,s.src=t[o],r.push(s)},enableCallbacks:function(){v.debug("Allowing callbacks to occur"),O=!1},disableCallbacks:function(){v.debug("Disabling all callbacks temporarily"),O=!0},should:{trackChanges:function(){return d?(v.debug("One time query, no need to bind events"),!1):(v.debug("Callbacks being attached"),!0)}},setup:{cache:function(){v.cache={occurred:{},screen:{},element:{}}},image:function(){var e=A.data(w.src);e&&(v.verbose("Lazy loading image",e),b.once=!0,b.observeChanges=!1,b.onOnScreen=function(){v.debug("Image on screen",F),v.precache(e,function(){v.set.image(e,function(){++g==m&&b.onAllLoaded.call(this),b.onLoad.call(this)})})})},fixed:function(){v.debug("Setting up fixed"),b.once=!1,b.observeChanges=!1,b.initialCheck=!0,b.refreshOnLoad=!0,o.transition||(b.transition=!1),v.create.placeholder(),v.debug("Added placeholder",r),b.onTopPassed=function(){v.debug("Element passed, adding fixed position",A),v.show.placeholder(),v.set.fixed(),b.transition&&e.fn.transition!==i&&A.transition(b.transition,b.duration)},b.onTopPassedReverse=function(){v.debug("Element returned to position, removing fixed",A),v.hide.placeholder(),v.remove.fixed()}}},create:{placeholder:function(){v.verbose("Creating fixed position placeholder"),r=A.clone(!1).css("display","none").addClass(y.placeholder).insertAfter(A)}},show:{placeholder:function(){v.verbose("Showing placeholder"),r.css("display","block").css("visibility","hidden")}},hide:{placeholder:function(){v.verbose("Hiding placeholder"),r.css("display","none").css("visibility","")}},set:{fixed:function(){v.verbose("Setting element to fixed position"),A.addClass(y.fixed).css({position:"fixed",top:b.offset+"px",left:"auto",zIndex:b.zIndex}),b.onFixed.call(F)},image:function(t,n){if(A.attr("src",t),b.transition)if(e.fn.transition!==i){if(A.hasClass(y.visible))return void v.debug("Transition already occurred on this image, skipping animation");A.transition(b.transition,b.duration,n)}else A.fadeIn(b.duration,n);else A.show()}},is:{onScreen:function(){return v.get.elementCalculations().onScreen},offScreen:function(){return v.get.elementCalculations().offScreen},visible:function(){return!(!v.cache||!v.cache.element)&&!(0===v.cache.element.width&&0===v.cache.element.offset.top)},verticallyScrollableContext:function(){var e=R.get(0)!==t&&R.css("overflow-y");return"auto"==e||"scroll"==e},horizontallyScrollableContext:function(){var e=R.get(0)!==t&&R.css("overflow-x");return"auto"==e||"scroll"==e}},refresh:function(){v.debug("Refreshing constants (width/height)"),"fixed"==b.type&&v.resetFixed(),v.reset(),v.save.position(),b.checkOnRefresh&&v.checkVisibility(),b.onRefresh.call(F)},resetFixed:function(){v.remove.fixed(),v.remove.occurred()},reset:function(){v.verbose("Resetting all cached values"),e.isPlainObject(v.cache)&&(v.cache.screen={},v.cache.element={})},checkVisibility:function(e){v.verbose("Checking visibility of element",v.cache.element),!O&&v.is.visible()&&(v.save.scroll(e),v.save.calculations(),v.passed(),v.passingReverse(),v.topVisibleReverse(),v.bottomVisibleReverse(),v.topPassedReverse(),v.bottomPassedReverse(),v.onScreen(),v.offScreen(),v.passing(),v.topVisible(),v.bottomVisible(),v.topPassed(),v.bottomPassed(),b.onUpdate&&b.onUpdate.call(F,v.get.elementCalculations()))},passed:function(t,n){var o=v.get.elementCalculations();if(t&&n)b.onPassed[t]=n;else{if(t!==i)return v.get.pixelsPassed(t)>o.pixelsPassed;o.passing&&e.each(b.onPassed,function(e,t){o.bottomVisible||o.pixelsPassed>v.get.pixelsPassed(e)?v.execute(t,e):b.once||v.remove.occurred(t)})}},onScreen:function(e){var t=v.get.elementCalculations(),n=e||b.onOnScreen,o="onScreen";if(e&&(v.debug("Adding callback for onScreen",e),b.onOnScreen=e),t.onScreen?v.execute(n,o):b.once||v.remove.occurred(o),e!==i)return t.onOnScreen},offScreen:function(e){var t=v.get.elementCalculations(),n=e||b.onOffScreen,o="offScreen";if(e&&(v.debug("Adding callback for offScreen",e),b.onOffScreen=e),t.offScreen?v.execute(n,o):b.once||v.remove.occurred(o),e!==i)return t.onOffScreen},passing:function(e){var t=v.get.elementCalculations(),n=e||b.onPassing,o="passing";if(e&&(v.debug("Adding callback for passing",e),b.onPassing=e),t.passing?v.execute(n,o):b.once||v.remove.occurred(o),e!==i)return t.passing},topVisible:function(e){var t=v.get.elementCalculations(),n=e||b.onTopVisible,o="topVisible";if(e&&(v.debug("Adding callback for top visible",e),b.onTopVisible=e),t.topVisible?v.execute(n,o):b.once||v.remove.occurred(o),e===i)return t.topVisible},bottomVisible:function(e){var t=v.get.elementCalculations(),n=e||b.onBottomVisible,o="bottomVisible";if(e&&(v.debug("Adding callback for bottom visible",e),b.onBottomVisible=e),t.bottomVisible?v.execute(n,o):b.once||v.remove.occurred(o),e===i)return t.bottomVisible},topPassed:function(e){var t=v.get.elementCalculations(),n=e||b.onTopPassed,o="topPassed";if(e&&(v.debug("Adding callback for top passed",e),b.onTopPassed=e),t.topPassed?v.execute(n,o):b.once||v.remove.occurred(o),e===i)return t.topPassed},bottomPassed:function(e){var t=v.get.elementCalculations(),n=e||b.onBottomPassed,o="bottomPassed";if(e&&(v.debug("Adding callback for bottom passed",e),b.onBottomPassed=e),t.bottomPassed?v.execute(n,o):b.once||v.remove.occurred(o),e===i)return t.bottomPassed},passingReverse:function(e){var t=v.get.elementCalculations(),n=e||b.onPassingReverse,o="passingReverse";if(e&&(v.debug("Adding callback for passing reverse",e),b.onPassingReverse=e),t.passing?b.once||v.remove.occurred(o):v.get.occurred("passing")&&v.execute(n,o),e!==i)return!t.passing},topVisibleReverse:function(e){var t=v.get.elementCalculations(),n=e||b.onTopVisibleReverse,o="topVisibleReverse";if(e&&(v.debug("Adding callback for top visible reverse",e),b.onTopVisibleReverse=e),t.topVisible?b.once||v.remove.occurred(o):v.get.occurred("topVisible")&&v.execute(n,o),e===i)return!t.topVisible},bottomVisibleReverse:function(e){var t=v.get.elementCalculations(),n=e||b.onBottomVisibleReverse,o="bottomVisibleReverse";if(e&&(v.debug("Adding callback for bottom visible reverse",e),b.onBottomVisibleReverse=e),t.bottomVisible?b.once||v.remove.occurred(o):v.get.occurred("bottomVisible")&&v.execute(n,o),e===i)return!t.bottomVisible},topPassedReverse:function(e){var t=v.get.elementCalculations(),n=e||b.onTopPassedReverse,o="topPassedReverse";if(e&&(v.debug("Adding callback for top passed reverse",e),b.onTopPassedReverse=e),t.topPassed?b.once||v.remove.occurred(o):v.get.occurred("topPassed")&&v.execute(n,o),e===i)return!t.onTopPassed},bottomPassedReverse:function(e){var t=v.get.elementCalculations(),n=e||b.onBottomPassedReverse,o="bottomPassedReverse";if(e&&(v.debug("Adding callback for bottom passed reverse",e),b.onBottomPassedReverse=e),t.bottomPassed?b.once||v.remove.occurred(o):v.get.occurred("bottomPassed")&&v.execute(n,o),e===i)return!t.bottomPassed},execute:function(e,t){var n=v.get.elementCalculations(),i=v.get.screenCalculations();(e=e||!1)&&(b.continuous?(v.debug("Callback being called continuously",t,n),e.call(F,n,i)):v.get.occurred(t)||(v.debug("Conditions met",t,n),e.call(F,n,i))),v.save.occurred(t)},remove:{fixed:function(){v.debug("Removing fixed position"),A.removeClass(y.fixed).css({position:"",top:"",left:"",zIndex:""}),b.onUnfixed.call(F)},placeholder:function(){v.debug("Removing placeholder content"),r&&r.remove()},occurred:function(e){if(e){var t=v.cache.occurred;t[e]!==i&&!0===t[e]&&(v.debug("Callback can now be called again",e),v.cache.occurred[e]=!1)}else v.cache.occurred={}}},save:{calculations:function(){v.verbose("Saving all calculations necessary to determine positioning"),v.save.direction(),v.save.screenCalculations(),v.save.elementCalculations()},occurred:function(e){e&&(v.cache.occurred[e]!==i&&!0===v.cache.occurred[e]||(v.verbose("Saving callback occurred",e),v.cache.occurred[e]=!0))},scroll:function(e){e=e+b.offset||R.scrollTop()+b.offset,v.cache.scroll=e},direction:function(){var e,t=v.get.scroll(),n=v.get.lastScroll();return e=t>n&&n?"down":t<n&&n?"up":"static",v.cache.direction=e,v.cache.direction},elementPosition:function(){var e=v.cache.element,t=v.get.screenSize();return v.verbose("Saving element position"),e.fits=e.height<t.height,e.offset=A.offset(),e.width=A.outerWidth(),e.height=A.outerHeight(),v.is.verticallyScrollableContext()&&(e.offset.top+=R.scrollTop()-R.offset().top),v.is.horizontallyScrollableContext()&&(e.offset.left+=R.scrollLeft-R.offset().left),v.cache.element=e,e},elementCalculations:function(){var e=v.get.screenCalculations(),t=v.get.elementPosition();return b.includeMargin?(t.margin={},t.margin.top=parseInt(A.css("margin-top"),10),t.margin.bottom=parseInt(A.css("margin-bottom"),10),t.top=t.offset.top-t.margin.top,t.bottom=t.offset.top+t.height+t.margin.bottom):(t.top=t.offset.top,t.bottom=t.offset.top+t.height),t.topPassed=e.top>=t.top,t.bottomPassed=e.top>=t.bottom,t.topVisible=e.bottom>=t.top&&!t.topPassed,t.bottomVisible=e.bottom>=t.bottom&&!t.bottomPassed,t.pixelsPassed=0,t.percentagePassed=0,t.onScreen=(t.topVisible||t.passing)&&!t.bottomPassed,t.passing=t.topPassed&&!t.bottomPassed,t.offScreen=!t.onScreen,t.passing&&(t.pixelsPassed=e.top-t.top,t.percentagePassed=(e.top-t.top)/t.height),v.cache.element=t,v.verbose("Updated element calculations",t),t},screenCalculations:function(){var e=v.get.scroll();return v.save.direction(),v.cache.screen.top=e,v.cache.screen.bottom=e+v.cache.screen.height,v.cache.screen},screenSize:function(){v.verbose("Saving window position"),v.cache.screen={height:R.height()}},position:function(){v.save.screenSize(),v.save.elementPosition()}},get:{pixelsPassed:function(e){var t=v.get.elementCalculations();return e.search("%")>-1?t.height*(parseInt(e,10)/100):parseInt(e,10)},occurred:function(e){return v.cache.occurred!==i&&v.cache.occurred[e]||!1},direction:function(){return v.cache.direction===i&&v.save.direction(),v.cache.direction},elementPosition:function(){return v.cache.element===i&&v.save.elementPosition(),v.cache.element},elementCalculations:function(){return v.cache.element===i&&v.save.elementCalculations(),v.cache.element},screenCalculations:function(){return v.cache.screen===i&&v.save.screenCalculations(),v.cache.screen},screenSize:function(){return v.cache.screen===i&&v.save.screenSize(),v.cache.screen},scroll:function(){return v.cache.scroll===i&&v.save.scroll(),v.cache.scroll},lastScroll:function(){return v.cache.screen===i?(v.debug("First scroll event, no last scroll could be found"),!1):v.cache.screen.top}},setting:function(t,n){if(e.isPlainObject(t))e.extend(!0,b,t);else{if(n===i)return b[t];b[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,v,t);else{if(n===i)return v[t];v[t]=n}},debug:function(){!b.silent&&b.debug&&(b.performance?v.performance.log(arguments):(v.debug=Function.prototype.bind.call(console.info,console,b.name+":"),v.debug.apply(console,arguments)))},verbose:function(){!b.silent&&b.verbose&&b.debug&&(b.performance?v.performance.log(arguments):(v.verbose=Function.prototype.bind.call(console.info,console,b.name+":"),v.verbose.apply(console,arguments)))},error:function(){b.silent||(v.error=Function.prototype.bind.call(console.error,console,b.name+":"),v.error.apply(console,arguments))},performance:{log:function(e){var t,n;b.performance&&(n=(t=(new Date).getTime())-(l||t),l=t,c.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:F,"Execution Time":n})),clearTimeout(v.performance.timer),v.performance.timer=setTimeout(v.performance.display,500)},display:function(){var t=b.name+":",n=0;l=!1,clearTimeout(v.performance.timer),e.each(c,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",s&&(t+=" '"+s+"'"),(console.group!==i||console.table!==i)&&c.length>0&&(console.groupCollapsed(t),console.table?console.table(c):e.each(c,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),c=[]}},invoke:function(t,n,o){var r,s,l,c=P;return n=n||f,o=F||o,"string"==typeof t&&c!==i&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,o){var a=n!=r?o+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(c[a])&&n!=r)c=c[a];else{if(c[a]!==i)return s=c[a],!1;if(!e.isPlainObject(c[o])||n==r)return c[o]!==i?(s=c[o],!1):(v.error(C.method,t),!1);c=c[o]}})),e.isFunction(s)?l=s.apply(o,n):s!==i&&(l=s),e.isArray(a)?a.push(l):a!==i?a=[a,l]:l!==i&&(a=l),s}},d?(P===i&&v.initialize(),P.save.scroll(),P.save.calculations(),v.invoke(u)):(P!==i&&P.invoke("destroy"),v.initialize())}),a!==i?a:this},e.fn.visibility.settings={name:"Visibility",namespace:"visibility",debug:!1,verbose:!1,performance:!0,observeChanges:!0,initialCheck:!0,refreshOnLoad:!0,refreshOnResize:!0,checkOnRefresh:!0,once:!0,continuous:!1,offset:0,includeMargin:!1,context:t,throttle:!1,type:!1,zIndex:"10",transition:"fade in",duration:1e3,onPassed:{},onOnScreen:!1,onOffScreen:!1,onPassing:!1,onTopVisible:!1,onBottomVisible:!1,onTopPassed:!1,onBottomPassed:!1,onPassingReverse:!1,onTopVisibleReverse:!1,onBottomVisibleReverse:!1,onTopPassedReverse:!1,onBottomPassedReverse:!1,onLoad:function(){},onAllLoaded:function(){},onFixed:function(){},onUnfixed:function(){},onUpdate:!1,onRefresh:function(){},metadata:{src:"src"},className:{fixed:"fixed",placeholder:"placeholder",visible:"visible"},error:{method:"The method you called is not defined.",visible:"Element is hidden, you must call refresh after element becomes visible"}}}(jQuery,window,document);

/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */


console.log('Aqui abajo esta el app.js personal');

$(document).ready(function(){
    $("#table_id").DataTable({
        "order": [[ 0, "asc" ]],
        "language": {
            "sProcessing":    "Procesando...",
            "sLengthMenu":    "Mostrar _MENU_ registros",
            "sZeroRecords":   "No se encontraron resultados",
            "sEmptyTable":    "Ningún dato disponible en esta tabla",
            "sInfo":          "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "sInfoEmpty":     "Mostrando registros del 0 al 0 de un total de 0 registros",
            "sInfoFiltered":  "(filtrado de un total de _MAX_ registros)",
            "sInfoPostFix":   "",
            "sSearch":        "Buscar:",
            "sUrl":           "",
            "sInfoThousands":  ",",
            "sLoadingRecords": "Cargando...",
            "oPaginate": {
                "sFirst":    "Primero",
                "sLast":    "Último",
                "sNext":    "Siguiente",
                "sPrevious": "Anterior"
            },
            "oAria": {
                "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
                "sSortDescending": ": Activar para ordenar la columna de manera descendente"
            }
        }
    });
});
