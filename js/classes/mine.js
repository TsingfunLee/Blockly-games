
MapObject.subclass('Mine', {

  init: function(map) {
    this.passable = true;
    this.damageable = false;
    this._super(map);
  },

  instantiate: function() {
    this.entity = this.basicEntity('mine');
    this.animate({
      blink: {
        spriteRow: 2,//0,
        spriteColRange: [6,7],//[6,7],
        duration: 15,
        loop: true,
        autoplay: true
      }
    });
  },

  onCycle: function() {
    var pos = this.getMapPos();
    var tank = this.map.getObject(pos.x, pos.y, 'Tank');
    if (tank) {
      this.entity.alpha = 0;
      tank.takeDamage(1000);
    }
  }

});
