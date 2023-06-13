class CatNap extends Phaser.Scene {
    constructor() {
        super('CatNap');
    }

    preload ()
    {
        this.load.image('room', 'assets/room.png');
        this.load.image('ground', 'assets/bar.png');
        this.load.image('platform', 'assets/whitePlatform.png');
        this.load.image('smallPlatform', 'assets/smallPlatform.png');
        this.load.image('cheese', 'assets/cheese.png');
        this.load.spritesheet('mouse', 'assets/mouseSprite.png', { frameWidth: 34, frameHeight: 47 });
        this.load.image('bell', 'assets/bell.png');
        this.load.image('door', 'assets/door.png');
       
        this.load.image('evil1', 'assets/evil.png');
        this.load.image('box', 'assets/box.png');
        this.load.image('inv_shields', 'assets/smallBox.png');
        this.load.image('inv_jellos', 'assets/jello.png');
        this.load.image('inv_yarns', 'assets/yarn.png');
        this.load.image('movablePlatform', 'assets/movingPlatform.png');

        // CAT
        this.load.image('sleeping_cat', 'assets/sleepingcat.png');
        this.load.image('waking_cat', 'assets/wakingcat.png');
        this.load.image('playing_cat', 'assets/playingcat.png');

        this.load.image('waking1', 'assets/waking1.png');
        this.load.image('waking2', 'assets/waking2.png');
        this.load.image('waking3', 'assets/waking3.png');

        this.load.image('snooze1', 'assets/snooze1.png');
        this.load.image('snooze2', 'assets/snooze2.png');
        this.load.image('snooze3', 'assets/snooze3.png');

        this.load.image('looking1', 'assets/looking1.png');
        this.load.image('looking2', 'assets/looking2.png');

        this.load.image('playing1', 'assets/playing1.png');
        this.load.image('playing2', 'assets/playing2.png');

        this.load.image('hitbox', 'assets/hitbox.png');
        this.load.image('bell_hitbox', 'assets/bell_hitbox.png');

        this.load.image('menus_bg', 'assets/menus_bg.png');

        // BOOSTERS

        this.load.image('boxCoin', 'assets/boxCoin.png');
        this.load.image('smallBox', 'assets/smallBox.png');
        this.load.image('jelloCoin', 'assets/jelloCoin.png');
        this.load.image('jello', 'assets/jello.png');
        this.load.image('yarnCoin', 'assets/yarnCoin.png');
        this.load.image('yarn', 'assets/yarn.png');


    }

    create ()
    {
        this.add.image(550, 350, 'room');
        this.add.image(550, 656, 'ground');
        

        var gridConfig = {
            'scene': this,
            'cols': 40,
            'rows': 40,
        }
        this.Grid = new Grid(gridConfig);

        // CAT ANIMATION

        this.anims.create({
            key: 'waking',
            frames: [
                { key: 'waking1' , duration: 50},
                { key: 'waking2' },
                { key: 'waking3' , duration: 50},
                { key: 'waking2' }
            ],
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'looking',
            frames: [
                { key: 'looking1' , duration: 500},
                { key: 'looking2' },
                { key: 'looking1' , duration: 100},
                { key: 'looking2' },
            ],
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'snooze',
            frames: [
                { key: 'snooze1' , duration: 200},
                { key: 'snooze2' },
                { key: 'snooze3' , duration: 150},
                { key: 'snooze2' }
            ],
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'evil',
            frames: [
                { key: 'evil1' , duration: 10},
                { key: 'evil1' },
            ],
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'playing',
            frames: [
                { key: 'playing1' , duration: 180},
                { key: 'playing2' },
                { key: 'playing1' , duration: 70},
                { key: 'playing2' },
            ],
            frameRate: 8,
            repeat: -1
        });

        cat = this.physics.add.sprite(0, 0, 'snooze');

        // MOUSE SPRITE

        mouse = this.physics.add.sprite(0, 0, 'mouse');

        mouse.setBounce(0.1);
        mouse.setCollideWorldBounds(true);
        mouse.body.setGravityY(700);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('mouse', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        
        this.anims.create({
            key: 'turn',
            frames: [ { key: 'mouse', frame: 4 } ],
            frameRate: 20
        });
        
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('mouse', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        timedEvent = this.time.addEvent(timerconfig);
        platforms = this.physics.add.staticGroup();
        movableTrains = this.physics.add.group({
            allowGravity: false
        });
        movablePlatforms = this.physics.add.group({
            allowGravity: false,
        });
        cheeses = this.physics.add.group();
        bells = this.physics.add.group();
        boxes = this.physics.add.group();
        bell_hitboxes = this.physics.add.group();
        shields = this.physics.add.group({
            allowGravity: false
        });
        jellos = this.physics.add.group({
            allowGravity: false
        });
        yarns = this.physics.add.group({
            allowGravity: false
        });
        
        inv_shields = this.physics.add.staticGroup();
        inv_jellos = this.physics.add.staticGroup();
        inv_yarns = this.physics.add.staticGroup();

        this.keys = this.input.keyboard.addKeys({
        z: Phaser.Input.Keyboard.KeyCodes.Z, //shield
        x: Phaser.Input.Keyboard.KeyCodes.X, //jello
        c: Phaser.Input.Keyboard.KeyCodes.C  //yarn
        }); 

        cat.body.allowGravity = false;
        cat.setPushable(false);
        
        cursors = this.input.keyboard.createCursorKeys();

        cheeses.children.iterate(function (cheese) {
            cheese.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });

        bells.getChildren().forEach(function(bell) {
            bell.setPushable(false);
        });

        hideables = [boxes];
        hideables.push(movableTrains);

        this.physics.add.collider(mouse, platforms);
        this.physics.add.collider(cheeses, platforms);
        this.physics.add.collider(bells, platforms);
        this.physics.add.collider(bell_hitboxes, platforms);
        this.physics.add.collider(shields, platforms);
        this.physics.add.collider(jellos, platforms);
        this.physics.add.collider(boxes, platforms);
        this.physics.add.collider(yarns, platforms);

        this.physics.add.collider(mouse, movablePlatforms);
        this.physics.add.collider(cheeses, movablePlatforms);
        this.physics.add.collider(bells, movablePlatforms);
        this.physics.add.collider(bell_hitboxes, movablePlatforms);
        this.physics.add.collider(shields, movablePlatforms);
        this.physics.add.collider(jellos, movablePlatforms);
        this.physics.add.collider(boxes, movablePlatforms);
        this.physics.add.collider(yarns, movablePlatforms);
        
        this.physics.add.overlap(mouse, cheeses, collectCheese, null, this);
        this.physics.add.collider(mouse, bell_hitboxes, hitBell, null, this);
        this.physics.add.overlap(mouse, shields, collectShield, null, this);
        this.physics.add.overlap(mouse, jellos, collectJello, null, this);
        this.physics.add.overlap(mouse, yarns, collectYarn, null, this);
        this.physics.add.overlap(mouse, boxes);
        this.physics.add.overlap(mouse, movableTrains);
    }

    update (time) {
                
        if (levelCreated == false) {

            // Create levels
            currentLevel = levels[level];

            // Level creation
            if(level > 0) {
                elapsedTime += runtime;
                runtime = 0;
                this.physics.pause(),
                currentScoreText = this.add.text(280, 280, "Current score: " + score + " \n   Leveling up!", {fontSize: '50px', fill: '#999' });
                currentScoreText.setDepth(3);
                background = this.add.image(550, 350, "menus_bg");
                background.setDepth(2);
                
                this.time.addEvent({
                delay: 3500,
                callback: ()=>{
                    this.physics.resume()
                    currentScoreText.setText(" ");
                    background.destroy();
                },
                loop: true
                })
                
            };

            buildLevel(currentLevel, this);
            timedEvent.reset(timerconfig);
            levelComplete = false;
            levelCreated = true;
        }
        
        // Time 
        if (gameOver == false) {
            
            if (level == 0) { runtime =  (time * 0.001) - elapsedTime - menuTime * 0.001;}
            else { runtime = (time * 0.001) - elapsedTime; }
            runtimeText.setText("Time: " + Math.floor(runtime));
        
            // Horizontal Movement
            if (cursors.left.isDown) {
                mouse.setVelocityX(-350);
                mouse.play('left', true);
            }
            else if (cursors.right.isDown) {
                mouse.setVelocityX(350); 
                mouse.play('right', true);
            }
            else {
                mouse.setVelocityX(0);
                mouse.play('turn');
            }
            // Quicken Falling
            if (cursors.down.isDown && !mouse.body.touching.down) mouse.setVelocityY(600);

            /* In-Air movement
            *
            * If the mouse is in the air then it decelerates towards 0.
            * If the mouse is in the air and falling then it falls slowly.
            * 
            * If the mouse is grounded then reset the jumps and the gravity. 
            */
            if (!mouse.body.touching.down) {
                mouse.setAccelerationY(0);
                if(mouse.body.velocity.y > 0) {
                    mouse.setGravityY(700);
                }
            }
            else {
                jumpCounter = 0;
                mouse.setGravityY(700);
            }
            
            /* Jumping
            *
            * If this is the mouse's first jump then it jumps higher and faster
            * and we tell the game that the mouse is jumping. 
            * 
            * If the mouse is jumping when the player presses to jump once more,
            * then the second jump is shorter and we reset the jump counter.
            * 
            * Jumping is bound to the 'Up' key.
            */
            if (cursors.up.isDown && Phaser.Input.Keyboard.JustDown(cursors.up))
            {
                if (jumpCounter == 0 && mouse.body.touching.down) {
                    mouse.setVelocityY(-350);
                    mouse.setAccelerationY(-5000);
                    jumpCounter++;
                }
                else if (jumpCounter == 1) {
                    mouse.setVelocityY(-350);
                    mouse.setGravityY(650);
                    jumpCounter = 0;
                }
            }

            /* Boosters
            * 
            * S key sets down a shield for the mouse to hide behind.
            * J key sets down a jello to disable a bell and allow for high jumping.
            *
            * enableKey is there as a workaround to Phaser's key system which forces us
            * to use "isDown" which continually recognizes a key's position.
            * AKA we get 'Z' rather than 'ZZZZZZZZZZZZZZZZZZZZ'.
            */
            if (this.keys.z.isDown && mouse.body.touching.down && enableKey == true) {
                enableKey = false;
                setShield(mouse, this);
            }
            if (this.keys.x.isDown && mouse.body.touching.down && enableKey == true) {
                enableKey = false;
                setJello(mouse, this);
            }
            if (this.keys.c.isDown && enableKey == true) {
                enableKey = false;
                throwYarn(mouse, this);
            }
            else if (this.keys.z.isUp && this.keys.x.isUp && this.keys.c.isUp) {
                enableKey = true;
            }

            /* Cat
            *
            * Checks if the mouse is hiding behind a hideable object.
            * If mouse is hiding then the cat stays awake for a time before sleeping again.
            * Otherwise game ends. 
            * 
            */
            if (isHiding(mouse, this) === true && catLooking == true) {
                setTimeout(function() {catLooking = false;}, 2000);
            } 
            else if (isHiding(mouse, this) === false && catLooking == true && playing == false) {
                caught = true;
                endLevel();
            }

            if(cheeseCount == 0 && doorSpawned == false) { //just for the prototype
                createDoor(currentLevel, this);
                doorSpawned = true;
                levelComplete = true;
                cheeseTime = Date.now();
            }
            
            if ((10 - timedEvent.getProgress().toString().substr(0, 3) * 10) <= 3) {
                timeText.setText('' + (10 - timedEvent.getProgress().toString().substr(0, 3) * 10));
                if (yarnThrown == true) {
                    timeText.setText('');
                }
                if(!awake){
                    cat.play('waking');
                    awake = true;
                }      
            }
        
            if ((10 - timedEvent.getProgress().toString().substr(0, 3) * 10) > 3) {
                awake = false;
                playing = false;
                yarnThrown = false;  
                if ((10 - timedEvent.getProgress().toString().substr(0, 3) * 10) == 8) {
                    awake = false;
                    playing = false;
                    timeText.setText('');
                    cat.play('snooze');
              }
                timeText.setText('');
            }

            if(collectPathData) savePosition(mouse.x, mouse.y);
            moveTrains();
            movePlatforms();
        }
        if (playerWon == true && gameOver == true) {
    
            this.add.bitmapText(340, 280, 'font', "Game Complete!");
            this.physics.pause();
            this.time.addEvent({
                delay: 4000,
                callback: ()=>{
                this.scene.start('HighScore');
            },
            loop: true
        })
        }
        else if (gameOver == true) {
            cat.play('evil');
            this.add.bitmapText(400, 280, 'font', "Game Over");
            this.physics.pause();
            this.time.addEvent({
                delay: 3000,
                callback: ()=>{
                    this.scene.start('HighScore');
                },
                loop: true
            })
        }
    }
}