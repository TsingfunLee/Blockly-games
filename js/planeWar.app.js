var app = null;
$(function() {
  app = App.start();
  app.blockly = window.DDBlockly;
  app.blockly.game = app;
  app.blockly.init();
});
