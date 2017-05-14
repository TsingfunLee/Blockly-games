
MapObject.subclass('Tree', {

  init: function(map) {
    this.passable = false;
    this.damageable = true;
    this._super(map);
  },

  instantiate: function() {
      this.entity = this.basicEntity('tree');
      // this.animate({
      //   treeblink: {
      //     spriteRow: 0,//0,
      //     spriteColRange: [3,5],//[6,7],
      //     duration: 15,
      //     loop: true,
      //     autoplay: true
      //   }
      // });
  },

  setMapPos: function(x, y) {
    this._super(x, y);
    //this.setRotation(x * 100 + y * 12);
  }
});
