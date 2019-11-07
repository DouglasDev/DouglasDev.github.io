//var socket = io();
var game = new Phaser.Game(
    cyberpunks.Config.SCREEN_WIDTH,
    cyberpunks.Config.SCREEN_HEIGHT,
    Phaser.AUTO,
    '',
    {
      preload: preloadFn,
      create: createFn,
      update: updateFn
    });
var climber;
var course;
var screenText;
var socketManager;

function preloadFn() {
  game.load.image('background', 'bg.png');
  game.load.image('wood', './wood.jpeg');
  
  cyberpunks.SpriteLoader.loadClimberSprites(game, 'skeleton');
  cyberpunks.SpriteLoader.loadHoldSprites(game);
};

function createFn() {
  game.add.tileSprite(
      0, 0,
      cyberpunks.Config.GAME_WIDTH, cyberpunks.Config.GAME_HEIGHT,
      'wood');
  game.world.setBounds(
      0, 0,
      cyberpunks.Config.GAME_WIDTH, cyberpunks.Config.GAME_HEIGHT);

  game.physics.startSystem(Phaser.Physics.P2JS);
  game.physics.p2.gravity.y = cyberpunks.Config.GRAVITY_Y;

  var collisionGroups = new cyberpunks.CollisionGroups(game);
  course = cyberpunks.Courses.randomSpriteGrid(
      game, collisionGroups,
      0, 0,
      cyberpunks.Config.GAME_WIDTH, cyberpunks.Config.GAME_HEIGHT,
      60, 180);
  climber = new cyberpunks.Climber(
      game, collisionGroups, cyberpunks.Config.CLIMBER_SIZE);
  climber.moveEntireBodyTo(
      cyberpunks.Config.GAME_WIDTH / 2, cyberpunks.Config.GAME_HEIGHT - 300);

  // For collision groups to collide with the world borders.
  game.physics.p2.updateBoundsCollisionGroup();

  game.camera.scale.x = cyberpunks.Config.CAMERA_SCALE;
  game.camera.scale.y = cyberpunks.Config.CAMERA_SCALE;
  game.camera.deadzone = new Phaser.Rectangle(
      cyberpunks.Config.CAMERA_DEADZONE_WIDTH,
      cyberpunks.Config.CAMERA_DEADZONE_WIDTH, 
      (cyberpunks.Config.SCREEN_WIDTH
          - 2 * cyberpunks.Config.CAMERA_DEADZONE_WIDTH),
      (cyberpunks.Config.SCREEN_HEIGHT
          - 2 * cyberpunks.Config.CAMERA_DEADZONE_WIDTH));

  // Register callback functions for mouse events.
  game.input.onDown.add(click, this);
  game.input.onUp.add(release, this);

  // Prevent the game from pausing when the window loses focus.
  game.stage.disableVisibilityChange = true;

  screenText = new cyberpunks.ScreenText(game);
  //socketManager = new cyberpunks.SocketManager(socket, climber, screenText);
}

function updateFn() {
  if (cyberpunks.Config.SHOW_DEBUG_CLIMBER_GRAPHICS) {
    climber.showDebugGraphics();
  }

  // Position the draggable limbs of the climber, based on whether they are
  // being dragged, fixed to a hold, or fixed to another player's mouse.
  var mouseCoordinates = getMouseCoordinates();

  climber.positionLimbs(mouseCoordinates[0], mouseCoordinates[1]);

  // Unfix limbs as appropriate.
  if (cyberpunks.Config.CLIMBER_FALLS_BASED_ON_FORCES) {
    climber.maybeUnfixLimbsBasedOnForce();
  }

  //socketManager.sendClimberReports();
}

function click(pointer) {
  var mouseCoordinates = getMouseCoordinates();
  climber.dragLimbMyself(mouseCoordinates[0], mouseCoordinates[1]);
}

function release() {
  climber.releaseLimbs(course);
}

function getMouseCoordinates() {
  return [
    game.input.activePointer.worldX / game.camera.scale.x,
    game.input.activePointer.worldY / game.camera.scale.y
  ];
}