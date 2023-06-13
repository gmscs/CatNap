class Start extends Phaser.Scene {
    constructor() {
        super('Start');
    }

    preload() {
        this.load.bitmapFont('font', 'shortStack.png', 'shortStack.xml');
        this.load.image('menus_bg', 'assets/menus_bg.png');
    }

    create() {
        this.add.image(550, 350, 'menus_bg');
        title = this.add.bitmapText(380, 75, 'font', "CatNap", 84);

        startButton = this.add.bitmapText(475, 275, 'font', "Start");
        startButton.setInteractive();

        helpButton = this.add.bitmapText(490, 335, 'font', "Help");
        helpButton.setInteractive();

        highscoresbutton = this.add.bitmapText(385, 395, 'font', "High Scores");
        highscoresbutton.setInteractive();

        creditsbutton = this.add.bitmapText(450, 550, 'font', "Credits");
        creditsbutton.setInteractive();

        startButton.on('pointerup', () => { menuTime2 = Date.now(); menuTime = menuTime2 - menuTime1; this.scene.start('CatNap') });
        helpButton.on('pointerup', () => { helpChecked = 1; this.scene.start('Help') });
        highscoresbutton.on('pointerup', () => { scoresChecked = 1; this.scene.start('HighScore') });
        creditsbutton.on('pointerup', () => { creditsChecked = 1; this.scene.start('Credits') });
    }

    update() {}
}