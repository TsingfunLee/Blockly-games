
Class.subclass('Map', {

}, {

  init: function(mapData) {
    this.tank = null;
    this.objects = [];
    this.mapArray = [
      [[],[],[],[],[],[],[],[],[],[]],
      [[],[],[],[],[],[],[],[],[],[]],
      [[],[],[],[],[],[],[],[],[],[]],
      [[],[],[],[],[],[],[],[],[],[]],
      [[],[],[],[],[],[],[],[],[],[]],
      [[],[],[],[],[],[],[],[],[],[]],
      [[],[],[],[],[],[],[],[],[],[]],
      [[],[],[],[],[],[],[],[],[],[]],
	  [[],[],[],[],[],[],[],[],[],[]],
      [[],[],[],[],[],[],[],[],[],[]]
    ];

    this.load(mapData);
  },

  destroy: function() {
    this.each(function(obj) {
      obj.destroy();
    });
    this.objects = [];
    this.mapArray = null;
  },

  getTank: function() {
    return this.tank;
  },

  each: function(x, y, callback) {
    var pos;
    var objs = null;
    if (x instanceof Function) {
      objs = this.getObjects();
      callback = x;
    } else {
      if (MapPos.isPos(x)) {
        pos = x.dup();
        callback = y;
      } else {
        pos = MapPos.parse(x,y);
      }
      objs = this.getObjects(pos);
    }
    for (var i = 0; i < objs.length; i++) {
      var obj = objs[i];
      callback.call(obj, obj);
    }
  },

  getObject: function(x, y, klass) {
    var pos;
    if (MapPos.isPos(x)) {
      pos = x.dup();
      klass = y;
    } else {
      pos = MapPos.parse(x,y);
    }
    var objs = this.getObjects(pos);
    for (var i = 0; i < objs.length; i++) {
      if (objs[i].classRef.className == klass) {
        return objs[i];
      }
    }
    return null;
  },

  getObjects: function(x,y) {
    if (x === undefined) {
      return this.objects;
    } else {
      var pos = MapPos.parse(x,y);
      if (this.onMap(pos)) {
        return this.mapArray[pos.y][pos.x];
      } else {
        return [];
      }
    }
  },

  addObject: function(obj, x, y) {
    // Remove if already in map
    this.removeObject(obj);
    // Add it
    this.objects.push(obj);
    var objs = this.getObjects(x,y);
    objs.push(obj);
  },

  removeObject: function(obj) {
    this.objects = this.arrayRemove(this.objects, obj);
    var oldPos = obj.getMapPos();
    if (this.onMap(oldPos)) {
      var objs = this.getObjects(oldPos);
      this.mapArray[oldPos.y][oldPos.x] = this.arrayRemove(objs, obj);
    }
  },

  arrayRemove: function(array, obj) {
    var newArray = [];
    for (var i = 0; i < array.length; i++) {
      if (array[i] !== obj) {
        newArray.push(array[i]);
      }
    }
    return newArray;
  },

  load: function(mapData) {
    var x, y;
    for (y = 0;y < 10;y++) {
      var row = mapData[y].split('');
      for (x = 0;x < 10;x++) {
        this.loadObject(row[x], x, y);
      }
    }
  },

  loadObject: function(key, x, y) {
    var obj = this.createObject(key);
    if (obj) {
      if (obj.classRef == Tank) {
        this.tank = obj;
      }
      obj.setMapPos(x,y);
    }
  },

  createObject: function(key) {
    switch (key) {
      case 'T':
        return new Tree(this);
      case '*':
        return new Mine(this);
      case '^':
        return new Tank(this, Dir.UP);
      case '>':
        return new Tank(this, Dir.RIGHT);
      case 'v':
        return new Tank(this, Dir.DOWN);
      case '<':
        return new Tank(this, Dir.LEFT);
      case 'B':
        return new Base(this);
      case 'R':
        return new Rock(this, '1');
      case 'r':
        return new Rock(this, '2');
      case '-':
        return new Wall(this, 'horizontal');
      case '|':
        return new Wall(this, 'vertical');
      case '+':
        return new Wall(this, 'corner');
      case 'O':
        return new BeamTower(this);
      case '.':
      default:
        return null;
    }
  },

  isPassable: function(x, y) {
    if (!this.onMap(x,y)) { return false; }

    var pos = MapPos.parse(x,y);
    var passable = true;
    this.each(pos.x, pos.y, function(obj) {
      if (!obj.isPassable()) {
        passable = false;
      }
    });
    return passable;
  },

  onMap: function(x, y) {
    var pos = MapPos.parse(x,y);

    if (!pos || pos.x === null) { return false; }
    if (pos.x < 0 || pos.y < 0 || pos.x >= 10 || pos.y >= 10) { return false; }
    return true;
  }

});
