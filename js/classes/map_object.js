
Class.subclass('MapObject', {

  init: function(map, attrs) {
    this.map = map;

    this.entity = null;
    this.animations = {};

    // Default State
    if (this.dir === undefined) { this.dir = Dir.UP; }
    if (this.mapPos === undefined) { this.mapPos = null; }
    if (this.hitpoints === undefined) { this.hitpoints = 1; }
    if (this.passable === undefined) { this.passable = false; }
    if (this.damageable === undefined) { this.damageable = true; }

    this.instantiate();
  },

  // Override this function in your derived classes to build
  // a Crafty entity to represent this object on the map...
  instantiate: function() {
    return null;
  },

  destroy: function() {
    this.map.removeObject(this);
    if (this.entity) {
      this.entity.destroy();
    }
  },

  basicEntity: function(sprite) {
    var e = Crafty.e('2D, Canvas, ' + sprite)
    e.attr({w: 50, h: 50, rotation: 0});
    e.origin(25, 25);
    return e;
  },

  animate: function(defs) {
    for (var id in defs) {
      var def = defs[id];
      var entity = def.entity || this.entity;
      entity.requires('SpriteAnimation');

      // Set up reel in entity for playback
      entity.animate(id, def.spriteColRange[0], def.spriteRow, def.spriteColRange[1]);

      var playFn = function() {
    	  	//console.log("playFn id="+id + ";curAnimatedId:" + entity.curAnimatedId);
				if (entity.curAnimatedId && entity.curAnimatedDef && !entity.isPlaying()) {
					//entity.animate(id, def.duration, (def.loop === true) ? -1 : def.loop);
					entity.animate(entity.curAnimatedId, entity.curAnimatedDef.duration, (entity.curAnimatedDef.loop === true) ? -1 : entity.curAnimatedDef.loop);
				}
				else{
					console.log("isplaying playFn do nothing!!!!");
				}

				entity.unbind('EnterFrame', playFn);
			};

      // Define our animation and store it
      this.animations[id] = {
        entity: entity,
        playFn: playFn,
        def:def
      };

      if (def.autoplay) {
        this.playAnimation(id);
  		}
    }
  },

  playAnimation: function(id) {
	  console.log("playAnimation id="+id);

    var anim = this.animations[id];
    anim.entity.curAnimatedId = id;
    anim.entity.curAnimatedDef = anim.def;
		anim.entity.bind("EnterFrame", anim.playFn);
  },

  stopAnimation:function(id){
	  console.log("stopAnimation id="+id);
	  var anim = this.animations[id];
	  anim.entity.stop();
	  anim.entity.unbind('EnterFrame', anim.playFn);
  },

  onCycle: function() {
    // Overridden in derived classes to do per-cycle upkeep, tests, etc.
  },

  onDestroy: function() {
    // Called when blown up, etc.  Override to do cool things
  },

  isPassable: function() {
    return this.passable;
  },

  isDamageable: function() {
    return this.damageable;
  },

  takeDamage: function(amt) {
    if (this.isDamageable()) {
      this.hitpoints -= amt;
      if (this.hitpoints <= 0) {
        this.explode();
      }
    } else {
      app.audio.play('ricochet');
    }
  },

  explode: function() {
    app.program.lock();
    app.audio.play('explosion');
    var self = this;
    var explosion = new Explosion(this.map);
    explosion.setMapPos(this.getMapPos());
    this.tween({alpha: 0}, 30, function() {
      self.onDestroy();
      self.destroy();
      app.program.unlock();
    });
  },

  getMap: function() {
    return this.map;
  },

  setMap: function(map) {
    this.map = map;
  },

  getDir: function() {
    return this.dir;
  },

  setDir: function(dir) {
    this.dir = dir;
    this.setRotation(dir.toDegrees());
  },

  getMapPos: function() {
    return this.mapPos ? this.mapPos.dup() : null;
  },

  setMapPos: function(x, y) {
    // Move on map (will remove from old location)
    this.map.addObject(this, x, y);

    // Set new map pos, display pos
    this.mapPos = MapPos.parse(x,y);
    this.setScreenPos(this.mapPos.toScreenPos());
  },

  getScreenPos: function() {
    return new ScreenPos(this.entity.x, this.entity.y);
  },

  setScreenPos: function(x, y) {
    var pos = ScreenPos.parse(x,y);
    if (pos) {
      this.entity.attr({x: pos.x, y: pos.y});
    }
  },

  setRotation: function(degrees) {
    this.entity.attr({rotation: degrees});
  },

  getRotation: function() {
    return this.entity.rotation;
  },

  tween: function(attrs, duration, callback) {
    // Start the tween
    this.entity.requires('Tween');
    this.entity.tween(attrs,duration);
    // Set up callback to run once at end of tweening...
    if (callback) {
      var self = this;
      var onceFn = function() {
        self.entity.unbind('TweenEnd', onceFn);
        setTimeout(function() {callback.call(self);}, 50);
      };
      this.entity.bind('TweenEnd', onceFn);
    }
  }

});
