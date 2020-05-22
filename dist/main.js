/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./components/background.js":
/*!**********************************!*\
  !*** ./components/background.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startAnimating = undefined;

var _bg = __webpack_require__(/*! ./bg.glsl */ "./components/bg.glsl");

var _bg2 = _interopRequireDefault(_bg);

var _glslSandbox = __webpack_require__(/*! ../glsl-sandbox.js */ "./glsl-sandbox.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _createRenderer = (0, _glslSandbox.createRenderer)(_bg2.default),
    canvas = _createRenderer.canvas,
    draw = _createRenderer.draw;

canvas.id = 'bg';
document.body.appendChild(canvas);

var dampened = function dampened(speed) {
  var target = 0;
  var value = 0;
  return {
    setTarget: function setTarget(t) {
      return target = t;
    },
    getValue: function getValue(v) {
      return value;
    },
    update: function update() {
      return value += (target - value) * speed;
    }
  };
};

var dampeningFactor = 0.08;
var MouseX = dampened(dampeningFactor);
var MouseY = dampened(dampeningFactor);

var onWindowResize = function onWindowResize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};

var onMouseMove = function onMouseMove(event) {
  MouseX.setTarget(event.clientX / window.innerWidth);
  MouseY.setTarget(1 - event.clientY / window.innerHeight);
};

onWindowResize();
window.addEventListener('resize', onWindowResize, false);
document.body.addEventListener('mousemove', onMouseMove, false);

var animate = function animate(time) {
  requestAnimationFrame(animate);

  MouseX.update();
  MouseY.update();

  draw(time, MouseX.getValue(), MouseY.getValue(), canvas.width, canvas.height);
};

var startAnimating = exports.startAnimating = function startAnimating() {
  return requestAnimationFrame(animate);
};

/***/ }),

/***/ "./components/bg.glsl":
/*!****************************!*\
  !*** ./components/bg.glsl ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "// Author: @patriciogv\n// Edited by: Jakub Fiala\n// Title: CellularNoise\n\n#ifdef GL_ES\nprecision mediump float;\n#endif\n\nuniform vec2 resolution;\nuniform vec2 mouse;\nuniform float time;\n\nvec2 random2( vec2 p ) {\n  return fract(sin(vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))))*43758.5453);\n}\n\nvoid main() {\n  vec2 st = gl_FragCoord.xy/resolution.xy;\n  st.x *= resolution.x/resolution.y;\n  vec3 color = vec3(.0);\n\n  // Scale\n  st *= 10.;\n\n  // Tile the space\n  vec2 i_st = floor(st);\n  vec2 f_st = fract(st);\n\n  float m_dist = 1.3;  // minimun distance\n\n  for (int y= -1; y <= 1; y++) {\n    for (int x= -1; x <= 1; x++) {\n      // Neighbor place in the grid\n      vec2 neighbor = vec2(float(x),float(y));\n      // Random position from current + neighbor place in the grid\n      vec2 point = random2(i_st + neighbor);\n      // Animate the point\n      point = 0.5 + 0.5*sin(time + 6.2831*point);\n      // Vector between the pixel and the point\n      vec2 diff = neighbor + point - f_st;\n      // Distance to the point\n      float dist = length(diff);\n      // Keep the closer distance\n      m_dist = min(m_dist, dist);\n    }\n  }\n\n  m_dist = pow(m_dist, -3.);\n\n  vec2 pix = gl_FragCoord.xy/resolution.xy;\n  pix.x *= resolution.x/resolution.y;\n\n  vec2 mousepos = vec2(mouse.x, mouse.y);\n  mousepos.x *= resolution.x/resolution.y;\n\n  // Draw the min distance (distance field)\n  float brightness = m_dist * pow(distance(mousepos, pix) * 2.0, 2.0) * pix.x;\n  color = vec3(brightness * (2.5 - pix.y), brightness * pix.y * pix.x, brightness * pix.y);\n\n  vec4 final_color = vec4(color, 1.0) / (pow(pix.x, 1.0)) + pow(cos(pix.x), 1.0);\n  gl_FragColor = final_color;\n}\n"

/***/ }),

/***/ "./components/deep-links.js":
/*!**********************************!*\
  !*** ./components/deep-links.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var openDeepLinked = function openDeepLinked(id) {
  if (id === '') return;
  var element = document.getElementById(id);
  if (element && 'open' in element) element.open = true;
};

exports.openDeepLinked = openDeepLinked;

/***/ }),

/***/ "./glsl-sandbox.js":
/*!*************************!*\
  !*** ./glsl-sandbox.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var loadShader = exports.loadShader = function loadShader(context, type, source) {
  var shader = context.createShader(type);
  // Send the source to the shader object
  context.shaderSource(shader, source);
  // Compile the shader program
  context.compileShader(shader);
  // See if it compiled successfully
  if (!context.getShaderParameter(shader, context.COMPILE_STATUS)) {
    console.error('An error occurred compiling the shaders: ' + context.getShaderInfoLog(shader));
    context.deleteShader(shader);
    return null;
  }

  return shader;
};

var vertexShaderSource = exports.vertexShaderSource = '\nattribute vec4 aVertexPosition;\nvoid main() { gl_Position = aVertexPosition; }\n';

var getRenderFunction = exports.getRenderFunction = function getRenderFunction(context, uniformLocations) {
  return function (time, mouseX, mouseY, resolutionX, resolutionY) {
    // Clear the canvas before we start drawing on it.
    context.clearColor(1.0, 1.0, 1.0, 1.0); // Clear to black, fully opaque
    context.clearDepth(1.0); // Clear everything
    context.clear(context.COLOR_BUFFER_BIT | context.DEPTH_BUFFER_BIT);

    context.uniform2fv(uniformLocations.resolution, [resolutionX, resolutionY]);
    context.uniform2fv(uniformLocations.mouse, [mouseX, mouseY]);
    context.uniform1f(uniformLocations.time, time / 2000);

    context.viewport(0, 0, resolutionX, resolutionY);
    context.drawArrays(context.TRIANGLE_STRIP, 0, 4);
  };
};

var createRenderer = exports.createRenderer = function createRenderer(fragmentShaderSource) {
  var canvas = document.createElement('canvas');
  var context = canvas.getContext('webgl');

  var vertexShader = loadShader(context, context.VERTEX_SHADER, vertexShaderSource);
  var fragmentShader = loadShader(context, context.FRAGMENT_SHADER, fragmentShaderSource);

  var shaderProgram = context.createProgram();
  context.attachShader(shaderProgram, vertexShader);
  context.attachShader(shaderProgram, fragmentShader);
  context.linkProgram(shaderProgram);

  // If creating the shader program failed, alert
  if (!context.getProgramParameter(shaderProgram, context.LINK_STATUS)) {
    console.error('Unable to initialize the shader program: ' + context.getProgramInfoLog(shaderProgram));
  }

  // Create a buffer for the square's positions.
  var positionBuffer = context.createBuffer();
  context.bindBuffer(context.ARRAY_BUFFER, positionBuffer);

  var positions = Float32Array.from([-1.0, 1.0, 1.0, 1.0, -1.0, -1.0, 1.0, -1.0]);

  context.bufferData(context.ARRAY_BUFFER, positions, context.STATIC_DRAW);
  context.bindBuffer(context.ARRAY_BUFFER, positionBuffer);

  // get pointers to uniforms
  var resolution = context.getUniformLocation(shaderProgram, 'resolution');
  var mouse = context.getUniformLocation(shaderProgram, 'mouse');
  var time = context.getUniformLocation(shaderProgram, 'time');

  // Tell WebGL how to pull out the positions from the position
  // buffer into the vertexPosition attribute.
  var vertexPositionLocation = context.getAttribLocation(shaderProgram, 'aVertexPosition');
  context.vertexAttribPointer(vertexPositionLocation, 2, context.FLOAT, false, 0, 0);
  context.enableVertexAttribArray(vertexPositionLocation);

  // Tell WebGL to use our program when drawing
  context.useProgram(shaderProgram);

  var draw = getRenderFunction(context, { resolution: resolution, mouse: mouse, time: time });
  return { canvas: canvas, draw: draw };
};

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _gallery = __webpack_require__(/*! gallery */ "./node_modules/gallery/lib/gallery.js");

var _gallery2 = _interopRequireDefault(_gallery);

var _deepLinks = __webpack_require__(/*! ./components/deep-links.js */ "./components/deep-links.js");

var _background = __webpack_require__(/*! ./components/background.js */ "./components/background.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

(0, _background.startAnimating)();
(0, _gallery2.default)(document);

(0, _deepLinks.openDeepLinked)(location.hash.replace('#', ''));
window.addEventListener('hashchange', function (e) {
  return (0, _deepLinks.openDeepLinked)(location.hash.replace('#', ''));
});

var openAllDetails = function openAllDetails() {
  var details = document.querySelectorAll('details');
  [].concat(_toConsumableArray(details)).forEach(function (d) {
    return d.open = true;
  });
};

var replaceImagesForPrint = function replaceImagesForPrint() {
  var images = document.querySelectorAll('img[data-gallery-src]');
  [].concat(_toConsumableArray(images)).forEach(function (img) {
    return img.src = img.getAttribute('data-gallery-src');
  });
};

var YouTubeProvider = {
  getEmbeds: function getEmbeds() {
    return document.querySelectorAll('iframe[src*="youtube.com"]');
  },
  getImageSrc: function getImageSrc(videoId) {
    return 'https://i.ytimg.com/vi/' + videoId + '/hqdefault.jpg';
  },

  srcRegex: /embed\/(.*)\?/
};

var VimeoProvider = {
  getEmbeds: function getEmbeds() {
    return document.querySelectorAll('iframe[src*="vimeo.com"]');
  },
  getImageSrc: function getImageSrc(videoId, embed) {
    return embed.getAttribute('data-print-image');
  },

  srcRegex: /video\/(.*)\?/
};

var HTML5Provider = {
  getEmbeds: function getEmbeds() {
    return document.querySelectorAll('figure > video');
  },
  getImageSrc: function getImageSrc(_, video) {
    return video.getAttribute('poster');
  },

  srcRegex: /(.*)/
};

var replaceEmbedsForPrint = function replaceEmbedsForPrint(provider) {
  var embeds = Array.from(provider.getEmbeds());
  embeds.forEach(function (embed) {
    var _embed$src$match = embed.src.match(provider.srcRegex),
        _embed$src$match2 = _slicedToArray(_embed$src$match, 2),
        _ = _embed$src$match2[0],
        videoId = _embed$src$match2[1];

    var img = new Image();
    img.src = provider.getImageSrc(videoId, embed);

    var link = document.createElement('a');
    link.href = embed.src;
    link.innerText = 'Video';
    link.style.display = 'inline-block';
    link.style.marginTop = '0.618rem';

    embed.parentElement.classList.remove('video-embed');
    embed.parentElement.classList.add('embed--print');
    embed.parentElement.appendChild(img);
    embed.parentElement.appendChild(link);
    embed.parentElement.removeChild(embed);
  });
};

window.addEventListener('beforeprint', function (e) {
  openAllDetails();
  replaceImagesForPrint();
  [YouTubeProvider, VimeoProvider, HTML5Provider].forEach(replaceEmbedsForPrint);
});

/***/ }),

/***/ "./node_modules/gallery/lib/gallery.js":
/*!*********************************************!*\
  !*** ./node_modules/gallery/lib/gallery.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* global define self */
(function () {
  var className = 'gallery-lightbox';
  var style = '\n    .' + className + ' {\n      position: fixed;\n      top: 0;\n      bottom: 0;\n      left: 0;\n      right: 0;\n      background: rgba(0, 0, 0, 0.9);\n      opacity: 0;\n      visibility: hidden;\n      transition: opacity .3s ease, visibility .3s ease;\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n      justify-content: center;\n      font-size: 16px;\n      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;\n      padding: 1em;\n      z-index: 9999;\n    }\n    .' + className + '.-open {\n      opacity: 1;\n      visibility: visible;\n    }\n    .' + className + ' > .description {\n      margin-top: 1em;\n      color: white;\n      -webkit-font-smoothing: antialiased;\n    }\n    .' + className + ' > .image,\n    .' + className + ' > .image > img {\n      max-width: 100%;\n      max-height: 100%;\n    }\n    .' + className + ' > .image {\n      max-width: calc(100% - 6em);\n    }\n    .' + className + ' > .next,\n    .' + className + ' > .prev,\n    .' + className + ' > .close {\n      position: absolute;\n      width: 3em;\n      height: 3em;\n      padding: 0;\n      margin: 0;\n      background: rgba(0, 0, 0, 0.2);\n      border: 0;\n    }\n    .' + className + ' > .close {\n      top: 2em;\n      right: 2em;\n    }\n    .' + className + ' > .close:before,\n    .' + className + ' > .close:after,\n    .' + className + ' > .prev:before,\n    .' + className + ' > .next:before,\n    .' + className + ' > .prev:after,\n    .' + className + ' > .next:after {\n      content: \'\';\n      width: 80%;\n      height: 2px;\n      position: absolute;\n      top: 50%;\n      left: 10%;\n      background: white;\n      transform-origin: center;\n    }\n    .' + className + ' > .close:before {\n      transform: translateY(-1px) rotate(45deg);\n    }\n    .' + className + ' > .close:after {\n      transform: translateY(-1px) rotate(-45deg);\n    }\n    .' + className + ' > .next,\n    .' + className + ' > .prev {\n      top: 50%;\n      transform: translateY(-1em)\n    }\n    .' + className + ' > .next {\n      right: 2em;\n    }\n    .' + className + ' > .prev {\n      left: 2em;\n    }\n    .' + className + ' > .prev:before,\n    .' + className + ' > .next:before,\n    .' + className + ' > .prev:after,\n    .' + className + ' > .next:after {\n      width: 20%;\n      left: 40%;\n    }\n    .' + className + ' > .next:before,\n    .' + className + ' > .next:after {\n      transform-origin: right;\n    }\n    .' + className + ' > .prev:before,\n    .' + className + ' > .prev:after {\n      transform-origin: left;\n    }\n    .' + className + ' > .next:after,\n    .' + className + ' > .prev:after {\n      transform: rotate(45deg);\n    }\n    .' + className + ' > .next:before,\n    .' + className + ' > .prev:before {\n      transform: rotate(-45deg);\n    }\n  ';
  var currentGallery = void 0;

  // Setup elements
  var lightbox = document.createElement('div');
  lightbox.className = className;

  var closeButton = document.createElement('button');
  closeButton.className = 'close';
  lightbox.appendChild(closeButton);

  var prevButton = document.createElement('button');
  prevButton.className = 'prev';
  lightbox.appendChild(prevButton);

  var nextButton = document.createElement('button');
  nextButton.className = 'next';
  lightbox.appendChild(nextButton);

  var currentImageWrapper = document.createElement('div');
  currentImageWrapper.className = 'image';
  lightbox.appendChild(currentImageWrapper);

  var currentImage = document.createElement('img');
  currentImageWrapper.appendChild(currentImage);

  var description = document.createElement('div');
  description.className = 'description';
  lightbox.appendChild(description);

  var styleDiv = document.createElement('style');
  styleDiv.innerHTML = style;

  document.body.appendChild(lightbox);
  document.body.appendChild(styleDiv);

  // Setup methods
  var openImage = function openImage(image) {
    lightbox.className = className + ' -open';
    currentImage.src = image.getAttribute('data-gallery-src');
    description.innerHTML = image.getAttribute('data-gallery-desc') || '';
  };

  var closeGallery = function closeGallery() {
    lightbox.className = className;
    currentGallery = null;
  };

  var createGallery = function createGallery(images) {
    var _gallery = {
      currentIndex: 0,
      next: function next() {
        _gallery.currentIndex = (_gallery.currentIndex + 1) % images.length;
        openImage(images[_gallery.currentIndex]);
      },
      prev: function prev() {
        _gallery.currentIndex = (_gallery.currentIndex + 1) % images.length;
        openImage(images[_gallery.currentIndex]);
      }
    };

    var onClick = function onClick(index) {
      return function () {
        currentGallery = _gallery;
        _gallery.currentIndex = index;
        openImage(images[index]);
      };
    };

    for (var i = 0; i < images.length; i++) {
      images[i].addEventListener('click', onClick(i));
    }
  };

  // Setup events
  window.addEventListener('keyup', function (ev) {
    // Close on ESCAPE
    if (ev.keyCode === 27) {
      closeGallery();
    }

    if (currentGallery) {
      // Prev image on LEFT
      if (ev.keyCode === 37) {
        currentGallery.prev();
      }

      // Next image on RIGHT
      if (ev.keyCode === 39) {
        currentGallery.next();
      }
    }
  });

  closeButton.addEventListener('click', closeGallery);
  prevButton.addEventListener('click', function () {
    return currentGallery && currentGallery.prev();
  });
  nextButton.addEventListener('click', function () {
    return currentGallery && currentGallery.next();
  });

  // Create galleries
  var initGallery = function initGallery(parent) {
    var images = parent.querySelectorAll('[data-gallery-src]');
    var galleries = {};
    for (var i = 0; i < images.length; i++) {
      var galleryId = images[i].getAttribute('data-gallery-id') || '_';
      galleries[galleryId] = (galleries[galleryId] || []).concat(images[i]);
    }
    Object.keys(galleries).forEach(function (k) {
      return createGallery(galleries[k]);
    });
  };

  // Umd
  (function (root, factory) {
    if (true) {
      // AMD. Register as an anonymous module.
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}
  })(typeof self !== 'undefined' ? self : this, function () {
    return initGallery;
  });

  initGallery(document);
})();


/***/ })

/******/ });
//# sourceMappingURL=main.js.map