
MapObject.subclass('Beam', {

  init: function(map) {
    this.passable = true;
    this.damageable = false;
    this._super(map);
  },

  instantiate: function() {
    this.entity = this.basicEntity('tower-beam-h');
    this.entity.visible = true;
    this.entity.bind('EnterFrame', function() {
      if (this.visible) {
        var alpha = Math.floor(Math.random()*9);
        this.alpha = 0.2 + (alpha / 10.0);
      }
    });
  },

  setMapPos: function(x,y) {
    this._super(x,y);
    this.counter = 0;
  },

  onCycle: function() {
    this.counter = (this.counter + 1) % 3;

    if (this.counter == 2) {
      this.entity.visible = true;
      var pos = this.getMapPos();
      var tank = this.map.getObject(pos, 'Tank');
      if (tank) {
        tank.takeDamage(1000);
      }
    } else {
      this.entity.visible = false;
    }
  }

});

Beam.subclass('BeamVertical', {

  setMapPos: function(x, y) {
    this._super(x,y);
    this.entity.removeComponent('tower-beam-h', false);
    this.entity.addComponent('tower-beam-v');
  }

});

Beam.subclass('BeamHorizontal', {

  setMapPos: function(x, y) {
    this._super(x,y);
  }

});
