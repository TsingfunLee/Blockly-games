
// Manages our sound and music sub-systems.
Class.subclass('Sound', {

  // Music file to use for soundtrack
  MUSIC: 'red-alert',

  // Sound files we should load
  SOUNDS: ['explosion', 'fire', 'move-tank', 'program', 'ricochet']

}, {

  init: function(app) {
    // Save off our params
    this.app = app;

    // Load up our settings
    this.muted = this.app.settings.get('muted')

    // Load up audio
    var self = this;
    soundManager.onready(function(){
      // Define music
      // soundManager.createSound({
      //   id: 'music',
      //   url: './music/' + Sound.MUSIC + '.mp3',
      //   loops: 9999,
      //   autoplay: false,
      //   autoload: true,
      //   volume: 10
      // });

      // Define sounds
      $.each(Sound.SOUNDS, function(i, sound) {
        soundManager.createSound({
          id: sound,
          autoload: true,
          url: './sounds/' + sound + '.mp3'
        });
      });

      // Run callback
      self.onLoaded();
    });

  },

  onLoaded: function() {
    this.play('music');
  },

  play: function(snd, options) {
    if (!this.muted) {
      soundManager.play(snd, options);
    }
  },

  stop: function(snd) {
    soundManager.stop(snd);
  },

  muteAll: function(val) {
    this.muted = val;
    this.app.settings.set('muted', val);
    if (val) {
      soundManager.mute();
      this.stop('music');
    } else {
      soundManager.unmute();
      this.play('music');
    }
  }

});
