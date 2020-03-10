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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main/main.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _asyncToGenerator; });\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {\n  try {\n    var info = gen[key](arg);\n    var value = info.value;\n  } catch (error) {\n    reject(error);\n    return;\n  }\n\n  if (info.done) {\n    resolve(value);\n  } else {\n    Promise.resolve(value).then(_next, _throw);\n  }\n}\n\nfunction _asyncToGenerator(fn) {\n  return function () {\n    var self = this,\n        args = arguments;\n    return new Promise(function (resolve, reject) {\n      var gen = fn.apply(self, args);\n\n      function _next(value) {\n        asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value);\n      }\n\n      function _throw(err) {\n        asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err);\n      }\n\n      _next(undefined);\n    });\n  };\n}\n\n//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js?");

/***/ }),

/***/ "./src/config.ts":
/*!***********************!*\
  !*** ./src/config.ts ***!
  \***********************/
/*! exports provided: config */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"config\", function() { return config; });\nconst config = {\n  chromiumVersion: '662092'\n};\n\n//# sourceURL=webpack:///./src/config.ts?");

/***/ }),

/***/ "./src/main/IPC/IPCEvents.ts":
/*!***********************************!*\
  !*** ./src/main/IPC/IPCEvents.ts ***!
  \***********************************/
/*! exports provided: VERIFY_CHROME, BROWSER_STATE_CHANGE, START_TASKS, STOP_TASKS, GET_SAME_EMAILS, SET_BROWSER_EMAIL, SETUP_BROWSER, DOWNLOAD_CHROMIUM, CHROMIUM_DOWNLOAD_PROGRESS, WINDOW_MINIMIZE, WINDOW_CLOSE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"VERIFY_CHROME\", function() { return VERIFY_CHROME; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BROWSER_STATE_CHANGE\", function() { return BROWSER_STATE_CHANGE; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"START_TASKS\", function() { return START_TASKS; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"STOP_TASKS\", function() { return STOP_TASKS; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GET_SAME_EMAILS\", function() { return GET_SAME_EMAILS; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SET_BROWSER_EMAIL\", function() { return SET_BROWSER_EMAIL; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SETUP_BROWSER\", function() { return SETUP_BROWSER; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DOWNLOAD_CHROMIUM\", function() { return DOWNLOAD_CHROMIUM; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CHROMIUM_DOWNLOAD_PROGRESS\", function() { return CHROMIUM_DOWNLOAD_PROGRESS; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"WINDOW_MINIMIZE\", function() { return WINDOW_MINIMIZE; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"WINDOW_CLOSE\", function() { return WINDOW_CLOSE; });\nconst START_TASKS = 'START_TASKS';\nconst STOP_TASKS = 'STOP_TASKS';\nconst SETUP_BROWSER = 'SETUP_BROWSER';\nconst SET_BROWSER_EMAIL = 'SET_BROWSER_EMAIL';\nconst GET_SAME_EMAILS = 'GET_SAME_EMAILS';\nconst BROWSER_STATE_CHANGE = 'BROWSER_STATE_CHANGE';\nconst VERIFY_CHROME = 'VERIFY_CHROME';\nconst DOWNLOAD_CHROMIUM = 'DOWNLOAD_CHROMIUM';\nconst CHROMIUM_DOWNLOAD_PROGRESS = 'CHROMIUM_DOWNLOAD_PROGRESS';\nconst WINDOW_MINIMIZE = 'WINDOW_MINIMIZE';\nconst WINDOW_CLOSE = 'WINDOW_CLOSE';\n\n\n//# sourceURL=webpack:///./src/main/IPC/IPCEvents.ts?");

/***/ }),

/***/ "./src/main/IPC/IPCMain.ts":
/*!*********************************!*\
  !*** ./src/main/IPC/IPCMain.ts ***!
  \*********************************/
/*! exports provided: IPCMain */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"IPCMain\", function() { return IPCMain; });\n/* harmony import */ var electron_better_ipc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron-better-ipc */ \"electron-better-ipc\");\n/* harmony import */ var electron_better_ipc__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron_better_ipc__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _chromium_verifyChromium__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../chromium/verifyChromium */ \"./src/main/chromium/verifyChromium.ts\");\n/* harmony import */ var _chromium_downloadChromium__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../chromium/downloadChromium */ \"./src/main/chromium/downloadChromium.ts\");\n/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../main */ \"./src/main/main.ts\");\n/* harmony import */ var _bot_BrowsersManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../bot/BrowsersManager */ \"./src/main/bot/BrowsersManager.ts\");\n/* harmony import */ var _IPCEvents__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./IPCEvents */ \"./src/main/IPC/IPCEvents.ts\");\n\n\n\n\n\n\nclass IPCMain {\n  constructor() {}\n\n}\n\nIPCMain.registerListeners = () => {\n  electron_better_ipc__WEBPACK_IMPORTED_MODULE_0__[\"ipcMain\"].answerRenderer(_IPCEvents__WEBPACK_IMPORTED_MODULE_5__[\"VERIFY_CHROME\"], _chromium_verifyChromium__WEBPACK_IMPORTED_MODULE_1__[\"verifyChromium\"]);\n  electron_better_ipc__WEBPACK_IMPORTED_MODULE_0__[\"ipcMain\"].on(_IPCEvents__WEBPACK_IMPORTED_MODULE_5__[\"DOWNLOAD_CHROMIUM\"], _chromium_downloadChromium__WEBPACK_IMPORTED_MODULE_2__[\"downloadChromium\"]);\n  electron_better_ipc__WEBPACK_IMPORTED_MODULE_0__[\"ipcMain\"].on(_IPCEvents__WEBPACK_IMPORTED_MODULE_5__[\"SETUP_BROWSER\"], (e, data) => _bot_BrowsersManager__WEBPACK_IMPORTED_MODULE_4__[\"default\"].getInstance().setup(data));\n  electron_better_ipc__WEBPACK_IMPORTED_MODULE_0__[\"ipcMain\"].on(_IPCEvents__WEBPACK_IMPORTED_MODULE_5__[\"WINDOW_MINIMIZE\"], () => _main__WEBPACK_IMPORTED_MODULE_3__[\"mainWindow\"] === null || _main__WEBPACK_IMPORTED_MODULE_3__[\"mainWindow\"] === void 0 ? void 0 : _main__WEBPACK_IMPORTED_MODULE_3__[\"mainWindow\"].minimize());\n  electron_better_ipc__WEBPACK_IMPORTED_MODULE_0__[\"ipcMain\"].on(_IPCEvents__WEBPACK_IMPORTED_MODULE_5__[\"WINDOW_CLOSE\"], () => _main__WEBPACK_IMPORTED_MODULE_3__[\"mainWindow\"] === null || _main__WEBPACK_IMPORTED_MODULE_3__[\"mainWindow\"] === void 0 ? void 0 : _main__WEBPACK_IMPORTED_MODULE_3__[\"mainWindow\"].close());\n};\n\n//# sourceURL=webpack:///./src/main/IPC/IPCMain.ts?");

/***/ }),

/***/ "./src/main/bot/BrowserInstance.ts":
/*!*****************************************!*\
  !*** ./src/main/bot/BrowserInstance.ts ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator */ \"./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var puppeteer_extra__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! puppeteer-extra */ \"puppeteer-extra\");\n/* harmony import */ var puppeteer_extra__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(puppeteer_extra__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var puppeteer_DeviceDescriptors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! puppeteer/DeviceDescriptors */ \"puppeteer/DeviceDescriptors\");\n/* harmony import */ var puppeteer_DeviceDescriptors__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(puppeteer_DeviceDescriptors__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var puppeteer_extra_plugin_stealth__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! puppeteer-extra-plugin-stealth */ \"puppeteer-extra-plugin-stealth\");\n/* harmony import */ var puppeteer_extra_plugin_stealth__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(puppeteer_extra_plugin_stealth__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../main */ \"./src/main/main.ts\");\n/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! electron */ \"electron\");\n/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_6__);\n\n\n\n\n\n\n\n\nconst BrowserInstance =\n/*#__PURE__*/\nfunction () {\n  var _ref = Object(_Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function* (id, index = 0) {\n    _main__WEBPACK_IMPORTED_MODULE_5__[\"mainWindow\"] === null || _main__WEBPACK_IMPORTED_MODULE_5__[\"mainWindow\"] === void 0 ? void 0 : _main__WEBPACK_IMPORTED_MODULE_5__[\"mainWindow\"].webContents.send('BROWSER_STATE_CHANGE', {\n      id,\n      status: true\n    });\n    const appData = electron__WEBPACK_IMPORTED_MODULE_6__[\"app\"].getPath('userData');\n    const fetcher = puppeteer_extra__WEBPACK_IMPORTED_MODULE_2___default.a.createBrowserFetcher({\n      path: path__WEBPACK_IMPORTED_MODULE_1___default.a.resolve(appData, '.local-chromium')\n    });\n    const executablePath = fetcher.revisionInfo('662092').executablePath;\n    const userDataDirectory = path__WEBPACK_IMPORTED_MODULE_1___default.a.resolve(appData, id);\n    const {\n      width,\n      height,\n      deviceScaleFactor\n    } = puppeteer_DeviceDescriptors__WEBPACK_IMPORTED_MODULE_3___default.a['Pixel 2'].viewport;\n    puppeteer_extra__WEBPACK_IMPORTED_MODULE_2___default.a.use(puppeteer_extra_plugin_stealth__WEBPACK_IMPORTED_MODULE_4___default()());\n    const browser = yield puppeteer_extra__WEBPACK_IMPORTED_MODULE_2___default.a.launch({\n      headless: false,\n      devtools: false,\n      ignoreHTTPSErrors: true,\n      ignoreDefaultArgs: ['--enable-automation'],\n      args: ['--disable-infobars', '--no-first-run', '--enable-features=NetworkService', `--user-data-dir=${userDataDirectory}`, `--window-size=${width},${height + 82}`, `--window-position=${0 + 500 * index},0`],\n      executablePath\n    });\n    const page = yield browser.newPage();\n    const client = yield page.target().createCDPSession();\n    client.send('Network.setUserAgentOverride', {\n      userAgent: 'Mozilla/5.0 (Linux; Android 8.0; Pixel 2 Build/OPD3.170816.012) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3803.0 Mobile Safari/537.36',\n      locale: `en-US,en`,\n      platform: 'linux'\n    });\n    yield Promise.all([client.send('Emulation.setDeviceMetricsOverride', {\n      mobile: true,\n      width,\n      height,\n      deviceScaleFactor,\n      screenOrientation: {\n        angle: 0,\n        type: 'portraitPrimary'\n      }\n    }), client.send('Emulation.setTouchEmulationEnabled', {\n      enabled: true\n    }), client.send('Emulation.setEmitTouchEventsForMouse', {\n      enabled: true,\n      configuration: 'desktop'\n    })]);\n    page.on('close',\n    /*#__PURE__*/\n    Object(_Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function* () {\n      yield browser.close();\n    }));\n    browser.on('disconnected',\n    /*#__PURE__*/\n    Object(_Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function* () {\n      _main__WEBPACK_IMPORTED_MODULE_5__[\"mainWindow\"] === null || _main__WEBPACK_IMPORTED_MODULE_5__[\"mainWindow\"] === void 0 ? void 0 : _main__WEBPACK_IMPORTED_MODULE_5__[\"mainWindow\"].webContents.send('BROWSER_STATE_CHANGE', {\n        id,\n        status: false\n      });\n    }));\n    return browser;\n  });\n\n  return function BrowserInstance(_x) {\n    return _ref.apply(this, arguments);\n  };\n}();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (BrowserInstance);\n\n//# sourceURL=webpack:///./src/main/bot/BrowserInstance.ts?");

/***/ }),

/***/ "./src/main/bot/BrowsersManager.ts":
/*!*****************************************!*\
  !*** ./src/main/bot/BrowsersManager.ts ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator */ \"./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js\");\n/* harmony import */ var _BrowserInstance__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BrowserInstance */ \"./src/main/bot/BrowserInstance.ts\");\n/* harmony import */ var _setup_BrowserSetup__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./setup/BrowserSetup */ \"./src/main/bot/setup/BrowserSetup.ts\");\n/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ramda */ \"ramda\");\n/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(ramda__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _palace_ProductsMonitor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./palace/ProductsMonitor */ \"./src/main/bot/palace/ProductsMonitor.ts\");\n/* harmony import */ var _palace_palaceTask__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./palace/palaceTask */ \"./src/main/bot/palace/palaceTask.ts\");\n/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../main */ \"./src/main/main.ts\");\n\n\n\n\n\n\n\n\nclass BrowsersManager {\n  constructor() {\n    this.browsers = [];\n  }\n\n  static getInstance() {\n    var _this$instance;\n\n    this.instance = (_this$instance = this.instance) !== null && _this$instance !== void 0 ? _this$instance : new BrowsersManager();\n    return this.instance;\n  }\n\n  setup(data) {\n    var _this = this;\n\n    return Object(_Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function* () {\n      try {\n        const browser = yield Object(_BrowserInstance__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(data.id);\n\n        _this.browsers.push(browser);\n\n        const pages = yield browser.pages();\n        const page = ramda__WEBPACK_IMPORTED_MODULE_3__[\"last\"](pages);\n\n        if (!page) {\n          browser.close();\n          return;\n        }\n\n        Object(_setup_BrowserSetup__WEBPACK_IMPORTED_MODULE_2__[\"setupBrowser\"])(page, data.id);\n      } catch {\n        _main__WEBPACK_IMPORTED_MODULE_6__[\"mainWindow\"] === null || _main__WEBPACK_IMPORTED_MODULE_6__[\"mainWindow\"] === void 0 ? void 0 : _main__WEBPACK_IMPORTED_MODULE_6__[\"mainWindow\"].webContents.send('BROWSER_STATE_CHANGE', {\n          id: data.id,\n          status: false\n        });\n      }\n    })();\n  }\n\n  startTasks(tasks) {\n    var _this2 = this;\n\n    return Object(_Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function* () {\n      const monitors = {\n        eu: new _palace_ProductsMonitor__WEBPACK_IMPORTED_MODULE_4__[\"default\"](_palace_ProductsMonitor__WEBPACK_IMPORTED_MODULE_4__[\"PageRegion\"].Eu),\n        us: new _palace_ProductsMonitor__WEBPACK_IMPORTED_MODULE_4__[\"default\"](_palace_ProductsMonitor__WEBPACK_IMPORTED_MODULE_4__[\"PageRegion\"].Us)\n      };\n      tasks.forEach(\n      /*#__PURE__*/\n      function () {\n        var _ref = Object(_Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function* (task, index) {\n          var _task$browser, _task$site;\n\n          if (!task.browser) return;\n          const browser = yield Object(_BrowserInstance__WEBPACK_IMPORTED_MODULE_1__[\"default\"])((_task$browser = task.browser) === null || _task$browser === void 0 ? void 0 : _task$browser.value, index);\n\n          _this2.browsers.push(browser);\n\n          if (((_task$site = task.site) === null || _task$site === void 0 ? void 0 : _task$site.value) === 'palace') {\n            Object(_palace_palaceTask__WEBPACK_IMPORTED_MODULE_5__[\"palaceTask\"])(browser, task, monitors);\n          }\n        });\n\n        return function (_x, _x2) {\n          return _ref.apply(this, arguments);\n        };\n      }());\n    })();\n  }\n\n  stopAll() {\n    var _this3 = this;\n\n    return Object(_Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function* () {\n      const cleanUps = [];\n\n      _this3.browsers.forEach(b => {\n        if (!b.isConnected()) return;\n        cleanUps.push(b.close());\n      });\n\n      _this3.browsers = [];\n      yield Promise.all(cleanUps);\n    })();\n  }\n\n}\n\nBrowsersManager.instance = void 0;\n/* harmony default export */ __webpack_exports__[\"default\"] = (BrowsersManager);\n\n//# sourceURL=webpack:///./src/main/bot/BrowsersManager.ts?");

/***/ }),

/***/ "./src/main/bot/keywordsManager.ts":
/*!*****************************************!*\
  !*** ./src/main/bot/keywordsManager.ts ***!
  \*****************************************/
/*! exports provided: isMatch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isMatch\", function() { return isMatch; });\n/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ramda */ \"ramda\");\n/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ramda__WEBPACK_IMPORTED_MODULE_0__);\n\n\nconst isMatch = (name, keywords) => {\n  name = name.toLowerCase();\n  if (!ramda__WEBPACK_IMPORTED_MODULE_0__[\"all\"](ramda__WEBPACK_IMPORTED_MODULE_0__[\"includes\"](ramda__WEBPACK_IMPORTED_MODULE_0__[\"__\"], name))(keywords.positive)) return false;\n  if (ramda__WEBPACK_IMPORTED_MODULE_0__[\"any\"](ramda__WEBPACK_IMPORTED_MODULE_0__[\"includes\"](ramda__WEBPACK_IMPORTED_MODULE_0__[\"__\"], name))(keywords.negative)) return false;\n  if (!keywords.multi) return true;\n\n  for (const keyword of keywords.multi) {\n    const words = keyword.split(' | ');\n    if (ramda__WEBPACK_IMPORTED_MODULE_0__[\"none\"](ramda__WEBPACK_IMPORTED_MODULE_0__[\"includes\"](ramda__WEBPACK_IMPORTED_MODULE_0__[\"__\"], name))(words)) return false;\n  }\n\n  return true;\n};\n\n\n\n//# sourceURL=webpack:///./src/main/bot/keywordsManager.ts?");

/***/ }),

/***/ "./src/main/bot/palace/ProductFetcher.ts":
/*!***********************************************!*\
  !*** ./src/main/bot/palace/ProductFetcher.ts ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator */ \"./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js\");\n/* harmony import */ var _requests_autoRetryRequest__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../requests/autoRetryRequest */ \"./src/main/bot/requests/autoRetryRequest.ts\");\n/* harmony import */ var _requests_createFetcher__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../requests/createFetcher */ \"./src/main/bot/requests/createFetcher.ts\");\n\n\n\n\nclass ProductFetcher {\n  constructor(url) {\n    var _this = this;\n\n    this.url = url;\n    this.variantsFetcher = Object(_requests_createFetcher__WEBPACK_IMPORTED_MODULE_2__[\"createFetcher\"])(\n    /*#__PURE__*/\n    Object(_Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function* () {\n      const details = yield Object(_requests_autoRetryRequest__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(_this.url, true);\n      const variants = details.variants.filter(v => v.available).map(v => ({\n        id: v.id,\n        name: v.public_title.toLowerCase()\n      }));\n      return variants;\n    }));\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (ProductFetcher);\n\n//# sourceURL=webpack:///./src/main/bot/palace/ProductFetcher.ts?");

/***/ }),

/***/ "./src/main/bot/palace/ProductsMonitor.ts":
/*!************************************************!*\
  !*** ./src/main/bot/palace/ProductsMonitor.ts ***!
  \************************************************/
/*! exports provided: PageRegion, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"PageRegion\", function() { return PageRegion; });\n/* harmony import */ var _Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator */ \"./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js\");\n/* harmony import */ var cheerio__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cheerio */ \"cheerio\");\n/* harmony import */ var cheerio__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(cheerio__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _requests_autoRetryRequest__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../requests/autoRetryRequest */ \"./src/main/bot/requests/autoRetryRequest.ts\");\n/* harmony import */ var _requests_createFetcher__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../requests/createFetcher */ \"./src/main/bot/requests/createFetcher.ts\");\n/* harmony import */ var _ProductFetcher__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ProductFetcher */ \"./src/main/bot/palace/ProductFetcher.ts\");\n/* harmony import */ var _keywordsManager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../keywordsManager */ \"./src/main/bot/keywordsManager.ts\");\n\n\n\n\n\n\nlet PageRegion;\n\n(function (PageRegion) {\n  PageRegion[PageRegion[\"Us\"] = 0] = \"Us\";\n  PageRegion[PageRegion[\"Eu\"] = 1] = \"Eu\";\n})(PageRegion || (PageRegion = {}));\n\nclass ProductsMonitor {\n  get websiteUrl() {\n    return `https://shop${this.region === PageRegion.Eu ? '' : '-usa'}.palaceskateboards.com/`;\n  }\n\n  constructor(region) {\n    var _this = this;\n\n    this.region = region;\n    this.products = [];\n    this.productsPerPage = 30;\n    this.frontpageStatusUrl = `${this.websiteUrl}collections/frontpage.json`;\n    this.productsStatusUrl = `${this.websiteUrl}collections/new.json`;\n    this.frontpageUrl = `${this.websiteUrl}collections/frontpage?page=`;\n    this.productsUrl = `${this.websiteUrl}collections/new?page=`;\n    this.fetchPromise = null;\n    this.fetchProducts = Object(_requests_createFetcher__WEBPACK_IMPORTED_MODULE_3__[\"createFetcher\"])(\n    /*#__PURE__*/\n    Object(_Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function* () {\n      const productsAmount = yield _this.getProductsAmount();\n      const pages = Math.ceil(productsAmount / _this.productsPerPage);\n      _this.products = [];\n      const requests = [];\n\n      for (let i = 1; i < pages + 1; i++) {\n        requests.push(_this.requestPage(i, true));\n      }\n\n      _this.fetchPromise = Promise.all(requests);\n      yield _this.fetchPromise;\n      return _this.products;\n    }));\n    this.getProductsAmount =\n    /*#__PURE__*/\n    Object(_Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function* () {\n      const productsStatus = yield Object(_requests_autoRetryRequest__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_this.productsStatusUrl, true);\n      const productsCount = productsStatus.collection.products_count;\n      if (productsCount > 0) return productsCount;\n      const frontpageStatus = yield Object(_requests_autoRetryRequest__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_this.frontpageStatusUrl, true);\n      return frontpageStatus.collection.products_count;\n    });\n\n    this.requestPage =\n    /*#__PURE__*/\n    function () {\n      var _ref3 = Object(_Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function* (page, frontpage = false) {\n        const url = (frontpage ? _this.frontpageUrl : _this.productsUrl) + page;\n        const response = yield Object(_requests_autoRetryRequest__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(url);\n        const $ = cheerio__WEBPACK_IMPORTED_MODULE_1___default.a.load(response);\n        const html = $('.product-grid-item');\n\n        _this.parseProductsHtml($, html);\n      });\n\n      return function (_x) {\n        return _ref3.apply(this, arguments);\n      };\n    }();\n\n    this.getProductFetcher =\n    /*#__PURE__*/\n    function () {\n      var _ref4 = Object(_Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function* ({\n        keywords,\n        colors,\n        anyColor\n      }) {\n        yield _this.fetchProducts.get();\n\n        const product = _this.products.find(p => Object(_keywordsManager__WEBPACK_IMPORTED_MODULE_5__[\"isMatch\"])(p.name, keywords) && (Object(_keywordsManager__WEBPACK_IMPORTED_MODULE_5__[\"isMatch\"])(p.name, colors) || anyColor));\n\n        if (!product) return null;\n        if (!product.fetcher) product.fetcher = new _ProductFetcher__WEBPACK_IMPORTED_MODULE_4__[\"default\"](product.url);\n        return product.fetcher.variantsFetcher;\n      });\n\n      return function (_x2) {\n        return _ref4.apply(this, arguments);\n      };\n    }();\n\n    this.parseProductsHtml = ($, html) => {\n      html.each((i, product) => {\n        const name = product.attribs['data-alpha'];\n        const url = `${this.websiteUrl + $(product).find('.product-link').attr('href')}.js`;\n        this.products.push({\n          name,\n          url\n        });\n      });\n    };\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (ProductsMonitor);\n\n//# sourceURL=webpack:///./src/main/bot/palace/ProductsMonitor.ts?");

/***/ }),

/***/ "./src/main/bot/palace/palaceTask.ts":
/*!*******************************************!*\
  !*** ./src/main/bot/palace/palaceTask.ts ***!
  \*******************************************/
/*! exports provided: palaceTask */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"palaceTask\", function() { return palaceTask; });\n/* harmony import */ var _Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator */ \"./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js\");\n/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ramda */ \"ramda\");\n/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(ramda__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _requests_puppeteerExtensions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../requests/puppeteerExtensions */ \"./src/main/bot/requests/puppeteerExtensions.ts\");\n\n\n\n\nconst palaceTask =\n/*#__PURE__*/\nfunction () {\n  var _ref = Object(_Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function* (browser, task, monitor) {\n    const pages = yield browser.pages();\n    const page = ramda__WEBPACK_IMPORTED_MODULE_1__[\"last\"](pages);\n    if (!page) return;\n    const cookies = yield page.cookies('https://shop.palaceskateboards.com/');\n    yield page.deleteCookie(...cookies);\n    yield page.goto('https://shop.palaceskateboards.com/cart');\n    addToCart();\n\n    function addToCart() {\n      return _addToCart.apply(this, arguments);\n    }\n\n    function _addToCart() {\n      _addToCart = Object(_Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function* () {\n        if (!page) return;\n        let variantsPromises = [];\n\n        for (const product of task.products) {\n          variantsPromises.push(getProductVariant(product));\n        }\n\n        const variants = yield Promise.all(variantsPromises);\n        const payload = {\n          updates: {}\n        };\n        const availableVariants = variants.filter(v => v !== -1);\n        availableVariants.forEach(v => payload.updates[v.toString()] = 1);\n        const response = yield Object(_requests_puppeteerExtensions__WEBPACK_IMPORTED_MODULE_2__[\"postRequest\"])(page, '/cart/update.js', payload);\n        if (response.success) yield page.reload(); //span[contains(text(),'I agree')]\n\n        setTimeout(\n        /*#__PURE__*/\n        Object(_Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function* () {\n          const checkbox = yield page.$('.checkbox-msg');\n          if (checkbox) yield checkbox.tap();\n        }), 3000);\n      });\n      return _addToCart.apply(this, arguments);\n    }\n\n    function getProductVariant(_x4) {\n      return _getProductVariant.apply(this, arguments);\n    }\n\n    function _getProductVariant() {\n      _getProductVariant = Object(_Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function* (product) {\n        const fetcher = yield monitor.eu.getProductFetcher(product);\n        const variants = yield fetcher === null || fetcher === void 0 ? void 0 : fetcher.get();\n        const selectedVariant = variants === null || variants === void 0 ? void 0 : variants.find(v => {\n          var _product$size;\n\n          return v.name === ((_product$size = product.size) === null || _product$size === void 0 ? void 0 : _product$size.value.toLowerCase());\n        });\n        if (!selectedVariant) return -1;\n        return selectedVariant.id;\n      });\n      return _getProductVariant.apply(this, arguments);\n    }\n  });\n\n  return function palaceTask(_x, _x2, _x3) {\n    return _ref.apply(this, arguments);\n  };\n}();\n\n\n\n//# sourceURL=webpack:///./src/main/bot/palace/palaceTask.ts?");

/***/ }),

/***/ "./src/main/bot/requests/autoRetryRequest.ts":
/*!***************************************************!*\
  !*** ./src/main/bot/requests/autoRetryRequest.ts ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator */ \"./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js\");\n/* harmony import */ var request_promise_native__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! request-promise-native */ \"request-promise-native\");\n/* harmony import */ var request_promise_native__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(request_promise_native__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst headers = {\n  accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',\n  'accept-encoding': 'gzip, deflate, br',\n  'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',\n  'sec-fetch-mode': 'navigate',\n  'sec-fetch-site': 'none',\n  'upgrade-insecure-requests': '1',\n  'user-agent': 'Mozilla/5.0 (Linux; Android 8.0; Pixel 2 Build/OPD3.170816.012) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3803.0 Mobile Safari/537.36'\n};\n\nconst autoRetryRequest =\n/*#__PURE__*/\nfunction () {\n  var _ref = Object(_Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function* (url, json = false) {\n    try {\n      const response = yield request_promise_native__WEBPACK_IMPORTED_MODULE_1___default.a.get(url, {\n        headers,\n        timeout: 3000,\n        encoding: 'utf-8',\n        gzip: true\n      });\n      return json ? JSON.parse(response) : response;\n    } catch (ex) {\n      console.log(ex);\n      return autoRetryRequest(url);\n    }\n  });\n\n  return function autoRetryRequest(_x) {\n    return _ref.apply(this, arguments);\n  };\n}();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (autoRetryRequest);\n\n//# sourceURL=webpack:///./src/main/bot/requests/autoRetryRequest.ts?");

/***/ }),

/***/ "./src/main/bot/requests/createFetcher.ts":
/*!************************************************!*\
  !*** ./src/main/bot/requests/createFetcher.ts ***!
  \************************************************/
/*! exports provided: createFetcher */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createFetcher\", function() { return createFetcher; });\nconst createFetcher = (fn, delay = 0) => {\n  let promise = null;\n  let isPending = false;\n  let lastFetch;\n\n  const onFinished = () => {\n    isPending = false;\n    lastFetch = Date.now();\n  };\n\n  const innerFn = (refresh = false, forceRefresh = false) => {\n    if (promise === null || !isPending && forceRefresh || !isPending && refresh && (isNaN(lastFetch) || Date.now() - lastFetch > delay)) {\n      isPending = true;\n      promise = fn();\n      promise.then(onFinished).catch(onFinished);\n    }\n\n    return promise;\n  };\n\n  return {\n    get: () => innerFn(false),\n    refresh: () => innerFn(true),\n    forceRefresh: () => innerFn(false, true)\n  };\n};\n\n\n\n//# sourceURL=webpack:///./src/main/bot/requests/createFetcher.ts?");

/***/ }),

/***/ "./src/main/bot/requests/puppeteerExtensions.ts":
/*!******************************************************!*\
  !*** ./src/main/bot/requests/puppeteerExtensions.ts ***!
  \******************************************************/
/*! exports provided: postRequest */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"postRequest\", function() { return postRequest; });\n/* harmony import */ var _Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator */ \"./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js\");\n\n\nconst postRequest =\n/*#__PURE__*/\nfunction () {\n  var _ref = Object(_Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function* (page, url, payload) {\n    console.log(payload);\n\n    try {\n      //* See: https://github.com/puppeteer/puppeteer/issues/1665\n      const response = yield page === null || page === void 0 ? void 0 : page.evaluate(`(async() => {\n      const response = await fetch(window.location.origin + \"${url}\", {\n        method: 'POST',\n        body: JSON.stringify(${JSON.stringify(payload)}),\n        headers: {\n          'Content-Type': 'application/json',\n        },\n      });\n      return await response.json();\n    })()`);\n      return {\n        success: true,\n        response: response\n      };\n    } catch (ex) {\n      return {\n        success: false,\n        response: null\n      };\n    }\n  });\n\n  return function postRequest(_x, _x2, _x3) {\n    return _ref.apply(this, arguments);\n  };\n}();\n\n\n\n//# sourceURL=webpack:///./src/main/bot/requests/puppeteerExtensions.ts?");

/***/ }),

/***/ "./src/main/bot/setup/BrowserSetup.ts":
/*!********************************************!*\
  !*** ./src/main/bot/setup/BrowserSetup.ts ***!
  \********************************************/
/*! exports provided: setupBrowser */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setupBrowser\", function() { return setupBrowser; });\n/* harmony import */ var _Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator */ \"./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js\");\n/* harmony import */ var electron_better_ipc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! electron-better-ipc */ \"electron-better-ipc\");\n/* harmony import */ var electron_better_ipc__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(electron_better_ipc__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../main */ \"./src/main/main.ts\");\n\n\n\n\nconst setupBrowser =\n/*#__PURE__*/\nfunction () {\n  var _ref = Object(_Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function* (page, id) {\n    const browser = page.browser();\n\n    if (!page) {\n      browser.close();\n      return;\n    }\n\n    yield page.goto('https://accounts.google.com/signin/v2/identifier?flowName=GlifWebSignIn&flowEntry=ServiceLogin&hl=en');\n    page.on('load',\n    /*#__PURE__*/\n    Object(_Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function* () {\n      if (!_main__WEBPACK_IMPORTED_MODULE_2__[\"mainWindow\"]) return;\n      const url = page.url();\n      if (!url.includes('https://myaccount.google.com/')) return;\n      yield page.waitForXPath(\"//div[contains(text(),'@gmail.com')]\");\n      const accountEmailElements = yield page.$x(\"//div[contains(text(),'@gmail.com')]\");\n      if (accountEmailElements.length < 1) return;\n      const [accountEmailNode] = accountEmailElements;\n      const emailProperty = yield accountEmailNode.getProperty('innerText');\n      let email = yield emailProperty.jsonValue();\n      const sameEmails = yield electron_better_ipc__WEBPACK_IMPORTED_MODULE_1__[\"ipcMain\"].callRenderer(_main__WEBPACK_IMPORTED_MODULE_2__[\"mainWindow\"], 'GET_SAME_EMAILS', email);\n\n      if (sameEmails.length > 0) {\n        email += ` (${sameEmails.length + 1})`;\n      }\n\n      electron_better_ipc__WEBPACK_IMPORTED_MODULE_1__[\"ipcMain\"].sendToRenderers('SET_BROWSER_EMAIL', {\n        id,\n        email\n      });\n      browser.close();\n    }));\n  });\n\n  return function setupBrowser(_x, _x2) {\n    return _ref.apply(this, arguments);\n  };\n}();\n\n\n\n//# sourceURL=webpack:///./src/main/bot/setup/BrowserSetup.ts?");

/***/ }),

/***/ "./src/main/chromium/downloadChromium.ts":
/*!***********************************************!*\
  !*** ./src/main/chromium/downloadChromium.ts ***!
  \***********************************************/
/*! exports provided: downloadChromium */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"downloadChromium\", function() { return downloadChromium; });\n/* harmony import */ var _Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator */ \"./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js\");\n/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! electron */ \"electron\");\n/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var puppeteer_extra__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! puppeteer-extra */ \"puppeteer-extra\");\n/* harmony import */ var puppeteer_extra__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(puppeteer_extra__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../main */ \"./src/main/main.ts\");\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../config */ \"./src/config.ts\");\n/* harmony import */ var _IPC_IPCEvents__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../IPC/IPCEvents */ \"./src/main/IPC/IPCEvents.ts\");\n\n\n\n\n\n\n\n\nconst downloadChromium = e => {\n  const chromiumPath = path__WEBPACK_IMPORTED_MODULE_2___default.a.resolve(electron__WEBPACK_IMPORTED_MODULE_1__[\"app\"].getPath('userData'), '.local-chromium');\n  const fetcher = puppeteer_extra__WEBPACK_IMPORTED_MODULE_3___default.a.createBrowserFetcher({\n    path: chromiumPath\n  });\n  let prevPercentage = 0;\n  fetcher.download(_config__WEBPACK_IMPORTED_MODULE_5__[\"config\"].chromiumVersion,\n  /*#__PURE__*/\n  function () {\n    var _ref = Object(_Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function* (downloadedBytes, totalBytes) {\n      const status = {\n        progress: Math.round(downloadedBytes / totalBytes * 100),\n        done: downloadedBytes === totalBytes\n      };\n\n      if (status.progress > prevPercentage || status.done) {\n        prevPercentage = status.progress;\n        _main__WEBPACK_IMPORTED_MODULE_4__[\"mainWindow\"] === null || _main__WEBPACK_IMPORTED_MODULE_4__[\"mainWindow\"] === void 0 ? void 0 : _main__WEBPACK_IMPORTED_MODULE_4__[\"mainWindow\"].webContents.send(_IPC_IPCEvents__WEBPACK_IMPORTED_MODULE_6__[\"CHROMIUM_DOWNLOAD_PROGRESS\"], status);\n      }\n    });\n\n    return function (_x, _x2) {\n      return _ref.apply(this, arguments);\n    };\n  }());\n};\n\n\n\n//# sourceURL=webpack:///./src/main/chromium/downloadChromium.ts?");

/***/ }),

/***/ "./src/main/chromium/verifyChromium.ts":
/*!*********************************************!*\
  !*** ./src/main/chromium/verifyChromium.ts ***!
  \*********************************************/
/*! exports provided: verifyChromium */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"verifyChromium\", function() { return verifyChromium; });\n/* harmony import */ var _Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator */ \"./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js\");\n/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! electron */ \"electron\");\n/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var fs_extra__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! fs-extra */ \"fs-extra\");\n/* harmony import */ var fs_extra__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(fs_extra__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var puppeteer_extra__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! puppeteer-extra */ \"puppeteer-extra\");\n/* harmony import */ var puppeteer_extra__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(puppeteer_extra__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../config */ \"./src/config.ts\");\n\n\n\n\n\n\nconst verifyChromium =\n/*#__PURE__*/\nfunction () {\n  var _ref = Object(_Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function* (e) {\n    const appData = electron__WEBPACK_IMPORTED_MODULE_1__[\"app\"].getPath('userData');\n    const chromiumPath = path__WEBPACK_IMPORTED_MODULE_2___default.a.resolve(appData, '.local-chromium');\n\n    try {\n      fs_extra__WEBPACK_IMPORTED_MODULE_3___default.a.accessSync(chromiumPath);\n      const fetcher = puppeteer_extra__WEBPACK_IMPORTED_MODULE_4___default.a.createBrowserFetcher({\n        path: chromiumPath\n      });\n      const versions = yield fetcher.localRevisions();\n      if (versions.length < 1) return false;\n      const executablePath = fetcher.revisionInfo(_config__WEBPACK_IMPORTED_MODULE_5__[\"config\"].chromiumVersion).executablePath;\n      const browser = yield puppeteer_extra__WEBPACK_IMPORTED_MODULE_4___default.a.launch({\n        executablePath,\n        headless: true\n      });\n      const page = yield browser.newPage();\n      yield page.goto('http://example.com/');\n      yield browser.close();\n      return {\n        success: true,\n        executablePath\n      };\n    } catch (ex) {\n      console.log('Error while testing browser.');\n      console.log(ex);\n      fs_extra__WEBPACK_IMPORTED_MODULE_3___default.a.removeSync(chromiumPath);\n      return {\n        success: false,\n        executablePath: 'fail'\n      };\n    }\n  });\n\n  return function verifyChromium(_x) {\n    return _ref.apply(this, arguments);\n  };\n}();\n\n//# sourceURL=webpack:///./src/main/chromium/verifyChromium.ts?");

/***/ }),

/***/ "./src/main/main.ts":
/*!**************************!*\
  !*** ./src/main/main.ts ***!
  \**************************/
/*! exports provided: mainWindow */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"mainWindow\", function() { return mainWindow; });\n/* harmony import */ var _Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator */ \"./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js\");\n/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! electron */ \"electron\");\n/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _IPC_IPCMain__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./IPC/IPCMain */ \"./src/main/IPC/IPCMain.ts\");\n\n\n\n\nconst isDev = \"development\" === 'development';\nlet mainWindow = null;\n\nconst installExtensions =\n/*#__PURE__*/\nfunction () {\n  var _ref = Object(_Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function* () {\n    const installer = __webpack_require__(/*! electron-devtools-installer */ \"electron-devtools-installer\");\n\n    const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];\n    const forceDownload = !!process.env.UPGRADE_EXTENSIONS;\n\n    for (const name of extensions) {\n      try {\n        yield installer.default(installer[name], forceDownload);\n      } catch (e) {\n        console.log(`Error installing ${name} extension: ${e.message}`);\n      }\n    }\n  });\n\n  return function installExtensions() {\n    return _ref.apply(this, arguments);\n  };\n}();\n\nconst createWindow = () => {\n  if (isDev) {\n    installExtensions();\n  }\n\n  const launchOptions = {\n    width: 1200,\n    height: 750,\n    frame: false,\n    show: false,\n    resizable: false,\n    maximizable: false,\n    fullscreenable: false,\n    titleBarStyle: 'hiddenInset',\n    webPreferences: {\n      nodeIntegration: true,\n      backgroundThrottling: false\n    }\n  };\n  mainWindow = new electron__WEBPACK_IMPORTED_MODULE_1__[\"BrowserWindow\"](launchOptions);\n  const url = isDev ? 'http://localhost:3000' : `file://${path__WEBPACK_IMPORTED_MODULE_2___default.a.join(__dirname, '../build/index.html')}`;\n  mainWindow.loadURL(url);\n  mainWindow.webContents.once('did-finish-load', () => {\n    if (!mainWindow) return;\n    mainWindow.show();\n    if (!isDev) return;\n    mainWindow.webContents.openDevTools(); // * Create context menu to inspect element on right click\n\n    mainWindow.webContents.on('context-menu', (e, props) => {\n      electron__WEBPACK_IMPORTED_MODULE_1__[\"Menu\"].buildFromTemplate([{\n        label: 'Inspect element',\n        click: () => {\n          mainWindow.inspectElement(props.x, props.y);\n        }\n      }]).popup(mainWindow);\n    });\n  });\n  mainWindow.on('closed', () => mainWindow = null);\n};\n\nelectron__WEBPACK_IMPORTED_MODULE_1__[\"app\"].on('ready', createWindow);\nelectron__WEBPACK_IMPORTED_MODULE_1__[\"app\"].on('window-all-closed', () => {\n  if (process.platform !== 'darwin') {\n    electron__WEBPACK_IMPORTED_MODULE_1__[\"app\"].quit();\n  }\n});\nelectron__WEBPACK_IMPORTED_MODULE_1__[\"app\"].on('activate', () => {\n  if (mainWindow === null) {\n    createWindow();\n  }\n});\n_IPC_IPCMain__WEBPACK_IMPORTED_MODULE_3__[\"IPCMain\"].registerListeners();\n\n\n//# sourceURL=webpack:///./src/main/main.ts?");

/***/ }),

/***/ "cheerio":
/*!**************************!*\
  !*** external "cheerio" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"cheerio\");\n\n//# sourceURL=webpack:///external_%22cheerio%22?");

/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"electron\");\n\n//# sourceURL=webpack:///external_%22electron%22?");

/***/ }),

/***/ "electron-better-ipc":
/*!**************************************!*\
  !*** external "electron-better-ipc" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"electron-better-ipc\");\n\n//# sourceURL=webpack:///external_%22electron-better-ipc%22?");

/***/ }),

/***/ "electron-devtools-installer":
/*!**********************************************!*\
  !*** external "electron-devtools-installer" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"electron-devtools-installer\");\n\n//# sourceURL=webpack:///external_%22electron-devtools-installer%22?");

/***/ }),

/***/ "fs-extra":
/*!***************************!*\
  !*** external "fs-extra" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs-extra\");\n\n//# sourceURL=webpack:///external_%22fs-extra%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "puppeteer-extra":
/*!**********************************!*\
  !*** external "puppeteer-extra" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"puppeteer-extra\");\n\n//# sourceURL=webpack:///external_%22puppeteer-extra%22?");

/***/ }),

/***/ "puppeteer-extra-plugin-stealth":
/*!*************************************************!*\
  !*** external "puppeteer-extra-plugin-stealth" ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"puppeteer-extra-plugin-stealth\");\n\n//# sourceURL=webpack:///external_%22puppeteer-extra-plugin-stealth%22?");

/***/ }),

/***/ "puppeteer/DeviceDescriptors":
/*!**********************************************!*\
  !*** external "puppeteer/DeviceDescriptors" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"puppeteer/DeviceDescriptors\");\n\n//# sourceURL=webpack:///external_%22puppeteer/DeviceDescriptors%22?");

/***/ }),

/***/ "ramda":
/*!************************!*\
  !*** external "ramda" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"ramda\");\n\n//# sourceURL=webpack:///external_%22ramda%22?");

/***/ }),

/***/ "request-promise-native":
/*!*****************************************!*\
  !*** external "request-promise-native" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"request-promise-native\");\n\n//# sourceURL=webpack:///external_%22request-promise-native%22?");

/***/ })

/******/ });