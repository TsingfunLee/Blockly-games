
MapObject.subclass('BeamTower', {

  init: function(map) {
    this.passable = false;
    this.damageable = false;
    this._super(map);
  },

  instantiate: function() {
    this.entity = this.basicEntity('tower-off');
  },

  setMapPos: function(x,y) {
    // Set up
    this._super(x,y);
    this.counter = 0;

    // Add in beams between us and all nearby towers
    var map = this.map;
    var dirs = [Dir.UP, Dir.RIGHT, Dir.DOWN, Dir.LEFT];
    for (var i = 0; i < 4; i ++) {
      var dir = dirs[i];
      var beamType = dir.isVertical() ? BeamVertical : BeamHorizontal;
      var beamTypeName = beamType.className;

      // Start at our pos, and look in this direction until we find a beam, another tower, or
      // the edge of the map
      var pos = this.getMapPos().addDir(dir,1);
      var done = false;
      while (!done) {
        var hasBeam = map.getObject(pos, beamTypeName);
        var hasTower = map.getObject(pos, 'BeamTower');
        if (hasTower) {
          // Found a matching tower, no beams between us - add 'em!
          var endPos = pos;
          pos = this.getMapPos().addDir(dir,1);
          while (!pos.isEqual(endPos)) {
            var beam = new beamType(map);
            beam.setMapPos(pos);
            pos.addDir(dir, 1);
          }
          done = true

        } else if (hasBeam || !map.isPassable(pos)) {
          // Found an existing beam or impassible spot
          done = true

        } else {
          // Keep marching
          pos.addDir(dir,1);
        }
      }
    }
  },

  onCycle: function() {
    this.counter = (this.counter + 1) % 3;
    var sprites = ['tower-off', 'tower-on1', 'tower-on2', 'tower-on3'];
    for (var i = 0; i < sprites.length; i++) {
      this.entity.removeComponent(sprites[i], false);
    }
    this.entity.addComponent('tower-on' + (this.counter + 1));
  }

});
