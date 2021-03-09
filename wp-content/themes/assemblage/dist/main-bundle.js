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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/babel-regenerator-runtime/runtime.js":
/*!***********************************************************!*\
  !*** ./node_modules/babel-regenerator-runtime/runtime.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */
!function (global) {
  "use strict";

  var hasOwn = Object.prototype.hasOwnProperty;
  var undefined; // More compressible than void 0.

  var iteratorSymbol = typeof Symbol === "function" && Symbol.iterator || "@@iterator";
  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;

  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    } // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.


    return;
  } // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.


  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided, then outerFn.prototype instanceof Generator.
    var generator = Object.create((outerFn || Generator).prototype);
    var context = new Context(tryLocsList || []); // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.

    generator._invoke = makeInvokeMethod(innerFn, self, context);
    return generator;
  }

  runtime.wrap = wrap; // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.

  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed"; // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.

  var ContinueSentinel = {}; // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.

  function Generator() {}

  function GeneratorFunction() {}

  function GeneratorFunctionPrototype() {}

  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype;
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = "GeneratorFunction"; // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.

  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      prototype[method] = function (arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function (genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
    // do is to check its .name property.
    (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
  };

  runtime.mark = function (genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
    }

    genFun.prototype = Object.create(Gp);
    return genFun;
  }; // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `value instanceof AwaitArgument` to determine if the yielded value is
  // meant to be awaited. Some may consider the name of this method too
  // cutesy, but they are curmudgeons.


  runtime.awrap = function (arg) {
    return new AwaitArgument(arg);
  };

  function AwaitArgument(arg) {
    this.arg = arg;
  }

  function AsyncIterator(generator) {
    // This invoke function is written in a style that assumes some
    // calling function (or Promise) will handle exceptions.
    function invoke(method, arg) {
      var result = generator[method](arg);
      var value = result.value;
      return value instanceof AwaitArgument ? Promise.resolve(value.arg).then(invokeNext, invokeThrow) : Promise.resolve(value).then(function (unwrapped) {
        // When a yielded Promise is resolved, its final value becomes
        // the .value of the Promise<{value,done}> result for the
        // current iteration. If the Promise is rejected, however, the
        // result for this iteration will be rejected with the same
        // reason. Note that rejections of yielded Promises are not
        // thrown back into the generator function, as is the case
        // when an awaited Promise is rejected. This difference in
        // behavior between yield and await is important, because it
        // allows the consumer to decide what to do with the yielded
        // rejection (swallow it and continue, manually .throw it back
        // into the generator, abandon iteration, whatever). With
        // await, by contrast, there is no opportunity to examine the
        // rejection reason outside the generator function, so the
        // only option is to throw it from the await expression, and
        // let the generator function handle the exception.
        result.value = unwrapped;
        return result;
      });
    }

    if (typeof process === "object" && process.domain) {
      invoke = process.domain.bind(invoke);
    }

    var invokeNext = invoke.bind(generator, "next");
    var invokeThrow = invoke.bind(generator, "throw");
    var invokeReturn = invoke.bind(generator, "return");
    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return invoke(method, arg);
      }

      return previousPromise = // If enqueue has been called before, then we want to wait until
      // all previous Promises have been resolved before calling invoke,
      // so that results are always delivered in the correct order. If
      // enqueue has not been called before, then it is important to
      // call invoke immediately, without waiting on a callback to fire,
      // so that the async generator function has the opportunity to do
      // any necessary setup in a predictable way. This predictability
      // is why the Promise constructor synchronously invokes its
      // executor callback, and why async functions synchronously
      // execute code before the first await. Since we implement simple
      // async functions in terms of async generators, it is especially
      // important to get this right, even though it requires care.
      previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, // Avoid propagating failures to Promises returned by later
      // invocations of the iterator.
      callInvokeWithMethodAndArg) : new Promise(function (resolve) {
        resolve(callInvokeWithMethodAndArg());
      });
    } // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).


    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype); // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.

  runtime.async = function (innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList));
    return runtime.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
    : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;
    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        } // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume


        return doneResult();
      }

      while (true) {
        var delegate = context.delegate;

        if (delegate) {
          if (method === "return" || method === "throw" && delegate.iterator[method] === undefined) {
            // A return or throw (when the delegate iterator has no throw
            // method) always terminates the yield* loop.
            context.delegate = null; // If the delegate iterator has a return method, give it a
            // chance to clean up.

            var returnMethod = delegate.iterator["return"];

            if (returnMethod) {
              var record = tryCatch(returnMethod, delegate.iterator, arg);

              if (record.type === "throw") {
                // If the return method threw an exception, let that
                // exception prevail over the original return or throw.
                method = "throw";
                arg = record.arg;
                continue;
              }
            }

            if (method === "return") {
              // Continue with the outer return, now that the delegate
              // iterator has been terminated.
              continue;
            }
          }

          var record = tryCatch(delegate.iterator[method], delegate.iterator, arg);

          if (record.type === "throw") {
            context.delegate = null; // Like returning generator.throw(uncaught), but without the
            // overhead of an extra function call.

            method = "throw";
            arg = record.arg;
            continue;
          } // Delegate generator ran and handled its own exceptions so
          // regardless of what the method was, we continue as if it is
          // "next" with an undefined arg.


          method = "next";
          arg = undefined;
          var info = record.arg;

          if (info.done) {
            context[delegate.resultName] = info.value;
            context.next = delegate.nextLoc;
          } else {
            state = GenStateSuspendedYield;
            return info;
          }

          context.delegate = null;
        }

        if (method === "next") {
          context._sent = arg;

          if (state === GenStateSuspendedYield) {
            context.sent = arg;
          } else {
            context.sent = undefined;
          }
        } else if (method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw arg;
          }

          if (context.dispatchException(arg)) {
            // If the dispatched exception was caught by a catch block,
            // then let that catch block handle the exception normally.
            method = "next";
            arg = undefined;
          }
        } else if (method === "return") {
          context.abrupt("return", arg);
        }

        state = GenStateExecuting;
        var record = tryCatch(innerFn, self, context);

        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done ? GenStateCompleted : GenStateSuspendedYield;
          var info = {
            value: record.arg,
            done: context.done
          };

          if (record.arg === ContinueSentinel) {
            if (context.delegate && method === "next") {
              // Deliberately forget the last sent value so that we don't
              // accidentally pass it on to the delegate.
              arg = undefined;
            }
          } else {
            return info;
          }
        } else if (record.type === "throw") {
          state = GenStateCompleted; // Dispatch the exception by looping back around to the
          // context.dispatchException(arg) call above.

          method = "throw";
          arg = record.arg;
        }
      }
    };
  } // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.


  defineIteratorMethods(Gp);

  Gp[iteratorSymbol] = function () {
    return this;
  };

  Gp.toString = function () {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{
      tryLoc: "root"
    }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function (object) {
    var keys = [];

    for (var key in object) {
      keys.push(key);
    }

    keys.reverse(); // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.

    return function next() {
      while (keys.length) {
        var key = keys.pop();

        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      } // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.


      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];

      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1,
            next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;
          return next;
        };

        return next.next = next;
      }
    } // Return an iterator with no values.


    return {
      next: doneResult
    };
  }

  runtime.values = values;

  function doneResult() {
    return {
      value: undefined,
      done: true
    };
  }

  Context.prototype = {
    constructor: Context,
    reset: function (skipTempReset) {
      this.prev = 0;
      this.next = 0;
      this.sent = undefined;
      this.done = false;
      this.delegate = null;
      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },
    stop: function () {
      this.done = true;
      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;

      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },
    dispatchException: function (exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;

      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;
        return !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }
          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },
    abrupt: function (type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.next = finallyEntry.finallyLoc;
      } else {
        this.complete(record);
      }

      return ContinueSentinel;
    },
    complete: function (record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" || record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = record.arg;
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }
    },
    finish: function (finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },
    "catch": function (tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;

          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }

          return thrown;
        }
      } // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.


      throw new Error("illegal catch attempt");
    },
    delegateYield: function (iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };
      return ContinueSentinel;
    }
  };
}( // Among the various tricks for obtaining a reference to the global
// object, this seems to be the most reliable technique that does not
// use indirect eval (which violates Content Security Policy).
typeof global === "object" ? global : typeof window === "object" ? window : typeof self === "object" ? self : this);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/gia/BaseComponent.js":
/*!*******************************************!*\
  !*** ./node_modules/gia/BaseComponent.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var _utils = __webpack_require__(/*! ./utils */ "./node_modules/gia/utils.js");

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
/**
 * Component without code splitting support
 */


var Component = function () {
  function Component(element, options) {
    _classCallCheck(this, Component);

    this.element = element;
    this.element['__gia_component__'] = this;
    this._ref = {};
    this._options = options || {};
    this._state = {};
  }

  _createClass(Component, [{
    key: '_load',
    value: function _load() {
      this.mount();
    }
  }, {
    key: 'mount',
    value: function mount() {
      console.warn('Component ' + this._name + ' does not have "mount" method.');
    }
  }, {
    key: 'unmount',
    value: function unmount() {// this is here only to be rewritten
    }
  }, {
    key: 'getRef',
    value: function getRef(ref) {
      var prefixed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      return '[g-ref="' + (prefixed ? this._name + ':' : '') + ref + '"]';
    }
  }, {
    key: 'setState',
    value: function setState(changes) {
      var _this = this;

      var stateChanges = {};
      Object.keys(changes).forEach(function (key) {
        if (Array.isArray(changes[key])) {
          if (_this._state[key] != null && Array.isArray(_this._state[key])) {
            if (_this._state[key].length === changes[key].length) {
              changes[key].some(function (item, index) {
                if (_this._state[key][index] !== item) {
                  stateChanges[key] = changes[key];
                  _this._state[key] = stateChanges[key];
                  return true;
                }

                return false;
              });
            } else {
              stateChanges[key] = changes[key];
              _this._state[key] = stateChanges[key];
            }
          } else {
            stateChanges[key] = changes[key];
            _this._state[key] = stateChanges[key];
          }
        } else if (_typeof(changes[key]) === 'object') {
          if (_this._state[key] != null && _typeof(_this._state[key]) === 'object') {
            stateChanges[key] = {};
            Object.keys(changes[key]).forEach(function (subkey) {
              if (_this._state[key][subkey] !== changes[key][subkey]) {
                stateChanges[key][subkey] = changes[key][subkey];
              }
            });
          } else {
            stateChanges[key] = changes[key];
          }

          _this._state[key] = _extends({}, _this._state[key], stateChanges[key]);
        } else {
          if (_this._state[key] !== changes[key]) {
            stateChanges[key] = changes[key];
            _this._state[key] = changes[key];
          }
        }
      });
      Object.keys(stateChanges).forEach(function (key) {
        if (Array.isArray(changes[key])) {
          if (stateChanges[key].length === 0) {
            delete stateChanges[key];
          }
        } else if (_typeof(changes[key]) === 'object') {
          if (Object.keys(stateChanges[key]).length === 0) {
            delete stateChanges[key];
          }
        }
      });
      this.stateChange(stateChanges);
    }
  }, {
    key: 'stateChange',
    value: function stateChange(stateChanges) {// this is here only to be rewritten
    }
  }, {
    key: 'ref',
    get: function get() {
      return this._ref;
    },
    set: function set(items) {
      var _this2 = this;

      var allRefs = (0, _utils.queryAll)('[g-ref]', this.element);

      if (Object.keys(items).length === 0) {
        allRefs.forEach(function (element) {
          var refName = element.getAttribute('g-ref');

          if (refName.indexOf(':') !== -1) {
            var refNameArray = refName.split(':');

            if (refNameArray[0] == _this2._name) {
              if (!_this2._ref[refNameArray[1]]) {
                _this2._ref[refNameArray[1]] = allRefs.filter(function (item) {
                  return item.getAttribute('g-ref') === refName;
                });
              }
            } else {
              return;
            }
          } else {
            if (!_this2._ref[refName]) {
              _this2._ref[refName] = allRefs.filter(function (item) {
                return item.getAttribute('g-ref') === refName;
              });
            }
          }
        });
      } else {
        this._ref = Object.keys(items).map(function (key) {
          var isArray = Array.isArray(items[key]); // non-empty refs

          if (items[key] !== null && isArray && items[key].length > 0) {
            return {
              name: key,
              value: items[key]
            };
          }

          var name = key;
          var prefixedName = _this2._name + ':' + name;
          var refs = allRefs.filter(function (element) {
            return element.getAttribute('g-ref') === prefixedName;
          });

          if (refs.length === 0) {
            refs = allRefs.filter(function (element) {
              return element.getAttribute('g-ref') === name;
            });
          }

          if (!isArray) {
            refs = refs.length ? refs[0] : null;
          }

          return {
            name: key,
            value: refs
          };
        }).reduce(function (acc, ref) {
          acc[ref.name] = ref.value;
          return acc;
        }, {});
      }

      return this._ref;
    }
  }, {
    key: 'options',
    get: function get() {
      return this._options;
    },
    set: function set(defaults) {
      var options = {};
      var optionsFromAttribute = this.element.getAttribute('g-options');

      if (optionsFromAttribute) {
        options = JSON.parse(optionsFromAttribute);
      }

      this._options = _extends({}, this._options, defaults, options);
      return this._options;
    }
  }, {
    key: 'state',
    get: function get() {
      return this._state;
    },
    set: function set(state) {
      console.warn('You should not change state manually. Use setState instead.');
      this._state = state;
    }
  }]);

  return Component;
}();

exports.default = Component;

/***/ }),

/***/ "./node_modules/gia/Component.js":
/*!***************************************!*\
  !*** ./node_modules/gia/Component.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

__webpack_require__(/*! babel-regenerator-runtime */ "./node_modules/babel-regenerator-runtime/runtime.js");

var _BaseComponent2 = __webpack_require__(/*! ./BaseComponent */ "./node_modules/gia/BaseComponent.js");

var _BaseComponent3 = _interopRequireDefault(_BaseComponent2);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function _asyncToGenerator(fn) {
  return function () {
    var gen = fn.apply(this, arguments);
    return new Promise(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }

        if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }

      return step("next");
    });
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
/**
 * Component with code splitting support
 */


var Component = function (_BaseComponent) {
  _inherits(Component, _BaseComponent);

  function Component() {
    _classCallCheck(this, Component);

    return _possibleConstructorReturn(this, (Component.__proto__ || Object.getPrototypeOf(Component)).apply(this, arguments));
  }

  _createClass(Component, [{
    key: 'require',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function require() {
        return _ref.apply(this, arguments);
      }

      return require;
    }()
  }, {
    key: '_load',
    value: function _load() {
      this.require().then(this.mount.bind(this));
    }
  }]);

  return Component;
}(_BaseComponent3.default);

exports.default = Component;

/***/ }),

/***/ "./node_modules/gia/config.js":
/*!************************************!*\
  !*** ./node_modules/gia/config.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
/**
 * Config for setting and changing global settings
 */


var Config = function () {
  function Config() {
    _classCallCheck(this, Config);

    this._options = {
      log: true
    };
  }

  _createClass(Config, [{
    key: "set",
    value: function set(name, value) {
      this._options[name] = value;
    }
  }, {
    key: "get",
    value: function get(name) {
      return this._options[name];
    }
  }]);

  return Config;
}();

exports.default = new Config();

/***/ }),

/***/ "./node_modules/gia/createInstance.js":
/*!********************************************!*\
  !*** ./node_modules/gia/createInstance.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createInstance;

var _config = __webpack_require__(/*! ./config */ "./node_modules/gia/config.js");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
/**
 * Creates and returns instance of component
 * @param element: DOM element
 * @param componentName: Component name
 * @param component: Component constructor
 * @param options: options object passed into a component
 */


function createInstance(element, componentName, component, options) {
  component.prototype._name = componentName;
  var instance = new component(element, options);

  if (_config2.default.get('log')) {
    console.info('Created instance of component "' + componentName + '".');
  }

  return instance;
}

/***/ }),

/***/ "./node_modules/gia/eventbus.js":
/*!**************************************!*\
  !*** ./node_modules/gia/eventbus.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var _config = __webpack_require__(/*! ./config */ "./node_modules/gia/config.js");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
/**
 * Event bus for storing and executing handlers on emitted events
 */


var EventBus = function () {
  function EventBus() {
    _classCallCheck(this, EventBus);

    this.list = {};
  }

  _createClass(EventBus, [{
    key: 'emit',
    value: function emit(event) {
      var _this = this;

      var eventObject = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      eventObject._name = event;

      if (this.list[event]) {
        if (_config2.default.get('log')) {
          console.info(this.list[event].length + ' handler' + (this.list[event].length > 1 ? "s" : "") + ' called on event \'' + event + '\'');
        }

        this.list[event].forEach(function (handlerObject) {
          handlerObject.handler(eventObject);

          if (handlerObject.once) {
            _this.off(event, handlerObject.handler);
          }
        });
      } else {
        if (_config2.default.get('log')) {
          console.info('0 handlers called on event \'' + event + '\'');
        }
      }
    }
  }, {
    key: 'on',
    value: function on(event, handler) {
      var once = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (this.list[event]) {
        this.list[event].push({
          once: once,
          handler: handler
        });
      } else {
        this.list[event] = [];
        this.list[event].push({
          once: once,
          handler: handler
        });
      }
    }
  }, {
    key: 'once',
    value: function once(event, handler) {
      this.on(event, handler, true);
    }
  }, {
    key: 'off',
    value: function off(event, handler) {
      if (event != null) {
        if (handler != null) {
          if (this.list[event] && this.list[event].filter(function (eventObject) {
            return eventObject.handler === handler;
          }).length) {
            var toRemove = this.list[event].filter(function (eventObject) {
              return eventObject.handler === handler;
            })[0];
            var index = this.list[event].indexOf(toRemove);

            if (index > -1) {
              this.list[event].splice(index, 1);
            }
          } else {
            console.warn('Event ' + event + ' cannot be unsubscribed - does not exist.');
          }
        } else {
          this.list[event] = [];
        }
      } else {
        this.list = {};
      }
    }
  }]);

  return EventBus;
}();

exports.default = new EventBus();

/***/ }),

/***/ "./node_modules/gia/getComponentFromElement.js":
/*!*****************************************************!*\
  !*** ./node_modules/gia/getComponentFromElement.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getComponentFromElement;
/**
 * Return instance from element
 * @param element: DOM element or ID of element
 * @returns component instance
 */

function getComponentFromElement(element) {
  if (typeof element === 'string') {
    element = document.getElementById(element);

    if (!element) {
      return null;
    }
  }

  return element['__gia_component__'];
}

/***/ }),

/***/ "./node_modules/gia/loadComponents.js":
/*!********************************************!*\
  !*** ./node_modules/gia/loadComponents.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = loadComponents;

var _utils = __webpack_require__(/*! ./utils */ "./node_modules/gia/utils.js");

var _getComponentFromElement = __webpack_require__(/*! ./getComponentFromElement */ "./node_modules/gia/getComponentFromElement.js");

var _getComponentFromElement2 = _interopRequireDefault(_getComponentFromElement);

var _createInstance = __webpack_require__(/*! ./createInstance */ "./node_modules/gia/createInstance.js");

var _createInstance2 = _interopRequireDefault(_createInstance);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
/**
 * Creates instances of components without creating duplicates on elements within the context
 * @param components: object of components to load
 * @param context: DOM element
 */


function loadComponents() {
  var components = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.documentElement;

  if (!components || Object.keys(components).length === 0) {
    console.warn('App has no components');
    return;
  }

  var initialisedComponents = [];
  (0, _utils.queryAll)('[g-component]', context).forEach(function (element) {
    var instance = (0, _getComponentFromElement2.default)(element);

    if (instance) {
      console.warn('Error: instance exists: \n', instance);
      return true; // continue
    }

    var componentName = element.getAttribute('g-component');

    if (typeof components[componentName] === 'function') {
      initialisedComponents.push((0, _createInstance2.default)(element, componentName, components[componentName]));
    } else {
      console.warn('Constructor for component "' + componentName + '" not found.');
    }
  }); // call _load/require/mount

  initialisedComponents.forEach(function (component) {
    component._load();
  });
}

/***/ }),

/***/ "./node_modules/gia/utils.js":
/*!***********************************!*\
  !*** ./node_modules/gia/utils.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.query = query;
exports.queryAll = queryAll;
exports.toggleClass = toggleClass;
exports.removeClass = removeClass;
exports.addClass = addClass;
exports.triggerEvent = triggerEvent;

function query(selector) {
  var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;

  if (typeof selector !== 'string') {
    return selector;
  }

  return context.querySelector(selector);
}

function queryAll(selector) {
  var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;

  if (typeof selector !== 'string') {
    return selector;
  }

  return Array.prototype.slice.call(context.querySelectorAll(selector));
}

function toggleClass(element, className) {
  var condition = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  if (condition === null) {
    if (element.classList.contains(className)) {
      element.classList.remove(className);
    } else {
      element.classList.add(className);
    }
  } else {
    if (condition) {
      element.classList.add(className);
    } else {
      element.classList.remove(className);
    }
  }
}

function removeClass(nodes, className) {
  if (Array.isArray(nodes)) {
    nodes.forEach(function (node) {
      return node.classList.remove(className);
    });
  } else {
    nodes.classList.remove(className);
  }

  return nodes;
}

function addClass(nodes, className) {
  if (Array.isArray(nodes)) {
    nodes.forEach(function (node) {
      return node.classList.add(className);
    });
  } else {
    nodes.classList.add(className);
  }

  return nodes;
}

function triggerEvent(element, eventType) {
  var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {
    bubbles: true,
    cancelable: true,
    detail: null
  };
  options.detail = params;
  var event = new CustomEvent(eventType, options);
  element.dispatchEvent(event);
}

/***/ }),

/***/ "./node_modules/include-media-export/dist/include-media-1.0.2.min.js":
/*!***************************************************************************!*\
  !*** ./node_modules/include-media-export/dist/include-media-1.0.2.min.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!function (e, t) {
   true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (t),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : undefined;
}(this, function () {
  function e(e) {
    c = e;
  }

  function t(e) {
    "manual" == e && (f = !1, n());
  }

  function n() {
    if (window.getComputedStyle && "" !== window.getComputedStyle(c, "::after").content) {
      var e = window.getComputedStyle(c, "::after").content;

      try {
        l = JSON.parse(i(e));
      } catch (t) {
        l = !1;
      }
    } else l = !1;
  }

  function a(e) {
    return f && n(), l.hasOwnProperty(e) && l[e].active;
  }

  function o(e) {
    return !a(e);
  }

  function r() {
    f && n();
    var e = {
      name: !1,
      value: 0
    };

    for (var t in l) if (l.hasOwnProperty(t)) {
      var a = parseFloat(l[t].value);
      l[t].active && a > e.value && (e = {
        name: t,
        value: a
      });
    }

    return e.name;
  }

  function u(e, t) {
    return f && n(), l && l.hasOwnProperty(e) ? t ? parseFloat(l[e].value) : l[e].value : !1;
  }

  function i(e) {
    return ("string" == typeof e || e instanceof String) && (e = e.replace(/[']/g, '"').replace(/\\|^[\s\S]{0,1}|[\s\S]$/g, "")), e;
  }

  var c = document.body,
      f = !0,
      l = !1;
  return {
    setElement: e,
    setUpdateMode: t,
    greaterThan: a,
    lessThan: o,
    getActive: r,
    getValue: u,
    update: n
  };
});

/***/ }),

/***/ "./node_modules/lazysizes/lazysizes.js":
/*!*********************************************!*\
  !*** ./node_modules/lazysizes/lazysizes.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

(function (window, factory) {
  var lazySizes = factory(window, window.document, Date);
  window.lazySizes = lazySizes;

  if ( true && module.exports) {
    module.exports = lazySizes;
  }
})(typeof window != 'undefined' ? window : {}, function l(window, document, Date) {
  // Pass in the windoe Date function also for SSR because the Date class can be lost
  'use strict';
  /*jshint eqnull:true */

  var lazysizes, lazySizesCfg;

  (function () {
    var prop;
    var lazySizesDefaults = {
      lazyClass: 'lazyload',
      loadedClass: 'lazyloaded',
      loadingClass: 'lazyloading',
      preloadClass: 'lazypreload',
      errorClass: 'lazyerror',
      //strictClass: 'lazystrict',
      autosizesClass: 'lazyautosizes',
      srcAttr: 'data-src',
      srcsetAttr: 'data-srcset',
      sizesAttr: 'data-sizes',
      //preloadAfterLoad: false,
      minSize: 40,
      customMedia: {},
      init: true,
      expFactor: 1.5,
      hFac: 0.8,
      loadMode: 2,
      loadHidden: true,
      ricTimeout: 0,
      throttleDelay: 125
    };
    lazySizesCfg = window.lazySizesConfig || window.lazysizesConfig || {};

    for (prop in lazySizesDefaults) {
      if (!(prop in lazySizesCfg)) {
        lazySizesCfg[prop] = lazySizesDefaults[prop];
      }
    }
  })();

  if (!document || !document.getElementsByClassName) {
    return {
      init: function () {},
      cfg: lazySizesCfg,
      noSupport: true
    };
  }

  var docElem = document.documentElement;
  var supportPicture = window.HTMLPictureElement;
  var _addEventListener = 'addEventListener';
  var _getAttribute = 'getAttribute';
  /**
   * Update to bind to window because 'this' becomes null during SSR
   * builds.
   */

  var addEventListener = window[_addEventListener].bind(window);

  var setTimeout = window.setTimeout;
  var requestAnimationFrame = window.requestAnimationFrame || setTimeout;
  var requestIdleCallback = window.requestIdleCallback;
  var regPicture = /^picture$/i;
  var loadEvents = ['load', 'error', 'lazyincluded', '_lazyloaded'];
  var regClassCache = {};
  var forEach = Array.prototype.forEach;

  var hasClass = function (ele, cls) {
    if (!regClassCache[cls]) {
      regClassCache[cls] = new RegExp('(\\s|^)' + cls + '(\\s|$)');
    }

    return regClassCache[cls].test(ele[_getAttribute]('class') || '') && regClassCache[cls];
  };

  var addClass = function (ele, cls) {
    if (!hasClass(ele, cls)) {
      ele.setAttribute('class', (ele[_getAttribute]('class') || '').trim() + ' ' + cls);
    }
  };

  var removeClass = function (ele, cls) {
    var reg;

    if (reg = hasClass(ele, cls)) {
      ele.setAttribute('class', (ele[_getAttribute]('class') || '').replace(reg, ' '));
    }
  };

  var addRemoveLoadEvents = function (dom, fn, add) {
    var action = add ? _addEventListener : 'removeEventListener';

    if (add) {
      addRemoveLoadEvents(dom, fn);
    }

    loadEvents.forEach(function (evt) {
      dom[action](evt, fn);
    });
  };

  var triggerEvent = function (elem, name, detail, noBubbles, noCancelable) {
    var event = document.createEvent('Event');

    if (!detail) {
      detail = {};
    }

    detail.instance = lazysizes;
    event.initEvent(name, !noBubbles, !noCancelable);
    event.detail = detail;
    elem.dispatchEvent(event);
    return event;
  };

  var updatePolyfill = function (el, full) {
    var polyfill;

    if (!supportPicture && (polyfill = window.picturefill || lazySizesCfg.pf)) {
      if (full && full.src && !el[_getAttribute]('srcset')) {
        el.setAttribute('srcset', full.src);
      }

      polyfill({
        reevaluate: true,
        elements: [el]
      });
    } else if (full && full.src) {
      el.src = full.src;
    }
  };

  var getCSS = function (elem, style) {
    return (getComputedStyle(elem, null) || {})[style];
  };

  var getWidth = function (elem, parent, width) {
    width = width || elem.offsetWidth;

    while (width < lazySizesCfg.minSize && parent && !elem._lazysizesWidth) {
      width = parent.offsetWidth;
      parent = parent.parentNode;
    }

    return width;
  };

  var rAF = function () {
    var running, waiting;
    var firstFns = [];
    var secondFns = [];
    var fns = firstFns;

    var run = function () {
      var runFns = fns;
      fns = firstFns.length ? secondFns : firstFns;
      running = true;
      waiting = false;

      while (runFns.length) {
        runFns.shift()();
      }

      running = false;
    };

    var rafBatch = function (fn, queue) {
      if (running && !queue) {
        fn.apply(this, arguments);
      } else {
        fns.push(fn);

        if (!waiting) {
          waiting = true;
          (document.hidden ? setTimeout : requestAnimationFrame)(run);
        }
      }
    };

    rafBatch._lsFlush = run;
    return rafBatch;
  }();

  var rAFIt = function (fn, simple) {
    return simple ? function () {
      rAF(fn);
    } : function () {
      var that = this;
      var args = arguments;
      rAF(function () {
        fn.apply(that, args);
      });
    };
  };

  var throttle = function (fn) {
    var running;
    var lastTime = 0;
    var gDelay = lazySizesCfg.throttleDelay;
    var rICTimeout = lazySizesCfg.ricTimeout;

    var run = function () {
      running = false;
      lastTime = Date.now();
      fn();
    };

    var idleCallback = requestIdleCallback && rICTimeout > 49 ? function () {
      requestIdleCallback(run, {
        timeout: rICTimeout
      });

      if (rICTimeout !== lazySizesCfg.ricTimeout) {
        rICTimeout = lazySizesCfg.ricTimeout;
      }
    } : rAFIt(function () {
      setTimeout(run);
    }, true);
    return function (isPriority) {
      var delay;

      if (isPriority = isPriority === true) {
        rICTimeout = 33;
      }

      if (running) {
        return;
      }

      running = true;
      delay = gDelay - (Date.now() - lastTime);

      if (delay < 0) {
        delay = 0;
      }

      if (isPriority || delay < 9) {
        idleCallback();
      } else {
        setTimeout(idleCallback, delay);
      }
    };
  }; //based on http://modernjavascript.blogspot.de/2013/08/building-better-debounce.html


  var debounce = function (func) {
    var timeout, timestamp;
    var wait = 99;

    var run = function () {
      timeout = null;
      func();
    };

    var later = function () {
      var last = Date.now() - timestamp;

      if (last < wait) {
        setTimeout(later, wait - last);
      } else {
        (requestIdleCallback || run)(run);
      }
    };

    return function () {
      timestamp = Date.now();

      if (!timeout) {
        timeout = setTimeout(later, wait);
      }
    };
  };

  var loader = function () {
    var preloadElems, isCompleted, resetPreloadingTimer, loadMode, started;
    var eLvW, elvH, eLtop, eLleft, eLright, eLbottom, isBodyHidden;
    var regImg = /^img$/i;
    var regIframe = /^iframe$/i;
    var supportScroll = 'onscroll' in window && !/(gle|ing)bot/.test(navigator.userAgent);
    var shrinkExpand = 0;
    var currentExpand = 0;
    var isLoading = 0;
    var lowRuns = -1;

    var resetPreloading = function (e) {
      isLoading--;

      if (!e || isLoading < 0 || !e.target) {
        isLoading = 0;
      }
    };

    var isVisible = function (elem) {
      if (isBodyHidden == null) {
        isBodyHidden = getCSS(document.body, 'visibility') == 'hidden';
      }

      return isBodyHidden || !(getCSS(elem.parentNode, 'visibility') == 'hidden' && getCSS(elem, 'visibility') == 'hidden');
    };

    var isNestedVisible = function (elem, elemExpand) {
      var outerRect;
      var parent = elem;
      var visible = isVisible(elem);
      eLtop -= elemExpand;
      eLbottom += elemExpand;
      eLleft -= elemExpand;
      eLright += elemExpand;

      while (visible && (parent = parent.offsetParent) && parent != document.body && parent != docElem) {
        visible = (getCSS(parent, 'opacity') || 1) > 0;

        if (visible && getCSS(parent, 'overflow') != 'visible') {
          outerRect = parent.getBoundingClientRect();
          visible = eLright > outerRect.left && eLleft < outerRect.right && eLbottom > outerRect.top - 1 && eLtop < outerRect.bottom + 1;
        }
      }

      return visible;
    };

    var checkElements = function () {
      var eLlen, i, rect, autoLoadElem, loadedSomething, elemExpand, elemNegativeExpand, elemExpandVal, beforeExpandVal, defaultExpand, preloadExpand, hFac;
      var lazyloadElems = lazysizes.elements;

      if ((loadMode = lazySizesCfg.loadMode) && isLoading < 8 && (eLlen = lazyloadElems.length)) {
        i = 0;
        lowRuns++;

        for (; i < eLlen; i++) {
          if (!lazyloadElems[i] || lazyloadElems[i]._lazyRace) {
            continue;
          }

          if (!supportScroll || lazysizes.prematureUnveil && lazysizes.prematureUnveil(lazyloadElems[i])) {
            unveilElement(lazyloadElems[i]);
            continue;
          }

          if (!(elemExpandVal = lazyloadElems[i][_getAttribute]('data-expand')) || !(elemExpand = elemExpandVal * 1)) {
            elemExpand = currentExpand;
          }

          if (!defaultExpand) {
            defaultExpand = !lazySizesCfg.expand || lazySizesCfg.expand < 1 ? docElem.clientHeight > 500 && docElem.clientWidth > 500 ? 500 : 370 : lazySizesCfg.expand;
            lazysizes._defEx = defaultExpand;
            preloadExpand = defaultExpand * lazySizesCfg.expFactor;
            hFac = lazySizesCfg.hFac;
            isBodyHidden = null;

            if (currentExpand < preloadExpand && isLoading < 1 && lowRuns > 2 && loadMode > 2 && !document.hidden) {
              currentExpand = preloadExpand;
              lowRuns = 0;
            } else if (loadMode > 1 && lowRuns > 1 && isLoading < 6) {
              currentExpand = defaultExpand;
            } else {
              currentExpand = shrinkExpand;
            }
          }

          if (beforeExpandVal !== elemExpand) {
            eLvW = innerWidth + elemExpand * hFac;
            elvH = innerHeight + elemExpand;
            elemNegativeExpand = elemExpand * -1;
            beforeExpandVal = elemExpand;
          }

          rect = lazyloadElems[i].getBoundingClientRect();

          if ((eLbottom = rect.bottom) >= elemNegativeExpand && (eLtop = rect.top) <= elvH && (eLright = rect.right) >= elemNegativeExpand * hFac && (eLleft = rect.left) <= eLvW && (eLbottom || eLright || eLleft || eLtop) && (lazySizesCfg.loadHidden || isVisible(lazyloadElems[i])) && (isCompleted && isLoading < 3 && !elemExpandVal && (loadMode < 3 || lowRuns < 4) || isNestedVisible(lazyloadElems[i], elemExpand))) {
            unveilElement(lazyloadElems[i]);
            loadedSomething = true;

            if (isLoading > 9) {
              break;
            }
          } else if (!loadedSomething && isCompleted && !autoLoadElem && isLoading < 4 && lowRuns < 4 && loadMode > 2 && (preloadElems[0] || lazySizesCfg.preloadAfterLoad) && (preloadElems[0] || !elemExpandVal && (eLbottom || eLright || eLleft || eLtop || lazyloadElems[i][_getAttribute](lazySizesCfg.sizesAttr) != 'auto'))) {
            autoLoadElem = preloadElems[0] || lazyloadElems[i];
          }
        }

        if (autoLoadElem && !loadedSomething) {
          unveilElement(autoLoadElem);
        }
      }
    };

    var throttledCheckElements = throttle(checkElements);

    var switchLoadingClass = function (e) {
      var elem = e.target;

      if (elem._lazyCache) {
        delete elem._lazyCache;
        return;
      }

      resetPreloading(e);
      addClass(elem, lazySizesCfg.loadedClass);
      removeClass(elem, lazySizesCfg.loadingClass);
      addRemoveLoadEvents(elem, rafSwitchLoadingClass);
      triggerEvent(elem, 'lazyloaded');
    };

    var rafedSwitchLoadingClass = rAFIt(switchLoadingClass);

    var rafSwitchLoadingClass = function (e) {
      rafedSwitchLoadingClass({
        target: e.target
      });
    };

    var changeIframeSrc = function (elem, src) {
      try {
        elem.contentWindow.location.replace(src);
      } catch (e) {
        elem.src = src;
      }
    };

    var handleSources = function (source) {
      var customMedia;

      var sourceSrcset = source[_getAttribute](lazySizesCfg.srcsetAttr);

      if (customMedia = lazySizesCfg.customMedia[source[_getAttribute]('data-media') || source[_getAttribute]('media')]) {
        source.setAttribute('media', customMedia);
      }

      if (sourceSrcset) {
        source.setAttribute('srcset', sourceSrcset);
      }
    };

    var lazyUnveil = rAFIt(function (elem, detail, isAuto, sizes, isImg) {
      var src, srcset, parent, isPicture, event, firesLoad;

      if (!(event = triggerEvent(elem, 'lazybeforeunveil', detail)).defaultPrevented) {
        if (sizes) {
          if (isAuto) {
            addClass(elem, lazySizesCfg.autosizesClass);
          } else {
            elem.setAttribute('sizes', sizes);
          }
        }

        srcset = elem[_getAttribute](lazySizesCfg.srcsetAttr);
        src = elem[_getAttribute](lazySizesCfg.srcAttr);

        if (isImg) {
          parent = elem.parentNode;
          isPicture = parent && regPicture.test(parent.nodeName || '');
        }

        firesLoad = detail.firesLoad || 'src' in elem && (srcset || src || isPicture);
        event = {
          target: elem
        };
        addClass(elem, lazySizesCfg.loadingClass);

        if (firesLoad) {
          clearTimeout(resetPreloadingTimer);
          resetPreloadingTimer = setTimeout(resetPreloading, 2500);
          addRemoveLoadEvents(elem, rafSwitchLoadingClass, true);
        }

        if (isPicture) {
          forEach.call(parent.getElementsByTagName('source'), handleSources);
        }

        if (srcset) {
          elem.setAttribute('srcset', srcset);
        } else if (src && !isPicture) {
          if (regIframe.test(elem.nodeName)) {
            changeIframeSrc(elem, src);
          } else {
            elem.src = src;
          }
        }

        if (isImg && (srcset || isPicture)) {
          updatePolyfill(elem, {
            src: src
          });
        }
      }

      if (elem._lazyRace) {
        delete elem._lazyRace;
      }

      removeClass(elem, lazySizesCfg.lazyClass);
      rAF(function () {
        // Part of this can be removed as soon as this fix is older: https://bugs.chromium.org/p/chromium/issues/detail?id=7731 (2015)
        var isLoaded = elem.complete && elem.naturalWidth > 1;

        if (!firesLoad || isLoaded) {
          if (isLoaded) {
            addClass(elem, 'ls-is-cached');
          }

          switchLoadingClass(event);
          elem._lazyCache = true;
          setTimeout(function () {
            if ('_lazyCache' in elem) {
              delete elem._lazyCache;
            }
          }, 9);
        }

        if (elem.loading == 'lazy') {
          isLoading--;
        }
      }, true);
    });

    var unveilElement = function (elem) {
      if (elem._lazyRace) {
        return;
      }

      var detail;
      var isImg = regImg.test(elem.nodeName); //allow using sizes="auto", but don't use. it's invalid. Use data-sizes="auto" or a valid value for sizes instead (i.e.: sizes="80vw")

      var sizes = isImg && (elem[_getAttribute](lazySizesCfg.sizesAttr) || elem[_getAttribute]('sizes'));

      var isAuto = sizes == 'auto';

      if ((isAuto || !isCompleted) && isImg && (elem[_getAttribute]('src') || elem.srcset) && !elem.complete && !hasClass(elem, lazySizesCfg.errorClass) && hasClass(elem, lazySizesCfg.lazyClass)) {
        return;
      }

      detail = triggerEvent(elem, 'lazyunveilread').detail;

      if (isAuto) {
        autoSizer.updateElem(elem, true, elem.offsetWidth);
      }

      elem._lazyRace = true;
      isLoading++;
      lazyUnveil(elem, detail, isAuto, sizes, isImg);
    };

    var afterScroll = debounce(function () {
      lazySizesCfg.loadMode = 3;
      throttledCheckElements();
    });

    var altLoadmodeScrollListner = function () {
      if (lazySizesCfg.loadMode == 3) {
        lazySizesCfg.loadMode = 2;
      }

      afterScroll();
    };

    var onload = function () {
      if (isCompleted) {
        return;
      }

      if (Date.now() - started < 999) {
        setTimeout(onload, 999);
        return;
      }

      isCompleted = true;
      lazySizesCfg.loadMode = 3;
      throttledCheckElements();
      addEventListener('scroll', altLoadmodeScrollListner, true);
    };

    return {
      _: function () {
        started = Date.now();
        lazysizes.elements = document.getElementsByClassName(lazySizesCfg.lazyClass);
        preloadElems = document.getElementsByClassName(lazySizesCfg.lazyClass + ' ' + lazySizesCfg.preloadClass);
        addEventListener('scroll', throttledCheckElements, true);
        addEventListener('resize', throttledCheckElements, true);
        addEventListener('pageshow', function (e) {
          if (e.persisted) {
            var loadingElements = document.querySelectorAll('.' + lazySizesCfg.loadingClass);

            if (loadingElements.length && loadingElements.forEach) {
              requestAnimationFrame(function () {
                loadingElements.forEach(function (img) {
                  if (img.complete) {
                    unveilElement(img);
                  }
                });
              });
            }
          }
        });

        if (window.MutationObserver) {
          new MutationObserver(throttledCheckElements).observe(docElem, {
            childList: true,
            subtree: true,
            attributes: true
          });
        } else {
          docElem[_addEventListener]('DOMNodeInserted', throttledCheckElements, true);

          docElem[_addEventListener]('DOMAttrModified', throttledCheckElements, true);

          setInterval(throttledCheckElements, 999);
        }

        addEventListener('hashchange', throttledCheckElements, true); //, 'fullscreenchange'

        ['focus', 'mouseover', 'click', 'load', 'transitionend', 'animationend'].forEach(function (name) {
          document[_addEventListener](name, throttledCheckElements, true);
        });

        if (/d$|^c/.test(document.readyState)) {
          onload();
        } else {
          addEventListener('load', onload);

          document[_addEventListener]('DOMContentLoaded', throttledCheckElements);

          setTimeout(onload, 20000);
        }

        if (lazysizes.elements.length) {
          checkElements();

          rAF._lsFlush();
        } else {
          throttledCheckElements();
        }
      },
      checkElems: throttledCheckElements,
      unveil: unveilElement,
      _aLSL: altLoadmodeScrollListner
    };
  }();

  var autoSizer = function () {
    var autosizesElems;
    var sizeElement = rAFIt(function (elem, parent, event, width) {
      var sources, i, len;
      elem._lazysizesWidth = width;
      width += 'px';
      elem.setAttribute('sizes', width);

      if (regPicture.test(parent.nodeName || '')) {
        sources = parent.getElementsByTagName('source');

        for (i = 0, len = sources.length; i < len; i++) {
          sources[i].setAttribute('sizes', width);
        }
      }

      if (!event.detail.dataAttr) {
        updatePolyfill(elem, event.detail);
      }
    });

    var getSizeElement = function (elem, dataAttr, width) {
      var event;
      var parent = elem.parentNode;

      if (parent) {
        width = getWidth(elem, parent, width);
        event = triggerEvent(elem, 'lazybeforesizes', {
          width: width,
          dataAttr: !!dataAttr
        });

        if (!event.defaultPrevented) {
          width = event.detail.width;

          if (width && width !== elem._lazysizesWidth) {
            sizeElement(elem, parent, event, width);
          }
        }
      }
    };

    var updateElementsSizes = function () {
      var i;
      var len = autosizesElems.length;

      if (len) {
        i = 0;

        for (; i < len; i++) {
          getSizeElement(autosizesElems[i]);
        }
      }
    };

    var debouncedUpdateElementsSizes = debounce(updateElementsSizes);
    return {
      _: function () {
        autosizesElems = document.getElementsByClassName(lazySizesCfg.autosizesClass);
        addEventListener('resize', debouncedUpdateElementsSizes);
      },
      checkElems: debouncedUpdateElementsSizes,
      updateElem: getSizeElement
    };
  }();

  var init = function () {
    if (!init.i && document.getElementsByClassName) {
      init.i = true;

      autoSizer._();

      loader._();
    }
  };

  setTimeout(function () {
    if (lazySizesCfg.init) {
      init();
    }
  });
  lazysizes = {
    cfg: lazySizesCfg,
    autoSizer: autoSizer,
    loader: loader,
    init: init,
    uP: updatePolyfill,
    aC: addClass,
    rC: removeClass,
    hC: hasClass,
    fire: triggerEvent,
    gW: getWidth,
    rAF: rAF
  };
  return lazysizes;
});

/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {}; // cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}

function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}

(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }

  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();

function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  } // if setTimeout wasn't available but was latter defined


  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}

function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  } // if clearTimeout wasn't available but was latter defined


  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}

var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }

  draining = false;

  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }

  if (queue.length) {
    drainQueue();
  }
}

function drainQueue() {
  if (draining) {
    return;
  }

  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;

  while (len) {
    currentQueue = queue;
    queue = [];

    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }

    queueIndex = -1;
    len = queue.length;
  }

  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}

process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);

  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }

  queue.push(new Item(fun, args));

  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
}; // v8 likes predictible objects


function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}

Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues

process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
  return [];
};

process.binding = function (name) {
  throw new Error('process.binding is not supported');
};

process.cwd = function () {
  return '/';
};

process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};

process.umask = function () {
  return 0;
};

/***/ }),

/***/ "./node_modules/scroll-lock/dist/scroll-lock.js":
/*!******************************************************!*\
  !*** ./node_modules/scroll-lock/dist/scroll-lock.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
  if (true) module.exports = factory();else {}
})(this, function () {
  return (
    /******/
    function (modules) {
      // webpackBootstrap

      /******/
      // The module cache

      /******/
      var installedModules = {};
      /******/

      /******/
      // The require function

      /******/

      function __webpack_require__(moduleId) {
        /******/

        /******/
        // Check if module is in cache

        /******/
        if (installedModules[moduleId]) {
          /******/
          return installedModules[moduleId].exports;
          /******/
        }
        /******/
        // Create a new module (and put it into the cache)

        /******/


        var module = installedModules[moduleId] = {
          /******/
          i: moduleId,

          /******/
          l: false,

          /******/
          exports: {}
          /******/

        };
        /******/

        /******/
        // Execute the module function

        /******/

        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        /******/

        /******/
        // Flag the module as loaded

        /******/

        module.l = true;
        /******/

        /******/
        // Return the exports of the module

        /******/

        return module.exports;
        /******/
      }
      /******/

      /******/

      /******/
      // expose the modules object (__webpack_modules__)

      /******/


      __webpack_require__.m = modules;
      /******/

      /******/
      // expose the module cache

      /******/

      __webpack_require__.c = installedModules;
      /******/

      /******/
      // define getter function for harmony exports

      /******/

      __webpack_require__.d = function (exports, name, getter) {
        /******/
        if (!__webpack_require__.o(exports, name)) {
          /******/
          Object.defineProperty(exports, name, {
            enumerable: true,
            get: getter
          });
          /******/
        }
        /******/

      };
      /******/

      /******/
      // define __esModule on exports

      /******/


      __webpack_require__.r = function (exports) {
        /******/
        if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
          /******/
          Object.defineProperty(exports, Symbol.toStringTag, {
            value: 'Module'
          });
          /******/
        }
        /******/


        Object.defineProperty(exports, '__esModule', {
          value: true
        });
        /******/
      };
      /******/

      /******/
      // create a fake namespace object

      /******/
      // mode & 1: value is a module id, require it

      /******/
      // mode & 2: merge all properties of value into the ns

      /******/
      // mode & 4: return value when already ns object

      /******/
      // mode & 8|1: behave like require

      /******/


      __webpack_require__.t = function (value, mode) {
        /******/
        if (mode & 1) value = __webpack_require__(value);
        /******/

        if (mode & 8) return value;
        /******/

        if (mode & 4 && typeof value === 'object' && value && value.__esModule) return value;
        /******/

        var ns = Object.create(null);
        /******/

        __webpack_require__.r(ns);
        /******/


        Object.defineProperty(ns, 'default', {
          enumerable: true,
          value: value
        });
        /******/

        if (mode & 2 && typeof value != 'string') for (var key in value) __webpack_require__.d(ns, key, function (key) {
          return value[key];
        }.bind(null, key));
        /******/

        return ns;
        /******/
      };
      /******/

      /******/
      // getDefaultExport function for compatibility with non-harmony modules

      /******/


      __webpack_require__.n = function (module) {
        /******/
        var getter = module && module.__esModule ?
        /******/
        function getDefault() {
          return module['default'];
        } :
        /******/
        function getModuleExports() {
          return module;
        };
        /******/

        __webpack_require__.d(getter, 'a', getter);
        /******/


        return getter;
        /******/
      };
      /******/

      /******/
      // Object.prototype.hasOwnProperty.call

      /******/


      __webpack_require__.o = function (object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
      };
      /******/

      /******/
      // __webpack_public_path__

      /******/


      __webpack_require__.p = "";
      /******/

      /******/

      /******/
      // Load entry module and return exports

      /******/

      return __webpack_require__(__webpack_require__.s = 0);
      /******/
    }(
    /************************************************************************/

    /******/
    [
    /* 0 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__); // CONCATENATED MODULE: ./src/tools.js


      var argumentAsArray = function argumentAsArray(argument) {
        return Array.isArray(argument) ? argument : [argument];
      };

      var isElement = function isElement(target) {
        return target instanceof Node;
      };

      var isElementList = function isElementList(nodeList) {
        return nodeList instanceof NodeList;
      };

      var eachNode = function eachNode(nodeList, callback) {
        if (nodeList && callback) {
          nodeList = isElementList(nodeList) ? nodeList : [nodeList];

          for (var i = 0; i < nodeList.length; i++) {
            if (callback(nodeList[i], i, nodeList.length) === true) {
              break;
            }
          }
        }
      };

      var throwError = function throwError(message) {
        return console.error("[scroll-lock] ".concat(message));
      };

      var arrayAsSelector = function arrayAsSelector(array) {
        if (Array.isArray(array)) {
          var selector = array.join(', ');
          return selector;
        }
      };

      var nodeListAsArray = function nodeListAsArray(nodeList) {
        var nodes = [];
        eachNode(nodeList, function (node) {
          return nodes.push(node);
        });
        return nodes;
      };

      var findParentBySelector = function findParentBySelector($el, selector) {
        var self = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
        var $root = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : document;

        if (self && nodeListAsArray($root.querySelectorAll(selector)).indexOf($el) !== -1) {
          return $el;
        }

        while (($el = $el.parentElement) && nodeListAsArray($root.querySelectorAll(selector)).indexOf($el) === -1) {
          ;
        }

        return $el;
      };

      var elementHasSelector = function elementHasSelector($el, selector) {
        var $root = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : document;
        var has = nodeListAsArray($root.querySelectorAll(selector)).indexOf($el) !== -1;
        return has;
      };

      var elementHasOverflowHidden = function elementHasOverflowHidden($el) {
        if ($el) {
          var computedStyle = getComputedStyle($el);
          var overflowIsHidden = computedStyle.overflow === 'hidden';
          return overflowIsHidden;
        }
      };

      var elementScrollTopOnStart = function elementScrollTopOnStart($el) {
        if ($el) {
          if (elementHasOverflowHidden($el)) {
            return true;
          }

          var scrollTop = $el.scrollTop;
          return scrollTop <= 0;
        }
      };

      var elementScrollTopOnEnd = function elementScrollTopOnEnd($el) {
        if ($el) {
          if (elementHasOverflowHidden($el)) {
            return true;
          }

          var scrollTop = $el.scrollTop;
          var scrollHeight = $el.scrollHeight;
          var scrollTopWithHeight = scrollTop + $el.offsetHeight;
          return scrollTopWithHeight >= scrollHeight;
        }
      };

      var elementScrollLeftOnStart = function elementScrollLeftOnStart($el) {
        if ($el) {
          if (elementHasOverflowHidden($el)) {
            return true;
          }

          var scrollLeft = $el.scrollLeft;
          return scrollLeft <= 0;
        }
      };

      var elementScrollLeftOnEnd = function elementScrollLeftOnEnd($el) {
        if ($el) {
          if (elementHasOverflowHidden($el)) {
            return true;
          }

          var scrollLeft = $el.scrollLeft;
          var scrollWidth = $el.scrollWidth;
          var scrollLeftWithWidth = scrollLeft + $el.offsetWidth;
          return scrollLeftWithWidth >= scrollWidth;
        }
      };

      var elementIsScrollableField = function elementIsScrollableField($el) {
        var selector = 'textarea, [contenteditable="true"]';
        return elementHasSelector($el, selector);
      };

      var elementIsInputRange = function elementIsInputRange($el) {
        var selector = 'input[type="range"]';
        return elementHasSelector($el, selector);
      }; // CONCATENATED MODULE: ./src/scroll-lock.js

      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "disablePageScroll", function () {
        return disablePageScroll;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "enablePageScroll", function () {
        return enablePageScroll;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "getScrollState", function () {
        return getScrollState;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "clearQueueScrollLocks", function () {
        return clearQueueScrollLocks;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "getTargetScrollBarWidth", function () {
        return scroll_lock_getTargetScrollBarWidth;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "getCurrentTargetScrollBarWidth", function () {
        return scroll_lock_getCurrentTargetScrollBarWidth;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "getPageScrollBarWidth", function () {
        return getPageScrollBarWidth;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "getCurrentPageScrollBarWidth", function () {
        return getCurrentPageScrollBarWidth;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "addScrollableTarget", function () {
        return scroll_lock_addScrollableTarget;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "removeScrollableTarget", function () {
        return scroll_lock_removeScrollableTarget;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "addScrollableSelector", function () {
        return scroll_lock_addScrollableSelector;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "removeScrollableSelector", function () {
        return scroll_lock_removeScrollableSelector;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "addLockableTarget", function () {
        return scroll_lock_addLockableTarget;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "addLockableSelector", function () {
        return scroll_lock_addLockableSelector;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "setFillGapMethod", function () {
        return scroll_lock_setFillGapMethod;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "addFillGapTarget", function () {
        return scroll_lock_addFillGapTarget;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "removeFillGapTarget", function () {
        return scroll_lock_removeFillGapTarget;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "addFillGapSelector", function () {
        return scroll_lock_addFillGapSelector;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "removeFillGapSelector", function () {
        return scroll_lock_removeFillGapSelector;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "refillGaps", function () {
        return refillGaps;
      });

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

      var FILL_GAP_AVAILABLE_METHODS = ['padding', 'margin', 'width', 'max-width', 'none'];
      var TOUCH_DIRECTION_DETECT_OFFSET = 3;
      var state = {
        scroll: true,
        queue: 0,
        scrollableSelectors: ['[data-scroll-lock-scrollable]'],
        lockableSelectors: ['body', '[data-scroll-lock-lockable]'],
        fillGapSelectors: ['body', '[data-scroll-lock-fill-gap]', '[data-scroll-lock-lockable]'],
        fillGapMethod: FILL_GAP_AVAILABLE_METHODS[0],
        //
        startTouchY: 0,
        startTouchX: 0
      };

      var disablePageScroll = function disablePageScroll(target) {
        if (state.queue <= 0) {
          state.scroll = false;
          scroll_lock_hideLockableOverflow();
          fillGaps();
        }

        scroll_lock_addScrollableTarget(target);
        state.queue++;
      };

      var enablePageScroll = function enablePageScroll(target) {
        state.queue > 0 && state.queue--;

        if (state.queue <= 0) {
          state.scroll = true;
          scroll_lock_showLockableOverflow();
          unfillGaps();
        }

        scroll_lock_removeScrollableTarget(target);
      };

      var getScrollState = function getScrollState() {
        return state.scroll;
      };

      var clearQueueScrollLocks = function clearQueueScrollLocks() {
        state.queue = 0;
      };

      var scroll_lock_getTargetScrollBarWidth = function getTargetScrollBarWidth($target) {
        var onlyExists = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        if (isElement($target)) {
          var currentOverflowYProperty = $target.style.overflowY;

          if (onlyExists) {
            if (!getScrollState()) {
              $target.style.overflowY = $target.getAttribute('data-scroll-lock-saved-overflow-y-property');
            }
          } else {
            $target.style.overflowY = 'scroll';
          }

          var width = scroll_lock_getCurrentTargetScrollBarWidth($target);
          $target.style.overflowY = currentOverflowYProperty;
          return width;
        } else {
          return 0;
        }
      };

      var scroll_lock_getCurrentTargetScrollBarWidth = function getCurrentTargetScrollBarWidth($target) {
        if (isElement($target)) {
          if ($target === document.body) {
            var documentWidth = document.documentElement.clientWidth;
            var windowWidth = window.innerWidth;
            var currentWidth = windowWidth - documentWidth;
            return currentWidth;
          } else {
            var borderLeftWidthCurrentProperty = $target.style.borderLeftWidth;
            var borderRightWidthCurrentProperty = $target.style.borderRightWidth;
            $target.style.borderLeftWidth = '0px';
            $target.style.borderRightWidth = '0px';

            var _currentWidth = $target.offsetWidth - $target.clientWidth;

            $target.style.borderLeftWidth = borderLeftWidthCurrentProperty;
            $target.style.borderRightWidth = borderRightWidthCurrentProperty;
            return _currentWidth;
          }
        } else {
          return 0;
        }
      };

      var getPageScrollBarWidth = function getPageScrollBarWidth() {
        var onlyExists = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        return scroll_lock_getTargetScrollBarWidth(document.body, onlyExists);
      };

      var getCurrentPageScrollBarWidth = function getCurrentPageScrollBarWidth() {
        return scroll_lock_getCurrentTargetScrollBarWidth(document.body);
      };

      var scroll_lock_addScrollableTarget = function addScrollableTarget(target) {
        if (target) {
          var targets = argumentAsArray(target);
          targets.map(function ($targets) {
            eachNode($targets, function ($target) {
              if (isElement($target)) {
                $target.setAttribute('data-scroll-lock-scrollable', '');
              } else {
                throwError("\"".concat($target, "\" is not a Element."));
              }
            });
          });
        }
      };

      var scroll_lock_removeScrollableTarget = function removeScrollableTarget(target) {
        if (target) {
          var targets = argumentAsArray(target);
          targets.map(function ($targets) {
            eachNode($targets, function ($target) {
              if (isElement($target)) {
                $target.removeAttribute('data-scroll-lock-scrollable');
              } else {
                throwError("\"".concat($target, "\" is not a Element."));
              }
            });
          });
        }
      };

      var scroll_lock_addScrollableSelector = function addScrollableSelector(selector) {
        if (selector) {
          var selectors = argumentAsArray(selector);
          selectors.map(function (selector) {
            state.scrollableSelectors.push(selector);
          });
        }
      };

      var scroll_lock_removeScrollableSelector = function removeScrollableSelector(selector) {
        if (selector) {
          var selectors = argumentAsArray(selector);
          selectors.map(function (selector) {
            state.scrollableSelectors = state.scrollableSelectors.filter(function (sSelector) {
              return sSelector !== selector;
            });
          });
        }
      };

      var scroll_lock_addLockableTarget = function addLockableTarget(target) {
        if (target) {
          var targets = argumentAsArray(target);
          targets.map(function ($targets) {
            eachNode($targets, function ($target) {
              if (isElement($target)) {
                $target.setAttribute('data-scroll-lock-lockable', '');
              } else {
                throwError("\"".concat($target, "\" is not a Element."));
              }
            });
          });

          if (!getScrollState()) {
            scroll_lock_hideLockableOverflow();
          }
        }
      };

      var scroll_lock_addLockableSelector = function addLockableSelector(selector) {
        if (selector) {
          var selectors = argumentAsArray(selector);
          selectors.map(function (selector) {
            state.lockableSelectors.push(selector);
          });

          if (!getScrollState()) {
            scroll_lock_hideLockableOverflow();
          }

          scroll_lock_addFillGapSelector(selector);
        }
      };

      var scroll_lock_setFillGapMethod = function setFillGapMethod(method) {
        if (method) {
          if (FILL_GAP_AVAILABLE_METHODS.indexOf(method) !== -1) {
            state.fillGapMethod = method;
            refillGaps();
          } else {
            var methods = FILL_GAP_AVAILABLE_METHODS.join(', ');
            throwError("\"".concat(method, "\" method is not available!\nAvailable fill gap methods: ").concat(methods, "."));
          }
        }
      };

      var scroll_lock_addFillGapTarget = function addFillGapTarget(target) {
        if (target) {
          var targets = argumentAsArray(target);
          targets.map(function ($targets) {
            eachNode($targets, function ($target) {
              if (isElement($target)) {
                $target.setAttribute('data-scroll-lock-fill-gap', '');

                if (!state.scroll) {
                  scroll_lock_fillGapTarget($target);
                }
              } else {
                throwError("\"".concat($target, "\" is not a Element."));
              }
            });
          });
        }
      };

      var scroll_lock_removeFillGapTarget = function removeFillGapTarget(target) {
        if (target) {
          var targets = argumentAsArray(target);
          targets.map(function ($targets) {
            eachNode($targets, function ($target) {
              if (isElement($target)) {
                $target.removeAttribute('data-scroll-lock-fill-gap');

                if (!state.scroll) {
                  scroll_lock_unfillGapTarget($target);
                }
              } else {
                throwError("\"".concat($target, "\" is not a Element."));
              }
            });
          });
        }
      };

      var scroll_lock_addFillGapSelector = function addFillGapSelector(selector) {
        if (selector) {
          var selectors = argumentAsArray(selector);
          selectors.map(function (selector) {
            if (state.fillGapSelectors.indexOf(selector) === -1) {
              state.fillGapSelectors.push(selector);

              if (!state.scroll) {
                scroll_lock_fillGapSelector(selector);
              }
            }
          });
        }
      };

      var scroll_lock_removeFillGapSelector = function removeFillGapSelector(selector) {
        if (selector) {
          var selectors = argumentAsArray(selector);
          selectors.map(function (selector) {
            state.fillGapSelectors = state.fillGapSelectors.filter(function (fSelector) {
              return fSelector !== selector;
            });

            if (!state.scroll) {
              scroll_lock_unfillGapSelector(selector);
            }
          });
        }
      };

      var refillGaps = function refillGaps() {
        if (!state.scroll) {
          fillGaps();
        }
      };

      var scroll_lock_hideLockableOverflow = function hideLockableOverflow() {
        var selector = arrayAsSelector(state.lockableSelectors);
        scroll_lock_hideLockableOverflowSelector(selector);
      };

      var scroll_lock_showLockableOverflow = function showLockableOverflow() {
        var selector = arrayAsSelector(state.lockableSelectors);
        scroll_lock_showLockableOverflowSelector(selector);
      };

      var scroll_lock_hideLockableOverflowSelector = function hideLockableOverflowSelector(selector) {
        var $targets = document.querySelectorAll(selector);
        eachNode($targets, function ($target) {
          scroll_lock_hideLockableOverflowTarget($target);
        });
      };

      var scroll_lock_showLockableOverflowSelector = function showLockableOverflowSelector(selector) {
        var $targets = document.querySelectorAll(selector);
        eachNode($targets, function ($target) {
          scroll_lock_showLockableOverflowTarget($target);
        });
      };

      var scroll_lock_hideLockableOverflowTarget = function hideLockableOverflowTarget($target) {
        if (isElement($target) && $target.getAttribute('data-scroll-lock-locked') !== 'true') {
          var computedStyle = window.getComputedStyle($target);
          $target.setAttribute('data-scroll-lock-saved-overflow-y-property', computedStyle.overflowY);
          $target.setAttribute('data-scroll-lock-saved-inline-overflow-property', $target.style.overflow);
          $target.setAttribute('data-scroll-lock-saved-inline-overflow-y-property', $target.style.overflowY);
          $target.style.overflow = 'hidden';
          $target.setAttribute('data-scroll-lock-locked', 'true');
        }
      };

      var scroll_lock_showLockableOverflowTarget = function showLockableOverflowTarget($target) {
        if (isElement($target) && $target.getAttribute('data-scroll-lock-locked') === 'true') {
          $target.style.overflow = $target.getAttribute('data-scroll-lock-saved-inline-overflow-property');
          $target.style.overflowY = $target.getAttribute('data-scroll-lock-saved-inline-overflow-y-property');
          $target.removeAttribute('data-scroll-lock-saved-overflow-property');
          $target.removeAttribute('data-scroll-lock-saved-inline-overflow-property');
          $target.removeAttribute('data-scroll-lock-saved-inline-overflow-y-property');
          $target.removeAttribute('data-scroll-lock-locked');
        }
      };

      var fillGaps = function fillGaps() {
        state.fillGapSelectors.map(function (selector) {
          scroll_lock_fillGapSelector(selector);
        });
      };

      var unfillGaps = function unfillGaps() {
        state.fillGapSelectors.map(function (selector) {
          scroll_lock_unfillGapSelector(selector);
        });
      };

      var scroll_lock_fillGapSelector = function fillGapSelector(selector) {
        var $targets = document.querySelectorAll(selector);
        var isLockable = state.lockableSelectors.indexOf(selector) !== -1;
        eachNode($targets, function ($target) {
          scroll_lock_fillGapTarget($target, isLockable);
        });
      };

      var scroll_lock_fillGapTarget = function fillGapTarget($target) {
        var isLockable = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        if (isElement($target)) {
          var scrollBarWidth;

          if ($target.getAttribute('data-scroll-lock-lockable') === '' || isLockable) {
            scrollBarWidth = scroll_lock_getTargetScrollBarWidth($target, true);
          } else {
            var $lockableParent = findParentBySelector($target, arrayAsSelector(state.lockableSelectors));
            scrollBarWidth = scroll_lock_getTargetScrollBarWidth($lockableParent, true);
          }

          if ($target.getAttribute('data-scroll-lock-filled-gap') === 'true') {
            scroll_lock_unfillGapTarget($target);
          }

          var computedStyle = window.getComputedStyle($target);
          $target.setAttribute('data-scroll-lock-filled-gap', 'true');
          $target.setAttribute('data-scroll-lock-current-fill-gap-method', state.fillGapMethod);

          if (state.fillGapMethod === 'margin') {
            var currentMargin = parseFloat(computedStyle.marginRight);
            $target.style.marginRight = "".concat(currentMargin + scrollBarWidth, "px");
          } else if (state.fillGapMethod === 'width') {
            $target.style.width = "calc(100% - ".concat(scrollBarWidth, "px)");
          } else if (state.fillGapMethod === 'max-width') {
            $target.style.maxWidth = "calc(100% - ".concat(scrollBarWidth, "px)");
          } else if (state.fillGapMethod === 'padding') {
            var currentPadding = parseFloat(computedStyle.paddingRight);
            $target.style.paddingRight = "".concat(currentPadding + scrollBarWidth, "px");
          }
        }
      };

      var scroll_lock_unfillGapSelector = function unfillGapSelector(selector) {
        var $targets = document.querySelectorAll(selector);
        eachNode($targets, function ($target) {
          scroll_lock_unfillGapTarget($target);
        });
      };

      var scroll_lock_unfillGapTarget = function unfillGapTarget($target) {
        if (isElement($target)) {
          if ($target.getAttribute('data-scroll-lock-filled-gap') === 'true') {
            var currentFillGapMethod = $target.getAttribute('data-scroll-lock-current-fill-gap-method');
            $target.removeAttribute('data-scroll-lock-filled-gap');
            $target.removeAttribute('data-scroll-lock-current-fill-gap-method');

            if (currentFillGapMethod === 'margin') {
              $target.style.marginRight = "";
            } else if (currentFillGapMethod === 'width') {
              $target.style.width = "";
            } else if (currentFillGapMethod === 'max-width') {
              $target.style.maxWidth = "";
            } else if (currentFillGapMethod === 'padding') {
              $target.style.paddingRight = "";
            }
          }
        }
      };

      var onResize = function onResize(e) {
        refillGaps();
      };

      var onTouchStart = function onTouchStart(e) {
        if (!state.scroll) {
          state.startTouchY = e.touches[0].clientY;
          state.startTouchX = e.touches[0].clientX;
        }
      };

      var scroll_lock_onTouchMove = function onTouchMove(e) {
        if (!state.scroll) {
          var startTouchY = state.startTouchY,
              startTouchX = state.startTouchX;
          var currentClientY = e.touches[0].clientY;
          var currentClientX = e.touches[0].clientX;

          if (e.touches.length < 2) {
            var selector = arrayAsSelector(state.scrollableSelectors);
            var direction = {
              up: startTouchY < currentClientY,
              down: startTouchY > currentClientY,
              left: startTouchX < currentClientX,
              right: startTouchX > currentClientX
            };
            var directionWithOffset = {
              up: startTouchY + TOUCH_DIRECTION_DETECT_OFFSET < currentClientY,
              down: startTouchY - TOUCH_DIRECTION_DETECT_OFFSET > currentClientY,
              left: startTouchX + TOUCH_DIRECTION_DETECT_OFFSET < currentClientX,
              right: startTouchX - TOUCH_DIRECTION_DETECT_OFFSET > currentClientX
            };

            var handle = function handle($el) {
              var skip = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

              if ($el) {
                var parentScrollableEl = findParentBySelector($el, selector, false);

                if (elementIsInputRange($el)) {
                  return false;
                }

                if (skip || elementIsScrollableField($el) && findParentBySelector($el, selector) || elementHasSelector($el, selector)) {
                  var prevent = false;

                  if (elementScrollLeftOnStart($el) && elementScrollLeftOnEnd($el)) {
                    if (direction.up && elementScrollTopOnStart($el) || direction.down && elementScrollTopOnEnd($el)) {
                      prevent = true;
                    }
                  } else if (elementScrollTopOnStart($el) && elementScrollTopOnEnd($el)) {
                    if (direction.left && elementScrollLeftOnStart($el) || direction.right && elementScrollLeftOnEnd($el)) {
                      prevent = true;
                    }
                  } else if (directionWithOffset.up && elementScrollTopOnStart($el) || directionWithOffset.down && elementScrollTopOnEnd($el) || directionWithOffset.left && elementScrollLeftOnStart($el) || directionWithOffset.right && elementScrollLeftOnEnd($el)) {
                    prevent = true;
                  }

                  if (prevent) {
                    if (parentScrollableEl) {
                      handle(parentScrollableEl, true);
                    } else {
                      if (e.cancelable) {
                        e.preventDefault();
                      }
                    }
                  }
                } else {
                  handle(parentScrollableEl);
                }
              } else {
                if (e.cancelable) {
                  e.preventDefault();
                }
              }
            };

            handle(e.target);
          }
        }
      };

      var onTouchEnd = function onTouchEnd(e) {
        if (!state.scroll) {
          state.startTouchY = 0;
          state.startTouchX = 0;
        }
      };

      if (typeof window !== 'undefined') {
        window.addEventListener('resize', onResize);
      }

      if (typeof document !== 'undefined') {
        document.addEventListener('touchstart', onTouchStart);
        document.addEventListener('touchmove', scroll_lock_onTouchMove, {
          passive: false
        });
        document.addEventListener('touchend', onTouchEnd);
      }

      var deprecatedMethods = {
        hide: function hide(target) {
          throwError('"hide" is deprecated! Use "disablePageScroll" instead. \n https://github.com/FL3NKEY/scroll-lock#disablepagescrollscrollabletarget');
          disablePageScroll(target);
        },
        show: function show(target) {
          throwError('"show" is deprecated! Use "enablePageScroll" instead. \n https://github.com/FL3NKEY/scroll-lock#enablepagescrollscrollabletarget');
          enablePageScroll(target);
        },
        toggle: function toggle(target) {
          throwError('"toggle" is deprecated! Do not use it.');

          if (getScrollState()) {
            disablePageScroll();
          } else {
            enablePageScroll(target);
          }
        },
        getState: function getState() {
          throwError('"getState" is deprecated! Use "getScrollState" instead. \n https://github.com/FL3NKEY/scroll-lock#getscrollstate');
          return getScrollState();
        },
        getWidth: function getWidth() {
          throwError('"getWidth" is deprecated! Use "getPageScrollBarWidth" instead. \n https://github.com/FL3NKEY/scroll-lock#getpagescrollbarwidth');
          return getPageScrollBarWidth();
        },
        getCurrentWidth: function getCurrentWidth() {
          throwError('"getCurrentWidth" is deprecated! Use "getCurrentPageScrollBarWidth" instead. \n https://github.com/FL3NKEY/scroll-lock#getcurrentpagescrollbarwidth');
          return getCurrentPageScrollBarWidth();
        },
        setScrollableTargets: function setScrollableTargets(target) {
          throwError('"setScrollableTargets" is deprecated! Use "addScrollableTarget" instead. \n https://github.com/FL3NKEY/scroll-lock#addscrollabletargetscrollabletarget');
          scroll_lock_addScrollableTarget(target);
        },
        setFillGapSelectors: function setFillGapSelectors(selector) {
          throwError('"setFillGapSelectors" is deprecated! Use "addFillGapSelector" instead. \n https://github.com/FL3NKEY/scroll-lock#addfillgapselectorfillgapselector');
          scroll_lock_addFillGapSelector(selector);
        },
        setFillGapTargets: function setFillGapTargets(target) {
          throwError('"setFillGapTargets" is deprecated! Use "addFillGapTarget" instead. \n https://github.com/FL3NKEY/scroll-lock#addfillgaptargetfillgaptarget');
          scroll_lock_addFillGapTarget(target);
        },
        clearQueue: function clearQueue() {
          throwError('"clearQueue" is deprecated! Use "clearQueueScrollLocks" instead. \n https://github.com/FL3NKEY/scroll-lock#clearqueuescrolllocks');
          clearQueueScrollLocks();
        }
      };

      var scrollLock = _objectSpread({
        disablePageScroll: disablePageScroll,
        enablePageScroll: enablePageScroll,
        getScrollState: getScrollState,
        clearQueueScrollLocks: clearQueueScrollLocks,
        getTargetScrollBarWidth: scroll_lock_getTargetScrollBarWidth,
        getCurrentTargetScrollBarWidth: scroll_lock_getCurrentTargetScrollBarWidth,
        getPageScrollBarWidth: getPageScrollBarWidth,
        getCurrentPageScrollBarWidth: getCurrentPageScrollBarWidth,
        addScrollableSelector: scroll_lock_addScrollableSelector,
        removeScrollableSelector: scroll_lock_removeScrollableSelector,
        addScrollableTarget: scroll_lock_addScrollableTarget,
        removeScrollableTarget: scroll_lock_removeScrollableTarget,
        addLockableSelector: scroll_lock_addLockableSelector,
        addLockableTarget: scroll_lock_addLockableTarget,
        addFillGapSelector: scroll_lock_addFillGapSelector,
        removeFillGapSelector: scroll_lock_removeFillGapSelector,
        addFillGapTarget: scroll_lock_addFillGapTarget,
        removeFillGapTarget: scroll_lock_removeFillGapTarget,
        setFillGapMethod: scroll_lock_setFillGapMethod,
        refillGaps: refillGaps,
        _state: state
      }, deprecatedMethods);
      /* harmony default export */


      var scroll_lock = __webpack_exports__["default"] = scrollLock;
      /***/
    }
    /******/
    ])["default"]
  );
});

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g; // This works in non-strict mode

g = function () {
  return this;
}();

try {
  // This works if eval is allowed (see CSP)
  g = g || new Function("return this")();
} catch (e) {
  // This works if the window reference is available
  if (typeof window === "object") g = window;
} // g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}


module.exports = g;

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var gia_loadComponents__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! gia/loadComponents */ "./node_modules/gia/loadComponents.js");
/* harmony import */ var gia_loadComponents__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(gia_loadComponents__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _js_modules__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/modules */ "./src/js/modules.js");
/* harmony import */ var _svg_arrow_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./svg/arrow.svg */ "./src/svg/arrow.svg");
/* harmony import */ var _svg_arrow_svg__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_svg_arrow_svg__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _svg_search_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./svg/search.svg */ "./src/svg/search.svg");
/* harmony import */ var _svg_search_svg__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_svg_search_svg__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _svg_hp_partners_logo_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./svg/hp-partners-logo.svg */ "./src/svg/hp-partners-logo.svg");
/* harmony import */ var _svg_hp_partners_logo_svg__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_svg_hp_partners_logo_svg__WEBPACK_IMPORTED_MODULE_4__);
// GIA COMPONENTS

 // importing svgs and images for webpack




gia_loadComponents__WEBPACK_IMPORTED_MODULE_0___default()(_js_modules__WEBPACK_IMPORTED_MODULE_1__["default"]);

/***/ }),

/***/ "./src/js/BaseTheme.js":
/*!*****************************!*\
  !*** ./src/js/BaseTheme.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var gia_Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! gia/Component */ "./node_modules/gia/Component.js");
/* harmony import */ var gia_Component__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(gia_Component__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lazysizes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lazysizes */ "./node_modules/lazysizes/lazysizes.js");
/* harmony import */ var lazysizes__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lazysizes__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var gia_getComponentFromElement__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! gia/getComponentFromElement */ "./node_modules/gia/getComponentFromElement.js");
/* harmony import */ var gia_getComponentFromElement__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(gia_getComponentFromElement__WEBPACK_IMPORTED_MODULE_2__);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }


 // always load lazysizes, requires no further config

 // Wrapper for global Javascript dependencies
// Enable/disable on per bage basis with options on body tag

var BaseTheme = /*#__PURE__*/function (_Component) {
  _inherits(BaseTheme, _Component);

  var _super = _createSuper(BaseTheme);

  function BaseTheme(element) {
    var _this;

    _classCallCheck(this, BaseTheme);

    _this = _super.call(this, element); // (https://github.com/eduardoboucas/include-media-export) - adding media queries to this module that will become accessible by: global.base.mediaQuery

    _this.mediaQuery = __webpack_require__(/*! ../../node_modules/include-media-export/dist/include-media-1.0.2.min.js */ "./node_modules/include-media-export/dist/include-media-1.0.2.min.js");
    _this.latestKnownScrollY = 0;
    _this.lastScrollTop = 0; // create global object of this special component instance

    global.base = gia_getComponentFromElement__WEBPACK_IMPORTED_MODULE_2___default()(document.body);
    return _this;
  }

  _createClass(BaseTheme, [{
    key: "mount",
    value: function mount() {
      this.initScrollHandler();
      this.initResizeHandler();
    }
  }, {
    key: "initScrollHandler",
    value: function initScrollHandler() {
      var _this2 = this;

      this.latestKnownScrollY = 0;
      var tick = false; // Track whether call is currently in process

      window.addEventListener('scroll', function () {
        _this2.latestKnownScrollY = window.scrollY; // needs to be out of the timeout to ensure result is accurate

        _this2.scrollDirection(_this2.latestKnownScrollY);

        if (!tick) {
          setTimeout(function () {
            global.scrollEvents.forEach(function (scrollHandler) {
              scrollHandler(_this2.latestKnownScrollY);
            });
            tick = false;
          }, 100);
        }

        tick = true;
      });
    }
  }, {
    key: "initResizeHandler",
    value: function initResizeHandler() {
      var forLastExec;
      var delay = 100; // delay between calls

      var throttled = false; // are we currently throttled?
      // window.resize event listener

      window.addEventListener('resize', function () {
        // only run if we're not throttled
        if (!throttled) {
          // actual callback action
          global.resizeEvents.forEach(function (resizeHandler) {
            resizeHandler();
          }); // we're throttled!

          throttled = true; // set a timeout to un-throttle

          setTimeout(function () {
            throttled = false;
          }, delay);
        }

        clearTimeout(forLastExec); // this is messy!

        forLastExec = setTimeout(function () {
          global.resizeEvents.forEach(function (resizeHandler) {
            resizeHandler();
          });
        }, delay);
      });
    }
  }, {
    key: "scrollDirection",
    value: function scrollDirection(currentScrollY) {
      global.scrollDirection = currentScrollY < this.lastScrollTop ? 'up' : 'down';
      this.lastScrollTop = currentScrollY;
    }
  }]);

  return BaseTheme;
}(gia_Component__WEBPACK_IMPORTED_MODULE_0___default.a); // Export ES6 module


/* harmony default export */ __webpack_exports__["default"] = (BaseTheme);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./src/js/Form.js":
/*!************************!*\
  !*** ./src/js/Form.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var gia_Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! gia/Component */ "./node_modules/gia/Component.js");
/* harmony import */ var gia_Component__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(gia_Component__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

 // Wrapper for global Javascript dependencies
// Enable/disable on per bage basis with options on body tag

var Form = /*#__PURE__*/function (_Component) {
  _inherits(Form, _Component);

  var _super = _createSuper(Form);

  function Form(element) {
    _classCallCheck(this, Form);

    return _super.call(this, element);
  }

  _createClass(Form, [{
    key: "mount",
    value: function mount() {
      $(".wpcf7 .form-control").focus(function () {
        $(this).parent().parent().addClass('active');
      }).blur(function () {
        var cval = $(this).val();

        if (cval.length < 1) {
          $(this).parent().parent().removeClass('active');
        }
      });
    }
  }]);

  return Form;
}(gia_Component__WEBPACK_IMPORTED_MODULE_0___default.a); // Export ES6 module


/* harmony default export */ __webpack_exports__["default"] = (Form);

/***/ }),

/***/ "./src/js/c-Burger.js":
/*!****************************!*\
  !*** ./src/js/c-Burger.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var gia_Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! gia/Component */ "./node_modules/gia/Component.js");
/* harmony import */ var gia_Component__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(gia_Component__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var gia_eventbus__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! gia/eventbus */ "./node_modules/gia/eventbus.js");
/* harmony import */ var gia_eventbus__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(gia_eventbus__WEBPACK_IMPORTED_MODULE_1__);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

// import GIA dependancy

 // Extend the GIA component

var Burger = /*#__PURE__*/function (_Component) {
  _inherits(Burger, _Component);

  var _super = _createSuper(Burger);

  // setup
  function Burger(element) {
    var _this;

    _classCallCheck(this, Burger);

    _this = _super.call(this, element);
    _this.options = {// someOption: " ",
    };
    _this.ref = {};
    return _this;
  }

  _createClass(Burger, [{
    key: "mount",
    value: function mount() {
      var burgerTrigger = this.element;
      burgerTrigger.addEventListener("click", this.triggerStateChange.bind(this));
      gia_eventbus__WEBPACK_IMPORTED_MODULE_1___default.a.on("resetBurgerState", this.triggerStateChange.bind(this));
    }
  }, {
    key: "triggerStateChange",
    value: function triggerStateChange() {
      this.setState({
        BurgerTriggerState: !this.state.BurgerTriggerState
      });
    }
  }, {
    key: "stateChange",
    value: function stateChange(stateChanges) {
      if ('BurgerTriggerState' in stateChanges) {
        var trigger = this.element;
        gia_eventbus__WEBPACK_IMPORTED_MODULE_1___default.a.emit("MainMenuTriggered"); // eventbus.emit("OverlayTriggered")

        if (this.state.BurgerTriggerState) {
          trigger.classList.add('is-active');
        } else {
          trigger.classList.remove('is-active');
        }
      }
    }
  }]);

  return Burger;
}(gia_Component__WEBPACK_IMPORTED_MODULE_0___default.a); // Export ES6 module


/* harmony default export */ __webpack_exports__["default"] = (Burger);

/***/ }),

/***/ "./src/js/c-BurgerMenu.js":
/*!********************************!*\
  !*** ./src/js/c-BurgerMenu.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var gia_Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! gia/Component */ "./node_modules/gia/Component.js");
/* harmony import */ var gia_Component__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(gia_Component__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var gia_eventbus__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! gia/eventbus */ "./node_modules/gia/eventbus.js");
/* harmony import */ var gia_eventbus__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(gia_eventbus__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var scroll_lock__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! scroll-lock */ "./node_modules/scroll-lock/dist/scroll-lock.js");
/* harmony import */ var scroll_lock__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(scroll_lock__WEBPACK_IMPORTED_MODULE_2__);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

// import GIA dependancy


 // Extend the GIA component

var BurgerMenu = /*#__PURE__*/function (_Component) {
  _inherits(BurgerMenu, _Component);

  var _super = _createSuper(BurgerMenu);

  // setup
  function BurgerMenu(element) {
    var _this;

    _classCallCheck(this, BurgerMenu);

    _this = _super.call(this, element);
    _this.options = {// someOption: " ",
    };
    _this.ref = {};
    return _this;
  }

  _createClass(BurgerMenu, [{
    key: "mount",
    value: function mount() {
      this.setState({
        menuOpen: false
      });
      gia_eventbus__WEBPACK_IMPORTED_MODULE_1___default.a.on('MainMenuTriggered', this.toggleStateChange.bind(this));
    }
  }, {
    key: "toggleStateChange",
    value: function toggleStateChange() {
      this.setState({
        menuOpen: !this.state.menuOpen
      });
    }
  }, {
    key: "stateChange",
    value: function stateChange(stateChanges) {
      if ('menuOpen' in stateChanges) {
        if (this.state.menuOpen) {
          this.element.classList.add('is-active');
          Object(scroll_lock__WEBPACK_IMPORTED_MODULE_2__["disablePageScroll"])(this.element);
        } else {
          this.closeMenu();
          Object(scroll_lock__WEBPACK_IMPORTED_MODULE_2__["enablePageScroll"])(this.element);
        }
      }
    }
  }, {
    key: "closeMenu",
    value: function closeMenu() {
      this.setState({
        menuOpen: false
      });
      this.element.classList.remove('is-active');
    }
  }]);

  return BurgerMenu;
}(gia_Component__WEBPACK_IMPORTED_MODULE_0___default.a); // Export ES6 module


/* harmony default export */ __webpack_exports__["default"] = (BurgerMenu);

/***/ }),

/***/ "./src/js/c-TopNav.js":
/*!****************************!*\
  !*** ./src/js/c-TopNav.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var gia_Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! gia/Component */ "./node_modules/gia/Component.js");
/* harmony import */ var gia_Component__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(gia_Component__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

// import GIA dependancy
 // Extend the GIA component

var TopNav = /*#__PURE__*/function (_Component) {
  _inherits(TopNav, _Component);

  var _super = _createSuper(TopNav);

  // setup
  function TopNav(element) {
    var _this;

    _classCallCheck(this, TopNav);

    _this = _super.call(this, element);
    global.scrollEvents.push(_this.shrinkBar.bind(_assertThisInitialized(_this)));
    global.scrollEvents.push(_this.hideBar.bind(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(TopNav, [{
    key: "mount",
    value: function mount() {}
  }, {
    key: "stateChange",
    value: function stateChange(stateChanges) {
      if ('isShrunk' in stateChanges) {
        if (this.state.isShrunk) {
          this.element.classList.add('c-TopNav--shrunk');
        } else {
          this.element.classList.remove('c-TopNav--shrunk');
        }
      } else if ('isHidden' in stateChanges) {
        if (this.state.isHidden) {
          this.element.classList.add('c-TopNav--is-pinned');
        } else {
          this.element.classList.remove('c-TopNav--is-pinned');
        }
      }
    }
  }, {
    key: "shrinkBar",
    value: function shrinkBar(currentScrollY) {
      if (currentScrollY > 0) {
        this.setState({
          isShrunk: true
        });
      } else {
        this.setState({
          isShrunk: false
        });
      }
    }
  }, {
    key: "hideBar",
    value: function hideBar(currentScrollY) {
      if (currentScrollY > 0 && global.scrollDirection === 'down') {
        this.setState({
          isHidden: true
        });
      } else if (this.state.isHidden && global.scrollDirection === 'up') {
        this.setState({
          isHidden: false
        });
      }
    }
  }]);

  return TopNav;
}(gia_Component__WEBPACK_IMPORTED_MODULE_0___default.a); // Export ES6 module


/* harmony default export */ __webpack_exports__["default"] = (TopNav);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./src/js/modules.js":
/*!***************************!*\
  !*** ./src/js/modules.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var _BaseTheme__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseTheme */ "./src/js/BaseTheme.js");
/* harmony import */ var _c_Burger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./c-Burger */ "./src/js/c-Burger.js");
/* harmony import */ var _c_BurgerMenu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./c-BurgerMenu */ "./src/js/c-BurgerMenu.js");
/* harmony import */ var _c_TopNav__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./c-TopNav */ "./src/js/c-TopNav.js");
/* harmony import */ var _Form__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Form */ "./src/js/Form.js");
 // put all global dependencies in here (things used on every page)




 // GLOBAL HANDLERs
// use from WITHIN your component class to add an instance!

global.scrollEvents = [];
global.resizeEvents = [];
global.scrollDirection;
var components = {
  "BaseTheme": _BaseTheme__WEBPACK_IMPORTED_MODULE_0__["default"],
  //rqd
  "Burger": _c_Burger__WEBPACK_IMPORTED_MODULE_1__["default"],
  "BurgerMenu": _c_BurgerMenu__WEBPACK_IMPORTED_MODULE_2__["default"],
  "TopNav": _c_TopNav__WEBPACK_IMPORTED_MODULE_3__["default"],
  "Form": _Form__WEBPACK_IMPORTED_MODULE_4__["default"]
};
/* harmony default export */ __webpack_exports__["default"] = (components);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./src/sass/main.scss":
/*!****************************!*\
  !*** ./src/sass/main.scss ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/svg/arrow.svg":
/*!***************************!*\
  !*** ./src/svg/arrow.svg ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  id: "arrow",
  url: __webpack_require__.p + "sprite.svgsprite.svgsprite.svgsprite.svgsprite.svg",
  width: 30,
  height: 30,
  viewBox: "0 0 30 30",
  toString: function () { return __webpack_require__.p + "sprite.svgsprite.svgsprite.svgsprite.svgsprite.svg" },
  backgroundSize: "566.32%566.32%566.32%566.32%566.32% 311.18%311.18%311.18%311.18%311.18%",
  backgroundPosition: "00000 00000"
}

/***/ }),

/***/ "./src/svg/hp-partners-logo.svg":
/*!**************************************!*\
  !*** ./src/svg/hp-partners-logo.svg ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  id: "hp-partners-logo",
  url: __webpack_require__.p + "sprite.svgsprite.svgsprite.svgsprite.svgsprite.svg",
  width: 169.896,
  height: 16,
  viewBox: "0 0 169.896 16",
  toString: function () { return __webpack_require__.p + "sprite.svgsprite.svgsprite.svgsprite.svgsprite.svg" },
  backgroundSize: "100%100%100%100%100% 583.46%583.46%583.46%583.46%583.46%",
  backgroundPosition: "00000 51.71%51.71%51.71%51.71%51.71%"
}

/***/ }),

/***/ "./src/svg/search.svg":
/*!****************************!*\
  !*** ./src/svg/search.svg ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  id: "search",
  url: __webpack_require__.p + "sprite.svgsprite.svgsprite.svgsprite.svgsprite.svg",
  width: 17.354,
  height: 17.354,
  viewBox: "0 0 17.354 17.354",
  toString: function () { return __webpack_require__.p + "sprite.svgsprite.svgsprite.svgsprite.svgsprite.svg" },
  backgroundSize: "979.00%979.00%979.00%979.00%979.00% 537.94%537.94%537.94%537.94%537.94%",
  backgroundPosition: "00000 86.84%86.84%86.84%86.84%86.84%"
}

/***/ }),

/***/ 0:
/*!*************************************************!*\
  !*** multi ./src/sass/main.scss ./src/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./src/sass/main.scss */"./src/sass/main.scss");
module.exports = __webpack_require__(/*! ./src/index.js */"./src/index.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZ2lhL0Jhc2VDb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2dpYS9Db21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2dpYS9jb25maWcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2dpYS9jcmVhdGVJbnN0YW5jZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZ2lhL2V2ZW50YnVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9naWEvZ2V0Q29tcG9uZW50RnJvbUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2dpYS9sb2FkQ29tcG9uZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZ2lhL3V0aWxzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9pbmNsdWRlLW1lZGlhLWV4cG9ydC9kaXN0L2luY2x1ZGUtbWVkaWEtMS4wLjIubWluLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sYXp5c2l6ZXMvbGF6eXNpemVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Njcm9sbC1sb2NrL2Rpc3Qvc2Nyb2xsLWxvY2suanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL0Jhc2VUaGVtZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvRm9ybS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYy1CdXJnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2MtQnVyZ2VyTWVudS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYy1Ub3BOYXYuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL21vZHVsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Nhc3MvbWFpbi5zY3NzP2MxYjYiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N2Zy9hcnJvdy5zdmciLCJ3ZWJwYWNrOi8vLy4vc3JjL3N2Zy9ocC1wYXJ0bmVycy1sb2dvLnN2ZyIsIndlYnBhY2s6Ly8vLi9zcmMvc3ZnL3NlYXJjaC5zdmciXSwibmFtZXMiOlsiZ2xvYmFsIiwiaGFzT3duIiwiT2JqZWN0IiwicHJvdG90eXBlIiwiaGFzT3duUHJvcGVydHkiLCJ1bmRlZmluZWQiLCJpdGVyYXRvclN5bWJvbCIsIlN5bWJvbCIsIml0ZXJhdG9yIiwiaW5Nb2R1bGUiLCJtb2R1bGUiLCJydW50aW1lIiwicmVnZW5lcmF0b3JSdW50aW1lIiwiZXhwb3J0cyIsIndyYXAiLCJpbm5lckZuIiwib3V0ZXJGbiIsInNlbGYiLCJ0cnlMb2NzTGlzdCIsImdlbmVyYXRvciIsImNyZWF0ZSIsIkdlbmVyYXRvciIsImNvbnRleHQiLCJDb250ZXh0IiwiX2ludm9rZSIsIm1ha2VJbnZva2VNZXRob2QiLCJ0cnlDYXRjaCIsImZuIiwib2JqIiwiYXJnIiwidHlwZSIsImNhbGwiLCJlcnIiLCJHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0IiwiR2VuU3RhdGVTdXNwZW5kZWRZaWVsZCIsIkdlblN0YXRlRXhlY3V0aW5nIiwiR2VuU3RhdGVDb21wbGV0ZWQiLCJDb250aW51ZVNlbnRpbmVsIiwiR2VuZXJhdG9yRnVuY3Rpb24iLCJHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSIsIkdwIiwiY29uc3RydWN0b3IiLCJkaXNwbGF5TmFtZSIsImRlZmluZUl0ZXJhdG9yTWV0aG9kcyIsImZvckVhY2giLCJtZXRob2QiLCJpc0dlbmVyYXRvckZ1bmN0aW9uIiwiZ2VuRnVuIiwiY3RvciIsIm5hbWUiLCJtYXJrIiwic2V0UHJvdG90eXBlT2YiLCJfX3Byb3RvX18iLCJhd3JhcCIsIkF3YWl0QXJndW1lbnQiLCJBc3luY0l0ZXJhdG9yIiwiaW52b2tlIiwicmVzdWx0IiwidmFsdWUiLCJQcm9taXNlIiwicmVzb2x2ZSIsInRoZW4iLCJpbnZva2VOZXh0IiwiaW52b2tlVGhyb3ciLCJ1bndyYXBwZWQiLCJwcm9jZXNzIiwiZG9tYWluIiwiYmluZCIsImludm9rZVJldHVybiIsInByZXZpb3VzUHJvbWlzZSIsImVucXVldWUiLCJjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZyIsImFzeW5jIiwiaXRlciIsIm5leHQiLCJkb25lIiwic3RhdGUiLCJFcnJvciIsImRvbmVSZXN1bHQiLCJkZWxlZ2F0ZSIsInJldHVybk1ldGhvZCIsInJlY29yZCIsImluZm8iLCJyZXN1bHROYW1lIiwibmV4dExvYyIsIl9zZW50Iiwic2VudCIsImRpc3BhdGNoRXhjZXB0aW9uIiwiYWJydXB0IiwidG9TdHJpbmciLCJwdXNoVHJ5RW50cnkiLCJsb2NzIiwiZW50cnkiLCJ0cnlMb2MiLCJjYXRjaExvYyIsImZpbmFsbHlMb2MiLCJhZnRlckxvYyIsInRyeUVudHJpZXMiLCJwdXNoIiwicmVzZXRUcnlFbnRyeSIsImNvbXBsZXRpb24iLCJyZXNldCIsImtleXMiLCJvYmplY3QiLCJrZXkiLCJyZXZlcnNlIiwibGVuZ3RoIiwicG9wIiwidmFsdWVzIiwiaXRlcmFibGUiLCJpdGVyYXRvck1ldGhvZCIsImlzTmFOIiwiaSIsInNraXBUZW1wUmVzZXQiLCJwcmV2IiwiY2hhckF0Iiwic2xpY2UiLCJzdG9wIiwicm9vdEVudHJ5Iiwicm9vdFJlY29yZCIsInJ2YWwiLCJleGNlcHRpb24iLCJoYW5kbGUiLCJsb2MiLCJjYXVnaHQiLCJoYXNDYXRjaCIsImhhc0ZpbmFsbHkiLCJmaW5hbGx5RW50cnkiLCJjb21wbGV0ZSIsImZpbmlzaCIsInRocm93biIsImRlbGVnYXRlWWllbGQiLCJ3aW5kb3ciLCJkZWZpbmVQcm9wZXJ0eSIsIl9leHRlbmRzIiwiYXNzaWduIiwidGFyZ2V0IiwiYXJndW1lbnRzIiwic291cmNlIiwiX3R5cGVvZiIsIl9jcmVhdGVDbGFzcyIsImRlZmluZVByb3BlcnRpZXMiLCJwcm9wcyIsImRlc2NyaXB0b3IiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwid3JpdGFibGUiLCJDb25zdHJ1Y3RvciIsInByb3RvUHJvcHMiLCJzdGF0aWNQcm9wcyIsIl91dGlscyIsInJlcXVpcmUiLCJfY2xhc3NDYWxsQ2hlY2siLCJpbnN0YW5jZSIsIlR5cGVFcnJvciIsIkNvbXBvbmVudCIsImVsZW1lbnQiLCJvcHRpb25zIiwiX3JlZiIsIl9vcHRpb25zIiwiX3N0YXRlIiwiX2xvYWQiLCJtb3VudCIsImNvbnNvbGUiLCJ3YXJuIiwiX25hbWUiLCJ1bm1vdW50IiwiZ2V0UmVmIiwicmVmIiwicHJlZml4ZWQiLCJzZXRTdGF0ZSIsImNoYW5nZXMiLCJfdGhpcyIsInN0YXRlQ2hhbmdlcyIsIkFycmF5IiwiaXNBcnJheSIsInNvbWUiLCJpdGVtIiwiaW5kZXgiLCJzdWJrZXkiLCJzdGF0ZUNoYW5nZSIsImdldCIsInNldCIsIml0ZW1zIiwiX3RoaXMyIiwiYWxsUmVmcyIsInF1ZXJ5QWxsIiwicmVmTmFtZSIsImdldEF0dHJpYnV0ZSIsImluZGV4T2YiLCJyZWZOYW1lQXJyYXkiLCJzcGxpdCIsImZpbHRlciIsIm1hcCIsInByZWZpeGVkTmFtZSIsInJlZnMiLCJyZWR1Y2UiLCJhY2MiLCJkZWZhdWx0cyIsIm9wdGlvbnNGcm9tQXR0cmlidXRlIiwiSlNPTiIsInBhcnNlIiwiZGVmYXVsdCIsIl9CYXNlQ29tcG9uZW50MiIsIl9CYXNlQ29tcG9uZW50MyIsIl9pbnRlcm9wUmVxdWlyZURlZmF1bHQiLCJfX2VzTW9kdWxlIiwiX2FzeW5jVG9HZW5lcmF0b3IiLCJnZW4iLCJhcHBseSIsInJlamVjdCIsInN0ZXAiLCJlcnJvciIsIl9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuIiwiUmVmZXJlbmNlRXJyb3IiLCJfaW5oZXJpdHMiLCJzdWJDbGFzcyIsInN1cGVyQ2xhc3MiLCJfQmFzZUNvbXBvbmVudCIsImdldFByb3RvdHlwZU9mIiwiX2NhbGxlZSIsIl9jYWxsZWUkIiwiX2NvbnRleHQiLCJDb25maWciLCJsb2ciLCJjcmVhdGVJbnN0YW5jZSIsIl9jb25maWciLCJfY29uZmlnMiIsImNvbXBvbmVudE5hbWUiLCJjb21wb25lbnQiLCJFdmVudEJ1cyIsImxpc3QiLCJlbWl0IiwiZXZlbnQiLCJldmVudE9iamVjdCIsImhhbmRsZXJPYmplY3QiLCJoYW5kbGVyIiwib25jZSIsIm9mZiIsIm9uIiwidG9SZW1vdmUiLCJzcGxpY2UiLCJnZXRDb21wb25lbnRGcm9tRWxlbWVudCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJsb2FkQ29tcG9uZW50cyIsIl9nZXRDb21wb25lbnRGcm9tRWxlbWVudCIsIl9nZXRDb21wb25lbnRGcm9tRWxlbWVudDIiLCJfY3JlYXRlSW5zdGFuY2UiLCJfY3JlYXRlSW5zdGFuY2UyIiwiY29tcG9uZW50cyIsImRvY3VtZW50RWxlbWVudCIsImluaXRpYWxpc2VkQ29tcG9uZW50cyIsInF1ZXJ5IiwidG9nZ2xlQ2xhc3MiLCJyZW1vdmVDbGFzcyIsImFkZENsYXNzIiwidHJpZ2dlckV2ZW50Iiwic2VsZWN0b3IiLCJxdWVyeVNlbGVjdG9yIiwicXVlcnlTZWxlY3RvckFsbCIsImNsYXNzTmFtZSIsImNvbmRpdGlvbiIsImNsYXNzTGlzdCIsImNvbnRhaW5zIiwicmVtb3ZlIiwiYWRkIiwibm9kZXMiLCJub2RlIiwiZXZlbnRUeXBlIiwicGFyYW1zIiwiYnViYmxlcyIsImNhbmNlbGFibGUiLCJkZXRhaWwiLCJDdXN0b21FdmVudCIsImRpc3BhdGNoRXZlbnQiLCJlIiwidCIsImRlZmluZSIsImMiLCJmIiwibiIsImdldENvbXB1dGVkU3R5bGUiLCJjb250ZW50IiwibCIsImEiLCJhY3RpdmUiLCJvIiwiciIsInBhcnNlRmxvYXQiLCJ1IiwiU3RyaW5nIiwicmVwbGFjZSIsImJvZHkiLCJzZXRFbGVtZW50Iiwic2V0VXBkYXRlTW9kZSIsImdyZWF0ZXJUaGFuIiwibGVzc1RoYW4iLCJnZXRBY3RpdmUiLCJnZXRWYWx1ZSIsInVwZGF0ZSIsImZhY3RvcnkiLCJsYXp5U2l6ZXMiLCJEYXRlIiwibGF6eXNpemVzIiwibGF6eVNpemVzQ2ZnIiwicHJvcCIsImxhenlTaXplc0RlZmF1bHRzIiwibGF6eUNsYXNzIiwibG9hZGVkQ2xhc3MiLCJsb2FkaW5nQ2xhc3MiLCJwcmVsb2FkQ2xhc3MiLCJlcnJvckNsYXNzIiwiYXV0b3NpemVzQ2xhc3MiLCJzcmNBdHRyIiwic3Jjc2V0QXR0ciIsInNpemVzQXR0ciIsIm1pblNpemUiLCJjdXN0b21NZWRpYSIsImluaXQiLCJleHBGYWN0b3IiLCJoRmFjIiwibG9hZE1vZGUiLCJsb2FkSGlkZGVuIiwicmljVGltZW91dCIsInRocm90dGxlRGVsYXkiLCJsYXp5U2l6ZXNDb25maWciLCJsYXp5c2l6ZXNDb25maWciLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwiY2ZnIiwibm9TdXBwb3J0IiwiZG9jRWxlbSIsInN1cHBvcnRQaWN0dXJlIiwiSFRNTFBpY3R1cmVFbGVtZW50IiwiX2FkZEV2ZW50TGlzdGVuZXIiLCJfZ2V0QXR0cmlidXRlIiwiYWRkRXZlbnRMaXN0ZW5lciIsInNldFRpbWVvdXQiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJyZXF1ZXN0SWRsZUNhbGxiYWNrIiwicmVnUGljdHVyZSIsImxvYWRFdmVudHMiLCJyZWdDbGFzc0NhY2hlIiwiaGFzQ2xhc3MiLCJlbGUiLCJjbHMiLCJSZWdFeHAiLCJ0ZXN0Iiwic2V0QXR0cmlidXRlIiwidHJpbSIsInJlZyIsImFkZFJlbW92ZUxvYWRFdmVudHMiLCJkb20iLCJhY3Rpb24iLCJldnQiLCJlbGVtIiwibm9CdWJibGVzIiwibm9DYW5jZWxhYmxlIiwiY3JlYXRlRXZlbnQiLCJpbml0RXZlbnQiLCJ1cGRhdGVQb2x5ZmlsbCIsImVsIiwiZnVsbCIsInBvbHlmaWxsIiwicGljdHVyZWZpbGwiLCJwZiIsInNyYyIsInJlZXZhbHVhdGUiLCJlbGVtZW50cyIsImdldENTUyIsInN0eWxlIiwiZ2V0V2lkdGgiLCJwYXJlbnQiLCJ3aWR0aCIsIm9mZnNldFdpZHRoIiwiX2xhenlzaXplc1dpZHRoIiwicGFyZW50Tm9kZSIsInJBRiIsInJ1bm5pbmciLCJ3YWl0aW5nIiwiZmlyc3RGbnMiLCJzZWNvbmRGbnMiLCJmbnMiLCJydW4iLCJydW5GbnMiLCJzaGlmdCIsInJhZkJhdGNoIiwicXVldWUiLCJoaWRkZW4iLCJfbHNGbHVzaCIsInJBRkl0Iiwic2ltcGxlIiwidGhhdCIsImFyZ3MiLCJ0aHJvdHRsZSIsImxhc3RUaW1lIiwiZ0RlbGF5IiwicklDVGltZW91dCIsIm5vdyIsImlkbGVDYWxsYmFjayIsInRpbWVvdXQiLCJpc1ByaW9yaXR5IiwiZGVsYXkiLCJkZWJvdW5jZSIsImZ1bmMiLCJ0aW1lc3RhbXAiLCJ3YWl0IiwibGF0ZXIiLCJsYXN0IiwibG9hZGVyIiwicHJlbG9hZEVsZW1zIiwiaXNDb21wbGV0ZWQiLCJyZXNldFByZWxvYWRpbmdUaW1lciIsInN0YXJ0ZWQiLCJlTHZXIiwiZWx2SCIsImVMdG9wIiwiZUxsZWZ0IiwiZUxyaWdodCIsImVMYm90dG9tIiwiaXNCb2R5SGlkZGVuIiwicmVnSW1nIiwicmVnSWZyYW1lIiwic3VwcG9ydFNjcm9sbCIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsInNocmlua0V4cGFuZCIsImN1cnJlbnRFeHBhbmQiLCJpc0xvYWRpbmciLCJsb3dSdW5zIiwicmVzZXRQcmVsb2FkaW5nIiwiaXNWaXNpYmxlIiwiaXNOZXN0ZWRWaXNpYmxlIiwiZWxlbUV4cGFuZCIsIm91dGVyUmVjdCIsInZpc2libGUiLCJvZmZzZXRQYXJlbnQiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJsZWZ0IiwicmlnaHQiLCJ0b3AiLCJib3R0b20iLCJjaGVja0VsZW1lbnRzIiwiZUxsZW4iLCJyZWN0IiwiYXV0b0xvYWRFbGVtIiwibG9hZGVkU29tZXRoaW5nIiwiZWxlbU5lZ2F0aXZlRXhwYW5kIiwiZWxlbUV4cGFuZFZhbCIsImJlZm9yZUV4cGFuZFZhbCIsImRlZmF1bHRFeHBhbmQiLCJwcmVsb2FkRXhwYW5kIiwibGF6eWxvYWRFbGVtcyIsIl9sYXp5UmFjZSIsInByZW1hdHVyZVVudmVpbCIsInVudmVpbEVsZW1lbnQiLCJleHBhbmQiLCJjbGllbnRIZWlnaHQiLCJjbGllbnRXaWR0aCIsIl9kZWZFeCIsImlubmVyV2lkdGgiLCJpbm5lckhlaWdodCIsInByZWxvYWRBZnRlckxvYWQiLCJ0aHJvdHRsZWRDaGVja0VsZW1lbnRzIiwic3dpdGNoTG9hZGluZ0NsYXNzIiwiX2xhenlDYWNoZSIsInJhZlN3aXRjaExvYWRpbmdDbGFzcyIsInJhZmVkU3dpdGNoTG9hZGluZ0NsYXNzIiwiY2hhbmdlSWZyYW1lU3JjIiwiY29udGVudFdpbmRvdyIsImxvY2F0aW9uIiwiaGFuZGxlU291cmNlcyIsInNvdXJjZVNyY3NldCIsImxhenlVbnZlaWwiLCJpc0F1dG8iLCJzaXplcyIsImlzSW1nIiwic3Jjc2V0IiwiaXNQaWN0dXJlIiwiZmlyZXNMb2FkIiwiZGVmYXVsdFByZXZlbnRlZCIsIm5vZGVOYW1lIiwiY2xlYXJUaW1lb3V0IiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJpc0xvYWRlZCIsIm5hdHVyYWxXaWR0aCIsImxvYWRpbmciLCJhdXRvU2l6ZXIiLCJ1cGRhdGVFbGVtIiwiYWZ0ZXJTY3JvbGwiLCJhbHRMb2FkbW9kZVNjcm9sbExpc3RuZXIiLCJvbmxvYWQiLCJfIiwicGVyc2lzdGVkIiwibG9hZGluZ0VsZW1lbnRzIiwiaW1nIiwiTXV0YXRpb25PYnNlcnZlciIsIm9ic2VydmUiLCJjaGlsZExpc3QiLCJzdWJ0cmVlIiwiYXR0cmlidXRlcyIsInNldEludGVydmFsIiwicmVhZHlTdGF0ZSIsImNoZWNrRWxlbXMiLCJ1bnZlaWwiLCJfYUxTTCIsImF1dG9zaXplc0VsZW1zIiwic2l6ZUVsZW1lbnQiLCJzb3VyY2VzIiwibGVuIiwiZGF0YUF0dHIiLCJnZXRTaXplRWxlbWVudCIsInVwZGF0ZUVsZW1lbnRzU2l6ZXMiLCJkZWJvdW5jZWRVcGRhdGVFbGVtZW50c1NpemVzIiwidVAiLCJhQyIsInJDIiwiaEMiLCJmaXJlIiwiZ1ciLCJjYWNoZWRTZXRUaW1lb3V0IiwiY2FjaGVkQ2xlYXJUaW1lb3V0IiwiZGVmYXVsdFNldFRpbW91dCIsImRlZmF1bHRDbGVhclRpbWVvdXQiLCJydW5UaW1lb3V0IiwiZnVuIiwicnVuQ2xlYXJUaW1lb3V0IiwibWFya2VyIiwiZHJhaW5pbmciLCJjdXJyZW50UXVldWUiLCJxdWV1ZUluZGV4IiwiY2xlYW5VcE5leHRUaWNrIiwiY29uY2F0IiwiZHJhaW5RdWV1ZSIsIm5leHRUaWNrIiwiSXRlbSIsImFycmF5IiwidGl0bGUiLCJicm93c2VyIiwiZW52IiwiYXJndiIsInZlcnNpb24iLCJ2ZXJzaW9ucyIsIm5vb3AiLCJhZGRMaXN0ZW5lciIsInJlbW92ZUxpc3RlbmVyIiwicmVtb3ZlQWxsTGlzdGVuZXJzIiwicHJlcGVuZExpc3RlbmVyIiwicHJlcGVuZE9uY2VMaXN0ZW5lciIsImxpc3RlbmVycyIsImJpbmRpbmciLCJjd2QiLCJjaGRpciIsImRpciIsInVtYXNrIiwid2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJyb290IiwibW9kdWxlcyIsImluc3RhbGxlZE1vZHVsZXMiLCJfX3dlYnBhY2tfcmVxdWlyZV9fIiwibW9kdWxlSWQiLCJtIiwiZCIsImdldHRlciIsInRvU3RyaW5nVGFnIiwibW9kZSIsIm5zIiwiZ2V0RGVmYXVsdCIsImdldE1vZHVsZUV4cG9ydHMiLCJwcm9wZXJ0eSIsInAiLCJzIiwiX193ZWJwYWNrX2V4cG9ydHNfXyIsImFyZ3VtZW50QXNBcnJheSIsImFyZ3VtZW50IiwiaXNFbGVtZW50IiwiTm9kZSIsImlzRWxlbWVudExpc3QiLCJub2RlTGlzdCIsIk5vZGVMaXN0IiwiZWFjaE5vZGUiLCJjYWxsYmFjayIsInRocm93RXJyb3IiLCJtZXNzYWdlIiwiYXJyYXlBc1NlbGVjdG9yIiwiam9pbiIsIm5vZGVMaXN0QXNBcnJheSIsImZpbmRQYXJlbnRCeVNlbGVjdG9yIiwiJGVsIiwiJHJvb3QiLCJwYXJlbnRFbGVtZW50IiwiZWxlbWVudEhhc1NlbGVjdG9yIiwiaGFzIiwiZWxlbWVudEhhc092ZXJmbG93SGlkZGVuIiwiY29tcHV0ZWRTdHlsZSIsIm92ZXJmbG93SXNIaWRkZW4iLCJvdmVyZmxvdyIsImVsZW1lbnRTY3JvbGxUb3BPblN0YXJ0Iiwic2Nyb2xsVG9wIiwiZWxlbWVudFNjcm9sbFRvcE9uRW5kIiwic2Nyb2xsSGVpZ2h0Iiwic2Nyb2xsVG9wV2l0aEhlaWdodCIsIm9mZnNldEhlaWdodCIsImVsZW1lbnRTY3JvbGxMZWZ0T25TdGFydCIsInNjcm9sbExlZnQiLCJlbGVtZW50U2Nyb2xsTGVmdE9uRW5kIiwic2Nyb2xsV2lkdGgiLCJzY3JvbGxMZWZ0V2l0aFdpZHRoIiwiZWxlbWVudElzU2Nyb2xsYWJsZUZpZWxkIiwiZWxlbWVudElzSW5wdXRSYW5nZSIsImRpc2FibGVQYWdlU2Nyb2xsIiwiZW5hYmxlUGFnZVNjcm9sbCIsImdldFNjcm9sbFN0YXRlIiwiY2xlYXJRdWV1ZVNjcm9sbExvY2tzIiwic2Nyb2xsX2xvY2tfZ2V0VGFyZ2V0U2Nyb2xsQmFyV2lkdGgiLCJzY3JvbGxfbG9ja19nZXRDdXJyZW50VGFyZ2V0U2Nyb2xsQmFyV2lkdGgiLCJnZXRQYWdlU2Nyb2xsQmFyV2lkdGgiLCJnZXRDdXJyZW50UGFnZVNjcm9sbEJhcldpZHRoIiwic2Nyb2xsX2xvY2tfYWRkU2Nyb2xsYWJsZVRhcmdldCIsInNjcm9sbF9sb2NrX3JlbW92ZVNjcm9sbGFibGVUYXJnZXQiLCJzY3JvbGxfbG9ja19hZGRTY3JvbGxhYmxlU2VsZWN0b3IiLCJzY3JvbGxfbG9ja19yZW1vdmVTY3JvbGxhYmxlU2VsZWN0b3IiLCJzY3JvbGxfbG9ja19hZGRMb2NrYWJsZVRhcmdldCIsInNjcm9sbF9sb2NrX2FkZExvY2thYmxlU2VsZWN0b3IiLCJzY3JvbGxfbG9ja19zZXRGaWxsR2FwTWV0aG9kIiwic2Nyb2xsX2xvY2tfYWRkRmlsbEdhcFRhcmdldCIsInNjcm9sbF9sb2NrX3JlbW92ZUZpbGxHYXBUYXJnZXQiLCJzY3JvbGxfbG9ja19hZGRGaWxsR2FwU2VsZWN0b3IiLCJzY3JvbGxfbG9ja19yZW1vdmVGaWxsR2FwU2VsZWN0b3IiLCJyZWZpbGxHYXBzIiwiX29iamVjdFNwcmVhZCIsIm93bktleXMiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHMiLCJzeW0iLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJfZGVmaW5lUHJvcGVydHkiLCJGSUxMX0dBUF9BVkFJTEFCTEVfTUVUSE9EUyIsIlRPVUNIX0RJUkVDVElPTl9ERVRFQ1RfT0ZGU0VUIiwic2Nyb2xsIiwic2Nyb2xsYWJsZVNlbGVjdG9ycyIsImxvY2thYmxlU2VsZWN0b3JzIiwiZmlsbEdhcFNlbGVjdG9ycyIsImZpbGxHYXBNZXRob2QiLCJzdGFydFRvdWNoWSIsInN0YXJ0VG91Y2hYIiwic2Nyb2xsX2xvY2tfaGlkZUxvY2thYmxlT3ZlcmZsb3ciLCJmaWxsR2FwcyIsInNjcm9sbF9sb2NrX3Nob3dMb2NrYWJsZU92ZXJmbG93IiwidW5maWxsR2FwcyIsImdldFRhcmdldFNjcm9sbEJhcldpZHRoIiwiJHRhcmdldCIsIm9ubHlFeGlzdHMiLCJjdXJyZW50T3ZlcmZsb3dZUHJvcGVydHkiLCJvdmVyZmxvd1kiLCJnZXRDdXJyZW50VGFyZ2V0U2Nyb2xsQmFyV2lkdGgiLCJkb2N1bWVudFdpZHRoIiwid2luZG93V2lkdGgiLCJjdXJyZW50V2lkdGgiLCJib3JkZXJMZWZ0V2lkdGhDdXJyZW50UHJvcGVydHkiLCJib3JkZXJMZWZ0V2lkdGgiLCJib3JkZXJSaWdodFdpZHRoQ3VycmVudFByb3BlcnR5IiwiYm9yZGVyUmlnaHRXaWR0aCIsIl9jdXJyZW50V2lkdGgiLCJhZGRTY3JvbGxhYmxlVGFyZ2V0IiwidGFyZ2V0cyIsIiR0YXJnZXRzIiwicmVtb3ZlU2Nyb2xsYWJsZVRhcmdldCIsInJlbW92ZUF0dHJpYnV0ZSIsImFkZFNjcm9sbGFibGVTZWxlY3RvciIsInNlbGVjdG9ycyIsInJlbW92ZVNjcm9sbGFibGVTZWxlY3RvciIsInNTZWxlY3RvciIsImFkZExvY2thYmxlVGFyZ2V0IiwiYWRkTG9ja2FibGVTZWxlY3RvciIsInNldEZpbGxHYXBNZXRob2QiLCJtZXRob2RzIiwiYWRkRmlsbEdhcFRhcmdldCIsInNjcm9sbF9sb2NrX2ZpbGxHYXBUYXJnZXQiLCJyZW1vdmVGaWxsR2FwVGFyZ2V0Iiwic2Nyb2xsX2xvY2tfdW5maWxsR2FwVGFyZ2V0IiwiYWRkRmlsbEdhcFNlbGVjdG9yIiwic2Nyb2xsX2xvY2tfZmlsbEdhcFNlbGVjdG9yIiwicmVtb3ZlRmlsbEdhcFNlbGVjdG9yIiwiZlNlbGVjdG9yIiwic2Nyb2xsX2xvY2tfdW5maWxsR2FwU2VsZWN0b3IiLCJoaWRlTG9ja2FibGVPdmVyZmxvdyIsInNjcm9sbF9sb2NrX2hpZGVMb2NrYWJsZU92ZXJmbG93U2VsZWN0b3IiLCJzaG93TG9ja2FibGVPdmVyZmxvdyIsInNjcm9sbF9sb2NrX3Nob3dMb2NrYWJsZU92ZXJmbG93U2VsZWN0b3IiLCJoaWRlTG9ja2FibGVPdmVyZmxvd1NlbGVjdG9yIiwic2Nyb2xsX2xvY2tfaGlkZUxvY2thYmxlT3ZlcmZsb3dUYXJnZXQiLCJzaG93TG9ja2FibGVPdmVyZmxvd1NlbGVjdG9yIiwic2Nyb2xsX2xvY2tfc2hvd0xvY2thYmxlT3ZlcmZsb3dUYXJnZXQiLCJoaWRlTG9ja2FibGVPdmVyZmxvd1RhcmdldCIsInNob3dMb2NrYWJsZU92ZXJmbG93VGFyZ2V0IiwiZmlsbEdhcFNlbGVjdG9yIiwiaXNMb2NrYWJsZSIsImZpbGxHYXBUYXJnZXQiLCJzY3JvbGxCYXJXaWR0aCIsIiRsb2NrYWJsZVBhcmVudCIsImN1cnJlbnRNYXJnaW4iLCJtYXJnaW5SaWdodCIsIm1heFdpZHRoIiwiY3VycmVudFBhZGRpbmciLCJwYWRkaW5nUmlnaHQiLCJ1bmZpbGxHYXBTZWxlY3RvciIsInVuZmlsbEdhcFRhcmdldCIsImN1cnJlbnRGaWxsR2FwTWV0aG9kIiwib25SZXNpemUiLCJvblRvdWNoU3RhcnQiLCJ0b3VjaGVzIiwiY2xpZW50WSIsImNsaWVudFgiLCJzY3JvbGxfbG9ja19vblRvdWNoTW92ZSIsIm9uVG91Y2hNb3ZlIiwiY3VycmVudENsaWVudFkiLCJjdXJyZW50Q2xpZW50WCIsImRpcmVjdGlvbiIsInVwIiwiZG93biIsImRpcmVjdGlvbldpdGhPZmZzZXQiLCJza2lwIiwicGFyZW50U2Nyb2xsYWJsZUVsIiwicHJldmVudCIsInByZXZlbnREZWZhdWx0Iiwib25Ub3VjaEVuZCIsInBhc3NpdmUiLCJkZXByZWNhdGVkTWV0aG9kcyIsImhpZGUiLCJzaG93IiwidG9nZ2xlIiwiZ2V0U3RhdGUiLCJnZXRDdXJyZW50V2lkdGgiLCJzZXRTY3JvbGxhYmxlVGFyZ2V0cyIsInNldEZpbGxHYXBTZWxlY3RvcnMiLCJzZXRGaWxsR2FwVGFyZ2V0cyIsImNsZWFyUXVldWUiLCJzY3JvbGxMb2NrIiwic2Nyb2xsX2xvY2siLCJnIiwiRnVuY3Rpb24iLCJCYXNlVGhlbWUiLCJtZWRpYVF1ZXJ5IiwibGF0ZXN0S25vd25TY3JvbGxZIiwibGFzdFNjcm9sbFRvcCIsImJhc2UiLCJpbml0U2Nyb2xsSGFuZGxlciIsImluaXRSZXNpemVIYW5kbGVyIiwidGljayIsInNjcm9sbFkiLCJzY3JvbGxEaXJlY3Rpb24iLCJzY3JvbGxFdmVudHMiLCJzY3JvbGxIYW5kbGVyIiwiZm9yTGFzdEV4ZWMiLCJ0aHJvdHRsZWQiLCJyZXNpemVFdmVudHMiLCJyZXNpemVIYW5kbGVyIiwiY3VycmVudFNjcm9sbFkiLCJGb3JtIiwiJCIsImZvY3VzIiwiYmx1ciIsImN2YWwiLCJ2YWwiLCJCdXJnZXIiLCJidXJnZXJUcmlnZ2VyIiwidHJpZ2dlclN0YXRlQ2hhbmdlIiwiZXZlbnRidXMiLCJCdXJnZXJUcmlnZ2VyU3RhdGUiLCJ0cmlnZ2VyIiwiQnVyZ2VyTWVudSIsIm1lbnVPcGVuIiwidG9nZ2xlU3RhdGVDaGFuZ2UiLCJjbG9zZU1lbnUiLCJUb3BOYXYiLCJzaHJpbmtCYXIiLCJoaWRlQmFyIiwiaXNT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Q3hFO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixRQUFRLHFCQUF1QixJQUFJLFVBQXNDLDJDQUFHO0FBQ3JHLG1CQUFtQixPQUFzQyw2QkFBQyxPQUFzQztBQUNoRyx1QkFBdUIsQ0FBc0MsS0FBQyxNQUFzQztBQUNwRyxDIiwiZmlsZSI6Im1haW4tYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogaHR0cHM6Ly9yYXcuZ2l0aHViLmNvbS9mYWNlYm9vay9yZWdlbmVyYXRvci9tYXN0ZXIvTElDRU5TRSBmaWxlLiBBblxuICogYWRkaXRpb25hbCBncmFudCBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluXG4gKiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKi9cblxuIShmdW5jdGlvbihnbG9iYWwpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgdmFyIGhhc093biA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG4gIHZhciB1bmRlZmluZWQ7IC8vIE1vcmUgY29tcHJlc3NpYmxlIHRoYW4gdm9pZCAwLlxuICB2YXIgaXRlcmF0b3JTeW1ib2wgPVxuICAgIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuaXRlcmF0b3IgfHwgXCJAQGl0ZXJhdG9yXCI7XG5cbiAgdmFyIGluTW9kdWxlID0gdHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIjtcbiAgdmFyIHJ1bnRpbWUgPSBnbG9iYWwucmVnZW5lcmF0b3JSdW50aW1lO1xuICBpZiAocnVudGltZSkge1xuICAgIGlmIChpbk1vZHVsZSkge1xuICAgICAgLy8gSWYgcmVnZW5lcmF0b3JSdW50aW1lIGlzIGRlZmluZWQgZ2xvYmFsbHkgYW5kIHdlJ3JlIGluIGEgbW9kdWxlLFxuICAgICAgLy8gbWFrZSB0aGUgZXhwb3J0cyBvYmplY3QgaWRlbnRpY2FsIHRvIHJlZ2VuZXJhdG9yUnVudGltZS5cbiAgICAgIG1vZHVsZS5leHBvcnRzID0gcnVudGltZTtcbiAgICB9XG4gICAgLy8gRG9uJ3QgYm90aGVyIGV2YWx1YXRpbmcgdGhlIHJlc3Qgb2YgdGhpcyBmaWxlIGlmIHRoZSBydW50aW1lIHdhc1xuICAgIC8vIGFscmVhZHkgZGVmaW5lZCBnbG9iYWxseS5cbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBEZWZpbmUgdGhlIHJ1bnRpbWUgZ2xvYmFsbHkgKGFzIGV4cGVjdGVkIGJ5IGdlbmVyYXRlZCBjb2RlKSBhcyBlaXRoZXJcbiAgLy8gbW9kdWxlLmV4cG9ydHMgKGlmIHdlJ3JlIGluIGEgbW9kdWxlKSBvciBhIG5ldywgZW1wdHkgb2JqZWN0LlxuICBydW50aW1lID0gZ2xvYmFsLnJlZ2VuZXJhdG9yUnVudGltZSA9IGluTW9kdWxlID8gbW9kdWxlLmV4cG9ydHMgOiB7fTtcblxuICBmdW5jdGlvbiB3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSB7XG4gICAgLy8gSWYgb3V0ZXJGbiBwcm92aWRlZCwgdGhlbiBvdXRlckZuLnByb3RvdHlwZSBpbnN0YW5jZW9mIEdlbmVyYXRvci5cbiAgICB2YXIgZ2VuZXJhdG9yID0gT2JqZWN0LmNyZWF0ZSgob3V0ZXJGbiB8fCBHZW5lcmF0b3IpLnByb3RvdHlwZSk7XG4gICAgdmFyIGNvbnRleHQgPSBuZXcgQ29udGV4dCh0cnlMb2NzTGlzdCB8fCBbXSk7XG5cbiAgICAvLyBUaGUgLl9pbnZva2UgbWV0aG9kIHVuaWZpZXMgdGhlIGltcGxlbWVudGF0aW9ucyBvZiB0aGUgLm5leHQsXG4gICAgLy8gLnRocm93LCBhbmQgLnJldHVybiBtZXRob2RzLlxuICAgIGdlbmVyYXRvci5faW52b2tlID0gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KTtcblxuICAgIHJldHVybiBnZW5lcmF0b3I7XG4gIH1cbiAgcnVudGltZS53cmFwID0gd3JhcDtcblxuICAvLyBUcnkvY2F0Y2ggaGVscGVyIHRvIG1pbmltaXplIGRlb3B0aW1pemF0aW9ucy4gUmV0dXJucyBhIGNvbXBsZXRpb25cbiAgLy8gcmVjb3JkIGxpa2UgY29udGV4dC50cnlFbnRyaWVzW2ldLmNvbXBsZXRpb24uIFRoaXMgaW50ZXJmYWNlIGNvdWxkXG4gIC8vIGhhdmUgYmVlbiAoYW5kIHdhcyBwcmV2aW91c2x5KSBkZXNpZ25lZCB0byB0YWtlIGEgY2xvc3VyZSB0byBiZVxuICAvLyBpbnZva2VkIHdpdGhvdXQgYXJndW1lbnRzLCBidXQgaW4gYWxsIHRoZSBjYXNlcyB3ZSBjYXJlIGFib3V0IHdlXG4gIC8vIGFscmVhZHkgaGF2ZSBhbiBleGlzdGluZyBtZXRob2Qgd2Ugd2FudCB0byBjYWxsLCBzbyB0aGVyZSdzIG5vIG5lZWRcbiAgLy8gdG8gY3JlYXRlIGEgbmV3IGZ1bmN0aW9uIG9iamVjdC4gV2UgY2FuIGV2ZW4gZ2V0IGF3YXkgd2l0aCBhc3N1bWluZ1xuICAvLyB0aGUgbWV0aG9kIHRha2VzIGV4YWN0bHkgb25lIGFyZ3VtZW50LCBzaW5jZSB0aGF0IGhhcHBlbnMgdG8gYmUgdHJ1ZVxuICAvLyBpbiBldmVyeSBjYXNlLCBzbyB3ZSBkb24ndCBoYXZlIHRvIHRvdWNoIHRoZSBhcmd1bWVudHMgb2JqZWN0LiBUaGVcbiAgLy8gb25seSBhZGRpdGlvbmFsIGFsbG9jYXRpb24gcmVxdWlyZWQgaXMgdGhlIGNvbXBsZXRpb24gcmVjb3JkLCB3aGljaFxuICAvLyBoYXMgYSBzdGFibGUgc2hhcGUgYW5kIHNvIGhvcGVmdWxseSBzaG91bGQgYmUgY2hlYXAgdG8gYWxsb2NhdGUuXG4gIGZ1bmN0aW9uIHRyeUNhdGNoKGZuLCBvYmosIGFyZykge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBcIm5vcm1hbFwiLCBhcmc6IGZuLmNhbGwob2JqLCBhcmcpIH07XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBcInRocm93XCIsIGFyZzogZXJyIH07XG4gICAgfVxuICB9XG5cbiAgdmFyIEdlblN0YXRlU3VzcGVuZGVkU3RhcnQgPSBcInN1c3BlbmRlZFN0YXJ0XCI7XG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkID0gXCJzdXNwZW5kZWRZaWVsZFwiO1xuICB2YXIgR2VuU3RhdGVFeGVjdXRpbmcgPSBcImV4ZWN1dGluZ1wiO1xuICB2YXIgR2VuU3RhdGVDb21wbGV0ZWQgPSBcImNvbXBsZXRlZFwiO1xuXG4gIC8vIFJldHVybmluZyB0aGlzIG9iamVjdCBmcm9tIHRoZSBpbm5lckZuIGhhcyB0aGUgc2FtZSBlZmZlY3QgYXNcbiAgLy8gYnJlYWtpbmcgb3V0IG9mIHRoZSBkaXNwYXRjaCBzd2l0Y2ggc3RhdGVtZW50LlxuICB2YXIgQ29udGludWVTZW50aW5lbCA9IHt9O1xuXG4gIC8vIER1bW15IGNvbnN0cnVjdG9yIGZ1bmN0aW9ucyB0aGF0IHdlIHVzZSBhcyB0aGUgLmNvbnN0cnVjdG9yIGFuZFxuICAvLyAuY29uc3RydWN0b3IucHJvdG90eXBlIHByb3BlcnRpZXMgZm9yIGZ1bmN0aW9ucyB0aGF0IHJldHVybiBHZW5lcmF0b3JcbiAgLy8gb2JqZWN0cy4gRm9yIGZ1bGwgc3BlYyBjb21wbGlhbmNlLCB5b3UgbWF5IHdpc2ggdG8gY29uZmlndXJlIHlvdXJcbiAgLy8gbWluaWZpZXIgbm90IHRvIG1hbmdsZSB0aGUgbmFtZXMgb2YgdGhlc2UgdHdvIGZ1bmN0aW9ucy5cbiAgZnVuY3Rpb24gR2VuZXJhdG9yKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb24oKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSgpIHt9XG5cbiAgdmFyIEdwID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUucHJvdG90eXBlID0gR2VuZXJhdG9yLnByb3RvdHlwZTtcbiAgR2VuZXJhdG9yRnVuY3Rpb24ucHJvdG90eXBlID0gR3AuY29uc3RydWN0b3IgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUuY29uc3RydWN0b3IgPSBHZW5lcmF0b3JGdW5jdGlvbjtcbiAgR2VuZXJhdG9yRnVuY3Rpb24uZGlzcGxheU5hbWUgPSBcIkdlbmVyYXRvckZ1bmN0aW9uXCI7XG5cbiAgLy8gSGVscGVyIGZvciBkZWZpbmluZyB0aGUgLm5leHQsIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcyBvZiB0aGVcbiAgLy8gSXRlcmF0b3IgaW50ZXJmYWNlIGluIHRlcm1zIG9mIGEgc2luZ2xlIC5faW52b2tlIG1ldGhvZC5cbiAgZnVuY3Rpb24gZGVmaW5lSXRlcmF0b3JNZXRob2RzKHByb3RvdHlwZSkge1xuICAgIFtcIm5leHRcIiwgXCJ0aHJvd1wiLCBcInJldHVyblwiXS5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgICAgcHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbihhcmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ludm9rZShtZXRob2QsIGFyZyk7XG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgcnVudGltZS5pc0dlbmVyYXRvckZ1bmN0aW9uID0gZnVuY3Rpb24oZ2VuRnVuKSB7XG4gICAgdmFyIGN0b3IgPSB0eXBlb2YgZ2VuRnVuID09PSBcImZ1bmN0aW9uXCIgJiYgZ2VuRnVuLmNvbnN0cnVjdG9yO1xuICAgIHJldHVybiBjdG9yXG4gICAgICA/IGN0b3IgPT09IEdlbmVyYXRvckZ1bmN0aW9uIHx8XG4gICAgICAgIC8vIEZvciB0aGUgbmF0aXZlIEdlbmVyYXRvckZ1bmN0aW9uIGNvbnN0cnVjdG9yLCB0aGUgYmVzdCB3ZSBjYW5cbiAgICAgICAgLy8gZG8gaXMgdG8gY2hlY2sgaXRzIC5uYW1lIHByb3BlcnR5LlxuICAgICAgICAoY3Rvci5kaXNwbGF5TmFtZSB8fCBjdG9yLm5hbWUpID09PSBcIkdlbmVyYXRvckZ1bmN0aW9uXCJcbiAgICAgIDogZmFsc2U7XG4gIH07XG5cbiAgcnVudGltZS5tYXJrID0gZnVuY3Rpb24oZ2VuRnVuKSB7XG4gICAgaWYgKE9iamVjdC5zZXRQcm90b3R5cGVPZikge1xuICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKGdlbkZ1biwgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBnZW5GdW4uX19wcm90b19fID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGU7XG4gICAgfVxuICAgIGdlbkZ1bi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEdwKTtcbiAgICByZXR1cm4gZ2VuRnVuO1xuICB9O1xuXG4gIC8vIFdpdGhpbiB0aGUgYm9keSBvZiBhbnkgYXN5bmMgZnVuY3Rpb24sIGBhd2FpdCB4YCBpcyB0cmFuc2Zvcm1lZCB0b1xuICAvLyBgeWllbGQgcmVnZW5lcmF0b3JSdW50aW1lLmF3cmFwKHgpYCwgc28gdGhhdCB0aGUgcnVudGltZSBjYW4gdGVzdFxuICAvLyBgdmFsdWUgaW5zdGFuY2VvZiBBd2FpdEFyZ3VtZW50YCB0byBkZXRlcm1pbmUgaWYgdGhlIHlpZWxkZWQgdmFsdWUgaXNcbiAgLy8gbWVhbnQgdG8gYmUgYXdhaXRlZC4gU29tZSBtYXkgY29uc2lkZXIgdGhlIG5hbWUgb2YgdGhpcyBtZXRob2QgdG9vXG4gIC8vIGN1dGVzeSwgYnV0IHRoZXkgYXJlIGN1cm11ZGdlb25zLlxuICBydW50aW1lLmF3cmFwID0gZnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIG5ldyBBd2FpdEFyZ3VtZW50KGFyZyk7XG4gIH07XG5cbiAgZnVuY3Rpb24gQXdhaXRBcmd1bWVudChhcmcpIHtcbiAgICB0aGlzLmFyZyA9IGFyZztcbiAgfVxuXG4gIGZ1bmN0aW9uIEFzeW5jSXRlcmF0b3IoZ2VuZXJhdG9yKSB7XG4gICAgLy8gVGhpcyBpbnZva2UgZnVuY3Rpb24gaXMgd3JpdHRlbiBpbiBhIHN0eWxlIHRoYXQgYXNzdW1lcyBzb21lXG4gICAgLy8gY2FsbGluZyBmdW5jdGlvbiAob3IgUHJvbWlzZSkgd2lsbCBoYW5kbGUgZXhjZXB0aW9ucy5cbiAgICBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcpIHtcbiAgICAgIHZhciByZXN1bHQgPSBnZW5lcmF0b3JbbWV0aG9kXShhcmcpO1xuICAgICAgdmFyIHZhbHVlID0gcmVzdWx0LnZhbHVlO1xuICAgICAgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgQXdhaXRBcmd1bWVudFxuICAgICAgICA/IFByb21pc2UucmVzb2x2ZSh2YWx1ZS5hcmcpLnRoZW4oaW52b2tlTmV4dCwgaW52b2tlVGhyb3cpXG4gICAgICAgIDogUHJvbWlzZS5yZXNvbHZlKHZhbHVlKS50aGVuKGZ1bmN0aW9uKHVud3JhcHBlZCkge1xuICAgICAgICAgICAgLy8gV2hlbiBhIHlpZWxkZWQgUHJvbWlzZSBpcyByZXNvbHZlZCwgaXRzIGZpbmFsIHZhbHVlIGJlY29tZXNcbiAgICAgICAgICAgIC8vIHRoZSAudmFsdWUgb2YgdGhlIFByb21pc2U8e3ZhbHVlLGRvbmV9PiByZXN1bHQgZm9yIHRoZVxuICAgICAgICAgICAgLy8gY3VycmVudCBpdGVyYXRpb24uIElmIHRoZSBQcm9taXNlIGlzIHJlamVjdGVkLCBob3dldmVyLCB0aGVcbiAgICAgICAgICAgIC8vIHJlc3VsdCBmb3IgdGhpcyBpdGVyYXRpb24gd2lsbCBiZSByZWplY3RlZCB3aXRoIHRoZSBzYW1lXG4gICAgICAgICAgICAvLyByZWFzb24uIE5vdGUgdGhhdCByZWplY3Rpb25zIG9mIHlpZWxkZWQgUHJvbWlzZXMgYXJlIG5vdFxuICAgICAgICAgICAgLy8gdGhyb3duIGJhY2sgaW50byB0aGUgZ2VuZXJhdG9yIGZ1bmN0aW9uLCBhcyBpcyB0aGUgY2FzZVxuICAgICAgICAgICAgLy8gd2hlbiBhbiBhd2FpdGVkIFByb21pc2UgaXMgcmVqZWN0ZWQuIFRoaXMgZGlmZmVyZW5jZSBpblxuICAgICAgICAgICAgLy8gYmVoYXZpb3IgYmV0d2VlbiB5aWVsZCBhbmQgYXdhaXQgaXMgaW1wb3J0YW50LCBiZWNhdXNlIGl0XG4gICAgICAgICAgICAvLyBhbGxvd3MgdGhlIGNvbnN1bWVyIHRvIGRlY2lkZSB3aGF0IHRvIGRvIHdpdGggdGhlIHlpZWxkZWRcbiAgICAgICAgICAgIC8vIHJlamVjdGlvbiAoc3dhbGxvdyBpdCBhbmQgY29udGludWUsIG1hbnVhbGx5IC50aHJvdyBpdCBiYWNrXG4gICAgICAgICAgICAvLyBpbnRvIHRoZSBnZW5lcmF0b3IsIGFiYW5kb24gaXRlcmF0aW9uLCB3aGF0ZXZlcikuIFdpdGhcbiAgICAgICAgICAgIC8vIGF3YWl0LCBieSBjb250cmFzdCwgdGhlcmUgaXMgbm8gb3Bwb3J0dW5pdHkgdG8gZXhhbWluZSB0aGVcbiAgICAgICAgICAgIC8vIHJlamVjdGlvbiByZWFzb24gb3V0c2lkZSB0aGUgZ2VuZXJhdG9yIGZ1bmN0aW9uLCBzbyB0aGVcbiAgICAgICAgICAgIC8vIG9ubHkgb3B0aW9uIGlzIHRvIHRocm93IGl0IGZyb20gdGhlIGF3YWl0IGV4cHJlc3Npb24sIGFuZFxuICAgICAgICAgICAgLy8gbGV0IHRoZSBnZW5lcmF0b3IgZnVuY3Rpb24gaGFuZGxlIHRoZSBleGNlcHRpb24uXG4gICAgICAgICAgICByZXN1bHQudmFsdWUgPSB1bndyYXBwZWQ7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgcHJvY2VzcyA9PT0gXCJvYmplY3RcIiAmJiBwcm9jZXNzLmRvbWFpbikge1xuICAgICAgaW52b2tlID0gcHJvY2Vzcy5kb21haW4uYmluZChpbnZva2UpO1xuICAgIH1cblxuICAgIHZhciBpbnZva2VOZXh0ID0gaW52b2tlLmJpbmQoZ2VuZXJhdG9yLCBcIm5leHRcIik7XG4gICAgdmFyIGludm9rZVRocm93ID0gaW52b2tlLmJpbmQoZ2VuZXJhdG9yLCBcInRocm93XCIpO1xuICAgIHZhciBpbnZva2VSZXR1cm4gPSBpbnZva2UuYmluZChnZW5lcmF0b3IsIFwicmV0dXJuXCIpO1xuICAgIHZhciBwcmV2aW91c1Byb21pc2U7XG5cbiAgICBmdW5jdGlvbiBlbnF1ZXVlKG1ldGhvZCwgYXJnKSB7XG4gICAgICBmdW5jdGlvbiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpIHtcbiAgICAgICAgcmV0dXJuIGludm9rZShtZXRob2QsIGFyZyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwcmV2aW91c1Byb21pc2UgPVxuICAgICAgICAvLyBJZiBlbnF1ZXVlIGhhcyBiZWVuIGNhbGxlZCBiZWZvcmUsIHRoZW4gd2Ugd2FudCB0byB3YWl0IHVudGlsXG4gICAgICAgIC8vIGFsbCBwcmV2aW91cyBQcm9taXNlcyBoYXZlIGJlZW4gcmVzb2x2ZWQgYmVmb3JlIGNhbGxpbmcgaW52b2tlLFxuICAgICAgICAvLyBzbyB0aGF0IHJlc3VsdHMgYXJlIGFsd2F5cyBkZWxpdmVyZWQgaW4gdGhlIGNvcnJlY3Qgb3JkZXIuIElmXG4gICAgICAgIC8vIGVucXVldWUgaGFzIG5vdCBiZWVuIGNhbGxlZCBiZWZvcmUsIHRoZW4gaXQgaXMgaW1wb3J0YW50IHRvXG4gICAgICAgIC8vIGNhbGwgaW52b2tlIGltbWVkaWF0ZWx5LCB3aXRob3V0IHdhaXRpbmcgb24gYSBjYWxsYmFjayB0byBmaXJlLFxuICAgICAgICAvLyBzbyB0aGF0IHRoZSBhc3luYyBnZW5lcmF0b3IgZnVuY3Rpb24gaGFzIHRoZSBvcHBvcnR1bml0eSB0byBkb1xuICAgICAgICAvLyBhbnkgbmVjZXNzYXJ5IHNldHVwIGluIGEgcHJlZGljdGFibGUgd2F5LiBUaGlzIHByZWRpY3RhYmlsaXR5XG4gICAgICAgIC8vIGlzIHdoeSB0aGUgUHJvbWlzZSBjb25zdHJ1Y3RvciBzeW5jaHJvbm91c2x5IGludm9rZXMgaXRzXG4gICAgICAgIC8vIGV4ZWN1dG9yIGNhbGxiYWNrLCBhbmQgd2h5IGFzeW5jIGZ1bmN0aW9ucyBzeW5jaHJvbm91c2x5XG4gICAgICAgIC8vIGV4ZWN1dGUgY29kZSBiZWZvcmUgdGhlIGZpcnN0IGF3YWl0LiBTaW5jZSB3ZSBpbXBsZW1lbnQgc2ltcGxlXG4gICAgICAgIC8vIGFzeW5jIGZ1bmN0aW9ucyBpbiB0ZXJtcyBvZiBhc3luYyBnZW5lcmF0b3JzLCBpdCBpcyBlc3BlY2lhbGx5XG4gICAgICAgIC8vIGltcG9ydGFudCB0byBnZXQgdGhpcyByaWdodCwgZXZlbiB0aG91Z2ggaXQgcmVxdWlyZXMgY2FyZS5cbiAgICAgICAgcHJldmlvdXNQcm9taXNlID8gcHJldmlvdXNQcm9taXNlLnRoZW4oXG4gICAgICAgICAgY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcsXG4gICAgICAgICAgLy8gQXZvaWQgcHJvcGFnYXRpbmcgZmFpbHVyZXMgdG8gUHJvbWlzZXMgcmV0dXJuZWQgYnkgbGF0ZXJcbiAgICAgICAgICAvLyBpbnZvY2F0aW9ucyBvZiB0aGUgaXRlcmF0b3IuXG4gICAgICAgICAgY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmdcbiAgICAgICAgKSA6IG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG4gICAgICAgICAgcmVzb2x2ZShjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gRGVmaW5lIHRoZSB1bmlmaWVkIGhlbHBlciBtZXRob2QgdGhhdCBpcyB1c2VkIHRvIGltcGxlbWVudCAubmV4dCxcbiAgICAvLyAudGhyb3csIGFuZCAucmV0dXJuIChzZWUgZGVmaW5lSXRlcmF0b3JNZXRob2RzKS5cbiAgICB0aGlzLl9pbnZva2UgPSBlbnF1ZXVlO1xuICB9XG5cbiAgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEFzeW5jSXRlcmF0b3IucHJvdG90eXBlKTtcblxuICAvLyBOb3RlIHRoYXQgc2ltcGxlIGFzeW5jIGZ1bmN0aW9ucyBhcmUgaW1wbGVtZW50ZWQgb24gdG9wIG9mXG4gIC8vIEFzeW5jSXRlcmF0b3Igb2JqZWN0czsgdGhleSBqdXN0IHJldHVybiBhIFByb21pc2UgZm9yIHRoZSB2YWx1ZSBvZlxuICAvLyB0aGUgZmluYWwgcmVzdWx0IHByb2R1Y2VkIGJ5IHRoZSBpdGVyYXRvci5cbiAgcnVudGltZS5hc3luYyA9IGZ1bmN0aW9uKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSB7XG4gICAgdmFyIGl0ZXIgPSBuZXcgQXN5bmNJdGVyYXRvcihcbiAgICAgIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpXG4gICAgKTtcblxuICAgIHJldHVybiBydW50aW1lLmlzR2VuZXJhdG9yRnVuY3Rpb24ob3V0ZXJGbilcbiAgICAgID8gaXRlciAvLyBJZiBvdXRlckZuIGlzIGEgZ2VuZXJhdG9yLCByZXR1cm4gdGhlIGZ1bGwgaXRlcmF0b3IuXG4gICAgICA6IGl0ZXIubmV4dCgpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdC5kb25lID8gcmVzdWx0LnZhbHVlIDogaXRlci5uZXh0KCk7XG4gICAgICAgIH0pO1xuICB9O1xuXG4gIGZ1bmN0aW9uIG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCkge1xuICAgIHZhciBzdGF0ZSA9IEdlblN0YXRlU3VzcGVuZGVkU3RhcnQ7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnKSB7XG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlRXhlY3V0aW5nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IHJ1bm5pbmdcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVDb21wbGV0ZWQpIHtcbiAgICAgICAgaWYgKG1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgdGhyb3cgYXJnO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQmUgZm9yZ2l2aW5nLCBwZXIgMjUuMy4zLjMuMyBvZiB0aGUgc3BlYzpcbiAgICAgICAgLy8gaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLWdlbmVyYXRvcnJlc3VtZVxuICAgICAgICByZXR1cm4gZG9uZVJlc3VsdCgpO1xuICAgICAgfVxuXG4gICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICB2YXIgZGVsZWdhdGUgPSBjb250ZXh0LmRlbGVnYXRlO1xuICAgICAgICBpZiAoZGVsZWdhdGUpIHtcbiAgICAgICAgICBpZiAobWV0aG9kID09PSBcInJldHVyblwiIHx8XG4gICAgICAgICAgICAgIChtZXRob2QgPT09IFwidGhyb3dcIiAmJiBkZWxlZ2F0ZS5pdGVyYXRvclttZXRob2RdID09PSB1bmRlZmluZWQpKSB7XG4gICAgICAgICAgICAvLyBBIHJldHVybiBvciB0aHJvdyAod2hlbiB0aGUgZGVsZWdhdGUgaXRlcmF0b3IgaGFzIG5vIHRocm93XG4gICAgICAgICAgICAvLyBtZXRob2QpIGFsd2F5cyB0ZXJtaW5hdGVzIHRoZSB5aWVsZCogbG9vcC5cbiAgICAgICAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuXG4gICAgICAgICAgICAvLyBJZiB0aGUgZGVsZWdhdGUgaXRlcmF0b3IgaGFzIGEgcmV0dXJuIG1ldGhvZCwgZ2l2ZSBpdCBhXG4gICAgICAgICAgICAvLyBjaGFuY2UgdG8gY2xlYW4gdXAuXG4gICAgICAgICAgICB2YXIgcmV0dXJuTWV0aG9kID0gZGVsZWdhdGUuaXRlcmF0b3JbXCJyZXR1cm5cIl07XG4gICAgICAgICAgICBpZiAocmV0dXJuTWV0aG9kKSB7XG4gICAgICAgICAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChyZXR1cm5NZXRob2QsIGRlbGVnYXRlLml0ZXJhdG9yLCBhcmcpO1xuICAgICAgICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgICAgICAgIC8vIElmIHRoZSByZXR1cm4gbWV0aG9kIHRocmV3IGFuIGV4Y2VwdGlvbiwgbGV0IHRoYXRcbiAgICAgICAgICAgICAgICAvLyBleGNlcHRpb24gcHJldmFpbCBvdmVyIHRoZSBvcmlnaW5hbCByZXR1cm4gb3IgdGhyb3cuXG4gICAgICAgICAgICAgICAgbWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICAgICAgICAgIGFyZyA9IHJlY29yZC5hcmc7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG1ldGhvZCA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICAgICAgICAvLyBDb250aW51ZSB3aXRoIHRoZSBvdXRlciByZXR1cm4sIG5vdyB0aGF0IHRoZSBkZWxlZ2F0ZVxuICAgICAgICAgICAgICAvLyBpdGVyYXRvciBoYXMgYmVlbiB0ZXJtaW5hdGVkLlxuICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goXG4gICAgICAgICAgICBkZWxlZ2F0ZS5pdGVyYXRvclttZXRob2RdLFxuICAgICAgICAgICAgZGVsZWdhdGUuaXRlcmF0b3IsXG4gICAgICAgICAgICBhcmdcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuXG4gICAgICAgICAgICAvLyBMaWtlIHJldHVybmluZyBnZW5lcmF0b3IudGhyb3codW5jYXVnaHQpLCBidXQgd2l0aG91dCB0aGVcbiAgICAgICAgICAgIC8vIG92ZXJoZWFkIG9mIGFuIGV4dHJhIGZ1bmN0aW9uIGNhbGwuXG4gICAgICAgICAgICBtZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgICAgICBhcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gRGVsZWdhdGUgZ2VuZXJhdG9yIHJhbiBhbmQgaGFuZGxlZCBpdHMgb3duIGV4Y2VwdGlvbnMgc29cbiAgICAgICAgICAvLyByZWdhcmRsZXNzIG9mIHdoYXQgdGhlIG1ldGhvZCB3YXMsIHdlIGNvbnRpbnVlIGFzIGlmIGl0IGlzXG4gICAgICAgICAgLy8gXCJuZXh0XCIgd2l0aCBhbiB1bmRlZmluZWQgYXJnLlxuICAgICAgICAgIG1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICAgIGFyZyA9IHVuZGVmaW5lZDtcblxuICAgICAgICAgIHZhciBpbmZvID0gcmVjb3JkLmFyZztcbiAgICAgICAgICBpZiAoaW5mby5kb25lKSB7XG4gICAgICAgICAgICBjb250ZXh0W2RlbGVnYXRlLnJlc3VsdE5hbWVdID0gaW5mby52YWx1ZTtcbiAgICAgICAgICAgIGNvbnRleHQubmV4dCA9IGRlbGVnYXRlLm5leHRMb2M7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVTdXNwZW5kZWRZaWVsZDtcbiAgICAgICAgICAgIHJldHVybiBpbmZvO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgICBjb250ZXh0Ll9zZW50ID0gYXJnO1xuXG4gICAgICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkKSB7XG4gICAgICAgICAgICBjb250ZXh0LnNlbnQgPSBhcmc7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnRleHQuc2VudCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAobWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlU3VzcGVuZGVkU3RhcnQpIHtcbiAgICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7XG4gICAgICAgICAgICB0aHJvdyBhcmc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGNvbnRleHQuZGlzcGF0Y2hFeGNlcHRpb24oYXJnKSkge1xuICAgICAgICAgICAgLy8gSWYgdGhlIGRpc3BhdGNoZWQgZXhjZXB0aW9uIHdhcyBjYXVnaHQgYnkgYSBjYXRjaCBibG9jayxcbiAgICAgICAgICAgIC8vIHRoZW4gbGV0IHRoYXQgY2F0Y2ggYmxvY2sgaGFuZGxlIHRoZSBleGNlcHRpb24gbm9ybWFsbHkuXG4gICAgICAgICAgICBtZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgICAgIGFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIGlmIChtZXRob2QgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgICBjb250ZXh0LmFicnVwdChcInJldHVyblwiLCBhcmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUV4ZWN1dGluZztcblxuICAgICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG4gICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIikge1xuICAgICAgICAgIC8vIElmIGFuIGV4Y2VwdGlvbiBpcyB0aHJvd24gZnJvbSBpbm5lckZuLCB3ZSBsZWF2ZSBzdGF0ZSA9PT1cbiAgICAgICAgICAvLyBHZW5TdGF0ZUV4ZWN1dGluZyBhbmQgbG9vcCBiYWNrIGZvciBhbm90aGVyIGludm9jYXRpb24uXG4gICAgICAgICAgc3RhdGUgPSBjb250ZXh0LmRvbmVcbiAgICAgICAgICAgID8gR2VuU3RhdGVDb21wbGV0ZWRcbiAgICAgICAgICAgIDogR2VuU3RhdGVTdXNwZW5kZWRZaWVsZDtcblxuICAgICAgICAgIHZhciBpbmZvID0ge1xuICAgICAgICAgICAgdmFsdWU6IHJlY29yZC5hcmcsXG4gICAgICAgICAgICBkb25lOiBjb250ZXh0LmRvbmVcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgaWYgKHJlY29yZC5hcmcgPT09IENvbnRpbnVlU2VudGluZWwpIHtcbiAgICAgICAgICAgIGlmIChjb250ZXh0LmRlbGVnYXRlICYmIG1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgICAgICAgLy8gRGVsaWJlcmF0ZWx5IGZvcmdldCB0aGUgbGFzdCBzZW50IHZhbHVlIHNvIHRoYXQgd2UgZG9uJ3RcbiAgICAgICAgICAgICAgLy8gYWNjaWRlbnRhbGx5IHBhc3MgaXQgb24gdG8gdGhlIGRlbGVnYXRlLlxuICAgICAgICAgICAgICBhcmcgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBpbmZvO1xuICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgIC8vIERpc3BhdGNoIHRoZSBleGNlcHRpb24gYnkgbG9vcGluZyBiYWNrIGFyb3VuZCB0byB0aGVcbiAgICAgICAgICAvLyBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGFyZykgY2FsbCBhYm92ZS5cbiAgICAgICAgICBtZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgICAgYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvLyBEZWZpbmUgR2VuZXJhdG9yLnByb3RvdHlwZS57bmV4dCx0aHJvdyxyZXR1cm59IGluIHRlcm1zIG9mIHRoZVxuICAvLyB1bmlmaWVkIC5faW52b2tlIGhlbHBlciBtZXRob2QuXG4gIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhHcCk7XG5cbiAgR3BbaXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgR3AudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gXCJbb2JqZWN0IEdlbmVyYXRvcl1cIjtcbiAgfTtcblxuICBmdW5jdGlvbiBwdXNoVHJ5RW50cnkobG9jcykge1xuICAgIHZhciBlbnRyeSA9IHsgdHJ5TG9jOiBsb2NzWzBdIH07XG5cbiAgICBpZiAoMSBpbiBsb2NzKSB7XG4gICAgICBlbnRyeS5jYXRjaExvYyA9IGxvY3NbMV07XG4gICAgfVxuXG4gICAgaWYgKDIgaW4gbG9jcykge1xuICAgICAgZW50cnkuZmluYWxseUxvYyA9IGxvY3NbMl07XG4gICAgICBlbnRyeS5hZnRlckxvYyA9IGxvY3NbM107XG4gICAgfVxuXG4gICAgdGhpcy50cnlFbnRyaWVzLnB1c2goZW50cnkpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVzZXRUcnlFbnRyeShlbnRyeSkge1xuICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uIHx8IHt9O1xuICAgIHJlY29yZC50eXBlID0gXCJub3JtYWxcIjtcbiAgICBkZWxldGUgcmVjb3JkLmFyZztcbiAgICBlbnRyeS5jb21wbGV0aW9uID0gcmVjb3JkO1xuICB9XG5cbiAgZnVuY3Rpb24gQ29udGV4dCh0cnlMb2NzTGlzdCkge1xuICAgIC8vIFRoZSByb290IGVudHJ5IG9iamVjdCAoZWZmZWN0aXZlbHkgYSB0cnkgc3RhdGVtZW50IHdpdGhvdXQgYSBjYXRjaFxuICAgIC8vIG9yIGEgZmluYWxseSBibG9jaykgZ2l2ZXMgdXMgYSBwbGFjZSB0byBzdG9yZSB2YWx1ZXMgdGhyb3duIGZyb21cbiAgICAvLyBsb2NhdGlvbnMgd2hlcmUgdGhlcmUgaXMgbm8gZW5jbG9zaW5nIHRyeSBzdGF0ZW1lbnQuXG4gICAgdGhpcy50cnlFbnRyaWVzID0gW3sgdHJ5TG9jOiBcInJvb3RcIiB9XTtcbiAgICB0cnlMb2NzTGlzdC5mb3JFYWNoKHB1c2hUcnlFbnRyeSwgdGhpcyk7XG4gICAgdGhpcy5yZXNldCh0cnVlKTtcbiAgfVxuXG4gIHJ1bnRpbWUua2V5cyA9IGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHZhciBrZXlzID0gW107XG4gICAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgfVxuICAgIGtleXMucmV2ZXJzZSgpO1xuXG4gICAgLy8gUmF0aGVyIHRoYW4gcmV0dXJuaW5nIGFuIG9iamVjdCB3aXRoIGEgbmV4dCBtZXRob2QsIHdlIGtlZXBcbiAgICAvLyB0aGluZ3Mgc2ltcGxlIGFuZCByZXR1cm4gdGhlIG5leHQgZnVuY3Rpb24gaXRzZWxmLlxuICAgIHJldHVybiBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgd2hpbGUgKGtleXMubGVuZ3RoKSB7XG4gICAgICAgIHZhciBrZXkgPSBrZXlzLnBvcCgpO1xuICAgICAgICBpZiAoa2V5IGluIG9iamVjdCkge1xuICAgICAgICAgIG5leHQudmFsdWUgPSBrZXk7XG4gICAgICAgICAgbmV4dC5kb25lID0gZmFsc2U7XG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVG8gYXZvaWQgY3JlYXRpbmcgYW4gYWRkaXRpb25hbCBvYmplY3QsIHdlIGp1c3QgaGFuZyB0aGUgLnZhbHVlXG4gICAgICAvLyBhbmQgLmRvbmUgcHJvcGVydGllcyBvZmYgdGhlIG5leHQgZnVuY3Rpb24gb2JqZWN0IGl0c2VsZi4gVGhpc1xuICAgICAgLy8gYWxzbyBlbnN1cmVzIHRoYXQgdGhlIG1pbmlmaWVyIHdpbGwgbm90IGFub255bWl6ZSB0aGUgZnVuY3Rpb24uXG4gICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuICAgICAgcmV0dXJuIG5leHQ7XG4gICAgfTtcbiAgfTtcblxuICBmdW5jdGlvbiB2YWx1ZXMoaXRlcmFibGUpIHtcbiAgICBpZiAoaXRlcmFibGUpIHtcbiAgICAgIHZhciBpdGVyYXRvck1ldGhvZCA9IGl0ZXJhYmxlW2l0ZXJhdG9yU3ltYm9sXTtcbiAgICAgIGlmIChpdGVyYXRvck1ldGhvZCkge1xuICAgICAgICByZXR1cm4gaXRlcmF0b3JNZXRob2QuY2FsbChpdGVyYWJsZSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgaXRlcmFibGUubmV4dCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHJldHVybiBpdGVyYWJsZTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFpc05hTihpdGVyYWJsZS5sZW5ndGgpKSB7XG4gICAgICAgIHZhciBpID0gLTEsIG5leHQgPSBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgICAgIHdoaWxlICgrK2kgPCBpdGVyYWJsZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChoYXNPd24uY2FsbChpdGVyYWJsZSwgaSkpIHtcbiAgICAgICAgICAgICAgbmV4dC52YWx1ZSA9IGl0ZXJhYmxlW2ldO1xuICAgICAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbmV4dC52YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuXG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIG5leHQubmV4dCA9IG5leHQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gUmV0dXJuIGFuIGl0ZXJhdG9yIHdpdGggbm8gdmFsdWVzLlxuICAgIHJldHVybiB7IG5leHQ6IGRvbmVSZXN1bHQgfTtcbiAgfVxuICBydW50aW1lLnZhbHVlcyA9IHZhbHVlcztcblxuICBmdW5jdGlvbiBkb25lUmVzdWx0KCkge1xuICAgIHJldHVybiB7IHZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWUgfTtcbiAgfVxuXG4gIENvbnRleHQucHJvdG90eXBlID0ge1xuICAgIGNvbnN0cnVjdG9yOiBDb250ZXh0LFxuXG4gICAgcmVzZXQ6IGZ1bmN0aW9uKHNraXBUZW1wUmVzZXQpIHtcbiAgICAgIHRoaXMucHJldiA9IDA7XG4gICAgICB0aGlzLm5leHQgPSAwO1xuICAgICAgdGhpcy5zZW50ID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5kb25lID0gZmFsc2U7XG4gICAgICB0aGlzLmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgdGhpcy50cnlFbnRyaWVzLmZvckVhY2gocmVzZXRUcnlFbnRyeSk7XG5cbiAgICAgIGlmICghc2tpcFRlbXBSZXNldCkge1xuICAgICAgICBmb3IgKHZhciBuYW1lIGluIHRoaXMpIHtcbiAgICAgICAgICAvLyBOb3Qgc3VyZSBhYm91dCB0aGUgb3B0aW1hbCBvcmRlciBvZiB0aGVzZSBjb25kaXRpb25zOlxuICAgICAgICAgIGlmIChuYW1lLmNoYXJBdCgwKSA9PT0gXCJ0XCIgJiZcbiAgICAgICAgICAgICAgaGFzT3duLmNhbGwodGhpcywgbmFtZSkgJiZcbiAgICAgICAgICAgICAgIWlzTmFOKCtuYW1lLnNsaWNlKDEpKSkge1xuICAgICAgICAgICAgdGhpc1tuYW1lXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgc3RvcDogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmRvbmUgPSB0cnVlO1xuXG4gICAgICB2YXIgcm9vdEVudHJ5ID0gdGhpcy50cnlFbnRyaWVzWzBdO1xuICAgICAgdmFyIHJvb3RSZWNvcmQgPSByb290RW50cnkuY29tcGxldGlvbjtcbiAgICAgIGlmIChyb290UmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICB0aHJvdyByb290UmVjb3JkLmFyZztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMucnZhbDtcbiAgICB9LFxuXG4gICAgZGlzcGF0Y2hFeGNlcHRpb246IGZ1bmN0aW9uKGV4Y2VwdGlvbikge1xuICAgICAgaWYgKHRoaXMuZG9uZSkge1xuICAgICAgICB0aHJvdyBleGNlcHRpb247XG4gICAgICB9XG5cbiAgICAgIHZhciBjb250ZXh0ID0gdGhpcztcbiAgICAgIGZ1bmN0aW9uIGhhbmRsZShsb2MsIGNhdWdodCkge1xuICAgICAgICByZWNvcmQudHlwZSA9IFwidGhyb3dcIjtcbiAgICAgICAgcmVjb3JkLmFyZyA9IGV4Y2VwdGlvbjtcbiAgICAgICAgY29udGV4dC5uZXh0ID0gbG9jO1xuICAgICAgICByZXR1cm4gISFjYXVnaHQ7XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSBcInJvb3RcIikge1xuICAgICAgICAgIC8vIEV4Y2VwdGlvbiB0aHJvd24gb3V0c2lkZSBvZiBhbnkgdHJ5IGJsb2NrIHRoYXQgY291bGQgaGFuZGxlXG4gICAgICAgICAgLy8gaXQsIHNvIHNldCB0aGUgY29tcGxldGlvbiB2YWx1ZSBvZiB0aGUgZW50aXJlIGZ1bmN0aW9uIHRvXG4gICAgICAgICAgLy8gdGhyb3cgdGhlIGV4Y2VwdGlvbi5cbiAgICAgICAgICByZXR1cm4gaGFuZGxlKFwiZW5kXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYpIHtcbiAgICAgICAgICB2YXIgaGFzQ2F0Y2ggPSBoYXNPd24uY2FsbChlbnRyeSwgXCJjYXRjaExvY1wiKTtcbiAgICAgICAgICB2YXIgaGFzRmluYWxseSA9IGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIik7XG5cbiAgICAgICAgICBpZiAoaGFzQ2F0Y2ggJiYgaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsIHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0NhdGNoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidHJ5IHN0YXRlbWVudCB3aXRob3V0IGNhdGNoIG9yIGZpbmFsbHlcIik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIGFicnVwdDogZnVuY3Rpb24odHlwZSwgYXJnKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYgJiZcbiAgICAgICAgICAgIGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIikgJiZcbiAgICAgICAgICAgIHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB2YXIgZmluYWxseUVudHJ5ID0gZW50cnk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGZpbmFsbHlFbnRyeSAmJlxuICAgICAgICAgICh0eXBlID09PSBcImJyZWFrXCIgfHxcbiAgICAgICAgICAgdHlwZSA9PT0gXCJjb250aW51ZVwiKSAmJlxuICAgICAgICAgIGZpbmFsbHlFbnRyeS50cnlMb2MgPD0gYXJnICYmXG4gICAgICAgICAgYXJnIDw9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgIC8vIElnbm9yZSB0aGUgZmluYWxseSBlbnRyeSBpZiBjb250cm9sIGlzIG5vdCBqdW1waW5nIHRvIGFcbiAgICAgICAgLy8gbG9jYXRpb24gb3V0c2lkZSB0aGUgdHJ5L2NhdGNoIGJsb2NrLlxuICAgICAgICBmaW5hbGx5RW50cnkgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICB2YXIgcmVjb3JkID0gZmluYWxseUVudHJ5ID8gZmluYWxseUVudHJ5LmNvbXBsZXRpb24gOiB7fTtcbiAgICAgIHJlY29yZC50eXBlID0gdHlwZTtcbiAgICAgIHJlY29yZC5hcmcgPSBhcmc7XG5cbiAgICAgIGlmIChmaW5hbGx5RW50cnkpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2M7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNvbXBsZXRlKHJlY29yZCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH0sXG5cbiAgICBjb21wbGV0ZTogZnVuY3Rpb24ocmVjb3JkLCBhZnRlckxvYykge1xuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgdGhyb3cgcmVjb3JkLmFyZztcbiAgICAgIH1cblxuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcImJyZWFrXCIgfHxcbiAgICAgICAgICByZWNvcmQudHlwZSA9PT0gXCJjb250aW51ZVwiKSB7XG4gICAgICAgIHRoaXMubmV4dCA9IHJlY29yZC5hcmc7XG4gICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInJldHVyblwiKSB7XG4gICAgICAgIHRoaXMucnZhbCA9IHJlY29yZC5hcmc7XG4gICAgICAgIHRoaXMubmV4dCA9IFwiZW5kXCI7XG4gICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcIm5vcm1hbFwiICYmIGFmdGVyTG9jKSB7XG4gICAgICAgIHRoaXMubmV4dCA9IGFmdGVyTG9jO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBmaW5pc2g6IGZ1bmN0aW9uKGZpbmFsbHlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkuZmluYWxseUxvYyA9PT0gZmluYWxseUxvYykge1xuICAgICAgICAgIHRoaXMuY29tcGxldGUoZW50cnkuY29tcGxldGlvbiwgZW50cnkuYWZ0ZXJMb2MpO1xuICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIFwiY2F0Y2hcIjogZnVuY3Rpb24odHJ5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA9PT0gdHJ5TG9jKSB7XG4gICAgICAgICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb247XG4gICAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIHZhciB0aHJvd24gPSByZWNvcmQuYXJnO1xuICAgICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0aHJvd247XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVGhlIGNvbnRleHQuY2F0Y2ggbWV0aG9kIG11c3Qgb25seSBiZSBjYWxsZWQgd2l0aCBhIGxvY2F0aW9uXG4gICAgICAvLyBhcmd1bWVudCB0aGF0IGNvcnJlc3BvbmRzIHRvIGEga25vd24gY2F0Y2ggYmxvY2suXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbGxlZ2FsIGNhdGNoIGF0dGVtcHRcIik7XG4gICAgfSxcblxuICAgIGRlbGVnYXRlWWllbGQ6IGZ1bmN0aW9uKGl0ZXJhYmxlLCByZXN1bHROYW1lLCBuZXh0TG9jKSB7XG4gICAgICB0aGlzLmRlbGVnYXRlID0ge1xuICAgICAgICBpdGVyYXRvcjogdmFsdWVzKGl0ZXJhYmxlKSxcbiAgICAgICAgcmVzdWx0TmFtZTogcmVzdWx0TmFtZSxcbiAgICAgICAgbmV4dExvYzogbmV4dExvY1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuICB9O1xufSkoXG4gIC8vIEFtb25nIHRoZSB2YXJpb3VzIHRyaWNrcyBmb3Igb2J0YWluaW5nIGEgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWxcbiAgLy8gb2JqZWN0LCB0aGlzIHNlZW1zIHRvIGJlIHRoZSBtb3N0IHJlbGlhYmxlIHRlY2huaXF1ZSB0aGF0IGRvZXMgbm90XG4gIC8vIHVzZSBpbmRpcmVjdCBldmFsICh3aGljaCB2aW9sYXRlcyBDb250ZW50IFNlY3VyaXR5IFBvbGljeSkuXG4gIHR5cGVvZiBnbG9iYWwgPT09IFwib2JqZWN0XCIgPyBnbG9iYWwgOlxuICB0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiID8gd2luZG93IDpcbiAgdHlwZW9mIHNlbGYgPT09IFwib2JqZWN0XCIgPyBzZWxmIDogdGhpc1xuKTtcbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbnZhciBfdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbi8qKlxuICogQ29tcG9uZW50IHdpdGhvdXQgY29kZSBzcGxpdHRpbmcgc3VwcG9ydFxuICovXG5cbnZhciBDb21wb25lbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ29tcG9uZW50KGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIENvbXBvbmVudCk7XG5cbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgdGhpcy5lbGVtZW50WydfX2dpYV9jb21wb25lbnRfXyddID0gdGhpcztcbiAgICAgICAgdGhpcy5fcmVmID0ge307XG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgICAgICB0aGlzLl9zdGF0ZSA9IHt9O1xuICAgIH1cblxuICAgIF9jcmVhdGVDbGFzcyhDb21wb25lbnQsIFt7XG4gICAgICAgIGtleTogJ19sb2FkJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIF9sb2FkKCkge1xuICAgICAgICAgICAgdGhpcy5tb3VudCgpO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdtb3VudCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBtb3VudCgpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignQ29tcG9uZW50ICcgKyB0aGlzLl9uYW1lICsgJyBkb2VzIG5vdCBoYXZlIFwibW91bnRcIiBtZXRob2QuJyk7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3VubW91bnQnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gdW5tb3VudCgpIHtcbiAgICAgICAgICAgIC8vIHRoaXMgaXMgaGVyZSBvbmx5IHRvIGJlIHJld3JpdHRlblxuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdnZXRSZWYnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0UmVmKHJlZikge1xuICAgICAgICAgICAgdmFyIHByZWZpeGVkID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiBmYWxzZTtcblxuICAgICAgICAgICAgcmV0dXJuICdbZy1yZWY9XCInICsgKHByZWZpeGVkID8gdGhpcy5fbmFtZSArICc6JyA6ICcnKSArIHJlZiArICdcIl0nO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdzZXRTdGF0ZScsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBzZXRTdGF0ZShjaGFuZ2VzKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICAgICB2YXIgc3RhdGVDaGFuZ2VzID0ge307XG5cbiAgICAgICAgICAgIE9iamVjdC5rZXlzKGNoYW5nZXMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGNoYW5nZXNba2V5XSkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKF90aGlzLl9zdGF0ZVtrZXldICE9IG51bGwgJiYgQXJyYXkuaXNBcnJheShfdGhpcy5fc3RhdGVba2V5XSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfdGhpcy5fc3RhdGVba2V5XS5sZW5ndGggPT09IGNoYW5nZXNba2V5XS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2VzW2tleV0uc29tZShmdW5jdGlvbiAoaXRlbSwgaW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF90aGlzLl9zdGF0ZVtrZXldW2luZGV4XSAhPT0gaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGVDaGFuZ2VzW2tleV0gPSBjaGFuZ2VzW2tleV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fc3RhdGVba2V5XSA9IHN0YXRlQ2hhbmdlc1trZXldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZUNoYW5nZXNba2V5XSA9IGNoYW5nZXNba2V5XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fc3RhdGVba2V5XSA9IHN0YXRlQ2hhbmdlc1trZXldO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGVDaGFuZ2VzW2tleV0gPSBjaGFuZ2VzW2tleV07XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fc3RhdGVba2V5XSA9IHN0YXRlQ2hhbmdlc1trZXldO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChfdHlwZW9mKGNoYW5nZXNba2V5XSkgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChfdGhpcy5fc3RhdGVba2V5XSAhPSBudWxsICYmIF90eXBlb2YoX3RoaXMuX3N0YXRlW2tleV0pID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGVDaGFuZ2VzW2tleV0gPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKGNoYW5nZXNba2V5XSkuZm9yRWFjaChmdW5jdGlvbiAoc3Via2V5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF90aGlzLl9zdGF0ZVtrZXldW3N1YmtleV0gIT09IGNoYW5nZXNba2V5XVtzdWJrZXldKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlQ2hhbmdlc1trZXldW3N1YmtleV0gPSBjaGFuZ2VzW2tleV1bc3Via2V5XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlQ2hhbmdlc1trZXldID0gY2hhbmdlc1trZXldO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuX3N0YXRlW2tleV0gPSBfZXh0ZW5kcyh7fSwgX3RoaXMuX3N0YXRlW2tleV0sIHN0YXRlQ2hhbmdlc1trZXldKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoX3RoaXMuX3N0YXRlW2tleV0gIT09IGNoYW5nZXNba2V5XSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGVDaGFuZ2VzW2tleV0gPSBjaGFuZ2VzW2tleV07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl9zdGF0ZVtrZXldID0gY2hhbmdlc1trZXldO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIE9iamVjdC5rZXlzKHN0YXRlQ2hhbmdlcykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY2hhbmdlc1trZXldKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3RhdGVDaGFuZ2VzW2tleV0ubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgc3RhdGVDaGFuZ2VzW2tleV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKF90eXBlb2YoY2hhbmdlc1trZXldKSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKE9iamVjdC5rZXlzKHN0YXRlQ2hhbmdlc1trZXldKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBzdGF0ZUNoYW5nZXNba2V5XTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlKHN0YXRlQ2hhbmdlcyk7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3N0YXRlQ2hhbmdlJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHN0YXRlQ2hhbmdlKHN0YXRlQ2hhbmdlcykge1xuICAgICAgICAgICAgLy8gdGhpcyBpcyBoZXJlIG9ubHkgdG8gYmUgcmV3cml0dGVuXG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3JlZicsXG4gICAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JlZjtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiBzZXQoaXRlbXMpIHtcbiAgICAgICAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICAgICAgICB2YXIgYWxsUmVmcyA9ICgwLCBfdXRpbHMucXVlcnlBbGwpKCdbZy1yZWZdJywgdGhpcy5lbGVtZW50KTtcblxuICAgICAgICAgICAgaWYgKE9iamVjdC5rZXlzKGl0ZW1zKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICBhbGxSZWZzLmZvckVhY2goZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlZk5hbWUgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgnZy1yZWYnKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlZk5hbWUuaW5kZXhPZignOicpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlZk5hbWVBcnJheSA9IHJlZk5hbWUuc3BsaXQoJzonKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZWZOYW1lQXJyYXlbMF0gPT0gX3RoaXMyLl9uYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFfdGhpczIuX3JlZltyZWZOYW1lQXJyYXlbMV1dKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzMi5fcmVmW3JlZk5hbWVBcnJheVsxXV0gPSBhbGxSZWZzLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0uZ2V0QXR0cmlidXRlKCdnLXJlZicpID09PSByZWZOYW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghX3RoaXMyLl9yZWZbcmVmTmFtZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpczIuX3JlZltyZWZOYW1lXSA9IGFsbFJlZnMuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLmdldEF0dHJpYnV0ZSgnZy1yZWYnKSA9PT0gcmVmTmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZWYgPSBPYmplY3Qua2V5cyhpdGVtcykubWFwKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5KGl0ZW1zW2tleV0pO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIG5vbi1lbXB0eSByZWZzXG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtc1trZXldICE9PSBudWxsICYmIGlzQXJyYXkgJiYgaXRlbXNba2V5XS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IGtleSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogaXRlbXNba2V5XVxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHZhciBuYW1lID0ga2V5O1xuICAgICAgICAgICAgICAgICAgICB2YXIgcHJlZml4ZWROYW1lID0gX3RoaXMyLl9uYW1lICsgJzonICsgbmFtZTtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgcmVmcyA9IGFsbFJlZnMuZmlsdGVyKGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2ctcmVmJykgPT09IHByZWZpeGVkTmFtZTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlZnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWZzID0gYWxsUmVmcy5maWx0ZXIoZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2ctcmVmJykgPT09IG5hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmICghaXNBcnJheSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVmcyA9IHJlZnMubGVuZ3RoID8gcmVmc1swXSA6IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZToga2V5LFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHJlZnNcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9KS5yZWR1Y2UoZnVuY3Rpb24gKGFjYywgcmVmKSB7XG4gICAgICAgICAgICAgICAgICAgIGFjY1tyZWYubmFtZV0gPSByZWYudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgICAgICAgICAgfSwge30pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVmO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdvcHRpb25zJyxcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fb3B0aW9ucztcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiBzZXQoZGVmYXVsdHMpIHtcbiAgICAgICAgICAgIHZhciBvcHRpb25zID0ge307XG4gICAgICAgICAgICB2YXIgb3B0aW9uc0Zyb21BdHRyaWJ1dGUgPSB0aGlzLmVsZW1lbnQuZ2V0QXR0cmlidXRlKCdnLW9wdGlvbnMnKTtcbiAgICAgICAgICAgIGlmIChvcHRpb25zRnJvbUF0dHJpYnV0ZSkge1xuICAgICAgICAgICAgICAgIG9wdGlvbnMgPSBKU09OLnBhcnNlKG9wdGlvbnNGcm9tQXR0cmlidXRlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5fb3B0aW9ucyA9IF9leHRlbmRzKHt9LCB0aGlzLl9vcHRpb25zLCBkZWZhdWx0cywgb3B0aW9ucyk7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9vcHRpb25zO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdzdGF0ZScsXG4gICAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3N0YXRlO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIHNldChzdGF0ZSkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdZb3Ugc2hvdWxkIG5vdCBjaGFuZ2Ugc3RhdGUgbWFudWFsbHkuIFVzZSBzZXRTdGF0ZSBpbnN0ZWFkLicpO1xuICAgICAgICAgICAgdGhpcy5fc3RhdGUgPSBzdGF0ZTtcbiAgICAgICAgfVxuICAgIH1dKTtcblxuICAgIHJldHVybiBDb21wb25lbnQ7XG59KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IENvbXBvbmVudDtcbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG5yZXF1aXJlKCdiYWJlbC1yZWdlbmVyYXRvci1ydW50aW1lJyk7XG5cbnZhciBfQmFzZUNvbXBvbmVudDIgPSByZXF1aXJlKCcuL0Jhc2VDb21wb25lbnQnKTtcblxudmFyIF9CYXNlQ29tcG9uZW50MyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0Jhc2VDb21wb25lbnQyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX2FzeW5jVG9HZW5lcmF0b3IoZm4pIHsgcmV0dXJuIGZ1bmN0aW9uICgpIHsgdmFyIGdlbiA9IGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IGZ1bmN0aW9uIHN0ZXAoa2V5LCBhcmcpIHsgdHJ5IHsgdmFyIGluZm8gPSBnZW5ba2V5XShhcmcpOyB2YXIgdmFsdWUgPSBpbmZvLnZhbHVlOyB9IGNhdGNoIChlcnJvcikgeyByZWplY3QoZXJyb3IpOyByZXR1cm47IH0gaWYgKGluZm8uZG9uZSkgeyByZXNvbHZlKHZhbHVlKTsgfSBlbHNlIHsgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh2YWx1ZSkudGhlbihmdW5jdGlvbiAodmFsdWUpIHsgc3RlcChcIm5leHRcIiwgdmFsdWUpOyB9LCBmdW5jdGlvbiAoZXJyKSB7IHN0ZXAoXCJ0aHJvd1wiLCBlcnIpOyB9KTsgfSB9IHJldHVybiBzdGVwKFwibmV4dFwiKTsgfSk7IH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG4vKipcbiAqIENvbXBvbmVudCB3aXRoIGNvZGUgc3BsaXR0aW5nIHN1cHBvcnRcbiAqL1xuXG52YXIgQ29tcG9uZW50ID0gZnVuY3Rpb24gKF9CYXNlQ29tcG9uZW50KSB7XG4gICAgX2luaGVyaXRzKENvbXBvbmVudCwgX0Jhc2VDb21wb25lbnQpO1xuXG4gICAgZnVuY3Rpb24gQ29tcG9uZW50KCkge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQ29tcG9uZW50KTtcblxuICAgICAgICByZXR1cm4gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgKENvbXBvbmVudC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKENvbXBvbmVudCkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICAgIH1cblxuICAgIF9jcmVhdGVDbGFzcyhDb21wb25lbnQsIFt7XG4gICAgICAgIGtleTogJ3JlcXVpcmUnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIF9yZWYgPSBfYXN5bmNUb0dlbmVyYXRvciggLyojX19QVVJFX18qL3JlZ2VuZXJhdG9yUnVudGltZS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWUoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlZ2VuZXJhdG9yUnVudGltZS53cmFwKGZ1bmN0aW9uIF9jYWxsZWUkKF9jb250ZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKF9jb250ZXh0LnByZXYgPSBfY29udGV4dC5uZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2VuZCc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dC5zdG9wKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCBfY2FsbGVlLCB0aGlzKTtcbiAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgZnVuY3Rpb24gcmVxdWlyZSgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX3JlZi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcmVxdWlyZTtcbiAgICAgICAgfSgpXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdfbG9hZCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBfbG9hZCgpIHtcbiAgICAgICAgICAgIHRoaXMucmVxdWlyZSgpLnRoZW4odGhpcy5tb3VudC5iaW5kKHRoaXMpKTtcbiAgICAgICAgfVxuICAgIH1dKTtcblxuICAgIHJldHVybiBDb21wb25lbnQ7XG59KF9CYXNlQ29tcG9uZW50My5kZWZhdWx0KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gQ29tcG9uZW50O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuLyoqXG4gKiBDb25maWcgZm9yIHNldHRpbmcgYW5kIGNoYW5naW5nIGdsb2JhbCBzZXR0aW5nc1xuICovXG5cbnZhciBDb25maWcgPSBmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ29uZmlnKCkge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQ29uZmlnKTtcblxuICAgICAgICB0aGlzLl9vcHRpb25zID0ge1xuICAgICAgICAgICAgbG9nOiB0cnVlXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgX2NyZWF0ZUNsYXNzKENvbmZpZywgW3tcbiAgICAgICAga2V5OiBcInNldFwiLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gc2V0KG5hbWUsIHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl9vcHRpb25zW25hbWVdID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogXCJnZXRcIixcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGdldChuYW1lKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fb3B0aW9uc1tuYW1lXTtcbiAgICAgICAgfVxuICAgIH1dKTtcblxuICAgIHJldHVybiBDb25maWc7XG59KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IG5ldyBDb25maWcoKTtcbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gY3JlYXRlSW5zdGFuY2U7XG5cbnZhciBfY29uZmlnID0gcmVxdWlyZSgnLi9jb25maWcnKTtcblxudmFyIF9jb25maWcyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY29uZmlnKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuLyoqXG4gKiBDcmVhdGVzIGFuZCByZXR1cm5zIGluc3RhbmNlIG9mIGNvbXBvbmVudFxuICogQHBhcmFtIGVsZW1lbnQ6IERPTSBlbGVtZW50XG4gKiBAcGFyYW0gY29tcG9uZW50TmFtZTogQ29tcG9uZW50IG5hbWVcbiAqIEBwYXJhbSBjb21wb25lbnQ6IENvbXBvbmVudCBjb25zdHJ1Y3RvclxuICogQHBhcmFtIG9wdGlvbnM6IG9wdGlvbnMgb2JqZWN0IHBhc3NlZCBpbnRvIGEgY29tcG9uZW50XG4gKi9cblxuZnVuY3Rpb24gY3JlYXRlSW5zdGFuY2UoZWxlbWVudCwgY29tcG9uZW50TmFtZSwgY29tcG9uZW50LCBvcHRpb25zKSB7XG4gICAgY29tcG9uZW50LnByb3RvdHlwZS5fbmFtZSA9IGNvbXBvbmVudE5hbWU7XG4gICAgdmFyIGluc3RhbmNlID0gbmV3IGNvbXBvbmVudChlbGVtZW50LCBvcHRpb25zKTtcblxuICAgIGlmIChfY29uZmlnMi5kZWZhdWx0LmdldCgnbG9nJykpIHtcbiAgICAgICAgY29uc29sZS5pbmZvKCdDcmVhdGVkIGluc3RhbmNlIG9mIGNvbXBvbmVudCBcIicgKyBjb21wb25lbnROYW1lICsgJ1wiLicpO1xuICAgIH1cbiAgICByZXR1cm4gaW5zdGFuY2U7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxudmFyIF9jb25maWcgPSByZXF1aXJlKCcuL2NvbmZpZycpO1xuXG52YXIgX2NvbmZpZzIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jb25maWcpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG4vKipcbiAqIEV2ZW50IGJ1cyBmb3Igc3RvcmluZyBhbmQgZXhlY3V0aW5nIGhhbmRsZXJzIG9uIGVtaXR0ZWQgZXZlbnRzXG4gKi9cblxudmFyIEV2ZW50QnVzID0gZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEV2ZW50QnVzKCkge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgRXZlbnRCdXMpO1xuXG4gICAgICAgIHRoaXMubGlzdCA9IHt9O1xuICAgIH1cblxuICAgIF9jcmVhdGVDbGFzcyhFdmVudEJ1cywgW3tcbiAgICAgICAga2V5OiAnZW1pdCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBlbWl0KGV2ZW50KSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICAgICB2YXIgZXZlbnRPYmplY3QgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9O1xuXG4gICAgICAgICAgICBldmVudE9iamVjdC5fbmFtZSA9IGV2ZW50O1xuICAgICAgICAgICAgaWYgKHRoaXMubGlzdFtldmVudF0pIHtcbiAgICAgICAgICAgICAgICBpZiAoX2NvbmZpZzIuZGVmYXVsdC5nZXQoJ2xvZycpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuaW5mbyh0aGlzLmxpc3RbZXZlbnRdLmxlbmd0aCArICcgaGFuZGxlcicgKyAodGhpcy5saXN0W2V2ZW50XS5sZW5ndGggPiAxID8gXCJzXCIgOiBcIlwiKSArICcgY2FsbGVkIG9uIGV2ZW50IFxcJycgKyBldmVudCArICdcXCcnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5saXN0W2V2ZW50XS5mb3JFYWNoKGZ1bmN0aW9uIChoYW5kbGVyT2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZXJPYmplY3QuaGFuZGxlcihldmVudE9iamVjdCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChoYW5kbGVyT2JqZWN0Lm9uY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLm9mZihldmVudCwgaGFuZGxlck9iamVjdC5oYW5kbGVyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoX2NvbmZpZzIuZGVmYXVsdC5nZXQoJ2xvZycpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuaW5mbygnMCBoYW5kbGVycyBjYWxsZWQgb24gZXZlbnQgXFwnJyArIGV2ZW50ICsgJ1xcJycpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnb24nLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gb24oZXZlbnQsIGhhbmRsZXIpIHtcbiAgICAgICAgICAgIHZhciBvbmNlID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiBmYWxzZTtcblxuICAgICAgICAgICAgaWYgKHRoaXMubGlzdFtldmVudF0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3RbZXZlbnRdLnB1c2goeyBvbmNlOiBvbmNlLCBoYW5kbGVyOiBoYW5kbGVyIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3RbZXZlbnRdID0gW107XG4gICAgICAgICAgICAgICAgdGhpcy5saXN0W2V2ZW50XS5wdXNoKHsgb25jZTogb25jZSwgaGFuZGxlcjogaGFuZGxlciB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnb25jZScsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBvbmNlKGV2ZW50LCBoYW5kbGVyKSB7XG4gICAgICAgICAgICB0aGlzLm9uKGV2ZW50LCBoYW5kbGVyLCB0cnVlKTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnb2ZmJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIG9mZihldmVudCwgaGFuZGxlcikge1xuICAgICAgICAgICAgaWYgKGV2ZW50ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBpZiAoaGFuZGxlciAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmxpc3RbZXZlbnRdICYmIHRoaXMubGlzdFtldmVudF0uZmlsdGVyKGZ1bmN0aW9uIChldmVudE9iamVjdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGV2ZW50T2JqZWN0LmhhbmRsZXIgPT09IGhhbmRsZXI7XG4gICAgICAgICAgICAgICAgICAgIH0pLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRvUmVtb3ZlID0gdGhpcy5saXN0W2V2ZW50XS5maWx0ZXIoZnVuY3Rpb24gKGV2ZW50T2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGV2ZW50T2JqZWN0LmhhbmRsZXIgPT09IGhhbmRsZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IHRoaXMubGlzdFtldmVudF0uaW5kZXhPZih0b1JlbW92ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGlzdFtldmVudF0uc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignRXZlbnQgJyArIGV2ZW50ICsgJyBjYW5ub3QgYmUgdW5zdWJzY3JpYmVkIC0gZG9lcyBub3QgZXhpc3QuJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxpc3RbZXZlbnRdID0gW107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3QgPSB7fTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1dKTtcblxuICAgIHJldHVybiBFdmVudEJ1cztcbn0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gbmV3IEV2ZW50QnVzKCk7XG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGdldENvbXBvbmVudEZyb21FbGVtZW50O1xuLyoqXG4gKiBSZXR1cm4gaW5zdGFuY2UgZnJvbSBlbGVtZW50XG4gKiBAcGFyYW0gZWxlbWVudDogRE9NIGVsZW1lbnQgb3IgSUQgb2YgZWxlbWVudFxuICogQHJldHVybnMgY29tcG9uZW50IGluc3RhbmNlXG4gKi9cblxuZnVuY3Rpb24gZ2V0Q29tcG9uZW50RnJvbUVsZW1lbnQoZWxlbWVudCkge1xuICAgIGlmICh0eXBlb2YgZWxlbWVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnQpO1xuXG4gICAgICAgIGlmICghZWxlbWVudCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZWxlbWVudFsnX19naWFfY29tcG9uZW50X18nXTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gbG9hZENvbXBvbmVudHM7XG5cbnZhciBfdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG5cbnZhciBfZ2V0Q29tcG9uZW50RnJvbUVsZW1lbnQgPSByZXF1aXJlKCcuL2dldENvbXBvbmVudEZyb21FbGVtZW50Jyk7XG5cbnZhciBfZ2V0Q29tcG9uZW50RnJvbUVsZW1lbnQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZ2V0Q29tcG9uZW50RnJvbUVsZW1lbnQpO1xuXG52YXIgX2NyZWF0ZUluc3RhbmNlID0gcmVxdWlyZSgnLi9jcmVhdGVJbnN0YW5jZScpO1xuXG52YXIgX2NyZWF0ZUluc3RhbmNlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZUluc3RhbmNlKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuLyoqXG4gKiBDcmVhdGVzIGluc3RhbmNlcyBvZiBjb21wb25lbnRzIHdpdGhvdXQgY3JlYXRpbmcgZHVwbGljYXRlcyBvbiBlbGVtZW50cyB3aXRoaW4gdGhlIGNvbnRleHRcbiAqIEBwYXJhbSBjb21wb25lbnRzOiBvYmplY3Qgb2YgY29tcG9uZW50cyB0byBsb2FkXG4gKiBAcGFyYW0gY29udGV4dDogRE9NIGVsZW1lbnRcbiAqL1xuXG5mdW5jdGlvbiBsb2FkQ29tcG9uZW50cygpIHtcbiAgICB2YXIgY29tcG9uZW50cyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDoge307XG4gICAgdmFyIGNvbnRleHQgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcblxuXG4gICAgaWYgKCFjb21wb25lbnRzIHx8IE9iamVjdC5rZXlzKGNvbXBvbmVudHMpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBjb25zb2xlLndhcm4oJ0FwcCBoYXMgbm8gY29tcG9uZW50cycpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIGluaXRpYWxpc2VkQ29tcG9uZW50cyA9IFtdO1xuXG4gICAgKDAsIF91dGlscy5xdWVyeUFsbCkoJ1tnLWNvbXBvbmVudF0nLCBjb250ZXh0KS5mb3JFYWNoKGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgIHZhciBpbnN0YW5jZSA9ICgwLCBfZ2V0Q29tcG9uZW50RnJvbUVsZW1lbnQyLmRlZmF1bHQpKGVsZW1lbnQpO1xuXG4gICAgICAgIGlmIChpbnN0YW5jZSkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdFcnJvcjogaW5zdGFuY2UgZXhpc3RzOiBcXG4nLCBpbnN0YW5jZSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTsgLy8gY29udGludWVcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBjb21wb25lbnROYW1lID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2ctY29tcG9uZW50Jyk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjb21wb25lbnRzW2NvbXBvbmVudE5hbWVdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBpbml0aWFsaXNlZENvbXBvbmVudHMucHVzaCgoMCwgX2NyZWF0ZUluc3RhbmNlMi5kZWZhdWx0KShlbGVtZW50LCBjb21wb25lbnROYW1lLCBjb21wb25lbnRzW2NvbXBvbmVudE5hbWVdKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ0NvbnN0cnVjdG9yIGZvciBjb21wb25lbnQgXCInICsgY29tcG9uZW50TmFtZSArICdcIiBub3QgZm91bmQuJyk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIGNhbGwgX2xvYWQvcmVxdWlyZS9tb3VudFxuICAgIGluaXRpYWxpc2VkQ29tcG9uZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChjb21wb25lbnQpIHtcbiAgICAgICAgY29tcG9uZW50Ll9sb2FkKCk7XG4gICAgfSk7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMucXVlcnkgPSBxdWVyeTtcbmV4cG9ydHMucXVlcnlBbGwgPSBxdWVyeUFsbDtcbmV4cG9ydHMudG9nZ2xlQ2xhc3MgPSB0b2dnbGVDbGFzcztcbmV4cG9ydHMucmVtb3ZlQ2xhc3MgPSByZW1vdmVDbGFzcztcbmV4cG9ydHMuYWRkQ2xhc3MgPSBhZGRDbGFzcztcbmV4cG9ydHMudHJpZ2dlckV2ZW50ID0gdHJpZ2dlckV2ZW50O1xuZnVuY3Rpb24gcXVlcnkoc2VsZWN0b3IpIHtcbiAgICB2YXIgY29udGV4dCA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogZG9jdW1lbnQ7XG5cbiAgICBpZiAodHlwZW9mIHNlbGVjdG9yICE9PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gc2VsZWN0b3I7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbnRleHQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG59XG5cbmZ1bmN0aW9uIHF1ZXJ5QWxsKHNlbGVjdG9yKSB7XG4gICAgdmFyIGNvbnRleHQgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IGRvY3VtZW50O1xuXG4gICAgaWYgKHR5cGVvZiBzZWxlY3RvciAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIHNlbGVjdG9yO1xuICAgIH1cblxuICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChjb250ZXh0LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKTtcbn1cblxuZnVuY3Rpb24gdG9nZ2xlQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKSB7XG4gICAgdmFyIGNvbmRpdGlvbiA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDogbnVsbDtcblxuICAgIGlmIChjb25kaXRpb24gPT09IG51bGwpIHtcbiAgICAgICAgaWYgKGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSkpIHtcbiAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoY29uZGl0aW9uKSB7XG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiByZW1vdmVDbGFzcyhub2RlcywgY2xhc3NOYW1lKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkobm9kZXMpKSB7XG4gICAgICAgIG5vZGVzLmZvckVhY2goZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgICAgIHJldHVybiBub2RlLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbm9kZXMuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xuICAgIH1cblxuICAgIHJldHVybiBub2Rlcztcbn1cblxuZnVuY3Rpb24gYWRkQ2xhc3Mobm9kZXMsIGNsYXNzTmFtZSkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KG5vZGVzKSkge1xuICAgICAgICBub2Rlcy5mb3JFYWNoKGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgICAgICByZXR1cm4gbm9kZS5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIG5vZGVzLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbm9kZXM7XG59XG5cbmZ1bmN0aW9uIHRyaWdnZXJFdmVudChlbGVtZW50LCBldmVudFR5cGUpIHtcbiAgICB2YXIgcGFyYW1zID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiBudWxsO1xuICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDMgJiYgYXJndW1lbnRzWzNdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbM10gOiB7XG4gICAgICAgIGJ1YmJsZXM6IHRydWUsXG4gICAgICAgIGNhbmNlbGFibGU6IHRydWUsXG4gICAgICAgIGRldGFpbDogbnVsbFxuICAgIH07XG5cbiAgICBvcHRpb25zLmRldGFpbCA9IHBhcmFtcztcbiAgICB2YXIgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoZXZlbnRUeXBlLCBvcHRpb25zKTtcbiAgICBlbGVtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xufVxuIiwiIWZ1bmN0aW9uKGUsdCl7XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShbXSx0KTpcIm9iamVjdFwiPT10eXBlb2YgbW9kdWxlJiZtb2R1bGUuZXhwb3J0cz9tb2R1bGUuZXhwb3J0cz10KCk6ZS5pbT10KCl9KHRoaXMsZnVuY3Rpb24oKXtmdW5jdGlvbiBlKGUpe2M9ZX1mdW5jdGlvbiB0KGUpe1wibWFudWFsXCI9PWUmJihmPSExLG4oKSl9ZnVuY3Rpb24gbigpe2lmKHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlJiZcIlwiIT09d2luZG93LmdldENvbXB1dGVkU3R5bGUoYyxcIjo6YWZ0ZXJcIikuY29udGVudCl7dmFyIGU9d2luZG93LmdldENvbXB1dGVkU3R5bGUoYyxcIjo6YWZ0ZXJcIikuY29udGVudDt0cnl7bD1KU09OLnBhcnNlKGkoZSkpfWNhdGNoKHQpe2w9ITF9fWVsc2UgbD0hMX1mdW5jdGlvbiBhKGUpe3JldHVybiBmJiZuKCksbC5oYXNPd25Qcm9wZXJ0eShlKSYmbFtlXS5hY3RpdmV9ZnVuY3Rpb24gbyhlKXtyZXR1cm4hYShlKX1mdW5jdGlvbiByKCl7ZiYmbigpO3ZhciBlPXtuYW1lOiExLHZhbHVlOjB9O2Zvcih2YXIgdCBpbiBsKWlmKGwuaGFzT3duUHJvcGVydHkodCkpe3ZhciBhPXBhcnNlRmxvYXQobFt0XS52YWx1ZSk7bFt0XS5hY3RpdmUmJmE+ZS52YWx1ZSYmKGU9e25hbWU6dCx2YWx1ZTphfSl9cmV0dXJuIGUubmFtZX1mdW5jdGlvbiB1KGUsdCl7cmV0dXJuIGYmJm4oKSxsJiZsLmhhc093blByb3BlcnR5KGUpP3Q/cGFyc2VGbG9hdChsW2VdLnZhbHVlKTpsW2VdLnZhbHVlOiExfWZ1bmN0aW9uIGkoZSl7cmV0dXJuKFwic3RyaW5nXCI9PXR5cGVvZiBlfHxlIGluc3RhbmNlb2YgU3RyaW5nKSYmKGU9ZS5yZXBsYWNlKC9bJ10vZywnXCInKS5yZXBsYWNlKC9cXFxcfF5bXFxzXFxTXXswLDF9fFtcXHNcXFNdJC9nLFwiXCIpKSxlfXZhciBjPWRvY3VtZW50LmJvZHksZj0hMCxsPSExO3JldHVybntzZXRFbGVtZW50OmUsc2V0VXBkYXRlTW9kZTp0LGdyZWF0ZXJUaGFuOmEsbGVzc1RoYW46byxnZXRBY3RpdmU6cixnZXRWYWx1ZTp1LHVwZGF0ZTpufX0pOyIsIihmdW5jdGlvbih3aW5kb3csIGZhY3RvcnkpIHtcblx0dmFyIGxhenlTaXplcyA9IGZhY3Rvcnkod2luZG93LCB3aW5kb3cuZG9jdW1lbnQsIERhdGUpO1xuXHR3aW5kb3cubGF6eVNpemVzID0gbGF6eVNpemVzO1xuXHRpZih0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzKXtcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGxhenlTaXplcztcblx0fVxufSh0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnID9cbiAgICAgIHdpbmRvdyA6IHt9LCBmdW5jdGlvbiBsKHdpbmRvdywgZG9jdW1lbnQsIERhdGUpIHsgLy8gUGFzcyBpbiB0aGUgd2luZG9lIERhdGUgZnVuY3Rpb24gYWxzbyBmb3IgU1NSIGJlY2F1c2UgdGhlIERhdGUgY2xhc3MgY2FuIGJlIGxvc3Rcblx0J3VzZSBzdHJpY3QnO1xuXHQvKmpzaGludCBlcW51bGw6dHJ1ZSAqL1xuXG5cdHZhciBsYXp5c2l6ZXMsIGxhenlTaXplc0NmZztcblxuXHQoZnVuY3Rpb24oKXtcblx0XHR2YXIgcHJvcDtcblxuXHRcdHZhciBsYXp5U2l6ZXNEZWZhdWx0cyA9IHtcblx0XHRcdGxhenlDbGFzczogJ2xhenlsb2FkJyxcblx0XHRcdGxvYWRlZENsYXNzOiAnbGF6eWxvYWRlZCcsXG5cdFx0XHRsb2FkaW5nQ2xhc3M6ICdsYXp5bG9hZGluZycsXG5cdFx0XHRwcmVsb2FkQ2xhc3M6ICdsYXp5cHJlbG9hZCcsXG5cdFx0XHRlcnJvckNsYXNzOiAnbGF6eWVycm9yJyxcblx0XHRcdC8vc3RyaWN0Q2xhc3M6ICdsYXp5c3RyaWN0Jyxcblx0XHRcdGF1dG9zaXplc0NsYXNzOiAnbGF6eWF1dG9zaXplcycsXG5cdFx0XHRzcmNBdHRyOiAnZGF0YS1zcmMnLFxuXHRcdFx0c3Jjc2V0QXR0cjogJ2RhdGEtc3Jjc2V0Jyxcblx0XHRcdHNpemVzQXR0cjogJ2RhdGEtc2l6ZXMnLFxuXHRcdFx0Ly9wcmVsb2FkQWZ0ZXJMb2FkOiBmYWxzZSxcblx0XHRcdG1pblNpemU6IDQwLFxuXHRcdFx0Y3VzdG9tTWVkaWE6IHt9LFxuXHRcdFx0aW5pdDogdHJ1ZSxcblx0XHRcdGV4cEZhY3RvcjogMS41LFxuXHRcdFx0aEZhYzogMC44LFxuXHRcdFx0bG9hZE1vZGU6IDIsXG5cdFx0XHRsb2FkSGlkZGVuOiB0cnVlLFxuXHRcdFx0cmljVGltZW91dDogMCxcblx0XHRcdHRocm90dGxlRGVsYXk6IDEyNSxcblx0XHR9O1xuXG5cdFx0bGF6eVNpemVzQ2ZnID0gd2luZG93LmxhenlTaXplc0NvbmZpZyB8fCB3aW5kb3cubGF6eXNpemVzQ29uZmlnIHx8IHt9O1xuXG5cdFx0Zm9yKHByb3AgaW4gbGF6eVNpemVzRGVmYXVsdHMpe1xuXHRcdFx0aWYoIShwcm9wIGluIGxhenlTaXplc0NmZykpe1xuXHRcdFx0XHRsYXp5U2l6ZXNDZmdbcHJvcF0gPSBsYXp5U2l6ZXNEZWZhdWx0c1twcm9wXTtcblx0XHRcdH1cblx0XHR9XG5cdH0pKCk7XG5cblx0aWYgKCFkb2N1bWVudCB8fCAhZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRpbml0OiBmdW5jdGlvbiAoKSB7fSxcblx0XHRcdGNmZzogbGF6eVNpemVzQ2ZnLFxuXHRcdFx0bm9TdXBwb3J0OiB0cnVlLFxuXHRcdH07XG5cdH1cblxuXHR2YXIgZG9jRWxlbSA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcblxuXHR2YXIgc3VwcG9ydFBpY3R1cmUgPSB3aW5kb3cuSFRNTFBpY3R1cmVFbGVtZW50O1xuXG5cdHZhciBfYWRkRXZlbnRMaXN0ZW5lciA9ICdhZGRFdmVudExpc3RlbmVyJztcblxuXHR2YXIgX2dldEF0dHJpYnV0ZSA9ICdnZXRBdHRyaWJ1dGUnO1xuXG5cdC8qKlxuXHQgKiBVcGRhdGUgdG8gYmluZCB0byB3aW5kb3cgYmVjYXVzZSAndGhpcycgYmVjb21lcyBudWxsIGR1cmluZyBTU1Jcblx0ICogYnVpbGRzLlxuXHQgKi9cblx0dmFyIGFkZEV2ZW50TGlzdGVuZXIgPSB3aW5kb3dbX2FkZEV2ZW50TGlzdGVuZXJdLmJpbmQod2luZG93KTtcblxuXHR2YXIgc2V0VGltZW91dCA9IHdpbmRvdy5zZXRUaW1lb3V0O1xuXG5cdHZhciByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IHNldFRpbWVvdXQ7XG5cblx0dmFyIHJlcXVlc3RJZGxlQ2FsbGJhY2sgPSB3aW5kb3cucmVxdWVzdElkbGVDYWxsYmFjaztcblxuXHR2YXIgcmVnUGljdHVyZSA9IC9ecGljdHVyZSQvaTtcblxuXHR2YXIgbG9hZEV2ZW50cyA9IFsnbG9hZCcsICdlcnJvcicsICdsYXp5aW5jbHVkZWQnLCAnX2xhenlsb2FkZWQnXTtcblxuXHR2YXIgcmVnQ2xhc3NDYWNoZSA9IHt9O1xuXG5cdHZhciBmb3JFYWNoID0gQXJyYXkucHJvdG90eXBlLmZvckVhY2g7XG5cblx0dmFyIGhhc0NsYXNzID0gZnVuY3Rpb24oZWxlLCBjbHMpIHtcblx0XHRpZighcmVnQ2xhc3NDYWNoZVtjbHNdKXtcblx0XHRcdHJlZ0NsYXNzQ2FjaGVbY2xzXSA9IG5ldyBSZWdFeHAoJyhcXFxcc3xeKScrY2xzKycoXFxcXHN8JCknKTtcblx0XHR9XG5cdFx0cmV0dXJuIHJlZ0NsYXNzQ2FjaGVbY2xzXS50ZXN0KGVsZVtfZ2V0QXR0cmlidXRlXSgnY2xhc3MnKSB8fCAnJykgJiYgcmVnQ2xhc3NDYWNoZVtjbHNdO1xuXHR9O1xuXG5cdHZhciBhZGRDbGFzcyA9IGZ1bmN0aW9uKGVsZSwgY2xzKSB7XG5cdFx0aWYgKCFoYXNDbGFzcyhlbGUsIGNscykpe1xuXHRcdFx0ZWxlLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAoZWxlW19nZXRBdHRyaWJ1dGVdKCdjbGFzcycpIHx8ICcnKS50cmltKCkgKyAnICcgKyBjbHMpO1xuXHRcdH1cblx0fTtcblxuXHR2YXIgcmVtb3ZlQ2xhc3MgPSBmdW5jdGlvbihlbGUsIGNscykge1xuXHRcdHZhciByZWc7XG5cdFx0aWYgKChyZWcgPSBoYXNDbGFzcyhlbGUsY2xzKSkpIHtcblx0XHRcdGVsZS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgKGVsZVtfZ2V0QXR0cmlidXRlXSgnY2xhc3MnKSB8fCAnJykucmVwbGFjZShyZWcsICcgJykpO1xuXHRcdH1cblx0fTtcblxuXHR2YXIgYWRkUmVtb3ZlTG9hZEV2ZW50cyA9IGZ1bmN0aW9uKGRvbSwgZm4sIGFkZCl7XG5cdFx0dmFyIGFjdGlvbiA9IGFkZCA/IF9hZGRFdmVudExpc3RlbmVyIDogJ3JlbW92ZUV2ZW50TGlzdGVuZXInO1xuXHRcdGlmKGFkZCl7XG5cdFx0XHRhZGRSZW1vdmVMb2FkRXZlbnRzKGRvbSwgZm4pO1xuXHRcdH1cblx0XHRsb2FkRXZlbnRzLmZvckVhY2goZnVuY3Rpb24oZXZ0KXtcblx0XHRcdGRvbVthY3Rpb25dKGV2dCwgZm4pO1xuXHRcdH0pO1xuXHR9O1xuXG5cdHZhciB0cmlnZ2VyRXZlbnQgPSBmdW5jdGlvbihlbGVtLCBuYW1lLCBkZXRhaWwsIG5vQnViYmxlcywgbm9DYW5jZWxhYmxlKXtcblx0XHR2YXIgZXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnRXZlbnQnKTtcblxuXHRcdGlmKCFkZXRhaWwpe1xuXHRcdFx0ZGV0YWlsID0ge307XG5cdFx0fVxuXG5cdFx0ZGV0YWlsLmluc3RhbmNlID0gbGF6eXNpemVzO1xuXG5cdFx0ZXZlbnQuaW5pdEV2ZW50KG5hbWUsICFub0J1YmJsZXMsICFub0NhbmNlbGFibGUpO1xuXG5cdFx0ZXZlbnQuZGV0YWlsID0gZGV0YWlsO1xuXG5cdFx0ZWxlbS5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcblx0XHRyZXR1cm4gZXZlbnQ7XG5cdH07XG5cblx0dmFyIHVwZGF0ZVBvbHlmaWxsID0gZnVuY3Rpb24gKGVsLCBmdWxsKXtcblx0XHR2YXIgcG9seWZpbGw7XG5cdFx0aWYoICFzdXBwb3J0UGljdHVyZSAmJiAoIHBvbHlmaWxsID0gKHdpbmRvdy5waWN0dXJlZmlsbCB8fCBsYXp5U2l6ZXNDZmcucGYpICkgKXtcblx0XHRcdGlmKGZ1bGwgJiYgZnVsbC5zcmMgJiYgIWVsW19nZXRBdHRyaWJ1dGVdKCdzcmNzZXQnKSl7XG5cdFx0XHRcdGVsLnNldEF0dHJpYnV0ZSgnc3Jjc2V0JywgZnVsbC5zcmMpO1xuXHRcdFx0fVxuXHRcdFx0cG9seWZpbGwoe3JlZXZhbHVhdGU6IHRydWUsIGVsZW1lbnRzOiBbZWxdfSk7XG5cdFx0fSBlbHNlIGlmKGZ1bGwgJiYgZnVsbC5zcmMpe1xuXHRcdFx0ZWwuc3JjID0gZnVsbC5zcmM7XG5cdFx0fVxuXHR9O1xuXG5cdHZhciBnZXRDU1MgPSBmdW5jdGlvbiAoZWxlbSwgc3R5bGUpe1xuXHRcdHJldHVybiAoZ2V0Q29tcHV0ZWRTdHlsZShlbGVtLCBudWxsKSB8fCB7fSlbc3R5bGVdO1xuXHR9O1xuXG5cdHZhciBnZXRXaWR0aCA9IGZ1bmN0aW9uKGVsZW0sIHBhcmVudCwgd2lkdGgpe1xuXHRcdHdpZHRoID0gd2lkdGggfHwgZWxlbS5vZmZzZXRXaWR0aDtcblxuXHRcdHdoaWxlKHdpZHRoIDwgbGF6eVNpemVzQ2ZnLm1pblNpemUgJiYgcGFyZW50ICYmICFlbGVtLl9sYXp5c2l6ZXNXaWR0aCl7XG5cdFx0XHR3aWR0aCA9ICBwYXJlbnQub2Zmc2V0V2lkdGg7XG5cdFx0XHRwYXJlbnQgPSBwYXJlbnQucGFyZW50Tm9kZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gd2lkdGg7XG5cdH07XG5cblx0dmFyIHJBRiA9IChmdW5jdGlvbigpe1xuXHRcdHZhciBydW5uaW5nLCB3YWl0aW5nO1xuXHRcdHZhciBmaXJzdEZucyA9IFtdO1xuXHRcdHZhciBzZWNvbmRGbnMgPSBbXTtcblx0XHR2YXIgZm5zID0gZmlyc3RGbnM7XG5cblx0XHR2YXIgcnVuID0gZnVuY3Rpb24oKXtcblx0XHRcdHZhciBydW5GbnMgPSBmbnM7XG5cblx0XHRcdGZucyA9IGZpcnN0Rm5zLmxlbmd0aCA/IHNlY29uZEZucyA6IGZpcnN0Rm5zO1xuXG5cdFx0XHRydW5uaW5nID0gdHJ1ZTtcblx0XHRcdHdhaXRpbmcgPSBmYWxzZTtcblxuXHRcdFx0d2hpbGUocnVuRm5zLmxlbmd0aCl7XG5cdFx0XHRcdHJ1bkZucy5zaGlmdCgpKCk7XG5cdFx0XHR9XG5cblx0XHRcdHJ1bm5pbmcgPSBmYWxzZTtcblx0XHR9O1xuXG5cdFx0dmFyIHJhZkJhdGNoID0gZnVuY3Rpb24oZm4sIHF1ZXVlKXtcblx0XHRcdGlmKHJ1bm5pbmcgJiYgIXF1ZXVlKXtcblx0XHRcdFx0Zm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZucy5wdXNoKGZuKTtcblxuXHRcdFx0XHRpZighd2FpdGluZyl7XG5cdFx0XHRcdFx0d2FpdGluZyA9IHRydWU7XG5cdFx0XHRcdFx0KGRvY3VtZW50LmhpZGRlbiA/IHNldFRpbWVvdXQgOiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUpKHJ1bik7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0cmFmQmF0Y2guX2xzRmx1c2ggPSBydW47XG5cblx0XHRyZXR1cm4gcmFmQmF0Y2g7XG5cdH0pKCk7XG5cblx0dmFyIHJBRkl0ID0gZnVuY3Rpb24oZm4sIHNpbXBsZSl7XG5cdFx0cmV0dXJuIHNpbXBsZSA/XG5cdFx0XHRmdW5jdGlvbigpIHtcblx0XHRcdFx0ckFGKGZuKTtcblx0XHRcdH0gOlxuXHRcdFx0ZnVuY3Rpb24oKXtcblx0XHRcdFx0dmFyIHRoYXQgPSB0aGlzO1xuXHRcdFx0XHR2YXIgYXJncyA9IGFyZ3VtZW50cztcblx0XHRcdFx0ckFGKGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0Zm4uYXBwbHkodGhhdCwgYXJncyk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdDtcblx0fTtcblxuXHR2YXIgdGhyb3R0bGUgPSBmdW5jdGlvbihmbil7XG5cdFx0dmFyIHJ1bm5pbmc7XG5cdFx0dmFyIGxhc3RUaW1lID0gMDtcblx0XHR2YXIgZ0RlbGF5ID0gbGF6eVNpemVzQ2ZnLnRocm90dGxlRGVsYXk7XG5cdFx0dmFyIHJJQ1RpbWVvdXQgPSBsYXp5U2l6ZXNDZmcucmljVGltZW91dDtcblx0XHR2YXIgcnVuID0gZnVuY3Rpb24oKXtcblx0XHRcdHJ1bm5pbmcgPSBmYWxzZTtcblx0XHRcdGxhc3RUaW1lID0gRGF0ZS5ub3coKTtcblx0XHRcdGZuKCk7XG5cdFx0fTtcblx0XHR2YXIgaWRsZUNhbGxiYWNrID0gcmVxdWVzdElkbGVDYWxsYmFjayAmJiBySUNUaW1lb3V0ID4gNDkgP1xuXHRcdFx0ZnVuY3Rpb24oKXtcblx0XHRcdFx0cmVxdWVzdElkbGVDYWxsYmFjayhydW4sIHt0aW1lb3V0OiBySUNUaW1lb3V0fSk7XG5cblx0XHRcdFx0aWYocklDVGltZW91dCAhPT0gbGF6eVNpemVzQ2ZnLnJpY1RpbWVvdXQpe1xuXHRcdFx0XHRcdHJJQ1RpbWVvdXQgPSBsYXp5U2l6ZXNDZmcucmljVGltZW91dDtcblx0XHRcdFx0fVxuXHRcdFx0fSA6XG5cdFx0XHRyQUZJdChmdW5jdGlvbigpe1xuXHRcdFx0XHRzZXRUaW1lb3V0KHJ1bik7XG5cdFx0XHR9LCB0cnVlKVxuXHRcdDtcblxuXHRcdHJldHVybiBmdW5jdGlvbihpc1ByaW9yaXR5KXtcblx0XHRcdHZhciBkZWxheTtcblxuXHRcdFx0aWYoKGlzUHJpb3JpdHkgPSBpc1ByaW9yaXR5ID09PSB0cnVlKSl7XG5cdFx0XHRcdHJJQ1RpbWVvdXQgPSAzMztcblx0XHRcdH1cblxuXHRcdFx0aWYocnVubmluZyl7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0cnVubmluZyA9ICB0cnVlO1xuXG5cdFx0XHRkZWxheSA9IGdEZWxheSAtIChEYXRlLm5vdygpIC0gbGFzdFRpbWUpO1xuXG5cdFx0XHRpZihkZWxheSA8IDApe1xuXHRcdFx0XHRkZWxheSA9IDA7XG5cdFx0XHR9XG5cblx0XHRcdGlmKGlzUHJpb3JpdHkgfHwgZGVsYXkgPCA5KXtcblx0XHRcdFx0aWRsZUNhbGxiYWNrKCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRzZXRUaW1lb3V0KGlkbGVDYWxsYmFjaywgZGVsYXkpO1xuXHRcdFx0fVxuXHRcdH07XG5cdH07XG5cblx0Ly9iYXNlZCBvbiBodHRwOi8vbW9kZXJuamF2YXNjcmlwdC5ibG9nc3BvdC5kZS8yMDEzLzA4L2J1aWxkaW5nLWJldHRlci1kZWJvdW5jZS5odG1sXG5cdHZhciBkZWJvdW5jZSA9IGZ1bmN0aW9uKGZ1bmMpIHtcblx0XHR2YXIgdGltZW91dCwgdGltZXN0YW1wO1xuXHRcdHZhciB3YWl0ID0gOTk7XG5cdFx0dmFyIHJ1biA9IGZ1bmN0aW9uKCl7XG5cdFx0XHR0aW1lb3V0ID0gbnVsbDtcblx0XHRcdGZ1bmMoKTtcblx0XHR9O1xuXHRcdHZhciBsYXRlciA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIGxhc3QgPSBEYXRlLm5vdygpIC0gdGltZXN0YW1wO1xuXG5cdFx0XHRpZiAobGFzdCA8IHdhaXQpIHtcblx0XHRcdFx0c2V0VGltZW91dChsYXRlciwgd2FpdCAtIGxhc3QpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0KHJlcXVlc3RJZGxlQ2FsbGJhY2sgfHwgcnVuKShydW4pO1xuXHRcdFx0fVxuXHRcdH07XG5cblx0XHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdFx0XHR0aW1lc3RhbXAgPSBEYXRlLm5vdygpO1xuXG5cdFx0XHRpZiAoIXRpbWVvdXQpIHtcblx0XHRcdFx0dGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHdhaXQpO1xuXHRcdFx0fVxuXHRcdH07XG5cdH07XG5cblx0dmFyIGxvYWRlciA9IChmdW5jdGlvbigpe1xuXHRcdHZhciBwcmVsb2FkRWxlbXMsIGlzQ29tcGxldGVkLCByZXNldFByZWxvYWRpbmdUaW1lciwgbG9hZE1vZGUsIHN0YXJ0ZWQ7XG5cblx0XHR2YXIgZUx2VywgZWx2SCwgZUx0b3AsIGVMbGVmdCwgZUxyaWdodCwgZUxib3R0b20sIGlzQm9keUhpZGRlbjtcblxuXHRcdHZhciByZWdJbWcgPSAvXmltZyQvaTtcblx0XHR2YXIgcmVnSWZyYW1lID0gL15pZnJhbWUkL2k7XG5cblx0XHR2YXIgc3VwcG9ydFNjcm9sbCA9ICgnb25zY3JvbGwnIGluIHdpbmRvdykgJiYgISgvKGdsZXxpbmcpYm90Ly50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpKTtcblxuXHRcdHZhciBzaHJpbmtFeHBhbmQgPSAwO1xuXHRcdHZhciBjdXJyZW50RXhwYW5kID0gMDtcblxuXHRcdHZhciBpc0xvYWRpbmcgPSAwO1xuXHRcdHZhciBsb3dSdW5zID0gLTE7XG5cblx0XHR2YXIgcmVzZXRQcmVsb2FkaW5nID0gZnVuY3Rpb24oZSl7XG5cdFx0XHRpc0xvYWRpbmctLTtcblx0XHRcdGlmKCFlIHx8IGlzTG9hZGluZyA8IDAgfHwgIWUudGFyZ2V0KXtcblx0XHRcdFx0aXNMb2FkaW5nID0gMDtcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0dmFyIGlzVmlzaWJsZSA9IGZ1bmN0aW9uIChlbGVtKSB7XG5cdFx0XHRpZiAoaXNCb2R5SGlkZGVuID09IG51bGwpIHtcblx0XHRcdFx0aXNCb2R5SGlkZGVuID0gZ2V0Q1NTKGRvY3VtZW50LmJvZHksICd2aXNpYmlsaXR5JykgPT0gJ2hpZGRlbic7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBpc0JvZHlIaWRkZW4gfHwgIShnZXRDU1MoZWxlbS5wYXJlbnROb2RlLCAndmlzaWJpbGl0eScpID09ICdoaWRkZW4nICYmIGdldENTUyhlbGVtLCAndmlzaWJpbGl0eScpID09ICdoaWRkZW4nKTtcblx0XHR9O1xuXG5cdFx0dmFyIGlzTmVzdGVkVmlzaWJsZSA9IGZ1bmN0aW9uKGVsZW0sIGVsZW1FeHBhbmQpe1xuXHRcdFx0dmFyIG91dGVyUmVjdDtcblx0XHRcdHZhciBwYXJlbnQgPSBlbGVtO1xuXHRcdFx0dmFyIHZpc2libGUgPSBpc1Zpc2libGUoZWxlbSk7XG5cblx0XHRcdGVMdG9wIC09IGVsZW1FeHBhbmQ7XG5cdFx0XHRlTGJvdHRvbSArPSBlbGVtRXhwYW5kO1xuXHRcdFx0ZUxsZWZ0IC09IGVsZW1FeHBhbmQ7XG5cdFx0XHRlTHJpZ2h0ICs9IGVsZW1FeHBhbmQ7XG5cblx0XHRcdHdoaWxlKHZpc2libGUgJiYgKHBhcmVudCA9IHBhcmVudC5vZmZzZXRQYXJlbnQpICYmIHBhcmVudCAhPSBkb2N1bWVudC5ib2R5ICYmIHBhcmVudCAhPSBkb2NFbGVtKXtcblx0XHRcdFx0dmlzaWJsZSA9ICgoZ2V0Q1NTKHBhcmVudCwgJ29wYWNpdHknKSB8fCAxKSA+IDApO1xuXG5cdFx0XHRcdGlmKHZpc2libGUgJiYgZ2V0Q1NTKHBhcmVudCwgJ292ZXJmbG93JykgIT0gJ3Zpc2libGUnKXtcblx0XHRcdFx0XHRvdXRlclJlY3QgPSBwYXJlbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cdFx0XHRcdFx0dmlzaWJsZSA9IGVMcmlnaHQgPiBvdXRlclJlY3QubGVmdCAmJlxuXHRcdFx0XHRcdFx0ZUxsZWZ0IDwgb3V0ZXJSZWN0LnJpZ2h0ICYmXG5cdFx0XHRcdFx0XHRlTGJvdHRvbSA+IG91dGVyUmVjdC50b3AgLSAxICYmXG5cdFx0XHRcdFx0XHRlTHRvcCA8IG91dGVyUmVjdC5ib3R0b20gKyAxXG5cdFx0XHRcdFx0O1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiB2aXNpYmxlO1xuXHRcdH07XG5cblx0XHR2YXIgY2hlY2tFbGVtZW50cyA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIGVMbGVuLCBpLCByZWN0LCBhdXRvTG9hZEVsZW0sIGxvYWRlZFNvbWV0aGluZywgZWxlbUV4cGFuZCwgZWxlbU5lZ2F0aXZlRXhwYW5kLCBlbGVtRXhwYW5kVmFsLFxuXHRcdFx0XHRiZWZvcmVFeHBhbmRWYWwsIGRlZmF1bHRFeHBhbmQsIHByZWxvYWRFeHBhbmQsIGhGYWM7XG5cdFx0XHR2YXIgbGF6eWxvYWRFbGVtcyA9IGxhenlzaXplcy5lbGVtZW50cztcblxuXHRcdFx0aWYoKGxvYWRNb2RlID0gbGF6eVNpemVzQ2ZnLmxvYWRNb2RlKSAmJiBpc0xvYWRpbmcgPCA4ICYmIChlTGxlbiA9IGxhenlsb2FkRWxlbXMubGVuZ3RoKSl7XG5cblx0XHRcdFx0aSA9IDA7XG5cblx0XHRcdFx0bG93UnVucysrO1xuXG5cdFx0XHRcdGZvcig7IGkgPCBlTGxlbjsgaSsrKXtcblxuXHRcdFx0XHRcdGlmKCFsYXp5bG9hZEVsZW1zW2ldIHx8IGxhenlsb2FkRWxlbXNbaV0uX2xhenlSYWNlKXtjb250aW51ZTt9XG5cblx0XHRcdFx0XHRpZighc3VwcG9ydFNjcm9sbCB8fCAobGF6eXNpemVzLnByZW1hdHVyZVVudmVpbCAmJiBsYXp5c2l6ZXMucHJlbWF0dXJlVW52ZWlsKGxhenlsb2FkRWxlbXNbaV0pKSl7dW52ZWlsRWxlbWVudChsYXp5bG9hZEVsZW1zW2ldKTtjb250aW51ZTt9XG5cblx0XHRcdFx0XHRpZighKGVsZW1FeHBhbmRWYWwgPSBsYXp5bG9hZEVsZW1zW2ldW19nZXRBdHRyaWJ1dGVdKCdkYXRhLWV4cGFuZCcpKSB8fCAhKGVsZW1FeHBhbmQgPSBlbGVtRXhwYW5kVmFsICogMSkpe1xuXHRcdFx0XHRcdFx0ZWxlbUV4cGFuZCA9IGN1cnJlbnRFeHBhbmQ7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKCFkZWZhdWx0RXhwYW5kKSB7XG5cdFx0XHRcdFx0XHRkZWZhdWx0RXhwYW5kID0gKCFsYXp5U2l6ZXNDZmcuZXhwYW5kIHx8IGxhenlTaXplc0NmZy5leHBhbmQgPCAxKSA/XG5cdFx0XHRcdFx0XHRcdGRvY0VsZW0uY2xpZW50SGVpZ2h0ID4gNTAwICYmIGRvY0VsZW0uY2xpZW50V2lkdGggPiA1MDAgPyA1MDAgOiAzNzAgOlxuXHRcdFx0XHRcdFx0XHRsYXp5U2l6ZXNDZmcuZXhwYW5kO1xuXG5cdFx0XHRcdFx0XHRsYXp5c2l6ZXMuX2RlZkV4ID0gZGVmYXVsdEV4cGFuZDtcblxuXHRcdFx0XHRcdFx0cHJlbG9hZEV4cGFuZCA9IGRlZmF1bHRFeHBhbmQgKiBsYXp5U2l6ZXNDZmcuZXhwRmFjdG9yO1xuXHRcdFx0XHRcdFx0aEZhYyA9IGxhenlTaXplc0NmZy5oRmFjO1xuXHRcdFx0XHRcdFx0aXNCb2R5SGlkZGVuID0gbnVsbDtcblxuXHRcdFx0XHRcdFx0aWYoY3VycmVudEV4cGFuZCA8IHByZWxvYWRFeHBhbmQgJiYgaXNMb2FkaW5nIDwgMSAmJiBsb3dSdW5zID4gMiAmJiBsb2FkTW9kZSA+IDIgJiYgIWRvY3VtZW50LmhpZGRlbil7XG5cdFx0XHRcdFx0XHRcdGN1cnJlbnRFeHBhbmQgPSBwcmVsb2FkRXhwYW5kO1xuXHRcdFx0XHRcdFx0XHRsb3dSdW5zID0gMDtcblx0XHRcdFx0XHRcdH0gZWxzZSBpZihsb2FkTW9kZSA+IDEgJiYgbG93UnVucyA+IDEgJiYgaXNMb2FkaW5nIDwgNil7XG5cdFx0XHRcdFx0XHRcdGN1cnJlbnRFeHBhbmQgPSBkZWZhdWx0RXhwYW5kO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0Y3VycmVudEV4cGFuZCA9IHNocmlua0V4cGFuZDtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZihiZWZvcmVFeHBhbmRWYWwgIT09IGVsZW1FeHBhbmQpe1xuXHRcdFx0XHRcdFx0ZUx2VyA9IGlubmVyV2lkdGggKyAoZWxlbUV4cGFuZCAqIGhGYWMpO1xuXHRcdFx0XHRcdFx0ZWx2SCA9IGlubmVySGVpZ2h0ICsgZWxlbUV4cGFuZDtcblx0XHRcdFx0XHRcdGVsZW1OZWdhdGl2ZUV4cGFuZCA9IGVsZW1FeHBhbmQgKiAtMTtcblx0XHRcdFx0XHRcdGJlZm9yZUV4cGFuZFZhbCA9IGVsZW1FeHBhbmQ7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cmVjdCA9IGxhenlsb2FkRWxlbXNbaV0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cblx0XHRcdFx0XHRpZiAoKGVMYm90dG9tID0gcmVjdC5ib3R0b20pID49IGVsZW1OZWdhdGl2ZUV4cGFuZCAmJlxuXHRcdFx0XHRcdFx0KGVMdG9wID0gcmVjdC50b3ApIDw9IGVsdkggJiZcblx0XHRcdFx0XHRcdChlTHJpZ2h0ID0gcmVjdC5yaWdodCkgPj0gZWxlbU5lZ2F0aXZlRXhwYW5kICogaEZhYyAmJlxuXHRcdFx0XHRcdFx0KGVMbGVmdCA9IHJlY3QubGVmdCkgPD0gZUx2VyAmJlxuXHRcdFx0XHRcdFx0KGVMYm90dG9tIHx8IGVMcmlnaHQgfHwgZUxsZWZ0IHx8IGVMdG9wKSAmJlxuXHRcdFx0XHRcdFx0KGxhenlTaXplc0NmZy5sb2FkSGlkZGVuIHx8IGlzVmlzaWJsZShsYXp5bG9hZEVsZW1zW2ldKSkgJiZcblx0XHRcdFx0XHRcdCgoaXNDb21wbGV0ZWQgJiYgaXNMb2FkaW5nIDwgMyAmJiAhZWxlbUV4cGFuZFZhbCAmJiAobG9hZE1vZGUgPCAzIHx8IGxvd1J1bnMgPCA0KSkgfHwgaXNOZXN0ZWRWaXNpYmxlKGxhenlsb2FkRWxlbXNbaV0sIGVsZW1FeHBhbmQpKSl7XG5cdFx0XHRcdFx0XHR1bnZlaWxFbGVtZW50KGxhenlsb2FkRWxlbXNbaV0pO1xuXHRcdFx0XHRcdFx0bG9hZGVkU29tZXRoaW5nID0gdHJ1ZTtcblx0XHRcdFx0XHRcdGlmKGlzTG9hZGluZyA+IDkpe2JyZWFrO31cblx0XHRcdFx0XHR9IGVsc2UgaWYoIWxvYWRlZFNvbWV0aGluZyAmJiBpc0NvbXBsZXRlZCAmJiAhYXV0b0xvYWRFbGVtICYmXG5cdFx0XHRcdFx0XHRpc0xvYWRpbmcgPCA0ICYmIGxvd1J1bnMgPCA0ICYmIGxvYWRNb2RlID4gMiAmJlxuXHRcdFx0XHRcdFx0KHByZWxvYWRFbGVtc1swXSB8fCBsYXp5U2l6ZXNDZmcucHJlbG9hZEFmdGVyTG9hZCkgJiZcblx0XHRcdFx0XHRcdChwcmVsb2FkRWxlbXNbMF0gfHwgKCFlbGVtRXhwYW5kVmFsICYmICgoZUxib3R0b20gfHwgZUxyaWdodCB8fCBlTGxlZnQgfHwgZUx0b3ApIHx8IGxhenlsb2FkRWxlbXNbaV1bX2dldEF0dHJpYnV0ZV0obGF6eVNpemVzQ2ZnLnNpemVzQXR0cikgIT0gJ2F1dG8nKSkpKXtcblx0XHRcdFx0XHRcdGF1dG9Mb2FkRWxlbSA9IHByZWxvYWRFbGVtc1swXSB8fCBsYXp5bG9hZEVsZW1zW2ldO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmKGF1dG9Mb2FkRWxlbSAmJiAhbG9hZGVkU29tZXRoaW5nKXtcblx0XHRcdFx0XHR1bnZlaWxFbGVtZW50KGF1dG9Mb2FkRWxlbSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0dmFyIHRocm90dGxlZENoZWNrRWxlbWVudHMgPSB0aHJvdHRsZShjaGVja0VsZW1lbnRzKTtcblxuXHRcdHZhciBzd2l0Y2hMb2FkaW5nQ2xhc3MgPSBmdW5jdGlvbihlKXtcblx0XHRcdHZhciBlbGVtID0gZS50YXJnZXQ7XG5cblx0XHRcdGlmIChlbGVtLl9sYXp5Q2FjaGUpIHtcblx0XHRcdFx0ZGVsZXRlIGVsZW0uX2xhenlDYWNoZTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXNldFByZWxvYWRpbmcoZSk7XG5cdFx0XHRhZGRDbGFzcyhlbGVtLCBsYXp5U2l6ZXNDZmcubG9hZGVkQ2xhc3MpO1xuXHRcdFx0cmVtb3ZlQ2xhc3MoZWxlbSwgbGF6eVNpemVzQ2ZnLmxvYWRpbmdDbGFzcyk7XG5cdFx0XHRhZGRSZW1vdmVMb2FkRXZlbnRzKGVsZW0sIHJhZlN3aXRjaExvYWRpbmdDbGFzcyk7XG5cdFx0XHR0cmlnZ2VyRXZlbnQoZWxlbSwgJ2xhenlsb2FkZWQnKTtcblx0XHR9O1xuXHRcdHZhciByYWZlZFN3aXRjaExvYWRpbmdDbGFzcyA9IHJBRkl0KHN3aXRjaExvYWRpbmdDbGFzcyk7XG5cdFx0dmFyIHJhZlN3aXRjaExvYWRpbmdDbGFzcyA9IGZ1bmN0aW9uKGUpe1xuXHRcdFx0cmFmZWRTd2l0Y2hMb2FkaW5nQ2xhc3Moe3RhcmdldDogZS50YXJnZXR9KTtcblx0XHR9O1xuXG5cdFx0dmFyIGNoYW5nZUlmcmFtZVNyYyA9IGZ1bmN0aW9uKGVsZW0sIHNyYyl7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRlbGVtLmNvbnRlbnRXaW5kb3cubG9jYXRpb24ucmVwbGFjZShzcmMpO1xuXHRcdFx0fSBjYXRjaChlKXtcblx0XHRcdFx0ZWxlbS5zcmMgPSBzcmM7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHZhciBoYW5kbGVTb3VyY2VzID0gZnVuY3Rpb24oc291cmNlKXtcblx0XHRcdHZhciBjdXN0b21NZWRpYTtcblxuXHRcdFx0dmFyIHNvdXJjZVNyY3NldCA9IHNvdXJjZVtfZ2V0QXR0cmlidXRlXShsYXp5U2l6ZXNDZmcuc3Jjc2V0QXR0cik7XG5cblx0XHRcdGlmKCAoY3VzdG9tTWVkaWEgPSBsYXp5U2l6ZXNDZmcuY3VzdG9tTWVkaWFbc291cmNlW19nZXRBdHRyaWJ1dGVdKCdkYXRhLW1lZGlhJykgfHwgc291cmNlW19nZXRBdHRyaWJ1dGVdKCdtZWRpYScpXSkgKXtcblx0XHRcdFx0c291cmNlLnNldEF0dHJpYnV0ZSgnbWVkaWEnLCBjdXN0b21NZWRpYSk7XG5cdFx0XHR9XG5cblx0XHRcdGlmKHNvdXJjZVNyY3NldCl7XG5cdFx0XHRcdHNvdXJjZS5zZXRBdHRyaWJ1dGUoJ3NyY3NldCcsIHNvdXJjZVNyY3NldCk7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHZhciBsYXp5VW52ZWlsID0gckFGSXQoZnVuY3Rpb24gKGVsZW0sIGRldGFpbCwgaXNBdXRvLCBzaXplcywgaXNJbWcpe1xuXHRcdFx0dmFyIHNyYywgc3Jjc2V0LCBwYXJlbnQsIGlzUGljdHVyZSwgZXZlbnQsIGZpcmVzTG9hZDtcblxuXHRcdFx0aWYoIShldmVudCA9IHRyaWdnZXJFdmVudChlbGVtLCAnbGF6eWJlZm9yZXVudmVpbCcsIGRldGFpbCkpLmRlZmF1bHRQcmV2ZW50ZWQpe1xuXG5cdFx0XHRcdGlmKHNpemVzKXtcblx0XHRcdFx0XHRpZihpc0F1dG8pe1xuXHRcdFx0XHRcdFx0YWRkQ2xhc3MoZWxlbSwgbGF6eVNpemVzQ2ZnLmF1dG9zaXplc0NsYXNzKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0ZWxlbS5zZXRBdHRyaWJ1dGUoJ3NpemVzJywgc2l6ZXMpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdHNyY3NldCA9IGVsZW1bX2dldEF0dHJpYnV0ZV0obGF6eVNpemVzQ2ZnLnNyY3NldEF0dHIpO1xuXHRcdFx0XHRzcmMgPSBlbGVtW19nZXRBdHRyaWJ1dGVdKGxhenlTaXplc0NmZy5zcmNBdHRyKTtcblxuXHRcdFx0XHRpZihpc0ltZykge1xuXHRcdFx0XHRcdHBhcmVudCA9IGVsZW0ucGFyZW50Tm9kZTtcblx0XHRcdFx0XHRpc1BpY3R1cmUgPSBwYXJlbnQgJiYgcmVnUGljdHVyZS50ZXN0KHBhcmVudC5ub2RlTmFtZSB8fCAnJyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRmaXJlc0xvYWQgPSBkZXRhaWwuZmlyZXNMb2FkIHx8ICgoJ3NyYycgaW4gZWxlbSkgJiYgKHNyY3NldCB8fCBzcmMgfHwgaXNQaWN0dXJlKSk7XG5cblx0XHRcdFx0ZXZlbnQgPSB7dGFyZ2V0OiBlbGVtfTtcblxuXHRcdFx0XHRhZGRDbGFzcyhlbGVtLCBsYXp5U2l6ZXNDZmcubG9hZGluZ0NsYXNzKTtcblxuXHRcdFx0XHRpZihmaXJlc0xvYWQpe1xuXHRcdFx0XHRcdGNsZWFyVGltZW91dChyZXNldFByZWxvYWRpbmdUaW1lcik7XG5cdFx0XHRcdFx0cmVzZXRQcmVsb2FkaW5nVGltZXIgPSBzZXRUaW1lb3V0KHJlc2V0UHJlbG9hZGluZywgMjUwMCk7XG5cdFx0XHRcdFx0YWRkUmVtb3ZlTG9hZEV2ZW50cyhlbGVtLCByYWZTd2l0Y2hMb2FkaW5nQ2xhc3MsIHRydWUpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYoaXNQaWN0dXJlKXtcblx0XHRcdFx0XHRmb3JFYWNoLmNhbGwocGFyZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzb3VyY2UnKSwgaGFuZGxlU291cmNlcyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZihzcmNzZXQpe1xuXHRcdFx0XHRcdGVsZW0uc2V0QXR0cmlidXRlKCdzcmNzZXQnLCBzcmNzZXQpO1xuXHRcdFx0XHR9IGVsc2UgaWYoc3JjICYmICFpc1BpY3R1cmUpe1xuXHRcdFx0XHRcdGlmKHJlZ0lmcmFtZS50ZXN0KGVsZW0ubm9kZU5hbWUpKXtcblx0XHRcdFx0XHRcdGNoYW5nZUlmcmFtZVNyYyhlbGVtLCBzcmMpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRlbGVtLnNyYyA9IHNyYztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZihpc0ltZyAmJiAoc3Jjc2V0IHx8IGlzUGljdHVyZSkpe1xuXHRcdFx0XHRcdHVwZGF0ZVBvbHlmaWxsKGVsZW0sIHtzcmM6IHNyY30pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGlmKGVsZW0uX2xhenlSYWNlKXtcblx0XHRcdFx0ZGVsZXRlIGVsZW0uX2xhenlSYWNlO1xuXHRcdFx0fVxuXHRcdFx0cmVtb3ZlQ2xhc3MoZWxlbSwgbGF6eVNpemVzQ2ZnLmxhenlDbGFzcyk7XG5cblx0XHRcdHJBRihmdW5jdGlvbigpe1xuXHRcdFx0XHQvLyBQYXJ0IG9mIHRoaXMgY2FuIGJlIHJlbW92ZWQgYXMgc29vbiBhcyB0aGlzIGZpeCBpcyBvbGRlcjogaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9NzczMSAoMjAxNSlcblx0XHRcdFx0dmFyIGlzTG9hZGVkID0gZWxlbS5jb21wbGV0ZSAmJiBlbGVtLm5hdHVyYWxXaWR0aCA+IDE7XG5cblx0XHRcdFx0aWYoICFmaXJlc0xvYWQgfHwgaXNMb2FkZWQpe1xuXHRcdFx0XHRcdGlmIChpc0xvYWRlZCkge1xuXHRcdFx0XHRcdFx0YWRkQ2xhc3MoZWxlbSwgJ2xzLWlzLWNhY2hlZCcpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRzd2l0Y2hMb2FkaW5nQ2xhc3MoZXZlbnQpO1xuXHRcdFx0XHRcdGVsZW0uX2xhenlDYWNoZSA9IHRydWU7XG5cdFx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xuXHRcdFx0XHRcdFx0aWYgKCdfbGF6eUNhY2hlJyBpbiBlbGVtKSB7XG5cdFx0XHRcdFx0XHRcdGRlbGV0ZSBlbGVtLl9sYXp5Q2FjaGU7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSwgOSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKGVsZW0ubG9hZGluZyA9PSAnbGF6eScpIHtcblx0XHRcdFx0XHRpc0xvYWRpbmctLTtcblx0XHRcdFx0fVxuXHRcdFx0fSwgdHJ1ZSk7XG5cdFx0fSk7XG5cblx0XHR2YXIgdW52ZWlsRWxlbWVudCA9IGZ1bmN0aW9uIChlbGVtKXtcblx0XHRcdGlmIChlbGVtLl9sYXp5UmFjZSkge3JldHVybjt9XG5cdFx0XHR2YXIgZGV0YWlsO1xuXG5cdFx0XHR2YXIgaXNJbWcgPSByZWdJbWcudGVzdChlbGVtLm5vZGVOYW1lKTtcblxuXHRcdFx0Ly9hbGxvdyB1c2luZyBzaXplcz1cImF1dG9cIiwgYnV0IGRvbid0IHVzZS4gaXQncyBpbnZhbGlkLiBVc2UgZGF0YS1zaXplcz1cImF1dG9cIiBvciBhIHZhbGlkIHZhbHVlIGZvciBzaXplcyBpbnN0ZWFkIChpLmUuOiBzaXplcz1cIjgwdndcIilcblx0XHRcdHZhciBzaXplcyA9IGlzSW1nICYmIChlbGVtW19nZXRBdHRyaWJ1dGVdKGxhenlTaXplc0NmZy5zaXplc0F0dHIpIHx8IGVsZW1bX2dldEF0dHJpYnV0ZV0oJ3NpemVzJykpO1xuXHRcdFx0dmFyIGlzQXV0byA9IHNpemVzID09ICdhdXRvJztcblxuXHRcdFx0aWYoIChpc0F1dG8gfHwgIWlzQ29tcGxldGVkKSAmJiBpc0ltZyAmJiAoZWxlbVtfZ2V0QXR0cmlidXRlXSgnc3JjJykgfHwgZWxlbS5zcmNzZXQpICYmICFlbGVtLmNvbXBsZXRlICYmICFoYXNDbGFzcyhlbGVtLCBsYXp5U2l6ZXNDZmcuZXJyb3JDbGFzcykgJiYgaGFzQ2xhc3MoZWxlbSwgbGF6eVNpemVzQ2ZnLmxhenlDbGFzcykpe3JldHVybjt9XG5cblx0XHRcdGRldGFpbCA9IHRyaWdnZXJFdmVudChlbGVtLCAnbGF6eXVudmVpbHJlYWQnKS5kZXRhaWw7XG5cblx0XHRcdGlmKGlzQXV0byl7XG5cdFx0XHRcdCBhdXRvU2l6ZXIudXBkYXRlRWxlbShlbGVtLCB0cnVlLCBlbGVtLm9mZnNldFdpZHRoKTtcblx0XHRcdH1cblxuXHRcdFx0ZWxlbS5fbGF6eVJhY2UgPSB0cnVlO1xuXHRcdFx0aXNMb2FkaW5nKys7XG5cblx0XHRcdGxhenlVbnZlaWwoZWxlbSwgZGV0YWlsLCBpc0F1dG8sIHNpemVzLCBpc0ltZyk7XG5cdFx0fTtcblxuXHRcdHZhciBhZnRlclNjcm9sbCA9IGRlYm91bmNlKGZ1bmN0aW9uKCl7XG5cdFx0XHRsYXp5U2l6ZXNDZmcubG9hZE1vZGUgPSAzO1xuXHRcdFx0dGhyb3R0bGVkQ2hlY2tFbGVtZW50cygpO1xuXHRcdH0pO1xuXG5cdFx0dmFyIGFsdExvYWRtb2RlU2Nyb2xsTGlzdG5lciA9IGZ1bmN0aW9uKCl7XG5cdFx0XHRpZihsYXp5U2l6ZXNDZmcubG9hZE1vZGUgPT0gMyl7XG5cdFx0XHRcdGxhenlTaXplc0NmZy5sb2FkTW9kZSA9IDI7XG5cdFx0XHR9XG5cdFx0XHRhZnRlclNjcm9sbCgpO1xuXHRcdH07XG5cblx0XHR2YXIgb25sb2FkID0gZnVuY3Rpb24oKXtcblx0XHRcdGlmKGlzQ29tcGxldGVkKXtyZXR1cm47fVxuXHRcdFx0aWYoRGF0ZS5ub3coKSAtIHN0YXJ0ZWQgPCA5OTkpe1xuXHRcdFx0XHRzZXRUaW1lb3V0KG9ubG9hZCwgOTk5KTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cblx0XHRcdGlzQ29tcGxldGVkID0gdHJ1ZTtcblxuXHRcdFx0bGF6eVNpemVzQ2ZnLmxvYWRNb2RlID0gMztcblxuXHRcdFx0dGhyb3R0bGVkQ2hlY2tFbGVtZW50cygpO1xuXG5cdFx0XHRhZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBhbHRMb2FkbW9kZVNjcm9sbExpc3RuZXIsIHRydWUpO1xuXHRcdH07XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0XzogZnVuY3Rpb24oKXtcblx0XHRcdFx0c3RhcnRlZCA9IERhdGUubm93KCk7XG5cblx0XHRcdFx0bGF6eXNpemVzLmVsZW1lbnRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShsYXp5U2l6ZXNDZmcubGF6eUNsYXNzKTtcblx0XHRcdFx0cHJlbG9hZEVsZW1zID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShsYXp5U2l6ZXNDZmcubGF6eUNsYXNzICsgJyAnICsgbGF6eVNpemVzQ2ZnLnByZWxvYWRDbGFzcyk7XG5cblx0XHRcdFx0YWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhyb3R0bGVkQ2hlY2tFbGVtZW50cywgdHJ1ZSk7XG5cblx0XHRcdFx0YWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhyb3R0bGVkQ2hlY2tFbGVtZW50cywgdHJ1ZSk7XG5cblx0XHRcdFx0YWRkRXZlbnRMaXN0ZW5lcigncGFnZXNob3cnLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRcdGlmIChlLnBlcnNpc3RlZCkge1xuXHRcdFx0XHRcdFx0dmFyIGxvYWRpbmdFbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy4nICsgbGF6eVNpemVzQ2ZnLmxvYWRpbmdDbGFzcyk7XG5cblx0XHRcdFx0XHRcdGlmIChsb2FkaW5nRWxlbWVudHMubGVuZ3RoICYmIGxvYWRpbmdFbGVtZW50cy5mb3JFYWNoKSB7XG5cdFx0XHRcdFx0XHRcdHJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHRcdFx0bG9hZGluZ0VsZW1lbnRzLmZvckVhY2goIGZ1bmN0aW9uIChpbWcpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChpbWcuY29tcGxldGUpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0dW52ZWlsRWxlbWVudChpbWcpO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdGlmKHdpbmRvdy5NdXRhdGlvbk9ic2VydmVyKXtcblx0XHRcdFx0XHRuZXcgTXV0YXRpb25PYnNlcnZlciggdGhyb3R0bGVkQ2hlY2tFbGVtZW50cyApLm9ic2VydmUoIGRvY0VsZW0sIHtjaGlsZExpc3Q6IHRydWUsIHN1YnRyZWU6IHRydWUsIGF0dHJpYnV0ZXM6IHRydWV9ICk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0ZG9jRWxlbVtfYWRkRXZlbnRMaXN0ZW5lcl0oJ0RPTU5vZGVJbnNlcnRlZCcsIHRocm90dGxlZENoZWNrRWxlbWVudHMsIHRydWUpO1xuXHRcdFx0XHRcdGRvY0VsZW1bX2FkZEV2ZW50TGlzdGVuZXJdKCdET01BdHRyTW9kaWZpZWQnLCB0aHJvdHRsZWRDaGVja0VsZW1lbnRzLCB0cnVlKTtcblx0XHRcdFx0XHRzZXRJbnRlcnZhbCh0aHJvdHRsZWRDaGVja0VsZW1lbnRzLCA5OTkpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0YWRkRXZlbnRMaXN0ZW5lcignaGFzaGNoYW5nZScsIHRocm90dGxlZENoZWNrRWxlbWVudHMsIHRydWUpO1xuXG5cdFx0XHRcdC8vLCAnZnVsbHNjcmVlbmNoYW5nZSdcblx0XHRcdFx0Wydmb2N1cycsICdtb3VzZW92ZXInLCAnY2xpY2snLCAnbG9hZCcsICd0cmFuc2l0aW9uZW5kJywgJ2FuaW1hdGlvbmVuZCddLmZvckVhY2goZnVuY3Rpb24obmFtZSl7XG5cdFx0XHRcdFx0ZG9jdW1lbnRbX2FkZEV2ZW50TGlzdGVuZXJdKG5hbWUsIHRocm90dGxlZENoZWNrRWxlbWVudHMsIHRydWUpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRpZigoL2QkfF5jLy50ZXN0KGRvY3VtZW50LnJlYWR5U3RhdGUpKSl7XG5cdFx0XHRcdFx0b25sb2FkKCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0YWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIG9ubG9hZCk7XG5cdFx0XHRcdFx0ZG9jdW1lbnRbX2FkZEV2ZW50TGlzdGVuZXJdKCdET01Db250ZW50TG9hZGVkJywgdGhyb3R0bGVkQ2hlY2tFbGVtZW50cyk7XG5cdFx0XHRcdFx0c2V0VGltZW91dChvbmxvYWQsIDIwMDAwKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmKGxhenlzaXplcy5lbGVtZW50cy5sZW5ndGgpe1xuXHRcdFx0XHRcdGNoZWNrRWxlbWVudHMoKTtcblx0XHRcdFx0XHRyQUYuX2xzRmx1c2goKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aHJvdHRsZWRDaGVja0VsZW1lbnRzKCk7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRjaGVja0VsZW1zOiB0aHJvdHRsZWRDaGVja0VsZW1lbnRzLFxuXHRcdFx0dW52ZWlsOiB1bnZlaWxFbGVtZW50LFxuXHRcdFx0X2FMU0w6IGFsdExvYWRtb2RlU2Nyb2xsTGlzdG5lcixcblx0XHR9O1xuXHR9KSgpO1xuXG5cblx0dmFyIGF1dG9TaXplciA9IChmdW5jdGlvbigpe1xuXHRcdHZhciBhdXRvc2l6ZXNFbGVtcztcblxuXHRcdHZhciBzaXplRWxlbWVudCA9IHJBRkl0KGZ1bmN0aW9uKGVsZW0sIHBhcmVudCwgZXZlbnQsIHdpZHRoKXtcblx0XHRcdHZhciBzb3VyY2VzLCBpLCBsZW47XG5cdFx0XHRlbGVtLl9sYXp5c2l6ZXNXaWR0aCA9IHdpZHRoO1xuXHRcdFx0d2lkdGggKz0gJ3B4JztcblxuXHRcdFx0ZWxlbS5zZXRBdHRyaWJ1dGUoJ3NpemVzJywgd2lkdGgpO1xuXG5cdFx0XHRpZihyZWdQaWN0dXJlLnRlc3QocGFyZW50Lm5vZGVOYW1lIHx8ICcnKSl7XG5cdFx0XHRcdHNvdXJjZXMgPSBwYXJlbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NvdXJjZScpO1xuXHRcdFx0XHRmb3IoaSA9IDAsIGxlbiA9IHNvdXJjZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspe1xuXHRcdFx0XHRcdHNvdXJjZXNbaV0uc2V0QXR0cmlidXRlKCdzaXplcycsIHdpZHRoKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpZighZXZlbnQuZGV0YWlsLmRhdGFBdHRyKXtcblx0XHRcdFx0dXBkYXRlUG9seWZpbGwoZWxlbSwgZXZlbnQuZGV0YWlsKTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHR2YXIgZ2V0U2l6ZUVsZW1lbnQgPSBmdW5jdGlvbiAoZWxlbSwgZGF0YUF0dHIsIHdpZHRoKXtcblx0XHRcdHZhciBldmVudDtcblx0XHRcdHZhciBwYXJlbnQgPSBlbGVtLnBhcmVudE5vZGU7XG5cblx0XHRcdGlmKHBhcmVudCl7XG5cdFx0XHRcdHdpZHRoID0gZ2V0V2lkdGgoZWxlbSwgcGFyZW50LCB3aWR0aCk7XG5cdFx0XHRcdGV2ZW50ID0gdHJpZ2dlckV2ZW50KGVsZW0sICdsYXp5YmVmb3Jlc2l6ZXMnLCB7d2lkdGg6IHdpZHRoLCBkYXRhQXR0cjogISFkYXRhQXR0cn0pO1xuXG5cdFx0XHRcdGlmKCFldmVudC5kZWZhdWx0UHJldmVudGVkKXtcblx0XHRcdFx0XHR3aWR0aCA9IGV2ZW50LmRldGFpbC53aWR0aDtcblxuXHRcdFx0XHRcdGlmKHdpZHRoICYmIHdpZHRoICE9PSBlbGVtLl9sYXp5c2l6ZXNXaWR0aCl7XG5cdFx0XHRcdFx0XHRzaXplRWxlbWVudChlbGVtLCBwYXJlbnQsIGV2ZW50LCB3aWR0aCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHZhciB1cGRhdGVFbGVtZW50c1NpemVzID0gZnVuY3Rpb24oKXtcblx0XHRcdHZhciBpO1xuXHRcdFx0dmFyIGxlbiA9IGF1dG9zaXplc0VsZW1zLmxlbmd0aDtcblx0XHRcdGlmKGxlbil7XG5cdFx0XHRcdGkgPSAwO1xuXG5cdFx0XHRcdGZvcig7IGkgPCBsZW47IGkrKyl7XG5cdFx0XHRcdFx0Z2V0U2l6ZUVsZW1lbnQoYXV0b3NpemVzRWxlbXNbaV0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHZhciBkZWJvdW5jZWRVcGRhdGVFbGVtZW50c1NpemVzID0gZGVib3VuY2UodXBkYXRlRWxlbWVudHNTaXplcyk7XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0XzogZnVuY3Rpb24oKXtcblx0XHRcdFx0YXV0b3NpemVzRWxlbXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGxhenlTaXplc0NmZy5hdXRvc2l6ZXNDbGFzcyk7XG5cdFx0XHRcdGFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGRlYm91bmNlZFVwZGF0ZUVsZW1lbnRzU2l6ZXMpO1xuXHRcdFx0fSxcblx0XHRcdGNoZWNrRWxlbXM6IGRlYm91bmNlZFVwZGF0ZUVsZW1lbnRzU2l6ZXMsXG5cdFx0XHR1cGRhdGVFbGVtOiBnZXRTaXplRWxlbWVudFxuXHRcdH07XG5cdH0pKCk7XG5cblx0dmFyIGluaXQgPSBmdW5jdGlvbigpe1xuXHRcdGlmKCFpbml0LmkgJiYgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSl7XG5cdFx0XHRpbml0LmkgPSB0cnVlO1xuXHRcdFx0YXV0b1NpemVyLl8oKTtcblx0XHRcdGxvYWRlci5fKCk7XG5cdFx0fVxuXHR9O1xuXG5cdHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblx0XHRpZihsYXp5U2l6ZXNDZmcuaW5pdCl7XG5cdFx0XHRpbml0KCk7XG5cdFx0fVxuXHR9KTtcblxuXHRsYXp5c2l6ZXMgPSB7XG5cdFx0Y2ZnOiBsYXp5U2l6ZXNDZmcsXG5cdFx0YXV0b1NpemVyOiBhdXRvU2l6ZXIsXG5cdFx0bG9hZGVyOiBsb2FkZXIsXG5cdFx0aW5pdDogaW5pdCxcblx0XHR1UDogdXBkYXRlUG9seWZpbGwsXG5cdFx0YUM6IGFkZENsYXNzLFxuXHRcdHJDOiByZW1vdmVDbGFzcyxcblx0XHRoQzogaGFzQ2xhc3MsXG5cdFx0ZmlyZTogdHJpZ2dlckV2ZW50LFxuXHRcdGdXOiBnZXRXaWR0aCxcblx0XHRyQUY6IHJBRixcblx0fTtcblxuXHRyZXR1cm4gbGF6eXNpemVzO1xufVxuKSk7XG4iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRPbmNlTGlzdGVuZXIgPSBub29wO1xuXG5wcm9jZXNzLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBbXSB9XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuIiwiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wic2Nyb2xsTG9ja1wiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJzY3JvbGxMb2NrXCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gLyoqKioqKi8gKGZ1bmN0aW9uKG1vZHVsZXMpIHsgLy8gd2VicGFja0Jvb3RzdHJhcFxuLyoqKioqKi8gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4vKioqKioqLyBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuLyoqKioqKi8gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG4vKioqKioqL1xuLyoqKioqKi8gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuLyoqKioqKi8gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4vKioqKioqLyBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbi8qKioqKiovIFx0XHR9XG4vKioqKioqLyBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbi8qKioqKiovIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4vKioqKioqLyBcdFx0XHRpOiBtb2R1bGVJZCxcbi8qKioqKiovIFx0XHRcdGw6IGZhbHNlLFxuLyoqKioqKi8gXHRcdFx0ZXhwb3J0czoge31cbi8qKioqKiovIFx0XHR9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbi8qKioqKiovIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcbi8qKioqKiovXG4vKioqKioqLyBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuLyoqKioqKi8gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcbi8qKioqKiovXG4vKioqKioqLyBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbi8qKioqKiovIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4vKioqKioqLyBcdH1cbi8qKioqKiovXG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbi8qKioqKiovIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4vKioqKioqLyBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbi8qKioqKiovIFx0XHR9XG4vKioqKioqLyBcdH07XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbi8qKioqKiovIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbi8qKioqKiovIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuLyoqKioqKi8gXHRcdH1cbi8qKioqKiovIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqKioqKi8gXHR9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4vKioqKioqLyBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuLyoqKioqKi8gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbi8qKioqKiovIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4vKioqKioqLyBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbi8qKioqKiovIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbi8qKioqKiovIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuLyoqKioqKi8gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4vKioqKioqLyBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbi8qKioqKiovIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuLyoqKioqKi8gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbi8qKioqKiovIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4vKioqKioqLyBcdFx0cmV0dXJuIG5zO1xuLyoqKioqKi8gXHR9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4vKioqKioqLyBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4vKioqKioqLyBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuLyoqKioqKi8gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbi8qKioqKiovIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4vKioqKioqLyBcdFx0cmV0dXJuIGdldHRlcjtcbi8qKioqKiovIFx0fTtcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuLyoqKioqKi9cbi8qKioqKiovXG4vKioqKioqLyBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLyoqKioqKi8gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcbi8qKioqKiovIH0pXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKioqKi8gKFtcbi8qIDAgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIF9fd2VicGFja19leHBvcnRzX18sIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIoX193ZWJwYWNrX2V4cG9ydHNfXyk7XG5cbi8vIENPTkNBVEVOQVRFRCBNT0RVTEU6IC4vc3JjL3Rvb2xzLmpzXG52YXIgYXJndW1lbnRBc0FycmF5ID0gZnVuY3Rpb24gYXJndW1lbnRBc0FycmF5KGFyZ3VtZW50KSB7XG4gIHJldHVybiBBcnJheS5pc0FycmF5KGFyZ3VtZW50KSA/IGFyZ3VtZW50IDogW2FyZ3VtZW50XTtcbn07XG52YXIgaXNFbGVtZW50ID0gZnVuY3Rpb24gaXNFbGVtZW50KHRhcmdldCkge1xuICByZXR1cm4gdGFyZ2V0IGluc3RhbmNlb2YgTm9kZTtcbn07XG52YXIgaXNFbGVtZW50TGlzdCA9IGZ1bmN0aW9uIGlzRWxlbWVudExpc3Qobm9kZUxpc3QpIHtcbiAgcmV0dXJuIG5vZGVMaXN0IGluc3RhbmNlb2YgTm9kZUxpc3Q7XG59O1xudmFyIGVhY2hOb2RlID0gZnVuY3Rpb24gZWFjaE5vZGUobm9kZUxpc3QsIGNhbGxiYWNrKSB7XG4gIGlmIChub2RlTGlzdCAmJiBjYWxsYmFjaykge1xuICAgIG5vZGVMaXN0ID0gaXNFbGVtZW50TGlzdChub2RlTGlzdCkgPyBub2RlTGlzdCA6IFtub2RlTGlzdF07XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5vZGVMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoY2FsbGJhY2sobm9kZUxpc3RbaV0sIGksIG5vZGVMaXN0Lmxlbmd0aCkgPT09IHRydWUpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xudmFyIHRocm93RXJyb3IgPSBmdW5jdGlvbiB0aHJvd0Vycm9yKG1lc3NhZ2UpIHtcbiAgcmV0dXJuIGNvbnNvbGUuZXJyb3IoXCJbc2Nyb2xsLWxvY2tdIFwiLmNvbmNhdChtZXNzYWdlKSk7XG59O1xudmFyIGFycmF5QXNTZWxlY3RvciA9IGZ1bmN0aW9uIGFycmF5QXNTZWxlY3RvcihhcnJheSkge1xuICBpZiAoQXJyYXkuaXNBcnJheShhcnJheSkpIHtcbiAgICB2YXIgc2VsZWN0b3IgPSBhcnJheS5qb2luKCcsICcpO1xuICAgIHJldHVybiBzZWxlY3RvcjtcbiAgfVxufTtcbnZhciBub2RlTGlzdEFzQXJyYXkgPSBmdW5jdGlvbiBub2RlTGlzdEFzQXJyYXkobm9kZUxpc3QpIHtcbiAgdmFyIG5vZGVzID0gW107XG4gIGVhY2hOb2RlKG5vZGVMaXN0LCBmdW5jdGlvbiAobm9kZSkge1xuICAgIHJldHVybiBub2Rlcy5wdXNoKG5vZGUpO1xuICB9KTtcbiAgcmV0dXJuIG5vZGVzO1xufTtcbnZhciBmaW5kUGFyZW50QnlTZWxlY3RvciA9IGZ1bmN0aW9uIGZpbmRQYXJlbnRCeVNlbGVjdG9yKCRlbCwgc2VsZWN0b3IpIHtcbiAgdmFyIHNlbGYgPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6IHRydWU7XG4gIHZhciAkcm9vdCA9IGFyZ3VtZW50cy5sZW5ndGggPiAzICYmIGFyZ3VtZW50c1szXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzNdIDogZG9jdW1lbnQ7XG5cbiAgaWYgKHNlbGYgJiYgbm9kZUxpc3RBc0FycmF5KCRyb290LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKS5pbmRleE9mKCRlbCkgIT09IC0xKSB7XG4gICAgcmV0dXJuICRlbDtcbiAgfVxuXG4gIHdoaWxlICgoJGVsID0gJGVsLnBhcmVudEVsZW1lbnQpICYmIG5vZGVMaXN0QXNBcnJheSgkcm9vdC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSkuaW5kZXhPZigkZWwpID09PSAtMSkge1xuICAgIDtcbiAgfVxuXG4gIHJldHVybiAkZWw7XG59O1xudmFyIGVsZW1lbnRIYXNTZWxlY3RvciA9IGZ1bmN0aW9uIGVsZW1lbnRIYXNTZWxlY3RvcigkZWwsIHNlbGVjdG9yKSB7XG4gIHZhciAkcm9vdCA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDogZG9jdW1lbnQ7XG4gIHZhciBoYXMgPSBub2RlTGlzdEFzQXJyYXkoJHJvb3QucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpLmluZGV4T2YoJGVsKSAhPT0gLTE7XG4gIHJldHVybiBoYXM7XG59O1xudmFyIGVsZW1lbnRIYXNPdmVyZmxvd0hpZGRlbiA9IGZ1bmN0aW9uIGVsZW1lbnRIYXNPdmVyZmxvd0hpZGRlbigkZWwpIHtcbiAgaWYgKCRlbCkge1xuICAgIHZhciBjb21wdXRlZFN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZSgkZWwpO1xuICAgIHZhciBvdmVyZmxvd0lzSGlkZGVuID0gY29tcHV0ZWRTdHlsZS5vdmVyZmxvdyA9PT0gJ2hpZGRlbic7XG4gICAgcmV0dXJuIG92ZXJmbG93SXNIaWRkZW47XG4gIH1cbn07XG52YXIgZWxlbWVudFNjcm9sbFRvcE9uU3RhcnQgPSBmdW5jdGlvbiBlbGVtZW50U2Nyb2xsVG9wT25TdGFydCgkZWwpIHtcbiAgaWYgKCRlbCkge1xuICAgIGlmIChlbGVtZW50SGFzT3ZlcmZsb3dIaWRkZW4oJGVsKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgdmFyIHNjcm9sbFRvcCA9ICRlbC5zY3JvbGxUb3A7XG4gICAgcmV0dXJuIHNjcm9sbFRvcCA8PSAwO1xuICB9XG59O1xudmFyIGVsZW1lbnRTY3JvbGxUb3BPbkVuZCA9IGZ1bmN0aW9uIGVsZW1lbnRTY3JvbGxUb3BPbkVuZCgkZWwpIHtcbiAgaWYgKCRlbCkge1xuICAgIGlmIChlbGVtZW50SGFzT3ZlcmZsb3dIaWRkZW4oJGVsKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgdmFyIHNjcm9sbFRvcCA9ICRlbC5zY3JvbGxUb3A7XG4gICAgdmFyIHNjcm9sbEhlaWdodCA9ICRlbC5zY3JvbGxIZWlnaHQ7XG4gICAgdmFyIHNjcm9sbFRvcFdpdGhIZWlnaHQgPSBzY3JvbGxUb3AgKyAkZWwub2Zmc2V0SGVpZ2h0O1xuICAgIHJldHVybiBzY3JvbGxUb3BXaXRoSGVpZ2h0ID49IHNjcm9sbEhlaWdodDtcbiAgfVxufTtcbnZhciBlbGVtZW50U2Nyb2xsTGVmdE9uU3RhcnQgPSBmdW5jdGlvbiBlbGVtZW50U2Nyb2xsTGVmdE9uU3RhcnQoJGVsKSB7XG4gIGlmICgkZWwpIHtcbiAgICBpZiAoZWxlbWVudEhhc092ZXJmbG93SGlkZGVuKCRlbCkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHZhciBzY3JvbGxMZWZ0ID0gJGVsLnNjcm9sbExlZnQ7XG4gICAgcmV0dXJuIHNjcm9sbExlZnQgPD0gMDtcbiAgfVxufTtcbnZhciBlbGVtZW50U2Nyb2xsTGVmdE9uRW5kID0gZnVuY3Rpb24gZWxlbWVudFNjcm9sbExlZnRPbkVuZCgkZWwpIHtcbiAgaWYgKCRlbCkge1xuICAgIGlmIChlbGVtZW50SGFzT3ZlcmZsb3dIaWRkZW4oJGVsKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgdmFyIHNjcm9sbExlZnQgPSAkZWwuc2Nyb2xsTGVmdDtcbiAgICB2YXIgc2Nyb2xsV2lkdGggPSAkZWwuc2Nyb2xsV2lkdGg7XG4gICAgdmFyIHNjcm9sbExlZnRXaXRoV2lkdGggPSBzY3JvbGxMZWZ0ICsgJGVsLm9mZnNldFdpZHRoO1xuICAgIHJldHVybiBzY3JvbGxMZWZ0V2l0aFdpZHRoID49IHNjcm9sbFdpZHRoO1xuICB9XG59O1xudmFyIGVsZW1lbnRJc1Njcm9sbGFibGVGaWVsZCA9IGZ1bmN0aW9uIGVsZW1lbnRJc1Njcm9sbGFibGVGaWVsZCgkZWwpIHtcbiAgdmFyIHNlbGVjdG9yID0gJ3RleHRhcmVhLCBbY29udGVudGVkaXRhYmxlPVwidHJ1ZVwiXSc7XG4gIHJldHVybiBlbGVtZW50SGFzU2VsZWN0b3IoJGVsLCBzZWxlY3Rvcik7XG59O1xudmFyIGVsZW1lbnRJc0lucHV0UmFuZ2UgPSBmdW5jdGlvbiBlbGVtZW50SXNJbnB1dFJhbmdlKCRlbCkge1xuICB2YXIgc2VsZWN0b3IgPSAnaW5wdXRbdHlwZT1cInJhbmdlXCJdJztcbiAgcmV0dXJuIGVsZW1lbnRIYXNTZWxlY3RvcigkZWwsIHNlbGVjdG9yKTtcbn07XG4vLyBDT05DQVRFTkFURUQgTU9EVUxFOiAuL3NyYy9zY3JvbGwtbG9jay5qc1xuLyogaGFybW9ueSBleHBvcnQgKGJpbmRpbmcpICovIF9fd2VicGFja19yZXF1aXJlX18uZChfX3dlYnBhY2tfZXhwb3J0c19fLCBcImRpc2FibGVQYWdlU2Nyb2xsXCIsIGZ1bmN0aW9uKCkgeyByZXR1cm4gZGlzYWJsZVBhZ2VTY3JvbGw7IH0pO1xuLyogaGFybW9ueSBleHBvcnQgKGJpbmRpbmcpICovIF9fd2VicGFja19yZXF1aXJlX18uZChfX3dlYnBhY2tfZXhwb3J0c19fLCBcImVuYWJsZVBhZ2VTY3JvbGxcIiwgZnVuY3Rpb24oKSB7IHJldHVybiBlbmFibGVQYWdlU2Nyb2xsOyB9KTtcbi8qIGhhcm1vbnkgZXhwb3J0IChiaW5kaW5nKSAqLyBfX3dlYnBhY2tfcmVxdWlyZV9fLmQoX193ZWJwYWNrX2V4cG9ydHNfXywgXCJnZXRTY3JvbGxTdGF0ZVwiLCBmdW5jdGlvbigpIHsgcmV0dXJuIGdldFNjcm9sbFN0YXRlOyB9KTtcbi8qIGhhcm1vbnkgZXhwb3J0IChiaW5kaW5nKSAqLyBfX3dlYnBhY2tfcmVxdWlyZV9fLmQoX193ZWJwYWNrX2V4cG9ydHNfXywgXCJjbGVhclF1ZXVlU2Nyb2xsTG9ja3NcIiwgZnVuY3Rpb24oKSB7IHJldHVybiBjbGVhclF1ZXVlU2Nyb2xsTG9ja3M7IH0pO1xuLyogaGFybW9ueSBleHBvcnQgKGJpbmRpbmcpICovIF9fd2VicGFja19yZXF1aXJlX18uZChfX3dlYnBhY2tfZXhwb3J0c19fLCBcImdldFRhcmdldFNjcm9sbEJhcldpZHRoXCIsIGZ1bmN0aW9uKCkgeyByZXR1cm4gc2Nyb2xsX2xvY2tfZ2V0VGFyZ2V0U2Nyb2xsQmFyV2lkdGg7IH0pO1xuLyogaGFybW9ueSBleHBvcnQgKGJpbmRpbmcpICovIF9fd2VicGFja19yZXF1aXJlX18uZChfX3dlYnBhY2tfZXhwb3J0c19fLCBcImdldEN1cnJlbnRUYXJnZXRTY3JvbGxCYXJXaWR0aFwiLCBmdW5jdGlvbigpIHsgcmV0dXJuIHNjcm9sbF9sb2NrX2dldEN1cnJlbnRUYXJnZXRTY3JvbGxCYXJXaWR0aDsgfSk7XG4vKiBoYXJtb255IGV4cG9ydCAoYmluZGluZykgKi8gX193ZWJwYWNrX3JlcXVpcmVfXy5kKF9fd2VicGFja19leHBvcnRzX18sIFwiZ2V0UGFnZVNjcm9sbEJhcldpZHRoXCIsIGZ1bmN0aW9uKCkgeyByZXR1cm4gZ2V0UGFnZVNjcm9sbEJhcldpZHRoOyB9KTtcbi8qIGhhcm1vbnkgZXhwb3J0IChiaW5kaW5nKSAqLyBfX3dlYnBhY2tfcmVxdWlyZV9fLmQoX193ZWJwYWNrX2V4cG9ydHNfXywgXCJnZXRDdXJyZW50UGFnZVNjcm9sbEJhcldpZHRoXCIsIGZ1bmN0aW9uKCkgeyByZXR1cm4gZ2V0Q3VycmVudFBhZ2VTY3JvbGxCYXJXaWR0aDsgfSk7XG4vKiBoYXJtb255IGV4cG9ydCAoYmluZGluZykgKi8gX193ZWJwYWNrX3JlcXVpcmVfXy5kKF9fd2VicGFja19leHBvcnRzX18sIFwiYWRkU2Nyb2xsYWJsZVRhcmdldFwiLCBmdW5jdGlvbigpIHsgcmV0dXJuIHNjcm9sbF9sb2NrX2FkZFNjcm9sbGFibGVUYXJnZXQ7IH0pO1xuLyogaGFybW9ueSBleHBvcnQgKGJpbmRpbmcpICovIF9fd2VicGFja19yZXF1aXJlX18uZChfX3dlYnBhY2tfZXhwb3J0c19fLCBcInJlbW92ZVNjcm9sbGFibGVUYXJnZXRcIiwgZnVuY3Rpb24oKSB7IHJldHVybiBzY3JvbGxfbG9ja19yZW1vdmVTY3JvbGxhYmxlVGFyZ2V0OyB9KTtcbi8qIGhhcm1vbnkgZXhwb3J0IChiaW5kaW5nKSAqLyBfX3dlYnBhY2tfcmVxdWlyZV9fLmQoX193ZWJwYWNrX2V4cG9ydHNfXywgXCJhZGRTY3JvbGxhYmxlU2VsZWN0b3JcIiwgZnVuY3Rpb24oKSB7IHJldHVybiBzY3JvbGxfbG9ja19hZGRTY3JvbGxhYmxlU2VsZWN0b3I7IH0pO1xuLyogaGFybW9ueSBleHBvcnQgKGJpbmRpbmcpICovIF9fd2VicGFja19yZXF1aXJlX18uZChfX3dlYnBhY2tfZXhwb3J0c19fLCBcInJlbW92ZVNjcm9sbGFibGVTZWxlY3RvclwiLCBmdW5jdGlvbigpIHsgcmV0dXJuIHNjcm9sbF9sb2NrX3JlbW92ZVNjcm9sbGFibGVTZWxlY3RvcjsgfSk7XG4vKiBoYXJtb255IGV4cG9ydCAoYmluZGluZykgKi8gX193ZWJwYWNrX3JlcXVpcmVfXy5kKF9fd2VicGFja19leHBvcnRzX18sIFwiYWRkTG9ja2FibGVUYXJnZXRcIiwgZnVuY3Rpb24oKSB7IHJldHVybiBzY3JvbGxfbG9ja19hZGRMb2NrYWJsZVRhcmdldDsgfSk7XG4vKiBoYXJtb255IGV4cG9ydCAoYmluZGluZykgKi8gX193ZWJwYWNrX3JlcXVpcmVfXy5kKF9fd2VicGFja19leHBvcnRzX18sIFwiYWRkTG9ja2FibGVTZWxlY3RvclwiLCBmdW5jdGlvbigpIHsgcmV0dXJuIHNjcm9sbF9sb2NrX2FkZExvY2thYmxlU2VsZWN0b3I7IH0pO1xuLyogaGFybW9ueSBleHBvcnQgKGJpbmRpbmcpICovIF9fd2VicGFja19yZXF1aXJlX18uZChfX3dlYnBhY2tfZXhwb3J0c19fLCBcInNldEZpbGxHYXBNZXRob2RcIiwgZnVuY3Rpb24oKSB7IHJldHVybiBzY3JvbGxfbG9ja19zZXRGaWxsR2FwTWV0aG9kOyB9KTtcbi8qIGhhcm1vbnkgZXhwb3J0IChiaW5kaW5nKSAqLyBfX3dlYnBhY2tfcmVxdWlyZV9fLmQoX193ZWJwYWNrX2V4cG9ydHNfXywgXCJhZGRGaWxsR2FwVGFyZ2V0XCIsIGZ1bmN0aW9uKCkgeyByZXR1cm4gc2Nyb2xsX2xvY2tfYWRkRmlsbEdhcFRhcmdldDsgfSk7XG4vKiBoYXJtb255IGV4cG9ydCAoYmluZGluZykgKi8gX193ZWJwYWNrX3JlcXVpcmVfXy5kKF9fd2VicGFja19leHBvcnRzX18sIFwicmVtb3ZlRmlsbEdhcFRhcmdldFwiLCBmdW5jdGlvbigpIHsgcmV0dXJuIHNjcm9sbF9sb2NrX3JlbW92ZUZpbGxHYXBUYXJnZXQ7IH0pO1xuLyogaGFybW9ueSBleHBvcnQgKGJpbmRpbmcpICovIF9fd2VicGFja19yZXF1aXJlX18uZChfX3dlYnBhY2tfZXhwb3J0c19fLCBcImFkZEZpbGxHYXBTZWxlY3RvclwiLCBmdW5jdGlvbigpIHsgcmV0dXJuIHNjcm9sbF9sb2NrX2FkZEZpbGxHYXBTZWxlY3RvcjsgfSk7XG4vKiBoYXJtb255IGV4cG9ydCAoYmluZGluZykgKi8gX193ZWJwYWNrX3JlcXVpcmVfXy5kKF9fd2VicGFja19leHBvcnRzX18sIFwicmVtb3ZlRmlsbEdhcFNlbGVjdG9yXCIsIGZ1bmN0aW9uKCkgeyByZXR1cm4gc2Nyb2xsX2xvY2tfcmVtb3ZlRmlsbEdhcFNlbGVjdG9yOyB9KTtcbi8qIGhhcm1vbnkgZXhwb3J0IChiaW5kaW5nKSAqLyBfX3dlYnBhY2tfcmVxdWlyZV9fLmQoX193ZWJwYWNrX2V4cG9ydHNfXywgXCJyZWZpbGxHYXBzXCIsIGZ1bmN0aW9uKCkgeyByZXR1cm4gcmVmaWxsR2FwczsgfSk7XG5mdW5jdGlvbiBfb2JqZWN0U3ByZWFkKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldICE9IG51bGwgPyBhcmd1bWVudHNbaV0gOiB7fTsgdmFyIG93bktleXMgPSBPYmplY3Qua2V5cyhzb3VyY2UpOyBpZiAodHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09ICdmdW5jdGlvbicpIHsgb3duS2V5cyA9IG93bktleXMuY29uY2F0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoc291cmNlKS5maWx0ZXIoZnVuY3Rpb24gKHN5bSkgeyByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2UsIHN5bSkuZW51bWVyYWJsZTsgfSkpOyB9IG93bktleXMuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7IF9kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgc291cmNlW2tleV0pOyB9KTsgfSByZXR1cm4gdGFyZ2V0OyB9XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHsgaWYgKGtleSBpbiBvYmopIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7IHZhbHVlOiB2YWx1ZSwgZW51bWVyYWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlLCB3cml0YWJsZTogdHJ1ZSB9KTsgfSBlbHNlIHsgb2JqW2tleV0gPSB2YWx1ZTsgfSByZXR1cm4gb2JqOyB9XG5cblxudmFyIEZJTExfR0FQX0FWQUlMQUJMRV9NRVRIT0RTID0gWydwYWRkaW5nJywgJ21hcmdpbicsICd3aWR0aCcsICdtYXgtd2lkdGgnLCAnbm9uZSddO1xudmFyIFRPVUNIX0RJUkVDVElPTl9ERVRFQ1RfT0ZGU0VUID0gMztcbnZhciBzdGF0ZSA9IHtcbiAgc2Nyb2xsOiB0cnVlLFxuICBxdWV1ZTogMCxcbiAgc2Nyb2xsYWJsZVNlbGVjdG9yczogWydbZGF0YS1zY3JvbGwtbG9jay1zY3JvbGxhYmxlXSddLFxuICBsb2NrYWJsZVNlbGVjdG9yczogWydib2R5JywgJ1tkYXRhLXNjcm9sbC1sb2NrLWxvY2thYmxlXSddLFxuICBmaWxsR2FwU2VsZWN0b3JzOiBbJ2JvZHknLCAnW2RhdGEtc2Nyb2xsLWxvY2stZmlsbC1nYXBdJywgJ1tkYXRhLXNjcm9sbC1sb2NrLWxvY2thYmxlXSddLFxuICBmaWxsR2FwTWV0aG9kOiBGSUxMX0dBUF9BVkFJTEFCTEVfTUVUSE9EU1swXSxcbiAgLy9cbiAgc3RhcnRUb3VjaFk6IDAsXG4gIHN0YXJ0VG91Y2hYOiAwXG59O1xudmFyIGRpc2FibGVQYWdlU2Nyb2xsID0gZnVuY3Rpb24gZGlzYWJsZVBhZ2VTY3JvbGwodGFyZ2V0KSB7XG4gIGlmIChzdGF0ZS5xdWV1ZSA8PSAwKSB7XG4gICAgc3RhdGUuc2Nyb2xsID0gZmFsc2U7XG4gICAgc2Nyb2xsX2xvY2tfaGlkZUxvY2thYmxlT3ZlcmZsb3coKTtcbiAgICBmaWxsR2FwcygpO1xuICB9XG5cbiAgc2Nyb2xsX2xvY2tfYWRkU2Nyb2xsYWJsZVRhcmdldCh0YXJnZXQpO1xuICBzdGF0ZS5xdWV1ZSsrO1xufTtcbnZhciBlbmFibGVQYWdlU2Nyb2xsID0gZnVuY3Rpb24gZW5hYmxlUGFnZVNjcm9sbCh0YXJnZXQpIHtcbiAgc3RhdGUucXVldWUgPiAwICYmIHN0YXRlLnF1ZXVlLS07XG5cbiAgaWYgKHN0YXRlLnF1ZXVlIDw9IDApIHtcbiAgICBzdGF0ZS5zY3JvbGwgPSB0cnVlO1xuICAgIHNjcm9sbF9sb2NrX3Nob3dMb2NrYWJsZU92ZXJmbG93KCk7XG4gICAgdW5maWxsR2FwcygpO1xuICB9XG5cbiAgc2Nyb2xsX2xvY2tfcmVtb3ZlU2Nyb2xsYWJsZVRhcmdldCh0YXJnZXQpO1xufTtcbnZhciBnZXRTY3JvbGxTdGF0ZSA9IGZ1bmN0aW9uIGdldFNjcm9sbFN0YXRlKCkge1xuICByZXR1cm4gc3RhdGUuc2Nyb2xsO1xufTtcbnZhciBjbGVhclF1ZXVlU2Nyb2xsTG9ja3MgPSBmdW5jdGlvbiBjbGVhclF1ZXVlU2Nyb2xsTG9ja3MoKSB7XG4gIHN0YXRlLnF1ZXVlID0gMDtcbn07XG52YXIgc2Nyb2xsX2xvY2tfZ2V0VGFyZ2V0U2Nyb2xsQmFyV2lkdGggPSBmdW5jdGlvbiBnZXRUYXJnZXRTY3JvbGxCYXJXaWR0aCgkdGFyZ2V0KSB7XG4gIHZhciBvbmx5RXhpc3RzID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiBmYWxzZTtcblxuICBpZiAoaXNFbGVtZW50KCR0YXJnZXQpKSB7XG4gICAgdmFyIGN1cnJlbnRPdmVyZmxvd1lQcm9wZXJ0eSA9ICR0YXJnZXQuc3R5bGUub3ZlcmZsb3dZO1xuXG4gICAgaWYgKG9ubHlFeGlzdHMpIHtcbiAgICAgIGlmICghZ2V0U2Nyb2xsU3RhdGUoKSkge1xuICAgICAgICAkdGFyZ2V0LnN0eWxlLm92ZXJmbG93WSA9ICR0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXNjcm9sbC1sb2NrLXNhdmVkLW92ZXJmbG93LXktcHJvcGVydHknKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgJHRhcmdldC5zdHlsZS5vdmVyZmxvd1kgPSAnc2Nyb2xsJztcbiAgICB9XG5cbiAgICB2YXIgd2lkdGggPSBzY3JvbGxfbG9ja19nZXRDdXJyZW50VGFyZ2V0U2Nyb2xsQmFyV2lkdGgoJHRhcmdldCk7XG4gICAgJHRhcmdldC5zdHlsZS5vdmVyZmxvd1kgPSBjdXJyZW50T3ZlcmZsb3dZUHJvcGVydHk7XG4gICAgcmV0dXJuIHdpZHRoO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAwO1xuICB9XG59O1xudmFyIHNjcm9sbF9sb2NrX2dldEN1cnJlbnRUYXJnZXRTY3JvbGxCYXJXaWR0aCA9IGZ1bmN0aW9uIGdldEN1cnJlbnRUYXJnZXRTY3JvbGxCYXJXaWR0aCgkdGFyZ2V0KSB7XG4gIGlmIChpc0VsZW1lbnQoJHRhcmdldCkpIHtcbiAgICBpZiAoJHRhcmdldCA9PT0gZG9jdW1lbnQuYm9keSkge1xuICAgICAgdmFyIGRvY3VtZW50V2lkdGggPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGg7XG4gICAgICB2YXIgd2luZG93V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAgIHZhciBjdXJyZW50V2lkdGggPSB3aW5kb3dXaWR0aCAtIGRvY3VtZW50V2lkdGg7XG4gICAgICByZXR1cm4gY3VycmVudFdpZHRoO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgYm9yZGVyTGVmdFdpZHRoQ3VycmVudFByb3BlcnR5ID0gJHRhcmdldC5zdHlsZS5ib3JkZXJMZWZ0V2lkdGg7XG4gICAgICB2YXIgYm9yZGVyUmlnaHRXaWR0aEN1cnJlbnRQcm9wZXJ0eSA9ICR0YXJnZXQuc3R5bGUuYm9yZGVyUmlnaHRXaWR0aDtcbiAgICAgICR0YXJnZXQuc3R5bGUuYm9yZGVyTGVmdFdpZHRoID0gJzBweCc7XG4gICAgICAkdGFyZ2V0LnN0eWxlLmJvcmRlclJpZ2h0V2lkdGggPSAnMHB4JztcblxuICAgICAgdmFyIF9jdXJyZW50V2lkdGggPSAkdGFyZ2V0Lm9mZnNldFdpZHRoIC0gJHRhcmdldC5jbGllbnRXaWR0aDtcblxuICAgICAgJHRhcmdldC5zdHlsZS5ib3JkZXJMZWZ0V2lkdGggPSBib3JkZXJMZWZ0V2lkdGhDdXJyZW50UHJvcGVydHk7XG4gICAgICAkdGFyZ2V0LnN0eWxlLmJvcmRlclJpZ2h0V2lkdGggPSBib3JkZXJSaWdodFdpZHRoQ3VycmVudFByb3BlcnR5O1xuICAgICAgcmV0dXJuIF9jdXJyZW50V2lkdGg7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHJldHVybiAwO1xuICB9XG59O1xudmFyIGdldFBhZ2VTY3JvbGxCYXJXaWR0aCA9IGZ1bmN0aW9uIGdldFBhZ2VTY3JvbGxCYXJXaWR0aCgpIHtcbiAgdmFyIG9ubHlFeGlzdHMgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IGZhbHNlO1xuICByZXR1cm4gc2Nyb2xsX2xvY2tfZ2V0VGFyZ2V0U2Nyb2xsQmFyV2lkdGgoZG9jdW1lbnQuYm9keSwgb25seUV4aXN0cyk7XG59O1xudmFyIGdldEN1cnJlbnRQYWdlU2Nyb2xsQmFyV2lkdGggPSBmdW5jdGlvbiBnZXRDdXJyZW50UGFnZVNjcm9sbEJhcldpZHRoKCkge1xuICByZXR1cm4gc2Nyb2xsX2xvY2tfZ2V0Q3VycmVudFRhcmdldFNjcm9sbEJhcldpZHRoKGRvY3VtZW50LmJvZHkpO1xufTtcbnZhciBzY3JvbGxfbG9ja19hZGRTY3JvbGxhYmxlVGFyZ2V0ID0gZnVuY3Rpb24gYWRkU2Nyb2xsYWJsZVRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHRhcmdldCkge1xuICAgIHZhciB0YXJnZXRzID0gYXJndW1lbnRBc0FycmF5KHRhcmdldCk7XG4gICAgdGFyZ2V0cy5tYXAoZnVuY3Rpb24gKCR0YXJnZXRzKSB7XG4gICAgICBlYWNoTm9kZSgkdGFyZ2V0cywgZnVuY3Rpb24gKCR0YXJnZXQpIHtcbiAgICAgICAgaWYgKGlzRWxlbWVudCgkdGFyZ2V0KSkge1xuICAgICAgICAgICR0YXJnZXQuc2V0QXR0cmlidXRlKCdkYXRhLXNjcm9sbC1sb2NrLXNjcm9sbGFibGUnLCAnJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3dFcnJvcihcIlxcXCJcIi5jb25jYXQoJHRhcmdldCwgXCJcXFwiIGlzIG5vdCBhIEVsZW1lbnQuXCIpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn07XG52YXIgc2Nyb2xsX2xvY2tfcmVtb3ZlU2Nyb2xsYWJsZVRhcmdldCA9IGZ1bmN0aW9uIHJlbW92ZVNjcm9sbGFibGVUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0YXJnZXQpIHtcbiAgICB2YXIgdGFyZ2V0cyA9IGFyZ3VtZW50QXNBcnJheSh0YXJnZXQpO1xuICAgIHRhcmdldHMubWFwKGZ1bmN0aW9uICgkdGFyZ2V0cykge1xuICAgICAgZWFjaE5vZGUoJHRhcmdldHMsIGZ1bmN0aW9uICgkdGFyZ2V0KSB7XG4gICAgICAgIGlmIChpc0VsZW1lbnQoJHRhcmdldCkpIHtcbiAgICAgICAgICAkdGFyZ2V0LnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS1zY3JvbGwtbG9jay1zY3JvbGxhYmxlJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3dFcnJvcihcIlxcXCJcIi5jb25jYXQoJHRhcmdldCwgXCJcXFwiIGlzIG5vdCBhIEVsZW1lbnQuXCIpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn07XG52YXIgc2Nyb2xsX2xvY2tfYWRkU2Nyb2xsYWJsZVNlbGVjdG9yID0gZnVuY3Rpb24gYWRkU2Nyb2xsYWJsZVNlbGVjdG9yKHNlbGVjdG9yKSB7XG4gIGlmIChzZWxlY3Rvcikge1xuICAgIHZhciBzZWxlY3RvcnMgPSBhcmd1bWVudEFzQXJyYXkoc2VsZWN0b3IpO1xuICAgIHNlbGVjdG9ycy5tYXAoZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gICAgICBzdGF0ZS5zY3JvbGxhYmxlU2VsZWN0b3JzLnB1c2goc2VsZWN0b3IpO1xuICAgIH0pO1xuICB9XG59O1xudmFyIHNjcm9sbF9sb2NrX3JlbW92ZVNjcm9sbGFibGVTZWxlY3RvciA9IGZ1bmN0aW9uIHJlbW92ZVNjcm9sbGFibGVTZWxlY3RvcihzZWxlY3Rvcikge1xuICBpZiAoc2VsZWN0b3IpIHtcbiAgICB2YXIgc2VsZWN0b3JzID0gYXJndW1lbnRBc0FycmF5KHNlbGVjdG9yKTtcbiAgICBzZWxlY3RvcnMubWFwKGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICAgICAgc3RhdGUuc2Nyb2xsYWJsZVNlbGVjdG9ycyA9IHN0YXRlLnNjcm9sbGFibGVTZWxlY3RvcnMuZmlsdGVyKGZ1bmN0aW9uIChzU2VsZWN0b3IpIHtcbiAgICAgICAgcmV0dXJuIHNTZWxlY3RvciAhPT0gc2VsZWN0b3I7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufTtcbnZhciBzY3JvbGxfbG9ja19hZGRMb2NrYWJsZVRhcmdldCA9IGZ1bmN0aW9uIGFkZExvY2thYmxlVGFyZ2V0KHRhcmdldCkge1xuICBpZiAodGFyZ2V0KSB7XG4gICAgdmFyIHRhcmdldHMgPSBhcmd1bWVudEFzQXJyYXkodGFyZ2V0KTtcbiAgICB0YXJnZXRzLm1hcChmdW5jdGlvbiAoJHRhcmdldHMpIHtcbiAgICAgIGVhY2hOb2RlKCR0YXJnZXRzLCBmdW5jdGlvbiAoJHRhcmdldCkge1xuICAgICAgICBpZiAoaXNFbGVtZW50KCR0YXJnZXQpKSB7XG4gICAgICAgICAgJHRhcmdldC5zZXRBdHRyaWJ1dGUoJ2RhdGEtc2Nyb2xsLWxvY2stbG9ja2FibGUnLCAnJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3dFcnJvcihcIlxcXCJcIi5jb25jYXQoJHRhcmdldCwgXCJcXFwiIGlzIG5vdCBhIEVsZW1lbnQuXCIpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBpZiAoIWdldFNjcm9sbFN0YXRlKCkpIHtcbiAgICAgIHNjcm9sbF9sb2NrX2hpZGVMb2NrYWJsZU92ZXJmbG93KCk7XG4gICAgfVxuICB9XG59O1xudmFyIHNjcm9sbF9sb2NrX2FkZExvY2thYmxlU2VsZWN0b3IgPSBmdW5jdGlvbiBhZGRMb2NrYWJsZVNlbGVjdG9yKHNlbGVjdG9yKSB7XG4gIGlmIChzZWxlY3Rvcikge1xuICAgIHZhciBzZWxlY3RvcnMgPSBhcmd1bWVudEFzQXJyYXkoc2VsZWN0b3IpO1xuICAgIHNlbGVjdG9ycy5tYXAoZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gICAgICBzdGF0ZS5sb2NrYWJsZVNlbGVjdG9ycy5wdXNoKHNlbGVjdG9yKTtcbiAgICB9KTtcblxuICAgIGlmICghZ2V0U2Nyb2xsU3RhdGUoKSkge1xuICAgICAgc2Nyb2xsX2xvY2tfaGlkZUxvY2thYmxlT3ZlcmZsb3coKTtcbiAgICB9XG5cbiAgICBzY3JvbGxfbG9ja19hZGRGaWxsR2FwU2VsZWN0b3Ioc2VsZWN0b3IpO1xuICB9XG59O1xudmFyIHNjcm9sbF9sb2NrX3NldEZpbGxHYXBNZXRob2QgPSBmdW5jdGlvbiBzZXRGaWxsR2FwTWV0aG9kKG1ldGhvZCkge1xuICBpZiAobWV0aG9kKSB7XG4gICAgaWYgKEZJTExfR0FQX0FWQUlMQUJMRV9NRVRIT0RTLmluZGV4T2YobWV0aG9kKSAhPT0gLTEpIHtcbiAgICAgIHN0YXRlLmZpbGxHYXBNZXRob2QgPSBtZXRob2Q7XG4gICAgICByZWZpbGxHYXBzKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBtZXRob2RzID0gRklMTF9HQVBfQVZBSUxBQkxFX01FVEhPRFMuam9pbignLCAnKTtcbiAgICAgIHRocm93RXJyb3IoXCJcXFwiXCIuY29uY2F0KG1ldGhvZCwgXCJcXFwiIG1ldGhvZCBpcyBub3QgYXZhaWxhYmxlIVxcbkF2YWlsYWJsZSBmaWxsIGdhcCBtZXRob2RzOiBcIikuY29uY2F0KG1ldGhvZHMsIFwiLlwiKSk7XG4gICAgfVxuICB9XG59O1xudmFyIHNjcm9sbF9sb2NrX2FkZEZpbGxHYXBUYXJnZXQgPSBmdW5jdGlvbiBhZGRGaWxsR2FwVGFyZ2V0KHRhcmdldCkge1xuICBpZiAodGFyZ2V0KSB7XG4gICAgdmFyIHRhcmdldHMgPSBhcmd1bWVudEFzQXJyYXkodGFyZ2V0KTtcbiAgICB0YXJnZXRzLm1hcChmdW5jdGlvbiAoJHRhcmdldHMpIHtcbiAgICAgIGVhY2hOb2RlKCR0YXJnZXRzLCBmdW5jdGlvbiAoJHRhcmdldCkge1xuICAgICAgICBpZiAoaXNFbGVtZW50KCR0YXJnZXQpKSB7XG4gICAgICAgICAgJHRhcmdldC5zZXRBdHRyaWJ1dGUoJ2RhdGEtc2Nyb2xsLWxvY2stZmlsbC1nYXAnLCAnJyk7XG5cbiAgICAgICAgICBpZiAoIXN0YXRlLnNjcm9sbCkge1xuICAgICAgICAgICAgc2Nyb2xsX2xvY2tfZmlsbEdhcFRhcmdldCgkdGFyZ2V0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3dFcnJvcihcIlxcXCJcIi5jb25jYXQoJHRhcmdldCwgXCJcXFwiIGlzIG5vdCBhIEVsZW1lbnQuXCIpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn07XG52YXIgc2Nyb2xsX2xvY2tfcmVtb3ZlRmlsbEdhcFRhcmdldCA9IGZ1bmN0aW9uIHJlbW92ZUZpbGxHYXBUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0YXJnZXQpIHtcbiAgICB2YXIgdGFyZ2V0cyA9IGFyZ3VtZW50QXNBcnJheSh0YXJnZXQpO1xuICAgIHRhcmdldHMubWFwKGZ1bmN0aW9uICgkdGFyZ2V0cykge1xuICAgICAgZWFjaE5vZGUoJHRhcmdldHMsIGZ1bmN0aW9uICgkdGFyZ2V0KSB7XG4gICAgICAgIGlmIChpc0VsZW1lbnQoJHRhcmdldCkpIHtcbiAgICAgICAgICAkdGFyZ2V0LnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS1zY3JvbGwtbG9jay1maWxsLWdhcCcpO1xuXG4gICAgICAgICAgaWYgKCFzdGF0ZS5zY3JvbGwpIHtcbiAgICAgICAgICAgIHNjcm9sbF9sb2NrX3VuZmlsbEdhcFRhcmdldCgkdGFyZ2V0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3dFcnJvcihcIlxcXCJcIi5jb25jYXQoJHRhcmdldCwgXCJcXFwiIGlzIG5vdCBhIEVsZW1lbnQuXCIpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn07XG52YXIgc2Nyb2xsX2xvY2tfYWRkRmlsbEdhcFNlbGVjdG9yID0gZnVuY3Rpb24gYWRkRmlsbEdhcFNlbGVjdG9yKHNlbGVjdG9yKSB7XG4gIGlmIChzZWxlY3Rvcikge1xuICAgIHZhciBzZWxlY3RvcnMgPSBhcmd1bWVudEFzQXJyYXkoc2VsZWN0b3IpO1xuICAgIHNlbGVjdG9ycy5tYXAoZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gICAgICBpZiAoc3RhdGUuZmlsbEdhcFNlbGVjdG9ycy5pbmRleE9mKHNlbGVjdG9yKSA9PT0gLTEpIHtcbiAgICAgICAgc3RhdGUuZmlsbEdhcFNlbGVjdG9ycy5wdXNoKHNlbGVjdG9yKTtcblxuICAgICAgICBpZiAoIXN0YXRlLnNjcm9sbCkge1xuICAgICAgICAgIHNjcm9sbF9sb2NrX2ZpbGxHYXBTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufTtcbnZhciBzY3JvbGxfbG9ja19yZW1vdmVGaWxsR2FwU2VsZWN0b3IgPSBmdW5jdGlvbiByZW1vdmVGaWxsR2FwU2VsZWN0b3Ioc2VsZWN0b3IpIHtcbiAgaWYgKHNlbGVjdG9yKSB7XG4gICAgdmFyIHNlbGVjdG9ycyA9IGFyZ3VtZW50QXNBcnJheShzZWxlY3Rvcik7XG4gICAgc2VsZWN0b3JzLm1hcChmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgICAgIHN0YXRlLmZpbGxHYXBTZWxlY3RvcnMgPSBzdGF0ZS5maWxsR2FwU2VsZWN0b3JzLmZpbHRlcihmdW5jdGlvbiAoZlNlbGVjdG9yKSB7XG4gICAgICAgIHJldHVybiBmU2VsZWN0b3IgIT09IHNlbGVjdG9yO1xuICAgICAgfSk7XG5cbiAgICAgIGlmICghc3RhdGUuc2Nyb2xsKSB7XG4gICAgICAgIHNjcm9sbF9sb2NrX3VuZmlsbEdhcFNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufTtcbnZhciByZWZpbGxHYXBzID0gZnVuY3Rpb24gcmVmaWxsR2FwcygpIHtcbiAgaWYgKCFzdGF0ZS5zY3JvbGwpIHtcbiAgICBmaWxsR2FwcygpO1xuICB9XG59O1xuXG52YXIgc2Nyb2xsX2xvY2tfaGlkZUxvY2thYmxlT3ZlcmZsb3cgPSBmdW5jdGlvbiBoaWRlTG9ja2FibGVPdmVyZmxvdygpIHtcbiAgdmFyIHNlbGVjdG9yID0gYXJyYXlBc1NlbGVjdG9yKHN0YXRlLmxvY2thYmxlU2VsZWN0b3JzKTtcbiAgc2Nyb2xsX2xvY2tfaGlkZUxvY2thYmxlT3ZlcmZsb3dTZWxlY3RvcihzZWxlY3Rvcik7XG59O1xuXG52YXIgc2Nyb2xsX2xvY2tfc2hvd0xvY2thYmxlT3ZlcmZsb3cgPSBmdW5jdGlvbiBzaG93TG9ja2FibGVPdmVyZmxvdygpIHtcbiAgdmFyIHNlbGVjdG9yID0gYXJyYXlBc1NlbGVjdG9yKHN0YXRlLmxvY2thYmxlU2VsZWN0b3JzKTtcbiAgc2Nyb2xsX2xvY2tfc2hvd0xvY2thYmxlT3ZlcmZsb3dTZWxlY3RvcihzZWxlY3Rvcik7XG59O1xuXG52YXIgc2Nyb2xsX2xvY2tfaGlkZUxvY2thYmxlT3ZlcmZsb3dTZWxlY3RvciA9IGZ1bmN0aW9uIGhpZGVMb2NrYWJsZU92ZXJmbG93U2VsZWN0b3Ioc2VsZWN0b3IpIHtcbiAgdmFyICR0YXJnZXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG4gIGVhY2hOb2RlKCR0YXJnZXRzLCBmdW5jdGlvbiAoJHRhcmdldCkge1xuICAgIHNjcm9sbF9sb2NrX2hpZGVMb2NrYWJsZU92ZXJmbG93VGFyZ2V0KCR0YXJnZXQpO1xuICB9KTtcbn07XG5cbnZhciBzY3JvbGxfbG9ja19zaG93TG9ja2FibGVPdmVyZmxvd1NlbGVjdG9yID0gZnVuY3Rpb24gc2hvd0xvY2thYmxlT3ZlcmZsb3dTZWxlY3RvcihzZWxlY3Rvcikge1xuICB2YXIgJHRhcmdldHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcbiAgZWFjaE5vZGUoJHRhcmdldHMsIGZ1bmN0aW9uICgkdGFyZ2V0KSB7XG4gICAgc2Nyb2xsX2xvY2tfc2hvd0xvY2thYmxlT3ZlcmZsb3dUYXJnZXQoJHRhcmdldCk7XG4gIH0pO1xufTtcblxudmFyIHNjcm9sbF9sb2NrX2hpZGVMb2NrYWJsZU92ZXJmbG93VGFyZ2V0ID0gZnVuY3Rpb24gaGlkZUxvY2thYmxlT3ZlcmZsb3dUYXJnZXQoJHRhcmdldCkge1xuICBpZiAoaXNFbGVtZW50KCR0YXJnZXQpICYmICR0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXNjcm9sbC1sb2NrLWxvY2tlZCcpICE9PSAndHJ1ZScpIHtcbiAgICB2YXIgY29tcHV0ZWRTdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKCR0YXJnZXQpO1xuICAgICR0YXJnZXQuc2V0QXR0cmlidXRlKCdkYXRhLXNjcm9sbC1sb2NrLXNhdmVkLW92ZXJmbG93LXktcHJvcGVydHknLCBjb21wdXRlZFN0eWxlLm92ZXJmbG93WSk7XG4gICAgJHRhcmdldC5zZXRBdHRyaWJ1dGUoJ2RhdGEtc2Nyb2xsLWxvY2stc2F2ZWQtaW5saW5lLW92ZXJmbG93LXByb3BlcnR5JywgJHRhcmdldC5zdHlsZS5vdmVyZmxvdyk7XG4gICAgJHRhcmdldC5zZXRBdHRyaWJ1dGUoJ2RhdGEtc2Nyb2xsLWxvY2stc2F2ZWQtaW5saW5lLW92ZXJmbG93LXktcHJvcGVydHknLCAkdGFyZ2V0LnN0eWxlLm92ZXJmbG93WSk7XG4gICAgJHRhcmdldC5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xuICAgICR0YXJnZXQuc2V0QXR0cmlidXRlKCdkYXRhLXNjcm9sbC1sb2NrLWxvY2tlZCcsICd0cnVlJyk7XG4gIH1cbn07XG5cbnZhciBzY3JvbGxfbG9ja19zaG93TG9ja2FibGVPdmVyZmxvd1RhcmdldCA9IGZ1bmN0aW9uIHNob3dMb2NrYWJsZU92ZXJmbG93VGFyZ2V0KCR0YXJnZXQpIHtcbiAgaWYgKGlzRWxlbWVudCgkdGFyZ2V0KSAmJiAkdGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1zY3JvbGwtbG9jay1sb2NrZWQnKSA9PT0gJ3RydWUnKSB7XG4gICAgJHRhcmdldC5zdHlsZS5vdmVyZmxvdyA9ICR0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXNjcm9sbC1sb2NrLXNhdmVkLWlubGluZS1vdmVyZmxvdy1wcm9wZXJ0eScpO1xuICAgICR0YXJnZXQuc3R5bGUub3ZlcmZsb3dZID0gJHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2Nyb2xsLWxvY2stc2F2ZWQtaW5saW5lLW92ZXJmbG93LXktcHJvcGVydHknKTtcbiAgICAkdGFyZ2V0LnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS1zY3JvbGwtbG9jay1zYXZlZC1vdmVyZmxvdy1wcm9wZXJ0eScpO1xuICAgICR0YXJnZXQucmVtb3ZlQXR0cmlidXRlKCdkYXRhLXNjcm9sbC1sb2NrLXNhdmVkLWlubGluZS1vdmVyZmxvdy1wcm9wZXJ0eScpO1xuICAgICR0YXJnZXQucmVtb3ZlQXR0cmlidXRlKCdkYXRhLXNjcm9sbC1sb2NrLXNhdmVkLWlubGluZS1vdmVyZmxvdy15LXByb3BlcnR5Jyk7XG4gICAgJHRhcmdldC5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtc2Nyb2xsLWxvY2stbG9ja2VkJyk7XG4gIH1cbn07XG5cbnZhciBmaWxsR2FwcyA9IGZ1bmN0aW9uIGZpbGxHYXBzKCkge1xuICBzdGF0ZS5maWxsR2FwU2VsZWN0b3JzLm1hcChmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgICBzY3JvbGxfbG9ja19maWxsR2FwU2VsZWN0b3Ioc2VsZWN0b3IpO1xuICB9KTtcbn07XG5cbnZhciB1bmZpbGxHYXBzID0gZnVuY3Rpb24gdW5maWxsR2FwcygpIHtcbiAgc3RhdGUuZmlsbEdhcFNlbGVjdG9ycy5tYXAoZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gICAgc2Nyb2xsX2xvY2tfdW5maWxsR2FwU2VsZWN0b3Ioc2VsZWN0b3IpO1xuICB9KTtcbn07XG5cbnZhciBzY3JvbGxfbG9ja19maWxsR2FwU2VsZWN0b3IgPSBmdW5jdGlvbiBmaWxsR2FwU2VsZWN0b3Ioc2VsZWN0b3IpIHtcbiAgdmFyICR0YXJnZXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG4gIHZhciBpc0xvY2thYmxlID0gc3RhdGUubG9ja2FibGVTZWxlY3RvcnMuaW5kZXhPZihzZWxlY3RvcikgIT09IC0xO1xuICBlYWNoTm9kZSgkdGFyZ2V0cywgZnVuY3Rpb24gKCR0YXJnZXQpIHtcbiAgICBzY3JvbGxfbG9ja19maWxsR2FwVGFyZ2V0KCR0YXJnZXQsIGlzTG9ja2FibGUpO1xuICB9KTtcbn07XG5cbnZhciBzY3JvbGxfbG9ja19maWxsR2FwVGFyZ2V0ID0gZnVuY3Rpb24gZmlsbEdhcFRhcmdldCgkdGFyZ2V0KSB7XG4gIHZhciBpc0xvY2thYmxlID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiBmYWxzZTtcblxuICBpZiAoaXNFbGVtZW50KCR0YXJnZXQpKSB7XG4gICAgdmFyIHNjcm9sbEJhcldpZHRoO1xuXG4gICAgaWYgKCR0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXNjcm9sbC1sb2NrLWxvY2thYmxlJykgPT09ICcnIHx8IGlzTG9ja2FibGUpIHtcbiAgICAgIHNjcm9sbEJhcldpZHRoID0gc2Nyb2xsX2xvY2tfZ2V0VGFyZ2V0U2Nyb2xsQmFyV2lkdGgoJHRhcmdldCwgdHJ1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciAkbG9ja2FibGVQYXJlbnQgPSBmaW5kUGFyZW50QnlTZWxlY3RvcigkdGFyZ2V0LCBhcnJheUFzU2VsZWN0b3Ioc3RhdGUubG9ja2FibGVTZWxlY3RvcnMpKTtcbiAgICAgIHNjcm9sbEJhcldpZHRoID0gc2Nyb2xsX2xvY2tfZ2V0VGFyZ2V0U2Nyb2xsQmFyV2lkdGgoJGxvY2thYmxlUGFyZW50LCB0cnVlKTtcbiAgICB9XG5cbiAgICBpZiAoJHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2Nyb2xsLWxvY2stZmlsbGVkLWdhcCcpID09PSAndHJ1ZScpIHtcbiAgICAgIHNjcm9sbF9sb2NrX3VuZmlsbEdhcFRhcmdldCgkdGFyZ2V0KTtcbiAgICB9XG5cbiAgICB2YXIgY29tcHV0ZWRTdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKCR0YXJnZXQpO1xuICAgICR0YXJnZXQuc2V0QXR0cmlidXRlKCdkYXRhLXNjcm9sbC1sb2NrLWZpbGxlZC1nYXAnLCAndHJ1ZScpO1xuICAgICR0YXJnZXQuc2V0QXR0cmlidXRlKCdkYXRhLXNjcm9sbC1sb2NrLWN1cnJlbnQtZmlsbC1nYXAtbWV0aG9kJywgc3RhdGUuZmlsbEdhcE1ldGhvZCk7XG5cbiAgICBpZiAoc3RhdGUuZmlsbEdhcE1ldGhvZCA9PT0gJ21hcmdpbicpIHtcbiAgICAgIHZhciBjdXJyZW50TWFyZ2luID0gcGFyc2VGbG9hdChjb21wdXRlZFN0eWxlLm1hcmdpblJpZ2h0KTtcbiAgICAgICR0YXJnZXQuc3R5bGUubWFyZ2luUmlnaHQgPSBcIlwiLmNvbmNhdChjdXJyZW50TWFyZ2luICsgc2Nyb2xsQmFyV2lkdGgsIFwicHhcIik7XG4gICAgfSBlbHNlIGlmIChzdGF0ZS5maWxsR2FwTWV0aG9kID09PSAnd2lkdGgnKSB7XG4gICAgICAkdGFyZ2V0LnN0eWxlLndpZHRoID0gXCJjYWxjKDEwMCUgLSBcIi5jb25jYXQoc2Nyb2xsQmFyV2lkdGgsIFwicHgpXCIpO1xuICAgIH0gZWxzZSBpZiAoc3RhdGUuZmlsbEdhcE1ldGhvZCA9PT0gJ21heC13aWR0aCcpIHtcbiAgICAgICR0YXJnZXQuc3R5bGUubWF4V2lkdGggPSBcImNhbGMoMTAwJSAtIFwiLmNvbmNhdChzY3JvbGxCYXJXaWR0aCwgXCJweClcIik7XG4gICAgfSBlbHNlIGlmIChzdGF0ZS5maWxsR2FwTWV0aG9kID09PSAncGFkZGluZycpIHtcbiAgICAgIHZhciBjdXJyZW50UGFkZGluZyA9IHBhcnNlRmxvYXQoY29tcHV0ZWRTdHlsZS5wYWRkaW5nUmlnaHQpO1xuICAgICAgJHRhcmdldC5zdHlsZS5wYWRkaW5nUmlnaHQgPSBcIlwiLmNvbmNhdChjdXJyZW50UGFkZGluZyArIHNjcm9sbEJhcldpZHRoLCBcInB4XCIpO1xuICAgIH1cbiAgfVxufTtcblxudmFyIHNjcm9sbF9sb2NrX3VuZmlsbEdhcFNlbGVjdG9yID0gZnVuY3Rpb24gdW5maWxsR2FwU2VsZWN0b3Ioc2VsZWN0b3IpIHtcbiAgdmFyICR0YXJnZXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG4gIGVhY2hOb2RlKCR0YXJnZXRzLCBmdW5jdGlvbiAoJHRhcmdldCkge1xuICAgIHNjcm9sbF9sb2NrX3VuZmlsbEdhcFRhcmdldCgkdGFyZ2V0KTtcbiAgfSk7XG59O1xuXG52YXIgc2Nyb2xsX2xvY2tfdW5maWxsR2FwVGFyZ2V0ID0gZnVuY3Rpb24gdW5maWxsR2FwVGFyZ2V0KCR0YXJnZXQpIHtcbiAgaWYgKGlzRWxlbWVudCgkdGFyZ2V0KSkge1xuICAgIGlmICgkdGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1zY3JvbGwtbG9jay1maWxsZWQtZ2FwJykgPT09ICd0cnVlJykge1xuICAgICAgdmFyIGN1cnJlbnRGaWxsR2FwTWV0aG9kID0gJHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2Nyb2xsLWxvY2stY3VycmVudC1maWxsLWdhcC1tZXRob2QnKTtcbiAgICAgICR0YXJnZXQucmVtb3ZlQXR0cmlidXRlKCdkYXRhLXNjcm9sbC1sb2NrLWZpbGxlZC1nYXAnKTtcbiAgICAgICR0YXJnZXQucmVtb3ZlQXR0cmlidXRlKCdkYXRhLXNjcm9sbC1sb2NrLWN1cnJlbnQtZmlsbC1nYXAtbWV0aG9kJyk7XG5cbiAgICAgIGlmIChjdXJyZW50RmlsbEdhcE1ldGhvZCA9PT0gJ21hcmdpbicpIHtcbiAgICAgICAgJHRhcmdldC5zdHlsZS5tYXJnaW5SaWdodCA9IFwiXCI7XG4gICAgICB9IGVsc2UgaWYgKGN1cnJlbnRGaWxsR2FwTWV0aG9kID09PSAnd2lkdGgnKSB7XG4gICAgICAgICR0YXJnZXQuc3R5bGUud2lkdGggPSBcIlwiO1xuICAgICAgfSBlbHNlIGlmIChjdXJyZW50RmlsbEdhcE1ldGhvZCA9PT0gJ21heC13aWR0aCcpIHtcbiAgICAgICAgJHRhcmdldC5zdHlsZS5tYXhXaWR0aCA9IFwiXCI7XG4gICAgICB9IGVsc2UgaWYgKGN1cnJlbnRGaWxsR2FwTWV0aG9kID09PSAncGFkZGluZycpIHtcbiAgICAgICAgJHRhcmdldC5zdHlsZS5wYWRkaW5nUmlnaHQgPSBcIlwiO1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxudmFyIG9uUmVzaXplID0gZnVuY3Rpb24gb25SZXNpemUoZSkge1xuICByZWZpbGxHYXBzKCk7XG59O1xuXG52YXIgb25Ub3VjaFN0YXJ0ID0gZnVuY3Rpb24gb25Ub3VjaFN0YXJ0KGUpIHtcbiAgaWYgKCFzdGF0ZS5zY3JvbGwpIHtcbiAgICBzdGF0ZS5zdGFydFRvdWNoWSA9IGUudG91Y2hlc1swXS5jbGllbnRZO1xuICAgIHN0YXRlLnN0YXJ0VG91Y2hYID0gZS50b3VjaGVzWzBdLmNsaWVudFg7XG4gIH1cbn07XG5cbnZhciBzY3JvbGxfbG9ja19vblRvdWNoTW92ZSA9IGZ1bmN0aW9uIG9uVG91Y2hNb3ZlKGUpIHtcbiAgaWYgKCFzdGF0ZS5zY3JvbGwpIHtcbiAgICB2YXIgc3RhcnRUb3VjaFkgPSBzdGF0ZS5zdGFydFRvdWNoWSxcbiAgICAgICAgc3RhcnRUb3VjaFggPSBzdGF0ZS5zdGFydFRvdWNoWDtcbiAgICB2YXIgY3VycmVudENsaWVudFkgPSBlLnRvdWNoZXNbMF0uY2xpZW50WTtcbiAgICB2YXIgY3VycmVudENsaWVudFggPSBlLnRvdWNoZXNbMF0uY2xpZW50WDtcblxuICAgIGlmIChlLnRvdWNoZXMubGVuZ3RoIDwgMikge1xuICAgICAgdmFyIHNlbGVjdG9yID0gYXJyYXlBc1NlbGVjdG9yKHN0YXRlLnNjcm9sbGFibGVTZWxlY3RvcnMpO1xuICAgICAgdmFyIGRpcmVjdGlvbiA9IHtcbiAgICAgICAgdXA6IHN0YXJ0VG91Y2hZIDwgY3VycmVudENsaWVudFksXG4gICAgICAgIGRvd246IHN0YXJ0VG91Y2hZID4gY3VycmVudENsaWVudFksXG4gICAgICAgIGxlZnQ6IHN0YXJ0VG91Y2hYIDwgY3VycmVudENsaWVudFgsXG4gICAgICAgIHJpZ2h0OiBzdGFydFRvdWNoWCA+IGN1cnJlbnRDbGllbnRYXG4gICAgICB9O1xuICAgICAgdmFyIGRpcmVjdGlvbldpdGhPZmZzZXQgPSB7XG4gICAgICAgIHVwOiBzdGFydFRvdWNoWSArIFRPVUNIX0RJUkVDVElPTl9ERVRFQ1RfT0ZGU0VUIDwgY3VycmVudENsaWVudFksXG4gICAgICAgIGRvd246IHN0YXJ0VG91Y2hZIC0gVE9VQ0hfRElSRUNUSU9OX0RFVEVDVF9PRkZTRVQgPiBjdXJyZW50Q2xpZW50WSxcbiAgICAgICAgbGVmdDogc3RhcnRUb3VjaFggKyBUT1VDSF9ESVJFQ1RJT05fREVURUNUX09GRlNFVCA8IGN1cnJlbnRDbGllbnRYLFxuICAgICAgICByaWdodDogc3RhcnRUb3VjaFggLSBUT1VDSF9ESVJFQ1RJT05fREVURUNUX09GRlNFVCA+IGN1cnJlbnRDbGllbnRYXG4gICAgICB9O1xuXG4gICAgICB2YXIgaGFuZGxlID0gZnVuY3Rpb24gaGFuZGxlKCRlbCkge1xuICAgICAgICB2YXIgc2tpcCA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogZmFsc2U7XG5cbiAgICAgICAgaWYgKCRlbCkge1xuICAgICAgICAgIHZhciBwYXJlbnRTY3JvbGxhYmxlRWwgPSBmaW5kUGFyZW50QnlTZWxlY3RvcigkZWwsIHNlbGVjdG9yLCBmYWxzZSk7XG5cbiAgICAgICAgICBpZiAoZWxlbWVudElzSW5wdXRSYW5nZSgkZWwpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHNraXAgfHwgZWxlbWVudElzU2Nyb2xsYWJsZUZpZWxkKCRlbCkgJiYgZmluZFBhcmVudEJ5U2VsZWN0b3IoJGVsLCBzZWxlY3RvcikgfHwgZWxlbWVudEhhc1NlbGVjdG9yKCRlbCwgc2VsZWN0b3IpKSB7XG4gICAgICAgICAgICB2YXIgcHJldmVudCA9IGZhbHNlO1xuXG4gICAgICAgICAgICBpZiAoZWxlbWVudFNjcm9sbExlZnRPblN0YXJ0KCRlbCkgJiYgZWxlbWVudFNjcm9sbExlZnRPbkVuZCgkZWwpKSB7XG4gICAgICAgICAgICAgIGlmIChkaXJlY3Rpb24udXAgJiYgZWxlbWVudFNjcm9sbFRvcE9uU3RhcnQoJGVsKSB8fCBkaXJlY3Rpb24uZG93biAmJiBlbGVtZW50U2Nyb2xsVG9wT25FbmQoJGVsKSkge1xuICAgICAgICAgICAgICAgIHByZXZlbnQgPSB0cnVlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGVsZW1lbnRTY3JvbGxUb3BPblN0YXJ0KCRlbCkgJiYgZWxlbWVudFNjcm9sbFRvcE9uRW5kKCRlbCkpIHtcbiAgICAgICAgICAgICAgaWYgKGRpcmVjdGlvbi5sZWZ0ICYmIGVsZW1lbnRTY3JvbGxMZWZ0T25TdGFydCgkZWwpIHx8IGRpcmVjdGlvbi5yaWdodCAmJiBlbGVtZW50U2Nyb2xsTGVmdE9uRW5kKCRlbCkpIHtcbiAgICAgICAgICAgICAgICBwcmV2ZW50ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb25XaXRoT2Zmc2V0LnVwICYmIGVsZW1lbnRTY3JvbGxUb3BPblN0YXJ0KCRlbCkgfHwgZGlyZWN0aW9uV2l0aE9mZnNldC5kb3duICYmIGVsZW1lbnRTY3JvbGxUb3BPbkVuZCgkZWwpIHx8IGRpcmVjdGlvbldpdGhPZmZzZXQubGVmdCAmJiBlbGVtZW50U2Nyb2xsTGVmdE9uU3RhcnQoJGVsKSB8fCBkaXJlY3Rpb25XaXRoT2Zmc2V0LnJpZ2h0ICYmIGVsZW1lbnRTY3JvbGxMZWZ0T25FbmQoJGVsKSkge1xuICAgICAgICAgICAgICBwcmV2ZW50ID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHByZXZlbnQpIHtcbiAgICAgICAgICAgICAgaWYgKHBhcmVudFNjcm9sbGFibGVFbCkge1xuICAgICAgICAgICAgICAgIGhhbmRsZShwYXJlbnRTY3JvbGxhYmxlRWwsIHRydWUpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChlLmNhbmNlbGFibGUpIHtcbiAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaGFuZGxlKHBhcmVudFNjcm9sbGFibGVFbCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChlLmNhbmNlbGFibGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIGhhbmRsZShlLnRhcmdldCk7XG4gICAgfVxuICB9XG59O1xuXG52YXIgb25Ub3VjaEVuZCA9IGZ1bmN0aW9uIG9uVG91Y2hFbmQoZSkge1xuICBpZiAoIXN0YXRlLnNjcm9sbCkge1xuICAgIHN0YXRlLnN0YXJ0VG91Y2hZID0gMDtcbiAgICBzdGF0ZS5zdGFydFRvdWNoWCA9IDA7XG4gIH1cbn07XG5cbmlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgb25SZXNpemUpO1xufVxuXG5pZiAodHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJykge1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0Jywgb25Ub3VjaFN0YXJ0KTtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgc2Nyb2xsX2xvY2tfb25Ub3VjaE1vdmUsIHtcbiAgICBwYXNzaXZlOiBmYWxzZVxuICB9KTtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBvblRvdWNoRW5kKTtcbn1cblxudmFyIGRlcHJlY2F0ZWRNZXRob2RzID0ge1xuICBoaWRlOiBmdW5jdGlvbiBoaWRlKHRhcmdldCkge1xuICAgIHRocm93RXJyb3IoJ1wiaGlkZVwiIGlzIGRlcHJlY2F0ZWQhIFVzZSBcImRpc2FibGVQYWdlU2Nyb2xsXCIgaW5zdGVhZC4gXFxuIGh0dHBzOi8vZ2l0aHViLmNvbS9GTDNOS0VZL3Njcm9sbC1sb2NrI2Rpc2FibGVwYWdlc2Nyb2xsc2Nyb2xsYWJsZXRhcmdldCcpO1xuICAgIGRpc2FibGVQYWdlU2Nyb2xsKHRhcmdldCk7XG4gIH0sXG4gIHNob3c6IGZ1bmN0aW9uIHNob3codGFyZ2V0KSB7XG4gICAgdGhyb3dFcnJvcignXCJzaG93XCIgaXMgZGVwcmVjYXRlZCEgVXNlIFwiZW5hYmxlUGFnZVNjcm9sbFwiIGluc3RlYWQuIFxcbiBodHRwczovL2dpdGh1Yi5jb20vRkwzTktFWS9zY3JvbGwtbG9jayNlbmFibGVwYWdlc2Nyb2xsc2Nyb2xsYWJsZXRhcmdldCcpO1xuICAgIGVuYWJsZVBhZ2VTY3JvbGwodGFyZ2V0KTtcbiAgfSxcbiAgdG9nZ2xlOiBmdW5jdGlvbiB0b2dnbGUodGFyZ2V0KSB7XG4gICAgdGhyb3dFcnJvcignXCJ0b2dnbGVcIiBpcyBkZXByZWNhdGVkISBEbyBub3QgdXNlIGl0LicpO1xuXG4gICAgaWYgKGdldFNjcm9sbFN0YXRlKCkpIHtcbiAgICAgIGRpc2FibGVQYWdlU2Nyb2xsKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVuYWJsZVBhZ2VTY3JvbGwodGFyZ2V0KTtcbiAgICB9XG4gIH0sXG4gIGdldFN0YXRlOiBmdW5jdGlvbiBnZXRTdGF0ZSgpIHtcbiAgICB0aHJvd0Vycm9yKCdcImdldFN0YXRlXCIgaXMgZGVwcmVjYXRlZCEgVXNlIFwiZ2V0U2Nyb2xsU3RhdGVcIiBpbnN0ZWFkLiBcXG4gaHR0cHM6Ly9naXRodWIuY29tL0ZMM05LRVkvc2Nyb2xsLWxvY2sjZ2V0c2Nyb2xsc3RhdGUnKTtcbiAgICByZXR1cm4gZ2V0U2Nyb2xsU3RhdGUoKTtcbiAgfSxcbiAgZ2V0V2lkdGg6IGZ1bmN0aW9uIGdldFdpZHRoKCkge1xuICAgIHRocm93RXJyb3IoJ1wiZ2V0V2lkdGhcIiBpcyBkZXByZWNhdGVkISBVc2UgXCJnZXRQYWdlU2Nyb2xsQmFyV2lkdGhcIiBpbnN0ZWFkLiBcXG4gaHR0cHM6Ly9naXRodWIuY29tL0ZMM05LRVkvc2Nyb2xsLWxvY2sjZ2V0cGFnZXNjcm9sbGJhcndpZHRoJyk7XG4gICAgcmV0dXJuIGdldFBhZ2VTY3JvbGxCYXJXaWR0aCgpO1xuICB9LFxuICBnZXRDdXJyZW50V2lkdGg6IGZ1bmN0aW9uIGdldEN1cnJlbnRXaWR0aCgpIHtcbiAgICB0aHJvd0Vycm9yKCdcImdldEN1cnJlbnRXaWR0aFwiIGlzIGRlcHJlY2F0ZWQhIFVzZSBcImdldEN1cnJlbnRQYWdlU2Nyb2xsQmFyV2lkdGhcIiBpbnN0ZWFkLiBcXG4gaHR0cHM6Ly9naXRodWIuY29tL0ZMM05LRVkvc2Nyb2xsLWxvY2sjZ2V0Y3VycmVudHBhZ2VzY3JvbGxiYXJ3aWR0aCcpO1xuICAgIHJldHVybiBnZXRDdXJyZW50UGFnZVNjcm9sbEJhcldpZHRoKCk7XG4gIH0sXG4gIHNldFNjcm9sbGFibGVUYXJnZXRzOiBmdW5jdGlvbiBzZXRTY3JvbGxhYmxlVGFyZ2V0cyh0YXJnZXQpIHtcbiAgICB0aHJvd0Vycm9yKCdcInNldFNjcm9sbGFibGVUYXJnZXRzXCIgaXMgZGVwcmVjYXRlZCEgVXNlIFwiYWRkU2Nyb2xsYWJsZVRhcmdldFwiIGluc3RlYWQuIFxcbiBodHRwczovL2dpdGh1Yi5jb20vRkwzTktFWS9zY3JvbGwtbG9jayNhZGRzY3JvbGxhYmxldGFyZ2V0c2Nyb2xsYWJsZXRhcmdldCcpO1xuICAgIHNjcm9sbF9sb2NrX2FkZFNjcm9sbGFibGVUYXJnZXQodGFyZ2V0KTtcbiAgfSxcbiAgc2V0RmlsbEdhcFNlbGVjdG9yczogZnVuY3Rpb24gc2V0RmlsbEdhcFNlbGVjdG9ycyhzZWxlY3Rvcikge1xuICAgIHRocm93RXJyb3IoJ1wic2V0RmlsbEdhcFNlbGVjdG9yc1wiIGlzIGRlcHJlY2F0ZWQhIFVzZSBcImFkZEZpbGxHYXBTZWxlY3RvclwiIGluc3RlYWQuIFxcbiBodHRwczovL2dpdGh1Yi5jb20vRkwzTktFWS9zY3JvbGwtbG9jayNhZGRmaWxsZ2Fwc2VsZWN0b3JmaWxsZ2Fwc2VsZWN0b3InKTtcbiAgICBzY3JvbGxfbG9ja19hZGRGaWxsR2FwU2VsZWN0b3Ioc2VsZWN0b3IpO1xuICB9LFxuICBzZXRGaWxsR2FwVGFyZ2V0czogZnVuY3Rpb24gc2V0RmlsbEdhcFRhcmdldHModGFyZ2V0KSB7XG4gICAgdGhyb3dFcnJvcignXCJzZXRGaWxsR2FwVGFyZ2V0c1wiIGlzIGRlcHJlY2F0ZWQhIFVzZSBcImFkZEZpbGxHYXBUYXJnZXRcIiBpbnN0ZWFkLiBcXG4gaHR0cHM6Ly9naXRodWIuY29tL0ZMM05LRVkvc2Nyb2xsLWxvY2sjYWRkZmlsbGdhcHRhcmdldGZpbGxnYXB0YXJnZXQnKTtcbiAgICBzY3JvbGxfbG9ja19hZGRGaWxsR2FwVGFyZ2V0KHRhcmdldCk7XG4gIH0sXG4gIGNsZWFyUXVldWU6IGZ1bmN0aW9uIGNsZWFyUXVldWUoKSB7XG4gICAgdGhyb3dFcnJvcignXCJjbGVhclF1ZXVlXCIgaXMgZGVwcmVjYXRlZCEgVXNlIFwiY2xlYXJRdWV1ZVNjcm9sbExvY2tzXCIgaW5zdGVhZC4gXFxuIGh0dHBzOi8vZ2l0aHViLmNvbS9GTDNOS0VZL3Njcm9sbC1sb2NrI2NsZWFycXVldWVzY3JvbGxsb2NrcycpO1xuICAgIGNsZWFyUXVldWVTY3JvbGxMb2NrcygpO1xuICB9XG59O1xuXG52YXIgc2Nyb2xsTG9jayA9IF9vYmplY3RTcHJlYWQoe1xuICBkaXNhYmxlUGFnZVNjcm9sbDogZGlzYWJsZVBhZ2VTY3JvbGwsXG4gIGVuYWJsZVBhZ2VTY3JvbGw6IGVuYWJsZVBhZ2VTY3JvbGwsXG4gIGdldFNjcm9sbFN0YXRlOiBnZXRTY3JvbGxTdGF0ZSxcbiAgY2xlYXJRdWV1ZVNjcm9sbExvY2tzOiBjbGVhclF1ZXVlU2Nyb2xsTG9ja3MsXG4gIGdldFRhcmdldFNjcm9sbEJhcldpZHRoOiBzY3JvbGxfbG9ja19nZXRUYXJnZXRTY3JvbGxCYXJXaWR0aCxcbiAgZ2V0Q3VycmVudFRhcmdldFNjcm9sbEJhcldpZHRoOiBzY3JvbGxfbG9ja19nZXRDdXJyZW50VGFyZ2V0U2Nyb2xsQmFyV2lkdGgsXG4gIGdldFBhZ2VTY3JvbGxCYXJXaWR0aDogZ2V0UGFnZVNjcm9sbEJhcldpZHRoLFxuICBnZXRDdXJyZW50UGFnZVNjcm9sbEJhcldpZHRoOiBnZXRDdXJyZW50UGFnZVNjcm9sbEJhcldpZHRoLFxuICBhZGRTY3JvbGxhYmxlU2VsZWN0b3I6IHNjcm9sbF9sb2NrX2FkZFNjcm9sbGFibGVTZWxlY3RvcixcbiAgcmVtb3ZlU2Nyb2xsYWJsZVNlbGVjdG9yOiBzY3JvbGxfbG9ja19yZW1vdmVTY3JvbGxhYmxlU2VsZWN0b3IsXG4gIGFkZFNjcm9sbGFibGVUYXJnZXQ6IHNjcm9sbF9sb2NrX2FkZFNjcm9sbGFibGVUYXJnZXQsXG4gIHJlbW92ZVNjcm9sbGFibGVUYXJnZXQ6IHNjcm9sbF9sb2NrX3JlbW92ZVNjcm9sbGFibGVUYXJnZXQsXG4gIGFkZExvY2thYmxlU2VsZWN0b3I6IHNjcm9sbF9sb2NrX2FkZExvY2thYmxlU2VsZWN0b3IsXG4gIGFkZExvY2thYmxlVGFyZ2V0OiBzY3JvbGxfbG9ja19hZGRMb2NrYWJsZVRhcmdldCxcbiAgYWRkRmlsbEdhcFNlbGVjdG9yOiBzY3JvbGxfbG9ja19hZGRGaWxsR2FwU2VsZWN0b3IsXG4gIHJlbW92ZUZpbGxHYXBTZWxlY3Rvcjogc2Nyb2xsX2xvY2tfcmVtb3ZlRmlsbEdhcFNlbGVjdG9yLFxuICBhZGRGaWxsR2FwVGFyZ2V0OiBzY3JvbGxfbG9ja19hZGRGaWxsR2FwVGFyZ2V0LFxuICByZW1vdmVGaWxsR2FwVGFyZ2V0OiBzY3JvbGxfbG9ja19yZW1vdmVGaWxsR2FwVGFyZ2V0LFxuICBzZXRGaWxsR2FwTWV0aG9kOiBzY3JvbGxfbG9ja19zZXRGaWxsR2FwTWV0aG9kLFxuICByZWZpbGxHYXBzOiByZWZpbGxHYXBzLFxuICBfc3RhdGU6IHN0YXRlXG59LCBkZXByZWNhdGVkTWV0aG9kcyk7XG5cbi8qIGhhcm1vbnkgZGVmYXVsdCBleHBvcnQgKi8gdmFyIHNjcm9sbF9sb2NrID0gX193ZWJwYWNrX2V4cG9ydHNfX1tcImRlZmF1bHRcIl0gPSAoc2Nyb2xsTG9jayk7XG5cbi8qKiovIH0pXG4vKioqKioqLyBdKVtcImRlZmF1bHRcIl07XG59KTsiLCJ2YXIgZztcblxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcbmcgPSAoZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzO1xufSkoKTtcblxudHJ5IHtcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXG5cdGcgPSBnIHx8IG5ldyBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCk7XG59IGNhdGNoIChlKSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXG5cdGlmICh0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKSBnID0gd2luZG93O1xufVxuXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGc7XG4iLCIvLyBHSUEgQ09NUE9ORU5UU1xuaW1wb3J0IGxvYWRDb21wb25lbnRzIGZyb20gJ2dpYS9sb2FkQ29tcG9uZW50cydcbmltcG9ydCBjb21wb25lbnRzIGZyb20gJy4vanMvbW9kdWxlcydcblxuLy8gaW1wb3J0aW5nIHN2Z3MgYW5kIGltYWdlcyBmb3Igd2VicGFja1xuaW1wb3J0IEFycm93SWNvbiBmcm9tICcuL3N2Zy9hcnJvdy5zdmcnXG5pbXBvcnQgU2VhcmNoSWNvbiBmcm9tICcuL3N2Zy9zZWFyY2guc3ZnJ1xuaW1wb3J0IEhwUGFydG5lcnNMb2dvIGZyb20gJy4vc3ZnL2hwLXBhcnRuZXJzLWxvZ28uc3ZnJ1xuXG5sb2FkQ29tcG9uZW50cyhjb21wb25lbnRzKVxuIiwiaW1wb3J0IENvbXBvbmVudCBmcm9tICdnaWEvQ29tcG9uZW50J1xuaW1wb3J0ICdsYXp5c2l6ZXMnICAvLyBhbHdheXMgbG9hZCBsYXp5c2l6ZXMsIHJlcXVpcmVzIG5vIGZ1cnRoZXIgY29uZmlnXG5pbXBvcnQgZ2V0Q29tcG9uZW50RnJvbUVsZW1lbnQgZnJvbSAnZ2lhL2dldENvbXBvbmVudEZyb21FbGVtZW50J1xuXG5cbi8vIFdyYXBwZXIgZm9yIGdsb2JhbCBKYXZhc2NyaXB0IGRlcGVuZGVuY2llc1xuLy8gRW5hYmxlL2Rpc2FibGUgb24gcGVyIGJhZ2UgYmFzaXMgd2l0aCBvcHRpb25zIG9uIGJvZHkgdGFnXG5jbGFzcyBCYXNlVGhlbWUgZXh0ZW5kcyBDb21wb25lbnQge1xuXG5cdGNvbnN0cnVjdG9yKGVsZW1lbnQpIHtcblxuXHRcdHN1cGVyKGVsZW1lbnQpXG5cblx0XHQvLyAoaHR0cHM6Ly9naXRodWIuY29tL2VkdWFyZG9ib3VjYXMvaW5jbHVkZS1tZWRpYS1leHBvcnQpIC0gYWRkaW5nIG1lZGlhIHF1ZXJpZXMgdG8gdGhpcyBtb2R1bGUgdGhhdCB3aWxsIGJlY29tZSBhY2Nlc3NpYmxlIGJ5OiBnbG9iYWwuYmFzZS5tZWRpYVF1ZXJ5XG5cdFx0dGhpcy5tZWRpYVF1ZXJ5ID0gcmVxdWlyZSgnLi4vLi4vbm9kZV9tb2R1bGVzL2luY2x1ZGUtbWVkaWEtZXhwb3J0L2Rpc3QvaW5jbHVkZS1tZWRpYS0xLjAuMi5taW4uanMnKVxuXG5cdFx0dGhpcy5sYXRlc3RLbm93blNjcm9sbFkgPSAwXG5cdFx0dGhpcy5sYXN0U2Nyb2xsVG9wID0gMFxuXG5cdFx0Ly8gY3JlYXRlIGdsb2JhbCBvYmplY3Qgb2YgdGhpcyBzcGVjaWFsIGNvbXBvbmVudCBpbnN0YW5jZVxuXHRcdGdsb2JhbC5iYXNlID0gZ2V0Q29tcG9uZW50RnJvbUVsZW1lbnQoZG9jdW1lbnQuYm9keSlcblx0fVxuXG5cblxuXHRtb3VudCgpIHtcblxuXHRcdHRoaXMuaW5pdFNjcm9sbEhhbmRsZXIoKVxuXHRcdHRoaXMuaW5pdFJlc2l6ZUhhbmRsZXIoKVxuXHR9XG5cblx0aW5pdFNjcm9sbEhhbmRsZXIoKSB7XG5cblx0XHR0aGlzLmxhdGVzdEtub3duU2Nyb2xsWSA9IDBcblx0XHRsZXQgdGljayA9IGZhbHNlICAvLyBUcmFjayB3aGV0aGVyIGNhbGwgaXMgY3VycmVudGx5IGluIHByb2Nlc3NcblxuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCAoKSA9PiB7XG5cblx0XHRcdHRoaXMubGF0ZXN0S25vd25TY3JvbGxZID0gd2luZG93LnNjcm9sbFlcblx0XHRcdC8vIG5lZWRzIHRvIGJlIG91dCBvZiB0aGUgdGltZW91dCB0byBlbnN1cmUgcmVzdWx0IGlzIGFjY3VyYXRlXG5cdFx0XHR0aGlzLnNjcm9sbERpcmVjdGlvbih0aGlzLmxhdGVzdEtub3duU2Nyb2xsWSlcblxuXHRcdFx0aWYgKCF0aWNrKSB7XG5cdFx0XHRcdHNldFRpbWVvdXQoKCkgPT4ge1xuXHRcdFx0XHRcdGdsb2JhbC5zY3JvbGxFdmVudHMuZm9yRWFjaCgoc2Nyb2xsSGFuZGxlcikgPT4ge1xuXHRcdFx0XHRcdFx0c2Nyb2xsSGFuZGxlcih0aGlzLmxhdGVzdEtub3duU2Nyb2xsWSlcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdHRpY2sgPSBmYWxzZVxuXHRcdFx0XHR9LCAxMDApXG5cdFx0XHR9XG5cdFx0XHR0aWNrID0gdHJ1ZVxuXHRcdH0pXG5cdH1cblxuXG5cdGluaXRSZXNpemVIYW5kbGVyKCkge1xuXG5cdFx0bGV0IGZvckxhc3RFeGVjXG5cdFx0bGV0IGRlbGF5ID0gMTAwIC8vIGRlbGF5IGJldHdlZW4gY2FsbHNcblx0XHRsZXQgdGhyb3R0bGVkID0gZmFsc2UgLy8gYXJlIHdlIGN1cnJlbnRseSB0aHJvdHRsZWQ/XG5cblx0XHQvLyB3aW5kb3cucmVzaXplIGV2ZW50IGxpc3RlbmVyXG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsICgpID0+IHtcblxuXHRcdFx0Ly8gb25seSBydW4gaWYgd2UncmUgbm90IHRocm90dGxlZFxuXHRcdFx0aWYgKCF0aHJvdHRsZWQpIHtcblxuXHRcdFx0XHQvLyBhY3R1YWwgY2FsbGJhY2sgYWN0aW9uXG5cdFx0XHRcdGdsb2JhbC5yZXNpemVFdmVudHMuZm9yRWFjaCgocmVzaXplSGFuZGxlcikgPT4ge1xuXHRcdFx0XHRcdHJlc2l6ZUhhbmRsZXIoKVxuXHRcdFx0XHR9KVxuXHRcdFx0XHQvLyB3ZSdyZSB0aHJvdHRsZWQhXG5cdFx0XHRcdHRocm90dGxlZCA9IHRydWVcblx0XHRcdFx0Ly8gc2V0IGEgdGltZW91dCB0byB1bi10aHJvdHRsZVxuXHRcdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdFx0XHR0aHJvdHRsZWQgPSBmYWxzZVxuXHRcdFx0XHR9LCBkZWxheSlcblx0XHRcdH1cblxuXHRcdFx0Y2xlYXJUaW1lb3V0KGZvckxhc3RFeGVjKTtcblxuXHRcdFx0Ly8gdGhpcyBpcyBtZXNzeSFcblx0XHRcdGZvckxhc3RFeGVjID0gc2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHRcdGdsb2JhbC5yZXNpemVFdmVudHMuZm9yRWFjaCgocmVzaXplSGFuZGxlcikgPT4ge1xuXHRcdFx0XHRcdHJlc2l6ZUhhbmRsZXIoKVxuXHRcdFx0XHR9KVxuXHRcdFx0fSwgZGVsYXkpXG5cdFx0fSlcblx0fVxuXG5cdHNjcm9sbERpcmVjdGlvbihjdXJyZW50U2Nyb2xsWSkge1xuXG5cdFx0Z2xvYmFsLnNjcm9sbERpcmVjdGlvbiA9IChjdXJyZW50U2Nyb2xsWSA8IHRoaXMubGFzdFNjcm9sbFRvcCkgPyAndXAnIDogJ2Rvd24nXG4gICAgdGhpcy5sYXN0U2Nyb2xsVG9wID0gY3VycmVudFNjcm9sbFlcblx0fVxufVxuXG4vLyBFeHBvcnQgRVM2IG1vZHVsZVxuZXhwb3J0IGRlZmF1bHQgQmFzZVRoZW1lO1xuIiwiaW1wb3J0IENvbXBvbmVudCBmcm9tICdnaWEvQ29tcG9uZW50J1xuXG5cbi8vIFdyYXBwZXIgZm9yIGdsb2JhbCBKYXZhc2NyaXB0IGRlcGVuZGVuY2llc1xuLy8gRW5hYmxlL2Rpc2FibGUgb24gcGVyIGJhZ2UgYmFzaXMgd2l0aCBvcHRpb25zIG9uIGJvZHkgdGFnXG5jbGFzcyBGb3JtIGV4dGVuZHMgQ29tcG9uZW50IHtcblxuXHRjb25zdHJ1Y3RvcihlbGVtZW50KSB7XG5cblx0XHRzdXBlcihlbGVtZW50KVxuXG5cdH1cblxuXHRtb3VudCgpIHtcblxuXHRcdCQoXCIud3BjZjcgLmZvcm0tY29udHJvbFwiKS5mb2N1cyhmdW5jdGlvbigpe1xuXHRcdFx0JCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5hZGRDbGFzcygnYWN0aXZlJyk7XG5cdFx0fSkuYmx1cihmdW5jdGlvbigpe1xuXHRcdFx0dmFyIGN2YWwgPSAkKHRoaXMpLnZhbCgpXG5cdFx0XHRpZihjdmFsLmxlbmd0aCA8IDEpIHskKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcblx0XHRcdH1cblx0XHR9KVxuXHR9XG59XG5cbi8vIEV4cG9ydCBFUzYgbW9kdWxlXG5leHBvcnQgZGVmYXVsdCBGb3JtO1xuIiwiLy8gaW1wb3J0IEdJQSBkZXBlbmRhbmN5XG5pbXBvcnQgQ29tcG9uZW50IGZyb20gJ2dpYS9Db21wb25lbnQnXG5pbXBvcnQgZXZlbnRidXMgZnJvbSAnZ2lhL2V2ZW50YnVzJ1xuXG4vLyBFeHRlbmQgdGhlIEdJQSBjb21wb25lbnRcbmNsYXNzIEJ1cmdlciBleHRlbmRzIENvbXBvbmVudCB7XG5cblx0Ly8gc2V0dXBcblx0Y29uc3RydWN0b3IoZWxlbWVudCkge1xuXHRcdHN1cGVyKGVsZW1lbnQpXG5cblx0XHR0aGlzLm9wdGlvbnMgPSB7XG5cdFx0XHQvLyBzb21lT3B0aW9uOiBcIiBcIixcblx0XHR9XG5cblx0XHR0aGlzLnJlZiA9IHtcblxuXHRcdH1cblx0fVxuXG5cdG1vdW50KCkge1xuXHRcdGNvbnN0IGJ1cmdlclRyaWdnZXIgPSB0aGlzLmVsZW1lbnRcblxuXHRcdGJ1cmdlclRyaWdnZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMudHJpZ2dlclN0YXRlQ2hhbmdlLmJpbmQodGhpcykpXG5cdFx0ZXZlbnRidXMub24oXCJyZXNldEJ1cmdlclN0YXRlXCIsIHRoaXMudHJpZ2dlclN0YXRlQ2hhbmdlLmJpbmQodGhpcykpXG5cdH1cblxuXHR0cmlnZ2VyU3RhdGVDaGFuZ2UoKSB7XG5cblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdEJ1cmdlclRyaWdnZXJTdGF0ZTogIXRoaXMuc3RhdGUuQnVyZ2VyVHJpZ2dlclN0YXRlLFxuXHRcdH0pXG5cdH1cblxuXHRzdGF0ZUNoYW5nZShzdGF0ZUNoYW5nZXMpIHtcblxuXHRcdGlmICgnQnVyZ2VyVHJpZ2dlclN0YXRlJyBpbiBzdGF0ZUNoYW5nZXMpIHtcblxuXHRcdFx0Y29uc3QgdHJpZ2dlciA9IHRoaXMuZWxlbWVudFxuXG5cdFx0XHRldmVudGJ1cy5lbWl0KFwiTWFpbk1lbnVUcmlnZ2VyZWRcIilcblx0XHRcdC8vIGV2ZW50YnVzLmVtaXQoXCJPdmVybGF5VHJpZ2dlcmVkXCIpXG5cblx0XHRcdGlmICh0aGlzLnN0YXRlLkJ1cmdlclRyaWdnZXJTdGF0ZSkge1xuXHRcdFx0XHR0cmlnZ2VyLmNsYXNzTGlzdC5hZGQoJ2lzLWFjdGl2ZScpXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0cmlnZ2VyLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWFjdGl2ZScpXG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59XG5cbi8vIEV4cG9ydCBFUzYgbW9kdWxlXG5leHBvcnQgZGVmYXVsdCBCdXJnZXI7XG4iLCIvLyBpbXBvcnQgR0lBIGRlcGVuZGFuY3lcbmltcG9ydCBDb21wb25lbnQgZnJvbSAnZ2lhL0NvbXBvbmVudCdcbmltcG9ydCBldmVudGJ1cyBmcm9tICdnaWEvZXZlbnRidXMnXG5cbmltcG9ydCB7IGRpc2FibGVQYWdlU2Nyb2xsLCBlbmFibGVQYWdlU2Nyb2xsLCBhZGRGaWxsR2FwVGFyZ2V0IH0gZnJvbSAnc2Nyb2xsLWxvY2snO1xuXG4vLyBFeHRlbmQgdGhlIEdJQSBjb21wb25lbnRcbmNsYXNzIEJ1cmdlck1lbnUgZXh0ZW5kcyBDb21wb25lbnQge1xuXG5cdC8vIHNldHVwXG5cdGNvbnN0cnVjdG9yKGVsZW1lbnQpIHtcblx0XHRzdXBlcihlbGVtZW50KVxuXG5cdFx0dGhpcy5vcHRpb25zID0ge1xuXHRcdFx0Ly8gc29tZU9wdGlvbjogXCIgXCIsXG5cdFx0fVxuXG5cdFx0dGhpcy5yZWYgPSB7XG5cblx0XHR9XG5cdH1cblxuXHRtb3VudCgpIHtcblxuXHRcdHRoaXMuc2V0U3RhdGUoeyBtZW51T3BlbjogZmFsc2UgfSlcblx0XHRldmVudGJ1cy5vbignTWFpbk1lbnVUcmlnZ2VyZWQnLCB0aGlzLnRvZ2dsZVN0YXRlQ2hhbmdlLmJpbmQodGhpcykpXG5cdH1cblxuXHR0b2dnbGVTdGF0ZUNoYW5nZSgpIHtcblxuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0bWVudU9wZW46ICF0aGlzLnN0YXRlLm1lbnVPcGVuLFxuXHRcdH0pXG5cdH1cblxuXHRzdGF0ZUNoYW5nZShzdGF0ZUNoYW5nZXMpIHtcblxuXHRcdGlmKCdtZW51T3BlbicgaW4gc3RhdGVDaGFuZ2VzICkge1xuXG5cdFx0XHRpZih0aGlzLnN0YXRlLm1lbnVPcGVuKSB7XG5cdFx0XHRcdHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdpcy1hY3RpdmUnKVxuXHRcdFx0XHRkaXNhYmxlUGFnZVNjcm9sbCh0aGlzLmVsZW1lbnQpXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLmNsb3NlTWVudSgpXG5cdFx0XHRcdGVuYWJsZVBhZ2VTY3JvbGwodGhpcy5lbGVtZW50KVxuICAgICAgfVxuXHRcdH1cbiAgfVxuXG5cdGNsb3NlTWVudSgpIHtcbiAgICB0aGlzLnNldFN0YXRlKHsgbWVudU9wZW46IGZhbHNlIH0pXG4gICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWFjdGl2ZScpXG4gIH1cbn1cblxuLy8gRXhwb3J0IEVTNiBtb2R1bGVcbmV4cG9ydCBkZWZhdWx0IEJ1cmdlck1lbnU7XG4iLCIvLyBpbXBvcnQgR0lBIGRlcGVuZGFuY3lcbmltcG9ydCBDb21wb25lbnQgZnJvbSAnZ2lhL0NvbXBvbmVudCdcblxuXG4vLyBFeHRlbmQgdGhlIEdJQSBjb21wb25lbnRcbmNsYXNzIFRvcE5hdiBleHRlbmRzIENvbXBvbmVudCB7XG5cblx0Ly8gc2V0dXBcblx0Y29uc3RydWN0b3IoZWxlbWVudCkge1xuXHRcdHN1cGVyKGVsZW1lbnQpXG5cblxuXHRcdGdsb2JhbC5zY3JvbGxFdmVudHMucHVzaCh0aGlzLnNocmlua0Jhci5iaW5kKHRoaXMpKVxuXHRcdGdsb2JhbC5zY3JvbGxFdmVudHMucHVzaCh0aGlzLmhpZGVCYXIuYmluZCh0aGlzKSlcblx0fVxuXG5cdG1vdW50KCkge1xuXG5cblxuXHR9XG5cblx0c3RhdGVDaGFuZ2Uoc3RhdGVDaGFuZ2VzKSB7XG5cblx0XHRpZignaXNTaHJ1bmsnIGluIHN0YXRlQ2hhbmdlcyApIHtcblxuXHRcdFx0aWYodGhpcy5zdGF0ZS5pc1NocnVuaykge1xuXHRcdFx0XHR0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnYy1Ub3BOYXYtLXNocnVuaycpXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnYy1Ub3BOYXYtLXNocnVuaycpXG4gICAgICB9XG5cdFx0fSBlbHNlIGlmKCdpc0hpZGRlbicgaW4gc3RhdGVDaGFuZ2VzKSB7XG5cblx0XHRcdGlmKHRoaXMuc3RhdGUuaXNIaWRkZW4pIHtcblx0XHRcdFx0dGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2MtVG9wTmF2LS1pcy1waW5uZWQnKVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2MtVG9wTmF2LS1pcy1waW5uZWQnKVxuXHRcdFx0fVxuXHRcdH1cbiAgfVxuXG5cdHNocmlua0JhcihjdXJyZW50U2Nyb2xsWSkge1xuXG4gICAgaWYoY3VycmVudFNjcm9sbFkgPiAwKSB7XG5cdFx0XHR0aGlzLnNldFN0YXRlKHtpc1NocnVuazogdHJ1ZX0pXG4gICAgfSBlbHNlIHtcblx0XHRcdHRoaXMuc2V0U3RhdGUoe2lzU2hydW5rOiBmYWxzZX0pXG4gICAgfVxuICB9XG5cblx0aGlkZUJhcihjdXJyZW50U2Nyb2xsWSkge1xuXG4gICAgaWYoY3VycmVudFNjcm9sbFkgPiAwICYmIGdsb2JhbC5zY3JvbGxEaXJlY3Rpb24gPT09ICdkb3duJykge1xuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7aXNIaWRkZW46IHRydWV9KVxuICAgIH0gZWxzZSBpZiAodGhpcy5zdGF0ZS5pc0hpZGRlbiAmJiBnbG9iYWwuc2Nyb2xsRGlyZWN0aW9uID09PSAndXAnKSB7XG5cdFx0XHR0aGlzLnNldFN0YXRlKHtpc0hpZGRlbjogZmFsc2V9KVxuICAgIH1cbiAgfVxufVxuXG4vLyBFeHBvcnQgRVM2IG1vZHVsZVxuZXhwb3J0IGRlZmF1bHQgVG9wTmF2O1xuIiwiaW1wb3J0IEJhc2VUaGVtZSBmcm9tICcuL0Jhc2VUaGVtZScgIC8vIHB1dCBhbGwgZ2xvYmFsIGRlcGVuZGVuY2llcyBpbiBoZXJlICh0aGluZ3MgdXNlZCBvbiBldmVyeSBwYWdlKVxuaW1wb3J0IEJ1cmdlciBmcm9tICcuL2MtQnVyZ2VyJ1xuaW1wb3J0IEJ1cmdlck1lbnUgZnJvbSAnLi9jLUJ1cmdlck1lbnUnXG5pbXBvcnQgVG9wTmF2IGZyb20gJy4vYy1Ub3BOYXYnXG5pbXBvcnQgRm9ybSBmcm9tICcuL0Zvcm0nXG5cblxuLy8gR0xPQkFMIEhBTkRMRVJzXG4vLyB1c2UgZnJvbSBXSVRISU4geW91ciBjb21wb25lbnQgY2xhc3MgdG8gYWRkIGFuIGluc3RhbmNlIVxuZ2xvYmFsLnNjcm9sbEV2ZW50cyA9IFtdXG5nbG9iYWwucmVzaXplRXZlbnRzID0gW11cbmdsb2JhbC5zY3JvbGxEaXJlY3Rpb25cblxuXG5jb25zdCBjb21wb25lbnRzID0ge1xuXHRcIkJhc2VUaGVtZVwiOiBCYXNlVGhlbWUsIC8vcnFkXG5cdFwiQnVyZ2VyXCI6IEJ1cmdlcixcblx0XCJCdXJnZXJNZW51XCI6IEJ1cmdlck1lbnUsXG5cdFwiVG9wTmF2XCI6IFRvcE5hdixcblx0XCJGb3JtXCI6IEZvcm1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50cztcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBpZDogXCJhcnJvd1wiLFxuICB1cmw6IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJfX19mMjUyNTViYzg5NTg3NTZiZjc0MWU1ZmY4OGJlYmEwZV9fX1wiLFxuICB3aWR0aDogMzAsXG4gIGhlaWdodDogMzAsXG4gIHZpZXdCb3g6IFwiMCAwIDMwIDMwXCIsXG4gIHRvU3RyaW5nOiBmdW5jdGlvbiAoKSB7IHJldHVybiBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiX19fZjI1MjU1YmM4OTU4NzU2YmY3NDFlNWZmODhiZWJhMGVfX19cIiB9LFxuICBiYWNrZ3JvdW5kU2l6ZTogXCJfX180MzhkZWQ2ZDg1M2I0NjgxOWU3NzFjNWNlYzk3YjMzZl9fXyBfX19mOGQ2MzIzNWM5Y2QwODRjOWE1NWQ1M2FhYjA2MDNkY19fX1wiLFxuICBiYWNrZ3JvdW5kUG9zaXRpb246IFwiX19fYzVlMzhiYjZlMjAzMmI1NmIwZDkyNTk0N2M0ZWE1NzNfX18gX19fM2RkNjVmNDc3Y2FmMTFhYjdmN2E4OTVjNGI0MDhkNGFfX19cIlxufSIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBpZDogXCJocC1wYXJ0bmVycy1sb2dvXCIsXG4gIHVybDogX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcIl9fXzZjYzE3MTk0MzhjZDRhNTFjZjU3YzkwOTlmMGNiOTQ1X19fXCIsXG4gIHdpZHRoOiAxNjkuODk2LFxuICBoZWlnaHQ6IDE2LFxuICB2aWV3Qm94OiBcIjAgMCAxNjkuODk2IDE2XCIsXG4gIHRvU3RyaW5nOiBmdW5jdGlvbiAoKSB7IHJldHVybiBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiX19fNmNjMTcxOTQzOGNkNGE1MWNmNTdjOTA5OWYwY2I5NDVfX19cIiB9LFxuICBiYWNrZ3JvdW5kU2l6ZTogXCJfX183MjIwMmExZjExYzhkMWMxNTUxZmQzZmM4NWExMGNkMV9fXyBfX180NzEwMGQ1YjA4ODMzMzMwNmNmZGJiYTBkY2U2NzZlN19fX1wiLFxuICBiYWNrZ3JvdW5kUG9zaXRpb246IFwiX19fZmExN2MwZGI4MmY1ODc3NTYzOGY2OTg1MDBlYTdmMWRfX18gX19fMWM1OWRjYmY3MTYyN2ViYTA0NWNiNTQwZWU5ZTE3NjlfX19cIlxufSIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBpZDogXCJzZWFyY2hcIixcbiAgdXJsOiBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiX19fYzkwYjBlNGJhZDIyYmNiNWEwYzlkOGQ5ODUyZDBmOThfX19cIixcbiAgd2lkdGg6IDE3LjM1NCxcbiAgaGVpZ2h0OiAxNy4zNTQsXG4gIHZpZXdCb3g6IFwiMCAwIDE3LjM1NCAxNy4zNTRcIixcbiAgdG9TdHJpbmc6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJfX19jOTBiMGU0YmFkMjJiY2I1YTBjOWQ4ZDk4NTJkMGY5OF9fX1wiIH0sXG4gIGJhY2tncm91bmRTaXplOiBcIl9fXzYxNzU0ZmIyYzVhN2I1MWQ3YWQzMzQ3NGM4ZmZmMjUyX19fIF9fX2RhNjg3ZGIwOWEzZWJlMDk0YTg1MDVkNTcwYzQxNThmX19fXCIsXG4gIGJhY2tncm91bmRQb3NpdGlvbjogXCJfX184YTc4ZTJiMDVkY2E3ZTRjYzA5OWJmYTIwM2IzZTdhMl9fXyBfX181MmI1MmQyZDFjNjU3Yzc3ZDRkNTY1MzZjOGYxNmY0NF9fX1wiXG59Il0sInNvdXJjZVJvb3QiOiIifQ==