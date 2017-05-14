Class.subclass('Level', {

  load: function(difficulty, num) {
    var level = new Level(difficulty, num);
    return level;
  },

  getState: function(key) {
    var state = app.settings.get('level-'+key);
    if (!state) {
      state = {};
    }
    return state;
  },

  setState: function(key, state) {
    app.settings.set('level-'+key, state);
  },

  isCompleted: function(key) {
    var state = this.getState(key);
    return state.completed;
  },

  complete: function(key) {
    var state = this.getState(key);
    state.completed = true;
    this.setState(key, state);
  },

  difficulties: function() {
    var res = [];
    for (var d in App.LEVELS) {
      res.push(d);
    }
    return res;
  },

  levelCount: function(difficulty) {
    return App.LEVELS[difficulty].length;
  },

  key: function(difficulty, num) {
    var info = App.LEVELS[difficulty][num];
    if (info) {
      return info.key;
    } else {
      return null;
    }
  }

}, {

  init: function(difficulty, num) {
    this.difficulty = difficulty;
    this.num = num;
    this.loadData();
  },

  loadData: function() {
    var data = App.LEVELS[this.difficulty][this.num];
    this.key = data.key;
    this.name = data.name;
    this.map = new Map(data.map);
    this.program = new BlocklyProgram(this); //new Program(this);

    //$('#title').html('Level: ' + this.name);
  },

  unload: function() {
    this.map.destroy();
  },

  win: function() {
    this.program.running = false;
    Level.complete(this.key);
    setTimeout(function() {
      //alert('win')
      if (Game.LEVEL != 10) {
        DDBlockly.successDialog();
      }else {
        DDBlockly.beginDialog();
      }

      //app.overlay.displayPage('win');
    	//app.blockly.displayOverlay('doc_gameWin');
    }, 1000);
  },

  lose: function() {
    this.program.running = false;
    setTimeout(function() {
      //app.overlay.displayPage('lose');
    	//app.blockly.displayOverlay('doc_gameLose');
      //alert('lose')
      var content = DIALOG.tank[Game.LEVEL - 1].lose;
      DDBlockly.popover(content);
    }, 1000);
  }

});

App.LEVELS = {

  intro: [
    {
      key: 'intro-0',
      name: 'Fire!',
      map: [
        '..........',
        '....T.....',
        '..T...B...',
        '..........',
        '..........',
        '....T.....',
        '...T......',
        '......^...',
        '.....T....',
        '..........'
      ]
    },

    {
      key: 'intro-1',
      name: 'Turn, Then Fire!',
      map: [
        '..........',
        '......R...',
        '...T......',
        '..........',
        '.......R..',
        '...TT.....',
        '..........',
        '...^...B..',
        '......T...',
        '..........'
      ]
    },

    {
      key: 'intro-2',
      name: 'Moving Around',
      map: [
        '..........',
        '......T...',
        '..r.......',
        '..........',
        '.....T....',
        '...R......',
        '..T....Br.',
        '...R.T....',
        '..^T..T...',
        '..........'
      ]
    },

    {
      key: 'intro-3',
      name: 'Move A Lot',
      map: [
        '..........',
        '.....|....',
        '..>....|R.',
        '...|.|....',
        '...r.|....',
        '...|...B..',
        '...R.|R...',
        '...|.TT...',
        '..T..|..T.',
        '..........'
      ]
    },

    {
      key: 'intro-4',
      name: 'Trees Go Boom',
      map: [
        '..........',
        '.R.++Tr+..',
        '..*T.B.T..',
        '...*...T..',
        '.T.TTrT+..',
        '..R.......',
        '....T.....',
        '..>.......',
        '.....R....',
        '..........'
      ]
    },

    {
      key: 'intro-5',
      name: 'Mines Go Boom, Too',
      map: [
        '..........',
        '.T........',
        '...|.*<*..',
        '.B.|..*T..',
        '...|......',
        '.----rRR..',
        '......r...',
        '.T........',
        '...RT.....',
        '..........'
      ]
    },

    {
      key: 'intro-6',
      name: 'Mines',
      map: [
        '..........',
        '..R...rO..',
        '..|RTT....',
        '..TB..*T..',
        '....|.....',
        '...--+^...',
        '..T....T..',
        '.r..T.....',
        '.....R....',
        '..........'
      ]
    },

    {
      key: 'intro-7',
      name: 'Secret Entrance',
      map: [
        '..........',
        '..RvRrr...',
        '......T...',
        '.|--*.....',
        '.T..*.....',
        '..TR--++..',
        '.....O+...',
        '....|.B...',
        '.....O|...',
        '..........'
      ]
    },

    {
      key: 'intro-8',
      name: 'Maze',
      map: [
        '..........',
        '..*++-....',
        '.|.T..<...',
        '.|........',
        '.|R.OT.*..',
        '.rT...**..',
        '..rT.R....',
        '..r.O..OT.',
        '..TT..R.B.',
        '..........'
      ]
    },

    {
      key: 'intro-9',
      name: 'Beam Towers Never Wait',
      map: [
        '..........',
        '.O.ORTTrr.',
        '.....TT...',
        '..B..**R..',
        '.OTr..O...',
        '..*T......',
        '.O....O...',
        '..T.-...*.',
        '..|+^.|...',
        '..........'
      ]
    }

  ]

}
