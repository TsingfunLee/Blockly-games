
Class.subclass('Pos', {

  isPos: function(val) {
    return val && val.classRef && val.classRef.className == this.className;
  },

  parse: function(x, y) {
    if (y === undefined) {
      if (this.isPos(x)) {
        return x.dup();
      }
    } else {
      return new this(x,y);
    }
    return null;
  }

}, {

  init: function(x, y) {
    this.x = x;
    this.y = y;
  },

  dup: function() {
    return new this.classRef(this.x, this.y);
  },

  addDir: function(dir, amt) {
    switch(dir) {
      case Dir.UP:
        this.y -= amt;
        break;
      case Dir.RIGHT:
        this.x += amt;
        break;
      case Dir.DOWN:
        this.y += amt;
        break;
      case Dir.LEFT:
        this.x -= amt;
        break;
    }
    return this;
  },

  isEqual: function(other) {
    if (this.classRef.isPos(other)) {
      return other.x == this.x && other.y == this.y;
    }
    return false;
  },

  toScreenPos: function() {
    if (this.isScreenPos()) {
      return this.dup();
    } else {
      return new ScreenPos(this.x * 50, this.y * 50); 
    }
  },

  isScreenPos: function() {
    return false;
  },

  isMapPos: function() {
    return false;
  }

});

Pos.subclass('MapPos', {

  isMapPos: function() {
    return true;
  }

});

Pos.subclass('ScreenPos', {

  isScreenPos: function() {
    return true;
  }

});
