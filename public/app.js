!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=11)}([function(e,t){e.exports=require("ramda")},function(e,t){e.exports=require("electron")},function(e,t){e.exports=require("path")},function(e,t){e.exports=require("puppeteer-extra")},function(e,t){e.exports=require("electron-better-ipc")},function(e,t){e.exports=require("fs-extra")},function(e,t){e.exports=require("puppeteer/DeviceDescriptors")},function(e,t){e.exports=require("puppeteer-extra-plugin-stealth")},function(e,t){e.exports=require("cheerio")},function(e,t){e.exports=require("request-promise-native")},function(e,t){e.exports=require("electron-devtools-installer")},function(e,t,n){"use strict";function r(e,t,n,r,o,i,s){try{var a=e[i](s),c=a.value}catch(e){return void n(e)}a.done?t(c):Promise.resolve(c).then(r,o)}function o(e){return function(){var t=this,n=arguments;return new Promise((function(o,i){var s=e.apply(t,n);function a(e){r(s,o,i,a,c,"next",e)}function c(e){r(s,o,i,a,c,"throw",e)}a(void 0)}))}}n.r(t);var i=n(1),s=n(2),a=n.n(s),c=n(4),l=n(5),u=n.n(l),d=n(3),p=n.n(d);const f="662092",h=function(){var e=o((function*(e){const t=i.app.getPath("userData"),n=a.a.resolve(t,".local-chromium");try{u.a.accessSync(n);const e=p.a.createBrowserFetcher({path:n});if((yield e.localRevisions()).length<1)return!1;const t=e.revisionInfo(f).executablePath,r=yield p.a.launch({executablePath:t,headless:!0}),o=yield r.newPage();return yield o.goto("http://example.com/"),yield r.close(),{success:!0,executablePath:t}}catch(e){return console.log("Error while testing browser."),console.log(e),u.a.removeSync(n),{success:!1,executablePath:"fail"}}}));return function(t){return e.apply(this,arguments)}}(),g=e=>{const t=a.a.resolve(i.app.getPath("userData"),".local-chromium"),n=p.a.createBrowserFetcher({path:t});let r=0;n.download(f,function(){var e=o((function*(e,t){const n={progress:Math.round(e/t*100),done:e===t};(n.progress>r||n.done)&&(r=n.progress,null==$||$.webContents.send("CHROMIUM_DOWNLOAD_PROGRESS",n))}));return function(t,n){return e.apply(this,arguments)}}())};var v=n(6),y=n.n(v),m=n(7),w=n.n(m);var b=function(){var e=o((function*(e,t=0){null==$||$.webContents.send("BROWSER_STATE_CHANGE",{id:e,status:!0});const n=i.app.getPath("userData"),r=p.a.createBrowserFetcher({path:a.a.resolve(n,".local-chromium")}).revisionInfo("662092").executablePath,s=a.a.resolve(n,e),{width:c,height:l,deviceScaleFactor:u}=y.a["Pixel 2"].viewport;p.a.use(w()());const d=yield p.a.launch({headless:!1,devtools:!1,ignoreHTTPSErrors:!0,ignoreDefaultArgs:["--enable-automation"],args:["--disable-infobars","--no-first-run","--enable-features=NetworkService",`--user-data-dir=${s}`,`--window-size=${c},${l+82}`,`--window-position=${0+500*t},0`],executablePath:r}),f=yield d.newPage(),h=yield f.target().createCDPSession();return h.send("Network.setUserAgentOverride",{userAgent:"Mozilla/5.0 (Linux; Android 8.0; Pixel 2 Build/OPD3.170816.012) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3803.0 Mobile Safari/537.36",locale:"en-US,en",platform:"linux"}),yield Promise.all([h.send("Emulation.setDeviceMetricsOverride",{mobile:!0,width:c,height:l,deviceScaleFactor:u,screenOrientation:{angle:0,type:"portraitPrimary"}}),h.send("Emulation.setTouchEmulationEnabled",{enabled:!0}),h.send("Emulation.setEmitTouchEventsForMouse",{enabled:!0,configuration:"desktop"})]),f.on("close",o((function*(){yield d.close()}))),d.on("disconnected",o((function*(){null==$||$.webContents.send("BROWSER_STATE_CHANGE",{id:e,status:!1})}))),d}));return function(t){return e.apply(this,arguments)}}();const P=function(){var e=o((function*(e,t){const n=e.browser();e?(yield e.goto("https://accounts.google.com/signin/v2/identifier?flowName=GlifWebSignIn&flowEntry=ServiceLogin&hl=en"),e.on("load",o((function*(){if(!$)return;if(!e.url().includes("https://myaccount.google.com/"))return;yield e.waitForXPath("//div[contains(text(),'@gmail.com')]");const r=yield e.$x("//div[contains(text(),'@gmail.com')]");if(r.length<1)return;const[o]=r,i=yield o.getProperty("innerText");let s=yield i.jsonValue();const a=yield c.ipcMain.callRenderer($,"GET_SAME_EMAILS",s);a.length>0&&(s+=` (${a.length+1})`),c.ipcMain.sendToRenderers("SET_BROWSER_EMAIL",{id:t,email:s}),n.close()})))):n.close()}));return function(t,n){return e.apply(this,arguments)}}();var x=n(0),S=n(8),E=n.n(S),_=n(9),O=n.n(_);const M={accept:"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9","accept-encoding":"gzip, deflate, br","accept-language":"en-GB,en-US;q=0.9,en;q=0.8","sec-fetch-mode":"navigate","sec-fetch-site":"none","upgrade-insecure-requests":"1","user-agent":"Mozilla/5.0 (Linux; Android 8.0; Pixel 2 Build/OPD3.170816.012) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3803.0 Mobile Safari/537.36"},T=function(){var e=o((function*(e,t=!1){try{const n=yield O.a.get(e,{headers:M,timeout:3e3,encoding:"utf-8",gzip:!0});return t?JSON.parse(n):n}catch(t){return console.log(t),T(e)}}));return function(t){return e.apply(this,arguments)}}();var U=T;const C=(e,t=0)=>{let n,r=null,o=!1;const i=()=>{o=!1,n=Date.now()},s=(s=!1,a=!1)=>((null===r||!o&&a||!o&&s&&(isNaN(n)||Date.now()-n>t))&&(o=!0,r=e(),r.then(i).catch(i)),r);return{get:()=>s(!1),refresh:()=>s(!0),forceRefresh:()=>s(!1,!0)}};var R=class{constructor(e){var t=this;this.url=e,this.variantsFetcher=C(o((function*(){return(yield U(t.url,!0)).variants.filter(e=>e.available).map(e=>({id:e.id,name:e.public_title.toLowerCase()}))})))}};const q=(e,t)=>{if(e=e.toLowerCase(),!x.all(x.includes(x.__,e))(t.positive))return!1;if(x.any(x.includes(x.__,e))(t.negative))return!1;if(!t.multi)return!0;for(const n of t.multi){const t=n.split(" | ");if(x.none(x.includes(x.__,e))(t))return!1}return!0};let A;!function(e){e[e.Us=0]="Us",e[e.Eu=1]="Eu"}(A||(A={}));var D=class{get websiteUrl(){return`https://shop${this.region===A.Eu?"":"-usa"}.palaceskateboards.com/`}constructor(e){var t=this;this.region=e,this.products=[],this.productsPerPage=30,this.frontpageStatusUrl=`${this.websiteUrl}collections/frontpage.json`,this.productsStatusUrl=`${this.websiteUrl}collections/new.json`,this.frontpageUrl=`${this.websiteUrl}collections/frontpage?page=`,this.productsUrl=`${this.websiteUrl}collections/new?page=`,this.fetchPromise=null,this.fetchProducts=C(o((function*(){const e=yield t.getProductsAmount(),n=Math.ceil(e/t.productsPerPage);t.products=[];const r=[];for(let e=1;e<n+1;e++)r.push(t.requestPage(e,!0));return t.fetchPromise=Promise.all(r),yield t.fetchPromise,t.products}))),this.getProductsAmount=o((function*(){const e=(yield U(t.productsStatusUrl,!0)).collection.products_count;return e>0?e:(yield U(t.frontpageStatusUrl,!0)).collection.products_count})),this.requestPage=function(){var e=o((function*(e,n=!1){const r=(n?t.frontpageUrl:t.productsUrl)+e,o=yield U(r),i=E.a.load(o),s=i(".product-grid-item");t.parseProductsHtml(i,s)}));return function(t){return e.apply(this,arguments)}}(),this.getProductFetcher=function(){var e=o((function*({keywords:e,colors:n,anyColor:r}){yield t.fetchProducts.get();const o=t.products.find(t=>q(t.name,e)&&(q(t.name,n)||r));return o?(o.fetcher||(o.fetcher=new R(o.url)),o.fetcher.variantsFetcher):null}));return function(t){return e.apply(this,arguments)}}(),this.parseProductsHtml=(e,t)=>{t.each((t,n)=>{const r=n.attribs["data-alpha"],o=`${this.websiteUrl+e(n).find(".product-link").attr("href")}.js`;this.products.push({name:r,url:o})})}}};const k=function(){var e=o((function*(e,t,n){console.log(n);try{return{success:!0,response:yield null==e?void 0:e.evaluate(`(async() => {\n      const response = await fetch(window.location.origin + "${t}", {\n        method: 'POST',\n        body: JSON.stringify(${JSON.stringify(n)}),\n        headers: {\n          'Content-Type': 'application/json',\n        },\n      });\n      return await response.json();\n    })()`)}}catch(e){return{success:!1,response:null}}}));return function(t,n,r){return e.apply(this,arguments)}}(),I=function(){var e=o((function*(e,t,n){const r=yield e.pages(),i=x.last(r);if(!i)return;const s=yield i.cookies("https://shop.palaceskateboards.com/");function a(){return(a=o((function*(){if(!i)return;let e=[];for(const n of t.products)e.push(c(n));const n=yield Promise.all(e),r={updates:{}};n.filter(e=>-1!==e).forEach(e=>r.updates[e.toString()]=1),(yield k(i,"/cart/update.js",r)).success&&(yield i.reload()),setTimeout(o((function*(){const e=yield i.$(".checkbox-msg");e&&(yield e.tap())})),3e3)}))).apply(this,arguments)}function c(e){return l.apply(this,arguments)}function l(){return(l=o((function*(e){const t=yield n.eu.getProductFetcher(e),r=yield null==t?void 0:t.get(),o=null==r?void 0:r.find(t=>{var n;return t.name===(null===(n=e.size)||void 0===n?void 0:n.value.toLowerCase())});return o?o.id:-1}))).apply(this,arguments)}yield i.deleteCookie(...s),yield i.goto("https://shop.palaceskateboards.com/cart"),function(){a.apply(this,arguments)}()}));return function(t,n,r){return e.apply(this,arguments)}}();class L{constructor(){this.browsers=[]}static getInstance(){var e;return this.instance=null!==(e=this.instance)&&void 0!==e?e:new L,this.instance}setup(e){var t=this;return o((function*(){try{const n=yield b(e.id);t.browsers.push(n);const r=yield n.pages(),o=x.last(r);if(!o)return void n.close();P(o,e.id)}catch{null==$||$.webContents.send("BROWSER_STATE_CHANGE",{id:e.id,status:!1})}}))()}startTasks(e){var t=this;return o((function*(){const n={eu:new D(A.Eu),us:new D(A.Us)};e.forEach(function(){var e=o((function*(e,r){var o,i;if(!e.browser)return;const s=yield b(null===(o=e.browser)||void 0===o?void 0:o.value,r);t.browsers.push(s),"palace"===(null===(i=e.site)||void 0===i?void 0:i.value)&&I(s,e,n)}));return function(t,n){return e.apply(this,arguments)}}())}))()}stopAll(){var e=this;return o((function*(){const t=[];e.browsers.forEach(e=>{e.isConnected()&&t.push(e.close())}),e.browsers=[],yield Promise.all(t)}))()}}L.instance=void 0;var N=L;class W{constructor(){}}W.registerListeners=()=>{c.ipcMain.answerRenderer("VERIFY_CHROME",h),c.ipcMain.on("DOWNLOAD_CHROMIUM",g),c.ipcMain.on("SETUP_BROWSER",(e,t)=>N.getInstance().setup(t)),c.ipcMain.on("WINDOW_MINIMIZE",()=>null==$?void 0:$.minimize()),c.ipcMain.on("WINDOW_CLOSE",()=>null==$?void 0:$.close())},n.d(t,"mainWindow",(function(){return $}));let $=null;const j=()=>{$=new i.BrowserWindow({width:1200,height:750,frame:!1,show:!1,resizable:!1,maximizable:!1,fullscreenable:!1,titleBarStyle:"hiddenInset",webPreferences:{nodeIntegration:!0,backgroundThrottling:!1}});const e=`file://${a.a.join(__dirname,"../build/index.html")}`;$.loadURL(e),$.webContents.once("did-finish-load",()=>{$&&$.show()}),$.on("closed",()=>$=null)};i.app.on("ready",j),i.app.on("window-all-closed",()=>{"darwin"!==process.platform&&i.app.quit()}),i.app.on("activate",()=>{null===$&&j()}),W.registerListeners()}]);