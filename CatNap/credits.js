class Credits extends Phaser.Scene {
    constructor() {
        super('Credits');
    }

    preload() {
        this.load.bitmapFont('font', 'shortStack.png', 'shortStack.xml');
        this.load.image('menus_bg', 'assets/menus_bg.png');
    }

    create() {
        this.add.image(550, 350, 'menus_bg');

        this.add.bitmapText(450, 100, 'font', "Credits");

        this.add.bitmapText(350, 210, 'font', "Game done by: ");
        this.add.bitmapText(415, 300, 'font', "Ebba Rovig", 42);
        this.add.bitmapText(350, 360, 'font', "Guilherme Serpa", 42);
        this.add.bitmapText(360, 420, 'font', "Maria Jacobson", 42);

        menuButton = this.add.bitmapText(900, 650, 'font', "Main Menu", 32);
        menuButton.setInteractive();

        menuButton.on('pointerup', () => { this.scene.start('Start') });
    }

    update() {}
}