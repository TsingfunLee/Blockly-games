
MapObject.subclass('Wall', {
  
  init: function(map, type) {
    this.type = type;
    this.passable = false;
    this.damageable = false;
    this._super(map);
  },
  
  instantiate: function() {
    this.entity = this.basicEntity('wall-'+this.type);
  }
  
});