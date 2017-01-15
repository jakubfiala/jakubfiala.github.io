---
---

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _neon = __webpack_require__(1);

	var _gl = __webpack_require__(2);

	var _supportsWebgl = __webpack_require__(3);

	var _supportsWebgl2 = _interopRequireDefault(_supportsWebgl);

	var _jankMessage = __webpack_require__(4);

	var _jankMessage2 = _interopRequireDefault(_jankMessage);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	window.App = {
	    smallBreakpoint: 768,
	    nav: document.querySelector('nav'),
	    navExpanders: document.querySelectorAll('.header__expand-btn'),
	    footer: document.querySelector('footer'),
	    isIntro: document.querySelector('.intro')
	};

	// state container for site
	var State = {
	    navExpanded: false
	};

	var shaderStartTime = 0;
	var MINIMUM_FPS = 50;
	var MAX_JANK_FRAMES = 5;
	var framesUnderMinFpsCount = 0;

	var startSnow = function startSnow(time) {
	    // only render if the fps is decent enough
	    if (shaderStartTime + 1000 / MINIMUM_FPS > time) {
	        shaderStartTime = time;
	        (0, _gl.renderShader)(time);
	        document.hidden || requestAnimationFrame(startSnow);
	        framesUnderMinFpsCount = 0;
	    } else if (framesUnderMinFpsCount < MAX_JANK_FRAMES) {
	        shaderStartTime = time;
	        (0, _gl.renderShader)(time);
	        document.hidden || requestAnimationFrame(startSnow);
	        framesUnderMinFpsCount++;
	    } else if (document.querySelector('canvas')) {
	        // get rid of the canvas, we can't show a cool shader without jank
	        var canvas = document.querySelector('canvas');
	        canvas.style.opacity = 0;
	        canvas.addEventListener('transitionend', function (e) {
	            return e.target.parentNode.removeChild(e.target);
	        });
	        (0, _jankMessage2.default)();
	    }
	};

	var setupUI = function setupUI(e) {
	    // start the cool bits
	    if ('requestAnimationFrame' in window && 'performance' in window) {
	        shaderStartTime = performance.now();
	        requestAnimationFrame(startSnow);
	    }

	    // make sure ARIA is happy
	    if (window.innerWidth > App.smallBreakpoint) {
	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;

	        try {
	            for (var _iterator = Array.from(App.navExpanders)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                var expander = _step.value;

	                expander.removeAttribute('aria-expanded');
	            }
	        } catch (err) {
	            _didIteratorError = true;
	            _iteratorError = err;
	        } finally {
	            try {
	                if (!_iteratorNormalCompletion && _iterator.return) {
	                    _iterator.return();
	                }
	            } finally {
	                if (_didIteratorError) {
	                    throw _iteratorError;
	                }
	            }
	        }
	    }
	};

	// set DOM state of nav expanders
	if (App.navExpanders) {
	    var _iteratorNormalCompletion2 = true;
	    var _didIteratorError2 = false;
	    var _iteratorError2 = undefined;

	    try {
	        var _loop = function _loop() {
	            var expander = _step2.value;

	            expander.addEventListener('click', function (e) {
	                var expanded = expander.getAttribute('aria-expanded') == 'true';
	                expander.setAttribute('aria-expanded', !expanded);
	                App.nav.setAttribute('aria-expanded', !expanded);
	            });
	        };

	        for (var _iterator2 = Array.from(App.navExpanders)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	            _loop();
	        }
	    } catch (err) {
	        _didIteratorError2 = true;
	        _iteratorError2 = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                _iterator2.return();
	            }
	        } finally {
	            if (_didIteratorError2) {
	                throw _iteratorError2;
	            }
	        }
	    }
	}

	// attach a scroll listener for the footer graphic
	function scrollListener(e) {
	    if (window.scrollY + window.innerHeight > App.footer.offsetTop) {
	        (0, _neon.initializeNeon)();
	        document.removeEventListener('scroll', scrollListener);
	    }
	}

	document.addEventListener('scroll', scrollListener);
	scrollListener();

	// also reinit the footer graphic on click
	document.querySelector('.neon').addEventListener('click', function (e) {
	    (0, _neon.initializeNeon)();
	});

	document.addEventListener('visibilitychange', function (e) {
	    if (requestAnimationFrame) {
	        shaderStartTime = performance.now();
	        if ((0, _supportsWebgl2.default)()) {
	            document.hidden || requestAnimationFrame(startSnow);
	        } else {
	            console.info('It seems your browser doesn\'t support WebGL.', e);
	        }
	    }
	});

	document.addEventListener('DOMContentLoaded', function (e) {
	    if (App.isIntro) {
	        // this is where the header animation finishes, at which point we can do all sorts of stuff
	        var navItems = [].slice.call(document.getElementsByClassName('header__links__link'), 0);

	        for (var i in navItems) {
	            navItems[i].addEventListener('animationend', function (e) {
	                return e.stopPropagation();
	            });
	        }

	        document.querySelector('nav').addEventListener('animationend', setupUI);
	    } else {
	        setupUI();
	    }
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	function initializeNeon() {
	    var neonWrapper = document.querySelector('.neon');
	    var neons = document.querySelectorAll('.neon__component');

	    neonWrapper.style.opacity = 1;

	    for (var n = 0; n < neons.length; n++) {
	        var rotation = Math.floor((Math.random() - 0.5) * 80);
	        var scaleX = Math.random() / 2 + 0.7;
	        if (!n) rotation *= -1;
	        if (n != 1) neons[n].style.transformOrigin = Math.random() > 0.5 ? 'center right' : 'center left';
	        neons[n].style.transform = 'scaleX(' + scaleX + ') rotate(' + rotation + 'deg)';
	    }
	}

		exports.initializeNeon = initializeNeon;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var transparency = 1;
	var RESOLUTION_SCALING_FACTOR = 0.01;

	var gl = twgl.getWebGLContext(document.getElementById("snow"));
	var programInfo = twgl.createProgramInfo(gl, ["vs", "fs"]);

	var arrays = {
	    position: [-1, -1, 0, 1, -1, 0, -1, 1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0]
	};

	var bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays);

	twgl.resizeCanvasToDisplaySize(gl.canvas, RESOLUTION_SCALING_FACTOR);
	gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
	gl.useProgram(programInfo.program);
	twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);

	var renderShader = function renderShader(time) {

	    transparency = Math.abs(transparency) - 0.005 || transparency;

	    var uniforms = {
	        time: time * 0.001,
	        resolution: [gl.canvas.width, gl.canvas.height],
	        opacity: 1 - transparency
	    };

	    twgl.setUniforms(programInfo, uniforms);
	    twgl.drawBufferInfo(gl, bufferInfo);
	};

		exports.renderShader = renderShader;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = supportsWebGL;
	function supportsWebGL() {
	    try {
	        var canvas = document.createElement('canvas');
	        return !!window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
	    } catch (e) {
	        return false;
	    }
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = jankMessage;
	function jankMessage() {
	  console.warn("%cYo fps too low, use latest Chrome fam 😘", "background-color: black; color: white; font-weight: bold; font-size: x-large; padding: 0.5em; text-shadow: 0 0 5px black; background-size: 1em; background-position: center center; background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='15.5 15.5 224.5 224.5'%3E %3Cdefs%3E %3CradialGradient cy='0' cx='0.5' id='r'%3E %3Cstop stop-color='%23f06b59'/%3E %3Cstop offset='1' stop-color='%23df2227'/%3E %3C/radialGradient%3E %3CradialGradient r='0.76' cy='0.3' cx='0.65' id='g'%3E %3Cstop offset='0.65' stop-color='%234cb749'/%3E %3Cstop offset='1' stop-color='%23388b41'/%3E %3C/radialGradient%3E %3CradialGradient r='0.8' cy='0.25' cx='0.36' id='y'%3E %3Cstop offset='0.6' stop-color='%23FCD209'/%3E %3Cstop offset='0.7' stop-color='%23f7c616'/%3E %3Cstop offset='1' stop-color='%23bc821e'/%3E %3C/radialGradient%3E %3CradialGradient r='1' cy='0' cx='0.5' spreadMethod='pad' id='cf'%3E %3Cstop offset='0.1' stop-color='%237FB3DF'/%3E %3Cstop offset='0.9' stop-color='%230F5B94'/%3E %3C/radialGradient%3E %3CradialGradient id='cb' r='1' cy='0' cx='0.5'%3E %3Cstop offset='0' stop-color='%23F6F0EE'/%3E %3Cstop offset='1' stop-color='%23ddd'/%3E %3C/radialGradient%3E %3C/defs%3E %3Cpath d='m198,148a70,70 0 0 0 -140,0l20,0a50,50 0 0 1 100,0' fill-opacity='0.1'/%3E %3Ccircle r='45' cx='127.5' cy='127.6' fill='url(%23cf)' stroke='url(%23cb)' stroke-width='9' /%3E %3Cpath d='m228,78a112,112 0 0 0 -193,-13l45,78a50,50 0 0 1 47,-65' fill='url(%23r)'/%3E %3Cpath d='m35,65a112,112 0 0 0 84,174l47,-80a50,50 0 0 1 -86,-16' fill='url(%23g)'/%3E %3Cpath d='m119,239a112,112 0 0 0 109,-161l-101,0a50,50 0 0 1 39,81' fill='url(%23y)'/%3E %3Cpath d='m35,65l45,78a50,50 0 0 1 2,-34l-45,-47' opacity='0.075'/%3E %3Cpath d='m119,239l47,-80a50,50 0 0 1 -29,17l-20,63' opacity='0.05'/%3E %3Cpath d='m228,78l-101,0a50,50 0 0 1 39,19l64,-16' opacity='0.05'/%3E %3C/svg%3E\");");
	  console.log('\n');
	  console.info('%c👉 https://www.google.com/chrome/', "font-weight: bold; font-size: large; background: white; margin-top: 1em; padding: 0.5em; width: 100%;");
	}

/***/ }
/******/ ]);
//# sourceMappingURL=main.js.map