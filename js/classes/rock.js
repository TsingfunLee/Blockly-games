
MapObject.subclass('Rock', {

  init: function(map, type) {
    this.type = type;
    this.passable = false;
    this.damageable = false;
    this._super(map);
  },

  instantiate: function() {
    this.entity = this.basicEntity('rock' + this.type);
    if (this.type == '1') {
      this.animate({
        rockblink: {
          spriteRow: 5,//0,
          spriteColRange: [2,5],//[6,7],
          duration: 15,
          loop: true,
          autoplay: true
        }
      });
    }else if (this.type == '2') {
      this.animate({
        rockblink: {
          spriteRow: 5,//0,
          spriteColRange: [0,1],//[6,7],
          duration: 15,
          loop: true,
          autoplay: true
        }
      });
    }
  },

  setMapPos: function(x, y) {
    this._super(x, y);
    //this.setRotation(x * 40 + y * 13);
  }

});
