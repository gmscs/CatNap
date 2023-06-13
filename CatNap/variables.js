//Bitmap fonts are from https://github.com/photonstorm/phaser3-examples

var mouse;
var cat;
var boxes;
var cheeses;
var platforms;
var movableTrains;
var movablePlatforms;
var cursors;
var score = 0;
var scoreText;
var shieldText;
var jelloText;
var shield_count;
var jello_count;
var enableKey = true;
var doorSpawned = false;
var level = 0;
var jumpCounter = 0;
var hiding = false;
var catLooking = false;
var timeText;
var evil;
var hideables;
var runtimeText;
var runtime;
const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;
var gameOver = false;
var cheeseCount = 0;
var levelComplete = false;
var levelCreated = false;
var yarn_count;
var yarnText;
var awake = false;
var cat_awake;
var cat_playing;
var playing = false;
var inv_shields;
var inv_jellos;
var inv_yarns;
var elapsedTime = 0;
var caught = false;
var activated_items = [];
var replayButton;
var startButton;
var timedEvent;
var bells;
var shields;
var jellos;
var yarns;
var currentLevel;
var nameText;
var helpButton;
var menuButton;
var highscoresbutton;
var menuTime;
var looking = false;
var playerWon = false;
var yarnThrown = false;
var currentScoreText;
var background;

var menuTime1 = Date.now();
var menuTime2;

var trainOrigins = [];
var trainMoves = [];
var movePoint = [];
var originPoint = [];
var objective = [];
var numMovingTrains;

var platformOrigins = [];
var platformMoves = [];
var platMovePoint = [];
var platOrigPoint = [];
var platObjective = [];
var numMovingPlatforms;

var hitbox;
var bell_hitboxes;

var levels;

var game;

var title;
var creditsbutton;

//TELEMETRY & HIGH SCORES
var collectPathData = false; //pls do not change this
const totalHighScores = 9;
const highScore = localStorage.getItem('highscores');
const pathing = localStorage.getItem('pathing');
const boosters = localStorage.getItem('boosters');
const screens = localStorage.getItem('screens');
const times = localStorage.getItem('times');
const cheesedoortimes = localStorage.getItem('cheesedoortimes');
var telemetry = false;
var totalBoosters = 0;
var usedBoosters = 0;
var collectedBoosters = 0;
var shieldsTotal = 0;
var shieldsUsed = 0;
var jellosTotal = 0;
var jellosUsed = 0;
var yarnsTotal = 0;
var yarnsUsed = 0;
var helpChecked = 0;
var scoresChecked = 0;
var creditsChecked = 0;
var path = [];
var pathsLevels = [];
var levelTimesInfoSession = [];
var boosterInfoSession = [];
var screensCheckedSession = [];
var cheesedoorTimesSession = [];
const boosterInfo = JSON.parse(boosters) ?? [];
const screensChecked = JSON.parse(screens) ?? [];
const levelTimes = JSON.parse(times) ?? [];
const cheesedoorTimes = JSON.parse(cheesedoortimes) ?? [];
const pathsTotal = JSON.parse(pathing) ?? [];
var cheeseTime;
var doorTime;

var timerconfig = {
    delay: 10000, // 10 second countdown
    callback: function() {if(!playing) { catLooking = true; cat.play('looking') }},
    callbackScope: this,
    loop: true
};

