
Class.subclass('Dir', {
  
  construct: function() {
    this.UP = new Dir(0,0);
    this.RIGHT = new Dir(1,90);
    this.DOWN = new Dir(2,180);
    this.LEFT = new Dir(3,270); 
  },
  
  right: function(dir) {
    return Dir.fromID(dir.toID() + 1);    
  },
  
  left: function(dir) {
    return Dir.fromID(dir.toID() - 1);    
  },
  
  opposite: function() {
    return Dir.fromDir(dir.toID() + 2);
  },
  
  fromID: function(id) {
    id = id % 4;
    while (id < 0) {
      id += 4;
    }
    switch(id) {
      case 0: return Dir.UP;
      case 1: return Dir.RIGHT;
      case 2: return Dir.DOWN;
      case 3: return Dir.LEFT;  
    } 
  }
  
}, {
  
  init: function(id, deg) {
    this.id = id;
    this.degrees = deg;
  },
  
  toID: function() {
    return this.id;
  },
  
  toDegrees: function() {
    return this.degrees;
  },
  
  orientation: function() {
    if (this.id == 0 || this.id == 2) {
      return 'v';
    } else {
      return 'h';
    }
  },
  
  isVertical: function() {
    return this.orientation() == 'v'; 
  },
  
  isHorizontal: function() {
    return !this.isVertical();
  }
  
});