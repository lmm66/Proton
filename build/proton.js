(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Proton = factory());
}(this, (function () { 'use strict';

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

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;

    _setPrototypeOf(subClass, superClass);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  var WebGLUtil = {
    /**
     * @memberof Proton#Proton.WebGLUtil
     * @method ipot
     *
     * @todo add description
     * @todo add length description
     *
     * @param {Number} length
     *
     * @return {Boolean}
     */
    ipot: function ipot(length) {
      return (length & length - 1) === 0;
    },

    /**
     * @memberof Proton#Proton.WebGLUtil
     * @method nhpot
     *
     * @todo add description
     * @todo add length description
     *
     * @param {Number} length
     *
     * @return {Number}
     */
    nhpot: function nhpot(length) {
      --length;

      for (var i = 1; i < 32; i <<= 1) {
        length = length | length >> i;
      }

      return length + 1;
    },

    /**
     * @memberof Proton#Proton.WebGLUtil
     * @method makeTranslation
     *
     * @todo add description
     * @todo add tx, ty description
     * @todo add return description
     *
     * @param {Number} tx either 0 or 1
     * @param {Number} ty either 0 or 1
     *
     * @return {Object}
     */
    makeTranslation: function makeTranslation(tx, ty) {
      return [1, 0, 0, 0, 1, 0, tx, ty, 1];
    },

    /**
     * @memberof Proton#Proton.WebGLUtil
     * @method makeRotation
     *
     * @todo add description
     * @todo add return description
     *
     * @param {Number} angleInRadians
     *
     * @return {Object}
     */
    makeRotation: function makeRotation(angleInRadians) {
      var c = Math.cos(angleInRadians);
      var s = Math.sin(angleInRadians);
      return [c, -s, 0, s, c, 0, 0, 0, 1];
    },

    /**
     * @memberof Proton#Proton.WebGLUtil
     * @method makeScale
     *
     * @todo add description
     * @todo add tx, ty description
     * @todo add return description
     *
     * @param {Number} sx either 0 or 1
     * @param {Number} sy either 0 or 1
     *
     * @return {Object}
     */
    makeScale: function makeScale(sx, sy) {
      return [sx, 0, 0, 0, sy, 0, 0, 0, 1];
    },

    /**
     * @memberof Proton#Proton.WebGLUtil
     * @method matrixMultiply
     *
     * @todo add description
     * @todo add a, b description
     * @todo add return description
     *
     * @param {Object} a
     * @param {Object} b
     *
     * @return {Object}
     */
    matrixMultiply: function matrixMultiply(a, b) {
      var a00 = a[0 * 3 + 0];
      var a01 = a[0 * 3 + 1];
      var a02 = a[0 * 3 + 2];
      var a10 = a[1 * 3 + 0];
      var a11 = a[1 * 3 + 1];
      var a12 = a[1 * 3 + 2];
      var a20 = a[2 * 3 + 0];
      var a21 = a[2 * 3 + 1];
      var a22 = a[2 * 3 + 2];
      var b00 = b[0 * 3 + 0];
      var b01 = b[0 * 3 + 1];
      var b02 = b[0 * 3 + 2];
      var b10 = b[1 * 3 + 0];
      var b11 = b[1 * 3 + 1];
      var b12 = b[1 * 3 + 2];
      var b20 = b[2 * 3 + 0];
      var b21 = b[2 * 3 + 1];
      var b22 = b[2 * 3 + 2];
      return [a00 * b00 + a01 * b10 + a02 * b20, a00 * b01 + a01 * b11 + a02 * b21, a00 * b02 + a01 * b12 + a02 * b22, a10 * b00 + a11 * b10 + a12 * b20, a10 * b01 + a11 * b11 + a12 * b21, a10 * b02 + a11 * b12 + a12 * b22, a20 * b00 + a21 * b10 + a22 * b20, a20 * b01 + a21 * b11 + a22 * b21, a20 * b02 + a21 * b12 + a22 * b22];
    }
  };

  var DomUtil = {
    /**
     * Creates and returns a new canvas. The opacity is by default set to 0
     *
     * @memberof Proton#Proton.DomUtil
     * @method createCanvas
     *
     * @param {String} $id the canvas' id
     * @param {Number} $width the canvas' width
     * @param {Number} $height the canvas' height
     * @param {String} [$position=absolute] the canvas' position, default is 'absolute'
     *
     * @return {Object}
     */
    createCanvas: function createCanvas(id, width, height, position) {
      if (position === void 0) {
        position = "absolute";
      }

      var dom = document.createElement("canvas");
      dom.id = id;
      dom.width = width;
      dom.height = height;
      dom.style.opacity = 0;
      dom.style.position = position;
      this.transform(dom, -500, -500, 0, 0);
      return dom;
    },
    createDiv: function createDiv(id, width, height) {
      var dom = document.createElement("div");
      dom.id = id;
      dom.style.position = "absolute";
      this.resize(dom, width, height);
      return dom;
    },
    resize: function resize(dom, width, height) {
      dom.style.width = width + "px";
      dom.style.height = height + "px";
      dom.style.marginLeft = -width / 2 + "px";
      dom.style.marginTop = -height / 2 + "px";
    },

    /**
     * Adds a transform: translate(), scale(), rotate() to a given div dom for all browsers
     *
     * @memberof Proton#Proton.DomUtil
     * @method transform
     *
     * @param {HTMLDivElement} div
     * @param {Number} $x
     * @param {Number} $y
     * @param {Number} $scale
     * @param {Number} $rotate
     */
    transform: function transform(div, x, y, scale, rotate) {
      div.style.willChange = "transform";
      var transform = "translate(" + x + "px, " + y + "px) scale(" + scale + ") rotate(" + rotate + "deg)";
      this.css3(div, "transform", transform);
    },
    transform3d: function transform3d(div, x, y, scale, rotate) {
      div.style.willChange = "transform";
      var transform = "translate3d(" + x + "px, " + y + "px, 0) scale(" + scale + ") rotate(" + rotate + "deg)";
      this.css3(div, "backfaceVisibility", "hidden");
      this.css3(div, "transform", transform);
    },
    css3: function css3(div, key, val) {
      var bkey = key.charAt(0).toUpperCase() + key.substr(1);
      div.style["Webkit" + bkey] = val;
      div.style["Moz" + bkey] = val;
      div.style["O" + bkey] = val;
      div.style["ms" + bkey] = val;
      div.style["" + key] = val;
    }
  };

  var imgsCache = {};
  var canvasCache = {};
  var canvasId = 0;
  var ImgUtil = {
    /**
     * This will get the image data. It could be necessary to create a Proton.Zone.
     *
     * @memberof Proton#Proton.Util
     * @method getImageData
     *
     * @param {HTMLCanvasElement}   context any canvas, must be a 2dContext 'canvas.getContext('2d')'
     * @param {Object}              image   could be any dom image, e.g. document.getElementById('thisIsAnImgTag');
     * @param {Proton.Rectangle}    rect
     */
    getImageData: function getImageData(context, image, rect) {
      context.drawImage(image, rect.x, rect.y);
      var imagedata = context.getImageData(rect.x, rect.y, rect.width, rect.height);
      context.clearRect(rect.x, rect.y, rect.width, rect.height);
      return imagedata;
    },

    /**
     * @memberof Proton#Proton.Util
     * @method getImgFromCache
     *
     * @todo add description
     * @todo describe func
     *
     * @param {Mixed}               img
     * @param {Proton.Particle}     particle
     * @param {Boolean}             drawCanvas  set to true if a canvas should be saved into particle.data.canvas
     * @param {Boolean}             func
     */
    getImgFromCache: function getImgFromCache(img, callback, param) {
      var src = typeof img === "string" ? img : img.src;

      if (imgsCache[src]) {
        callback(imgsCache[src], param);
      } else {
        var image = new Image();

        image.onload = function (e) {
          imgsCache[src] = e.target;
          callback(imgsCache[src], param);
        };

        image.src = src;
      }
    },
    getCanvasFromCache: function getCanvasFromCache(img, callback, param) {
      var src = img.src;

      if (!canvasCache[src]) {
        var width = WebGLUtil.nhpot(img.width);
        var height = WebGLUtil.nhpot(img.height);
        var canvas = DomUtil.createCanvas("proton_canvas_cache_" + ++canvasId, width, height);
        var context = canvas.getContext("2d");
        context.drawImage(img, 0, 0, img.width, img.height);
        canvasCache[src] = canvas;
      }

      callback && callback(canvasCache[src], param);
      return canvasCache[src];
    }
  };

  var Util = {
    /**
     * Returns the default if the value is null or undefined
     *
     * @memberof Proton#Proton.Util
     * @method initValue
     *
     * @param {Mixed} value a specific value, could be everything but null or undefined
     * @param {Mixed} defaults the default if the value is null or undefined
     */
    initValue: function initValue(value, defaults) {
      value = value !== null && value !== undefined ? value : defaults;
      return value;
    },

    /**
     * Checks if the value is a valid array
     *
     * @memberof Proton#Proton.Util
     * @method isArray
     *
     * @param {Array} value Any array
     *
     * @returns {Boolean}
     */
    isArray: function isArray(value) {
      return Object.prototype.toString.call(value) === "[object Array]";
    },

    /**
     * Destroyes the given array
     *
     * @memberof Proton#Proton.Util
     * @method emptyArray
     *
     * @param {Array} array Any array
     */
    emptyArray: function emptyArray(arr) {
      if (arr) arr.length = 0;
    },
    toArray: function toArray(arr) {
      return this.isArray(arr) ? arr : [arr];
    },
    getRandFromArray: function getRandFromArray(arr) {
      if (!arr) return null;
      return arr[Math.floor(arr.length * Math.random())];
    },

    /**
     * Destroyes the given object
     *
     * @memberof Proton#Proton.Util
     * @method emptyObject
     *
     * @param {Object} obj Any object
     */
    emptyObject: function emptyObject(obj, ignore) {
      if (ignore === void 0) {
        ignore = null;
      }

      for (var key in obj) {
        if (ignore && ignore.indexOf(key) > -1) continue;
        delete obj[key];
      }
    },

    /**
     * Makes an instance of a class and binds the given array
     *
     * @memberof Proton#Proton.Util
     * @method classApply
     *
     * @param {Function} constructor A class to make an instance from
     * @param {Array} [args] Any array to bind it to the constructor
     *
     * @return {Object} The instance of constructor, optionally bind with args
     */
    classApply: function classApply(constructor, args) {
      if (args === void 0) {
        args = null;
      }

      if (!args) {
        return new constructor();
      } else {
        var FactoryFunc = constructor.bind.apply(constructor, [null].concat(args));
        return new FactoryFunc();
      }
    },

    /**
     * This will get the image data. It could be necessary to create a Proton.Zone.
     *
     * @memberof Proton#Proton.Util
     * @method getImageData
     *
     * @param {HTMLCanvasElement}   context any canvas, must be a 2dContext 'canvas.getContext('2d')'
     * @param {Object}              image   could be any dom image, e.g. document.getElementById('thisIsAnImgTag');
     * @param {Proton.Rectangle}    rect
     */
    getImageData: function getImageData(context, image, rect) {
      return ImgUtil.getImageData(context, image, rect);
    },
    destroyAll: function destroyAll(arr, param) {
      if (param === void 0) {
        param = null;
      }

      var i = arr.length;

      while (i--) {
        try {
          arr[i].destroy(param);
        } catch (e) {}

        delete arr[i];
      }

      arr.length = 0;
    },
    assign: function assign(target, source) {
      if (typeof Object.assign !== "function") {
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }

        return target;
      } else {
        return Object.assign(target, source);
      }
    }
  };

  var idsMap = {};
  var Puid = {
    _index: 0,
    _cache: {},
    id: function id(type) {
      if (idsMap[type] === undefined || idsMap[type] === null) idsMap[type] = 0;
      return type + "_" + idsMap[type]++;
    },
    getId: function getId(target) {
      var uid = this.getIdFromCache(target);
      if (uid) return uid;
      uid = "PUID_" + this._index++;
      this._cache[uid] = target;
      return uid;
    },
    getIdFromCache: function getIdFromCache(target) {
      var obj, id;

      for (id in this._cache) {
        obj = this._cache[id];
        if (obj === target) return id;
        if (this.isBody(obj, target) && obj.src === target.src) return id;
      }

      return null;
    },
    isBody: function isBody(obj, target) {
      return typeof obj === "object" && typeof target === "object" && obj.isInner && target.isInner;
    },
    getTarget: function getTarget(uid) {
      return this._cache[uid];
    }
  };

  /**
   * Pool is the cache pool of the proton engine, it is very important.
   *
   * get(target, params, uid)
   *  Class
   *    uid = Puid.getId -> Puid save target cache
   *    target.__puid = uid
   *
   *  body
   *    uid = Puid.getId -> Puid save target cache
   *
   *
   * expire(target)
   *  cache[target.__puid] push target
   *
   */

  var Pool = /*#__PURE__*/function () {
    /**
     * @memberof! Proton#
     * @constructor
     * @alias Proton.Pool
     *
     * @todo add description
     * @todo add description of properties
     *
     * @property {Number} total
     * @property {Object} cache
     */
    function Pool(num) {
      this.total = 0;
      this.cache = {};
    }
    /**
     * @todo add description
     *
     * @method get
     * @memberof Proton#Proton.Pool
     *
     * @param {Object|Function} target
     * @param {Object} [params] just add if `target` is a function
     *
     * @return {Object}
     */


    var _proto = Pool.prototype;

    _proto.get = function get(target, params, uid) {
      var p;
      uid = uid || target.__puid || Puid.getId(target);

      if (this.cache[uid] && this.cache[uid].length > 0) {
        p = this.cache[uid].pop();
      } else {
        p = this.createOrClone(target, params);
      }

      p.__puid = target.__puid || uid;
      return p;
    }
    /**
     * @todo add description
     *
     * @method set
     * @memberof Proton#Proton.Pool
     *
     * @param {Object} target
     *
     * @return {Object}
     */
    ;

    _proto.expire = function expire(target) {
      return this.getCache(target.__puid).push(target);
    }
    /**
     * Creates a new class instance
     *
     * @todo add more documentation
     *
     * @method create
     * @memberof Proton#Proton.Pool
     *
     * @param {Object|Function} target any Object or Function
     * @param {Object} [params] just add if `target` is a function
     *
     * @return {Object}
     */
    ;

    _proto.createOrClone = function createOrClone(target, params) {
      this.total++;

      if (this.create) {
        return this.create(target, params);
      } else if (typeof target === "function") {
        return Util.classApply(target, params);
      } else {
        return target.clone();
      }
    }
    /**
     * @todo add description - what is in the cache?
     *
     * @method getCount
     * @memberof Proton#Proton.Pool
     *
     * @return {Number}
     */
    ;

    _proto.getCount = function getCount() {
      var count = 0;

      for (var id in this.cache) {
        count += this.cache[id].length;
      }

      return count++;
    }
    /**
     * Destroyes all items from Pool.cache
     *
     * @method destroy
     * @memberof Proton#Proton.Pool
     */
    ;

    _proto.destroy = function destroy() {
      for (var id in this.cache) {
        this.cache[id].length = 0;
        delete this.cache[id];
      }
    }
    /**
     * Returns Pool.cache
     *
     * @method getCache
     * @memberof Proton#Proton.Pool
     * @private
     *
     * @param {Number} uid the unique id
     *
     * @return {Object}
     */
    ;

    _proto.getCache = function getCache(uid) {
      if (uid === void 0) {
        uid = "default";
      }

      if (!this.cache[uid]) this.cache[uid] = [];
      return this.cache[uid];
    };

    return Pool;
  }();

  var Stats = /*#__PURE__*/function () {
    function Stats(proton) {
      this.proton = proton;
      this.container = null;
      this.type = 1;
      this.emitterIndex = 0;
      this.rendererIndex = 0;
    }

    var _proto = Stats.prototype;

    _proto.update = function update(style, body) {
      this.add(style, body);
      var emitter = this.getEmitter();
      var renderer = this.getRenderer();
      var str = "";

      switch (this.type) {
        case 2:
          str += "emitter:" + this.proton.emitters.length + "<br>";
          if (emitter) str += "em speed:" + emitter.emitSpeed + "<br>";
          if (emitter) str += "pos:" + this.getEmitterPos(emitter);
          break;

        case 3:
          if (emitter) str += "initializes:" + emitter.initializes.length + "<br>";
          if (emitter) str += '<span style="display:inline-block;">' + this.concatArr(emitter.initializes) + "</span><br>";
          if (emitter) str += "behaviours:" + emitter.behaviours.length + "<br>";
          if (emitter) str += '<span style="display:inline-block;">' + this.concatArr(emitter.behaviours) + "</span><br>";
          break;

        case 4:
          if (renderer) str += renderer.name + "<br>";
          if (renderer) str += "body:" + this.getCreatedNumber(renderer) + "<br>";
          break;

        default:
          str += "particles:" + this.proton.getCount() + "<br>";
          str += "pool:" + this.proton.pool.getCount() + "<br>";
          str += "total:" + this.proton.pool.total;
      }

      this.container.innerHTML = str;
    };

    _proto.add = function add(style, body) {
      var _this = this;

      if (!this.container) {
        this.type = 1;
        this.container = document.createElement("div");
        this.container.style.cssText = ["position:absolute;bottom:0px;left:0;cursor:pointer;", "opacity:0.9;z-index:10000;padding:10px;font-size:12px;font-family:Helvetica,Arial,sans-serif;", "width:120px;height:50px;background-color:#002;color:#0ff;"].join("");
        this.container.addEventListener("click", function (e) {
          _this.type++;
          if (_this.type > 4) _this.type = 1;
        }, false);
        var bg, color;

        switch (style) {
          case 2:
            bg = "#201";
            color = "#f08";
            break;

          case 3:
            bg = "#020";
            color = "#0f0";
            break;

          default:
            bg = "#002";
            color = "#0ff";
        }

        this.container.style["background-color"] = bg;
        this.container.style["color"] = color;
      }

      if (!this.container.parentNode) {
        body = body || this.body || document.body;
        body.appendChild(this.container);
      }
    };

    _proto.getEmitter = function getEmitter() {
      return this.proton.emitters[this.emitterIndex];
    };

    _proto.getRenderer = function getRenderer() {
      return this.proton.renderers[this.rendererIndex];
    };

    _proto.concatArr = function concatArr(arr) {
      var result = "";
      if (!arr || !arr.length) return result;

      for (var i = 0; i < arr.length; i++) {
        result += (arr[i].name || "").substr(0, 1) + ".";
      }

      return result;
    };

    _proto.getCreatedNumber = function getCreatedNumber(renderer) {
      return renderer.pool.total || renderer.cpool && renderer.cpool.total || 0;
    };

    _proto.getEmitterPos = function getEmitterPos(e) {
      return Math.round(e.p.x) + "," + Math.round(e.p.y);
    };

    return Stats;
  }();

  /*
   * EventDispatcher
   * This code reference since http://createjs.com/.
   *
   **/
  var EventDispatcher = /*#__PURE__*/function () {
    function EventDispatcher() {
      this._listeners = null;
    }

    EventDispatcher.bind = function bind(target) {
      target.prototype.dispatchEvent = EventDispatcher.prototype.dispatchEvent;
      target.prototype.hasEventListener = EventDispatcher.prototype.hasEventListener;
      target.prototype.addEventListener = EventDispatcher.prototype.addEventListener;
      target.prototype.removeEventListener = EventDispatcher.prototype.removeEventListener;
      target.prototype.removeAllEventListeners = EventDispatcher.prototype.removeAllEventListeners;
    };

    var _proto = EventDispatcher.prototype;

    _proto.addEventListener = function addEventListener(type, listener) {
      if (!this._listeners) {
        this._listeners = {};
      } else {
        this.removeEventListener(type, listener);
      }

      if (!this._listeners[type]) this._listeners[type] = [];

      this._listeners[type].push(listener);

      return listener;
    };

    _proto.removeEventListener = function removeEventListener(type, listener) {
      if (!this._listeners) return;
      if (!this._listeners[type]) return;
      var arr = this._listeners[type];
      var length = arr.length;

      for (var i = 0; i < length; i++) {
        if (arr[i] === listener) {
          if (length === 1) {
            delete this._listeners[type];
          } // allows for faster checks.
          else {
            arr.splice(i, 1);
          }

          break;
        }
      }
    };

    _proto.removeAllEventListeners = function removeAllEventListeners(type) {
      if (!type) this._listeners = null;else if (this._listeners) delete this._listeners[type];
    };

    _proto.dispatchEvent = function dispatchEvent(type, args) {
      var result = false;
      var listeners = this._listeners;

      if (type && listeners) {
        var arr = listeners[type];
        if (!arr) return result; // arr = arr.slice();
        // to avoid issues with items being removed or added during the dispatch

        var handler;
        var i = arr.length;

        while (i--) {
          handler = arr[i];
          result = result || handler(args);
        }
      }

      return !!result;
    };

    _proto.hasEventListener = function hasEventListener(type) {
      var listeners = this._listeners;
      return !!(listeners && listeners[type]);
    };

    return EventDispatcher;
  }();

  var PI = 3.1415926;
  var INFINITY = Infinity;
  var MathUtil = {
    PI: PI,
    PIx2: PI * 2,
    PI_2: PI / 2,
    PI_180: PI / 180,
    N180_PI: 180 / PI,
    Infinity: -999,
    isInfinity: function isInfinity(num) {
      return num === this.Infinity || num === INFINITY;
    },
    randomAToB: function randomAToB(a, b, isInt) {
      if (isInt === void 0) {
        isInt = false;
      }

      if (!isInt) return a + Math.random() * (b - a);else return Math.floor(Math.random() * (b - a)) + a;
    },
    randomFloating: function randomFloating(center, f, isInt) {
      return this.randomAToB(center - f, center + f, isInt);
    },
    randomColor: function randomColor() {
      return "#" + ("00000" + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
    },
    randomZone: function randomZone(display) {},
    floor: function floor(num, k) {
      if (k === void 0) {
        k = 4;
      }

      var digits = Math.pow(10, k);
      return Math.floor(num * digits) / digits;
    },
    degreeTransform: function degreeTransform(a) {
      return a * PI / 180;
    },
    toColor16: function toColor16(num) {
      return "#" + num.toString(16);
    }
  };

  var Integration = /*#__PURE__*/function () {
    function Integration(type) {
      this.type = type;
    }

    var _proto = Integration.prototype;

    _proto.calculate = function calculate(particles, time, damping) {
      this.eulerIntegrate(particles, time, damping);
    } // Euler Integrate
    // https://rosettacode.org/wiki/Euler_method
    ;

    _proto.eulerIntegrate = function eulerIntegrate(particle, time, damping) {
      if (!particle.sleep) {
        particle.old.p.copy(particle.p);
        particle.old.v.copy(particle.v);
        particle.a.multiplyScalar(1 / particle.mass);
        particle.v.add(particle.a.multiplyScalar(time));
        particle.p.add(particle.old.v.multiplyScalar(time));
        if (damping) particle.v.multiplyScalar(damping);
        particle.a.clear();
      }
    };

    return Integration;
  }();

  var Proton = /*#__PURE__*/function () {
    // measure 1:100
    // event name

    /**
     * The constructor to add emitters
     *
     * @constructor Proton
     *
     * @todo proParticleCount is not in use
     * @todo add more documentation of the single properties and parameters
     *
     * @param {Number} [proParticleCount] not in use?
     * @param {Number} [integrationType=Proton.EULER]
     *
     * @property {String} [integrationType=Proton.EULER]
     * @property {Array} emitters   All added emitter
     * @property {Array} renderers  All added renderer
     * @property {Number} time      The active time
     * @property {Number} oldtime   The old time
     */
    function Proton(integrationType) {
      this.emitters = [];
      this.renderers = [];
      this.time = 0;
      this.now = 0;
      this.then = 0;
      this.elapsed = 0;
      this.stats = new Stats(this);
      this.pool = new Pool(80);
      this.integrationType = Util.initValue(integrationType, Proton.EULER);
      this.integrator = new Integration(this.integrationType);
      this._fps = "auto";
      this._interval = Proton.DEFAULT_INTERVAL;
    }

    var _proto = Proton.prototype;

    /**
     * add a type of Renderer
     *
     * @method addRenderer
     * @memberof Proton
     * @instance
     *
     * @param {Renderer} render
     */
    _proto.addRenderer = function addRenderer(render) {
      render.init(this);
      this.renderers.push(render);
    }
    /**
     * @name add a type of Renderer
     *
     * @method addRenderer
     * @param {Renderer} render
     */
    ;

    _proto.removeRenderer = function removeRenderer(render) {
      var index = this.renderers.indexOf(render);
      this.renderers.splice(index, 1);
      render.remove(this);
    }
    /**
     * add the Emitter
     *
     * @method addEmitter
     * @memberof Proton
     * @instance
     *
     * @param {Emitter} emitter
     */
    ;

    _proto.addEmitter = function addEmitter(emitter) {
      this.emitters.push(emitter);
      emitter.parent = this;
      this.dispatchEvent(Proton.EMITTER_ADDED, emitter);
    }
    /**
     * Removes an Emitter
     *
     * @method removeEmitter
     * @memberof Proton
     * @instance
     *
     * @param {Proton.Emitter} emitter
     */
    ;

    _proto.removeEmitter = function removeEmitter(emitter) {
      var index = this.emitters.indexOf(emitter);
      this.emitters.splice(index, 1);
      emitter.parent = null;
      this.dispatchEvent(Proton.EMITTER_REMOVED, emitter);
    }
    /**
     * Updates all added emitters
     *
     * @method update
     * @memberof Proton
     * @instance
     */
    ;

    _proto.update = function update() {
      // 'auto' is the default browser refresh rate, the vast majority is 60fps
      if (this._fps === "auto") {
        this.dispatchEvent(Proton.PROTON_UPDATE);

        if (Proton.USE_CLOCK) {
          if (!this.then) this.then = new Date().getTime();
          this.now = new Date().getTime();
          this.elapsed = (this.now - this.then) * 0.001; // Fix bugs such as chrome browser switching tabs causing excessive time difference

          this.amendChangeTabsBug();
          if (this.elapsed > 0) this.emittersUpdate(this.elapsed);
          this.then = this.now;
        } else {
          this.emittersUpdate(Proton.DEFAULT_INTERVAL);
        }

        this.dispatchEvent(Proton.PROTON_UPDATE_AFTER);
      } // If the fps frame rate is set
      else {
        if (!this.then) this.then = new Date().getTime();
        this.now = new Date().getTime();
        this.elapsed = (this.now - this.then) * 0.001;

        if (this.elapsed > this._interval) {
          this.dispatchEvent(Proton.PROTON_UPDATE);
          this.emittersUpdate(this._interval); // https://stackoverflow.com/questions/19764018/controlling-fps-with-requestanimationframe

          this.then = this.now - this.elapsed % this._interval * 1000;
          this.dispatchEvent(Proton.PROTON_UPDATE_AFTER);
        }
      }
    };

    _proto.emittersUpdate = function emittersUpdate(elapsed) {
      var i = this.emitters.length;

      while (i--) {
        this.emitters[i].update(elapsed);
      }
    }
    /**
     * @todo add description
     *
     * @method amendChangeTabsBug
     * @memberof Proton
     * @instance
     */
    ;

    _proto.amendChangeTabsBug = function amendChangeTabsBug() {
      if (!Proton.amendChangeTabsBug) return;

      if (this.elapsed > 0.5) {
        this.then = new Date().getTime();
        this.elapsed = 0;
      }
    }
    /**
     * Counts all particles from all emitters
     *
     * @method getCount
     * @memberof Proton
     * @instance
     */
    ;

    _proto.getCount = function getCount() {
      var total = 0;
      var i = this.emitters.length;

      while (i--) {
        total += this.emitters[i].particles.length;
      }

      return total;
    };

    _proto.getAllParticles = function getAllParticles() {
      var particles = [];
      var i = this.emitters.length;

      while (i--) {
        particles = particles.concat(this.emitters[i].particles);
      }

      return particles;
    };

    _proto.destroyAllEmitters = function destroyAllEmitters() {
      Util.destroyAll(this.emitters);
    }
    /**
     * Destroys everything related to this Proton instance. This includes all emitters, and all properties
     *
     * @method destroy
     * @memberof Proton
     * @instance
     */
    ;

    _proto.destroy = function destroy(remove) {
      var _this = this;

      if (remove === void 0) {
        remove = false;
      }

      var destroyOther = function destroyOther() {
        _this.time = 0;
        _this.then = 0;

        _this.pool.destroy();

        Util.destroyAll(_this.emitters);
        Util.destroyAll(_this.renderers, _this.getAllParticles());
      };

      if (remove) {
        setTimeout(destroyOther, 200);
      } else {
        destroyOther();
      }
    };

    _createClass(Proton, [{
      key: "fps",
      get: function get() {
        return this._fps;
      },
      set: function set(fps) {
        this._fps = fps;
        this._interval = fps === "auto" ? Proton.DEFAULT_INTERVAL : MathUtil.floor(1 / fps, 7);
      }
    }]);

    return Proton;
  }();

  Proton.USE_CLOCK = false;
  Proton.MEASURE = 100;
  Proton.EULER = "euler";
  Proton.RK2 = "runge-kutta2";
  Proton.PARTICLE_CREATED = "PARTICLE_CREATED";
  Proton.PARTICLE_UPDATE = "PARTICLE_UPDATE";
  Proton.PARTICLE_SLEEP = "PARTICLE_SLEEP";
  Proton.PARTICLE_DEAD = "PARTICLE_DEAD";
  Proton.EMITTER_ADDED = "EMITTER_ADDED";
  Proton.EMITTER_REMOVED = "EMITTER_REMOVED";
  Proton.PROTON_UPDATE = "PROTON_UPDATE";
  Proton.PROTON_UPDATE_AFTER = "PROTON_UPDATE_AFTER";
  Proton.DEFAULT_INTERVAL = 0.0167;
  Proton.amendChangeTabsBug = true;
  EventDispatcher.bind(Proton);

  var Rgb = /*#__PURE__*/function () {
    function Rgb(r, g, b) {
      if (r === void 0) {
        r = 255;
      }

      if (g === void 0) {
        g = 255;
      }

      if (b === void 0) {
        b = 255;
      }

      this.r = r;
      this.g = g;
      this.b = b;
    }

    var _proto = Rgb.prototype;

    _proto.reset = function reset() {
      this.r = 255;
      this.g = 255;
      this.b = 255;
    };

    return Rgb;
  }();

  var PropUtil = {
    hasProp: function hasProp(target, key) {
      if (!target) return false;
      return target[key] !== undefined; // return obj.hasOwnProperty(key);
    },

    /**
     * set the prototype in a given prototypeObject
     *
     * @memberof Proton#Proton.Util
     * @method setProp
     *
     * @todo add description for param `target`
     * @todo translate desription from chinese to english
     *
     * @param {Object} target
     * @param {Object} prototypeObject An object of single prototypes
     *
     * @return {Object} target
     */
    setProp: function setProp(target, props) {
      for (var prop in props) {
        if (target.hasOwnProperty(prop)) {
          target[prop] = Span.getSpanValue(props[prop]);
        }
      }

      return target;
    },

    /**
     * @memberof Proton#Proton.Util
     * @method setVectorVal
     *
     * @todo add description for param `target`
     * @todo add description for param `conf`
     * @todo add description for function
     *
     * @param {Object} target
     * @param {Object} conf
     */
    setVectorVal: function setVectorVal(particle, conf) {
      if (conf === void 0) {
        conf = null;
      }

      if (!conf) return;
      if (this.hasProp(conf, "x")) particle.p.x = conf["x"];
      if (this.hasProp(conf, "y")) particle.p.y = conf["y"];
      if (this.hasProp(conf, "vx")) particle.v.x = conf["vx"];
      if (this.hasProp(conf, "vy")) particle.v.y = conf["vy"];
      if (this.hasProp(conf, "ax")) particle.a.x = conf["ax"];
      if (this.hasProp(conf, "ay")) particle.a.y = conf["ay"];
      if (this.hasProp(conf, "p")) particle.p.copy(conf["p"]);
      if (this.hasProp(conf, "v")) particle.v.copy(conf["v"]);
      if (this.hasProp(conf, "a")) particle.a.copy(conf["a"]);
      if (this.hasProp(conf, "position")) particle.p.copy(conf["position"]);
      if (this.hasProp(conf, "velocity")) particle.v.copy(conf["velocity"]);
      if (this.hasProp(conf, "accelerate")) particle.a.copy(conf["accelerate"]);
    }
  };

  var ease = {
    easeLinear: function easeLinear(value) {
      return value;
    },
    easeInQuad: function easeInQuad(value) {
      return Math.pow(value, 2);
    },
    easeOutQuad: function easeOutQuad(value) {
      return -(Math.pow(value - 1, 2) - 1);
    },
    easeInOutQuad: function easeInOutQuad(value) {
      if ((value /= 0.5) < 1) return 0.5 * Math.pow(value, 2);
      return -0.5 * ((value -= 2) * value - 2);
    },
    easeInCubic: function easeInCubic(value) {
      return Math.pow(value, 3);
    },
    easeOutCubic: function easeOutCubic(value) {
      return Math.pow(value - 1, 3) + 1;
    },
    easeInOutCubic: function easeInOutCubic(value) {
      if ((value /= 0.5) < 1) return 0.5 * Math.pow(value, 3);
      return 0.5 * (Math.pow(value - 2, 3) + 2);
    },
    easeInQuart: function easeInQuart(value) {
      return Math.pow(value, 4);
    },
    easeOutQuart: function easeOutQuart(value) {
      return -(Math.pow(value - 1, 4) - 1);
    },
    easeInOutQuart: function easeInOutQuart(value) {
      if ((value /= 0.5) < 1) return 0.5 * Math.pow(value, 4);
      return -0.5 * ((value -= 2) * Math.pow(value, 3) - 2);
    },
    easeInSine: function easeInSine(value) {
      return -Math.cos(value * MathUtil.PI_2) + 1;
    },
    easeOutSine: function easeOutSine(value) {
      return Math.sin(value * MathUtil.PI_2);
    },
    easeInOutSine: function easeInOutSine(value) {
      return -0.5 * (Math.cos(Math.PI * value) - 1);
    },
    easeInExpo: function easeInExpo(value) {
      return value === 0 ? 0 : Math.pow(2, 10 * (value - 1));
    },
    easeOutExpo: function easeOutExpo(value) {
      return value === 1 ? 1 : -Math.pow(2, -10 * value) + 1;
    },
    easeInOutExpo: function easeInOutExpo(value) {
      if (value === 0) return 0;
      if (value === 1) return 1;
      if ((value /= 0.5) < 1) return 0.5 * Math.pow(2, 10 * (value - 1));
      return 0.5 * (-Math.pow(2, -10 * --value) + 2);
    },
    easeInCirc: function easeInCirc(value) {
      return -(Math.sqrt(1 - value * value) - 1);
    },
    easeOutCirc: function easeOutCirc(value) {
      return Math.sqrt(1 - Math.pow(value - 1, 2));
    },
    easeInOutCirc: function easeInOutCirc(value) {
      if ((value /= 0.5) < 1) return -0.5 * (Math.sqrt(1 - value * value) - 1);
      return 0.5 * (Math.sqrt(1 - (value -= 2) * value) + 1);
    },
    easeInBack: function easeInBack(value) {
      var s = 1.70158;
      return value * value * ((s + 1) * value - s);
    },
    easeOutBack: function easeOutBack(value) {
      var s = 1.70158;
      return (value = value - 1) * value * ((s + 1) * value + s) + 1;
    },
    easeInOutBack: function easeInOutBack(value) {
      var s = 1.70158;
      if ((value /= 0.5) < 1) return 0.5 * (value * value * (((s *= 1.525) + 1) * value - s));
      return 0.5 * ((value -= 2) * value * (((s *= 1.525) + 1) * value + s) + 2);
    },
    getEasing: function getEasing(ease) {
      if (typeof ease === "function") return ease;else return this[ease] || this.easeLinear;
    }
  };

  var Vector2D = /*#__PURE__*/function () {
    function Vector2D(x, y) {
      this.x = x || 0;
      this.y = y || 0;
    }

    var _proto = Vector2D.prototype;

    _proto.set = function set(x, y) {
      this.x = x;
      this.y = y;
      return this;
    };

    _proto.setX = function setX(x) {
      this.x = x;
      return this;
    };

    _proto.setY = function setY(y) {
      this.y = y;
      return this;
    };

    _proto.getGradient = function getGradient() {
      if (this.x !== 0) return Math.atan2(this.y, this.x);else if (this.y > 0) return MathUtil.PI_2;else if (this.y < 0) return -MathUtil.PI_2;
    };

    _proto.copy = function copy(v) {
      this.x = v.x;
      this.y = v.y;
      return this;
    };

    _proto.add = function add(v, w) {
      if (w !== undefined) {
        return this.addVectors(v, w);
      }

      this.x += v.x;
      this.y += v.y;
      return this;
    };

    _proto.addXY = function addXY(a, b) {
      this.x += a;
      this.y += b;
      return this;
    };

    _proto.addVectors = function addVectors(a, b) {
      this.x = a.x + b.x;
      this.y = a.y + b.y;
      return this;
    };

    _proto.sub = function sub(v, w) {
      if (w !== undefined) {
        return this.subVectors(v, w);
      }

      this.x -= v.x;
      this.y -= v.y;
      return this;
    };

    _proto.subVectors = function subVectors(a, b) {
      this.x = a.x - b.x;
      this.y = a.y - b.y;
      return this;
    };

    _proto.divideScalar = function divideScalar(s) {
      if (s !== 0) {
        this.x /= s;
        this.y /= s;
      } else {
        this.set(0, 0);
      }

      return this;
    };

    _proto.multiplyScalar = function multiplyScalar(s) {
      this.x *= s;
      this.y *= s;
      return this;
    };

    _proto.negate = function negate() {
      return this.multiplyScalar(-1);
    };

    _proto.dot = function dot(v) {
      return this.x * v.x + this.y * v.y;
    };

    _proto.lengthSq = function lengthSq() {
      return this.x * this.x + this.y * this.y;
    };

    _proto.length = function length() {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    };

    _proto.normalize = function normalize() {
      return this.divideScalar(this.length());
    };

    _proto.distanceTo = function distanceTo(v) {
      return Math.sqrt(this.distanceToSquared(v));
    };

    _proto.rotate = function rotate(tha) {
      var x = this.x;
      var y = this.y;
      this.x = x * Math.cos(tha) + y * Math.sin(tha);
      this.y = -x * Math.sin(tha) + y * Math.cos(tha);
      return this;
    };

    _proto.distanceToSquared = function distanceToSquared(v) {
      var dx = this.x - v.x;
      var dy = this.y - v.y;
      return dx * dx + dy * dy;
    };

    _proto.lerp = function lerp(v, alpha) {
      this.x += (v.x - this.x) * alpha;
      this.y += (v.y - this.y) * alpha;
      return this;
    };

    _proto.equals = function equals(v) {
      return v.x === this.x && v.y === this.y;
    };

    _proto.clear = function clear() {
      this.x = 0.0;
      this.y = 0.0;
      return this;
    };

    _proto.clone = function clone() {
      return new Vector2D(this.x, this.y);
    };

    return Vector2D;
  }();

  /** @typedef {import('../behaviour/Behaviour')} Behaviour */

  var Particle = /*#__PURE__*/function () {
    /** @type string */

    /** @type {{p:Vector2D,v:Vector2D,a:Vector2D}} */

    /** @type {object} */

    /** @type {Behaviour[]} */

    /** @type {Vector2D} */

    /** @type {Vector2D} */

    /** @type {Vector2D} */

    /** @type {Rgb} */

    /**
     * the Particle class
     *
     * @class Proton.Particle
     * @constructor
     * @param {Object} pObj the parameters object;
     * for example {life:3,dead:false}
     */
    function Particle(conf) {
      this.id = "";
      this.old = {};
      this.data = {};
      this.behaviours = [];
      this.p = [];
      this.v = [];
      this.a = [];
      this.rgb = {};

      /**
       * The particle's id;
       * @property id
       * @type {string}
       */
      this.name = "Particle";
      this.id = Puid.id(this.name);
      this.old = {};
      this.data = {};
      this.behaviours = [];
      this.p = new Vector2D();
      this.v = new Vector2D();
      this.a = new Vector2D();
      this.old.p = new Vector2D();
      this.old.v = new Vector2D();
      this.old.a = new Vector2D();
      this.rgb = new Rgb();
      this.reset();
      conf && PropUtil.setProp(this, conf);
    }

    var _proto = Particle.prototype;

    _proto.getDirection = function getDirection() {
      return Math.atan2(this.v.x, -this.v.y) * MathUtil.N180_PI;
    };

    _proto.reset = function reset() {
      this.life = Infinity;
      this.age = 0;
      this.dead = false;
      this.sleep = false;
      this.body = null;
      this.sprite = null;
      this.parent = null;
      this.energy = 1; // Energy Loss

      this.mass = 1;
      this.radius = 10;
      this.alpha = 1;
      this.scale = 1;
      this.rotation = 0;
      this.color = null;
      this.p.set(0, 0);
      this.v.set(0, 0);
      this.a.set(0, 0);
      this.old.p.set(0, 0);
      this.old.v.set(0, 0);
      this.old.a.set(0, 0);
      this.easing = ease.easeLinear;
      this.rgb.reset();
      Util.emptyObject(this.data);
      this.removeAllBehaviours();
      return this;
    };

    _proto.update = function update(time, index) {
      if (!this.sleep) {
        this.age += time;
        this.applyBehaviours(time, index);
      }

      if (this.age < this.life) {
        var scale = this.easing(this.age / this.life);
        this.energy = Math.max(1 - scale, 0);
      } else {
        this.destroy();
      }
    };

    _proto.applyBehaviours = function applyBehaviours(time, index) {
      var length = this.behaviours.length;
      var i;

      for (i = 0; i < length; i++) {
        this.behaviours[i] && this.behaviours[i].applyBehaviour(this, time, index);
      }
    }
    /**
     * @param {Behaviour} behaviour
     */
    ;

    _proto.addBehaviour = function addBehaviour(behaviour) {
      this.behaviours.push(behaviour);
      if (behaviour.hasOwnProperty("parents")) behaviour.parents.push(this);
      behaviour.initialize(this);
    }
    /**
     * @param {Behaviour[]} behaviours
     */
    ;

    _proto.addBehaviours = function addBehaviours(behaviours) {
      var length = behaviours.length;
      var i;

      for (i = 0; i < length; i++) {
        this.addBehaviour(behaviours[i]);
      }
    };

    _proto.removeBehaviour = function removeBehaviour(behaviour) {
      var index = this.behaviours.indexOf(behaviour);

      if (index > -1) {
        var _behaviour = this.behaviours.splice(index, 1);

        _behaviour.parents = null;
      }
    };

    _proto.removeAllBehaviours = function removeAllBehaviours() {
      Util.emptyArray(this.behaviours);
    }
    /**
     * Destory this particle
     * @method destroy
     */
    ;

    _proto.destroy = function destroy() {
      this.removeAllBehaviours();
      this.energy = 0;
      this.dead = true;
      this.parent = null;
    };

    return Particle;
  }();

  var ColorUtil = {
    /**
     * @typedef  {Object} rgbObject
     * @property {Number} r red value
     * @property {Number} g green value
     * @property {Number} b blue value
     */

    /**
     * converts a hex value to a rgb object
     *
     * @memberof Proton#Proton.Util
     * @method hexToRgb
     *
     * @param {String} h any hex value, e.g. #000000 or 000000 for black
     *
     * @return {rgbObject}
     */
    hexToRgb: function hexToRgb(h) {
      var hex16 = h.charAt(0) === "#" ? h.substring(1, 7) : h;
      var r = parseInt(hex16.substring(0, 2), 16);
      var g = parseInt(hex16.substring(2, 4), 16);
      var b = parseInt(hex16.substring(4, 6), 16);
      return {
        r: r,
        g: g,
        b: b
      };
    },

    /**
     * converts a rgb value to a rgb string
     *
     * @memberof Proton#Proton.Util
     * @method rgbToHex
     *
     * @param {Object | Proton.hexToRgb} rgb a rgb object like in {@link Proton#Proton.}
     *
     * @return {String} rgb()
     */
    rgbToHex: function rgbToHex(rbg) {
      return "rgb(" + rbg.r + ", " + rbg.g + ", " + rbg.b + ")";
    },
    getHex16FromParticle: function getHex16FromParticle(p) {
      return Number(p.rgb.r) * 65536 + Number(p.rgb.g) * 256 + Number(p.rgb.b);
    }
  };

  var Polar2D = /*#__PURE__*/function () {
    function Polar2D(r, tha) {
      this.r = Math.abs(r) || 0;
      this.tha = tha || 0;
    }

    var _proto = Polar2D.prototype;

    _proto.set = function set(r, tha) {
      this.r = r;
      this.tha = tha;
      return this;
    };

    _proto.setR = function setR(r) {
      this.r = r;
      return this;
    };

    _proto.setTha = function setTha(tha) {
      this.tha = tha;
      return this;
    };

    _proto.copy = function copy(p) {
      this.r = p.r;
      this.tha = p.tha;
      return this;
    };

    _proto.toVector = function toVector() {
      return new Vector2D(this.getX(), this.getY());
    };

    _proto.getX = function getX() {
      return this.r * Math.sin(this.tha);
    };

    _proto.getY = function getY() {
      return -this.r * Math.cos(this.tha);
    };

    _proto.normalize = function normalize() {
      this.r = 1;
      return this;
    };

    _proto.equals = function equals(v) {
      return v.r === this.r && v.tha === this.tha;
    };

    _proto.clear = function clear() {
      this.r = 0.0;
      this.tha = 0.0;
      return this;
    };

    _proto.clone = function clone() {
      return new Polar2D(this.r, this.tha);
    };

    return Polar2D;
  }();

  var Mat3 = {
    create: function create(mat3) {
      var mat = new Float32Array(9);
      if (mat3) this.set(mat3, mat);
      return mat;
    },
    set: function set(mat1, mat2) {
      for (var i = 0; i < 9; i++) {
        mat2[i] = mat1[i];
      }

      return mat2;
    },
    multiply: function multiply(mat, mat2, mat3) {
      var a00 = mat[0],
          a01 = mat[1],
          a02 = mat[2],
          a10 = mat[3],
          a11 = mat[4],
          a20 = mat[6],
          a21 = mat[7],
          b00 = mat2[0],
          b01 = mat2[1],
          b02 = mat2[2],
          b10 = mat2[3],
          b11 = mat2[4],
          b20 = mat2[6],
          b21 = mat2[7];
      mat3[0] = b00 * a00 + b01 * a10;
      mat3[1] = b00 * a01 + b01 * a11;
      mat3[2] = a02 * b02;
      mat3[3] = b10 * a00 + b11 * a10;
      mat3[4] = b10 * a01 + b11 * a11;
      mat3[6] = b20 * a00 + b21 * a10 + a20;
      mat3[7] = b20 * a01 + b21 * a11 + a21;
      return mat3;
    },
    inverse: function inverse(mat, mat3) {
      var a00 = mat[0],
          a01 = mat[1],
          a10 = mat[3],
          a11 = mat[4],
          a20 = mat[6],
          a21 = mat[7],
          b01 = a11,
          b11 = -a10,
          b21 = a21 * a10 - a11 * a20,
          d = a00 * b01 + a01 * b11,
          id;
      id = 1 / d;
      mat3[0] = b01 * id;
      mat3[1] = -a01 * id;
      mat3[3] = b11 * id;
      mat3[4] = a00 * id;
      mat3[6] = b21 * id;
      mat3[7] = (-a21 * a00 + a01 * a20) * id;
      return mat3;
    },
    multiplyVec2: function multiplyVec2(m, vec, mat3) {
      var x = vec[0],
          y = vec[1];
      mat3[0] = x * m[0] + y * m[3] + m[6];
      mat3[1] = x * m[1] + y * m[4] + m[7];
      return mat3;
    }
  };

  var Span$1 = /*#__PURE__*/function () {
    function Span(a, b, center) {
      if (Util.isArray(a)) {
        this.isArray = true;
        this.a = a;
      } else {
        this.isArray = false;
        this.a = Util.initValue(a, 1);
        this.b = Util.initValue(b, this.a);
        this.center = Util.initValue(center, false);
      }
    }

    var _proto = Span.prototype;

    _proto.getValue = function getValue(isInt) {
      if (isInt === void 0) {
        isInt = false;
      }

      if (this.isArray) {
        return Util.getRandFromArray(this.a);
      } else {
        if (!this.center) {
          return MathUtil.randomAToB(this.a, this.b, isInt);
        } else {
          return MathUtil.randomFloating(this.a, this.b, isInt);
        }
      }
    }
    /**
     * Returns a new Span object
     *
     * @memberof Proton#Proton.Util
     * @method setSpanValue
     *
     * @todo a, b and c should be 'Mixed' or 'Number'?
     *
     * @param {Mixed | Span} a
     * @param {Mixed}               b
     * @param {Mixed}               c
     *
     * @return {Span}
     */
    ;

    Span.setSpanValue = function setSpanValue(a, b, c) {
      if (a instanceof Span) {
        return a;
      } else {
        if (b === undefined) {
          return new Span(a);
        } else {
          if (c === undefined) return new Span(a, b);else return new Span(a, b, c);
        }
      }
    }
    /**
     * Returns the value from a Span, if the param is not a Span it will return the given parameter
     *
     * @memberof Proton#Proton.Util
     * @method getValue
     *
     * @param {Mixed | Span} pan
     *
     * @return {Mixed} the value of Span OR the parameter if it is not a Span
     */
    ;

    Span.getSpanValue = function getSpanValue(pan) {
      return pan instanceof Span ? pan.getValue() : pan;
    };

    return Span;
  }();

  var ArraySpan = /*#__PURE__*/function (_Span) {
    _inheritsLoose(ArraySpan, _Span);

    function ArraySpan(color) {
      var _this;

      _this = _Span.call(this) || this;
      _this._arr = Util.toArray(color);
      return _this;
    }

    var _proto = ArraySpan.prototype;

    _proto.getValue = function getValue() {
      var val = Util.getRandFromArray(this._arr);
      return val === "random" || val === "Random" ? MathUtil.randomColor() : val;
    }
    /**
     * Make sure that the color is an instance of Proton.ArraySpan, if not it makes a new instance
     *
     * @method setSpanValue
     * @memberof Proton#Proton.Color
     * @instance
     *
     * @param {Proton.Particle} particle
     * @param {Number} the integrate time 1/ms
     * @param {Int} the particle index
     */
    ;

    ArraySpan.createArraySpan = function createArraySpan(arr) {
      if (!arr) return null;
      if (arr instanceof ArraySpan) return arr;else return new ArraySpan(arr);
    };

    return ArraySpan;
  }(Span$1);

  var Rectangle = /*#__PURE__*/function () {
    function Rectangle(x, y, w, h) {
      this.x = x;
      this.y = y;
      this.width = w;
      this.height = h;
      this.bottom = this.y + this.height;
      this.right = this.x + this.width;
    }

    var _proto = Rectangle.prototype;

    _proto.contains = function contains(x, y) {
      if (x <= this.right && x >= this.x && y <= this.bottom && y >= this.y) return true;else return false;
    };

    return Rectangle;
  }();

  var Rate = /*#__PURE__*/function () {
    /**
     * The number of particles per second emission (a [particle]/b [s]);
     * @namespace
     * @memberof! Proton#
     * @constructor
     * @alias Rate
     *
     * @param {Array | Number | Span} numpan the number of each emission;
     * @param {Array | Number | Span} timepan the time of each emission;
     * for example: new Rate(new Span(10, 20), new Span(.1, .25));
     */
    function Rate(numpan, timepan) {
      this.numPan = Span$1.setSpanValue(Util.initValue(numpan, 1));
      this.timePan = Span$1.setSpanValue(Util.initValue(timepan, 1));
      this.startTime = 0;
      this.nextTime = 0;
      this.init();
    }

    var _proto = Rate.prototype;

    _proto.init = function init() {
      this.startTime = 0;
      this.nextTime = this.timePan.getValue();
    };

    _proto.getValue = function getValue(time) {
      this.startTime += time;

      if (this.startTime >= this.nextTime) {
        this.startTime = 0;
        this.nextTime = this.timePan.getValue();

        if (this.numPan.b === 1) {
          if (this.numPan.getValue(false) > 0.5) return 1;else return 0;
        } else {
          return this.numPan.getValue(true);
        }
      }

      return 0;
    };

    return Rate;
  }();

  var Initialize = /*#__PURE__*/function () {
    function Initialize() {}

    var _proto = Initialize.prototype;

    _proto.reset = function reset() {};

    _proto.init = function init(emitter, particle) {
      if (particle) {
        this.initialize(particle);
      } else {
        this.initialize(emitter);
      }
    } // sub class init
    ;

    _proto.initialize = function initialize(target) {};

    return Initialize;
  }();

  var Life = /*#__PURE__*/function (_Initialize) {
    _inheritsLoose(Life, _Initialize);

    function Life(a, b, c) {
      var _this;

      _this = _Initialize.call(this) || this;
      _this.lifePan = Span$1.setSpanValue(a, b, c);
      _this.name = "Life";
      return _this;
    }

    var _proto = Life.prototype;

    _proto.initialize = function initialize(target) {
      if (this.lifePan.a === Infinity) target.life = Infinity;else target.life = this.lifePan.getValue();
    };

    return Life;
  }(Initialize);

  var Zone = /*#__PURE__*/function () {
    function Zone() {
      this.vector = new Vector2D(0, 0);
      this.random = 0;
      this.crossType = "dead";
      this.alert = true;
    }

    var _proto = Zone.prototype;

    _proto.getPosition = function getPosition() {};

    _proto.crossing = function crossing(particle) {};

    _proto.destroy = function destroy() {
      this.vector = null;
    };

    return Zone;
  }();

  var PointZone = /*#__PURE__*/function (_Zone) {
    _inheritsLoose(PointZone, _Zone);

    function PointZone(x, y) {
      var _this;

      _this = _Zone.call(this) || this;
      _this.x = x;
      _this.y = y;
      return _this;
    }

    var _proto = PointZone.prototype;

    _proto.getPosition = function getPosition() {
      this.vector.x = this.x;
      this.vector.y = this.y;
      return this.vector;
    };

    _proto.crossing = function crossing(particle) {
      if (this.alert) {
        console.error("Sorry, PointZone does not support crossing method!");
        this.alert = false;
      }
    };

    return PointZone;
  }(Zone);

  var Position = /*#__PURE__*/function (_Initialize) {
    _inheritsLoose(Position, _Initialize);

    function Position(zone) {
      var _this;

      _this = _Initialize.call(this) || this;
      _this.zone = Util.initValue(zone, new PointZone());
      _this.name = "Position";
      return _this;
    }

    var _proto = Position.prototype;

    _proto.reset = function reset(zone) {
      this.zone = Util.initValue(zone, new PointZone());
    };

    _proto.initialize = function initialize(target) {
      this.zone.getPosition();
      target.p.x = this.zone.vector.x;
      target.p.y = this.zone.vector.y;
    };

    return Position;
  }(Initialize);

  var Velocity = /*#__PURE__*/function (_Initialize) {
    _inheritsLoose(Velocity, _Initialize);

    function Velocity(rpan, thapan, type) {
      var _this;

      _this = _Initialize.call(this) || this;
      _this.rPan = Span$1.setSpanValue(rpan);
      _this.thaPan = Span$1.setSpanValue(thapan);
      _this.type = Util.initValue(type, "vector");
      _this.name = "Velocity";
      return _this;
    }

    var _proto = Velocity.prototype;

    _proto.reset = function reset(rpan, thapan, type) {
      this.rPan = Span$1.setSpanValue(rpan);
      this.thaPan = Span$1.setSpanValue(thapan);
      this.type = Util.initValue(type, "vector");
    };

    _proto.normalizeVelocity = function normalizeVelocity(vr) {
      return vr * Proton.MEASURE;
    };

    _proto.initialize = function initialize(target) {
      if (this.type === "p" || this.type === "P" || this.type === "polar") {
        var polar2d = new Polar2D(this.normalizeVelocity(this.rPan.getValue()), this.thaPan.getValue() * MathUtil.PI_180);
        target.v.x = polar2d.getX();
        target.v.y = polar2d.getY();
      } else {
        target.v.x = this.normalizeVelocity(this.rPan.getValue());
        target.v.y = this.normalizeVelocity(this.thaPan.getValue());
      }
    };

    return Velocity;
  }(Initialize);

  var Mass = /*#__PURE__*/function (_Initialize) {
    _inheritsLoose(Mass, _Initialize);

    function Mass(a, b, c) {
      var _this;

      _this = _Initialize.call(this) || this;
      _this.massPan = Span$1.setSpanValue(a, b, c);
      _this.name = "Mass";
      return _this;
    }

    var _proto = Mass.prototype;

    _proto.initialize = function initialize(target) {
      target.mass = this.massPan.getValue();
    };

    return Mass;
  }(Initialize);

  var Radius = /*#__PURE__*/function (_Initialize) {
    _inheritsLoose(Radius, _Initialize);

    function Radius(a, b, c) {
      var _this;

      _this = _Initialize.call(this) || this;
      _this.radius = Span$1.setSpanValue(a, b, c);
      _this.name = "Radius";
      return _this;
    }

    var _proto = Radius.prototype;

    _proto.reset = function reset(a, b, c) {
      this.radius = Span$1.setSpanValue(a, b, c);
    };

    _proto.initialize = function initialize(particle) {
      particle.radius = this.radius.getValue();
      particle.data.oldRadius = particle.radius;
    };

    return Radius;
  }(Initialize);

  var Body = /*#__PURE__*/function (_Initialize) {
    _inheritsLoose(Body, _Initialize);

    function Body(image, w, h) {
      var _this;

      _this = _Initialize.call(this) || this;
      _this.image = _this.setSpanValue(image);
      _this.w = Util.initValue(w, 20);
      _this.h = Util.initValue(h, _this.w);
      _this.name = "Body";
      return _this;
    }

    var _proto = Body.prototype;

    _proto.initialize = function initialize(particle) {
      var imageTarget = this.image.getValue();

      if (typeof imageTarget === "string") {
        particle.body = {
          width: this.w,
          height: this.h,
          src: imageTarget,
          isInner: true,
          inner: true
        };
      } else {
        particle.body = imageTarget;
      }
    };

    _proto.setSpanValue = function setSpanValue(image) {
      return image instanceof ArraySpan ? image : new ArraySpan(image);
    };

    return Body;
  }(Initialize);

  var Behaviour = /*#__PURE__*/function () {
    /**
     * The Behaviour class is the base for the other Behaviour
     *
     * @memberof! -
     * @interface
     * @alias Proton.Behaviour
     *
     * @param {Number} life 	the behaviours life
     * @param {String} easing 	The behaviour's decaying trend, for example ease.easeOutQuart
     *
     * @property {String}  id 		The behaviours id
     * @param {Number} [life=Infinity] 				this behaviour's life
     * @param {String} [easing=ease.easeLinear] 	this behaviour's easing
     * @property {Number}  age=0 	How long the particle should be 'alife'
     * @property {Number}  energy=1
     * @property {Boolean} dead=false The particle is dead at first
     * @property {Array}   parents 	The behaviour's parents array
     * @property {String}  name 	The behaviour name
     */
    function Behaviour(life, easing) {
      this.life = Util.initValue(life, Infinity);
      this.easing = ease.getEasing(easing);
      this.age = 0;
      this.energy = 1;
      this.dead = false;
      this.parents = [];
      this.id = "Behaviour_" + Behaviour.id++;
      this.name = "Behaviour";
    }
    /**
     * Reset this behaviour's parameters
     *
     * @method reset
     * @memberof Proton.Behaviour
     * @instance
     *
     * @param {Number} [life=Infinity] 		this behaviour's life
     * @param {String} [easing=easeLinear] 	this behaviour's easing
     */


    var _proto = Behaviour.prototype;

    _proto.reset = function reset(life, easing) {
      this.life = Util.initValue(life, Infinity);
      this.easing = ease.getEasing(easing);
    }
    /**
     * Normalize a force by 1:100;
     *
     * @method normalizeForce
     * @memberof Proton.Behaviour
     * @instance
     *
     * @param {Proton.Vector2D} force
     */
    ;

    _proto.normalizeForce = function normalizeForce(force) {
      return force.multiplyScalar(Proton.MEASURE);
    }
    /**
     * Normalize a value by 1:100;
     *
     * @method normalizeValue
     * @memberof Proton.Behaviour
     * @instance
     *
     * @param {Number} value
     */
    ;

    _proto.normalizeValue = function normalizeValue(value) {
      return value * Proton.MEASURE;
    }
    /**
     * Initialize the behaviour's parameters for all particles
     *
     * @method initialize
     * @memberof Proton.Behaviour
     * @instance
     *
     * @param {Proton.Particle} particle
     */
    ;

    _proto.initialize = function initialize(particle) {}
    /**
     * Apply this behaviour for all particles every time
     *
     * @method applyBehaviour
     * @memberof Proton.Behaviour
     * @instance
     *
     * @param {Proton.Particle} particle
     * @param {Number} 			time the integrate time 1/ms
     * @param {Int} 			index the particle index
     */
    ;

    _proto.calculate = function calculate(particle, time, index) {
      this.age += time;

      if (this.age >= this.life || this.dead) {
        this.energy = 0;
        this.dead = true;
        this.destroy();
      } else {
        var scale = this.easing(particle.age / particle.life);
        this.energy = Math.max(1 - scale, 0);
      }
    }
    /**
     * Destory this behaviour
     *
     * @method destroy
     * @memberof Proton.Behaviour
     * @instance
     */
    ;

    _proto.destroy = function destroy() {
      var i = this.parents.length;

      while (i--) {
        this.parents[i].removeBehaviour(this);
      }

      this.parents.length = 0;
    };

    return Behaviour;
  }();

  Behaviour.id = 0;

  var Force = /*#__PURE__*/function (_Behaviour) {
    _inheritsLoose(Force, _Behaviour);

    /**
     * @memberof! Proton#
     * @augments Proton.Behaviour
     * @constructor
     * @alias Proton.Force
     *
     * @param {Number} fx
     * @param {Number} fy
     * @param {Number} [life=Infinity] 			this behaviour's life
     * @param {String} [easing=ease.easeLinear] 	this behaviour's easing
     *
     * @property {String} name The Behaviour name
     */
    function Force(fx, fy, life, easing) {
      var _this;

      _this = _Behaviour.call(this, life, easing) || this;
      _this.force = _this.normalizeForce(new Vector2D(fx, fy));
      _this.name = "Force";
      return _this;
    }
    /**
     * Reset this behaviour's parameters
     *
     * @method reset
     * @memberof Proton#Proton.Force
     * @instance
     *
     * @param {Number} fx
     * @param {Number} fy
     * @param {Number} [life=Infinity] 			this behaviour's life
     * @param {String} [easing=ease.easeLinear] 	this behaviour's easing
     */


    var _proto = Force.prototype;

    _proto.reset = function reset(fx, fy, life, easing) {
      this.force = this.normalizeForce(new Vector2D(fx, fy));
      life && _Behaviour.prototype.reset.call(this, life, easing);
    }
    /**
     * Apply this behaviour for all particles every time
     *
     * @method applyBehaviour
     * @memberof Proton#Proton.Force
     * @instance
     *
     * @param {Proton.Particle} particle
     * @param {Number} the integrate time 1/ms
     * @param {Int} the particle index
     */
    ;

    _proto.applyBehaviour = function applyBehaviour(particle, time, index) {
      this.calculate(particle, time, index);
      particle.a.add(this.force);
    };

    return Force;
  }(Behaviour);

  var Attraction = /*#__PURE__*/function (_Behaviour) {
    _inheritsLoose(Attraction, _Behaviour);

    /**
     * This behaviour let the particles follow one specific Proton.Vector2D
     *
     * @memberof! Proton#
     * @augments Proton.Behaviour
     * @constructor
     * @alias Proton.Attraction
     *
     * @todo add description for 'force' and 'radius'
     *
     * @param {Proton.Vector2D} targetPosition the attraction point coordinates
     * @param {Number} [force=100]
     * @param {Number} [radius=1000]
     * @param {Number} [life=Infinity] 				this behaviour's life
     * @param {String} [easing=ease.easeLinear] 	this behaviour's easing
     *
     * @property {Proton.Vector2D} targetPosition
     * @property {Number} radius
     * @property {Number} force
     * @property {Number} radiusSq
     * @property {Proton.Vector2D} attractionForce
     * @property {Number} lengthSq
     * @property {String} name The Behaviour name
     */
    function Attraction(targetPosition, force, radius, life, easing) {
      var _this;

      _this = _Behaviour.call(this, life, easing) || this;
      _this.targetPosition = Util.initValue(targetPosition, new Vector2D());
      _this.radius = Util.initValue(radius, 1000);
      _this.force = Util.initValue(_this.normalizeValue(force), 100);
      _this.radiusSq = _this.radius * _this.radius;
      _this.attractionForce = new Vector2D();
      _this.lengthSq = 0;
      _this.name = "Attraction";
      return _this;
    }
    /**
     * Reset this behaviour's parameters
     *
     * @method reset
     * @memberof Proton#Proton.Attraction
     * @instance
     *
     * @todo add description for 'force' and 'radius'
     *
     * @param {Proton.Vector2D} targetPosition the attraction point coordinates
     * @param {Number} [force=100]
     * @param {Number} [radius=1000]
     * @param {Number} [life=Infinity] 				this behaviour's life
     * @param {String} [easing=ease.easeLinear] 	this behaviour's easing
     */


    var _proto = Attraction.prototype;

    _proto.reset = function reset(targetPosition, force, radius, life, easing) {
      this.targetPosition = Util.initValue(targetPosition, new Vector2D());
      this.radius = Util.initValue(radius, 1000);
      this.force = Util.initValue(this.normalizeValue(force), 100);
      this.radiusSq = this.radius * this.radius;
      this.attractionForce = new Vector2D();
      this.lengthSq = 0;
      life && _Behaviour.prototype.reset.call(this, life, easing);
    }
    /**
     * Apply this behaviour for all particles every time
     *
     * @memberof Proton#Proton.Attraction
     * @method applyBehaviour
     * @instance
     *
     * @param {Proton.Particle} particle
     * @param {Number} 			time the integrate time 1/ms
     * @param {Int} 			index the particle index
     */
    ;

    _proto.applyBehaviour = function applyBehaviour(particle, time, index) {
      this.calculate(particle, time, index);
      this.attractionForce.copy(this.targetPosition);
      this.attractionForce.sub(particle.p);
      this.lengthSq = this.attractionForce.lengthSq();

      if (this.lengthSq > 0.00004 && this.lengthSq < this.radiusSq) {
        this.attractionForce.normalize();
        this.attractionForce.multiplyScalar(1 - this.lengthSq / this.radiusSq);
        this.attractionForce.multiplyScalar(this.force);
        particle.a.add(this.attractionForce);
      }
    };

    return Attraction;
  }(Behaviour);

  var RandomDrift = /*#__PURE__*/function (_Behaviour) {
    _inheritsLoose(RandomDrift, _Behaviour);

    /**
     * @memberof! Proton#
     * @augments Behaviour
     * @constructor
     * @alias RandomDrift
     *
     * @param {Number} driftX 				X value of the new Vector2D
     * @param {Number} driftY  				Y value of the new Vector2D
     * @param {Number} delay 				How much delay the drift should have
     * @param {Number} [life=Infinity] 		this behaviour's life
     * @param {String} [easing=easeLinear] 	this behaviour's easing
     *
     * @property {Number} time The time of the drift
     * @property {String} name The Behaviour name
     */
    function RandomDrift(driftX, driftY, delay, life, easing) {
      var _this;

      _this = _Behaviour.call(this, life, easing) || this;

      _this.reset(driftX, driftY, delay);

      _this.time = 0;
      _this.name = "RandomDrift";
      return _this;
    }
    /**
     * Reset this behaviour's parameters
     *
     * @method reset
     * @memberof Proton#RandomDrift
     * @instance
     *
     * @param {Number} driftX 				X value of the new Vector2D
     * @param {Number} driftY  				Y value of the new Vector2D
     * @param {Number} delay 				How much delay the drift should have
     * @param {Number} [life=Infinity] 		this behaviour's life
     * @param {String} [easing=easeLinear] 	this behaviour's easing
     */


    var _proto = RandomDrift.prototype;

    _proto.reset = function reset(driftX, driftY, delay, life, easing) {
      this.panFoce = new Vector2D(driftX, driftY);
      this.panFoce = this.normalizeForce(this.panFoce);
      this.delay = delay;
      life && _Behaviour.prototype.reset.call(this, life, easing);
    };

    _proto.initialize = function initialize(particle) {
      particle.data.time = 0;
    }
    /**
     * Apply this behaviour for all particles every time
     *
     * @method applyBehaviour
     * @memberof Proton#RandomDrift
     * @instance
     *
     * @param {Particle} particle
     * @param {Number} 			time the integrate time 1/ms
     * @param {Int} 			index the particle index
     */
    ;

    _proto.applyBehaviour = function applyBehaviour(particle, time, index) {
      this.calculate(particle, time, index);
      particle.data.time += time;

      if (particle.data.time >= this.delay) {
        particle.a.addXY(MathUtil.randomAToB(-this.panFoce.x, this.panFoce.x), MathUtil.randomAToB(-this.panFoce.y, this.panFoce.y));
        particle.data.time = 0;
      }
    };

    return RandomDrift;
  }(Behaviour);

  var Gravity = /*#__PURE__*/function (_Force) {
    _inheritsLoose(Gravity, _Force);

    /**
     * @memberof! Proton#
     * @augments Proton#Proton.Force
     * @constructor
     * @alias Proton.Gravity
     *
     * @param {Number} g 							Gravity
     * @param {Number} [life=Infinity] 				this behaviour's life
     * @param {String} [easing=ease.easeLinear] 	this behaviour's easing
     *
     * @property {String} name The Behaviour name
     */
    function Gravity(g, life, easing) {
      var _this;

      _this = _Force.call(this, 0, g, life, easing) || this;
      _this.name = "Gravity";
      return _this;
    }
    /**
     * Reset this behaviour's parameters
     *
     * @method reset
     * @memberof Proton#Proton.Gravity
     * @instance
     *
     * @param {Number} g 							Gravity
     * @param {Number} [life=Infinity] 				this behaviour's life
     * @param {String} [easing=ease.easeLinear] 	this behaviour's easing
     */


    var _proto = Gravity.prototype;

    _proto.reset = function reset(g, life, easing) {
      _Force.prototype.reset.call(this, 0, g, life, easing);
    };

    return Gravity;
  }(Force);

  var Collision = /*#__PURE__*/function (_Behaviour) {
    _inheritsLoose(Collision, _Behaviour);

    /**
     * The callback after collision
     *
     * @callback Callback
     *
     * @param {Proton.Particle} particle
     * @param {Proton.Paritcle} otherParticle
     */

    /**
     * @memberof! Proton#
     * @augments Proton.Behaviour
     * @constructor
     * @alias Proton.Collision
     *
     * @todo add description to mass
     *
     * @param {Proton.Emitter} 	[emitter=null] 		the attraction point coordinates
     * @param {Boolean} 		[mass=true]
     * @param {Callback}	 	[callback=null]		the callback after the collision
     * @param {Number} [life=Infinity] 				this behaviour's life
     * @param {String} [easing=ease.easeLinear] 	this behaviour's easing
     *
     * @property {String} name The Behaviour name
     */
    function Collision(emitter, mass, callback, life, easing) {
      var _this;

      _this = _Behaviour.call(this, life, easing) || this;

      _this.reset(emitter, mass, callback);

      _this.name = "Collision";
      return _this;
    }
    /**
     * Reset this behaviour's parameters
     *
     * @memberof Proton#Proton.Collision
     * @method reset
     * @instance
     *
     * @todo add description to mass
     *
     * @param {Proton.Emitter} 	[emitter=null] 		the attraction point coordinates
     * @param {Boolean} 		[mass=true]
     * @param {Callback}	 	[callback=null]		the callback after the collision
     * @param {Number} 			[life=Infinity] 	this behaviour's life
     * @param {String} [easing=ease.easeLinear] 	this behaviour's easing
     */


    var _proto = Collision.prototype;

    _proto.reset = function reset(emitter, mass, callback, life, easing) {
      this.emitter = Util.initValue(emitter, null);
      this.mass = Util.initValue(mass, true);
      this.callback = Util.initValue(callback, null);
      this.collisionPool = [];
      this.delta = new Vector2D();
      life && _Behaviour.prototype.reset.call(this, life, easing);
    }
    /**
     * Apply this behaviour for all particles every time
     *
     * @memberof Proton#Proton.Collision
     * @method applyBehaviour
     * @instance
     *
     * @param {Proton.Particle} particle
     * @param {Number} 			time the integrate time 1/ms
     * @param {Int} 			index the particle index
     */
    ;

    _proto.applyBehaviour = function applyBehaviour(particle, time, index) {
      var newPool = this.emitter ? this.emitter.particles.slice(index) : this.pool.slice(index);
      var length = newPool.length;
      var otherParticle;
      var lengthSq;
      var overlap;
      var totalMass;
      var averageMass1, averageMass2;
      var i;

      for (i = 0; i < length; i++) {
        otherParticle = newPool[i];

        if (otherParticle !== particle) {
          this.delta.copy(otherParticle.p);
          this.delta.sub(particle.p);
          lengthSq = this.delta.lengthSq();
          var distance = particle.radius + otherParticle.radius;

          if (lengthSq <= distance * distance) {
            overlap = distance - Math.sqrt(lengthSq);
            overlap += 0.5;
            totalMass = particle.mass + otherParticle.mass;
            averageMass1 = this.mass ? otherParticle.mass / totalMass : 0.5;
            averageMass2 = this.mass ? particle.mass / totalMass : 0.5;
            particle.p.add(this.delta.clone().normalize().multiplyScalar(overlap * -averageMass1));
            otherParticle.p.add(this.delta.normalize().multiplyScalar(overlap * averageMass2));
            this.callback && this.callback(particle, otherParticle);
          }
        }
      }
    };

    return Collision;
  }(Behaviour);

  var CrossZone = /*#__PURE__*/function (_Behaviour) {
    _inheritsLoose(CrossZone, _Behaviour);

    /**
     * Defines what happens if the particles come to the end of the specified zone
     *
     * @memberof! Proton#
     * @augments Proton.Behaviour
     * @constructor
     * @alias Proton.CrossZone
     *
     * @param {Proton.Zone} zone 						can be any Proton.Zone - e.g. Proton.RectZone()
     * @param {String} 		[crossType=dead] 			what happens if the particles pass the zone - allowed strings: dead | bound | cross
     * @param {Number} 		[life=Infinity] 			this behaviour's life
     * @param {String} 		[easing=ease.easeLinear] 	this behaviour's easing
     *
     * @property {String} name The Behaviour name
     */
    function CrossZone(zone, crossType, life, easing) {
      var _this;

      _this = _Behaviour.call(this, life, easing) || this;

      _this.reset(zone, crossType);

      _this.name = "CrossZone";
      return _this;
    }
    /**
     * Reset this behaviour's parameters
     *
     * @method reset
     * @memberof Proton#Proton.CrossZone
     * @instance
     *
     * @param {Proton.Zone} zone 				can be any Proton.Zone - e.g. Proton.RectZone()
     * @param {String} 		[crossType=dead] 	what happens if the particles pass the zone - allowed strings: dead | bound | cross
     * @param {Number} 		[life=Infinity] 	this behaviour's life
     * @param {String} 		[easing=easeLinear]	this behaviour's easing
     */


    var _proto = CrossZone.prototype;

    _proto.reset = function reset(zone, crossType, life, easing) {
      this.zone = zone;
      this.zone.crossType = Util.initValue(crossType, "dead");
      life && _Behaviour.prototype.reset.call(this, life, easing);
    }
    /**
     * Apply this behaviour for all particles every time
     *
     * @method applyBehaviour
     * @memberof Proton#Proton.CrossZone
     * @instance
     *
     * @param {Proton.Particle} particle
     * @param {Number} the integrate time 1/ms
     * @param {Int} the particle index
     */
    ;

    _proto.applyBehaviour = function applyBehaviour(particle, time, index) {
      this.calculate(particle, time, index);
      this.zone.crossing(particle);
    };

    return CrossZone;
  }(Behaviour);

  var Alpha = /*#__PURE__*/function (_Behaviour) {
    _inheritsLoose(Alpha, _Behaviour);

    /**
     * @memberof! Proton#
     * @augments Proton.Behaviour
     * @constructor
     * @alias Proton.Alpha
     *
     * @todo add description for 'a' and 'b'
     *
     * @param {Number} a
     * @param {String} b
     * @param {Number} [life=Infinity] 				this behaviour's life
     * @param {String} [easing=ease.easeLinear] 	this behaviour's easing
     *
     * @property {String} name The Behaviour name
     */
    function Alpha(a, b, life, easing) {
      var _this;

      _this = _Behaviour.call(this, life, easing) || this;

      _this.reset(a, b);

      _this.name = "Alpha";
      return _this;
    }
    /**
     * Reset this behaviour's parameters
     *
     * @method reset
     * @memberof Proton#Proton.Alpha
     * @instance
     *
     * @todo add description for 'a' and 'b'
     *
     * @param {Number} a
     * @param {String} b
     * @param {Number} [life=Infinity] 				this behaviour's life
     * @param {String} [easing=ease.easeLinear] 	this behaviour's easing
     */


    var _proto = Alpha.prototype;

    _proto.reset = function reset(a, b, life, easing) {
      this.same = b === null || b === undefined ? true : false;
      this.a = Span$1.setSpanValue(Util.initValue(a, 1));
      this.b = Span$1.setSpanValue(b);
      life && _Behaviour.prototype.reset.call(this, life, easing);
    }
    /**
     * Sets the new alpha value of the particle
     *
     * @method initialize
     * @memberof Proton#Proton.Alpha
     * @instance
     *
     * @param {Proton.Particle} particle A single Proton generated particle
     */
    ;

    _proto.initialize = function initialize(particle) {
      particle.data.alphaA = this.a.getValue();
      if (this.same) particle.data.alphaB = particle.data.alphaA;else particle.data.alphaB = this.b.getValue();
    }
    /**
     * @method applyBehaviour
     * @memberof Proton#Proton.Alpha
     * @instance
     *
     * @param {Proton.Particle} particle
     * @param {Number} 			time the integrate time 1/ms
     * @param {Int} 			index the particle index
     */
    ;

    _proto.applyBehaviour = function applyBehaviour(particle, time, index) {
      this.calculate(particle, time, index);
      particle.alpha = particle.data.alphaB + (particle.data.alphaA - particle.data.alphaB) * this.energy;
      if (particle.alpha < 0.001) particle.alpha = 0;
    };

    return Alpha;
  }(Behaviour);

  var Scale = /*#__PURE__*/function (_Behaviour) {
    _inheritsLoose(Scale, _Behaviour);

    /**
     * @memberof! Proton#
     * @augments Proton.Behaviour
     * @constructor
     * @alias Proton.Scale
     *
     * @todo add description for 'a' and 'b'
     *
     * @param {Number} a
     * @param {String} b
     * @param {Number} [life=Infinity] 				this behaviour's life
     * @param {String} [easing=ease.easeLinear] 	this behaviour's easing
     *
     * @property {String} name The Behaviour name
     */
    function Scale(a, b, life, easing) {
      var _this;

      _this = _Behaviour.call(this, life, easing) || this;

      _this.reset(a, b);

      _this.name = "Scale";
      return _this;
    }
    /**
     * Reset this behaviour's parameters
     *
     * @method reset
     * @memberof Proton#Proton.Scale
     * @instance
     *
     * @param {Number} a
     * @param {String} b
     * @param {Number} [life=Infinity] 				this behaviour's life
     * @param {String} [easing=ease.easeLinear] 	this behaviour's easing
     */


    var _proto = Scale.prototype;

    _proto.reset = function reset(a, b, life, easing) {
      this.same = b === null || b === undefined ? true : false;
      this.a = Span$1.setSpanValue(Util.initValue(a, 1));
      this.b = Span$1.setSpanValue(b);
      life && _Behaviour.prototype.reset.call(this, life, easing);
    }
    /**
     * Initialize the behaviour's parameters for all particles
     *
     * @method initialize
     * @memberof Proton#Proton.Scale
     * @instance
     *
     * @param {Proton.Particle} particle
     */
    ;

    _proto.initialize = function initialize(particle) {
      particle.data.scaleA = this.a.getValue();
      particle.data.oldRadius = particle.radius;
      particle.data.scaleB = this.same ? particle.data.scaleA : this.b.getValue();
    }
    /**
     * Apply this behaviour for all particles every time
     *
     * @method applyBehaviour
     * @memberof Proton#Proton.Scale
     * @instance
     *
     * @param {Proton.Particle} particle
     * @param {Number} 			time the integrate time 1/ms
     * @param {Int} 			index the particle index
     */
    ;

    _proto.applyBehaviour = function applyBehaviour(particle, time, index) {
      this.calculate(particle, time, index);
      particle.scale = particle.data.scaleB + (particle.data.scaleA - particle.data.scaleB) * this.energy;
      if (particle.scale < 0.0001) particle.scale = 0;
      particle.radius = particle.data.oldRadius * particle.scale;
    };

    return Scale;
  }(Behaviour);

  var Rotate = /*#__PURE__*/function (_Behaviour) {
    _inheritsLoose(Rotate, _Behaviour);

    /**
     * @memberof! Proton#
     * @augments Proton.Behaviour
     * @constructor
     * @alias Proton.Rotate
     *
     * @todo add description for 'a', 'b' and 'style'
     *
     * @param {String} [influence=Velocity] The rotation's influence
     * @param {String} b
     * @param {String} [style=to]
     * @param {Number} [life=Infinity] 				this behaviour's life
     * @param {String} [easing=ease.easeLinear] 	this behaviour's easing
     *
     * @property {String} name The Behaviour name
     */
    function Rotate(influence, b, style, life, easing) {
      var _this;

      _this = _Behaviour.call(this, life, easing) || this;

      _this.reset(influence, b, style);

      _this.name = "Rotate";
      return _this;
    }
    /**
     * Reset this behaviour's parameters
     *
     * @method reset
     * @memberof Proton#Proton.Rotate
     * @instance
     *
     * @todo add description for 'a', 'b' and 'style'
     *
     * @param {String} a
     * @param {String} b
     * @param {String} [style=to]
     * @param {Number} [life=Infinity] 				this behaviour's life
     * @param {String} [easing=ease.easeLinear] 	this behaviour's easing
     */


    var _proto = Rotate.prototype;

    _proto.reset = function reset(a, b, style, life, easing) {
      this.same = b === null || b === undefined ? true : false;
      this.a = Span$1.setSpanValue(Util.initValue(a, "Velocity"));
      this.b = Span$1.setSpanValue(Util.initValue(b, 0));
      this.style = Util.initValue(style, "to");
      life && _Behaviour.prototype.reset.call(this, life, easing);
    }
    /**
     * Initialize the behaviour's parameters for all particles
     *
     * @method initialize
     * @memberof Proton#Proton.Rotate
     * @instance
     *
     * @param {Proton.Particle} particle
     */
    ;

    _proto.initialize = function initialize(particle) {
      particle.rotation = this.a.getValue();
      particle.data.rotationA = this.a.getValue();
      if (!this.same) particle.data.rotationB = this.b.getValue();
    }
    /**
     * Apply this behaviour for all particles every time
     *
     * @method applyBehaviour
     * @memberof Proton#Proton.Rotate
     * @instance
     *
     * @param {Proton.Particle} particle
     * @param {Number} 			time the integrate time 1/ms
     * @param {Int} 			index the particle index
     */
    ;

    _proto.applyBehaviour = function applyBehaviour(particle, time, index) {
      this.calculate(particle, time, index);

      if (!this.same) {
        if (this.style === "to" || this.style === "TO" || this.style === "_") {
          particle.rotation += particle.data.rotationB + (particle.data.rotationA - particle.data.rotationB) * this.energy;
        } else {
          particle.rotation += particle.data.rotationB;
        }
      } else if (this.a.a === "V" || this.a.a === "Velocity" || this.a.a === "v") {
        // beta...
        particle.rotation = particle.getDirection();
      }
    };

    return Rotate;
  }(Behaviour);

  var Color = /*#__PURE__*/function (_Behaviour) {
    _inheritsLoose(Color, _Behaviour);

    /**
     * @memberof! Proton#
     * @augments Proton.Behaviour
     * @constructor
     * @alias Proton.Color
     *
     * @param {Proton.ArraySpan | String} a the string should be a hex e.g. #000000 for black
     * @param {Proton.ArraySpan | String} b the string should be a hex e.g. #000000 for black
     * @param {Number} [life=Infinity] 	this behaviour's life
     * @param {String} [easing=easeLinear] 	this behaviour's easing
     *
     * @property {String} name The Behaviour name
     */
    function Color(a, b, life, easing) {
      var _this;

      _this = _Behaviour.call(this, life, easing) || this;

      _this.reset(a, b);

      _this.name = "Color";
      return _this;
    }
    /**
     * Reset this behaviour's parameters
     *
     * @method reset
     * @memberof Proton#Proton.Color
     * @instance
     *
     * @param {Proton.ArraySpan | String} a the string should be a hex e.g. #000000 for black
     * @param {Proton.ArraySpan | String} b the string should be a hex e.g. #000000 for black
     * @param {Number} [life=Infinity] 	this behaviour's life
     * @param {String} [easing=easeLinear] 	this behaviour's easing
     */


    var _proto = Color.prototype;

    _proto.reset = function reset(a, b, life, easing) {
      this.a = ArraySpan.createArraySpan(a);
      this.b = ArraySpan.createArraySpan(b);
      life && _Behaviour.prototype.reset.call(this, life, easing);
    }
    /**
     * Initialize the behaviour's parameters for all particles
     *
     * @method initialize
     * @memberof Proton#Proton.Color
     * @instance
     *
     * @param {Proton.Particle} particle
     */
    ;

    _proto.initialize = function initialize(particle) {
      particle.color = this.a.getValue();
      particle.data.colorA = ColorUtil.hexToRgb(particle.color);
      if (this.b) particle.data.colorB = ColorUtil.hexToRgb(this.b.getValue());
    }
    /**
     * Apply this behaviour for all particles every time
     *
     * @method applyBehaviour
     * @memberof Proton#Proton.Color
     * @instance
     *
     * @param {Proton.Particle} particle
     * @param {Number} the integrate time 1/ms
     * @param {Int} the particle index
     */
    ;

    _proto.applyBehaviour = function applyBehaviour(particle, time, index) {
      if (this.b) {
        this.calculate(particle, time, index);
        particle.rgb.r = particle.data.colorB.r + (particle.data.colorA.r - particle.data.colorB.r) * this.energy;
        particle.rgb.g = particle.data.colorB.g + (particle.data.colorA.g - particle.data.colorB.g) * this.energy;
        particle.rgb.b = particle.data.colorB.b + (particle.data.colorA.b - particle.data.colorB.b) * this.energy;
        particle.rgb.r = particle.rgb.r << 0;
        particle.rgb.g = particle.rgb.g << 0;
        particle.rgb.b = particle.rgb.b << 0;
      } else {
        particle.rgb.r = particle.data.colorA.r;
        particle.rgb.g = particle.data.colorA.g;
        particle.rgb.b = particle.data.colorA.b;
      }
    };

    return Color;
  }(Behaviour);

  var CHANGING = "changing";

  var Cyclone = /*#__PURE__*/function (_Behaviour) {
    _inheritsLoose(Cyclone, _Behaviour);

    /**
     * @memberof! Proton#
     * @augments Proton.Behaviour
     * @constructor
     * @alias Proton.Cyclone
     *
     * @param {Number} angle
     * @param {Number} force
     * @param {Number} [life=Infinity] 			this behaviour's life
     * @param {String} [easing=ease.easeLinear] 	this behaviour's easing
     *
     * @property {String} name The Behaviour name
     */
    function Cyclone(angle, force, life, easing) {
      var _this;

      _this = _Behaviour.call(this, life, easing) || this;

      _this.setAngleAndForce(angle, force);

      _this.name = "Cyclone";
      return _this;
    }

    var _proto = Cyclone.prototype;

    _proto.setAngleAndForce = function setAngleAndForce(angle, force) {
      this.force = CHANGING;
      this.angle = MathUtil.PI / 2;

      if (angle === "right") {
        this.angle = MathUtil.PI / 2;
      } else if (angle === "left") {
        this.angle = -MathUtil.PI / 2;
      } else if (angle === "random") {
        this.angle = "random";
      } else if (angle instanceof Span$1) {
        this.angle = "span";
        this.span = angle;
      } else if (angle) {
        this.angle = angle;
      }

      if (String(force).toLowerCase() === "changing" || String(force).toLowerCase() === "chang" || String(force).toLowerCase() === "auto") {
        this.force = CHANGING;
      } else if (force) {
        this.force = force;
      }
    }
    /**
     * Reset this behaviour's parameters
     *
     * @method reset
     * @memberof Proton#Proton.Cyclone
     * @instance
     *
     * @param {Number} angle
     * @param {Number} force
     * @param {Number} [life=Infinity] 			this behaviour's life
     * @param {String} [easing=ease.easeLinear] 	this behaviour's easing
     */
    ;

    _proto.reset = function reset(angle, force, life, easing) {
      this.angle = MathUtil.PI / 2;
      this.setAngleAndForce(angle, force);
      life && _Behaviour.prototype.reset.call(this, life, easing);
    };

    _proto.initialize = function initialize(particle) {
      if (this.angle === "random") {
        particle.data.cangle = MathUtil.randomAToB(-MathUtil.PI, MathUtil.PI);
      } else if (this.angle === "span") {
        particle.data.cangle = this.span.getValue();
      }

      particle.data.cyclone = new Vector2D(0, 0);
    }
    /**
     * Apply this behaviour for all particles every time
     *
     * @method applyBehaviour
     * @memberof Proton#Proton.Cyclone
     * @instance
     *
     * @param {Proton.Particle} particle
     * @param {Number} the integrate time 1/ms
     * @param {Int} the particle index
     */
    ;

    _proto.applyBehaviour = function applyBehaviour(particle, time, index) {
      this.calculate(particle, time, index);
      var length;
      var gradient = particle.v.getGradient();

      if (this.angle === "random" || this.angle === "span") {
        gradient += particle.data.cangle;
      } else {
        gradient += this.angle;
      }

      if (this.force === CHANGING) {
        length = particle.v.length() / 100;
      } else {
        length = this.force;
      }

      particle.data.cyclone.x = length * Math.cos(gradient);
      particle.data.cyclone.y = length * Math.sin(gradient);
      particle.data.cyclone = this.normalizeForce(particle.data.cyclone);
      particle.a.add(particle.data.cyclone);
    };

    return Cyclone;
  }(Behaviour);

  var Repulsion = /*#__PURE__*/function (_Attraction) {
    _inheritsLoose(Repulsion, _Attraction);

    /**
     * The oppisite of Proton.Attraction - turns the force
     *
     * @memberof! Proton#
     * @augments Proton#Proton.Attraction
     * @constructor
     * @alias Proton.Repulsion
     *
     * @todo add description for 'force' and 'radius'
     *
     * @param {Proton.Vector2D} targetPosition the attraction point coordinates
     * @param {Number} [force=100]
     * @param {Number} [radius=1000]
     * @param {Number} [life=Infinity] 				this behaviour's life
     * @param {String} [easing=ease.easeLinear] 	this behaviour's easing
     *
     * @property {Number} force
     * @property {String} name The Behaviour name
     */
    function Repulsion(targetPosition, force, radius, life, easing) {
      var _this;

      _this = _Attraction.call(this, targetPosition, force, radius, life, easing) || this;
      _this.force *= -1;
      _this.name = "Repulsion";
      return _this;
    }
    /**
     * Reset this behaviour's parameters
     *
     * @method reset
     * @memberof Proton#Proton.Repulsion
     * @instance
     *
     * @todo add description for 'force' and 'radius'
     *
     * @param {Proton.Vector2D} targetPosition the attraction point coordinates
     * @param {Number} [force=100]
     * @param {Number} [radius=1000]
     * @param {Number} [life=Infinity] 				this behaviour's life
     * @param {String} [easing=ease.easeLinear] 	this behaviour's easing
     */


    var _proto = Repulsion.prototype;

    _proto.reset = function reset(targetPosition, force, radius, life, easing) {
      _Attraction.prototype.reset.call(this, targetPosition, force, radius, life, easing);

      this.force *= -1;
    };

    return Repulsion;
  }(Attraction);

  var GravityWell = /*#__PURE__*/function (_Behaviour) {
    _inheritsLoose(GravityWell, _Behaviour);

    /**
     * @memberof! Proton#
     * @augments Behaviour
     * @constructor
     * @alias GravityWell
     *
     * @param {Vector2D} [centerPoint=new Vector2D] The point in the center
     * @param {Number} [force=100]					The force
     * @param {Number} [life=Infinity]				this behaviour's life
     * @param {String} [easing=easeLinear]	this behaviour's easing
     *
     * @property {String} name The Behaviour name
     */
    function GravityWell(centerPoint, force, life, easing) {
      var _this;

      _this = _Behaviour.call(this, life, easing) || this;
      _this.distanceVec = new Vector2D();
      _this.centerPoint = Util.initValue(centerPoint, new Vector2D());
      _this.force = Util.initValue(_this.normalizeValue(force), 100);
      _this.name = "GravityWell";
      return _this;
    }
    /**
     * Reset this behaviour's parameters
     *
     * @method reset
     * @memberof Proton#GravityWell
     * @instance
     *
     * @param {Vector2D} [centerPoint=new Vector2D] The point in the center
     * @param {Number} [force=100]					The force
     * @param {Number} [life=Infinity]				this behaviour's life
     * @param {String} [easing=easeLinear]	this behaviour's easing
     */


    var _proto = GravityWell.prototype;

    _proto.reset = function reset(centerPoint, force, life, easing) {
      this.distanceVec = new Vector2D();
      this.centerPoint = Util.initValue(centerPoint, new Vector2D());
      this.force = Util.initValue(this.normalizeValue(force), 100);
      life && _Behaviour.prototype.reset.call(this, life, easing);
    }
    /**
     * @inheritdoc
     */
    ;

    _proto.initialize = function initialize(particle) {}
    /**
     * Apply this behaviour for all particles every time
     *
     * @method applyBehaviour
     * @memberof Proton#GravityWell
     * @instance
     *
     * @param {Particle} particle
     * @param {Number} the integrate time 1/ms
     * @param {Int} the particle index
     */
    ;

    _proto.applyBehaviour = function applyBehaviour(particle, time, index) {
      this.distanceVec.set(this.centerPoint.x - particle.p.x, this.centerPoint.y - particle.p.y);
      var distanceSq = this.distanceVec.lengthSq();

      if (distanceSq !== 0) {
        var distance = this.distanceVec.length();
        var factor = this.force * time / (distanceSq * distance);
        particle.v.x += factor * this.distanceVec.x;
        particle.v.y += factor * this.distanceVec.y;
      }
    };

    return GravityWell;
  }(Behaviour);

  var InitializeUtil = {
    initialize: function initialize(emitter, particle, initializes) {
      var length = initializes.length;
      var i;

      for (i = 0; i < length; i++) {
        if (initializes[i] instanceof Initialize) {
          initializes[i].init(emitter, particle);
        } else {
          this.init(emitter, particle, initializes[i]);
        }
      }

      this.bindEmitter(emitter, particle);
    },
    // init
    init: function init(emitter, particle, initialize) {
      PropUtil.setProp(particle, initialize);
      PropUtil.setVectorVal(particle, initialize);
    },
    bindEmitter: function bindEmitter(emitter, particle) {
      if (emitter.bindEmitter) {
        particle.p.add(emitter.p);
        particle.v.add(emitter.v);
        particle.a.add(emitter.a);
        particle.v.rotate(MathUtil.degreeTransform(emitter.rotation));
      }
    }
  };

  var Emitter = /*#__PURE__*/function (_Particle) {
    _inheritsLoose(Emitter, _Particle);

    /**
     * You can use this emit particles.
     *
     * It will dispatch follow events:
     * PARTICLE_CREATED
     * PARTICLE_UPDATA
     * PARTICLE_DEAD
     *
     * @class Emitter
     * @constructor
     * @param {Object} conf the parameters object;
     * for example {damping:0.01,bindEmitter:false}
     */
    function Emitter(conf) {
      var _this;

      if (conf === void 0) {
        conf = {};
      }

      _this = _Particle.call(this, conf) || this;
      _this.particles = [];
      _this.behaviours = [];
      _this.initializes = [];
      _this.emitTime = 0;
      _this.emitSpeed = 0;
      _this.totalTime = -1;
      /**
       * The friction coefficient for all particle emit by This;
       * @property damping
       * @type {Number}
       * @default 0.006
       */

      _this.damping = 0.006;
      /**
       * If bindEmitter the particles can bind this emitter's property;
       * @property bindEmitter
       * @type {Boolean}
       * @default true
       */

      _this.bindEmitter = true;
      /**
       * The number of particles per second emit (a [particle]/b [s]);
       * @property rate
       * @type {Rate}
       * @default Rate(1, .1)
       */

      _this.rate = new Rate(1, 0.1);
      _this.name = "Emitter";
      _this.id = Puid.id(_this.name);
      return _this;
    }
    /**
     * start emit particle
     * @method emit
     * @param {Number} emitTime begin emit time;
     * @param {String} life the life of this emitter
     */


    var _proto = Emitter.prototype;

    _proto.emit = function emit(totalTime, life) {
      this.stoped = false;
      this.emitTime = 0;
      this.totalTime = Util.initValue(totalTime, Infinity);

      if (life === true || life === "life" || life === "destroy") {
        this.life = totalTime === "once" ? 1 : this.totalTime;
      } else if (!isNaN(life)) {
        this.life = life;
      }

      this.rate.init();
    }
    /**
     * stop emiting
     * @method stop
     */
    ;

    _proto.stop = function stop() {
      this.totalTime = -1;
      this.emitTime = 0;
      this.stoped = true;
    };

    _proto.preEmit = function preEmit(time) {
      var oldStoped = this.stoped;
      var oldEmitTime = this.emitTime;
      var oldTotalTime = this.totalTime;
      this.stoped = false;
      this.emitTime = 0;
      this.totalTime = time;
      this.rate.init();
      var step = 0.0167;

      while (time > step) {
        time -= step;
        this.update(step);
      }

      this.stoped = oldStoped;
      this.emitTime = oldEmitTime + Math.max(time, 0);
      this.totalTime = oldTotalTime;
    }
    /**
     * remove current all particles
     * @method removeAllParticles
     */
    ;

    _proto.removeAllParticles = function removeAllParticles() {
      var i = this.particles.length;

      while (i--) {
        this.particles[i].dead = true;
      }
    }
    /**
     * add initialize to this emitter
     * @method addSelfInitialize
     */
    ;

    _proto.addSelfInitialize = function addSelfInitialize(initialize) {
      if (initialize["init"]) {
        initialize.init(this);
      } else {
        this.initAll();
      }
    }
    /**
     * add the Initialize to particles;
     *
     * you can use initializes array:for example emitter.addInitialize(initialize1,initialize2,initialize3);
     * @method addInitialize
     * @param {Initialize} initialize like this new Radius(1, 12)
     */
    ;

    _proto.addInitialize = function addInitialize() {
      for (var _len = arguments.length, rest = new Array(_len), _key = 0; _key < _len; _key++) {
        rest[_key] = arguments[_key];
      }

      var i = rest.length;

      while (i--) {
        this.initializes.push(rest[i]);
      }
    }
    /**
     * remove the Initialize
     * @method removeInitialize
     * @param {Initialize} initialize a initialize
     */
    ;

    _proto.removeInitialize = function removeInitialize(initializer) {
      var index = this.initializes.indexOf(initializer);
      if (index > -1) this.initializes.splice(index, 1);
    }
    /**
     * remove all Initializes
     * @method removeInitializers
     */
    ;

    _proto.removeAllInitializers = function removeAllInitializers() {
      Util.emptyArray(this.initializes);
    }
    /**
     * add the Behaviour to particles;
     *
     * you can use Behaviours array:emitter.addBehaviour(Behaviour1,Behaviour2,Behaviour3);
     * @method addBehaviour
     * @param {Behaviour} behaviour like this new Color('random')
     */
    ;

    _proto.addBehaviour = function addBehaviour() {
      for (var _len2 = arguments.length, rest = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        rest[_key2] = arguments[_key2];
      }

      var i = arguments.length;

      while (i--) {
        var behaviour = rest[i];
        this.behaviours.push(behaviour);
        if (behaviour.parents) behaviour.parents.push(this);
      }
    }
    /**
     * remove the Behaviour
     * @method removeBehaviour
     * @param {Behaviour} behaviour a behaviour
     */
    ;

    _proto.removeBehaviour = function removeBehaviour(behaviour) {
      var index = this.behaviours.indexOf(behaviour);
      this.behaviours.splice(index, 1);

      if (behaviour.parents) {
        index = behaviour.parents.indexOf(behaviour);
        behaviour.parents.splice(index, 1);
      }

      return index;
    }
    /**
     * remove all behaviours
     * @method removeAllBehaviours
     */
    ;

    _proto.removeAllBehaviours = function removeAllBehaviours() {
      Util.emptyArray(this.behaviours);
    } // emitter update
    ;

    _proto.update = function update(time) {
      this.age += time;
      if (this.age >= this.life || this.dead) this.destroy();
      this.emitting(time);
      this.integrate(time);
    };

    _proto.integrate = function integrate(time) {
      if (!this.parent) return;
      var damping = 1 - this.damping;
      this.parent.integrator.calculate(this, time, damping);
      var length = this.particles.length;
      var i, particle;

      for (i = length - 1; i >= 0; i--) {
        particle = this.particles[i]; // particle update

        particle.update(time, i);
        this.parent.integrator.calculate(particle, time, damping);
        this.dispatch("PARTICLE_UPDATE", particle); // check dead

        if (particle.dead) {
          this.dispatch("PARTICLE_DEAD", particle);
          this.parent.pool.expire(particle);
          this.particles.splice(i, 1);
        }
      }
    };

    _proto.dispatch = function dispatch(event, target) {
      this.parent && this.parent.dispatchEvent(event, target);
      this.bindEvent && this.dispatchEvent(event, target);
    };

    _proto.emitting = function emitting(time) {
      if (this.totalTime === "once") {
        var i;
        var length = this.rate.getValue(99999);
        if (length > 0) this.emitSpeed = length;

        for (i = 0; i < length; i++) {
          this.createParticle();
        }

        this.totalTime = "none";
      } else {
        this.emitTime += time;

        if (this.emitTime < this.totalTime) {
          var _length = this.rate.getValue(time);

          var _i;

          if (_length > 0) this.emitSpeed = _length;

          for (_i = 0; _i < _length; _i++) {
            this.createParticle();
          }
        }
      }
    }
    /**
     * create single particle;
     *
     * can use emit({x:10},new Gravity(10),{'particleUpdate',fun}) or emit([{x:10},new Initialize],new Gravity(10),{'particleUpdate',fun})
     * @method removeAllParticles
     */
    ;

    _proto.createParticle = function createParticle(initialize, behaviour) {
      var particle = this.parent.pool.get(Particle);
      this.setupParticle(particle, initialize, behaviour);
      this.dispatch("PARTICLE_CREATED", particle);
      return particle;
    };

    _proto.setupParticle = function setupParticle(particle, initialize, behaviour) {
      var initializes = this.initializes;
      var behaviours = this.behaviours;
      if (initialize) initializes = Util.toArray(initialize);
      if (behaviour) behaviours = Util.toArray(behaviour);
      particle.reset();
      InitializeUtil.initialize(this, particle, initializes);
      particle.addBehaviours(behaviours);
      particle.parent = this;
      this.particles.push(particle);
    };

    _proto.remove = function remove() {
      this.stop();
      Util.destroyAll(this.particles);
    }
    /**
     * Destory this Emitter
     * @method destroy
     */
    ;

    _proto.destroy = function destroy() {
      this.dead = true;
      this.remove();
      this.removeAllInitializers();
      this.removeAllBehaviours();
      this.parent && this.parent.removeEmitter(this);
    };

    return Emitter;
  }(Particle);
  EventDispatcher.bind(Emitter);

  var BehaviourEmitter = /*#__PURE__*/function (_Emitter) {
    _inheritsLoose(BehaviourEmitter, _Emitter);

    /**
     * The BehaviourEmitter class inherits from Proton.Emitter
     *
     * use the BehaviourEmitter you can add behaviours to self;
     * @class Proton.BehaviourEmitter
     * @constructor
     * @param {Object} conf the parameters object;
     */
    function BehaviourEmitter(conf) {
      var _this;

      _this = _Emitter.call(this, conf) || this;
      _this.selfBehaviours = [];
      return _this;
    }
    /**
     * add the Behaviour to emitter;
     *
     * you can use Behaviours array:emitter.addSelfBehaviour(Behaviour1,Behaviour2,Behaviour3);
     * @method addSelfBehaviour
     * @param {Proton.Behaviour} behaviour like this new Proton.Color('random')
     */


    var _proto = BehaviourEmitter.prototype;

    _proto.addSelfBehaviour = function addSelfBehaviour() {
      for (var _len = arguments.length, rest = new Array(_len), _key = 0; _key < _len; _key++) {
        rest[_key] = arguments[_key];
      }

      var i,
          length = rest.length;

      for (i = 0; i < length; i++) {
        var behaviour = rest[i];
        this.selfBehaviours.push(behaviour);
        behaviour.initialize(this);
      }
    }
    /**
     * remove the Behaviour for self
     * @method removeSelfBehaviour
     * @param {Proton.Behaviour} behaviour a behaviour
     */
    ;

    _proto.removeSelfBehaviour = function removeSelfBehaviour(behaviour) {
      var index = this.selfBehaviours.indexOf(behaviour);
      if (index > -1) this.selfBehaviours.splice(index, 1);
    };

    _proto.update = function update(time) {
      _Emitter.prototype.update.call(this, time);

      if (!this.sleep) {
        var length = this.selfBehaviours.length;
        var i;

        for (i = 0; i < length; i++) {
          this.selfBehaviours[i].applyBehaviour(this, time, i);
        }
      }
    };

    return BehaviourEmitter;
  }(Emitter);

  var FollowEmitter = /*#__PURE__*/function (_Emitter) {
    _inheritsLoose(FollowEmitter, _Emitter);

    /**
     * The FollowEmitter class inherits from Proton.Emitter
     *
     * use the FollowEmitter will emit particle when mousemoving
     *
     * @class Proton.FollowEmitter
     * @constructor
     * @param {Element} mouseTarget mouseevent's target;
     * @param {Number} ease the easing of following speed;
     * @default 0.7
     * @param {Object} conf the parameters object;
     */
    function FollowEmitter(mouseTarget, ease, conf) {
      var _this;

      _this = _Emitter.call(this, conf) || this;
      _this.mouseTarget = Util.initValue(mouseTarget, window);
      _this.ease = Util.initValue(ease, 0.7);
      _this._allowEmitting = false;

      _this.initEventHandler();

      return _this;
    }

    var _proto = FollowEmitter.prototype;

    _proto.initEventHandler = function initEventHandler() {
      var _this2 = this;

      this.mousemoveHandler = function (e) {
        return _this2.mousemove.call(_this2, e);
      };

      this.mousedownHandler = function (e) {
        return _this2.mousedown.call(_this2, e);
      };

      this.mouseupHandler = function (e) {
        return _this2.mouseup.call(_this2, e);
      };

      this.mouseTarget.addEventListener("mousemove", this.mousemoveHandler, false);
    }
    /**
     * start emit particle
     * @method emit
     */
    ;

    _proto.emit = function emit() {
      this._allowEmitting = true;
    }
    /**
     * stop emiting
     * @method stop
     */
    ;

    _proto.stop = function stop() {
      this._allowEmitting = false;
    };

    _proto.mousemove = function mousemove(e) {
      if (e.layerX || e.layerX === 0) {
        this.p.x += (e.layerX - this.p.x) * this.ease;
        this.p.y += (e.layerY - this.p.y) * this.ease;
      } else if (e.offsetX || e.offsetX === 0) {
        this.p.x += (e.offsetX - this.p.x) * this.ease;
        this.p.y += (e.offsetY - this.p.y) * this.ease;
      }

      if (this._allowEmitting) _Emitter.prototype.emit.call(this, "once");
    }
    /**
     * Destory this Emitter
     * @method destroy
     */
    ;

    _proto.destroy = function destroy() {
      _Emitter.prototype.destroy.call(this);

      this.mouseTarget.removeEventListener("mousemove", this.mousemoveHandler, false);
    };

    return FollowEmitter;
  }(Emitter);

  var Types = {
    /**
     * Determine whether it is a picture object
     *
     * @return {boolean} is or no
     */
    isImage: function isImage(obj) {
      if (!obj) return false;
      var tagName = ("" + obj.tagName).toUpperCase();
      var nodeName = ("" + obj.nodeName).toUpperCase();
      if (nodeName === "IMG" || tagName === "IMG") return true;
      return false;
    },

    /**
     * Determine whether it is a string object
     *
     * @return {boolean} is or no
     */
    isString: function isString(obj) {
      return typeof obj === "string";
    }
  };

  var BaseRenderer = /*#__PURE__*/function () {
    function BaseRenderer(element, stroke) {
      this.pool = new Pool();
      this.element = element;
      this.stroke = stroke;
      this.circleConf = {
        isCircle: true
      };
      this.initEventHandler();
      this.name = "BaseRenderer";
    }

    var _proto = BaseRenderer.prototype;

    _proto.setStroke = function setStroke(color, thinkness) {
      if (color === void 0) {
        color = "#000000";
      }

      if (thinkness === void 0) {
        thinkness = 1;
      }

      this.stroke = {
        color: color,
        thinkness: thinkness
      };
    };

    _proto.initEventHandler = function initEventHandler() {
      var _this = this;

      this._protonUpdateHandler = function () {
        _this.onProtonUpdate.call(_this);
      };

      this._protonUpdateAfterHandler = function () {
        _this.onProtonUpdateAfter.call(_this);
      };

      this._emitterAddedHandler = function (emitter) {
        _this.onEmitterAdded.call(_this, emitter);
      };

      this._emitterRemovedHandler = function (emitter) {
        _this.onEmitterRemoved.call(_this, emitter);
      };

      this._particleCreatedHandler = function (particle) {
        _this.onParticleCreated.call(_this, particle);
      };

      this._particleUpdateHandler = function (particle) {
        _this.onParticleUpdate.call(_this, particle);
      };

      this._particleDeadHandler = function (particle) {
        _this.onParticleDead.call(_this, particle);
      };
    };

    _proto.init = function init(proton) {
      this.parent = proton;
      proton.addEventListener("PROTON_UPDATE", this._protonUpdateHandler);
      proton.addEventListener("PROTON_UPDATE_AFTER", this._protonUpdateAfterHandler);
      proton.addEventListener("EMITTER_ADDED", this._emitterAddedHandler);
      proton.addEventListener("EMITTER_REMOVED", this._emitterRemovedHandler);
      proton.addEventListener("PARTICLE_CREATED", this._particleCreatedHandler);
      proton.addEventListener("PARTICLE_UPDATE", this._particleUpdateHandler);
      proton.addEventListener("PARTICLE_DEAD", this._particleDeadHandler);
    };

    _proto.resize = function resize(width, height) {};

    _proto.destroy = function destroy() {
      this.remove();
      this.pool.destroy();
      this.pool = null;
      this.element = null;
      this.stroke = null;
    };

    _proto.remove = function remove(proton) {
      this.parent.removeEventListener("PROTON_UPDATE", this._protonUpdateHandler);
      this.parent.removeEventListener("PROTON_UPDATE_AFTER", this._protonUpdateAfterHandler);
      this.parent.removeEventListener("EMITTER_ADDED", this._emitterAddedHandler);
      this.parent.removeEventListener("EMITTER_REMOVED", this._emitterRemovedHandler);
      this.parent.removeEventListener("PARTICLE_CREATED", this._particleCreatedHandler);
      this.parent.removeEventListener("PARTICLE_UPDATE", this._particleUpdateHandler);
      this.parent.removeEventListener("PARTICLE_DEAD", this._particleDeadHandler);
      this.parent = null;
    };

    _proto.onProtonUpdate = function onProtonUpdate() {};

    _proto.onProtonUpdateAfter = function onProtonUpdateAfter() {};

    _proto.onEmitterAdded = function onEmitterAdded(emitter) {};

    _proto.onEmitterRemoved = function onEmitterRemoved(emitter) {};

    _proto.onParticleCreated = function onParticleCreated(particle) {};

    _proto.onParticleUpdate = function onParticleUpdate(particle) {};

    _proto.onParticleDead = function onParticleDead(particle) {};

    return BaseRenderer;
  }();

  var CanvasRenderer = /*#__PURE__*/function (_BaseRenderer) {
    _inheritsLoose(CanvasRenderer, _BaseRenderer);

    function CanvasRenderer(element) {
      var _this;

      _this = _BaseRenderer.call(this, element) || this;
      _this.stroke = null;
      _this.context = _this.element.getContext("2d");
      _this.bufferCache = {};
      _this.name = "CanvasRenderer";
      return _this;
    }

    var _proto = CanvasRenderer.prototype;

    _proto.resize = function resize(width, height) {
      this.element.width = width;
      this.element.height = height;
    };

    _proto.onProtonUpdate = function onProtonUpdate() {
      this.context.clearRect(0, 0, this.element.width, this.element.height);
    };

    _proto.onParticleCreated = function onParticleCreated(particle) {
      if (particle.body) {
        ImgUtil.getImgFromCache(particle.body, this.addImg2Body, particle);
      } else {
        particle.color = particle.color || "#ff0000";
      }
    };

    _proto.onParticleUpdate = function onParticleUpdate(particle) {
      if (particle.body) {
        if (Types.isImage(particle.body)) {
          this.drawImage(particle);
        }
      } else {
        this.drawCircle(particle);
      }
    };

    _proto.onParticleDead = function onParticleDead(particle) {
      particle.body = null;
    } // private method
    ;

    _proto.addImg2Body = function addImg2Body(img, particle) {
      particle.body = img;
    } // private drawImage method
    ;

    _proto.drawImage = function drawImage(particle) {
      var w = particle.body.width * particle.scale | 0;
      var h = particle.body.height * particle.scale | 0;
      var x = particle.p.x - w / 2;
      var y = particle.p.y - h / 2;

      if (!!particle.color) {
        if (!particle.data["buffer"]) particle.data.buffer = this.createBuffer(particle.body);
        var bufContext = particle.data.buffer.getContext("2d");
        bufContext.clearRect(0, 0, particle.data.buffer.width, particle.data.buffer.height);
        bufContext.globalAlpha = particle.alpha;
        bufContext.drawImage(particle.body, 0, 0);
        bufContext.globalCompositeOperation = "source-atop";
        bufContext.fillStyle = ColorUtil.rgbToHex(particle.rgb);
        bufContext.fillRect(0, 0, particle.data.buffer.width, particle.data.buffer.height);
        bufContext.globalCompositeOperation = "source-over";
        bufContext.globalAlpha = 1;
        this.context.drawImage(particle.data.buffer, 0, 0, particle.data.buffer.width, particle.data.buffer.height, x, y, w, h);
      } else {
        this.context.save();
        this.context.globalAlpha = particle.alpha;
        this.context.translate(particle.p.x, particle.p.y);
        this.context.rotate(MathUtil.degreeTransform(particle.rotation));
        this.context.translate(-particle.p.x, -particle.p.y);
        this.context.drawImage(particle.body, 0, 0, particle.body.width, particle.body.height, x, y, w, h);
        this.context.globalAlpha = 1;
        this.context.restore();
      }
    } // private drawCircle --
    ;

    _proto.drawCircle = function drawCircle(particle) {
      if (particle.rgb) {
        this.context.fillStyle = "rgba(" + particle.rgb.r + "," + particle.rgb.g + "," + particle.rgb.b + "," + particle.alpha + ")";
      } else {
        this.context.fillStyle = particle.color;
      } // draw circle


      this.context.beginPath();
      this.context.arc(particle.p.x, particle.p.y, particle.radius, 0, Math.PI * 2, true);

      if (this.stroke) {
        this.context.strokeStyle = this.stroke.color;
        this.context.lineWidth = this.stroke.thinkness;
        this.context.stroke();
      }

      this.context.closePath();
      this.context.fill();
    } // private createBuffer
    ;

    _proto.createBuffer = function createBuffer(image) {
      if (Types.isImage(image)) {
        var size = image.width + "_" + image.height;
        var canvas = this.bufferCache[size];

        if (!canvas) {
          canvas = document.createElement("canvas");
          canvas.width = image.width;
          canvas.height = image.height;
          this.bufferCache[size] = canvas;
        }

        return canvas;
      }
    };

    _proto.destroy = function destroy() {
      _BaseRenderer.prototype.destroy.call(this);

      this.stroke = null;
      this.context = null;
      this.bufferCache = null;
    };

    return CanvasRenderer;
  }(BaseRenderer);

  var DomRenderer = /*#__PURE__*/function (_BaseRenderer) {
    _inheritsLoose(DomRenderer, _BaseRenderer);

    function DomRenderer(element) {
      var _this;

      _this = _BaseRenderer.call(this, element) || this;
      _this.stroke = null;
      _this.transform3d = false;

      _this.pool.create = function (body, particle) {
        return _this.createBody(body, particle);
      };

      _this.addImg2Body = _this.addImg2Body.bind(_assertThisInitialized(_this));
      _this.name = "DomRenderer";
      return _this;
    }

    var _proto = DomRenderer.prototype;

    _proto.onParticleCreated = function onParticleCreated(particle) {
      if (particle.body) {
        ImgUtil.getImgFromCache(particle.body, this.addImg2Body, particle);
      } else {
        particle.body = this.pool.get(this.circleConf, particle);
        this.element.appendChild(particle.body);
      }
    };

    _proto.onParticleUpdate = function onParticleUpdate(particle) {
      if (this.bodyReady(particle)) {
        if (this.transform3d) {
          DomUtil.transform3d(particle.body, particle.p.x, particle.p.y, particle.scale, particle.rotation);
        } else {
          DomUtil.transform(particle.body, particle.p.x, particle.p.y, particle.scale, particle.rotation);
        }

        particle.body.style.opacity = particle.alpha;

        if (particle.body.isCircle) {
          particle.body.style.backgroundColor = particle.color || "#ff0000";
        }
      }
    };

    _proto.onParticleDead = function onParticleDead(particle) {
      if (this.bodyReady(particle)) {
        this.element.removeChild(particle.body);
        this.pool.expire(particle.body);
        particle.body = null;
      }
    };

    _proto.bodyReady = function bodyReady(particle) {
      return typeof particle.body === "object" && particle.body && !particle.body.isInner;
    } // private method
    ;

    _proto.addImg2Body = function addImg2Body(img, particle) {
      if (particle.dead) return;
      particle.body = this.pool.get(img, particle);
      DomUtil.resize(particle.body, img.width, img.height);
      this.element.appendChild(particle.body);
    };

    _proto.createBody = function createBody(body, particle) {
      if (body.isCircle) return this.createCircle(particle);
      return this.createSprite(body, particle);
    } // private methods
    ;

    _proto.createCircle = function createCircle(particle) {
      var dom = DomUtil.createDiv(particle.id + "_dom", 2 * particle.radius, 2 * particle.radius);
      dom.style.borderRadius = particle.radius + "px";

      if (this.stroke) {
        dom.style.borderColor = this.stroke.color;
        dom.style.borderWidth = this.stroke.thinkness + "px";
      }

      dom.isCircle = true;
      return dom;
    };

    _proto.createSprite = function createSprite(body, particle) {
      var url = typeof body === "string" ? body : body.src;
      var dom = DomUtil.createDiv(particle.id + "_dom", body.width, body.height);
      dom.style.backgroundImage = "url(" + url + ")";
      return dom;
    };

    _proto.destroy = function destroy() {
      _BaseRenderer.prototype.destroy.call(this);

      this.stroke = null;
    };

    return DomRenderer;
  }(BaseRenderer);

  var EaselRenderer = /*#__PURE__*/function (_BaseRenderer) {
    _inheritsLoose(EaselRenderer, _BaseRenderer);

    function EaselRenderer(element, stroke) {
      var _this;

      _this = _BaseRenderer.call(this, element) || this;
      _this.stroke = stroke;
      _this.name = "EaselRenderer";
      return _this;
    }

    var _proto = EaselRenderer.prototype;

    _proto.onParticleCreated = function onParticleCreated(particle) {
      if (particle.body) {
        this.createSprite(particle);
      } else {
        this.createCircle(particle);
      }

      this.element.addChild(particle.body);
    };

    _proto.onParticleUpdate = function onParticleUpdate(particle) {
      if (particle.body) {
        particle.body.x = particle.p.x;
        particle.body.y = particle.p.y;
        particle.body.alpha = particle.alpha;
        particle.body.scaleX = particle.body.scaleY = particle.scale;
        particle.body.rotation = particle.rotation;
      }
    };

    _proto.onParticleDead = function onParticleDead(particle) {
      if (particle.body) {
        particle.body.parent && particle.body.parent.removeChild(particle.body);
        this.pool.expire(particle.body);
        particle.body = null;
      }

      if (particle.graphics) this.pool.expire(particle.graphics);
    } // private
    ;

    _proto.createSprite = function createSprite(particle) {
      particle.body = this.pool.get(particle.body);
      if (particle.body.parent) return;

      if (particle.body["image"]) {
        particle.body.regX = particle.body.image.width / 2;
        particle.body.regY = particle.body.image.height / 2;
      }
    };

    _proto.createCircle = function createCircle(particle) {
      var graphics = this.pool.get(createjs.Graphics);

      if (this.stroke) {
        if (Types.isString(this.stroke)) {
          graphics.beginStroke(this.stroke);
        } else {
          graphics.beginStroke("#000000");
        }
      }

      graphics.beginFill(particle.color || "#ff0000").drawCircle(0, 0, particle.radius);
      var shape = this.pool.get(createjs.Shape, [graphics]);
      particle.body = shape;
      particle.graphics = graphics;
    };

    _proto.destroy = function destroy() {
      _BaseRenderer.prototype.destroy.call(this);

      this.stroke = null;
    };

    return EaselRenderer;
  }(BaseRenderer);

  var PixelRenderer = /*#__PURE__*/function (_BaseRenderer) {
    _inheritsLoose(PixelRenderer, _BaseRenderer);

    function PixelRenderer(element, rectangle) {
      var _this;

      _this = _BaseRenderer.call(this, element) || this;
      _this.context = _this.element.getContext("2d");
      _this.imageData = null;
      _this.rectangle = rectangle;

      _this.createImageData(rectangle);

      _this.name = "PixelRenderer";
      return _this;
    }

    var _proto = PixelRenderer.prototype;

    _proto.resize = function resize(width, height) {
      this.element.width = width;
      this.element.height = height;
    };

    _proto.createImageData = function createImageData(rectangle) {
      this.rectangle = rectangle ? rectangle : new Rectangle(0, 0, this.element.width, this.element.height);
      this.imageData = this.context.createImageData(this.rectangle.width, this.rectangle.height);
      this.context.putImageData(this.imageData, this.rectangle.x, this.rectangle.y);
    };

    _proto.onProtonUpdate = function onProtonUpdate() {
      this.context.clearRect(this.rectangle.x, this.rectangle.y, this.rectangle.width, this.rectangle.height);
      this.imageData = this.context.getImageData(this.rectangle.x, this.rectangle.y, this.rectangle.width, this.rectangle.height);
    };

    _proto.onProtonUpdateAfter = function onProtonUpdateAfter() {
      this.context.putImageData(this.imageData, this.rectangle.x, this.rectangle.y);
    };

    _proto.onParticleCreated = function onParticleCreated(particle) {};

    _proto.onParticleUpdate = function onParticleUpdate(particle) {
      if (this.imageData) {
        this.setPixel(this.imageData, particle.p.x - this.rectangle.x >> 0, particle.p.y - this.rectangle.y >> 0, particle);
      }
    };

    _proto.setPixel = function setPixel(imagedata, x, y, particle) {
      var rgb = particle.rgb;
      if (x < 0 || x > this.element.width || y < 0 || y > this.elementwidth) return;
      var i = ((y >> 0) * imagedata.width + (x >> 0)) * 4;
      imagedata.data[i] = rgb.r;
      imagedata.data[i + 1] = rgb.g;
      imagedata.data[i + 2] = rgb.b;
      imagedata.data[i + 3] = particle.alpha * 255;
    };

    _proto.onParticleDead = function onParticleDead(particle) {};

    _proto.destroy = function destroy() {
      _BaseRenderer.prototype.destroy.call(this);

      this.stroke = null;
      this.context = null;
      this.imageData = null;
      this.rectangle = null;
    };

    return PixelRenderer;
  }(BaseRenderer);

  var PIXIClass;

  var PixiRenderer = /*#__PURE__*/function (_BaseRenderer) {
    _inheritsLoose(PixiRenderer, _BaseRenderer);

    function PixiRenderer(element, stroke) {
      var _this;

      _this = _BaseRenderer.call(this, element) || this;
      _this.stroke = stroke;
      _this.color = false;
      _this.setColor = false;
      _this.blendMode = null;

      _this.pool.create = function (body, particle) {
        return _this.createBody(body, particle);
      };

      _this.setPIXI(window.PIXI);

      _this.name = "PixiRenderer";
      return _this;
    }

    var _proto = PixiRenderer.prototype;

    _proto.setPIXI = function setPIXI(PIXI) {
      try {
        PIXIClass = PIXI || {
          Sprite: {}
        };
        this.createFromImage = PIXIClass.Sprite.from || PIXIClass.Sprite.fromImage;
      } catch (e) {}
    };

    _proto.onProtonUpdate = function onProtonUpdate() {}
    /**
     * @param particle
     */
    ;

    _proto.onParticleCreated = function onParticleCreated(particle) {
      if (particle.body) {
        particle.body = this.pool.get(particle.body, particle);
      } else {
        particle.body = this.pool.get(this.circleConf, particle);
      }

      if (this.blendMode) {
        particle.body.blendMode = this.blendMode;
      }

      this.element.addChild(particle.body);
    }
    /**
     * @param particle
     */
    ;

    _proto.onParticleUpdate = function onParticleUpdate(particle) {
      this.transform(particle, particle.body);

      if (this.setColor === true || this.color === true) {
        particle.body.tint = ColorUtil.getHex16FromParticle(particle);
      }
    }
    /**
     * @param particle
     */
    ;

    _proto.onParticleDead = function onParticleDead(particle) {
      this.element.removeChild(particle.body);
      this.pool.expire(particle.body);
      particle.body = null;
    };

    _proto.transform = function transform(particle, target) {
      target.x = particle.p.x;
      target.y = particle.p.y;
      target.alpha = particle.alpha;
      target.scale.x = particle.scale;
      target.scale.y = particle.scale; // using cached version of MathUtil.PI_180 for slight performance increase.

      target.rotation = particle.rotation * MathUtil.PI_180; // MathUtil.PI_180;
    };

    _proto.createBody = function createBody(body, particle) {
      if (body.isCircle) return this.createCircle(particle);else return this.createSprite(body);
    };

    _proto.createSprite = function createSprite(body) {
      var sprite = body.isInner ? this.createFromImage(body.src) : new PIXIClass.Sprite(body);
      sprite.anchor.x = 0.5;
      sprite.anchor.y = 0.5;
      return sprite;
    };

    _proto.createCircle = function createCircle(particle) {
      var graphics = new PIXIClass.Graphics();

      if (this.stroke) {
        var stroke = Types.isString(this.stroke) ? this.stroke : 0x000000;
        graphics.beginStroke(stroke);
      }

      graphics.beginFill(particle.color || 0x008ced);
      graphics.drawCircle(0, 0, particle.radius);
      graphics.endFill();
      return graphics;
    };

    _proto.destroy = function destroy(particles) {
      _BaseRenderer.prototype.destroy.call(this);

      var i = particles.length;

      while (i--) {
        var particle = particles[i];

        if (particle.body) {
          this.element.removeChild(particle.body);
        }
      }
    };

    return PixiRenderer;
  }(BaseRenderer);

  var MStack = /*#__PURE__*/function () {
    function MStack() {
      this.mats = [];
      this.size = 0;

      for (var i = 0; i < 20; i++) {
        this.mats.push(Mat3.create([0, 0, 0, 0, 0, 0, 0, 0, 0]));
      }
    }

    var _proto = MStack.prototype;

    _proto.set = function set(m, i) {
      if (i === 0) Mat3.set(m, this.mats[0]);else Mat3.multiply(this.mats[i - 1], m, this.mats[i]);
      this.size = Math.max(this.size, i + 1);
    };

    _proto.push = function push(m) {
      if (this.size === 0) Mat3.set(m, this.mats[0]);else Mat3.multiply(this.mats[this.size - 1], m, this.mats[this.size]);
      this.size++;
    };

    _proto.pop = function pop() {
      if (this.size > 0) this.size--;
    };

    _proto.top = function top() {
      return this.mats[this.size - 1];
    };

    return MStack;
  }();

  var WebGLRenderer = /*#__PURE__*/function (_BaseRenderer) {
    _inheritsLoose(WebGLRenderer, _BaseRenderer);

    function WebGLRenderer(element) {
      var _this;

      _this = _BaseRenderer.call(this, element) || this;
      _this.gl = _this.element.getContext("experimental-webgl", {
        antialias: true,
        stencil: false,
        depth: false
      });
      if (!_this.gl) alert("Sorry your browser do not suppest WebGL!");

      _this.initVar();

      _this.setMaxRadius();

      _this.initShaders();

      _this.initBuffers();

      _this.gl.blendEquation(_this.gl.FUNC_ADD);

      _this.gl.blendFunc(_this.gl.SRC_ALPHA, _this.gl.ONE_MINUS_SRC_ALPHA);

      _this.gl.enable(_this.gl.BLEND);

      _this.addImg2Body = _this.addImg2Body.bind(_assertThisInitialized(_this));
      _this.name = "WebGLRenderer";
      return _this;
    }

    var _proto = WebGLRenderer.prototype;

    _proto.init = function init(proton) {
      _BaseRenderer.prototype.init.call(this, proton);

      this.resize(this.element.width, this.element.height);
    };

    _proto.resize = function resize(width, height) {
      this.umat[4] = -2;
      this.umat[7] = 1;
      this.smat[0] = 1 / width;
      this.smat[4] = 1 / height;
      this.mstack.set(this.umat, 0);
      this.mstack.set(this.smat, 1);
      this.gl.viewport(0, 0, width, height);
      this.element.width = width;
      this.element.height = height;
    };

    _proto.setMaxRadius = function setMaxRadius(radius) {
      this.circleCanvasURL = this.createCircle(radius);
    };

    _proto.getVertexShader = function getVertexShader() {
      var vsSource = ["uniform vec2 viewport;", "attribute vec2 aVertexPosition;", "attribute vec2 aTextureCoord;", "uniform mat3 tMat;", "varying vec2 vTextureCoord;", "varying float alpha;", "void main() {", "vec3 v = tMat * vec3(aVertexPosition, 1.0);", "gl_Position = vec4(v.x, v.y, 0, 1);", "vTextureCoord = aTextureCoord;", "alpha = tMat[0][2];", "}"].join("\n");
      return vsSource;
    };

    _proto.getFragmentShader = function getFragmentShader() {
      var fsSource = ["precision mediump float;", "varying vec2 vTextureCoord;", "varying float alpha;", "uniform sampler2D uSampler;", "uniform vec4 color;", "uniform bool useTexture;", "uniform vec3 uColor;", "void main() {", "vec4 textureColor = texture2D(uSampler, vTextureCoord);", "gl_FragColor = textureColor * vec4(uColor, 1.0);", "gl_FragColor.w *= alpha;", "}"].join("\n");
      return fsSource;
    };

    _proto.initVar = function initVar() {
      this.mstack = new MStack();
      this.umat = Mat3.create([2, 0, 1, 0, -2, 0, -1, 1, 1]);
      this.smat = Mat3.create([1 / 100, 0, 1, 0, 1 / 100, 0, 0, 0, 1]);
      this.texturebuffers = {};
    };

    _proto.blendEquation = function blendEquation(A) {
      this.gl.blendEquation(this.gl[A]);
    };

    _proto.blendFunc = function blendFunc(A, B) {
      this.gl.blendFunc(this.gl[A], this.gl[B]);
    };

    _proto.getShader = function getShader(gl, str, fs) {
      var shader = fs ? gl.createShader(gl.FRAGMENT_SHADER) : gl.createShader(gl.VERTEX_SHADER);
      gl.shaderSource(shader, str);
      gl.compileShader(shader);

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert(gl.getShaderInfoLog(shader));
        return null;
      }

      return shader;
    };

    _proto.initShaders = function initShaders() {
      var fragmentShader = this.getShader(this.gl, this.getFragmentShader(), true);
      var vertexShader = this.getShader(this.gl, this.getVertexShader(), false);
      this.sprogram = this.gl.createProgram();
      this.gl.attachShader(this.sprogram, vertexShader);
      this.gl.attachShader(this.sprogram, fragmentShader);
      this.gl.linkProgram(this.sprogram);
      if (!this.gl.getProgramParameter(this.sprogram, this.gl.LINK_STATUS)) alert("Could not initialise shaders");
      this.gl.useProgram(this.sprogram);
      this.sprogram.vpa = this.gl.getAttribLocation(this.sprogram, "aVertexPosition");
      this.sprogram.tca = this.gl.getAttribLocation(this.sprogram, "aTextureCoord");
      this.gl.enableVertexAttribArray(this.sprogram.tca);
      this.gl.enableVertexAttribArray(this.sprogram.vpa);
      this.sprogram.tMatUniform = this.gl.getUniformLocation(this.sprogram, "tMat");
      this.sprogram.samplerUniform = this.gl.getUniformLocation(this.sprogram, "uSampler");
      this.sprogram.useTex = this.gl.getUniformLocation(this.sprogram, "useTexture");
      this.sprogram.color = this.gl.getUniformLocation(this.sprogram, "uColor");
      this.gl.uniform1i(this.sprogram.useTex, 1);
    };

    _proto.initBuffers = function initBuffers() {
      var vs = [0, 3, 1, 0, 2, 3];
      var idx;
      this.unitIBuffer = this.gl.createBuffer();
      this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.unitIBuffer);
      this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(vs), this.gl.STATIC_DRAW);
      var i;
      var ids = [];

      for (i = 0; i < 100; i++) {
        ids.push(i);
      }

      idx = new Uint16Array(ids);
      this.unitI33 = this.gl.createBuffer();
      this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.unitI33);
      this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, idx, this.gl.STATIC_DRAW);
      ids = [];

      for (i = 0; i < 100; i++) {
        ids.push(i, i + 1, i + 2);
      }

      idx = new Uint16Array(ids);
      this.stripBuffer = this.gl.createBuffer();
      this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.stripBuffer);
      this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, idx, this.gl.STATIC_DRAW);
    };

    _proto.createCircle = function createCircle(raidus) {
      this.circleCanvasRadius = WebGLUtil.nhpot(Util.initValue(raidus, 32));
      var canvas = DomUtil.createCanvas("circle_canvas", this.circleCanvasRadius * 2, this.circleCanvasRadius * 2);
      var context = canvas.getContext("2d");
      context.beginPath();
      context.arc(this.circleCanvasRadius, this.circleCanvasRadius, this.circleCanvasRadius, 0, Math.PI * 2, true);
      context.closePath();
      context.fillStyle = "#FFF";
      context.fill();
      return canvas.toDataURL();
    };

    _proto.drawImg2Canvas = function drawImg2Canvas(particle) {
      var _w = particle.body.width;
      var _h = particle.body.height;

      var _width = WebGLUtil.nhpot(particle.body.width);

      var _height = WebGLUtil.nhpot(particle.body.height);

      var _scaleX = particle.body.width / _width;

      var _scaleY = particle.body.height / _height;

      if (!this.texturebuffers[particle.data.src]) this.texturebuffers[particle.data.src] = [this.gl.createTexture(), this.gl.createBuffer(), this.gl.createBuffer()];
      particle.data.texture = this.texturebuffers[particle.data.src][0];
      particle.data.vcBuffer = this.texturebuffers[particle.data.src][1];
      particle.data.tcBuffer = this.texturebuffers[particle.data.src][2];
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, particle.data.tcBuffer);
      this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array([0.0, 0.0, _scaleX, 0.0, 0.0, _scaleY, _scaleY, _scaleY]), this.gl.STATIC_DRAW);
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, particle.data.vcBuffer);
      this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array([0.0, 0.0, _w, 0.0, 0.0, _h, _w, _h]), this.gl.STATIC_DRAW);
      var context = particle.data.canvas.getContext("2d");
      var data = context.getImageData(0, 0, _width, _height);
      this.gl.bindTexture(this.gl.TEXTURE_2D, particle.data.texture);
      this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, data);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR_MIPMAP_NEAREST);
      this.gl.generateMipmap(this.gl.TEXTURE_2D);
      particle.data.textureLoaded = true;
      particle.data.textureWidth = _w;
      particle.data.textureHeight = _h;
    };

    _proto.onProtonUpdate = function onProtonUpdate() {// this.gl.clearColor(0, 0, 0, 1);
      // this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    };

    _proto.onParticleCreated = function onParticleCreated(particle) {
      particle.data.textureLoaded = false;
      particle.data.tmat = Mat3.create();
      particle.data.tmat[8] = 1;
      particle.data.imat = Mat3.create();
      particle.data.imat[8] = 1;

      if (particle.body) {
        ImgUtil.getImgFromCache(particle.body, this.addImg2Body, particle);
      } else {
        ImgUtil.getImgFromCache(this.circleCanvasURL, this.addImg2Body, particle);
        particle.data.oldScale = particle.radius / this.circleCanvasRadius;
      }
    } // private
    ;

    _proto.addImg2Body = function addImg2Body(img, particle) {
      if (particle.dead) return;
      particle.body = img;
      particle.data.src = img.src;
      particle.data.canvas = ImgUtil.getCanvasFromCache(img);
      particle.data.oldScale = 1;
      this.drawImg2Canvas(particle);
    };

    _proto.onParticleUpdate = function onParticleUpdate(particle) {
      if (particle.data.textureLoaded) {
        this.updateMatrix(particle);
        this.gl.uniform3f(this.sprogram.color, particle.rgb.r / 255, particle.rgb.g / 255, particle.rgb.b / 255);
        this.gl.uniformMatrix3fv(this.sprogram.tMatUniform, false, this.mstack.top());
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, particle.data.vcBuffer);
        this.gl.vertexAttribPointer(this.sprogram.vpa, 2, this.gl.FLOAT, false, 0, 0);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, particle.data.tcBuffer);
        this.gl.vertexAttribPointer(this.sprogram.tca, 2, this.gl.FLOAT, false, 0, 0);
        this.gl.bindTexture(this.gl.TEXTURE_2D, particle.data.texture);
        this.gl.uniform1i(this.sprogram.samplerUniform, 0);
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.unitIBuffer);
        this.gl.drawElements(this.gl.TRIANGLES, 6, this.gl.UNSIGNED_SHORT, 0);
        this.mstack.pop();
      }
    };

    _proto.onParticleDead = function onParticleDead(particle) {};

    _proto.updateMatrix = function updateMatrix(particle) {
      var moveOriginMatrix = WebGLUtil.makeTranslation(-particle.data.textureWidth / 2, -particle.data.textureHeight / 2);
      var translationMatrix = WebGLUtil.makeTranslation(particle.p.x, particle.p.y);
      var angel = particle.rotation * MathUtil.PI_180;
      var rotationMatrix = WebGLUtil.makeRotation(angel);
      var scale = particle.scale * particle.data.oldScale;
      var scaleMatrix = WebGLUtil.makeScale(scale, scale);
      var matrix = WebGLUtil.matrixMultiply(moveOriginMatrix, scaleMatrix);
      matrix = WebGLUtil.matrixMultiply(matrix, rotationMatrix);
      matrix = WebGLUtil.matrixMultiply(matrix, translationMatrix);
      Mat3.inverse(matrix, particle.data.imat);
      matrix[2] = particle.alpha;
      this.mstack.push(matrix);
    };

    _proto.destroy = function destroy() {
      _BaseRenderer.prototype.destroy.call(this);

      this.gl = null;
      this.mstack = null;
      this.umat = null;
      this.smat = null;
      this.texturebuffers = null;
    };

    return WebGLRenderer;
  }(BaseRenderer);

  var CustomRenderer = /*#__PURE__*/function (_BaseRenderer) {
    _inheritsLoose(CustomRenderer, _BaseRenderer);

    function CustomRenderer(element) {
      var _this;

      _this = _BaseRenderer.call(this, element) || this;
      _this.name = "CustomRenderer";
      return _this;
    }

    return CustomRenderer;
  }(BaseRenderer);

  var LineZone = /*#__PURE__*/function (_Zone) {
    _inheritsLoose(LineZone, _Zone);

    function LineZone(x1, y1, x2, y2, direction) {
      var _this;

      _this = _Zone.call(this) || this;

      if (x2 - x1 >= 0) {
        _this.x1 = x1;
        _this.y1 = y1;
        _this.x2 = x2;
        _this.y2 = y2;
      } else {
        _this.x1 = x2;
        _this.y1 = y2;
        _this.x2 = x1;
        _this.y2 = y1;
      }

      _this.dx = _this.x2 - _this.x1;
      _this.dy = _this.y2 - _this.y1;
      _this.minx = Math.min(_this.x1, _this.x2);
      _this.miny = Math.min(_this.y1, _this.y2);
      _this.maxx = Math.max(_this.x1, _this.x2);
      _this.maxy = Math.max(_this.y1, _this.y2);
      _this.dot = _this.x2 * _this.y1 - _this.x1 * _this.y2;
      _this.xxyy = _this.dx * _this.dx + _this.dy * _this.dy;
      _this.gradient = _this.getGradient();
      _this.length = _this.getLength();
      _this.direction = Util.initValue(direction, ">");
      return _this;
    }

    var _proto = LineZone.prototype;

    _proto.getPosition = function getPosition() {
      this.random = Math.random();
      this.vector.x = this.x1 + this.random * this.length * Math.cos(this.gradient);
      this.vector.y = this.y1 + this.random * this.length * Math.sin(this.gradient);
      return this.vector;
    };

    _proto.getDirection = function getDirection(x, y) {
      var A = this.dy;
      var B = -this.dx;
      var C = this.dot;
      var D = B === 0 ? 1 : B;
      if ((A * x + B * y + C) * D > 0) return true;else return false;
    };

    _proto.getDistance = function getDistance(x, y) {
      var A = this.dy;
      var B = -this.dx;
      var C = this.dot;
      var D = A * x + B * y + C;
      return D / Math.sqrt(this.xxyy);
    };

    _proto.getSymmetric = function getSymmetric(v) {
      var tha2 = v.getGradient();
      var tha1 = this.getGradient();
      var tha = 2 * (tha1 - tha2);
      var oldx = v.x;
      var oldy = v.y;
      v.x = oldx * Math.cos(tha) - oldy * Math.sin(tha);
      v.y = oldx * Math.sin(tha) + oldy * Math.cos(tha);
      return v;
    };

    _proto.getGradient = function getGradient() {
      return Math.atan2(this.dy, this.dx);
    };

    _proto.rangeOut = function rangeOut(particle) {
      var angle = Math.abs(this.getGradient());

      if (angle <= MathUtil.PI / 4) {
        if (particle.p.x <= this.maxx && particle.p.x >= this.minx) return true;
      } else {
        if (particle.p.y <= this.maxy && particle.p.y >= this.miny) return true;
      }

      return false;
    };

    _proto.getLength = function getLength() {
      return Math.sqrt(this.dx * this.dx + this.dy * this.dy);
    };

    _proto.crossing = function crossing(particle) {
      if (this.crossType === "dead") {
        if (this.direction === ">" || this.direction === "R" || this.direction === "right" || this.direction === "down") {
          if (!this.rangeOut(particle)) return;
          if (this.getDirection(particle.p.x, particle.p.y)) particle.dead = true;
        } else {
          if (!this.rangeOut(particle)) return;
          if (!this.getDirection(particle.p.x, particle.p.y)) particle.dead = true;
        }
      } else if (this.crossType === "bound") {
        if (!this.rangeOut(particle)) return;

        if (this.getDistance(particle.p.x, particle.p.y) <= particle.radius) {
          if (this.dx === 0) {
            particle.v.x *= -1;
          } else if (this.dy === 0) {
            particle.v.y *= -1;
          } else {
            this.getSymmetric(particle.v);
          }
        }
      } else if (this.crossType === "cross") {
        if (this.alert) {
          console.error("Sorry, LineZone does not support cross method!");
          this.alert = false;
        }
      }
    };

    return LineZone;
  }(Zone);

  var CircleZone = /*#__PURE__*/function (_Zone) {
    _inheritsLoose(CircleZone, _Zone);

    function CircleZone(x, y, radius) {
      var _this;

      _this = _Zone.call(this) || this;
      _this.x = x;
      _this.y = y;
      _this.radius = radius;
      _this.angle = 0;
      _this.center = {
        x: x,
        y: y
      };
      return _this;
    }

    var _proto = CircleZone.prototype;

    _proto.getPosition = function getPosition() {
      this.angle = MathUtil.PIx2 * Math.random();
      this.randomRadius = Math.random() * this.radius;
      this.vector.x = this.x + this.randomRadius * Math.cos(this.angle);
      this.vector.y = this.y + this.randomRadius * Math.sin(this.angle);
      return this.vector;
    };

    _proto.setCenter = function setCenter(x, y) {
      this.center.x = x;
      this.center.y = y;
    };

    _proto.crossing = function crossing(particle) {
      var d = particle.p.distanceTo(this.center);

      if (this.crossType === "dead") {
        if (d - particle.radius > this.radius) particle.dead = true;
      } else if (this.crossType === "bound") {
        if (d + particle.radius >= this.radius) this.getSymmetric(particle);
      } else if (this.crossType === "cross") {
        if (this.alert) {
          console.error("Sorry, CircleZone does not support cross method!");
          this.alert = false;
        }
      }
    };

    _proto.getSymmetric = function getSymmetric(particle) {
      var tha2 = particle.v.getGradient();
      var tha1 = this.getGradient(particle);
      var tha = 2 * (tha1 - tha2);
      var oldx = particle.v.x;
      var oldy = particle.v.y;
      particle.v.x = oldx * Math.cos(tha) - oldy * Math.sin(tha);
      particle.v.y = oldx * Math.sin(tha) + oldy * Math.cos(tha);
    };

    _proto.getGradient = function getGradient(particle) {
      return -MathUtil.PI_2 + Math.atan2(particle.p.y - this.center.y, particle.p.x - this.center.x);
    };

    return CircleZone;
  }(Zone);

  var RectZone = /*#__PURE__*/function (_Zone) {
    _inheritsLoose(RectZone, _Zone);

    function RectZone(x, y, width, height) {
      var _this;

      _this = _Zone.call(this) || this;
      _this.x = x;
      _this.y = y;
      _this.width = width;
      _this.height = height;
      return _this;
    }

    var _proto = RectZone.prototype;

    _proto.getPosition = function getPosition() {
      this.vector.x = this.x + Math.random() * this.width;
      this.vector.y = this.y + Math.random() * this.height;
      return this.vector;
    };

    _proto.crossing = function crossing(particle) {
      // particle dead zone
      if (this.crossType === "dead") {
        if (particle.p.x + particle.radius < this.x) particle.dead = true;else if (particle.p.x - particle.radius > this.x + this.width) particle.dead = true;
        if (particle.p.y + particle.radius < this.y) particle.dead = true;else if (particle.p.y - particle.radius > this.y + this.height) particle.dead = true;
      } // particle bound zone
      else if (this.crossType === "bound") {
        if (particle.p.x - particle.radius < this.x) {
          particle.p.x = this.x + particle.radius;
          particle.v.x *= -1;
        } else if (particle.p.x + particle.radius > this.x + this.width) {
          particle.p.x = this.x + this.width - particle.radius;
          particle.v.x *= -1;
        }

        if (particle.p.y - particle.radius < this.y) {
          particle.p.y = this.y + particle.radius;
          particle.v.y *= -1;
        } else if (particle.p.y + particle.radius > this.y + this.height) {
          particle.p.y = this.y + this.height - particle.radius;
          particle.v.y *= -1;
        }
      } // particle cross zone
      else if (this.crossType === "cross") {
        if (particle.p.x + particle.radius < this.x && particle.v.x <= 0) {
          particle.p.x = this.x + this.width + particle.radius;
        } else if (particle.p.x - particle.radius > this.x + this.width && particle.v.x >= 0) {
          particle.p.x = this.x - particle.radius;
        }

        if (particle.p.y + particle.radius < this.y && particle.v.y <= 0) {
          particle.p.y = this.y + this.height + particle.radius;
        } else if (particle.p.y - particle.radius > this.y + this.height && particle.v.y >= 0) {
          particle.p.y = this.y - particle.radius;
        }
      }
    };

    return RectZone;
  }(Zone);

  var ImageZone = /*#__PURE__*/function (_Zone) {
    _inheritsLoose(ImageZone, _Zone);

    function ImageZone(imageData, x, y, d) {
      var _this;

      _this = _Zone.call(this) || this;

      _this.reset(imageData, x, y, d);

      return _this;
    }

    var _proto = ImageZone.prototype;

    _proto.reset = function reset(imageData, x, y, d) {
      this.imageData = imageData;
      this.x = Util.initValue(x, 0);
      this.y = Util.initValue(y, 0);
      this.d = Util.initValue(d, 2);
      this.vectors = [];
      this.setVectors();
    };

    _proto.setVectors = function setVectors() {
      var i, j;
      var length1 = this.imageData.width;
      var length2 = this.imageData.height;

      for (i = 0; i < length1; i += this.d) {
        for (j = 0; j < length2; j += this.d) {
          var index = ((j >> 0) * length1 + (i >> 0)) * 4;

          if (this.imageData.data[index + 3] > 0) {
            this.vectors.push({
              x: i + this.x,
              y: j + this.y
            });
          }
        }
      }

      return this.vector;
    };

    _proto.getBound = function getBound(x, y) {
      var index = ((y >> 0) * this.imageData.width + (x >> 0)) * 4;
      if (this.imageData.data[index + 3] > 0) return true;else return false;
    };

    _proto.getPosition = function getPosition() {
      var vector = Util.getRandFromArray(this.vectors);
      return this.vector.copy(vector);
    };

    _proto.getColor = function getColor(x, y) {
      x -= this.x;
      y -= this.y;
      var i = ((y >> 0) * this.imageData.width + (x >> 0)) * 4;
      return {
        r: this.imageData.data[i],
        g: this.imageData.data[i + 1],
        b: this.imageData.data[i + 2],
        a: this.imageData.data[i + 3]
      };
    };

    _proto.crossing = function crossing(particle) {
      if (this.crossType === "dead") {
        if (this.getBound(particle.p.x - this.x, particle.p.y - this.y)) particle.dead = true;else particle.dead = false;
      } else if (this.crossType === "bound") {
        if (!this.getBound(particle.p.x - this.x, particle.p.y - this.y)) particle.v.negate();
      }
    };

    _proto.destroy = function destroy() {
      _Zone.prototype.destroy.call(this);

      this.imageData = null;
    };

    return ImageZone;
  }(Zone);

  var Debug = {
    addEventListener: function addEventListener(proton, func) {
      proton.addEventListener("PROTON_UPDATE_AFTER", function () {
        return func();
      });
    },
    getStyle: function getStyle(color) {
      if (color === void 0) {
        color = "#ff0000";
      }

      var rgb = ColorUtil.hexToRgb(color);
      return "rgba(" + rgb.r + ", " + rgb.g + ", " + rgb.b + ", 0.5)";
    },
    drawZone: function drawZone(proton, canvas, zone, clear) {
      var context = canvas.getContext("2d");
      var style = this.getStyle();
      this.addEventListener(proton, function () {
        if (clear) context.clearRect(0, 0, canvas.width, canvas.height);

        if (zone instanceof PointZone) {
          context.beginPath();
          context.fillStyle = style;
          context.arc(zone.x, zone.y, 10, 0, Math.PI * 2, true);
          context.fill();
          context.closePath();
        } else if (zone instanceof LineZone) {
          context.beginPath();
          context.strokeStyle = style;
          context.moveTo(zone.x1, zone.y1);
          context.lineTo(zone.x2, zone.y2);
          context.stroke();
          context.closePath();
        } else if (zone instanceof RectZone) {
          context.beginPath();
          context.strokeStyle = style;
          context.drawRect(zone.x, zone.y, zone.width, zone.height);
          context.stroke();
          context.closePath();
        } else if (zone instanceof CircleZone) {
          context.beginPath();
          context.strokeStyle = style;
          context.arc(zone.x, zone.y, zone.radius, 0, Math.PI * 2, true);
          context.stroke();
          context.closePath();
        }
      });
    },
    drawEmitter: function drawEmitter(proton, canvas, emitter, clear) {
      var context = canvas.getContext("2d");
      var style = this.getStyle();
      this.addEventListener(proton, function () {
        if (clear) context.clearRect(0, 0, canvas.width, canvas.height);
        context.beginPath();
        context.fillStyle = style;
        context.arc(emitter.p.x, emitter.p.y, 10, 0, Math.PI * 2, true);
        context.fill();
        context.closePath();
      });
    }
  };

  Proton.Particle = Particle;
  Proton.Pool = Pool;
  Proton.Util = Util;
  Proton.ColorUtil = ColorUtil;
  Proton.MathUtil = MathUtil;
  Proton.Vector2D = Proton.Vector = Vector2D;
  Proton.Polar2D = Proton.Polar = Polar2D;
  Proton.ArraySpan = ArraySpan;
  Proton.Rectangle = Rectangle;
  Proton.Rate = Rate;
  Proton.ease = ease;
  Proton.Span = Span$1;
  Proton.Mat3 = Mat3;

  Proton.getSpan = function (a, b, center) {
    return new Span$1(a, b, center);
  };

  Proton.createArraySpan = ArraySpan.createArraySpan;
  Proton.Initialize = Proton.Init = Initialize;
  Proton.Life = Proton.L = Life;
  Proton.Position = Proton.P = Position;
  Proton.Velocity = Proton.V = Velocity;
  Proton.Mass = Proton.M = Mass;
  Proton.Radius = Proton.R = Radius;
  Proton.Body = Proton.B = Body;
  Proton.Behaviour = Behaviour;
  Proton.Force = Proton.F = Force;
  Proton.Attraction = Proton.A = Attraction;
  Proton.RandomDrift = Proton.RD = RandomDrift;
  Proton.Gravity = Proton.G = Gravity;
  Proton.Collision = Collision;
  Proton.CrossZone = CrossZone;
  Proton.Alpha = Alpha;
  Proton.Scale = Proton.S = Scale;
  Proton.Rotate = Rotate;
  Proton.Color = Color;
  Proton.Repulsion = Repulsion;
  Proton.Cyclone = Cyclone;
  Proton.GravityWell = GravityWell;
  Proton.Emitter = Emitter;
  Proton.BehaviourEmitter = BehaviourEmitter;
  Proton.FollowEmitter = FollowEmitter;
  Proton.Zone = Zone;
  Proton.LineZone = LineZone;
  Proton.CircleZone = CircleZone;
  Proton.PointZone = PointZone;
  Proton.RectZone = RectZone;
  Proton.ImageZone = ImageZone;
  Proton.CanvasRenderer = CanvasRenderer;
  Proton.DomRenderer = DomRenderer;
  Proton.EaselRenderer = EaselRenderer;
  Proton.PixiRenderer = PixiRenderer;
  Proton.PixelRenderer = PixelRenderer;
  Proton.WebGLRenderer = Proton.WebGlRenderer = WebGLRenderer;
  Proton.CustomRenderer = CustomRenderer;
  Proton.Debug = Debug;
  Util.assign(Proton, ease); // export

  return Proton;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvdG9uLmpzIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMvV2ViR0xVdGlsLmpzIiwiLi4vc3JjL3V0aWxzL0RvbVV0aWwuanMiLCIuLi9zcmMvdXRpbHMvSW1nVXRpbC5qcyIsIi4uL3NyYy91dGlscy9VdGlsLmpzIiwiLi4vc3JjL3V0aWxzL1B1aWQuanMiLCIuLi9zcmMvY29yZS9Qb29sLmpzIiwiLi4vc3JjL2RlYnVnL1N0YXRzLmpzIiwiLi4vc3JjL2V2ZW50cy9FdmVudERpc3BhdGNoZXIuanMiLCIuLi9zcmMvbWF0aC9NYXRoVXRpbC5qcyIsIi4uL3NyYy9tYXRoL0ludGVncmF0aW9uLmpzIiwiLi4vc3JjL2NvcmUvUHJvdG9uLmpzIiwiLi4vc3JjL3V0aWxzL1JnYi5qcyIsIi4uL3NyYy91dGlscy9Qcm9wVXRpbC5qcyIsIi4uL3NyYy9tYXRoL2Vhc2UuanMiLCIuLi9zcmMvbWF0aC9WZWN0b3IyRC5qcyIsIi4uL3NyYy9jb3JlL1BhcnRpY2xlLmpzIiwiLi4vc3JjL3V0aWxzL0NvbG9yVXRpbC5qcyIsIi4uL3NyYy9tYXRoL1BvbGFyMkQuanMiLCIuLi9zcmMvbWF0aC9NYXQzLmpzIiwiLi4vc3JjL21hdGgvU3Bhbi5qcyIsIi4uL3NyYy9tYXRoL0FycmF5U3Bhbi5qcyIsIi4uL3NyYy9tYXRoL1JlY3RhbmdsZS5qcyIsIi4uL3NyYy9pbml0aWFsaXplL1JhdGUuanMiLCIuLi9zcmMvaW5pdGlhbGl6ZS9Jbml0aWFsaXplLmpzIiwiLi4vc3JjL2luaXRpYWxpemUvTGlmZS5qcyIsIi4uL3NyYy96b25lL1pvbmUuanMiLCIuLi9zcmMvem9uZS9Qb2ludFpvbmUuanMiLCIuLi9zcmMvaW5pdGlhbGl6ZS9Qb3NpdGlvbi5qcyIsIi4uL3NyYy9pbml0aWFsaXplL1ZlbG9jaXR5LmpzIiwiLi4vc3JjL2luaXRpYWxpemUvTWFzcy5qcyIsIi4uL3NyYy9pbml0aWFsaXplL1JhZGl1cy5qcyIsIi4uL3NyYy9pbml0aWFsaXplL0JvZHkuanMiLCIuLi9zcmMvYmVoYXZpb3VyL0JlaGF2aW91ci5qcyIsIi4uL3NyYy9iZWhhdmlvdXIvRm9yY2UuanMiLCIuLi9zcmMvYmVoYXZpb3VyL0F0dHJhY3Rpb24uanMiLCIuLi9zcmMvYmVoYXZpb3VyL1JhbmRvbURyaWZ0LmpzIiwiLi4vc3JjL2JlaGF2aW91ci9HcmF2aXR5LmpzIiwiLi4vc3JjL2JlaGF2aW91ci9Db2xsaXNpb24uanMiLCIuLi9zcmMvYmVoYXZpb3VyL0Nyb3NzWm9uZS5qcyIsIi4uL3NyYy9iZWhhdmlvdXIvQWxwaGEuanMiLCIuLi9zcmMvYmVoYXZpb3VyL1NjYWxlLmpzIiwiLi4vc3JjL2JlaGF2aW91ci9Sb3RhdGUuanMiLCIuLi9zcmMvYmVoYXZpb3VyL0NvbG9yLmpzIiwiLi4vc3JjL2JlaGF2aW91ci9DeWNsb25lLmpzIiwiLi4vc3JjL2JlaGF2aW91ci9SZXB1bHNpb24uanMiLCIuLi9zcmMvYmVoYXZpb3VyL0dyYXZpdHlXZWxsLmpzIiwiLi4vc3JjL2luaXRpYWxpemUvSW5pdGlhbGl6ZVV0aWwuanMiLCIuLi9zcmMvZW1pdHRlci9FbWl0dGVyLmpzIiwiLi4vc3JjL2VtaXR0ZXIvQmVoYXZpb3VyRW1pdHRlci5qcyIsIi4uL3NyYy9lbWl0dGVyL0ZvbGxvd0VtaXR0ZXIuanMiLCIuLi9zcmMvdXRpbHMvVHlwZXMuanMiLCIuLi9zcmMvcmVuZGVyL0Jhc2VSZW5kZXJlci5qcyIsIi4uL3NyYy9yZW5kZXIvQ2FudmFzUmVuZGVyZXIuanMiLCIuLi9zcmMvcmVuZGVyL0RvbVJlbmRlcmVyLmpzIiwiLi4vc3JjL3JlbmRlci9FYXNlbFJlbmRlcmVyLmpzIiwiLi4vc3JjL3JlbmRlci9QaXhlbFJlbmRlcmVyLmpzIiwiLi4vc3JjL3JlbmRlci9QaXhpUmVuZGVyZXIuanMiLCIuLi9zcmMvdXRpbHMvTVN0YWNrLmpzIiwiLi4vc3JjL3JlbmRlci9XZWJHTFJlbmRlcmVyLmpzIiwiLi4vc3JjL3JlbmRlci9DdXN0b21SZW5kZXJlci5qcyIsIi4uL3NyYy96b25lL0xpbmVab25lLmpzIiwiLi4vc3JjL3pvbmUvQ2lyY2xlWm9uZS5qcyIsIi4uL3NyYy96b25lL1JlY3Rab25lLmpzIiwiLi4vc3JjL3pvbmUvSW1hZ2Vab25lLmpzIiwiLi4vc3JjL2RlYnVnL0RlYnVnLmpzIiwiLi4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IHtcbiAgLyoqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLldlYkdMVXRpbFxuICAgKiBAbWV0aG9kIGlwb3RcbiAgICpcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uXG4gICAqIEB0b2RvIGFkZCBsZW5ndGggZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGxlbmd0aFxuICAgKlxuICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgKi9cbiAgaXBvdChsZW5ndGgpIHtcbiAgICByZXR1cm4gKGxlbmd0aCAmIChsZW5ndGggLSAxKSkgPT09IDA7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLldlYkdMVXRpbFxuICAgKiBAbWV0aG9kIG5ocG90XG4gICAqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvblxuICAgKiBAdG9kbyBhZGQgbGVuZ3RoIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBsZW5ndGhcbiAgICpcbiAgICogQHJldHVybiB7TnVtYmVyfVxuICAgKi9cbiAgbmhwb3QobGVuZ3RoKSB7XG4gICAgLS1sZW5ndGg7XG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCAzMjsgaSA8PD0gMSkge1xuICAgICAgbGVuZ3RoID0gbGVuZ3RoIHwgKGxlbmd0aCA+PiBpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbGVuZ3RoICsgMTtcbiAgfSxcblxuICAvKipcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uV2ViR0xVdGlsXG4gICAqIEBtZXRob2QgbWFrZVRyYW5zbGF0aW9uXG4gICAqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvblxuICAgKiBAdG9kbyBhZGQgdHgsIHR5IGRlc2NyaXB0aW9uXG4gICAqIEB0b2RvIGFkZCByZXR1cm4gZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHR4IGVpdGhlciAwIG9yIDFcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHR5IGVpdGhlciAwIG9yIDFcbiAgICpcbiAgICogQHJldHVybiB7T2JqZWN0fVxuICAgKi9cbiAgbWFrZVRyYW5zbGF0aW9uKHR4LCB0eSkge1xuICAgIHJldHVybiBbMSwgMCwgMCwgMCwgMSwgMCwgdHgsIHR5LCAxXTtcbiAgfSxcblxuICAvKipcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uV2ViR0xVdGlsXG4gICAqIEBtZXRob2QgbWFrZVJvdGF0aW9uXG4gICAqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvblxuICAgKiBAdG9kbyBhZGQgcmV0dXJuIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBhbmdsZUluUmFkaWFuc1xuICAgKlxuICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAqL1xuICBtYWtlUm90YXRpb24oYW5nbGVJblJhZGlhbnMpIHtcbiAgICBsZXQgYyA9IE1hdGguY29zKGFuZ2xlSW5SYWRpYW5zKTtcbiAgICBsZXQgcyA9IE1hdGguc2luKGFuZ2xlSW5SYWRpYW5zKTtcblxuICAgIHJldHVybiBbYywgLXMsIDAsIHMsIGMsIDAsIDAsIDAsIDFdO1xuICB9LFxuXG4gIC8qKlxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5XZWJHTFV0aWxcbiAgICogQG1ldGhvZCBtYWtlU2NhbGVcbiAgICpcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uXG4gICAqIEB0b2RvIGFkZCB0eCwgdHkgZGVzY3JpcHRpb25cbiAgICogQHRvZG8gYWRkIHJldHVybiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gc3ggZWl0aGVyIDAgb3IgMVxuICAgKiBAcGFyYW0ge051bWJlcn0gc3kgZWl0aGVyIDAgb3IgMVxuICAgKlxuICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAqL1xuICBtYWtlU2NhbGUoc3gsIHN5KSB7XG4gICAgcmV0dXJuIFtzeCwgMCwgMCwgMCwgc3ksIDAsIDAsIDAsIDFdO1xuICB9LFxuXG4gIC8qKlxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5XZWJHTFV0aWxcbiAgICogQG1ldGhvZCBtYXRyaXhNdWx0aXBseVxuICAgKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb25cbiAgICogQHRvZG8gYWRkIGEsIGIgZGVzY3JpcHRpb25cbiAgICogQHRvZG8gYWRkIHJldHVybiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gYVxuICAgKiBAcGFyYW0ge09iamVjdH0gYlxuICAgKlxuICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAqL1xuICBtYXRyaXhNdWx0aXBseShhLCBiKSB7XG4gICAgbGV0IGEwMCA9IGFbMCAqIDMgKyAwXTtcbiAgICBsZXQgYTAxID0gYVswICogMyArIDFdO1xuICAgIGxldCBhMDIgPSBhWzAgKiAzICsgMl07XG4gICAgbGV0IGExMCA9IGFbMSAqIDMgKyAwXTtcbiAgICBsZXQgYTExID0gYVsxICogMyArIDFdO1xuICAgIGxldCBhMTIgPSBhWzEgKiAzICsgMl07XG4gICAgbGV0IGEyMCA9IGFbMiAqIDMgKyAwXTtcbiAgICBsZXQgYTIxID0gYVsyICogMyArIDFdO1xuICAgIGxldCBhMjIgPSBhWzIgKiAzICsgMl07XG4gICAgbGV0IGIwMCA9IGJbMCAqIDMgKyAwXTtcbiAgICBsZXQgYjAxID0gYlswICogMyArIDFdO1xuICAgIGxldCBiMDIgPSBiWzAgKiAzICsgMl07XG4gICAgbGV0IGIxMCA9IGJbMSAqIDMgKyAwXTtcbiAgICBsZXQgYjExID0gYlsxICogMyArIDFdO1xuICAgIGxldCBiMTIgPSBiWzEgKiAzICsgMl07XG4gICAgbGV0IGIyMCA9IGJbMiAqIDMgKyAwXTtcbiAgICBsZXQgYjIxID0gYlsyICogMyArIDFdO1xuICAgIGxldCBiMjIgPSBiWzIgKiAzICsgMl07XG5cbiAgICByZXR1cm4gW1xuICAgICAgYTAwICogYjAwICsgYTAxICogYjEwICsgYTAyICogYjIwLFxuICAgICAgYTAwICogYjAxICsgYTAxICogYjExICsgYTAyICogYjIxLFxuICAgICAgYTAwICogYjAyICsgYTAxICogYjEyICsgYTAyICogYjIyLFxuICAgICAgYTEwICogYjAwICsgYTExICogYjEwICsgYTEyICogYjIwLFxuICAgICAgYTEwICogYjAxICsgYTExICogYjExICsgYTEyICogYjIxLFxuICAgICAgYTEwICogYjAyICsgYTExICogYjEyICsgYTEyICogYjIyLFxuICAgICAgYTIwICogYjAwICsgYTIxICogYjEwICsgYTIyICogYjIwLFxuICAgICAgYTIwICogYjAxICsgYTIxICogYjExICsgYTIyICogYjIxLFxuICAgICAgYTIwICogYjAyICsgYTIxICogYjEyICsgYTIyICogYjIyXG4gICAgXTtcbiAgfVxufTtcbiIsImV4cG9ydCBkZWZhdWx0IHtcbiAgLyoqXG4gICAqIENyZWF0ZXMgYW5kIHJldHVybnMgYSBuZXcgY2FudmFzLiBUaGUgb3BhY2l0eSBpcyBieSBkZWZhdWx0IHNldCB0byAwXG4gICAqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkRvbVV0aWxcbiAgICogQG1ldGhvZCBjcmVhdGVDYW52YXNcbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9ICRpZCB0aGUgY2FudmFzJyBpZFxuICAgKiBAcGFyYW0ge051bWJlcn0gJHdpZHRoIHRoZSBjYW52YXMnIHdpZHRoXG4gICAqIEBwYXJhbSB7TnVtYmVyfSAkaGVpZ2h0IHRoZSBjYW52YXMnIGhlaWdodFxuICAgKiBAcGFyYW0ge1N0cmluZ30gWyRwb3NpdGlvbj1hYnNvbHV0ZV0gdGhlIGNhbnZhcycgcG9zaXRpb24sIGRlZmF1bHQgaXMgJ2Fic29sdXRlJ1xuICAgKlxuICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAqL1xuICBjcmVhdGVDYW52YXMoaWQsIHdpZHRoLCBoZWlnaHQsIHBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiKSB7XG4gICAgY29uc3QgZG9tID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcblxuICAgIGRvbS5pZCA9IGlkO1xuICAgIGRvbS53aWR0aCA9IHdpZHRoO1xuICAgIGRvbS5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgZG9tLnN0eWxlLm9wYWNpdHkgPSAwO1xuICAgIGRvbS5zdHlsZS5wb3NpdGlvbiA9IHBvc2l0aW9uO1xuICAgIHRoaXMudHJhbnNmb3JtKGRvbSwgLTUwMCwgLTUwMCwgMCwgMCk7XG5cbiAgICByZXR1cm4gZG9tO1xuICB9LFxuXG4gIGNyZWF0ZURpdihpZCwgd2lkdGgsIGhlaWdodCkge1xuICAgIGNvbnN0IGRvbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cbiAgICBkb20uaWQgPSBpZDtcbiAgICBkb20uc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG4gICAgdGhpcy5yZXNpemUoZG9tLCB3aWR0aCwgaGVpZ2h0KTtcblxuICAgIHJldHVybiBkb207XG4gIH0sXG5cbiAgcmVzaXplKGRvbSwgd2lkdGgsIGhlaWdodCkge1xuICAgIGRvbS5zdHlsZS53aWR0aCA9IHdpZHRoICsgXCJweFwiO1xuICAgIGRvbS5zdHlsZS5oZWlnaHQgPSBoZWlnaHQgKyBcInB4XCI7XG4gICAgZG9tLnN0eWxlLm1hcmdpbkxlZnQgPSAtd2lkdGggLyAyICsgXCJweFwiO1xuICAgIGRvbS5zdHlsZS5tYXJnaW5Ub3AgPSAtaGVpZ2h0IC8gMiArIFwicHhcIjtcbiAgfSxcblxuICAvKipcbiAgICogQWRkcyBhIHRyYW5zZm9ybTogdHJhbnNsYXRlKCksIHNjYWxlKCksIHJvdGF0ZSgpIHRvIGEgZ2l2ZW4gZGl2IGRvbSBmb3IgYWxsIGJyb3dzZXJzXG4gICAqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkRvbVV0aWxcbiAgICogQG1ldGhvZCB0cmFuc2Zvcm1cbiAgICpcbiAgICogQHBhcmFtIHtIVE1MRGl2RWxlbWVudH0gZGl2XG4gICAqIEBwYXJhbSB7TnVtYmVyfSAkeFxuICAgKiBAcGFyYW0ge051bWJlcn0gJHlcbiAgICogQHBhcmFtIHtOdW1iZXJ9ICRzY2FsZVxuICAgKiBAcGFyYW0ge051bWJlcn0gJHJvdGF0ZVxuICAgKi9cbiAgdHJhbnNmb3JtKGRpdiwgeCwgeSwgc2NhbGUsIHJvdGF0ZSkge1xuICAgIGRpdi5zdHlsZS53aWxsQ2hhbmdlID0gXCJ0cmFuc2Zvcm1cIjtcbiAgICBjb25zdCB0cmFuc2Zvcm0gPSBgdHJhbnNsYXRlKCR7eH1weCwgJHt5fXB4KSBzY2FsZSgke3NjYWxlfSkgcm90YXRlKCR7cm90YXRlfWRlZylgO1xuICAgIHRoaXMuY3NzMyhkaXYsIFwidHJhbnNmb3JtXCIsIHRyYW5zZm9ybSk7XG4gIH0sXG5cbiAgdHJhbnNmb3JtM2QoZGl2LCB4LCB5LCBzY2FsZSwgcm90YXRlKSB7XG4gICAgZGl2LnN0eWxlLndpbGxDaGFuZ2UgPSBcInRyYW5zZm9ybVwiO1xuICAgIGNvbnN0IHRyYW5zZm9ybSA9IGB0cmFuc2xhdGUzZCgke3h9cHgsICR7eX1weCwgMCkgc2NhbGUoJHtzY2FsZX0pIHJvdGF0ZSgke3JvdGF0ZX1kZWcpYDtcbiAgICB0aGlzLmNzczMoZGl2LCBcImJhY2tmYWNlVmlzaWJpbGl0eVwiLCBcImhpZGRlblwiKTtcbiAgICB0aGlzLmNzczMoZGl2LCBcInRyYW5zZm9ybVwiLCB0cmFuc2Zvcm0pO1xuICB9LFxuXG4gIGNzczMoZGl2LCBrZXksIHZhbCkge1xuICAgIGNvbnN0IGJrZXkgPSBrZXkuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBrZXkuc3Vic3RyKDEpO1xuXG4gICAgZGl2LnN0eWxlW2BXZWJraXQke2JrZXl9YF0gPSB2YWw7XG4gICAgZGl2LnN0eWxlW2BNb3oke2JrZXl9YF0gPSB2YWw7XG4gICAgZGl2LnN0eWxlW2BPJHtia2V5fWBdID0gdmFsO1xuICAgIGRpdi5zdHlsZVtgbXMke2JrZXl9YF0gPSB2YWw7XG4gICAgZGl2LnN0eWxlW2Ake2tleX1gXSA9IHZhbDtcbiAgfVxufTtcbiIsImltcG9ydCBXZWJHTFV0aWwgZnJvbSBcIi4vV2ViR0xVdGlsXCI7XG5pbXBvcnQgRG9tVXRpbCBmcm9tIFwiLi9Eb21VdGlsXCI7XG5cbmNvbnN0IGltZ3NDYWNoZSA9IHt9O1xuY29uc3QgY2FudmFzQ2FjaGUgPSB7fTtcbmxldCBjYW52YXNJZCA9IDA7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgLyoqXG4gICAqIFRoaXMgd2lsbCBnZXQgdGhlIGltYWdlIGRhdGEuIEl0IGNvdWxkIGJlIG5lY2Vzc2FyeSB0byBjcmVhdGUgYSBQcm90b24uWm9uZS5cbiAgICpcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uVXRpbFxuICAgKiBAbWV0aG9kIGdldEltYWdlRGF0YVxuICAgKlxuICAgKiBAcGFyYW0ge0hUTUxDYW52YXNFbGVtZW50fSAgIGNvbnRleHQgYW55IGNhbnZhcywgbXVzdCBiZSBhIDJkQ29udGV4dCAnY2FudmFzLmdldENvbnRleHQoJzJkJyknXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAgICAgICAgICAgICAgaW1hZ2UgICBjb3VsZCBiZSBhbnkgZG9tIGltYWdlLCBlLmcuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aGlzSXNBbkltZ1RhZycpO1xuICAgKiBAcGFyYW0ge1Byb3Rvbi5SZWN0YW5nbGV9ICAgIHJlY3RcbiAgICovXG4gIGdldEltYWdlRGF0YShjb250ZXh0LCBpbWFnZSwgcmVjdCkge1xuICAgIGNvbnRleHQuZHJhd0ltYWdlKGltYWdlLCByZWN0LngsIHJlY3QueSk7XG4gICAgY29uc3QgaW1hZ2VkYXRhID0gY29udGV4dC5nZXRJbWFnZURhdGEocmVjdC54LCByZWN0LnksIHJlY3Qud2lkdGgsIHJlY3QuaGVpZ2h0KTtcbiAgICBjb250ZXh0LmNsZWFyUmVjdChyZWN0LngsIHJlY3QueSwgcmVjdC53aWR0aCwgcmVjdC5oZWlnaHQpO1xuXG4gICAgcmV0dXJuIGltYWdlZGF0YTtcbiAgfSxcblxuICAvKipcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uVXRpbFxuICAgKiBAbWV0aG9kIGdldEltZ0Zyb21DYWNoZVxuICAgKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb25cbiAgICogQHRvZG8gZGVzY3JpYmUgZnVuY1xuICAgKlxuICAgKiBAcGFyYW0ge01peGVkfSAgICAgICAgICAgICAgIGltZ1xuICAgKiBAcGFyYW0ge1Byb3Rvbi5QYXJ0aWNsZX0gICAgIHBhcnRpY2xlXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gICAgICAgICAgICAgZHJhd0NhbnZhcyAgc2V0IHRvIHRydWUgaWYgYSBjYW52YXMgc2hvdWxkIGJlIHNhdmVkIGludG8gcGFydGljbGUuZGF0YS5jYW52YXNcbiAgICogQHBhcmFtIHtCb29sZWFufSAgICAgICAgICAgICBmdW5jXG4gICAqL1xuICBnZXRJbWdGcm9tQ2FjaGUoaW1nLCBjYWxsYmFjaywgcGFyYW0pIHtcbiAgICBjb25zdCBzcmMgPSB0eXBlb2YgaW1nID09PSBcInN0cmluZ1wiID8gaW1nIDogaW1nLnNyYztcblxuICAgIGlmIChpbWdzQ2FjaGVbc3JjXSkge1xuICAgICAgY2FsbGJhY2soaW1nc0NhY2hlW3NyY10sIHBhcmFtKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgIGltYWdlLm9ubG9hZCA9IGUgPT4ge1xuICAgICAgICBpbWdzQ2FjaGVbc3JjXSA9IGUudGFyZ2V0O1xuICAgICAgICBjYWxsYmFjayhpbWdzQ2FjaGVbc3JjXSwgcGFyYW0pO1xuICAgICAgfTtcblxuICAgICAgaW1hZ2Uuc3JjID0gc3JjO1xuICAgIH1cbiAgfSxcblxuICBnZXRDYW52YXNGcm9tQ2FjaGUoaW1nLCBjYWxsYmFjaywgcGFyYW0pIHtcbiAgICBjb25zdCBzcmMgPSBpbWcuc3JjO1xuXG4gICAgaWYgKCFjYW52YXNDYWNoZVtzcmNdKSB7XG4gICAgICBjb25zdCB3aWR0aCA9IFdlYkdMVXRpbC5uaHBvdChpbWcud2lkdGgpO1xuICAgICAgY29uc3QgaGVpZ2h0ID0gV2ViR0xVdGlsLm5ocG90KGltZy5oZWlnaHQpO1xuXG4gICAgICBjb25zdCBjYW52YXMgPSBEb21VdGlsLmNyZWF0ZUNhbnZhcyhgcHJvdG9uX2NhbnZhc19jYWNoZV8keysrY2FudmFzSWR9YCwgd2lkdGgsIGhlaWdodCk7XG4gICAgICBjb25zdCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICAgIGNvbnRleHQuZHJhd0ltYWdlKGltZywgMCwgMCwgaW1nLndpZHRoLCBpbWcuaGVpZ2h0KTtcblxuICAgICAgY2FudmFzQ2FjaGVbc3JjXSA9IGNhbnZhcztcbiAgICB9XG5cbiAgICBjYWxsYmFjayAmJiBjYWxsYmFjayhjYW52YXNDYWNoZVtzcmNdLCBwYXJhbSk7XG5cbiAgICByZXR1cm4gY2FudmFzQ2FjaGVbc3JjXTtcbiAgfVxufTtcbiIsImltcG9ydCBJbWdVdGlsIGZyb20gXCIuL0ltZ1V0aWxcIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuICAvKipcbiAgICogUmV0dXJucyB0aGUgZGVmYXVsdCBpZiB0aGUgdmFsdWUgaXMgbnVsbCBvciB1bmRlZmluZWRcbiAgICpcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uVXRpbFxuICAgKiBAbWV0aG9kIGluaXRWYWx1ZVxuICAgKlxuICAgKiBAcGFyYW0ge01peGVkfSB2YWx1ZSBhIHNwZWNpZmljIHZhbHVlLCBjb3VsZCBiZSBldmVyeXRoaW5nIGJ1dCBudWxsIG9yIHVuZGVmaW5lZFxuICAgKiBAcGFyYW0ge01peGVkfSBkZWZhdWx0cyB0aGUgZGVmYXVsdCBpZiB0aGUgdmFsdWUgaXMgbnVsbCBvciB1bmRlZmluZWRcbiAgICovXG4gIGluaXRWYWx1ZSh2YWx1ZSwgZGVmYXVsdHMpIHtcbiAgICB2YWx1ZSA9IHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB1bmRlZmluZWQgPyB2YWx1ZSA6IGRlZmF1bHRzO1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfSxcblxuICAvKipcbiAgICogQ2hlY2tzIGlmIHRoZSB2YWx1ZSBpcyBhIHZhbGlkIGFycmF5XG4gICAqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlV0aWxcbiAgICogQG1ldGhvZCBpc0FycmF5XG4gICAqXG4gICAqIEBwYXJhbSB7QXJyYXl9IHZhbHVlIEFueSBhcnJheVxuICAgKlxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICovXG4gIGlzQXJyYXkodmFsdWUpIHtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSA9PT0gXCJbb2JqZWN0IEFycmF5XVwiO1xuICB9LFxuXG4gIC8qKlxuICAgKiBEZXN0cm95ZXMgdGhlIGdpdmVuIGFycmF5XG4gICAqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlV0aWxcbiAgICogQG1ldGhvZCBlbXB0eUFycmF5XG4gICAqXG4gICAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IEFueSBhcnJheVxuICAgKi9cbiAgZW1wdHlBcnJheShhcnIpIHtcbiAgICBpZiAoYXJyKSBhcnIubGVuZ3RoID0gMDtcbiAgfSxcblxuICB0b0FycmF5KGFycikge1xuICAgIHJldHVybiB0aGlzLmlzQXJyYXkoYXJyKSA/IGFyciA6IFthcnJdO1xuICB9LFxuXG4gIGdldFJhbmRGcm9tQXJyYXkoYXJyKSB7XG4gICAgaWYgKCFhcnIpIHJldHVybiBudWxsO1xuICAgIHJldHVybiBhcnJbTWF0aC5mbG9vcihhcnIubGVuZ3RoICogTWF0aC5yYW5kb20oKSldO1xuICB9LFxuXG4gIC8qKlxuICAgKiBEZXN0cm95ZXMgdGhlIGdpdmVuIG9iamVjdFxuICAgKlxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5VdGlsXG4gICAqIEBtZXRob2QgZW1wdHlPYmplY3RcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iaiBBbnkgb2JqZWN0XG4gICAqL1xuICBlbXB0eU9iamVjdChvYmosIGlnbm9yZSA9IG51bGwpIHtcbiAgICBmb3IgKGxldCBrZXkgaW4gb2JqKSB7XG4gICAgICBpZiAoaWdub3JlICYmIGlnbm9yZS5pbmRleE9mKGtleSkgPiAtMSkgY29udGludWU7XG4gICAgICBkZWxldGUgb2JqW2tleV07XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBNYWtlcyBhbiBpbnN0YW5jZSBvZiBhIGNsYXNzIGFuZCBiaW5kcyB0aGUgZ2l2ZW4gYXJyYXlcbiAgICpcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uVXRpbFxuICAgKiBAbWV0aG9kIGNsYXNzQXBwbHlcbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY29uc3RydWN0b3IgQSBjbGFzcyB0byBtYWtlIGFuIGluc3RhbmNlIGZyb21cbiAgICogQHBhcmFtIHtBcnJheX0gW2FyZ3NdIEFueSBhcnJheSB0byBiaW5kIGl0IHRvIHRoZSBjb25zdHJ1Y3RvclxuICAgKlxuICAgKiBAcmV0dXJuIHtPYmplY3R9IFRoZSBpbnN0YW5jZSBvZiBjb25zdHJ1Y3Rvciwgb3B0aW9uYWxseSBiaW5kIHdpdGggYXJnc1xuICAgKi9cbiAgY2xhc3NBcHBseShjb25zdHJ1Y3RvciwgYXJncyA9IG51bGwpIHtcbiAgICBpZiAoIWFyZ3MpIHtcbiAgICAgIHJldHVybiBuZXcgY29uc3RydWN0b3IoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgRmFjdG9yeUZ1bmMgPSBjb25zdHJ1Y3Rvci5iaW5kLmFwcGx5KGNvbnN0cnVjdG9yLCBbbnVsbF0uY29uY2F0KGFyZ3MpKTtcbiAgICAgIHJldHVybiBuZXcgRmFjdG9yeUZ1bmMoKTtcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIFRoaXMgd2lsbCBnZXQgdGhlIGltYWdlIGRhdGEuIEl0IGNvdWxkIGJlIG5lY2Vzc2FyeSB0byBjcmVhdGUgYSBQcm90b24uWm9uZS5cbiAgICpcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uVXRpbFxuICAgKiBAbWV0aG9kIGdldEltYWdlRGF0YVxuICAgKlxuICAgKiBAcGFyYW0ge0hUTUxDYW52YXNFbGVtZW50fSAgIGNvbnRleHQgYW55IGNhbnZhcywgbXVzdCBiZSBhIDJkQ29udGV4dCAnY2FudmFzLmdldENvbnRleHQoJzJkJyknXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAgICAgICAgICAgICAgaW1hZ2UgICBjb3VsZCBiZSBhbnkgZG9tIGltYWdlLCBlLmcuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aGlzSXNBbkltZ1RhZycpO1xuICAgKiBAcGFyYW0ge1Byb3Rvbi5SZWN0YW5nbGV9ICAgIHJlY3RcbiAgICovXG4gIGdldEltYWdlRGF0YShjb250ZXh0LCBpbWFnZSwgcmVjdCkge1xuICAgIHJldHVybiBJbWdVdGlsLmdldEltYWdlRGF0YShjb250ZXh0LCBpbWFnZSwgcmVjdCk7XG4gIH0sXG5cbiAgZGVzdHJveUFsbChhcnIsIHBhcmFtID0gbnVsbCkge1xuICAgIGxldCBpID0gYXJyLmxlbmd0aDtcblxuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGFycltpXS5kZXN0cm95KHBhcmFtKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHt9XG5cbiAgICAgIGRlbGV0ZSBhcnJbaV07XG4gICAgfVxuXG4gICAgYXJyLmxlbmd0aCA9IDA7XG4gIH0sXG5cbiAgYXNzaWduKHRhcmdldCwgc291cmNlKSB7XG4gICAgaWYgKHR5cGVvZiBPYmplY3QuYXNzaWduICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIGZvciAobGV0IGtleSBpbiBzb3VyY2UpIHtcbiAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHtcbiAgICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHRhcmdldCwgc291cmNlKTtcbiAgICB9XG4gIH1cbn07XG4iLCJjb25zdCBpZHNNYXAgPSB7fTtcblxuY29uc3QgUHVpZCA9IHtcbiAgX2luZGV4OiAwLFxuICBfY2FjaGU6IHt9LFxuXG4gIGlkKHR5cGUpIHtcbiAgICBpZiAoaWRzTWFwW3R5cGVdID09PSB1bmRlZmluZWQgfHwgaWRzTWFwW3R5cGVdID09PSBudWxsKSBpZHNNYXBbdHlwZV0gPSAwO1xuICAgIHJldHVybiBgJHt0eXBlfV8ke2lkc01hcFt0eXBlXSsrfWA7XG4gIH0sXG5cbiAgZ2V0SWQodGFyZ2V0KSB7XG4gICAgbGV0IHVpZCA9IHRoaXMuZ2V0SWRGcm9tQ2FjaGUodGFyZ2V0KTtcbiAgICBpZiAodWlkKSByZXR1cm4gdWlkO1xuXG4gICAgdWlkID0gYFBVSURfJHt0aGlzLl9pbmRleCsrfWA7XG4gICAgdGhpcy5fY2FjaGVbdWlkXSA9IHRhcmdldDtcbiAgICByZXR1cm4gdWlkO1xuICB9LFxuXG4gIGdldElkRnJvbUNhY2hlKHRhcmdldCkge1xuICAgIGxldCBvYmosIGlkO1xuXG4gICAgZm9yIChpZCBpbiB0aGlzLl9jYWNoZSkge1xuICAgICAgb2JqID0gdGhpcy5fY2FjaGVbaWRdO1xuXG4gICAgICBpZiAob2JqID09PSB0YXJnZXQpIHJldHVybiBpZDtcbiAgICAgIGlmICh0aGlzLmlzQm9keShvYmosIHRhcmdldCkgJiYgb2JqLnNyYyA9PT0gdGFyZ2V0LnNyYykgcmV0dXJuIGlkO1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9LFxuXG4gIGlzQm9keShvYmosIHRhcmdldCkge1xuICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiB0YXJnZXQgPT09IFwib2JqZWN0XCIgJiYgb2JqLmlzSW5uZXIgJiYgdGFyZ2V0LmlzSW5uZXI7XG4gIH0sXG5cbiAgZ2V0VGFyZ2V0KHVpZCkge1xuICAgIHJldHVybiB0aGlzLl9jYWNoZVt1aWRdO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBQdWlkO1xuIiwiLyoqXG4gKiBQb29sIGlzIHRoZSBjYWNoZSBwb29sIG9mIHRoZSBwcm90b24gZW5naW5lLCBpdCBpcyB2ZXJ5IGltcG9ydGFudC5cbiAqXG4gKiBnZXQodGFyZ2V0LCBwYXJhbXMsIHVpZClcbiAqICBDbGFzc1xuICogICAgdWlkID0gUHVpZC5nZXRJZCAtPiBQdWlkIHNhdmUgdGFyZ2V0IGNhY2hlXG4gKiAgICB0YXJnZXQuX19wdWlkID0gdWlkXG4gKlxuICogIGJvZHlcbiAqICAgIHVpZCA9IFB1aWQuZ2V0SWQgLT4gUHVpZCBzYXZlIHRhcmdldCBjYWNoZVxuICpcbiAqXG4gKiBleHBpcmUodGFyZ2V0KVxuICogIGNhY2hlW3RhcmdldC5fX3B1aWRdIHB1c2ggdGFyZ2V0XG4gKlxuICovXG5pbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IFB1aWQgZnJvbSBcIi4uL3V0aWxzL1B1aWRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9vbCB7XG4gIC8qKlxuICAgKiBAbWVtYmVyb2YhIFByb3RvbiNcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBhbGlhcyBQcm90b24uUG9vbFxuICAgKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb25cbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uIG9mIHByb3BlcnRpZXNcbiAgICpcbiAgICogQHByb3BlcnR5IHtOdW1iZXJ9IHRvdGFsXG4gICAqIEBwcm9wZXJ0eSB7T2JqZWN0fSBjYWNoZVxuICAgKi9cbiAgY29uc3RydWN0b3IobnVtKSB7XG4gICAgdGhpcy50b3RhbCA9IDA7XG4gICAgdGhpcy5jYWNoZSA9IHt9O1xuICB9XG5cbiAgLyoqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAbWV0aG9kIGdldFxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5Qb29sXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fEZ1bmN0aW9ufSB0YXJnZXRcbiAgICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIGp1c3QgYWRkIGlmIGB0YXJnZXRgIGlzIGEgZnVuY3Rpb25cbiAgICpcbiAgICogQHJldHVybiB7T2JqZWN0fVxuICAgKi9cbiAgZ2V0KHRhcmdldCwgcGFyYW1zLCB1aWQpIHtcbiAgICBsZXQgcDtcbiAgICB1aWQgPSB1aWQgfHwgdGFyZ2V0Ll9fcHVpZCB8fCBQdWlkLmdldElkKHRhcmdldCk7XG5cbiAgICBpZiAodGhpcy5jYWNoZVt1aWRdICYmIHRoaXMuY2FjaGVbdWlkXS5sZW5ndGggPiAwKSB7XG4gICAgICBwID0gdGhpcy5jYWNoZVt1aWRdLnBvcCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBwID0gdGhpcy5jcmVhdGVPckNsb25lKHRhcmdldCwgcGFyYW1zKTtcbiAgICB9XG5cbiAgICBwLl9fcHVpZCA9IHRhcmdldC5fX3B1aWQgfHwgdWlkO1xuICAgIHJldHVybiBwO1xuICB9XG5cbiAgLyoqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAbWV0aG9kIHNldFxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5Qb29sXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSB0YXJnZXRcbiAgICpcbiAgICogQHJldHVybiB7T2JqZWN0fVxuICAgKi9cbiAgZXhwaXJlKHRhcmdldCkge1xuICAgIHJldHVybiB0aGlzLmdldENhY2hlKHRhcmdldC5fX3B1aWQpLnB1c2godGFyZ2V0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IGNsYXNzIGluc3RhbmNlXG4gICAqXG4gICAqIEB0b2RvIGFkZCBtb3JlIGRvY3VtZW50YXRpb25cbiAgICpcbiAgICogQG1ldGhvZCBjcmVhdGVcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uUG9vbFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdHxGdW5jdGlvbn0gdGFyZ2V0IGFueSBPYmplY3Qgb3IgRnVuY3Rpb25cbiAgICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIGp1c3QgYWRkIGlmIGB0YXJnZXRgIGlzIGEgZnVuY3Rpb25cbiAgICpcbiAgICogQHJldHVybiB7T2JqZWN0fVxuICAgKi9cbiAgY3JlYXRlT3JDbG9uZSh0YXJnZXQsIHBhcmFtcykge1xuICAgIHRoaXMudG90YWwrKztcblxuICAgIGlmICh0aGlzLmNyZWF0ZSkge1xuICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlKHRhcmdldCwgcGFyYW1zKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB0YXJnZXQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgcmV0dXJuIFV0aWwuY2xhc3NBcHBseSh0YXJnZXQsIHBhcmFtcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0YXJnZXQuY2xvbmUoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uIC0gd2hhdCBpcyBpbiB0aGUgY2FjaGU/XG4gICAqXG4gICAqIEBtZXRob2QgZ2V0Q291bnRcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uUG9vbFxuICAgKlxuICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAqL1xuICBnZXRDb3VudCgpIHtcbiAgICBsZXQgY291bnQgPSAwO1xuICAgIGZvciAobGV0IGlkIGluIHRoaXMuY2FjaGUpIGNvdW50ICs9IHRoaXMuY2FjaGVbaWRdLmxlbmd0aDtcbiAgICByZXR1cm4gY291bnQrKztcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXN0cm95ZXMgYWxsIGl0ZW1zIGZyb20gUG9vbC5jYWNoZVxuICAgKlxuICAgKiBAbWV0aG9kIGRlc3Ryb3lcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uUG9vbFxuICAgKi9cbiAgZGVzdHJveSgpIHtcbiAgICBmb3IgKGxldCBpZCBpbiB0aGlzLmNhY2hlKSB7XG4gICAgICB0aGlzLmNhY2hlW2lkXS5sZW5ndGggPSAwO1xuICAgICAgZGVsZXRlIHRoaXMuY2FjaGVbaWRdO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIFBvb2wuY2FjaGVcbiAgICpcbiAgICogQG1ldGhvZCBnZXRDYWNoZVxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5Qb29sXG4gICAqIEBwcml2YXRlXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB1aWQgdGhlIHVuaXF1ZSBpZFxuICAgKlxuICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAqL1xuICBnZXRDYWNoZSh1aWQgPSBcImRlZmF1bHRcIikge1xuICAgIGlmICghdGhpcy5jYWNoZVt1aWRdKSB0aGlzLmNhY2hlW3VpZF0gPSBbXTtcbiAgICByZXR1cm4gdGhpcy5jYWNoZVt1aWRdO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBTdGF0cyB7XG4gIGNvbnN0cnVjdG9yKHByb3Rvbikge1xuICAgIHRoaXMucHJvdG9uID0gcHJvdG9uO1xuICAgIHRoaXMuY29udGFpbmVyID0gbnVsbDtcbiAgICB0aGlzLnR5cGUgPSAxO1xuXG4gICAgdGhpcy5lbWl0dGVySW5kZXggPSAwO1xuICAgIHRoaXMucmVuZGVyZXJJbmRleCA9IDA7XG4gIH1cblxuICB1cGRhdGUoc3R5bGUsIGJvZHkpIHtcbiAgICB0aGlzLmFkZChzdHlsZSwgYm9keSk7XG5cbiAgICBjb25zdCBlbWl0dGVyID0gdGhpcy5nZXRFbWl0dGVyKCk7XG4gICAgY29uc3QgcmVuZGVyZXIgPSB0aGlzLmdldFJlbmRlcmVyKCk7XG4gICAgbGV0IHN0ciA9IFwiXCI7XG5cbiAgICBzd2l0Y2ggKHRoaXMudHlwZSkge1xuICAgICAgY2FzZSAyOlxuICAgICAgICBzdHIgKz0gXCJlbWl0dGVyOlwiICsgdGhpcy5wcm90b24uZW1pdHRlcnMubGVuZ3RoICsgXCI8YnI+XCI7XG4gICAgICAgIGlmIChlbWl0dGVyKSBzdHIgKz0gXCJlbSBzcGVlZDpcIiArIGVtaXR0ZXIuZW1pdFNwZWVkICsgXCI8YnI+XCI7XG4gICAgICAgIGlmIChlbWl0dGVyKSBzdHIgKz0gXCJwb3M6XCIgKyB0aGlzLmdldEVtaXR0ZXJQb3MoZW1pdHRlcik7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIDM6XG4gICAgICAgIGlmIChlbWl0dGVyKSBzdHIgKz0gXCJpbml0aWFsaXplczpcIiArIGVtaXR0ZXIuaW5pdGlhbGl6ZXMubGVuZ3RoICsgXCI8YnI+XCI7XG4gICAgICAgIGlmIChlbWl0dGVyKVxuICAgICAgICAgIHN0ciArPSAnPHNwYW4gc3R5bGU9XCJkaXNwbGF5OmlubGluZS1ibG9jaztcIj4nICsgdGhpcy5jb25jYXRBcnIoZW1pdHRlci5pbml0aWFsaXplcykgKyBcIjwvc3Bhbj48YnI+XCI7XG4gICAgICAgIGlmIChlbWl0dGVyKSBzdHIgKz0gXCJiZWhhdmlvdXJzOlwiICsgZW1pdHRlci5iZWhhdmlvdXJzLmxlbmd0aCArIFwiPGJyPlwiO1xuICAgICAgICBpZiAoZW1pdHRlcikgc3RyICs9ICc8c3BhbiBzdHlsZT1cImRpc3BsYXk6aW5saW5lLWJsb2NrO1wiPicgKyB0aGlzLmNvbmNhdEFycihlbWl0dGVyLmJlaGF2aW91cnMpICsgXCI8L3NwYW4+PGJyPlwiO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSA0OlxuICAgICAgICBpZiAocmVuZGVyZXIpIHN0ciArPSByZW5kZXJlci5uYW1lICsgXCI8YnI+XCI7XG4gICAgICAgIGlmIChyZW5kZXJlcikgc3RyICs9IFwiYm9keTpcIiArIHRoaXMuZ2V0Q3JlYXRlZE51bWJlcihyZW5kZXJlcikgKyBcIjxicj5cIjtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHN0ciArPSBcInBhcnRpY2xlczpcIiArIHRoaXMucHJvdG9uLmdldENvdW50KCkgKyBcIjxicj5cIjtcbiAgICAgICAgc3RyICs9IFwicG9vbDpcIiArIHRoaXMucHJvdG9uLnBvb2wuZ2V0Q291bnQoKSArIFwiPGJyPlwiO1xuICAgICAgICBzdHIgKz0gXCJ0b3RhbDpcIiArIHRoaXMucHJvdG9uLnBvb2wudG90YWw7XG4gICAgfVxuXG4gICAgdGhpcy5jb250YWluZXIuaW5uZXJIVE1MID0gc3RyO1xuICB9XG5cbiAgYWRkKHN0eWxlLCBib2R5KSB7XG4gICAgaWYgKCF0aGlzLmNvbnRhaW5lcikge1xuICAgICAgdGhpcy50eXBlID0gMTtcblxuICAgICAgdGhpcy5jb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgdGhpcy5jb250YWluZXIuc3R5bGUuY3NzVGV4dCA9IFtcbiAgICAgICAgXCJwb3NpdGlvbjphYnNvbHV0ZTtib3R0b206MHB4O2xlZnQ6MDtjdXJzb3I6cG9pbnRlcjtcIixcbiAgICAgICAgXCJvcGFjaXR5OjAuOTt6LWluZGV4OjEwMDAwO3BhZGRpbmc6MTBweDtmb250LXNpemU6MTJweDtmb250LWZhbWlseTpIZWx2ZXRpY2EsQXJpYWwsc2Fucy1zZXJpZjtcIixcbiAgICAgICAgXCJ3aWR0aDoxMjBweDtoZWlnaHQ6NTBweDtiYWNrZ3JvdW5kLWNvbG9yOiMwMDI7Y29sb3I6IzBmZjtcIlxuICAgICAgXS5qb2luKFwiXCIpO1xuXG4gICAgICB0aGlzLmNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICBcImNsaWNrXCIsXG4gICAgICAgIGUgPT4ge1xuICAgICAgICAgIHRoaXMudHlwZSsrO1xuICAgICAgICAgIGlmICh0aGlzLnR5cGUgPiA0KSB0aGlzLnR5cGUgPSAxO1xuICAgICAgICB9LFxuICAgICAgICBmYWxzZVxuICAgICAgKTtcblxuICAgICAgbGV0IGJnLCBjb2xvcjtcbiAgICAgIHN3aXRjaCAoc3R5bGUpIHtcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgIGJnID0gXCIjMjAxXCI7XG4gICAgICAgICAgY29sb3IgPSBcIiNmMDhcIjtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgYmcgPSBcIiMwMjBcIjtcbiAgICAgICAgICBjb2xvciA9IFwiIzBmMFwiO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgYmcgPSBcIiMwMDJcIjtcbiAgICAgICAgICBjb2xvciA9IFwiIzBmZlwiO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZVtcImJhY2tncm91bmQtY29sb3JcIl0gPSBiZztcbiAgICAgIHRoaXMuY29udGFpbmVyLnN0eWxlW1wiY29sb3JcIl0gPSBjb2xvcjtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuY29udGFpbmVyLnBhcmVudE5vZGUpIHtcbiAgICAgIGJvZHkgPSBib2R5IHx8IHRoaXMuYm9keSB8fCBkb2N1bWVudC5ib2R5O1xuICAgICAgYm9keS5hcHBlbmRDaGlsZCh0aGlzLmNvbnRhaW5lcik7XG4gICAgfVxuICB9XG5cbiAgZ2V0RW1pdHRlcigpIHtcbiAgICByZXR1cm4gdGhpcy5wcm90b24uZW1pdHRlcnNbdGhpcy5lbWl0dGVySW5kZXhdO1xuICB9XG5cbiAgZ2V0UmVuZGVyZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvdG9uLnJlbmRlcmVyc1t0aGlzLnJlbmRlcmVySW5kZXhdO1xuICB9XG5cbiAgY29uY2F0QXJyKGFycikge1xuICAgIGxldCByZXN1bHQgPSBcIlwiO1xuICAgIGlmICghYXJyIHx8ICFhcnIubGVuZ3RoKSByZXR1cm4gcmVzdWx0O1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgIHJlc3VsdCArPSAoYXJyW2ldLm5hbWUgfHwgXCJcIikuc3Vic3RyKDAsIDEpICsgXCIuXCI7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGdldENyZWF0ZWROdW1iZXIocmVuZGVyZXIpIHtcbiAgICByZXR1cm4gcmVuZGVyZXIucG9vbC50b3RhbCB8fCAocmVuZGVyZXIuY3Bvb2wgJiYgcmVuZGVyZXIuY3Bvb2wudG90YWwpIHx8IDA7XG4gIH1cblxuICBnZXRFbWl0dGVyUG9zKGUpIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZChlLnAueCkgKyBcIixcIiArIE1hdGgucm91bmQoZS5wLnkpO1xuICB9XG59XG4iLCIvKlxuICogRXZlbnREaXNwYXRjaGVyXG4gKiBUaGlzIGNvZGUgcmVmZXJlbmNlIHNpbmNlIGh0dHA6Ly9jcmVhdGVqcy5jb20vLlxuICpcbiAqKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXZlbnREaXNwYXRjaGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5fbGlzdGVuZXJzID0gbnVsbDtcbiAgfVxuXG4gIHN0YXRpYyBiaW5kKHRhcmdldCkge1xuICAgIHRhcmdldC5wcm90b3R5cGUuZGlzcGF0Y2hFdmVudCA9IEV2ZW50RGlzcGF0Y2hlci5wcm90b3R5cGUuZGlzcGF0Y2hFdmVudDtcbiAgICB0YXJnZXQucHJvdG90eXBlLmhhc0V2ZW50TGlzdGVuZXIgPSBFdmVudERpc3BhdGNoZXIucHJvdG90eXBlLmhhc0V2ZW50TGlzdGVuZXI7XG4gICAgdGFyZ2V0LnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVyID0gRXZlbnREaXNwYXRjaGVyLnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVyO1xuICAgIHRhcmdldC5wcm90b3R5cGUucmVtb3ZlRXZlbnRMaXN0ZW5lciA9IEV2ZW50RGlzcGF0Y2hlci5wcm90b3R5cGUucmVtb3ZlRXZlbnRMaXN0ZW5lcjtcbiAgICB0YXJnZXQucHJvdG90eXBlLnJlbW92ZUFsbEV2ZW50TGlzdGVuZXJzID0gRXZlbnREaXNwYXRjaGVyLnByb3RvdHlwZS5yZW1vdmVBbGxFdmVudExpc3RlbmVycztcbiAgfVxuXG4gIGFkZEV2ZW50TGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgICBpZiAoIXRoaXMuX2xpc3RlbmVycykge1xuICAgICAgdGhpcy5fbGlzdGVuZXJzID0ge307XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcik7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLl9saXN0ZW5lcnNbdHlwZV0pIHRoaXMuX2xpc3RlbmVyc1t0eXBlXSA9IFtdO1xuICAgIHRoaXMuX2xpc3RlbmVyc1t0eXBlXS5wdXNoKGxpc3RlbmVyKTtcblxuICAgIHJldHVybiBsaXN0ZW5lcjtcbiAgfVxuXG4gIHJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgICBpZiAoIXRoaXMuX2xpc3RlbmVycykgcmV0dXJuO1xuICAgIGlmICghdGhpcy5fbGlzdGVuZXJzW3R5cGVdKSByZXR1cm47XG5cbiAgICBjb25zdCBhcnIgPSB0aGlzLl9saXN0ZW5lcnNbdHlwZV07XG4gICAgY29uc3QgbGVuZ3RoID0gYXJyLmxlbmd0aDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChhcnJbaV0gPT09IGxpc3RlbmVyKSB7XG4gICAgICAgIGlmIChsZW5ndGggPT09IDEpIHtcbiAgICAgICAgICBkZWxldGUgdGhpcy5fbGlzdGVuZXJzW3R5cGVdO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gYWxsb3dzIGZvciBmYXN0ZXIgY2hlY2tzLlxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBhcnIuc3BsaWNlKGksIDEpO1xuICAgICAgICB9XG5cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlQWxsRXZlbnRMaXN0ZW5lcnModHlwZSkge1xuICAgIGlmICghdHlwZSkgdGhpcy5fbGlzdGVuZXJzID0gbnVsbDtcbiAgICBlbHNlIGlmICh0aGlzLl9saXN0ZW5lcnMpIGRlbGV0ZSB0aGlzLl9saXN0ZW5lcnNbdHlwZV07XG4gIH1cblxuICBkaXNwYXRjaEV2ZW50KHR5cGUsIGFyZ3MpIHtcbiAgICBsZXQgcmVzdWx0ID0gZmFsc2U7XG4gICAgY29uc3QgbGlzdGVuZXJzID0gdGhpcy5fbGlzdGVuZXJzO1xuXG4gICAgaWYgKHR5cGUgJiYgbGlzdGVuZXJzKSB7XG4gICAgICBsZXQgYXJyID0gbGlzdGVuZXJzW3R5cGVdO1xuICAgICAgaWYgKCFhcnIpIHJldHVybiByZXN1bHQ7XG5cbiAgICAgIC8vIGFyciA9IGFyci5zbGljZSgpO1xuICAgICAgLy8gdG8gYXZvaWQgaXNzdWVzIHdpdGggaXRlbXMgYmVpbmcgcmVtb3ZlZCBvciBhZGRlZCBkdXJpbmcgdGhlIGRpc3BhdGNoXG5cbiAgICAgIGxldCBoYW5kbGVyO1xuICAgICAgbGV0IGkgPSBhcnIubGVuZ3RoO1xuICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICBoYW5kbGVyID0gYXJyW2ldO1xuICAgICAgICByZXN1bHQgPSByZXN1bHQgfHwgaGFuZGxlcihhcmdzKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gISFyZXN1bHQ7XG4gIH1cblxuICBoYXNFdmVudExpc3RlbmVyKHR5cGUpIHtcbiAgICBjb25zdCBsaXN0ZW5lcnMgPSB0aGlzLl9saXN0ZW5lcnM7XG4gICAgcmV0dXJuICEhKGxpc3RlbmVycyAmJiBsaXN0ZW5lcnNbdHlwZV0pO1xuICB9XG59XG4iLCJjb25zdCBQSSA9IDMuMTQxNTkyNjtcbmNvbnN0IElORklOSVRZID0gSW5maW5pdHk7XG5cbmNvbnN0IE1hdGhVdGlsID0ge1xuICBQSTogUEksXG4gIFBJeDI6IFBJICogMixcbiAgUElfMjogUEkgLyAyLFxuICBQSV8xODA6IFBJIC8gMTgwLFxuICBOMTgwX1BJOiAxODAgLyBQSSxcbiAgSW5maW5pdHk6IC05OTksXG5cbiAgaXNJbmZpbml0eShudW0pIHtcbiAgICByZXR1cm4gbnVtID09PSB0aGlzLkluZmluaXR5IHx8IG51bSA9PT0gSU5GSU5JVFk7XG4gIH0sXG5cbiAgcmFuZG9tQVRvQihhLCBiLCBpc0ludCA9IGZhbHNlKSB7XG4gICAgaWYgKCFpc0ludCkgcmV0dXJuIGEgKyBNYXRoLnJhbmRvbSgpICogKGIgLSBhKTtcbiAgICBlbHNlIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoYiAtIGEpKSArIGE7XG4gIH0sXG5cbiAgcmFuZG9tRmxvYXRpbmcoY2VudGVyLCBmLCBpc0ludCkge1xuICAgIHJldHVybiB0aGlzLnJhbmRvbUFUb0IoY2VudGVyIC0gZiwgY2VudGVyICsgZiwgaXNJbnQpO1xuICB9LFxuXG4gIHJhbmRvbUNvbG9yKCkge1xuICAgIHJldHVybiBcIiNcIiArIChcIjAwMDAwXCIgKyAoKE1hdGgucmFuZG9tKCkgKiAweDEwMDAwMDApIDw8IDApLnRvU3RyaW5nKDE2KSkuc2xpY2UoLTYpO1xuICB9LFxuXG4gIHJhbmRvbVpvbmUoZGlzcGxheSkge30sXG5cbiAgZmxvb3IobnVtLCBrID0gNCkge1xuICAgIGNvbnN0IGRpZ2l0cyA9IE1hdGgucG93KDEwLCBrKTtcbiAgICByZXR1cm4gTWF0aC5mbG9vcihudW0gKiBkaWdpdHMpIC8gZGlnaXRzO1xuICB9LFxuXG4gIGRlZ3JlZVRyYW5zZm9ybShhKSB7XG4gICAgcmV0dXJuIChhICogUEkpIC8gMTgwO1xuICB9LFxuXG4gIHRvQ29sb3IxNihudW0pIHtcbiAgICByZXR1cm4gYCMke251bS50b1N0cmluZygxNil9YDtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgTWF0aFV0aWw7XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBJbnRlZ3JhdGlvbiB7XG4gIGNvbnN0cnVjdG9yKHR5cGUpIHtcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICB9XG5cbiAgY2FsY3VsYXRlKHBhcnRpY2xlcywgdGltZSwgZGFtcGluZykge1xuICAgIHRoaXMuZXVsZXJJbnRlZ3JhdGUocGFydGljbGVzLCB0aW1lLCBkYW1waW5nKTtcbiAgfVxuXG4gIC8vIEV1bGVyIEludGVncmF0ZVxuICAvLyBodHRwczovL3Jvc2V0dGFjb2RlLm9yZy93aWtpL0V1bGVyX21ldGhvZFxuICBldWxlckludGVncmF0ZShwYXJ0aWNsZSwgdGltZSwgZGFtcGluZykge1xuICAgIGlmICghcGFydGljbGUuc2xlZXApIHtcbiAgICAgIHBhcnRpY2xlLm9sZC5wLmNvcHkocGFydGljbGUucCk7XG4gICAgICBwYXJ0aWNsZS5vbGQudi5jb3B5KHBhcnRpY2xlLnYpO1xuXG4gICAgICBwYXJ0aWNsZS5hLm11bHRpcGx5U2NhbGFyKDEgLyBwYXJ0aWNsZS5tYXNzKTtcbiAgICAgIHBhcnRpY2xlLnYuYWRkKHBhcnRpY2xlLmEubXVsdGlwbHlTY2FsYXIodGltZSkpO1xuICAgICAgcGFydGljbGUucC5hZGQocGFydGljbGUub2xkLnYubXVsdGlwbHlTY2FsYXIodGltZSkpO1xuXG4gICAgICBpZiAoZGFtcGluZykgcGFydGljbGUudi5tdWx0aXBseVNjYWxhcihkYW1waW5nKTtcblxuICAgICAgcGFydGljbGUuYS5jbGVhcigpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IFBvb2wgZnJvbSBcIi4vUG9vbFwiO1xuaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcbmltcG9ydCBTdGF0cyBmcm9tIFwiLi4vZGVidWcvU3RhdHNcIjtcbmltcG9ydCBFdmVudERpc3BhdGNoZXIgZnJvbSBcIi4uL2V2ZW50cy9FdmVudERpc3BhdGNoZXJcIjtcbmltcG9ydCBNYXRoVXRpbCBmcm9tIFwiLi4vbWF0aC9NYXRoVXRpbFwiO1xuaW1wb3J0IEludGVncmF0aW9uIGZyb20gXCIuLi9tYXRoL0ludGVncmF0aW9uXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb3RvbiB7XG4gIHN0YXRpYyBVU0VfQ0xPQ0sgPSBmYWxzZTtcblxuICAvLyBtZWFzdXJlIDE6MTAwXG4gIHN0YXRpYyBNRUFTVVJFID0gMTAwO1xuICBzdGF0aWMgRVVMRVIgPSBcImV1bGVyXCI7XG4gIHN0YXRpYyBSSzIgPSBcInJ1bmdlLWt1dHRhMlwiO1xuXG4gIC8vIGV2ZW50IG5hbWVcbiAgc3RhdGljIFBBUlRJQ0xFX0NSRUFURUQgPSBcIlBBUlRJQ0xFX0NSRUFURURcIjtcbiAgc3RhdGljIFBBUlRJQ0xFX1VQREFURSA9IFwiUEFSVElDTEVfVVBEQVRFXCI7XG4gIHN0YXRpYyBQQVJUSUNMRV9TTEVFUCA9IFwiUEFSVElDTEVfU0xFRVBcIjtcbiAgc3RhdGljIFBBUlRJQ0xFX0RFQUQgPSBcIlBBUlRJQ0xFX0RFQURcIjtcblxuICBzdGF0aWMgRU1JVFRFUl9BRERFRCA9IFwiRU1JVFRFUl9BRERFRFwiO1xuICBzdGF0aWMgRU1JVFRFUl9SRU1PVkVEID0gXCJFTUlUVEVSX1JFTU9WRURcIjtcblxuICBzdGF0aWMgUFJPVE9OX1VQREFURSA9IFwiUFJPVE9OX1VQREFURVwiO1xuICBzdGF0aWMgUFJPVE9OX1VQREFURV9BRlRFUiA9IFwiUFJPVE9OX1VQREFURV9BRlRFUlwiO1xuICBzdGF0aWMgREVGQVVMVF9JTlRFUlZBTCA9IDAuMDE2NztcblxuICBzdGF0aWMgYW1lbmRDaGFuZ2VUYWJzQnVnID0gdHJ1ZTtcblxuICAvKipcbiAgICogVGhlIGNvbnN0cnVjdG9yIHRvIGFkZCBlbWl0dGVyc1xuICAgKlxuICAgKiBAY29uc3RydWN0b3IgUHJvdG9uXG4gICAqXG4gICAqIEB0b2RvIHByb1BhcnRpY2xlQ291bnQgaXMgbm90IGluIHVzZVxuICAgKiBAdG9kbyBhZGQgbW9yZSBkb2N1bWVudGF0aW9uIG9mIHRoZSBzaW5nbGUgcHJvcGVydGllcyBhbmQgcGFyYW1ldGVyc1xuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gW3Byb1BhcnRpY2xlQ291bnRdIG5vdCBpbiB1c2U/XG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbaW50ZWdyYXRpb25UeXBlPVByb3Rvbi5FVUxFUl1cbiAgICpcbiAgICogQHByb3BlcnR5IHtTdHJpbmd9IFtpbnRlZ3JhdGlvblR5cGU9UHJvdG9uLkVVTEVSXVxuICAgKiBAcHJvcGVydHkge0FycmF5fSBlbWl0dGVycyAgIEFsbCBhZGRlZCBlbWl0dGVyXG4gICAqIEBwcm9wZXJ0eSB7QXJyYXl9IHJlbmRlcmVycyAgQWxsIGFkZGVkIHJlbmRlcmVyXG4gICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSB0aW1lICAgICAgVGhlIGFjdGl2ZSB0aW1lXG4gICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBvbGR0aW1lICAgVGhlIG9sZCB0aW1lXG4gICAqL1xuICBjb25zdHJ1Y3RvcihpbnRlZ3JhdGlvblR5cGUpIHtcbiAgICB0aGlzLmVtaXR0ZXJzID0gW107XG4gICAgdGhpcy5yZW5kZXJlcnMgPSBbXTtcblxuICAgIHRoaXMudGltZSA9IDA7XG4gICAgdGhpcy5ub3cgPSAwO1xuICAgIHRoaXMudGhlbiA9IDA7XG4gICAgdGhpcy5lbGFwc2VkID0gMDtcblxuICAgIHRoaXMuc3RhdHMgPSBuZXcgU3RhdHModGhpcyk7XG4gICAgdGhpcy5wb29sID0gbmV3IFBvb2woODApO1xuXG4gICAgdGhpcy5pbnRlZ3JhdGlvblR5cGUgPSBVdGlsLmluaXRWYWx1ZShpbnRlZ3JhdGlvblR5cGUsIFByb3Rvbi5FVUxFUik7XG4gICAgdGhpcy5pbnRlZ3JhdG9yID0gbmV3IEludGVncmF0aW9uKHRoaXMuaW50ZWdyYXRpb25UeXBlKTtcblxuICAgIHRoaXMuX2ZwcyA9IFwiYXV0b1wiO1xuICAgIHRoaXMuX2ludGVydmFsID0gUHJvdG9uLkRFRkFVTFRfSU5URVJWQUw7XG4gIH1cblxuICBzZXQgZnBzKGZwcykge1xuICAgIHRoaXMuX2ZwcyA9IGZwcztcbiAgICB0aGlzLl9pbnRlcnZhbCA9IGZwcyA9PT0gXCJhdXRvXCIgPyBQcm90b24uREVGQVVMVF9JTlRFUlZBTCA6IE1hdGhVdGlsLmZsb29yKDEgLyBmcHMsIDcpO1xuICB9XG5cbiAgZ2V0IGZwcygpIHtcbiAgICByZXR1cm4gdGhpcy5fZnBzO1xuICB9XG5cbiAgLyoqXG4gICAqIGFkZCBhIHR5cGUgb2YgUmVuZGVyZXJcbiAgICpcbiAgICogQG1ldGhvZCBhZGRSZW5kZXJlclxuICAgKiBAbWVtYmVyb2YgUHJvdG9uXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1JlbmRlcmVyfSByZW5kZXJcbiAgICovXG4gIGFkZFJlbmRlcmVyKHJlbmRlcikge1xuICAgIHJlbmRlci5pbml0KHRoaXMpO1xuICAgIHRoaXMucmVuZGVyZXJzLnB1c2gocmVuZGVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbmFtZSBhZGQgYSB0eXBlIG9mIFJlbmRlcmVyXG4gICAqXG4gICAqIEBtZXRob2QgYWRkUmVuZGVyZXJcbiAgICogQHBhcmFtIHtSZW5kZXJlcn0gcmVuZGVyXG4gICAqL1xuICByZW1vdmVSZW5kZXJlcihyZW5kZXIpIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMucmVuZGVyZXJzLmluZGV4T2YocmVuZGVyKTtcbiAgICB0aGlzLnJlbmRlcmVycy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIHJlbmRlci5yZW1vdmUodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogYWRkIHRoZSBFbWl0dGVyXG4gICAqXG4gICAqIEBtZXRob2QgYWRkRW1pdHRlclxuICAgKiBAbWVtYmVyb2YgUHJvdG9uXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge0VtaXR0ZXJ9IGVtaXR0ZXJcbiAgICovXG4gIGFkZEVtaXR0ZXIoZW1pdHRlcikge1xuICAgIHRoaXMuZW1pdHRlcnMucHVzaChlbWl0dGVyKTtcbiAgICBlbWl0dGVyLnBhcmVudCA9IHRoaXM7XG5cbiAgICB0aGlzLmRpc3BhdGNoRXZlbnQoUHJvdG9uLkVNSVRURVJfQURERUQsIGVtaXR0ZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYW4gRW1pdHRlclxuICAgKlxuICAgKiBAbWV0aG9kIHJlbW92ZUVtaXR0ZXJcbiAgICogQG1lbWJlcm9mIFByb3RvblxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtQcm90b24uRW1pdHRlcn0gZW1pdHRlclxuICAgKi9cbiAgcmVtb3ZlRW1pdHRlcihlbWl0dGVyKSB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmVtaXR0ZXJzLmluZGV4T2YoZW1pdHRlcik7XG4gICAgdGhpcy5lbWl0dGVycy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIGVtaXR0ZXIucGFyZW50ID0gbnVsbDtcblxuICAgIHRoaXMuZGlzcGF0Y2hFdmVudChQcm90b24uRU1JVFRFUl9SRU1PVkVELCBlbWl0dGVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIGFsbCBhZGRlZCBlbWl0dGVyc1xuICAgKlxuICAgKiBAbWV0aG9kIHVwZGF0ZVxuICAgKiBAbWVtYmVyb2YgUHJvdG9uXG4gICAqIEBpbnN0YW5jZVxuICAgKi9cbiAgdXBkYXRlKCkge1xuICAgIC8vICdhdXRvJyBpcyB0aGUgZGVmYXVsdCBicm93c2VyIHJlZnJlc2ggcmF0ZSwgdGhlIHZhc3QgbWFqb3JpdHkgaXMgNjBmcHNcbiAgICBpZiAodGhpcy5fZnBzID09PSBcImF1dG9cIikge1xuICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KFByb3Rvbi5QUk9UT05fVVBEQVRFKTtcblxuICAgICAgaWYgKFByb3Rvbi5VU0VfQ0xPQ0spIHtcbiAgICAgICAgaWYgKCF0aGlzLnRoZW4pIHRoaXMudGhlbiA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICB0aGlzLm5vdyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICB0aGlzLmVsYXBzZWQgPSAodGhpcy5ub3cgLSB0aGlzLnRoZW4pICogMC4wMDE7XG4gICAgICAgIC8vIEZpeCBidWdzIHN1Y2ggYXMgY2hyb21lIGJyb3dzZXIgc3dpdGNoaW5nIHRhYnMgY2F1c2luZyBleGNlc3NpdmUgdGltZSBkaWZmZXJlbmNlXG4gICAgICAgIHRoaXMuYW1lbmRDaGFuZ2VUYWJzQnVnKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuZWxhcHNlZCA+IDApIHRoaXMuZW1pdHRlcnNVcGRhdGUodGhpcy5lbGFwc2VkKTtcbiAgICAgICAgdGhpcy50aGVuID0gdGhpcy5ub3c7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmVtaXR0ZXJzVXBkYXRlKFByb3Rvbi5ERUZBVUxUX0lOVEVSVkFMKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KFByb3Rvbi5QUk9UT05fVVBEQVRFX0FGVEVSKTtcbiAgICB9XG5cbiAgICAvLyBJZiB0aGUgZnBzIGZyYW1lIHJhdGUgaXMgc2V0XG4gICAgZWxzZSB7XG4gICAgICBpZiAoIXRoaXMudGhlbikgdGhpcy50aGVuID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICB0aGlzLm5vdyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgdGhpcy5lbGFwc2VkID0gKHRoaXMubm93IC0gdGhpcy50aGVuKSAqIDAuMDAxO1xuXG4gICAgICBpZiAodGhpcy5lbGFwc2VkID4gdGhpcy5faW50ZXJ2YWwpIHtcbiAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KFByb3Rvbi5QUk9UT05fVVBEQVRFKTtcbiAgICAgICAgdGhpcy5lbWl0dGVyc1VwZGF0ZSh0aGlzLl9pbnRlcnZhbCk7XG4gICAgICAgIC8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzE5NzY0MDE4L2NvbnRyb2xsaW5nLWZwcy13aXRoLXJlcXVlc3RhbmltYXRpb25mcmFtZVxuICAgICAgICB0aGlzLnRoZW4gPSB0aGlzLm5vdyAtICh0aGlzLmVsYXBzZWQgJSB0aGlzLl9pbnRlcnZhbCkgKiAxMDAwO1xuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoUHJvdG9uLlBST1RPTl9VUERBVEVfQUZURVIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGVtaXR0ZXJzVXBkYXRlKGVsYXBzZWQpIHtcbiAgICBsZXQgaSA9IHRoaXMuZW1pdHRlcnMubGVuZ3RoO1xuICAgIHdoaWxlIChpLS0pIHRoaXMuZW1pdHRlcnNbaV0udXBkYXRlKGVsYXBzZWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAbWV0aG9kIGFtZW5kQ2hhbmdlVGFic0J1Z1xuICAgKiBAbWVtYmVyb2YgUHJvdG9uXG4gICAqIEBpbnN0YW5jZVxuICAgKi9cbiAgYW1lbmRDaGFuZ2VUYWJzQnVnKCkge1xuICAgIGlmICghUHJvdG9uLmFtZW5kQ2hhbmdlVGFic0J1ZykgcmV0dXJuO1xuICAgIGlmICh0aGlzLmVsYXBzZWQgPiAwLjUpIHtcbiAgICAgIHRoaXMudGhlbiA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgdGhpcy5lbGFwc2VkID0gMDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ291bnRzIGFsbCBwYXJ0aWNsZXMgZnJvbSBhbGwgZW1pdHRlcnNcbiAgICpcbiAgICogQG1ldGhvZCBnZXRDb3VudFxuICAgKiBAbWVtYmVyb2YgUHJvdG9uXG4gICAqIEBpbnN0YW5jZVxuICAgKi9cbiAgZ2V0Q291bnQoKSB7XG4gICAgbGV0IHRvdGFsID0gMDtcbiAgICBsZXQgaSA9IHRoaXMuZW1pdHRlcnMubGVuZ3RoO1xuXG4gICAgd2hpbGUgKGktLSkgdG90YWwgKz0gdGhpcy5lbWl0dGVyc1tpXS5wYXJ0aWNsZXMubGVuZ3RoO1xuICAgIHJldHVybiB0b3RhbDtcbiAgfVxuXG4gIGdldEFsbFBhcnRpY2xlcygpIHtcbiAgICBsZXQgcGFydGljbGVzID0gW107XG4gICAgbGV0IGkgPSB0aGlzLmVtaXR0ZXJzLmxlbmd0aDtcblxuICAgIHdoaWxlIChpLS0pIHBhcnRpY2xlcyA9IHBhcnRpY2xlcy5jb25jYXQodGhpcy5lbWl0dGVyc1tpXS5wYXJ0aWNsZXMpO1xuICAgIHJldHVybiBwYXJ0aWNsZXM7XG4gIH1cblxuICBkZXN0cm95QWxsRW1pdHRlcnMoKSB7XG4gICAgVXRpbC5kZXN0cm95QWxsKHRoaXMuZW1pdHRlcnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlc3Ryb3lzIGV2ZXJ5dGhpbmcgcmVsYXRlZCB0byB0aGlzIFByb3RvbiBpbnN0YW5jZS4gVGhpcyBpbmNsdWRlcyBhbGwgZW1pdHRlcnMsIGFuZCBhbGwgcHJvcGVydGllc1xuICAgKlxuICAgKiBAbWV0aG9kIGRlc3Ryb3lcbiAgICogQG1lbWJlcm9mIFByb3RvblxuICAgKiBAaW5zdGFuY2VcbiAgICovXG4gIGRlc3Ryb3kocmVtb3ZlID0gZmFsc2UpIHtcbiAgICBjb25zdCBkZXN0cm95T3RoZXIgPSAoKSA9PiB7XG4gICAgICB0aGlzLnRpbWUgPSAwO1xuICAgICAgdGhpcy50aGVuID0gMDtcbiAgICAgIHRoaXMucG9vbC5kZXN0cm95KCk7XG5cbiAgICAgIFV0aWwuZGVzdHJveUFsbCh0aGlzLmVtaXR0ZXJzKTtcbiAgICAgIFV0aWwuZGVzdHJveUFsbCh0aGlzLnJlbmRlcmVycywgdGhpcy5nZXRBbGxQYXJ0aWNsZXMoKSk7XG4gICAgfTtcblxuICAgIGlmIChyZW1vdmUpIHtcbiAgICAgIHNldFRpbWVvdXQoZGVzdHJveU90aGVyLCAyMDApO1xuICAgIH0gZWxzZSB7XG4gICAgICBkZXN0cm95T3RoZXIoKTtcbiAgICB9XG4gIH1cbn1cblxuRXZlbnREaXNwYXRjaGVyLmJpbmQoUHJvdG9uKTtcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFJnYiB7XG4gIGNvbnN0cnVjdG9yKHIgPSAyNTUsIGcgPSAyNTUsIGIgPSAyNTUpIHtcbiAgICB0aGlzLnIgPSByO1xuICAgIHRoaXMuZyA9IGc7XG4gICAgdGhpcy5iID0gYjtcbiAgfVxuXG4gIHJlc2V0KCkge1xuICAgIHRoaXMuciA9IDI1NTtcbiAgICB0aGlzLmcgPSAyNTU7XG4gICAgdGhpcy5iID0gMjU1O1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCB7XG4gIGhhc1Byb3AodGFyZ2V0LCBrZXkpIHtcbiAgICBpZiAoIXRhcmdldCkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiB0YXJnZXRba2V5XSAhPT0gdW5kZWZpbmVkO1xuICAgIC8vIHJldHVybiBvYmouaGFzT3duUHJvcGVydHkoa2V5KTtcbiAgfSxcblxuICAvKipcbiAgICogc2V0IHRoZSBwcm90b3R5cGUgaW4gYSBnaXZlbiBwcm90b3R5cGVPYmplY3RcbiAgICpcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uVXRpbFxuICAgKiBAbWV0aG9kIHNldFByb3BcbiAgICpcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uIGZvciBwYXJhbSBgdGFyZ2V0YFxuICAgKiBAdG9kbyB0cmFuc2xhdGUgZGVzcmlwdGlvbiBmcm9tIGNoaW5lc2UgdG8gZW5nbGlzaFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gdGFyZ2V0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwcm90b3R5cGVPYmplY3QgQW4gb2JqZWN0IG9mIHNpbmdsZSBwcm90b3R5cGVzXG4gICAqXG4gICAqIEByZXR1cm4ge09iamVjdH0gdGFyZ2V0XG4gICAqL1xuICBzZXRQcm9wKHRhcmdldCwgcHJvcHMpIHtcbiAgICBmb3IgKGxldCBwcm9wIGluIHByb3BzKSB7XG4gICAgICBpZiAodGFyZ2V0Lmhhc093blByb3BlcnR5KHByb3ApKSB7XG4gICAgICAgIHRhcmdldFtwcm9wXSA9IFNwYW4uZ2V0U3BhblZhbHVlKHByb3BzW3Byb3BdKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9LFxuXG4gIC8qKlxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5VdGlsXG4gICAqIEBtZXRob2Qgc2V0VmVjdG9yVmFsXG4gICAqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvbiBmb3IgcGFyYW0gYHRhcmdldGBcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uIGZvciBwYXJhbSBgY29uZmBcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uIGZvciBmdW5jdGlvblxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gdGFyZ2V0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjb25mXG4gICAqL1xuICBzZXRWZWN0b3JWYWwocGFydGljbGUsIGNvbmYgPSBudWxsKSB7XG4gICAgaWYgKCFjb25mKSByZXR1cm47XG5cbiAgICBpZiAodGhpcy5oYXNQcm9wKGNvbmYsIFwieFwiKSkgcGFydGljbGUucC54ID0gY29uZltcInhcIl07XG4gICAgaWYgKHRoaXMuaGFzUHJvcChjb25mLCBcInlcIikpIHBhcnRpY2xlLnAueSA9IGNvbmZbXCJ5XCJdO1xuXG4gICAgaWYgKHRoaXMuaGFzUHJvcChjb25mLCBcInZ4XCIpKSBwYXJ0aWNsZS52LnggPSBjb25mW1widnhcIl07XG4gICAgaWYgKHRoaXMuaGFzUHJvcChjb25mLCBcInZ5XCIpKSBwYXJ0aWNsZS52LnkgPSBjb25mW1widnlcIl07XG5cbiAgICBpZiAodGhpcy5oYXNQcm9wKGNvbmYsIFwiYXhcIikpIHBhcnRpY2xlLmEueCA9IGNvbmZbXCJheFwiXTtcbiAgICBpZiAodGhpcy5oYXNQcm9wKGNvbmYsIFwiYXlcIikpIHBhcnRpY2xlLmEueSA9IGNvbmZbXCJheVwiXTtcblxuICAgIGlmICh0aGlzLmhhc1Byb3AoY29uZiwgXCJwXCIpKSBwYXJ0aWNsZS5wLmNvcHkoY29uZltcInBcIl0pO1xuICAgIGlmICh0aGlzLmhhc1Byb3AoY29uZiwgXCJ2XCIpKSBwYXJ0aWNsZS52LmNvcHkoY29uZltcInZcIl0pO1xuICAgIGlmICh0aGlzLmhhc1Byb3AoY29uZiwgXCJhXCIpKSBwYXJ0aWNsZS5hLmNvcHkoY29uZltcImFcIl0pO1xuXG4gICAgaWYgKHRoaXMuaGFzUHJvcChjb25mLCBcInBvc2l0aW9uXCIpKSBwYXJ0aWNsZS5wLmNvcHkoY29uZltcInBvc2l0aW9uXCJdKTtcbiAgICBpZiAodGhpcy5oYXNQcm9wKGNvbmYsIFwidmVsb2NpdHlcIikpIHBhcnRpY2xlLnYuY29weShjb25mW1widmVsb2NpdHlcIl0pO1xuICAgIGlmICh0aGlzLmhhc1Byb3AoY29uZiwgXCJhY2NlbGVyYXRlXCIpKSBwYXJ0aWNsZS5hLmNvcHkoY29uZltcImFjY2VsZXJhdGVcIl0pO1xuICB9XG59O1xuIiwiaW1wb3J0IE1hdGhVdGlsIGZyb20gXCIuL01hdGhVdGlsXCI7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZWFzZUxpbmVhcih2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfSxcblxuICBlYXNlSW5RdWFkKHZhbHVlKSB7XG4gICAgcmV0dXJuIE1hdGgucG93KHZhbHVlLCAyKTtcbiAgfSxcblxuICBlYXNlT3V0UXVhZCh2YWx1ZSkge1xuICAgIHJldHVybiAtKE1hdGgucG93KHZhbHVlIC0gMSwgMikgLSAxKTtcbiAgfSxcblxuICBlYXNlSW5PdXRRdWFkKHZhbHVlKSB7XG4gICAgaWYgKCh2YWx1ZSAvPSAwLjUpIDwgMSkgcmV0dXJuIDAuNSAqIE1hdGgucG93KHZhbHVlLCAyKTtcblxuICAgIHJldHVybiAtMC41ICogKCh2YWx1ZSAtPSAyKSAqIHZhbHVlIC0gMik7XG4gIH0sXG5cbiAgZWFzZUluQ3ViaWModmFsdWUpIHtcbiAgICByZXR1cm4gTWF0aC5wb3codmFsdWUsIDMpO1xuICB9LFxuXG4gIGVhc2VPdXRDdWJpYyh2YWx1ZSkge1xuICAgIHJldHVybiBNYXRoLnBvdyh2YWx1ZSAtIDEsIDMpICsgMTtcbiAgfSxcblxuICBlYXNlSW5PdXRDdWJpYyh2YWx1ZSkge1xuICAgIGlmICgodmFsdWUgLz0gMC41KSA8IDEpIHJldHVybiAwLjUgKiBNYXRoLnBvdyh2YWx1ZSwgMyk7XG5cbiAgICByZXR1cm4gMC41ICogKE1hdGgucG93KHZhbHVlIC0gMiwgMykgKyAyKTtcbiAgfSxcblxuICBlYXNlSW5RdWFydCh2YWx1ZSkge1xuICAgIHJldHVybiBNYXRoLnBvdyh2YWx1ZSwgNCk7XG4gIH0sXG5cbiAgZWFzZU91dFF1YXJ0KHZhbHVlKSB7XG4gICAgcmV0dXJuIC0oTWF0aC5wb3codmFsdWUgLSAxLCA0KSAtIDEpO1xuICB9LFxuXG4gIGVhc2VJbk91dFF1YXJ0KHZhbHVlKSB7XG4gICAgaWYgKCh2YWx1ZSAvPSAwLjUpIDwgMSkgcmV0dXJuIDAuNSAqIE1hdGgucG93KHZhbHVlLCA0KTtcblxuICAgIHJldHVybiAtMC41ICogKCh2YWx1ZSAtPSAyKSAqIE1hdGgucG93KHZhbHVlLCAzKSAtIDIpO1xuICB9LFxuXG4gIGVhc2VJblNpbmUodmFsdWUpIHtcbiAgICByZXR1cm4gLU1hdGguY29zKHZhbHVlICogTWF0aFV0aWwuUElfMikgKyAxO1xuICB9LFxuXG4gIGVhc2VPdXRTaW5lKHZhbHVlKSB7XG4gICAgcmV0dXJuIE1hdGguc2luKHZhbHVlICogTWF0aFV0aWwuUElfMik7XG4gIH0sXG5cbiAgZWFzZUluT3V0U2luZSh2YWx1ZSkge1xuICAgIHJldHVybiAtMC41ICogKE1hdGguY29zKE1hdGguUEkgKiB2YWx1ZSkgLSAxKTtcbiAgfSxcblxuICBlYXNlSW5FeHBvKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSAwID8gMCA6IE1hdGgucG93KDIsIDEwICogKHZhbHVlIC0gMSkpO1xuICB9LFxuXG4gIGVhc2VPdXRFeHBvKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSAxID8gMSA6IC1NYXRoLnBvdygyLCAtMTAgKiB2YWx1ZSkgKyAxO1xuICB9LFxuXG4gIGVhc2VJbk91dEV4cG8odmFsdWUpIHtcbiAgICBpZiAodmFsdWUgPT09IDApIHJldHVybiAwO1xuXG4gICAgaWYgKHZhbHVlID09PSAxKSByZXR1cm4gMTtcblxuICAgIGlmICgodmFsdWUgLz0gMC41KSA8IDEpIHJldHVybiAwLjUgKiBNYXRoLnBvdygyLCAxMCAqICh2YWx1ZSAtIDEpKTtcblxuICAgIHJldHVybiAwLjUgKiAoLU1hdGgucG93KDIsIC0xMCAqIC0tdmFsdWUpICsgMik7XG4gIH0sXG5cbiAgZWFzZUluQ2lyYyh2YWx1ZSkge1xuICAgIHJldHVybiAtKE1hdGguc3FydCgxIC0gdmFsdWUgKiB2YWx1ZSkgLSAxKTtcbiAgfSxcblxuICBlYXNlT3V0Q2lyYyh2YWx1ZSkge1xuICAgIHJldHVybiBNYXRoLnNxcnQoMSAtIE1hdGgucG93KHZhbHVlIC0gMSwgMikpO1xuICB9LFxuXG4gIGVhc2VJbk91dENpcmModmFsdWUpIHtcbiAgICBpZiAoKHZhbHVlIC89IDAuNSkgPCAxKSByZXR1cm4gLTAuNSAqIChNYXRoLnNxcnQoMSAtIHZhbHVlICogdmFsdWUpIC0gMSk7XG4gICAgcmV0dXJuIDAuNSAqIChNYXRoLnNxcnQoMSAtICh2YWx1ZSAtPSAyKSAqIHZhbHVlKSArIDEpO1xuICB9LFxuXG4gIGVhc2VJbkJhY2sodmFsdWUpIHtcbiAgICBsZXQgcyA9IDEuNzAxNTg7XG4gICAgcmV0dXJuIHZhbHVlICogdmFsdWUgKiAoKHMgKyAxKSAqIHZhbHVlIC0gcyk7XG4gIH0sXG5cbiAgZWFzZU91dEJhY2sodmFsdWUpIHtcbiAgICBsZXQgcyA9IDEuNzAxNTg7XG4gICAgcmV0dXJuICh2YWx1ZSA9IHZhbHVlIC0gMSkgKiB2YWx1ZSAqICgocyArIDEpICogdmFsdWUgKyBzKSArIDE7XG4gIH0sXG5cbiAgZWFzZUluT3V0QmFjayh2YWx1ZSkge1xuICAgIGxldCBzID0gMS43MDE1ODtcbiAgICBpZiAoKHZhbHVlIC89IDAuNSkgPCAxKSByZXR1cm4gMC41ICogKHZhbHVlICogdmFsdWUgKiAoKChzICo9IDEuNTI1KSArIDEpICogdmFsdWUgLSBzKSk7XG4gICAgcmV0dXJuIDAuNSAqICgodmFsdWUgLT0gMikgKiB2YWx1ZSAqICgoKHMgKj0gMS41MjUpICsgMSkgKiB2YWx1ZSArIHMpICsgMik7XG4gIH0sXG5cbiAgZ2V0RWFzaW5nKGVhc2UpIHtcbiAgICBpZiAodHlwZW9mIGVhc2UgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIGVhc2U7XG4gICAgZWxzZSByZXR1cm4gdGhpc1tlYXNlXSB8fCB0aGlzLmVhc2VMaW5lYXI7XG4gIH1cbn07XG4iLCJpbXBvcnQgTWF0aFV0aWwgZnJvbSBcIi4uL21hdGgvTWF0aFV0aWxcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmVjdG9yMkQge1xuICBjb25zdHJ1Y3Rvcih4LCB5KSB7XG4gICAgdGhpcy54ID0geCB8fCAwO1xuICAgIHRoaXMueSA9IHkgfHwgMDtcbiAgfVxuXG4gIHNldCh4LCB5KSB7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgc2V0WCh4KSB7XG4gICAgdGhpcy54ID0geDtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHNldFkoeSkge1xuICAgIHRoaXMueSA9IHk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBnZXRHcmFkaWVudCgpIHtcbiAgICBpZiAodGhpcy54ICE9PSAwKSByZXR1cm4gTWF0aC5hdGFuMih0aGlzLnksIHRoaXMueCk7XG4gICAgZWxzZSBpZiAodGhpcy55ID4gMCkgcmV0dXJuIE1hdGhVdGlsLlBJXzI7XG4gICAgZWxzZSBpZiAodGhpcy55IDwgMCkgcmV0dXJuIC1NYXRoVXRpbC5QSV8yO1xuICB9XG5cbiAgY29weSh2KSB7XG4gICAgdGhpcy54ID0gdi54O1xuICAgIHRoaXMueSA9IHYueTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgYWRkKHYsIHcpIHtcbiAgICBpZiAodyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gdGhpcy5hZGRWZWN0b3JzKHYsIHcpO1xuICAgIH1cblxuICAgIHRoaXMueCArPSB2Lng7XG4gICAgdGhpcy55ICs9IHYueTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgYWRkWFkoYSwgYikge1xuICAgIHRoaXMueCArPSBhO1xuICAgIHRoaXMueSArPSBiO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBhZGRWZWN0b3JzKGEsIGIpIHtcbiAgICB0aGlzLnggPSBhLnggKyBiLng7XG4gICAgdGhpcy55ID0gYS55ICsgYi55O1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBzdWIodiwgdykge1xuICAgIGlmICh3ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiB0aGlzLnN1YlZlY3RvcnModiwgdyk7XG4gICAgfVxuXG4gICAgdGhpcy54IC09IHYueDtcbiAgICB0aGlzLnkgLT0gdi55O1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBzdWJWZWN0b3JzKGEsIGIpIHtcbiAgICB0aGlzLnggPSBhLnggLSBiLng7XG4gICAgdGhpcy55ID0gYS55IC0gYi55O1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBkaXZpZGVTY2FsYXIocykge1xuICAgIGlmIChzICE9PSAwKSB7XG4gICAgICB0aGlzLnggLz0gcztcbiAgICAgIHRoaXMueSAvPSBzO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNldCgwLCAwKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIG11bHRpcGx5U2NhbGFyKHMpIHtcbiAgICB0aGlzLnggKj0gcztcbiAgICB0aGlzLnkgKj0gcztcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgbmVnYXRlKCkge1xuICAgIHJldHVybiB0aGlzLm11bHRpcGx5U2NhbGFyKC0xKTtcbiAgfVxuXG4gIGRvdCh2KSB7XG4gICAgcmV0dXJuIHRoaXMueCAqIHYueCArIHRoaXMueSAqIHYueTtcbiAgfVxuXG4gIGxlbmd0aFNxKCkge1xuICAgIHJldHVybiB0aGlzLnggKiB0aGlzLnggKyB0aGlzLnkgKiB0aGlzLnk7XG4gIH1cblxuICBsZW5ndGgoKSB7XG4gICAgcmV0dXJuIE1hdGguc3FydCh0aGlzLnggKiB0aGlzLnggKyB0aGlzLnkgKiB0aGlzLnkpO1xuICB9XG5cbiAgbm9ybWFsaXplKCkge1xuICAgIHJldHVybiB0aGlzLmRpdmlkZVNjYWxhcih0aGlzLmxlbmd0aCgpKTtcbiAgfVxuXG4gIGRpc3RhbmNlVG8odikge1xuICAgIHJldHVybiBNYXRoLnNxcnQodGhpcy5kaXN0YW5jZVRvU3F1YXJlZCh2KSk7XG4gIH1cblxuICByb3RhdGUodGhhKSB7XG4gICAgY29uc3QgeCA9IHRoaXMueDtcbiAgICBjb25zdCB5ID0gdGhpcy55O1xuXG4gICAgdGhpcy54ID0geCAqIE1hdGguY29zKHRoYSkgKyB5ICogTWF0aC5zaW4odGhhKTtcbiAgICB0aGlzLnkgPSAteCAqIE1hdGguc2luKHRoYSkgKyB5ICogTWF0aC5jb3ModGhhKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZGlzdGFuY2VUb1NxdWFyZWQodikge1xuICAgIGNvbnN0IGR4ID0gdGhpcy54IC0gdi54O1xuICAgIGNvbnN0IGR5ID0gdGhpcy55IC0gdi55O1xuXG4gICAgcmV0dXJuIGR4ICogZHggKyBkeSAqIGR5O1xuICB9XG5cbiAgbGVycCh2LCBhbHBoYSkge1xuICAgIHRoaXMueCArPSAodi54IC0gdGhpcy54KSAqIGFscGhhO1xuICAgIHRoaXMueSArPSAodi55IC0gdGhpcy55KSAqIGFscGhhO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBlcXVhbHModikge1xuICAgIHJldHVybiB2LnggPT09IHRoaXMueCAmJiB2LnkgPT09IHRoaXMueTtcbiAgfVxuXG4gIGNsZWFyKCkge1xuICAgIHRoaXMueCA9IDAuMDtcbiAgICB0aGlzLnkgPSAwLjA7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBjbG9uZSgpIHtcbiAgICByZXR1cm4gbmV3IFZlY3RvcjJEKHRoaXMueCwgdGhpcy55KTtcbiAgfVxufVxuIiwiLyoqIEB0eXBlZGVmIHtpbXBvcnQoJy4uL2JlaGF2aW91ci9CZWhhdmlvdXInKX0gQmVoYXZpb3VyICovXG4vKiogQHR5cGVkZWYge2ltcG9ydCgnLi4vbWF0aC9WZWN0b3IyRCcpfSBWZWN0b3IyRCAqL1xuLyoqIEB0eXBlZGVmIHtpbXBvcnQoJy4uL3V0aWxzL1JnYicpfSBSZ2IgKi9cbmltcG9ydCBSZ2IgZnJvbSBcIi4uL3V0aWxzL1JnYlwiO1xuaW1wb3J0IFB1aWQgZnJvbSBcIi4uL3V0aWxzL1B1aWRcIjtcbmltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlscy9VdGlsXCI7XG5pbXBvcnQgUHJvcFV0aWwgZnJvbSBcIi4uL3V0aWxzL1Byb3BVdGlsXCI7XG5pbXBvcnQgZWFzZSBmcm9tIFwiLi4vbWF0aC9lYXNlXCI7XG5pbXBvcnQgVmVjdG9yMkQgZnJvbSBcIi4uL21hdGgvVmVjdG9yMkRcIjtcbmltcG9ydCBNYXRoVXRpbCBmcm9tIFwiLi4vbWF0aC9NYXRoVXRpbFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYXJ0aWNsZSB7XG4gIC8qKiBAdHlwZSBzdHJpbmcgKi9cbiAgaWQgPSBcIlwiO1xuXG4gIC8qKiBAdHlwZSB7e3A6VmVjdG9yMkQsdjpWZWN0b3IyRCxhOlZlY3RvcjJEfX0gKi9cbiAgb2xkID0ge307XG5cbiAgLyoqIEB0eXBlIHtvYmplY3R9ICovXG4gIGRhdGEgPSB7fTtcblxuICAvKiogQHR5cGUge0JlaGF2aW91cltdfSAqL1xuICBiZWhhdmlvdXJzID0gW107XG5cbiAgLyoqIEB0eXBlIHtWZWN0b3IyRH0gKi9cbiAgcCA9IFtdO1xuXG4gIC8qKiBAdHlwZSB7VmVjdG9yMkR9ICovXG4gIHYgPSBbXTtcblxuICAvKiogQHR5cGUge1ZlY3RvcjJEfSAqL1xuICBhID0gW107XG5cbiAgLyoqIEB0eXBlIHtSZ2J9ICovXG4gIHJnYiA9IHt9O1xuXG4gIC8qKlxuICAgKiB0aGUgUGFydGljbGUgY2xhc3NcbiAgICpcbiAgICogQGNsYXNzIFByb3Rvbi5QYXJ0aWNsZVxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQHBhcmFtIHtPYmplY3R9IHBPYmogdGhlIHBhcmFtZXRlcnMgb2JqZWN0O1xuICAgKiBmb3IgZXhhbXBsZSB7bGlmZTozLGRlYWQ6ZmFsc2V9XG4gICAqL1xuICBjb25zdHJ1Y3Rvcihjb25mKSB7XG4gICAgLyoqXG4gICAgICogVGhlIHBhcnRpY2xlJ3MgaWQ7XG4gICAgICogQHByb3BlcnR5IGlkXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKi9cbiAgICB0aGlzLm5hbWUgPSBcIlBhcnRpY2xlXCI7XG4gICAgdGhpcy5pZCA9IFB1aWQuaWQodGhpcy5uYW1lKTtcbiAgICB0aGlzLm9sZCA9IHt9O1xuICAgIHRoaXMuZGF0YSA9IHt9O1xuICAgIHRoaXMuYmVoYXZpb3VycyA9IFtdO1xuXG4gICAgdGhpcy5wID0gbmV3IFZlY3RvcjJEKCk7XG4gICAgdGhpcy52ID0gbmV3IFZlY3RvcjJEKCk7XG4gICAgdGhpcy5hID0gbmV3IFZlY3RvcjJEKCk7XG4gICAgdGhpcy5vbGQucCA9IG5ldyBWZWN0b3IyRCgpO1xuICAgIHRoaXMub2xkLnYgPSBuZXcgVmVjdG9yMkQoKTtcbiAgICB0aGlzLm9sZC5hID0gbmV3IFZlY3RvcjJEKCk7XG5cbiAgICB0aGlzLnJnYiA9IG5ldyBSZ2IoKTtcbiAgICB0aGlzLnJlc2V0KCk7XG4gICAgY29uZiAmJiBQcm9wVXRpbC5zZXRQcm9wKHRoaXMsIGNvbmYpO1xuICB9XG5cbiAgZ2V0RGlyZWN0aW9uKCkge1xuICAgIHJldHVybiBNYXRoLmF0YW4yKHRoaXMudi54LCAtdGhpcy52LnkpICogTWF0aFV0aWwuTjE4MF9QSTtcbiAgfVxuXG4gIHJlc2V0KCkge1xuICAgIHRoaXMubGlmZSA9IEluZmluaXR5O1xuICAgIHRoaXMuYWdlID0gMDtcblxuICAgIHRoaXMuZGVhZCA9IGZhbHNlO1xuICAgIHRoaXMuc2xlZXAgPSBmYWxzZTtcbiAgICB0aGlzLmJvZHkgPSBudWxsO1xuICAgIHRoaXMuc3ByaXRlID0gbnVsbDtcbiAgICB0aGlzLnBhcmVudCA9IG51bGw7XG5cbiAgICB0aGlzLmVuZXJneSA9IDE7IC8vIEVuZXJneSBMb3NzXG4gICAgdGhpcy5tYXNzID0gMTtcbiAgICB0aGlzLnJhZGl1cyA9IDEwO1xuICAgIHRoaXMuYWxwaGEgPSAxO1xuICAgIHRoaXMuc2NhbGUgPSAxO1xuICAgIHRoaXMucm90YXRpb24gPSAwO1xuICAgIHRoaXMuY29sb3IgPSBudWxsO1xuXG4gICAgdGhpcy5wLnNldCgwLCAwKTtcbiAgICB0aGlzLnYuc2V0KDAsIDApO1xuICAgIHRoaXMuYS5zZXQoMCwgMCk7XG4gICAgdGhpcy5vbGQucC5zZXQoMCwgMCk7XG4gICAgdGhpcy5vbGQudi5zZXQoMCwgMCk7XG4gICAgdGhpcy5vbGQuYS5zZXQoMCwgMCk7XG4gICAgdGhpcy5lYXNpbmcgPSBlYXNlLmVhc2VMaW5lYXI7XG5cbiAgICB0aGlzLnJnYi5yZXNldCgpO1xuICAgIFV0aWwuZW1wdHlPYmplY3QodGhpcy5kYXRhKTtcbiAgICB0aGlzLnJlbW92ZUFsbEJlaGF2aW91cnMoKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgdXBkYXRlKHRpbWUsIGluZGV4KSB7XG4gICAgaWYgKCF0aGlzLnNsZWVwKSB7XG4gICAgICB0aGlzLmFnZSArPSB0aW1lO1xuICAgICAgdGhpcy5hcHBseUJlaGF2aW91cnModGltZSwgaW5kZXgpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmFnZSA8IHRoaXMubGlmZSkge1xuICAgICAgY29uc3Qgc2NhbGUgPSB0aGlzLmVhc2luZyh0aGlzLmFnZSAvIHRoaXMubGlmZSk7XG4gICAgICB0aGlzLmVuZXJneSA9IE1hdGgubWF4KDEgLSBzY2FsZSwgMCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGVzdHJveSgpO1xuICAgIH1cbiAgfVxuXG4gIGFwcGx5QmVoYXZpb3Vycyh0aW1lLCBpbmRleCkge1xuICAgIGNvbnN0IGxlbmd0aCA9IHRoaXMuYmVoYXZpb3Vycy5sZW5ndGg7XG4gICAgbGV0IGk7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMuYmVoYXZpb3Vyc1tpXSAmJiB0aGlzLmJlaGF2aW91cnNbaV0uYXBwbHlCZWhhdmlvdXIodGhpcywgdGltZSwgaW5kZXgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0JlaGF2aW91cn0gYmVoYXZpb3VyXG4gICAqL1xuICBhZGRCZWhhdmlvdXIoYmVoYXZpb3VyKSB7XG4gICAgdGhpcy5iZWhhdmlvdXJzLnB1c2goYmVoYXZpb3VyKTtcblxuICAgIGlmIChiZWhhdmlvdXIuaGFzT3duUHJvcGVydHkoXCJwYXJlbnRzXCIpKSBiZWhhdmlvdXIucGFyZW50cy5wdXNoKHRoaXMpO1xuICAgIGJlaGF2aW91ci5pbml0aWFsaXplKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7QmVoYXZpb3VyW119IGJlaGF2aW91cnNcbiAgICovXG4gIGFkZEJlaGF2aW91cnMoYmVoYXZpb3Vycykge1xuICAgIGNvbnN0IGxlbmd0aCA9IGJlaGF2aW91cnMubGVuZ3RoO1xuICAgIGxldCBpO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLmFkZEJlaGF2aW91cihiZWhhdmlvdXJzW2ldKTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVCZWhhdmlvdXIoYmVoYXZpb3VyKSB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmJlaGF2aW91cnMuaW5kZXhPZihiZWhhdmlvdXIpO1xuXG4gICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgIGNvbnN0IGJlaGF2aW91ciA9IHRoaXMuYmVoYXZpb3Vycy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgYmVoYXZpb3VyLnBhcmVudHMgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZUFsbEJlaGF2aW91cnMoKSB7XG4gICAgVXRpbC5lbXB0eUFycmF5KHRoaXMuYmVoYXZpb3Vycyk7XG4gIH1cblxuICAvKipcbiAgICogRGVzdG9yeSB0aGlzIHBhcnRpY2xlXG4gICAqIEBtZXRob2QgZGVzdHJveVxuICAgKi9cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLnJlbW92ZUFsbEJlaGF2aW91cnMoKTtcbiAgICB0aGlzLmVuZXJneSA9IDA7XG4gICAgdGhpcy5kZWFkID0gdHJ1ZTtcbiAgICB0aGlzLnBhcmVudCA9IG51bGw7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IHtcbiAgLyoqXG4gICAqIEB0eXBlZGVmICB7T2JqZWN0fSByZ2JPYmplY3RcbiAgICogQHByb3BlcnR5IHtOdW1iZXJ9IHIgcmVkIHZhbHVlXG4gICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBnIGdyZWVuIHZhbHVlXG4gICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBiIGJsdWUgdmFsdWVcbiAgICovXG4gIC8qKlxuICAgKiBjb252ZXJ0cyBhIGhleCB2YWx1ZSB0byBhIHJnYiBvYmplY3RcbiAgICpcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uVXRpbFxuICAgKiBAbWV0aG9kIGhleFRvUmdiXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBoIGFueSBoZXggdmFsdWUsIGUuZy4gIzAwMDAwMCBvciAwMDAwMDAgZm9yIGJsYWNrXG4gICAqXG4gICAqIEByZXR1cm4ge3JnYk9iamVjdH1cbiAgICovXG4gIGhleFRvUmdiKGgpIHtcbiAgICBjb25zdCBoZXgxNiA9IGguY2hhckF0KDApID09PSBcIiNcIiA/IGguc3Vic3RyaW5nKDEsIDcpIDogaDtcbiAgICBjb25zdCByID0gcGFyc2VJbnQoaGV4MTYuc3Vic3RyaW5nKDAsIDIpLCAxNik7XG4gICAgY29uc3QgZyA9IHBhcnNlSW50KGhleDE2LnN1YnN0cmluZygyLCA0KSwgMTYpO1xuICAgIGNvbnN0IGIgPSBwYXJzZUludChoZXgxNi5zdWJzdHJpbmcoNCwgNiksIDE2KTtcblxuICAgIHJldHVybiB7IHIsIGcsIGIgfTtcbiAgfSxcblxuICAvKipcbiAgICogY29udmVydHMgYSByZ2IgdmFsdWUgdG8gYSByZ2Igc3RyaW5nXG4gICAqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlV0aWxcbiAgICogQG1ldGhvZCByZ2JUb0hleFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdCB8IFByb3Rvbi5oZXhUb1JnYn0gcmdiIGEgcmdiIG9iamVjdCBsaWtlIGluIHtAbGluayBQcm90b24jUHJvdG9uLn1cbiAgICpcbiAgICogQHJldHVybiB7U3RyaW5nfSByZ2IoKVxuICAgKi9cbiAgcmdiVG9IZXgocmJnKSB7XG4gICAgcmV0dXJuIGByZ2IoJHtyYmcucn0sICR7cmJnLmd9LCAke3JiZy5ifSlgO1xuICB9LFxuXG4gIGdldEhleDE2RnJvbVBhcnRpY2xlKHApIHtcbiAgICByZXR1cm4gTnVtYmVyKHAucmdiLnIpICogNjU1MzYgKyBOdW1iZXIocC5yZ2IuZykgKiAyNTYgKyBOdW1iZXIocC5yZ2IuYik7XG4gIH1cbn07XG4iLCJpbXBvcnQgVmVjdG9yMkQgZnJvbSBcIi4vVmVjdG9yMkRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9sYXIyRCB7XG4gIGNvbnN0cnVjdG9yKHIsIHRoYSkge1xuICAgIHRoaXMuciA9IE1hdGguYWJzKHIpIHx8IDA7XG4gICAgdGhpcy50aGEgPSB0aGEgfHwgMDtcbiAgfVxuXG4gIHNldChyLCB0aGEpIHtcbiAgICB0aGlzLnIgPSByO1xuICAgIHRoaXMudGhhID0gdGhhO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgc2V0UihyKSB7XG4gICAgdGhpcy5yID0gcjtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHNldFRoYSh0aGEpIHtcbiAgICB0aGlzLnRoYSA9IHRoYTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGNvcHkocCkge1xuICAgIHRoaXMuciA9IHAucjtcbiAgICB0aGlzLnRoYSA9IHAudGhhO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgdG9WZWN0b3IoKSB7XG4gICAgcmV0dXJuIG5ldyBWZWN0b3IyRCh0aGlzLmdldFgoKSwgdGhpcy5nZXRZKCkpO1xuICB9XG5cbiAgZ2V0WCgpIHtcbiAgICByZXR1cm4gdGhpcy5yICogTWF0aC5zaW4odGhpcy50aGEpO1xuICB9XG5cbiAgZ2V0WSgpIHtcbiAgICByZXR1cm4gLXRoaXMuciAqIE1hdGguY29zKHRoaXMudGhhKTtcbiAgfVxuXG4gIG5vcm1hbGl6ZSgpIHtcbiAgICB0aGlzLnIgPSAxO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZXF1YWxzKHYpIHtcbiAgICByZXR1cm4gdi5yID09PSB0aGlzLnIgJiYgdi50aGEgPT09IHRoaXMudGhhO1xuICB9XG5cbiAgY2xlYXIoKSB7XG4gICAgdGhpcy5yID0gMC4wO1xuICAgIHRoaXMudGhhID0gMC4wO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgY2xvbmUoKSB7XG4gICAgcmV0dXJuIG5ldyBQb2xhcjJEKHRoaXMuciwgdGhpcy50aGEpO1xuICB9XG59XG4iLCJjb25zdCBNYXQzID0ge1xuICBjcmVhdGUobWF0Mykge1xuICAgIGNvbnN0IG1hdCA9IG5ldyBGbG9hdDMyQXJyYXkoOSk7XG4gICAgaWYgKG1hdDMpIHRoaXMuc2V0KG1hdDMsIG1hdCk7XG5cbiAgICByZXR1cm4gbWF0O1xuICB9LFxuXG4gIHNldChtYXQxLCBtYXQyKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA5OyBpKyspIG1hdDJbaV0gPSBtYXQxW2ldO1xuXG4gICAgcmV0dXJuIG1hdDI7XG4gIH0sXG5cbiAgbXVsdGlwbHkobWF0LCBtYXQyLCBtYXQzKSB7XG4gICAgbGV0IGEwMCA9IG1hdFswXSxcbiAgICAgIGEwMSA9IG1hdFsxXSxcbiAgICAgIGEwMiA9IG1hdFsyXSxcbiAgICAgIGExMCA9IG1hdFszXSxcbiAgICAgIGExMSA9IG1hdFs0XSxcbiAgICAgIGEyMCA9IG1hdFs2XSxcbiAgICAgIGEyMSA9IG1hdFs3XSxcbiAgICAgIGIwMCA9IG1hdDJbMF0sXG4gICAgICBiMDEgPSBtYXQyWzFdLFxuICAgICAgYjAyID0gbWF0MlsyXSxcbiAgICAgIGIxMCA9IG1hdDJbM10sXG4gICAgICBiMTEgPSBtYXQyWzRdLFxuICAgICAgYjIwID0gbWF0Mls2XSxcbiAgICAgIGIyMSA9IG1hdDJbN107XG5cbiAgICBtYXQzWzBdID0gYjAwICogYTAwICsgYjAxICogYTEwO1xuICAgIG1hdDNbMV0gPSBiMDAgKiBhMDEgKyBiMDEgKiBhMTE7XG4gICAgbWF0M1syXSA9IGEwMiAqIGIwMjtcbiAgICBtYXQzWzNdID0gYjEwICogYTAwICsgYjExICogYTEwO1xuICAgIG1hdDNbNF0gPSBiMTAgKiBhMDEgKyBiMTEgKiBhMTE7XG4gICAgbWF0M1s2XSA9IGIyMCAqIGEwMCArIGIyMSAqIGExMCArIGEyMDtcbiAgICBtYXQzWzddID0gYjIwICogYTAxICsgYjIxICogYTExICsgYTIxO1xuXG4gICAgcmV0dXJuIG1hdDM7XG4gIH0sXG5cbiAgaW52ZXJzZShtYXQsIG1hdDMpIHtcbiAgICBsZXQgYTAwID0gbWF0WzBdLFxuICAgICAgYTAxID0gbWF0WzFdLFxuICAgICAgYTEwID0gbWF0WzNdLFxuICAgICAgYTExID0gbWF0WzRdLFxuICAgICAgYTIwID0gbWF0WzZdLFxuICAgICAgYTIxID0gbWF0WzddLFxuICAgICAgYjAxID0gYTExLFxuICAgICAgYjExID0gLWExMCxcbiAgICAgIGIyMSA9IGEyMSAqIGExMCAtIGExMSAqIGEyMCxcbiAgICAgIGQgPSBhMDAgKiBiMDEgKyBhMDEgKiBiMTEsXG4gICAgICBpZDtcblxuICAgIGlkID0gMSAvIGQ7XG4gICAgbWF0M1swXSA9IGIwMSAqIGlkO1xuICAgIG1hdDNbMV0gPSAtYTAxICogaWQ7XG4gICAgbWF0M1szXSA9IGIxMSAqIGlkO1xuICAgIG1hdDNbNF0gPSBhMDAgKiBpZDtcbiAgICBtYXQzWzZdID0gYjIxICogaWQ7XG4gICAgbWF0M1s3XSA9ICgtYTIxICogYTAwICsgYTAxICogYTIwKSAqIGlkO1xuXG4gICAgcmV0dXJuIG1hdDM7XG4gIH0sXG5cbiAgbXVsdGlwbHlWZWMyKG0sIHZlYywgbWF0Mykge1xuICAgIGxldCB4ID0gdmVjWzBdLFxuICAgICAgeSA9IHZlY1sxXTtcblxuICAgIG1hdDNbMF0gPSB4ICogbVswXSArIHkgKiBtWzNdICsgbVs2XTtcbiAgICBtYXQzWzFdID0geCAqIG1bMV0gKyB5ICogbVs0XSArIG1bN107XG5cbiAgICByZXR1cm4gbWF0MztcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgTWF0MztcbiIsImltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlscy9VdGlsXCI7XG5pbXBvcnQgTWF0aFV0aWwgZnJvbSBcIi4uL21hdGgvTWF0aFV0aWxcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3BhbiB7XG4gIGNvbnN0cnVjdG9yKGEsIGIsIGNlbnRlcikge1xuICAgIGlmIChVdGlsLmlzQXJyYXkoYSkpIHtcbiAgICAgIHRoaXMuaXNBcnJheSA9IHRydWU7XG4gICAgICB0aGlzLmEgPSBhO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmlzQXJyYXkgPSBmYWxzZTtcbiAgICAgIHRoaXMuYSA9IFV0aWwuaW5pdFZhbHVlKGEsIDEpO1xuICAgICAgdGhpcy5iID0gVXRpbC5pbml0VmFsdWUoYiwgdGhpcy5hKTtcbiAgICAgIHRoaXMuY2VudGVyID0gVXRpbC5pbml0VmFsdWUoY2VudGVyLCBmYWxzZSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0VmFsdWUoaXNJbnQgPSBmYWxzZSkge1xuICAgIGlmICh0aGlzLmlzQXJyYXkpIHtcbiAgICAgIHJldHVybiBVdGlsLmdldFJhbmRGcm9tQXJyYXkodGhpcy5hKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKCF0aGlzLmNlbnRlcikge1xuICAgICAgICByZXR1cm4gTWF0aFV0aWwucmFuZG9tQVRvQih0aGlzLmEsIHRoaXMuYiwgaXNJbnQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIE1hdGhVdGlsLnJhbmRvbUZsb2F0aW5nKHRoaXMuYSwgdGhpcy5iLCBpc0ludCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBuZXcgU3BhbiBvYmplY3RcbiAgICpcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uVXRpbFxuICAgKiBAbWV0aG9kIHNldFNwYW5WYWx1ZVxuICAgKlxuICAgKiBAdG9kbyBhLCBiIGFuZCBjIHNob3VsZCBiZSAnTWl4ZWQnIG9yICdOdW1iZXInP1xuICAgKlxuICAgKiBAcGFyYW0ge01peGVkIHwgU3Bhbn0gYVxuICAgKiBAcGFyYW0ge01peGVkfSAgICAgICAgICAgICAgIGJcbiAgICogQHBhcmFtIHtNaXhlZH0gICAgICAgICAgICAgICBjXG4gICAqXG4gICAqIEByZXR1cm4ge1NwYW59XG4gICAqL1xuICBzdGF0aWMgc2V0U3BhblZhbHVlKGEsIGIsIGMpIHtcbiAgICBpZiAoYSBpbnN0YW5jZW9mIFNwYW4pIHtcbiAgICAgIHJldHVybiBhO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoYiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBuZXcgU3BhbihhKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChjID09PSB1bmRlZmluZWQpIHJldHVybiBuZXcgU3BhbihhLCBiKTtcbiAgICAgICAgZWxzZSByZXR1cm4gbmV3IFNwYW4oYSwgYiwgYyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHZhbHVlIGZyb20gYSBTcGFuLCBpZiB0aGUgcGFyYW0gaXMgbm90IGEgU3BhbiBpdCB3aWxsIHJldHVybiB0aGUgZ2l2ZW4gcGFyYW1ldGVyXG4gICAqXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlV0aWxcbiAgICogQG1ldGhvZCBnZXRWYWx1ZVxuICAgKlxuICAgKiBAcGFyYW0ge01peGVkIHwgU3Bhbn0gcGFuXG4gICAqXG4gICAqIEByZXR1cm4ge01peGVkfSB0aGUgdmFsdWUgb2YgU3BhbiBPUiB0aGUgcGFyYW1ldGVyIGlmIGl0IGlzIG5vdCBhIFNwYW5cbiAgICovXG4gIHN0YXRpYyBnZXRTcGFuVmFsdWUocGFuKSB7XG4gICAgcmV0dXJuIHBhbiBpbnN0YW5jZW9mIFNwYW4gPyBwYW4uZ2V0VmFsdWUoKSA6IHBhbjtcbiAgfVxufVxuIiwiaW1wb3J0IFNwYW4gZnJvbSBcIi4vU3BhblwiO1xuaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcbmltcG9ydCBNYXRoVXRpbCBmcm9tIFwiLi9NYXRoVXRpbFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcnJheVNwYW4gZXh0ZW5kcyBTcGFuIHtcbiAgY29uc3RydWN0b3IoY29sb3IpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuX2FyciA9IFV0aWwudG9BcnJheShjb2xvcik7XG4gIH1cblxuICBnZXRWYWx1ZSgpIHtcbiAgICBjb25zdCB2YWwgPSBVdGlsLmdldFJhbmRGcm9tQXJyYXkodGhpcy5fYXJyKTtcbiAgICByZXR1cm4gdmFsID09PSBcInJhbmRvbVwiIHx8IHZhbCA9PT0gXCJSYW5kb21cIiA/IE1hdGhVdGlsLnJhbmRvbUNvbG9yKCkgOiB2YWw7XG4gIH1cblxuICAvKipcbiAgICogTWFrZSBzdXJlIHRoYXQgdGhlIGNvbG9yIGlzIGFuIGluc3RhbmNlIG9mIFByb3Rvbi5BcnJheVNwYW4sIGlmIG5vdCBpdCBtYWtlcyBhIG5ldyBpbnN0YW5jZVxuICAgKlxuICAgKiBAbWV0aG9kIHNldFNwYW5WYWx1ZVxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5Db2xvclxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtQcm90b24uUGFydGljbGV9IHBhcnRpY2xlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB0aGUgaW50ZWdyYXRlIHRpbWUgMS9tc1xuICAgKiBAcGFyYW0ge0ludH0gdGhlIHBhcnRpY2xlIGluZGV4XG4gICAqL1xuICBzdGF0aWMgY3JlYXRlQXJyYXlTcGFuKGFycikge1xuICAgIGlmICghYXJyKSByZXR1cm4gbnVsbDtcblxuICAgIGlmIChhcnIgaW5zdGFuY2VvZiBBcnJheVNwYW4pIHJldHVybiBhcnI7XG4gICAgZWxzZSByZXR1cm4gbmV3IEFycmF5U3BhbihhcnIpO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBSZWN0YW5nbGUge1xuICBjb25zdHJ1Y3Rvcih4LCB5LCB3LCBoKSB7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuXG4gICAgdGhpcy53aWR0aCA9IHc7XG4gICAgdGhpcy5oZWlnaHQgPSBoO1xuXG4gICAgdGhpcy5ib3R0b20gPSB0aGlzLnkgKyB0aGlzLmhlaWdodDtcbiAgICB0aGlzLnJpZ2h0ID0gdGhpcy54ICsgdGhpcy53aWR0aDtcbiAgfVxuXG4gIGNvbnRhaW5zKHgsIHkpIHtcbiAgICBpZiAoeCA8PSB0aGlzLnJpZ2h0ICYmIHggPj0gdGhpcy54ICYmIHkgPD0gdGhpcy5ib3R0b20gJiYgeSA+PSB0aGlzLnkpIHJldHVybiB0cnVlO1xuICAgIGVsc2UgcmV0dXJuIGZhbHNlO1xuICB9XG59XG4iLCJpbXBvcnQgU3BhbiBmcm9tIFwiLi4vbWF0aC9TcGFuXCI7XG5pbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSYXRlIHtcbiAgLyoqXG4gICAqIFRoZSBudW1iZXIgb2YgcGFydGljbGVzIHBlciBzZWNvbmQgZW1pc3Npb24gKGEgW3BhcnRpY2xlXS9iIFtzXSk7XG4gICAqIEBuYW1lc3BhY2VcbiAgICogQG1lbWJlcm9mISBQcm90b24jXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAYWxpYXMgUmF0ZVxuICAgKlxuICAgKiBAcGFyYW0ge0FycmF5IHwgTnVtYmVyIHwgU3Bhbn0gbnVtcGFuIHRoZSBudW1iZXIgb2YgZWFjaCBlbWlzc2lvbjtcbiAgICogQHBhcmFtIHtBcnJheSB8IE51bWJlciB8IFNwYW59IHRpbWVwYW4gdGhlIHRpbWUgb2YgZWFjaCBlbWlzc2lvbjtcbiAgICogZm9yIGV4YW1wbGU6IG5ldyBSYXRlKG5ldyBTcGFuKDEwLCAyMCksIG5ldyBTcGFuKC4xLCAuMjUpKTtcbiAgICovXG4gIGNvbnN0cnVjdG9yKG51bXBhbiwgdGltZXBhbikge1xuICAgIHRoaXMubnVtUGFuID0gU3Bhbi5zZXRTcGFuVmFsdWUoVXRpbC5pbml0VmFsdWUobnVtcGFuLCAxKSk7XG4gICAgdGhpcy50aW1lUGFuID0gU3Bhbi5zZXRTcGFuVmFsdWUoVXRpbC5pbml0VmFsdWUodGltZXBhbiwgMSkpO1xuXG4gICAgdGhpcy5zdGFydFRpbWUgPSAwO1xuICAgIHRoaXMubmV4dFRpbWUgPSAwO1xuICAgIHRoaXMuaW5pdCgpO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICB0aGlzLnN0YXJ0VGltZSA9IDA7XG4gICAgdGhpcy5uZXh0VGltZSA9IHRoaXMudGltZVBhbi5nZXRWYWx1ZSgpO1xuICB9XG5cbiAgZ2V0VmFsdWUodGltZSkge1xuICAgIHRoaXMuc3RhcnRUaW1lICs9IHRpbWU7XG5cbiAgICBpZiAodGhpcy5zdGFydFRpbWUgPj0gdGhpcy5uZXh0VGltZSkge1xuICAgICAgdGhpcy5zdGFydFRpbWUgPSAwO1xuICAgICAgdGhpcy5uZXh0VGltZSA9IHRoaXMudGltZVBhbi5nZXRWYWx1ZSgpO1xuXG4gICAgICBpZiAodGhpcy5udW1QYW4uYiA9PT0gMSkge1xuICAgICAgICBpZiAodGhpcy5udW1QYW4uZ2V0VmFsdWUoZmFsc2UpID4gMC41KSByZXR1cm4gMTtcbiAgICAgICAgZWxzZSByZXR1cm4gMDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLm51bVBhbi5nZXRWYWx1ZSh0cnVlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gMDtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5pdGlhbGl6ZSB7XG4gIHJlc2V0KCkge31cblxuICBpbml0KGVtaXR0ZXIsIHBhcnRpY2xlKSB7XG4gICAgaWYgKHBhcnRpY2xlKSB7XG4gICAgICB0aGlzLmluaXRpYWxpemUocGFydGljbGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmluaXRpYWxpemUoZW1pdHRlcik7XG4gICAgfVxuICB9XG5cbiAgLy8gc3ViIGNsYXNzIGluaXRcbiAgaW5pdGlhbGl6ZSh0YXJnZXQpIHt9XG59XG4iLCJpbXBvcnQgU3BhbiBmcm9tIFwiLi4vbWF0aC9TcGFuXCI7XG5pbXBvcnQgSW5pdGlhbGl6ZSBmcm9tIFwiLi9Jbml0aWFsaXplXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExpZmUgZXh0ZW5kcyBJbml0aWFsaXplIHtcbiAgY29uc3RydWN0b3IoYSwgYiwgYykge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLmxpZmVQYW4gPSBTcGFuLnNldFNwYW5WYWx1ZShhLCBiLCBjKTtcbiAgICB0aGlzLm5hbWUgPSBcIkxpZmVcIjtcbiAgfVxuXG4gIGluaXRpYWxpemUodGFyZ2V0KSB7XG4gICAgaWYgKHRoaXMubGlmZVBhbi5hID09PSBJbmZpbml0eSkgdGFyZ2V0LmxpZmUgPSBJbmZpbml0eTtcbiAgICBlbHNlIHRhcmdldC5saWZlID0gdGhpcy5saWZlUGFuLmdldFZhbHVlKCk7XG4gIH1cbn1cbiIsImltcG9ydCBWZWN0b3IyRCBmcm9tIFwiLi4vbWF0aC9WZWN0b3IyRFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBab25lIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy52ZWN0b3IgPSBuZXcgVmVjdG9yMkQoMCwgMCk7XG4gICAgdGhpcy5yYW5kb20gPSAwO1xuICAgIHRoaXMuY3Jvc3NUeXBlID0gXCJkZWFkXCI7XG4gICAgdGhpcy5hbGVydCA9IHRydWU7XG4gIH1cblxuICBnZXRQb3NpdGlvbigpIHt9XG5cbiAgY3Jvc3NpbmcocGFydGljbGUpIHt9XG5cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLnZlY3RvciA9IG51bGw7XG4gIH1cbn1cbiIsImltcG9ydCBab25lIGZyb20gXCIuL1pvbmVcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9pbnRab25lIGV4dGVuZHMgWm9uZSB7XG4gIGNvbnN0cnVjdG9yKHgsIHkpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICB9XG5cbiAgZ2V0UG9zaXRpb24oKSB7XG4gICAgdGhpcy52ZWN0b3IueCA9IHRoaXMueDtcbiAgICB0aGlzLnZlY3Rvci55ID0gdGhpcy55O1xuXG4gICAgcmV0dXJuIHRoaXMudmVjdG9yO1xuICB9XG5cbiAgY3Jvc3NpbmcocGFydGljbGUpIHtcbiAgICBpZiAodGhpcy5hbGVydCkge1xuICAgICAgY29uc29sZS5lcnJvcihcIlNvcnJ5LCBQb2ludFpvbmUgZG9lcyBub3Qgc3VwcG9ydCBjcm9zc2luZyBtZXRob2QhXCIpO1xuICAgICAgdGhpcy5hbGVydCA9IGZhbHNlO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcbmltcG9ydCBQb2ludFpvbmUgZnJvbSBcIi4uL3pvbmUvUG9pbnRab25lXCI7XG5pbXBvcnQgSW5pdGlhbGl6ZSBmcm9tIFwiLi9Jbml0aWFsaXplXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvc2l0aW9uIGV4dGVuZHMgSW5pdGlhbGl6ZSB7XG4gIGNvbnN0cnVjdG9yKHpvbmUpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuem9uZSA9IFV0aWwuaW5pdFZhbHVlKHpvbmUsIG5ldyBQb2ludFpvbmUoKSk7XG4gICAgdGhpcy5uYW1lID0gXCJQb3NpdGlvblwiO1xuICB9XG5cbiAgcmVzZXQoem9uZSkge1xuICAgIHRoaXMuem9uZSA9IFV0aWwuaW5pdFZhbHVlKHpvbmUsIG5ldyBQb2ludFpvbmUoKSk7XG4gIH1cblxuICBpbml0aWFsaXplKHRhcmdldCkge1xuICAgIHRoaXMuem9uZS5nZXRQb3NpdGlvbigpO1xuXG4gICAgdGFyZ2V0LnAueCA9IHRoaXMuem9uZS52ZWN0b3IueDtcbiAgICB0YXJnZXQucC55ID0gdGhpcy56b25lLnZlY3Rvci55O1xuICB9XG59XG4iLCJpbXBvcnQgUHJvdG9uIGZyb20gXCIuLi9jb3JlL1Byb3RvblwiO1xuaW1wb3J0IFNwYW4gZnJvbSBcIi4uL21hdGgvU3BhblwiO1xuaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcbmltcG9ydCBJbml0aWFsaXplIGZyb20gXCIuL0luaXRpYWxpemVcIjtcbmltcG9ydCBQb2xhcjJEIGZyb20gXCIuLi9tYXRoL1BvbGFyMkRcIjtcbmltcG9ydCBNYXRoVXRpbCBmcm9tIFwiLi4vbWF0aC9NYXRoVXRpbFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWZWxvY2l0eSBleHRlbmRzIEluaXRpYWxpemUge1xuICBjb25zdHJ1Y3RvcihycGFuLCB0aGFwYW4sIHR5cGUpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5yUGFuID0gU3Bhbi5zZXRTcGFuVmFsdWUocnBhbik7XG4gICAgdGhpcy50aGFQYW4gPSBTcGFuLnNldFNwYW5WYWx1ZSh0aGFwYW4pO1xuICAgIHRoaXMudHlwZSA9IFV0aWwuaW5pdFZhbHVlKHR5cGUsIFwidmVjdG9yXCIpO1xuXG4gICAgdGhpcy5uYW1lID0gXCJWZWxvY2l0eVwiO1xuICB9XG5cbiAgcmVzZXQocnBhbiwgdGhhcGFuLCB0eXBlKSB7XG4gICAgdGhpcy5yUGFuID0gU3Bhbi5zZXRTcGFuVmFsdWUocnBhbik7XG4gICAgdGhpcy50aGFQYW4gPSBTcGFuLnNldFNwYW5WYWx1ZSh0aGFwYW4pO1xuICAgIHRoaXMudHlwZSA9IFV0aWwuaW5pdFZhbHVlKHR5cGUsIFwidmVjdG9yXCIpO1xuICB9XG5cbiAgbm9ybWFsaXplVmVsb2NpdHkodnIpIHtcbiAgICByZXR1cm4gdnIgKiBQcm90b24uTUVBU1VSRTtcbiAgfVxuXG4gIGluaXRpYWxpemUodGFyZ2V0KSB7XG4gICAgaWYgKHRoaXMudHlwZSA9PT0gXCJwXCIgfHwgdGhpcy50eXBlID09PSBcIlBcIiB8fCB0aGlzLnR5cGUgPT09IFwicG9sYXJcIikge1xuICAgICAgY29uc3QgcG9sYXIyZCA9IG5ldyBQb2xhcjJEKFxuICAgICAgICB0aGlzLm5vcm1hbGl6ZVZlbG9jaXR5KHRoaXMuclBhbi5nZXRWYWx1ZSgpKSxcbiAgICAgICAgdGhpcy50aGFQYW4uZ2V0VmFsdWUoKSAqIE1hdGhVdGlsLlBJXzE4MFxuICAgICAgKTtcblxuICAgICAgdGFyZ2V0LnYueCA9IHBvbGFyMmQuZ2V0WCgpO1xuICAgICAgdGFyZ2V0LnYueSA9IHBvbGFyMmQuZ2V0WSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0YXJnZXQudi54ID0gdGhpcy5ub3JtYWxpemVWZWxvY2l0eSh0aGlzLnJQYW4uZ2V0VmFsdWUoKSk7XG4gICAgICB0YXJnZXQudi55ID0gdGhpcy5ub3JtYWxpemVWZWxvY2l0eSh0aGlzLnRoYVBhbi5nZXRWYWx1ZSgpKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBTcGFuIGZyb20gXCIuLi9tYXRoL1NwYW5cIjtcbmltcG9ydCBJbml0aWFsaXplIGZyb20gXCIuL0luaXRpYWxpemVcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFzcyBleHRlbmRzIEluaXRpYWxpemUge1xuICBjb25zdHJ1Y3RvcihhLCBiLCBjKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLm1hc3NQYW4gPSBTcGFuLnNldFNwYW5WYWx1ZShhLCBiLCBjKTtcbiAgICB0aGlzLm5hbWUgPSBcIk1hc3NcIjtcbiAgfVxuXG4gIGluaXRpYWxpemUodGFyZ2V0KSB7XG4gICAgdGFyZ2V0Lm1hc3MgPSB0aGlzLm1hc3NQYW4uZ2V0VmFsdWUoKTtcbiAgfVxufVxuIiwiaW1wb3J0IFNwYW4gZnJvbSBcIi4uL21hdGgvU3BhblwiO1xuaW1wb3J0IEluaXRpYWxpemUgZnJvbSBcIi4vSW5pdGlhbGl6ZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSYWRpdXMgZXh0ZW5kcyBJbml0aWFsaXplIHtcbiAgY29uc3RydWN0b3IoYSwgYiwgYykge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5yYWRpdXMgPSBTcGFuLnNldFNwYW5WYWx1ZShhLCBiLCBjKTtcblxuICAgIHRoaXMubmFtZSA9IFwiUmFkaXVzXCI7XG4gIH1cblxuICByZXNldChhLCBiLCBjKSB7XG4gICAgdGhpcy5yYWRpdXMgPSBTcGFuLnNldFNwYW5WYWx1ZShhLCBiLCBjKTtcbiAgfVxuXG4gIGluaXRpYWxpemUocGFydGljbGUpIHtcbiAgICBwYXJ0aWNsZS5yYWRpdXMgPSB0aGlzLnJhZGl1cy5nZXRWYWx1ZSgpO1xuICAgIHBhcnRpY2xlLmRhdGEub2xkUmFkaXVzID0gcGFydGljbGUucmFkaXVzO1xuICB9XG59XG4iLCJpbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IEFycmF5U3BhbiBmcm9tIFwiLi4vbWF0aC9BcnJheVNwYW5cIjtcbmltcG9ydCBJbml0aWFsaXplIGZyb20gXCIuL0luaXRpYWxpemVcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm9keSBleHRlbmRzIEluaXRpYWxpemUge1xuICBjb25zdHJ1Y3RvcihpbWFnZSwgdywgaCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLmltYWdlID0gdGhpcy5zZXRTcGFuVmFsdWUoaW1hZ2UpO1xuICAgIHRoaXMudyA9IFV0aWwuaW5pdFZhbHVlKHcsIDIwKTtcbiAgICB0aGlzLmggPSBVdGlsLmluaXRWYWx1ZShoLCB0aGlzLncpO1xuICAgIHRoaXMubmFtZSA9IFwiQm9keVwiO1xuICB9XG5cbiAgaW5pdGlhbGl6ZShwYXJ0aWNsZSkge1xuICAgIGNvbnN0IGltYWdlVGFyZ2V0ID0gdGhpcy5pbWFnZS5nZXRWYWx1ZSgpO1xuXG4gICAgaWYgKHR5cGVvZiBpbWFnZVRhcmdldCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgcGFydGljbGUuYm9keSA9IHtcbiAgICAgICAgd2lkdGg6IHRoaXMudyxcbiAgICAgICAgaGVpZ2h0OiB0aGlzLmgsXG4gICAgICAgIHNyYzogaW1hZ2VUYXJnZXQsXG4gICAgICAgIGlzSW5uZXI6IHRydWUsXG4gICAgICAgIGlubmVyOiB0cnVlXG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBwYXJ0aWNsZS5ib2R5ID0gaW1hZ2VUYXJnZXQ7XG4gICAgfVxuICB9XG5cbiAgc2V0U3BhblZhbHVlKGltYWdlKSB7XG4gICAgcmV0dXJuIGltYWdlIGluc3RhbmNlb2YgQXJyYXlTcGFuID8gaW1hZ2UgOiBuZXcgQXJyYXlTcGFuKGltYWdlKTtcbiAgfVxufVxuIiwiaW1wb3J0IFByb3RvbiBmcm9tIFwiLi4vY29yZS9Qcm90b25cIjtcbmltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlscy9VdGlsXCI7XG5pbXBvcnQgZWFzZSBmcm9tIFwiLi4vbWF0aC9lYXNlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJlaGF2aW91ciB7XG4gIHN0YXRpYyBpZCA9IDA7XG5cbiAgLyoqXG4gICAqIFRoZSBCZWhhdmlvdXIgY2xhc3MgaXMgdGhlIGJhc2UgZm9yIHRoZSBvdGhlciBCZWhhdmlvdXJcbiAgICpcbiAgICogQG1lbWJlcm9mISAtXG4gICAqIEBpbnRlcmZhY2VcbiAgICogQGFsaWFzIFByb3Rvbi5CZWhhdmlvdXJcbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGxpZmUgXHR0aGUgYmVoYXZpb3VycyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBlYXNpbmcgXHRUaGUgYmVoYXZpb3VyJ3MgZGVjYXlpbmcgdHJlbmQsIGZvciBleGFtcGxlIGVhc2UuZWFzZU91dFF1YXJ0XG4gICAqXG4gICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSAgaWQgXHRcdFRoZSBiZWhhdmlvdXJzIGlkXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gXHRcdFx0XHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZS5lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSAgYWdlPTAgXHRIb3cgbG9uZyB0aGUgcGFydGljbGUgc2hvdWxkIGJlICdhbGlmZSdcbiAgICogQHByb3BlcnR5IHtOdW1iZXJ9ICBlbmVyZ3k9MVxuICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IGRlYWQ9ZmFsc2UgVGhlIHBhcnRpY2xlIGlzIGRlYWQgYXQgZmlyc3RcbiAgICogQHByb3BlcnR5IHtBcnJheX0gICBwYXJlbnRzIFx0VGhlIGJlaGF2aW91cidzIHBhcmVudHMgYXJyYXlcbiAgICogQHByb3BlcnR5IHtTdHJpbmd9ICBuYW1lIFx0VGhlIGJlaGF2aW91ciBuYW1lXG4gICAqL1xuICBjb25zdHJ1Y3RvcihsaWZlLCBlYXNpbmcpIHtcbiAgICB0aGlzLmxpZmUgPSBVdGlsLmluaXRWYWx1ZShsaWZlLCBJbmZpbml0eSk7XG4gICAgdGhpcy5lYXNpbmcgPSBlYXNlLmdldEVhc2luZyhlYXNpbmcpO1xuXG4gICAgdGhpcy5hZ2UgPSAwO1xuICAgIHRoaXMuZW5lcmd5ID0gMTtcbiAgICB0aGlzLmRlYWQgPSBmYWxzZTtcbiAgICB0aGlzLnBhcmVudHMgPSBbXTtcblxuICAgIHRoaXMuaWQgPSBgQmVoYXZpb3VyXyR7QmVoYXZpb3VyLmlkKyt9YDtcbiAgICB0aGlzLm5hbWUgPSBcIkJlaGF2aW91clwiO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoaXMgYmVoYXZpb3VyJ3MgcGFyYW1ldGVyc1xuICAgKlxuICAgKiBAbWV0aG9kIHJlc2V0XG4gICAqIEBtZW1iZXJvZiBQcm90b24uQmVoYXZpb3VyXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpZmU9SW5maW5pdHldIFx0XHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZUxpbmVhcl0gXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKi9cbiAgcmVzZXQobGlmZSwgZWFzaW5nKSB7XG4gICAgdGhpcy5saWZlID0gVXRpbC5pbml0VmFsdWUobGlmZSwgSW5maW5pdHkpO1xuICAgIHRoaXMuZWFzaW5nID0gZWFzZS5nZXRFYXNpbmcoZWFzaW5nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBOb3JtYWxpemUgYSBmb3JjZSBieSAxOjEwMDtcbiAgICpcbiAgICogQG1ldGhvZCBub3JtYWxpemVGb3JjZVxuICAgKiBAbWVtYmVyb2YgUHJvdG9uLkJlaGF2aW91clxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtQcm90b24uVmVjdG9yMkR9IGZvcmNlXG4gICAqL1xuICBub3JtYWxpemVGb3JjZShmb3JjZSkge1xuICAgIHJldHVybiBmb3JjZS5tdWx0aXBseVNjYWxhcihQcm90b24uTUVBU1VSRSk7XG4gIH1cblxuICAvKipcbiAgICogTm9ybWFsaXplIGEgdmFsdWUgYnkgMToxMDA7XG4gICAqXG4gICAqIEBtZXRob2Qgbm9ybWFsaXplVmFsdWVcbiAgICogQG1lbWJlcm9mIFByb3Rvbi5CZWhhdmlvdXJcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB2YWx1ZVxuICAgKi9cbiAgbm9ybWFsaXplVmFsdWUodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgKiBQcm90b24uTUVBU1VSRTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIHRoZSBiZWhhdmlvdXIncyBwYXJhbWV0ZXJzIGZvciBhbGwgcGFydGljbGVzXG4gICAqXG4gICAqIEBtZXRob2QgaW5pdGlhbGl6ZVxuICAgKiBAbWVtYmVyb2YgUHJvdG9uLkJlaGF2aW91clxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtQcm90b24uUGFydGljbGV9IHBhcnRpY2xlXG4gICAqL1xuICBpbml0aWFsaXplKHBhcnRpY2xlKSB7fVxuXG4gIC8qKlxuICAgKiBBcHBseSB0aGlzIGJlaGF2aW91ciBmb3IgYWxsIHBhcnRpY2xlcyBldmVyeSB0aW1lXG4gICAqXG4gICAqIEBtZXRob2QgYXBwbHlCZWhhdmlvdXJcbiAgICogQG1lbWJlcm9mIFByb3Rvbi5CZWhhdmlvdXJcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLlBhcnRpY2xlfSBwYXJ0aWNsZVxuICAgKiBAcGFyYW0ge051bWJlcn0gXHRcdFx0dGltZSB0aGUgaW50ZWdyYXRlIHRpbWUgMS9tc1xuICAgKiBAcGFyYW0ge0ludH0gXHRcdFx0aW5kZXggdGhlIHBhcnRpY2xlIGluZGV4XG4gICAqL1xuICBjYWxjdWxhdGUocGFydGljbGUsIHRpbWUsIGluZGV4KSB7XG4gICAgdGhpcy5hZ2UgKz0gdGltZTtcblxuICAgIGlmICh0aGlzLmFnZSA+PSB0aGlzLmxpZmUgfHwgdGhpcy5kZWFkKSB7XG4gICAgICB0aGlzLmVuZXJneSA9IDA7XG4gICAgICB0aGlzLmRlYWQgPSB0cnVlO1xuICAgICAgdGhpcy5kZXN0cm95KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHNjYWxlID0gdGhpcy5lYXNpbmcocGFydGljbGUuYWdlIC8gcGFydGljbGUubGlmZSk7XG4gICAgICB0aGlzLmVuZXJneSA9IE1hdGgubWF4KDEgLSBzY2FsZSwgMCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERlc3RvcnkgdGhpcyBiZWhhdmlvdXJcbiAgICpcbiAgICogQG1ldGhvZCBkZXN0cm95XG4gICAqIEBtZW1iZXJvZiBQcm90b24uQmVoYXZpb3VyXG4gICAqIEBpbnN0YW5jZVxuICAgKi9cbiAgZGVzdHJveSgpIHtcbiAgICBsZXQgaSA9IHRoaXMucGFyZW50cy5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgdGhpcy5wYXJlbnRzW2ldLnJlbW92ZUJlaGF2aW91cih0aGlzKTtcbiAgICB9XG5cbiAgICB0aGlzLnBhcmVudHMubGVuZ3RoID0gMDtcbiAgfVxufVxuIiwiaW1wb3J0IFZlY3RvcjJEIGZyb20gXCIuLi9tYXRoL1ZlY3RvcjJEXCI7XG5pbXBvcnQgQmVoYXZpb3VyIGZyb20gXCIuL0JlaGF2aW91clwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGb3JjZSBleHRlbmRzIEJlaGF2aW91ciB7XG4gIC8qKlxuICAgKiBAbWVtYmVyb2YhIFByb3RvbiNcbiAgICogQGF1Z21lbnRzIFByb3Rvbi5CZWhhdmlvdXJcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBhbGlhcyBQcm90b24uRm9yY2VcbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGZ4XG4gICAqIEBwYXJhbSB7TnVtYmVyfSBmeVxuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpZmU9SW5maW5pdHldIFx0XHRcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2Vhc2luZz1lYXNlLmVhc2VMaW5lYXJdIFx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICpcbiAgICogQHByb3BlcnR5IHtTdHJpbmd9IG5hbWUgVGhlIEJlaGF2aW91ciBuYW1lXG4gICAqL1xuICBjb25zdHJ1Y3RvcihmeCwgZnksIGxpZmUsIGVhc2luZykge1xuICAgIHN1cGVyKGxpZmUsIGVhc2luZyk7XG5cbiAgICB0aGlzLmZvcmNlID0gdGhpcy5ub3JtYWxpemVGb3JjZShuZXcgVmVjdG9yMkQoZngsIGZ5KSk7XG4gICAgdGhpcy5uYW1lID0gXCJGb3JjZVwiO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoaXMgYmVoYXZpb3VyJ3MgcGFyYW1ldGVyc1xuICAgKlxuICAgKiBAbWV0aG9kIHJlc2V0XG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkZvcmNlXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gZnhcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGZ5XG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gXHRcdFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2UuZWFzZUxpbmVhcl0gXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKi9cbiAgcmVzZXQoZngsIGZ5LCBsaWZlLCBlYXNpbmcpIHtcbiAgICB0aGlzLmZvcmNlID0gdGhpcy5ub3JtYWxpemVGb3JjZShuZXcgVmVjdG9yMkQoZngsIGZ5KSk7XG5cbiAgICBsaWZlICYmIHN1cGVyLnJlc2V0KGxpZmUsIGVhc2luZyk7XG4gIH1cblxuICAvKipcbiAgICogQXBwbHkgdGhpcyBiZWhhdmlvdXIgZm9yIGFsbCBwYXJ0aWNsZXMgZXZlcnkgdGltZVxuICAgKlxuICAgKiBAbWV0aG9kIGFwcGx5QmVoYXZpb3VyXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkZvcmNlXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5QYXJ0aWNsZX0gcGFydGljbGVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHRoZSBpbnRlZ3JhdGUgdGltZSAxL21zXG4gICAqIEBwYXJhbSB7SW50fSB0aGUgcGFydGljbGUgaW5kZXhcbiAgICovXG4gIGFwcGx5QmVoYXZpb3VyKHBhcnRpY2xlLCB0aW1lLCBpbmRleCkge1xuICAgIHRoaXMuY2FsY3VsYXRlKHBhcnRpY2xlLCB0aW1lLCBpbmRleCk7XG4gICAgcGFydGljbGUuYS5hZGQodGhpcy5mb3JjZSk7XG4gIH1cbn1cbiIsImltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlscy9VdGlsXCI7XG5pbXBvcnQgVmVjdG9yMkQgZnJvbSBcIi4uL21hdGgvVmVjdG9yMkRcIjtcbmltcG9ydCBCZWhhdmlvdXIgZnJvbSBcIi4vQmVoYXZpb3VyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEF0dHJhY3Rpb24gZXh0ZW5kcyBCZWhhdmlvdXIge1xuICAvKipcbiAgICogVGhpcyBiZWhhdmlvdXIgbGV0IHRoZSBwYXJ0aWNsZXMgZm9sbG93IG9uZSBzcGVjaWZpYyBQcm90b24uVmVjdG9yMkRcbiAgICpcbiAgICogQG1lbWJlcm9mISBQcm90b24jXG4gICAqIEBhdWdtZW50cyBQcm90b24uQmVoYXZpb3VyXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAYWxpYXMgUHJvdG9uLkF0dHJhY3Rpb25cbiAgICpcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uIGZvciAnZm9yY2UnIGFuZCAncmFkaXVzJ1xuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5WZWN0b3IyRH0gdGFyZ2V0UG9zaXRpb24gdGhlIGF0dHJhY3Rpb24gcG9pbnQgY29vcmRpbmF0ZXNcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtmb3JjZT0xMDBdXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbcmFkaXVzPTEwMDBdXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gXHRcdFx0XHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZS5lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqXG4gICAqIEBwcm9wZXJ0eSB7UHJvdG9uLlZlY3RvcjJEfSB0YXJnZXRQb3NpdGlvblxuICAgKiBAcHJvcGVydHkge051bWJlcn0gcmFkaXVzXG4gICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBmb3JjZVxuICAgKiBAcHJvcGVydHkge051bWJlcn0gcmFkaXVzU3FcbiAgICogQHByb3BlcnR5IHtQcm90b24uVmVjdG9yMkR9IGF0dHJhY3Rpb25Gb3JjZVxuICAgKiBAcHJvcGVydHkge051bWJlcn0gbGVuZ3RoU3FcbiAgICogQHByb3BlcnR5IHtTdHJpbmd9IG5hbWUgVGhlIEJlaGF2aW91ciBuYW1lXG4gICAqL1xuICBjb25zdHJ1Y3Rvcih0YXJnZXRQb3NpdGlvbiwgZm9yY2UsIHJhZGl1cywgbGlmZSwgZWFzaW5nKSB7XG4gICAgc3VwZXIobGlmZSwgZWFzaW5nKTtcblxuICAgIHRoaXMudGFyZ2V0UG9zaXRpb24gPSBVdGlsLmluaXRWYWx1ZSh0YXJnZXRQb3NpdGlvbiwgbmV3IFZlY3RvcjJEKCkpO1xuICAgIHRoaXMucmFkaXVzID0gVXRpbC5pbml0VmFsdWUocmFkaXVzLCAxMDAwKTtcbiAgICB0aGlzLmZvcmNlID0gVXRpbC5pbml0VmFsdWUodGhpcy5ub3JtYWxpemVWYWx1ZShmb3JjZSksIDEwMCk7XG5cbiAgICB0aGlzLnJhZGl1c1NxID0gdGhpcy5yYWRpdXMgKiB0aGlzLnJhZGl1cztcbiAgICB0aGlzLmF0dHJhY3Rpb25Gb3JjZSA9IG5ldyBWZWN0b3IyRCgpO1xuICAgIHRoaXMubGVuZ3RoU3EgPSAwO1xuXG4gICAgdGhpcy5uYW1lID0gXCJBdHRyYWN0aW9uXCI7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgdGhpcyBiZWhhdmlvdXIncyBwYXJhbWV0ZXJzXG4gICAqXG4gICAqIEBtZXRob2QgcmVzZXRcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uQXR0cmFjdGlvblxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uIGZvciAnZm9yY2UnIGFuZCAncmFkaXVzJ1xuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5WZWN0b3IyRH0gdGFyZ2V0UG9zaXRpb24gdGhlIGF0dHJhY3Rpb24gcG9pbnQgY29vcmRpbmF0ZXNcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtmb3JjZT0xMDBdXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbcmFkaXVzPTEwMDBdXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gXHRcdFx0XHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZS5lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqL1xuICByZXNldCh0YXJnZXRQb3NpdGlvbiwgZm9yY2UsIHJhZGl1cywgbGlmZSwgZWFzaW5nKSB7XG4gICAgdGhpcy50YXJnZXRQb3NpdGlvbiA9IFV0aWwuaW5pdFZhbHVlKHRhcmdldFBvc2l0aW9uLCBuZXcgVmVjdG9yMkQoKSk7XG4gICAgdGhpcy5yYWRpdXMgPSBVdGlsLmluaXRWYWx1ZShyYWRpdXMsIDEwMDApO1xuICAgIHRoaXMuZm9yY2UgPSBVdGlsLmluaXRWYWx1ZSh0aGlzLm5vcm1hbGl6ZVZhbHVlKGZvcmNlKSwgMTAwKTtcblxuICAgIHRoaXMucmFkaXVzU3EgPSB0aGlzLnJhZGl1cyAqIHRoaXMucmFkaXVzO1xuICAgIHRoaXMuYXR0cmFjdGlvbkZvcmNlID0gbmV3IFZlY3RvcjJEKCk7XG4gICAgdGhpcy5sZW5ndGhTcSA9IDA7XG5cbiAgICBsaWZlICYmIHN1cGVyLnJlc2V0KGxpZmUsIGVhc2luZyk7XG4gIH1cblxuICAvKipcbiAgICogQXBwbHkgdGhpcyBiZWhhdmlvdXIgZm9yIGFsbCBwYXJ0aWNsZXMgZXZlcnkgdGltZVxuICAgKlxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5BdHRyYWN0aW9uXG4gICAqIEBtZXRob2QgYXBwbHlCZWhhdmlvdXJcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLlBhcnRpY2xlfSBwYXJ0aWNsZVxuICAgKiBAcGFyYW0ge051bWJlcn0gXHRcdFx0dGltZSB0aGUgaW50ZWdyYXRlIHRpbWUgMS9tc1xuICAgKiBAcGFyYW0ge0ludH0gXHRcdFx0aW5kZXggdGhlIHBhcnRpY2xlIGluZGV4XG4gICAqL1xuICBhcHBseUJlaGF2aW91cihwYXJ0aWNsZSwgdGltZSwgaW5kZXgpIHtcbiAgICB0aGlzLmNhbGN1bGF0ZShwYXJ0aWNsZSwgdGltZSwgaW5kZXgpO1xuXG4gICAgdGhpcy5hdHRyYWN0aW9uRm9yY2UuY29weSh0aGlzLnRhcmdldFBvc2l0aW9uKTtcbiAgICB0aGlzLmF0dHJhY3Rpb25Gb3JjZS5zdWIocGFydGljbGUucCk7XG4gICAgdGhpcy5sZW5ndGhTcSA9IHRoaXMuYXR0cmFjdGlvbkZvcmNlLmxlbmd0aFNxKCk7XG5cbiAgICBpZiAodGhpcy5sZW5ndGhTcSA+IDAuMDAwMDQgJiYgdGhpcy5sZW5ndGhTcSA8IHRoaXMucmFkaXVzU3EpIHtcbiAgICAgIHRoaXMuYXR0cmFjdGlvbkZvcmNlLm5vcm1hbGl6ZSgpO1xuICAgICAgdGhpcy5hdHRyYWN0aW9uRm9yY2UubXVsdGlwbHlTY2FsYXIoMSAtIHRoaXMubGVuZ3RoU3EgLyB0aGlzLnJhZGl1c1NxKTtcbiAgICAgIHRoaXMuYXR0cmFjdGlvbkZvcmNlLm11bHRpcGx5U2NhbGFyKHRoaXMuZm9yY2UpO1xuXG4gICAgICBwYXJ0aWNsZS5hLmFkZCh0aGlzLmF0dHJhY3Rpb25Gb3JjZSk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgVmVjdG9yMkQgZnJvbSBcIi4uL21hdGgvVmVjdG9yMkRcIjtcbmltcG9ydCBNYXRoVXRpbCBmcm9tIFwiLi4vbWF0aC9NYXRoVXRpbFwiO1xuaW1wb3J0IEJlaGF2aW91ciBmcm9tIFwiLi9CZWhhdmlvdXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmFuZG9tRHJpZnQgZXh0ZW5kcyBCZWhhdmlvdXIge1xuICAvKipcbiAgICogQG1lbWJlcm9mISBQcm90b24jXG4gICAqIEBhdWdtZW50cyBCZWhhdmlvdXJcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBhbGlhcyBSYW5kb21EcmlmdFxuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gZHJpZnRYIFx0XHRcdFx0WCB2YWx1ZSBvZiB0aGUgbmV3IFZlY3RvcjJEXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBkcmlmdFkgIFx0XHRcdFx0WSB2YWx1ZSBvZiB0aGUgbmV3IFZlY3RvcjJEXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBkZWxheSBcdFx0XHRcdEhvdyBtdWNoIGRlbGF5IHRoZSBkcmlmdCBzaG91bGQgaGF2ZVxuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpZmU9SW5maW5pdHldIFx0XHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZUxpbmVhcl0gXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKlxuICAgKiBAcHJvcGVydHkge051bWJlcn0gdGltZSBUaGUgdGltZSBvZiB0aGUgZHJpZnRcbiAgICogQHByb3BlcnR5IHtTdHJpbmd9IG5hbWUgVGhlIEJlaGF2aW91ciBuYW1lXG4gICAqL1xuICBjb25zdHJ1Y3RvcihkcmlmdFgsIGRyaWZ0WSwgZGVsYXksIGxpZmUsIGVhc2luZykge1xuICAgIHN1cGVyKGxpZmUsIGVhc2luZyk7XG5cbiAgICB0aGlzLnJlc2V0KGRyaWZ0WCwgZHJpZnRZLCBkZWxheSk7XG4gICAgdGhpcy50aW1lID0gMDtcbiAgICB0aGlzLm5hbWUgPSBcIlJhbmRvbURyaWZ0XCI7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgdGhpcyBiZWhhdmlvdXIncyBwYXJhbWV0ZXJzXG4gICAqXG4gICAqIEBtZXRob2QgcmVzZXRcbiAgICogQG1lbWJlcm9mIFByb3RvbiNSYW5kb21EcmlmdFxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGRyaWZ0WCBcdFx0XHRcdFggdmFsdWUgb2YgdGhlIG5ldyBWZWN0b3IyRFxuICAgKiBAcGFyYW0ge051bWJlcn0gZHJpZnRZICBcdFx0XHRcdFkgdmFsdWUgb2YgdGhlIG5ldyBWZWN0b3IyRFxuICAgKiBAcGFyYW0ge051bWJlcn0gZGVsYXkgXHRcdFx0XHRIb3cgbXVjaCBkZWxheSB0aGUgZHJpZnQgc2hvdWxkIGhhdmVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtsaWZlPUluZmluaXR5XSBcdFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2VMaW5lYXJdIFx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICovXG4gIHJlc2V0KGRyaWZ0WCwgZHJpZnRZLCBkZWxheSwgbGlmZSwgZWFzaW5nKSB7XG4gICAgdGhpcy5wYW5Gb2NlID0gbmV3IFZlY3RvcjJEKGRyaWZ0WCwgZHJpZnRZKTtcbiAgICB0aGlzLnBhbkZvY2UgPSB0aGlzLm5vcm1hbGl6ZUZvcmNlKHRoaXMucGFuRm9jZSk7XG4gICAgdGhpcy5kZWxheSA9IGRlbGF5O1xuXG4gICAgbGlmZSAmJiBzdXBlci5yZXNldChsaWZlLCBlYXNpbmcpO1xuICB9XG5cbiAgaW5pdGlhbGl6ZShwYXJ0aWNsZSkge1xuICAgIHBhcnRpY2xlLmRhdGEudGltZSA9IDA7XG4gIH1cblxuICAvKipcbiAgICogQXBwbHkgdGhpcyBiZWhhdmlvdXIgZm9yIGFsbCBwYXJ0aWNsZXMgZXZlcnkgdGltZVxuICAgKlxuICAgKiBAbWV0aG9kIGFwcGx5QmVoYXZpb3VyXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUmFuZG9tRHJpZnRcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7UGFydGljbGV9IHBhcnRpY2xlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBcdFx0XHR0aW1lIHRoZSBpbnRlZ3JhdGUgdGltZSAxL21zXG4gICAqIEBwYXJhbSB7SW50fSBcdFx0XHRpbmRleCB0aGUgcGFydGljbGUgaW5kZXhcbiAgICovXG4gIGFwcGx5QmVoYXZpb3VyKHBhcnRpY2xlLCB0aW1lLCBpbmRleCkge1xuICAgIHRoaXMuY2FsY3VsYXRlKHBhcnRpY2xlLCB0aW1lLCBpbmRleCk7XG4gICAgcGFydGljbGUuZGF0YS50aW1lICs9IHRpbWU7XG5cbiAgICBpZiAocGFydGljbGUuZGF0YS50aW1lID49IHRoaXMuZGVsYXkpIHtcbiAgICAgIHBhcnRpY2xlLmEuYWRkWFkoXG4gICAgICAgIE1hdGhVdGlsLnJhbmRvbUFUb0IoLXRoaXMucGFuRm9jZS54LCB0aGlzLnBhbkZvY2UueCksXG4gICAgICAgIE1hdGhVdGlsLnJhbmRvbUFUb0IoLXRoaXMucGFuRm9jZS55LCB0aGlzLnBhbkZvY2UueSlcbiAgICAgICk7XG5cbiAgICAgIHBhcnRpY2xlLmRhdGEudGltZSA9IDA7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgRm9yY2UgZnJvbSBcIi4vRm9yY2VcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3Jhdml0eSBleHRlbmRzIEZvcmNlIHtcbiAgLyoqXG4gICAqIEBtZW1iZXJvZiEgUHJvdG9uI1xuICAgKiBAYXVnbWVudHMgUHJvdG9uI1Byb3Rvbi5Gb3JjZVxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQGFsaWFzIFByb3Rvbi5HcmF2aXR5XG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBnIFx0XHRcdFx0XHRcdFx0R3Jhdml0eVxuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpZmU9SW5maW5pdHldIFx0XHRcdFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2UuZWFzZUxpbmVhcl0gXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKlxuICAgKiBAcHJvcGVydHkge1N0cmluZ30gbmFtZSBUaGUgQmVoYXZpb3VyIG5hbWVcbiAgICovXG4gIGNvbnN0cnVjdG9yKGcsIGxpZmUsIGVhc2luZykge1xuICAgIHN1cGVyKDAsIGcsIGxpZmUsIGVhc2luZyk7XG4gICAgdGhpcy5uYW1lID0gXCJHcmF2aXR5XCI7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgdGhpcyBiZWhhdmlvdXIncyBwYXJhbWV0ZXJzXG4gICAqXG4gICAqIEBtZXRob2QgcmVzZXRcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uR3Jhdml0eVxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGcgXHRcdFx0XHRcdFx0XHRHcmF2aXR5XG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gXHRcdFx0XHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZS5lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqL1xuICByZXNldChnLCBsaWZlLCBlYXNpbmcpIHtcbiAgICBzdXBlci5yZXNldCgwLCBnLCBsaWZlLCBlYXNpbmcpO1xuICB9XG59XG4iLCJpbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IFZlY3RvcjJEIGZyb20gXCIuLi9tYXRoL1ZlY3RvcjJEXCI7XG5pbXBvcnQgQmVoYXZpb3VyIGZyb20gXCIuL0JlaGF2aW91clwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb2xsaXNpb24gZXh0ZW5kcyBCZWhhdmlvdXIge1xuICAvKipcbiAgICogVGhlIGNhbGxiYWNrIGFmdGVyIGNvbGxpc2lvblxuICAgKlxuICAgKiBAY2FsbGJhY2sgQ2FsbGJhY2tcbiAgICpcbiAgICogQHBhcmFtIHtQcm90b24uUGFydGljbGV9IHBhcnRpY2xlXG4gICAqIEBwYXJhbSB7UHJvdG9uLlBhcml0Y2xlfSBvdGhlclBhcnRpY2xlXG4gICAqL1xuICAvKipcbiAgICogQG1lbWJlcm9mISBQcm90b24jXG4gICAqIEBhdWdtZW50cyBQcm90b24uQmVoYXZpb3VyXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAYWxpYXMgUHJvdG9uLkNvbGxpc2lvblxuICAgKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb24gdG8gbWFzc1xuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5FbWl0dGVyfSBcdFtlbWl0dGVyPW51bGxdIFx0XHR0aGUgYXR0cmFjdGlvbiBwb2ludCBjb29yZGluYXRlc1xuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFx0XHRbbWFzcz10cnVlXVxuICAgKiBAcGFyYW0ge0NhbGxiYWNrfVx0IFx0W2NhbGxiYWNrPW51bGxdXHRcdHRoZSBjYWxsYmFjayBhZnRlciB0aGUgY29sbGlzaW9uXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gXHRcdFx0XHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZS5lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqXG4gICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBuYW1lIFRoZSBCZWhhdmlvdXIgbmFtZVxuICAgKi9cbiAgY29uc3RydWN0b3IoZW1pdHRlciwgbWFzcywgY2FsbGJhY2ssIGxpZmUsIGVhc2luZykge1xuICAgIHN1cGVyKGxpZmUsIGVhc2luZyk7XG5cbiAgICB0aGlzLnJlc2V0KGVtaXR0ZXIsIG1hc3MsIGNhbGxiYWNrKTtcbiAgICB0aGlzLm5hbWUgPSBcIkNvbGxpc2lvblwiO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoaXMgYmVoYXZpb3VyJ3MgcGFyYW1ldGVyc1xuICAgKlxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5Db2xsaXNpb25cbiAgICogQG1ldGhvZCByZXNldFxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uIHRvIG1hc3NcbiAgICpcbiAgICogQHBhcmFtIHtQcm90b24uRW1pdHRlcn0gXHRbZW1pdHRlcj1udWxsXSBcdFx0dGhlIGF0dHJhY3Rpb24gcG9pbnQgY29vcmRpbmF0ZXNcbiAgICogQHBhcmFtIHtCb29sZWFufSBcdFx0W21hc3M9dHJ1ZV1cbiAgICogQHBhcmFtIHtDYWxsYmFja31cdCBcdFtjYWxsYmFjaz1udWxsXVx0XHR0aGUgY2FsbGJhY2sgYWZ0ZXIgdGhlIGNvbGxpc2lvblxuICAgKiBAcGFyYW0ge051bWJlcn0gXHRcdFx0W2xpZmU9SW5maW5pdHldIFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2UuZWFzZUxpbmVhcl0gXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKi9cbiAgcmVzZXQoZW1pdHRlciwgbWFzcywgY2FsbGJhY2ssIGxpZmUsIGVhc2luZykge1xuICAgIHRoaXMuZW1pdHRlciA9IFV0aWwuaW5pdFZhbHVlKGVtaXR0ZXIsIG51bGwpO1xuICAgIHRoaXMubWFzcyA9IFV0aWwuaW5pdFZhbHVlKG1hc3MsIHRydWUpO1xuICAgIHRoaXMuY2FsbGJhY2sgPSBVdGlsLmluaXRWYWx1ZShjYWxsYmFjaywgbnVsbCk7XG5cbiAgICB0aGlzLmNvbGxpc2lvblBvb2wgPSBbXTtcbiAgICB0aGlzLmRlbHRhID0gbmV3IFZlY3RvcjJEKCk7XG5cbiAgICBsaWZlICYmIHN1cGVyLnJlc2V0KGxpZmUsIGVhc2luZyk7XG4gIH1cblxuICAvKipcbiAgICogQXBwbHkgdGhpcyBiZWhhdmlvdXIgZm9yIGFsbCBwYXJ0aWNsZXMgZXZlcnkgdGltZVxuICAgKlxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5Db2xsaXNpb25cbiAgICogQG1ldGhvZCBhcHBseUJlaGF2aW91clxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtQcm90b24uUGFydGljbGV9IHBhcnRpY2xlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBcdFx0XHR0aW1lIHRoZSBpbnRlZ3JhdGUgdGltZSAxL21zXG4gICAqIEBwYXJhbSB7SW50fSBcdFx0XHRpbmRleCB0aGUgcGFydGljbGUgaW5kZXhcbiAgICovXG4gIGFwcGx5QmVoYXZpb3VyKHBhcnRpY2xlLCB0aW1lLCBpbmRleCkge1xuICAgIGNvbnN0IG5ld1Bvb2wgPSB0aGlzLmVtaXR0ZXIgPyB0aGlzLmVtaXR0ZXIucGFydGljbGVzLnNsaWNlKGluZGV4KSA6IHRoaXMucG9vbC5zbGljZShpbmRleCk7XG4gICAgY29uc3QgbGVuZ3RoID0gbmV3UG9vbC5sZW5ndGg7XG5cbiAgICBsZXQgb3RoZXJQYXJ0aWNsZTtcbiAgICBsZXQgbGVuZ3RoU3E7XG4gICAgbGV0IG92ZXJsYXA7XG4gICAgbGV0IHRvdGFsTWFzcztcbiAgICBsZXQgYXZlcmFnZU1hc3MxLCBhdmVyYWdlTWFzczI7XG4gICAgbGV0IGk7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIG90aGVyUGFydGljbGUgPSBuZXdQb29sW2ldO1xuXG4gICAgICBpZiAob3RoZXJQYXJ0aWNsZSAhPT0gcGFydGljbGUpIHtcbiAgICAgICAgdGhpcy5kZWx0YS5jb3B5KG90aGVyUGFydGljbGUucCk7XG4gICAgICAgIHRoaXMuZGVsdGEuc3ViKHBhcnRpY2xlLnApO1xuXG4gICAgICAgIGxlbmd0aFNxID0gdGhpcy5kZWx0YS5sZW5ndGhTcSgpO1xuICAgICAgICBjb25zdCBkaXN0YW5jZSA9IHBhcnRpY2xlLnJhZGl1cyArIG90aGVyUGFydGljbGUucmFkaXVzO1xuXG4gICAgICAgIGlmIChsZW5ndGhTcSA8PSBkaXN0YW5jZSAqIGRpc3RhbmNlKSB7XG4gICAgICAgICAgb3ZlcmxhcCA9IGRpc3RhbmNlIC0gTWF0aC5zcXJ0KGxlbmd0aFNxKTtcbiAgICAgICAgICBvdmVybGFwICs9IDAuNTtcblxuICAgICAgICAgIHRvdGFsTWFzcyA9IHBhcnRpY2xlLm1hc3MgKyBvdGhlclBhcnRpY2xlLm1hc3M7XG4gICAgICAgICAgYXZlcmFnZU1hc3MxID0gdGhpcy5tYXNzID8gb3RoZXJQYXJ0aWNsZS5tYXNzIC8gdG90YWxNYXNzIDogMC41O1xuICAgICAgICAgIGF2ZXJhZ2VNYXNzMiA9IHRoaXMubWFzcyA/IHBhcnRpY2xlLm1hc3MgLyB0b3RhbE1hc3MgOiAwLjU7XG5cbiAgICAgICAgICBwYXJ0aWNsZS5wLmFkZChcbiAgICAgICAgICAgIHRoaXMuZGVsdGFcbiAgICAgICAgICAgICAgLmNsb25lKClcbiAgICAgICAgICAgICAgLm5vcm1hbGl6ZSgpXG4gICAgICAgICAgICAgIC5tdWx0aXBseVNjYWxhcihvdmVybGFwICogLWF2ZXJhZ2VNYXNzMSlcbiAgICAgICAgICApO1xuICAgICAgICAgIG90aGVyUGFydGljbGUucC5hZGQodGhpcy5kZWx0YS5ub3JtYWxpemUoKS5tdWx0aXBseVNjYWxhcihvdmVybGFwICogYXZlcmFnZU1hc3MyKSk7XG5cbiAgICAgICAgICB0aGlzLmNhbGxiYWNrICYmIHRoaXMuY2FsbGJhY2socGFydGljbGUsIG90aGVyUGFydGljbGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IEJlaGF2aW91ciBmcm9tIFwiLi9CZWhhdmlvdXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ3Jvc3Nab25lIGV4dGVuZHMgQmVoYXZpb3VyIHtcbiAgLyoqXG4gICAqIERlZmluZXMgd2hhdCBoYXBwZW5zIGlmIHRoZSBwYXJ0aWNsZXMgY29tZSB0byB0aGUgZW5kIG9mIHRoZSBzcGVjaWZpZWQgem9uZVxuICAgKlxuICAgKiBAbWVtYmVyb2YhIFByb3RvbiNcbiAgICogQGF1Z21lbnRzIFByb3Rvbi5CZWhhdmlvdXJcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBhbGlhcyBQcm90b24uQ3Jvc3Nab25lXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLlpvbmV9IHpvbmUgXHRcdFx0XHRcdFx0Y2FuIGJlIGFueSBQcm90b24uWm9uZSAtIGUuZy4gUHJvdG9uLlJlY3Rab25lKClcbiAgICogQHBhcmFtIHtTdHJpbmd9IFx0XHRbY3Jvc3NUeXBlPWRlYWRdIFx0XHRcdHdoYXQgaGFwcGVucyBpZiB0aGUgcGFydGljbGVzIHBhc3MgdGhlIHpvbmUgLSBhbGxvd2VkIHN0cmluZ3M6IGRlYWQgfCBib3VuZCB8IGNyb3NzXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBcdFx0W2xpZmU9SW5maW5pdHldIFx0XHRcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gXHRcdFtlYXNpbmc9ZWFzZS5lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqXG4gICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBuYW1lIFRoZSBCZWhhdmlvdXIgbmFtZVxuICAgKi9cbiAgY29uc3RydWN0b3Ioem9uZSwgY3Jvc3NUeXBlLCBsaWZlLCBlYXNpbmcpIHtcbiAgICBzdXBlcihsaWZlLCBlYXNpbmcpO1xuXG4gICAgdGhpcy5yZXNldCh6b25lLCBjcm9zc1R5cGUpO1xuICAgIHRoaXMubmFtZSA9IFwiQ3Jvc3Nab25lXCI7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgdGhpcyBiZWhhdmlvdXIncyBwYXJhbWV0ZXJzXG4gICAqXG4gICAqIEBtZXRob2QgcmVzZXRcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uQ3Jvc3Nab25lXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5ab25lfSB6b25lIFx0XHRcdFx0Y2FuIGJlIGFueSBQcm90b24uWm9uZSAtIGUuZy4gUHJvdG9uLlJlY3Rab25lKClcbiAgICogQHBhcmFtIHtTdHJpbmd9IFx0XHRbY3Jvc3NUeXBlPWRlYWRdIFx0d2hhdCBoYXBwZW5zIGlmIHRoZSBwYXJ0aWNsZXMgcGFzcyB0aGUgem9uZSAtIGFsbG93ZWQgc3RyaW5nczogZGVhZCB8IGJvdW5kIHwgY3Jvc3NcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFx0XHRbbGlmZT1JbmZpbml0eV0gXHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFx0XHRbZWFzaW5nPWVhc2VMaW5lYXJdXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKi9cbiAgcmVzZXQoem9uZSwgY3Jvc3NUeXBlLCBsaWZlLCBlYXNpbmcpIHtcbiAgICB0aGlzLnpvbmUgPSB6b25lO1xuICAgIHRoaXMuem9uZS5jcm9zc1R5cGUgPSBVdGlsLmluaXRWYWx1ZShjcm9zc1R5cGUsIFwiZGVhZFwiKTtcblxuICAgIGxpZmUgJiYgc3VwZXIucmVzZXQobGlmZSwgZWFzaW5nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBseSB0aGlzIGJlaGF2aW91ciBmb3IgYWxsIHBhcnRpY2xlcyBldmVyeSB0aW1lXG4gICAqXG4gICAqIEBtZXRob2QgYXBwbHlCZWhhdmlvdXJcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uQ3Jvc3Nab25lXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5QYXJ0aWNsZX0gcGFydGljbGVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHRoZSBpbnRlZ3JhdGUgdGltZSAxL21zXG4gICAqIEBwYXJhbSB7SW50fSB0aGUgcGFydGljbGUgaW5kZXhcbiAgICovXG4gIGFwcGx5QmVoYXZpb3VyKHBhcnRpY2xlLCB0aW1lLCBpbmRleCkge1xuICAgIHRoaXMuY2FsY3VsYXRlKHBhcnRpY2xlLCB0aW1lLCBpbmRleCk7XG4gICAgdGhpcy56b25lLmNyb3NzaW5nKHBhcnRpY2xlKTtcbiAgfVxufVxuIiwiaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcbmltcG9ydCBTcGFuIGZyb20gXCIuLi9tYXRoL1NwYW5cIjtcbmltcG9ydCBCZWhhdmlvdXIgZnJvbSBcIi4vQmVoYXZpb3VyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFscGhhIGV4dGVuZHMgQmVoYXZpb3VyIHtcbiAgLyoqXG4gICAqIEBtZW1iZXJvZiEgUHJvdG9uI1xuICAgKiBAYXVnbWVudHMgUHJvdG9uLkJlaGF2aW91clxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQGFsaWFzIFByb3Rvbi5BbHBoYVxuICAgKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb24gZm9yICdhJyBhbmQgJ2InXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBhXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBiXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gXHRcdFx0XHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZS5lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqXG4gICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBuYW1lIFRoZSBCZWhhdmlvdXIgbmFtZVxuICAgKi9cbiAgY29uc3RydWN0b3IoYSwgYiwgbGlmZSwgZWFzaW5nKSB7XG4gICAgc3VwZXIobGlmZSwgZWFzaW5nKTtcblxuICAgIHRoaXMucmVzZXQoYSwgYik7XG4gICAgdGhpcy5uYW1lID0gXCJBbHBoYVwiO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoaXMgYmVoYXZpb3VyJ3MgcGFyYW1ldGVyc1xuICAgKlxuICAgKiBAbWV0aG9kIHJlc2V0XG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkFscGhhXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb24gZm9yICdhJyBhbmQgJ2InXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBhXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBiXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gXHRcdFx0XHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZS5lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqL1xuICByZXNldChhLCBiLCBsaWZlLCBlYXNpbmcpIHtcbiAgICB0aGlzLnNhbWUgPSBiID09PSBudWxsIHx8IGIgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBmYWxzZTtcbiAgICB0aGlzLmEgPSBTcGFuLnNldFNwYW5WYWx1ZShVdGlsLmluaXRWYWx1ZShhLCAxKSk7XG4gICAgdGhpcy5iID0gU3Bhbi5zZXRTcGFuVmFsdWUoYik7XG5cbiAgICBsaWZlICYmIHN1cGVyLnJlc2V0KGxpZmUsIGVhc2luZyk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgbmV3IGFscGhhIHZhbHVlIG9mIHRoZSBwYXJ0aWNsZVxuICAgKlxuICAgKiBAbWV0aG9kIGluaXRpYWxpemVcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uQWxwaGFcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLlBhcnRpY2xlfSBwYXJ0aWNsZSBBIHNpbmdsZSBQcm90b24gZ2VuZXJhdGVkIHBhcnRpY2xlXG4gICAqL1xuICBpbml0aWFsaXplKHBhcnRpY2xlKSB7XG4gICAgcGFydGljbGUuZGF0YS5hbHBoYUEgPSB0aGlzLmEuZ2V0VmFsdWUoKTtcblxuICAgIGlmICh0aGlzLnNhbWUpIHBhcnRpY2xlLmRhdGEuYWxwaGFCID0gcGFydGljbGUuZGF0YS5hbHBoYUE7XG4gICAgZWxzZSBwYXJ0aWNsZS5kYXRhLmFscGhhQiA9IHRoaXMuYi5nZXRWYWx1ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgYXBwbHlCZWhhdmlvdXJcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uQWxwaGFcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLlBhcnRpY2xlfSBwYXJ0aWNsZVxuICAgKiBAcGFyYW0ge051bWJlcn0gXHRcdFx0dGltZSB0aGUgaW50ZWdyYXRlIHRpbWUgMS9tc1xuICAgKiBAcGFyYW0ge0ludH0gXHRcdFx0aW5kZXggdGhlIHBhcnRpY2xlIGluZGV4XG4gICAqL1xuICBhcHBseUJlaGF2aW91cihwYXJ0aWNsZSwgdGltZSwgaW5kZXgpIHtcbiAgICB0aGlzLmNhbGN1bGF0ZShwYXJ0aWNsZSwgdGltZSwgaW5kZXgpO1xuXG4gICAgcGFydGljbGUuYWxwaGEgPSBwYXJ0aWNsZS5kYXRhLmFscGhhQiArIChwYXJ0aWNsZS5kYXRhLmFscGhhQSAtIHBhcnRpY2xlLmRhdGEuYWxwaGFCKSAqIHRoaXMuZW5lcmd5O1xuXG4gICAgaWYgKHBhcnRpY2xlLmFscGhhIDwgMC4wMDEpIHBhcnRpY2xlLmFscGhhID0gMDtcbiAgfVxufVxuIiwiaW1wb3J0IFNwYW4gZnJvbSBcIi4uL21hdGgvU3BhblwiO1xuaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcbmltcG9ydCBCZWhhdmlvdXIgZnJvbSBcIi4vQmVoYXZpb3VyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjYWxlIGV4dGVuZHMgQmVoYXZpb3VyIHtcbiAgLyoqXG4gICAqIEBtZW1iZXJvZiEgUHJvdG9uI1xuICAgKiBAYXVnbWVudHMgUHJvdG9uLkJlaGF2aW91clxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQGFsaWFzIFByb3Rvbi5TY2FsZVxuICAgKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb24gZm9yICdhJyBhbmQgJ2InXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBhXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBiXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gXHRcdFx0XHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZS5lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqXG4gICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBuYW1lIFRoZSBCZWhhdmlvdXIgbmFtZVxuICAgKi9cbiAgY29uc3RydWN0b3IoYSwgYiwgbGlmZSwgZWFzaW5nKSB7XG4gICAgc3VwZXIobGlmZSwgZWFzaW5nKTtcblxuICAgIHRoaXMucmVzZXQoYSwgYik7XG4gICAgdGhpcy5uYW1lID0gXCJTY2FsZVwiO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoaXMgYmVoYXZpb3VyJ3MgcGFyYW1ldGVyc1xuICAgKlxuICAgKiBAbWV0aG9kIHJlc2V0XG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlNjYWxlXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gYVxuICAgKiBAcGFyYW0ge1N0cmluZ30gYlxuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpZmU9SW5maW5pdHldIFx0XHRcdFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2UuZWFzZUxpbmVhcl0gXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKi9cbiAgcmVzZXQoYSwgYiwgbGlmZSwgZWFzaW5nKSB7XG4gICAgdGhpcy5zYW1lID0gYiA9PT0gbnVsbCB8fCBiID09PSB1bmRlZmluZWQgPyB0cnVlIDogZmFsc2U7XG4gICAgdGhpcy5hID0gU3Bhbi5zZXRTcGFuVmFsdWUoVXRpbC5pbml0VmFsdWUoYSwgMSkpO1xuICAgIHRoaXMuYiA9IFNwYW4uc2V0U3BhblZhbHVlKGIpO1xuXG4gICAgbGlmZSAmJiBzdXBlci5yZXNldChsaWZlLCBlYXNpbmcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemUgdGhlIGJlaGF2aW91cidzIHBhcmFtZXRlcnMgZm9yIGFsbCBwYXJ0aWNsZXNcbiAgICpcbiAgICogQG1ldGhvZCBpbml0aWFsaXplXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlNjYWxlXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5QYXJ0aWNsZX0gcGFydGljbGVcbiAgICovXG4gIGluaXRpYWxpemUocGFydGljbGUpIHtcbiAgICBwYXJ0aWNsZS5kYXRhLnNjYWxlQSA9IHRoaXMuYS5nZXRWYWx1ZSgpO1xuICAgIHBhcnRpY2xlLmRhdGEub2xkUmFkaXVzID0gcGFydGljbGUucmFkaXVzO1xuICAgIHBhcnRpY2xlLmRhdGEuc2NhbGVCID0gdGhpcy5zYW1lID8gcGFydGljbGUuZGF0YS5zY2FsZUEgOiB0aGlzLmIuZ2V0VmFsdWUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBseSB0aGlzIGJlaGF2aW91ciBmb3IgYWxsIHBhcnRpY2xlcyBldmVyeSB0aW1lXG4gICAqXG4gICAqIEBtZXRob2QgYXBwbHlCZWhhdmlvdXJcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uU2NhbGVcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLlBhcnRpY2xlfSBwYXJ0aWNsZVxuICAgKiBAcGFyYW0ge051bWJlcn0gXHRcdFx0dGltZSB0aGUgaW50ZWdyYXRlIHRpbWUgMS9tc1xuICAgKiBAcGFyYW0ge0ludH0gXHRcdFx0aW5kZXggdGhlIHBhcnRpY2xlIGluZGV4XG4gICAqL1xuICBhcHBseUJlaGF2aW91cihwYXJ0aWNsZSwgdGltZSwgaW5kZXgpIHtcbiAgICB0aGlzLmNhbGN1bGF0ZShwYXJ0aWNsZSwgdGltZSwgaW5kZXgpO1xuICAgIHBhcnRpY2xlLnNjYWxlID0gcGFydGljbGUuZGF0YS5zY2FsZUIgKyAocGFydGljbGUuZGF0YS5zY2FsZUEgLSBwYXJ0aWNsZS5kYXRhLnNjYWxlQikgKiB0aGlzLmVuZXJneTtcblxuICAgIGlmIChwYXJ0aWNsZS5zY2FsZSA8IDAuMDAwMSkgcGFydGljbGUuc2NhbGUgPSAwO1xuICAgIHBhcnRpY2xlLnJhZGl1cyA9IHBhcnRpY2xlLmRhdGEub2xkUmFkaXVzICogcGFydGljbGUuc2NhbGU7XG4gIH1cbn1cbiIsImltcG9ydCBTcGFuIGZyb20gXCIuLi9tYXRoL1NwYW5cIjtcbmltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlscy9VdGlsXCI7XG5pbXBvcnQgQmVoYXZpb3VyIGZyb20gXCIuL0JlaGF2aW91clwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb3RhdGUgZXh0ZW5kcyBCZWhhdmlvdXIge1xuICAvKipcbiAgICogQG1lbWJlcm9mISBQcm90b24jXG4gICAqIEBhdWdtZW50cyBQcm90b24uQmVoYXZpb3VyXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAYWxpYXMgUHJvdG9uLlJvdGF0ZVxuICAgKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb24gZm9yICdhJywgJ2InIGFuZCAnc3R5bGUnXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbaW5mbHVlbmNlPVZlbG9jaXR5XSBUaGUgcm90YXRpb24ncyBpbmZsdWVuY2VcbiAgICogQHBhcmFtIHtTdHJpbmd9IGJcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtzdHlsZT10b11cbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtsaWZlPUluZmluaXR5XSBcdFx0XHRcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2Vhc2luZz1lYXNlLmVhc2VMaW5lYXJdIFx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICpcbiAgICogQHByb3BlcnR5IHtTdHJpbmd9IG5hbWUgVGhlIEJlaGF2aW91ciBuYW1lXG4gICAqL1xuICBjb25zdHJ1Y3RvcihpbmZsdWVuY2UsIGIsIHN0eWxlLCBsaWZlLCBlYXNpbmcpIHtcbiAgICBzdXBlcihsaWZlLCBlYXNpbmcpO1xuXG4gICAgdGhpcy5yZXNldChpbmZsdWVuY2UsIGIsIHN0eWxlKTtcbiAgICB0aGlzLm5hbWUgPSBcIlJvdGF0ZVwiO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoaXMgYmVoYXZpb3VyJ3MgcGFyYW1ldGVyc1xuICAgKlxuICAgKiBAbWV0aG9kIHJlc2V0XG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLlJvdGF0ZVxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHRvZG8gYWRkIGRlc2NyaXB0aW9uIGZvciAnYScsICdiJyBhbmQgJ3N0eWxlJ1xuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gYVxuICAgKiBAcGFyYW0ge1N0cmluZ30gYlxuICAgKiBAcGFyYW0ge1N0cmluZ30gW3N0eWxlPXRvXVxuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpZmU9SW5maW5pdHldIFx0XHRcdFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2UuZWFzZUxpbmVhcl0gXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKi9cbiAgcmVzZXQoYSwgYiwgc3R5bGUsIGxpZmUsIGVhc2luZykge1xuICAgIHRoaXMuc2FtZSA9IGIgPT09IG51bGwgfHwgYiA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IGZhbHNlO1xuXG4gICAgdGhpcy5hID0gU3Bhbi5zZXRTcGFuVmFsdWUoVXRpbC5pbml0VmFsdWUoYSwgXCJWZWxvY2l0eVwiKSk7XG4gICAgdGhpcy5iID0gU3Bhbi5zZXRTcGFuVmFsdWUoVXRpbC5pbml0VmFsdWUoYiwgMCkpO1xuICAgIHRoaXMuc3R5bGUgPSBVdGlsLmluaXRWYWx1ZShzdHlsZSwgXCJ0b1wiKTtcblxuICAgIGxpZmUgJiYgc3VwZXIucmVzZXQobGlmZSwgZWFzaW5nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIHRoZSBiZWhhdmlvdXIncyBwYXJhbWV0ZXJzIGZvciBhbGwgcGFydGljbGVzXG4gICAqXG4gICAqIEBtZXRob2QgaW5pdGlhbGl6ZVxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5Sb3RhdGVcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLlBhcnRpY2xlfSBwYXJ0aWNsZVxuICAgKi9cbiAgaW5pdGlhbGl6ZShwYXJ0aWNsZSkge1xuICAgIHBhcnRpY2xlLnJvdGF0aW9uID0gdGhpcy5hLmdldFZhbHVlKCk7XG4gICAgcGFydGljbGUuZGF0YS5yb3RhdGlvbkEgPSB0aGlzLmEuZ2V0VmFsdWUoKTtcblxuICAgIGlmICghdGhpcy5zYW1lKSBwYXJ0aWNsZS5kYXRhLnJvdGF0aW9uQiA9IHRoaXMuYi5nZXRWYWx1ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFwcGx5IHRoaXMgYmVoYXZpb3VyIGZvciBhbGwgcGFydGljbGVzIGV2ZXJ5IHRpbWVcbiAgICpcbiAgICogQG1ldGhvZCBhcHBseUJlaGF2aW91clxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5Sb3RhdGVcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLlBhcnRpY2xlfSBwYXJ0aWNsZVxuICAgKiBAcGFyYW0ge051bWJlcn0gXHRcdFx0dGltZSB0aGUgaW50ZWdyYXRlIHRpbWUgMS9tc1xuICAgKiBAcGFyYW0ge0ludH0gXHRcdFx0aW5kZXggdGhlIHBhcnRpY2xlIGluZGV4XG4gICAqL1xuICBhcHBseUJlaGF2aW91cihwYXJ0aWNsZSwgdGltZSwgaW5kZXgpIHtcbiAgICB0aGlzLmNhbGN1bGF0ZShwYXJ0aWNsZSwgdGltZSwgaW5kZXgpO1xuXG4gICAgaWYgKCF0aGlzLnNhbWUpIHtcbiAgICAgIGlmICh0aGlzLnN0eWxlID09PSBcInRvXCIgfHwgdGhpcy5zdHlsZSA9PT0gXCJUT1wiIHx8IHRoaXMuc3R5bGUgPT09IFwiX1wiKSB7XG4gICAgICAgIHBhcnRpY2xlLnJvdGF0aW9uICs9XG4gICAgICAgICAgcGFydGljbGUuZGF0YS5yb3RhdGlvbkIgKyAocGFydGljbGUuZGF0YS5yb3RhdGlvbkEgLSBwYXJ0aWNsZS5kYXRhLnJvdGF0aW9uQikgKiB0aGlzLmVuZXJneTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhcnRpY2xlLnJvdGF0aW9uICs9IHBhcnRpY2xlLmRhdGEucm90YXRpb25CO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy5hLmEgPT09IFwiVlwiIHx8IHRoaXMuYS5hID09PSBcIlZlbG9jaXR5XCIgfHwgdGhpcy5hLmEgPT09IFwidlwiKSB7XG4gICAgICAvLyBiZXRhLi4uXG4gICAgICBwYXJ0aWNsZS5yb3RhdGlvbiA9IHBhcnRpY2xlLmdldERpcmVjdGlvbigpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IENvbG9yVXRpbCBmcm9tIFwiLi4vdXRpbHMvQ29sb3JVdGlsXCI7XG5pbXBvcnQgQXJyYXlTcGFuIGZyb20gXCIuLi9tYXRoL0FycmF5U3BhblwiO1xuaW1wb3J0IEJlaGF2aW91ciBmcm9tIFwiLi9CZWhhdmlvdXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29sb3IgZXh0ZW5kcyBCZWhhdmlvdXIge1xuICAvKipcbiAgICogQG1lbWJlcm9mISBQcm90b24jXG4gICAqIEBhdWdtZW50cyBQcm90b24uQmVoYXZpb3VyXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAYWxpYXMgUHJvdG9uLkNvbG9yXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLkFycmF5U3BhbiB8IFN0cmluZ30gYSB0aGUgc3RyaW5nIHNob3VsZCBiZSBhIGhleCBlLmcuICMwMDAwMDAgZm9yIGJsYWNrXG4gICAqIEBwYXJhbSB7UHJvdG9uLkFycmF5U3BhbiB8IFN0cmluZ30gYiB0aGUgc3RyaW5nIHNob3VsZCBiZSBhIGhleCBlLmcuICMwMDAwMDAgZm9yIGJsYWNrXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gXHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZUxpbmVhcl0gXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKlxuICAgKiBAcHJvcGVydHkge1N0cmluZ30gbmFtZSBUaGUgQmVoYXZpb3VyIG5hbWVcbiAgICovXG4gIGNvbnN0cnVjdG9yKGEsIGIsIGxpZmUsIGVhc2luZykge1xuICAgIHN1cGVyKGxpZmUsIGVhc2luZyk7XG5cbiAgICB0aGlzLnJlc2V0KGEsIGIpO1xuICAgIHRoaXMubmFtZSA9IFwiQ29sb3JcIjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCB0aGlzIGJlaGF2aW91cidzIHBhcmFtZXRlcnNcbiAgICpcbiAgICogQG1ldGhvZCByZXNldFxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI1Byb3Rvbi5Db2xvclxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtQcm90b24uQXJyYXlTcGFuIHwgU3RyaW5nfSBhIHRoZSBzdHJpbmcgc2hvdWxkIGJlIGEgaGV4IGUuZy4gIzAwMDAwMCBmb3IgYmxhY2tcbiAgICogQHBhcmFtIHtQcm90b24uQXJyYXlTcGFuIHwgU3RyaW5nfSBiIHRoZSBzdHJpbmcgc2hvdWxkIGJlIGEgaGV4IGUuZy4gIzAwMDAwMCBmb3IgYmxhY2tcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtsaWZlPUluZmluaXR5XSBcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2Vhc2luZz1lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqL1xuICByZXNldChhLCBiLCBsaWZlLCBlYXNpbmcpIHtcbiAgICB0aGlzLmEgPSBBcnJheVNwYW4uY3JlYXRlQXJyYXlTcGFuKGEpO1xuICAgIHRoaXMuYiA9IEFycmF5U3Bhbi5jcmVhdGVBcnJheVNwYW4oYik7XG4gICAgbGlmZSAmJiBzdXBlci5yZXNldChsaWZlLCBlYXNpbmcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemUgdGhlIGJlaGF2aW91cidzIHBhcmFtZXRlcnMgZm9yIGFsbCBwYXJ0aWNsZXNcbiAgICpcbiAgICogQG1ldGhvZCBpbml0aWFsaXplXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkNvbG9yXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3Rvbi5QYXJ0aWNsZX0gcGFydGljbGVcbiAgICovXG4gIGluaXRpYWxpemUocGFydGljbGUpIHtcbiAgICBwYXJ0aWNsZS5jb2xvciA9IHRoaXMuYS5nZXRWYWx1ZSgpO1xuICAgIHBhcnRpY2xlLmRhdGEuY29sb3JBID0gQ29sb3JVdGlsLmhleFRvUmdiKHBhcnRpY2xlLmNvbG9yKTtcblxuICAgIGlmICh0aGlzLmIpIHBhcnRpY2xlLmRhdGEuY29sb3JCID0gQ29sb3JVdGlsLmhleFRvUmdiKHRoaXMuYi5nZXRWYWx1ZSgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBseSB0aGlzIGJlaGF2aW91ciBmb3IgYWxsIHBhcnRpY2xlcyBldmVyeSB0aW1lXG4gICAqXG4gICAqIEBtZXRob2QgYXBwbHlCZWhhdmlvdXJcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uQ29sb3JcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLlBhcnRpY2xlfSBwYXJ0aWNsZVxuICAgKiBAcGFyYW0ge051bWJlcn0gdGhlIGludGVncmF0ZSB0aW1lIDEvbXNcbiAgICogQHBhcmFtIHtJbnR9IHRoZSBwYXJ0aWNsZSBpbmRleFxuICAgKi9cbiAgYXBwbHlCZWhhdmlvdXIocGFydGljbGUsIHRpbWUsIGluZGV4KSB7XG4gICAgaWYgKHRoaXMuYikge1xuICAgICAgdGhpcy5jYWxjdWxhdGUocGFydGljbGUsIHRpbWUsIGluZGV4KTtcblxuICAgICAgcGFydGljbGUucmdiLnIgPSBwYXJ0aWNsZS5kYXRhLmNvbG9yQi5yICsgKHBhcnRpY2xlLmRhdGEuY29sb3JBLnIgLSBwYXJ0aWNsZS5kYXRhLmNvbG9yQi5yKSAqIHRoaXMuZW5lcmd5O1xuICAgICAgcGFydGljbGUucmdiLmcgPSBwYXJ0aWNsZS5kYXRhLmNvbG9yQi5nICsgKHBhcnRpY2xlLmRhdGEuY29sb3JBLmcgLSBwYXJ0aWNsZS5kYXRhLmNvbG9yQi5nKSAqIHRoaXMuZW5lcmd5O1xuICAgICAgcGFydGljbGUucmdiLmIgPSBwYXJ0aWNsZS5kYXRhLmNvbG9yQi5iICsgKHBhcnRpY2xlLmRhdGEuY29sb3JBLmIgLSBwYXJ0aWNsZS5kYXRhLmNvbG9yQi5iKSAqIHRoaXMuZW5lcmd5O1xuXG4gICAgICBwYXJ0aWNsZS5yZ2IuciA9IHBhcnRpY2xlLnJnYi5yIDw8IDA7XG4gICAgICBwYXJ0aWNsZS5yZ2IuZyA9IHBhcnRpY2xlLnJnYi5nIDw8IDA7XG4gICAgICBwYXJ0aWNsZS5yZ2IuYiA9IHBhcnRpY2xlLnJnYi5iIDw8IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhcnRpY2xlLnJnYi5yID0gcGFydGljbGUuZGF0YS5jb2xvckEucjtcbiAgICAgIHBhcnRpY2xlLnJnYi5nID0gcGFydGljbGUuZGF0YS5jb2xvckEuZztcbiAgICAgIHBhcnRpY2xlLnJnYi5iID0gcGFydGljbGUuZGF0YS5jb2xvckEuYjtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBNYXRoVXRpbCBmcm9tIFwiLi4vbWF0aC9NYXRoVXRpbFwiO1xuaW1wb3J0IFZlY3RvcjJEIGZyb20gXCIuLi9tYXRoL1ZlY3RvcjJEXCI7XG5pbXBvcnQgU3BhbiBmcm9tIFwiLi4vbWF0aC9TcGFuXCI7XG5pbXBvcnQgQmVoYXZpb3VyIGZyb20gXCIuL0JlaGF2aW91clwiO1xuXG5jb25zdCBDSEFOR0lORyA9IFwiY2hhbmdpbmdcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ3ljbG9uZSBleHRlbmRzIEJlaGF2aW91ciB7XG4gIC8qKlxuICAgKiBAbWVtYmVyb2YhIFByb3RvbiNcbiAgICogQGF1Z21lbnRzIFByb3Rvbi5CZWhhdmlvdXJcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBhbGlhcyBQcm90b24uQ3ljbG9uZVxuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gYW5nbGVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGZvcmNlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gXHRcdFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2UuZWFzZUxpbmVhcl0gXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKlxuICAgKiBAcHJvcGVydHkge1N0cmluZ30gbmFtZSBUaGUgQmVoYXZpb3VyIG5hbWVcbiAgICovXG4gIGNvbnN0cnVjdG9yKGFuZ2xlLCBmb3JjZSwgbGlmZSwgZWFzaW5nKSB7XG4gICAgc3VwZXIobGlmZSwgZWFzaW5nKTtcbiAgICB0aGlzLnNldEFuZ2xlQW5kRm9yY2UoYW5nbGUsIGZvcmNlKTtcbiAgICB0aGlzLm5hbWUgPSBcIkN5Y2xvbmVcIjtcbiAgfVxuXG4gIHNldEFuZ2xlQW5kRm9yY2UoYW5nbGUsIGZvcmNlKSB7XG4gICAgdGhpcy5mb3JjZSA9IENIQU5HSU5HO1xuICAgIHRoaXMuYW5nbGUgPSBNYXRoVXRpbC5QSSAvIDI7XG5cbiAgICBpZiAoYW5nbGUgPT09IFwicmlnaHRcIikge1xuICAgICAgdGhpcy5hbmdsZSA9IE1hdGhVdGlsLlBJIC8gMjtcbiAgICB9IGVsc2UgaWYgKGFuZ2xlID09PSBcImxlZnRcIikge1xuICAgICAgdGhpcy5hbmdsZSA9IC1NYXRoVXRpbC5QSSAvIDI7XG4gICAgfSBlbHNlIGlmIChhbmdsZSA9PT0gXCJyYW5kb21cIikge1xuICAgICAgdGhpcy5hbmdsZSA9IFwicmFuZG9tXCI7XG4gICAgfSBlbHNlIGlmIChhbmdsZSBpbnN0YW5jZW9mIFNwYW4pIHtcbiAgICAgIHRoaXMuYW5nbGUgPSBcInNwYW5cIjtcbiAgICAgIHRoaXMuc3BhbiA9IGFuZ2xlO1xuICAgIH0gZWxzZSBpZiAoYW5nbGUpIHtcbiAgICAgIHRoaXMuYW5nbGUgPSBhbmdsZTtcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICBTdHJpbmcoZm9yY2UpLnRvTG93ZXJDYXNlKCkgPT09IFwiY2hhbmdpbmdcIiB8fFxuICAgICAgU3RyaW5nKGZvcmNlKS50b0xvd2VyQ2FzZSgpID09PSBcImNoYW5nXCIgfHxcbiAgICAgIFN0cmluZyhmb3JjZSkudG9Mb3dlckNhc2UoKSA9PT0gXCJhdXRvXCJcbiAgICApIHtcbiAgICAgIHRoaXMuZm9yY2UgPSBDSEFOR0lORztcbiAgICB9IGVsc2UgaWYgKGZvcmNlKSB7XG4gICAgICB0aGlzLmZvcmNlID0gZm9yY2U7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoaXMgYmVoYXZpb3VyJ3MgcGFyYW1ldGVyc1xuICAgKlxuICAgKiBAbWV0aG9kIHJlc2V0XG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkN5Y2xvbmVcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBhbmdsZVxuICAgKiBAcGFyYW0ge051bWJlcn0gZm9yY2VcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtsaWZlPUluZmluaXR5XSBcdFx0XHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZS5lYXNlTGluZWFyXSBcdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqL1xuICByZXNldChhbmdsZSwgZm9yY2UsIGxpZmUsIGVhc2luZykge1xuICAgIHRoaXMuYW5nbGUgPSBNYXRoVXRpbC5QSSAvIDI7XG4gICAgdGhpcy5zZXRBbmdsZUFuZEZvcmNlKGFuZ2xlLCBmb3JjZSk7XG4gICAgbGlmZSAmJiBzdXBlci5yZXNldChsaWZlLCBlYXNpbmcpO1xuICB9XG5cbiAgaW5pdGlhbGl6ZShwYXJ0aWNsZSkge1xuICAgIGlmICh0aGlzLmFuZ2xlID09PSBcInJhbmRvbVwiKSB7XG4gICAgICBwYXJ0aWNsZS5kYXRhLmNhbmdsZSA9IE1hdGhVdGlsLnJhbmRvbUFUb0IoLU1hdGhVdGlsLlBJLCBNYXRoVXRpbC5QSSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmFuZ2xlID09PSBcInNwYW5cIikge1xuICAgICAgcGFydGljbGUuZGF0YS5jYW5nbGUgPSB0aGlzLnNwYW4uZ2V0VmFsdWUoKTtcbiAgICB9XG5cbiAgICBwYXJ0aWNsZS5kYXRhLmN5Y2xvbmUgPSBuZXcgVmVjdG9yMkQoMCwgMCk7XG4gIH1cblxuICAvKipcbiAgICogQXBwbHkgdGhpcyBiZWhhdmlvdXIgZm9yIGFsbCBwYXJ0aWNsZXMgZXZlcnkgdGltZVxuICAgKlxuICAgKiBAbWV0aG9kIGFwcGx5QmVoYXZpb3VyXG4gICAqIEBtZW1iZXJvZiBQcm90b24jUHJvdG9uLkN5Y2xvbmVcbiAgICogQGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLlBhcnRpY2xlfSBwYXJ0aWNsZVxuICAgKiBAcGFyYW0ge051bWJlcn0gdGhlIGludGVncmF0ZSB0aW1lIDEvbXNcbiAgICogQHBhcmFtIHtJbnR9IHRoZSBwYXJ0aWNsZSBpbmRleFxuICAgKi9cbiAgYXBwbHlCZWhhdmlvdXIocGFydGljbGUsIHRpbWUsIGluZGV4KSB7XG4gICAgdGhpcy5jYWxjdWxhdGUocGFydGljbGUsIHRpbWUsIGluZGV4KTtcblxuICAgIGxldCBsZW5ndGg7XG4gICAgbGV0IGdyYWRpZW50ID0gcGFydGljbGUudi5nZXRHcmFkaWVudCgpO1xuICAgIGlmICh0aGlzLmFuZ2xlID09PSBcInJhbmRvbVwiIHx8IHRoaXMuYW5nbGUgPT09IFwic3BhblwiKSB7XG4gICAgICBncmFkaWVudCArPSBwYXJ0aWNsZS5kYXRhLmNhbmdsZTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ3JhZGllbnQgKz0gdGhpcy5hbmdsZTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5mb3JjZSA9PT0gQ0hBTkdJTkcpIHtcbiAgICAgIGxlbmd0aCA9IHBhcnRpY2xlLnYubGVuZ3RoKCkgLyAxMDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxlbmd0aCA9IHRoaXMuZm9yY2U7XG4gICAgfVxuXG4gICAgcGFydGljbGUuZGF0YS5jeWNsb25lLnggPSBsZW5ndGggKiBNYXRoLmNvcyhncmFkaWVudCk7XG4gICAgcGFydGljbGUuZGF0YS5jeWNsb25lLnkgPSBsZW5ndGggKiBNYXRoLnNpbihncmFkaWVudCk7XG4gICAgcGFydGljbGUuZGF0YS5jeWNsb25lID0gdGhpcy5ub3JtYWxpemVGb3JjZShwYXJ0aWNsZS5kYXRhLmN5Y2xvbmUpO1xuICAgIHBhcnRpY2xlLmEuYWRkKHBhcnRpY2xlLmRhdGEuY3ljbG9uZSk7XG4gIH1cbn1cbiIsImltcG9ydCBBdHRyYWN0aW9uIGZyb20gXCIuL0F0dHJhY3Rpb25cIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVwdWxzaW9uIGV4dGVuZHMgQXR0cmFjdGlvbiB7XG4gIC8qKlxuICAgKiBUaGUgb3BwaXNpdGUgb2YgUHJvdG9uLkF0dHJhY3Rpb24gLSB0dXJucyB0aGUgZm9yY2VcbiAgICpcbiAgICogQG1lbWJlcm9mISBQcm90b24jXG4gICAqIEBhdWdtZW50cyBQcm90b24jUHJvdG9uLkF0dHJhY3Rpb25cbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBhbGlhcyBQcm90b24uUmVwdWxzaW9uXG4gICAqXG4gICAqIEB0b2RvIGFkZCBkZXNjcmlwdGlvbiBmb3IgJ2ZvcmNlJyBhbmQgJ3JhZGl1cydcbiAgICpcbiAgICogQHBhcmFtIHtQcm90b24uVmVjdG9yMkR9IHRhcmdldFBvc2l0aW9uIHRoZSBhdHRyYWN0aW9uIHBvaW50IGNvb3JkaW5hdGVzXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbZm9yY2U9MTAwXVxuICAgKiBAcGFyYW0ge051bWJlcn0gW3JhZGl1cz0xMDAwXVxuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpZmU9SW5maW5pdHldIFx0XHRcdFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2UuZWFzZUxpbmVhcl0gXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKlxuICAgKiBAcHJvcGVydHkge051bWJlcn0gZm9yY2VcbiAgICogQHByb3BlcnR5IHtTdHJpbmd9IG5hbWUgVGhlIEJlaGF2aW91ciBuYW1lXG4gICAqL1xuICBjb25zdHJ1Y3Rvcih0YXJnZXRQb3NpdGlvbiwgZm9yY2UsIHJhZGl1cywgbGlmZSwgZWFzaW5nKSB7XG4gICAgc3VwZXIodGFyZ2V0UG9zaXRpb24sIGZvcmNlLCByYWRpdXMsIGxpZmUsIGVhc2luZyk7XG5cbiAgICB0aGlzLmZvcmNlICo9IC0xO1xuICAgIHRoaXMubmFtZSA9IFwiUmVwdWxzaW9uXCI7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgdGhpcyBiZWhhdmlvdXIncyBwYXJhbWV0ZXJzXG4gICAqXG4gICAqIEBtZXRob2QgcmVzZXRcbiAgICogQG1lbWJlcm9mIFByb3RvbiNQcm90b24uUmVwdWxzaW9uXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAdG9kbyBhZGQgZGVzY3JpcHRpb24gZm9yICdmb3JjZScgYW5kICdyYWRpdXMnXG4gICAqXG4gICAqIEBwYXJhbSB7UHJvdG9uLlZlY3RvcjJEfSB0YXJnZXRQb3NpdGlvbiB0aGUgYXR0cmFjdGlvbiBwb2ludCBjb29yZGluYXRlc1xuICAgKiBAcGFyYW0ge051bWJlcn0gW2ZvcmNlPTEwMF1cbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtyYWRpdXM9MTAwMF1cbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtsaWZlPUluZmluaXR5XSBcdFx0XHRcdHRoaXMgYmVoYXZpb3VyJ3MgbGlmZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2Vhc2luZz1lYXNlLmVhc2VMaW5lYXJdIFx0dGhpcyBiZWhhdmlvdXIncyBlYXNpbmdcbiAgICovXG4gIHJlc2V0KHRhcmdldFBvc2l0aW9uLCBmb3JjZSwgcmFkaXVzLCBsaWZlLCBlYXNpbmcpIHtcbiAgICBzdXBlci5yZXNldCh0YXJnZXRQb3NpdGlvbiwgZm9yY2UsIHJhZGl1cywgbGlmZSwgZWFzaW5nKTtcbiAgICB0aGlzLmZvcmNlICo9IC0xO1xuICB9XG59XG4iLCJpbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IFZlY3RvcjJEIGZyb20gXCIuLi9tYXRoL1ZlY3RvcjJEXCI7XG5pbXBvcnQgQmVoYXZpb3VyIGZyb20gXCIuL0JlaGF2aW91clwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHcmF2aXR5V2VsbCBleHRlbmRzIEJlaGF2aW91ciB7XG4gIC8qKlxuICAgKiBAbWVtYmVyb2YhIFByb3RvbiNcbiAgICogQGF1Z21lbnRzIEJlaGF2aW91clxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQGFsaWFzIEdyYXZpdHlXZWxsXG4gICAqXG4gICAqIEBwYXJhbSB7VmVjdG9yMkR9IFtjZW50ZXJQb2ludD1uZXcgVmVjdG9yMkRdIFRoZSBwb2ludCBpbiB0aGUgY2VudGVyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbZm9yY2U9MTAwXVx0XHRcdFx0XHRUaGUgZm9yY2VcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtsaWZlPUluZmluaXR5XVx0XHRcdFx0dGhpcyBiZWhhdmlvdXIncyBsaWZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZWFzaW5nPWVhc2VMaW5lYXJdXHR0aGlzIGJlaGF2aW91cidzIGVhc2luZ1xuICAgKlxuICAgKiBAcHJvcGVydHkge1N0cmluZ30gbmFtZSBUaGUgQmVoYXZpb3VyIG5hbWVcbiAgICovXG4gIGNvbnN0cnVjdG9yKGNlbnRlclBvaW50LCBmb3JjZSwgbGlmZSwgZWFzaW5nKSB7XG4gICAgc3VwZXIobGlmZSwgZWFzaW5nKTtcblxuICAgIHRoaXMuZGlzdGFuY2VWZWMgPSBuZXcgVmVjdG9yMkQoKTtcbiAgICB0aGlzLmNlbnRlclBvaW50ID0gVXRpbC5pbml0VmFsdWUoY2VudGVyUG9pbnQsIG5ldyBWZWN0b3IyRCgpKTtcbiAgICB0aGlzLmZvcmNlID0gVXRpbC5pbml0VmFsdWUodGhpcy5ub3JtYWxpemVWYWx1ZShmb3JjZSksIDEwMCk7XG5cbiAgICB0aGlzLm5hbWUgPSBcIkdyYXZpdHlXZWxsXCI7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgdGhpcyBiZWhhdmlvdXIncyBwYXJhbWV0ZXJzXG4gICAqXG4gICAqIEBtZXRob2QgcmVzZXRcbiAgICogQG1lbWJlcm9mIFByb3RvbiNHcmF2aXR5V2VsbFxuICAgKiBAaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtWZWN0b3IyRH0gW2NlbnRlclBvaW50PW5ldyBWZWN0b3IyRF0gVGhlIHBvaW50IGluIHRoZSBjZW50ZXJcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtmb3JjZT0xMDBdXHRcdFx0XHRcdFRoZSBmb3JjZVxuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpZmU9SW5maW5pdHldXHRcdFx0XHR0aGlzIGJlaGF2aW91cidzIGxpZmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlYXNpbmc9ZWFzZUxpbmVhcl1cdHRoaXMgYmVoYXZpb3VyJ3MgZWFzaW5nXG4gICAqL1xuICByZXNldChjZW50ZXJQb2ludCwgZm9yY2UsIGxpZmUsIGVhc2luZykge1xuICAgIHRoaXMuZGlzdGFuY2VWZWMgPSBuZXcgVmVjdG9yMkQoKTtcbiAgICB0aGlzLmNlbnRlclBvaW50ID0gVXRpbC5pbml0VmFsdWUoY2VudGVyUG9pbnQsIG5ldyBWZWN0b3IyRCgpKTtcbiAgICB0aGlzLmZvcmNlID0gVXRpbC5pbml0VmFsdWUodGhpcy5ub3JtYWxpemVWYWx1ZShmb3JjZSksIDEwMCk7XG5cbiAgICBsaWZlICYmIHN1cGVyLnJlc2V0KGxpZmUsIGVhc2luZyk7XG4gIH1cblxuICAvKipcbiAgICogQGluaGVyaXRkb2NcbiAgICovXG4gIGluaXRpYWxpemUocGFydGljbGUpIHt9XG5cbiAgLyoqXG4gICAqIEFwcGx5IHRoaXMgYmVoYXZpb3VyIGZvciBhbGwgcGFydGljbGVzIGV2ZXJ5IHRpbWVcbiAgICpcbiAgICogQG1ldGhvZCBhcHBseUJlaGF2aW91clxuICAgKiBAbWVtYmVyb2YgUHJvdG9uI0dyYXZpdHlXZWxsXG4gICAqIEBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1BhcnRpY2xlfSBwYXJ0aWNsZVxuICAgKiBAcGFyYW0ge051bWJlcn0gdGhlIGludGVncmF0ZSB0aW1lIDEvbXNcbiAgICogQHBhcmFtIHtJbnR9IHRoZSBwYXJ0aWNsZSBpbmRleFxuICAgKi9cbiAgYXBwbHlCZWhhdmlvdXIocGFydGljbGUsIHRpbWUsIGluZGV4KSB7XG4gICAgdGhpcy5kaXN0YW5jZVZlYy5zZXQodGhpcy5jZW50ZXJQb2ludC54IC0gcGFydGljbGUucC54LCB0aGlzLmNlbnRlclBvaW50LnkgLSBwYXJ0aWNsZS5wLnkpO1xuICAgIGNvbnN0IGRpc3RhbmNlU3EgPSB0aGlzLmRpc3RhbmNlVmVjLmxlbmd0aFNxKCk7XG5cbiAgICBpZiAoZGlzdGFuY2VTcSAhPT0gMCkge1xuICAgICAgY29uc3QgZGlzdGFuY2UgPSB0aGlzLmRpc3RhbmNlVmVjLmxlbmd0aCgpO1xuICAgICAgY29uc3QgZmFjdG9yID0gKHRoaXMuZm9yY2UgKiB0aW1lKSAvIChkaXN0YW5jZVNxICogZGlzdGFuY2UpO1xuXG4gICAgICBwYXJ0aWNsZS52LnggKz0gZmFjdG9yICogdGhpcy5kaXN0YW5jZVZlYy54O1xuICAgICAgcGFydGljbGUudi55ICs9IGZhY3RvciAqIHRoaXMuZGlzdGFuY2VWZWMueTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBQcm9wVXRpbCBmcm9tIFwiLi4vdXRpbHMvUHJvcFV0aWxcIjtcbmltcG9ydCBJbml0aWFsaXplIGZyb20gXCIuL0luaXRpYWxpemVcIjtcbmltcG9ydCBNYXRoVXRpbCBmcm9tIFwiLi4vbWF0aC9NYXRoVXRpbFwiO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGluaXRpYWxpemUoZW1pdHRlciwgcGFydGljbGUsIGluaXRpYWxpemVzKSB7XG4gICAgY29uc3QgbGVuZ3RoID0gaW5pdGlhbGl6ZXMubGVuZ3RoO1xuICAgIGxldCBpO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoaW5pdGlhbGl6ZXNbaV0gaW5zdGFuY2VvZiBJbml0aWFsaXplKSB7XG4gICAgICAgIGluaXRpYWxpemVzW2ldLmluaXQoZW1pdHRlciwgcGFydGljbGUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5pbml0KGVtaXR0ZXIsIHBhcnRpY2xlLCBpbml0aWFsaXplc1tpXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5iaW5kRW1pdHRlcihlbWl0dGVyLCBwYXJ0aWNsZSk7XG4gIH0sXG5cbiAgLy8gaW5pdFxuICBpbml0KGVtaXR0ZXIsIHBhcnRpY2xlLCBpbml0aWFsaXplKSB7XG4gICAgUHJvcFV0aWwuc2V0UHJvcChwYXJ0aWNsZSwgaW5pdGlhbGl6ZSk7XG4gICAgUHJvcFV0aWwuc2V0VmVjdG9yVmFsKHBhcnRpY2xlLCBpbml0aWFsaXplKTtcbiAgfSxcblxuICBiaW5kRW1pdHRlcihlbWl0dGVyLCBwYXJ0aWNsZSkge1xuICAgIGlmIChlbWl0dGVyLmJpbmRFbWl0dGVyKSB7XG4gICAgICBwYXJ0aWNsZS5wLmFkZChlbWl0dGVyLnApO1xuICAgICAgcGFydGljbGUudi5hZGQoZW1pdHRlci52KTtcbiAgICAgIHBhcnRpY2xlLmEuYWRkKGVtaXR0ZXIuYSk7XG5cbiAgICAgIHBhcnRpY2xlLnYucm90YXRlKE1hdGhVdGlsLmRlZ3JlZVRyYW5zZm9ybShlbWl0dGVyLnJvdGF0aW9uKSk7XG4gICAgfVxuICB9XG59O1xuIiwiaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcbmltcG9ydCBQdWlkIGZyb20gXCIuLi91dGlscy9QdWlkXCI7XG5pbXBvcnQgUGFydGljbGUgZnJvbSBcIi4uL2NvcmUvUGFydGljbGVcIjtcbmltcG9ydCBFdmVudERpc3BhdGNoZXIgZnJvbSBcIi4uL2V2ZW50cy9FdmVudERpc3BhdGNoZXJcIjtcblxuaW1wb3J0IFJhdGUgZnJvbSBcIi4uL2luaXRpYWxpemUvUmF0ZVwiO1xuaW1wb3J0IEluaXRpYWxpemVVdGlsIGZyb20gXCIuLi9pbml0aWFsaXplL0luaXRpYWxpemVVdGlsXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVtaXR0ZXIgZXh0ZW5kcyBQYXJ0aWNsZSB7XG4gIC8qKlxuICAgKiBZb3UgY2FuIHVzZSB0aGlzIGVtaXQgcGFydGljbGVzLlxuICAgKlxuICAgKiBJdCB3aWxsIGRpc3BhdGNoIGZvbGxvdyBldmVudHM6XG4gICAqIFBBUlRJQ0xFX0NSRUFURURcbiAgICogUEFSVElDTEVfVVBEQVRBXG4gICAqIFBBUlRJQ0xFX0RFQURcbiAgICpcbiAgICogQGNsYXNzIEVtaXR0ZXJcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjb25mIHRoZSBwYXJhbWV0ZXJzIG9iamVjdDtcbiAgICogZm9yIGV4YW1wbGUge2RhbXBpbmc6MC4wMSxiaW5kRW1pdHRlcjpmYWxzZX1cbiAgICovXG4gIGNvbnN0cnVjdG9yKGNvbmYgPSB7fSkge1xuICAgIHN1cGVyKGNvbmYpO1xuXG4gICAgdGhpcy5wYXJ0aWNsZXMgPSBbXTtcbiAgICB0aGlzLmJlaGF2aW91cnMgPSBbXTtcbiAgICB0aGlzLmluaXRpYWxpemVzID0gW107XG5cbiAgICB0aGlzLmVtaXRUaW1lID0gMDtcbiAgICB0aGlzLmVtaXRTcGVlZCA9IDA7XG4gICAgdGhpcy50b3RhbFRpbWUgPSAtMTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBmcmljdGlvbiBjb2VmZmljaWVudCBmb3IgYWxsIHBhcnRpY2xlIGVtaXQgYnkgVGhpcztcbiAgICAgKiBAcHJvcGVydHkgZGFtcGluZ1xuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICogQGRlZmF1bHQgMC4wMDZcbiAgICAgKi9cbiAgICB0aGlzLmRhbXBpbmcgPSAwLjAwNjtcblxuICAgIC8qKlxuICAgICAqIElmIGJpbmRFbWl0dGVyIHRoZSBwYXJ0aWNsZXMgY2FuIGJpbmQgdGhpcyBlbWl0dGVyJ3MgcHJvcGVydHk7XG4gICAgICogQHByb3BlcnR5IGJpbmRFbWl0dGVyXG4gICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICogQGRlZmF1bHQgdHJ1ZVxuICAgICAqL1xuICAgIHRoaXMuYmluZEVtaXR0ZXIgPSB0cnVlO1xuXG4gICAgLyoqXG4gICAgICogVGhlIG51bWJlciBvZiBwYXJ0aWNsZXMgcGVyIHNlY29uZCBlbWl0IChhIFtwYXJ0aWNsZV0vYiBbc10pO1xuICAgICAqIEBwcm9wZXJ0eSByYXRlXG4gICAgICogQHR5cGUge1JhdGV9XG4gICAgICogQGRlZmF1bHQgUmF0ZSgxLCAuMSlcbiAgICAgKi9cbiAgICB0aGlzLnJhdGUgPSBuZXcgUmF0ZSgxLCAwLjEpO1xuXG4gICAgdGhpcy5uYW1lID0gXCJFbWl0dGVyXCI7XG4gICAgdGhpcy5pZCA9IFB1aWQuaWQodGhpcy5uYW1lKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBzdGFydCBlbWl0IHBhcnRpY2xlXG4gICAqIEBtZXRob2QgZW1pdFxuICAgKiBAcGFyYW0ge051bWJlcn0gZW1pdFRpbWUgYmVnaW4gZW1pdCB0aW1lO1xuICAgKiBAcGFyYW0ge1N0cmluZ30gbGlmZSB0aGUgbGlmZSBvZiB0aGlzIGVtaXR0ZXJcbiAgICovXG4gIGVtaXQodG90YWxUaW1lLCBsaWZlKSB7XG4gICAgdGhpcy5zdG9wZWQgPSBmYWxzZTtcbiAgICB0aGlzLmVtaXRUaW1lID0gMDtcbiAgICB0aGlzLnRvdGFsVGltZSA9IFV0aWwuaW5pdFZhbHVlKHRvdGFsVGltZSwgSW5maW5pdHkpO1xuXG4gICAgaWYgKGxpZmUgPT09IHRydWUgfHwgbGlmZSA9PT0gXCJsaWZlXCIgfHwgbGlmZSA9PT0gXCJkZXN0cm95XCIpIHtcbiAgICAgIHRoaXMubGlmZSA9IHRvdGFsVGltZSA9PT0gXCJvbmNlXCIgPyAxIDogdGhpcy50b3RhbFRpbWU7XG4gICAgfSBlbHNlIGlmICghaXNOYU4obGlmZSkpIHtcbiAgICAgIHRoaXMubGlmZSA9IGxpZmU7XG4gICAgfVxuXG4gICAgdGhpcy5yYXRlLmluaXQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBzdG9wIGVtaXRpbmdcbiAgICogQG1ldGhvZCBzdG9wXG4gICAqL1xuICBzdG9wKCkge1xuICAgIHRoaXMudG90YWxUaW1lID0gLTE7XG4gICAgdGhpcy5lbWl0VGltZSA9IDA7XG4gICAgdGhpcy5zdG9wZWQgPSB0cnVlO1xuICB9XG5cbiAgcHJlRW1pdCh0aW1lKSB7XG4gICAgbGV0IG9sZFN0b3BlZCA9IHRoaXMuc3RvcGVkO1xuICAgIGxldCBvbGRFbWl0VGltZSA9IHRoaXMuZW1pdFRpbWU7XG4gICAgbGV0IG9sZFRvdGFsVGltZSA9IHRoaXMudG90YWxUaW1lO1xuXG4gICAgdGhpcy5zdG9wZWQgPSBmYWxzZTtcbiAgICB0aGlzLmVtaXRUaW1lID0gMDtcbiAgICB0aGlzLnRvdGFsVGltZSA9IHRpbWU7XG4gICAgdGhpcy5yYXRlLmluaXQoKTtcblxuICAgIGNvbnN0IHN0ZXAgPSAwLjAxNjc7XG4gICAgd2hpbGUgKHRpbWUgPiBzdGVwKSB7XG4gICAgICB0aW1lIC09IHN0ZXA7XG4gICAgICB0aGlzLnVwZGF0ZShzdGVwKTtcbiAgICB9XG5cbiAgICB0aGlzLnN0b3BlZCA9IG9sZFN0b3BlZDtcbiAgICB0aGlzLmVtaXRUaW1lID0gb2xkRW1pdFRpbWUgKyBNYXRoLm1heCh0aW1lLCAwKTtcbiAgICB0aGlzLnRvdGFsVGltZSA9IG9sZFRvdGFsVGltZTtcbiAgfVxuXG4gIC8qKlxuICAgKiByZW1vdmUgY3VycmVudCBhbGwgcGFydGljbGVzXG4gICAqIEBtZXRob2QgcmVtb3ZlQWxsUGFydGljbGVzXG4gICAqL1xuICByZW1vdmVBbGxQYXJ0aWNsZXMoKSB7XG4gICAgbGV0IGkgPSB0aGlzLnBhcnRpY2xlcy5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSkgdGhpcy5wYXJ0aWNsZXNbaV0uZGVhZCA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogYWRkIGluaXRpYWxpemUgdG8gdGhpcyBlbWl0dGVyXG4gICAqIEBtZXRob2QgYWRkU2VsZkluaXRpYWxpemVcbiAgICovXG4gIGFkZFNlbGZJbml0aWFsaXplKGluaXRpYWxpemUpIHtcbiAgICBpZiAoaW5pdGlhbGl6ZVtcImluaXRcIl0pIHtcbiAgICAgIGluaXRpYWxpemUuaW5pdCh0aGlzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pbml0QWxsKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIGFkZCB0aGUgSW5pdGlhbGl6ZSB0byBwYXJ0aWNsZXM7XG4gICAqXG4gICAqIHlvdSBjYW4gdXNlIGluaXRpYWxpemVzIGFycmF5OmZvciBleGFtcGxlIGVtaXR0ZXIuYWRkSW5pdGlhbGl6ZShpbml0aWFsaXplMSxpbml0aWFsaXplMixpbml0aWFsaXplMyk7XG4gICAqIEBtZXRob2QgYWRkSW5pdGlhbGl6ZVxuICAgKiBAcGFyYW0ge0luaXRpYWxpemV9IGluaXRpYWxpemUgbGlrZSB0aGlzIG5ldyBSYWRpdXMoMSwgMTIpXG4gICAqL1xuICBhZGRJbml0aWFsaXplKC4uLnJlc3QpIHtcbiAgICBsZXQgaSA9IHJlc3QubGVuZ3RoO1xuICAgIHdoaWxlIChpLS0pIHRoaXMuaW5pdGlhbGl6ZXMucHVzaChyZXN0W2ldKTtcbiAgfVxuXG4gIC8qKlxuICAgKiByZW1vdmUgdGhlIEluaXRpYWxpemVcbiAgICogQG1ldGhvZCByZW1vdmVJbml0aWFsaXplXG4gICAqIEBwYXJhbSB7SW5pdGlhbGl6ZX0gaW5pdGlhbGl6ZSBhIGluaXRpYWxpemVcbiAgICovXG4gIHJlbW92ZUluaXRpYWxpemUoaW5pdGlhbGl6ZXIpIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuaW5pdGlhbGl6ZXMuaW5kZXhPZihpbml0aWFsaXplcik7XG4gICAgaWYgKGluZGV4ID4gLTEpIHRoaXMuaW5pdGlhbGl6ZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgfVxuXG4gIC8qKlxuICAgKiByZW1vdmUgYWxsIEluaXRpYWxpemVzXG4gICAqIEBtZXRob2QgcmVtb3ZlSW5pdGlhbGl6ZXJzXG4gICAqL1xuICByZW1vdmVBbGxJbml0aWFsaXplcnMoKSB7XG4gICAgVXRpbC5lbXB0eUFycmF5KHRoaXMuaW5pdGlhbGl6ZXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIGFkZCB0aGUgQmVoYXZpb3VyIHRvIHBhcnRpY2xlcztcbiAgICpcbiAgICogeW91IGNhbiB1c2UgQmVoYXZpb3VycyBhcnJheTplbWl0dGVyLmFkZEJlaGF2aW91cihCZWhhdmlvdXIxLEJlaGF2aW91cjIsQmVoYXZpb3VyMyk7XG4gICAqIEBtZXRob2QgYWRkQmVoYXZpb3VyXG4gICAqIEBwYXJhbSB7QmVoYXZpb3VyfSBiZWhhdmlvdXIgbGlrZSB0aGlzIG5ldyBDb2xvcigncmFuZG9tJylcbiAgICovXG4gIGFkZEJlaGF2aW91ciguLi5yZXN0KSB7XG4gICAgbGV0IGkgPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIGxldCBiZWhhdmlvdXIgPSByZXN0W2ldO1xuICAgICAgdGhpcy5iZWhhdmlvdXJzLnB1c2goYmVoYXZpb3VyKTtcbiAgICAgIGlmIChiZWhhdmlvdXIucGFyZW50cykgYmVoYXZpb3VyLnBhcmVudHMucHVzaCh0aGlzKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogcmVtb3ZlIHRoZSBCZWhhdmlvdXJcbiAgICogQG1ldGhvZCByZW1vdmVCZWhhdmlvdXJcbiAgICogQHBhcmFtIHtCZWhhdmlvdXJ9IGJlaGF2aW91ciBhIGJlaGF2aW91clxuICAgKi9cbiAgcmVtb3ZlQmVoYXZpb3VyKGJlaGF2aW91cikge1xuICAgIGxldCBpbmRleCA9IHRoaXMuYmVoYXZpb3Vycy5pbmRleE9mKGJlaGF2aW91cik7XG4gICAgdGhpcy5iZWhhdmlvdXJzLnNwbGljZShpbmRleCwgMSk7XG5cbiAgICBpZiAoYmVoYXZpb3VyLnBhcmVudHMpIHtcbiAgICAgIGluZGV4ID0gYmVoYXZpb3VyLnBhcmVudHMuaW5kZXhPZihiZWhhdmlvdXIpO1xuICAgICAgYmVoYXZpb3VyLnBhcmVudHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG5cbiAgICByZXR1cm4gaW5kZXg7XG4gIH1cblxuICAvKipcbiAgICogcmVtb3ZlIGFsbCBiZWhhdmlvdXJzXG4gICAqIEBtZXRob2QgcmVtb3ZlQWxsQmVoYXZpb3Vyc1xuICAgKi9cbiAgcmVtb3ZlQWxsQmVoYXZpb3VycygpIHtcbiAgICBVdGlsLmVtcHR5QXJyYXkodGhpcy5iZWhhdmlvdXJzKTtcbiAgfVxuXG4gIC8vIGVtaXR0ZXIgdXBkYXRlXG4gIHVwZGF0ZSh0aW1lKSB7XG4gICAgdGhpcy5hZ2UgKz0gdGltZTtcbiAgICBpZiAodGhpcy5hZ2UgPj0gdGhpcy5saWZlIHx8IHRoaXMuZGVhZCkgdGhpcy5kZXN0cm95KCk7XG5cbiAgICB0aGlzLmVtaXR0aW5nKHRpbWUpO1xuICAgIHRoaXMuaW50ZWdyYXRlKHRpbWUpO1xuICB9XG5cbiAgaW50ZWdyYXRlKHRpbWUpIHtcbiAgICBpZiAoIXRoaXMucGFyZW50KSByZXR1cm47XG5cbiAgICBjb25zdCBkYW1waW5nID0gMSAtIHRoaXMuZGFtcGluZztcbiAgICB0aGlzLnBhcmVudC5pbnRlZ3JhdG9yLmNhbGN1bGF0ZSh0aGlzLCB0aW1lLCBkYW1waW5nKTtcblxuICAgIGNvbnN0IGxlbmd0aCA9IHRoaXMucGFydGljbGVzLmxlbmd0aDtcbiAgICBsZXQgaSwgcGFydGljbGU7XG5cbiAgICBmb3IgKGkgPSBsZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgcGFydGljbGUgPSB0aGlzLnBhcnRpY2xlc1tpXTtcblxuICAgICAgLy8gcGFydGljbGUgdXBkYXRlXG4gICAgICBwYXJ0aWNsZS51cGRhdGUodGltZSwgaSk7XG4gICAgICB0aGlzLnBhcmVudC5pbnRlZ3JhdG9yLmNhbGN1bGF0ZShwYXJ0aWNsZSwgdGltZSwgZGFtcGluZyk7XG4gICAgICB0aGlzLmRpc3BhdGNoKFwiUEFSVElDTEVfVVBEQVRFXCIsIHBhcnRpY2xlKTtcblxuICAgICAgLy8gY2hlY2sgZGVhZFxuICAgICAgaWYgKHBhcnRpY2xlLmRlYWQpIHtcbiAgICAgICAgdGhpcy5kaXNwYXRjaChcIlBBUlRJQ0xFX0RFQURcIiwgcGFydGljbGUpO1xuXG4gICAgICAgIHRoaXMucGFyZW50LnBvb2wuZXhwaXJlKHBhcnRpY2xlKTtcbiAgICAgICAgdGhpcy5wYXJ0aWNsZXMuc3BsaWNlKGksIDEpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGRpc3BhdGNoKGV2ZW50LCB0YXJnZXQpIHtcbiAgICB0aGlzLnBhcmVudCAmJiB0aGlzLnBhcmVudC5kaXNwYXRjaEV2ZW50KGV2ZW50LCB0YXJnZXQpO1xuICAgIHRoaXMuYmluZEV2ZW50ICYmIHRoaXMuZGlzcGF0Y2hFdmVudChldmVudCwgdGFyZ2V0KTtcbiAgfVxuXG4gIGVtaXR0aW5nKHRpbWUpIHtcbiAgICBpZiAodGhpcy50b3RhbFRpbWUgPT09IFwib25jZVwiKSB7XG4gICAgICBsZXQgaTtcbiAgICAgIGNvbnN0IGxlbmd0aCA9IHRoaXMucmF0ZS5nZXRWYWx1ZSg5OTk5OSk7XG5cbiAgICAgIGlmIChsZW5ndGggPiAwKSB0aGlzLmVtaXRTcGVlZCA9IGxlbmd0aDtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykgdGhpcy5jcmVhdGVQYXJ0aWNsZSgpO1xuICAgICAgdGhpcy50b3RhbFRpbWUgPSBcIm5vbmVcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lbWl0VGltZSArPSB0aW1lO1xuXG4gICAgICBpZiAodGhpcy5lbWl0VGltZSA8IHRoaXMudG90YWxUaW1lKSB7XG4gICAgICAgIGNvbnN0IGxlbmd0aCA9IHRoaXMucmF0ZS5nZXRWYWx1ZSh0aW1lKTtcbiAgICAgICAgbGV0IGk7XG5cbiAgICAgICAgaWYgKGxlbmd0aCA+IDApIHRoaXMuZW1pdFNwZWVkID0gbGVuZ3RoO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHRoaXMuY3JlYXRlUGFydGljbGUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogY3JlYXRlIHNpbmdsZSBwYXJ0aWNsZTtcbiAgICpcbiAgICogY2FuIHVzZSBlbWl0KHt4OjEwfSxuZXcgR3Jhdml0eSgxMCkseydwYXJ0aWNsZVVwZGF0ZScsZnVufSkgb3IgZW1pdChbe3g6MTB9LG5ldyBJbml0aWFsaXplXSxuZXcgR3Jhdml0eSgxMCkseydwYXJ0aWNsZVVwZGF0ZScsZnVufSlcbiAgICogQG1ldGhvZCByZW1vdmVBbGxQYXJ0aWNsZXNcbiAgICovXG4gIGNyZWF0ZVBhcnRpY2xlKGluaXRpYWxpemUsIGJlaGF2aW91cikge1xuICAgIGNvbnN0IHBhcnRpY2xlID0gdGhpcy5wYXJlbnQucG9vbC5nZXQoUGFydGljbGUpO1xuICAgIHRoaXMuc2V0dXBQYXJ0aWNsZShwYXJ0aWNsZSwgaW5pdGlhbGl6ZSwgYmVoYXZpb3VyKTtcbiAgICB0aGlzLmRpc3BhdGNoKFwiUEFSVElDTEVfQ1JFQVRFRFwiLCBwYXJ0aWNsZSk7XG5cbiAgICByZXR1cm4gcGFydGljbGU7XG4gIH1cblxuICBzZXR1cFBhcnRpY2xlKHBhcnRpY2xlLCBpbml0aWFsaXplLCBiZWhhdmlvdXIpIHtcbiAgICBsZXQgaW5pdGlhbGl6ZXMgPSB0aGlzLmluaXRpYWxpemVzO1xuICAgIGxldCBiZWhhdmlvdXJzID0gdGhpcy5iZWhhdmlvdXJzO1xuXG4gICAgaWYgKGluaXRpYWxpemUpIGluaXRpYWxpemVzID0gVXRpbC50b0FycmF5KGluaXRpYWxpemUpO1xuICAgIGlmIChiZWhhdmlvdXIpIGJlaGF2aW91cnMgPSBVdGlsLnRvQXJyYXkoYmVoYXZpb3VyKTtcblxuICAgIHBhcnRpY2xlLnJlc2V0KCk7XG4gICAgSW5pdGlhbGl6ZVV0aWwuaW5pdGlhbGl6ZSh0aGlzLCBwYXJ0aWNsZSwgaW5pdGlhbGl6ZXMpO1xuICAgIHBhcnRpY2xlLmFkZEJlaGF2aW91cnMoYmVoYXZpb3Vycyk7XG4gICAgcGFydGljbGUucGFyZW50ID0gdGhpcztcblxuICAgIHRoaXMucGFydGljbGVzLnB1c2gocGFydGljbGUpO1xuICB9XG5cbiAgcmVtb3ZlKCkge1xuICAgIHRoaXMuc3RvcCgpO1xuICAgIFV0aWwuZGVzdHJveUFsbCh0aGlzLnBhcnRpY2xlcyk7XG4gIH1cblxuICAvKipcbiAgICogRGVzdG9yeSB0aGlzIEVtaXR0ZXJcbiAgICogQG1ldGhvZCBkZXN0cm95XG4gICAqL1xuICBkZXN0cm95KCkge1xuICAgIHRoaXMuZGVhZCA9IHRydWU7XG4gICAgdGhpcy5yZW1vdmUoKTtcbiAgICB0aGlzLnJlbW92ZUFsbEluaXRpYWxpemVycygpO1xuICAgIHRoaXMucmVtb3ZlQWxsQmVoYXZpb3VycygpO1xuICAgIHRoaXMucGFyZW50ICYmIHRoaXMucGFyZW50LnJlbW92ZUVtaXR0ZXIodGhpcyk7XG4gIH1cbn1cblxuRXZlbnREaXNwYXRjaGVyLmJpbmQoRW1pdHRlcik7XG4iLCJpbXBvcnQgRW1pdHRlciBmcm9tIFwiLi9FbWl0dGVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJlaGF2aW91ckVtaXR0ZXIgZXh0ZW5kcyBFbWl0dGVyIHtcbiAgLyoqXG4gICAqIFRoZSBCZWhhdmlvdXJFbWl0dGVyIGNsYXNzIGluaGVyaXRzIGZyb20gUHJvdG9uLkVtaXR0ZXJcbiAgICpcbiAgICogdXNlIHRoZSBCZWhhdmlvdXJFbWl0dGVyIHlvdSBjYW4gYWRkIGJlaGF2aW91cnMgdG8gc2VsZjtcbiAgICogQGNsYXNzIFByb3Rvbi5CZWhhdmlvdXJFbWl0dGVyXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0ge09iamVjdH0gY29uZiB0aGUgcGFyYW1ldGVycyBvYmplY3Q7XG4gICAqL1xuICBjb25zdHJ1Y3Rvcihjb25mKSB7XG4gICAgc3VwZXIoY29uZik7XG5cbiAgICB0aGlzLnNlbGZCZWhhdmlvdXJzID0gW107XG4gIH1cblxuICAvKipcbiAgICogYWRkIHRoZSBCZWhhdmlvdXIgdG8gZW1pdHRlcjtcbiAgICpcbiAgICogeW91IGNhbiB1c2UgQmVoYXZpb3VycyBhcnJheTplbWl0dGVyLmFkZFNlbGZCZWhhdmlvdXIoQmVoYXZpb3VyMSxCZWhhdmlvdXIyLEJlaGF2aW91cjMpO1xuICAgKiBAbWV0aG9kIGFkZFNlbGZCZWhhdmlvdXJcbiAgICogQHBhcmFtIHtQcm90b24uQmVoYXZpb3VyfSBiZWhhdmlvdXIgbGlrZSB0aGlzIG5ldyBQcm90b24uQ29sb3IoJ3JhbmRvbScpXG4gICAqL1xuICBhZGRTZWxmQmVoYXZpb3VyKC4uLnJlc3QpIHtcbiAgICBsZXQgaSxcbiAgICAgIGxlbmd0aCA9IHJlc3QubGVuZ3RoO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgYmVoYXZpb3VyID0gcmVzdFtpXTtcbiAgICAgIHRoaXMuc2VsZkJlaGF2aW91cnMucHVzaChiZWhhdmlvdXIpO1xuICAgICAgYmVoYXZpb3VyLmluaXRpYWxpemUodGhpcyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIHJlbW92ZSB0aGUgQmVoYXZpb3VyIGZvciBzZWxmXG4gICAqIEBtZXRob2QgcmVtb3ZlU2VsZkJlaGF2aW91clxuICAgKiBAcGFyYW0ge1Byb3Rvbi5CZWhhdmlvdXJ9IGJlaGF2aW91ciBhIGJlaGF2aW91clxuICAgKi9cbiAgcmVtb3ZlU2VsZkJlaGF2aW91cihiZWhhdmlvdXIpIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuc2VsZkJlaGF2aW91cnMuaW5kZXhPZihiZWhhdmlvdXIpO1xuICAgIGlmIChpbmRleCA+IC0xKSB0aGlzLnNlbGZCZWhhdmlvdXJzLnNwbGljZShpbmRleCwgMSk7XG4gIH1cblxuICB1cGRhdGUodGltZSkge1xuICAgIHN1cGVyLnVwZGF0ZSh0aW1lKTtcblxuICAgIGlmICghdGhpcy5zbGVlcCkge1xuICAgICAgY29uc3QgbGVuZ3RoID0gdGhpcy5zZWxmQmVoYXZpb3Vycy5sZW5ndGg7XG4gICAgICBsZXQgaTtcblxuICAgICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMuc2VsZkJlaGF2aW91cnNbaV0uYXBwbHlCZWhhdmlvdXIodGhpcywgdGltZSwgaSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgVXRpbCBmcm9tIFwiLi4vdXRpbHMvVXRpbFwiO1xuaW1wb3J0IEVtaXR0ZXIgZnJvbSBcIi4vRW1pdHRlclwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGb2xsb3dFbWl0dGVyIGV4dGVuZHMgRW1pdHRlciB7XG4gIC8qKlxuICAgKiBUaGUgRm9sbG93RW1pdHRlciBjbGFzcyBpbmhlcml0cyBmcm9tIFByb3Rvbi5FbWl0dGVyXG4gICAqXG4gICAqIHVzZSB0aGUgRm9sbG93RW1pdHRlciB3aWxsIGVtaXQgcGFydGljbGUgd2hlbiBtb3VzZW1vdmluZ1xuICAgKlxuICAgKiBAY2xhc3MgUHJvdG9uLkZvbGxvd0VtaXR0ZXJcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSB7RWxlbWVudH0gbW91c2VUYXJnZXQgbW91c2VldmVudCdzIHRhcmdldDtcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGVhc2UgdGhlIGVhc2luZyBvZiBmb2xsb3dpbmcgc3BlZWQ7XG4gICAqIEBkZWZhdWx0IDAuN1xuICAgKiBAcGFyYW0ge09iamVjdH0gY29uZiB0aGUgcGFyYW1ldGVycyBvYmplY3Q7XG4gICAqL1xuICBjb25zdHJ1Y3Rvcihtb3VzZVRhcmdldCwgZWFzZSwgY29uZikge1xuICAgIHN1cGVyKGNvbmYpO1xuXG4gICAgdGhpcy5tb3VzZVRhcmdldCA9IFV0aWwuaW5pdFZhbHVlKG1vdXNlVGFyZ2V0LCB3aW5kb3cpO1xuICAgIHRoaXMuZWFzZSA9IFV0aWwuaW5pdFZhbHVlKGVhc2UsIDAuNyk7XG5cbiAgICB0aGlzLl9hbGxvd0VtaXR0aW5nID0gZmFsc2U7XG4gICAgdGhpcy5pbml0RXZlbnRIYW5kbGVyKCk7XG4gIH1cblxuICBpbml0RXZlbnRIYW5kbGVyKCkge1xuICAgIHRoaXMubW91c2Vtb3ZlSGFuZGxlciA9IGUgPT4gdGhpcy5tb3VzZW1vdmUuY2FsbCh0aGlzLCBlKTtcbiAgICB0aGlzLm1vdXNlZG93bkhhbmRsZXIgPSBlID0+IHRoaXMubW91c2Vkb3duLmNhbGwodGhpcywgZSk7XG4gICAgdGhpcy5tb3VzZXVwSGFuZGxlciA9IGUgPT4gdGhpcy5tb3VzZXVwLmNhbGwodGhpcywgZSk7XG4gICAgdGhpcy5tb3VzZVRhcmdldC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIHRoaXMubW91c2Vtb3ZlSGFuZGxlciwgZmFsc2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIHN0YXJ0IGVtaXQgcGFydGljbGVcbiAgICogQG1ldGhvZCBlbWl0XG4gICAqL1xuICBlbWl0KCkge1xuICAgIHRoaXMuX2FsbG93RW1pdHRpbmcgPSB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIHN0b3AgZW1pdGluZ1xuICAgKiBAbWV0aG9kIHN0b3BcbiAgICovXG4gIHN0b3AoKSB7XG4gICAgdGhpcy5fYWxsb3dFbWl0dGluZyA9IGZhbHNlO1xuICB9XG5cbiAgbW91c2Vtb3ZlKGUpIHtcbiAgICBpZiAoZS5sYXllclggfHwgZS5sYXllclggPT09IDApIHtcbiAgICAgIHRoaXMucC54ICs9IChlLmxheWVyWCAtIHRoaXMucC54KSAqIHRoaXMuZWFzZTtcbiAgICAgIHRoaXMucC55ICs9IChlLmxheWVyWSAtIHRoaXMucC55KSAqIHRoaXMuZWFzZTtcbiAgICB9IGVsc2UgaWYgKGUub2Zmc2V0WCB8fCBlLm9mZnNldFggPT09IDApIHtcbiAgICAgIHRoaXMucC54ICs9IChlLm9mZnNldFggLSB0aGlzLnAueCkgKiB0aGlzLmVhc2U7XG4gICAgICB0aGlzLnAueSArPSAoZS5vZmZzZXRZIC0gdGhpcy5wLnkpICogdGhpcy5lYXNlO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9hbGxvd0VtaXR0aW5nKSBzdXBlci5lbWl0KFwib25jZVwiKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXN0b3J5IHRoaXMgRW1pdHRlclxuICAgKiBAbWV0aG9kIGRlc3Ryb3lcbiAgICovXG4gIGRlc3Ryb3koKSB7XG4gICAgc3VwZXIuZGVzdHJveSgpO1xuICAgIHRoaXMubW91c2VUYXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCB0aGlzLm1vdXNlbW92ZUhhbmRsZXIsIGZhbHNlKTtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQge1xuICAvKipcbiAgICogRGV0ZXJtaW5lIHdoZXRoZXIgaXQgaXMgYSBwaWN0dXJlIG9iamVjdFxuICAgKlxuICAgKiBAcmV0dXJuIHtib29sZWFufSBpcyBvciBub1xuICAgKi9cbiAgaXNJbWFnZShvYmopIHtcbiAgICBpZiAoIW9iaikgcmV0dXJuIGZhbHNlO1xuXG4gICAgY29uc3QgdGFnTmFtZSA9IGAke29iai50YWdOYW1lfWAudG9VcHBlckNhc2UoKTtcbiAgICBjb25zdCBub2RlTmFtZSA9IGAke29iai5ub2RlTmFtZX1gLnRvVXBwZXJDYXNlKCk7XG4gICAgaWYgKG5vZGVOYW1lID09PSBcIklNR1wiIHx8IHRhZ05hbWUgPT09IFwiSU1HXCIpIHJldHVybiB0cnVlO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfSxcblxuICAvKipcbiAgICogRGV0ZXJtaW5lIHdoZXRoZXIgaXQgaXMgYSBzdHJpbmcgb2JqZWN0XG4gICAqXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IGlzIG9yIG5vXG4gICAqL1xuICBpc1N0cmluZyhvYmopIHtcbiAgICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gXCJzdHJpbmdcIjtcbiAgfVxufTtcbiIsImltcG9ydCBQb29sIGZyb20gXCIuLi9jb3JlL1Bvb2xcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFzZVJlbmRlcmVyIHtcbiAgY29uc3RydWN0b3IoZWxlbWVudCwgc3Ryb2tlKSB7XG4gICAgdGhpcy5wb29sID0gbmV3IFBvb2woKTtcbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgIHRoaXMuc3Ryb2tlID0gc3Ryb2tlO1xuICAgIHRoaXMuY2lyY2xlQ29uZiA9IHsgaXNDaXJjbGU6IHRydWUgfTtcblxuICAgIHRoaXMuaW5pdEV2ZW50SGFuZGxlcigpO1xuICAgIHRoaXMubmFtZSA9IFwiQmFzZVJlbmRlcmVyXCI7XG4gIH1cblxuICBzZXRTdHJva2UoY29sb3IgPSBcIiMwMDAwMDBcIiwgdGhpbmtuZXNzID0gMSkge1xuICAgIHRoaXMuc3Ryb2tlID0geyBjb2xvciwgdGhpbmtuZXNzIH07XG4gIH1cblxuICBpbml0RXZlbnRIYW5kbGVyKCkge1xuICAgIHRoaXMuX3Byb3RvblVwZGF0ZUhhbmRsZXIgPSAoKSA9PiB7XG4gICAgICB0aGlzLm9uUHJvdG9uVXBkYXRlLmNhbGwodGhpcyk7XG4gICAgfTtcblxuICAgIHRoaXMuX3Byb3RvblVwZGF0ZUFmdGVySGFuZGxlciA9ICgpID0+IHtcbiAgICAgIHRoaXMub25Qcm90b25VcGRhdGVBZnRlci5jYWxsKHRoaXMpO1xuICAgIH07XG5cbiAgICB0aGlzLl9lbWl0dGVyQWRkZWRIYW5kbGVyID0gZW1pdHRlciA9PiB7XG4gICAgICB0aGlzLm9uRW1pdHRlckFkZGVkLmNhbGwodGhpcywgZW1pdHRlcik7XG4gICAgfTtcblxuICAgIHRoaXMuX2VtaXR0ZXJSZW1vdmVkSGFuZGxlciA9IGVtaXR0ZXIgPT4ge1xuICAgICAgdGhpcy5vbkVtaXR0ZXJSZW1vdmVkLmNhbGwodGhpcywgZW1pdHRlcik7XG4gICAgfTtcblxuICAgIHRoaXMuX3BhcnRpY2xlQ3JlYXRlZEhhbmRsZXIgPSBwYXJ0aWNsZSA9PiB7XG4gICAgICB0aGlzLm9uUGFydGljbGVDcmVhdGVkLmNhbGwodGhpcywgcGFydGljbGUpO1xuICAgIH07XG5cbiAgICB0aGlzLl9wYXJ0aWNsZVVwZGF0ZUhhbmRsZXIgPSBwYXJ0aWNsZSA9PiB7XG4gICAgICB0aGlzLm9uUGFydGljbGVVcGRhdGUuY2FsbCh0aGlzLCBwYXJ0aWNsZSk7XG4gICAgfTtcblxuICAgIHRoaXMuX3BhcnRpY2xlRGVhZEhhbmRsZXIgPSBwYXJ0aWNsZSA9PiB7XG4gICAgICB0aGlzLm9uUGFydGljbGVEZWFkLmNhbGwodGhpcywgcGFydGljbGUpO1xuICAgIH07XG4gIH1cblxuICBpbml0KHByb3Rvbikge1xuICAgIHRoaXMucGFyZW50ID0gcHJvdG9uO1xuXG4gICAgcHJvdG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJQUk9UT05fVVBEQVRFXCIsIHRoaXMuX3Byb3RvblVwZGF0ZUhhbmRsZXIpO1xuICAgIHByb3Rvbi5hZGRFdmVudExpc3RlbmVyKFwiUFJPVE9OX1VQREFURV9BRlRFUlwiLCB0aGlzLl9wcm90b25VcGRhdGVBZnRlckhhbmRsZXIpO1xuXG4gICAgcHJvdG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJFTUlUVEVSX0FEREVEXCIsIHRoaXMuX2VtaXR0ZXJBZGRlZEhhbmRsZXIpO1xuICAgIHByb3Rvbi5hZGRFdmVudExpc3RlbmVyKFwiRU1JVFRFUl9SRU1PVkVEXCIsIHRoaXMuX2VtaXR0ZXJSZW1vdmVkSGFuZGxlcik7XG5cbiAgICBwcm90b24uYWRkRXZlbnRMaXN0ZW5lcihcIlBBUlRJQ0xFX0NSRUFURURcIiwgdGhpcy5fcGFydGljbGVDcmVhdGVkSGFuZGxlcik7XG4gICAgcHJvdG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJQQVJUSUNMRV9VUERBVEVcIiwgdGhpcy5fcGFydGljbGVVcGRhdGVIYW5kbGVyKTtcbiAgICBwcm90b24uYWRkRXZlbnRMaXN0ZW5lcihcIlBBUlRJQ0xFX0RFQURcIiwgdGhpcy5fcGFydGljbGVEZWFkSGFuZGxlcik7XG4gIH1cblxuICByZXNpemUod2lkdGgsIGhlaWdodCkge31cblxuICBkZXN0cm95KCkge1xuICAgIHRoaXMucmVtb3ZlKCk7XG4gICAgdGhpcy5wb29sLmRlc3Ryb3koKTtcbiAgICB0aGlzLnBvb2wgPSBudWxsO1xuICAgIHRoaXMuZWxlbWVudCA9IG51bGw7XG4gICAgdGhpcy5zdHJva2UgPSBudWxsO1xuICB9XG5cbiAgcmVtb3ZlKHByb3Rvbikge1xuICAgIHRoaXMucGFyZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJQUk9UT05fVVBEQVRFXCIsIHRoaXMuX3Byb3RvblVwZGF0ZUhhbmRsZXIpO1xuICAgIHRoaXMucGFyZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJQUk9UT05fVVBEQVRFX0FGVEVSXCIsIHRoaXMuX3Byb3RvblVwZGF0ZUFmdGVySGFuZGxlcik7XG5cbiAgICB0aGlzLnBhcmVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiRU1JVFRFUl9BRERFRFwiLCB0aGlzLl9lbWl0dGVyQWRkZWRIYW5kbGVyKTtcbiAgICB0aGlzLnBhcmVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiRU1JVFRFUl9SRU1PVkVEXCIsIHRoaXMuX2VtaXR0ZXJSZW1vdmVkSGFuZGxlcik7XG5cbiAgICB0aGlzLnBhcmVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiUEFSVElDTEVfQ1JFQVRFRFwiLCB0aGlzLl9wYXJ0aWNsZUNyZWF0ZWRIYW5kbGVyKTtcbiAgICB0aGlzLnBhcmVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiUEFSVElDTEVfVVBEQVRFXCIsIHRoaXMuX3BhcnRpY2xlVXBkYXRlSGFuZGxlcik7XG4gICAgdGhpcy5wYXJlbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIlBBUlRJQ0xFX0RFQURcIiwgdGhpcy5fcGFydGljbGVEZWFkSGFuZGxlcik7XG5cbiAgICB0aGlzLnBhcmVudCA9IG51bGw7XG4gIH1cblxuICBvblByb3RvblVwZGF0ZSgpIHt9XG4gIG9uUHJvdG9uVXBkYXRlQWZ0ZXIoKSB7fVxuXG4gIG9uRW1pdHRlckFkZGVkKGVtaXR0ZXIpIHt9XG4gIG9uRW1pdHRlclJlbW92ZWQoZW1pdHRlcikge31cblxuICBvblBhcnRpY2xlQ3JlYXRlZChwYXJ0aWNsZSkge31cbiAgb25QYXJ0aWNsZVVwZGF0ZShwYXJ0aWNsZSkge31cbiAgb25QYXJ0aWNsZURlYWQocGFydGljbGUpIHt9XG59XG4iLCJpbXBvcnQgVHlwZXMgZnJvbSBcIi4uL3V0aWxzL1R5cGVzXCI7XG5pbXBvcnQgSW1nVXRpbCBmcm9tIFwiLi4vdXRpbHMvSW1nVXRpbFwiO1xuaW1wb3J0IENvbG9yVXRpbCBmcm9tIFwiLi4vdXRpbHMvQ29sb3JVdGlsXCI7XG5pbXBvcnQgTWF0aFV0aWwgZnJvbSBcIi4uL21hdGgvTWF0aFV0aWxcIjtcbmltcG9ydCBCYXNlUmVuZGVyZXIgZnJvbSBcIi4vQmFzZVJlbmRlcmVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhbnZhc1JlbmRlcmVyIGV4dGVuZHMgQmFzZVJlbmRlcmVyIHtcbiAgY29uc3RydWN0b3IoZWxlbWVudCkge1xuICAgIHN1cGVyKGVsZW1lbnQpO1xuXG4gICAgdGhpcy5zdHJva2UgPSBudWxsO1xuICAgIHRoaXMuY29udGV4dCA9IHRoaXMuZWxlbWVudC5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgdGhpcy5idWZmZXJDYWNoZSA9IHt9O1xuICAgIHRoaXMubmFtZSA9IFwiQ2FudmFzUmVuZGVyZXJcIjtcbiAgfVxuXG4gIHJlc2l6ZSh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgdGhpcy5lbGVtZW50LndpZHRoID0gd2lkdGg7XG4gICAgdGhpcy5lbGVtZW50LmhlaWdodCA9IGhlaWdodDtcbiAgfVxuXG4gIG9uUHJvdG9uVXBkYXRlKCkge1xuICAgIHRoaXMuY29udGV4dC5jbGVhclJlY3QoMCwgMCwgdGhpcy5lbGVtZW50LndpZHRoLCB0aGlzLmVsZW1lbnQuaGVpZ2h0KTtcbiAgfVxuXG4gIG9uUGFydGljbGVDcmVhdGVkKHBhcnRpY2xlKSB7XG4gICAgaWYgKHBhcnRpY2xlLmJvZHkpIHtcbiAgICAgIEltZ1V0aWwuZ2V0SW1nRnJvbUNhY2hlKHBhcnRpY2xlLmJvZHksIHRoaXMuYWRkSW1nMkJvZHksIHBhcnRpY2xlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcGFydGljbGUuY29sb3IgPSBwYXJ0aWNsZS5jb2xvciB8fCBcIiNmZjAwMDBcIjtcbiAgICB9XG4gIH1cblxuICBvblBhcnRpY2xlVXBkYXRlKHBhcnRpY2xlKSB7XG4gICAgaWYgKHBhcnRpY2xlLmJvZHkpIHtcbiAgICAgIGlmIChUeXBlcy5pc0ltYWdlKHBhcnRpY2xlLmJvZHkpKSB7XG4gICAgICAgIHRoaXMuZHJhd0ltYWdlKHBhcnRpY2xlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kcmF3Q2lyY2xlKHBhcnRpY2xlKTtcbiAgICB9XG4gIH1cblxuICBvblBhcnRpY2xlRGVhZChwYXJ0aWNsZSkge1xuICAgIHBhcnRpY2xlLmJvZHkgPSBudWxsO1xuICB9XG5cbiAgLy8gcHJpdmF0ZSBtZXRob2RcbiAgYWRkSW1nMkJvZHkoaW1nLCBwYXJ0aWNsZSkge1xuICAgIHBhcnRpY2xlLmJvZHkgPSBpbWc7XG4gIH1cblxuICAvLyBwcml2YXRlIGRyYXdJbWFnZSBtZXRob2RcbiAgZHJhd0ltYWdlKHBhcnRpY2xlKSB7XG4gICAgY29uc3QgdyA9IChwYXJ0aWNsZS5ib2R5LndpZHRoICogcGFydGljbGUuc2NhbGUpIHwgMDtcbiAgICBjb25zdCBoID0gKHBhcnRpY2xlLmJvZHkuaGVpZ2h0ICogcGFydGljbGUuc2NhbGUpIHwgMDtcbiAgICBjb25zdCB4ID0gcGFydGljbGUucC54IC0gdyAvIDI7XG4gICAgY29uc3QgeSA9IHBhcnRpY2xlLnAueSAtIGggLyAyO1xuXG4gICAgaWYgKCEhcGFydGljbGUuY29sb3IpIHtcbiAgICAgIGlmICghcGFydGljbGUuZGF0YVtcImJ1ZmZlclwiXSkgcGFydGljbGUuZGF0YS5idWZmZXIgPSB0aGlzLmNyZWF0ZUJ1ZmZlcihwYXJ0aWNsZS5ib2R5KTtcblxuICAgICAgY29uc3QgYnVmQ29udGV4dCA9IHBhcnRpY2xlLmRhdGEuYnVmZmVyLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICAgIGJ1ZkNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHBhcnRpY2xlLmRhdGEuYnVmZmVyLndpZHRoLCBwYXJ0aWNsZS5kYXRhLmJ1ZmZlci5oZWlnaHQpO1xuICAgICAgYnVmQ29udGV4dC5nbG9iYWxBbHBoYSA9IHBhcnRpY2xlLmFscGhhO1xuICAgICAgYnVmQ29udGV4dC5kcmF3SW1hZ2UocGFydGljbGUuYm9keSwgMCwgMCk7XG5cbiAgICAgIGJ1ZkNvbnRleHQuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gXCJzb3VyY2UtYXRvcFwiO1xuICAgICAgYnVmQ29udGV4dC5maWxsU3R5bGUgPSBDb2xvclV0aWwucmdiVG9IZXgocGFydGljbGUucmdiKTtcbiAgICAgIGJ1ZkNvbnRleHQuZmlsbFJlY3QoMCwgMCwgcGFydGljbGUuZGF0YS5idWZmZXIud2lkdGgsIHBhcnRpY2xlLmRhdGEuYnVmZmVyLmhlaWdodCk7XG4gICAgICBidWZDb250ZXh0Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9IFwic291cmNlLW92ZXJcIjtcbiAgICAgIGJ1ZkNvbnRleHQuZ2xvYmFsQWxwaGEgPSAxO1xuXG4gICAgICB0aGlzLmNvbnRleHQuZHJhd0ltYWdlKFxuICAgICAgICBwYXJ0aWNsZS5kYXRhLmJ1ZmZlcixcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgcGFydGljbGUuZGF0YS5idWZmZXIud2lkdGgsXG4gICAgICAgIHBhcnRpY2xlLmRhdGEuYnVmZmVyLmhlaWdodCxcbiAgICAgICAgeCxcbiAgICAgICAgeSxcbiAgICAgICAgdyxcbiAgICAgICAgaFxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jb250ZXh0LnNhdmUoKTtcblxuICAgICAgdGhpcy5jb250ZXh0Lmdsb2JhbEFscGhhID0gcGFydGljbGUuYWxwaGE7XG4gICAgICB0aGlzLmNvbnRleHQudHJhbnNsYXRlKHBhcnRpY2xlLnAueCwgcGFydGljbGUucC55KTtcbiAgICAgIHRoaXMuY29udGV4dC5yb3RhdGUoTWF0aFV0aWwuZGVncmVlVHJhbnNmb3JtKHBhcnRpY2xlLnJvdGF0aW9uKSk7XG4gICAgICB0aGlzLmNvbnRleHQudHJhbnNsYXRlKC1wYXJ0aWNsZS5wLngsIC1wYXJ0aWNsZS5wLnkpO1xuICAgICAgdGhpcy5jb250ZXh0LmRyYXdJbWFnZShwYXJ0aWNsZS5ib2R5LCAwLCAwLCBwYXJ0aWNsZS5ib2R5LndpZHRoLCBwYXJ0aWNsZS5ib2R5LmhlaWdodCwgeCwgeSwgdywgaCk7XG5cbiAgICAgIHRoaXMuY29udGV4dC5nbG9iYWxBbHBoYSA9IDE7XG4gICAgICB0aGlzLmNvbnRleHQucmVzdG9yZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8vIHByaXZhdGUgZHJhd0NpcmNsZSAtLVxuICBkcmF3Q2lyY2xlKHBhcnRpY2xlKSB7XG4gICAgaWYgKHBhcnRpY2xlLnJnYikge1xuICAgICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IGByZ2JhKCR7cGFydGljbGUucmdiLnJ9LCR7cGFydGljbGUucmdiLmd9LCR7cGFydGljbGUucmdiLmJ9LCR7cGFydGljbGUuYWxwaGF9KWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSBwYXJ0aWNsZS5jb2xvcjtcbiAgICB9XG5cbiAgICAvLyBkcmF3IGNpcmNsZVxuICAgIHRoaXMuY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICB0aGlzLmNvbnRleHQuYXJjKHBhcnRpY2xlLnAueCwgcGFydGljbGUucC55LCBwYXJ0aWNsZS5yYWRpdXMsIDAsIE1hdGguUEkgKiAyLCB0cnVlKTtcblxuICAgIGlmICh0aGlzLnN0cm9rZSkge1xuICAgICAgdGhpcy5jb250ZXh0LnN0cm9rZVN0eWxlID0gdGhpcy5zdHJva2UuY29sb3I7XG4gICAgICB0aGlzLmNvbnRleHQubGluZVdpZHRoID0gdGhpcy5zdHJva2UudGhpbmtuZXNzO1xuICAgICAgdGhpcy5jb250ZXh0LnN0cm9rZSgpO1xuICAgIH1cblxuICAgIHRoaXMuY29udGV4dC5jbG9zZVBhdGgoKTtcbiAgICB0aGlzLmNvbnRleHQuZmlsbCgpO1xuICB9XG5cbiAgLy8gcHJpdmF0ZSBjcmVhdGVCdWZmZXJcbiAgY3JlYXRlQnVmZmVyKGltYWdlKSB7XG4gICAgaWYgKFR5cGVzLmlzSW1hZ2UoaW1hZ2UpKSB7XG4gICAgICBjb25zdCBzaXplID0gaW1hZ2Uud2lkdGggKyBcIl9cIiArIGltYWdlLmhlaWdodDtcbiAgICAgIGxldCBjYW52YXMgPSB0aGlzLmJ1ZmZlckNhY2hlW3NpemVdO1xuXG4gICAgICBpZiAoIWNhbnZhcykge1xuICAgICAgICBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgICAgICBjYW52YXMud2lkdGggPSBpbWFnZS53aWR0aDtcbiAgICAgICAgY2FudmFzLmhlaWdodCA9IGltYWdlLmhlaWdodDtcbiAgICAgICAgdGhpcy5idWZmZXJDYWNoZVtzaXplXSA9IGNhbnZhcztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNhbnZhcztcbiAgICB9XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHN1cGVyLmRlc3Ryb3koKTtcbiAgICB0aGlzLnN0cm9rZSA9IG51bGw7XG4gICAgdGhpcy5jb250ZXh0ID0gbnVsbDtcbiAgICB0aGlzLmJ1ZmZlckNhY2hlID0gbnVsbDtcbiAgfVxufVxuIiwiaW1wb3J0IERvbVV0aWwgZnJvbSBcIi4uL3V0aWxzL0RvbVV0aWxcIjtcbmltcG9ydCBJbWdVdGlsIGZyb20gXCIuLi91dGlscy9JbWdVdGlsXCI7XG5pbXBvcnQgQmFzZVJlbmRlcmVyIGZyb20gXCIuL0Jhc2VSZW5kZXJlclwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEb21SZW5kZXJlciBleHRlbmRzIEJhc2VSZW5kZXJlciB7XG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQpIHtcbiAgICBzdXBlcihlbGVtZW50KTtcblxuICAgIHRoaXMuc3Ryb2tlID0gbnVsbDtcbiAgICB0aGlzLnRyYW5zZm9ybTNkID0gZmFsc2U7XG4gICAgdGhpcy5wb29sLmNyZWF0ZSA9IChib2R5LCBwYXJ0aWNsZSkgPT4gdGhpcy5jcmVhdGVCb2R5KGJvZHksIHBhcnRpY2xlKTtcbiAgICB0aGlzLmFkZEltZzJCb2R5ID0gdGhpcy5hZGRJbWcyQm9keS5iaW5kKHRoaXMpO1xuXG4gICAgdGhpcy5uYW1lID0gXCJEb21SZW5kZXJlclwiO1xuICB9XG5cbiAgb25QYXJ0aWNsZUNyZWF0ZWQocGFydGljbGUpIHtcbiAgICBpZiAocGFydGljbGUuYm9keSkge1xuICAgICAgSW1nVXRpbC5nZXRJbWdGcm9tQ2FjaGUocGFydGljbGUuYm9keSwgdGhpcy5hZGRJbWcyQm9keSwgcGFydGljbGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBwYXJ0aWNsZS5ib2R5ID0gdGhpcy5wb29sLmdldCh0aGlzLmNpcmNsZUNvbmYsIHBhcnRpY2xlKTtcbiAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZChwYXJ0aWNsZS5ib2R5KTtcbiAgICB9XG4gIH1cblxuICBvblBhcnRpY2xlVXBkYXRlKHBhcnRpY2xlKSB7XG4gICAgaWYgKHRoaXMuYm9keVJlYWR5KHBhcnRpY2xlKSkge1xuICAgICAgaWYgKHRoaXMudHJhbnNmb3JtM2QpIHtcbiAgICAgICAgRG9tVXRpbC50cmFuc2Zvcm0zZChwYXJ0aWNsZS5ib2R5LCBwYXJ0aWNsZS5wLngsIHBhcnRpY2xlLnAueSwgcGFydGljbGUuc2NhbGUsIHBhcnRpY2xlLnJvdGF0aW9uKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIERvbVV0aWwudHJhbnNmb3JtKHBhcnRpY2xlLmJvZHksIHBhcnRpY2xlLnAueCwgcGFydGljbGUucC55LCBwYXJ0aWNsZS5zY2FsZSwgcGFydGljbGUucm90YXRpb24pO1xuICAgICAgfVxuXG4gICAgICBwYXJ0aWNsZS5ib2R5LnN0eWxlLm9wYWNpdHkgPSBwYXJ0aWNsZS5hbHBoYTtcblxuICAgICAgaWYgKHBhcnRpY2xlLmJvZHkuaXNDaXJjbGUpIHtcbiAgICAgICAgcGFydGljbGUuYm9keS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBwYXJ0aWNsZS5jb2xvciB8fCBcIiNmZjAwMDBcIjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBvblBhcnRpY2xlRGVhZChwYXJ0aWNsZSkge1xuICAgIGlmICh0aGlzLmJvZHlSZWFkeShwYXJ0aWNsZSkpIHtcbiAgICAgIHRoaXMuZWxlbWVudC5yZW1vdmVDaGlsZChwYXJ0aWNsZS5ib2R5KTtcbiAgICAgIHRoaXMucG9vbC5leHBpcmUocGFydGljbGUuYm9keSk7XG4gICAgICBwYXJ0aWNsZS5ib2R5ID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBib2R5UmVhZHkocGFydGljbGUpIHtcbiAgICByZXR1cm4gdHlwZW9mIHBhcnRpY2xlLmJvZHkgPT09IFwib2JqZWN0XCIgJiYgcGFydGljbGUuYm9keSAmJiAhcGFydGljbGUuYm9keS5pc0lubmVyO1xuICB9XG5cbiAgLy8gcHJpdmF0ZSBtZXRob2RcbiAgYWRkSW1nMkJvZHkoaW1nLCBwYXJ0aWNsZSkge1xuICAgIGlmIChwYXJ0aWNsZS5kZWFkKSByZXR1cm47XG4gICAgcGFydGljbGUuYm9keSA9IHRoaXMucG9vbC5nZXQoaW1nLCBwYXJ0aWNsZSk7XG4gICAgRG9tVXRpbC5yZXNpemUocGFydGljbGUuYm9keSwgaW1nLndpZHRoLCBpbWcuaGVpZ2h0KTtcblxuICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZChwYXJ0aWNsZS5ib2R5KTtcbiAgfVxuXG4gIGNyZWF0ZUJvZHkoYm9keSwgcGFydGljbGUpIHtcbiAgICBpZiAoYm9keS5pc0NpcmNsZSkgcmV0dXJuIHRoaXMuY3JlYXRlQ2lyY2xlKHBhcnRpY2xlKTtcbiAgICByZXR1cm4gdGhpcy5jcmVhdGVTcHJpdGUoYm9keSwgcGFydGljbGUpO1xuICB9XG5cbiAgLy8gcHJpdmF0ZSBtZXRob2RzXG4gIGNyZWF0ZUNpcmNsZShwYXJ0aWNsZSkge1xuICAgIGNvbnN0IGRvbSA9IERvbVV0aWwuY3JlYXRlRGl2KGAke3BhcnRpY2xlLmlkfV9kb21gLCAyICogcGFydGljbGUucmFkaXVzLCAyICogcGFydGljbGUucmFkaXVzKTtcbiAgICBkb20uc3R5bGUuYm9yZGVyUmFkaXVzID0gYCR7cGFydGljbGUucmFkaXVzfXB4YDtcblxuICAgIGlmICh0aGlzLnN0cm9rZSkge1xuICAgICAgZG9tLnN0eWxlLmJvcmRlckNvbG9yID0gdGhpcy5zdHJva2UuY29sb3I7XG4gICAgICBkb20uc3R5bGUuYm9yZGVyV2lkdGggPSBgJHt0aGlzLnN0cm9rZS50aGlua25lc3N9cHhgO1xuICAgIH1cbiAgICBkb20uaXNDaXJjbGUgPSB0cnVlO1xuXG4gICAgcmV0dXJuIGRvbTtcbiAgfVxuXG4gIGNyZWF0ZVNwcml0ZShib2R5LCBwYXJ0aWNsZSkge1xuICAgIGNvbnN0IHVybCA9IHR5cGVvZiBib2R5ID09PSBcInN0cmluZ1wiID8gYm9keSA6IGJvZHkuc3JjO1xuICAgIGNvbnN0IGRvbSA9IERvbVV0aWwuY3JlYXRlRGl2KGAke3BhcnRpY2xlLmlkfV9kb21gLCBib2R5LndpZHRoLCBib2R5LmhlaWdodCk7XG4gICAgZG9tLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoJHt1cmx9KWA7XG5cbiAgICByZXR1cm4gZG9tO1xuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICBzdXBlci5kZXN0cm95KCk7XG4gICAgdGhpcy5zdHJva2UgPSBudWxsO1xuICB9XG59XG4iLCJpbXBvcnQgVHlwZXMgZnJvbSBcIi4uL3V0aWxzL1R5cGVzXCI7XG5pbXBvcnQgQmFzZVJlbmRlcmVyIGZyb20gXCIuL0Jhc2VSZW5kZXJlclwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFYXNlbFJlbmRlcmVyIGV4dGVuZHMgQmFzZVJlbmRlcmVyIHtcbiAgY29uc3RydWN0b3IoZWxlbWVudCwgc3Ryb2tlKSB7XG4gICAgc3VwZXIoZWxlbWVudCk7XG5cbiAgICB0aGlzLnN0cm9rZSA9IHN0cm9rZTtcbiAgICB0aGlzLm5hbWUgPSBcIkVhc2VsUmVuZGVyZXJcIjtcbiAgfVxuXG4gIG9uUGFydGljbGVDcmVhdGVkKHBhcnRpY2xlKSB7XG4gICAgaWYgKHBhcnRpY2xlLmJvZHkpIHtcbiAgICAgIHRoaXMuY3JlYXRlU3ByaXRlKHBhcnRpY2xlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jcmVhdGVDaXJjbGUocGFydGljbGUpO1xuICAgIH1cblxuICAgIHRoaXMuZWxlbWVudC5hZGRDaGlsZChwYXJ0aWNsZS5ib2R5KTtcbiAgfVxuXG4gIG9uUGFydGljbGVVcGRhdGUocGFydGljbGUpIHtcbiAgICBpZiAocGFydGljbGUuYm9keSkge1xuICAgICAgcGFydGljbGUuYm9keS54ID0gcGFydGljbGUucC54O1xuICAgICAgcGFydGljbGUuYm9keS55ID0gcGFydGljbGUucC55O1xuXG4gICAgICBwYXJ0aWNsZS5ib2R5LmFscGhhID0gcGFydGljbGUuYWxwaGE7XG4gICAgICBwYXJ0aWNsZS5ib2R5LnNjYWxlWCA9IHBhcnRpY2xlLmJvZHkuc2NhbGVZID0gcGFydGljbGUuc2NhbGU7XG4gICAgICBwYXJ0aWNsZS5ib2R5LnJvdGF0aW9uID0gcGFydGljbGUucm90YXRpb247XG4gICAgfVxuICB9XG5cbiAgb25QYXJ0aWNsZURlYWQocGFydGljbGUpIHtcbiAgICBpZiAocGFydGljbGUuYm9keSkge1xuICAgICAgcGFydGljbGUuYm9keS5wYXJlbnQgJiYgcGFydGljbGUuYm9keS5wYXJlbnQucmVtb3ZlQ2hpbGQocGFydGljbGUuYm9keSk7XG4gICAgICB0aGlzLnBvb2wuZXhwaXJlKHBhcnRpY2xlLmJvZHkpO1xuICAgICAgcGFydGljbGUuYm9keSA9IG51bGw7XG4gICAgfVxuXG4gICAgaWYgKHBhcnRpY2xlLmdyYXBoaWNzKSB0aGlzLnBvb2wuZXhwaXJlKHBhcnRpY2xlLmdyYXBoaWNzKTtcbiAgfVxuXG4gIC8vIHByaXZhdGVcbiAgY3JlYXRlU3ByaXRlKHBhcnRpY2xlKSB7XG4gICAgcGFydGljbGUuYm9keSA9IHRoaXMucG9vbC5nZXQocGFydGljbGUuYm9keSk7XG5cbiAgICBpZiAocGFydGljbGUuYm9keS5wYXJlbnQpIHJldHVybjtcbiAgICBpZiAocGFydGljbGUuYm9keVtcImltYWdlXCJdKSB7XG4gICAgICBwYXJ0aWNsZS5ib2R5LnJlZ1ggPSBwYXJ0aWNsZS5ib2R5LmltYWdlLndpZHRoIC8gMjtcbiAgICAgIHBhcnRpY2xlLmJvZHkucmVnWSA9IHBhcnRpY2xlLmJvZHkuaW1hZ2UuaGVpZ2h0IC8gMjtcbiAgICB9XG4gIH1cblxuICBjcmVhdGVDaXJjbGUocGFydGljbGUpIHtcbiAgICBjb25zdCBncmFwaGljcyA9IHRoaXMucG9vbC5nZXQoY3JlYXRlanMuR3JhcGhpY3MpO1xuXG4gICAgaWYgKHRoaXMuc3Ryb2tlKSB7XG4gICAgICBpZiAoVHlwZXMuaXNTdHJpbmcodGhpcy5zdHJva2UpKSB7XG4gICAgICAgIGdyYXBoaWNzLmJlZ2luU3Ryb2tlKHRoaXMuc3Ryb2tlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGdyYXBoaWNzLmJlZ2luU3Ryb2tlKFwiIzAwMDAwMFwiKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZ3JhcGhpY3MuYmVnaW5GaWxsKHBhcnRpY2xlLmNvbG9yIHx8IFwiI2ZmMDAwMFwiKS5kcmF3Q2lyY2xlKDAsIDAsIHBhcnRpY2xlLnJhZGl1cyk7XG4gICAgY29uc3Qgc2hhcGUgPSB0aGlzLnBvb2wuZ2V0KGNyZWF0ZWpzLlNoYXBlLCBbZ3JhcGhpY3NdKTtcblxuICAgIHBhcnRpY2xlLmJvZHkgPSBzaGFwZTtcbiAgICBwYXJ0aWNsZS5ncmFwaGljcyA9IGdyYXBoaWNzO1xuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICBzdXBlci5kZXN0cm95KCk7XG4gICAgdGhpcy5zdHJva2UgPSBudWxsO1xuICB9XG59XG4iLCJpbXBvcnQgUmVjdGFuZ2xlIGZyb20gXCIuLi9tYXRoL1JlY3RhbmdsZVwiO1xuaW1wb3J0IEJhc2VSZW5kZXJlciBmcm9tIFwiLi9CYXNlUmVuZGVyZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGl4ZWxSZW5kZXJlciBleHRlbmRzIEJhc2VSZW5kZXJlciB7XG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQsIHJlY3RhbmdsZSkge1xuICAgIHN1cGVyKGVsZW1lbnQpO1xuXG4gICAgdGhpcy5jb250ZXh0ID0gdGhpcy5lbGVtZW50LmdldENvbnRleHQoXCIyZFwiKTtcbiAgICB0aGlzLmltYWdlRGF0YSA9IG51bGw7XG4gICAgdGhpcy5yZWN0YW5nbGUgPSByZWN0YW5nbGU7XG4gICAgdGhpcy5jcmVhdGVJbWFnZURhdGEocmVjdGFuZ2xlKTtcblxuICAgIHRoaXMubmFtZSA9IFwiUGl4ZWxSZW5kZXJlclwiO1xuICB9XG5cbiAgcmVzaXplKHdpZHRoLCBoZWlnaHQpIHtcbiAgICB0aGlzLmVsZW1lbnQud2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLmVsZW1lbnQuaGVpZ2h0ID0gaGVpZ2h0O1xuICB9XG5cbiAgY3JlYXRlSW1hZ2VEYXRhKHJlY3RhbmdsZSkge1xuICAgIHRoaXMucmVjdGFuZ2xlID0gcmVjdGFuZ2xlID8gcmVjdGFuZ2xlIDogbmV3IFJlY3RhbmdsZSgwLCAwLCB0aGlzLmVsZW1lbnQud2lkdGgsIHRoaXMuZWxlbWVudC5oZWlnaHQpO1xuICAgIHRoaXMuaW1hZ2VEYXRhID0gdGhpcy5jb250ZXh0LmNyZWF0ZUltYWdlRGF0YSh0aGlzLnJlY3RhbmdsZS53aWR0aCwgdGhpcy5yZWN0YW5nbGUuaGVpZ2h0KTtcbiAgICB0aGlzLmNvbnRleHQucHV0SW1hZ2VEYXRhKHRoaXMuaW1hZ2VEYXRhLCB0aGlzLnJlY3RhbmdsZS54LCB0aGlzLnJlY3RhbmdsZS55KTtcbiAgfVxuXG4gIG9uUHJvdG9uVXBkYXRlKCkge1xuICAgIHRoaXMuY29udGV4dC5jbGVhclJlY3QodGhpcy5yZWN0YW5nbGUueCwgdGhpcy5yZWN0YW5nbGUueSwgdGhpcy5yZWN0YW5nbGUud2lkdGgsIHRoaXMucmVjdGFuZ2xlLmhlaWdodCk7XG4gICAgdGhpcy5pbWFnZURhdGEgPSB0aGlzLmNvbnRleHQuZ2V0SW1hZ2VEYXRhKFxuICAgICAgdGhpcy5yZWN0YW5nbGUueCxcbiAgICAgIHRoaXMucmVjdGFuZ2xlLnksXG4gICAgICB0aGlzLnJlY3RhbmdsZS53aWR0aCxcbiAgICAgIHRoaXMucmVjdGFuZ2xlLmhlaWdodFxuICAgICk7XG4gIH1cblxuICBvblByb3RvblVwZGF0ZUFmdGVyKCkge1xuICAgIHRoaXMuY29udGV4dC5wdXRJbWFnZURhdGEodGhpcy5pbWFnZURhdGEsIHRoaXMucmVjdGFuZ2xlLngsIHRoaXMucmVjdGFuZ2xlLnkpO1xuICB9XG5cbiAgb25QYXJ0aWNsZUNyZWF0ZWQocGFydGljbGUpIHt9XG5cbiAgb25QYXJ0aWNsZVVwZGF0ZShwYXJ0aWNsZSkge1xuICAgIGlmICh0aGlzLmltYWdlRGF0YSkge1xuICAgICAgdGhpcy5zZXRQaXhlbChcbiAgICAgICAgdGhpcy5pbWFnZURhdGEsXG4gICAgICAgIChwYXJ0aWNsZS5wLnggLSB0aGlzLnJlY3RhbmdsZS54KSA+PiAwLFxuICAgICAgICAocGFydGljbGUucC55IC0gdGhpcy5yZWN0YW5nbGUueSkgPj4gMCxcbiAgICAgICAgcGFydGljbGVcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgc2V0UGl4ZWwoaW1hZ2VkYXRhLCB4LCB5LCBwYXJ0aWNsZSkge1xuICAgIGNvbnN0IHJnYiA9IHBhcnRpY2xlLnJnYjtcbiAgICBpZiAoeCA8IDAgfHwgeCA+IHRoaXMuZWxlbWVudC53aWR0aCB8fCB5IDwgMCB8fCB5ID4gdGhpcy5lbGVtZW50d2lkdGgpIHJldHVybjtcblxuICAgIGNvbnN0IGkgPSAoKHkgPj4gMCkgKiBpbWFnZWRhdGEud2lkdGggKyAoeCA+PiAwKSkgKiA0O1xuICAgIGltYWdlZGF0YS5kYXRhW2ldID0gcmdiLnI7XG4gICAgaW1hZ2VkYXRhLmRhdGFbaSArIDFdID0gcmdiLmc7XG4gICAgaW1hZ2VkYXRhLmRhdGFbaSArIDJdID0gcmdiLmI7XG4gICAgaW1hZ2VkYXRhLmRhdGFbaSArIDNdID0gcGFydGljbGUuYWxwaGEgKiAyNTU7XG4gIH1cblxuICBvblBhcnRpY2xlRGVhZChwYXJ0aWNsZSkge31cblxuICBkZXN0cm95KCkge1xuICAgIHN1cGVyLmRlc3Ryb3koKTtcbiAgICB0aGlzLnN0cm9rZSA9IG51bGw7XG4gICAgdGhpcy5jb250ZXh0ID0gbnVsbDtcbiAgICB0aGlzLmltYWdlRGF0YSA9IG51bGw7XG4gICAgdGhpcy5yZWN0YW5nbGUgPSBudWxsO1xuICB9XG59XG4iLCJpbXBvcnQgVHlwZXMgZnJvbSBcIi4uL3V0aWxzL1R5cGVzXCI7XG5pbXBvcnQgQ29sb3JVdGlsIGZyb20gXCIuLi91dGlscy9Db2xvclV0aWxcIjtcbmltcG9ydCBNYXRoVXRpbCBmcm9tIFwiLi4vbWF0aC9NYXRoVXRpbFwiO1xuaW1wb3J0IEJhc2VSZW5kZXJlciBmcm9tIFwiLi9CYXNlUmVuZGVyZXJcIjtcblxubGV0IFBJWElDbGFzcztcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBpeGlSZW5kZXJlciBleHRlbmRzIEJhc2VSZW5kZXJlciB7XG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQsIHN0cm9rZSkge1xuICAgIHN1cGVyKGVsZW1lbnQpO1xuXG4gICAgdGhpcy5zdHJva2UgPSBzdHJva2U7XG4gICAgdGhpcy5jb2xvciA9IGZhbHNlO1xuICAgIHRoaXMuc2V0Q29sb3IgPSBmYWxzZTtcbiAgICB0aGlzLmJsZW5kTW9kZSA9IG51bGw7XG4gICAgdGhpcy5wb29sLmNyZWF0ZSA9IChib2R5LCBwYXJ0aWNsZSkgPT4gdGhpcy5jcmVhdGVCb2R5KGJvZHksIHBhcnRpY2xlKTtcbiAgICB0aGlzLnNldFBJWEkod2luZG93LlBJWEkpO1xuXG4gICAgdGhpcy5uYW1lID0gXCJQaXhpUmVuZGVyZXJcIjtcbiAgfVxuXG4gIHNldFBJWEkoUElYSSkge1xuICAgIHRyeSB7XG4gICAgICBQSVhJQ2xhc3MgPSBQSVhJIHx8IHsgU3ByaXRlOiB7fSB9O1xuICAgICAgdGhpcy5jcmVhdGVGcm9tSW1hZ2UgPSBQSVhJQ2xhc3MuU3ByaXRlLmZyb20gfHwgUElYSUNsYXNzLlNwcml0ZS5mcm9tSW1hZ2U7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgfVxuXG4gIG9uUHJvdG9uVXBkYXRlKCkge31cblxuICAvKipcbiAgICogQHBhcmFtIHBhcnRpY2xlXG4gICAqL1xuICBvblBhcnRpY2xlQ3JlYXRlZChwYXJ0aWNsZSkge1xuICAgIGlmIChwYXJ0aWNsZS5ib2R5KSB7XG4gICAgICBwYXJ0aWNsZS5ib2R5ID0gdGhpcy5wb29sLmdldChwYXJ0aWNsZS5ib2R5LCBwYXJ0aWNsZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhcnRpY2xlLmJvZHkgPSB0aGlzLnBvb2wuZ2V0KHRoaXMuY2lyY2xlQ29uZiwgcGFydGljbGUpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmJsZW5kTW9kZSkge1xuICAgICAgcGFydGljbGUuYm9keS5ibGVuZE1vZGUgPSB0aGlzLmJsZW5kTW9kZTtcbiAgICB9XG5cbiAgICB0aGlzLmVsZW1lbnQuYWRkQ2hpbGQocGFydGljbGUuYm9keSk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHBhcnRpY2xlXG4gICAqL1xuICBvblBhcnRpY2xlVXBkYXRlKHBhcnRpY2xlKSB7XG4gICAgdGhpcy50cmFuc2Zvcm0ocGFydGljbGUsIHBhcnRpY2xlLmJvZHkpO1xuXG4gICAgaWYgKHRoaXMuc2V0Q29sb3IgPT09IHRydWUgfHwgdGhpcy5jb2xvciA9PT0gdHJ1ZSkge1xuICAgICAgcGFydGljbGUuYm9keS50aW50ID0gQ29sb3JVdGlsLmdldEhleDE2RnJvbVBhcnRpY2xlKHBhcnRpY2xlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHBhcnRpY2xlXG4gICAqL1xuICBvblBhcnRpY2xlRGVhZChwYXJ0aWNsZSkge1xuICAgIHRoaXMuZWxlbWVudC5yZW1vdmVDaGlsZChwYXJ0aWNsZS5ib2R5KTtcbiAgICB0aGlzLnBvb2wuZXhwaXJlKHBhcnRpY2xlLmJvZHkpO1xuICAgIHBhcnRpY2xlLmJvZHkgPSBudWxsO1xuICB9XG5cbiAgdHJhbnNmb3JtKHBhcnRpY2xlLCB0YXJnZXQpIHtcbiAgICB0YXJnZXQueCA9IHBhcnRpY2xlLnAueDtcbiAgICB0YXJnZXQueSA9IHBhcnRpY2xlLnAueTtcblxuICAgIHRhcmdldC5hbHBoYSA9IHBhcnRpY2xlLmFscGhhO1xuXG4gICAgdGFyZ2V0LnNjYWxlLnggPSBwYXJ0aWNsZS5zY2FsZTtcbiAgICB0YXJnZXQuc2NhbGUueSA9IHBhcnRpY2xlLnNjYWxlO1xuXG4gICAgLy8gdXNpbmcgY2FjaGVkIHZlcnNpb24gb2YgTWF0aFV0aWwuUElfMTgwIGZvciBzbGlnaHQgcGVyZm9ybWFuY2UgaW5jcmVhc2UuXG4gICAgdGFyZ2V0LnJvdGF0aW9uID0gcGFydGljbGUucm90YXRpb24gKiBNYXRoVXRpbC5QSV8xODA7IC8vIE1hdGhVdGlsLlBJXzE4MDtcbiAgfVxuXG4gIGNyZWF0ZUJvZHkoYm9keSwgcGFydGljbGUpIHtcbiAgICBpZiAoYm9keS5pc0NpcmNsZSkgcmV0dXJuIHRoaXMuY3JlYXRlQ2lyY2xlKHBhcnRpY2xlKTtcbiAgICBlbHNlIHJldHVybiB0aGlzLmNyZWF0ZVNwcml0ZShib2R5KTtcbiAgfVxuXG4gIGNyZWF0ZVNwcml0ZShib2R5KSB7XG4gICAgY29uc3Qgc3ByaXRlID0gYm9keS5pc0lubmVyID8gdGhpcy5jcmVhdGVGcm9tSW1hZ2UoYm9keS5zcmMpIDogbmV3IFBJWElDbGFzcy5TcHJpdGUoYm9keSk7XG5cbiAgICBzcHJpdGUuYW5jaG9yLnggPSAwLjU7XG4gICAgc3ByaXRlLmFuY2hvci55ID0gMC41O1xuXG4gICAgcmV0dXJuIHNwcml0ZTtcbiAgfVxuXG4gIGNyZWF0ZUNpcmNsZShwYXJ0aWNsZSkge1xuICAgIGNvbnN0IGdyYXBoaWNzID0gbmV3IFBJWElDbGFzcy5HcmFwaGljcygpO1xuXG4gICAgaWYgKHRoaXMuc3Ryb2tlKSB7XG4gICAgICBjb25zdCBzdHJva2UgPSBUeXBlcy5pc1N0cmluZyh0aGlzLnN0cm9rZSkgPyB0aGlzLnN0cm9rZSA6IDB4MDAwMDAwO1xuICAgICAgZ3JhcGhpY3MuYmVnaW5TdHJva2Uoc3Ryb2tlKTtcbiAgICB9XG5cbiAgICBncmFwaGljcy5iZWdpbkZpbGwocGFydGljbGUuY29sb3IgfHwgMHgwMDhjZWQpO1xuICAgIGdyYXBoaWNzLmRyYXdDaXJjbGUoMCwgMCwgcGFydGljbGUucmFkaXVzKTtcbiAgICBncmFwaGljcy5lbmRGaWxsKCk7XG5cbiAgICByZXR1cm4gZ3JhcGhpY3M7XG4gIH1cblxuICBkZXN0cm95KHBhcnRpY2xlcykge1xuICAgIHN1cGVyLmRlc3Ryb3koKTtcblxuICAgIGxldCBpID0gcGFydGljbGVzLmxlbmd0aDtcbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICBsZXQgcGFydGljbGUgPSBwYXJ0aWNsZXNbaV07XG4gICAgICBpZiAocGFydGljbGUuYm9keSkge1xuICAgICAgICB0aGlzLmVsZW1lbnQucmVtb3ZlQ2hpbGQocGFydGljbGUuYm9keSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgTWF0MyBmcm9tIFwiLi4vbWF0aC9NYXQzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1TdGFjayB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMubWF0cyA9IFtdO1xuICAgIHRoaXMuc2l6ZSA9IDA7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDIwOyBpKyspIHRoaXMubWF0cy5wdXNoKE1hdDMuY3JlYXRlKFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSkpO1xuICB9XG5cbiAgc2V0KG0sIGkpIHtcbiAgICBpZiAoaSA9PT0gMCkgTWF0My5zZXQobSwgdGhpcy5tYXRzWzBdKTtcbiAgICBlbHNlIE1hdDMubXVsdGlwbHkodGhpcy5tYXRzW2kgLSAxXSwgbSwgdGhpcy5tYXRzW2ldKTtcblxuICAgIHRoaXMuc2l6ZSA9IE1hdGgubWF4KHRoaXMuc2l6ZSwgaSArIDEpO1xuICB9XG5cbiAgcHVzaChtKSB7XG4gICAgaWYgKHRoaXMuc2l6ZSA9PT0gMCkgTWF0My5zZXQobSwgdGhpcy5tYXRzWzBdKTtcbiAgICBlbHNlIE1hdDMubXVsdGlwbHkodGhpcy5tYXRzW3RoaXMuc2l6ZSAtIDFdLCBtLCB0aGlzLm1hdHNbdGhpcy5zaXplXSk7XG5cbiAgICB0aGlzLnNpemUrKztcbiAgfVxuXG4gIHBvcCgpIHtcbiAgICBpZiAodGhpcy5zaXplID4gMCkgdGhpcy5zaXplLS07XG4gIH1cblxuICB0b3AoKSB7XG4gICAgcmV0dXJuIHRoaXMubWF0c1t0aGlzLnNpemUgLSAxXTtcbiAgfVxufVxuIiwiaW1wb3J0IE1hdDMgZnJvbSBcIi4uL21hdGgvTWF0M1wiO1xuaW1wb3J0IEJhc2VSZW5kZXJlciBmcm9tIFwiLi9CYXNlUmVuZGVyZXJcIjtcblxuaW1wb3J0IFV0aWwgZnJvbSBcIi4uL3V0aWxzL1V0aWxcIjtcbmltcG9ydCBJbWdVdGlsIGZyb20gXCIuLi91dGlscy9JbWdVdGlsXCI7XG5pbXBvcnQgTVN0YWNrIGZyb20gXCIuLi91dGlscy9NU3RhY2tcIjtcbmltcG9ydCBEb21VdGlsIGZyb20gXCIuLi91dGlscy9Eb21VdGlsXCI7XG5pbXBvcnQgV2ViR0xVdGlsIGZyb20gXCIuLi91dGlscy9XZWJHTFV0aWxcIjtcbmltcG9ydCBNYXRoVXRpbCBmcm9tIFwiLi4vbWF0aC9NYXRoVXRpbFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXZWJHTFJlbmRlcmVyIGV4dGVuZHMgQmFzZVJlbmRlcmVyIHtcbiAgY29uc3RydWN0b3IoZWxlbWVudCkge1xuICAgIHN1cGVyKGVsZW1lbnQpO1xuXG4gICAgdGhpcy5nbCA9IHRoaXMuZWxlbWVudC5nZXRDb250ZXh0KFwiZXhwZXJpbWVudGFsLXdlYmdsXCIsIHsgYW50aWFsaWFzOiB0cnVlLCBzdGVuY2lsOiBmYWxzZSwgZGVwdGg6IGZhbHNlIH0pO1xuICAgIGlmICghdGhpcy5nbCkgYWxlcnQoXCJTb3JyeSB5b3VyIGJyb3dzZXIgZG8gbm90IHN1cHBlc3QgV2ViR0whXCIpO1xuXG4gICAgdGhpcy5pbml0VmFyKCk7XG4gICAgdGhpcy5zZXRNYXhSYWRpdXMoKTtcbiAgICB0aGlzLmluaXRTaGFkZXJzKCk7XG4gICAgdGhpcy5pbml0QnVmZmVycygpO1xuXG4gICAgdGhpcy5nbC5ibGVuZEVxdWF0aW9uKHRoaXMuZ2wuRlVOQ19BREQpO1xuICAgIHRoaXMuZ2wuYmxlbmRGdW5jKHRoaXMuZ2wuU1JDX0FMUEhBLCB0aGlzLmdsLk9ORV9NSU5VU19TUkNfQUxQSEEpO1xuICAgIHRoaXMuZ2wuZW5hYmxlKHRoaXMuZ2wuQkxFTkQpO1xuICAgIHRoaXMuYWRkSW1nMkJvZHkgPSB0aGlzLmFkZEltZzJCb2R5LmJpbmQodGhpcyk7XG5cbiAgICB0aGlzLm5hbWUgPSBcIldlYkdMUmVuZGVyZXJcIjtcbiAgfVxuXG4gIGluaXQocHJvdG9uKSB7XG4gICAgc3VwZXIuaW5pdChwcm90b24pO1xuICAgIHRoaXMucmVzaXplKHRoaXMuZWxlbWVudC53aWR0aCwgdGhpcy5lbGVtZW50LmhlaWdodCk7XG4gIH1cblxuICByZXNpemUod2lkdGgsIGhlaWdodCkge1xuICAgIHRoaXMudW1hdFs0XSA9IC0yO1xuICAgIHRoaXMudW1hdFs3XSA9IDE7XG5cbiAgICB0aGlzLnNtYXRbMF0gPSAxIC8gd2lkdGg7XG4gICAgdGhpcy5zbWF0WzRdID0gMSAvIGhlaWdodDtcblxuICAgIHRoaXMubXN0YWNrLnNldCh0aGlzLnVtYXQsIDApO1xuICAgIHRoaXMubXN0YWNrLnNldCh0aGlzLnNtYXQsIDEpO1xuXG4gICAgdGhpcy5nbC52aWV3cG9ydCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICB0aGlzLmVsZW1lbnQud2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLmVsZW1lbnQuaGVpZ2h0ID0gaGVpZ2h0O1xuICB9XG5cbiAgc2V0TWF4UmFkaXVzKHJhZGl1cykge1xuICAgIHRoaXMuY2lyY2xlQ2FudmFzVVJMID0gdGhpcy5jcmVhdGVDaXJjbGUocmFkaXVzKTtcbiAgfVxuXG4gIGdldFZlcnRleFNoYWRlcigpIHtcbiAgICBjb25zdCB2c1NvdXJjZSA9IFtcbiAgICAgIFwidW5pZm9ybSB2ZWMyIHZpZXdwb3J0O1wiLFxuICAgICAgXCJhdHRyaWJ1dGUgdmVjMiBhVmVydGV4UG9zaXRpb247XCIsXG4gICAgICBcImF0dHJpYnV0ZSB2ZWMyIGFUZXh0dXJlQ29vcmQ7XCIsXG4gICAgICBcInVuaWZvcm0gbWF0MyB0TWF0O1wiLFxuICAgICAgXCJ2YXJ5aW5nIHZlYzIgdlRleHR1cmVDb29yZDtcIixcbiAgICAgIFwidmFyeWluZyBmbG9hdCBhbHBoYTtcIixcbiAgICAgIFwidm9pZCBtYWluKCkge1wiLFxuICAgICAgXCJ2ZWMzIHYgPSB0TWF0ICogdmVjMyhhVmVydGV4UG9zaXRpb24sIDEuMCk7XCIsXG4gICAgICBcImdsX1Bvc2l0aW9uID0gdmVjNCh2LngsIHYueSwgMCwgMSk7XCIsXG4gICAgICBcInZUZXh0dXJlQ29vcmQgPSBhVGV4dHVyZUNvb3JkO1wiLFxuICAgICAgXCJhbHBoYSA9IHRNYXRbMF1bMl07XCIsXG4gICAgICBcIn1cIlxuICAgIF0uam9pbihcIlxcblwiKTtcbiAgICByZXR1cm4gdnNTb3VyY2U7XG4gIH1cblxuICBnZXRGcmFnbWVudFNoYWRlcigpIHtcbiAgICBjb25zdCBmc1NvdXJjZSA9IFtcbiAgICAgIFwicHJlY2lzaW9uIG1lZGl1bXAgZmxvYXQ7XCIsXG4gICAgICBcInZhcnlpbmcgdmVjMiB2VGV4dHVyZUNvb3JkO1wiLFxuICAgICAgXCJ2YXJ5aW5nIGZsb2F0IGFscGhhO1wiLFxuICAgICAgXCJ1bmlmb3JtIHNhbXBsZXIyRCB1U2FtcGxlcjtcIixcbiAgICAgIFwidW5pZm9ybSB2ZWM0IGNvbG9yO1wiLFxuICAgICAgXCJ1bmlmb3JtIGJvb2wgdXNlVGV4dHVyZTtcIixcbiAgICAgIFwidW5pZm9ybSB2ZWMzIHVDb2xvcjtcIixcbiAgICAgIFwidm9pZCBtYWluKCkge1wiLFxuICAgICAgXCJ2ZWM0IHRleHR1cmVDb2xvciA9IHRleHR1cmUyRCh1U2FtcGxlciwgdlRleHR1cmVDb29yZCk7XCIsXG4gICAgICBcImdsX0ZyYWdDb2xvciA9IHRleHR1cmVDb2xvciAqIHZlYzQodUNvbG9yLCAxLjApO1wiLFxuICAgICAgXCJnbF9GcmFnQ29sb3IudyAqPSBhbHBoYTtcIixcbiAgICAgIFwifVwiXG4gICAgXS5qb2luKFwiXFxuXCIpO1xuICAgIHJldHVybiBmc1NvdXJjZTtcbiAgfVxuXG4gIGluaXRWYXIoKSB7XG4gICAgdGhpcy5tc3RhY2sgPSBuZXcgTVN0YWNrKCk7XG4gICAgdGhpcy51bWF0ID0gTWF0My5jcmVhdGUoWzIsIDAsIDEsIDAsIC0yLCAwLCAtMSwgMSwgMV0pO1xuICAgIHRoaXMuc21hdCA9IE1hdDMuY3JlYXRlKFsxIC8gMTAwLCAwLCAxLCAwLCAxIC8gMTAwLCAwLCAwLCAwLCAxXSk7XG4gICAgdGhpcy50ZXh0dXJlYnVmZmVycyA9IHt9O1xuICB9XG5cbiAgYmxlbmRFcXVhdGlvbihBKSB7XG4gICAgdGhpcy5nbC5ibGVuZEVxdWF0aW9uKHRoaXMuZ2xbQV0pO1xuICB9XG5cbiAgYmxlbmRGdW5jKEEsIEIpIHtcbiAgICB0aGlzLmdsLmJsZW5kRnVuYyh0aGlzLmdsW0FdLCB0aGlzLmdsW0JdKTtcbiAgfVxuXG4gIGdldFNoYWRlcihnbCwgc3RyLCBmcykge1xuICAgIGNvbnN0IHNoYWRlciA9IGZzID8gZ2wuY3JlYXRlU2hhZGVyKGdsLkZSQUdNRU5UX1NIQURFUikgOiBnbC5jcmVhdGVTaGFkZXIoZ2wuVkVSVEVYX1NIQURFUik7XG5cbiAgICBnbC5zaGFkZXJTb3VyY2Uoc2hhZGVyLCBzdHIpO1xuICAgIGdsLmNvbXBpbGVTaGFkZXIoc2hhZGVyKTtcblxuICAgIGlmICghZ2wuZ2V0U2hhZGVyUGFyYW1ldGVyKHNoYWRlciwgZ2wuQ09NUElMRV9TVEFUVVMpKSB7XG4gICAgICBhbGVydChnbC5nZXRTaGFkZXJJbmZvTG9nKHNoYWRlcikpO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNoYWRlcjtcbiAgfVxuXG4gIGluaXRTaGFkZXJzKCkge1xuICAgIGNvbnN0IGZyYWdtZW50U2hhZGVyID0gdGhpcy5nZXRTaGFkZXIodGhpcy5nbCwgdGhpcy5nZXRGcmFnbWVudFNoYWRlcigpLCB0cnVlKTtcbiAgICBjb25zdCB2ZXJ0ZXhTaGFkZXIgPSB0aGlzLmdldFNoYWRlcih0aGlzLmdsLCB0aGlzLmdldFZlcnRleFNoYWRlcigpLCBmYWxzZSk7XG5cbiAgICB0aGlzLnNwcm9ncmFtID0gdGhpcy5nbC5jcmVhdGVQcm9ncmFtKCk7XG4gICAgdGhpcy5nbC5hdHRhY2hTaGFkZXIodGhpcy5zcHJvZ3JhbSwgdmVydGV4U2hhZGVyKTtcbiAgICB0aGlzLmdsLmF0dGFjaFNoYWRlcih0aGlzLnNwcm9ncmFtLCBmcmFnbWVudFNoYWRlcik7XG4gICAgdGhpcy5nbC5saW5rUHJvZ3JhbSh0aGlzLnNwcm9ncmFtKTtcblxuICAgIGlmICghdGhpcy5nbC5nZXRQcm9ncmFtUGFyYW1ldGVyKHRoaXMuc3Byb2dyYW0sIHRoaXMuZ2wuTElOS19TVEFUVVMpKSBhbGVydChcIkNvdWxkIG5vdCBpbml0aWFsaXNlIHNoYWRlcnNcIik7XG5cbiAgICB0aGlzLmdsLnVzZVByb2dyYW0odGhpcy5zcHJvZ3JhbSk7XG4gICAgdGhpcy5zcHJvZ3JhbS52cGEgPSB0aGlzLmdsLmdldEF0dHJpYkxvY2F0aW9uKHRoaXMuc3Byb2dyYW0sIFwiYVZlcnRleFBvc2l0aW9uXCIpO1xuICAgIHRoaXMuc3Byb2dyYW0udGNhID0gdGhpcy5nbC5nZXRBdHRyaWJMb2NhdGlvbih0aGlzLnNwcm9ncmFtLCBcImFUZXh0dXJlQ29vcmRcIik7XG4gICAgdGhpcy5nbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheSh0aGlzLnNwcm9ncmFtLnRjYSk7XG4gICAgdGhpcy5nbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheSh0aGlzLnNwcm9ncmFtLnZwYSk7XG5cbiAgICB0aGlzLnNwcm9ncmFtLnRNYXRVbmlmb3JtID0gdGhpcy5nbC5nZXRVbmlmb3JtTG9jYXRpb24odGhpcy5zcHJvZ3JhbSwgXCJ0TWF0XCIpO1xuICAgIHRoaXMuc3Byb2dyYW0uc2FtcGxlclVuaWZvcm0gPSB0aGlzLmdsLmdldFVuaWZvcm1Mb2NhdGlvbih0aGlzLnNwcm9ncmFtLCBcInVTYW1wbGVyXCIpO1xuICAgIHRoaXMuc3Byb2dyYW0udXNlVGV4ID0gdGhpcy5nbC5nZXRVbmlmb3JtTG9jYXRpb24odGhpcy5zcHJvZ3JhbSwgXCJ1c2VUZXh0dXJlXCIpO1xuICAgIHRoaXMuc3Byb2dyYW0uY29sb3IgPSB0aGlzLmdsLmdldFVuaWZvcm1Mb2NhdGlvbih0aGlzLnNwcm9ncmFtLCBcInVDb2xvclwiKTtcbiAgICB0aGlzLmdsLnVuaWZvcm0xaSh0aGlzLnNwcm9ncmFtLnVzZVRleCwgMSk7XG4gIH1cblxuICBpbml0QnVmZmVycygpIHtcbiAgICBjb25zdCB2cyA9IFswLCAzLCAxLCAwLCAyLCAzXTtcbiAgICBsZXQgaWR4O1xuXG4gICAgdGhpcy51bml0SUJ1ZmZlciA9IHRoaXMuZ2wuY3JlYXRlQnVmZmVyKCk7XG4gICAgdGhpcy5nbC5iaW5kQnVmZmVyKHRoaXMuZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIHRoaXMudW5pdElCdWZmZXIpO1xuICAgIHRoaXMuZ2wuYnVmZmVyRGF0YSh0aGlzLmdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCBuZXcgVWludDE2QXJyYXkodnMpLCB0aGlzLmdsLlNUQVRJQ19EUkFXKTtcblxuICAgIGxldCBpO1xuICAgIGxldCBpZHMgPSBbXTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgMTAwOyBpKyspIGlkcy5wdXNoKGkpO1xuICAgIGlkeCA9IG5ldyBVaW50MTZBcnJheShpZHMpO1xuXG4gICAgdGhpcy51bml0STMzID0gdGhpcy5nbC5jcmVhdGVCdWZmZXIoKTtcbiAgICB0aGlzLmdsLmJpbmRCdWZmZXIodGhpcy5nbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgdGhpcy51bml0STMzKTtcbiAgICB0aGlzLmdsLmJ1ZmZlckRhdGEodGhpcy5nbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgaWR4LCB0aGlzLmdsLlNUQVRJQ19EUkFXKTtcblxuICAgIGlkcyA9IFtdO1xuICAgIGZvciAoaSA9IDA7IGkgPCAxMDA7IGkrKykgaWRzLnB1c2goaSwgaSArIDEsIGkgKyAyKTtcbiAgICBpZHggPSBuZXcgVWludDE2QXJyYXkoaWRzKTtcblxuICAgIHRoaXMuc3RyaXBCdWZmZXIgPSB0aGlzLmdsLmNyZWF0ZUJ1ZmZlcigpO1xuICAgIHRoaXMuZ2wuYmluZEJ1ZmZlcih0aGlzLmdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCB0aGlzLnN0cmlwQnVmZmVyKTtcbiAgICB0aGlzLmdsLmJ1ZmZlckRhdGEodGhpcy5nbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgaWR4LCB0aGlzLmdsLlNUQVRJQ19EUkFXKTtcbiAgfVxuXG4gIGNyZWF0ZUNpcmNsZShyYWlkdXMpIHtcbiAgICB0aGlzLmNpcmNsZUNhbnZhc1JhZGl1cyA9IFdlYkdMVXRpbC5uaHBvdChVdGlsLmluaXRWYWx1ZShyYWlkdXMsIDMyKSk7XG4gICAgY29uc3QgY2FudmFzID0gRG9tVXRpbC5jcmVhdGVDYW52YXMoXCJjaXJjbGVfY2FudmFzXCIsIHRoaXMuY2lyY2xlQ2FudmFzUmFkaXVzICogMiwgdGhpcy5jaXJjbGVDYW52YXNSYWRpdXMgKiAyKTtcbiAgICBjb25zdCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxuICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgY29udGV4dC5hcmModGhpcy5jaXJjbGVDYW52YXNSYWRpdXMsIHRoaXMuY2lyY2xlQ2FudmFzUmFkaXVzLCB0aGlzLmNpcmNsZUNhbnZhc1JhZGl1cywgMCwgTWF0aC5QSSAqIDIsIHRydWUpO1xuICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XG4gICAgY29udGV4dC5maWxsU3R5bGUgPSBcIiNGRkZcIjtcbiAgICBjb250ZXh0LmZpbGwoKTtcblxuICAgIHJldHVybiBjYW52YXMudG9EYXRhVVJMKCk7XG4gIH1cblxuICBkcmF3SW1nMkNhbnZhcyhwYXJ0aWNsZSkge1xuICAgIGNvbnN0IF93ID0gcGFydGljbGUuYm9keS53aWR0aDtcbiAgICBjb25zdCBfaCA9IHBhcnRpY2xlLmJvZHkuaGVpZ2h0O1xuXG4gICAgY29uc3QgX3dpZHRoID0gV2ViR0xVdGlsLm5ocG90KHBhcnRpY2xlLmJvZHkud2lkdGgpO1xuICAgIGNvbnN0IF9oZWlnaHQgPSBXZWJHTFV0aWwubmhwb3QocGFydGljbGUuYm9keS5oZWlnaHQpO1xuXG4gICAgY29uc3QgX3NjYWxlWCA9IHBhcnRpY2xlLmJvZHkud2lkdGggLyBfd2lkdGg7XG4gICAgY29uc3QgX3NjYWxlWSA9IHBhcnRpY2xlLmJvZHkuaGVpZ2h0IC8gX2hlaWdodDtcblxuICAgIGlmICghdGhpcy50ZXh0dXJlYnVmZmVyc1twYXJ0aWNsZS5kYXRhLnNyY10pXG4gICAgICB0aGlzLnRleHR1cmVidWZmZXJzW3BhcnRpY2xlLmRhdGEuc3JjXSA9IFtcbiAgICAgICAgdGhpcy5nbC5jcmVhdGVUZXh0dXJlKCksXG4gICAgICAgIHRoaXMuZ2wuY3JlYXRlQnVmZmVyKCksXG4gICAgICAgIHRoaXMuZ2wuY3JlYXRlQnVmZmVyKClcbiAgICAgIF07XG5cbiAgICBwYXJ0aWNsZS5kYXRhLnRleHR1cmUgPSB0aGlzLnRleHR1cmVidWZmZXJzW3BhcnRpY2xlLmRhdGEuc3JjXVswXTtcbiAgICBwYXJ0aWNsZS5kYXRhLnZjQnVmZmVyID0gdGhpcy50ZXh0dXJlYnVmZmVyc1twYXJ0aWNsZS5kYXRhLnNyY11bMV07XG4gICAgcGFydGljbGUuZGF0YS50Y0J1ZmZlciA9IHRoaXMudGV4dHVyZWJ1ZmZlcnNbcGFydGljbGUuZGF0YS5zcmNdWzJdO1xuXG4gICAgdGhpcy5nbC5iaW5kQnVmZmVyKHRoaXMuZ2wuQVJSQVlfQlVGRkVSLCBwYXJ0aWNsZS5kYXRhLnRjQnVmZmVyKTtcbiAgICB0aGlzLmdsLmJ1ZmZlckRhdGEoXG4gICAgICB0aGlzLmdsLkFSUkFZX0JVRkZFUixcbiAgICAgIG5ldyBGbG9hdDMyQXJyYXkoWzAuMCwgMC4wLCBfc2NhbGVYLCAwLjAsIDAuMCwgX3NjYWxlWSwgX3NjYWxlWSwgX3NjYWxlWV0pLFxuICAgICAgdGhpcy5nbC5TVEFUSUNfRFJBV1xuICAgICk7XG4gICAgdGhpcy5nbC5iaW5kQnVmZmVyKHRoaXMuZ2wuQVJSQVlfQlVGRkVSLCBwYXJ0aWNsZS5kYXRhLnZjQnVmZmVyKTtcbiAgICB0aGlzLmdsLmJ1ZmZlckRhdGEoXG4gICAgICB0aGlzLmdsLkFSUkFZX0JVRkZFUixcbiAgICAgIG5ldyBGbG9hdDMyQXJyYXkoWzAuMCwgMC4wLCBfdywgMC4wLCAwLjAsIF9oLCBfdywgX2hdKSxcbiAgICAgIHRoaXMuZ2wuU1RBVElDX0RSQVdcbiAgICApO1xuXG4gICAgY29uc3QgY29udGV4dCA9IHBhcnRpY2xlLmRhdGEuY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICBjb25zdCBkYXRhID0gY29udGV4dC5nZXRJbWFnZURhdGEoMCwgMCwgX3dpZHRoLCBfaGVpZ2h0KTtcblxuICAgIHRoaXMuZ2wuYmluZFRleHR1cmUodGhpcy5nbC5URVhUVVJFXzJELCBwYXJ0aWNsZS5kYXRhLnRleHR1cmUpO1xuICAgIHRoaXMuZ2wudGV4SW1hZ2UyRCh0aGlzLmdsLlRFWFRVUkVfMkQsIDAsIHRoaXMuZ2wuUkdCQSwgdGhpcy5nbC5SR0JBLCB0aGlzLmdsLlVOU0lHTkVEX0JZVEUsIGRhdGEpO1xuICAgIHRoaXMuZ2wudGV4UGFyYW1ldGVyaSh0aGlzLmdsLlRFWFRVUkVfMkQsIHRoaXMuZ2wuVEVYVFVSRV9NQUdfRklMVEVSLCB0aGlzLmdsLkxJTkVBUik7XG4gICAgdGhpcy5nbC50ZXhQYXJhbWV0ZXJpKHRoaXMuZ2wuVEVYVFVSRV8yRCwgdGhpcy5nbC5URVhUVVJFX01JTl9GSUxURVIsIHRoaXMuZ2wuTElORUFSX01JUE1BUF9ORUFSRVNUKTtcbiAgICB0aGlzLmdsLmdlbmVyYXRlTWlwbWFwKHRoaXMuZ2wuVEVYVFVSRV8yRCk7XG5cbiAgICBwYXJ0aWNsZS5kYXRhLnRleHR1cmVMb2FkZWQgPSB0cnVlO1xuICAgIHBhcnRpY2xlLmRhdGEudGV4dHVyZVdpZHRoID0gX3c7XG4gICAgcGFydGljbGUuZGF0YS50ZXh0dXJlSGVpZ2h0ID0gX2g7XG4gIH1cblxuICBvblByb3RvblVwZGF0ZSgpIHtcbiAgICAvLyB0aGlzLmdsLmNsZWFyQ29sb3IoMCwgMCwgMCwgMSk7XG4gICAgLy8gdGhpcy5nbC5jbGVhcih0aGlzLmdsLkNPTE9SX0JVRkZFUl9CSVQgfCB0aGlzLmdsLkRFUFRIX0JVRkZFUl9CSVQpO1xuICB9XG5cbiAgb25QYXJ0aWNsZUNyZWF0ZWQocGFydGljbGUpIHtcbiAgICBwYXJ0aWNsZS5kYXRhLnRleHR1cmVMb2FkZWQgPSBmYWxzZTtcbiAgICBwYXJ0aWNsZS5kYXRhLnRtYXQgPSBNYXQzLmNyZWF0ZSgpO1xuICAgIHBhcnRpY2xlLmRhdGEudG1hdFs4XSA9IDE7XG4gICAgcGFydGljbGUuZGF0YS5pbWF0ID0gTWF0My5jcmVhdGUoKTtcbiAgICBwYXJ0aWNsZS5kYXRhLmltYXRbOF0gPSAxO1xuXG4gICAgaWYgKHBhcnRpY2xlLmJvZHkpIHtcbiAgICAgIEltZ1V0aWwuZ2V0SW1nRnJvbUNhY2hlKHBhcnRpY2xlLmJvZHksIHRoaXMuYWRkSW1nMkJvZHksIHBhcnRpY2xlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgSW1nVXRpbC5nZXRJbWdGcm9tQ2FjaGUodGhpcy5jaXJjbGVDYW52YXNVUkwsIHRoaXMuYWRkSW1nMkJvZHksIHBhcnRpY2xlKTtcbiAgICAgIHBhcnRpY2xlLmRhdGEub2xkU2NhbGUgPSBwYXJ0aWNsZS5yYWRpdXMgLyB0aGlzLmNpcmNsZUNhbnZhc1JhZGl1cztcbiAgICB9XG4gIH1cblxuICAvLyBwcml2YXRlXG4gIGFkZEltZzJCb2R5KGltZywgcGFydGljbGUpIHtcbiAgICBpZiAocGFydGljbGUuZGVhZCkgcmV0dXJuO1xuICAgIHBhcnRpY2xlLmJvZHkgPSBpbWc7XG4gICAgcGFydGljbGUuZGF0YS5zcmMgPSBpbWcuc3JjO1xuICAgIHBhcnRpY2xlLmRhdGEuY2FudmFzID0gSW1nVXRpbC5nZXRDYW52YXNGcm9tQ2FjaGUoaW1nKTtcbiAgICBwYXJ0aWNsZS5kYXRhLm9sZFNjYWxlID0gMTtcblxuICAgIHRoaXMuZHJhd0ltZzJDYW52YXMocGFydGljbGUpO1xuICB9XG5cbiAgb25QYXJ0aWNsZVVwZGF0ZShwYXJ0aWNsZSkge1xuICAgIGlmIChwYXJ0aWNsZS5kYXRhLnRleHR1cmVMb2FkZWQpIHtcbiAgICAgIHRoaXMudXBkYXRlTWF0cml4KHBhcnRpY2xlKTtcblxuICAgICAgdGhpcy5nbC51bmlmb3JtM2YodGhpcy5zcHJvZ3JhbS5jb2xvciwgcGFydGljbGUucmdiLnIgLyAyNTUsIHBhcnRpY2xlLnJnYi5nIC8gMjU1LCBwYXJ0aWNsZS5yZ2IuYiAvIDI1NSk7XG4gICAgICB0aGlzLmdsLnVuaWZvcm1NYXRyaXgzZnYodGhpcy5zcHJvZ3JhbS50TWF0VW5pZm9ybSwgZmFsc2UsIHRoaXMubXN0YWNrLnRvcCgpKTtcblxuICAgICAgdGhpcy5nbC5iaW5kQnVmZmVyKHRoaXMuZ2wuQVJSQVlfQlVGRkVSLCBwYXJ0aWNsZS5kYXRhLnZjQnVmZmVyKTtcbiAgICAgIHRoaXMuZ2wudmVydGV4QXR0cmliUG9pbnRlcih0aGlzLnNwcm9ncmFtLnZwYSwgMiwgdGhpcy5nbC5GTE9BVCwgZmFsc2UsIDAsIDApO1xuICAgICAgdGhpcy5nbC5iaW5kQnVmZmVyKHRoaXMuZ2wuQVJSQVlfQlVGRkVSLCBwYXJ0aWNsZS5kYXRhLnRjQnVmZmVyKTtcbiAgICAgIHRoaXMuZ2wudmVydGV4QXR0cmliUG9pbnRlcih0aGlzLnNwcm9ncmFtLnRjYSwgMiwgdGhpcy5nbC5GTE9BVCwgZmFsc2UsIDAsIDApO1xuICAgICAgdGhpcy5nbC5iaW5kVGV4dHVyZSh0aGlzLmdsLlRFWFRVUkVfMkQsIHBhcnRpY2xlLmRhdGEudGV4dHVyZSk7XG4gICAgICB0aGlzLmdsLnVuaWZvcm0xaSh0aGlzLnNwcm9ncmFtLnNhbXBsZXJVbmlmb3JtLCAwKTtcbiAgICAgIHRoaXMuZ2wuYmluZEJ1ZmZlcih0aGlzLmdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCB0aGlzLnVuaXRJQnVmZmVyKTtcblxuICAgICAgdGhpcy5nbC5kcmF3RWxlbWVudHModGhpcy5nbC5UUklBTkdMRVMsIDYsIHRoaXMuZ2wuVU5TSUdORURfU0hPUlQsIDApO1xuICAgICAgdGhpcy5tc3RhY2sucG9wKCk7XG4gICAgfVxuICB9XG5cbiAgb25QYXJ0aWNsZURlYWQocGFydGljbGUpIHt9XG5cbiAgdXBkYXRlTWF0cml4KHBhcnRpY2xlKSB7XG4gICAgY29uc3QgbW92ZU9yaWdpbk1hdHJpeCA9IFdlYkdMVXRpbC5tYWtlVHJhbnNsYXRpb24oXG4gICAgICAtcGFydGljbGUuZGF0YS50ZXh0dXJlV2lkdGggLyAyLFxuICAgICAgLXBhcnRpY2xlLmRhdGEudGV4dHVyZUhlaWdodCAvIDJcbiAgICApO1xuICAgIGNvbnN0IHRyYW5zbGF0aW9uTWF0cml4ID0gV2ViR0xVdGlsLm1ha2VUcmFuc2xhdGlvbihwYXJ0aWNsZS5wLngsIHBhcnRpY2xlLnAueSk7XG5cbiAgICBjb25zdCBhbmdlbCA9IHBhcnRpY2xlLnJvdGF0aW9uICogTWF0aFV0aWwuUElfMTgwO1xuICAgIGNvbnN0IHJvdGF0aW9uTWF0cml4ID0gV2ViR0xVdGlsLm1ha2VSb3RhdGlvbihhbmdlbCk7XG5cbiAgICBjb25zdCBzY2FsZSA9IHBhcnRpY2xlLnNjYWxlICogcGFydGljbGUuZGF0YS5vbGRTY2FsZTtcbiAgICBjb25zdCBzY2FsZU1hdHJpeCA9IFdlYkdMVXRpbC5tYWtlU2NhbGUoc2NhbGUsIHNjYWxlKTtcbiAgICBsZXQgbWF0cml4ID0gV2ViR0xVdGlsLm1hdHJpeE11bHRpcGx5KG1vdmVPcmlnaW5NYXRyaXgsIHNjYWxlTWF0cml4KTtcblxuICAgIG1hdHJpeCA9IFdlYkdMVXRpbC5tYXRyaXhNdWx0aXBseShtYXRyaXgsIHJvdGF0aW9uTWF0cml4KTtcbiAgICBtYXRyaXggPSBXZWJHTFV0aWwubWF0cml4TXVsdGlwbHkobWF0cml4LCB0cmFuc2xhdGlvbk1hdHJpeCk7XG5cbiAgICBNYXQzLmludmVyc2UobWF0cml4LCBwYXJ0aWNsZS5kYXRhLmltYXQpO1xuICAgIG1hdHJpeFsyXSA9IHBhcnRpY2xlLmFscGhhO1xuXG4gICAgdGhpcy5tc3RhY2sucHVzaChtYXRyaXgpO1xuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICBzdXBlci5kZXN0cm95KCk7XG4gICAgdGhpcy5nbCA9IG51bGw7XG4gICAgdGhpcy5tc3RhY2sgPSBudWxsO1xuICAgIHRoaXMudW1hdCA9IG51bGw7XG4gICAgdGhpcy5zbWF0ID0gbnVsbDtcbiAgICB0aGlzLnRleHR1cmVidWZmZXJzID0gbnVsbDtcbiAgfVxufVxuIiwiaW1wb3J0IEJhc2VSZW5kZXJlciBmcm9tIFwiLi9CYXNlUmVuZGVyZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ3VzdG9tUmVuZGVyZXIgZXh0ZW5kcyBCYXNlUmVuZGVyZXIge1xuICBjb25zdHJ1Y3RvcihlbGVtZW50KSB7XG4gICAgc3VwZXIoZWxlbWVudCk7XG5cbiAgICB0aGlzLm5hbWUgPSBcIkN1c3RvbVJlbmRlcmVyXCI7XG4gIH1cbn1cbiIsImltcG9ydCBab25lIGZyb20gXCIuL1pvbmVcIjtcbmltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlscy9VdGlsXCI7XG5pbXBvcnQgTWF0aFV0aWwgZnJvbSBcIi4uL21hdGgvTWF0aFV0aWxcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGluZVpvbmUgZXh0ZW5kcyBab25lIHtcbiAgY29uc3RydWN0b3IoeDEsIHkxLCB4MiwgeTIsIGRpcmVjdGlvbikge1xuICAgIHN1cGVyKCk7XG5cbiAgICBpZiAoeDIgLSB4MSA+PSAwKSB7XG4gICAgICB0aGlzLngxID0geDE7XG4gICAgICB0aGlzLnkxID0geTE7XG4gICAgICB0aGlzLngyID0geDI7XG4gICAgICB0aGlzLnkyID0geTI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMueDEgPSB4MjtcbiAgICAgIHRoaXMueTEgPSB5MjtcbiAgICAgIHRoaXMueDIgPSB4MTtcbiAgICAgIHRoaXMueTIgPSB5MTtcbiAgICB9XG5cbiAgICB0aGlzLmR4ID0gdGhpcy54MiAtIHRoaXMueDE7XG4gICAgdGhpcy5keSA9IHRoaXMueTIgLSB0aGlzLnkxO1xuXG4gICAgdGhpcy5taW54ID0gTWF0aC5taW4odGhpcy54MSwgdGhpcy54Mik7XG4gICAgdGhpcy5taW55ID0gTWF0aC5taW4odGhpcy55MSwgdGhpcy55Mik7XG4gICAgdGhpcy5tYXh4ID0gTWF0aC5tYXgodGhpcy54MSwgdGhpcy54Mik7XG4gICAgdGhpcy5tYXh5ID0gTWF0aC5tYXgodGhpcy55MSwgdGhpcy55Mik7XG5cbiAgICB0aGlzLmRvdCA9IHRoaXMueDIgKiB0aGlzLnkxIC0gdGhpcy54MSAqIHRoaXMueTI7XG4gICAgdGhpcy54eHl5ID0gdGhpcy5keCAqIHRoaXMuZHggKyB0aGlzLmR5ICogdGhpcy5keTtcblxuICAgIHRoaXMuZ3JhZGllbnQgPSB0aGlzLmdldEdyYWRpZW50KCk7XG4gICAgdGhpcy5sZW5ndGggPSB0aGlzLmdldExlbmd0aCgpO1xuICAgIHRoaXMuZGlyZWN0aW9uID0gVXRpbC5pbml0VmFsdWUoZGlyZWN0aW9uLCBcIj5cIik7XG4gIH1cblxuICBnZXRQb3NpdGlvbigpIHtcbiAgICB0aGlzLnJhbmRvbSA9IE1hdGgucmFuZG9tKCk7XG4gICAgdGhpcy52ZWN0b3IueCA9IHRoaXMueDEgKyB0aGlzLnJhbmRvbSAqIHRoaXMubGVuZ3RoICogTWF0aC5jb3ModGhpcy5ncmFkaWVudCk7XG4gICAgdGhpcy52ZWN0b3IueSA9IHRoaXMueTEgKyB0aGlzLnJhbmRvbSAqIHRoaXMubGVuZ3RoICogTWF0aC5zaW4odGhpcy5ncmFkaWVudCk7XG5cbiAgICByZXR1cm4gdGhpcy52ZWN0b3I7XG4gIH1cblxuICBnZXREaXJlY3Rpb24oeCwgeSkge1xuICAgIGNvbnN0IEEgPSB0aGlzLmR5O1xuICAgIGNvbnN0IEIgPSAtdGhpcy5keDtcbiAgICBjb25zdCBDID0gdGhpcy5kb3Q7XG4gICAgY29uc3QgRCA9IEIgPT09IDAgPyAxIDogQjtcblxuICAgIGlmICgoQSAqIHggKyBCICogeSArIEMpICogRCA+IDApIHJldHVybiB0cnVlO1xuICAgIGVsc2UgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZ2V0RGlzdGFuY2UoeCwgeSkge1xuICAgIGNvbnN0IEEgPSB0aGlzLmR5O1xuICAgIGNvbnN0IEIgPSAtdGhpcy5keDtcbiAgICBjb25zdCBDID0gdGhpcy5kb3Q7XG4gICAgY29uc3QgRCA9IEEgKiB4ICsgQiAqIHkgKyBDO1xuXG4gICAgcmV0dXJuIEQgLyBNYXRoLnNxcnQodGhpcy54eHl5KTtcbiAgfVxuXG4gIGdldFN5bW1ldHJpYyh2KSB7XG4gICAgY29uc3QgdGhhMiA9IHYuZ2V0R3JhZGllbnQoKTtcbiAgICBjb25zdCB0aGExID0gdGhpcy5nZXRHcmFkaWVudCgpO1xuICAgIGNvbnN0IHRoYSA9IDIgKiAodGhhMSAtIHRoYTIpO1xuXG4gICAgY29uc3Qgb2xkeCA9IHYueDtcbiAgICBjb25zdCBvbGR5ID0gdi55O1xuXG4gICAgdi54ID0gb2xkeCAqIE1hdGguY29zKHRoYSkgLSBvbGR5ICogTWF0aC5zaW4odGhhKTtcbiAgICB2LnkgPSBvbGR4ICogTWF0aC5zaW4odGhhKSArIG9sZHkgKiBNYXRoLmNvcyh0aGEpO1xuXG4gICAgcmV0dXJuIHY7XG4gIH1cblxuICBnZXRHcmFkaWVudCgpIHtcbiAgICByZXR1cm4gTWF0aC5hdGFuMih0aGlzLmR5LCB0aGlzLmR4KTtcbiAgfVxuXG4gIHJhbmdlT3V0KHBhcnRpY2xlKSB7XG4gICAgY29uc3QgYW5nbGUgPSBNYXRoLmFicyh0aGlzLmdldEdyYWRpZW50KCkpO1xuXG4gICAgaWYgKGFuZ2xlIDw9IE1hdGhVdGlsLlBJIC8gNCkge1xuICAgICAgaWYgKHBhcnRpY2xlLnAueCA8PSB0aGlzLm1heHggJiYgcGFydGljbGUucC54ID49IHRoaXMubWlueCkgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChwYXJ0aWNsZS5wLnkgPD0gdGhpcy5tYXh5ICYmIHBhcnRpY2xlLnAueSA+PSB0aGlzLm1pbnkpIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGdldExlbmd0aCgpIHtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KHRoaXMuZHggKiB0aGlzLmR4ICsgdGhpcy5keSAqIHRoaXMuZHkpO1xuICB9XG5cbiAgY3Jvc3NpbmcocGFydGljbGUpIHtcbiAgICBpZiAodGhpcy5jcm9zc1R5cGUgPT09IFwiZGVhZFwiKSB7XG4gICAgICBpZiAodGhpcy5kaXJlY3Rpb24gPT09IFwiPlwiIHx8IHRoaXMuZGlyZWN0aW9uID09PSBcIlJcIiB8fCB0aGlzLmRpcmVjdGlvbiA9PT0gXCJyaWdodFwiIHx8IHRoaXMuZGlyZWN0aW9uID09PSBcImRvd25cIikge1xuICAgICAgICBpZiAoIXRoaXMucmFuZ2VPdXQocGFydGljbGUpKSByZXR1cm47XG4gICAgICAgIGlmICh0aGlzLmdldERpcmVjdGlvbihwYXJ0aWNsZS5wLngsIHBhcnRpY2xlLnAueSkpIHBhcnRpY2xlLmRlYWQgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKCF0aGlzLnJhbmdlT3V0KHBhcnRpY2xlKSkgcmV0dXJuO1xuICAgICAgICBpZiAoIXRoaXMuZ2V0RGlyZWN0aW9uKHBhcnRpY2xlLnAueCwgcGFydGljbGUucC55KSkgcGFydGljbGUuZGVhZCA9IHRydWU7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0aGlzLmNyb3NzVHlwZSA9PT0gXCJib3VuZFwiKSB7XG4gICAgICBpZiAoIXRoaXMucmFuZ2VPdXQocGFydGljbGUpKSByZXR1cm47XG5cbiAgICAgIGlmICh0aGlzLmdldERpc3RhbmNlKHBhcnRpY2xlLnAueCwgcGFydGljbGUucC55KSA8PSBwYXJ0aWNsZS5yYWRpdXMpIHtcbiAgICAgICAgaWYgKHRoaXMuZHggPT09IDApIHtcbiAgICAgICAgICBwYXJ0aWNsZS52LnggKj0gLTE7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5keSA9PT0gMCkge1xuICAgICAgICAgIHBhcnRpY2xlLnYueSAqPSAtMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmdldFN5bW1ldHJpYyhwYXJ0aWNsZS52KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy5jcm9zc1R5cGUgPT09IFwiY3Jvc3NcIikge1xuICAgICAgaWYgKHRoaXMuYWxlcnQpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIlNvcnJ5LCBMaW5lWm9uZSBkb2VzIG5vdCBzdXBwb3J0IGNyb3NzIG1ldGhvZCFcIik7XG4gICAgICAgIHRoaXMuYWxlcnQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBab25lIGZyb20gXCIuL1pvbmVcIjtcbmltcG9ydCBNYXRoVXRpbCBmcm9tIFwiLi4vbWF0aC9NYXRoVXRpbFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDaXJjbGVab25lIGV4dGVuZHMgWm9uZSB7XG4gIGNvbnN0cnVjdG9yKHgsIHksIHJhZGl1cykge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG4gICAgdGhpcy5yYWRpdXMgPSByYWRpdXM7XG4gICAgdGhpcy5hbmdsZSA9IDA7XG4gICAgdGhpcy5jZW50ZXIgPSB7IHgsIHkgfTtcbiAgfVxuXG4gIGdldFBvc2l0aW9uKCkge1xuICAgIHRoaXMuYW5nbGUgPSBNYXRoVXRpbC5QSXgyICogTWF0aC5yYW5kb20oKTtcbiAgICB0aGlzLnJhbmRvbVJhZGl1cyA9IE1hdGgucmFuZG9tKCkgKiB0aGlzLnJhZGl1cztcbiAgICB0aGlzLnZlY3Rvci54ID0gdGhpcy54ICsgdGhpcy5yYW5kb21SYWRpdXMgKiBNYXRoLmNvcyh0aGlzLmFuZ2xlKTtcbiAgICB0aGlzLnZlY3Rvci55ID0gdGhpcy55ICsgdGhpcy5yYW5kb21SYWRpdXMgKiBNYXRoLnNpbih0aGlzLmFuZ2xlKTtcblxuICAgIHJldHVybiB0aGlzLnZlY3RvcjtcbiAgfVxuXG4gIHNldENlbnRlcih4LCB5KSB7XG4gICAgdGhpcy5jZW50ZXIueCA9IHg7XG4gICAgdGhpcy5jZW50ZXIueSA9IHk7XG4gIH1cblxuICBjcm9zc2luZyhwYXJ0aWNsZSkge1xuICAgIGNvbnN0IGQgPSBwYXJ0aWNsZS5wLmRpc3RhbmNlVG8odGhpcy5jZW50ZXIpO1xuXG4gICAgaWYgKHRoaXMuY3Jvc3NUeXBlID09PSBcImRlYWRcIikge1xuICAgICAgaWYgKGQgLSBwYXJ0aWNsZS5yYWRpdXMgPiB0aGlzLnJhZGl1cykgcGFydGljbGUuZGVhZCA9IHRydWU7XG4gICAgfSBlbHNlIGlmICh0aGlzLmNyb3NzVHlwZSA9PT0gXCJib3VuZFwiKSB7XG4gICAgICBpZiAoZCArIHBhcnRpY2xlLnJhZGl1cyA+PSB0aGlzLnJhZGl1cykgdGhpcy5nZXRTeW1tZXRyaWMocGFydGljbGUpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5jcm9zc1R5cGUgPT09IFwiY3Jvc3NcIikge1xuICAgICAgaWYgKHRoaXMuYWxlcnQpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIlNvcnJ5LCBDaXJjbGVab25lIGRvZXMgbm90IHN1cHBvcnQgY3Jvc3MgbWV0aG9kIVwiKTtcbiAgICAgICAgdGhpcy5hbGVydCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdldFN5bW1ldHJpYyhwYXJ0aWNsZSkge1xuICAgIGNvbnN0IHRoYTIgPSBwYXJ0aWNsZS52LmdldEdyYWRpZW50KCk7XG4gICAgY29uc3QgdGhhMSA9IHRoaXMuZ2V0R3JhZGllbnQocGFydGljbGUpO1xuXG4gICAgY29uc3QgdGhhID0gMiAqICh0aGExIC0gdGhhMik7XG4gICAgY29uc3Qgb2xkeCA9IHBhcnRpY2xlLnYueDtcbiAgICBjb25zdCBvbGR5ID0gcGFydGljbGUudi55O1xuXG4gICAgcGFydGljbGUudi54ID0gb2xkeCAqIE1hdGguY29zKHRoYSkgLSBvbGR5ICogTWF0aC5zaW4odGhhKTtcbiAgICBwYXJ0aWNsZS52LnkgPSBvbGR4ICogTWF0aC5zaW4odGhhKSArIG9sZHkgKiBNYXRoLmNvcyh0aGEpO1xuICB9XG5cbiAgZ2V0R3JhZGllbnQocGFydGljbGUpIHtcbiAgICByZXR1cm4gLU1hdGhVdGlsLlBJXzIgKyBNYXRoLmF0YW4yKHBhcnRpY2xlLnAueSAtIHRoaXMuY2VudGVyLnksIHBhcnRpY2xlLnAueCAtIHRoaXMuY2VudGVyLngpO1xuICB9XG59XG4iLCJpbXBvcnQgWm9uZSBmcm9tIFwiLi9ab25lXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlY3Rab25lIGV4dGVuZHMgWm9uZSB7XG4gIGNvbnN0cnVjdG9yKHgsIHksIHdpZHRoLCBoZWlnaHQpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAgfVxuXG4gIGdldFBvc2l0aW9uKCkge1xuICAgIHRoaXMudmVjdG9yLnggPSB0aGlzLnggKyBNYXRoLnJhbmRvbSgpICogdGhpcy53aWR0aDtcbiAgICB0aGlzLnZlY3Rvci55ID0gdGhpcy55ICsgTWF0aC5yYW5kb20oKSAqIHRoaXMuaGVpZ2h0O1xuXG4gICAgcmV0dXJuIHRoaXMudmVjdG9yO1xuICB9XG5cbiAgY3Jvc3NpbmcocGFydGljbGUpIHtcbiAgICAvLyBwYXJ0aWNsZSBkZWFkIHpvbmVcbiAgICBpZiAodGhpcy5jcm9zc1R5cGUgPT09IFwiZGVhZFwiKSB7XG4gICAgICBpZiAocGFydGljbGUucC54ICsgcGFydGljbGUucmFkaXVzIDwgdGhpcy54KSBwYXJ0aWNsZS5kZWFkID0gdHJ1ZTtcbiAgICAgIGVsc2UgaWYgKHBhcnRpY2xlLnAueCAtIHBhcnRpY2xlLnJhZGl1cyA+IHRoaXMueCArIHRoaXMud2lkdGgpIHBhcnRpY2xlLmRlYWQgPSB0cnVlO1xuXG4gICAgICBpZiAocGFydGljbGUucC55ICsgcGFydGljbGUucmFkaXVzIDwgdGhpcy55KSBwYXJ0aWNsZS5kZWFkID0gdHJ1ZTtcbiAgICAgIGVsc2UgaWYgKHBhcnRpY2xlLnAueSAtIHBhcnRpY2xlLnJhZGl1cyA+IHRoaXMueSArIHRoaXMuaGVpZ2h0KSBwYXJ0aWNsZS5kZWFkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBwYXJ0aWNsZSBib3VuZCB6b25lXG4gICAgZWxzZSBpZiAodGhpcy5jcm9zc1R5cGUgPT09IFwiYm91bmRcIikge1xuICAgICAgaWYgKHBhcnRpY2xlLnAueCAtIHBhcnRpY2xlLnJhZGl1cyA8IHRoaXMueCkge1xuICAgICAgICBwYXJ0aWNsZS5wLnggPSB0aGlzLnggKyBwYXJ0aWNsZS5yYWRpdXM7XG4gICAgICAgIHBhcnRpY2xlLnYueCAqPSAtMTtcbiAgICAgIH0gZWxzZSBpZiAocGFydGljbGUucC54ICsgcGFydGljbGUucmFkaXVzID4gdGhpcy54ICsgdGhpcy53aWR0aCkge1xuICAgICAgICBwYXJ0aWNsZS5wLnggPSB0aGlzLnggKyB0aGlzLndpZHRoIC0gcGFydGljbGUucmFkaXVzO1xuICAgICAgICBwYXJ0aWNsZS52LnggKj0gLTE7XG4gICAgICB9XG5cbiAgICAgIGlmIChwYXJ0aWNsZS5wLnkgLSBwYXJ0aWNsZS5yYWRpdXMgPCB0aGlzLnkpIHtcbiAgICAgICAgcGFydGljbGUucC55ID0gdGhpcy55ICsgcGFydGljbGUucmFkaXVzO1xuICAgICAgICBwYXJ0aWNsZS52LnkgKj0gLTE7XG4gICAgICB9IGVsc2UgaWYgKHBhcnRpY2xlLnAueSArIHBhcnRpY2xlLnJhZGl1cyA+IHRoaXMueSArIHRoaXMuaGVpZ2h0KSB7XG4gICAgICAgIHBhcnRpY2xlLnAueSA9IHRoaXMueSArIHRoaXMuaGVpZ2h0IC0gcGFydGljbGUucmFkaXVzO1xuICAgICAgICBwYXJ0aWNsZS52LnkgKj0gLTE7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gcGFydGljbGUgY3Jvc3Mgem9uZVxuICAgIGVsc2UgaWYgKHRoaXMuY3Jvc3NUeXBlID09PSBcImNyb3NzXCIpIHtcbiAgICAgIGlmIChwYXJ0aWNsZS5wLnggKyBwYXJ0aWNsZS5yYWRpdXMgPCB0aGlzLnggJiYgcGFydGljbGUudi54IDw9IDApIHtcbiAgICAgICAgcGFydGljbGUucC54ID0gdGhpcy54ICsgdGhpcy53aWR0aCArIHBhcnRpY2xlLnJhZGl1cztcbiAgICAgIH0gZWxzZSBpZiAocGFydGljbGUucC54IC0gcGFydGljbGUucmFkaXVzID4gdGhpcy54ICsgdGhpcy53aWR0aCAmJiBwYXJ0aWNsZS52LnggPj0gMCkge1xuICAgICAgICBwYXJ0aWNsZS5wLnggPSB0aGlzLnggLSBwYXJ0aWNsZS5yYWRpdXM7XG4gICAgICB9XG5cbiAgICAgIGlmIChwYXJ0aWNsZS5wLnkgKyBwYXJ0aWNsZS5yYWRpdXMgPCB0aGlzLnkgJiYgcGFydGljbGUudi55IDw9IDApIHtcbiAgICAgICAgcGFydGljbGUucC55ID0gdGhpcy55ICsgdGhpcy5oZWlnaHQgKyBwYXJ0aWNsZS5yYWRpdXM7XG4gICAgICB9IGVsc2UgaWYgKHBhcnRpY2xlLnAueSAtIHBhcnRpY2xlLnJhZGl1cyA+IHRoaXMueSArIHRoaXMuaGVpZ2h0ICYmIHBhcnRpY2xlLnYueSA+PSAwKSB7XG4gICAgICAgIHBhcnRpY2xlLnAueSA9IHRoaXMueSAtIHBhcnRpY2xlLnJhZGl1cztcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBab25lIGZyb20gXCIuL1pvbmVcIjtcbmltcG9ydCBVdGlsIGZyb20gXCIuLi91dGlscy9VdGlsXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEltYWdlWm9uZSBleHRlbmRzIFpvbmUge1xuICBjb25zdHJ1Y3RvcihpbWFnZURhdGEsIHgsIHksIGQpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMucmVzZXQoaW1hZ2VEYXRhLCB4LCB5LCBkKTtcbiAgfVxuXG4gIHJlc2V0KGltYWdlRGF0YSwgeCwgeSwgZCkge1xuICAgIHRoaXMuaW1hZ2VEYXRhID0gaW1hZ2VEYXRhO1xuICAgIHRoaXMueCA9IFV0aWwuaW5pdFZhbHVlKHgsIDApO1xuICAgIHRoaXMueSA9IFV0aWwuaW5pdFZhbHVlKHksIDApO1xuICAgIHRoaXMuZCA9IFV0aWwuaW5pdFZhbHVlKGQsIDIpO1xuXG4gICAgdGhpcy52ZWN0b3JzID0gW107XG4gICAgdGhpcy5zZXRWZWN0b3JzKCk7XG4gIH1cblxuICBzZXRWZWN0b3JzKCkge1xuICAgIGxldCBpLCBqO1xuICAgIGNvbnN0IGxlbmd0aDEgPSB0aGlzLmltYWdlRGF0YS53aWR0aDtcbiAgICBjb25zdCBsZW5ndGgyID0gdGhpcy5pbWFnZURhdGEuaGVpZ2h0O1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDE7IGkgKz0gdGhpcy5kKSB7XG4gICAgICBmb3IgKGogPSAwOyBqIDwgbGVuZ3RoMjsgaiArPSB0aGlzLmQpIHtcbiAgICAgICAgbGV0IGluZGV4ID0gKChqID4+IDApICogbGVuZ3RoMSArIChpID4+IDApKSAqIDQ7XG5cbiAgICAgICAgaWYgKHRoaXMuaW1hZ2VEYXRhLmRhdGFbaW5kZXggKyAzXSA+IDApIHtcbiAgICAgICAgICB0aGlzLnZlY3RvcnMucHVzaCh7IHg6IGkgKyB0aGlzLngsIHk6IGogKyB0aGlzLnkgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy52ZWN0b3I7XG4gIH1cblxuICBnZXRCb3VuZCh4LCB5KSB7XG4gICAgY29uc3QgaW5kZXggPSAoKHkgPj4gMCkgKiB0aGlzLmltYWdlRGF0YS53aWR0aCArICh4ID4+IDApKSAqIDQ7XG4gICAgaWYgKHRoaXMuaW1hZ2VEYXRhLmRhdGFbaW5kZXggKyAzXSA+IDApIHJldHVybiB0cnVlO1xuICAgIGVsc2UgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZ2V0UG9zaXRpb24oKSB7XG4gICAgY29uc3QgdmVjdG9yID0gVXRpbC5nZXRSYW5kRnJvbUFycmF5KHRoaXMudmVjdG9ycyk7XG4gICAgcmV0dXJuIHRoaXMudmVjdG9yLmNvcHkodmVjdG9yKTtcbiAgfVxuXG4gIGdldENvbG9yKHgsIHkpIHtcbiAgICB4IC09IHRoaXMueDtcbiAgICB5IC09IHRoaXMueTtcbiAgICBjb25zdCBpID0gKCh5ID4+IDApICogdGhpcy5pbWFnZURhdGEud2lkdGggKyAoeCA+PiAwKSkgKiA0O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHI6IHRoaXMuaW1hZ2VEYXRhLmRhdGFbaV0sXG4gICAgICBnOiB0aGlzLmltYWdlRGF0YS5kYXRhW2kgKyAxXSxcbiAgICAgIGI6IHRoaXMuaW1hZ2VEYXRhLmRhdGFbaSArIDJdLFxuICAgICAgYTogdGhpcy5pbWFnZURhdGEuZGF0YVtpICsgM11cbiAgICB9O1xuICB9XG5cbiAgY3Jvc3NpbmcocGFydGljbGUpIHtcbiAgICBpZiAodGhpcy5jcm9zc1R5cGUgPT09IFwiZGVhZFwiKSB7XG4gICAgICBpZiAodGhpcy5nZXRCb3VuZChwYXJ0aWNsZS5wLnggLSB0aGlzLngsIHBhcnRpY2xlLnAueSAtIHRoaXMueSkpIHBhcnRpY2xlLmRlYWQgPSB0cnVlO1xuICAgICAgZWxzZSBwYXJ0aWNsZS5kZWFkID0gZmFsc2U7XG4gICAgfSBlbHNlIGlmICh0aGlzLmNyb3NzVHlwZSA9PT0gXCJib3VuZFwiKSB7XG4gICAgICBpZiAoIXRoaXMuZ2V0Qm91bmQocGFydGljbGUucC54IC0gdGhpcy54LCBwYXJ0aWNsZS5wLnkgLSB0aGlzLnkpKSBwYXJ0aWNsZS52Lm5lZ2F0ZSgpO1xuICAgIH1cbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgc3VwZXIuZGVzdHJveSgpO1xuICAgIHRoaXMuaW1hZ2VEYXRhID0gbnVsbDtcbiAgfVxufVxuIiwiaW1wb3J0IENvbG9yVXRpbCBmcm9tIFwiLi4vdXRpbHMvQ29sb3JVdGlsXCI7XG5pbXBvcnQgQ2lyY2xlWm9uZSBmcm9tIFwiLi4vem9uZS9DaXJjbGVab25lXCI7XG5pbXBvcnQgUG9pbnRab25lIGZyb20gXCIuLi96b25lL1BvaW50Wm9uZVwiO1xuaW1wb3J0IExpbmVab25lIGZyb20gXCIuLi96b25lL0xpbmVab25lXCI7XG5pbXBvcnQgUmVjdFpvbmUgZnJvbSBcIi4uL3pvbmUvUmVjdFpvbmVcIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBhZGRFdmVudExpc3RlbmVyKHByb3RvbiwgZnVuYykge1xuICAgIHByb3Rvbi5hZGRFdmVudExpc3RlbmVyKFwiUFJPVE9OX1VQREFURV9BRlRFUlwiLCAoKSA9PiBmdW5jKCkpO1xuICB9LFxuXG4gIGdldFN0eWxlKGNvbG9yID0gXCIjZmYwMDAwXCIpIHtcbiAgICBjb25zdCByZ2IgPSBDb2xvclV0aWwuaGV4VG9SZ2IoY29sb3IpO1xuICAgIHJldHVybiBgcmdiYSgke3JnYi5yfSwgJHtyZ2IuZ30sICR7cmdiLmJ9LCAwLjUpYDtcbiAgfSxcblxuICBkcmF3Wm9uZShwcm90b24sIGNhbnZhcywgem9uZSwgY2xlYXIpIHtcbiAgICBjb25zdCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICBjb25zdCBzdHlsZSA9IHRoaXMuZ2V0U3R5bGUoKTtcblxuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihwcm90b24sICgpID0+IHtcbiAgICAgIGlmIChjbGVhcikgY29udGV4dC5jbGVhclJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcblxuICAgICAgaWYgKHpvbmUgaW5zdGFuY2VvZiBQb2ludFpvbmUpIHtcbiAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBzdHlsZTtcbiAgICAgICAgY29udGV4dC5hcmMoem9uZS54LCB6b25lLnksIDEwLCAwLCBNYXRoLlBJICogMiwgdHJ1ZSk7XG4gICAgICAgIGNvbnRleHQuZmlsbCgpO1xuICAgICAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xuICAgICAgfSBlbHNlIGlmICh6b25lIGluc3RhbmNlb2YgTGluZVpvbmUpIHtcbiAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgICAgY29udGV4dC5zdHJva2VTdHlsZSA9IHN0eWxlO1xuICAgICAgICBjb250ZXh0Lm1vdmVUbyh6b25lLngxLCB6b25lLnkxKTtcbiAgICAgICAgY29udGV4dC5saW5lVG8oem9uZS54Miwgem9uZS55Mik7XG4gICAgICAgIGNvbnRleHQuc3Ryb2tlKCk7XG4gICAgICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XG4gICAgICB9IGVsc2UgaWYgKHpvbmUgaW5zdGFuY2VvZiBSZWN0Wm9uZSkge1xuICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgICBjb250ZXh0LnN0cm9rZVN0eWxlID0gc3R5bGU7XG4gICAgICAgIGNvbnRleHQuZHJhd1JlY3Qoem9uZS54LCB6b25lLnksIHpvbmUud2lkdGgsIHpvbmUuaGVpZ2h0KTtcbiAgICAgICAgY29udGV4dC5zdHJva2UoKTtcbiAgICAgICAgY29udGV4dC5jbG9zZVBhdGgoKTtcbiAgICAgIH0gZWxzZSBpZiAoem9uZSBpbnN0YW5jZW9mIENpcmNsZVpvbmUpIHtcbiAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgICAgY29udGV4dC5zdHJva2VTdHlsZSA9IHN0eWxlO1xuICAgICAgICBjb250ZXh0LmFyYyh6b25lLngsIHpvbmUueSwgem9uZS5yYWRpdXMsIDAsIE1hdGguUEkgKiAyLCB0cnVlKTtcbiAgICAgICAgY29udGV4dC5zdHJva2UoKTtcbiAgICAgICAgY29udGV4dC5jbG9zZVBhdGgoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSxcblxuICBkcmF3RW1pdHRlcihwcm90b24sIGNhbnZhcywgZW1pdHRlciwgY2xlYXIpIHtcbiAgICBjb25zdCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICBjb25zdCBzdHlsZSA9IHRoaXMuZ2V0U3R5bGUoKTtcblxuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihwcm90b24sICgpID0+IHtcbiAgICAgIGlmIChjbGVhcikgY29udGV4dC5jbGVhclJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcblxuICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gc3R5bGU7XG4gICAgICBjb250ZXh0LmFyYyhlbWl0dGVyLnAueCwgZW1pdHRlci5wLnksIDEwLCAwLCBNYXRoLlBJICogMiwgdHJ1ZSk7XG4gICAgICBjb250ZXh0LmZpbGwoKTtcbiAgICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XG4gICAgfSk7XG4gIH1cbn07XG4iLCJpbXBvcnQgUHJvdG9uIGZyb20gXCIuL2NvcmUvUHJvdG9uXCI7XG5pbXBvcnQgUGFydGljbGUgZnJvbSBcIi4vY29yZS9QYXJ0aWNsZVwiO1xuaW1wb3J0IFBvb2wgZnJvbSBcIi4vY29yZS9Qb29sXCI7XG5cbmltcG9ydCBVdGlsIGZyb20gXCIuL3V0aWxzL1V0aWxcIjtcbmltcG9ydCBDb2xvclV0aWwgZnJvbSBcIi4vdXRpbHMvQ29sb3JVdGlsXCI7XG5pbXBvcnQgTWF0aFV0aWwgZnJvbSBcIi4vbWF0aC9NYXRoVXRpbFwiO1xuaW1wb3J0IFZlY3RvcjJEIGZyb20gXCIuL21hdGgvVmVjdG9yMkRcIjtcbmltcG9ydCBQb2xhcjJEIGZyb20gXCIuL21hdGgvUG9sYXIyRFwiO1xuaW1wb3J0IE1hdDMgZnJvbSBcIi4vbWF0aC9NYXQzXCI7XG5pbXBvcnQgU3BhbiBmcm9tIFwiLi9tYXRoL1NwYW5cIjtcbmltcG9ydCBBcnJheVNwYW4gZnJvbSBcIi4vbWF0aC9BcnJheVNwYW5cIjtcbmltcG9ydCBSZWN0YW5nbGUgZnJvbSBcIi4vbWF0aC9SZWN0YW5nbGVcIjtcbmltcG9ydCBlYXNlIGZyb20gXCIuL21hdGgvZWFzZVwiO1xuXG5pbXBvcnQgUmF0ZSBmcm9tIFwiLi9pbml0aWFsaXplL1JhdGVcIjtcbmltcG9ydCBJbml0aWFsaXplIGZyb20gXCIuL2luaXRpYWxpemUvSW5pdGlhbGl6ZVwiO1xuaW1wb3J0IExpZmUgZnJvbSBcIi4vaW5pdGlhbGl6ZS9MaWZlXCI7XG5pbXBvcnQgUG9zaXRpb24gZnJvbSBcIi4vaW5pdGlhbGl6ZS9Qb3NpdGlvblwiO1xuaW1wb3J0IFZlbG9jaXR5IGZyb20gXCIuL2luaXRpYWxpemUvVmVsb2NpdHlcIjtcbmltcG9ydCBNYXNzIGZyb20gXCIuL2luaXRpYWxpemUvTWFzc1wiO1xuaW1wb3J0IFJhZGl1cyBmcm9tIFwiLi9pbml0aWFsaXplL1JhZGl1c1wiO1xuaW1wb3J0IEJvZHkgZnJvbSBcIi4vaW5pdGlhbGl6ZS9Cb2R5XCI7XG5cbmltcG9ydCBCZWhhdmlvdXIgZnJvbSBcIi4vYmVoYXZpb3VyL0JlaGF2aW91clwiO1xuaW1wb3J0IEZvcmNlIGZyb20gXCIuL2JlaGF2aW91ci9Gb3JjZVwiO1xuaW1wb3J0IEF0dHJhY3Rpb24gZnJvbSBcIi4vYmVoYXZpb3VyL0F0dHJhY3Rpb25cIjtcbmltcG9ydCBSYW5kb21EcmlmdCBmcm9tIFwiLi9iZWhhdmlvdXIvUmFuZG9tRHJpZnRcIjtcbmltcG9ydCBHcmF2aXR5IGZyb20gXCIuL2JlaGF2aW91ci9HcmF2aXR5XCI7XG5pbXBvcnQgQ29sbGlzaW9uIGZyb20gXCIuL2JlaGF2aW91ci9Db2xsaXNpb25cIjtcbmltcG9ydCBDcm9zc1pvbmUgZnJvbSBcIi4vYmVoYXZpb3VyL0Nyb3NzWm9uZVwiO1xuaW1wb3J0IEFscGhhIGZyb20gXCIuL2JlaGF2aW91ci9BbHBoYVwiO1xuaW1wb3J0IFNjYWxlIGZyb20gXCIuL2JlaGF2aW91ci9TY2FsZVwiO1xuaW1wb3J0IFJvdGF0ZSBmcm9tIFwiLi9iZWhhdmlvdXIvUm90YXRlXCI7XG5pbXBvcnQgQ29sb3IgZnJvbSBcIi4vYmVoYXZpb3VyL0NvbG9yXCI7XG5pbXBvcnQgQ3ljbG9uZSBmcm9tIFwiLi9iZWhhdmlvdXIvQ3ljbG9uZVwiO1xuaW1wb3J0IFJlcHVsc2lvbiBmcm9tIFwiLi9iZWhhdmlvdXIvUmVwdWxzaW9uXCI7XG5pbXBvcnQgR3Jhdml0eVdlbGwgZnJvbSBcIi4vYmVoYXZpb3VyL0dyYXZpdHlXZWxsXCI7XG5cbmltcG9ydCBFbWl0dGVyIGZyb20gXCIuL2VtaXR0ZXIvRW1pdHRlclwiO1xuaW1wb3J0IEJlaGF2aW91ckVtaXR0ZXIgZnJvbSBcIi4vZW1pdHRlci9CZWhhdmlvdXJFbWl0dGVyXCI7XG5pbXBvcnQgRm9sbG93RW1pdHRlciBmcm9tIFwiLi9lbWl0dGVyL0ZvbGxvd0VtaXR0ZXJcIjtcblxuaW1wb3J0IENhbnZhc1JlbmRlcmVyIGZyb20gXCIuL3JlbmRlci9DYW52YXNSZW5kZXJlclwiO1xuaW1wb3J0IERvbVJlbmRlcmVyIGZyb20gXCIuL3JlbmRlci9Eb21SZW5kZXJlclwiO1xuaW1wb3J0IEVhc2VsUmVuZGVyZXIgZnJvbSBcIi4vcmVuZGVyL0Vhc2VsUmVuZGVyZXJcIjtcbmltcG9ydCBQaXhlbFJlbmRlcmVyIGZyb20gXCIuL3JlbmRlci9QaXhlbFJlbmRlcmVyXCI7XG5pbXBvcnQgUGl4aVJlbmRlcmVyIGZyb20gXCIuL3JlbmRlci9QaXhpUmVuZGVyZXJcIjtcbmltcG9ydCBXZWJHTFJlbmRlcmVyIGZyb20gXCIuL3JlbmRlci9XZWJHTFJlbmRlcmVyXCI7XG5pbXBvcnQgQ3VzdG9tUmVuZGVyZXIgZnJvbSBcIi4vcmVuZGVyL0N1c3RvbVJlbmRlcmVyXCI7XG5cbmltcG9ydCBab25lIGZyb20gXCIuL3pvbmUvWm9uZVwiO1xuaW1wb3J0IExpbmVab25lIGZyb20gXCIuL3pvbmUvTGluZVpvbmVcIjtcbmltcG9ydCBDaXJjbGVab25lIGZyb20gXCIuL3pvbmUvQ2lyY2xlWm9uZVwiO1xuaW1wb3J0IFBvaW50Wm9uZSBmcm9tIFwiLi96b25lL1BvaW50Wm9uZVwiO1xuaW1wb3J0IFJlY3Rab25lIGZyb20gXCIuL3pvbmUvUmVjdFpvbmVcIjtcbmltcG9ydCBJbWFnZVpvbmUgZnJvbSBcIi4vem9uZS9JbWFnZVpvbmVcIjtcblxuaW1wb3J0IERlYnVnIGZyb20gXCIuL2RlYnVnL0RlYnVnXCI7XG5cbi8vIG5hbWVzcGFjZVxuUHJvdG9uLlBhcnRpY2xlID0gUGFydGljbGU7XG5Qcm90b24uUG9vbCA9IFBvb2w7XG5cblByb3Rvbi5VdGlsID0gVXRpbDtcblByb3Rvbi5Db2xvclV0aWwgPSBDb2xvclV0aWw7XG5Qcm90b24uTWF0aFV0aWwgPSBNYXRoVXRpbDtcblByb3Rvbi5WZWN0b3IyRCA9IFByb3Rvbi5WZWN0b3IgPSBWZWN0b3IyRDtcblByb3Rvbi5Qb2xhcjJEID0gUHJvdG9uLlBvbGFyID0gUG9sYXIyRDtcblByb3Rvbi5BcnJheVNwYW4gPSBBcnJheVNwYW47XG5Qcm90b24uUmVjdGFuZ2xlID0gUmVjdGFuZ2xlO1xuUHJvdG9uLlJhdGUgPSBSYXRlO1xuUHJvdG9uLmVhc2UgPSBlYXNlO1xuUHJvdG9uLlNwYW4gPSBTcGFuO1xuUHJvdG9uLk1hdDMgPSBNYXQzO1xuUHJvdG9uLmdldFNwYW4gPSAoYSwgYiwgY2VudGVyKSA9PiBuZXcgU3BhbihhLCBiLCBjZW50ZXIpO1xuUHJvdG9uLmNyZWF0ZUFycmF5U3BhbiA9IEFycmF5U3Bhbi5jcmVhdGVBcnJheVNwYW47XG5cblByb3Rvbi5Jbml0aWFsaXplID0gUHJvdG9uLkluaXQgPSBJbml0aWFsaXplO1xuUHJvdG9uLkxpZmUgPSBQcm90b24uTCA9IExpZmU7XG5Qcm90b24uUG9zaXRpb24gPSBQcm90b24uUCA9IFBvc2l0aW9uO1xuUHJvdG9uLlZlbG9jaXR5ID0gUHJvdG9uLlYgPSBWZWxvY2l0eTtcblByb3Rvbi5NYXNzID0gUHJvdG9uLk0gPSBNYXNzO1xuUHJvdG9uLlJhZGl1cyA9IFByb3Rvbi5SID0gUmFkaXVzO1xuUHJvdG9uLkJvZHkgPSBQcm90b24uQiA9IEJvZHk7XG5cblByb3Rvbi5CZWhhdmlvdXIgPSBCZWhhdmlvdXI7XG5Qcm90b24uRm9yY2UgPSBQcm90b24uRiA9IEZvcmNlO1xuUHJvdG9uLkF0dHJhY3Rpb24gPSBQcm90b24uQSA9IEF0dHJhY3Rpb247XG5Qcm90b24uUmFuZG9tRHJpZnQgPSBQcm90b24uUkQgPSBSYW5kb21EcmlmdDtcblByb3Rvbi5HcmF2aXR5ID0gUHJvdG9uLkcgPSBHcmF2aXR5O1xuUHJvdG9uLkNvbGxpc2lvbiA9IENvbGxpc2lvbjtcblByb3Rvbi5Dcm9zc1pvbmUgPSBDcm9zc1pvbmU7XG5Qcm90b24uQWxwaGEgPSBBbHBoYTtcblByb3Rvbi5TY2FsZSA9IFByb3Rvbi5TID0gU2NhbGU7XG5Qcm90b24uUm90YXRlID0gUm90YXRlO1xuUHJvdG9uLkNvbG9yID0gQ29sb3I7XG5Qcm90b24uUmVwdWxzaW9uID0gUmVwdWxzaW9uO1xuUHJvdG9uLkN5Y2xvbmUgPSBDeWNsb25lO1xuUHJvdG9uLkdyYXZpdHlXZWxsID0gR3Jhdml0eVdlbGw7XG5cblByb3Rvbi5FbWl0dGVyID0gRW1pdHRlcjtcblByb3Rvbi5CZWhhdmlvdXJFbWl0dGVyID0gQmVoYXZpb3VyRW1pdHRlcjtcblByb3Rvbi5Gb2xsb3dFbWl0dGVyID0gRm9sbG93RW1pdHRlcjtcblxuUHJvdG9uLlpvbmUgPSBab25lO1xuUHJvdG9uLkxpbmVab25lID0gTGluZVpvbmU7XG5Qcm90b24uQ2lyY2xlWm9uZSA9IENpcmNsZVpvbmU7XG5Qcm90b24uUG9pbnRab25lID0gUG9pbnRab25lO1xuUHJvdG9uLlJlY3Rab25lID0gUmVjdFpvbmU7XG5Qcm90b24uSW1hZ2Vab25lID0gSW1hZ2Vab25lO1xuXG5Qcm90b24uQ2FudmFzUmVuZGVyZXIgPSBDYW52YXNSZW5kZXJlcjtcblByb3Rvbi5Eb21SZW5kZXJlciA9IERvbVJlbmRlcmVyO1xuUHJvdG9uLkVhc2VsUmVuZGVyZXIgPSBFYXNlbFJlbmRlcmVyO1xuUHJvdG9uLlBpeGlSZW5kZXJlciA9IFBpeGlSZW5kZXJlcjtcblByb3Rvbi5QaXhlbFJlbmRlcmVyID0gUGl4ZWxSZW5kZXJlcjtcblByb3Rvbi5XZWJHTFJlbmRlcmVyID0gUHJvdG9uLldlYkdsUmVuZGVyZXIgPSBXZWJHTFJlbmRlcmVyO1xuUHJvdG9uLkN1c3RvbVJlbmRlcmVyID0gQ3VzdG9tUmVuZGVyZXI7XG5cblByb3Rvbi5EZWJ1ZyA9IERlYnVnO1xuVXRpbC5hc3NpZ24oUHJvdG9uLCBlYXNlKTtcblxuLy8gZXhwb3J0XG5leHBvcnQgZGVmYXVsdCBQcm90b247XG4iXSwibmFtZXMiOlsiaXBvdCIsImxlbmd0aCIsIm5ocG90IiwiaSIsIm1ha2VUcmFuc2xhdGlvbiIsInR4IiwidHkiLCJtYWtlUm90YXRpb24iLCJhbmdsZUluUmFkaWFucyIsImMiLCJNYXRoIiwiY29zIiwicyIsInNpbiIsIm1ha2VTY2FsZSIsInN4Iiwic3kiLCJtYXRyaXhNdWx0aXBseSIsImEiLCJiIiwiYTAwIiwiYTAxIiwiYTAyIiwiYTEwIiwiYTExIiwiYTEyIiwiYTIwIiwiYTIxIiwiYTIyIiwiYjAwIiwiYjAxIiwiYjAyIiwiYjEwIiwiYjExIiwiYjEyIiwiYjIwIiwiYjIxIiwiYjIyIiwiY3JlYXRlQ2FudmFzIiwiaWQiLCJ3aWR0aCIsImhlaWdodCIsInBvc2l0aW9uIiwiZG9tIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50Iiwic3R5bGUiLCJvcGFjaXR5IiwidHJhbnNmb3JtIiwiY3JlYXRlRGl2IiwicmVzaXplIiwibWFyZ2luTGVmdCIsIm1hcmdpblRvcCIsImRpdiIsIngiLCJ5Iiwic2NhbGUiLCJyb3RhdGUiLCJ3aWxsQ2hhbmdlIiwiY3NzMyIsInRyYW5zZm9ybTNkIiwia2V5IiwidmFsIiwiYmtleSIsImNoYXJBdCIsInRvVXBwZXJDYXNlIiwic3Vic3RyIiwiaW1nc0NhY2hlIiwiY2FudmFzQ2FjaGUiLCJjYW52YXNJZCIsImdldEltYWdlRGF0YSIsImNvbnRleHQiLCJpbWFnZSIsInJlY3QiLCJkcmF3SW1hZ2UiLCJpbWFnZWRhdGEiLCJjbGVhclJlY3QiLCJnZXRJbWdGcm9tQ2FjaGUiLCJpbWciLCJjYWxsYmFjayIsInBhcmFtIiwic3JjIiwiSW1hZ2UiLCJvbmxvYWQiLCJlIiwidGFyZ2V0IiwiZ2V0Q2FudmFzRnJvbUNhY2hlIiwiV2ViR0xVdGlsIiwiY2FudmFzIiwiRG9tVXRpbCIsImdldENvbnRleHQiLCJpbml0VmFsdWUiLCJ2YWx1ZSIsImRlZmF1bHRzIiwidW5kZWZpbmVkIiwiaXNBcnJheSIsIk9iamVjdCIsInByb3RvdHlwZSIsInRvU3RyaW5nIiwiY2FsbCIsImVtcHR5QXJyYXkiLCJhcnIiLCJ0b0FycmF5IiwiZ2V0UmFuZEZyb21BcnJheSIsImZsb29yIiwicmFuZG9tIiwiZW1wdHlPYmplY3QiLCJvYmoiLCJpZ25vcmUiLCJpbmRleE9mIiwiY2xhc3NBcHBseSIsImNvbnN0cnVjdG9yIiwiYXJncyIsIkZhY3RvcnlGdW5jIiwiYmluZCIsImFwcGx5IiwiY29uY2F0IiwiSW1nVXRpbCIsImRlc3Ryb3lBbGwiLCJkZXN0cm95IiwiYXNzaWduIiwic291cmNlIiwiaGFzT3duUHJvcGVydHkiLCJpZHNNYXAiLCJQdWlkIiwiX2luZGV4IiwiX2NhY2hlIiwidHlwZSIsImdldElkIiwidWlkIiwiZ2V0SWRGcm9tQ2FjaGUiLCJpc0JvZHkiLCJpc0lubmVyIiwiZ2V0VGFyZ2V0IiwiUG9vbCIsIm51bSIsInRvdGFsIiwiY2FjaGUiLCJnZXQiLCJwYXJhbXMiLCJwIiwiX19wdWlkIiwicG9wIiwiY3JlYXRlT3JDbG9uZSIsImV4cGlyZSIsImdldENhY2hlIiwicHVzaCIsImNyZWF0ZSIsIlV0aWwiLCJjbG9uZSIsImdldENvdW50IiwiY291bnQiLCJTdGF0cyIsInByb3RvbiIsImNvbnRhaW5lciIsImVtaXR0ZXJJbmRleCIsInJlbmRlcmVySW5kZXgiLCJ1cGRhdGUiLCJib2R5IiwiYWRkIiwiZW1pdHRlciIsImdldEVtaXR0ZXIiLCJyZW5kZXJlciIsImdldFJlbmRlcmVyIiwic3RyIiwiZW1pdHRlcnMiLCJlbWl0U3BlZWQiLCJnZXRFbWl0dGVyUG9zIiwiaW5pdGlhbGl6ZXMiLCJjb25jYXRBcnIiLCJiZWhhdmlvdXJzIiwibmFtZSIsImdldENyZWF0ZWROdW1iZXIiLCJwb29sIiwiaW5uZXJIVE1MIiwiY3NzVGV4dCIsImpvaW4iLCJhZGRFdmVudExpc3RlbmVyIiwiYmciLCJjb2xvciIsInBhcmVudE5vZGUiLCJhcHBlbmRDaGlsZCIsInJlbmRlcmVycyIsInJlc3VsdCIsImNwb29sIiwicm91bmQiLCJFdmVudERpc3BhdGNoZXIiLCJfbGlzdGVuZXJzIiwiZGlzcGF0Y2hFdmVudCIsImhhc0V2ZW50TGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwicmVtb3ZlQWxsRXZlbnRMaXN0ZW5lcnMiLCJsaXN0ZW5lciIsInNwbGljZSIsImxpc3RlbmVycyIsImhhbmRsZXIiLCJQSSIsIklORklOSVRZIiwiSW5maW5pdHkiLCJNYXRoVXRpbCIsIlBJeDIiLCJQSV8yIiwiUElfMTgwIiwiTjE4MF9QSSIsImlzSW5maW5pdHkiLCJyYW5kb21BVG9CIiwiaXNJbnQiLCJyYW5kb21GbG9hdGluZyIsImNlbnRlciIsImYiLCJyYW5kb21Db2xvciIsInNsaWNlIiwicmFuZG9tWm9uZSIsImRpc3BsYXkiLCJrIiwiZGlnaXRzIiwicG93IiwiZGVncmVlVHJhbnNmb3JtIiwidG9Db2xvcjE2IiwiSW50ZWdyYXRpb24iLCJjYWxjdWxhdGUiLCJwYXJ0aWNsZXMiLCJ0aW1lIiwiZGFtcGluZyIsImV1bGVySW50ZWdyYXRlIiwicGFydGljbGUiLCJzbGVlcCIsIm9sZCIsImNvcHkiLCJ2IiwibXVsdGlwbHlTY2FsYXIiLCJtYXNzIiwiY2xlYXIiLCJQcm90b24iLCJpbnRlZ3JhdGlvblR5cGUiLCJub3ciLCJ0aGVuIiwiZWxhcHNlZCIsInN0YXRzIiwiRVVMRVIiLCJpbnRlZ3JhdG9yIiwiX2ZwcyIsIl9pbnRlcnZhbCIsIkRFRkFVTFRfSU5URVJWQUwiLCJhZGRSZW5kZXJlciIsInJlbmRlciIsImluaXQiLCJyZW1vdmVSZW5kZXJlciIsImluZGV4IiwicmVtb3ZlIiwiYWRkRW1pdHRlciIsInBhcmVudCIsIkVNSVRURVJfQURERUQiLCJyZW1vdmVFbWl0dGVyIiwiRU1JVFRFUl9SRU1PVkVEIiwiUFJPVE9OX1VQREFURSIsIlVTRV9DTE9DSyIsIkRhdGUiLCJnZXRUaW1lIiwiYW1lbmRDaGFuZ2VUYWJzQnVnIiwiZW1pdHRlcnNVcGRhdGUiLCJQUk9UT05fVVBEQVRFX0FGVEVSIiwiZ2V0QWxsUGFydGljbGVzIiwiZGVzdHJveUFsbEVtaXR0ZXJzIiwiZGVzdHJveU90aGVyIiwic2V0VGltZW91dCIsImZwcyIsIk1FQVNVUkUiLCJSSzIiLCJQQVJUSUNMRV9DUkVBVEVEIiwiUEFSVElDTEVfVVBEQVRFIiwiUEFSVElDTEVfU0xFRVAiLCJQQVJUSUNMRV9ERUFEIiwiUmdiIiwiciIsImciLCJyZXNldCIsImhhc1Byb3AiLCJzZXRQcm9wIiwicHJvcHMiLCJwcm9wIiwiU3BhbiIsImdldFNwYW5WYWx1ZSIsInNldFZlY3RvclZhbCIsImNvbmYiLCJlYXNlTGluZWFyIiwiZWFzZUluUXVhZCIsImVhc2VPdXRRdWFkIiwiZWFzZUluT3V0UXVhZCIsImVhc2VJbkN1YmljIiwiZWFzZU91dEN1YmljIiwiZWFzZUluT3V0Q3ViaWMiLCJlYXNlSW5RdWFydCIsImVhc2VPdXRRdWFydCIsImVhc2VJbk91dFF1YXJ0IiwiZWFzZUluU2luZSIsImVhc2VPdXRTaW5lIiwiZWFzZUluT3V0U2luZSIsImVhc2VJbkV4cG8iLCJlYXNlT3V0RXhwbyIsImVhc2VJbk91dEV4cG8iLCJlYXNlSW5DaXJjIiwic3FydCIsImVhc2VPdXRDaXJjIiwiZWFzZUluT3V0Q2lyYyIsImVhc2VJbkJhY2siLCJlYXNlT3V0QmFjayIsImVhc2VJbk91dEJhY2siLCJnZXRFYXNpbmciLCJlYXNlIiwiVmVjdG9yMkQiLCJzZXQiLCJzZXRYIiwic2V0WSIsImdldEdyYWRpZW50IiwiYXRhbjIiLCJ3IiwiYWRkVmVjdG9ycyIsImFkZFhZIiwic3ViIiwic3ViVmVjdG9ycyIsImRpdmlkZVNjYWxhciIsIm5lZ2F0ZSIsImRvdCIsImxlbmd0aFNxIiwibm9ybWFsaXplIiwiZGlzdGFuY2VUbyIsImRpc3RhbmNlVG9TcXVhcmVkIiwidGhhIiwiZHgiLCJkeSIsImxlcnAiLCJhbHBoYSIsImVxdWFscyIsIlBhcnRpY2xlIiwiZGF0YSIsInJnYiIsIlByb3BVdGlsIiwiZ2V0RGlyZWN0aW9uIiwibGlmZSIsImFnZSIsImRlYWQiLCJzcHJpdGUiLCJlbmVyZ3kiLCJyYWRpdXMiLCJyb3RhdGlvbiIsImVhc2luZyIsInJlbW92ZUFsbEJlaGF2aW91cnMiLCJhcHBseUJlaGF2aW91cnMiLCJtYXgiLCJhcHBseUJlaGF2aW91ciIsImFkZEJlaGF2aW91ciIsImJlaGF2aW91ciIsInBhcmVudHMiLCJpbml0aWFsaXplIiwiYWRkQmVoYXZpb3VycyIsInJlbW92ZUJlaGF2aW91ciIsImhleFRvUmdiIiwiaCIsImhleDE2Iiwic3Vic3RyaW5nIiwicGFyc2VJbnQiLCJyZ2JUb0hleCIsInJiZyIsImdldEhleDE2RnJvbVBhcnRpY2xlIiwiTnVtYmVyIiwiUG9sYXIyRCIsImFicyIsInNldFIiLCJzZXRUaGEiLCJ0b1ZlY3RvciIsImdldFgiLCJnZXRZIiwiTWF0MyIsIm1hdDMiLCJtYXQiLCJGbG9hdDMyQXJyYXkiLCJtYXQxIiwibWF0MiIsIm11bHRpcGx5IiwiaW52ZXJzZSIsImQiLCJtdWx0aXBseVZlYzIiLCJtIiwidmVjIiwiZ2V0VmFsdWUiLCJzZXRTcGFuVmFsdWUiLCJwYW4iLCJBcnJheVNwYW4iLCJfYXJyIiwiY3JlYXRlQXJyYXlTcGFuIiwiUmVjdGFuZ2xlIiwiYm90dG9tIiwicmlnaHQiLCJjb250YWlucyIsIlJhdGUiLCJudW1wYW4iLCJ0aW1lcGFuIiwibnVtUGFuIiwidGltZVBhbiIsInN0YXJ0VGltZSIsIm5leHRUaW1lIiwiSW5pdGlhbGl6ZSIsIkxpZmUiLCJsaWZlUGFuIiwiWm9uZSIsInZlY3RvciIsImNyb3NzVHlwZSIsImFsZXJ0IiwiZ2V0UG9zaXRpb24iLCJjcm9zc2luZyIsIlBvaW50Wm9uZSIsImNvbnNvbGUiLCJlcnJvciIsIlBvc2l0aW9uIiwiem9uZSIsIlZlbG9jaXR5IiwicnBhbiIsInRoYXBhbiIsInJQYW4iLCJ0aGFQYW4iLCJub3JtYWxpemVWZWxvY2l0eSIsInZyIiwicG9sYXIyZCIsIk1hc3MiLCJtYXNzUGFuIiwiUmFkaXVzIiwib2xkUmFkaXVzIiwiQm9keSIsImltYWdlVGFyZ2V0IiwiaW5uZXIiLCJCZWhhdmlvdXIiLCJub3JtYWxpemVGb3JjZSIsImZvcmNlIiwibm9ybWFsaXplVmFsdWUiLCJGb3JjZSIsImZ4IiwiZnkiLCJBdHRyYWN0aW9uIiwidGFyZ2V0UG9zaXRpb24iLCJyYWRpdXNTcSIsImF0dHJhY3Rpb25Gb3JjZSIsIlJhbmRvbURyaWZ0IiwiZHJpZnRYIiwiZHJpZnRZIiwiZGVsYXkiLCJwYW5Gb2NlIiwiR3Jhdml0eSIsIkNvbGxpc2lvbiIsImNvbGxpc2lvblBvb2wiLCJkZWx0YSIsIm5ld1Bvb2wiLCJvdGhlclBhcnRpY2xlIiwib3ZlcmxhcCIsInRvdGFsTWFzcyIsImF2ZXJhZ2VNYXNzMSIsImF2ZXJhZ2VNYXNzMiIsImRpc3RhbmNlIiwiQ3Jvc3Nab25lIiwiQWxwaGEiLCJzYW1lIiwiYWxwaGFBIiwiYWxwaGFCIiwiU2NhbGUiLCJzY2FsZUEiLCJzY2FsZUIiLCJSb3RhdGUiLCJpbmZsdWVuY2UiLCJyb3RhdGlvbkEiLCJyb3RhdGlvbkIiLCJDb2xvciIsImNvbG9yQSIsIkNvbG9yVXRpbCIsImNvbG9yQiIsIkNIQU5HSU5HIiwiQ3ljbG9uZSIsImFuZ2xlIiwic2V0QW5nbGVBbmRGb3JjZSIsInNwYW4iLCJTdHJpbmciLCJ0b0xvd2VyQ2FzZSIsImNhbmdsZSIsImN5Y2xvbmUiLCJncmFkaWVudCIsIlJlcHVsc2lvbiIsIkdyYXZpdHlXZWxsIiwiY2VudGVyUG9pbnQiLCJkaXN0YW5jZVZlYyIsImRpc3RhbmNlU3EiLCJmYWN0b3IiLCJiaW5kRW1pdHRlciIsIkVtaXR0ZXIiLCJlbWl0VGltZSIsInRvdGFsVGltZSIsInJhdGUiLCJlbWl0Iiwic3RvcGVkIiwiaXNOYU4iLCJzdG9wIiwicHJlRW1pdCIsIm9sZFN0b3BlZCIsIm9sZEVtaXRUaW1lIiwib2xkVG90YWxUaW1lIiwic3RlcCIsInJlbW92ZUFsbFBhcnRpY2xlcyIsImFkZFNlbGZJbml0aWFsaXplIiwiaW5pdEFsbCIsImFkZEluaXRpYWxpemUiLCJyZXN0IiwicmVtb3ZlSW5pdGlhbGl6ZSIsImluaXRpYWxpemVyIiwicmVtb3ZlQWxsSW5pdGlhbGl6ZXJzIiwiYXJndW1lbnRzIiwiZW1pdHRpbmciLCJpbnRlZ3JhdGUiLCJkaXNwYXRjaCIsImV2ZW50IiwiYmluZEV2ZW50IiwiY3JlYXRlUGFydGljbGUiLCJzZXR1cFBhcnRpY2xlIiwiSW5pdGlhbGl6ZVV0aWwiLCJCZWhhdmlvdXJFbWl0dGVyIiwic2VsZkJlaGF2aW91cnMiLCJhZGRTZWxmQmVoYXZpb3VyIiwicmVtb3ZlU2VsZkJlaGF2aW91ciIsIkZvbGxvd0VtaXR0ZXIiLCJtb3VzZVRhcmdldCIsIndpbmRvdyIsIl9hbGxvd0VtaXR0aW5nIiwiaW5pdEV2ZW50SGFuZGxlciIsIm1vdXNlbW92ZUhhbmRsZXIiLCJtb3VzZW1vdmUiLCJtb3VzZWRvd25IYW5kbGVyIiwibW91c2Vkb3duIiwibW91c2V1cEhhbmRsZXIiLCJtb3VzZXVwIiwibGF5ZXJYIiwibGF5ZXJZIiwib2Zmc2V0WCIsIm9mZnNldFkiLCJpc0ltYWdlIiwidGFnTmFtZSIsIm5vZGVOYW1lIiwiaXNTdHJpbmciLCJCYXNlUmVuZGVyZXIiLCJlbGVtZW50Iiwic3Ryb2tlIiwiY2lyY2xlQ29uZiIsImlzQ2lyY2xlIiwic2V0U3Ryb2tlIiwidGhpbmtuZXNzIiwiX3Byb3RvblVwZGF0ZUhhbmRsZXIiLCJvblByb3RvblVwZGF0ZSIsIl9wcm90b25VcGRhdGVBZnRlckhhbmRsZXIiLCJvblByb3RvblVwZGF0ZUFmdGVyIiwiX2VtaXR0ZXJBZGRlZEhhbmRsZXIiLCJvbkVtaXR0ZXJBZGRlZCIsIl9lbWl0dGVyUmVtb3ZlZEhhbmRsZXIiLCJvbkVtaXR0ZXJSZW1vdmVkIiwiX3BhcnRpY2xlQ3JlYXRlZEhhbmRsZXIiLCJvblBhcnRpY2xlQ3JlYXRlZCIsIl9wYXJ0aWNsZVVwZGF0ZUhhbmRsZXIiLCJvblBhcnRpY2xlVXBkYXRlIiwiX3BhcnRpY2xlRGVhZEhhbmRsZXIiLCJvblBhcnRpY2xlRGVhZCIsIkNhbnZhc1JlbmRlcmVyIiwiYnVmZmVyQ2FjaGUiLCJhZGRJbWcyQm9keSIsIlR5cGVzIiwiZHJhd0NpcmNsZSIsImJ1ZmZlciIsImNyZWF0ZUJ1ZmZlciIsImJ1ZkNvbnRleHQiLCJnbG9iYWxBbHBoYSIsImdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiIsImZpbGxTdHlsZSIsImZpbGxSZWN0Iiwic2F2ZSIsInRyYW5zbGF0ZSIsInJlc3RvcmUiLCJiZWdpblBhdGgiLCJhcmMiLCJzdHJva2VTdHlsZSIsImxpbmVXaWR0aCIsImNsb3NlUGF0aCIsImZpbGwiLCJzaXplIiwiRG9tUmVuZGVyZXIiLCJjcmVhdGVCb2R5IiwiYm9keVJlYWR5IiwiYmFja2dyb3VuZENvbG9yIiwicmVtb3ZlQ2hpbGQiLCJjcmVhdGVDaXJjbGUiLCJjcmVhdGVTcHJpdGUiLCJib3JkZXJSYWRpdXMiLCJib3JkZXJDb2xvciIsImJvcmRlcldpZHRoIiwidXJsIiwiYmFja2dyb3VuZEltYWdlIiwiRWFzZWxSZW5kZXJlciIsImFkZENoaWxkIiwic2NhbGVYIiwic2NhbGVZIiwiZ3JhcGhpY3MiLCJyZWdYIiwicmVnWSIsImNyZWF0ZWpzIiwiR3JhcGhpY3MiLCJiZWdpblN0cm9rZSIsImJlZ2luRmlsbCIsInNoYXBlIiwiU2hhcGUiLCJQaXhlbFJlbmRlcmVyIiwicmVjdGFuZ2xlIiwiaW1hZ2VEYXRhIiwiY3JlYXRlSW1hZ2VEYXRhIiwicHV0SW1hZ2VEYXRhIiwic2V0UGl4ZWwiLCJlbGVtZW50d2lkdGgiLCJQSVhJQ2xhc3MiLCJQaXhpUmVuZGVyZXIiLCJzZXRDb2xvciIsImJsZW5kTW9kZSIsInNldFBJWEkiLCJQSVhJIiwiU3ByaXRlIiwiY3JlYXRlRnJvbUltYWdlIiwiZnJvbSIsImZyb21JbWFnZSIsInRpbnQiLCJhbmNob3IiLCJlbmRGaWxsIiwiTVN0YWNrIiwibWF0cyIsInRvcCIsIldlYkdMUmVuZGVyZXIiLCJnbCIsImFudGlhbGlhcyIsInN0ZW5jaWwiLCJkZXB0aCIsImluaXRWYXIiLCJzZXRNYXhSYWRpdXMiLCJpbml0U2hhZGVycyIsImluaXRCdWZmZXJzIiwiYmxlbmRFcXVhdGlvbiIsIkZVTkNfQUREIiwiYmxlbmRGdW5jIiwiU1JDX0FMUEhBIiwiT05FX01JTlVTX1NSQ19BTFBIQSIsImVuYWJsZSIsIkJMRU5EIiwidW1hdCIsInNtYXQiLCJtc3RhY2siLCJ2aWV3cG9ydCIsImNpcmNsZUNhbnZhc1VSTCIsImdldFZlcnRleFNoYWRlciIsInZzU291cmNlIiwiZ2V0RnJhZ21lbnRTaGFkZXIiLCJmc1NvdXJjZSIsInRleHR1cmVidWZmZXJzIiwiQSIsIkIiLCJnZXRTaGFkZXIiLCJmcyIsInNoYWRlciIsImNyZWF0ZVNoYWRlciIsIkZSQUdNRU5UX1NIQURFUiIsIlZFUlRFWF9TSEFERVIiLCJzaGFkZXJTb3VyY2UiLCJjb21waWxlU2hhZGVyIiwiZ2V0U2hhZGVyUGFyYW1ldGVyIiwiQ09NUElMRV9TVEFUVVMiLCJnZXRTaGFkZXJJbmZvTG9nIiwiZnJhZ21lbnRTaGFkZXIiLCJ2ZXJ0ZXhTaGFkZXIiLCJzcHJvZ3JhbSIsImNyZWF0ZVByb2dyYW0iLCJhdHRhY2hTaGFkZXIiLCJsaW5rUHJvZ3JhbSIsImdldFByb2dyYW1QYXJhbWV0ZXIiLCJMSU5LX1NUQVRVUyIsInVzZVByb2dyYW0iLCJ2cGEiLCJnZXRBdHRyaWJMb2NhdGlvbiIsInRjYSIsImVuYWJsZVZlcnRleEF0dHJpYkFycmF5IiwidE1hdFVuaWZvcm0iLCJnZXRVbmlmb3JtTG9jYXRpb24iLCJzYW1wbGVyVW5pZm9ybSIsInVzZVRleCIsInVuaWZvcm0xaSIsInZzIiwiaWR4IiwidW5pdElCdWZmZXIiLCJiaW5kQnVmZmVyIiwiRUxFTUVOVF9BUlJBWV9CVUZGRVIiLCJidWZmZXJEYXRhIiwiVWludDE2QXJyYXkiLCJTVEFUSUNfRFJBVyIsImlkcyIsInVuaXRJMzMiLCJzdHJpcEJ1ZmZlciIsInJhaWR1cyIsImNpcmNsZUNhbnZhc1JhZGl1cyIsInRvRGF0YVVSTCIsImRyYXdJbWcyQ2FudmFzIiwiX3ciLCJfaCIsIl93aWR0aCIsIl9oZWlnaHQiLCJfc2NhbGVYIiwiX3NjYWxlWSIsImNyZWF0ZVRleHR1cmUiLCJ0ZXh0dXJlIiwidmNCdWZmZXIiLCJ0Y0J1ZmZlciIsIkFSUkFZX0JVRkZFUiIsImJpbmRUZXh0dXJlIiwiVEVYVFVSRV8yRCIsInRleEltYWdlMkQiLCJSR0JBIiwiVU5TSUdORURfQllURSIsInRleFBhcmFtZXRlcmkiLCJURVhUVVJFX01BR19GSUxURVIiLCJMSU5FQVIiLCJURVhUVVJFX01JTl9GSUxURVIiLCJMSU5FQVJfTUlQTUFQX05FQVJFU1QiLCJnZW5lcmF0ZU1pcG1hcCIsInRleHR1cmVMb2FkZWQiLCJ0ZXh0dXJlV2lkdGgiLCJ0ZXh0dXJlSGVpZ2h0IiwidG1hdCIsImltYXQiLCJvbGRTY2FsZSIsInVwZGF0ZU1hdHJpeCIsInVuaWZvcm0zZiIsInVuaWZvcm1NYXRyaXgzZnYiLCJ2ZXJ0ZXhBdHRyaWJQb2ludGVyIiwiRkxPQVQiLCJkcmF3RWxlbWVudHMiLCJUUklBTkdMRVMiLCJVTlNJR05FRF9TSE9SVCIsIm1vdmVPcmlnaW5NYXRyaXgiLCJ0cmFuc2xhdGlvbk1hdHJpeCIsImFuZ2VsIiwicm90YXRpb25NYXRyaXgiLCJzY2FsZU1hdHJpeCIsIm1hdHJpeCIsIkN1c3RvbVJlbmRlcmVyIiwiTGluZVpvbmUiLCJ4MSIsInkxIiwieDIiLCJ5MiIsImRpcmVjdGlvbiIsIm1pbngiLCJtaW4iLCJtaW55IiwibWF4eCIsIm1heHkiLCJ4eHl5IiwiZ2V0TGVuZ3RoIiwiQyIsIkQiLCJnZXREaXN0YW5jZSIsImdldFN5bW1ldHJpYyIsInRoYTIiLCJ0aGExIiwib2xkeCIsIm9sZHkiLCJyYW5nZU91dCIsIkNpcmNsZVpvbmUiLCJyYW5kb21SYWRpdXMiLCJzZXRDZW50ZXIiLCJSZWN0Wm9uZSIsIkltYWdlWm9uZSIsInZlY3RvcnMiLCJzZXRWZWN0b3JzIiwiaiIsImxlbmd0aDEiLCJsZW5ndGgyIiwiZ2V0Qm91bmQiLCJnZXRDb2xvciIsImZ1bmMiLCJnZXRTdHlsZSIsImRyYXdab25lIiwibW92ZVRvIiwibGluZVRvIiwiZHJhd1JlY3QiLCJkcmF3RW1pdHRlciIsIlZlY3RvciIsIlBvbGFyIiwiZ2V0U3BhbiIsIkluaXQiLCJMIiwiUCIs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
