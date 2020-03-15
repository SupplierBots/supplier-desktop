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
/*! exports provided: VERIFY_CHROME, BROWSER_STATE_CHANGE, START_TASKS, STOP_TASKS, GET_SAME_EMAILS, SET_BROWSER_EMAIL, SETUP_BROWSER, DOWNLOAD_CHROMIUM, CHROMIUM_DOWNLOAD_PROGRESS, WINDOW_MINIMIZE, WINDOW_CLOSE, GET_PROFILE, UPDATE_TASK_STATUS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"VERIFY_CHROME\", function() { return VERIFY_CHROME; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BROWSER_STATE_CHANGE\", function() { return BROWSER_STATE_CHANGE; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"START_TASKS\", function() { return START_TASKS; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"STOP_TASKS\", function() { return STOP_TASKS; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GET_SAME_EMAILS\", function() { return GET_SAME_EMAILS; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SET_BROWSER_EMAIL\", function() { return SET_BROWSER_EMAIL; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SETUP_BROWSER\", function() { return SETUP_BROWSER; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DOWNLOAD_CHROMIUM\", function() { return DOWNLOAD_CHROMIUM; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CHROMIUM_DOWNLOAD_PROGRESS\", function() { return CHROMIUM_DOWNLOAD_PROGRESS; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"WINDOW_MINIMIZE\", function() { return WINDOW_MINIMIZE; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"WINDOW_CLOSE\", function() { return WINDOW_CLOSE; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GET_PROFILE\", function() { return GET_PROFILE; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"UPDATE_TASK_STATUS\", function() { return UPDATE_TASK_STATUS; });\nconst START_TASKS = 'START_TASKS';\nconst STOP_TASKS = 'STOP_TASKS';\nconst SETUP_BROWSER = 'SETUP_BROWSER';\nconst SET_BROWSER_EMAIL = 'SET_BROWSER_EMAIL';\nconst GET_SAME_EMAILS = 'GET_SAME_EMAILS';\nconst BROWSER_STATE_CHANGE = 'BROWSER_STATE_CHANGE';\nconst VERIFY_CHROME = 'VERIFY_CHROME';\nconst DOWNLOAD_CHROMIUM = 'DOWNLOAD_CHROMIUM';\nconst CHROMIUM_DOWNLOAD_PROGRESS = 'CHROMIUM_DOWNLOAD_PROGRESS';\nconst WINDOW_MINIMIZE = 'WINDOW_MINIMIZE';\nconst WINDOW_CLOSE = 'WINDOW_CLOSE';\nconst GET_PROFILE = 'GET_PROFILE';\nconst UPDATE_TASK_STATUS = 'UPDATE_TASK_STATUS';\n\n\n//# sourceURL=webpack:///./src/main/IPC/IPCEvents.ts?");

/***/ }),

/***/ "./src/main/IPC/IPCMain.ts":
/*!*********************************!*\
  !*** ./src/main/IPC/IPCMain.ts ***!
  \*********************************/
/*! exports provided: IPCMain */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"IPCMain\", function() { return IPCMain; });\n/* harmony import */ var _Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator */ \"./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js\");\n/* harmony import */ var electron_better_ipc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! electron-better-ipc */ \"electron-better-ipc\");\n/* harmony import */ var electron_better_ipc__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(electron_better_ipc__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _chromium_verifyChromium__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../chromium/verifyChromium */ \"./src/main/chromium/verifyChromium.ts\");\n/* harmony import */ var _chromium_downloadChromium__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../chromium/downloadChromium */ \"./src/main/chromium/downloadChromium.ts\");\n/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../main */ \"./src/main/main.ts\");\n/* harmony import */ var _bot_BrowsersManager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../bot/BrowsersManager */ \"./src/main/bot/BrowsersManager.ts\");\n/* harmony import */ var _IPCEvents__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./IPCEvents */ \"./src/main/IPC/IPCEvents.ts\");\n\n\n\n\n\n\n\nclass IPCMain {\n  constructor() {}\n\n}\n\nIPCMain.registerListeners = () => {\n  electron_better_ipc__WEBPACK_IMPORTED_MODULE_1__[\"ipcMain\"].answerRenderer(_IPCEvents__WEBPACK_IMPORTED_MODULE_6__[\"VERIFY_CHROME\"], _chromium_verifyChromium__WEBPACK_IMPORTED_MODULE_2__[\"verifyChromium\"]);\n  electron_better_ipc__WEBPACK_IMPORTED_MODULE_1__[\"ipcMain\"].on(_IPCEvents__WEBPACK_IMPORTED_MODULE_6__[\"DOWNLOAD_CHROMIUM\"], _chromium_downloadChromium__WEBPACK_IMPORTED_MODULE_3__[\"downloadChromium\"]);\n  electron_better_ipc__WEBPACK_IMPORTED_MODULE_1__[\"ipcMain\"].on(_IPCEvents__WEBPACK_IMPORTED_MODULE_6__[\"SETUP_BROWSER\"], (e, data) => _bot_BrowsersManager__WEBPACK_IMPORTED_MODULE_5__[\"default\"].getInstance().setup(data));\n  electron_better_ipc__WEBPACK_IMPORTED_MODULE_1__[\"ipcMain\"].on(_IPCEvents__WEBPACK_IMPORTED_MODULE_6__[\"START_TASKS\"], (e, tasks) => _bot_BrowsersManager__WEBPACK_IMPORTED_MODULE_5__[\"default\"].getInstance().startTasks(tasks));\n  electron_better_ipc__WEBPACK_IMPORTED_MODULE_1__[\"ipcMain\"].on(_IPCEvents__WEBPACK_IMPORTED_MODULE_6__[\"STOP_TASKS\"], e => _bot_BrowsersManager__WEBPACK_IMPORTED_MODULE_5__[\"default\"].getInstance().stopAll());\n  electron_better_ipc__WEBPACK_IMPORTED_MODULE_1__[\"ipcMain\"].on(_IPCEvents__WEBPACK_IMPORTED_MODULE_6__[\"WINDOW_MINIMIZE\"], () => _main__WEBPACK_IMPORTED_MODULE_4__[\"mainWindow\"] === null || _main__WEBPACK_IMPORTED_MODULE_4__[\"mainWindow\"] === void 0 ? void 0 : _main__WEBPACK_IMPORTED_MODULE_4__[\"mainWindow\"].minimize());\n  electron_better_ipc__WEBPACK_IMPORTED_MODULE_1__[\"ipcMain\"].on(_IPCEvents__WEBPACK_IMPORTED_MODULE_6__[\"WINDOW_CLOSE\"], () => _main__WEBPACK_IMPORTED_MODULE_4__[\"mainWindow\"] === null || _main__WEBPACK_IMPORTED_MODULE_4__[\"mainWindow\"] === void 0 ? void 0 : _main__WEBPACK_IMPORTED_MODULE_4__[\"mainWindow\"].close());\n};\n\nIPCMain.getProfile =\n/*#__PURE__*/\nfunction () {\n  var _ref = Object(_Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function* (id) {\n    if (!_main__WEBPACK_IMPORTED_MODULE_4__[\"mainWindow\"]) return;\n    const profile = yield electron_better_ipc__WEBPACK_IMPORTED_MODULE_1__[\"ipcMain\"].callRenderer(_main__WEBPACK_IMPORTED_MODULE_4__[\"mainWindow\"], _IPCEvents__WEBPACK_IMPORTED_MODULE_6__[\"GET_PROFILE\"], id);\n    return profile;\n  });\n\n  return function (_x) {\n    return _ref.apply(this, arguments);\n  };\n}();\n\nIPCMain.updateTaskStatus = (task, status) => {\n  if (!_main__WEBPACK_IMPORTED_MODULE_4__[\"mainWindow\"]) return;\n  const newState = { ...task,\n    status\n  };\n  _main__WEBPACK_IMPORTED_MODULE_4__[\"mainWindow\"].webContents.send(_IPCEvents__WEBPACK_IMPORTED_MODULE_6__[\"UPDATE_TASK_STATUS\"], newState);\n};\n\nIPCMain.getSameEmails =\n/*#__PURE__*/\nfunction () {\n  var _ref2 = Object(_Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function* (email) {\n    if (!_main__WEBPACK_IMPORTED_MODULE_4__[\"mainWindow\"]) return;\n    const emails = yield electron_better_ipc__WEBPACK_IMPORTED_MODULE_1__[\"ipcMain\"].callRenderer(_main__WEBPACK_IMPORTED_MODULE_4__[\"mainWindow\"], _IPCEvents__WEBPACK_IMPORTED_MODULE_6__[\"GET_SAME_EMAILS\"], email);\n    return emails;\n  });\n\n  return function (_x2) {\n    return _ref2.apply(this, arguments);\n  };\n}();\n\nIPCMain.browserStateChange = (id, status) => {\n  _main__WEBPACK_IMPORTED_MODULE_4__[\"mainWindow\"] === null || _main__WEBPACK_IMPORTED_MODULE_4__[\"mainWindow\"] === void 0 ? void 0 : _main__WEBPACK_IMPORTED_MODULE_4__[\"mainWindow\"].webContents.send(_IPCEvents__WEBPACK_IMPORTED_MODULE_6__[\"BROWSER_STATE_CHANGE\"], {\n    id,\n    status\n  });\n};\n\nIPCMain.setBrowserEmail = (id, email) => {\n  _main__WEBPACK_IMPORTED_MODULE_4__[\"mainWindow\"] === null || _main__WEBPACK_IMPORTED_MODULE_4__[\"mainWindow\"] === void 0 ? void 0 : _main__WEBPACK_IMPORTED_MODULE_4__[\"mainWindow\"].webContents.send(_IPCEvents__WEBPACK_IMPORTED_MODULE_6__[\"SET_BROWSER_EMAIL\"], {\n    id,\n    email\n  });\n};\n\n//# sourceURL=webpack:///./src/main/IPC/IPCMain.ts?");

/***/ }),

/***/ "./src/main/bot/BrowserInstance.ts":
/*!*****************************************!*\
  !*** ./src/main/bot/BrowserInstance.ts ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator */ \"./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var puppeteer_extra__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! puppeteer-extra */ \"puppeteer-extra\");\n/* harmony import */ var puppeteer_extra__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(puppeteer_extra__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var puppeteer_DeviceDescriptors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! puppeteer/DeviceDescriptors */ \"puppeteer/DeviceDescriptors\");\n/* harmony import */ var puppeteer_DeviceDescriptors__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(puppeteer_DeviceDescriptors__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var puppeteer_extra_plugin_stealth__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! puppeteer-extra-plugin-stealth */ \"puppeteer-extra-plugin-stealth\");\n/* harmony import */ var puppeteer_extra_plugin_stealth__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(puppeteer_extra_plugin_stealth__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! electron */ \"electron\");\n/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _IPC_IPCMain__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../IPC/IPCMain */ \"./src/main/IPC/IPCMain.ts\");\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../config */ \"./src/config.ts\");\n\n\n\n\n\n\n\n\n\nconst BrowserInstance =\n/*#__PURE__*/\nfunction () {\n  var _ref = Object(_Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function* (id, index = 0) {\n    _IPC_IPCMain__WEBPACK_IMPORTED_MODULE_6__[\"IPCMain\"].browserStateChange(id, true);\n    const appData = electron__WEBPACK_IMPORTED_MODULE_5__[\"app\"].getPath('userData');\n    const fetcher = puppeteer_extra__WEBPACK_IMPORTED_MODULE_2___default.a.createBrowserFetcher({\n      path: path__WEBPACK_IMPORTED_MODULE_1___default.a.resolve(appData, '.local-chromium')\n    });\n    const executablePath = fetcher.revisionInfo(_config__WEBPACK_IMPORTED_MODULE_7__[\"config\"].chromiumVersion).executablePath;\n    const userDataDirectory = path__WEBPACK_IMPORTED_MODULE_1___default.a.resolve(appData, id);\n    const {\n      width,\n      height,\n      deviceScaleFactor\n    } = puppeteer_DeviceDescriptors__WEBPACK_IMPORTED_MODULE_3___default.a['Pixel 2'].viewport;\n    puppeteer_extra__WEBPACK_IMPORTED_MODULE_2___default.a.use(puppeteer_extra_plugin_stealth__WEBPACK_IMPORTED_MODULE_4___default()());\n    const browser = yield puppeteer_extra__WEBPACK_IMPORTED_MODULE_2___default.a.launch({\n      headless: false,\n      devtools: false,\n      ignoreHTTPSErrors: true,\n      ignoreDefaultArgs: ['--enable-automation'],\n      args: ['--disable-infobars', '--no-first-run', '--enable-features=NetworkService', `--user-data-dir=${userDataDirectory}`, `--window-size=${width},${height + 82}`, `--window-position=${0 + 500 * index},0`],\n      executablePath\n    });\n    const page = yield browser.newPage();\n    const client = yield page.target().createCDPSession();\n    browser.on('targetcreated', target => {\n      console.log(target.url());\n\n      if (target.url().includes('devtools')) {//browser.close();\n      }\n    });\n    client.send('Network.setUserAgentOverride', {\n      userAgent: 'Mozilla/5.0 (Linux; Android 8.0; Pixel 2 Build/OPD3.170816.012) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3803.0 Mobile Safari/537.36',\n      locale: `en-US,en`,\n      platform: 'linux'\n    });\n    yield Promise.all([client.send('Emulation.setDeviceMetricsOverride', {\n      mobile: true,\n      width,\n      height,\n      deviceScaleFactor,\n      screenOrientation: {\n        angle: 0,\n        type: 'portraitPrimary'\n      }\n    }), client.send('Emulation.setTouchEmulationEnabled', {\n      enabled: true\n    }), client.send('Emulation.setEmitTouchEventsForMouse', {\n      enabled: true,\n      configuration: 'desktop'\n    })]);\n    page.on('close',\n    /*#__PURE__*/\n    Object(_Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function* () {\n      yield browser.close();\n    }));\n    browser.on('disconnected',\n    /*#__PURE__*/\n    Object(_Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function* () {\n      _IPC_IPCMain__WEBPACK_IMPORTED_MODULE_6__[\"IPCMain\"].browserStateChange(id, false);\n    }));\n    return browser;\n  });\n\n  return function BrowserInstance(_x) {\n    return _ref.apply(this, arguments);\n  };\n}();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (BrowserInstance);\n\n//# sourceURL=webpack:///./src/main/bot/BrowserInstance.ts?");

/***/ }),

/***/ "./src/main/bot/BrowsersManager.ts":
/*!*****************************************!*\
  !*** ./src/main/bot/BrowsersManager.ts ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator */ \"./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js\");\n/* harmony import */ var _BrowserInstance__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BrowserInstance */ \"./src/main/bot/BrowserInstance.ts\");\n/* harmony import */ var _setup_BrowserSetup__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./setup/BrowserSetup */ \"./src/main/bot/setup/BrowserSetup.ts\");\n/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ramda */ \"ramda\");\n/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(ramda__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _supreme_startSupremeTask__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./supreme/startSupremeTask */ \"./src/main/bot/supreme/startSupremeTask.ts\");\n/* harmony import */ var _IPC_IPCMain__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../IPC/IPCMain */ \"./src/main/IPC/IPCMain.ts\");\n/* harmony import */ var _supreme_ProductsMonitor__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./supreme/ProductsMonitor */ \"./src/main/bot/supreme/ProductsMonitor.ts\");\n\n\n\n\n\n\n\n\nclass BrowsersManager {\n  constructor() {\n    this.browsers = [];\n  }\n\n  static getInstance() {\n    var _this$instance;\n\n    this.instance = (_this$instance = this.instance) !== null && _this$instance !== void 0 ? _this$instance : new BrowsersManager();\n    return this.instance;\n  }\n\n  setup(data) {\n    var _this = this;\n\n    return Object(_Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function* () {\n      try {\n        const browser = yield Object(_BrowserInstance__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(data.id);\n\n        _this.browsers.push(browser);\n\n        const pages = yield browser.pages();\n        const page = ramda__WEBPACK_IMPORTED_MODULE_3__[\"last\"](pages);\n\n        if (!page) {\n          browser.close();\n          return;\n        }\n\n        Object(_setup_BrowserSetup__WEBPACK_IMPORTED_MODULE_2__[\"setupBrowser\"])(page, data.id);\n      } catch {\n        _IPC_IPCMain__WEBPACK_IMPORTED_MODULE_5__[\"IPCMain\"].browserStateChange(data.id, false);\n      }\n    })();\n  }\n\n  startTasks(tasks) {\n    var _this2 = this;\n\n    return Object(_Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function* () {\n      _supreme_ProductsMonitor__WEBPACK_IMPORTED_MODULE_6__[\"ProductsMonitor\"].init(2000);\n      tasks.forEach(\n      /*#__PURE__*/\n      function () {\n        var _ref = Object(_Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function* (task, index) {\n          var _task$browser;\n\n          if (!task.browser) return;\n          const browser = yield Object(_BrowserInstance__WEBPACK_IMPORTED_MODULE_1__[\"default\"])((_task$browser = task.browser) === null || _task$browser === void 0 ? void 0 : _task$browser.value, index);\n\n          _this2.browsers.push(browser);\n\n          Object(_supreme_startSupremeTask__WEBPACK_IMPORTED_MODULE_4__[\"startSupremeTask\"])(browser, task);\n        });\n\n        return function (_x, _x2) {\n          return _ref.apply(this, arguments);\n        };\n      }());\n    })();\n  }\n\n  stopAll() {\n    var _this3 = this;\n\n    return Object(_Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function* () {\n      _supreme_ProductsMonitor__WEBPACK_IMPORTED_MODULE_6__[\"ProductsMonitor\"].unsubscribeAll();\n      const cleanUps = [];\n\n      _this3.browsers.forEach(b => {\n        if (!b.isConnected()) return;\n        cleanUps.push(b.close());\n      });\n\n      _this3.browsers = [];\n      yield Promise.all(cleanUps);\n    })();\n  }\n\n}\n\nBrowsersManager.instance = void 0;\n/* harmony default export */ __webpack_exports__[\"default\"] = (BrowsersManager);\n\n//# sourceURL=webpack:///./src/main/bot/BrowsersManager.ts?");

/***/ }),

/***/ "./src/main/bot/setup/BrowserSetup.ts":
/*!********************************************!*\
  !*** ./src/main/bot/setup/BrowserSetup.ts ***!
  \********************************************/
/*! exports provided: setupBrowser */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setupBrowser\", function() { return setupBrowser; });\n/* harmony import */ var _Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator */ \"./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js\");\n/* harmony import */ var _IPC_IPCMain__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../IPC/IPCMain */ \"./src/main/IPC/IPCMain.ts\");\n\n\n\nconst setupBrowser =\n/*#__PURE__*/\nfunction () {\n  var _ref = Object(_Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function* (page, id) {\n    const browser = page.browser();\n\n    if (!page) {\n      browser.close();\n      return;\n    }\n\n    yield page.goto('https://accounts.google.com/signin/v2/identifier?flowName=GlifWebSignIn&flowEntry=ServiceLogin&hl=en');\n    page.on('load',\n    /*#__PURE__*/\n    Object(_Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function* () {\n      const url = page.url();\n      if (!url.includes('https://myaccount.google.com/')) return;\n      yield page.waitForXPath(\"//div[contains(text(),'@gmail.com')]\");\n      const accountEmailElements = yield page.$x(\"//div[contains(text(),'@gmail.com')]\");\n      if (accountEmailElements.length < 1) return;\n      const [accountEmailNode] = accountEmailElements;\n      const emailProperty = yield accountEmailNode.getProperty('innerText');\n      let email = yield emailProperty.jsonValue();\n      const sameEmails = yield _IPC_IPCMain__WEBPACK_IMPORTED_MODULE_1__[\"IPCMain\"].getSameEmails(email);\n\n      if (sameEmails && sameEmails.length > 0) {\n        email += ` (${sameEmails.length + 1})`;\n      }\n\n      _IPC_IPCMain__WEBPACK_IMPORTED_MODULE_1__[\"IPCMain\"].setBrowserEmail(id, email);\n      browser.close();\n    }));\n  });\n\n  return function setupBrowser(_x, _x2) {\n    return _ref.apply(this, arguments);\n  };\n}();\n\n\n\n//# sourceURL=webpack:///./src/main/bot/setup/BrowserSetup.ts?");

/***/ }),

/***/ "./src/main/bot/supreme/ProductsMonitor.ts":
/*!*************************************************!*\
  !*** ./src/main/bot/supreme/ProductsMonitor.ts ***!
  \*************************************************/
/*! exports provided: ProductsMonitor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ProductsMonitor\", function() { return ProductsMonitor; });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"axios\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ \"rxjs\");\n/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(rxjs__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ \"rxjs/operators\");\n/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n\nclass ProductsMonitor {\n  constructor() {}\n\n  static init(refreshRate) {\n    this.unsubscribeAll();\n    this.subscriptions = [];\n    const desktopStockMonitor = Object(rxjs__WEBPACK_IMPORTED_MODULE_1__[\"timer\"])(0, refreshRate).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__[\"switchMap\"])(() => axios__WEBPACK_IMPORTED_MODULE_0___default.a.get('https://www.supremenewyork.com/shop.json', {\n      transformResponse: res => res\n    })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__[\"pluck\"])('data'), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__[\"retryWhen\"])(err => err.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__[\"delay\"])(refreshRate))));\n    const mobileStockMonitor = Object(rxjs__WEBPACK_IMPORTED_MODULE_1__[\"timer\"])(refreshRate / 2, refreshRate).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__[\"switchMap\"])(() => axios__WEBPACK_IMPORTED_MODULE_0___default.a.get('https://www.supremenewyork.com/mobile_stock.json', {\n      transformResponse: res => res\n    })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__[\"pluck\"])('data'), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__[\"retryWhen\"])(err => err.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__[\"delay\"])(refreshRate))));\n    this.observable = Object(rxjs__WEBPACK_IMPORTED_MODULE_1__[\"merge\"])(desktopStockMonitor, mobileStockMonitor).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__[\"distinctUntilChanged\"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__[\"map\"])(stock => {\n      const stockJson = JSON.parse(stock);\n\n      if (stockJson.error || !stockJson.products_and_categories) {\n        throw new Error('Invalid response');\n      }\n\n      return stockJson;\n    }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__[\"tap\"])(x => console.log(x)), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__[\"retryWhen\"])(err => err.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__[\"delay\"])(refreshRate))), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__[\"shareReplay\"])({\n      refCount: true\n    }));\n  }\n\n  static subscribe(fn) {\n    const subscription = this.observable.subscribe(fn);\n    this.subscriptions.push(subscription);\n    return subscription;\n  }\n\n  static unsubscribeAll() {\n    this.subscriptions.forEach(s => s.unsubscribe());\n  }\n\n}\n\nProductsMonitor.observable = void 0;\nProductsMonitor.subscriptions = [];\n\n\n//# sourceURL=webpack:///./src/main/bot/supreme/ProductsMonitor.ts?");

/***/ }),

/***/ "./src/main/bot/supreme/browserExtensions.ts":
/*!***************************************************!*\
  !*** ./src/main/bot/supreme/browserExtensions.ts ***!
  \***************************************************/
/*! exports provided: selectOption, getVisibleElement, generateJSAddressCookie, prepareCookies */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"selectOption\", function() { return selectOption; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getVisibleElement\", function() { return getVisibleElement; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"generateJSAddressCookie\", function() { return generateJSAddressCookie; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"prepareCookies\", function() { return prepareCookies; });\n/* harmony import */ var _Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator */ \"./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js\");\n\nfunction selectOption(_x, _x2, _x3) {\n  return _selectOption.apply(this, arguments);\n}\n\nfunction _selectOption() {\n  _selectOption = Object(_Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function* (page, xpath, option) {\n    yield page.waitForXPath(xpath, {\n      visible: true\n    });\n    const [select] = yield page.$x(xpath);\n    const property = yield select.getProperty('id');\n    const id = yield property.jsonValue();\n    yield page.select(`#${id}`, option);\n  });\n  return _selectOption.apply(this, arguments);\n}\n\nfunction getVisibleElement(_x4, _x5) {\n  return _getVisibleElement.apply(this, arguments);\n}\n\nfunction _getVisibleElement() {\n  _getVisibleElement = Object(_Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function* (page, xpath, inViewport = true) {\n    yield page.waitForXPath(xpath, {\n      visible: true\n    });\n    const elements = yield page.$x(xpath);\n    let visible = [];\n\n    for (let i = 0; i < elements.length; i++) {\n      const box = yield elements[i].boundingBox();\n      const viewport = yield elements[i].isIntersectingViewport();\n      if (box !== null && viewport) visible.push(elements[i]);\n      if (box !== null && !inViewport) visible.push(elements[i]);\n    }\n\n    return visible[0];\n  });\n  return _getVisibleElement.apply(this, arguments);\n}\n\nfunction generateJSAddressCookie(data) {\n  const {\n    firstName,\n    lastName,\n    address1,\n    address2,\n    city,\n    postcode,\n    email,\n    telephone\n  } = data;\n  const value = `${firstName} ${lastName}|${email}|${telephone}|${address1}|${address2}|${city}|undefined|${postcode}|PL|`.replace(/ /g, '%20').replace(/@/g, '%40');\n  return {\n    name: 'js-address',\n    value: value,\n    domain: '.supremenewyork.com'\n  };\n}\nfunction prepareCookies(_x6, _x7) {\n  return _prepareCookies.apply(this, arguments);\n}\n\nfunction _prepareCookies() {\n  _prepareCookies = Object(_Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function* (page, profile) {\n    const cookies = yield page.cookies('https://www.supremenewyork.com/');\n    yield page.deleteCookie(...cookies);\n    yield page.setCookie(generateJSAddressCookie(profile));\n  });\n  return _prepareCookies.apply(this, arguments);\n}\n\n//# sourceURL=webpack:///./src/main/bot/supreme/browserExtensions.ts?");

/***/ }),

/***/ "./src/main/bot/supreme/pageInject/injectScript.ts":
/*!*********************************************************!*\
  !*** ./src/main/bot/supreme/pageInject/injectScript.ts ***!
  \*********************************************************/
/*! exports provided: injectScript */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"injectScript\", function() { return injectScript; });\n/* eslint-disable no-template-curly-in-string */\nconst injectScript = payload => '(async()=>{localStorage.clear();const o=Supreme.categories.models.flatMap(a=>a.attributes.products.models.flat());const p=' + JSON.stringify(payload) + ';const{keywords:q,colors:r,anySize:s,anyColor:t}=p;const u=p.size.value;const v=h(q);if(!v){return await b()}const w=await j(v);if(!w)return;const x=g(w,r,t);if(!x)return;const y=x.attributes.sizes.models.filter(a=>a.attributes.stock_level!==0);const z=f(y,u,s);if(!z){n(\"Sold out\",\"Error\");return}a(v,x);await c(z);function a(a,b){const c=new Date;c.setMonth(c.getMonth()+6);c.setHours(c.getHours()+1);const d=`products/${a.attributes.id}/${b.attributes.id};path=/; expires=${c.toUTCString()}`;document.cookie=`lastVisitedFragment=${d}`}async function b(){await i(1500);window.location.reload()}function c(a){n(\"Adding to cart\",\"Action\");const b=Promise.race([e(a),d(a)]);return b}async function d(a){const b=a.attributes.id.toString();while(!localStorage.hasOwnProperty(b)){Supreme.app.cart.addSize(a);await i(1500)}return true}async function e(a){const b=a.attributes.id.toString();while(!localStorage.hasOwnProperty(b)){await i(10)}return true}function f(a,b,c){const d=a.find(a=>a.attributes.name.toLowerCase()===b.toLowerCase());if(d||!c)return d;const e=a[Math.floor(Math.random()*a.length)];return e}function g(a,b,c){const d=a.find(a=>m(a.attributes.name,b));if(d||!c)return d;const e=a[Math.floor(Math.random()*a.length)];return e}function h(a){return o.find(b=>m(b.attributes.name,a))}async function i(a){await new Promise(b=>setTimeout(b,a))}async function j(a){const b=await Promise.race([k(a),l(a)]);return b||null}async function k(a){while(!a.attributes.styles){await i(10)}return a.attributes.styles.models}async function l(a){while(!a.attributes.styles){a.fetch();await i(1000)}}function m(a,{positive:b,negative:c,multi:d}){a=a.toLowerCase();if(!b.every(b=>a.includes(b)))return false;if(c.some(b=>a.includes(b)))return false;if(!d)return true;for(const e of d){const b=e.split(\" | \");if(!b.some(b=>a.includes(b)))return false}return true}function n(a,b){fetch(\"http://127.0.0.1:2140/status.json\",{method:\"POST\",headers:{Accept:\"application/json\",\"Content-Type\":\"application/json\"},body:JSON.stringify({message:a,type:b})})}})();';\n\n//# sourceURL=webpack:///./src/main/bot/supreme/pageInject/injectScript.ts?");

/***/ }),

/***/ "./src/main/bot/supreme/parseRequest.ts":
/*!**********************************************!*\
  !*** ./src/main/bot/supreme/parseRequest.ts ***!
  \**********************************************/
/*! exports provided: parseRequest */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"parseRequest\", function() { return parseRequest; });\n/* harmony import */ var _Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator */ \"./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js\");\n/* harmony import */ var _IPC_IPCMain__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../IPC/IPCMain */ \"./src/main/IPC/IPCMain.ts\");\n\n\n\nconst parseRequest =\n/*#__PURE__*/\nfunction () {\n  var _ref = Object(_Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function* (req, page, task) {\n    const data = req.postData();\n    if (req.url() !== 'http://127.0.0.1:2140/status.json' || !data) return;\n    const status = JSON.parse(data);\n    _IPC_IPCMain__WEBPACK_IMPORTED_MODULE_1__[\"IPCMain\"].updateTaskStatus(task, status);\n    if (status.message !== 'Sold out') return;\n    page.browser().close();\n  });\n\n  return function parseRequest(_x, _x2, _x3) {\n    return _ref.apply(this, arguments);\n  };\n}();\n\n\n\n//# sourceURL=webpack:///./src/main/bot/supreme/parseRequest.ts?");

/***/ }),

/***/ "./src/main/bot/supreme/parseResponse.ts":
/*!***********************************************!*\
  !*** ./src/main/bot/supreme/parseResponse.ts ***!
  \***********************************************/
/*! exports provided: parseResponse */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"parseResponse\", function() { return parseResponse; });\n/* harmony import */ var _Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator */ \"./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js\");\n/* harmony import */ var _IPC_IPCMain__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../IPC/IPCMain */ \"./src/main/IPC/IPCMain.ts\");\n/* harmony import */ var _types_TaskStatus__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../types/TaskStatus */ \"./src/main/types/TaskStatus.ts\");\n\n\n\n\nconst parseResponse =\n/*#__PURE__*/\nfunction () {\n  var _ref = Object(_Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function* (response, page, task, retry) {\n    const url = response.url();\n\n    if (/.*add.json$/.test(url)) {\n      const res = yield response.json();\n\n      if (res.length > 0) {\n        _IPC_IPCMain__WEBPACK_IMPORTED_MODULE_1__[\"IPCMain\"].updateTaskStatus(task, {\n          message: 'Added to cart',\n          type: _types_TaskStatus__WEBPACK_IMPORTED_MODULE_2__[\"TaskStatusType\"].Action\n        });\n      } else if (res.length === 0) {\n        _IPC_IPCMain__WEBPACK_IMPORTED_MODULE_1__[\"IPCMain\"].updateTaskStatus(task, {\n          message: 'Size sold out',\n          type: _types_TaskStatus__WEBPACK_IMPORTED_MODULE_2__[\"TaskStatusType\"].Error\n        });\n        retry();\n      }\n    } else if (/.*(checkout|status).json$/.test(url)) {\n      const res = yield response.json();\n\n      if (true) {\n        console.log(res);\n      }\n\n      switch (res.status) {\n        case 'failed':\n        case '404':\n        case '500':\n        case 'outOfStock':\n          {\n            const message = res.status === 'outOfStock' ? 'Size sold out' : 'Failed. Retrying';\n            _IPC_IPCMain__WEBPACK_IMPORTED_MODULE_1__[\"IPCMain\"].updateTaskStatus(task, {\n              message,\n              type: _types_TaskStatus__WEBPACK_IMPORTED_MODULE_2__[\"TaskStatusType\"].Error\n            }); //Try again if failed\n\n            retry();\n            return;\n          }\n\n        case 'queued':\n          {\n            _IPC_IPCMain__WEBPACK_IMPORTED_MODULE_1__[\"IPCMain\"].updateTaskStatus(task, {\n              message: 'Queued',\n              type: _types_TaskStatus__WEBPACK_IMPORTED_MODULE_2__[\"TaskStatusType\"].Action\n            });\n            return;\n          }\n\n        case 'dup':\n          {\n            _IPC_IPCMain__WEBPACK_IMPORTED_MODULE_1__[\"IPCMain\"].updateTaskStatus(task, {\n              message: 'Duplicate order',\n              type: _types_TaskStatus__WEBPACK_IMPORTED_MODULE_2__[\"TaskStatusType\"].Error\n            });\n            page.browser().close();\n            return;\n          }\n\n        case 'paid':\n          {\n            _IPC_IPCMain__WEBPACK_IMPORTED_MODULE_1__[\"IPCMain\"].updateTaskStatus(task, {\n              message: 'Success',\n              type: _types_TaskStatus__WEBPACK_IMPORTED_MODULE_2__[\"TaskStatusType\"].Success\n            });\n            page.browser().close();\n            return;\n          }\n      }\n    }\n  });\n\n  return function parseResponse(_x, _x2, _x3, _x4) {\n    return _ref.apply(this, arguments);\n  };\n}();\n\n\n\n//# sourceURL=webpack:///./src/main/bot/supreme/parseResponse.ts?");

/***/ }),

/***/ "./src/main/bot/supreme/selectors.ts":
/*!*******************************************!*\
  !*** ./src/main/bot/supreme/selectors.ts ***!
  \*******************************************/
/*! exports provided: generateXPath, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"generateXPath\", function() { return generateXPath; });\nconst generateXPath = (tag, attribute, stringToContain, getParent = false, valuesToIgnore = []) => {\n  let xpath = `//${tag}[`;\n  stringToContain = stringToContain.toLowerCase();\n\n  for (let letter of stringToContain) {\n    xpath += ` (contains(${attribute}, '${letter}') or contains(${attribute}, '${letter.toUpperCase()}')) and`;\n  }\n\n  xpath = xpath.slice(0, -4);\n  valuesToIgnore.forEach(value => {\n    value = value.toLowerCase();\n    xpath += ` and not(contains(${attribute}, '${value}')) and not(contains(${attribute}, '${value.toUpperCase()}'))`;\n  });\n  xpath += ']';\n  if (getParent) xpath += '/parent::*';\n  return xpath;\n};\nconst selectors = {\n  addBtn: generateXPath('span', 'text()', 'add to', false, ['checkout', 'remove']),\n  addBtnDesktop: generateXPath('input', '@value', 'add to', false, ['checkout', 'remove']),\n  checkoutBtn: generateXPath('span', 'text()', 'checkout', true, ['add', 'remove', 'basket']),\n  checkoutBtnDesktop: generateXPath('a', 'text()', 'checkout', false, ['add', 'remove', 'basket']),\n  cvv: generateXPath('input', '@placeholder', 'cv', false, ['num', 'name']),\n  creditCardNumber: generateXPath('input', '@placeholder', 'number', false, ['name', 'tel']),\n  termsLabel: generateXPath('label', 'text()', 'I have read') + \"//preceding::input[@type='checkbox' and not(contains(@id, 'address'))]\",\n  processBtn: generateXPath('span', 'text()', 'process', true, ['cancel', 'edit']),\n  processBtnDesktop: generateXPath('input', '@value', 'process', false, ['cancel', 'edit']) + \"[@type='submit']\",\n  cardTypeSelect: \"//option[contains(text(),'astercard')]/parent::*\",\n  monthSelect: \"//option[contains(text(),'06')]/parent::*\",\n  yearSelect: \"//option[contains(text(),'2021')]/parent::*\",\n  itemName: \"//*[@class='name']\",\n  itemSelectable: \"//*[@class='selectable']\",\n  price: \"//*[@class='price']\",\n  recaptchaCSS: \"*[name='g-recaptcha-response']\"\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (selectors);\n\n//# sourceURL=webpack:///./src/main/bot/supreme/selectors.ts?");

/***/ }),

/***/ "./src/main/bot/supreme/startSupremeTask.ts":
/*!**************************************************!*\
  !*** ./src/main/bot/supreme/startSupremeTask.ts ***!
  \**************************************************/
/*! exports provided: startSupremeTask */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"startSupremeTask\", function() { return startSupremeTask; });\n/* harmony import */ var _Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator */ \"./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js\");\n/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ramda */ \"ramda\");\n/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(ramda__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _selectors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./selectors */ \"./src/main/bot/supreme/selectors.ts\");\n/* harmony import */ var _IPC_IPCMain__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../IPC/IPCMain */ \"./src/main/IPC/IPCMain.ts\");\n/* harmony import */ var _pageInject_injectScript__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pageInject/injectScript */ \"./src/main/bot/supreme/pageInject/injectScript.ts\");\n/* harmony import */ var _browserExtensions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./browserExtensions */ \"./src/main/bot/supreme/browserExtensions.ts\");\n/* harmony import */ var _parseResponse__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./parseResponse */ \"./src/main/bot/supreme/parseResponse.ts\");\n/* harmony import */ var _types_TaskStatus__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../types/TaskStatus */ \"./src/main/types/TaskStatus.ts\");\n/* harmony import */ var _parseRequest__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./parseRequest */ \"./src/main/bot/supreme/parseRequest.ts\");\n/* harmony import */ var _ProductsMonitor__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./ProductsMonitor */ \"./src/main/bot/supreme/ProductsMonitor.ts\");\n\n\n\n\n\n\n\n\n\n\n\nconst startSupremeTask =\n/*#__PURE__*/\nfunction () {\n  var _ref = Object(_Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function* (browser, task) {\n    const pages = yield browser.pages();\n    const page = ramda__WEBPACK_IMPORTED_MODULE_1__[\"last\"](pages);\n    let monitorStock;\n    if (!page || !task.profile) return;\n    const profile = yield _IPC_IPCMain__WEBPACK_IMPORTED_MODULE_3__[\"IPCMain\"].getProfile(task.profile.value);\n    const [product] = task.products;\n    page.on('load',\n    /*#__PURE__*/\n    Object(_Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function* () {\n      const fullUrl = yield page.evaluate('window.location.href');\n\n      if (fullUrl.includes('supplier')) {\n        const source = Object(_pageInject_injectScript__WEBPACK_IMPORTED_MODULE_4__[\"injectScript\"])(product);\n        yield page.evaluate(source);\n      }\n    }));\n    page.on('request', req => Object(_parseRequest__WEBPACK_IMPORTED_MODULE_8__[\"parseRequest\"])(req, page, task));\n    page.on('response', res => Object(_parseResponse__WEBPACK_IMPORTED_MODULE_6__[\"parseResponse\"])(res, page, task, retry));\n    const monitor = _ProductsMonitor__WEBPACK_IMPORTED_MODULE_9__[\"ProductsMonitor\"].subscribe(setStock);\n    yield handleTask();\n\n    function setStock(stock) {\n      monitorStock = { ...stock\n      };\n      console.log(monitorStock);\n    }\n\n    function retry() {\n      return _retry.apply(this, arguments);\n    }\n\n    function _retry() {\n      _retry = Object(_Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function* () {\n        if (!page || !profile) return;\n        yield new Promise(resolve => setTimeout(resolve, 1000));\n        yield Object(_browserExtensions__WEBPACK_IMPORTED_MODULE_5__[\"prepareCookies\"])(page, profile);\n        yield page.goto('https://www.supremenewyork.com/mobile/#supplier');\n        yield page.reload();\n        yield handleTask();\n      });\n      return _retry.apply(this, arguments);\n    }\n\n    function handleTask() {\n      return _handleTask.apply(this, arguments);\n    }\n\n    function _handleTask() {\n      _handleTask = Object(_Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function* () {\n        var _profile$month, _profile$year;\n\n        if (!page) return;\n        if (!profile || !((_profile$month = profile.month) === null || _profile$month === void 0 ? void 0 : _profile$month.value) || !((_profile$year = profile.year) === null || _profile$year === void 0 ? void 0 : _profile$year.value)) return;\n        yield Object(_browserExtensions__WEBPACK_IMPORTED_MODULE_5__[\"prepareCookies\"])(page, profile);\n        _IPC_IPCMain__WEBPACK_IMPORTED_MODULE_3__[\"IPCMain\"].updateTaskStatus(task, {\n          message: 'Waiting for products',\n          type: _types_TaskStatus__WEBPACK_IMPORTED_MODULE_7__[\"TaskStatusType\"].Action\n        });\n        yield page.goto('https://www.supremenewyork.com/mobile/#supplier');\n        const start = Date.now();\n        yield page.waitForXPath(_selectors__WEBPACK_IMPORTED_MODULE_2__[\"default\"].cardTypeSelect, {\n          visible: true,\n          timeout: 1000 * 60 * 30\n        });\n        _IPC_IPCMain__WEBPACK_IMPORTED_MODULE_3__[\"IPCMain\"].updateTaskStatus(task, {\n          message: 'Checking out',\n          type: _types_TaskStatus__WEBPACK_IMPORTED_MODULE_7__[\"TaskStatusType\"].Action\n        });\n        const addToCartTime = Date.now();\n        yield Object(_browserExtensions__WEBPACK_IMPORTED_MODULE_5__[\"selectOption\"])(page, _selectors__WEBPACK_IMPORTED_MODULE_2__[\"default\"].cardTypeSelect, 'master');\n        yield Object(_browserExtensions__WEBPACK_IMPORTED_MODULE_5__[\"selectOption\"])(page, _selectors__WEBPACK_IMPORTED_MODULE_2__[\"default\"].monthSelect, profile.month.value);\n        yield Object(_browserExtensions__WEBPACK_IMPORTED_MODULE_5__[\"selectOption\"])(page, _selectors__WEBPACK_IMPORTED_MODULE_2__[\"default\"].yearSelect, profile.year.value);\n        const number = yield Object(_browserExtensions__WEBPACK_IMPORTED_MODULE_5__[\"getVisibleElement\"])(page, _selectors__WEBPACK_IMPORTED_MODULE_2__[\"default\"].creditCardNumber);\n        yield number.tap();\n        yield number.type(profile.creditCardNumber);\n        const cvv = yield Object(_browserExtensions__WEBPACK_IMPORTED_MODULE_5__[\"getVisibleElement\"])(page, _selectors__WEBPACK_IMPORTED_MODULE_2__[\"default\"].cvv);\n        yield cvv.tap();\n        yield cvv.type(profile.cvv.toString());\n        const terms = yield Object(_browserExtensions__WEBPACK_IMPORTED_MODULE_5__[\"getVisibleElement\"])(page, _selectors__WEBPACK_IMPORTED_MODULE_2__[\"default\"].termsLabel, false);\n        yield terms.tap();\n        const checkoutTime = Date.now() - addToCartTime.valueOf();\n        const delay = typeof task.checkoutDelay === 'string' ? parseInt(task.checkoutDelay) : task.checkoutDelay;\n\n        if (checkoutTime < delay) {\n          _IPC_IPCMain__WEBPACK_IMPORTED_MODULE_3__[\"IPCMain\"].updateTaskStatus(task, {\n            message: 'Checkout delay',\n            type: _types_TaskStatus__WEBPACK_IMPORTED_MODULE_7__[\"TaskStatusType\"].Action\n          });\n          const requiredDelay = delay - checkoutTime;\n          yield new Promise(resolve => setTimeout(resolve, requiredDelay));\n        }\n\n        const processBtn = yield Object(_browserExtensions__WEBPACK_IMPORTED_MODULE_5__[\"getVisibleElement\"])(page, _selectors__WEBPACK_IMPORTED_MODULE_2__[\"default\"].processBtn, false);\n        yield processBtn.tap();\n        _IPC_IPCMain__WEBPACK_IMPORTED_MODULE_3__[\"IPCMain\"].updateTaskStatus(task, {\n          message: 'Waiting for response',\n          type: _types_TaskStatus__WEBPACK_IMPORTED_MODULE_7__[\"TaskStatusType\"].Action\n        });\n        console.log(Date.now() - start);\n      });\n      return _handleTask.apply(this, arguments);\n    }\n  });\n\n  return function startSupremeTask(_x, _x2) {\n    return _ref.apply(this, arguments);\n  };\n}();\n\n\n\n//# sourceURL=webpack:///./src/main/bot/supreme/startSupremeTask.ts?");

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

/***/ "./src/main/types/TaskStatus.ts":
/*!**************************************!*\
  !*** ./src/main/types/TaskStatus.ts ***!
  \**************************************/
/*! exports provided: TaskStatusType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"TaskStatusType\", function() { return TaskStatusType; });\nlet TaskStatusType;\n\n(function (TaskStatusType) {\n  TaskStatusType[\"Inactive\"] = \"Inactive\";\n  TaskStatusType[\"Action\"] = \"Action\";\n  TaskStatusType[\"Success\"] = \"Success\";\n  TaskStatusType[\"Error\"] = \"Error\";\n})(TaskStatusType || (TaskStatusType = {}));\n\n//# sourceURL=webpack:///./src/main/types/TaskStatus.ts?");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"axios\");\n\n//# sourceURL=webpack:///external_%22axios%22?");

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

/***/ "rxjs":
/*!***********************!*\
  !*** external "rxjs" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"rxjs\");\n\n//# sourceURL=webpack:///external_%22rxjs%22?");

/***/ }),

/***/ "rxjs/operators":
/*!*********************************!*\
  !*** external "rxjs/operators" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"rxjs/operators\");\n\n//# sourceURL=webpack:///external_%22rxjs/operators%22?");

/***/ })

/******/ });