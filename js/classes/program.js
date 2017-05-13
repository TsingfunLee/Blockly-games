Class.subclass('Program', {

  // List of valid commands
  CODES: ['fire', 'left', 'move', 'right', 'wait'],

  // Parse a command into the command plus optional amount, ie "cmd(amt)"
  COMMAND_REGEX: /^\s*([a-z]+)(?:\(([0-9]+)\))?\s*$/

}, {

  init: function(level) {
    this.level = level;
    this.map = level.map;
    this.key = level.key;
    this.tank = this.map.getTank();
    this.reset();
    this.reload();
  },

  reset: function() {
    this.locks = 0;
    this.ok = true;
    this.running = false;
    this.errors = {};
    this.commands = [];
  },

  lock: function() {
    this.locks += 1;
  },

  unlock: function() {
    this.locks -= 1;
    if (this.locks == 0) {
      this.cycle();
    }
  },

  reload: function() {
    var state = Level.getState(this.key);
    $('#program').val(state.program || '');
    $('#program').focus();
  },

  save: function() {
    var state = Level.getState(this.key);
    state.program = $('#program').val();
    Level.setState(this.key, state);
  },

  run: function() {
    this.save();
    this.reset();
    this.parse();
    if (this.ok) {
      this.execute();
    }
  },

  parse: function() {
    var self = this;
    var source = $('#program').val();
    var lines = source.split(/\r?\n/);
    $.each(lines, function(i, line) {
      self.parseLine(i, line);
    });
  },

  parseLine: function(lineNum, line) {
    var match = Program.COMMAND_REGEX.exec(line);
    if (match) {
      var code = match[1];
      var amt = match[2];
      if (this.validCommand(code)) {
        if (!amt || amt < 1) { amt = 1; }
        for (var i = 0; i < amt; i++) {
          this.commands.push({code: code, line: lineNum});
        }
      } else {
        this.addBug(lineNum, 'unknown command');
      }

    } else {
      if (/^\s*$/.exec(line)) {
        // Skip, just a blank line...
      } else {
        // Got an error!
        this.addBug(lineNum, 'invalid');
      }
    }
  },

  addBug: function(lineNum, msg) {
    this.ok = false;
    this.errors[lineNum] = msg;
  },

  validCommand: function(code) {
    return $.inArray(code, Program.CODES) >= 0;
  },

  execute: function() {
    this.running = true;
    this.currentCommand = null;
    this.cycle();
  },

  cycle: function() {
    if (!this.running) { return; }
    if (this.currentCommand === null) {
      // First cycle, begin iteration
      this.currentCommand = 0;
    } else {
      // Iteration
      this.currentCommand += 1;
      // Let everything update as needed
      this.map.each(function(obj) {
        obj.onCycle();
      });
    }

    if (!this.running) { return; }

    // Check for just running out of commands
    if (this.currentCommand >= this.commands.length) {
      app.level.lose();
      return;
    }

    // Get command and run it!
    if (!this.running) { return; }
    var cmd = this.commands[this.currentCommand];
    var amt = cmd.amt;
    if (amt == null) { amt = 1; }
    // for (var times=0;times < amt; times++) {
    this.executeCommand(cmd.code);
    // }
  },

  executeCommand: function(code) {
    var program = this;
    var tank = this.tank;
    var map = this.map;

    // Lock for initial command, more locks may be applied by animations, etc.
    program.lock();

    switch(code) {

      case 'move':
        // Move forward
        var newPos = tank.getMapPos().addDir(tank.getDir(), 1);
        if (map.isPassable(newPos)) {
          // Do the move!
          app.audio.play('move-tank');
          tank.tween({x: newPos.x*50, y: newPos.y*50}, 45, function() {
            app.audio.stop('move-tank');
            tank.setMapPos(newPos);
            program.unlock();
          });
        } else {
          // Bump!
          var curPos = tank.getScreenPos();
          var newPos = curPos.dup().addDir(tank.getDir(), 8);
          tank.tween({x: newPos.x, y: newPos.y}, 3, function() {
            tank.tween({x: curPos.x, y: curPos.y}, 3, function() {
              setTimeout(function() {program.unlock();}, 800);
            });
          });
        }
        break;

      case 'right':
        // Turn right
        app.audio.play('move-tank');
        var newDir = Dir.right(tank.getDir());
        tank.tween({rotation: tank.getRotation() + 90}, 35, function() {
          app.audio.stop('move-tank');
          tank.setDir(newDir);
          program.unlock();
        });
        break;

      case 'left':
        // Turn left
        app.audio.play('move-tank');
        var newDir = Dir.left(tank.getDir());
        tank.tween({rotation: tank.getRotation() - 90}, 35, function() {
          app.audio.stop('move-tank');
          tank.setDir(newDir);
          program.unlock();
        });
        break;

      case 'wait':
        // Wait one cycle
        setTimeout(function() {program.unlock();}, 1000);
        break;

      case 'fire':
        // Fire the cannon
        app.audio.play('fire');
        tank.playAnimation('fire');
        setTimeout(function() {
          var bullet = new Bullet(map);
          var startPos = tank.getScreenPos();
          startPos.addDir(tank.getDir(), 32);
          bullet.setScreenPos(startPos);
          bullet.setDir(tank.getDir());
          var endMapPos = tank.getMapPos().addDir(tank.getDir(), 1);
          while (map.isPassable(endMapPos)) {
            endMapPos.addDir(tank.getDir(), 1);
          }
          var endPos = endMapPos.toScreenPos();
          endPos.addDir(tank.getDir(), -22);
          if (map.onMap(endMapPos)) {
            // Hit!
            var target = null;
            map.each(endMapPos.x, endMapPos.y, function(obj) {
              if (!obj.isPassable()) { target = obj; }
            });
          }
          var duration = Math.floor((Math.abs(startPos.x - endPos.x) + Math.abs(startPos.y - endPos.y))/10);
          bullet.tween({x: endPos.x, y: endPos.y}, duration, function() {
            bullet.destroy();
            //bullet.entity.alpha = 0;
            if (target) {
              target.takeDamage(1);
            }
            setTimeout(function() { program.unlock(); }, 500);
          });
        }, 50);
        break;

    }
  }

});
