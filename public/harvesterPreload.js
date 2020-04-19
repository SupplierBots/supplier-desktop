const{ipcRenderer:ipc}=require("electron-better-ipc");const{remote}=require("electron");const installer={install(){}};window.chrome={app:{isInstalled:false,InstallState:{DISABLED:"disabled",INSTALLED:"installed",NOT_INSTALLED:"not_installed"},RunningState:{CANNOT_RUN:"cannot_run",READY_TO_RUN:"ready_to_run",RUNNING:"running"}},csi(){},loadTimes(){},webstore:{onInstallStageChanged:{},onDownloadProgress:{},install(a,b,c){installer.install(a,b,c)}},runtime:{OnInstalledReason:{CHROME_UPDATE:"chrome_update",INSTALL:"install",SHARED_MODULE_UPDATE:"shared_module_update",UPDATE:"update"},OnRestartRequiredReason:{APP_UPDATE:"app_update",OS_UPDATE:"os_update",PERIODIC:"periodic"},PlatformArch:{ARM:"arm",MIPS:"mips",MIPS64:"mips64",X86_32:"x86-32",X86_64:"x86-64"},PlatformNaclArch:{ARM:"arm",MIPS:"mips",MIPS64:"mips64",X86_32:"x86-32",X86_64:"x86-64"},PlatformOs:{ANDROID:"android",CROS:"cros",LINUX:"linux",MAC:"mac",OPENBSD:"openbsd",WIN:"win"},RequestUpdateCheckStatus:{NO_UPDATE:"no_update",THROTTLED:"throttled",UPDATE_AVAILABLE:"update_available"},connect:function(){}.bind(function(){}),sendMessage:function(){}.bind(function(){})}};window.console.debug=()=>{return null};try{const a=a=>{const b={get(b,c){if(c==="self"){return this}if(c==="frameElement"){return a}return Reflect.get(b,c)}};if(!a.contentWindow){const c=new Proxy(window,b);Object.defineProperty(a,"contentWindow",{get(){return c},set(a){return a},enumerable:true,configurable:false})}};const b=(b,c,d)=>{const e=b.apply(c,d);const f=e;const g=f.srcdoc;Object.defineProperty(e,"srcdoc",{configurable:true,get:function(){return f.srcdoc},set:function(b){a(this);Object.defineProperty(e,"srcdoc",{configurable:false,writable:false,value:g});f.srcdoc=b}});return e};const c=()=>{const a={get(a,b){return Reflect.get(a,b)},apply:function(a,c,d){const e=d&&d.length&&`${d[0]}`.toLowerCase()==="iframe";if(!e){return a.apply(c,d)}else{return b(a,c,d)}}};document.createElement=new Proxy(document.createElement,a)};c()}catch(a){}try{const a=a=>{const[b,c]=a.trim().split(";");let d=[];if(c&&c.includes("codecs=\"")){d=c.trim().replace(`codecs="`,"").replace(`"`,"").trim().split(",").filter(a=>!!a).map(a=>a.trim())}return{mime:b,codecStr:c,codecs:d}};const b={get(a,b){if(typeof a[b]==="function"){return a[b].bind(a)}return Reflect.get(a,b)},apply:function(b,c,d){if(!d||!d.length){return b.apply(c,d)}const{mime:e,codecs:f}=a(d[0]);if(e==="video/mp4"){if(f.includes("avc1.42E01E")){return"probably"}}if(e==="audio/x-m4a"&&!f.length){return"maybe"}if(e==="audio/aac"&&!f.length){return"probably"}return b.apply(c,d)}};HTMLMediaElement.prototype.canPlayType=new Proxy(HTMLMediaElement.prototype.canPlayType,b)}catch(a){}Object.defineProperty(navigator,"languages",{get:()=>["en-US","en"]});const originalQuery=window.navigator.permissions.query;window.navigator.permissions.__proto__.query=a=>a.name==="notifications"?Promise.resolve({state:Notification.permission}):originalQuery(a);const oldCall=Function.prototype.call;function call(){return oldCall.apply(this,arguments)}Function.prototype.call=call;const nativeToStringFunctionString=Error.toString().replace(/Error/g,"toString");const oldToString=Function.prototype.toString;function functionToString(){if(this===window.navigator.permissions.query){return"function query() { [native code] }"}if(this===functionToString){return nativeToStringFunctionString}return oldCall.call(oldToString,this)}Function.prototype.toString=functionToString;function mockPluginsAndMimeTypes(){const c=(a=[])=>{const d=Function.prototype.call;function b(){return d.apply(this,arguments)}Function.prototype.call=b;const e=Error.toString().replace(/Error/g,"toString");const f=Function.prototype.toString;function c(){for(const b of a){if(this===b.ref){return`function ${b.name}() { [native code] }`}}if(this===c){return e}return d.call(f,this)}Function.prototype.toString=c};const d=[];const e={mimeTypes:[{type:"application/pdf",suffixes:"pdf",description:"",__pluginName:"Chrome PDF Viewer"},{type:"application/x-google-chrome-pdf",suffixes:"pdf",description:"Portable Document Format",__pluginName:"Chrome PDF Plugin"},{type:"application/x-nacl",suffixes:"",description:"Native Client Executable",enabledPlugin:Plugin,__pluginName:"Native Client"},{type:"application/x-pnacl",suffixes:"",description:"Portable Native Client Executable",__pluginName:"Native Client"}],plugins:[{name:"Chrome PDF Plugin",filename:"internal-pdf-viewer",description:"Portable Document Format"},{name:"Chrome PDF Viewer",filename:"mhjfbmdgcfjbbpaeojofohoefgiehjai",description:""},{name:"Native Client",filename:"internal-nacl-plugin",description:""}],fns:{namedItem:a=>{const b=function(b){if(!arguments.length){throw new TypeError(`Failed to execute 'namedItem' on '${a}': 1 argument required, but only 0 present.`)}return this[b]||null};d.push({ref:b,name:"namedItem"});return b},item:a=>{const b=function(b){if(!arguments.length){throw new TypeError(`Failed to execute 'namedItem' on '${a}': 1 argument required, but only 0 present.`)}return this[b]||null};d.push({ref:b,name:"item"});return b},refresh:a=>{const b=function(){return undefined};d.push({ref:b,name:"refresh"});return b}}};const f=(a,b)=>a.reduce((d,a)=>({...d,[a]:b[a]}),{});function a(){const a=e.mimeTypes.map(a=>f(["type","suffixes","description"],a)).map(a=>Object.setPrototypeOf(a,MimeType.prototype));a.forEach(b=>{a[b.type]=b});a.namedItem=e.fns.namedItem("MimeTypeArray");a.item=e.fns.item("MimeTypeArray");return Object.setPrototypeOf(a,MimeTypeArray.prototype)}const g=a();Object.defineProperty(navigator,"mimeTypes",{get:()=>g});function b(){const a=e.plugins.map(a=>f(["name","filename","description"],a)).map(a=>{const b=e.mimeTypes.filter(b=>b.__pluginName===a.name);b.forEach((b,c)=>{navigator.mimeTypes[b.type].enabledPlugin=a;a[b.type]=navigator.mimeTypes[b.type];a[c]=navigator.mimeTypes[b.type]});a.length=b.length;return a}).map(a=>{a.namedItem=e.fns.namedItem("Plugin");a.item=e.fns.item("Plugin");return a}).map(a=>Object.setPrototypeOf(a,Plugin.prototype));a.forEach(b=>{a[b.name]=b});a.namedItem=e.fns.namedItem("PluginArray");a.item=e.fns.item("PluginArray");a.refresh=e.fns.refresh("PluginArray");return Object.setPrototypeOf(a,PluginArray.prototype)}const h=b();Object.defineProperty(navigator,"plugins",{get:()=>h});c(d)}try{const a=navigator.plugins instanceof PluginArray;const b=a&&navigator.plugins.length>0;if(!a||!b){mockPluginsAndMimeTypes()}}catch(a){}Object.defineProperty(navigator,"vendor",{get:()=>"Google Inc."});Object.defineProperty(window,"navigator",{value:new Proxy(navigator,{has:(a,b)=>b==="webdriver"?false:b in a,get:(a,b)=>b==="webdriver"?undefined:typeof a[b]==="function"?a[b].bind(a):a[b]})});Object.defineProperty(navigator,"userAgent",{get:()=>"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36"});Object.defineProperty(navigator,"appVersion",{get:()=>"5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36"});try{var stripErrorStack=a=>a.split("\n").filter(a=>!a.includes(`at Object.apply`)).filter(a=>!a.includes(`at Object.get`)).join("\n");const a={get(a,b){try{if(typeof a[b]==="function"){return a[b].bind(a)}return Reflect.get(a,b)}catch(a){a.stack=stripErrorStack(a.stack);throw a}},apply:function(a,b,c){const d=(c||[])[0];if(d===37445){return"Intel Inc."}if(d===37446){return"Intel Iris OpenGL Engine"}try{return Reflect.apply(a,b,c)}catch(a){a.stack=stripErrorStack(a.stack);throw a}}};const b=new Proxy(WebGLRenderingContext.prototype.getParameter,a);Object.defineProperty(WebGLRenderingContext.prototype,"getParameter",{configurable:true,enumerable:false,writable:false,value:b})}catch(a){console.warn(a)}ipc.answerMain("solve-captcha",async()=>{const a=await window.solveCaptcha();return a});ipc.on("set-email",(a,b)=>{window.setEmail(b)});window.closeHarvester=()=>{const a=remote.getCurrentWindow();a.close()};window.isWindows=()=>{return process.platform==="win32"};ipc.answerMain("get-email",async()=>{return window.getEmail()});window.getEmail=()=>{const a=document.evaluate("//div[contains(text(),'@gmail.com')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(!a)return"Unknown email";return a.textContent};