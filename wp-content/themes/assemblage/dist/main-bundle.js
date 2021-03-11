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
  url: __webpack_require__.p + "sprite.svgsprite.svgsprite.svgsprite.svgsprite.svgsprite.svgsprite.svgsprite.svgsprite.svgsprite.svgsprite.svgsprite.svgsprite.svgsprite.svg",
  width: 30,
  height: 30,
  viewBox: "0 0 30 30",
  toString: function () { return __webpack_require__.p + "sprite.svgsprite.svgsprite.svgsprite.svgsprite.svgsprite.svgsprite.svgsprite.svgsprite.svgsprite.svgsprite.svgsprite.svgsprite.svgsprite.svg" },
  backgroundSize: "566.32%566.32%566.32%566.32%566.32%566.32%566.32%566.32%566.32%566.32%566.32%566.32%566.32%566.32% 311.18%311.18%311.18%311.18%311.18%311.18%311.18%311.18%311.18%311.18%311.18%311.18%311.18%311.18%",
  backgroundPosition: "00000000000000 00000000000000"
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
  url: __webpack_require__.p + "sprite.svgsprite.svgsprite.svgsprite.svgsprite.svgsprite.svgsprite.svgsprite.svgsprite.svgsprite.svgsprite.svgsprite.svgsprite.svgsprite.svg",
  width: 169.896,
  height: 16,
  viewBox: "0 0 169.896 16",
  toString: function () { return __webpack_require__.p + "sprite.svgsprite.svgsprite.svgsprite.svgsprite.svgsprite.svgsprite.svgsprite.svgsprite.svgsprite.svgsprite.svgsprite.svgsprite.svgsprite.svg" },
  backgroundSize: "100%100%100%100%100%100%100%100%100%100%100%100%100%100% 583.46%583.46%583.46%583.46%583.46%583.46%583.46%583.46%583.46%583.46%583.46%583.46%583.46%583.46%",
  backgroundPosition: "00000000000000 51.71%51.71%51.71%51.71%51.71%51.71%51.71%51.71%51.71%51.71%51.71%51.71%51.71%51.71%"
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
  url: __webpack_require__.p + "sprite.svgsprite.svgsprite.svgsprite.svgsprite.svgsprite.svgsprite.svgsprite.svgsprite.svgsprite.svgsprite.svgsprite.svgsprite.svgsprite.svg",
  width: 17.354,
  height: 17.354,
  viewBox: "0 0 17.354 17.354",
  toString: function () { return __webpack_require__.p + "sprite.svgsprite.svgsprite.svgsprite.svgsprite.svgsprite.svgsprite.svgsprite.svgsprite.svgsprite.svgsprite.svgsprite.svgsprite.svgsprite.svg" },
  backgroundSize: "979.00%979.00%979.00%979.00%979.00%979.00%979.00%979.00%979.00%979.00%979.00%979.00%979.00%979.00% 537.94%537.94%537.94%537.94%537.94%537.94%537.94%537.94%537.94%537.94%537.94%537.94%537.94%537.94%",
  backgroundPosition: "00000000000000 86.84%86.84%86.84%86.84%86.84%86.84%86.84%86.84%86.84%86.84%86.84%86.84%86.84%86.84%"
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZ2lhL0Jhc2VDb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2dpYS9Db21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2dpYS9jb25maWcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2dpYS9jcmVhdGVJbnN0YW5jZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZ2lhL2V2ZW50YnVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9naWEvZ2V0Q29tcG9uZW50RnJvbUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2dpYS9sb2FkQ29tcG9uZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZ2lhL3V0aWxzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9pbmNsdWRlLW1lZGlhLWV4cG9ydC9kaXN0L2luY2x1ZGUtbWVkaWEtMS4wLjIubWluLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sYXp5c2l6ZXMvbGF6eXNpemVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Njcm9sbC1sb2NrL2Rpc3Qvc2Nyb2xsLWxvY2suanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL0Jhc2VUaGVtZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvRm9ybS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYy1CdXJnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2MtQnVyZ2VyTWVudS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYy1Ub3BOYXYuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL21vZHVsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Nhc3MvbWFpbi5zY3NzIiwid2VicGFjazovLy8uL3NyYy9zdmcvYXJyb3cuc3ZnIiwid2VicGFjazovLy8uL3NyYy9zdmcvaHAtcGFydG5lcnMtbG9nby5zdmciLCJ3ZWJwYWNrOi8vLy4vc3JjL3N2Zy9zZWFyY2guc3ZnIl0sIm5hbWVzIjpbImdsb2JhbCIsImhhc093biIsIk9iamVjdCIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwidW5kZWZpbmVkIiwiaXRlcmF0b3JTeW1ib2wiLCJTeW1ib2wiLCJpdGVyYXRvciIsImluTW9kdWxlIiwibW9kdWxlIiwicnVudGltZSIsInJlZ2VuZXJhdG9yUnVudGltZSIsImV4cG9ydHMiLCJ3cmFwIiwiaW5uZXJGbiIsIm91dGVyRm4iLCJzZWxmIiwidHJ5TG9jc0xpc3QiLCJnZW5lcmF0b3IiLCJjcmVhdGUiLCJHZW5lcmF0b3IiLCJjb250ZXh0IiwiQ29udGV4dCIsIl9pbnZva2UiLCJtYWtlSW52b2tlTWV0aG9kIiwidHJ5Q2F0Y2giLCJmbiIsIm9iaiIsImFyZyIsInR5cGUiLCJjYWxsIiwiZXJyIiwiR2VuU3RhdGVTdXNwZW5kZWRTdGFydCIsIkdlblN0YXRlU3VzcGVuZGVkWWllbGQiLCJHZW5TdGF0ZUV4ZWN1dGluZyIsIkdlblN0YXRlQ29tcGxldGVkIiwiQ29udGludWVTZW50aW5lbCIsIkdlbmVyYXRvckZ1bmN0aW9uIiwiR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUiLCJHcCIsImNvbnN0cnVjdG9yIiwiZGlzcGxheU5hbWUiLCJkZWZpbmVJdGVyYXRvck1ldGhvZHMiLCJmb3JFYWNoIiwibWV0aG9kIiwiaXNHZW5lcmF0b3JGdW5jdGlvbiIsImdlbkZ1biIsImN0b3IiLCJuYW1lIiwibWFyayIsInNldFByb3RvdHlwZU9mIiwiX19wcm90b19fIiwiYXdyYXAiLCJBd2FpdEFyZ3VtZW50IiwiQXN5bmNJdGVyYXRvciIsImludm9rZSIsInJlc3VsdCIsInZhbHVlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJ0aGVuIiwiaW52b2tlTmV4dCIsImludm9rZVRocm93IiwidW53cmFwcGVkIiwicHJvY2VzcyIsImRvbWFpbiIsImJpbmQiLCJpbnZva2VSZXR1cm4iLCJwcmV2aW91c1Byb21pc2UiLCJlbnF1ZXVlIiwiY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmciLCJhc3luYyIsIml0ZXIiLCJuZXh0IiwiZG9uZSIsInN0YXRlIiwiRXJyb3IiLCJkb25lUmVzdWx0IiwiZGVsZWdhdGUiLCJyZXR1cm5NZXRob2QiLCJyZWNvcmQiLCJpbmZvIiwicmVzdWx0TmFtZSIsIm5leHRMb2MiLCJfc2VudCIsInNlbnQiLCJkaXNwYXRjaEV4Y2VwdGlvbiIsImFicnVwdCIsInRvU3RyaW5nIiwicHVzaFRyeUVudHJ5IiwibG9jcyIsImVudHJ5IiwidHJ5TG9jIiwiY2F0Y2hMb2MiLCJmaW5hbGx5TG9jIiwiYWZ0ZXJMb2MiLCJ0cnlFbnRyaWVzIiwicHVzaCIsInJlc2V0VHJ5RW50cnkiLCJjb21wbGV0aW9uIiwicmVzZXQiLCJrZXlzIiwib2JqZWN0Iiwia2V5IiwicmV2ZXJzZSIsImxlbmd0aCIsInBvcCIsInZhbHVlcyIsIml0ZXJhYmxlIiwiaXRlcmF0b3JNZXRob2QiLCJpc05hTiIsImkiLCJza2lwVGVtcFJlc2V0IiwicHJldiIsImNoYXJBdCIsInNsaWNlIiwic3RvcCIsInJvb3RFbnRyeSIsInJvb3RSZWNvcmQiLCJydmFsIiwiZXhjZXB0aW9uIiwiaGFuZGxlIiwibG9jIiwiY2F1Z2h0IiwiaGFzQ2F0Y2giLCJoYXNGaW5hbGx5IiwiZmluYWxseUVudHJ5IiwiY29tcGxldGUiLCJmaW5pc2giLCJ0aHJvd24iLCJkZWxlZ2F0ZVlpZWxkIiwid2luZG93IiwiZGVmaW5lUHJvcGVydHkiLCJfZXh0ZW5kcyIsImFzc2lnbiIsInRhcmdldCIsImFyZ3VtZW50cyIsInNvdXJjZSIsIl90eXBlb2YiLCJfY3JlYXRlQ2xhc3MiLCJkZWZpbmVQcm9wZXJ0aWVzIiwicHJvcHMiLCJkZXNjcmlwdG9yIiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsIndyaXRhYmxlIiwiQ29uc3RydWN0b3IiLCJwcm90b1Byb3BzIiwic3RhdGljUHJvcHMiLCJfdXRpbHMiLCJyZXF1aXJlIiwiX2NsYXNzQ2FsbENoZWNrIiwiaW5zdGFuY2UiLCJUeXBlRXJyb3IiLCJDb21wb25lbnQiLCJlbGVtZW50Iiwib3B0aW9ucyIsIl9yZWYiLCJfb3B0aW9ucyIsIl9zdGF0ZSIsIl9sb2FkIiwibW91bnQiLCJjb25zb2xlIiwid2FybiIsIl9uYW1lIiwidW5tb3VudCIsImdldFJlZiIsInJlZiIsInByZWZpeGVkIiwic2V0U3RhdGUiLCJjaGFuZ2VzIiwiX3RoaXMiLCJzdGF0ZUNoYW5nZXMiLCJBcnJheSIsImlzQXJyYXkiLCJzb21lIiwiaXRlbSIsImluZGV4Iiwic3Via2V5Iiwic3RhdGVDaGFuZ2UiLCJnZXQiLCJzZXQiLCJpdGVtcyIsIl90aGlzMiIsImFsbFJlZnMiLCJxdWVyeUFsbCIsInJlZk5hbWUiLCJnZXRBdHRyaWJ1dGUiLCJpbmRleE9mIiwicmVmTmFtZUFycmF5Iiwic3BsaXQiLCJmaWx0ZXIiLCJtYXAiLCJwcmVmaXhlZE5hbWUiLCJyZWZzIiwicmVkdWNlIiwiYWNjIiwiZGVmYXVsdHMiLCJvcHRpb25zRnJvbUF0dHJpYnV0ZSIsIkpTT04iLCJwYXJzZSIsImRlZmF1bHQiLCJfQmFzZUNvbXBvbmVudDIiLCJfQmFzZUNvbXBvbmVudDMiLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0IiwiX19lc01vZHVsZSIsIl9hc3luY1RvR2VuZXJhdG9yIiwiZ2VuIiwiYXBwbHkiLCJyZWplY3QiLCJzdGVwIiwiZXJyb3IiLCJfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybiIsIlJlZmVyZW5jZUVycm9yIiwiX2luaGVyaXRzIiwic3ViQ2xhc3MiLCJzdXBlckNsYXNzIiwiX0Jhc2VDb21wb25lbnQiLCJnZXRQcm90b3R5cGVPZiIsIl9jYWxsZWUiLCJfY2FsbGVlJCIsIl9jb250ZXh0IiwiQ29uZmlnIiwibG9nIiwiY3JlYXRlSW5zdGFuY2UiLCJfY29uZmlnIiwiX2NvbmZpZzIiLCJjb21wb25lbnROYW1lIiwiY29tcG9uZW50IiwiRXZlbnRCdXMiLCJsaXN0IiwiZW1pdCIsImV2ZW50IiwiZXZlbnRPYmplY3QiLCJoYW5kbGVyT2JqZWN0IiwiaGFuZGxlciIsIm9uY2UiLCJvZmYiLCJvbiIsInRvUmVtb3ZlIiwic3BsaWNlIiwiZ2V0Q29tcG9uZW50RnJvbUVsZW1lbnQiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwibG9hZENvbXBvbmVudHMiLCJfZ2V0Q29tcG9uZW50RnJvbUVsZW1lbnQiLCJfZ2V0Q29tcG9uZW50RnJvbUVsZW1lbnQyIiwiX2NyZWF0ZUluc3RhbmNlIiwiX2NyZWF0ZUluc3RhbmNlMiIsImNvbXBvbmVudHMiLCJkb2N1bWVudEVsZW1lbnQiLCJpbml0aWFsaXNlZENvbXBvbmVudHMiLCJxdWVyeSIsInRvZ2dsZUNsYXNzIiwicmVtb3ZlQ2xhc3MiLCJhZGRDbGFzcyIsInRyaWdnZXJFdmVudCIsInNlbGVjdG9yIiwicXVlcnlTZWxlY3RvciIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJjbGFzc05hbWUiLCJjb25kaXRpb24iLCJjbGFzc0xpc3QiLCJjb250YWlucyIsInJlbW92ZSIsImFkZCIsIm5vZGVzIiwibm9kZSIsImV2ZW50VHlwZSIsInBhcmFtcyIsImJ1YmJsZXMiLCJjYW5jZWxhYmxlIiwiZGV0YWlsIiwiQ3VzdG9tRXZlbnQiLCJkaXNwYXRjaEV2ZW50IiwiZSIsInQiLCJkZWZpbmUiLCJjIiwiZiIsIm4iLCJnZXRDb21wdXRlZFN0eWxlIiwiY29udGVudCIsImwiLCJhIiwiYWN0aXZlIiwibyIsInIiLCJwYXJzZUZsb2F0IiwidSIsIlN0cmluZyIsInJlcGxhY2UiLCJib2R5Iiwic2V0RWxlbWVudCIsInNldFVwZGF0ZU1vZGUiLCJncmVhdGVyVGhhbiIsImxlc3NUaGFuIiwiZ2V0QWN0aXZlIiwiZ2V0VmFsdWUiLCJ1cGRhdGUiLCJmYWN0b3J5IiwibGF6eVNpemVzIiwiRGF0ZSIsImxhenlzaXplcyIsImxhenlTaXplc0NmZyIsInByb3AiLCJsYXp5U2l6ZXNEZWZhdWx0cyIsImxhenlDbGFzcyIsImxvYWRlZENsYXNzIiwibG9hZGluZ0NsYXNzIiwicHJlbG9hZENsYXNzIiwiZXJyb3JDbGFzcyIsImF1dG9zaXplc0NsYXNzIiwic3JjQXR0ciIsInNyY3NldEF0dHIiLCJzaXplc0F0dHIiLCJtaW5TaXplIiwiY3VzdG9tTWVkaWEiLCJpbml0IiwiZXhwRmFjdG9yIiwiaEZhYyIsImxvYWRNb2RlIiwibG9hZEhpZGRlbiIsInJpY1RpbWVvdXQiLCJ0aHJvdHRsZURlbGF5IiwibGF6eVNpemVzQ29uZmlnIiwibGF6eXNpemVzQ29uZmlnIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsImNmZyIsIm5vU3VwcG9ydCIsImRvY0VsZW0iLCJzdXBwb3J0UGljdHVyZSIsIkhUTUxQaWN0dXJlRWxlbWVudCIsIl9hZGRFdmVudExpc3RlbmVyIiwiX2dldEF0dHJpYnV0ZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJzZXRUaW1lb3V0IiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwicmVxdWVzdElkbGVDYWxsYmFjayIsInJlZ1BpY3R1cmUiLCJsb2FkRXZlbnRzIiwicmVnQ2xhc3NDYWNoZSIsImhhc0NsYXNzIiwiZWxlIiwiY2xzIiwiUmVnRXhwIiwidGVzdCIsInNldEF0dHJpYnV0ZSIsInRyaW0iLCJyZWciLCJhZGRSZW1vdmVMb2FkRXZlbnRzIiwiZG9tIiwiYWN0aW9uIiwiZXZ0IiwiZWxlbSIsIm5vQnViYmxlcyIsIm5vQ2FuY2VsYWJsZSIsImNyZWF0ZUV2ZW50IiwiaW5pdEV2ZW50IiwidXBkYXRlUG9seWZpbGwiLCJlbCIsImZ1bGwiLCJwb2x5ZmlsbCIsInBpY3R1cmVmaWxsIiwicGYiLCJzcmMiLCJyZWV2YWx1YXRlIiwiZWxlbWVudHMiLCJnZXRDU1MiLCJzdHlsZSIsImdldFdpZHRoIiwicGFyZW50Iiwid2lkdGgiLCJvZmZzZXRXaWR0aCIsIl9sYXp5c2l6ZXNXaWR0aCIsInBhcmVudE5vZGUiLCJyQUYiLCJydW5uaW5nIiwid2FpdGluZyIsImZpcnN0Rm5zIiwic2Vjb25kRm5zIiwiZm5zIiwicnVuIiwicnVuRm5zIiwic2hpZnQiLCJyYWZCYXRjaCIsInF1ZXVlIiwiaGlkZGVuIiwiX2xzRmx1c2giLCJyQUZJdCIsInNpbXBsZSIsInRoYXQiLCJhcmdzIiwidGhyb3R0bGUiLCJsYXN0VGltZSIsImdEZWxheSIsInJJQ1RpbWVvdXQiLCJub3ciLCJpZGxlQ2FsbGJhY2siLCJ0aW1lb3V0IiwiaXNQcmlvcml0eSIsImRlbGF5IiwiZGVib3VuY2UiLCJmdW5jIiwidGltZXN0YW1wIiwid2FpdCIsImxhdGVyIiwibGFzdCIsImxvYWRlciIsInByZWxvYWRFbGVtcyIsImlzQ29tcGxldGVkIiwicmVzZXRQcmVsb2FkaW5nVGltZXIiLCJzdGFydGVkIiwiZUx2VyIsImVsdkgiLCJlTHRvcCIsImVMbGVmdCIsImVMcmlnaHQiLCJlTGJvdHRvbSIsImlzQm9keUhpZGRlbiIsInJlZ0ltZyIsInJlZ0lmcmFtZSIsInN1cHBvcnRTY3JvbGwiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJzaHJpbmtFeHBhbmQiLCJjdXJyZW50RXhwYW5kIiwiaXNMb2FkaW5nIiwibG93UnVucyIsInJlc2V0UHJlbG9hZGluZyIsImlzVmlzaWJsZSIsImlzTmVzdGVkVmlzaWJsZSIsImVsZW1FeHBhbmQiLCJvdXRlclJlY3QiLCJ2aXNpYmxlIiwib2Zmc2V0UGFyZW50IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwibGVmdCIsInJpZ2h0IiwidG9wIiwiYm90dG9tIiwiY2hlY2tFbGVtZW50cyIsImVMbGVuIiwicmVjdCIsImF1dG9Mb2FkRWxlbSIsImxvYWRlZFNvbWV0aGluZyIsImVsZW1OZWdhdGl2ZUV4cGFuZCIsImVsZW1FeHBhbmRWYWwiLCJiZWZvcmVFeHBhbmRWYWwiLCJkZWZhdWx0RXhwYW5kIiwicHJlbG9hZEV4cGFuZCIsImxhenlsb2FkRWxlbXMiLCJfbGF6eVJhY2UiLCJwcmVtYXR1cmVVbnZlaWwiLCJ1bnZlaWxFbGVtZW50IiwiZXhwYW5kIiwiY2xpZW50SGVpZ2h0IiwiY2xpZW50V2lkdGgiLCJfZGVmRXgiLCJpbm5lcldpZHRoIiwiaW5uZXJIZWlnaHQiLCJwcmVsb2FkQWZ0ZXJMb2FkIiwidGhyb3R0bGVkQ2hlY2tFbGVtZW50cyIsInN3aXRjaExvYWRpbmdDbGFzcyIsIl9sYXp5Q2FjaGUiLCJyYWZTd2l0Y2hMb2FkaW5nQ2xhc3MiLCJyYWZlZFN3aXRjaExvYWRpbmdDbGFzcyIsImNoYW5nZUlmcmFtZVNyYyIsImNvbnRlbnRXaW5kb3ciLCJsb2NhdGlvbiIsImhhbmRsZVNvdXJjZXMiLCJzb3VyY2VTcmNzZXQiLCJsYXp5VW52ZWlsIiwiaXNBdXRvIiwic2l6ZXMiLCJpc0ltZyIsInNyY3NldCIsImlzUGljdHVyZSIsImZpcmVzTG9hZCIsImRlZmF1bHRQcmV2ZW50ZWQiLCJub2RlTmFtZSIsImNsZWFyVGltZW91dCIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiaXNMb2FkZWQiLCJuYXR1cmFsV2lkdGgiLCJsb2FkaW5nIiwiYXV0b1NpemVyIiwidXBkYXRlRWxlbSIsImFmdGVyU2Nyb2xsIiwiYWx0TG9hZG1vZGVTY3JvbGxMaXN0bmVyIiwib25sb2FkIiwiXyIsInBlcnNpc3RlZCIsImxvYWRpbmdFbGVtZW50cyIsImltZyIsIk11dGF0aW9uT2JzZXJ2ZXIiLCJvYnNlcnZlIiwiY2hpbGRMaXN0Iiwic3VidHJlZSIsImF0dHJpYnV0ZXMiLCJzZXRJbnRlcnZhbCIsInJlYWR5U3RhdGUiLCJjaGVja0VsZW1zIiwidW52ZWlsIiwiX2FMU0wiLCJhdXRvc2l6ZXNFbGVtcyIsInNpemVFbGVtZW50Iiwic291cmNlcyIsImxlbiIsImRhdGFBdHRyIiwiZ2V0U2l6ZUVsZW1lbnQiLCJ1cGRhdGVFbGVtZW50c1NpemVzIiwiZGVib3VuY2VkVXBkYXRlRWxlbWVudHNTaXplcyIsInVQIiwiYUMiLCJyQyIsImhDIiwiZmlyZSIsImdXIiwiY2FjaGVkU2V0VGltZW91dCIsImNhY2hlZENsZWFyVGltZW91dCIsImRlZmF1bHRTZXRUaW1vdXQiLCJkZWZhdWx0Q2xlYXJUaW1lb3V0IiwicnVuVGltZW91dCIsImZ1biIsInJ1bkNsZWFyVGltZW91dCIsIm1hcmtlciIsImRyYWluaW5nIiwiY3VycmVudFF1ZXVlIiwicXVldWVJbmRleCIsImNsZWFuVXBOZXh0VGljayIsImNvbmNhdCIsImRyYWluUXVldWUiLCJuZXh0VGljayIsIkl0ZW0iLCJhcnJheSIsInRpdGxlIiwiYnJvd3NlciIsImVudiIsImFyZ3YiLCJ2ZXJzaW9uIiwidmVyc2lvbnMiLCJub29wIiwiYWRkTGlzdGVuZXIiLCJyZW1vdmVMaXN0ZW5lciIsInJlbW92ZUFsbExpc3RlbmVycyIsInByZXBlbmRMaXN0ZW5lciIsInByZXBlbmRPbmNlTGlzdGVuZXIiLCJsaXN0ZW5lcnMiLCJiaW5kaW5nIiwiY3dkIiwiY2hkaXIiLCJkaXIiLCJ1bWFzayIsIndlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwicm9vdCIsIm1vZHVsZXMiLCJpbnN0YWxsZWRNb2R1bGVzIiwiX193ZWJwYWNrX3JlcXVpcmVfXyIsIm1vZHVsZUlkIiwibSIsImQiLCJnZXR0ZXIiLCJ0b1N0cmluZ1RhZyIsIm1vZGUiLCJucyIsImdldERlZmF1bHQiLCJnZXRNb2R1bGVFeHBvcnRzIiwicHJvcGVydHkiLCJwIiwicyIsIl9fd2VicGFja19leHBvcnRzX18iLCJhcmd1bWVudEFzQXJyYXkiLCJhcmd1bWVudCIsImlzRWxlbWVudCIsIk5vZGUiLCJpc0VsZW1lbnRMaXN0Iiwibm9kZUxpc3QiLCJOb2RlTGlzdCIsImVhY2hOb2RlIiwiY2FsbGJhY2siLCJ0aHJvd0Vycm9yIiwibWVzc2FnZSIsImFycmF5QXNTZWxlY3RvciIsImpvaW4iLCJub2RlTGlzdEFzQXJyYXkiLCJmaW5kUGFyZW50QnlTZWxlY3RvciIsIiRlbCIsIiRyb290IiwicGFyZW50RWxlbWVudCIsImVsZW1lbnRIYXNTZWxlY3RvciIsImhhcyIsImVsZW1lbnRIYXNPdmVyZmxvd0hpZGRlbiIsImNvbXB1dGVkU3R5bGUiLCJvdmVyZmxvd0lzSGlkZGVuIiwib3ZlcmZsb3ciLCJlbGVtZW50U2Nyb2xsVG9wT25TdGFydCIsInNjcm9sbFRvcCIsImVsZW1lbnRTY3JvbGxUb3BPbkVuZCIsInNjcm9sbEhlaWdodCIsInNjcm9sbFRvcFdpdGhIZWlnaHQiLCJvZmZzZXRIZWlnaHQiLCJlbGVtZW50U2Nyb2xsTGVmdE9uU3RhcnQiLCJzY3JvbGxMZWZ0IiwiZWxlbWVudFNjcm9sbExlZnRPbkVuZCIsInNjcm9sbFdpZHRoIiwic2Nyb2xsTGVmdFdpdGhXaWR0aCIsImVsZW1lbnRJc1Njcm9sbGFibGVGaWVsZCIsImVsZW1lbnRJc0lucHV0UmFuZ2UiLCJkaXNhYmxlUGFnZVNjcm9sbCIsImVuYWJsZVBhZ2VTY3JvbGwiLCJnZXRTY3JvbGxTdGF0ZSIsImNsZWFyUXVldWVTY3JvbGxMb2NrcyIsInNjcm9sbF9sb2NrX2dldFRhcmdldFNjcm9sbEJhcldpZHRoIiwic2Nyb2xsX2xvY2tfZ2V0Q3VycmVudFRhcmdldFNjcm9sbEJhcldpZHRoIiwiZ2V0UGFnZVNjcm9sbEJhcldpZHRoIiwiZ2V0Q3VycmVudFBhZ2VTY3JvbGxCYXJXaWR0aCIsInNjcm9sbF9sb2NrX2FkZFNjcm9sbGFibGVUYXJnZXQiLCJzY3JvbGxfbG9ja19yZW1vdmVTY3JvbGxhYmxlVGFyZ2V0Iiwic2Nyb2xsX2xvY2tfYWRkU2Nyb2xsYWJsZVNlbGVjdG9yIiwic2Nyb2xsX2xvY2tfcmVtb3ZlU2Nyb2xsYWJsZVNlbGVjdG9yIiwic2Nyb2xsX2xvY2tfYWRkTG9ja2FibGVUYXJnZXQiLCJzY3JvbGxfbG9ja19hZGRMb2NrYWJsZVNlbGVjdG9yIiwic2Nyb2xsX2xvY2tfc2V0RmlsbEdhcE1ldGhvZCIsInNjcm9sbF9sb2NrX2FkZEZpbGxHYXBUYXJnZXQiLCJzY3JvbGxfbG9ja19yZW1vdmVGaWxsR2FwVGFyZ2V0Iiwic2Nyb2xsX2xvY2tfYWRkRmlsbEdhcFNlbGVjdG9yIiwic2Nyb2xsX2xvY2tfcmVtb3ZlRmlsbEdhcFNlbGVjdG9yIiwicmVmaWxsR2FwcyIsIl9vYmplY3RTcHJlYWQiLCJvd25LZXlzIiwiZ2V0T3duUHJvcGVydHlTeW1ib2xzIiwic3ltIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiX2RlZmluZVByb3BlcnR5IiwiRklMTF9HQVBfQVZBSUxBQkxFX01FVEhPRFMiLCJUT1VDSF9ESVJFQ1RJT05fREVURUNUX09GRlNFVCIsInNjcm9sbCIsInNjcm9sbGFibGVTZWxlY3RvcnMiLCJsb2NrYWJsZVNlbGVjdG9ycyIsImZpbGxHYXBTZWxlY3RvcnMiLCJmaWxsR2FwTWV0aG9kIiwic3RhcnRUb3VjaFkiLCJzdGFydFRvdWNoWCIsInNjcm9sbF9sb2NrX2hpZGVMb2NrYWJsZU92ZXJmbG93IiwiZmlsbEdhcHMiLCJzY3JvbGxfbG9ja19zaG93TG9ja2FibGVPdmVyZmxvdyIsInVuZmlsbEdhcHMiLCJnZXRUYXJnZXRTY3JvbGxCYXJXaWR0aCIsIiR0YXJnZXQiLCJvbmx5RXhpc3RzIiwiY3VycmVudE92ZXJmbG93WVByb3BlcnR5Iiwib3ZlcmZsb3dZIiwiZ2V0Q3VycmVudFRhcmdldFNjcm9sbEJhcldpZHRoIiwiZG9jdW1lbnRXaWR0aCIsIndpbmRvd1dpZHRoIiwiY3VycmVudFdpZHRoIiwiYm9yZGVyTGVmdFdpZHRoQ3VycmVudFByb3BlcnR5IiwiYm9yZGVyTGVmdFdpZHRoIiwiYm9yZGVyUmlnaHRXaWR0aEN1cnJlbnRQcm9wZXJ0eSIsImJvcmRlclJpZ2h0V2lkdGgiLCJfY3VycmVudFdpZHRoIiwiYWRkU2Nyb2xsYWJsZVRhcmdldCIsInRhcmdldHMiLCIkdGFyZ2V0cyIsInJlbW92ZVNjcm9sbGFibGVUYXJnZXQiLCJyZW1vdmVBdHRyaWJ1dGUiLCJhZGRTY3JvbGxhYmxlU2VsZWN0b3IiLCJzZWxlY3RvcnMiLCJyZW1vdmVTY3JvbGxhYmxlU2VsZWN0b3IiLCJzU2VsZWN0b3IiLCJhZGRMb2NrYWJsZVRhcmdldCIsImFkZExvY2thYmxlU2VsZWN0b3IiLCJzZXRGaWxsR2FwTWV0aG9kIiwibWV0aG9kcyIsImFkZEZpbGxHYXBUYXJnZXQiLCJzY3JvbGxfbG9ja19maWxsR2FwVGFyZ2V0IiwicmVtb3ZlRmlsbEdhcFRhcmdldCIsInNjcm9sbF9sb2NrX3VuZmlsbEdhcFRhcmdldCIsImFkZEZpbGxHYXBTZWxlY3RvciIsInNjcm9sbF9sb2NrX2ZpbGxHYXBTZWxlY3RvciIsInJlbW92ZUZpbGxHYXBTZWxlY3RvciIsImZTZWxlY3RvciIsInNjcm9sbF9sb2NrX3VuZmlsbEdhcFNlbGVjdG9yIiwiaGlkZUxvY2thYmxlT3ZlcmZsb3ciLCJzY3JvbGxfbG9ja19oaWRlTG9ja2FibGVPdmVyZmxvd1NlbGVjdG9yIiwic2hvd0xvY2thYmxlT3ZlcmZsb3ciLCJzY3JvbGxfbG9ja19zaG93TG9ja2FibGVPdmVyZmxvd1NlbGVjdG9yIiwiaGlkZUxvY2thYmxlT3ZlcmZsb3dTZWxlY3RvciIsInNjcm9sbF9sb2NrX2hpZGVMb2NrYWJsZU92ZXJmbG93VGFyZ2V0Iiwic2hvd0xvY2thYmxlT3ZlcmZsb3dTZWxlY3RvciIsInNjcm9sbF9sb2NrX3Nob3dMb2NrYWJsZU92ZXJmbG93VGFyZ2V0IiwiaGlkZUxvY2thYmxlT3ZlcmZsb3dUYXJnZXQiLCJzaG93TG9ja2FibGVPdmVyZmxvd1RhcmdldCIsImZpbGxHYXBTZWxlY3RvciIsImlzTG9ja2FibGUiLCJmaWxsR2FwVGFyZ2V0Iiwic2Nyb2xsQmFyV2lkdGgiLCIkbG9ja2FibGVQYXJlbnQiLCJjdXJyZW50TWFyZ2luIiwibWFyZ2luUmlnaHQiLCJtYXhXaWR0aCIsImN1cnJlbnRQYWRkaW5nIiwicGFkZGluZ1JpZ2h0IiwidW5maWxsR2FwU2VsZWN0b3IiLCJ1bmZpbGxHYXBUYXJnZXQiLCJjdXJyZW50RmlsbEdhcE1ldGhvZCIsIm9uUmVzaXplIiwib25Ub3VjaFN0YXJ0IiwidG91Y2hlcyIsImNsaWVudFkiLCJjbGllbnRYIiwic2Nyb2xsX2xvY2tfb25Ub3VjaE1vdmUiLCJvblRvdWNoTW92ZSIsImN1cnJlbnRDbGllbnRZIiwiY3VycmVudENsaWVudFgiLCJkaXJlY3Rpb24iLCJ1cCIsImRvd24iLCJkaXJlY3Rpb25XaXRoT2Zmc2V0Iiwic2tpcCIsInBhcmVudFNjcm9sbGFibGVFbCIsInByZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsIm9uVG91Y2hFbmQiLCJwYXNzaXZlIiwiZGVwcmVjYXRlZE1ldGhvZHMiLCJoaWRlIiwic2hvdyIsInRvZ2dsZSIsImdldFN0YXRlIiwiZ2V0Q3VycmVudFdpZHRoIiwic2V0U2Nyb2xsYWJsZVRhcmdldHMiLCJzZXRGaWxsR2FwU2VsZWN0b3JzIiwic2V0RmlsbEdhcFRhcmdldHMiLCJjbGVhclF1ZXVlIiwic2Nyb2xsTG9jayIsInNjcm9sbF9sb2NrIiwiZyIsIkZ1bmN0aW9uIiwiQmFzZVRoZW1lIiwibWVkaWFRdWVyeSIsImxhdGVzdEtub3duU2Nyb2xsWSIsImxhc3RTY3JvbGxUb3AiLCJiYXNlIiwiaW5pdFNjcm9sbEhhbmRsZXIiLCJpbml0UmVzaXplSGFuZGxlciIsInRpY2siLCJzY3JvbGxZIiwic2Nyb2xsRGlyZWN0aW9uIiwic2Nyb2xsRXZlbnRzIiwic2Nyb2xsSGFuZGxlciIsImZvckxhc3RFeGVjIiwidGhyb3R0bGVkIiwicmVzaXplRXZlbnRzIiwicmVzaXplSGFuZGxlciIsImN1cnJlbnRTY3JvbGxZIiwiRm9ybSIsIiQiLCJmb2N1cyIsImJsdXIiLCJjdmFsIiwidmFsIiwiQnVyZ2VyIiwiYnVyZ2VyVHJpZ2dlciIsInRyaWdnZXJTdGF0ZUNoYW5nZSIsImV2ZW50YnVzIiwiQnVyZ2VyVHJpZ2dlclN0YXRlIiwidHJpZ2dlciIsIkJ1cmdlck1lbnUiLCJtZW51T3BlbiIsInRvZ2dsZVN0YXRlQ2hhbmdlIiwiY2xvc2VNZW51IiwiVG9wTmF2Iiwic2hyaW5rQmFyIiwiaGlkZUJhciIsImlzU2hydW5r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QUNBO0FBQ0E7QUFDQSx5QkFBeUIsUUFBUSxxQkFBdUIsSUFBSSxVQUFzQyxxSUFBRztBQUNyRyxtQkFBbUIsT0FBc0MsNEZBQUMsT0FBc0M7QUFDaEcsdUJBQXVCLENBQXNDLGNBQUMsTUFBc0M7QUFDcEcsQyIsImZpbGUiOiJtYWluLWJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIGh0dHBzOi8vcmF3LmdpdGh1Yi5jb20vZmFjZWJvb2svcmVnZW5lcmF0b3IvbWFzdGVyL0xJQ0VOU0UgZmlsZS4gQW5cbiAqIGFkZGl0aW9uYWwgZ3JhbnQgb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpblxuICogdGhlIHNhbWUgZGlyZWN0b3J5LlxuICovXG5cbiEoZnVuY3Rpb24oZ2xvYmFsKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIHZhciBoYXNPd24gPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuICB2YXIgdW5kZWZpbmVkOyAvLyBNb3JlIGNvbXByZXNzaWJsZSB0aGFuIHZvaWQgMC5cbiAgdmFyIGl0ZXJhdG9yU3ltYm9sID1cbiAgICB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLml0ZXJhdG9yIHx8IFwiQEBpdGVyYXRvclwiO1xuXG4gIHZhciBpbk1vZHVsZSA9IHR5cGVvZiBtb2R1bGUgPT09IFwib2JqZWN0XCI7XG4gIHZhciBydW50aW1lID0gZ2xvYmFsLnJlZ2VuZXJhdG9yUnVudGltZTtcbiAgaWYgKHJ1bnRpbWUpIHtcbiAgICBpZiAoaW5Nb2R1bGUpIHtcbiAgICAgIC8vIElmIHJlZ2VuZXJhdG9yUnVudGltZSBpcyBkZWZpbmVkIGdsb2JhbGx5IGFuZCB3ZSdyZSBpbiBhIG1vZHVsZSxcbiAgICAgIC8vIG1ha2UgdGhlIGV4cG9ydHMgb2JqZWN0IGlkZW50aWNhbCB0byByZWdlbmVyYXRvclJ1bnRpbWUuXG4gICAgICBtb2R1bGUuZXhwb3J0cyA9IHJ1bnRpbWU7XG4gICAgfVxuICAgIC8vIERvbid0IGJvdGhlciBldmFsdWF0aW5nIHRoZSByZXN0IG9mIHRoaXMgZmlsZSBpZiB0aGUgcnVudGltZSB3YXNcbiAgICAvLyBhbHJlYWR5IGRlZmluZWQgZ2xvYmFsbHkuXG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gRGVmaW5lIHRoZSBydW50aW1lIGdsb2JhbGx5IChhcyBleHBlY3RlZCBieSBnZW5lcmF0ZWQgY29kZSkgYXMgZWl0aGVyXG4gIC8vIG1vZHVsZS5leHBvcnRzIChpZiB3ZSdyZSBpbiBhIG1vZHVsZSkgb3IgYSBuZXcsIGVtcHR5IG9iamVjdC5cbiAgcnVudGltZSA9IGdsb2JhbC5yZWdlbmVyYXRvclJ1bnRpbWUgPSBpbk1vZHVsZSA/IG1vZHVsZS5leHBvcnRzIDoge307XG5cbiAgZnVuY3Rpb24gd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCkge1xuICAgIC8vIElmIG91dGVyRm4gcHJvdmlkZWQsIHRoZW4gb3V0ZXJGbi5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IuXG4gICAgdmFyIGdlbmVyYXRvciA9IE9iamVjdC5jcmVhdGUoKG91dGVyRm4gfHwgR2VuZXJhdG9yKS5wcm90b3R5cGUpO1xuICAgIHZhciBjb250ZXh0ID0gbmV3IENvbnRleHQodHJ5TG9jc0xpc3QgfHwgW10pO1xuXG4gICAgLy8gVGhlIC5faW52b2tlIG1ldGhvZCB1bmlmaWVzIHRoZSBpbXBsZW1lbnRhdGlvbnMgb2YgdGhlIC5uZXh0LFxuICAgIC8vIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcy5cbiAgICBnZW5lcmF0b3IuX2ludm9rZSA9IG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG5cbiAgICByZXR1cm4gZ2VuZXJhdG9yO1xuICB9XG4gIHJ1bnRpbWUud3JhcCA9IHdyYXA7XG5cbiAgLy8gVHJ5L2NhdGNoIGhlbHBlciB0byBtaW5pbWl6ZSBkZW9wdGltaXphdGlvbnMuIFJldHVybnMgYSBjb21wbGV0aW9uXG4gIC8vIHJlY29yZCBsaWtlIGNvbnRleHQudHJ5RW50cmllc1tpXS5jb21wbGV0aW9uLiBUaGlzIGludGVyZmFjZSBjb3VsZFxuICAvLyBoYXZlIGJlZW4gKGFuZCB3YXMgcHJldmlvdXNseSkgZGVzaWduZWQgdG8gdGFrZSBhIGNsb3N1cmUgdG8gYmVcbiAgLy8gaW52b2tlZCB3aXRob3V0IGFyZ3VtZW50cywgYnV0IGluIGFsbCB0aGUgY2FzZXMgd2UgY2FyZSBhYm91dCB3ZVxuICAvLyBhbHJlYWR5IGhhdmUgYW4gZXhpc3RpbmcgbWV0aG9kIHdlIHdhbnQgdG8gY2FsbCwgc28gdGhlcmUncyBubyBuZWVkXG4gIC8vIHRvIGNyZWF0ZSBhIG5ldyBmdW5jdGlvbiBvYmplY3QuIFdlIGNhbiBldmVuIGdldCBhd2F5IHdpdGggYXNzdW1pbmdcbiAgLy8gdGhlIG1ldGhvZCB0YWtlcyBleGFjdGx5IG9uZSBhcmd1bWVudCwgc2luY2UgdGhhdCBoYXBwZW5zIHRvIGJlIHRydWVcbiAgLy8gaW4gZXZlcnkgY2FzZSwgc28gd2UgZG9uJ3QgaGF2ZSB0byB0b3VjaCB0aGUgYXJndW1lbnRzIG9iamVjdC4gVGhlXG4gIC8vIG9ubHkgYWRkaXRpb25hbCBhbGxvY2F0aW9uIHJlcXVpcmVkIGlzIHRoZSBjb21wbGV0aW9uIHJlY29yZCwgd2hpY2hcbiAgLy8gaGFzIGEgc3RhYmxlIHNoYXBlIGFuZCBzbyBob3BlZnVsbHkgc2hvdWxkIGJlIGNoZWFwIHRvIGFsbG9jYXRlLlxuICBmdW5jdGlvbiB0cnlDYXRjaChmbiwgb2JqLCBhcmcpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHsgdHlwZTogXCJub3JtYWxcIiwgYXJnOiBmbi5jYWxsKG9iaiwgYXJnKSB9O1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIHsgdHlwZTogXCJ0aHJvd1wiLCBhcmc6IGVyciB9O1xuICAgIH1cbiAgfVxuXG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0ID0gXCJzdXNwZW5kZWRTdGFydFwiO1xuICB2YXIgR2VuU3RhdGVTdXNwZW5kZWRZaWVsZCA9IFwic3VzcGVuZGVkWWllbGRcIjtcbiAgdmFyIEdlblN0YXRlRXhlY3V0aW5nID0gXCJleGVjdXRpbmdcIjtcbiAgdmFyIEdlblN0YXRlQ29tcGxldGVkID0gXCJjb21wbGV0ZWRcIjtcblxuICAvLyBSZXR1cm5pbmcgdGhpcyBvYmplY3QgZnJvbSB0aGUgaW5uZXJGbiBoYXMgdGhlIHNhbWUgZWZmZWN0IGFzXG4gIC8vIGJyZWFraW5nIG91dCBvZiB0aGUgZGlzcGF0Y2ggc3dpdGNoIHN0YXRlbWVudC5cbiAgdmFyIENvbnRpbnVlU2VudGluZWwgPSB7fTtcblxuICAvLyBEdW1teSBjb25zdHJ1Y3RvciBmdW5jdGlvbnMgdGhhdCB3ZSB1c2UgYXMgdGhlIC5jb25zdHJ1Y3RvciBhbmRcbiAgLy8gLmNvbnN0cnVjdG9yLnByb3RvdHlwZSBwcm9wZXJ0aWVzIGZvciBmdW5jdGlvbnMgdGhhdCByZXR1cm4gR2VuZXJhdG9yXG4gIC8vIG9iamVjdHMuIEZvciBmdWxsIHNwZWMgY29tcGxpYW5jZSwgeW91IG1heSB3aXNoIHRvIGNvbmZpZ3VyZSB5b3VyXG4gIC8vIG1pbmlmaWVyIG5vdCB0byBtYW5nbGUgdGhlIG5hbWVzIG9mIHRoZXNlIHR3byBmdW5jdGlvbnMuXG4gIGZ1bmN0aW9uIEdlbmVyYXRvcigpIHt9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUoKSB7fVxuXG4gIHZhciBHcCA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLnByb3RvdHlwZSA9IEdlbmVyYXRvci5wcm90b3R5cGU7XG4gIEdlbmVyYXRvckZ1bmN0aW9uLnByb3RvdHlwZSA9IEdwLmNvbnN0cnVjdG9yID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGU7XG4gIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLmNvbnN0cnVjdG9yID0gR2VuZXJhdG9yRnVuY3Rpb247XG4gIEdlbmVyYXRvckZ1bmN0aW9uLmRpc3BsYXlOYW1lID0gXCJHZW5lcmF0b3JGdW5jdGlvblwiO1xuXG4gIC8vIEhlbHBlciBmb3IgZGVmaW5pbmcgdGhlIC5uZXh0LCAudGhyb3csIGFuZCAucmV0dXJuIG1ldGhvZHMgb2YgdGhlXG4gIC8vIEl0ZXJhdG9yIGludGVyZmFjZSBpbiB0ZXJtcyBvZiBhIHNpbmdsZSAuX2ludm9rZSBtZXRob2QuXG4gIGZ1bmN0aW9uIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhwcm90b3R5cGUpIHtcbiAgICBbXCJuZXh0XCIsIFwidGhyb3dcIiwgXCJyZXR1cm5cIl0uZm9yRWFjaChmdW5jdGlvbihtZXRob2QpIHtcbiAgICAgIHByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24oYXJnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbnZva2UobWV0aG9kLCBhcmcpO1xuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuXG4gIHJ1bnRpbWUuaXNHZW5lcmF0b3JGdW5jdGlvbiA9IGZ1bmN0aW9uKGdlbkZ1bikge1xuICAgIHZhciBjdG9yID0gdHlwZW9mIGdlbkZ1biA9PT0gXCJmdW5jdGlvblwiICYmIGdlbkZ1bi5jb25zdHJ1Y3RvcjtcbiAgICByZXR1cm4gY3RvclxuICAgICAgPyBjdG9yID09PSBHZW5lcmF0b3JGdW5jdGlvbiB8fFxuICAgICAgICAvLyBGb3IgdGhlIG5hdGl2ZSBHZW5lcmF0b3JGdW5jdGlvbiBjb25zdHJ1Y3RvciwgdGhlIGJlc3Qgd2UgY2FuXG4gICAgICAgIC8vIGRvIGlzIHRvIGNoZWNrIGl0cyAubmFtZSBwcm9wZXJ0eS5cbiAgICAgICAgKGN0b3IuZGlzcGxheU5hbWUgfHwgY3Rvci5uYW1lKSA9PT0gXCJHZW5lcmF0b3JGdW5jdGlvblwiXG4gICAgICA6IGZhbHNlO1xuICB9O1xuXG4gIHJ1bnRpbWUubWFyayA9IGZ1bmN0aW9uKGdlbkZ1bikge1xuICAgIGlmIChPYmplY3Quc2V0UHJvdG90eXBlT2YpIHtcbiAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZihnZW5GdW4sIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ2VuRnVuLl9fcHJvdG9fXyA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICAgIH1cbiAgICBnZW5GdW4ucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShHcCk7XG4gICAgcmV0dXJuIGdlbkZ1bjtcbiAgfTtcblxuICAvLyBXaXRoaW4gdGhlIGJvZHkgb2YgYW55IGFzeW5jIGZ1bmN0aW9uLCBgYXdhaXQgeGAgaXMgdHJhbnNmb3JtZWQgdG9cbiAgLy8gYHlpZWxkIHJlZ2VuZXJhdG9yUnVudGltZS5hd3JhcCh4KWAsIHNvIHRoYXQgdGhlIHJ1bnRpbWUgY2FuIHRlc3RcbiAgLy8gYHZhbHVlIGluc3RhbmNlb2YgQXdhaXRBcmd1bWVudGAgdG8gZGV0ZXJtaW5lIGlmIHRoZSB5aWVsZGVkIHZhbHVlIGlzXG4gIC8vIG1lYW50IHRvIGJlIGF3YWl0ZWQuIFNvbWUgbWF5IGNvbnNpZGVyIHRoZSBuYW1lIG9mIHRoaXMgbWV0aG9kIHRvb1xuICAvLyBjdXRlc3ksIGJ1dCB0aGV5IGFyZSBjdXJtdWRnZW9ucy5cbiAgcnVudGltZS5hd3JhcCA9IGZ1bmN0aW9uKGFyZykge1xuICAgIHJldHVybiBuZXcgQXdhaXRBcmd1bWVudChhcmcpO1xuICB9O1xuXG4gIGZ1bmN0aW9uIEF3YWl0QXJndW1lbnQoYXJnKSB7XG4gICAgdGhpcy5hcmcgPSBhcmc7XG4gIH1cblxuICBmdW5jdGlvbiBBc3luY0l0ZXJhdG9yKGdlbmVyYXRvcikge1xuICAgIC8vIFRoaXMgaW52b2tlIGZ1bmN0aW9uIGlzIHdyaXR0ZW4gaW4gYSBzdHlsZSB0aGF0IGFzc3VtZXMgc29tZVxuICAgIC8vIGNhbGxpbmcgZnVuY3Rpb24gKG9yIFByb21pc2UpIHdpbGwgaGFuZGxlIGV4Y2VwdGlvbnMuXG4gICAgZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnKSB7XG4gICAgICB2YXIgcmVzdWx0ID0gZ2VuZXJhdG9yW21ldGhvZF0oYXJnKTtcbiAgICAgIHZhciB2YWx1ZSA9IHJlc3VsdC52YWx1ZTtcbiAgICAgIHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIEF3YWl0QXJndW1lbnRcbiAgICAgICAgPyBQcm9taXNlLnJlc29sdmUodmFsdWUuYXJnKS50aGVuKGludm9rZU5leHQsIGludm9rZVRocm93KVxuICAgICAgICA6IFByb21pc2UucmVzb2x2ZSh2YWx1ZSkudGhlbihmdW5jdGlvbih1bndyYXBwZWQpIHtcbiAgICAgICAgICAgIC8vIFdoZW4gYSB5aWVsZGVkIFByb21pc2UgaXMgcmVzb2x2ZWQsIGl0cyBmaW5hbCB2YWx1ZSBiZWNvbWVzXG4gICAgICAgICAgICAvLyB0aGUgLnZhbHVlIG9mIHRoZSBQcm9taXNlPHt2YWx1ZSxkb25lfT4gcmVzdWx0IGZvciB0aGVcbiAgICAgICAgICAgIC8vIGN1cnJlbnQgaXRlcmF0aW9uLiBJZiB0aGUgUHJvbWlzZSBpcyByZWplY3RlZCwgaG93ZXZlciwgdGhlXG4gICAgICAgICAgICAvLyByZXN1bHQgZm9yIHRoaXMgaXRlcmF0aW9uIHdpbGwgYmUgcmVqZWN0ZWQgd2l0aCB0aGUgc2FtZVxuICAgICAgICAgICAgLy8gcmVhc29uLiBOb3RlIHRoYXQgcmVqZWN0aW9ucyBvZiB5aWVsZGVkIFByb21pc2VzIGFyZSBub3RcbiAgICAgICAgICAgIC8vIHRocm93biBiYWNrIGludG8gdGhlIGdlbmVyYXRvciBmdW5jdGlvbiwgYXMgaXMgdGhlIGNhc2VcbiAgICAgICAgICAgIC8vIHdoZW4gYW4gYXdhaXRlZCBQcm9taXNlIGlzIHJlamVjdGVkLiBUaGlzIGRpZmZlcmVuY2UgaW5cbiAgICAgICAgICAgIC8vIGJlaGF2aW9yIGJldHdlZW4geWllbGQgYW5kIGF3YWl0IGlzIGltcG9ydGFudCwgYmVjYXVzZSBpdFxuICAgICAgICAgICAgLy8gYWxsb3dzIHRoZSBjb25zdW1lciB0byBkZWNpZGUgd2hhdCB0byBkbyB3aXRoIHRoZSB5aWVsZGVkXG4gICAgICAgICAgICAvLyByZWplY3Rpb24gKHN3YWxsb3cgaXQgYW5kIGNvbnRpbnVlLCBtYW51YWxseSAudGhyb3cgaXQgYmFja1xuICAgICAgICAgICAgLy8gaW50byB0aGUgZ2VuZXJhdG9yLCBhYmFuZG9uIGl0ZXJhdGlvbiwgd2hhdGV2ZXIpLiBXaXRoXG4gICAgICAgICAgICAvLyBhd2FpdCwgYnkgY29udHJhc3QsIHRoZXJlIGlzIG5vIG9wcG9ydHVuaXR5IHRvIGV4YW1pbmUgdGhlXG4gICAgICAgICAgICAvLyByZWplY3Rpb24gcmVhc29uIG91dHNpZGUgdGhlIGdlbmVyYXRvciBmdW5jdGlvbiwgc28gdGhlXG4gICAgICAgICAgICAvLyBvbmx5IG9wdGlvbiBpcyB0byB0aHJvdyBpdCBmcm9tIHRoZSBhd2FpdCBleHByZXNzaW9uLCBhbmRcbiAgICAgICAgICAgIC8vIGxldCB0aGUgZ2VuZXJhdG9yIGZ1bmN0aW9uIGhhbmRsZSB0aGUgZXhjZXB0aW9uLlxuICAgICAgICAgICAgcmVzdWx0LnZhbHVlID0gdW53cmFwcGVkO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHByb2Nlc3MgPT09IFwib2JqZWN0XCIgJiYgcHJvY2Vzcy5kb21haW4pIHtcbiAgICAgIGludm9rZSA9IHByb2Nlc3MuZG9tYWluLmJpbmQoaW52b2tlKTtcbiAgICB9XG5cbiAgICB2YXIgaW52b2tlTmV4dCA9IGludm9rZS5iaW5kKGdlbmVyYXRvciwgXCJuZXh0XCIpO1xuICAgIHZhciBpbnZva2VUaHJvdyA9IGludm9rZS5iaW5kKGdlbmVyYXRvciwgXCJ0aHJvd1wiKTtcbiAgICB2YXIgaW52b2tlUmV0dXJuID0gaW52b2tlLmJpbmQoZ2VuZXJhdG9yLCBcInJldHVyblwiKTtcbiAgICB2YXIgcHJldmlvdXNQcm9taXNlO1xuXG4gICAgZnVuY3Rpb24gZW5xdWV1ZShtZXRob2QsIGFyZykge1xuICAgICAgZnVuY3Rpb24gY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKSB7XG4gICAgICAgIHJldHVybiBpbnZva2UobWV0aG9kLCBhcmcpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcHJldmlvdXNQcm9taXNlID1cbiAgICAgICAgLy8gSWYgZW5xdWV1ZSBoYXMgYmVlbiBjYWxsZWQgYmVmb3JlLCB0aGVuIHdlIHdhbnQgdG8gd2FpdCB1bnRpbFxuICAgICAgICAvLyBhbGwgcHJldmlvdXMgUHJvbWlzZXMgaGF2ZSBiZWVuIHJlc29sdmVkIGJlZm9yZSBjYWxsaW5nIGludm9rZSxcbiAgICAgICAgLy8gc28gdGhhdCByZXN1bHRzIGFyZSBhbHdheXMgZGVsaXZlcmVkIGluIHRoZSBjb3JyZWN0IG9yZGVyLiBJZlxuICAgICAgICAvLyBlbnF1ZXVlIGhhcyBub3QgYmVlbiBjYWxsZWQgYmVmb3JlLCB0aGVuIGl0IGlzIGltcG9ydGFudCB0b1xuICAgICAgICAvLyBjYWxsIGludm9rZSBpbW1lZGlhdGVseSwgd2l0aG91dCB3YWl0aW5nIG9uIGEgY2FsbGJhY2sgdG8gZmlyZSxcbiAgICAgICAgLy8gc28gdGhhdCB0aGUgYXN5bmMgZ2VuZXJhdG9yIGZ1bmN0aW9uIGhhcyB0aGUgb3Bwb3J0dW5pdHkgdG8gZG9cbiAgICAgICAgLy8gYW55IG5lY2Vzc2FyeSBzZXR1cCBpbiBhIHByZWRpY3RhYmxlIHdheS4gVGhpcyBwcmVkaWN0YWJpbGl0eVxuICAgICAgICAvLyBpcyB3aHkgdGhlIFByb21pc2UgY29uc3RydWN0b3Igc3luY2hyb25vdXNseSBpbnZva2VzIGl0c1xuICAgICAgICAvLyBleGVjdXRvciBjYWxsYmFjaywgYW5kIHdoeSBhc3luYyBmdW5jdGlvbnMgc3luY2hyb25vdXNseVxuICAgICAgICAvLyBleGVjdXRlIGNvZGUgYmVmb3JlIHRoZSBmaXJzdCBhd2FpdC4gU2luY2Ugd2UgaW1wbGVtZW50IHNpbXBsZVxuICAgICAgICAvLyBhc3luYyBmdW5jdGlvbnMgaW4gdGVybXMgb2YgYXN5bmMgZ2VuZXJhdG9ycywgaXQgaXMgZXNwZWNpYWxseVxuICAgICAgICAvLyBpbXBvcnRhbnQgdG8gZ2V0IHRoaXMgcmlnaHQsIGV2ZW4gdGhvdWdoIGl0IHJlcXVpcmVzIGNhcmUuXG4gICAgICAgIHByZXZpb3VzUHJvbWlzZSA/IHByZXZpb3VzUHJvbWlzZS50aGVuKFxuICAgICAgICAgIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnLFxuICAgICAgICAgIC8vIEF2b2lkIHByb3BhZ2F0aW5nIGZhaWx1cmVzIHRvIFByb21pc2VzIHJldHVybmVkIGJ5IGxhdGVyXG4gICAgICAgICAgLy8gaW52b2NhdGlvbnMgb2YgdGhlIGl0ZXJhdG9yLlxuICAgICAgICAgIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnXG4gICAgICAgICkgOiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgICAgIHJlc29sdmUoY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIERlZmluZSB0aGUgdW5pZmllZCBoZWxwZXIgbWV0aG9kIHRoYXQgaXMgdXNlZCB0byBpbXBsZW1lbnQgLm5leHQsXG4gICAgLy8gLnRocm93LCBhbmQgLnJldHVybiAoc2VlIGRlZmluZUl0ZXJhdG9yTWV0aG9kcykuXG4gICAgdGhpcy5faW52b2tlID0gZW5xdWV1ZTtcbiAgfVxuXG4gIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhBc3luY0l0ZXJhdG9yLnByb3RvdHlwZSk7XG5cbiAgLy8gTm90ZSB0aGF0IHNpbXBsZSBhc3luYyBmdW5jdGlvbnMgYXJlIGltcGxlbWVudGVkIG9uIHRvcCBvZlxuICAvLyBBc3luY0l0ZXJhdG9yIG9iamVjdHM7IHRoZXkganVzdCByZXR1cm4gYSBQcm9taXNlIGZvciB0aGUgdmFsdWUgb2ZcbiAgLy8gdGhlIGZpbmFsIHJlc3VsdCBwcm9kdWNlZCBieSB0aGUgaXRlcmF0b3IuXG4gIHJ1bnRpbWUuYXN5bmMgPSBmdW5jdGlvbihpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCkge1xuICAgIHZhciBpdGVyID0gbmV3IEFzeW5jSXRlcmF0b3IoXG4gICAgICB3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KVxuICAgICk7XG5cbiAgICByZXR1cm4gcnVudGltZS5pc0dlbmVyYXRvckZ1bmN0aW9uKG91dGVyRm4pXG4gICAgICA/IGl0ZXIgLy8gSWYgb3V0ZXJGbiBpcyBhIGdlbmVyYXRvciwgcmV0dXJuIHRoZSBmdWxsIGl0ZXJhdG9yLlxuICAgICAgOiBpdGVyLm5leHQoKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgIHJldHVybiByZXN1bHQuZG9uZSA/IHJlc3VsdC52YWx1ZSA6IGl0ZXIubmV4dCgpO1xuICAgICAgICB9KTtcbiAgfTtcblxuICBmdW5jdGlvbiBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpIHtcbiAgICB2YXIgc3RhdGUgPSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0O1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZykge1xuICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZUV4ZWN1dGluZykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBydW5uaW5nXCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlQ29tcGxldGVkKSB7XG4gICAgICAgIGlmIChtZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHRocm93IGFyZztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEJlIGZvcmdpdmluZywgcGVyIDI1LjMuMy4zLjMgb2YgdGhlIHNwZWM6XG4gICAgICAgIC8vIGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1nZW5lcmF0b3JyZXN1bWVcbiAgICAgICAgcmV0dXJuIGRvbmVSZXN1bHQoKTtcbiAgICAgIH1cblxuICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgdmFyIGRlbGVnYXRlID0gY29udGV4dC5kZWxlZ2F0ZTtcbiAgICAgICAgaWYgKGRlbGVnYXRlKSB7XG4gICAgICAgICAgaWYgKG1ldGhvZCA9PT0gXCJyZXR1cm5cIiB8fFxuICAgICAgICAgICAgICAobWV0aG9kID09PSBcInRocm93XCIgJiYgZGVsZWdhdGUuaXRlcmF0b3JbbWV0aG9kXSA9PT0gdW5kZWZpbmVkKSkge1xuICAgICAgICAgICAgLy8gQSByZXR1cm4gb3IgdGhyb3cgKHdoZW4gdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBubyB0aHJvd1xuICAgICAgICAgICAgLy8gbWV0aG9kKSBhbHdheXMgdGVybWluYXRlcyB0aGUgeWllbGQqIGxvb3AuXG4gICAgICAgICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgICAgICAgLy8gSWYgdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBhIHJldHVybiBtZXRob2QsIGdpdmUgaXQgYVxuICAgICAgICAgICAgLy8gY2hhbmNlIHRvIGNsZWFuIHVwLlxuICAgICAgICAgICAgdmFyIHJldHVybk1ldGhvZCA9IGRlbGVnYXRlLml0ZXJhdG9yW1wicmV0dXJuXCJdO1xuICAgICAgICAgICAgaWYgKHJldHVybk1ldGhvZCkge1xuICAgICAgICAgICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2gocmV0dXJuTWV0aG9kLCBkZWxlZ2F0ZS5pdGVyYXRvciwgYXJnKTtcbiAgICAgICAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgICAgICAvLyBJZiB0aGUgcmV0dXJuIG1ldGhvZCB0aHJldyBhbiBleGNlcHRpb24sIGxldCB0aGF0XG4gICAgICAgICAgICAgICAgLy8gZXhjZXB0aW9uIHByZXZhaWwgb3ZlciB0aGUgb3JpZ2luYWwgcmV0dXJuIG9yIHRocm93LlxuICAgICAgICAgICAgICAgIG1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgICAgICAgICAgICBhcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChtZXRob2QgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgICAgICAgLy8gQ29udGludWUgd2l0aCB0aGUgb3V0ZXIgcmV0dXJuLCBub3cgdGhhdCB0aGUgZGVsZWdhdGVcbiAgICAgICAgICAgICAgLy8gaXRlcmF0b3IgaGFzIGJlZW4gdGVybWluYXRlZC5cbiAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKFxuICAgICAgICAgICAgZGVsZWdhdGUuaXRlcmF0b3JbbWV0aG9kXSxcbiAgICAgICAgICAgIGRlbGVnYXRlLml0ZXJhdG9yLFxuICAgICAgICAgICAgYXJnXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgICAgICAgLy8gTGlrZSByZXR1cm5pbmcgZ2VuZXJhdG9yLnRocm93KHVuY2F1Z2h0KSwgYnV0IHdpdGhvdXQgdGhlXG4gICAgICAgICAgICAvLyBvdmVyaGVhZCBvZiBhbiBleHRyYSBmdW5jdGlvbiBjYWxsLlxuICAgICAgICAgICAgbWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICAgICAgYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIERlbGVnYXRlIGdlbmVyYXRvciByYW4gYW5kIGhhbmRsZWQgaXRzIG93biBleGNlcHRpb25zIHNvXG4gICAgICAgICAgLy8gcmVnYXJkbGVzcyBvZiB3aGF0IHRoZSBtZXRob2Qgd2FzLCB3ZSBjb250aW51ZSBhcyBpZiBpdCBpc1xuICAgICAgICAgIC8vIFwibmV4dFwiIHdpdGggYW4gdW5kZWZpbmVkIGFyZy5cbiAgICAgICAgICBtZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgICBhcmcgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgICB2YXIgaW5mbyA9IHJlY29yZC5hcmc7XG4gICAgICAgICAgaWYgKGluZm8uZG9uZSkge1xuICAgICAgICAgICAgY29udGV4dFtkZWxlZ2F0ZS5yZXN1bHROYW1lXSA9IGluZm8udmFsdWU7XG4gICAgICAgICAgICBjb250ZXh0Lm5leHQgPSBkZWxlZ2F0ZS5uZXh0TG9jO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlU3VzcGVuZGVkWWllbGQ7XG4gICAgICAgICAgICByZXR1cm4gaW5mbztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgICAgY29udGV4dC5fc2VudCA9IGFyZztcblxuICAgICAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVTdXNwZW5kZWRZaWVsZCkge1xuICAgICAgICAgICAgY29udGV4dC5zZW50ID0gYXJnO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb250ZXh0LnNlbnQgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKG1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0KSB7XG4gICAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgICAgdGhyb3cgYXJnO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGFyZykpIHtcbiAgICAgICAgICAgIC8vIElmIHRoZSBkaXNwYXRjaGVkIGV4Y2VwdGlvbiB3YXMgY2F1Z2h0IGJ5IGEgY2F0Y2ggYmxvY2ssXG4gICAgICAgICAgICAvLyB0aGVuIGxldCB0aGF0IGNhdGNoIGJsb2NrIGhhbmRsZSB0aGUgZXhjZXB0aW9uIG5vcm1hbGx5LlxuICAgICAgICAgICAgbWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgICAgICBhcmcgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSBpZiAobWV0aG9kID09PSBcInJldHVyblwiKSB7XG4gICAgICAgICAgY29udGV4dC5hYnJ1cHQoXCJyZXR1cm5cIiwgYXJnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXRlID0gR2VuU3RhdGVFeGVjdXRpbmc7XG5cbiAgICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpO1xuICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIpIHtcbiAgICAgICAgICAvLyBJZiBhbiBleGNlcHRpb24gaXMgdGhyb3duIGZyb20gaW5uZXJGbiwgd2UgbGVhdmUgc3RhdGUgPT09XG4gICAgICAgICAgLy8gR2VuU3RhdGVFeGVjdXRpbmcgYW5kIGxvb3AgYmFjayBmb3IgYW5vdGhlciBpbnZvY2F0aW9uLlxuICAgICAgICAgIHN0YXRlID0gY29udGV4dC5kb25lXG4gICAgICAgICAgICA/IEdlblN0YXRlQ29tcGxldGVkXG4gICAgICAgICAgICA6IEdlblN0YXRlU3VzcGVuZGVkWWllbGQ7XG5cbiAgICAgICAgICB2YXIgaW5mbyA9IHtcbiAgICAgICAgICAgIHZhbHVlOiByZWNvcmQuYXJnLFxuICAgICAgICAgICAgZG9uZTogY29udGV4dC5kb25lXG4gICAgICAgICAgfTtcblxuICAgICAgICAgIGlmIChyZWNvcmQuYXJnID09PSBDb250aW51ZVNlbnRpbmVsKSB7XG4gICAgICAgICAgICBpZiAoY29udGV4dC5kZWxlZ2F0ZSAmJiBtZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgICAgICAgIC8vIERlbGliZXJhdGVseSBmb3JnZXQgdGhlIGxhc3Qgc2VudCB2YWx1ZSBzbyB0aGF0IHdlIGRvbid0XG4gICAgICAgICAgICAgIC8vIGFjY2lkZW50YWxseSBwYXNzIGl0IG9uIHRvIHRoZSBkZWxlZ2F0ZS5cbiAgICAgICAgICAgICAgYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gaW5mbztcbiAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUNvbXBsZXRlZDtcbiAgICAgICAgICAvLyBEaXNwYXRjaCB0aGUgZXhjZXB0aW9uIGJ5IGxvb3BpbmcgYmFjayBhcm91bmQgdG8gdGhlXG4gICAgICAgICAgLy8gY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihhcmcpIGNhbGwgYWJvdmUuXG4gICAgICAgICAgbWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICAgIGFyZyA9IHJlY29yZC5hcmc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLy8gRGVmaW5lIEdlbmVyYXRvci5wcm90b3R5cGUue25leHQsdGhyb3cscmV0dXJufSBpbiB0ZXJtcyBvZiB0aGVcbiAgLy8gdW5pZmllZCAuX2ludm9rZSBoZWxwZXIgbWV0aG9kLlxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoR3ApO1xuXG4gIEdwW2l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEdwLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIFwiW29iamVjdCBHZW5lcmF0b3JdXCI7XG4gIH07XG5cbiAgZnVuY3Rpb24gcHVzaFRyeUVudHJ5KGxvY3MpIHtcbiAgICB2YXIgZW50cnkgPSB7IHRyeUxvYzogbG9jc1swXSB9O1xuXG4gICAgaWYgKDEgaW4gbG9jcykge1xuICAgICAgZW50cnkuY2F0Y2hMb2MgPSBsb2NzWzFdO1xuICAgIH1cblxuICAgIGlmICgyIGluIGxvY3MpIHtcbiAgICAgIGVudHJ5LmZpbmFsbHlMb2MgPSBsb2NzWzJdO1xuICAgICAgZW50cnkuYWZ0ZXJMb2MgPSBsb2NzWzNdO1xuICAgIH1cblxuICAgIHRoaXMudHJ5RW50cmllcy5wdXNoKGVudHJ5KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc2V0VHJ5RW50cnkoZW50cnkpIHtcbiAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbiB8fCB7fTtcbiAgICByZWNvcmQudHlwZSA9IFwibm9ybWFsXCI7XG4gICAgZGVsZXRlIHJlY29yZC5hcmc7XG4gICAgZW50cnkuY29tcGxldGlvbiA9IHJlY29yZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIENvbnRleHQodHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBUaGUgcm9vdCBlbnRyeSBvYmplY3QgKGVmZmVjdGl2ZWx5IGEgdHJ5IHN0YXRlbWVudCB3aXRob3V0IGEgY2F0Y2hcbiAgICAvLyBvciBhIGZpbmFsbHkgYmxvY2spIGdpdmVzIHVzIGEgcGxhY2UgdG8gc3RvcmUgdmFsdWVzIHRocm93biBmcm9tXG4gICAgLy8gbG9jYXRpb25zIHdoZXJlIHRoZXJlIGlzIG5vIGVuY2xvc2luZyB0cnkgc3RhdGVtZW50LlxuICAgIHRoaXMudHJ5RW50cmllcyA9IFt7IHRyeUxvYzogXCJyb290XCIgfV07XG4gICAgdHJ5TG9jc0xpc3QuZm9yRWFjaChwdXNoVHJ5RW50cnksIHRoaXMpO1xuICAgIHRoaXMucmVzZXQodHJ1ZSk7XG4gIH1cblxuICBydW50aW1lLmtleXMgPSBmdW5jdGlvbihvYmplY3QpIHtcbiAgICB2YXIga2V5cyA9IFtdO1xuICAgIGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcbiAgICAgIGtleXMucHVzaChrZXkpO1xuICAgIH1cbiAgICBrZXlzLnJldmVyc2UoKTtcblxuICAgIC8vIFJhdGhlciB0aGFuIHJldHVybmluZyBhbiBvYmplY3Qgd2l0aCBhIG5leHQgbWV0aG9kLCB3ZSBrZWVwXG4gICAgLy8gdGhpbmdzIHNpbXBsZSBhbmQgcmV0dXJuIHRoZSBuZXh0IGZ1bmN0aW9uIGl0c2VsZi5cbiAgICByZXR1cm4gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgIHdoaWxlIChrZXlzLmxlbmd0aCkge1xuICAgICAgICB2YXIga2V5ID0ga2V5cy5wb3AoKTtcbiAgICAgICAgaWYgKGtleSBpbiBvYmplY3QpIHtcbiAgICAgICAgICBuZXh0LnZhbHVlID0ga2V5O1xuICAgICAgICAgIG5leHQuZG9uZSA9IGZhbHNlO1xuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRvIGF2b2lkIGNyZWF0aW5nIGFuIGFkZGl0aW9uYWwgb2JqZWN0LCB3ZSBqdXN0IGhhbmcgdGhlIC52YWx1ZVxuICAgICAgLy8gYW5kIC5kb25lIHByb3BlcnRpZXMgb2ZmIHRoZSBuZXh0IGZ1bmN0aW9uIG9iamVjdCBpdHNlbGYuIFRoaXNcbiAgICAgIC8vIGFsc28gZW5zdXJlcyB0aGF0IHRoZSBtaW5pZmllciB3aWxsIG5vdCBhbm9ueW1pemUgdGhlIGZ1bmN0aW9uLlxuICAgICAgbmV4dC5kb25lID0gdHJ1ZTtcbiAgICAgIHJldHVybiBuZXh0O1xuICAgIH07XG4gIH07XG5cbiAgZnVuY3Rpb24gdmFsdWVzKGl0ZXJhYmxlKSB7XG4gICAgaWYgKGl0ZXJhYmxlKSB7XG4gICAgICB2YXIgaXRlcmF0b3JNZXRob2QgPSBpdGVyYWJsZVtpdGVyYXRvclN5bWJvbF07XG4gICAgICBpZiAoaXRlcmF0b3JNZXRob2QpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhdG9yTWV0aG9kLmNhbGwoaXRlcmFibGUpO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGl0ZXJhYmxlLm5leHQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICByZXR1cm4gaXRlcmFibGU7XG4gICAgICB9XG5cbiAgICAgIGlmICghaXNOYU4oaXRlcmFibGUubGVuZ3RoKSkge1xuICAgICAgICB2YXIgaSA9IC0xLCBuZXh0ID0gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgICAgICB3aGlsZSAoKytpIDwgaXRlcmFibGUubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAoaGFzT3duLmNhbGwoaXRlcmFibGUsIGkpKSB7XG4gICAgICAgICAgICAgIG5leHQudmFsdWUgPSBpdGVyYWJsZVtpXTtcbiAgICAgICAgICAgICAgbmV4dC5kb25lID0gZmFsc2U7XG4gICAgICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIG5leHQudmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgbmV4dC5kb25lID0gdHJ1ZTtcblxuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBuZXh0Lm5leHQgPSBuZXh0O1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJldHVybiBhbiBpdGVyYXRvciB3aXRoIG5vIHZhbHVlcy5cbiAgICByZXR1cm4geyBuZXh0OiBkb25lUmVzdWx0IH07XG4gIH1cbiAgcnVudGltZS52YWx1ZXMgPSB2YWx1ZXM7XG5cbiAgZnVuY3Rpb24gZG9uZVJlc3VsdCgpIHtcbiAgICByZXR1cm4geyB2YWx1ZTogdW5kZWZpbmVkLCBkb25lOiB0cnVlIH07XG4gIH1cblxuICBDb250ZXh0LnByb3RvdHlwZSA9IHtcbiAgICBjb25zdHJ1Y3RvcjogQ29udGV4dCxcblxuICAgIHJlc2V0OiBmdW5jdGlvbihza2lwVGVtcFJlc2V0KSB7XG4gICAgICB0aGlzLnByZXYgPSAwO1xuICAgICAgdGhpcy5uZXh0ID0gMDtcbiAgICAgIHRoaXMuc2VudCA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuZG9uZSA9IGZhbHNlO1xuICAgICAgdGhpcy5kZWxlZ2F0ZSA9IG51bGw7XG5cbiAgICAgIHRoaXMudHJ5RW50cmllcy5mb3JFYWNoKHJlc2V0VHJ5RW50cnkpO1xuXG4gICAgICBpZiAoIXNraXBUZW1wUmVzZXQpIHtcbiAgICAgICAgZm9yICh2YXIgbmFtZSBpbiB0aGlzKSB7XG4gICAgICAgICAgLy8gTm90IHN1cmUgYWJvdXQgdGhlIG9wdGltYWwgb3JkZXIgb2YgdGhlc2UgY29uZGl0aW9uczpcbiAgICAgICAgICBpZiAobmFtZS5jaGFyQXQoMCkgPT09IFwidFwiICYmXG4gICAgICAgICAgICAgIGhhc093bi5jYWxsKHRoaXMsIG5hbWUpICYmXG4gICAgICAgICAgICAgICFpc05hTigrbmFtZS5zbGljZSgxKSkpIHtcbiAgICAgICAgICAgIHRoaXNbbmFtZV0gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIHN0b3A6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5kb25lID0gdHJ1ZTtcblxuICAgICAgdmFyIHJvb3RFbnRyeSA9IHRoaXMudHJ5RW50cmllc1swXTtcbiAgICAgIHZhciByb290UmVjb3JkID0gcm9vdEVudHJ5LmNvbXBsZXRpb247XG4gICAgICBpZiAocm9vdFJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgdGhyb3cgcm9vdFJlY29yZC5hcmc7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLnJ2YWw7XG4gICAgfSxcblxuICAgIGRpc3BhdGNoRXhjZXB0aW9uOiBmdW5jdGlvbihleGNlcHRpb24pIHtcbiAgICAgIGlmICh0aGlzLmRvbmUpIHtcbiAgICAgICAgdGhyb3cgZXhjZXB0aW9uO1xuICAgICAgfVxuXG4gICAgICB2YXIgY29udGV4dCA9IHRoaXM7XG4gICAgICBmdW5jdGlvbiBoYW5kbGUobG9jLCBjYXVnaHQpIHtcbiAgICAgICAgcmVjb3JkLnR5cGUgPSBcInRocm93XCI7XG4gICAgICAgIHJlY29yZC5hcmcgPSBleGNlcHRpb247XG4gICAgICAgIGNvbnRleHQubmV4dCA9IGxvYztcbiAgICAgICAgcmV0dXJuICEhY2F1Z2h0O1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb247XG5cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA9PT0gXCJyb290XCIpIHtcbiAgICAgICAgICAvLyBFeGNlcHRpb24gdGhyb3duIG91dHNpZGUgb2YgYW55IHRyeSBibG9jayB0aGF0IGNvdWxkIGhhbmRsZVxuICAgICAgICAgIC8vIGl0LCBzbyBzZXQgdGhlIGNvbXBsZXRpb24gdmFsdWUgb2YgdGhlIGVudGlyZSBmdW5jdGlvbiB0b1xuICAgICAgICAgIC8vIHRocm93IHRoZSBleGNlcHRpb24uXG4gICAgICAgICAgcmV0dXJuIGhhbmRsZShcImVuZFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2KSB7XG4gICAgICAgICAgdmFyIGhhc0NhdGNoID0gaGFzT3duLmNhbGwoZW50cnksIFwiY2F0Y2hMb2NcIik7XG4gICAgICAgICAgdmFyIGhhc0ZpbmFsbHkgPSBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpO1xuXG4gICAgICAgICAgaWYgKGhhc0NhdGNoICYmIGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIGlmIChoYXNDYXRjaCkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsIHRydWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIGlmIChoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInRyeSBzdGF0ZW1lbnQgd2l0aG91dCBjYXRjaCBvciBmaW5hbGx5XCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBhYnJ1cHQ6IGZ1bmN0aW9uKHR5cGUsIGFyZykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2ICYmXG4gICAgICAgICAgICBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpICYmXG4gICAgICAgICAgICB0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgdmFyIGZpbmFsbHlFbnRyeSA9IGVudHJ5O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChmaW5hbGx5RW50cnkgJiZcbiAgICAgICAgICAodHlwZSA9PT0gXCJicmVha1wiIHx8XG4gICAgICAgICAgIHR5cGUgPT09IFwiY29udGludWVcIikgJiZcbiAgICAgICAgICBmaW5hbGx5RW50cnkudHJ5TG9jIDw9IGFyZyAmJlxuICAgICAgICAgIGFyZyA8PSBmaW5hbGx5RW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAvLyBJZ25vcmUgdGhlIGZpbmFsbHkgZW50cnkgaWYgY29udHJvbCBpcyBub3QganVtcGluZyB0byBhXG4gICAgICAgIC8vIGxvY2F0aW9uIG91dHNpZGUgdGhlIHRyeS9jYXRjaCBibG9jay5cbiAgICAgICAgZmluYWxseUVudHJ5ID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgdmFyIHJlY29yZCA9IGZpbmFsbHlFbnRyeSA/IGZpbmFsbHlFbnRyeS5jb21wbGV0aW9uIDoge307XG4gICAgICByZWNvcmQudHlwZSA9IHR5cGU7XG4gICAgICByZWNvcmQuYXJnID0gYXJnO1xuXG4gICAgICBpZiAoZmluYWxseUVudHJ5KSB7XG4gICAgICAgIHRoaXMubmV4dCA9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jb21wbGV0ZShyZWNvcmQpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9LFxuXG4gICAgY29tcGxldGU6IGZ1bmN0aW9uKHJlY29yZCwgYWZ0ZXJMb2MpIHtcbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJlY29yZC5hcmc7XG4gICAgICB9XG5cbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJicmVha1wiIHx8XG4gICAgICAgICAgcmVjb3JkLnR5cGUgPT09IFwiY29udGludWVcIikge1xuICAgICAgICB0aGlzLm5leHQgPSByZWNvcmQuYXJnO1xuICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICB0aGlzLnJ2YWwgPSByZWNvcmQuYXJnO1xuICAgICAgICB0aGlzLm5leHQgPSBcImVuZFwiO1xuICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIiAmJiBhZnRlckxvYykge1xuICAgICAgICB0aGlzLm5leHQgPSBhZnRlckxvYztcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgZmluaXNoOiBmdW5jdGlvbihmaW5hbGx5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LmZpbmFsbHlMb2MgPT09IGZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB0aGlzLmNvbXBsZXRlKGVudHJ5LmNvbXBsZXRpb24sIGVudHJ5LmFmdGVyTG9jKTtcbiAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBcImNhdGNoXCI6IGZ1bmN0aW9uKHRyeUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IHRyeUxvYykge1xuICAgICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuICAgICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICB2YXIgdGhyb3duID0gcmVjb3JkLmFyZztcbiAgICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdGhyb3duO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRoZSBjb250ZXh0LmNhdGNoIG1ldGhvZCBtdXN0IG9ubHkgYmUgY2FsbGVkIHdpdGggYSBsb2NhdGlvblxuICAgICAgLy8gYXJndW1lbnQgdGhhdCBjb3JyZXNwb25kcyB0byBhIGtub3duIGNhdGNoIGJsb2NrLlxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaWxsZWdhbCBjYXRjaCBhdHRlbXB0XCIpO1xuICAgIH0sXG5cbiAgICBkZWxlZ2F0ZVlpZWxkOiBmdW5jdGlvbihpdGVyYWJsZSwgcmVzdWx0TmFtZSwgbmV4dExvYykge1xuICAgICAgdGhpcy5kZWxlZ2F0ZSA9IHtcbiAgICAgICAgaXRlcmF0b3I6IHZhbHVlcyhpdGVyYWJsZSksXG4gICAgICAgIHJlc3VsdE5hbWU6IHJlc3VsdE5hbWUsXG4gICAgICAgIG5leHRMb2M6IG5leHRMb2NcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cbiAgfTtcbn0pKFxuICAvLyBBbW9uZyB0aGUgdmFyaW91cyB0cmlja3MgZm9yIG9idGFpbmluZyBhIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsXG4gIC8vIG9iamVjdCwgdGhpcyBzZWVtcyB0byBiZSB0aGUgbW9zdCByZWxpYWJsZSB0ZWNobmlxdWUgdGhhdCBkb2VzIG5vdFxuICAvLyB1c2UgaW5kaXJlY3QgZXZhbCAod2hpY2ggdmlvbGF0ZXMgQ29udGVudCBTZWN1cml0eSBQb2xpY3kpLlxuICB0eXBlb2YgZ2xvYmFsID09PSBcIm9iamVjdFwiID8gZ2xvYmFsIDpcbiAgdHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIiA/IHdpbmRvdyA6XG4gIHR5cGVvZiBzZWxmID09PSBcIm9iamVjdFwiID8gc2VsZiA6IHRoaXNcbik7XG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG52YXIgX3V0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG4vKipcbiAqIENvbXBvbmVudCB3aXRob3V0IGNvZGUgc3BsaXR0aW5nIHN1cHBvcnRcbiAqL1xuXG52YXIgQ29tcG9uZW50ID0gZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENvbXBvbmVudChlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBDb21wb25lbnQpO1xuXG4gICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuZWxlbWVudFsnX19naWFfY29tcG9uZW50X18nXSA9IHRoaXM7XG4gICAgICAgIHRoaXMuX3JlZiA9IHt9O1xuICAgICAgICB0aGlzLl9vcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICAgICAgdGhpcy5fc3RhdGUgPSB7fTtcbiAgICB9XG5cbiAgICBfY3JlYXRlQ2xhc3MoQ29tcG9uZW50LCBbe1xuICAgICAgICBrZXk6ICdfbG9hZCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBfbG9hZCgpIHtcbiAgICAgICAgICAgIHRoaXMubW91bnQoKTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnbW91bnQnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gbW91bnQoKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ0NvbXBvbmVudCAnICsgdGhpcy5fbmFtZSArICcgZG9lcyBub3QgaGF2ZSBcIm1vdW50XCIgbWV0aG9kLicpO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICd1bm1vdW50JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHVubW91bnQoKSB7XG4gICAgICAgICAgICAvLyB0aGlzIGlzIGhlcmUgb25seSB0byBiZSByZXdyaXR0ZW5cbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnZ2V0UmVmJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGdldFJlZihyZWYpIHtcbiAgICAgICAgICAgIHZhciBwcmVmaXhlZCA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogZmFsc2U7XG5cbiAgICAgICAgICAgIHJldHVybiAnW2ctcmVmPVwiJyArIChwcmVmaXhlZCA/IHRoaXMuX25hbWUgKyAnOicgOiAnJykgKyByZWYgKyAnXCJdJztcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnc2V0U3RhdGUnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gc2V0U3RhdGUoY2hhbmdlcykge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgICAgICAgdmFyIHN0YXRlQ2hhbmdlcyA9IHt9O1xuXG4gICAgICAgICAgICBPYmplY3Qua2V5cyhjaGFuZ2VzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShjaGFuZ2VzW2tleV0pKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChfdGhpcy5fc3RhdGVba2V5XSAhPSBudWxsICYmIEFycmF5LmlzQXJyYXkoX3RoaXMuX3N0YXRlW2tleV0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoX3RoaXMuX3N0YXRlW2tleV0ubGVuZ3RoID09PSBjaGFuZ2VzW2tleV0ubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlc1trZXldLnNvbWUoZnVuY3Rpb24gKGl0ZW0sIGluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfdGhpcy5fc3RhdGVba2V5XVtpbmRleF0gIT09IGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlQ2hhbmdlc1trZXldID0gY2hhbmdlc1trZXldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuX3N0YXRlW2tleV0gPSBzdGF0ZUNoYW5nZXNba2V5XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGVDaGFuZ2VzW2tleV0gPSBjaGFuZ2VzW2tleV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuX3N0YXRlW2tleV0gPSBzdGF0ZUNoYW5nZXNba2V5XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlQ2hhbmdlc1trZXldID0gY2hhbmdlc1trZXldO1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuX3N0YXRlW2tleV0gPSBzdGF0ZUNoYW5nZXNba2V5XTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoX3R5cGVvZihjaGFuZ2VzW2tleV0pID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoX3RoaXMuX3N0YXRlW2tleV0gIT0gbnVsbCAmJiBfdHlwZW9mKF90aGlzLl9zdGF0ZVtrZXldKSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlQ2hhbmdlc1trZXldID0ge307XG4gICAgICAgICAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyhjaGFuZ2VzW2tleV0pLmZvckVhY2goZnVuY3Rpb24gKHN1YmtleSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfdGhpcy5fc3RhdGVba2V5XVtzdWJrZXldICE9PSBjaGFuZ2VzW2tleV1bc3Via2V5XSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZUNoYW5nZXNba2V5XVtzdWJrZXldID0gY2hhbmdlc1trZXldW3N1YmtleV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZUNoYW5nZXNba2V5XSA9IGNoYW5nZXNba2V5XTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLl9zdGF0ZVtrZXldID0gX2V4dGVuZHMoe30sIF90aGlzLl9zdGF0ZVtrZXldLCBzdGF0ZUNoYW5nZXNba2V5XSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKF90aGlzLl9zdGF0ZVtrZXldICE9PSBjaGFuZ2VzW2tleV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlQ2hhbmdlc1trZXldID0gY2hhbmdlc1trZXldO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fc3RhdGVba2V5XSA9IGNoYW5nZXNba2V5XTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBPYmplY3Qua2V5cyhzdGF0ZUNoYW5nZXMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGNoYW5nZXNba2V5XSkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXRlQ2hhbmdlc1trZXldLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHN0YXRlQ2hhbmdlc1trZXldO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChfdHlwZW9mKGNoYW5nZXNba2V5XSkgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChPYmplY3Qua2V5cyhzdGF0ZUNoYW5nZXNba2V5XSkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgc3RhdGVDaGFuZ2VzW2tleV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZShzdGF0ZUNoYW5nZXMpO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdzdGF0ZUNoYW5nZScsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBzdGF0ZUNoYW5nZShzdGF0ZUNoYW5nZXMpIHtcbiAgICAgICAgICAgIC8vIHRoaXMgaXMgaGVyZSBvbmx5IHRvIGJlIHJld3JpdHRlblxuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdyZWYnLFxuICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZWY7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gc2V0KGl0ZW1zKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgICAgICAgdmFyIGFsbFJlZnMgPSAoMCwgX3V0aWxzLnF1ZXJ5QWxsKSgnW2ctcmVmXScsIHRoaXMuZWxlbWVudCk7XG5cbiAgICAgICAgICAgIGlmIChPYmplY3Qua2V5cyhpdGVtcykubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgYWxsUmVmcy5mb3JFYWNoKGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZWZOYW1lID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2ctcmVmJyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZWZOYW1lLmluZGV4T2YoJzonKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZWZOYW1lQXJyYXkgPSByZWZOYW1lLnNwbGl0KCc6Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVmTmFtZUFycmF5WzBdID09IF90aGlzMi5fbmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghX3RoaXMyLl9yZWZbcmVmTmFtZUFycmF5WzFdXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpczIuX3JlZltyZWZOYW1lQXJyYXlbMV1dID0gYWxsUmVmcy5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLmdldEF0dHJpYnV0ZSgnZy1yZWYnKSA9PT0gcmVmTmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIV90aGlzMi5fcmVmW3JlZk5hbWVdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMyLl9yZWZbcmVmTmFtZV0gPSBhbGxSZWZzLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS5nZXRBdHRyaWJ1dGUoJ2ctcmVmJykgPT09IHJlZk5hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVmID0gT2JqZWN0LmtleXMoaXRlbXMpLm1hcChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheShpdGVtc1trZXldKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBub24tZW1wdHkgcmVmc1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbXNba2V5XSAhPT0gbnVsbCAmJiBpc0FycmF5ICYmIGl0ZW1zW2tleV0ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBrZXksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGl0ZW1zW2tleV1cbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB2YXIgbmFtZSA9IGtleTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHByZWZpeGVkTmFtZSA9IF90aGlzMi5fbmFtZSArICc6JyArIG5hbWU7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlZnMgPSBhbGxSZWZzLmZpbHRlcihmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdnLXJlZicpID09PSBwcmVmaXhlZE5hbWU7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZWZzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVmcyA9IGFsbFJlZnMuZmlsdGVyKGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdnLXJlZicpID09PSBuYW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAoIWlzQXJyYXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZnMgPSByZWZzLmxlbmd0aCA/IHJlZnNbMF0gOiBudWxsO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IGtleSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiByZWZzXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSkucmVkdWNlKGZ1bmN0aW9uIChhY2MsIHJlZikge1xuICAgICAgICAgICAgICAgICAgICBhY2NbcmVmLm5hbWVdID0gcmVmLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICAgICAgICAgIH0sIHt9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JlZjtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnb3B0aW9ucycsXG4gICAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX29wdGlvbnM7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gc2V0KGRlZmF1bHRzKSB7XG4gICAgICAgICAgICB2YXIgb3B0aW9ucyA9IHt9O1xuICAgICAgICAgICAgdmFyIG9wdGlvbnNGcm9tQXR0cmlidXRlID0gdGhpcy5lbGVtZW50LmdldEF0dHJpYnV0ZSgnZy1vcHRpb25zJyk7XG4gICAgICAgICAgICBpZiAob3B0aW9uc0Zyb21BdHRyaWJ1dGUpIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zID0gSlNPTi5wYXJzZShvcHRpb25zRnJvbUF0dHJpYnV0ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX29wdGlvbnMgPSBfZXh0ZW5kcyh7fSwgdGhpcy5fb3B0aW9ucywgZGVmYXVsdHMsIG9wdGlvbnMpO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fb3B0aW9ucztcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnc3RhdGUnLFxuICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zdGF0ZTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiBzZXQoc3RhdGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignWW91IHNob3VsZCBub3QgY2hhbmdlIHN0YXRlIG1hbnVhbGx5LiBVc2Ugc2V0U3RhdGUgaW5zdGVhZC4nKTtcbiAgICAgICAgICAgIHRoaXMuX3N0YXRlID0gc3RhdGU7XG4gICAgICAgIH1cbiAgICB9XSk7XG5cbiAgICByZXR1cm4gQ29tcG9uZW50O1xufSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBDb21wb25lbnQ7XG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxucmVxdWlyZSgnYmFiZWwtcmVnZW5lcmF0b3ItcnVudGltZScpO1xuXG52YXIgX0Jhc2VDb21wb25lbnQyID0gcmVxdWlyZSgnLi9CYXNlQ29tcG9uZW50Jyk7XG5cbnZhciBfQmFzZUNvbXBvbmVudDMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9CYXNlQ29tcG9uZW50Mik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9hc3luY1RvR2VuZXJhdG9yKGZuKSB7IHJldHVybiBmdW5jdGlvbiAoKSB7IHZhciBnZW4gPSBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpOyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyBmdW5jdGlvbiBzdGVwKGtleSwgYXJnKSB7IHRyeSB7IHZhciBpbmZvID0gZ2VuW2tleV0oYXJnKTsgdmFyIHZhbHVlID0gaW5mby52YWx1ZTsgfSBjYXRjaCAoZXJyb3IpIHsgcmVqZWN0KGVycm9yKTsgcmV0dXJuOyB9IGlmIChpbmZvLmRvbmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0gZWxzZSB7IHJldHVybiBQcm9taXNlLnJlc29sdmUodmFsdWUpLnRoZW4oZnVuY3Rpb24gKHZhbHVlKSB7IHN0ZXAoXCJuZXh0XCIsIHZhbHVlKTsgfSwgZnVuY3Rpb24gKGVycikgeyBzdGVwKFwidGhyb3dcIiwgZXJyKTsgfSk7IH0gfSByZXR1cm4gc3RlcChcIm5leHRcIik7IH0pOyB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxuLyoqXG4gKiBDb21wb25lbnQgd2l0aCBjb2RlIHNwbGl0dGluZyBzdXBwb3J0XG4gKi9cblxudmFyIENvbXBvbmVudCA9IGZ1bmN0aW9uIChfQmFzZUNvbXBvbmVudCkge1xuICAgIF9pbmhlcml0cyhDb21wb25lbnQsIF9CYXNlQ29tcG9uZW50KTtcblxuICAgIGZ1bmN0aW9uIENvbXBvbmVudCgpIHtcbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIENvbXBvbmVudCk7XG5cbiAgICAgICAgcmV0dXJuIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIChDb21wb25lbnQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihDb21wb25lbnQpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgICB9XG5cbiAgICBfY3JlYXRlQ2xhc3MoQ29tcG9uZW50LCBbe1xuICAgICAgICBrZXk6ICdyZXF1aXJlJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBfcmVmID0gX2FzeW5jVG9HZW5lcmF0b3IoIC8qI19fUFVSRV9fKi9yZWdlbmVyYXRvclJ1bnRpbWUubWFyayhmdW5jdGlvbiBfY2FsbGVlKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZWdlbmVyYXRvclJ1bnRpbWUud3JhcChmdW5jdGlvbiBfY2FsbGVlJChfY29udGV4dCkge1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dC5wcmV2ID0gX2NvbnRleHQubmV4dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdlbmQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQuc3RvcCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwgX2NhbGxlZSwgdGhpcyk7XG4gICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIHJlcXVpcmUoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9yZWYuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHJlcXVpcmU7XG4gICAgICAgIH0oKVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnX2xvYWQnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gX2xvYWQoKSB7XG4gICAgICAgICAgICB0aGlzLnJlcXVpcmUoKS50aGVuKHRoaXMubW91bnQuYmluZCh0aGlzKSk7XG4gICAgICAgIH1cbiAgICB9XSk7XG5cbiAgICByZXR1cm4gQ29tcG9uZW50O1xufShfQmFzZUNvbXBvbmVudDMuZGVmYXVsdCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IENvbXBvbmVudDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbi8qKlxuICogQ29uZmlnIGZvciBzZXR0aW5nIGFuZCBjaGFuZ2luZyBnbG9iYWwgc2V0dGluZ3NcbiAqL1xuXG52YXIgQ29uZmlnID0gZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENvbmZpZygpIHtcbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIENvbmZpZyk7XG5cbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIGxvZzogdHJ1ZVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIF9jcmVhdGVDbGFzcyhDb25maWcsIFt7XG4gICAgICAgIGtleTogXCJzZXRcIixcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHNldChuYW1lLCB2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fb3B0aW9uc1tuYW1lXSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6IFwiZ2V0XCIsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBnZXQobmFtZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX29wdGlvbnNbbmFtZV07XG4gICAgICAgIH1cbiAgICB9XSk7XG5cbiAgICByZXR1cm4gQ29uZmlnO1xufSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBuZXcgQ29uZmlnKCk7XG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGNyZWF0ZUluc3RhbmNlO1xuXG52YXIgX2NvbmZpZyA9IHJlcXVpcmUoJy4vY29uZmlnJyk7XG5cbnZhciBfY29uZmlnMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NvbmZpZyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbi8qKlxuICogQ3JlYXRlcyBhbmQgcmV0dXJucyBpbnN0YW5jZSBvZiBjb21wb25lbnRcbiAqIEBwYXJhbSBlbGVtZW50OiBET00gZWxlbWVudFxuICogQHBhcmFtIGNvbXBvbmVudE5hbWU6IENvbXBvbmVudCBuYW1lXG4gKiBAcGFyYW0gY29tcG9uZW50OiBDb21wb25lbnQgY29uc3RydWN0b3JcbiAqIEBwYXJhbSBvcHRpb25zOiBvcHRpb25zIG9iamVjdCBwYXNzZWQgaW50byBhIGNvbXBvbmVudFxuICovXG5cbmZ1bmN0aW9uIGNyZWF0ZUluc3RhbmNlKGVsZW1lbnQsIGNvbXBvbmVudE5hbWUsIGNvbXBvbmVudCwgb3B0aW9ucykge1xuICAgIGNvbXBvbmVudC5wcm90b3R5cGUuX25hbWUgPSBjb21wb25lbnROYW1lO1xuICAgIHZhciBpbnN0YW5jZSA9IG5ldyBjb21wb25lbnQoZWxlbWVudCwgb3B0aW9ucyk7XG5cbiAgICBpZiAoX2NvbmZpZzIuZGVmYXVsdC5nZXQoJ2xvZycpKSB7XG4gICAgICAgIGNvbnNvbGUuaW5mbygnQ3JlYXRlZCBpbnN0YW5jZSBvZiBjb21wb25lbnQgXCInICsgY29tcG9uZW50TmFtZSArICdcIi4nKTtcbiAgICB9XG4gICAgcmV0dXJuIGluc3RhbmNlO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbnZhciBfY29uZmlnID0gcmVxdWlyZSgnLi9jb25maWcnKTtcblxudmFyIF9jb25maWcyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY29uZmlnKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuLyoqXG4gKiBFdmVudCBidXMgZm9yIHN0b3JpbmcgYW5kIGV4ZWN1dGluZyBoYW5kbGVycyBvbiBlbWl0dGVkIGV2ZW50c1xuICovXG5cbnZhciBFdmVudEJ1cyA9IGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBFdmVudEJ1cygpIHtcbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEV2ZW50QnVzKTtcblxuICAgICAgICB0aGlzLmxpc3QgPSB7fTtcbiAgICB9XG5cbiAgICBfY3JlYXRlQ2xhc3MoRXZlbnRCdXMsIFt7XG4gICAgICAgIGtleTogJ2VtaXQnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZW1pdChldmVudCkge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgICAgICAgdmFyIGV2ZW50T2JqZWN0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fTtcblxuICAgICAgICAgICAgZXZlbnRPYmplY3QuX25hbWUgPSBldmVudDtcbiAgICAgICAgICAgIGlmICh0aGlzLmxpc3RbZXZlbnRdKSB7XG4gICAgICAgICAgICAgICAgaWYgKF9jb25maWcyLmRlZmF1bHQuZ2V0KCdsb2cnKSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmluZm8odGhpcy5saXN0W2V2ZW50XS5sZW5ndGggKyAnIGhhbmRsZXInICsgKHRoaXMubGlzdFtldmVudF0ubGVuZ3RoID4gMSA/IFwic1wiIDogXCJcIikgKyAnIGNhbGxlZCBvbiBldmVudCBcXCcnICsgZXZlbnQgKyAnXFwnJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMubGlzdFtldmVudF0uZm9yRWFjaChmdW5jdGlvbiAoaGFuZGxlck9iamVjdCkge1xuICAgICAgICAgICAgICAgICAgICBoYW5kbGVyT2JqZWN0LmhhbmRsZXIoZXZlbnRPYmplY3QpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaGFuZGxlck9iamVjdC5vbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5vZmYoZXZlbnQsIGhhbmRsZXJPYmplY3QuaGFuZGxlcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKF9jb25maWcyLmRlZmF1bHQuZ2V0KCdsb2cnKSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmluZm8oJzAgaGFuZGxlcnMgY2FsbGVkIG9uIGV2ZW50IFxcJycgKyBldmVudCArICdcXCcnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ29uJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIG9uKGV2ZW50LCBoYW5kbGVyKSB7XG4gICAgICAgICAgICB2YXIgb25jZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDogZmFsc2U7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmxpc3RbZXZlbnRdKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5saXN0W2V2ZW50XS5wdXNoKHsgb25jZTogb25jZSwgaGFuZGxlcjogaGFuZGxlciB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5saXN0W2V2ZW50XSA9IFtdO1xuICAgICAgICAgICAgICAgIHRoaXMubGlzdFtldmVudF0ucHVzaCh7IG9uY2U6IG9uY2UsIGhhbmRsZXI6IGhhbmRsZXIgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ29uY2UnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gb25jZShldmVudCwgaGFuZGxlcikge1xuICAgICAgICAgICAgdGhpcy5vbihldmVudCwgaGFuZGxlciwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ29mZicsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBvZmYoZXZlbnQsIGhhbmRsZXIpIHtcbiAgICAgICAgICAgIGlmIChldmVudCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgaWYgKGhhbmRsZXIgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5saXN0W2V2ZW50XSAmJiB0aGlzLmxpc3RbZXZlbnRdLmZpbHRlcihmdW5jdGlvbiAoZXZlbnRPYmplY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBldmVudE9iamVjdC5oYW5kbGVyID09PSBoYW5kbGVyO1xuICAgICAgICAgICAgICAgICAgICB9KS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0b1JlbW92ZSA9IHRoaXMubGlzdFtldmVudF0uZmlsdGVyKGZ1bmN0aW9uIChldmVudE9iamVjdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBldmVudE9iamVjdC5oYW5kbGVyID09PSBoYW5kbGVyO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSB0aGlzLmxpc3RbZXZlbnRdLmluZGV4T2YodG9SZW1vdmUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxpc3RbZXZlbnRdLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ0V2ZW50ICcgKyBldmVudCArICcgY2Fubm90IGJlIHVuc3Vic2NyaWJlZCAtIGRvZXMgbm90IGV4aXN0LicpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5saXN0W2V2ZW50XSA9IFtdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5saXN0ID0ge307XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XSk7XG5cbiAgICByZXR1cm4gRXZlbnRCdXM7XG59KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IG5ldyBFdmVudEJ1cygpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBnZXRDb21wb25lbnRGcm9tRWxlbWVudDtcbi8qKlxuICogUmV0dXJuIGluc3RhbmNlIGZyb20gZWxlbWVudFxuICogQHBhcmFtIGVsZW1lbnQ6IERPTSBlbGVtZW50IG9yIElEIG9mIGVsZW1lbnRcbiAqIEByZXR1cm5zIGNvbXBvbmVudCBpbnN0YW5jZVxuICovXG5cbmZ1bmN0aW9uIGdldENvbXBvbmVudEZyb21FbGVtZW50KGVsZW1lbnQpIHtcbiAgICBpZiAodHlwZW9mIGVsZW1lbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50KTtcblxuICAgICAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGVsZW1lbnRbJ19fZ2lhX2NvbXBvbmVudF9fJ107XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGxvYWRDb21wb25lbnRzO1xuXG52YXIgX3V0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xuXG52YXIgX2dldENvbXBvbmVudEZyb21FbGVtZW50ID0gcmVxdWlyZSgnLi9nZXRDb21wb25lbnRGcm9tRWxlbWVudCcpO1xuXG52YXIgX2dldENvbXBvbmVudEZyb21FbGVtZW50MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2dldENvbXBvbmVudEZyb21FbGVtZW50KTtcblxudmFyIF9jcmVhdGVJbnN0YW5jZSA9IHJlcXVpcmUoJy4vY3JlYXRlSW5zdGFuY2UnKTtcblxudmFyIF9jcmVhdGVJbnN0YW5jZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVJbnN0YW5jZSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbi8qKlxuICogQ3JlYXRlcyBpbnN0YW5jZXMgb2YgY29tcG9uZW50cyB3aXRob3V0IGNyZWF0aW5nIGR1cGxpY2F0ZXMgb24gZWxlbWVudHMgd2l0aGluIHRoZSBjb250ZXh0XG4gKiBAcGFyYW0gY29tcG9uZW50czogb2JqZWN0IG9mIGNvbXBvbmVudHMgdG8gbG9hZFxuICogQHBhcmFtIGNvbnRleHQ6IERPTSBlbGVtZW50XG4gKi9cblxuZnVuY3Rpb24gbG9hZENvbXBvbmVudHMoKSB7XG4gICAgdmFyIGNvbXBvbmVudHMgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHt9O1xuICAgIHZhciBjb250ZXh0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG5cblxuICAgIGlmICghY29tcG9uZW50cyB8fCBPYmplY3Qua2V5cyhjb21wb25lbnRzKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdBcHAgaGFzIG5vIGNvbXBvbmVudHMnKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBpbml0aWFsaXNlZENvbXBvbmVudHMgPSBbXTtcblxuICAgICgwLCBfdXRpbHMucXVlcnlBbGwpKCdbZy1jb21wb25lbnRdJywgY29udGV4dCkuZm9yRWFjaChmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICB2YXIgaW5zdGFuY2UgPSAoMCwgX2dldENvbXBvbmVudEZyb21FbGVtZW50Mi5kZWZhdWx0KShlbGVtZW50KTtcblxuICAgICAgICBpZiAoaW5zdGFuY2UpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignRXJyb3I6IGluc3RhbmNlIGV4aXN0czogXFxuJywgaW5zdGFuY2UpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7IC8vIGNvbnRpbnVlXG4gICAgICAgIH1cblxuICAgICAgICB2YXIgY29tcG9uZW50TmFtZSA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdnLWNvbXBvbmVudCcpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgY29tcG9uZW50c1tjb21wb25lbnROYW1lXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgaW5pdGlhbGlzZWRDb21wb25lbnRzLnB1c2goKDAsIF9jcmVhdGVJbnN0YW5jZTIuZGVmYXVsdCkoZWxlbWVudCwgY29tcG9uZW50TmFtZSwgY29tcG9uZW50c1tjb21wb25lbnROYW1lXSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdDb25zdHJ1Y3RvciBmb3IgY29tcG9uZW50IFwiJyArIGNvbXBvbmVudE5hbWUgKyAnXCIgbm90IGZvdW5kLicpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBjYWxsIF9sb2FkL3JlcXVpcmUvbW91bnRcbiAgICBpbml0aWFsaXNlZENvbXBvbmVudHMuZm9yRWFjaChmdW5jdGlvbiAoY29tcG9uZW50KSB7XG4gICAgICAgIGNvbXBvbmVudC5fbG9hZCgpO1xuICAgIH0pO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLnF1ZXJ5ID0gcXVlcnk7XG5leHBvcnRzLnF1ZXJ5QWxsID0gcXVlcnlBbGw7XG5leHBvcnRzLnRvZ2dsZUNsYXNzID0gdG9nZ2xlQ2xhc3M7XG5leHBvcnRzLnJlbW92ZUNsYXNzID0gcmVtb3ZlQ2xhc3M7XG5leHBvcnRzLmFkZENsYXNzID0gYWRkQ2xhc3M7XG5leHBvcnRzLnRyaWdnZXJFdmVudCA9IHRyaWdnZXJFdmVudDtcbmZ1bmN0aW9uIHF1ZXJ5KHNlbGVjdG9yKSB7XG4gICAgdmFyIGNvbnRleHQgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IGRvY3VtZW50O1xuXG4gICAgaWYgKHR5cGVvZiBzZWxlY3RvciAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIHNlbGVjdG9yO1xuICAgIH1cblxuICAgIHJldHVybiBjb250ZXh0LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xufVxuXG5mdW5jdGlvbiBxdWVyeUFsbChzZWxlY3Rvcikge1xuICAgIHZhciBjb250ZXh0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiBkb2N1bWVudDtcblxuICAgIGlmICh0eXBlb2Ygc2VsZWN0b3IgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiBzZWxlY3RvcjtcbiAgICB9XG5cbiAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoY29udGV4dC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSk7XG59XG5cbmZ1bmN0aW9uIHRvZ2dsZUNsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSkge1xuICAgIHZhciBjb25kaXRpb24gPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6IG51bGw7XG5cbiAgICBpZiAoY29uZGl0aW9uID09PSBudWxsKSB7XG4gICAgICAgIGlmIChlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpKSB7XG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGNvbmRpdGlvbikge1xuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gcmVtb3ZlQ2xhc3Mobm9kZXMsIGNsYXNzTmFtZSkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KG5vZGVzKSkge1xuICAgICAgICBub2Rlcy5mb3JFYWNoKGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgICAgICByZXR1cm4gbm9kZS5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIG5vZGVzLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbm9kZXM7XG59XG5cbmZ1bmN0aW9uIGFkZENsYXNzKG5vZGVzLCBjbGFzc05hbWUpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShub2RlcykpIHtcbiAgICAgICAgbm9kZXMuZm9yRWFjaChmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICAgICAgcmV0dXJuIG5vZGUuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBub2Rlcy5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5vZGVzO1xufVxuXG5mdW5jdGlvbiB0cmlnZ2VyRXZlbnQoZWxlbWVudCwgZXZlbnRUeXBlKSB7XG4gICAgdmFyIHBhcmFtcyA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDogbnVsbDtcbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAzICYmIGFyZ3VtZW50c1szXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzNdIDoge1xuICAgICAgICBidWJibGVzOiB0cnVlLFxuICAgICAgICBjYW5jZWxhYmxlOiB0cnVlLFxuICAgICAgICBkZXRhaWw6IG51bGxcbiAgICB9O1xuXG4gICAgb3B0aW9ucy5kZXRhaWwgPSBwYXJhbXM7XG4gICAgdmFyIGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KGV2ZW50VHlwZSwgb3B0aW9ucyk7XG4gICAgZWxlbWVudC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbn1cbiIsIiFmdW5jdGlvbihlLHQpe1wiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoW10sdCk6XCJvYmplY3RcIj09dHlwZW9mIG1vZHVsZSYmbW9kdWxlLmV4cG9ydHM/bW9kdWxlLmV4cG9ydHM9dCgpOmUuaW09dCgpfSh0aGlzLGZ1bmN0aW9uKCl7ZnVuY3Rpb24gZShlKXtjPWV9ZnVuY3Rpb24gdChlKXtcIm1hbnVhbFwiPT1lJiYoZj0hMSxuKCkpfWZ1bmN0aW9uIG4oKXtpZih3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSYmXCJcIiE9PXdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGMsXCI6OmFmdGVyXCIpLmNvbnRlbnQpe3ZhciBlPXdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGMsXCI6OmFmdGVyXCIpLmNvbnRlbnQ7dHJ5e2w9SlNPTi5wYXJzZShpKGUpKX1jYXRjaCh0KXtsPSExfX1lbHNlIGw9ITF9ZnVuY3Rpb24gYShlKXtyZXR1cm4gZiYmbigpLGwuaGFzT3duUHJvcGVydHkoZSkmJmxbZV0uYWN0aXZlfWZ1bmN0aW9uIG8oZSl7cmV0dXJuIWEoZSl9ZnVuY3Rpb24gcigpe2YmJm4oKTt2YXIgZT17bmFtZTohMSx2YWx1ZTowfTtmb3IodmFyIHQgaW4gbClpZihsLmhhc093blByb3BlcnR5KHQpKXt2YXIgYT1wYXJzZUZsb2F0KGxbdF0udmFsdWUpO2xbdF0uYWN0aXZlJiZhPmUudmFsdWUmJihlPXtuYW1lOnQsdmFsdWU6YX0pfXJldHVybiBlLm5hbWV9ZnVuY3Rpb24gdShlLHQpe3JldHVybiBmJiZuKCksbCYmbC5oYXNPd25Qcm9wZXJ0eShlKT90P3BhcnNlRmxvYXQobFtlXS52YWx1ZSk6bFtlXS52YWx1ZTohMX1mdW5jdGlvbiBpKGUpe3JldHVybihcInN0cmluZ1wiPT10eXBlb2YgZXx8ZSBpbnN0YW5jZW9mIFN0cmluZykmJihlPWUucmVwbGFjZSgvWyddL2csJ1wiJykucmVwbGFjZSgvXFxcXHxeW1xcc1xcU117MCwxfXxbXFxzXFxTXSQvZyxcIlwiKSksZX12YXIgYz1kb2N1bWVudC5ib2R5LGY9ITAsbD0hMTtyZXR1cm57c2V0RWxlbWVudDplLHNldFVwZGF0ZU1vZGU6dCxncmVhdGVyVGhhbjphLGxlc3NUaGFuOm8sZ2V0QWN0aXZlOnIsZ2V0VmFsdWU6dSx1cGRhdGU6bn19KTsiLCIoZnVuY3Rpb24od2luZG93LCBmYWN0b3J5KSB7XG5cdHZhciBsYXp5U2l6ZXMgPSBmYWN0b3J5KHdpbmRvdywgd2luZG93LmRvY3VtZW50LCBEYXRlKTtcblx0d2luZG93LmxhenlTaXplcyA9IGxhenlTaXplcztcblx0aWYodHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cyl7XG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBsYXp5U2l6ZXM7XG5cdH1cbn0odHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyA/XG4gICAgICB3aW5kb3cgOiB7fSwgZnVuY3Rpb24gbCh3aW5kb3csIGRvY3VtZW50LCBEYXRlKSB7IC8vIFBhc3MgaW4gdGhlIHdpbmRvZSBEYXRlIGZ1bmN0aW9uIGFsc28gZm9yIFNTUiBiZWNhdXNlIHRoZSBEYXRlIGNsYXNzIGNhbiBiZSBsb3N0XG5cdCd1c2Ugc3RyaWN0Jztcblx0Lypqc2hpbnQgZXFudWxsOnRydWUgKi9cblxuXHR2YXIgbGF6eXNpemVzLCBsYXp5U2l6ZXNDZmc7XG5cblx0KGZ1bmN0aW9uKCl7XG5cdFx0dmFyIHByb3A7XG5cblx0XHR2YXIgbGF6eVNpemVzRGVmYXVsdHMgPSB7XG5cdFx0XHRsYXp5Q2xhc3M6ICdsYXp5bG9hZCcsXG5cdFx0XHRsb2FkZWRDbGFzczogJ2xhenlsb2FkZWQnLFxuXHRcdFx0bG9hZGluZ0NsYXNzOiAnbGF6eWxvYWRpbmcnLFxuXHRcdFx0cHJlbG9hZENsYXNzOiAnbGF6eXByZWxvYWQnLFxuXHRcdFx0ZXJyb3JDbGFzczogJ2xhenllcnJvcicsXG5cdFx0XHQvL3N0cmljdENsYXNzOiAnbGF6eXN0cmljdCcsXG5cdFx0XHRhdXRvc2l6ZXNDbGFzczogJ2xhenlhdXRvc2l6ZXMnLFxuXHRcdFx0c3JjQXR0cjogJ2RhdGEtc3JjJyxcblx0XHRcdHNyY3NldEF0dHI6ICdkYXRhLXNyY3NldCcsXG5cdFx0XHRzaXplc0F0dHI6ICdkYXRhLXNpemVzJyxcblx0XHRcdC8vcHJlbG9hZEFmdGVyTG9hZDogZmFsc2UsXG5cdFx0XHRtaW5TaXplOiA0MCxcblx0XHRcdGN1c3RvbU1lZGlhOiB7fSxcblx0XHRcdGluaXQ6IHRydWUsXG5cdFx0XHRleHBGYWN0b3I6IDEuNSxcblx0XHRcdGhGYWM6IDAuOCxcblx0XHRcdGxvYWRNb2RlOiAyLFxuXHRcdFx0bG9hZEhpZGRlbjogdHJ1ZSxcblx0XHRcdHJpY1RpbWVvdXQ6IDAsXG5cdFx0XHR0aHJvdHRsZURlbGF5OiAxMjUsXG5cdFx0fTtcblxuXHRcdGxhenlTaXplc0NmZyA9IHdpbmRvdy5sYXp5U2l6ZXNDb25maWcgfHwgd2luZG93LmxhenlzaXplc0NvbmZpZyB8fCB7fTtcblxuXHRcdGZvcihwcm9wIGluIGxhenlTaXplc0RlZmF1bHRzKXtcblx0XHRcdGlmKCEocHJvcCBpbiBsYXp5U2l6ZXNDZmcpKXtcblx0XHRcdFx0bGF6eVNpemVzQ2ZnW3Byb3BdID0gbGF6eVNpemVzRGVmYXVsdHNbcHJvcF07XG5cdFx0XHR9XG5cdFx0fVxuXHR9KSgpO1xuXG5cdGlmICghZG9jdW1lbnQgfHwgIWRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0aW5pdDogZnVuY3Rpb24gKCkge30sXG5cdFx0XHRjZmc6IGxhenlTaXplc0NmZyxcblx0XHRcdG5vU3VwcG9ydDogdHJ1ZSxcblx0XHR9O1xuXHR9XG5cblx0dmFyIGRvY0VsZW0gPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG5cblx0dmFyIHN1cHBvcnRQaWN0dXJlID0gd2luZG93LkhUTUxQaWN0dXJlRWxlbWVudDtcblxuXHR2YXIgX2FkZEV2ZW50TGlzdGVuZXIgPSAnYWRkRXZlbnRMaXN0ZW5lcic7XG5cblx0dmFyIF9nZXRBdHRyaWJ1dGUgPSAnZ2V0QXR0cmlidXRlJztcblxuXHQvKipcblx0ICogVXBkYXRlIHRvIGJpbmQgdG8gd2luZG93IGJlY2F1c2UgJ3RoaXMnIGJlY29tZXMgbnVsbCBkdXJpbmcgU1NSXG5cdCAqIGJ1aWxkcy5cblx0ICovXG5cdHZhciBhZGRFdmVudExpc3RlbmVyID0gd2luZG93W19hZGRFdmVudExpc3RlbmVyXS5iaW5kKHdpbmRvdyk7XG5cblx0dmFyIHNldFRpbWVvdXQgPSB3aW5kb3cuc2V0VGltZW91dDtcblxuXHR2YXIgcmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCBzZXRUaW1lb3V0O1xuXG5cdHZhciByZXF1ZXN0SWRsZUNhbGxiYWNrID0gd2luZG93LnJlcXVlc3RJZGxlQ2FsbGJhY2s7XG5cblx0dmFyIHJlZ1BpY3R1cmUgPSAvXnBpY3R1cmUkL2k7XG5cblx0dmFyIGxvYWRFdmVudHMgPSBbJ2xvYWQnLCAnZXJyb3InLCAnbGF6eWluY2x1ZGVkJywgJ19sYXp5bG9hZGVkJ107XG5cblx0dmFyIHJlZ0NsYXNzQ2FjaGUgPSB7fTtcblxuXHR2YXIgZm9yRWFjaCA9IEFycmF5LnByb3RvdHlwZS5mb3JFYWNoO1xuXG5cdHZhciBoYXNDbGFzcyA9IGZ1bmN0aW9uKGVsZSwgY2xzKSB7XG5cdFx0aWYoIXJlZ0NsYXNzQ2FjaGVbY2xzXSl7XG5cdFx0XHRyZWdDbGFzc0NhY2hlW2Nsc10gPSBuZXcgUmVnRXhwKCcoXFxcXHN8XiknK2NscysnKFxcXFxzfCQpJyk7XG5cdFx0fVxuXHRcdHJldHVybiByZWdDbGFzc0NhY2hlW2Nsc10udGVzdChlbGVbX2dldEF0dHJpYnV0ZV0oJ2NsYXNzJykgfHwgJycpICYmIHJlZ0NsYXNzQ2FjaGVbY2xzXTtcblx0fTtcblxuXHR2YXIgYWRkQ2xhc3MgPSBmdW5jdGlvbihlbGUsIGNscykge1xuXHRcdGlmICghaGFzQ2xhc3MoZWxlLCBjbHMpKXtcblx0XHRcdGVsZS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgKGVsZVtfZ2V0QXR0cmlidXRlXSgnY2xhc3MnKSB8fCAnJykudHJpbSgpICsgJyAnICsgY2xzKTtcblx0XHR9XG5cdH07XG5cblx0dmFyIHJlbW92ZUNsYXNzID0gZnVuY3Rpb24oZWxlLCBjbHMpIHtcblx0XHR2YXIgcmVnO1xuXHRcdGlmICgocmVnID0gaGFzQ2xhc3MoZWxlLGNscykpKSB7XG5cdFx0XHRlbGUuc2V0QXR0cmlidXRlKCdjbGFzcycsIChlbGVbX2dldEF0dHJpYnV0ZV0oJ2NsYXNzJykgfHwgJycpLnJlcGxhY2UocmVnLCAnICcpKTtcblx0XHR9XG5cdH07XG5cblx0dmFyIGFkZFJlbW92ZUxvYWRFdmVudHMgPSBmdW5jdGlvbihkb20sIGZuLCBhZGQpe1xuXHRcdHZhciBhY3Rpb24gPSBhZGQgPyBfYWRkRXZlbnRMaXN0ZW5lciA6ICdyZW1vdmVFdmVudExpc3RlbmVyJztcblx0XHRpZihhZGQpe1xuXHRcdFx0YWRkUmVtb3ZlTG9hZEV2ZW50cyhkb20sIGZuKTtcblx0XHR9XG5cdFx0bG9hZEV2ZW50cy5mb3JFYWNoKGZ1bmN0aW9uKGV2dCl7XG5cdFx0XHRkb21bYWN0aW9uXShldnQsIGZuKTtcblx0XHR9KTtcblx0fTtcblxuXHR2YXIgdHJpZ2dlckV2ZW50ID0gZnVuY3Rpb24oZWxlbSwgbmFtZSwgZGV0YWlsLCBub0J1YmJsZXMsIG5vQ2FuY2VsYWJsZSl7XG5cdFx0dmFyIGV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0V2ZW50Jyk7XG5cblx0XHRpZighZGV0YWlsKXtcblx0XHRcdGRldGFpbCA9IHt9O1xuXHRcdH1cblxuXHRcdGRldGFpbC5pbnN0YW5jZSA9IGxhenlzaXplcztcblxuXHRcdGV2ZW50LmluaXRFdmVudChuYW1lLCAhbm9CdWJibGVzLCAhbm9DYW5jZWxhYmxlKTtcblxuXHRcdGV2ZW50LmRldGFpbCA9IGRldGFpbDtcblxuXHRcdGVsZW0uZGlzcGF0Y2hFdmVudChldmVudCk7XG5cdFx0cmV0dXJuIGV2ZW50O1xuXHR9O1xuXG5cdHZhciB1cGRhdGVQb2x5ZmlsbCA9IGZ1bmN0aW9uIChlbCwgZnVsbCl7XG5cdFx0dmFyIHBvbHlmaWxsO1xuXHRcdGlmKCAhc3VwcG9ydFBpY3R1cmUgJiYgKCBwb2x5ZmlsbCA9ICh3aW5kb3cucGljdHVyZWZpbGwgfHwgbGF6eVNpemVzQ2ZnLnBmKSApICl7XG5cdFx0XHRpZihmdWxsICYmIGZ1bGwuc3JjICYmICFlbFtfZ2V0QXR0cmlidXRlXSgnc3Jjc2V0Jykpe1xuXHRcdFx0XHRlbC5zZXRBdHRyaWJ1dGUoJ3NyY3NldCcsIGZ1bGwuc3JjKTtcblx0XHRcdH1cblx0XHRcdHBvbHlmaWxsKHtyZWV2YWx1YXRlOiB0cnVlLCBlbGVtZW50czogW2VsXX0pO1xuXHRcdH0gZWxzZSBpZihmdWxsICYmIGZ1bGwuc3JjKXtcblx0XHRcdGVsLnNyYyA9IGZ1bGwuc3JjO1xuXHRcdH1cblx0fTtcblxuXHR2YXIgZ2V0Q1NTID0gZnVuY3Rpb24gKGVsZW0sIHN0eWxlKXtcblx0XHRyZXR1cm4gKGdldENvbXB1dGVkU3R5bGUoZWxlbSwgbnVsbCkgfHwge30pW3N0eWxlXTtcblx0fTtcblxuXHR2YXIgZ2V0V2lkdGggPSBmdW5jdGlvbihlbGVtLCBwYXJlbnQsIHdpZHRoKXtcblx0XHR3aWR0aCA9IHdpZHRoIHx8IGVsZW0ub2Zmc2V0V2lkdGg7XG5cblx0XHR3aGlsZSh3aWR0aCA8IGxhenlTaXplc0NmZy5taW5TaXplICYmIHBhcmVudCAmJiAhZWxlbS5fbGF6eXNpemVzV2lkdGgpe1xuXHRcdFx0d2lkdGggPSAgcGFyZW50Lm9mZnNldFdpZHRoO1xuXHRcdFx0cGFyZW50ID0gcGFyZW50LnBhcmVudE5vZGU7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHdpZHRoO1xuXHR9O1xuXG5cdHZhciByQUYgPSAoZnVuY3Rpb24oKXtcblx0XHR2YXIgcnVubmluZywgd2FpdGluZztcblx0XHR2YXIgZmlyc3RGbnMgPSBbXTtcblx0XHR2YXIgc2Vjb25kRm5zID0gW107XG5cdFx0dmFyIGZucyA9IGZpcnN0Rm5zO1xuXG5cdFx0dmFyIHJ1biA9IGZ1bmN0aW9uKCl7XG5cdFx0XHR2YXIgcnVuRm5zID0gZm5zO1xuXG5cdFx0XHRmbnMgPSBmaXJzdEZucy5sZW5ndGggPyBzZWNvbmRGbnMgOiBmaXJzdEZucztcblxuXHRcdFx0cnVubmluZyA9IHRydWU7XG5cdFx0XHR3YWl0aW5nID0gZmFsc2U7XG5cblx0XHRcdHdoaWxlKHJ1bkZucy5sZW5ndGgpe1xuXHRcdFx0XHRydW5GbnMuc2hpZnQoKSgpO1xuXHRcdFx0fVxuXG5cdFx0XHRydW5uaW5nID0gZmFsc2U7XG5cdFx0fTtcblxuXHRcdHZhciByYWZCYXRjaCA9IGZ1bmN0aW9uKGZuLCBxdWV1ZSl7XG5cdFx0XHRpZihydW5uaW5nICYmICFxdWV1ZSl7XG5cdFx0XHRcdGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmbnMucHVzaChmbik7XG5cblx0XHRcdFx0aWYoIXdhaXRpbmcpe1xuXHRcdFx0XHRcdHdhaXRpbmcgPSB0cnVlO1xuXHRcdFx0XHRcdChkb2N1bWVudC5oaWRkZW4gPyBzZXRUaW1lb3V0IDogcmVxdWVzdEFuaW1hdGlvbkZyYW1lKShydW4pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHJhZkJhdGNoLl9sc0ZsdXNoID0gcnVuO1xuXG5cdFx0cmV0dXJuIHJhZkJhdGNoO1xuXHR9KSgpO1xuXG5cdHZhciByQUZJdCA9IGZ1bmN0aW9uKGZuLCBzaW1wbGUpe1xuXHRcdHJldHVybiBzaW1wbGUgP1xuXHRcdFx0ZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJBRihmbik7XG5cdFx0XHR9IDpcblx0XHRcdGZ1bmN0aW9uKCl7XG5cdFx0XHRcdHZhciB0aGF0ID0gdGhpcztcblx0XHRcdFx0dmFyIGFyZ3MgPSBhcmd1bWVudHM7XG5cdFx0XHRcdHJBRihmdW5jdGlvbigpe1xuXHRcdFx0XHRcdGZuLmFwcGx5KHRoYXQsIGFyZ3MpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHQ7XG5cdH07XG5cblx0dmFyIHRocm90dGxlID0gZnVuY3Rpb24oZm4pe1xuXHRcdHZhciBydW5uaW5nO1xuXHRcdHZhciBsYXN0VGltZSA9IDA7XG5cdFx0dmFyIGdEZWxheSA9IGxhenlTaXplc0NmZy50aHJvdHRsZURlbGF5O1xuXHRcdHZhciBySUNUaW1lb3V0ID0gbGF6eVNpemVzQ2ZnLnJpY1RpbWVvdXQ7XG5cdFx0dmFyIHJ1biA9IGZ1bmN0aW9uKCl7XG5cdFx0XHRydW5uaW5nID0gZmFsc2U7XG5cdFx0XHRsYXN0VGltZSA9IERhdGUubm93KCk7XG5cdFx0XHRmbigpO1xuXHRcdH07XG5cdFx0dmFyIGlkbGVDYWxsYmFjayA9IHJlcXVlc3RJZGxlQ2FsbGJhY2sgJiYgcklDVGltZW91dCA+IDQ5ID9cblx0XHRcdGZ1bmN0aW9uKCl7XG5cdFx0XHRcdHJlcXVlc3RJZGxlQ2FsbGJhY2socnVuLCB7dGltZW91dDogcklDVGltZW91dH0pO1xuXG5cdFx0XHRcdGlmKHJJQ1RpbWVvdXQgIT09IGxhenlTaXplc0NmZy5yaWNUaW1lb3V0KXtcblx0XHRcdFx0XHRySUNUaW1lb3V0ID0gbGF6eVNpemVzQ2ZnLnJpY1RpbWVvdXQ7XG5cdFx0XHRcdH1cblx0XHRcdH0gOlxuXHRcdFx0ckFGSXQoZnVuY3Rpb24oKXtcblx0XHRcdFx0c2V0VGltZW91dChydW4pO1xuXHRcdFx0fSwgdHJ1ZSlcblx0XHQ7XG5cblx0XHRyZXR1cm4gZnVuY3Rpb24oaXNQcmlvcml0eSl7XG5cdFx0XHR2YXIgZGVsYXk7XG5cblx0XHRcdGlmKChpc1ByaW9yaXR5ID0gaXNQcmlvcml0eSA9PT0gdHJ1ZSkpe1xuXHRcdFx0XHRySUNUaW1lb3V0ID0gMzM7XG5cdFx0XHR9XG5cblx0XHRcdGlmKHJ1bm5pbmcpe1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdHJ1bm5pbmcgPSAgdHJ1ZTtcblxuXHRcdFx0ZGVsYXkgPSBnRGVsYXkgLSAoRGF0ZS5ub3coKSAtIGxhc3RUaW1lKTtcblxuXHRcdFx0aWYoZGVsYXkgPCAwKXtcblx0XHRcdFx0ZGVsYXkgPSAwO1xuXHRcdFx0fVxuXG5cdFx0XHRpZihpc1ByaW9yaXR5IHx8IGRlbGF5IDwgOSl7XG5cdFx0XHRcdGlkbGVDYWxsYmFjaygpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0c2V0VGltZW91dChpZGxlQ2FsbGJhY2ssIGRlbGF5KTtcblx0XHRcdH1cblx0XHR9O1xuXHR9O1xuXG5cdC8vYmFzZWQgb24gaHR0cDovL21vZGVybmphdmFzY3JpcHQuYmxvZ3Nwb3QuZGUvMjAxMy8wOC9idWlsZGluZy1iZXR0ZXItZGVib3VuY2UuaHRtbFxuXHR2YXIgZGVib3VuY2UgPSBmdW5jdGlvbihmdW5jKSB7XG5cdFx0dmFyIHRpbWVvdXQsIHRpbWVzdGFtcDtcblx0XHR2YXIgd2FpdCA9IDk5O1xuXHRcdHZhciBydW4gPSBmdW5jdGlvbigpe1xuXHRcdFx0dGltZW91dCA9IG51bGw7XG5cdFx0XHRmdW5jKCk7XG5cdFx0fTtcblx0XHR2YXIgbGF0ZXIgPSBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBsYXN0ID0gRGF0ZS5ub3coKSAtIHRpbWVzdGFtcDtcblxuXHRcdFx0aWYgKGxhc3QgPCB3YWl0KSB7XG5cdFx0XHRcdHNldFRpbWVvdXQobGF0ZXIsIHdhaXQgLSBsYXN0KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdChyZXF1ZXN0SWRsZUNhbGxiYWNrIHx8IHJ1bikocnVuKTtcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0cmV0dXJuIGZ1bmN0aW9uKCkge1xuXHRcdFx0dGltZXN0YW1wID0gRGF0ZS5ub3coKTtcblxuXHRcdFx0aWYgKCF0aW1lb3V0KSB7XG5cdFx0XHRcdHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCB3YWl0KTtcblx0XHRcdH1cblx0XHR9O1xuXHR9O1xuXG5cdHZhciBsb2FkZXIgPSAoZnVuY3Rpb24oKXtcblx0XHR2YXIgcHJlbG9hZEVsZW1zLCBpc0NvbXBsZXRlZCwgcmVzZXRQcmVsb2FkaW5nVGltZXIsIGxvYWRNb2RlLCBzdGFydGVkO1xuXG5cdFx0dmFyIGVMdlcsIGVsdkgsIGVMdG9wLCBlTGxlZnQsIGVMcmlnaHQsIGVMYm90dG9tLCBpc0JvZHlIaWRkZW47XG5cblx0XHR2YXIgcmVnSW1nID0gL15pbWckL2k7XG5cdFx0dmFyIHJlZ0lmcmFtZSA9IC9eaWZyYW1lJC9pO1xuXG5cdFx0dmFyIHN1cHBvcnRTY3JvbGwgPSAoJ29uc2Nyb2xsJyBpbiB3aW5kb3cpICYmICEoLyhnbGV8aW5nKWJvdC8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSk7XG5cblx0XHR2YXIgc2hyaW5rRXhwYW5kID0gMDtcblx0XHR2YXIgY3VycmVudEV4cGFuZCA9IDA7XG5cblx0XHR2YXIgaXNMb2FkaW5nID0gMDtcblx0XHR2YXIgbG93UnVucyA9IC0xO1xuXG5cdFx0dmFyIHJlc2V0UHJlbG9hZGluZyA9IGZ1bmN0aW9uKGUpe1xuXHRcdFx0aXNMb2FkaW5nLS07XG5cdFx0XHRpZighZSB8fCBpc0xvYWRpbmcgPCAwIHx8ICFlLnRhcmdldCl7XG5cdFx0XHRcdGlzTG9hZGluZyA9IDA7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHZhciBpc1Zpc2libGUgPSBmdW5jdGlvbiAoZWxlbSkge1xuXHRcdFx0aWYgKGlzQm9keUhpZGRlbiA9PSBudWxsKSB7XG5cdFx0XHRcdGlzQm9keUhpZGRlbiA9IGdldENTUyhkb2N1bWVudC5ib2R5LCAndmlzaWJpbGl0eScpID09ICdoaWRkZW4nO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gaXNCb2R5SGlkZGVuIHx8ICEoZ2V0Q1NTKGVsZW0ucGFyZW50Tm9kZSwgJ3Zpc2liaWxpdHknKSA9PSAnaGlkZGVuJyAmJiBnZXRDU1MoZWxlbSwgJ3Zpc2liaWxpdHknKSA9PSAnaGlkZGVuJyk7XG5cdFx0fTtcblxuXHRcdHZhciBpc05lc3RlZFZpc2libGUgPSBmdW5jdGlvbihlbGVtLCBlbGVtRXhwYW5kKXtcblx0XHRcdHZhciBvdXRlclJlY3Q7XG5cdFx0XHR2YXIgcGFyZW50ID0gZWxlbTtcblx0XHRcdHZhciB2aXNpYmxlID0gaXNWaXNpYmxlKGVsZW0pO1xuXG5cdFx0XHRlTHRvcCAtPSBlbGVtRXhwYW5kO1xuXHRcdFx0ZUxib3R0b20gKz0gZWxlbUV4cGFuZDtcblx0XHRcdGVMbGVmdCAtPSBlbGVtRXhwYW5kO1xuXHRcdFx0ZUxyaWdodCArPSBlbGVtRXhwYW5kO1xuXG5cdFx0XHR3aGlsZSh2aXNpYmxlICYmIChwYXJlbnQgPSBwYXJlbnQub2Zmc2V0UGFyZW50KSAmJiBwYXJlbnQgIT0gZG9jdW1lbnQuYm9keSAmJiBwYXJlbnQgIT0gZG9jRWxlbSl7XG5cdFx0XHRcdHZpc2libGUgPSAoKGdldENTUyhwYXJlbnQsICdvcGFjaXR5JykgfHwgMSkgPiAwKTtcblxuXHRcdFx0XHRpZih2aXNpYmxlICYmIGdldENTUyhwYXJlbnQsICdvdmVyZmxvdycpICE9ICd2aXNpYmxlJyl7XG5cdFx0XHRcdFx0b3V0ZXJSZWN0ID0gcGFyZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXHRcdFx0XHRcdHZpc2libGUgPSBlTHJpZ2h0ID4gb3V0ZXJSZWN0LmxlZnQgJiZcblx0XHRcdFx0XHRcdGVMbGVmdCA8IG91dGVyUmVjdC5yaWdodCAmJlxuXHRcdFx0XHRcdFx0ZUxib3R0b20gPiBvdXRlclJlY3QudG9wIC0gMSAmJlxuXHRcdFx0XHRcdFx0ZUx0b3AgPCBvdXRlclJlY3QuYm90dG9tICsgMVxuXHRcdFx0XHRcdDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gdmlzaWJsZTtcblx0XHR9O1xuXG5cdFx0dmFyIGNoZWNrRWxlbWVudHMgPSBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBlTGxlbiwgaSwgcmVjdCwgYXV0b0xvYWRFbGVtLCBsb2FkZWRTb21ldGhpbmcsIGVsZW1FeHBhbmQsIGVsZW1OZWdhdGl2ZUV4cGFuZCwgZWxlbUV4cGFuZFZhbCxcblx0XHRcdFx0YmVmb3JlRXhwYW5kVmFsLCBkZWZhdWx0RXhwYW5kLCBwcmVsb2FkRXhwYW5kLCBoRmFjO1xuXHRcdFx0dmFyIGxhenlsb2FkRWxlbXMgPSBsYXp5c2l6ZXMuZWxlbWVudHM7XG5cblx0XHRcdGlmKChsb2FkTW9kZSA9IGxhenlTaXplc0NmZy5sb2FkTW9kZSkgJiYgaXNMb2FkaW5nIDwgOCAmJiAoZUxsZW4gPSBsYXp5bG9hZEVsZW1zLmxlbmd0aCkpe1xuXG5cdFx0XHRcdGkgPSAwO1xuXG5cdFx0XHRcdGxvd1J1bnMrKztcblxuXHRcdFx0XHRmb3IoOyBpIDwgZUxsZW47IGkrKyl7XG5cblx0XHRcdFx0XHRpZighbGF6eWxvYWRFbGVtc1tpXSB8fCBsYXp5bG9hZEVsZW1zW2ldLl9sYXp5UmFjZSl7Y29udGludWU7fVxuXG5cdFx0XHRcdFx0aWYoIXN1cHBvcnRTY3JvbGwgfHwgKGxhenlzaXplcy5wcmVtYXR1cmVVbnZlaWwgJiYgbGF6eXNpemVzLnByZW1hdHVyZVVudmVpbChsYXp5bG9hZEVsZW1zW2ldKSkpe3VudmVpbEVsZW1lbnQobGF6eWxvYWRFbGVtc1tpXSk7Y29udGludWU7fVxuXG5cdFx0XHRcdFx0aWYoIShlbGVtRXhwYW5kVmFsID0gbGF6eWxvYWRFbGVtc1tpXVtfZ2V0QXR0cmlidXRlXSgnZGF0YS1leHBhbmQnKSkgfHwgIShlbGVtRXhwYW5kID0gZWxlbUV4cGFuZFZhbCAqIDEpKXtcblx0XHRcdFx0XHRcdGVsZW1FeHBhbmQgPSBjdXJyZW50RXhwYW5kO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmICghZGVmYXVsdEV4cGFuZCkge1xuXHRcdFx0XHRcdFx0ZGVmYXVsdEV4cGFuZCA9ICghbGF6eVNpemVzQ2ZnLmV4cGFuZCB8fCBsYXp5U2l6ZXNDZmcuZXhwYW5kIDwgMSkgP1xuXHRcdFx0XHRcdFx0XHRkb2NFbGVtLmNsaWVudEhlaWdodCA+IDUwMCAmJiBkb2NFbGVtLmNsaWVudFdpZHRoID4gNTAwID8gNTAwIDogMzcwIDpcblx0XHRcdFx0XHRcdFx0bGF6eVNpemVzQ2ZnLmV4cGFuZDtcblxuXHRcdFx0XHRcdFx0bGF6eXNpemVzLl9kZWZFeCA9IGRlZmF1bHRFeHBhbmQ7XG5cblx0XHRcdFx0XHRcdHByZWxvYWRFeHBhbmQgPSBkZWZhdWx0RXhwYW5kICogbGF6eVNpemVzQ2ZnLmV4cEZhY3Rvcjtcblx0XHRcdFx0XHRcdGhGYWMgPSBsYXp5U2l6ZXNDZmcuaEZhYztcblx0XHRcdFx0XHRcdGlzQm9keUhpZGRlbiA9IG51bGw7XG5cblx0XHRcdFx0XHRcdGlmKGN1cnJlbnRFeHBhbmQgPCBwcmVsb2FkRXhwYW5kICYmIGlzTG9hZGluZyA8IDEgJiYgbG93UnVucyA+IDIgJiYgbG9hZE1vZGUgPiAyICYmICFkb2N1bWVudC5oaWRkZW4pe1xuXHRcdFx0XHRcdFx0XHRjdXJyZW50RXhwYW5kID0gcHJlbG9hZEV4cGFuZDtcblx0XHRcdFx0XHRcdFx0bG93UnVucyA9IDA7XG5cdFx0XHRcdFx0XHR9IGVsc2UgaWYobG9hZE1vZGUgPiAxICYmIGxvd1J1bnMgPiAxICYmIGlzTG9hZGluZyA8IDYpe1xuXHRcdFx0XHRcdFx0XHRjdXJyZW50RXhwYW5kID0gZGVmYXVsdEV4cGFuZDtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdGN1cnJlbnRFeHBhbmQgPSBzaHJpbmtFeHBhbmQ7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYoYmVmb3JlRXhwYW5kVmFsICE9PSBlbGVtRXhwYW5kKXtcblx0XHRcdFx0XHRcdGVMdlcgPSBpbm5lcldpZHRoICsgKGVsZW1FeHBhbmQgKiBoRmFjKTtcblx0XHRcdFx0XHRcdGVsdkggPSBpbm5lckhlaWdodCArIGVsZW1FeHBhbmQ7XG5cdFx0XHRcdFx0XHRlbGVtTmVnYXRpdmVFeHBhbmQgPSBlbGVtRXhwYW5kICogLTE7XG5cdFx0XHRcdFx0XHRiZWZvcmVFeHBhbmRWYWwgPSBlbGVtRXhwYW5kO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHJlY3QgPSBsYXp5bG9hZEVsZW1zW2ldLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG5cdFx0XHRcdFx0aWYgKChlTGJvdHRvbSA9IHJlY3QuYm90dG9tKSA+PSBlbGVtTmVnYXRpdmVFeHBhbmQgJiZcblx0XHRcdFx0XHRcdChlTHRvcCA9IHJlY3QudG9wKSA8PSBlbHZIICYmXG5cdFx0XHRcdFx0XHQoZUxyaWdodCA9IHJlY3QucmlnaHQpID49IGVsZW1OZWdhdGl2ZUV4cGFuZCAqIGhGYWMgJiZcblx0XHRcdFx0XHRcdChlTGxlZnQgPSByZWN0LmxlZnQpIDw9IGVMdlcgJiZcblx0XHRcdFx0XHRcdChlTGJvdHRvbSB8fCBlTHJpZ2h0IHx8IGVMbGVmdCB8fCBlTHRvcCkgJiZcblx0XHRcdFx0XHRcdChsYXp5U2l6ZXNDZmcubG9hZEhpZGRlbiB8fCBpc1Zpc2libGUobGF6eWxvYWRFbGVtc1tpXSkpICYmXG5cdFx0XHRcdFx0XHQoKGlzQ29tcGxldGVkICYmIGlzTG9hZGluZyA8IDMgJiYgIWVsZW1FeHBhbmRWYWwgJiYgKGxvYWRNb2RlIDwgMyB8fCBsb3dSdW5zIDwgNCkpIHx8IGlzTmVzdGVkVmlzaWJsZShsYXp5bG9hZEVsZW1zW2ldLCBlbGVtRXhwYW5kKSkpe1xuXHRcdFx0XHRcdFx0dW52ZWlsRWxlbWVudChsYXp5bG9hZEVsZW1zW2ldKTtcblx0XHRcdFx0XHRcdGxvYWRlZFNvbWV0aGluZyA9IHRydWU7XG5cdFx0XHRcdFx0XHRpZihpc0xvYWRpbmcgPiA5KXticmVhazt9XG5cdFx0XHRcdFx0fSBlbHNlIGlmKCFsb2FkZWRTb21ldGhpbmcgJiYgaXNDb21wbGV0ZWQgJiYgIWF1dG9Mb2FkRWxlbSAmJlxuXHRcdFx0XHRcdFx0aXNMb2FkaW5nIDwgNCAmJiBsb3dSdW5zIDwgNCAmJiBsb2FkTW9kZSA+IDIgJiZcblx0XHRcdFx0XHRcdChwcmVsb2FkRWxlbXNbMF0gfHwgbGF6eVNpemVzQ2ZnLnByZWxvYWRBZnRlckxvYWQpICYmXG5cdFx0XHRcdFx0XHQocHJlbG9hZEVsZW1zWzBdIHx8ICghZWxlbUV4cGFuZFZhbCAmJiAoKGVMYm90dG9tIHx8IGVMcmlnaHQgfHwgZUxsZWZ0IHx8IGVMdG9wKSB8fCBsYXp5bG9hZEVsZW1zW2ldW19nZXRBdHRyaWJ1dGVdKGxhenlTaXplc0NmZy5zaXplc0F0dHIpICE9ICdhdXRvJykpKSl7XG5cdFx0XHRcdFx0XHRhdXRvTG9hZEVsZW0gPSBwcmVsb2FkRWxlbXNbMF0gfHwgbGF6eWxvYWRFbGVtc1tpXTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZihhdXRvTG9hZEVsZW0gJiYgIWxvYWRlZFNvbWV0aGluZyl7XG5cdFx0XHRcdFx0dW52ZWlsRWxlbWVudChhdXRvTG9hZEVsZW0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHZhciB0aHJvdHRsZWRDaGVja0VsZW1lbnRzID0gdGhyb3R0bGUoY2hlY2tFbGVtZW50cyk7XG5cblx0XHR2YXIgc3dpdGNoTG9hZGluZ0NsYXNzID0gZnVuY3Rpb24oZSl7XG5cdFx0XHR2YXIgZWxlbSA9IGUudGFyZ2V0O1xuXG5cdFx0XHRpZiAoZWxlbS5fbGF6eUNhY2hlKSB7XG5cdFx0XHRcdGRlbGV0ZSBlbGVtLl9sYXp5Q2FjaGU7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0cmVzZXRQcmVsb2FkaW5nKGUpO1xuXHRcdFx0YWRkQ2xhc3MoZWxlbSwgbGF6eVNpemVzQ2ZnLmxvYWRlZENsYXNzKTtcblx0XHRcdHJlbW92ZUNsYXNzKGVsZW0sIGxhenlTaXplc0NmZy5sb2FkaW5nQ2xhc3MpO1xuXHRcdFx0YWRkUmVtb3ZlTG9hZEV2ZW50cyhlbGVtLCByYWZTd2l0Y2hMb2FkaW5nQ2xhc3MpO1xuXHRcdFx0dHJpZ2dlckV2ZW50KGVsZW0sICdsYXp5bG9hZGVkJyk7XG5cdFx0fTtcblx0XHR2YXIgcmFmZWRTd2l0Y2hMb2FkaW5nQ2xhc3MgPSByQUZJdChzd2l0Y2hMb2FkaW5nQ2xhc3MpO1xuXHRcdHZhciByYWZTd2l0Y2hMb2FkaW5nQ2xhc3MgPSBmdW5jdGlvbihlKXtcblx0XHRcdHJhZmVkU3dpdGNoTG9hZGluZ0NsYXNzKHt0YXJnZXQ6IGUudGFyZ2V0fSk7XG5cdFx0fTtcblxuXHRcdHZhciBjaGFuZ2VJZnJhbWVTcmMgPSBmdW5jdGlvbihlbGVtLCBzcmMpe1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0ZWxlbS5jb250ZW50V2luZG93LmxvY2F0aW9uLnJlcGxhY2Uoc3JjKTtcblx0XHRcdH0gY2F0Y2goZSl7XG5cdFx0XHRcdGVsZW0uc3JjID0gc3JjO1xuXHRcdFx0fVxuXHRcdH07XG5cblx0XHR2YXIgaGFuZGxlU291cmNlcyA9IGZ1bmN0aW9uKHNvdXJjZSl7XG5cdFx0XHR2YXIgY3VzdG9tTWVkaWE7XG5cblx0XHRcdHZhciBzb3VyY2VTcmNzZXQgPSBzb3VyY2VbX2dldEF0dHJpYnV0ZV0obGF6eVNpemVzQ2ZnLnNyY3NldEF0dHIpO1xuXG5cdFx0XHRpZiggKGN1c3RvbU1lZGlhID0gbGF6eVNpemVzQ2ZnLmN1c3RvbU1lZGlhW3NvdXJjZVtfZ2V0QXR0cmlidXRlXSgnZGF0YS1tZWRpYScpIHx8IHNvdXJjZVtfZ2V0QXR0cmlidXRlXSgnbWVkaWEnKV0pICl7XG5cdFx0XHRcdHNvdXJjZS5zZXRBdHRyaWJ1dGUoJ21lZGlhJywgY3VzdG9tTWVkaWEpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZihzb3VyY2VTcmNzZXQpe1xuXHRcdFx0XHRzb3VyY2Uuc2V0QXR0cmlidXRlKCdzcmNzZXQnLCBzb3VyY2VTcmNzZXQpO1xuXHRcdFx0fVxuXHRcdH07XG5cblx0XHR2YXIgbGF6eVVudmVpbCA9IHJBRkl0KGZ1bmN0aW9uIChlbGVtLCBkZXRhaWwsIGlzQXV0bywgc2l6ZXMsIGlzSW1nKXtcblx0XHRcdHZhciBzcmMsIHNyY3NldCwgcGFyZW50LCBpc1BpY3R1cmUsIGV2ZW50LCBmaXJlc0xvYWQ7XG5cblx0XHRcdGlmKCEoZXZlbnQgPSB0cmlnZ2VyRXZlbnQoZWxlbSwgJ2xhenliZWZvcmV1bnZlaWwnLCBkZXRhaWwpKS5kZWZhdWx0UHJldmVudGVkKXtcblxuXHRcdFx0XHRpZihzaXplcyl7XG5cdFx0XHRcdFx0aWYoaXNBdXRvKXtcblx0XHRcdFx0XHRcdGFkZENsYXNzKGVsZW0sIGxhenlTaXplc0NmZy5hdXRvc2l6ZXNDbGFzcyk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGVsZW0uc2V0QXR0cmlidXRlKCdzaXplcycsIHNpemVzKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRzcmNzZXQgPSBlbGVtW19nZXRBdHRyaWJ1dGVdKGxhenlTaXplc0NmZy5zcmNzZXRBdHRyKTtcblx0XHRcdFx0c3JjID0gZWxlbVtfZ2V0QXR0cmlidXRlXShsYXp5U2l6ZXNDZmcuc3JjQXR0cik7XG5cblx0XHRcdFx0aWYoaXNJbWcpIHtcblx0XHRcdFx0XHRwYXJlbnQgPSBlbGVtLnBhcmVudE5vZGU7XG5cdFx0XHRcdFx0aXNQaWN0dXJlID0gcGFyZW50ICYmIHJlZ1BpY3R1cmUudGVzdChwYXJlbnQubm9kZU5hbWUgfHwgJycpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0ZmlyZXNMb2FkID0gZGV0YWlsLmZpcmVzTG9hZCB8fCAoKCdzcmMnIGluIGVsZW0pICYmIChzcmNzZXQgfHwgc3JjIHx8IGlzUGljdHVyZSkpO1xuXG5cdFx0XHRcdGV2ZW50ID0ge3RhcmdldDogZWxlbX07XG5cblx0XHRcdFx0YWRkQ2xhc3MoZWxlbSwgbGF6eVNpemVzQ2ZnLmxvYWRpbmdDbGFzcyk7XG5cblx0XHRcdFx0aWYoZmlyZXNMb2FkKXtcblx0XHRcdFx0XHRjbGVhclRpbWVvdXQocmVzZXRQcmVsb2FkaW5nVGltZXIpO1xuXHRcdFx0XHRcdHJlc2V0UHJlbG9hZGluZ1RpbWVyID0gc2V0VGltZW91dChyZXNldFByZWxvYWRpbmcsIDI1MDApO1xuXHRcdFx0XHRcdGFkZFJlbW92ZUxvYWRFdmVudHMoZWxlbSwgcmFmU3dpdGNoTG9hZGluZ0NsYXNzLCB0cnVlKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmKGlzUGljdHVyZSl7XG5cdFx0XHRcdFx0Zm9yRWFjaC5jYWxsKHBhcmVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc291cmNlJyksIGhhbmRsZVNvdXJjZXMpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYoc3Jjc2V0KXtcblx0XHRcdFx0XHRlbGVtLnNldEF0dHJpYnV0ZSgnc3Jjc2V0Jywgc3Jjc2V0KTtcblx0XHRcdFx0fSBlbHNlIGlmKHNyYyAmJiAhaXNQaWN0dXJlKXtcblx0XHRcdFx0XHRpZihyZWdJZnJhbWUudGVzdChlbGVtLm5vZGVOYW1lKSl7XG5cdFx0XHRcdFx0XHRjaGFuZ2VJZnJhbWVTcmMoZWxlbSwgc3JjKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0ZWxlbS5zcmMgPSBzcmM7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYoaXNJbWcgJiYgKHNyY3NldCB8fCBpc1BpY3R1cmUpKXtcblx0XHRcdFx0XHR1cGRhdGVQb2x5ZmlsbChlbGVtLCB7c3JjOiBzcmN9KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpZihlbGVtLl9sYXp5UmFjZSl7XG5cdFx0XHRcdGRlbGV0ZSBlbGVtLl9sYXp5UmFjZTtcblx0XHRcdH1cblx0XHRcdHJlbW92ZUNsYXNzKGVsZW0sIGxhenlTaXplc0NmZy5sYXp5Q2xhc3MpO1xuXG5cdFx0XHRyQUYoZnVuY3Rpb24oKXtcblx0XHRcdFx0Ly8gUGFydCBvZiB0aGlzIGNhbiBiZSByZW1vdmVkIGFzIHNvb24gYXMgdGhpcyBmaXggaXMgb2xkZXI6IGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTc3MzEgKDIwMTUpXG5cdFx0XHRcdHZhciBpc0xvYWRlZCA9IGVsZW0uY29tcGxldGUgJiYgZWxlbS5uYXR1cmFsV2lkdGggPiAxO1xuXG5cdFx0XHRcdGlmKCAhZmlyZXNMb2FkIHx8IGlzTG9hZGVkKXtcblx0XHRcdFx0XHRpZiAoaXNMb2FkZWQpIHtcblx0XHRcdFx0XHRcdGFkZENsYXNzKGVsZW0sICdscy1pcy1jYWNoZWQnKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0c3dpdGNoTG9hZGluZ0NsYXNzKGV2ZW50KTtcblx0XHRcdFx0XHRlbGVtLl9sYXp5Q2FjaGUgPSB0cnVlO1xuXHRcdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblx0XHRcdFx0XHRcdGlmICgnX2xhenlDYWNoZScgaW4gZWxlbSkge1xuXHRcdFx0XHRcdFx0XHRkZWxldGUgZWxlbS5fbGF6eUNhY2hlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0sIDkpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChlbGVtLmxvYWRpbmcgPT0gJ2xhenknKSB7XG5cdFx0XHRcdFx0aXNMb2FkaW5nLS07XG5cdFx0XHRcdH1cblx0XHRcdH0sIHRydWUpO1xuXHRcdH0pO1xuXG5cdFx0dmFyIHVudmVpbEVsZW1lbnQgPSBmdW5jdGlvbiAoZWxlbSl7XG5cdFx0XHRpZiAoZWxlbS5fbGF6eVJhY2UpIHtyZXR1cm47fVxuXHRcdFx0dmFyIGRldGFpbDtcblxuXHRcdFx0dmFyIGlzSW1nID0gcmVnSW1nLnRlc3QoZWxlbS5ub2RlTmFtZSk7XG5cblx0XHRcdC8vYWxsb3cgdXNpbmcgc2l6ZXM9XCJhdXRvXCIsIGJ1dCBkb24ndCB1c2UuIGl0J3MgaW52YWxpZC4gVXNlIGRhdGEtc2l6ZXM9XCJhdXRvXCIgb3IgYSB2YWxpZCB2YWx1ZSBmb3Igc2l6ZXMgaW5zdGVhZCAoaS5lLjogc2l6ZXM9XCI4MHZ3XCIpXG5cdFx0XHR2YXIgc2l6ZXMgPSBpc0ltZyAmJiAoZWxlbVtfZ2V0QXR0cmlidXRlXShsYXp5U2l6ZXNDZmcuc2l6ZXNBdHRyKSB8fCBlbGVtW19nZXRBdHRyaWJ1dGVdKCdzaXplcycpKTtcblx0XHRcdHZhciBpc0F1dG8gPSBzaXplcyA9PSAnYXV0byc7XG5cblx0XHRcdGlmKCAoaXNBdXRvIHx8ICFpc0NvbXBsZXRlZCkgJiYgaXNJbWcgJiYgKGVsZW1bX2dldEF0dHJpYnV0ZV0oJ3NyYycpIHx8IGVsZW0uc3Jjc2V0KSAmJiAhZWxlbS5jb21wbGV0ZSAmJiAhaGFzQ2xhc3MoZWxlbSwgbGF6eVNpemVzQ2ZnLmVycm9yQ2xhc3MpICYmIGhhc0NsYXNzKGVsZW0sIGxhenlTaXplc0NmZy5sYXp5Q2xhc3MpKXtyZXR1cm47fVxuXG5cdFx0XHRkZXRhaWwgPSB0cmlnZ2VyRXZlbnQoZWxlbSwgJ2xhenl1bnZlaWxyZWFkJykuZGV0YWlsO1xuXG5cdFx0XHRpZihpc0F1dG8pe1xuXHRcdFx0XHQgYXV0b1NpemVyLnVwZGF0ZUVsZW0oZWxlbSwgdHJ1ZSwgZWxlbS5vZmZzZXRXaWR0aCk7XG5cdFx0XHR9XG5cblx0XHRcdGVsZW0uX2xhenlSYWNlID0gdHJ1ZTtcblx0XHRcdGlzTG9hZGluZysrO1xuXG5cdFx0XHRsYXp5VW52ZWlsKGVsZW0sIGRldGFpbCwgaXNBdXRvLCBzaXplcywgaXNJbWcpO1xuXHRcdH07XG5cblx0XHR2YXIgYWZ0ZXJTY3JvbGwgPSBkZWJvdW5jZShmdW5jdGlvbigpe1xuXHRcdFx0bGF6eVNpemVzQ2ZnLmxvYWRNb2RlID0gMztcblx0XHRcdHRocm90dGxlZENoZWNrRWxlbWVudHMoKTtcblx0XHR9KTtcblxuXHRcdHZhciBhbHRMb2FkbW9kZVNjcm9sbExpc3RuZXIgPSBmdW5jdGlvbigpe1xuXHRcdFx0aWYobGF6eVNpemVzQ2ZnLmxvYWRNb2RlID09IDMpe1xuXHRcdFx0XHRsYXp5U2l6ZXNDZmcubG9hZE1vZGUgPSAyO1xuXHRcdFx0fVxuXHRcdFx0YWZ0ZXJTY3JvbGwoKTtcblx0XHR9O1xuXG5cdFx0dmFyIG9ubG9hZCA9IGZ1bmN0aW9uKCl7XG5cdFx0XHRpZihpc0NvbXBsZXRlZCl7cmV0dXJuO31cblx0XHRcdGlmKERhdGUubm93KCkgLSBzdGFydGVkIDwgOTk5KXtcblx0XHRcdFx0c2V0VGltZW91dChvbmxvYWQsIDk5OSk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXG5cdFx0XHRpc0NvbXBsZXRlZCA9IHRydWU7XG5cblx0XHRcdGxhenlTaXplc0NmZy5sb2FkTW9kZSA9IDM7XG5cblx0XHRcdHRocm90dGxlZENoZWNrRWxlbWVudHMoKTtcblxuXHRcdFx0YWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgYWx0TG9hZG1vZGVTY3JvbGxMaXN0bmVyLCB0cnVlKTtcblx0XHR9O1xuXG5cdFx0cmV0dXJuIHtcblx0XHRcdF86IGZ1bmN0aW9uKCl7XG5cdFx0XHRcdHN0YXJ0ZWQgPSBEYXRlLm5vdygpO1xuXG5cdFx0XHRcdGxhenlzaXplcy5lbGVtZW50cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUobGF6eVNpemVzQ2ZnLmxhenlDbGFzcyk7XG5cdFx0XHRcdHByZWxvYWRFbGVtcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUobGF6eVNpemVzQ2ZnLmxhenlDbGFzcyArICcgJyArIGxhenlTaXplc0NmZy5wcmVsb2FkQ2xhc3MpO1xuXG5cdFx0XHRcdGFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRocm90dGxlZENoZWNrRWxlbWVudHMsIHRydWUpO1xuXG5cdFx0XHRcdGFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRocm90dGxlZENoZWNrRWxlbWVudHMsIHRydWUpO1xuXG5cdFx0XHRcdGFkZEV2ZW50TGlzdGVuZXIoJ3BhZ2VzaG93JywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHRpZiAoZS5wZXJzaXN0ZWQpIHtcblx0XHRcdFx0XHRcdHZhciBsb2FkaW5nRWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuJyArIGxhenlTaXplc0NmZy5sb2FkaW5nQ2xhc3MpO1xuXG5cdFx0XHRcdFx0XHRpZiAobG9hZGluZ0VsZW1lbnRzLmxlbmd0aCAmJiBsb2FkaW5nRWxlbWVudHMuZm9yRWFjaCkge1xuXHRcdFx0XHRcdFx0XHRyZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0XHRcdGxvYWRpbmdFbGVtZW50cy5mb3JFYWNoKCBmdW5jdGlvbiAoaW1nKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoaW1nLmNvbXBsZXRlKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHVudmVpbEVsZW1lbnQoaW1nKTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRpZih3aW5kb3cuTXV0YXRpb25PYnNlcnZlcil7XG5cdFx0XHRcdFx0bmV3IE11dGF0aW9uT2JzZXJ2ZXIoIHRocm90dGxlZENoZWNrRWxlbWVudHMgKS5vYnNlcnZlKCBkb2NFbGVtLCB7Y2hpbGRMaXN0OiB0cnVlLCBzdWJ0cmVlOiB0cnVlLCBhdHRyaWJ1dGVzOiB0cnVlfSApO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGRvY0VsZW1bX2FkZEV2ZW50TGlzdGVuZXJdKCdET01Ob2RlSW5zZXJ0ZWQnLCB0aHJvdHRsZWRDaGVja0VsZW1lbnRzLCB0cnVlKTtcblx0XHRcdFx0XHRkb2NFbGVtW19hZGRFdmVudExpc3RlbmVyXSgnRE9NQXR0ck1vZGlmaWVkJywgdGhyb3R0bGVkQ2hlY2tFbGVtZW50cywgdHJ1ZSk7XG5cdFx0XHRcdFx0c2V0SW50ZXJ2YWwodGhyb3R0bGVkQ2hlY2tFbGVtZW50cywgOTk5KTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGFkZEV2ZW50TGlzdGVuZXIoJ2hhc2hjaGFuZ2UnLCB0aHJvdHRsZWRDaGVja0VsZW1lbnRzLCB0cnVlKTtcblxuXHRcdFx0XHQvLywgJ2Z1bGxzY3JlZW5jaGFuZ2UnXG5cdFx0XHRcdFsnZm9jdXMnLCAnbW91c2VvdmVyJywgJ2NsaWNrJywgJ2xvYWQnLCAndHJhbnNpdGlvbmVuZCcsICdhbmltYXRpb25lbmQnXS5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpe1xuXHRcdFx0XHRcdGRvY3VtZW50W19hZGRFdmVudExpc3RlbmVyXShuYW1lLCB0aHJvdHRsZWRDaGVja0VsZW1lbnRzLCB0cnVlKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0aWYoKC9kJHxeYy8udGVzdChkb2N1bWVudC5yZWFkeVN0YXRlKSkpe1xuXHRcdFx0XHRcdG9ubG9hZCgpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBvbmxvYWQpO1xuXHRcdFx0XHRcdGRvY3VtZW50W19hZGRFdmVudExpc3RlbmVyXSgnRE9NQ29udGVudExvYWRlZCcsIHRocm90dGxlZENoZWNrRWxlbWVudHMpO1xuXHRcdFx0XHRcdHNldFRpbWVvdXQob25sb2FkLCAyMDAwMCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZihsYXp5c2l6ZXMuZWxlbWVudHMubGVuZ3RoKXtcblx0XHRcdFx0XHRjaGVja0VsZW1lbnRzKCk7XG5cdFx0XHRcdFx0ckFGLl9sc0ZsdXNoKCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhyb3R0bGVkQ2hlY2tFbGVtZW50cygpO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0Y2hlY2tFbGVtczogdGhyb3R0bGVkQ2hlY2tFbGVtZW50cyxcblx0XHRcdHVudmVpbDogdW52ZWlsRWxlbWVudCxcblx0XHRcdF9hTFNMOiBhbHRMb2FkbW9kZVNjcm9sbExpc3RuZXIsXG5cdFx0fTtcblx0fSkoKTtcblxuXG5cdHZhciBhdXRvU2l6ZXIgPSAoZnVuY3Rpb24oKXtcblx0XHR2YXIgYXV0b3NpemVzRWxlbXM7XG5cblx0XHR2YXIgc2l6ZUVsZW1lbnQgPSByQUZJdChmdW5jdGlvbihlbGVtLCBwYXJlbnQsIGV2ZW50LCB3aWR0aCl7XG5cdFx0XHR2YXIgc291cmNlcywgaSwgbGVuO1xuXHRcdFx0ZWxlbS5fbGF6eXNpemVzV2lkdGggPSB3aWR0aDtcblx0XHRcdHdpZHRoICs9ICdweCc7XG5cblx0XHRcdGVsZW0uc2V0QXR0cmlidXRlKCdzaXplcycsIHdpZHRoKTtcblxuXHRcdFx0aWYocmVnUGljdHVyZS50ZXN0KHBhcmVudC5ub2RlTmFtZSB8fCAnJykpe1xuXHRcdFx0XHRzb3VyY2VzID0gcGFyZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzb3VyY2UnKTtcblx0XHRcdFx0Zm9yKGkgPSAwLCBsZW4gPSBzb3VyY2VzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKXtcblx0XHRcdFx0XHRzb3VyY2VzW2ldLnNldEF0dHJpYnV0ZSgnc2l6ZXMnLCB3aWR0aCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0aWYoIWV2ZW50LmRldGFpbC5kYXRhQXR0cil7XG5cdFx0XHRcdHVwZGF0ZVBvbHlmaWxsKGVsZW0sIGV2ZW50LmRldGFpbCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0dmFyIGdldFNpemVFbGVtZW50ID0gZnVuY3Rpb24gKGVsZW0sIGRhdGFBdHRyLCB3aWR0aCl7XG5cdFx0XHR2YXIgZXZlbnQ7XG5cdFx0XHR2YXIgcGFyZW50ID0gZWxlbS5wYXJlbnROb2RlO1xuXG5cdFx0XHRpZihwYXJlbnQpe1xuXHRcdFx0XHR3aWR0aCA9IGdldFdpZHRoKGVsZW0sIHBhcmVudCwgd2lkdGgpO1xuXHRcdFx0XHRldmVudCA9IHRyaWdnZXJFdmVudChlbGVtLCAnbGF6eWJlZm9yZXNpemVzJywge3dpZHRoOiB3aWR0aCwgZGF0YUF0dHI6ICEhZGF0YUF0dHJ9KTtcblxuXHRcdFx0XHRpZighZXZlbnQuZGVmYXVsdFByZXZlbnRlZCl7XG5cdFx0XHRcdFx0d2lkdGggPSBldmVudC5kZXRhaWwud2lkdGg7XG5cblx0XHRcdFx0XHRpZih3aWR0aCAmJiB3aWR0aCAhPT0gZWxlbS5fbGF6eXNpemVzV2lkdGgpe1xuXHRcdFx0XHRcdFx0c2l6ZUVsZW1lbnQoZWxlbSwgcGFyZW50LCBldmVudCwgd2lkdGgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH07XG5cblx0XHR2YXIgdXBkYXRlRWxlbWVudHNTaXplcyA9IGZ1bmN0aW9uKCl7XG5cdFx0XHR2YXIgaTtcblx0XHRcdHZhciBsZW4gPSBhdXRvc2l6ZXNFbGVtcy5sZW5ndGg7XG5cdFx0XHRpZihsZW4pe1xuXHRcdFx0XHRpID0gMDtcblxuXHRcdFx0XHRmb3IoOyBpIDwgbGVuOyBpKyspe1xuXHRcdFx0XHRcdGdldFNpemVFbGVtZW50KGF1dG9zaXplc0VsZW1zW2ldKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH07XG5cblx0XHR2YXIgZGVib3VuY2VkVXBkYXRlRWxlbWVudHNTaXplcyA9IGRlYm91bmNlKHVwZGF0ZUVsZW1lbnRzU2l6ZXMpO1xuXG5cdFx0cmV0dXJuIHtcblx0XHRcdF86IGZ1bmN0aW9uKCl7XG5cdFx0XHRcdGF1dG9zaXplc0VsZW1zID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShsYXp5U2l6ZXNDZmcuYXV0b3NpemVzQ2xhc3MpO1xuXHRcdFx0XHRhZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBkZWJvdW5jZWRVcGRhdGVFbGVtZW50c1NpemVzKTtcblx0XHRcdH0sXG5cdFx0XHRjaGVja0VsZW1zOiBkZWJvdW5jZWRVcGRhdGVFbGVtZW50c1NpemVzLFxuXHRcdFx0dXBkYXRlRWxlbTogZ2V0U2l6ZUVsZW1lbnRcblx0XHR9O1xuXHR9KSgpO1xuXG5cdHZhciBpbml0ID0gZnVuY3Rpb24oKXtcblx0XHRpZighaW5pdC5pICYmIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUpe1xuXHRcdFx0aW5pdC5pID0gdHJ1ZTtcblx0XHRcdGF1dG9TaXplci5fKCk7XG5cdFx0XHRsb2FkZXIuXygpO1xuXHRcdH1cblx0fTtcblxuXHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG5cdFx0aWYobGF6eVNpemVzQ2ZnLmluaXQpe1xuXHRcdFx0aW5pdCgpO1xuXHRcdH1cblx0fSk7XG5cblx0bGF6eXNpemVzID0ge1xuXHRcdGNmZzogbGF6eVNpemVzQ2ZnLFxuXHRcdGF1dG9TaXplcjogYXV0b1NpemVyLFxuXHRcdGxvYWRlcjogbG9hZGVyLFxuXHRcdGluaXQ6IGluaXQsXG5cdFx0dVA6IHVwZGF0ZVBvbHlmaWxsLFxuXHRcdGFDOiBhZGRDbGFzcyxcblx0XHRyQzogcmVtb3ZlQ2xhc3MsXG5cdFx0aEM6IGhhc0NsYXNzLFxuXHRcdGZpcmU6IHRyaWdnZXJFdmVudCxcblx0XHRnVzogZ2V0V2lkdGgsXG5cdFx0ckFGOiByQUYsXG5cdH07XG5cblx0cmV0dXJuIGxhenlzaXplcztcbn1cbikpO1xuIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcblxucHJvY2Vzcy5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gW10gfVxuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcbiIsIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcInNjcm9sbExvY2tcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wic2Nyb2xsTG9ja1wiXSA9IGZhY3RvcnkoKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIC8qKioqKiovIChmdW5jdGlvbihtb2R1bGVzKSB7IC8vIHdlYnBhY2tCb290c3RyYXBcbi8qKioqKiovIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuLyoqKioqKi8gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbi8qKioqKiovIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbi8qKioqKiovIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuLyoqKioqKi8gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4vKioqKioqLyBcdFx0fVxuLyoqKioqKi8gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4vKioqKioqLyBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuLyoqKioqKi8gXHRcdFx0aTogbW9kdWxlSWQsXG4vKioqKioqLyBcdFx0XHRsOiBmYWxzZSxcbi8qKioqKiovIFx0XHRcdGV4cG9ydHM6IHt9XG4vKioqKioqLyBcdFx0fTtcbi8qKioqKiovXG4vKioqKioqLyBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4vKioqKioqLyBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG4vKioqKioqL1xuLyoqKioqKi8gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbi8qKioqKiovIFx0XHRtb2R1bGUubCA9IHRydWU7XG4vKioqKioqL1xuLyoqKioqKi8gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4vKioqKioqLyBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuLyoqKioqKi8gXHR9XG4vKioqKioqL1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4vKioqKioqLyBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuLyoqKioqKi8gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4vKioqKioqLyBcdFx0fVxuLyoqKioqKi8gXHR9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4vKioqKioqLyBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4vKioqKioqLyBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbi8qKioqKiovIFx0XHR9XG4vKioqKioqLyBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKioqKiovIFx0fTtcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuLyoqKioqKi8gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbi8qKioqKiovIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4vKioqKioqLyBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuLyoqKioqKi8gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4vKioqKioqLyBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4vKioqKioqLyBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbi8qKioqKiovIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuLyoqKioqKi8gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4vKioqKioqLyBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbi8qKioqKiovIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4vKioqKioqLyBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuLyoqKioqKi8gXHRcdHJldHVybiBucztcbi8qKioqKiovIFx0fTtcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuLyoqKioqKi8gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuLyoqKioqKi8gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbi8qKioqKiovIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4vKioqKioqLyBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuLyoqKioqKi8gXHRcdHJldHVybiBnZXR0ZXI7XG4vKioqKioqLyBcdH07XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcbi8qKioqKiovXG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8qKioqKiovIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG4vKioqKioqLyB9KVxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKioqKiovIChbXG4vKiAwICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBfX3dlYnBhY2tfZXhwb3J0c19fLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yKF9fd2VicGFja19leHBvcnRzX18pO1xuXG4vLyBDT05DQVRFTkFURUQgTU9EVUxFOiAuL3NyYy90b29scy5qc1xudmFyIGFyZ3VtZW50QXNBcnJheSA9IGZ1bmN0aW9uIGFyZ3VtZW50QXNBcnJheShhcmd1bWVudCkge1xuICByZXR1cm4gQXJyYXkuaXNBcnJheShhcmd1bWVudCkgPyBhcmd1bWVudCA6IFthcmd1bWVudF07XG59O1xudmFyIGlzRWxlbWVudCA9IGZ1bmN0aW9uIGlzRWxlbWVudCh0YXJnZXQpIHtcbiAgcmV0dXJuIHRhcmdldCBpbnN0YW5jZW9mIE5vZGU7XG59O1xudmFyIGlzRWxlbWVudExpc3QgPSBmdW5jdGlvbiBpc0VsZW1lbnRMaXN0KG5vZGVMaXN0KSB7XG4gIHJldHVybiBub2RlTGlzdCBpbnN0YW5jZW9mIE5vZGVMaXN0O1xufTtcbnZhciBlYWNoTm9kZSA9IGZ1bmN0aW9uIGVhY2hOb2RlKG5vZGVMaXN0LCBjYWxsYmFjaykge1xuICBpZiAobm9kZUxpc3QgJiYgY2FsbGJhY2spIHtcbiAgICBub2RlTGlzdCA9IGlzRWxlbWVudExpc3Qobm9kZUxpc3QpID8gbm9kZUxpc3QgOiBbbm9kZUxpc3RdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBub2RlTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGNhbGxiYWNrKG5vZGVMaXN0W2ldLCBpLCBub2RlTGlzdC5sZW5ndGgpID09PSB0cnVlKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcbnZhciB0aHJvd0Vycm9yID0gZnVuY3Rpb24gdGhyb3dFcnJvcihtZXNzYWdlKSB7XG4gIHJldHVybiBjb25zb2xlLmVycm9yKFwiW3Njcm9sbC1sb2NrXSBcIi5jb25jYXQobWVzc2FnZSkpO1xufTtcbnZhciBhcnJheUFzU2VsZWN0b3IgPSBmdW5jdGlvbiBhcnJheUFzU2VsZWN0b3IoYXJyYXkpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYXJyYXkpKSB7XG4gICAgdmFyIHNlbGVjdG9yID0gYXJyYXkuam9pbignLCAnKTtcbiAgICByZXR1cm4gc2VsZWN0b3I7XG4gIH1cbn07XG52YXIgbm9kZUxpc3RBc0FycmF5ID0gZnVuY3Rpb24gbm9kZUxpc3RBc0FycmF5KG5vZGVMaXN0KSB7XG4gIHZhciBub2RlcyA9IFtdO1xuICBlYWNoTm9kZShub2RlTGlzdCwgZnVuY3Rpb24gKG5vZGUpIHtcbiAgICByZXR1cm4gbm9kZXMucHVzaChub2RlKTtcbiAgfSk7XG4gIHJldHVybiBub2Rlcztcbn07XG52YXIgZmluZFBhcmVudEJ5U2VsZWN0b3IgPSBmdW5jdGlvbiBmaW5kUGFyZW50QnlTZWxlY3RvcigkZWwsIHNlbGVjdG9yKSB7XG4gIHZhciBzZWxmID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiB0cnVlO1xuICB2YXIgJHJvb3QgPSBhcmd1bWVudHMubGVuZ3RoID4gMyAmJiBhcmd1bWVudHNbM10gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1szXSA6IGRvY3VtZW50O1xuXG4gIGlmIChzZWxmICYmIG5vZGVMaXN0QXNBcnJheSgkcm9vdC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSkuaW5kZXhPZigkZWwpICE9PSAtMSkge1xuICAgIHJldHVybiAkZWw7XG4gIH1cblxuICB3aGlsZSAoKCRlbCA9ICRlbC5wYXJlbnRFbGVtZW50KSAmJiBub2RlTGlzdEFzQXJyYXkoJHJvb3QucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpLmluZGV4T2YoJGVsKSA9PT0gLTEpIHtcbiAgICA7XG4gIH1cblxuICByZXR1cm4gJGVsO1xufTtcbnZhciBlbGVtZW50SGFzU2VsZWN0b3IgPSBmdW5jdGlvbiBlbGVtZW50SGFzU2VsZWN0b3IoJGVsLCBzZWxlY3Rvcikge1xuICB2YXIgJHJvb3QgPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6IGRvY3VtZW50O1xuICB2YXIgaGFzID0gbm9kZUxpc3RBc0FycmF5KCRyb290LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKS5pbmRleE9mKCRlbCkgIT09IC0xO1xuICByZXR1cm4gaGFzO1xufTtcbnZhciBlbGVtZW50SGFzT3ZlcmZsb3dIaWRkZW4gPSBmdW5jdGlvbiBlbGVtZW50SGFzT3ZlcmZsb3dIaWRkZW4oJGVsKSB7XG4gIGlmICgkZWwpIHtcbiAgICB2YXIgY29tcHV0ZWRTdHlsZSA9IGdldENvbXB1dGVkU3R5bGUoJGVsKTtcbiAgICB2YXIgb3ZlcmZsb3dJc0hpZGRlbiA9IGNvbXB1dGVkU3R5bGUub3ZlcmZsb3cgPT09ICdoaWRkZW4nO1xuICAgIHJldHVybiBvdmVyZmxvd0lzSGlkZGVuO1xuICB9XG59O1xudmFyIGVsZW1lbnRTY3JvbGxUb3BPblN0YXJ0ID0gZnVuY3Rpb24gZWxlbWVudFNjcm9sbFRvcE9uU3RhcnQoJGVsKSB7XG4gIGlmICgkZWwpIHtcbiAgICBpZiAoZWxlbWVudEhhc092ZXJmbG93SGlkZGVuKCRlbCkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHZhciBzY3JvbGxUb3AgPSAkZWwuc2Nyb2xsVG9wO1xuICAgIHJldHVybiBzY3JvbGxUb3AgPD0gMDtcbiAgfVxufTtcbnZhciBlbGVtZW50U2Nyb2xsVG9wT25FbmQgPSBmdW5jdGlvbiBlbGVtZW50U2Nyb2xsVG9wT25FbmQoJGVsKSB7XG4gIGlmICgkZWwpIHtcbiAgICBpZiAoZWxlbWVudEhhc092ZXJmbG93SGlkZGVuKCRlbCkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHZhciBzY3JvbGxUb3AgPSAkZWwuc2Nyb2xsVG9wO1xuICAgIHZhciBzY3JvbGxIZWlnaHQgPSAkZWwuc2Nyb2xsSGVpZ2h0O1xuICAgIHZhciBzY3JvbGxUb3BXaXRoSGVpZ2h0ID0gc2Nyb2xsVG9wICsgJGVsLm9mZnNldEhlaWdodDtcbiAgICByZXR1cm4gc2Nyb2xsVG9wV2l0aEhlaWdodCA+PSBzY3JvbGxIZWlnaHQ7XG4gIH1cbn07XG52YXIgZWxlbWVudFNjcm9sbExlZnRPblN0YXJ0ID0gZnVuY3Rpb24gZWxlbWVudFNjcm9sbExlZnRPblN0YXJ0KCRlbCkge1xuICBpZiAoJGVsKSB7XG4gICAgaWYgKGVsZW1lbnRIYXNPdmVyZmxvd0hpZGRlbigkZWwpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICB2YXIgc2Nyb2xsTGVmdCA9ICRlbC5zY3JvbGxMZWZ0O1xuICAgIHJldHVybiBzY3JvbGxMZWZ0IDw9IDA7XG4gIH1cbn07XG52YXIgZWxlbWVudFNjcm9sbExlZnRPbkVuZCA9IGZ1bmN0aW9uIGVsZW1lbnRTY3JvbGxMZWZ0T25FbmQoJGVsKSB7XG4gIGlmICgkZWwpIHtcbiAgICBpZiAoZWxlbWVudEhhc092ZXJmbG93SGlkZGVuKCRlbCkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHZhciBzY3JvbGxMZWZ0ID0gJGVsLnNjcm9sbExlZnQ7XG4gICAgdmFyIHNjcm9sbFdpZHRoID0gJGVsLnNjcm9sbFdpZHRoO1xuICAgIHZhciBzY3JvbGxMZWZ0V2l0aFdpZHRoID0gc2Nyb2xsTGVmdCArICRlbC5vZmZzZXRXaWR0aDtcbiAgICByZXR1cm4gc2Nyb2xsTGVmdFdpdGhXaWR0aCA+PSBzY3JvbGxXaWR0aDtcbiAgfVxufTtcbnZhciBlbGVtZW50SXNTY3JvbGxhYmxlRmllbGQgPSBmdW5jdGlvbiBlbGVtZW50SXNTY3JvbGxhYmxlRmllbGQoJGVsKSB7XG4gIHZhciBzZWxlY3RvciA9ICd0ZXh0YXJlYSwgW2NvbnRlbnRlZGl0YWJsZT1cInRydWVcIl0nO1xuICByZXR1cm4gZWxlbWVudEhhc1NlbGVjdG9yKCRlbCwgc2VsZWN0b3IpO1xufTtcbnZhciBlbGVtZW50SXNJbnB1dFJhbmdlID0gZnVuY3Rpb24gZWxlbWVudElzSW5wdXRSYW5nZSgkZWwpIHtcbiAgdmFyIHNlbGVjdG9yID0gJ2lucHV0W3R5cGU9XCJyYW5nZVwiXSc7XG4gIHJldHVybiBlbGVtZW50SGFzU2VsZWN0b3IoJGVsLCBzZWxlY3Rvcik7XG59O1xuLy8gQ09OQ0FURU5BVEVEIE1PRFVMRTogLi9zcmMvc2Nyb2xsLWxvY2suanNcbi8qIGhhcm1vbnkgZXhwb3J0IChiaW5kaW5nKSAqLyBfX3dlYnBhY2tfcmVxdWlyZV9fLmQoX193ZWJwYWNrX2V4cG9ydHNfXywgXCJkaXNhYmxlUGFnZVNjcm9sbFwiLCBmdW5jdGlvbigpIHsgcmV0dXJuIGRpc2FibGVQYWdlU2Nyb2xsOyB9KTtcbi8qIGhhcm1vbnkgZXhwb3J0IChiaW5kaW5nKSAqLyBfX3dlYnBhY2tfcmVxdWlyZV9fLmQoX193ZWJwYWNrX2V4cG9ydHNfXywgXCJlbmFibGVQYWdlU2Nyb2xsXCIsIGZ1bmN0aW9uKCkgeyByZXR1cm4gZW5hYmxlUGFnZVNjcm9sbDsgfSk7XG4vKiBoYXJtb255IGV4cG9ydCAoYmluZGluZykgKi8gX193ZWJwYWNrX3JlcXVpcmVfXy5kKF9fd2VicGFja19leHBvcnRzX18sIFwiZ2V0U2Nyb2xsU3RhdGVcIiwgZnVuY3Rpb24oKSB7IHJldHVybiBnZXRTY3JvbGxTdGF0ZTsgfSk7XG4vKiBoYXJtb255IGV4cG9ydCAoYmluZGluZykgKi8gX193ZWJwYWNrX3JlcXVpcmVfXy5kKF9fd2VicGFja19leHBvcnRzX18sIFwiY2xlYXJRdWV1ZVNjcm9sbExvY2tzXCIsIGZ1bmN0aW9uKCkgeyByZXR1cm4gY2xlYXJRdWV1ZVNjcm9sbExvY2tzOyB9KTtcbi8qIGhhcm1vbnkgZXhwb3J0IChiaW5kaW5nKSAqLyBfX3dlYnBhY2tfcmVxdWlyZV9fLmQoX193ZWJwYWNrX2V4cG9ydHNfXywgXCJnZXRUYXJnZXRTY3JvbGxCYXJXaWR0aFwiLCBmdW5jdGlvbigpIHsgcmV0dXJuIHNjcm9sbF9sb2NrX2dldFRhcmdldFNjcm9sbEJhcldpZHRoOyB9KTtcbi8qIGhhcm1vbnkgZXhwb3J0IChiaW5kaW5nKSAqLyBfX3dlYnBhY2tfcmVxdWlyZV9fLmQoX193ZWJwYWNrX2V4cG9ydHNfXywgXCJnZXRDdXJyZW50VGFyZ2V0U2Nyb2xsQmFyV2lkdGhcIiwgZnVuY3Rpb24oKSB7IHJldHVybiBzY3JvbGxfbG9ja19nZXRDdXJyZW50VGFyZ2V0U2Nyb2xsQmFyV2lkdGg7IH0pO1xuLyogaGFybW9ueSBleHBvcnQgKGJpbmRpbmcpICovIF9fd2VicGFja19yZXF1aXJlX18uZChfX3dlYnBhY2tfZXhwb3J0c19fLCBcImdldFBhZ2VTY3JvbGxCYXJXaWR0aFwiLCBmdW5jdGlvbigpIHsgcmV0dXJuIGdldFBhZ2VTY3JvbGxCYXJXaWR0aDsgfSk7XG4vKiBoYXJtb255IGV4cG9ydCAoYmluZGluZykgKi8gX193ZWJwYWNrX3JlcXVpcmVfXy5kKF9fd2VicGFja19leHBvcnRzX18sIFwiZ2V0Q3VycmVudFBhZ2VTY3JvbGxCYXJXaWR0aFwiLCBmdW5jdGlvbigpIHsgcmV0dXJuIGdldEN1cnJlbnRQYWdlU2Nyb2xsQmFyV2lkdGg7IH0pO1xuLyogaGFybW9ueSBleHBvcnQgKGJpbmRpbmcpICovIF9fd2VicGFja19yZXF1aXJlX18uZChfX3dlYnBhY2tfZXhwb3J0c19fLCBcImFkZFNjcm9sbGFibGVUYXJnZXRcIiwgZnVuY3Rpb24oKSB7IHJldHVybiBzY3JvbGxfbG9ja19hZGRTY3JvbGxhYmxlVGFyZ2V0OyB9KTtcbi8qIGhhcm1vbnkgZXhwb3J0IChiaW5kaW5nKSAqLyBfX3dlYnBhY2tfcmVxdWlyZV9fLmQoX193ZWJwYWNrX2V4cG9ydHNfXywgXCJyZW1vdmVTY3JvbGxhYmxlVGFyZ2V0XCIsIGZ1bmN0aW9uKCkgeyByZXR1cm4gc2Nyb2xsX2xvY2tfcmVtb3ZlU2Nyb2xsYWJsZVRhcmdldDsgfSk7XG4vKiBoYXJtb255IGV4cG9ydCAoYmluZGluZykgKi8gX193ZWJwYWNrX3JlcXVpcmVfXy5kKF9fd2VicGFja19leHBvcnRzX18sIFwiYWRkU2Nyb2xsYWJsZVNlbGVjdG9yXCIsIGZ1bmN0aW9uKCkgeyByZXR1cm4gc2Nyb2xsX2xvY2tfYWRkU2Nyb2xsYWJsZVNlbGVjdG9yOyB9KTtcbi8qIGhhcm1vbnkgZXhwb3J0IChiaW5kaW5nKSAqLyBfX3dlYnBhY2tfcmVxdWlyZV9fLmQoX193ZWJwYWNrX2V4cG9ydHNfXywgXCJyZW1vdmVTY3JvbGxhYmxlU2VsZWN0b3JcIiwgZnVuY3Rpb24oKSB7IHJldHVybiBzY3JvbGxfbG9ja19yZW1vdmVTY3JvbGxhYmxlU2VsZWN0b3I7IH0pO1xuLyogaGFybW9ueSBleHBvcnQgKGJpbmRpbmcpICovIF9fd2VicGFja19yZXF1aXJlX18uZChfX3dlYnBhY2tfZXhwb3J0c19fLCBcImFkZExvY2thYmxlVGFyZ2V0XCIsIGZ1bmN0aW9uKCkgeyByZXR1cm4gc2Nyb2xsX2xvY2tfYWRkTG9ja2FibGVUYXJnZXQ7IH0pO1xuLyogaGFybW9ueSBleHBvcnQgKGJpbmRpbmcpICovIF9fd2VicGFja19yZXF1aXJlX18uZChfX3dlYnBhY2tfZXhwb3J0c19fLCBcImFkZExvY2thYmxlU2VsZWN0b3JcIiwgZnVuY3Rpb24oKSB7IHJldHVybiBzY3JvbGxfbG9ja19hZGRMb2NrYWJsZVNlbGVjdG9yOyB9KTtcbi8qIGhhcm1vbnkgZXhwb3J0IChiaW5kaW5nKSAqLyBfX3dlYnBhY2tfcmVxdWlyZV9fLmQoX193ZWJwYWNrX2V4cG9ydHNfXywgXCJzZXRGaWxsR2FwTWV0aG9kXCIsIGZ1bmN0aW9uKCkgeyByZXR1cm4gc2Nyb2xsX2xvY2tfc2V0RmlsbEdhcE1ldGhvZDsgfSk7XG4vKiBoYXJtb255IGV4cG9ydCAoYmluZGluZykgKi8gX193ZWJwYWNrX3JlcXVpcmVfXy5kKF9fd2VicGFja19leHBvcnRzX18sIFwiYWRkRmlsbEdhcFRhcmdldFwiLCBmdW5jdGlvbigpIHsgcmV0dXJuIHNjcm9sbF9sb2NrX2FkZEZpbGxHYXBUYXJnZXQ7IH0pO1xuLyogaGFybW9ueSBleHBvcnQgKGJpbmRpbmcpICovIF9fd2VicGFja19yZXF1aXJlX18uZChfX3dlYnBhY2tfZXhwb3J0c19fLCBcInJlbW92ZUZpbGxHYXBUYXJnZXRcIiwgZnVuY3Rpb24oKSB7IHJldHVybiBzY3JvbGxfbG9ja19yZW1vdmVGaWxsR2FwVGFyZ2V0OyB9KTtcbi8qIGhhcm1vbnkgZXhwb3J0IChiaW5kaW5nKSAqLyBfX3dlYnBhY2tfcmVxdWlyZV9fLmQoX193ZWJwYWNrX2V4cG9ydHNfXywgXCJhZGRGaWxsR2FwU2VsZWN0b3JcIiwgZnVuY3Rpb24oKSB7IHJldHVybiBzY3JvbGxfbG9ja19hZGRGaWxsR2FwU2VsZWN0b3I7IH0pO1xuLyogaGFybW9ueSBleHBvcnQgKGJpbmRpbmcpICovIF9fd2VicGFja19yZXF1aXJlX18uZChfX3dlYnBhY2tfZXhwb3J0c19fLCBcInJlbW92ZUZpbGxHYXBTZWxlY3RvclwiLCBmdW5jdGlvbigpIHsgcmV0dXJuIHNjcm9sbF9sb2NrX3JlbW92ZUZpbGxHYXBTZWxlY3RvcjsgfSk7XG4vKiBoYXJtb255IGV4cG9ydCAoYmluZGluZykgKi8gX193ZWJwYWNrX3JlcXVpcmVfXy5kKF9fd2VicGFja19leHBvcnRzX18sIFwicmVmaWxsR2Fwc1wiLCBmdW5jdGlvbigpIHsgcmV0dXJuIHJlZmlsbEdhcHM7IH0pO1xuZnVuY3Rpb24gX29iamVjdFNwcmVhZCh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXSAhPSBudWxsID8gYXJndW1lbnRzW2ldIDoge307IHZhciBvd25LZXlzID0gT2JqZWN0LmtleXMoc291cmNlKTsgaWYgKHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSAnZnVuY3Rpb24nKSB7IG93bktleXMgPSBvd25LZXlzLmNvbmNhdChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHNvdXJjZSkuZmlsdGVyKGZ1bmN0aW9uIChzeW0pIHsgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBzeW0pLmVudW1lcmFibGU7IH0pKTsgfSBvd25LZXlzLmZvckVhY2goZnVuY3Rpb24gKGtleSkgeyBfZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHNvdXJjZVtrZXldKTsgfSk7IH0gcmV0dXJuIHRhcmdldDsgfVxuXG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7IGlmIChrZXkgaW4gb2JqKSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgeyB2YWx1ZTogdmFsdWUsIGVudW1lcmFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSwgd3JpdGFibGU6IHRydWUgfSk7IH0gZWxzZSB7IG9ialtrZXldID0gdmFsdWU7IH0gcmV0dXJuIG9iajsgfVxuXG5cbnZhciBGSUxMX0dBUF9BVkFJTEFCTEVfTUVUSE9EUyA9IFsncGFkZGluZycsICdtYXJnaW4nLCAnd2lkdGgnLCAnbWF4LXdpZHRoJywgJ25vbmUnXTtcbnZhciBUT1VDSF9ESVJFQ1RJT05fREVURUNUX09GRlNFVCA9IDM7XG52YXIgc3RhdGUgPSB7XG4gIHNjcm9sbDogdHJ1ZSxcbiAgcXVldWU6IDAsXG4gIHNjcm9sbGFibGVTZWxlY3RvcnM6IFsnW2RhdGEtc2Nyb2xsLWxvY2stc2Nyb2xsYWJsZV0nXSxcbiAgbG9ja2FibGVTZWxlY3RvcnM6IFsnYm9keScsICdbZGF0YS1zY3JvbGwtbG9jay1sb2NrYWJsZV0nXSxcbiAgZmlsbEdhcFNlbGVjdG9yczogWydib2R5JywgJ1tkYXRhLXNjcm9sbC1sb2NrLWZpbGwtZ2FwXScsICdbZGF0YS1zY3JvbGwtbG9jay1sb2NrYWJsZV0nXSxcbiAgZmlsbEdhcE1ldGhvZDogRklMTF9HQVBfQVZBSUxBQkxFX01FVEhPRFNbMF0sXG4gIC8vXG4gIHN0YXJ0VG91Y2hZOiAwLFxuICBzdGFydFRvdWNoWDogMFxufTtcbnZhciBkaXNhYmxlUGFnZVNjcm9sbCA9IGZ1bmN0aW9uIGRpc2FibGVQYWdlU2Nyb2xsKHRhcmdldCkge1xuICBpZiAoc3RhdGUucXVldWUgPD0gMCkge1xuICAgIHN0YXRlLnNjcm9sbCA9IGZhbHNlO1xuICAgIHNjcm9sbF9sb2NrX2hpZGVMb2NrYWJsZU92ZXJmbG93KCk7XG4gICAgZmlsbEdhcHMoKTtcbiAgfVxuXG4gIHNjcm9sbF9sb2NrX2FkZFNjcm9sbGFibGVUYXJnZXQodGFyZ2V0KTtcbiAgc3RhdGUucXVldWUrKztcbn07XG52YXIgZW5hYmxlUGFnZVNjcm9sbCA9IGZ1bmN0aW9uIGVuYWJsZVBhZ2VTY3JvbGwodGFyZ2V0KSB7XG4gIHN0YXRlLnF1ZXVlID4gMCAmJiBzdGF0ZS5xdWV1ZS0tO1xuXG4gIGlmIChzdGF0ZS5xdWV1ZSA8PSAwKSB7XG4gICAgc3RhdGUuc2Nyb2xsID0gdHJ1ZTtcbiAgICBzY3JvbGxfbG9ja19zaG93TG9ja2FibGVPdmVyZmxvdygpO1xuICAgIHVuZmlsbEdhcHMoKTtcbiAgfVxuXG4gIHNjcm9sbF9sb2NrX3JlbW92ZVNjcm9sbGFibGVUYXJnZXQodGFyZ2V0KTtcbn07XG52YXIgZ2V0U2Nyb2xsU3RhdGUgPSBmdW5jdGlvbiBnZXRTY3JvbGxTdGF0ZSgpIHtcbiAgcmV0dXJuIHN0YXRlLnNjcm9sbDtcbn07XG52YXIgY2xlYXJRdWV1ZVNjcm9sbExvY2tzID0gZnVuY3Rpb24gY2xlYXJRdWV1ZVNjcm9sbExvY2tzKCkge1xuICBzdGF0ZS5xdWV1ZSA9IDA7XG59O1xudmFyIHNjcm9sbF9sb2NrX2dldFRhcmdldFNjcm9sbEJhcldpZHRoID0gZnVuY3Rpb24gZ2V0VGFyZ2V0U2Nyb2xsQmFyV2lkdGgoJHRhcmdldCkge1xuICB2YXIgb25seUV4aXN0cyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogZmFsc2U7XG5cbiAgaWYgKGlzRWxlbWVudCgkdGFyZ2V0KSkge1xuICAgIHZhciBjdXJyZW50T3ZlcmZsb3dZUHJvcGVydHkgPSAkdGFyZ2V0LnN0eWxlLm92ZXJmbG93WTtcblxuICAgIGlmIChvbmx5RXhpc3RzKSB7XG4gICAgICBpZiAoIWdldFNjcm9sbFN0YXRlKCkpIHtcbiAgICAgICAgJHRhcmdldC5zdHlsZS5vdmVyZmxvd1kgPSAkdGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1zY3JvbGwtbG9jay1zYXZlZC1vdmVyZmxvdy15LXByb3BlcnR5Jyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICR0YXJnZXQuc3R5bGUub3ZlcmZsb3dZID0gJ3Njcm9sbCc7XG4gICAgfVxuXG4gICAgdmFyIHdpZHRoID0gc2Nyb2xsX2xvY2tfZ2V0Q3VycmVudFRhcmdldFNjcm9sbEJhcldpZHRoKCR0YXJnZXQpO1xuICAgICR0YXJnZXQuc3R5bGUub3ZlcmZsb3dZID0gY3VycmVudE92ZXJmbG93WVByb3BlcnR5O1xuICAgIHJldHVybiB3aWR0aDtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gMDtcbiAgfVxufTtcbnZhciBzY3JvbGxfbG9ja19nZXRDdXJyZW50VGFyZ2V0U2Nyb2xsQmFyV2lkdGggPSBmdW5jdGlvbiBnZXRDdXJyZW50VGFyZ2V0U2Nyb2xsQmFyV2lkdGgoJHRhcmdldCkge1xuICBpZiAoaXNFbGVtZW50KCR0YXJnZXQpKSB7XG4gICAgaWYgKCR0YXJnZXQgPT09IGRvY3VtZW50LmJvZHkpIHtcbiAgICAgIHZhciBkb2N1bWVudFdpZHRoID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoO1xuICAgICAgdmFyIHdpbmRvd1dpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgICB2YXIgY3VycmVudFdpZHRoID0gd2luZG93V2lkdGggLSBkb2N1bWVudFdpZHRoO1xuICAgICAgcmV0dXJuIGN1cnJlbnRXaWR0aDtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGJvcmRlckxlZnRXaWR0aEN1cnJlbnRQcm9wZXJ0eSA9ICR0YXJnZXQuc3R5bGUuYm9yZGVyTGVmdFdpZHRoO1xuICAgICAgdmFyIGJvcmRlclJpZ2h0V2lkdGhDdXJyZW50UHJvcGVydHkgPSAkdGFyZ2V0LnN0eWxlLmJvcmRlclJpZ2h0V2lkdGg7XG4gICAgICAkdGFyZ2V0LnN0eWxlLmJvcmRlckxlZnRXaWR0aCA9ICcwcHgnO1xuICAgICAgJHRhcmdldC5zdHlsZS5ib3JkZXJSaWdodFdpZHRoID0gJzBweCc7XG5cbiAgICAgIHZhciBfY3VycmVudFdpZHRoID0gJHRhcmdldC5vZmZzZXRXaWR0aCAtICR0YXJnZXQuY2xpZW50V2lkdGg7XG5cbiAgICAgICR0YXJnZXQuc3R5bGUuYm9yZGVyTGVmdFdpZHRoID0gYm9yZGVyTGVmdFdpZHRoQ3VycmVudFByb3BlcnR5O1xuICAgICAgJHRhcmdldC5zdHlsZS5ib3JkZXJSaWdodFdpZHRoID0gYm9yZGVyUmlnaHRXaWR0aEN1cnJlbnRQcm9wZXJ0eTtcbiAgICAgIHJldHVybiBfY3VycmVudFdpZHRoO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gMDtcbiAgfVxufTtcbnZhciBnZXRQYWdlU2Nyb2xsQmFyV2lkdGggPSBmdW5jdGlvbiBnZXRQYWdlU2Nyb2xsQmFyV2lkdGgoKSB7XG4gIHZhciBvbmx5RXhpc3RzID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiBmYWxzZTtcbiAgcmV0dXJuIHNjcm9sbF9sb2NrX2dldFRhcmdldFNjcm9sbEJhcldpZHRoKGRvY3VtZW50LmJvZHksIG9ubHlFeGlzdHMpO1xufTtcbnZhciBnZXRDdXJyZW50UGFnZVNjcm9sbEJhcldpZHRoID0gZnVuY3Rpb24gZ2V0Q3VycmVudFBhZ2VTY3JvbGxCYXJXaWR0aCgpIHtcbiAgcmV0dXJuIHNjcm9sbF9sb2NrX2dldEN1cnJlbnRUYXJnZXRTY3JvbGxCYXJXaWR0aChkb2N1bWVudC5ib2R5KTtcbn07XG52YXIgc2Nyb2xsX2xvY2tfYWRkU2Nyb2xsYWJsZVRhcmdldCA9IGZ1bmN0aW9uIGFkZFNjcm9sbGFibGVUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0YXJnZXQpIHtcbiAgICB2YXIgdGFyZ2V0cyA9IGFyZ3VtZW50QXNBcnJheSh0YXJnZXQpO1xuICAgIHRhcmdldHMubWFwKGZ1bmN0aW9uICgkdGFyZ2V0cykge1xuICAgICAgZWFjaE5vZGUoJHRhcmdldHMsIGZ1bmN0aW9uICgkdGFyZ2V0KSB7XG4gICAgICAgIGlmIChpc0VsZW1lbnQoJHRhcmdldCkpIHtcbiAgICAgICAgICAkdGFyZ2V0LnNldEF0dHJpYnV0ZSgnZGF0YS1zY3JvbGwtbG9jay1zY3JvbGxhYmxlJywgJycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93RXJyb3IoXCJcXFwiXCIuY29uY2F0KCR0YXJnZXQsIFwiXFxcIiBpcyBub3QgYSBFbGVtZW50LlwiKSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59O1xudmFyIHNjcm9sbF9sb2NrX3JlbW92ZVNjcm9sbGFibGVUYXJnZXQgPSBmdW5jdGlvbiByZW1vdmVTY3JvbGxhYmxlVGFyZ2V0KHRhcmdldCkge1xuICBpZiAodGFyZ2V0KSB7XG4gICAgdmFyIHRhcmdldHMgPSBhcmd1bWVudEFzQXJyYXkodGFyZ2V0KTtcbiAgICB0YXJnZXRzLm1hcChmdW5jdGlvbiAoJHRhcmdldHMpIHtcbiAgICAgIGVhY2hOb2RlKCR0YXJnZXRzLCBmdW5jdGlvbiAoJHRhcmdldCkge1xuICAgICAgICBpZiAoaXNFbGVtZW50KCR0YXJnZXQpKSB7XG4gICAgICAgICAgJHRhcmdldC5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtc2Nyb2xsLWxvY2stc2Nyb2xsYWJsZScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93RXJyb3IoXCJcXFwiXCIuY29uY2F0KCR0YXJnZXQsIFwiXFxcIiBpcyBub3QgYSBFbGVtZW50LlwiKSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59O1xudmFyIHNjcm9sbF9sb2NrX2FkZFNjcm9sbGFibGVTZWxlY3RvciA9IGZ1bmN0aW9uIGFkZFNjcm9sbGFibGVTZWxlY3RvcihzZWxlY3Rvcikge1xuICBpZiAoc2VsZWN0b3IpIHtcbiAgICB2YXIgc2VsZWN0b3JzID0gYXJndW1lbnRBc0FycmF5KHNlbGVjdG9yKTtcbiAgICBzZWxlY3RvcnMubWFwKGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICAgICAgc3RhdGUuc2Nyb2xsYWJsZVNlbGVjdG9ycy5wdXNoKHNlbGVjdG9yKTtcbiAgICB9KTtcbiAgfVxufTtcbnZhciBzY3JvbGxfbG9ja19yZW1vdmVTY3JvbGxhYmxlU2VsZWN0b3IgPSBmdW5jdGlvbiByZW1vdmVTY3JvbGxhYmxlU2VsZWN0b3Ioc2VsZWN0b3IpIHtcbiAgaWYgKHNlbGVjdG9yKSB7XG4gICAgdmFyIHNlbGVjdG9ycyA9IGFyZ3VtZW50QXNBcnJheShzZWxlY3Rvcik7XG4gICAgc2VsZWN0b3JzLm1hcChmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgICAgIHN0YXRlLnNjcm9sbGFibGVTZWxlY3RvcnMgPSBzdGF0ZS5zY3JvbGxhYmxlU2VsZWN0b3JzLmZpbHRlcihmdW5jdGlvbiAoc1NlbGVjdG9yKSB7XG4gICAgICAgIHJldHVybiBzU2VsZWN0b3IgIT09IHNlbGVjdG9yO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn07XG52YXIgc2Nyb2xsX2xvY2tfYWRkTG9ja2FibGVUYXJnZXQgPSBmdW5jdGlvbiBhZGRMb2NrYWJsZVRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHRhcmdldCkge1xuICAgIHZhciB0YXJnZXRzID0gYXJndW1lbnRBc0FycmF5KHRhcmdldCk7XG4gICAgdGFyZ2V0cy5tYXAoZnVuY3Rpb24gKCR0YXJnZXRzKSB7XG4gICAgICBlYWNoTm9kZSgkdGFyZ2V0cywgZnVuY3Rpb24gKCR0YXJnZXQpIHtcbiAgICAgICAgaWYgKGlzRWxlbWVudCgkdGFyZ2V0KSkge1xuICAgICAgICAgICR0YXJnZXQuc2V0QXR0cmlidXRlKCdkYXRhLXNjcm9sbC1sb2NrLWxvY2thYmxlJywgJycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93RXJyb3IoXCJcXFwiXCIuY29uY2F0KCR0YXJnZXQsIFwiXFxcIiBpcyBub3QgYSBFbGVtZW50LlwiKSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgaWYgKCFnZXRTY3JvbGxTdGF0ZSgpKSB7XG4gICAgICBzY3JvbGxfbG9ja19oaWRlTG9ja2FibGVPdmVyZmxvdygpO1xuICAgIH1cbiAgfVxufTtcbnZhciBzY3JvbGxfbG9ja19hZGRMb2NrYWJsZVNlbGVjdG9yID0gZnVuY3Rpb24gYWRkTG9ja2FibGVTZWxlY3RvcihzZWxlY3Rvcikge1xuICBpZiAoc2VsZWN0b3IpIHtcbiAgICB2YXIgc2VsZWN0b3JzID0gYXJndW1lbnRBc0FycmF5KHNlbGVjdG9yKTtcbiAgICBzZWxlY3RvcnMubWFwKGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICAgICAgc3RhdGUubG9ja2FibGVTZWxlY3RvcnMucHVzaChzZWxlY3Rvcik7XG4gICAgfSk7XG5cbiAgICBpZiAoIWdldFNjcm9sbFN0YXRlKCkpIHtcbiAgICAgIHNjcm9sbF9sb2NrX2hpZGVMb2NrYWJsZU92ZXJmbG93KCk7XG4gICAgfVxuXG4gICAgc2Nyb2xsX2xvY2tfYWRkRmlsbEdhcFNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgfVxufTtcbnZhciBzY3JvbGxfbG9ja19zZXRGaWxsR2FwTWV0aG9kID0gZnVuY3Rpb24gc2V0RmlsbEdhcE1ldGhvZChtZXRob2QpIHtcbiAgaWYgKG1ldGhvZCkge1xuICAgIGlmIChGSUxMX0dBUF9BVkFJTEFCTEVfTUVUSE9EUy5pbmRleE9mKG1ldGhvZCkgIT09IC0xKSB7XG4gICAgICBzdGF0ZS5maWxsR2FwTWV0aG9kID0gbWV0aG9kO1xuICAgICAgcmVmaWxsR2FwcygpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgbWV0aG9kcyA9IEZJTExfR0FQX0FWQUlMQUJMRV9NRVRIT0RTLmpvaW4oJywgJyk7XG4gICAgICB0aHJvd0Vycm9yKFwiXFxcIlwiLmNvbmNhdChtZXRob2QsIFwiXFxcIiBtZXRob2QgaXMgbm90IGF2YWlsYWJsZSFcXG5BdmFpbGFibGUgZmlsbCBnYXAgbWV0aG9kczogXCIpLmNvbmNhdChtZXRob2RzLCBcIi5cIikpO1xuICAgIH1cbiAgfVxufTtcbnZhciBzY3JvbGxfbG9ja19hZGRGaWxsR2FwVGFyZ2V0ID0gZnVuY3Rpb24gYWRkRmlsbEdhcFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHRhcmdldCkge1xuICAgIHZhciB0YXJnZXRzID0gYXJndW1lbnRBc0FycmF5KHRhcmdldCk7XG4gICAgdGFyZ2V0cy5tYXAoZnVuY3Rpb24gKCR0YXJnZXRzKSB7XG4gICAgICBlYWNoTm9kZSgkdGFyZ2V0cywgZnVuY3Rpb24gKCR0YXJnZXQpIHtcbiAgICAgICAgaWYgKGlzRWxlbWVudCgkdGFyZ2V0KSkge1xuICAgICAgICAgICR0YXJnZXQuc2V0QXR0cmlidXRlKCdkYXRhLXNjcm9sbC1sb2NrLWZpbGwtZ2FwJywgJycpO1xuXG4gICAgICAgICAgaWYgKCFzdGF0ZS5zY3JvbGwpIHtcbiAgICAgICAgICAgIHNjcm9sbF9sb2NrX2ZpbGxHYXBUYXJnZXQoJHRhcmdldCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93RXJyb3IoXCJcXFwiXCIuY29uY2F0KCR0YXJnZXQsIFwiXFxcIiBpcyBub3QgYSBFbGVtZW50LlwiKSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59O1xudmFyIHNjcm9sbF9sb2NrX3JlbW92ZUZpbGxHYXBUYXJnZXQgPSBmdW5jdGlvbiByZW1vdmVGaWxsR2FwVGFyZ2V0KHRhcmdldCkge1xuICBpZiAodGFyZ2V0KSB7XG4gICAgdmFyIHRhcmdldHMgPSBhcmd1bWVudEFzQXJyYXkodGFyZ2V0KTtcbiAgICB0YXJnZXRzLm1hcChmdW5jdGlvbiAoJHRhcmdldHMpIHtcbiAgICAgIGVhY2hOb2RlKCR0YXJnZXRzLCBmdW5jdGlvbiAoJHRhcmdldCkge1xuICAgICAgICBpZiAoaXNFbGVtZW50KCR0YXJnZXQpKSB7XG4gICAgICAgICAgJHRhcmdldC5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtc2Nyb2xsLWxvY2stZmlsbC1nYXAnKTtcblxuICAgICAgICAgIGlmICghc3RhdGUuc2Nyb2xsKSB7XG4gICAgICAgICAgICBzY3JvbGxfbG9ja191bmZpbGxHYXBUYXJnZXQoJHRhcmdldCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93RXJyb3IoXCJcXFwiXCIuY29uY2F0KCR0YXJnZXQsIFwiXFxcIiBpcyBub3QgYSBFbGVtZW50LlwiKSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59O1xudmFyIHNjcm9sbF9sb2NrX2FkZEZpbGxHYXBTZWxlY3RvciA9IGZ1bmN0aW9uIGFkZEZpbGxHYXBTZWxlY3RvcihzZWxlY3Rvcikge1xuICBpZiAoc2VsZWN0b3IpIHtcbiAgICB2YXIgc2VsZWN0b3JzID0gYXJndW1lbnRBc0FycmF5KHNlbGVjdG9yKTtcbiAgICBzZWxlY3RvcnMubWFwKGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICAgICAgaWYgKHN0YXRlLmZpbGxHYXBTZWxlY3RvcnMuaW5kZXhPZihzZWxlY3RvcikgPT09IC0xKSB7XG4gICAgICAgIHN0YXRlLmZpbGxHYXBTZWxlY3RvcnMucHVzaChzZWxlY3Rvcik7XG5cbiAgICAgICAgaWYgKCFzdGF0ZS5zY3JvbGwpIHtcbiAgICAgICAgICBzY3JvbGxfbG9ja19maWxsR2FwU2VsZWN0b3Ioc2VsZWN0b3IpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn07XG52YXIgc2Nyb2xsX2xvY2tfcmVtb3ZlRmlsbEdhcFNlbGVjdG9yID0gZnVuY3Rpb24gcmVtb3ZlRmlsbEdhcFNlbGVjdG9yKHNlbGVjdG9yKSB7XG4gIGlmIChzZWxlY3Rvcikge1xuICAgIHZhciBzZWxlY3RvcnMgPSBhcmd1bWVudEFzQXJyYXkoc2VsZWN0b3IpO1xuICAgIHNlbGVjdG9ycy5tYXAoZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gICAgICBzdGF0ZS5maWxsR2FwU2VsZWN0b3JzID0gc3RhdGUuZmlsbEdhcFNlbGVjdG9ycy5maWx0ZXIoZnVuY3Rpb24gKGZTZWxlY3Rvcikge1xuICAgICAgICByZXR1cm4gZlNlbGVjdG9yICE9PSBzZWxlY3RvcjtcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoIXN0YXRlLnNjcm9sbCkge1xuICAgICAgICBzY3JvbGxfbG9ja191bmZpbGxHYXBTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn07XG52YXIgcmVmaWxsR2FwcyA9IGZ1bmN0aW9uIHJlZmlsbEdhcHMoKSB7XG4gIGlmICghc3RhdGUuc2Nyb2xsKSB7XG4gICAgZmlsbEdhcHMoKTtcbiAgfVxufTtcblxudmFyIHNjcm9sbF9sb2NrX2hpZGVMb2NrYWJsZU92ZXJmbG93ID0gZnVuY3Rpb24gaGlkZUxvY2thYmxlT3ZlcmZsb3coKSB7XG4gIHZhciBzZWxlY3RvciA9IGFycmF5QXNTZWxlY3RvcihzdGF0ZS5sb2NrYWJsZVNlbGVjdG9ycyk7XG4gIHNjcm9sbF9sb2NrX2hpZGVMb2NrYWJsZU92ZXJmbG93U2VsZWN0b3Ioc2VsZWN0b3IpO1xufTtcblxudmFyIHNjcm9sbF9sb2NrX3Nob3dMb2NrYWJsZU92ZXJmbG93ID0gZnVuY3Rpb24gc2hvd0xvY2thYmxlT3ZlcmZsb3coKSB7XG4gIHZhciBzZWxlY3RvciA9IGFycmF5QXNTZWxlY3RvcihzdGF0ZS5sb2NrYWJsZVNlbGVjdG9ycyk7XG4gIHNjcm9sbF9sb2NrX3Nob3dMb2NrYWJsZU92ZXJmbG93U2VsZWN0b3Ioc2VsZWN0b3IpO1xufTtcblxudmFyIHNjcm9sbF9sb2NrX2hpZGVMb2NrYWJsZU92ZXJmbG93U2VsZWN0b3IgPSBmdW5jdGlvbiBoaWRlTG9ja2FibGVPdmVyZmxvd1NlbGVjdG9yKHNlbGVjdG9yKSB7XG4gIHZhciAkdGFyZ2V0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuICBlYWNoTm9kZSgkdGFyZ2V0cywgZnVuY3Rpb24gKCR0YXJnZXQpIHtcbiAgICBzY3JvbGxfbG9ja19oaWRlTG9ja2FibGVPdmVyZmxvd1RhcmdldCgkdGFyZ2V0KTtcbiAgfSk7XG59O1xuXG52YXIgc2Nyb2xsX2xvY2tfc2hvd0xvY2thYmxlT3ZlcmZsb3dTZWxlY3RvciA9IGZ1bmN0aW9uIHNob3dMb2NrYWJsZU92ZXJmbG93U2VsZWN0b3Ioc2VsZWN0b3IpIHtcbiAgdmFyICR0YXJnZXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG4gIGVhY2hOb2RlKCR0YXJnZXRzLCBmdW5jdGlvbiAoJHRhcmdldCkge1xuICAgIHNjcm9sbF9sb2NrX3Nob3dMb2NrYWJsZU92ZXJmbG93VGFyZ2V0KCR0YXJnZXQpO1xuICB9KTtcbn07XG5cbnZhciBzY3JvbGxfbG9ja19oaWRlTG9ja2FibGVPdmVyZmxvd1RhcmdldCA9IGZ1bmN0aW9uIGhpZGVMb2NrYWJsZU92ZXJmbG93VGFyZ2V0KCR0YXJnZXQpIHtcbiAgaWYgKGlzRWxlbWVudCgkdGFyZ2V0KSAmJiAkdGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1zY3JvbGwtbG9jay1sb2NrZWQnKSAhPT0gJ3RydWUnKSB7XG4gICAgdmFyIGNvbXB1dGVkU3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSgkdGFyZ2V0KTtcbiAgICAkdGFyZ2V0LnNldEF0dHJpYnV0ZSgnZGF0YS1zY3JvbGwtbG9jay1zYXZlZC1vdmVyZmxvdy15LXByb3BlcnR5JywgY29tcHV0ZWRTdHlsZS5vdmVyZmxvd1kpO1xuICAgICR0YXJnZXQuc2V0QXR0cmlidXRlKCdkYXRhLXNjcm9sbC1sb2NrLXNhdmVkLWlubGluZS1vdmVyZmxvdy1wcm9wZXJ0eScsICR0YXJnZXQuc3R5bGUub3ZlcmZsb3cpO1xuICAgICR0YXJnZXQuc2V0QXR0cmlidXRlKCdkYXRhLXNjcm9sbC1sb2NrLXNhdmVkLWlubGluZS1vdmVyZmxvdy15LXByb3BlcnR5JywgJHRhcmdldC5zdHlsZS5vdmVyZmxvd1kpO1xuICAgICR0YXJnZXQuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcbiAgICAkdGFyZ2V0LnNldEF0dHJpYnV0ZSgnZGF0YS1zY3JvbGwtbG9jay1sb2NrZWQnLCAndHJ1ZScpO1xuICB9XG59O1xuXG52YXIgc2Nyb2xsX2xvY2tfc2hvd0xvY2thYmxlT3ZlcmZsb3dUYXJnZXQgPSBmdW5jdGlvbiBzaG93TG9ja2FibGVPdmVyZmxvd1RhcmdldCgkdGFyZ2V0KSB7XG4gIGlmIChpc0VsZW1lbnQoJHRhcmdldCkgJiYgJHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2Nyb2xsLWxvY2stbG9ja2VkJykgPT09ICd0cnVlJykge1xuICAgICR0YXJnZXQuc3R5bGUub3ZlcmZsb3cgPSAkdGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1zY3JvbGwtbG9jay1zYXZlZC1pbmxpbmUtb3ZlcmZsb3ctcHJvcGVydHknKTtcbiAgICAkdGFyZ2V0LnN0eWxlLm92ZXJmbG93WSA9ICR0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXNjcm9sbC1sb2NrLXNhdmVkLWlubGluZS1vdmVyZmxvdy15LXByb3BlcnR5Jyk7XG4gICAgJHRhcmdldC5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtc2Nyb2xsLWxvY2stc2F2ZWQtb3ZlcmZsb3ctcHJvcGVydHknKTtcbiAgICAkdGFyZ2V0LnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS1zY3JvbGwtbG9jay1zYXZlZC1pbmxpbmUtb3ZlcmZsb3ctcHJvcGVydHknKTtcbiAgICAkdGFyZ2V0LnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS1zY3JvbGwtbG9jay1zYXZlZC1pbmxpbmUtb3ZlcmZsb3cteS1wcm9wZXJ0eScpO1xuICAgICR0YXJnZXQucmVtb3ZlQXR0cmlidXRlKCdkYXRhLXNjcm9sbC1sb2NrLWxvY2tlZCcpO1xuICB9XG59O1xuXG52YXIgZmlsbEdhcHMgPSBmdW5jdGlvbiBmaWxsR2FwcygpIHtcbiAgc3RhdGUuZmlsbEdhcFNlbGVjdG9ycy5tYXAoZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gICAgc2Nyb2xsX2xvY2tfZmlsbEdhcFNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgfSk7XG59O1xuXG52YXIgdW5maWxsR2FwcyA9IGZ1bmN0aW9uIHVuZmlsbEdhcHMoKSB7XG4gIHN0YXRlLmZpbGxHYXBTZWxlY3RvcnMubWFwKGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICAgIHNjcm9sbF9sb2NrX3VuZmlsbEdhcFNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgfSk7XG59O1xuXG52YXIgc2Nyb2xsX2xvY2tfZmlsbEdhcFNlbGVjdG9yID0gZnVuY3Rpb24gZmlsbEdhcFNlbGVjdG9yKHNlbGVjdG9yKSB7XG4gIHZhciAkdGFyZ2V0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuICB2YXIgaXNMb2NrYWJsZSA9IHN0YXRlLmxvY2thYmxlU2VsZWN0b3JzLmluZGV4T2Yoc2VsZWN0b3IpICE9PSAtMTtcbiAgZWFjaE5vZGUoJHRhcmdldHMsIGZ1bmN0aW9uICgkdGFyZ2V0KSB7XG4gICAgc2Nyb2xsX2xvY2tfZmlsbEdhcFRhcmdldCgkdGFyZ2V0LCBpc0xvY2thYmxlKTtcbiAgfSk7XG59O1xuXG52YXIgc2Nyb2xsX2xvY2tfZmlsbEdhcFRhcmdldCA9IGZ1bmN0aW9uIGZpbGxHYXBUYXJnZXQoJHRhcmdldCkge1xuICB2YXIgaXNMb2NrYWJsZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogZmFsc2U7XG5cbiAgaWYgKGlzRWxlbWVudCgkdGFyZ2V0KSkge1xuICAgIHZhciBzY3JvbGxCYXJXaWR0aDtcblxuICAgIGlmICgkdGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1zY3JvbGwtbG9jay1sb2NrYWJsZScpID09PSAnJyB8fCBpc0xvY2thYmxlKSB7XG4gICAgICBzY3JvbGxCYXJXaWR0aCA9IHNjcm9sbF9sb2NrX2dldFRhcmdldFNjcm9sbEJhcldpZHRoKCR0YXJnZXQsIHRydWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgJGxvY2thYmxlUGFyZW50ID0gZmluZFBhcmVudEJ5U2VsZWN0b3IoJHRhcmdldCwgYXJyYXlBc1NlbGVjdG9yKHN0YXRlLmxvY2thYmxlU2VsZWN0b3JzKSk7XG4gICAgICBzY3JvbGxCYXJXaWR0aCA9IHNjcm9sbF9sb2NrX2dldFRhcmdldFNjcm9sbEJhcldpZHRoKCRsb2NrYWJsZVBhcmVudCwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgaWYgKCR0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXNjcm9sbC1sb2NrLWZpbGxlZC1nYXAnKSA9PT0gJ3RydWUnKSB7XG4gICAgICBzY3JvbGxfbG9ja191bmZpbGxHYXBUYXJnZXQoJHRhcmdldCk7XG4gICAgfVxuXG4gICAgdmFyIGNvbXB1dGVkU3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSgkdGFyZ2V0KTtcbiAgICAkdGFyZ2V0LnNldEF0dHJpYnV0ZSgnZGF0YS1zY3JvbGwtbG9jay1maWxsZWQtZ2FwJywgJ3RydWUnKTtcbiAgICAkdGFyZ2V0LnNldEF0dHJpYnV0ZSgnZGF0YS1zY3JvbGwtbG9jay1jdXJyZW50LWZpbGwtZ2FwLW1ldGhvZCcsIHN0YXRlLmZpbGxHYXBNZXRob2QpO1xuXG4gICAgaWYgKHN0YXRlLmZpbGxHYXBNZXRob2QgPT09ICdtYXJnaW4nKSB7XG4gICAgICB2YXIgY3VycmVudE1hcmdpbiA9IHBhcnNlRmxvYXQoY29tcHV0ZWRTdHlsZS5tYXJnaW5SaWdodCk7XG4gICAgICAkdGFyZ2V0LnN0eWxlLm1hcmdpblJpZ2h0ID0gXCJcIi5jb25jYXQoY3VycmVudE1hcmdpbiArIHNjcm9sbEJhcldpZHRoLCBcInB4XCIpO1xuICAgIH0gZWxzZSBpZiAoc3RhdGUuZmlsbEdhcE1ldGhvZCA9PT0gJ3dpZHRoJykge1xuICAgICAgJHRhcmdldC5zdHlsZS53aWR0aCA9IFwiY2FsYygxMDAlIC0gXCIuY29uY2F0KHNjcm9sbEJhcldpZHRoLCBcInB4KVwiKTtcbiAgICB9IGVsc2UgaWYgKHN0YXRlLmZpbGxHYXBNZXRob2QgPT09ICdtYXgtd2lkdGgnKSB7XG4gICAgICAkdGFyZ2V0LnN0eWxlLm1heFdpZHRoID0gXCJjYWxjKDEwMCUgLSBcIi5jb25jYXQoc2Nyb2xsQmFyV2lkdGgsIFwicHgpXCIpO1xuICAgIH0gZWxzZSBpZiAoc3RhdGUuZmlsbEdhcE1ldGhvZCA9PT0gJ3BhZGRpbmcnKSB7XG4gICAgICB2YXIgY3VycmVudFBhZGRpbmcgPSBwYXJzZUZsb2F0KGNvbXB1dGVkU3R5bGUucGFkZGluZ1JpZ2h0KTtcbiAgICAgICR0YXJnZXQuc3R5bGUucGFkZGluZ1JpZ2h0ID0gXCJcIi5jb25jYXQoY3VycmVudFBhZGRpbmcgKyBzY3JvbGxCYXJXaWR0aCwgXCJweFwiKTtcbiAgICB9XG4gIH1cbn07XG5cbnZhciBzY3JvbGxfbG9ja191bmZpbGxHYXBTZWxlY3RvciA9IGZ1bmN0aW9uIHVuZmlsbEdhcFNlbGVjdG9yKHNlbGVjdG9yKSB7XG4gIHZhciAkdGFyZ2V0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuICBlYWNoTm9kZSgkdGFyZ2V0cywgZnVuY3Rpb24gKCR0YXJnZXQpIHtcbiAgICBzY3JvbGxfbG9ja191bmZpbGxHYXBUYXJnZXQoJHRhcmdldCk7XG4gIH0pO1xufTtcblxudmFyIHNjcm9sbF9sb2NrX3VuZmlsbEdhcFRhcmdldCA9IGZ1bmN0aW9uIHVuZmlsbEdhcFRhcmdldCgkdGFyZ2V0KSB7XG4gIGlmIChpc0VsZW1lbnQoJHRhcmdldCkpIHtcbiAgICBpZiAoJHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2Nyb2xsLWxvY2stZmlsbGVkLWdhcCcpID09PSAndHJ1ZScpIHtcbiAgICAgIHZhciBjdXJyZW50RmlsbEdhcE1ldGhvZCA9ICR0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXNjcm9sbC1sb2NrLWN1cnJlbnQtZmlsbC1nYXAtbWV0aG9kJyk7XG4gICAgICAkdGFyZ2V0LnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS1zY3JvbGwtbG9jay1maWxsZWQtZ2FwJyk7XG4gICAgICAkdGFyZ2V0LnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS1zY3JvbGwtbG9jay1jdXJyZW50LWZpbGwtZ2FwLW1ldGhvZCcpO1xuXG4gICAgICBpZiAoY3VycmVudEZpbGxHYXBNZXRob2QgPT09ICdtYXJnaW4nKSB7XG4gICAgICAgICR0YXJnZXQuc3R5bGUubWFyZ2luUmlnaHQgPSBcIlwiO1xuICAgICAgfSBlbHNlIGlmIChjdXJyZW50RmlsbEdhcE1ldGhvZCA9PT0gJ3dpZHRoJykge1xuICAgICAgICAkdGFyZ2V0LnN0eWxlLndpZHRoID0gXCJcIjtcbiAgICAgIH0gZWxzZSBpZiAoY3VycmVudEZpbGxHYXBNZXRob2QgPT09ICdtYXgtd2lkdGgnKSB7XG4gICAgICAgICR0YXJnZXQuc3R5bGUubWF4V2lkdGggPSBcIlwiO1xuICAgICAgfSBlbHNlIGlmIChjdXJyZW50RmlsbEdhcE1ldGhvZCA9PT0gJ3BhZGRpbmcnKSB7XG4gICAgICAgICR0YXJnZXQuc3R5bGUucGFkZGluZ1JpZ2h0ID0gXCJcIjtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5cbnZhciBvblJlc2l6ZSA9IGZ1bmN0aW9uIG9uUmVzaXplKGUpIHtcbiAgcmVmaWxsR2FwcygpO1xufTtcblxudmFyIG9uVG91Y2hTdGFydCA9IGZ1bmN0aW9uIG9uVG91Y2hTdGFydChlKSB7XG4gIGlmICghc3RhdGUuc2Nyb2xsKSB7XG4gICAgc3RhdGUuc3RhcnRUb3VjaFkgPSBlLnRvdWNoZXNbMF0uY2xpZW50WTtcbiAgICBzdGF0ZS5zdGFydFRvdWNoWCA9IGUudG91Y2hlc1swXS5jbGllbnRYO1xuICB9XG59O1xuXG52YXIgc2Nyb2xsX2xvY2tfb25Ub3VjaE1vdmUgPSBmdW5jdGlvbiBvblRvdWNoTW92ZShlKSB7XG4gIGlmICghc3RhdGUuc2Nyb2xsKSB7XG4gICAgdmFyIHN0YXJ0VG91Y2hZID0gc3RhdGUuc3RhcnRUb3VjaFksXG4gICAgICAgIHN0YXJ0VG91Y2hYID0gc3RhdGUuc3RhcnRUb3VjaFg7XG4gICAgdmFyIGN1cnJlbnRDbGllbnRZID0gZS50b3VjaGVzWzBdLmNsaWVudFk7XG4gICAgdmFyIGN1cnJlbnRDbGllbnRYID0gZS50b3VjaGVzWzBdLmNsaWVudFg7XG5cbiAgICBpZiAoZS50b3VjaGVzLmxlbmd0aCA8IDIpIHtcbiAgICAgIHZhciBzZWxlY3RvciA9IGFycmF5QXNTZWxlY3RvcihzdGF0ZS5zY3JvbGxhYmxlU2VsZWN0b3JzKTtcbiAgICAgIHZhciBkaXJlY3Rpb24gPSB7XG4gICAgICAgIHVwOiBzdGFydFRvdWNoWSA8IGN1cnJlbnRDbGllbnRZLFxuICAgICAgICBkb3duOiBzdGFydFRvdWNoWSA+IGN1cnJlbnRDbGllbnRZLFxuICAgICAgICBsZWZ0OiBzdGFydFRvdWNoWCA8IGN1cnJlbnRDbGllbnRYLFxuICAgICAgICByaWdodDogc3RhcnRUb3VjaFggPiBjdXJyZW50Q2xpZW50WFxuICAgICAgfTtcbiAgICAgIHZhciBkaXJlY3Rpb25XaXRoT2Zmc2V0ID0ge1xuICAgICAgICB1cDogc3RhcnRUb3VjaFkgKyBUT1VDSF9ESVJFQ1RJT05fREVURUNUX09GRlNFVCA8IGN1cnJlbnRDbGllbnRZLFxuICAgICAgICBkb3duOiBzdGFydFRvdWNoWSAtIFRPVUNIX0RJUkVDVElPTl9ERVRFQ1RfT0ZGU0VUID4gY3VycmVudENsaWVudFksXG4gICAgICAgIGxlZnQ6IHN0YXJ0VG91Y2hYICsgVE9VQ0hfRElSRUNUSU9OX0RFVEVDVF9PRkZTRVQgPCBjdXJyZW50Q2xpZW50WCxcbiAgICAgICAgcmlnaHQ6IHN0YXJ0VG91Y2hYIC0gVE9VQ0hfRElSRUNUSU9OX0RFVEVDVF9PRkZTRVQgPiBjdXJyZW50Q2xpZW50WFxuICAgICAgfTtcblxuICAgICAgdmFyIGhhbmRsZSA9IGZ1bmN0aW9uIGhhbmRsZSgkZWwpIHtcbiAgICAgICAgdmFyIHNraXAgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IGZhbHNlO1xuXG4gICAgICAgIGlmICgkZWwpIHtcbiAgICAgICAgICB2YXIgcGFyZW50U2Nyb2xsYWJsZUVsID0gZmluZFBhcmVudEJ5U2VsZWN0b3IoJGVsLCBzZWxlY3RvciwgZmFsc2UpO1xuXG4gICAgICAgICAgaWYgKGVsZW1lbnRJc0lucHV0UmFuZ2UoJGVsKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChza2lwIHx8IGVsZW1lbnRJc1Njcm9sbGFibGVGaWVsZCgkZWwpICYmIGZpbmRQYXJlbnRCeVNlbGVjdG9yKCRlbCwgc2VsZWN0b3IpIHx8IGVsZW1lbnRIYXNTZWxlY3RvcigkZWwsIHNlbGVjdG9yKSkge1xuICAgICAgICAgICAgdmFyIHByZXZlbnQgPSBmYWxzZTtcblxuICAgICAgICAgICAgaWYgKGVsZW1lbnRTY3JvbGxMZWZ0T25TdGFydCgkZWwpICYmIGVsZW1lbnRTY3JvbGxMZWZ0T25FbmQoJGVsKSkge1xuICAgICAgICAgICAgICBpZiAoZGlyZWN0aW9uLnVwICYmIGVsZW1lbnRTY3JvbGxUb3BPblN0YXJ0KCRlbCkgfHwgZGlyZWN0aW9uLmRvd24gJiYgZWxlbWVudFNjcm9sbFRvcE9uRW5kKCRlbCkpIHtcbiAgICAgICAgICAgICAgICBwcmV2ZW50ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChlbGVtZW50U2Nyb2xsVG9wT25TdGFydCgkZWwpICYmIGVsZW1lbnRTY3JvbGxUb3BPbkVuZCgkZWwpKSB7XG4gICAgICAgICAgICAgIGlmIChkaXJlY3Rpb24ubGVmdCAmJiBlbGVtZW50U2Nyb2xsTGVmdE9uU3RhcnQoJGVsKSB8fCBkaXJlY3Rpb24ucmlnaHQgJiYgZWxlbWVudFNjcm9sbExlZnRPbkVuZCgkZWwpKSB7XG4gICAgICAgICAgICAgICAgcHJldmVudCA9IHRydWU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uV2l0aE9mZnNldC51cCAmJiBlbGVtZW50U2Nyb2xsVG9wT25TdGFydCgkZWwpIHx8IGRpcmVjdGlvbldpdGhPZmZzZXQuZG93biAmJiBlbGVtZW50U2Nyb2xsVG9wT25FbmQoJGVsKSB8fCBkaXJlY3Rpb25XaXRoT2Zmc2V0LmxlZnQgJiYgZWxlbWVudFNjcm9sbExlZnRPblN0YXJ0KCRlbCkgfHwgZGlyZWN0aW9uV2l0aE9mZnNldC5yaWdodCAmJiBlbGVtZW50U2Nyb2xsTGVmdE9uRW5kKCRlbCkpIHtcbiAgICAgICAgICAgICAgcHJldmVudCA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChwcmV2ZW50KSB7XG4gICAgICAgICAgICAgIGlmIChwYXJlbnRTY3JvbGxhYmxlRWwpIHtcbiAgICAgICAgICAgICAgICBoYW5kbGUocGFyZW50U2Nyb2xsYWJsZUVsLCB0cnVlKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoZS5jYW5jZWxhYmxlKSB7XG4gICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGhhbmRsZShwYXJlbnRTY3JvbGxhYmxlRWwpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoZS5jYW5jZWxhYmxlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBoYW5kbGUoZS50YXJnZXQpO1xuICAgIH1cbiAgfVxufTtcblxudmFyIG9uVG91Y2hFbmQgPSBmdW5jdGlvbiBvblRvdWNoRW5kKGUpIHtcbiAgaWYgKCFzdGF0ZS5zY3JvbGwpIHtcbiAgICBzdGF0ZS5zdGFydFRvdWNoWSA9IDA7XG4gICAgc3RhdGUuc3RhcnRUb3VjaFggPSAwO1xuICB9XG59O1xuXG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIG9uUmVzaXplKTtcbn1cblxuaWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIG9uVG91Y2hTdGFydCk7XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHNjcm9sbF9sb2NrX29uVG91Y2hNb3ZlLCB7XG4gICAgcGFzc2l2ZTogZmFsc2VcbiAgfSk7XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgb25Ub3VjaEVuZCk7XG59XG5cbnZhciBkZXByZWNhdGVkTWV0aG9kcyA9IHtcbiAgaGlkZTogZnVuY3Rpb24gaGlkZSh0YXJnZXQpIHtcbiAgICB0aHJvd0Vycm9yKCdcImhpZGVcIiBpcyBkZXByZWNhdGVkISBVc2UgXCJkaXNhYmxlUGFnZVNjcm9sbFwiIGluc3RlYWQuIFxcbiBodHRwczovL2dpdGh1Yi5jb20vRkwzTktFWS9zY3JvbGwtbG9jayNkaXNhYmxlcGFnZXNjcm9sbHNjcm9sbGFibGV0YXJnZXQnKTtcbiAgICBkaXNhYmxlUGFnZVNjcm9sbCh0YXJnZXQpO1xuICB9LFxuICBzaG93OiBmdW5jdGlvbiBzaG93KHRhcmdldCkge1xuICAgIHRocm93RXJyb3IoJ1wic2hvd1wiIGlzIGRlcHJlY2F0ZWQhIFVzZSBcImVuYWJsZVBhZ2VTY3JvbGxcIiBpbnN0ZWFkLiBcXG4gaHR0cHM6Ly9naXRodWIuY29tL0ZMM05LRVkvc2Nyb2xsLWxvY2sjZW5hYmxlcGFnZXNjcm9sbHNjcm9sbGFibGV0YXJnZXQnKTtcbiAgICBlbmFibGVQYWdlU2Nyb2xsKHRhcmdldCk7XG4gIH0sXG4gIHRvZ2dsZTogZnVuY3Rpb24gdG9nZ2xlKHRhcmdldCkge1xuICAgIHRocm93RXJyb3IoJ1widG9nZ2xlXCIgaXMgZGVwcmVjYXRlZCEgRG8gbm90IHVzZSBpdC4nKTtcblxuICAgIGlmIChnZXRTY3JvbGxTdGF0ZSgpKSB7XG4gICAgICBkaXNhYmxlUGFnZVNjcm9sbCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbmFibGVQYWdlU2Nyb2xsKHRhcmdldCk7XG4gICAgfVxuICB9LFxuICBnZXRTdGF0ZTogZnVuY3Rpb24gZ2V0U3RhdGUoKSB7XG4gICAgdGhyb3dFcnJvcignXCJnZXRTdGF0ZVwiIGlzIGRlcHJlY2F0ZWQhIFVzZSBcImdldFNjcm9sbFN0YXRlXCIgaW5zdGVhZC4gXFxuIGh0dHBzOi8vZ2l0aHViLmNvbS9GTDNOS0VZL3Njcm9sbC1sb2NrI2dldHNjcm9sbHN0YXRlJyk7XG4gICAgcmV0dXJuIGdldFNjcm9sbFN0YXRlKCk7XG4gIH0sXG4gIGdldFdpZHRoOiBmdW5jdGlvbiBnZXRXaWR0aCgpIHtcbiAgICB0aHJvd0Vycm9yKCdcImdldFdpZHRoXCIgaXMgZGVwcmVjYXRlZCEgVXNlIFwiZ2V0UGFnZVNjcm9sbEJhcldpZHRoXCIgaW5zdGVhZC4gXFxuIGh0dHBzOi8vZ2l0aHViLmNvbS9GTDNOS0VZL3Njcm9sbC1sb2NrI2dldHBhZ2VzY3JvbGxiYXJ3aWR0aCcpO1xuICAgIHJldHVybiBnZXRQYWdlU2Nyb2xsQmFyV2lkdGgoKTtcbiAgfSxcbiAgZ2V0Q3VycmVudFdpZHRoOiBmdW5jdGlvbiBnZXRDdXJyZW50V2lkdGgoKSB7XG4gICAgdGhyb3dFcnJvcignXCJnZXRDdXJyZW50V2lkdGhcIiBpcyBkZXByZWNhdGVkISBVc2UgXCJnZXRDdXJyZW50UGFnZVNjcm9sbEJhcldpZHRoXCIgaW5zdGVhZC4gXFxuIGh0dHBzOi8vZ2l0aHViLmNvbS9GTDNOS0VZL3Njcm9sbC1sb2NrI2dldGN1cnJlbnRwYWdlc2Nyb2xsYmFyd2lkdGgnKTtcbiAgICByZXR1cm4gZ2V0Q3VycmVudFBhZ2VTY3JvbGxCYXJXaWR0aCgpO1xuICB9LFxuICBzZXRTY3JvbGxhYmxlVGFyZ2V0czogZnVuY3Rpb24gc2V0U2Nyb2xsYWJsZVRhcmdldHModGFyZ2V0KSB7XG4gICAgdGhyb3dFcnJvcignXCJzZXRTY3JvbGxhYmxlVGFyZ2V0c1wiIGlzIGRlcHJlY2F0ZWQhIFVzZSBcImFkZFNjcm9sbGFibGVUYXJnZXRcIiBpbnN0ZWFkLiBcXG4gaHR0cHM6Ly9naXRodWIuY29tL0ZMM05LRVkvc2Nyb2xsLWxvY2sjYWRkc2Nyb2xsYWJsZXRhcmdldHNjcm9sbGFibGV0YXJnZXQnKTtcbiAgICBzY3JvbGxfbG9ja19hZGRTY3JvbGxhYmxlVGFyZ2V0KHRhcmdldCk7XG4gIH0sXG4gIHNldEZpbGxHYXBTZWxlY3RvcnM6IGZ1bmN0aW9uIHNldEZpbGxHYXBTZWxlY3RvcnMoc2VsZWN0b3IpIHtcbiAgICB0aHJvd0Vycm9yKCdcInNldEZpbGxHYXBTZWxlY3RvcnNcIiBpcyBkZXByZWNhdGVkISBVc2UgXCJhZGRGaWxsR2FwU2VsZWN0b3JcIiBpbnN0ZWFkLiBcXG4gaHR0cHM6Ly9naXRodWIuY29tL0ZMM05LRVkvc2Nyb2xsLWxvY2sjYWRkZmlsbGdhcHNlbGVjdG9yZmlsbGdhcHNlbGVjdG9yJyk7XG4gICAgc2Nyb2xsX2xvY2tfYWRkRmlsbEdhcFNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgfSxcbiAgc2V0RmlsbEdhcFRhcmdldHM6IGZ1bmN0aW9uIHNldEZpbGxHYXBUYXJnZXRzKHRhcmdldCkge1xuICAgIHRocm93RXJyb3IoJ1wic2V0RmlsbEdhcFRhcmdldHNcIiBpcyBkZXByZWNhdGVkISBVc2UgXCJhZGRGaWxsR2FwVGFyZ2V0XCIgaW5zdGVhZC4gXFxuIGh0dHBzOi8vZ2l0aHViLmNvbS9GTDNOS0VZL3Njcm9sbC1sb2NrI2FkZGZpbGxnYXB0YXJnZXRmaWxsZ2FwdGFyZ2V0Jyk7XG4gICAgc2Nyb2xsX2xvY2tfYWRkRmlsbEdhcFRhcmdldCh0YXJnZXQpO1xuICB9LFxuICBjbGVhclF1ZXVlOiBmdW5jdGlvbiBjbGVhclF1ZXVlKCkge1xuICAgIHRocm93RXJyb3IoJ1wiY2xlYXJRdWV1ZVwiIGlzIGRlcHJlY2F0ZWQhIFVzZSBcImNsZWFyUXVldWVTY3JvbGxMb2Nrc1wiIGluc3RlYWQuIFxcbiBodHRwczovL2dpdGh1Yi5jb20vRkwzTktFWS9zY3JvbGwtbG9jayNjbGVhcnF1ZXVlc2Nyb2xsbG9ja3MnKTtcbiAgICBjbGVhclF1ZXVlU2Nyb2xsTG9ja3MoKTtcbiAgfVxufTtcblxudmFyIHNjcm9sbExvY2sgPSBfb2JqZWN0U3ByZWFkKHtcbiAgZGlzYWJsZVBhZ2VTY3JvbGw6IGRpc2FibGVQYWdlU2Nyb2xsLFxuICBlbmFibGVQYWdlU2Nyb2xsOiBlbmFibGVQYWdlU2Nyb2xsLFxuICBnZXRTY3JvbGxTdGF0ZTogZ2V0U2Nyb2xsU3RhdGUsXG4gIGNsZWFyUXVldWVTY3JvbGxMb2NrczogY2xlYXJRdWV1ZVNjcm9sbExvY2tzLFxuICBnZXRUYXJnZXRTY3JvbGxCYXJXaWR0aDogc2Nyb2xsX2xvY2tfZ2V0VGFyZ2V0U2Nyb2xsQmFyV2lkdGgsXG4gIGdldEN1cnJlbnRUYXJnZXRTY3JvbGxCYXJXaWR0aDogc2Nyb2xsX2xvY2tfZ2V0Q3VycmVudFRhcmdldFNjcm9sbEJhcldpZHRoLFxuICBnZXRQYWdlU2Nyb2xsQmFyV2lkdGg6IGdldFBhZ2VTY3JvbGxCYXJXaWR0aCxcbiAgZ2V0Q3VycmVudFBhZ2VTY3JvbGxCYXJXaWR0aDogZ2V0Q3VycmVudFBhZ2VTY3JvbGxCYXJXaWR0aCxcbiAgYWRkU2Nyb2xsYWJsZVNlbGVjdG9yOiBzY3JvbGxfbG9ja19hZGRTY3JvbGxhYmxlU2VsZWN0b3IsXG4gIHJlbW92ZVNjcm9sbGFibGVTZWxlY3Rvcjogc2Nyb2xsX2xvY2tfcmVtb3ZlU2Nyb2xsYWJsZVNlbGVjdG9yLFxuICBhZGRTY3JvbGxhYmxlVGFyZ2V0OiBzY3JvbGxfbG9ja19hZGRTY3JvbGxhYmxlVGFyZ2V0LFxuICByZW1vdmVTY3JvbGxhYmxlVGFyZ2V0OiBzY3JvbGxfbG9ja19yZW1vdmVTY3JvbGxhYmxlVGFyZ2V0LFxuICBhZGRMb2NrYWJsZVNlbGVjdG9yOiBzY3JvbGxfbG9ja19hZGRMb2NrYWJsZVNlbGVjdG9yLFxuICBhZGRMb2NrYWJsZVRhcmdldDogc2Nyb2xsX2xvY2tfYWRkTG9ja2FibGVUYXJnZXQsXG4gIGFkZEZpbGxHYXBTZWxlY3Rvcjogc2Nyb2xsX2xvY2tfYWRkRmlsbEdhcFNlbGVjdG9yLFxuICByZW1vdmVGaWxsR2FwU2VsZWN0b3I6IHNjcm9sbF9sb2NrX3JlbW92ZUZpbGxHYXBTZWxlY3RvcixcbiAgYWRkRmlsbEdhcFRhcmdldDogc2Nyb2xsX2xvY2tfYWRkRmlsbEdhcFRhcmdldCxcbiAgcmVtb3ZlRmlsbEdhcFRhcmdldDogc2Nyb2xsX2xvY2tfcmVtb3ZlRmlsbEdhcFRhcmdldCxcbiAgc2V0RmlsbEdhcE1ldGhvZDogc2Nyb2xsX2xvY2tfc2V0RmlsbEdhcE1ldGhvZCxcbiAgcmVmaWxsR2FwczogcmVmaWxsR2FwcyxcbiAgX3N0YXRlOiBzdGF0ZVxufSwgZGVwcmVjYXRlZE1ldGhvZHMpO1xuXG4vKiBoYXJtb255IGRlZmF1bHQgZXhwb3J0ICovIHZhciBzY3JvbGxfbG9jayA9IF9fd2VicGFja19leHBvcnRzX19bXCJkZWZhdWx0XCJdID0gKHNjcm9sbExvY2spO1xuXG4vKioqLyB9KVxuLyoqKioqKi8gXSlbXCJkZWZhdWx0XCJdO1xufSk7IiwidmFyIGc7XG5cbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXG5nID0gKGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcztcbn0pKCk7XG5cbnRyeSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxuXHRnID0gZyB8fCBuZXcgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpO1xufSBjYXRjaCAoZSkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxuXHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIikgZyA9IHdpbmRvdztcbn1cblxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3Ncbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cblxubW9kdWxlLmV4cG9ydHMgPSBnO1xuIiwiLy8gR0lBIENPTVBPTkVOVFNcbmltcG9ydCBsb2FkQ29tcG9uZW50cyBmcm9tICdnaWEvbG9hZENvbXBvbmVudHMnXG5pbXBvcnQgY29tcG9uZW50cyBmcm9tICcuL2pzL21vZHVsZXMnXG5cbi8vIGltcG9ydGluZyBzdmdzIGFuZCBpbWFnZXMgZm9yIHdlYnBhY2tcbmltcG9ydCBBcnJvd0ljb24gZnJvbSAnLi9zdmcvYXJyb3cuc3ZnJ1xuaW1wb3J0IFNlYXJjaEljb24gZnJvbSAnLi9zdmcvc2VhcmNoLnN2ZydcbmltcG9ydCBIcFBhcnRuZXJzTG9nbyBmcm9tICcuL3N2Zy9ocC1wYXJ0bmVycy1sb2dvLnN2ZydcblxubG9hZENvbXBvbmVudHMoY29tcG9uZW50cylcbiIsImltcG9ydCBDb21wb25lbnQgZnJvbSAnZ2lhL0NvbXBvbmVudCdcbmltcG9ydCAnbGF6eXNpemVzJyAgLy8gYWx3YXlzIGxvYWQgbGF6eXNpemVzLCByZXF1aXJlcyBubyBmdXJ0aGVyIGNvbmZpZ1xuaW1wb3J0IGdldENvbXBvbmVudEZyb21FbGVtZW50IGZyb20gJ2dpYS9nZXRDb21wb25lbnRGcm9tRWxlbWVudCdcblxuXG4vLyBXcmFwcGVyIGZvciBnbG9iYWwgSmF2YXNjcmlwdCBkZXBlbmRlbmNpZXNcbi8vIEVuYWJsZS9kaXNhYmxlIG9uIHBlciBiYWdlIGJhc2lzIHdpdGggb3B0aW9ucyBvbiBib2R5IHRhZ1xuY2xhc3MgQmFzZVRoZW1lIGV4dGVuZHMgQ29tcG9uZW50IHtcblxuXHRjb25zdHJ1Y3RvcihlbGVtZW50KSB7XG5cblx0XHRzdXBlcihlbGVtZW50KVxuXG5cdFx0Ly8gKGh0dHBzOi8vZ2l0aHViLmNvbS9lZHVhcmRvYm91Y2FzL2luY2x1ZGUtbWVkaWEtZXhwb3J0KSAtIGFkZGluZyBtZWRpYSBxdWVyaWVzIHRvIHRoaXMgbW9kdWxlIHRoYXQgd2lsbCBiZWNvbWUgYWNjZXNzaWJsZSBieTogZ2xvYmFsLmJhc2UubWVkaWFRdWVyeVxuXHRcdHRoaXMubWVkaWFRdWVyeSA9IHJlcXVpcmUoJy4uLy4uL25vZGVfbW9kdWxlcy9pbmNsdWRlLW1lZGlhLWV4cG9ydC9kaXN0L2luY2x1ZGUtbWVkaWEtMS4wLjIubWluLmpzJylcblxuXHRcdHRoaXMubGF0ZXN0S25vd25TY3JvbGxZID0gMFxuXHRcdHRoaXMubGFzdFNjcm9sbFRvcCA9IDBcblxuXHRcdC8vIGNyZWF0ZSBnbG9iYWwgb2JqZWN0IG9mIHRoaXMgc3BlY2lhbCBjb21wb25lbnQgaW5zdGFuY2Vcblx0XHRnbG9iYWwuYmFzZSA9IGdldENvbXBvbmVudEZyb21FbGVtZW50KGRvY3VtZW50LmJvZHkpXG5cdH1cblxuXG5cblx0bW91bnQoKSB7XG5cblx0XHR0aGlzLmluaXRTY3JvbGxIYW5kbGVyKClcblx0XHR0aGlzLmluaXRSZXNpemVIYW5kbGVyKClcblx0fVxuXG5cdGluaXRTY3JvbGxIYW5kbGVyKCkge1xuXG5cdFx0dGhpcy5sYXRlc3RLbm93blNjcm9sbFkgPSAwXG5cdFx0bGV0IHRpY2sgPSBmYWxzZSAgLy8gVHJhY2sgd2hldGhlciBjYWxsIGlzIGN1cnJlbnRseSBpbiBwcm9jZXNzXG5cblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgKCkgPT4ge1xuXG5cdFx0XHR0aGlzLmxhdGVzdEtub3duU2Nyb2xsWSA9IHdpbmRvdy5zY3JvbGxZXG5cdFx0XHQvLyBuZWVkcyB0byBiZSBvdXQgb2YgdGhlIHRpbWVvdXQgdG8gZW5zdXJlIHJlc3VsdCBpcyBhY2N1cmF0ZVxuXHRcdFx0dGhpcy5zY3JvbGxEaXJlY3Rpb24odGhpcy5sYXRlc3RLbm93blNjcm9sbFkpXG5cblx0XHRcdGlmICghdGljaykge1xuXHRcdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdFx0XHRnbG9iYWwuc2Nyb2xsRXZlbnRzLmZvckVhY2goKHNjcm9sbEhhbmRsZXIpID0+IHtcblx0XHRcdFx0XHRcdHNjcm9sbEhhbmRsZXIodGhpcy5sYXRlc3RLbm93blNjcm9sbFkpXG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0XHR0aWNrID0gZmFsc2Vcblx0XHRcdFx0fSwgMTAwKVxuXHRcdFx0fVxuXHRcdFx0dGljayA9IHRydWVcblx0XHR9KVxuXHR9XG5cblxuXHRpbml0UmVzaXplSGFuZGxlcigpIHtcblxuXHRcdGxldCBmb3JMYXN0RXhlY1xuXHRcdGxldCBkZWxheSA9IDEwMCAvLyBkZWxheSBiZXR3ZWVuIGNhbGxzXG5cdFx0bGV0IHRocm90dGxlZCA9IGZhbHNlIC8vIGFyZSB3ZSBjdXJyZW50bHkgdGhyb3R0bGVkP1xuXG5cdFx0Ly8gd2luZG93LnJlc2l6ZSBldmVudCBsaXN0ZW5lclxuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCAoKSA9PiB7XG5cblx0XHRcdC8vIG9ubHkgcnVuIGlmIHdlJ3JlIG5vdCB0aHJvdHRsZWRcblx0XHRcdGlmICghdGhyb3R0bGVkKSB7XG5cblx0XHRcdFx0Ly8gYWN0dWFsIGNhbGxiYWNrIGFjdGlvblxuXHRcdFx0XHRnbG9iYWwucmVzaXplRXZlbnRzLmZvckVhY2goKHJlc2l6ZUhhbmRsZXIpID0+IHtcblx0XHRcdFx0XHRyZXNpemVIYW5kbGVyKClcblx0XHRcdFx0fSlcblx0XHRcdFx0Ly8gd2UncmUgdGhyb3R0bGVkIVxuXHRcdFx0XHR0aHJvdHRsZWQgPSB0cnVlXG5cdFx0XHRcdC8vIHNldCBhIHRpbWVvdXQgdG8gdW4tdGhyb3R0bGVcblx0XHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHRcdFx0dGhyb3R0bGVkID0gZmFsc2Vcblx0XHRcdFx0fSwgZGVsYXkpXG5cdFx0XHR9XG5cblx0XHRcdGNsZWFyVGltZW91dChmb3JMYXN0RXhlYyk7XG5cblx0XHRcdC8vIHRoaXMgaXMgbWVzc3khXG5cdFx0XHRmb3JMYXN0RXhlYyA9IHNldFRpbWVvdXQoKCkgPT4ge1xuXHRcdFx0XHRnbG9iYWwucmVzaXplRXZlbnRzLmZvckVhY2goKHJlc2l6ZUhhbmRsZXIpID0+IHtcblx0XHRcdFx0XHRyZXNpemVIYW5kbGVyKClcblx0XHRcdFx0fSlcblx0XHRcdH0sIGRlbGF5KVxuXHRcdH0pXG5cdH1cblxuXHRzY3JvbGxEaXJlY3Rpb24oY3VycmVudFNjcm9sbFkpIHtcblxuXHRcdGdsb2JhbC5zY3JvbGxEaXJlY3Rpb24gPSAoY3VycmVudFNjcm9sbFkgPCB0aGlzLmxhc3RTY3JvbGxUb3ApID8gJ3VwJyA6ICdkb3duJ1xuICAgIHRoaXMubGFzdFNjcm9sbFRvcCA9IGN1cnJlbnRTY3JvbGxZXG5cdH1cbn1cblxuLy8gRXhwb3J0IEVTNiBtb2R1bGVcbmV4cG9ydCBkZWZhdWx0IEJhc2VUaGVtZTtcbiIsImltcG9ydCBDb21wb25lbnQgZnJvbSAnZ2lhL0NvbXBvbmVudCdcblxuXG4vLyBXcmFwcGVyIGZvciBnbG9iYWwgSmF2YXNjcmlwdCBkZXBlbmRlbmNpZXNcbi8vIEVuYWJsZS9kaXNhYmxlIG9uIHBlciBiYWdlIGJhc2lzIHdpdGggb3B0aW9ucyBvbiBib2R5IHRhZ1xuY2xhc3MgRm9ybSBleHRlbmRzIENvbXBvbmVudCB7XG5cblx0Y29uc3RydWN0b3IoZWxlbWVudCkge1xuXG5cdFx0c3VwZXIoZWxlbWVudClcblxuXHR9XG5cblx0bW91bnQoKSB7XG5cblx0XHQkKFwiLndwY2Y3IC5mb3JtLWNvbnRyb2xcIikuZm9jdXMoZnVuY3Rpb24oKXtcblx0XHRcdCQodGhpcykucGFyZW50KCkucGFyZW50KCkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdH0pLmJsdXIoZnVuY3Rpb24oKXtcblx0XHRcdHZhciBjdmFsID0gJCh0aGlzKS52YWwoKVxuXHRcdFx0aWYoY3ZhbC5sZW5ndGggPCAxKSB7JCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG5cdFx0XHR9XG5cdFx0fSlcblx0fVxufVxuXG4vLyBFeHBvcnQgRVM2IG1vZHVsZVxuZXhwb3J0IGRlZmF1bHQgRm9ybTtcbiIsIi8vIGltcG9ydCBHSUEgZGVwZW5kYW5jeVxuaW1wb3J0IENvbXBvbmVudCBmcm9tICdnaWEvQ29tcG9uZW50J1xuaW1wb3J0IGV2ZW50YnVzIGZyb20gJ2dpYS9ldmVudGJ1cydcblxuLy8gRXh0ZW5kIHRoZSBHSUEgY29tcG9uZW50XG5jbGFzcyBCdXJnZXIgZXh0ZW5kcyBDb21wb25lbnQge1xuXG5cdC8vIHNldHVwXG5cdGNvbnN0cnVjdG9yKGVsZW1lbnQpIHtcblx0XHRzdXBlcihlbGVtZW50KVxuXG5cdFx0dGhpcy5vcHRpb25zID0ge1xuXHRcdFx0Ly8gc29tZU9wdGlvbjogXCIgXCIsXG5cdFx0fVxuXG5cdFx0dGhpcy5yZWYgPSB7XG5cblx0XHR9XG5cdH1cblxuXHRtb3VudCgpIHtcblx0XHRjb25zdCBidXJnZXJUcmlnZ2VyID0gdGhpcy5lbGVtZW50XG5cblx0XHRidXJnZXJUcmlnZ2VyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLnRyaWdnZXJTdGF0ZUNoYW5nZS5iaW5kKHRoaXMpKVxuXHRcdGV2ZW50YnVzLm9uKFwicmVzZXRCdXJnZXJTdGF0ZVwiLCB0aGlzLnRyaWdnZXJTdGF0ZUNoYW5nZS5iaW5kKHRoaXMpKVxuXHR9XG5cblx0dHJpZ2dlclN0YXRlQ2hhbmdlKCkge1xuXG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRCdXJnZXJUcmlnZ2VyU3RhdGU6ICF0aGlzLnN0YXRlLkJ1cmdlclRyaWdnZXJTdGF0ZSxcblx0XHR9KVxuXHR9XG5cblx0c3RhdGVDaGFuZ2Uoc3RhdGVDaGFuZ2VzKSB7XG5cblx0XHRpZiAoJ0J1cmdlclRyaWdnZXJTdGF0ZScgaW4gc3RhdGVDaGFuZ2VzKSB7XG5cblx0XHRcdGNvbnN0IHRyaWdnZXIgPSB0aGlzLmVsZW1lbnRcblxuXHRcdFx0ZXZlbnRidXMuZW1pdChcIk1haW5NZW51VHJpZ2dlcmVkXCIpXG5cdFx0XHQvLyBldmVudGJ1cy5lbWl0KFwiT3ZlcmxheVRyaWdnZXJlZFwiKVxuXG5cdFx0XHRpZiAodGhpcy5zdGF0ZS5CdXJnZXJUcmlnZ2VyU3RhdGUpIHtcblx0XHRcdFx0dHJpZ2dlci5jbGFzc0xpc3QuYWRkKCdpcy1hY3RpdmUnKVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dHJpZ2dlci5jbGFzc0xpc3QucmVtb3ZlKCdpcy1hY3RpdmUnKVxuXHRcdFx0fVxuXHRcdH1cblx0fVxufVxuXG4vLyBFeHBvcnQgRVM2IG1vZHVsZVxuZXhwb3J0IGRlZmF1bHQgQnVyZ2VyO1xuIiwiLy8gaW1wb3J0IEdJQSBkZXBlbmRhbmN5XG5pbXBvcnQgQ29tcG9uZW50IGZyb20gJ2dpYS9Db21wb25lbnQnXG5pbXBvcnQgZXZlbnRidXMgZnJvbSAnZ2lhL2V2ZW50YnVzJ1xuXG5pbXBvcnQgeyBkaXNhYmxlUGFnZVNjcm9sbCwgZW5hYmxlUGFnZVNjcm9sbCwgYWRkRmlsbEdhcFRhcmdldCB9IGZyb20gJ3Njcm9sbC1sb2NrJztcblxuLy8gRXh0ZW5kIHRoZSBHSUEgY29tcG9uZW50XG5jbGFzcyBCdXJnZXJNZW51IGV4dGVuZHMgQ29tcG9uZW50IHtcblxuXHQvLyBzZXR1cFxuXHRjb25zdHJ1Y3RvcihlbGVtZW50KSB7XG5cdFx0c3VwZXIoZWxlbWVudClcblxuXHRcdHRoaXMub3B0aW9ucyA9IHtcblx0XHRcdC8vIHNvbWVPcHRpb246IFwiIFwiLFxuXHRcdH1cblxuXHRcdHRoaXMucmVmID0ge1xuXG5cdFx0fVxuXHR9XG5cblx0bW91bnQoKSB7XG5cblx0XHR0aGlzLnNldFN0YXRlKHsgbWVudU9wZW46IGZhbHNlIH0pXG5cdFx0ZXZlbnRidXMub24oJ01haW5NZW51VHJpZ2dlcmVkJywgdGhpcy50b2dnbGVTdGF0ZUNoYW5nZS5iaW5kKHRoaXMpKVxuXHR9XG5cblx0dG9nZ2xlU3RhdGVDaGFuZ2UoKSB7XG5cblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdG1lbnVPcGVuOiAhdGhpcy5zdGF0ZS5tZW51T3Blbixcblx0XHR9KVxuXHR9XG5cblx0c3RhdGVDaGFuZ2Uoc3RhdGVDaGFuZ2VzKSB7XG5cblx0XHRpZignbWVudU9wZW4nIGluIHN0YXRlQ2hhbmdlcyApIHtcblxuXHRcdFx0aWYodGhpcy5zdGF0ZS5tZW51T3Blbikge1xuXHRcdFx0XHR0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnaXMtYWN0aXZlJylcblx0XHRcdFx0ZGlzYWJsZVBhZ2VTY3JvbGwodGhpcy5lbGVtZW50KVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5jbG9zZU1lbnUoKVxuXHRcdFx0XHRlbmFibGVQYWdlU2Nyb2xsKHRoaXMuZWxlbWVudClcbiAgICAgIH1cblx0XHR9XG4gIH1cblxuXHRjbG9zZU1lbnUoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IG1lbnVPcGVuOiBmYWxzZSB9KVxuICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdpcy1hY3RpdmUnKVxuICB9XG59XG5cbi8vIEV4cG9ydCBFUzYgbW9kdWxlXG5leHBvcnQgZGVmYXVsdCBCdXJnZXJNZW51O1xuIiwiLy8gaW1wb3J0IEdJQSBkZXBlbmRhbmN5XG5pbXBvcnQgQ29tcG9uZW50IGZyb20gJ2dpYS9Db21wb25lbnQnXG5cblxuLy8gRXh0ZW5kIHRoZSBHSUEgY29tcG9uZW50XG5jbGFzcyBUb3BOYXYgZXh0ZW5kcyBDb21wb25lbnQge1xuXG5cdC8vIHNldHVwXG5cdGNvbnN0cnVjdG9yKGVsZW1lbnQpIHtcblx0XHRzdXBlcihlbGVtZW50KVxuXG5cblx0XHRnbG9iYWwuc2Nyb2xsRXZlbnRzLnB1c2godGhpcy5zaHJpbmtCYXIuYmluZCh0aGlzKSlcblx0XHRnbG9iYWwuc2Nyb2xsRXZlbnRzLnB1c2godGhpcy5oaWRlQmFyLmJpbmQodGhpcykpXG5cdH1cblxuXHRtb3VudCgpIHtcblxuXG5cblx0fVxuXG5cdHN0YXRlQ2hhbmdlKHN0YXRlQ2hhbmdlcykge1xuXG5cdFx0aWYoJ2lzU2hydW5rJyBpbiBzdGF0ZUNoYW5nZXMgKSB7XG5cblx0XHRcdGlmKHRoaXMuc3RhdGUuaXNTaHJ1bmspIHtcblx0XHRcdFx0dGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2MtVG9wTmF2LS1zaHJ1bmsnKVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2MtVG9wTmF2LS1zaHJ1bmsnKVxuICAgICAgfVxuXHRcdH0gZWxzZSBpZignaXNIaWRkZW4nIGluIHN0YXRlQ2hhbmdlcykge1xuXG5cdFx0XHRpZih0aGlzLnN0YXRlLmlzSGlkZGVuKSB7XG5cdFx0XHRcdHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdjLVRvcE5hdi0taXMtcGlubmVkJylcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdjLVRvcE5hdi0taXMtcGlubmVkJylcblx0XHRcdH1cblx0XHR9XG4gIH1cblxuXHRzaHJpbmtCYXIoY3VycmVudFNjcm9sbFkpIHtcblxuICAgIGlmKGN1cnJlbnRTY3JvbGxZID4gMCkge1xuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7aXNTaHJ1bms6IHRydWV9KVxuICAgIH0gZWxzZSB7XG5cdFx0XHR0aGlzLnNldFN0YXRlKHtpc1NocnVuazogZmFsc2V9KVxuICAgIH1cbiAgfVxuXG5cdGhpZGVCYXIoY3VycmVudFNjcm9sbFkpIHtcblxuICAgIGlmKGN1cnJlbnRTY3JvbGxZID4gMCAmJiBnbG9iYWwuc2Nyb2xsRGlyZWN0aW9uID09PSAnZG93bicpIHtcblx0XHRcdHRoaXMuc2V0U3RhdGUoe2lzSGlkZGVuOiB0cnVlfSlcbiAgICB9IGVsc2UgaWYgKHRoaXMuc3RhdGUuaXNIaWRkZW4gJiYgZ2xvYmFsLnNjcm9sbERpcmVjdGlvbiA9PT0gJ3VwJykge1xuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7aXNIaWRkZW46IGZhbHNlfSlcbiAgICB9XG4gIH1cbn1cblxuLy8gRXhwb3J0IEVTNiBtb2R1bGVcbmV4cG9ydCBkZWZhdWx0IFRvcE5hdjtcbiIsImltcG9ydCBCYXNlVGhlbWUgZnJvbSAnLi9CYXNlVGhlbWUnICAvLyBwdXQgYWxsIGdsb2JhbCBkZXBlbmRlbmNpZXMgaW4gaGVyZSAodGhpbmdzIHVzZWQgb24gZXZlcnkgcGFnZSlcbmltcG9ydCBCdXJnZXIgZnJvbSAnLi9jLUJ1cmdlcidcbmltcG9ydCBCdXJnZXJNZW51IGZyb20gJy4vYy1CdXJnZXJNZW51J1xuaW1wb3J0IFRvcE5hdiBmcm9tICcuL2MtVG9wTmF2J1xuaW1wb3J0IEZvcm0gZnJvbSAnLi9Gb3JtJ1xuXG5cbi8vIEdMT0JBTCBIQU5ETEVSc1xuLy8gdXNlIGZyb20gV0lUSElOIHlvdXIgY29tcG9uZW50IGNsYXNzIHRvIGFkZCBhbiBpbnN0YW5jZSFcbmdsb2JhbC5zY3JvbGxFdmVudHMgPSBbXVxuZ2xvYmFsLnJlc2l6ZUV2ZW50cyA9IFtdXG5nbG9iYWwuc2Nyb2xsRGlyZWN0aW9uXG5cblxuY29uc3QgY29tcG9uZW50cyA9IHtcblx0XCJCYXNlVGhlbWVcIjogQmFzZVRoZW1lLCAvL3JxZFxuXHRcIkJ1cmdlclwiOiBCdXJnZXIsXG5cdFwiQnVyZ2VyTWVudVwiOiBCdXJnZXJNZW51LFxuXHRcIlRvcE5hdlwiOiBUb3BOYXYsXG5cdFwiRm9ybVwiOiBGb3JtXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudHM7XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgaWQ6IFwiYXJyb3dcIixcbiAgdXJsOiBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiX19fZjI1MjU1YmM4OTU4NzU2YmY3NDFlNWZmODhiZWJhMGVfX19cIixcbiAgd2lkdGg6IDMwLFxuICBoZWlnaHQ6IDMwLFxuICB2aWV3Qm94OiBcIjAgMCAzMCAzMFwiLFxuICB0b1N0cmluZzogZnVuY3Rpb24gKCkgeyByZXR1cm4gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcIl9fX2YyNTI1NWJjODk1ODc1NmJmNzQxZTVmZjg4YmViYTBlX19fXCIgfSxcbiAgYmFja2dyb3VuZFNpemU6IFwiX19fNDM4ZGVkNmQ4NTNiNDY4MTllNzcxYzVjZWM5N2IzM2ZfX18gX19fZjhkNjMyMzVjOWNkMDg0YzlhNTVkNTNhYWIwNjAzZGNfX19cIixcbiAgYmFja2dyb3VuZFBvc2l0aW9uOiBcIl9fX2M1ZTM4YmI2ZTIwMzJiNTZiMGQ5MjU5NDdjNGVhNTczX19fIF9fXzNkZDY1ZjQ3N2NhZjExYWI3ZjdhODk1YzRiNDA4ZDRhX19fXCJcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgaWQ6IFwiaHAtcGFydG5lcnMtbG9nb1wiLFxuICB1cmw6IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJfX182Y2MxNzE5NDM4Y2Q0YTUxY2Y1N2M5MDk5ZjBjYjk0NV9fX1wiLFxuICB3aWR0aDogMTY5Ljg5NixcbiAgaGVpZ2h0OiAxNixcbiAgdmlld0JveDogXCIwIDAgMTY5Ljg5NiAxNlwiLFxuICB0b1N0cmluZzogZnVuY3Rpb24gKCkgeyByZXR1cm4gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcIl9fXzZjYzE3MTk0MzhjZDRhNTFjZjU3YzkwOTlmMGNiOTQ1X19fXCIgfSxcbiAgYmFja2dyb3VuZFNpemU6IFwiX19fNzIyMDJhMWYxMWM4ZDFjMTU1MWZkM2ZjODVhMTBjZDFfX18gX19fNDcxMDBkNWIwODgzMzMzMDZjZmRiYmEwZGNlNjc2ZTdfX19cIixcbiAgYmFja2dyb3VuZFBvc2l0aW9uOiBcIl9fX2ZhMTdjMGRiODJmNTg3NzU2MzhmNjk4NTAwZWE3ZjFkX19fIF9fXzFjNTlkY2JmNzE2MjdlYmEwNDVjYjU0MGVlOWUxNzY5X19fXCJcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgaWQ6IFwic2VhcmNoXCIsXG4gIHVybDogX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcIl9fX2M5MGIwZTRiYWQyMmJjYjVhMGM5ZDhkOTg1MmQwZjk4X19fXCIsXG4gIHdpZHRoOiAxNy4zNTQsXG4gIGhlaWdodDogMTcuMzU0LFxuICB2aWV3Qm94OiBcIjAgMCAxNy4zNTQgMTcuMzU0XCIsXG4gIHRvU3RyaW5nOiBmdW5jdGlvbiAoKSB7IHJldHVybiBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiX19fYzkwYjBlNGJhZDIyYmNiNWEwYzlkOGQ5ODUyZDBmOThfX19cIiB9LFxuICBiYWNrZ3JvdW5kU2l6ZTogXCJfX182MTc1NGZiMmM1YTdiNTFkN2FkMzM0NzRjOGZmZjI1Ml9fXyBfX19kYTY4N2RiMDlhM2ViZTA5NGE4NTA1ZDU3MGM0MTU4Zl9fX1wiLFxuICBiYWNrZ3JvdW5kUG9zaXRpb246IFwiX19fOGE3OGUyYjA1ZGNhN2U0Y2MwOTliZmEyMDNiM2U3YTJfX18gX19fNTJiNTJkMmQxYzY1N2M3N2Q0ZDU2NTM2YzhmMTZmNDRfX19cIlxufSJdLCJzb3VyY2VSb290IjoiIn0=