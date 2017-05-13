Class.subclass('Settings', {
  
  get: function(key) {
    var json = localStorage.getItem(key);
    if (json === null || json === undefined) {
      return null;
    } else {
      return $.evalJSON(json);
    }
  },
  
  set: function(key, val) {
    var json = $.toJSON(val);
    localStorage.setItem(key, json);
  },
  
  delete: function(key) {
    localStorage.removeItem(key);
  },
  
  deleteAll: function() {
    localStorage.clear();
  }
  
}, {

  // Don't instantiate!
  
});