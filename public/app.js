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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"config\", function() { return config; });\nconst config = {\n  chromiumVersion: '686378',\n  storageVersion: 2,\n  registerUrl: 'https://us-central1-safedrop-83b20.cloudfunctions.net/createAccount'\n};\n\n//# sourceURL=webpack:///./src/config.ts?");

/***/ }),

/***/ "./src/main/IPC/IPCEvents.ts":
/*!***********************************!*\
  !*** ./src/main/IPC/IPCEvents.ts ***!
  \***********************************/
/*! exports provided: VERIFY_CHROME, BROWSER_STATE_CHANGE, START_TASKS, STOP_TASKS, GET_SAME_EMAILS, SET_BROWSER_EMAIL, SETUP_BROWSER, DOWNLOAD_CHROMIUM, CHROMIUM_DOWNLOAD_PROGRESS, WINDOW_MINIMIZE, WINDOW_CLOSE, GET_PROFILE, UPDATE_TASK_STATUS, GET_PRODUCT, GET_PROXY, UPDATE_AVAILABLE, UPDATE_DOWNLOAD_PROGRESS, UPDATE_DOWNLOADED, UPDATE_DOWNLOAD_ERROR, DOWNLOAD_UPDATE, RELAUNCH, REPORT_CHECKOUT, RESET_TIMER_STATE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"VERIFY_CHROME\", function() { return VERIFY_CHROME; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BROWSER_STATE_CHANGE\", function() { return BROWSER_STATE_CHANGE; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"START_TASKS\", function() { return START_TASKS; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"STOP_TASKS\", function() { return STOP_TASKS; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GET_SAME_EMAILS\", function() { return GET_SAME_EMAILS; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SET_BROWSER_EMAIL\", function() { return SET_BROWSER_EMAIL; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SETUP_BROWSER\", function() { return SETUP_BROWSER; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DOWNLOAD_CHROMIUM\", function() { return DOWNLOAD_CHROMIUM; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CHROMIUM_DOWNLOAD_PROGRESS\", function() { return CHROMIUM_DOWNLOAD_PROGRESS; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"WINDOW_MINIMIZE\", function() { return WINDOW_MINIMIZE; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"WINDOW_CLOSE\", function() { return WINDOW_CLOSE; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GET_PROFILE\", function() { return GET_PROFILE; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"UPDATE_TASK_STATUS\", function() { return UPDATE_TASK_STATUS; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GET_PRODUCT\", function() { return GET_PRODUCT; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GET_PROXY\", function() { return GET_PROXY; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"UPDATE_AVAILABLE\", function() { return UPDATE_AVAILABLE; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"UPDATE_DOWNLOAD_PROGRESS\", function() { return UPDATE_DOWNLOAD_PROGRESS; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"UPDATE_DOWNLOADED\", function() { return UPDATE_DOWNLOADED; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"UPDATE_DOWNLOAD_ERROR\", function() { return UPDATE_DOWNLOAD_ERROR; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DOWNLOAD_UPDATE\", function() { return DOWNLOAD_UPDATE; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"RELAUNCH\", function() { return RELAUNCH; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"REPORT_CHECKOUT\", function() { return REPORT_CHECKOUT; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"RESET_TIMER_STATE\", function() { return RESET_TIMER_STATE; });\nconst START_TASKS = 'START_TASKS';\nconst STOP_TASKS = 'STOP_TASKS';\nconst SETUP_BROWSER = 'SETUP_BROWSER';\nconst SET_BROWSER_EMAIL = 'SET_BROWSER_EMAIL';\nconst GET_SAME_EMAILS = 'GET_SAME_EMAILS';\nconst BROWSER_STATE_CHANGE = 'BROWSER_STATE_CHANGE';\nconst REPORT_CHECKOUT = 'REPORT_CHECKOUT';\nconst VERIFY_CHROME = 'VERIFY_CHROME';\nconst DOWNLOAD_CHROMIUM = 'DOWNLOAD_CHROMIUM';\nconst CHROMIUM_DOWNLOAD_PROGRESS = 'CHROMIUM_DOWNLOAD_PROGRESS';\nconst WINDOW_MINIMIZE = 'WINDOW_MINIMIZE';\nconst WINDOW_CLOSE = 'WINDOW_CLOSE';\nconst RELAUNCH = 'RELAUNCH';\nconst GET_PROFILE = 'GET_PROFILE';\nconst GET_PRODUCT = 'GET_PRODUCT';\nconst GET_PROXY = 'GET_PROXY';\nconst UPDATE_TASK_STATUS = 'UPDATE_TASK_STATUS';\nconst RESET_TIMER_STATE = 'RESET_TIMER_STATE';\nconst UPDATE_AVAILABLE = 'UPDATE_AVAILABLE';\nconst UPDATE_DOWNLOAD_PROGRESS = 'UPDATE_DOWNLOAD_PROGRESS';\nconst UPDATE_DOWNLOADED = 'UPDATE_DOWNLOADED';\nconst UPDATE_DOWNLOAD_ERROR = 'UPDATE_DOWNLOAD_ERROR';\nconst DOWNLOAD_UPDATE = 'DOWNLOAD_UPDATE';\n\n\n//# sourceURL=webpack:///./src/main/IPC/IPCEvents.ts?");

/***/ }),

/***/ "./src/main/IPC/IPCMain.ts":
/*!*********************************!*\
  !*** ./src/main/IPC/IPCMain.ts ***!
  \*********************************/
/*! exports provided: IPCMain */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"IPCMain\", function() { return IPCMain; });\n/* harmony import */ var _Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator */ \"./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js\");\n/* harmony import */ var electron_better_ipc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! electron-better-ipc */ \"electron-better-ipc\");\n/* harmony import */ var electron_better_ipc__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(electron_better_ipc__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _chromium_verifyChromium__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../chromium/verifyChromium */ \"./src/main/chromium/verifyChromium.ts\");\n/* harmony import */ var _chromium_downloadChromium__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../chromium/downloadChromium */ \"./src/main/chromium/downloadChromium.ts\");\n/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../main */ \"./src/main/main.ts\");\n/* harmony import */ var _bot_core_BrowsersManager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../bot/core/BrowsersManager */ \"./src/main/bot/core/BrowsersManager.ts\");\n/* harmony import */ var electron_updater__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! electron-updater */ \"electron-updater\");\n/* harmony import */ var electron_updater__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(electron_updater__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _IPCEvents__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./IPCEvents */ \"./src/main/IPC/IPCEvents.ts\");\n/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! electron */ \"electron\");\n/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_8__);\n\n\n\n\n\n\n\n\n\nclass IPCMain {\n  constructor() {}\n\n}\n\nIPCMain.registerListeners = () => {\n  electron_better_ipc__WEBPACK_IMPORTED_MODULE_1__[\"ipcMain\"].answerRenderer(_IPCEvents__WEBPACK_IMPORTED_MODULE_7__[\"VERIFY_CHROME\"], _chromium_verifyChromium__WEBPACK_IMPORTED_MODULE_2__[\"verifyChromium\"]);\n  electron_better_ipc__WEBPACK_IMPORTED_MODULE_1__[\"ipcMain\"].on(_IPCEvents__WEBPACK_IMPORTED_MODULE_7__[\"DOWNLOAD_CHROMIUM\"], _chromium_downloadChromium__WEBPACK_IMPORTED_MODULE_3__[\"downloadChromium\"]);\n  electron_better_ipc__WEBPACK_IMPORTED_MODULE_1__[\"ipcMain\"].on(_IPCEvents__WEBPACK_IMPORTED_MODULE_7__[\"SETUP_BROWSER\"], (e, data) => _bot_core_BrowsersManager__WEBPACK_IMPORTED_MODULE_5__[\"default\"].getInstance().setup(data));\n  electron_better_ipc__WEBPACK_IMPORTED_MODULE_1__[\"ipcMain\"].on(_IPCEvents__WEBPACK_IMPORTED_MODULE_7__[\"START_TASKS\"], (e, tasks, scheduler) => _bot_core_BrowsersManager__WEBPACK_IMPORTED_MODULE_5__[\"default\"].getInstance().startTasks(tasks, scheduler));\n  electron_better_ipc__WEBPACK_IMPORTED_MODULE_1__[\"ipcMain\"].on(_IPCEvents__WEBPACK_IMPORTED_MODULE_7__[\"STOP_TASKS\"], e => _bot_core_BrowsersManager__WEBPACK_IMPORTED_MODULE_5__[\"default\"].getInstance().stopAll());\n  electron_better_ipc__WEBPACK_IMPORTED_MODULE_1__[\"ipcMain\"].on(_IPCEvents__WEBPACK_IMPORTED_MODULE_7__[\"WINDOW_MINIMIZE\"], () => _main__WEBPACK_IMPORTED_MODULE_4__[\"mainWindow\"] === null || _main__WEBPACK_IMPORTED_MODULE_4__[\"mainWindow\"] === void 0 ? void 0 : _main__WEBPACK_IMPORTED_MODULE_4__[\"mainWindow\"].minimize());\n  electron_better_ipc__WEBPACK_IMPORTED_MODULE_1__[\"ipcMain\"].on(_IPCEvents__WEBPACK_IMPORTED_MODULE_7__[\"WINDOW_CLOSE\"], () => _main__WEBPACK_IMPORTED_MODULE_4__[\"mainWindow\"] === null || _main__WEBPACK_IMPORTED_MODULE_4__[\"mainWindow\"] === void 0 ? void 0 : _main__WEBPACK_IMPORTED_MODULE_4__[\"mainWindow\"].close());\n  electron_better_ipc__WEBPACK_IMPORTED_MODULE_1__[\"ipcMain\"].on(_IPCEvents__WEBPACK_IMPORTED_MODULE_7__[\"DOWNLOAD_UPDATE\"], () => {\n    electron_updater__WEBPACK_IMPORTED_MODULE_6__[\"autoUpdater\"].downloadUpdate();\n  });\n  electron_better_ipc__WEBPACK_IMPORTED_MODULE_1__[\"ipcMain\"].on(_IPCEvents__WEBPACK_IMPORTED_MODULE_7__[\"RELAUNCH\"], () => {\n    electron__WEBPACK_IMPORTED_MODULE_8__[\"app\"].relaunch();\n    electron__WEBPACK_IMPORTED_MODULE_8__[\"app\"].exit();\n  });\n};\n\nIPCMain.setupUpdater =\n/*#__PURE__*/\nObject(_Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function* () {\n  electron_updater__WEBPACK_IMPORTED_MODULE_6__[\"autoUpdater\"].autoDownload = false;\n  electron_updater__WEBPACK_IMPORTED_MODULE_6__[\"autoUpdater\"].on('update-available', info => {\n    _main__WEBPACK_IMPORTED_MODULE_4__[\"mainWindow\"] === null || _main__WEBPACK_IMPORTED_MODULE_4__[\"mainWindow\"] === void 0 ? void 0 : _main__WEBPACK_IMPORTED_MODULE_4__[\"mainWindow\"].webContents.send(_IPCEvents__WEBPACK_IMPORTED_MODULE_7__[\"UPDATE_AVAILABLE\"], info);\n  });\n  electron_updater__WEBPACK_IMPORTED_MODULE_6__[\"autoUpdater\"].on('error', error => {\n    _main__WEBPACK_IMPORTED_MODULE_4__[\"mainWindow\"] === null || _main__WEBPACK_IMPORTED_MODULE_4__[\"mainWindow\"] === void 0 ? void 0 : _main__WEBPACK_IMPORTED_MODULE_4__[\"mainWindow\"].webContents.send(_IPCEvents__WEBPACK_IMPORTED_MODULE_7__[\"UPDATE_DOWNLOAD_ERROR\"], error);\n  });\n  electron_updater__WEBPACK_IMPORTED_MODULE_6__[\"autoUpdater\"].signals.progress(info => {\n    _main__WEBPACK_IMPORTED_MODULE_4__[\"mainWindow\"] === null || _main__WEBPACK_IMPORTED_MODULE_4__[\"mainWindow\"] === void 0 ? void 0 : _main__WEBPACK_IMPORTED_MODULE_4__[\"mainWindow\"].webContents.send(_IPCEvents__WEBPACK_IMPORTED_MODULE_7__[\"UPDATE_DOWNLOAD_PROGRESS\"], info);\n  });\n  electron_updater__WEBPACK_IMPORTED_MODULE_6__[\"autoUpdater\"].signals.updateDownloaded(info => {\n    _main__WEBPACK_IMPORTED_MODULE_4__[\"mainWindow\"] === null || _main__WEBPACK_IMPORTED_MODULE_4__[\"mainWindow\"] === void 0 ? void 0 : _main__WEBPACK_IMPORTED_MODULE_4__[\"mainWindow\"].webContents.send(_IPCEvents__WEBPACK_IMPORTED_MODULE_7__[\"UPDATE_DOWNLOADED\"], info);\n    electron_updater__WEBPACK_IMPORTED_MODULE_6__[\"autoUpdater\"].quitAndInstall();\n  });\n  yield electron_updater__WEBPACK_IMPORTED_MODULE_6__[\"autoUpdater\"].checkForUpdates();\n  setInterval(() => electron_updater__WEBPACK_IMPORTED_MODULE_6__[\"autoUpdater\"].checkForUpdates(), 1000 * 60 * 5);\n});\n\nIPCMain.getProfile =\n/*#__PURE__*/\nfunction () {\n  var _ref2 = Object(_Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function* (id) {\n    if (!_main__WEBPACK_IMPORTED_MODULE_4__[\"mainWindow\"]) return;\n    const profile = yield electron_better_ipc__WEBPACK_IMPORTED_MODULE_1__[\"ipcMain\"].callRenderer(_main__WEBPACK_IMPORTED_MODULE_4__[\"mainWindow\"], _IPCEvents__WEBPACK_IMPORTED_MODULE_7__[\"GET_PROFILE\"], id);\n    return profile;\n  });\n\n  return function (_x) {\n    return _ref2.apply(this, arguments);\n  };\n}();\n\nIPCMain.getProxy =\n/*#__PURE__*/\nfunction () {\n  var _ref3 = Object(_Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function* (id) {\n    if (!_main__WEBPACK_IMPORTED_MODULE_4__[\"mainWindow\"]) return;\n    const proxy = yield electron_better_ipc__WEBPACK_IMPORTED_MODULE_1__[\"ipcMain\"].callRenderer(_main__WEBPACK_IMPORTED_MODULE_4__[\"mainWindow\"], _IPCEvents__WEBPACK_IMPORTED_MODULE_7__[\"GET_PROXY\"], id);\n    return proxy;\n  });\n\n  return function (_x2) {\n    return _ref3.apply(this, arguments);\n  };\n}();\n\nIPCMain.getProduct =\n/*#__PURE__*/\nfunction () {\n  var _ref4 = Object(_Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function* (id) {\n    if (!_main__WEBPACK_IMPORTED_MODULE_4__[\"mainWindow\"]) return;\n    const product = yield electron_better_ipc__WEBPACK_IMPORTED_MODULE_1__[\"ipcMain\"].callRenderer(_main__WEBPACK_IMPORTED_MODULE_4__[\"mainWindow\"], _IPCEvents__WEBPACK_IMPORTED_MODULE_7__[\"GET_PRODUCT\"], id);\n    return product;\n  });\n\n  return function (_x3) {\n    return _ref4.apply(this, arguments);\n  };\n}();\n\nIPCMain.updateTaskStatus = (task, status) => {\n  if (!_main__WEBPACK_IMPORTED_MODULE_4__[\"mainWindow\"]) return;\n  const newState = { ...task,\n    status\n  };\n  _main__WEBPACK_IMPORTED_MODULE_4__[\"mainWindow\"].webContents.send(_IPCEvents__WEBPACK_IMPORTED_MODULE_7__[\"UPDATE_TASK_STATUS\"], newState);\n};\n\nIPCMain.getSameEmails =\n/*#__PURE__*/\nfunction () {\n  var _ref5 = Object(_Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function* (email) {\n    if (!_main__WEBPACK_IMPORTED_MODULE_4__[\"mainWindow\"]) return;\n    const emails = yield electron_better_ipc__WEBPACK_IMPORTED_MODULE_1__[\"ipcMain\"].callRenderer(_main__WEBPACK_IMPORTED_MODULE_4__[\"mainWindow\"], _IPCEvents__WEBPACK_IMPORTED_MODULE_7__[\"GET_SAME_EMAILS\"], email);\n    return emails;\n  });\n\n  return function (_x4) {\n    return _ref5.apply(this, arguments);\n  };\n}();\n\nIPCMain.browserStateChange = (id, status) => {\n  _main__WEBPACK_IMPORTED_MODULE_4__[\"mainWindow\"] === null || _main__WEBPACK_IMPORTED_MODULE_4__[\"mainWindow\"] === void 0 ? void 0 : _main__WEBPACK_IMPORTED_MODULE_4__[\"mainWindow\"].webContents.send(_IPCEvents__WEBPACK_IMPORTED_MODULE_7__[\"BROWSER_STATE_CHANGE\"], {\n    id,\n    status\n  });\n};\n\nIPCMain.setBrowserEmail = (id, email) => {\n  _main__WEBPACK_IMPORTED_MODULE_4__[\"mainWindow\"] === null || _main__WEBPACK_IMPORTED_MODULE_4__[\"mainWindow\"] === void 0 ? void 0 : _main__WEBPACK_IMPORTED_MODULE_4__[\"mainWindow\"].webContents.send(_IPCEvents__WEBPACK_IMPORTED_MODULE_7__[\"SET_BROWSER_EMAIL\"], {\n    id,\n    email\n  });\n};\n\nIPCMain.reportCheckout = checkoutData => {\n  _main__WEBPACK_IMPORTED_MODULE_4__[\"mainWindow\"] === null || _main__WEBPACK_IMPORTED_MODULE_4__[\"mainWindow\"] === void 0 ? void 0 : _main__WEBPACK_IMPORTED_MODULE_4__[\"mainWindow\"].webContents.send(_IPCEvents__WEBPACK_IMPORTED_MODULE_7__[\"REPORT_CHECKOUT\"], checkoutData);\n};\n\nIPCMain.resetTimerState = () => {\n  _main__WEBPACK_IMPORTED_MODULE_4__[\"mainWindow\"] === null || _main__WEBPACK_IMPORTED_MODULE_4__[\"mainWindow\"] === void 0 ? void 0 : _main__WEBPACK_IMPORTED_MODULE_4__[\"mainWindow\"].webContents.send(_IPCEvents__WEBPACK_IMPORTED_MODULE_7__[\"RESET_TIMER_STATE\"]);\n};\n\n//# sourceURL=webpack:///./src/main/IPC/IPCMain.ts?");

/***/ }),

/***/ "./src/main/bot/core/BrowserInstance.ts":
/*!**********************************************!*\
  !*** ./src/main/bot/core/BrowserInstance.ts ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator */ \"./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var puppeteer_extra__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! puppeteer-extra */ \"puppeteer-extra\");\n/* harmony import */ var puppeteer_extra__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(puppeteer_extra__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var puppeteer_DeviceDescriptors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! puppeteer/DeviceDescriptors */ \"puppeteer/DeviceDescriptors\");\n/* harmony import */ var puppeteer_DeviceDescriptors__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(puppeteer_DeviceDescriptors__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var puppeteer_extra_plugin_stealth__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! puppeteer-extra-plugin-stealth */ \"puppeteer-extra-plugin-stealth\");\n/* harmony import */ var puppeteer_extra_plugin_stealth__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(puppeteer_extra_plugin_stealth__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! electron */ \"electron\");\n/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _IPC_IPCMain__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../IPC/IPCMain */ \"./src/main/IPC/IPCMain.ts\");\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../config */ \"./src/config.ts\");\n\n\n\n\n\n\n\n\n\nconst BrowserInstance =\n/*#__PURE__*/\nfunction () {\n  var _ref = Object(_Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function* (id, proxy = null, index = 0) {\n    _IPC_IPCMain__WEBPACK_IMPORTED_MODULE_6__[\"IPCMain\"].browserStateChange(id, true);\n    const appData = electron__WEBPACK_IMPORTED_MODULE_5__[\"app\"].getPath('userData');\n    const fetcher = puppeteer_extra__WEBPACK_IMPORTED_MODULE_2___default.a.createBrowserFetcher({\n      path: path__WEBPACK_IMPORTED_MODULE_1___default.a.resolve(appData, '.local-chromium')\n    });\n    const executablePath = fetcher.revisionInfo(_config__WEBPACK_IMPORTED_MODULE_7__[\"config\"].chromiumVersion).executablePath;\n    const userDataDirectory = path__WEBPACK_IMPORTED_MODULE_1___default.a.resolve(appData, id);\n    const {\n      width,\n      height,\n      deviceScaleFactor\n    } = puppeteer_DeviceDescriptors__WEBPACK_IMPORTED_MODULE_3___default.a['Pixel 2'].viewport;\n    puppeteer_extra__WEBPACK_IMPORTED_MODULE_2___default.a.use(puppeteer_extra_plugin_stealth__WEBPACK_IMPORTED_MODULE_4___default()());\n    const args = ['--no-sandbox', '--disable-gpu', '--disable-infobars', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--ignore-certifcate-errors', '--ignore-certifcate-errors-spki-list', `--user-data-dir=${userDataDirectory}`, `--window-size=${width},${height + 82}`, `--window-position=${0 + 500 * index},0`];\n\n    if (proxy) {\n      args.push(`--proxy-server=${proxy.ipPort}`);\n    }\n\n    const browser = yield puppeteer_extra__WEBPACK_IMPORTED_MODULE_2___default.a.launch({\n      headless: false,\n      ignoreHTTPSErrors: true,\n      ignoreDefaultArgs: ['--enable-automation'],\n      args,\n      executablePath\n    });\n    const page = yield browser.newPage();\n\n    if (proxy === null || proxy === void 0 ? void 0 : proxy.userPassAuth) {\n      yield page.authenticate({\n        username: proxy.username,\n        password: proxy.password\n      });\n    }\n\n    const client = yield page.target().createCDPSession();\n    browser.on('targetcreated', target => {\n      if (target.url().includes('devtools')) {// browser.close();\n      }\n    });\n    client.send('Network.setUserAgentOverride', {\n      userAgent: 'Mozilla/5.0 (Linux; Android 8.0; Pixel 2 Build/OPD3.170816.012) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3882.0 Mobile Safari/537.36',\n      locale: `en-US,en`,\n      platform: 'linux'\n    });\n    yield Promise.all([client.send('Emulation.setDeviceMetricsOverride', {\n      mobile: true,\n      width,\n      height,\n      deviceScaleFactor,\n      screenOrientation: {\n        angle: 0,\n        type: 'portraitPrimary'\n      }\n    }), client.send('Emulation.setTouchEmulationEnabled', {\n      enabled: true\n    }), client.send('Emulation.setEmitTouchEventsForMouse', {\n      enabled: true,\n      configuration: 'desktop'\n    })]);\n    page.on('close',\n    /*#__PURE__*/\n    Object(_Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function* () {\n      yield browser.close();\n    }));\n    browser.on('disconnected',\n    /*#__PURE__*/\n    Object(_Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function* () {\n      _IPC_IPCMain__WEBPACK_IMPORTED_MODULE_6__[\"IPCMain\"].browserStateChange(id, false);\n    }));\n    return browser;\n  });\n\n  return function BrowserInstance(_x) {\n    return _ref.apply(this, arguments);\n  };\n}();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (BrowserInstance);\n\n//# sourceURL=webpack:///./src/main/bot/core/BrowserInstance.ts?");

/***/ }),

/***/ "./src/main/bot/core/BrowsersManager.ts":
/*!**********************************************!*\
  !*** ./src/main/bot/core/BrowsersManager.ts ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator */ \"./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js\");\n/* harmony import */ var _BrowserInstance__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BrowserInstance */ \"./src/main/bot/core/BrowserInstance.ts\");\n/* harmony import */ var _setup_BrowserSetup__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../setup/BrowserSetup */ \"./src/main/bot/setup/BrowserSetup.ts\");\n/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ramda */ \"ramda\");\n/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(ramda__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _IPC_IPCMain__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../IPC/IPCMain */ \"./src/main/IPC/IPCMain.ts\");\n/* harmony import */ var _supreme_browser_SupremeTask__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../supreme/browser/SupremeTask */ \"./src/main/bot/supreme/browser/SupremeTask.ts\");\n/* harmony import */ var _supreme_ProductsMonitor__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../supreme/ProductsMonitor */ \"./src/main/bot/supreme/ProductsMonitor.ts\");\n/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! moment */ \"moment\");\n/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_7__);\n\n\n\n\n\n\n\n\n\nclass BrowsersManager {\n  constructor() {\n    this.browsers = [];\n  }\n\n  static getInstance() {\n    var _this$instance;\n\n    this.instance = (_this$instance = this.instance) !== null && _this$instance !== void 0 ? _this$instance : new BrowsersManager();\n    return this.instance;\n  }\n\n  setup(data) {\n    var _this = this;\n\n    return Object(_Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function* () {\n      try {\n        const browser = yield Object(_BrowserInstance__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(data.id);\n\n        _this.browsers.push(browser);\n\n        const pages = yield browser.pages();\n        const page = ramda__WEBPACK_IMPORTED_MODULE_3__[\"last\"](pages);\n\n        if (!page) {\n          browser.close();\n          return;\n        }\n\n        Object(_setup_BrowserSetup__WEBPACK_IMPORTED_MODULE_2__[\"setupBrowser\"])(page, data.id);\n      } catch {\n        _IPC_IPCMain__WEBPACK_IMPORTED_MODULE_4__[\"IPCMain\"].browserStateChange(data.id, false);\n      }\n    })();\n  }\n\n  startTasks(tasks, scheduler) {\n    var _this2 = this;\n\n    return Object(_Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function* () {\n      //await fs.ensureDir(path.resolve(app.getAppPath(), 'logs'));\n      const scheduledDate = moment__WEBPACK_IMPORTED_MODULE_7___default()(`${scheduler.date} ${scheduler.time}`, 'DD/MM/YYYY HH:mm:ss');\n\n      if (!scheduler.enabled) {\n        _this2.initializeTasks(tasks, scheduledDate);\n\n        return;\n      }\n\n      BrowsersManager.timerID = setInterval(() => {\n        if (moment__WEBPACK_IMPORTED_MODULE_7___default()().valueOf() + 60000 >= scheduledDate.valueOf()) {\n          clearInterval(BrowsersManager.timerID);\n\n          _this2.initializeTasks(tasks, scheduledDate);\n        }\n      }, 1000);\n    })();\n  }\n\n  initializeTasks(tasks, scheduledDate) {\n    var _this3 = this;\n\n    return Object(_Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function* () {\n      const proxies = [];\n      tasks.forEach(\n      /*#__PURE__*/\n      function () {\n        var _ref = Object(_Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function* (task, index) {\n          var _task$browser, _task$profile;\n\n          if (!task.browser || !task.proxy || !task.profile) return;\n          const proxy = task.proxy.label !== 'None' ? yield _IPC_IPCMain__WEBPACK_IMPORTED_MODULE_4__[\"IPCMain\"].getProxy(task.proxy.value) : null;\n          if (proxy) proxies.push(proxy);\n          const browser = yield Object(_BrowserInstance__WEBPACK_IMPORTED_MODULE_1__[\"default\"])((_task$browser = task.browser) === null || _task$browser === void 0 ? void 0 : _task$browser.value, proxy, index);\n          const product = yield _IPC_IPCMain__WEBPACK_IMPORTED_MODULE_4__[\"IPCMain\"].getProduct(task.products[0]);\n          const profile = yield _IPC_IPCMain__WEBPACK_IMPORTED_MODULE_4__[\"IPCMain\"].getProfile((_task$profile = task.profile) === null || _task$profile === void 0 ? void 0 : _task$profile.value);\n\n          _this3.browsers.push(browser);\n\n          const pages = yield browser.pages();\n          const page = ramda__WEBPACK_IMPORTED_MODULE_3__[\"last\"](pages);\n\n          if (!page || !product || !profile) {\n            browser.close();\n            return;\n          }\n\n          try {\n            const supremeTask = new _supreme_browser_SupremeTask__WEBPACK_IMPORTED_MODULE_5__[\"default\"](page, task, product, profile, scheduledDate);\n            yield supremeTask.init();\n          } catch {}\n        });\n\n        return function (_x, _x2) {\n          return _ref.apply(this, arguments);\n        };\n      }());\n      _IPC_IPCMain__WEBPACK_IMPORTED_MODULE_4__[\"IPCMain\"].resetTimerState();\n      const timeDifference = scheduledDate.valueOf() - moment__WEBPACK_IMPORTED_MODULE_7___default()().valueOf();\n      yield new Promise(resolve => setTimeout(resolve, timeDifference - 10000));\n      _supreme_ProductsMonitor__WEBPACK_IMPORTED_MODULE_6__[\"ProductsMonitor\"].init(2000, proxies);\n    })();\n  }\n\n  stopAll() {\n    var _this4 = this;\n\n    return Object(_Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function* () {\n      _supreme_ProductsMonitor__WEBPACK_IMPORTED_MODULE_6__[\"ProductsMonitor\"].unsubscribeAll();\n      clearInterval(BrowsersManager.timerID);\n      const cleanUps = [];\n\n      _this4.browsers.forEach(b => {\n        if (!b.isConnected()) return;\n        cleanUps.push(_this4.closeBrowser(b));\n      });\n\n      _this4.browsers = [];\n      yield Promise.all(cleanUps);\n    })();\n  }\n\n  closeBrowser(browser) {\n    return Object(_Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function* () {\n      for (let page of yield browser.pages()) {\n        yield page.close({\n          runBeforeUnload: true\n        });\n      }\n\n      yield browser.close();\n    })();\n  }\n\n}\n\nBrowsersManager.instance = void 0;\nBrowsersManager.timerID = void 0;\n/* harmony default export */ __webpack_exports__[\"default\"] = (BrowsersManager);\n\n//# sourceURL=webpack:///./src/main/bot/core/BrowsersManager.ts?");

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

/***/ "./src/main/bot/supreme/Logger.ts":
/*!****************************************!*\
  !*** ./src/main/bot/supreme/Logger.ts ***!
  \****************************************/
/*! exports provided: Logger */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Logger\", function() { return Logger; });\n/* harmony import */ var _Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator */ \"./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js\");\n\n\nconst parseData = value => {\n  try {\n    return JSON.parse(value !== null && value !== void 0 ? value : '{}');\n  } catch (e) {\n    return value;\n  }\n};\n\nconst getResponseContent =\n/*#__PURE__*/\nfunction () {\n  var _ref = Object(_Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function* (response) {\n    try {\n      return yield response.json();\n    } catch {\n      return yield response.text();\n    }\n  });\n\n  return function getResponseContent(_x) {\n    return _ref.apply(this, arguments);\n  };\n}();\n\nclass Logger {\n  //private stream: WriteStream;\n  constructor(id, page) {// this.stream = fs.createWriteStream(\n    //   `${app.getAppPath()}/logs/${this.id}${moment().format('-kk-mm-ss')}.log`,\n    // );\n\n    this.id = id;\n    this.page = page;\n\n    this.reportRequest = req => {// const url = req.url();\n      // const data = req.postData();\n      // const headers = req.headers();\n      // const contentType = headers['content-type'];\n      // if (!contentType) return;\n      // if (\n      //   process.env.NODE_ENV === 'development' &&\n      //   /(supremenewyork|commerce|d17ol771963kd3)/.test(url) &&\n      //   !url.includes('mobile_stock') &&\n      //   (contentType.includes('json') || contentType.includes('form'))\n      // ) {\n      //   this.writeObject({\n      //     message: `${req.method()} ${req.url()}`,\n      //     headers: req.headers(),\n      //     data: parseData(data),\n      //   });\n      // }\n    };\n\n    this.reportResponse =\n    /*#__PURE__*/\n    function () {\n      var _ref2 = Object(_Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function* (response) {// const url = response.url();\n        // if (\n        //   process.env.NODE_ENV === 'development' &&\n        //   /(supremenewyork|commerce|d17ol771963kd3)/.test(url) &&\n        //   !url.includes('mobile_stock')\n        // ) {\n        //   const headers = response.headers();\n        //   const contentType = headers['content-type'];\n        //   if (contentType.includes('json') || contentType.includes('form')) {\n        //     const res = await getResponseContent(response);\n        //     this.writeObject({\n        //       message: `RESPONSE ${response.status()} ${response.url()}`,\n        //       headers,\n        //       response: res,\n        //     });\n        //   } else if (contentType.includes('javascript') || contentType.includes('wasm')) {\n        //     const log = {\n        //       message: `Detected new file!`,\n        //       file: response.url(),\n        //     };\n        //     this.writeObject(log, false);\n        //   }\n        // }\n      });\n\n      return function (_x2) {\n        return _ref2.apply(this, arguments);\n      };\n    }();\n\n    this.writeObject =\n    /*#__PURE__*/\n    function () {\n      var _ref3 = Object(_Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function* (message, includeCookies = true) {// message.time = moment().format('kk:mm:ss:SSS');\n        // if (includeCookies) {\n        //   const cookies = await this.page.cookies('https://www.supremenewyork.com/');\n        //   const blacklisted = ['_utm', 'js-address', 'mixpanel'];\n        //   message.cookies = cookies.filter(({ name }) => !blacklisted.some(b => name.includes(b)));\n        // }\n        // try {\n        //   this.stream.write('\\n' + JSON.stringify(message, null, 1));\n        // } catch {}\n      });\n\n      return function (_x3) {\n        return _ref3.apply(this, arguments);\n      };\n    }();\n\n    this.writeString = (message, includeCookies = true) => {//this.writeObject({ message }, includeCookies);\n    };\n  }\n\n}\n\n\n\n//# sourceURL=webpack:///./src/main/bot/supreme/Logger.ts?");

/***/ }),

/***/ "./src/main/bot/supreme/ProductsMonitor.ts":
/*!*************************************************!*\
  !*** ./src/main/bot/supreme/ProductsMonitor.ts ***!
  \*************************************************/
/*! exports provided: ProductsMonitor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ProductsMonitor\", function() { return ProductsMonitor; });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"axios\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ \"rxjs\");\n/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(rxjs__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ \"rxjs/operators\");\n/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _browser_getRandomString__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./browser/getRandomString */ \"./src/main/bot/supreme/browser/getRandomString.ts\");\n\n\n\n\n\nclass ProductsMonitor {\n  constructor() {}\n\n  static init(refreshRate, proxies) {\n    this.unsubscribeAll();\n    this.subscriptions = [];\n    const desktopStockMonitor = Object(rxjs__WEBPACK_IMPORTED_MODULE_1__[\"timer\"])(0, refreshRate).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__[\"switchMap\"])(() => axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(`https://www.supremenewyork.com/shop.json?${Object(_browser_getRandomString__WEBPACK_IMPORTED_MODULE_3__[\"getRandomString\"])()}=${Object(_browser_getRandomString__WEBPACK_IMPORTED_MODULE_3__[\"getRandomString\"])()}`, {\n      transformResponse: res => res,\n      proxy: this.getRandomProxy(proxies)\n    })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__[\"pluck\"])('data'), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__[\"retryWhen\"])(err => err.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__[\"delay\"])(refreshRate))));\n    const mobileStockMonitor = Object(rxjs__WEBPACK_IMPORTED_MODULE_1__[\"timer\"])(refreshRate / 2, refreshRate).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__[\"switchMap\"])(() => axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(`https://www.supremenewyork.com/mobile_stock.json?${Object(_browser_getRandomString__WEBPACK_IMPORTED_MODULE_3__[\"getRandomString\"])()}=${Object(_browser_getRandomString__WEBPACK_IMPORTED_MODULE_3__[\"getRandomString\"])()}`, {\n      transformResponse: res => res,\n      proxy: this.getRandomProxy(proxies)\n    })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__[\"pluck\"])('data'), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__[\"retryWhen\"])(err => err.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__[\"delay\"])(refreshRate))));\n    this.observable = Object(rxjs__WEBPACK_IMPORTED_MODULE_1__[\"merge\"])(desktopStockMonitor, mobileStockMonitor).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__[\"distinctUntilChanged\"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__[\"map\"])(stock => {\n      const stockJson = JSON.parse(stock);\n\n      if (stockJson.error || !stockJson.products_and_categories) {\n        throw new Error('Invalid response');\n      }\n\n      return stockJson;\n    }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__[\"retryWhen\"])(err => err.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__[\"delay\"])(refreshRate))), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__[\"shareReplay\"])({\n      refCount: true\n    }));\n  }\n\n  static subscribe(fn) {\n    const subscription = this.observable.subscribe(fn);\n    this.subscriptions.push(subscription);\n    return subscription;\n  }\n\n  static unsubscribeAll() {\n    this.subscriptions.forEach(s => s.unsubscribe());\n  }\n\n}\n\nProductsMonitor.observable = void 0;\nProductsMonitor.subscriptions = [];\n\nProductsMonitor.getRandomProxy = proxies => {\n  if (proxies.length === 0) return false;\n  const {\n    ipPort,\n    username,\n    password,\n    userPassAuth\n  } = proxies[Math.floor(Math.random() * proxies.length)];\n  const [host, port] = ipPort.split(':');\n  const axiosProxy = {\n    host,\n    port: parseInt(port)\n  };\n\n  if (userPassAuth) {\n    axiosProxy.auth = {\n      username,\n      password\n    };\n  }\n\n  return axiosProxy;\n};\n\n\n\n//# sourceURL=webpack:///./src/main/bot/supreme/ProductsMonitor.ts?");

/***/ }),

/***/ "./src/main/bot/supreme/browser/SupremeTask.ts":
/*!*****************************************************!*\
  !*** ./src/main/bot/supreme/browser/SupremeTask.ts ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator */ \"./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js\");\n/* harmony import */ var _IPC_IPCMain__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../IPC/IPCMain */ \"./src/main/IPC/IPCMain.ts\");\n/* harmony import */ var _ProductsMonitor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ProductsMonitor */ \"./src/main/bot/supreme/ProductsMonitor.ts\");\n/* harmony import */ var _parseRequest__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./parseRequest */ \"./src/main/bot/supreme/browser/parseRequest.ts\");\n/* harmony import */ var _parseResponse__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./parseResponse */ \"./src/main/bot/supreme/browser/parseResponse.ts\");\n/* harmony import */ var _getVisibleElement__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./getVisibleElement */ \"./src/main/bot/supreme/browser/getVisibleElement.ts\");\n/* harmony import */ var _prepareCookies__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./prepareCookies */ \"./src/main/bot/supreme/browser/prepareCookies.ts\");\n/* harmony import */ var _selectOption__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./selectOption */ \"./src/main/bot/supreme/browser/selectOption.ts\");\n/* harmony import */ var _checkout__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./checkout */ \"./src/main/bot/supreme/browser/checkout.ts\");\n/* harmony import */ var _loadPage__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./loadPage */ \"./src/main/bot/supreme/browser/loadPage.ts\");\n/* harmony import */ var _reportCheckout__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./reportCheckout */ \"./src/main/bot/supreme/browser/reportCheckout.ts\");\n/* harmony import */ var _pageInject_injectScript__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../pageInject/injectScript */ \"./src/main/bot/supreme/pageInject/injectScript.ts\");\n/* harmony import */ var _Logger__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../Logger */ \"./src/main/bot/supreme/Logger.ts\");\n/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! moment */ \"moment\");\n/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_13__);\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nclass SupremeTask {\n  constructor(page, task, product, profile, scheduledDate) {\n    var _this = this,\n        _this$profile,\n        _this$profile$country;\n\n    this.page = page;\n    this.task = task;\n    this.product = product;\n    this.profile = profile;\n    this.scheduledDate = scheduledDate;\n    this.browser = void 0;\n    this.checkoutDelay = void 0;\n    this.externalStock = null;\n    this.logger = void 0;\n    this.startTime = moment__WEBPACK_IMPORTED_MODULE_13___default()();\n    this.submitTime = moment__WEBPACK_IMPORTED_MODULE_13___default()();\n    this.items = [];\n    this.region = void 0;\n    this.init =\n    /*#__PURE__*/\n    Object(_Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function* () {\n      _ProductsMonitor__WEBPACK_IMPORTED_MODULE_2__[\"ProductsMonitor\"].subscribe(_this.setStock);\n\n      _this.page.on('request', req => _this.parseRequest(req, _this));\n\n      _this.page.on('response', res => _this.parseResponse(res, _this));\n\n      _this.page.on('domcontentloaded', () => _this.onLoad());\n\n      _this.logger.writeString('Started fast task!');\n\n      yield _this.prepareCookies();\n      yield _this.loadMainPage();\n    });\n    this.onLoad =\n    /*#__PURE__*/\n    Object(_Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function* () {\n      try {\n        const fullUrl = yield _this.page.evaluate('window.location.href');\n\n        if (!fullUrl.includes('#checkout')) {\n          const timeDifference = _this.scheduledDate.valueOf() - moment__WEBPACK_IMPORTED_MODULE_13___default()().valueOf();\n          yield new Promise(resolve => setTimeout(resolve, timeDifference));\n          const source = Object(_pageInject_injectScript__WEBPACK_IMPORTED_MODULE_11__[\"injectScript\"])(_this.product, _this.externalStock);\n          _this.startTime = moment__WEBPACK_IMPORTED_MODULE_13___default()();\n          yield _this.page.evaluate(source);\n        }\n      } catch {}\n    });\n\n    this.updateTaskStatus = ({\n      message,\n      type,\n      additionalInfo\n    }) => {\n      _IPC_IPCMain__WEBPACK_IMPORTED_MODULE_1__[\"IPCMain\"].updateTaskStatus(this.task, {\n        message,\n        type,\n        additionalInfo\n      });\n    };\n\n    this.retry =\n    /*#__PURE__*/\n    Object(_Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function* () {\n      try {\n        yield new Promise(resolve => setTimeout(resolve, 1000));\n        yield _this.prepareCookies();\n        yield _this.loadMainPage();\n        yield _this.page.reload();\n      } catch {}\n    });\n\n    this.setStock = stock => {\n      this.externalStock = { ...stock\n      };\n    };\n\n    this.parseRequest = _parseRequest__WEBPACK_IMPORTED_MODULE_3__[\"parseRequest\"];\n    this.parseResponse = _parseResponse__WEBPACK_IMPORTED_MODULE_4__[\"parseResponse\"];\n    this.getVisibleElement = _getVisibleElement__WEBPACK_IMPORTED_MODULE_5__[\"getVisibleElement\"];\n    this.prepareCookies = _prepareCookies__WEBPACK_IMPORTED_MODULE_6__[\"prepareCookies\"];\n    this.selectOption = _selectOption__WEBPACK_IMPORTED_MODULE_7__[\"selectOption\"];\n    this.checkout = _checkout__WEBPACK_IMPORTED_MODULE_8__[\"checkout\"];\n    this.loadMainPage = _loadPage__WEBPACK_IMPORTED_MODULE_9__[\"loadMainPage\"];\n    this.reportCheckout = _reportCheckout__WEBPACK_IMPORTED_MODULE_10__[\"reportCheckout\"];\n    this.logger = new _Logger__WEBPACK_IMPORTED_MODULE_12__[\"Logger\"](task.id, page);\n    this.browser = this.page.browser();\n    const country = (_this$profile = this.profile) === null || _this$profile === void 0 ? void 0 : (_this$profile$country = _this$profile.country) === null || _this$profile$country === void 0 ? void 0 : _this$profile$country.label;\n    this.region = country === 'USA' || country === 'Canada' ? 'us' : 'eu';\n    this.checkoutDelay = typeof this.task.checkoutDelay === 'string' ? parseInt(this.task.checkoutDelay) : this.task.checkoutDelay;\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (SupremeTask);\n\n//# sourceURL=webpack:///./src/main/bot/supreme/browser/SupremeTask.ts?");

/***/ }),

/***/ "./src/main/bot/supreme/browser/checkout.ts":
/*!**************************************************!*\
  !*** ./src/main/bot/supreme/browser/checkout.ts ***!
  \**************************************************/
/*! exports provided: checkout */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"checkout\", function() { return checkout; });\n/* harmony import */ var _Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator */ \"./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js\");\n/* harmony import */ var _types_TaskStatus__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../types/TaskStatus */ \"./src/main/types/TaskStatus.ts\");\n/* harmony import */ var _selectors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./selectors */ \"./src/main/bot/supreme/browser/selectors.ts\");\n/* harmony import */ var _pageInject_waitTicket__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../pageInject/waitTicket */ \"./src/main/bot/supreme/pageInject/waitTicket.ts\");\n/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! moment */ \"moment\");\n/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_4__);\n\n\n\n\n\nfunction checkout(_x) {\n  return _checkout.apply(this, arguments);\n}\n\nfunction _checkout() {\n  _checkout = Object(_Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function* () {\n    var _this$profile$month, _this$profile$year, _this$profile$creditC;\n\n    if (!this.profile || !((_this$profile$month = this.profile.month) === null || _this$profile$month === void 0 ? void 0 : _this$profile$month.value) || !((_this$profile$year = this.profile.year) === null || _this$profile$year === void 0 ? void 0 : _this$profile$year.value) || !((_this$profile$creditC = this.profile.creditCardType) === null || _this$profile$creditC === void 0 ? void 0 : _this$profile$creditC.value)) return;\n    yield new Promise(resolve => setTimeout(resolve, 250));\n    const checkoutButton = yield this.getVisibleElement(_selectors__WEBPACK_IMPORTED_MODULE_2__[\"selectors\"].checkoutBtn);\n    yield checkoutButton.tap();\n    yield this.page.waitForXPath(_selectors__WEBPACK_IMPORTED_MODULE_2__[\"selectors\"].creditCardNumber, {\n      visible: true,\n      timeout: 0\n    });\n    this.updateTaskStatus({\n      message: 'Checking out',\n      type: _types_TaskStatus__WEBPACK_IMPORTED_MODULE_1__[\"TaskStatusType\"].Action\n    });\n    const addToCartTime = Date.now();\n    const {\n      creditCardType,\n      month,\n      year,\n      creditCardNumber,\n      cvv\n    } = this.profile;\n\n    if (this.region === 'eu') {\n      yield this.selectOption(_selectors__WEBPACK_IMPORTED_MODULE_2__[\"selectors\"].cardTypeSelect, creditCardType.value);\n    }\n\n    yield this.selectOption(_selectors__WEBPACK_IMPORTED_MODULE_2__[\"selectors\"].monthSelect, month.value);\n    yield this.selectOption(_selectors__WEBPACK_IMPORTED_MODULE_2__[\"selectors\"].yearSelect, year.value);\n    const numberInput = yield this.getVisibleElement(_selectors__WEBPACK_IMPORTED_MODULE_2__[\"selectors\"].creditCardNumber);\n    yield numberInput.tap();\n    yield numberInput.type(creditCardNumber);\n    const cvvInput = yield this.getVisibleElement(_selectors__WEBPACK_IMPORTED_MODULE_2__[\"selectors\"].cvv);\n    yield cvvInput.tap();\n    yield cvvInput.type(cvv.toString());\n    const termsCheckbox = yield this.getVisibleElement(_selectors__WEBPACK_IMPORTED_MODULE_2__[\"selectors\"].termsLabel, false);\n    yield termsCheckbox.tap();\n    const checkoutTime = Date.now() - addToCartTime.valueOf();\n    const delay = typeof this.task.checkoutDelay === 'string' ? parseInt(this.task.checkoutDelay) : this.task.checkoutDelay;\n\n    if (checkoutTime < delay) {\n      this.updateTaskStatus({\n        message: 'Checkout delay',\n        type: _types_TaskStatus__WEBPACK_IMPORTED_MODULE_1__[\"TaskStatusType\"].Action\n      });\n      const requiredDelay = delay - checkoutTime;\n      yield new Promise(resolve => setTimeout(resolve, requiredDelay));\n    }\n\n    yield this.page.evaluate(Object(_pageInject_waitTicket__WEBPACK_IMPORTED_MODULE_3__[\"waitTicket\"])());\n    const processBtn = yield this.getVisibleElement(_selectors__WEBPACK_IMPORTED_MODULE_2__[\"selectors\"].processBtn, false);\n    yield processBtn.tap();\n    this.submitTime = moment__WEBPACK_IMPORTED_MODULE_4___default()();\n    this.updateTaskStatus({\n      message: 'Waiting for response',\n      type: _types_TaskStatus__WEBPACK_IMPORTED_MODULE_1__[\"TaskStatusType\"].Action\n    });\n  });\n  return _checkout.apply(this, arguments);\n}\n\n//# sourceURL=webpack:///./src/main/bot/supreme/browser/checkout.ts?");

/***/ }),

/***/ "./src/main/bot/supreme/browser/getRandomString.ts":
/*!*********************************************************!*\
  !*** ./src/main/bot/supreme/browser/getRandomString.ts ***!
  \*********************************************************/
/*! exports provided: getRandomString */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getRandomString\", function() { return getRandomString; });\nconst getRandomString = () => Math.random().toString(36).substring(2, 15);\n\n//# sourceURL=webpack:///./src/main/bot/supreme/browser/getRandomString.ts?");

/***/ }),

/***/ "./src/main/bot/supreme/browser/getVisibleElement.ts":
/*!***********************************************************!*\
  !*** ./src/main/bot/supreme/browser/getVisibleElement.ts ***!
  \***********************************************************/
/*! exports provided: getVisibleElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getVisibleElement\", function() { return getVisibleElement; });\n/* harmony import */ var _Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator */ \"./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js\");\n\nfunction getVisibleElement(_x, _x2) {\n  return _getVisibleElement.apply(this, arguments);\n}\n\nfunction _getVisibleElement() {\n  _getVisibleElement = Object(_Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function* (xpath, inViewport = true) {\n    yield this.page.waitForXPath(xpath, {\n      visible: true\n    });\n    const elements = yield this.page.$x(xpath);\n    let visible = [];\n\n    for (let element of elements) {\n      const box = yield element.boundingBox();\n      const viewport = yield element.isIntersectingViewport();\n      if (box !== null && viewport) visible.push(element);\n      if (box !== null && !inViewport) visible.push(element);\n    }\n\n    return visible[0];\n  });\n  return _getVisibleElement.apply(this, arguments);\n}\n\n//# sourceURL=webpack:///./src/main/bot/supreme/browser/getVisibleElement.ts?");

/***/ }),

/***/ "./src/main/bot/supreme/browser/loadPage.ts":
/*!**************************************************!*\
  !*** ./src/main/bot/supreme/browser/loadPage.ts ***!
  \**************************************************/
/*! exports provided: loadMainPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"loadMainPage\", function() { return loadMainPage; });\n/* harmony import */ var _Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator */ \"./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js\");\n/* harmony import */ var _types_TaskStatus__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../types/TaskStatus */ \"./src/main/types/TaskStatus.ts\");\n\n\nfunction loadMainPage(_x) {\n  return _loadMainPage.apply(this, arguments);\n}\n\nfunction _loadMainPage() {\n  _loadMainPage = Object(_Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function* () {\n    this.updateTaskStatus({\n      message: 'Waiting for products',\n      type: _types_TaskStatus__WEBPACK_IMPORTED_MODULE_1__[\"TaskStatusType\"].Action\n    });\n\n    try {\n      yield this.page.goto(`https://www.supremenewyork.com/mobile/`, {\n        waitUntil: 'domcontentloaded',\n        timeout: 3000\n      });\n      this.logger.writeString('Loaded main page!');\n    } catch {\n      yield this.loadMainPage();\n      return;\n    }\n  });\n  return _loadMainPage.apply(this, arguments);\n}\n\n//# sourceURL=webpack:///./src/main/bot/supreme/browser/loadPage.ts?");

/***/ }),

/***/ "./src/main/bot/supreme/browser/parseRequest.ts":
/*!******************************************************!*\
  !*** ./src/main/bot/supreme/browser/parseRequest.ts ***!
  \******************************************************/
/*! exports provided: parseRequest */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"parseRequest\", function() { return parseRequest; });\n/* harmony import */ var _Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator */ \"./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js\");\n/* harmony import */ var _IPC_IPCMain__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../IPC/IPCMain */ \"./src/main/IPC/IPCMain.ts\");\n\n\nfunction parseRequest(_x, _x2) {\n  return _parseRequest.apply(this, arguments);\n}\n\nfunction _parseRequest() {\n  _parseRequest = Object(_Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function* (req, task) {\n    const data = req.postData();\n    task.logger.reportRequest(req);\n    if (req.url() !== 'http://127.0.0.1:2140/status.json' || !data) return;\n    const status = JSON.parse(data);\n\n    if (status.message === 'ATC') {\n      task.items = Array.isArray(status.additionalInfo) ? status.additionalInfo : [];\n      return yield task.checkout();\n    }\n\n    _IPC_IPCMain__WEBPACK_IMPORTED_MODULE_1__[\"IPCMain\"].updateTaskStatus(task.task, status);\n    if (status.message !== 'Sold out') return;\n    yield task.page.close();\n    yield task.page.browser().close();\n  });\n  return _parseRequest.apply(this, arguments);\n}\n\n//# sourceURL=webpack:///./src/main/bot/supreme/browser/parseRequest.ts?");

/***/ }),

/***/ "./src/main/bot/supreme/browser/parseResponse.ts":
/*!*******************************************************!*\
  !*** ./src/main/bot/supreme/browser/parseResponse.ts ***!
  \*******************************************************/
/*! exports provided: parseResponse */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"parseResponse\", function() { return parseResponse; });\n/* harmony import */ var _Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator */ \"./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js\");\n/* harmony import */ var _types_TaskStatus__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../types/TaskStatus */ \"./src/main/types/TaskStatus.ts\");\n\n\nfunction parseResponse(_x, _x2) {\n  return _parseResponse.apply(this, arguments);\n}\n\nfunction _parseResponse() {\n  _parseResponse = Object(_Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function* (response, task) {\n    const status = response.status();\n    const url = response.url();\n    task.logger.reportResponse(response);\n\n    if (/.*checkout.json$/.test(url) && status !== 200) {\n      task.updateTaskStatus({\n        message: `${status}. Retrying`,\n        type: _types_TaskStatus__WEBPACK_IMPORTED_MODULE_1__[\"TaskStatusType\"].Error\n      });\n      yield task.retry();\n      return;\n    }\n\n    if (status !== 200) return;\n\n    if (/.*add.json$/.test(url)) {\n      const res = yield response.json();\n\n      if (res.length > 0) {\n        task.updateTaskStatus({\n          message: 'Added to cart',\n          type: _types_TaskStatus__WEBPACK_IMPORTED_MODULE_1__[\"TaskStatusType\"].Action\n        });\n      } else if (res.length === 0) {\n        task.updateTaskStatus({\n          message: 'Size sold out',\n          type: _types_TaskStatus__WEBPACK_IMPORTED_MODULE_1__[\"TaskStatusType\"].Error\n        });\n        yield task.retry();\n      }\n    } else if (/.*(checkout|status).json$/.test(url)) {\n      const res = yield response.json();\n\n      if (res.status !== 'queued') {\n        task.reportCheckout(res);\n      }\n\n      switch (res.status) {\n        case 'failed':\n        case '404':\n        case '500':\n        case 'outOfStock':\n          {\n            const message = res.status === 'outOfStock' ? 'Size sold out' : 'Failed. Retrying';\n            task.updateTaskStatus({\n              message,\n              type: _types_TaskStatus__WEBPACK_IMPORTED_MODULE_1__[\"TaskStatusType\"].Error\n            });\n            yield task.retry();\n            break;\n          }\n\n        case 'queued':\n          {\n            task.updateTaskStatus({\n              message: 'Processing',\n              type: _types_TaskStatus__WEBPACK_IMPORTED_MODULE_1__[\"TaskStatusType\"].Action\n            });\n            break;\n          }\n\n        case 'dup':\n          {\n            task.updateTaskStatus({\n              message: 'Duplicate order',\n              type: _types_TaskStatus__WEBPACK_IMPORTED_MODULE_1__[\"TaskStatusType\"].Error\n            });\n            yield task.page.close();\n            yield task.browser.close();\n            break;\n          }\n\n        case 'paid':\n          {\n            task.updateTaskStatus({\n              message: 'Success',\n              type: _types_TaskStatus__WEBPACK_IMPORTED_MODULE_1__[\"TaskStatusType\"].Success,\n              additionalInfo: res.id\n            });\n            yield task.page.close();\n            yield task.browser.close();\n            break;\n          }\n      }\n    }\n  });\n  return _parseResponse.apply(this, arguments);\n}\n\n//# sourceURL=webpack:///./src/main/bot/supreme/browser/parseResponse.ts?");

/***/ }),

/***/ "./src/main/bot/supreme/browser/prepareCookies.ts":
/*!********************************************************!*\
  !*** ./src/main/bot/supreme/browser/prepareCookies.ts ***!
  \********************************************************/
/*! exports provided: prepareCookies */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"prepareCookies\", function() { return prepareCookies; });\n/* harmony import */ var _Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator */ \"./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js\");\n\n\nfunction generateJSAddressCookie({\n  firstName,\n  lastName,\n  address1,\n  address2,\n  city,\n  postcode,\n  email,\n  telephone,\n  country,\n  region\n}, task) {\n  if (task.region === 'us') {\n    telephone = telephone.replace(/(\\d{3})(\\d{3})(\\d{4})/, '$1-$2-$3');\n  }\n\n  const value = `${firstName} ${lastName}|${email}|${telephone}|${address1}|${address2}|${city}|${task.region === 'us' ? region === null || region === void 0 ? void 0 : region.value : 'undefined'}|${postcode}|${country === null || country === void 0 ? void 0 : country.value}|`.replace(/ /g, '%20').replace(/@/g, '%40');\n  return {\n    name: 'js-address',\n    value: value,\n    domain: '.supremenewyork.com'\n  };\n}\n\nfunction prepareCookies(_x) {\n  return _prepareCookies.apply(this, arguments);\n}\n\nfunction _prepareCookies() {\n  _prepareCookies = Object(_Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function* () {\n    if (!this.profile) return;\n    const cookies = yield this.page.cookies('https://www.supremenewyork.com/');\n    yield this.page.deleteCookie(...cookies);\n    yield this.page.setCookie(generateJSAddressCookie(this.profile, this));\n    this.logger.writeObject({\n      message: 'Prepared cookies!'\n    });\n  });\n  return _prepareCookies.apply(this, arguments);\n}\n\n//# sourceURL=webpack:///./src/main/bot/supreme/browser/prepareCookies.ts?");

/***/ }),

/***/ "./src/main/bot/supreme/browser/reportCheckout.ts":
/*!********************************************************!*\
  !*** ./src/main/bot/supreme/browser/reportCheckout.ts ***!
  \********************************************************/
/*! exports provided: reportCheckout */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"reportCheckout\", function() { return reportCheckout; });\n/* harmony import */ var _IPC_IPCMain__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../IPC/IPCMain */ \"./src/main/IPC/IPCMain.ts\");\n\nfunction reportCheckout({\n  status,\n  info\n}) {\n  var _ref;\n\n  const items = (_ref = info === null || info === void 0 ? void 0 : info.purchases.map(p => p.product_name)) !== null && _ref !== void 0 ? _ref : this.items;\n  _IPC_IPCMain__WEBPACK_IMPORTED_MODULE_0__[\"IPCMain\"].reportCheckout({\n    site: 'supreme',\n    region: this.region,\n    checkoutTime: this.submitTime.valueOf() - this.startTime.valueOf(),\n    status,\n    items\n  });\n}\n\n//# sourceURL=webpack:///./src/main/bot/supreme/browser/reportCheckout.ts?");

/***/ }),

/***/ "./src/main/bot/supreme/browser/selectOption.ts":
/*!******************************************************!*\
  !*** ./src/main/bot/supreme/browser/selectOption.ts ***!
  \******************************************************/
/*! exports provided: selectOption */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"selectOption\", function() { return selectOption; });\n/* harmony import */ var _Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator */ \"./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js\");\n\nfunction selectOption(_x, _x2, _x3) {\n  return _selectOption.apply(this, arguments);\n}\n\nfunction _selectOption() {\n  _selectOption = Object(_Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function* (xpath, option) {\n    yield this.page.waitForXPath(xpath, {\n      visible: true\n    });\n    const [select] = yield this.page.$x(xpath);\n    const property = yield select.getProperty('id');\n    const id = yield property.jsonValue();\n    yield this.page.select(`#${id}`, option);\n  });\n  return _selectOption.apply(this, arguments);\n}\n\n//# sourceURL=webpack:///./src/main/bot/supreme/browser/selectOption.ts?");

/***/ }),

/***/ "./src/main/bot/supreme/browser/selectors.ts":
/*!***************************************************!*\
  !*** ./src/main/bot/supreme/browser/selectors.ts ***!
  \***************************************************/
/*! exports provided: selectors */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"selectors\", function() { return selectors; });\nconst generateXPath = (tag, attribute, stringToContain, getParent = false, valuesToIgnore = []) => {\n  let xpath = `//${tag}[`;\n  stringToContain = stringToContain.toLowerCase();\n\n  for (let letter of stringToContain) {\n    xpath += ` (contains(${attribute}, '${letter}') or contains(${attribute}, '${letter.toUpperCase()}')) and`;\n  }\n\n  xpath = xpath.slice(0, -4);\n  valuesToIgnore.forEach(value => {\n    value = value.toLowerCase();\n    xpath += ` and not(contains(${attribute}, '${value}')) and not(contains(${attribute}, '${value.toUpperCase()}'))`;\n  });\n  xpath += ']';\n  if (getParent) xpath += '/parent::*';\n  return xpath;\n};\n\nconst selectors = {\n  addBtn: generateXPath('span', 'text()', 'add to', false, ['checkout', 'remove']),\n  addBtnDesktop: generateXPath('input', '@value', 'add to', false, ['checkout', 'remove']),\n  checkoutBtn: generateXPath('span', 'text()', 'checkout', true, ['add', 'remove', 'basket']),\n  checkoutBtnDesktop: generateXPath('a', 'text()', 'checkout', false, ['add', 'remove', 'basket']),\n  cvv: generateXPath('input', '@placeholder', 'cv', false, ['num', 'name']),\n  creditCardNumber: generateXPath('input', '@placeholder', 'number', false, ['name', 'tel']),\n  termsLabel: generateXPath('label', 'text()', 'I have read') + \"//preceding::input[@type='checkbox' and not(contains(@id, 'address'))]\",\n  processBtn: generateXPath('span', 'text()', 'process', true, ['cancel', 'edit']),\n  processBtnDesktop: generateXPath('input', '@value', 'process', false, ['cancel', 'edit']) + \"[@type='submit']\",\n  cardTypeSelect: \"//option[contains(text(),'astercard')]/parent::*\",\n  monthSelect: \"//option[contains(text(),'06')]/parent::*\",\n  yearSelect: \"//option[contains(text(),'2021')]/parent::*\",\n  itemName: \"//*[@class='name']\",\n  itemSelectable: \"//*[@class='selectable']\",\n  price: \"//*[@class='price']\",\n  recaptchaCSS: \"*[name='g-recaptcha-response']\"\n};\n\n\n//# sourceURL=webpack:///./src/main/bot/supreme/browser/selectors.ts?");

/***/ }),

/***/ "./src/main/bot/supreme/pageInject/injectScript.ts":
/*!*********************************************************!*\
  !*** ./src/main/bot/supreme/pageInject/injectScript.ts ***!
  \*********************************************************/
/*! exports provided: injectScript */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"injectScript\", function() { return injectScript; });\n/* eslint-disable no-template-curly-in-string */\nconst injectScript = (payload, externalStock) => '(async()=>{localStorage.clear();if(typeof Supreme===\"undefined\")return await a();const o=' + JSON.stringify(payload) + ';const p=' + JSON.stringify(externalStock) + String.fromCharCode(...[59, 99, 111, 110, 115, 116, 32, 113, 61, 91, 93, 59, 99, 111, 110, 115, 116, 123, 107, 101, 121, 119, 111, 114, 100, 115, 58, 114, 44, 99, 111, 108, 111, 114, 115, 58, 115, 44, 97, 110, 121, 83, 105, 122, 101, 58, 116, 44, 97, 110, 121, 67, 111, 108, 111, 114, 58, 117, 44, 97, 110, 121, 83, 105, 122, 101, 79, 112, 116, 105, 111, 110, 58, 118, 125, 61, 111, 59, 99, 111, 110, 115, 116, 32, 119, 61, 111, 46, 115, 105, 122, 101, 46, 118, 97, 108, 117, 101, 59, 108, 101, 116, 32, 120, 61, 103, 40, 114, 41, 59, 105, 102, 40, 33, 120, 38, 38, 112, 41, 123, 110, 40, 112, 41, 59, 120, 61, 103, 40, 114, 41, 125, 105, 102, 40, 33, 120, 41, 123, 114, 101, 116, 117, 114, 110, 32, 97, 119, 97, 105, 116, 32, 97, 40, 41, 125, 113, 46, 112, 117, 115, 104, 40, 120, 46, 97, 116, 116, 114, 105, 98, 117, 116, 101, 115, 46, 110, 97, 109, 101, 41, 59, 99, 111, 110, 115, 116, 32, 121, 61, 97, 119, 97, 105, 116, 32, 105, 40, 120, 41, 59, 105, 102, 40, 33, 121, 41, 114, 101, 116, 117, 114, 110, 59, 99, 111, 110, 115, 116, 32, 122, 61, 102, 40, 121, 44, 115, 44, 117, 41, 59, 105, 102, 40, 33, 122, 41, 114, 101, 116, 117, 114, 110, 59, 99, 111, 110, 115, 116, 32, 65, 61, 122, 46, 97, 116, 116, 114, 105, 98, 117, 116, 101, 115, 46, 115, 105, 122, 101, 115, 46, 109, 111, 100, 101, 108, 115, 46, 102, 105, 108, 116, 101, 114, 40, 97, 61, 62, 97, 46, 97, 116, 116, 114, 105, 98, 117, 116, 101, 115, 46, 115, 116, 111, 99, 107, 95, 108, 101, 118, 101, 108, 33, 61, 61, 48, 41, 59, 99, 111, 110, 115, 116, 32, 66, 61, 101, 40, 65, 44, 119, 44, 116, 41, 59, 105, 102, 40, 33, 66, 41, 123, 109, 40, 34, 83, 111, 108, 100, 32, 111, 117, 116, 34, 44, 34, 69, 114, 114, 111, 114, 34, 41, 59, 114, 101, 116, 117, 114, 110, 125, 97, 119, 97, 105, 116, 32, 98, 40, 66, 41, 59, 109, 40, 34, 65, 84, 67, 34, 44, 34, 65, 99, 116, 105, 111, 110, 34, 44, 113, 41, 59, 97, 115, 121, 110, 99, 32, 102, 117, 110, 99, 116, 105, 111, 110, 32, 97, 40, 41, 123, 97, 119, 97, 105, 116, 32, 104, 40, 49, 53, 48, 48, 41, 59, 119, 105, 110, 100, 111, 119, 46, 108, 111, 99, 97, 116, 105, 111, 110, 46, 114, 101, 108, 111, 97, 100, 40, 41, 125, 97, 115, 121, 110, 99, 32, 102, 117, 110, 99, 116, 105, 111, 110, 32, 98, 40, 97, 41, 123, 109, 40, 34, 65, 100, 100, 105, 110, 103, 32, 116, 111, 32, 99, 97, 114, 116, 34, 44, 34, 65, 99, 116, 105, 111, 110, 34, 41, 59, 99, 111, 110, 115, 116, 32, 98, 61, 97, 119, 97, 105, 116, 32, 80, 114, 111, 109, 105, 115, 101, 46, 114, 97, 99, 101, 40, 91, 100, 40, 97, 41, 44, 99, 40, 97, 41, 93, 41, 59, 105, 102, 40, 33, 83, 117, 112, 114, 101, 109, 101, 46, 97, 112, 112, 46, 99, 97, 114, 116, 46, 97, 116, 116, 114, 105, 98, 117, 116, 101, 115, 46, 115, 105, 122, 101, 115, 46, 99, 111, 110, 116, 97, 105, 110, 115, 40, 97, 41, 41, 123, 83, 117, 112, 114, 101, 109, 101, 46, 97, 112, 112, 46, 99, 97, 114, 116, 46, 97, 100, 100, 83, 105, 122, 101, 84, 111, 76, 111, 99, 97, 108, 83, 116, 111, 114, 97, 103, 101, 40, 97, 44, 49, 41, 59, 83, 117, 112, 114, 101, 109, 101, 46, 97, 112, 112, 46, 99, 97, 114, 116, 46, 97, 116, 116, 114, 105, 98, 117, 116, 101, 115, 46, 115, 105, 122, 101, 115, 46, 97, 100, 100, 40, 97, 44, 49, 41, 125, 115, 101, 116, 83, 101, 115, 115, 105, 111, 110, 73, 68, 115, 40, 41, 59, 114, 101, 116, 117, 114, 110, 32, 98, 125, 97, 115, 121, 110, 99, 32, 102, 117, 110, 99, 116, 105, 111, 110, 32, 99, 40, 97, 41, 123, 99, 111, 110, 115, 116, 32, 98, 61, 97, 46, 97, 116, 116, 114, 105, 98, 117, 116, 101, 115, 46, 105, 100, 46, 116, 111, 83, 116, 114, 105, 110, 103, 40, 41, 59, 119, 104, 105, 108, 101, 40, 33, 108, 111, 99, 97, 108, 83, 116, 111, 114, 97, 103, 101, 46, 104, 97, 115, 79, 119, 110, 80, 114, 111, 112, 101, 114, 116, 121, 40, 98, 41, 41, 123, 83, 117, 112, 114, 101, 109, 101, 46, 97, 112, 112, 46, 99, 97, 114, 116, 46, 114, 101, 109, 111, 118, 101, 83, 105, 122, 101, 68, 105, 114, 101, 99, 116, 108, 121, 40, 98, 41, 59, 83, 117, 112, 114, 101, 109, 101, 46, 97, 112, 112, 46, 99, 97, 114, 116, 46, 97, 100, 100, 83, 105, 122, 101, 40, 97, 41, 59, 97, 119, 97, 105, 116, 32, 104, 40, 49, 53, 48, 48, 41, 125, 114, 101, 116, 117, 114, 110, 32, 116, 114, 117, 101, 125, 97, 115, 121, 110, 99, 32, 102, 117, 110, 99, 116, 105, 111, 110, 32, 100, 40, 97, 41, 123, 99, 111, 110, 115, 116, 32, 98, 61, 97, 46, 97, 116, 116, 114, 105, 98, 117, 116, 101, 115, 46, 105, 100, 46, 116, 111, 83, 116, 114, 105, 110, 103, 40, 41, 59, 119, 104, 105, 108, 101, 40, 33, 108, 111, 99, 97, 108, 83, 116, 111, 114, 97, 103, 101, 46, 104, 97, 115, 79, 119, 110, 80, 114, 111, 112, 101, 114, 116, 121, 40, 98, 41, 41, 123, 97, 119, 97, 105, 116, 32, 104, 40, 49, 48, 41, 125, 114, 101, 116, 117, 114, 110, 32, 116, 114, 117, 101, 125, 102, 117, 110, 99, 116, 105, 111, 110, 32, 101, 40, 97, 44, 98, 44, 99, 41, 123, 99, 111, 110, 115, 116, 32, 100, 61, 97, 46, 102, 105, 110, 100, 40, 97, 61, 62, 97, 46, 97, 116, 116, 114, 105, 98, 117, 116, 101, 115, 46, 110, 97, 109, 101, 46, 116, 111, 76, 111, 119, 101, 114, 67, 97, 115, 101, 40, 41, 61, 61, 61, 98, 46, 116, 111, 76, 111, 119, 101, 114, 67, 97, 115, 101, 40, 41, 41, 59, 105, 102, 40, 100, 124, 124, 33, 99, 124, 124, 33, 118, 124, 124, 97, 46, 108, 101, 110, 103, 116, 104, 61, 61, 61, 48, 41, 114, 101, 116, 117, 114, 110, 32, 100, 59, 115, 119, 105, 116, 99, 104, 40, 118, 46, 118, 97, 108, 117, 101, 41, 123, 99, 97, 115, 101, 34, 115, 109, 97, 108, 108, 101, 115, 116, 34, 58, 123, 114, 101, 116, 117, 114, 110, 32, 97, 91, 48, 93, 125, 99, 97, 115, 101, 34, 108, 97, 114, 103, 101, 115, 116, 34, 58, 123, 114, 101, 116, 117, 114, 110, 32, 97, 91, 97, 46, 108, 101, 110, 103, 116, 104, 45, 49, 93, 125, 99, 97, 115, 101, 34, 114, 97, 110, 100, 111, 109, 34, 58, 123, 114, 101, 116, 117, 114, 110, 32, 97, 91, 77, 97, 116, 104, 46, 102, 108, 111, 111, 114, 40, 77, 97, 116, 104, 46, 114, 97, 110, 100, 111, 109, 40, 41, 42, 97, 46, 108, 101, 110, 103, 116, 104, 41, 93, 125, 100, 101, 102, 97, 117, 108, 116, 58, 123, 114, 101, 116, 117, 114, 110, 32, 97, 91, 77, 97, 116, 104, 46, 102, 108, 111, 111, 114, 40, 77, 97, 116, 104, 46, 114, 97, 110, 100, 111, 109, 40, 41, 42, 97, 46, 108, 101, 110, 103, 116, 104, 41, 93, 125, 125, 125, 102, 117, 110, 99, 116, 105, 111, 110, 32, 102, 40, 97, 44, 98, 44, 99, 41, 123, 99, 111, 110, 115, 116, 32, 100, 61, 97, 46, 102, 105, 110, 100, 40, 97, 61, 62, 108, 40, 97, 46, 97, 116, 116, 114, 105, 98, 117, 116, 101, 115, 46, 110, 97, 109, 101, 44, 98, 41, 41, 59, 105, 102, 40, 100, 124, 124, 33, 99, 41, 114, 101, 116, 117, 114, 110, 32, 100, 59, 99, 111, 110, 115, 116, 32, 101, 61, 97, 91, 77, 97, 116, 104, 46, 102, 108, 111, 111, 114, 40, 77, 97, 116, 104, 46, 114, 97, 110, 100, 111, 109, 40, 41, 42, 97, 46, 108, 101, 110, 103, 116, 104, 41, 93, 59, 114, 101, 116, 117, 114, 110, 32, 101, 125, 102, 117, 110, 99, 116, 105, 111, 110, 32, 103, 40, 97, 41, 123, 99, 111, 110, 115, 116, 32, 98, 61, 83, 117, 112, 114, 101, 109, 101, 46, 99, 97, 116, 101, 103, 111, 114, 105, 101, 115, 46, 109, 111, 100, 101, 108, 115, 46, 102, 108, 97, 116, 77, 97, 112, 40, 97, 61, 62, 97, 46, 97, 116, 116, 114, 105, 98, 117, 116, 101, 115, 46, 112, 114, 111, 100, 117, 99, 116, 115, 46, 109, 111, 100, 101, 108, 115, 46, 102, 108, 97, 116, 40, 41, 41, 59, 114, 101, 116, 117, 114, 110, 32, 98, 46, 102, 105, 110, 100, 40, 98, 61, 62, 108, 40, 98, 46, 97, 116, 116, 114, 105, 98, 117, 116, 101, 115, 46, 110, 97, 109, 101, 44, 97, 41, 41, 125, 97, 115, 121, 110, 99, 32, 102, 117, 110, 99, 116, 105, 111, 110, 32, 104, 40, 97, 41, 123, 97, 119, 97, 105, 116, 32, 110, 101, 119, 32, 80, 114, 111, 109, 105, 115, 101, 40, 98, 61, 62, 115, 101, 116, 84, 105, 109, 101, 111, 117, 116, 40, 98, 44, 97, 41, 41, 125, 97, 115, 121, 110, 99, 32, 102, 117, 110, 99, 116, 105, 111, 110, 32, 105, 40, 97, 41, 123, 99, 111, 110, 115, 116, 32, 98, 61, 97, 119, 97, 105, 116, 32, 80, 114, 111, 109, 105, 115, 101, 46, 114, 97, 99, 101, 40, 91, 106, 40, 97, 41, 44, 107, 40, 97, 41, 93, 41, 59, 105, 102, 40, 33, 98, 41, 123, 114, 101, 116, 117, 114, 110, 32, 110, 117, 108, 108, 125, 99, 111, 110, 115, 116, 32, 99, 61, 98, 46, 102, 105, 108, 116, 101, 114, 40, 97, 61, 62, 97, 46, 97, 116, 116, 114, 105, 98, 117, 116, 101, 115, 46, 115, 105, 122, 101, 115, 46, 109, 111, 100, 101, 108, 115, 46, 115, 111, 109, 101, 40, 97, 61, 62, 97, 46, 97, 116, 116, 114, 105, 98, 117, 116, 101, 115, 46, 115, 116, 111, 99, 107, 95, 108, 101, 118, 101, 108, 33, 61, 61, 48, 41, 41, 59, 114, 101, 116, 117, 114, 110, 32, 99, 125, 97, 115, 121, 110, 99, 32, 102, 117, 110, 99, 116, 105, 111, 110, 32, 106, 40, 97, 41, 123, 119, 104, 105, 108, 101, 40, 33, 97, 46, 97, 116, 116, 114, 105, 98, 117, 116, 101, 115, 46, 115, 116, 121, 108, 101, 115, 41, 123, 97, 119, 97, 105, 116, 32, 104, 40, 49, 48, 41, 125, 114, 101, 116, 117, 114, 110, 32, 97, 46, 97, 116, 116, 114, 105, 98, 117, 116, 101, 115, 46, 115, 116, 121, 108, 101, 115, 46, 109, 111, 100, 101, 108, 115, 125, 97, 115, 121, 110, 99, 32, 102, 117, 110, 99, 116, 105, 111, 110, 32, 107, 40, 97, 41, 123, 119, 104, 105, 108, 101, 40, 33, 97, 46, 97, 116, 116, 114, 105, 98, 117, 116, 101, 115, 46, 115, 116, 121, 108, 101, 115, 41, 123, 97, 46, 102, 101, 116, 99, 104, 40, 41, 59, 97, 119, 97, 105, 116, 32, 104, 40, 49, 48, 48, 48, 41, 125, 125, 102, 117, 110, 99, 116, 105, 111, 110, 32, 108, 40, 97, 44, 123, 112, 111, 115, 105, 116, 105, 118, 101, 58, 98, 44, 110, 101, 103, 97, 116, 105, 118, 101, 58, 99, 44, 109, 117, 108, 116, 105, 58, 100, 125, 41, 123, 97, 61, 97, 46, 116, 111, 76, 111, 119, 101, 114, 67, 97, 115, 101, 40, 41, 59, 105, 102, 40, 33, 98, 46, 101, 118, 101, 114, 121, 40, 98, 61, 62, 97, 46, 105, 110, 99, 108, 117, 100, 101, 115, 40, 98, 41, 41, 41, 114, 101, 116, 117, 114, 110, 32, 102, 97, 108, 115, 101, 59, 105, 102, 40, 99, 46, 115, 111, 109, 101, 40, 98, 61, 62, 97, 46, 105, 110, 99, 108, 117, 100, 101, 115, 40, 98, 41, 41, 41, 114, 101, 116, 117, 114, 110, 32, 102, 97, 108, 115, 101, 59, 105, 102, 40, 33, 100, 41, 114, 101, 116, 117, 114, 110, 32, 116, 114, 117, 101, 59, 102, 111, 114, 40, 99, 111, 110, 115, 116, 32, 101, 32, 111, 102, 32, 100, 41, 123, 99, 111, 110, 115, 116, 32, 98, 61, 101, 46, 115, 112, 108, 105, 116, 40, 34, 32, 124, 32, 34, 41, 59, 105, 102, 40, 33, 98, 46, 115, 111, 109, 101, 40, 98, 61, 62, 97, 46, 105, 110, 99, 108, 117, 100, 101, 115, 40, 98, 41, 41, 41, 114, 101, 116, 117, 114, 110, 32, 102, 97, 108, 115, 101, 125, 114, 101, 116, 117, 114, 110, 32, 116, 114, 117, 101, 125, 102, 117, 110, 99, 116, 105, 111, 110, 32, 109, 40, 97, 44, 98, 44, 99, 41, 123, 102, 101, 116, 99, 104, 40, 34, 104, 116, 116, 112, 58, 47, 47, 49, 50, 55, 46, 48, 46, 48, 46, 49, 58, 50, 49, 52, 48, 47, 115, 116, 97, 116, 117, 115, 46, 106, 115, 111, 110, 34, 44, 123, 109, 101, 116, 104, 111, 100, 58, 34, 80, 79, 83, 84, 34, 44, 104, 101, 97, 100, 101, 114, 115, 58, 123, 65, 99, 99, 101, 112, 116, 58, 34, 97, 112, 112, 108, 105, 99, 97, 116, 105, 111, 110, 47, 106, 115, 111, 110, 34, 44, 34, 67, 111, 110, 116, 101, 110, 116, 45, 84, 121, 112, 101, 34, 58, 34, 97, 112, 112, 108, 105, 99, 97, 116, 105, 111, 110, 47, 106, 115, 111, 110, 34, 125, 44, 98, 111, 100, 121, 58, 74, 83, 79, 78, 46, 115, 116, 114, 105, 110, 103, 105, 102, 121, 40, 123, 109, 101, 115, 115, 97, 103, 101, 58, 97, 44, 116, 121, 112, 101, 58, 98, 44, 97, 100, 100, 105, 116, 105, 111, 110, 97, 108, 73, 110, 102, 111, 58, 99, 125, 41, 125, 41, 125, 102, 117, 110, 99, 116, 105, 111, 110, 32, 110, 40, 97, 41, 123, 97, 108, 108, 67, 97, 116, 101, 103, 111, 114, 105, 101, 115, 65, 110, 100, 80, 114, 111, 100, 117, 99, 116, 115, 61, 97, 59, 119, 105, 110, 100, 111, 119, 46, 114, 101, 108, 101, 97, 115, 101, 95, 119, 101, 101, 107, 61, 97, 46, 114, 101, 108, 101, 97, 115, 101, 95, 119, 101, 101, 107, 59, 119, 105, 110, 100, 111, 119, 46, 114, 101, 108, 101, 97, 115, 101, 95, 100, 97, 116, 101, 61, 97, 46, 114, 101, 108, 101, 97, 115, 101, 95, 100, 97, 116, 101, 59, 83, 117, 112, 114, 101, 109, 101, 46, 99, 97, 116, 101, 103, 111, 114, 105, 101, 115, 61, 110, 101, 119, 32, 67, 97, 116, 101, 103, 111, 114, 105, 101, 115, 59, 83, 117, 112, 114, 101, 109, 101, 46, 99, 97, 116, 101, 103, 111, 114, 105, 101, 115, 46, 112, 111, 112, 117, 108, 97, 116, 101, 40, 97, 41, 125, 125, 41, 40, 41, 59]);\n\n//# sourceURL=webpack:///./src/main/bot/supreme/pageInject/injectScript.ts?");

/***/ }),

/***/ "./src/main/bot/supreme/pageInject/waitTicket.ts":
/*!*******************************************************!*\
  !*** ./src/main/bot/supreme/pageInject/waitTicket.ts ***!
  \*******************************************************/
/*! exports provided: waitTicket */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"waitTicket\", function() { return waitTicket; });\nconst waitTicket = () => String.fromCharCode(...[40, 40, 41, 61, 62, 123, 114, 101, 116, 117, 114, 110, 32, 110, 101, 119, 32, 80, 114, 111, 109, 105, 115, 101, 40, 40, 97, 44, 98, 41, 61, 62, 123, 40, 102, 117, 110, 99, 116, 105, 111, 110, 32, 98, 40, 41, 123, 99, 111, 110, 115, 116, 32, 100, 61, 123, 125, 59, 100, 111, 99, 117, 109, 101, 110, 116, 46, 99, 111, 111, 107, 105, 101, 46, 115, 112, 108, 105, 116, 40, 34, 59, 34, 41, 46, 102, 111, 114, 69, 97, 99, 104, 40, 97, 61, 62, 123, 99, 111, 110, 115, 116, 91, 98, 44, 99, 93, 61, 97, 46, 115, 112, 108, 105, 116, 40, 34, 61, 34, 41, 59, 105, 102, 40, 33, 97, 46, 105, 110, 99, 108, 117, 100, 101, 115, 40, 34, 61, 34, 41, 41, 114, 101, 116, 117, 114, 110, 59, 100, 91, 98, 46, 116, 114, 105, 109, 40, 41, 93, 61, 99, 46, 116, 114, 105, 109, 40, 41, 125, 41, 59, 105, 102, 40, 33, 100, 91, 34, 116, 105, 99, 107, 101, 116, 34, 93, 124, 124, 33, 100, 91, 34, 95, 116, 105, 99, 107, 101, 116, 34, 93, 41, 97, 40, 41, 59, 99, 111, 110, 115, 116, 32, 101, 61, 112, 97, 114, 115, 101, 73, 110, 116, 40, 100, 91, 34, 95, 116, 105, 99, 107, 101, 116, 34, 93, 46, 115, 117, 98, 115, 116, 114, 40, 100, 91, 34, 95, 116, 105, 99, 107, 101, 116, 34, 93, 46, 108, 101, 110, 103, 116, 104, 45, 49, 48, 41, 41, 59, 99, 111, 110, 115, 116, 32, 102, 61, 112, 97, 114, 115, 101, 73, 110, 116, 40, 100, 91, 34, 116, 105, 99, 107, 101, 116, 34, 93, 46, 115, 117, 98, 115, 116, 114, 40, 100, 91, 34, 116, 105, 99, 107, 101, 116, 34, 93, 46, 108, 101, 110, 103, 116, 104, 45, 49, 48, 41, 41, 59, 105, 102, 40, 101, 60, 61, 102, 41, 123, 115, 101, 116, 84, 105, 109, 101, 111, 117, 116, 40, 98, 44, 49, 48, 48, 41, 59, 114, 101, 116, 117, 114, 110, 125, 116, 114, 121, 123, 100, 111, 99, 117, 109, 101, 110, 116, 46, 113, 117, 101, 114, 121, 83, 101, 108, 101, 99, 116, 111, 114, 40, 34, 35, 109, 111, 98, 105, 108, 101, 95, 99, 104, 101, 99, 107, 111, 117, 116, 95, 102, 111, 114, 109, 34, 41, 46, 115, 101, 116, 65, 116, 116, 114, 105, 98, 117, 116, 101, 40, 34, 100, 97, 116, 97, 45, 99, 114, 101, 100, 105, 116, 95, 118, 101, 114, 105, 102, 105, 101, 100, 34, 44, 49, 41, 125, 99, 97, 116, 99, 104, 123, 125, 97, 40, 41, 125, 41, 40, 41, 125, 41, 125, 41, 40, 41, 59]);\n\n//# sourceURL=webpack:///./src/main/bot/supreme/pageInject/waitTicket.ts?");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"verifyChromium\", function() { return verifyChromium; });\n/* harmony import */ var _Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator */ \"./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js\");\n/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! electron */ \"electron\");\n/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var fs_extra__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! fs-extra */ \"fs-extra\");\n/* harmony import */ var fs_extra__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(fs_extra__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var puppeteer_extra__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! puppeteer-extra */ \"puppeteer-extra\");\n/* harmony import */ var puppeteer_extra__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(puppeteer_extra__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../config */ \"./src/config.ts\");\n\n\n\n\n\n\nconst verifyChromium =\n/*#__PURE__*/\nfunction () {\n  var _ref = Object(_Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function* (e) {\n    const appData = electron__WEBPACK_IMPORTED_MODULE_1__[\"app\"].getPath('userData');\n    const chromiumPath = path__WEBPACK_IMPORTED_MODULE_2___default.a.resolve(appData, '.local-chromium');\n\n    try {\n      fs_extra__WEBPACK_IMPORTED_MODULE_3___default.a.accessSync(chromiumPath);\n      const fetcher = puppeteer_extra__WEBPACK_IMPORTED_MODULE_4___default.a.createBrowserFetcher({\n        path: chromiumPath\n      });\n      const versions = yield fetcher.localRevisions();\n      if (versions.length < 1) return false;\n      const executablePath = fetcher.revisionInfo(_config__WEBPACK_IMPORTED_MODULE_5__[\"config\"].chromiumVersion).executablePath;\n      const browser = yield puppeteer_extra__WEBPACK_IMPORTED_MODULE_4___default.a.launch({\n        executablePath,\n        headless: true\n      });\n      const page = yield browser.newPage();\n      yield page.goto('http://example.com/');\n      yield browser.close();\n      return {\n        success: true,\n        executablePath,\n        version: electron__WEBPACK_IMPORTED_MODULE_1__[\"app\"].getVersion()\n      };\n    } catch (ex) {\n      console.log('Error while testing browser.');\n      console.log(ex);\n      fs_extra__WEBPACK_IMPORTED_MODULE_3___default.a.removeSync(chromiumPath);\n      return {\n        success: false,\n        executablePath: 'fail',\n        version: electron__WEBPACK_IMPORTED_MODULE_1__[\"app\"].getVersion()\n      };\n    }\n  });\n\n  return function verifyChromium(_x) {\n    return _ref.apply(this, arguments);\n  };\n}();\n\n//# sourceURL=webpack:///./src/main/chromium/verifyChromium.ts?");

/***/ }),

/***/ "./src/main/discordRPC.ts":
/*!********************************!*\
  !*** ./src/main/discordRPC.ts ***!
  \********************************/
/*! exports provided: setDiscordActivity */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setDiscordActivity\", function() { return setDiscordActivity; });\n/* harmony import */ var _Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator */ \"./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js\");\n/* harmony import */ var discord_rpc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! discord-rpc */ \"discord-rpc\");\n/* harmony import */ var discord_rpc__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(discord_rpc__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! electron */ \"electron\");\n/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./main */ \"./src/main/main.ts\");\n\n\n\n\nconst discordRPC = new discord_rpc__WEBPACK_IMPORTED_MODULE_1__[\"Client\"]({\n  transport: 'ipc'\n});\n\nconst setDiscordActivity =\n/*#__PURE__*/\nfunction () {\n  var _ref = Object(_Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function* () {\n    try {\n      yield discordRPC.login({\n        clientId: '696377645285507183'\n      });\n    } catch {\n      return;\n    }\n\n    discordRPC.setActivity({\n      details: `Version: ${_main__WEBPACK_IMPORTED_MODULE_3__[\"isDev\"] ? 'dev' : electron__WEBPACK_IMPORTED_MODULE_2__[\"app\"].getVersion()}`,\n      startTimestamp: Date.now(),\n      largeImageKey: 'logo',\n      instance: true\n    });\n  });\n\n  return function setDiscordActivity() {\n    return _ref.apply(this, arguments);\n  };\n}();\n\n\n\n//# sourceURL=webpack:///./src/main/discordRPC.ts?");

/***/ }),

/***/ "./src/main/main.ts":
/*!**************************!*\
  !*** ./src/main/main.ts ***!
  \**************************/
/*! exports provided: isDev, mainWindow */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isDev\", function() { return isDev; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"mainWindow\", function() { return mainWindow; });\n/* harmony import */ var _Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator */ \"./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js\");\n/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! electron */ \"electron\");\n/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _IPC_IPCMain__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./IPC/IPCMain */ \"./src/main/IPC/IPCMain.ts\");\n/* harmony import */ var _menu__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./menu */ \"./src/main/menu.ts\");\n/* harmony import */ var _discordRPC__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./discordRPC */ \"./src/main/discordRPC.ts\");\n\n\n\n\n\n\nconst isDev = \"development\" === 'development';\nlet mainWindow = null;\n\nconst installExtensions =\n/*#__PURE__*/\nfunction () {\n  var _ref = Object(_Users_heljas_Documents_SafeDrop_Dev_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function* () {\n    const installer = __webpack_require__(/*! electron-devtools-installer */ \"electron-devtools-installer\");\n\n    const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];\n    const forceDownload = !!process.env.UPGRADE_EXTENSIONS;\n\n    for (const name of extensions) {\n      try {\n        yield installer.default(installer[name], forceDownload);\n      } catch (e) {\n        console.log(`Error installing ${name} extension: ${e.message}`);\n      }\n    }\n  });\n\n  return function installExtensions() {\n    return _ref.apply(this, arguments);\n  };\n}();\n\nconst createWindow = () => {\n  if (isDev) {\n    installExtensions();\n  }\n\n  const launchOptions = {\n    width: 1200,\n    height: 750,\n    frame: false,\n    show: false,\n    resizable: false,\n    maximizable: false,\n    fullscreenable: false,\n    titleBarStyle: 'hiddenInset',\n    webPreferences: {\n      nodeIntegration: isDev,\n      preload: isDev ? undefined : path__WEBPACK_IMPORTED_MODULE_2___default.a.join(__dirname, 'preload.js'),\n      backgroundThrottling: false\n    }\n  };\n  mainWindow = new electron__WEBPACK_IMPORTED_MODULE_1__[\"BrowserWindow\"](launchOptions);\n  const url = isDev ? 'http://localhost:3000' : `file://${path__WEBPACK_IMPORTED_MODULE_2___default.a.join(__dirname, '../build/index.html')}`;\n  mainWindow.loadURL(url);\n  mainWindow.once('ready-to-show', () => {\n    var _mainWindow;\n\n    Object(_discordRPC__WEBPACK_IMPORTED_MODULE_5__[\"setDiscordActivity\"])();\n    (_mainWindow = mainWindow) === null || _mainWindow === void 0 ? void 0 : _mainWindow.show();\n  });\n  mainWindow.webContents.once('did-finish-load', () => {\n    if (!mainWindow || !isDev) return;\n    mainWindow.webContents.openDevTools(); // * Create context menu to inspect element on right click\n\n    mainWindow.webContents.on('context-menu', (e, props) => {\n      electron__WEBPACK_IMPORTED_MODULE_1__[\"Menu\"].buildFromTemplate([{\n        label: 'Inspect element',\n        click: () => {\n          mainWindow.inspectElement(props.x, props.y);\n        }\n      }]).popup(mainWindow);\n    });\n  });\n  mainWindow.on('closed', () => mainWindow = null);\n};\n\nelectron__WEBPACK_IMPORTED_MODULE_1__[\"app\"].whenReady().then(createWindow);\nif (!isDev) electron__WEBPACK_IMPORTED_MODULE_1__[\"Menu\"].setApplicationMenu(_menu__WEBPACK_IMPORTED_MODULE_4__[\"menu\"]);\nelectron__WEBPACK_IMPORTED_MODULE_1__[\"powerSaveBlocker\"].start('prevent-display-sleep');\nelectron__WEBPACK_IMPORTED_MODULE_1__[\"app\"].on('window-all-closed', () => {\n  if (process.platform !== 'darwin') {\n    electron__WEBPACK_IMPORTED_MODULE_1__[\"app\"].quit();\n  }\n});\nelectron__WEBPACK_IMPORTED_MODULE_1__[\"app\"].on('activate', () => {\n  if (mainWindow === null) {\n    createWindow();\n  }\n});\n_IPC_IPCMain__WEBPACK_IMPORTED_MODULE_3__[\"IPCMain\"].registerListeners();\nif (!isDev) _IPC_IPCMain__WEBPACK_IMPORTED_MODULE_3__[\"IPCMain\"].setupUpdater();\n\n\n//# sourceURL=webpack:///./src/main/main.ts?");

/***/ }),

/***/ "./src/main/menu.ts":
/*!**************************!*\
  !*** ./src/main/menu.ts ***!
  \**************************/
/*! exports provided: menu */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"menu\", function() { return menu; });\n/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ \"electron\");\n/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);\n\nconst menu = electron__WEBPACK_IMPORTED_MODULE_0__[\"Menu\"].buildFromTemplate([{\n  label: 'Application',\n  submenu: [{\n    label: 'About Application',\n    role: 'about'\n  }, {\n    type: 'separator'\n  }, {\n    label: 'Quit',\n    accelerator: 'Command+Q',\n    click: () => electron__WEBPACK_IMPORTED_MODULE_0__[\"app\"].quit()\n  }]\n}, {\n  label: 'Edit',\n  submenu: [{\n    label: 'Undo',\n    accelerator: 'CmdOrCtrl+Z',\n    role: 'undo'\n  }, {\n    label: 'Redo',\n    accelerator: 'Shift+CmdOrCtrl+Z',\n    role: 'redo'\n  }, {\n    type: 'separator'\n  }, {\n    label: 'Cut',\n    accelerator: 'CmdOrCtrl+X',\n    role: 'cut'\n  }, {\n    label: 'Copy',\n    accelerator: 'CmdOrCtrl+C',\n    role: 'copy'\n  }, {\n    label: 'Paste',\n    accelerator: 'CmdOrCtrl+V',\n    role: 'paste'\n  }, {\n    label: 'Select All',\n    accelerator: 'CmdOrCtrl+A',\n    role: 'selectAll'\n  }]\n}]);\n\n\n//# sourceURL=webpack:///./src/main/menu.ts?");

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

/***/ "discord-rpc":
/*!******************************!*\
  !*** external "discord-rpc" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"discord-rpc\");\n\n//# sourceURL=webpack:///external_%22discord-rpc%22?");

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

/***/ "electron-updater":
/*!***********************************!*\
  !*** external "electron-updater" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"electron-updater\");\n\n//# sourceURL=webpack:///external_%22electron-updater%22?");

/***/ }),

/***/ "fs-extra":
/*!***************************!*\
  !*** external "fs-extra" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs-extra\");\n\n//# sourceURL=webpack:///external_%22fs-extra%22?");

/***/ }),

/***/ "moment":
/*!*************************!*\
  !*** external "moment" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"moment\");\n\n//# sourceURL=webpack:///external_%22moment%22?");

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