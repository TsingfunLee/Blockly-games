
MapObject.subclass('Tank', {

  MAX_AMMO: 5,
  MAX_FUEL: 20

}, {

  init: function(map, dir) {
    this.dir = dir;
    this.setAmmo(3);
    this.setFuel(10);

    this._super(map);
  },

  instantiate: function() {
    this.entity = this.basicEntity('tank');
    this.entity.requires('Tween');

    this.turretEntity = this.basicEntity('turret');
    this.turretEntity.requires('Tween');

    this.entity.attach(this.turretEntity);

    this.setRotation(this.dir.toDegrees());

    this.animate({
      fire: {
        entity: this.turretEntity,
        spriteRow: 1,//3,
        spriteColRange: [0,7],
        duration: 14,
        loop: false,
        autoplay: false
      }
    });
    this.animate({
        move: {
      	  entity: this.entity,
            spriteRow: 1,//3,
            spriteColRange: [0,7],
            duration: 14,
            loop: true,
            autoplay: false
        }
      });
  },

  explode: function() {
    app.level.program.running = false;
    this._super();
  },

  onDestroy: function() {
    app.level.lose();
  },

  getFuel: function() {
    return this.fuel;
  },

  setFuel: function(amt) {
    this.fuel = amt;
    if (this.fuel > Tank.MAX_FUEL) {
      this.fuel = Tank.MAX_FUEL;
    }
    return this.fuel;
  },

  addFuel: function(amt) {
    return this.setFuel(this.getFuel() + amt);
  },

  getAmmo: function() {
    return this.ammo;
  },

  setAmmo: function(amt) {
    this.ammo = amt;
    if (this.ammo > Tank.MAX_AMMO) {
      this.ammo = Tank.MAX_AMMO;
    }
    return this.ammo;
  },

  addAmmo: function(amt) {
    return this.setAmmo(this.getAmmo() + amt);
  }

});
