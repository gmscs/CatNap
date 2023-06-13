class Help extends Phaser.Scene {
    constructor() {
        super('Help');
    }

    preload() {
        this.load.bitmapFont('font', 'shortStack.png', 'shortStack.xml');
        this.load.image('menus_bg', 'assets/menus_bg.png');
    }

    create() {
        this.add.image(550, 350, 'menus_bg');

        this.add.bitmapText(500, 100, 'font', "Help");

        var description =  "Collect all the cheese in each level\n" +
                            "without letting the cat see you!\n" + 
                            "If the cat's eyes are open you still\n" +
                            "have time to hide or distract it with\n" +
                            "one of its toys!\n" + 
                            "Collecting all the cheese in a level\n" +
                            "will show you a way out of each level.\n" + 
                            "Try doing so without ringing any bells\n" +
                            "because they will instantly alert the cat\n" +
                            "to your position!\n\n" + 
                            "The quicker you finish a level and the more\n" + 
                            "boosters you acquire, the higher your score\n" +
                            "will be! Try to set your place on the\n" +
                            "High Score screen!";

        this.add.bitmapText(150, 210, 'font', "Controls");
        this.add.text(150, 280, "Left arrow key - moves left.");
        this.add.text(150, 310, "Right arrow key - moves right.");
        this.add.text(150, 340, "Up arrow key - mouse jump.");
        this.add.text(150, 370, "Down arrow key - fall down faster.");
        this.add.text(150, 400, "Z key - activate hiding booster!");
        this.add.text(150, 430, "X key - activate jello booster to\n"+
                                "        disable bells!");
        this.add.text(150, 470, "C key - throw yarn at the cat to\n"+
                                "        distract it before it finds you!");
        
        this.add.bitmapText(600, 210, 'font', "Description");
        this.add.text(600, 280, description);

        menuButton = this.add.bitmapText(900, 650, 'font', "Main Menu", 32);
        menuButton.setInteractive();

        menuButton.on('pointerup', () => { this.scene.start('Start') });
    }

    update() {}
}