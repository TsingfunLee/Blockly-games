// Taken and bastardized from John Resig's Class.extend() technique.
// Added ability to chain class methods, explicit class names, class-level "construct" method,
// and probably some bugs and conceptual flaws.  ;-)
//
// To use:
//
// Class.subclass('NewClass', { ...class methods...}, { ...instance methods...});
//
// There are two special method names.  At the class method level, defining 'construct' will cause that method to be run once 
// after class definition is complete.  This method is for use in meta-programming and adjusting final class properties.
// The second (and much more generally useful) method is 'init', which when defined at the instance method level will be called
// as the last step in initializing a new class instance.  Use this for setting up initial state.  Can accept zero or more
// params.
(function(){
  // Keep a ref to this so we can set our classes to be globally visible
  var globalContext = this;
  
  // Helper flag during construction
  var initializing = false;
  
  // Used to determine if a given function contains a call to the special _super function
  var fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;

  // Copy over properties, creating a wrapper to enable calling _super() if needed
  function copyProp(superKlass, src, dest, name) {
    // Check if we're overwriting an existing function that calls _super()
    var isFunc = typeof src[name] == "function";
    var isSuperFunc = typeof superKlass[name] == "function";
    var callsSuper = fnTest.test(src[name]);
    dest[name] = (isFunc && isSuperFunc && callsSuper) ?
      (function(name, fn){
        return function() {
          var tmp = this._super;
         
          // Add a new ._super() method that is the same method
          // but on the super-class
          this._super = superKlass[name];
         
          // The method only need to be bound temporarily, so we
          // remove it when we're done executing
          var ret = fn.apply(this, arguments);       
          this._super = tmp;
         
          return ret;
        };
      })(name, src[name]) :
      src[name];
  }

  // The base Class implementation (does nothing)
  this.Class = function(){};
  
  // We'll store each registered class here for later construct() calling purposes
  Class.constructionList = [];
  // We'll store each class in this hash to let us walk the known space of all classes
  Class.classRegistry = {};
  // Simple list of all class names
  Class.classList = [];
  
  // Call this once you're done including all your classes
  Class.classesLoaded = function() {
    var list = Class.constructionList;
    for (var i = 0; i < list.length; i++) {
      var fn = list[i];
      fn.call(this);
    }
  };
 
  // Create a new Class that inherits from this class
  Class.subclass = function() {
    var name;
    var _super = this.prototype;
    var className = 'Unknown';
    var classProp = {};
    var index = 0;
    if (typeof arguments[index] === 'string') { 
      className = arguments[index]; index ++; 
    } else {
      throw "Invalid call to subclass - first argument must be derived class' name";
    }
    if (arguments.length - index > 1) { classProp = arguments[index]; index ++; }
    var instanceProp = arguments[index];
   
    // Instantiate a base class (but only create the instance,
    // don't run the init constructor)
    initializing = true;
    var prototype = new this();
    initializing = false;
   
    // Copy the properties over onto the new prototype
    for (name in instanceProp) {
      copyProp(_super, instanceProp, prototype, name);
    }
   
    // The dummy class constructor
    function klass() {
      // All construction is actually done in the init method
      if (!initializing && this.init) {
        this.init.apply(this, arguments);
      }
    }
   
    // Add in parent's class methods
    for (name in this) {
      klass[name] = this[name];
    }

    // Populate our constructed prototype object
    klass.prototype = prototype;
    // Give our instances a reference back to their constructing class
    klass.prototype.classRef = klass;
   
    // Enforce the constructor to be what we expect
    klass.constructor = klass;

    // And make this class extendable
    klass.subclass = arguments.callee;

    // Set our class name
    klass.className = className;
    
    // Remember this class' base class
    klass.baseClassRef = this;

    // Add in class-level methods with _super support
    for (name in classProp) {
      copyProp(this, classProp, klass, name);
    }

    // If we have a class-level construct method, add it to our list for later running once other classes are 
    // ready - needed to avoid circular dependencies
    if (klass.construct) {
      Class.constructionList.push(function() {
        klass.construct.call(klass);
      });
    }
    
    // Add this class to our global class registry
    Class.classRegistry[className] = klass;
    Class.classList.push(className);
     
    // And we rock!  Define globally and return this bad boy...
    globalContext[className] = klass;
    return klass;
  };
})();