
MapObject.subclass('Explosion', {

  init: function(map) {
    this.passable = true;
    this.damageable = false;
    this._super(map);
  },

  instantiate: function() {
    this.entity = Crafty.e('2D, Canvas, explosion')
    this.entity.attr({w: 90, h: 90, rotation: 0});
    this.entity.origin(45, 45);

    this.animate({
      explosion: {
        spriteRow: 0,
        spriteColRange: [0,19],
        duration: 1,
        loop: false,
        autoplay: true
      }
    });
  },

  setMapPos: function(x, y) {
    this._super(x,y);
    var pos = this.getScreenPos();
    pos.x -= 13;
    pos.y -= 13;
    this.setScreenPos(pos);
    this.setRotation(x*5+y*40);
  }

});
