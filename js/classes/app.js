// Our main application
Class.subclass('App', {

  SPRITES: {
    tank: [0,1],//[0,3],
    turret: [0,2],//[7,3],
    tree: [3,0],//[7,5],
    base: [0,3],//[2,0],
    mine: [6,2],//[7,0],
    rock1: [2,5],//[0,5],
    rock2: [0,5],
    'wall-horizontal': [1,4],//[2,1],
    'wall-vertical': [0,4],//[3,1],
    'wall-corner': [2,4],
    bullet: [6,0],//[7,1],
    'tower-off': [4,3],
    'tower-on1': [5,3],
    'tower-on2': [6,3],
    'tower-on3': [7,3],
    'tower-beam-h': [4,4],
    'tower-beam-v': [5,4]
  },

  start: function() {
    // Do any final class-level setup
    Class.classesLoaded();

    // Create our app instance
    var app = new App();

    // Load our resources
    Crafty.load([
      './images/sprites.png'
    ], function() {
      app.setup();
    });

    // All set, return a reference
    return app;
  }

}, {

  setup: function() {
    // Initialize Crafty
    Crafty.init(50*10, 50*10);
    Crafty.canvas.init();

    // Set up our libraries and resources
    //this.setupOverlay();
    this.setupSettings();
    this.setupAudio();
    this.setupSprites();
    //this.setupControls();

    this.resizeCanvas();
    this.loadLevel('intro', Game.LEVEL - 1);
  },

  // setupOverlay: function() {
  //   this.overlay = new Overlay();
  // },

  setupSettings: function() {
    this.settings = Settings;
  },

  setupAudio: function() {
    this.audio = new Sound(this);
  },

  setupSprites: function() {
    Crafty.sprite(64,  './images/sprites.png', App.SPRITES);
    Crafty.sprite(90, './images/explosion-sprites.png', {explosion: [0,0]});
  },

  setupControls: function() {
    var self = this;
    // $('#playBtn').click(function() {
    //   self.runProgram();
    // });

    // $('#resetBtn').click(function() {
    //   self.settings.deleteAll();
    // });
  },

  selectLevel: function() {
    this.overlay.displayPage('select-level');
  },

  loadLevel: function(difficulty, num) {
    //this.overlay.hide();
    if (this.level) {
      this.level.unload();
    }
    this.level = Level.load(difficulty, num);
    this.map = this.level.map;
    this.program = this.level.program;
  },

  resetLevel: function() {
    if (this.level) {
      this.loadLevel(this.level.difficulty, this.level.num);

    }
  },

  runProgram: function(blocklyLogs) {
    if (!this.level) { return; }
    this.audio.play('program', {pan: 90});
    this.program.run(blocklyLogs);
  },

  resizeCanvas: function(){
	  //console.log("resizeCanvas,full:" + full);

		  $("#cr-stage > canvas").css("width","500px");
		    $("#cr-stage > canvas").css("height","500px");
		    $("#cr-stage").css("width","500px");
		    $("#cr-stage").css("height","500px");

  }

});
