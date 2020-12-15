window.chrome = undefined;

Object.defineProperty(navigator, 'vendor', {
  get: () => 'Apple Computer, Inc.',
});

Object.defineProperty(navigator, 'platform', {
  get: () => 'iPhone',
});

Object.defineProperty(navigator, 'maxTouchPoints', {
  get: () => 5,
});

Object.defineProperty(navigator, 'deviceMemory', {
  get: () => undefined,
});
Object.defineProperty(navigator, 'hardwareConcurrency', {
  get: () => undefined,
});
Object.defineProperty(navigator, 'permissions', {
  get: () => undefined,
});
Object.defineProperty(navigator, 'connection', {
  get: () => undefined,
});
Object.defineProperty(navigator, 'doNotTrack', {
  get: () => undefined,
});

//Hairline feature patch
const elementDescriptor = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetHeight');
Object.defineProperty(HTMLDivElement.prototype, 'offsetHeight', {
  ...elementDescriptor,
  get: function() {
    if (this.id === 'modernizr') {
      return 1;
    }
    return elementDescriptor.get.apply(this);
  },
});

const getParameter = WebGLRenderingContext.prototype.getParameter;
WebGLRenderingContext.prototype.getParameter = function(parameter) {
  //UNMASKED_VENDOR_WEBGL
  if (parameter === 0x9245) {
    return 'Apple Inc.';
  }
  //UNMASKED_RENDERER_WEBGL
  if (parameter === 0x9246) {
    return 'Apple GPU';
  }
  //GL VERSION
  if (parameter === 0x1f02) {
    return 'WebGL 1.0';
  }
  //SHADING LANGUAGE VERSION
  if (parameter === 0x8b8c) {
    return 'WebGL GLSL ES 1.0 (1.0)';
  }
  return getParameter.call(this, parameter);
};
WebGLRenderingContext.prototype.getParameter.toString = function toString() {
  return 'function getParameter() { [native code] }';
};

WebGL2RenderingContext = undefined;

const getContext = HTMLCanvasElement.prototype.getContext;
HTMLCanvasElement.prototype.getContext = function(parameter) {
  if (parameter === 'webgl2') {
    return null;
  }
  return getContext.call(this, parameter);
};
HTMLCanvasElement.prototype.getContext.toString = function toString() {
  return 'function getContext() { [native code] }';
};

try {
  const addContentWindowProxy = iframe => {
    const contentWindowProxy = {
      get(target, key) {
        if (key === 'self') {
          return this;
        }
        if (key === 'frameElement') {
          return iframe;
        }
        return Reflect.get(target, key);
      },
    };

    if (!iframe.contentWindow) {
      const proxy = new Proxy(window, contentWindowProxy);
      Object.defineProperty(iframe, 'contentWindow', {
        get() {
          return proxy;
        },
        set(newValue) {
          return newValue; // contentWindow is immutable
        },
        enumerable: true,
        configurable: false,
      });
    }
  };

  const handleIframeCreation = (target, thisArg, args) => {
    const iframe = target.apply(thisArg, args);
    const _iframe = iframe;
    const _srcdoc = _iframe.srcdoc;
    Object.defineProperty(iframe, 'srcdoc', {
      configurable: true,
      get: function() {
        return _iframe.srcdoc;
      },
      set: function(newValue) {
        addContentWindowProxy(this);
        Object.defineProperty(iframe, 'srcdoc', {
          configurable: false,
          writable: false,
          value: _srcdoc,
        });
        _iframe.srcdoc = newValue;
      },
    });
    return iframe;
  };

  const addIframeCreationSniffer = () => {
    const createElement = {
      get(target, key) {
        return Reflect.get(target, key);
      },
      apply: function(target, thisArg, args) {
        const isIframe = args && args.length && args[0].toLowerCase() === 'iframe';
        if (!isIframe) {
          return target.apply(thisArg, args);
        } else {
          return handleIframeCreation(target, thisArg, args);
        }
      },
    };
    document.createElement = new Proxy(document.createElement, createElement);
  };

  addIframeCreationSniffer();
} catch (err) {}

function MediaKeySystemAccess(system) {
  this.keySystem = system;
}

navigator.requestMediaKeySystemAccess = function requestMediaKeySystemAccess(
  keysystem,
  supportedConfigurations,
) {
  return new Promise((r, e) => {
    r(new MediaKeySystemAccess(keysystem));
  });
};

navigator.requestMediaKeySystemAccess.toString = function toString() {
  return 'function requestMediaKeySystemAccess() { [native code] }';
};
