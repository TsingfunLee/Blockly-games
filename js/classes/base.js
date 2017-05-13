
MapObject.subclass('Base', {
  
  init: function(map) {
    this.passable = false;
    this.damageable = true;
    this._super(map);
  },
  
  instantiate: function() {
    this.entity = this.basicEntity('base');
    this.animate({
      blink: {
        spriteRow: 3,//0,
        spriteColRange: [0,3],//[2,5],
        duration: 10,
        loop: true,
        autoplay: true
      }
    });
  },
  
  explode: function() {
    app.level.program.running = false;
    this._super();
  },
  
  onDestroy: function() {
    app.level.win();
  }
  
});