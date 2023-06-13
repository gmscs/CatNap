class HighScore extends Phaser.Scene {
    constructor() {
        super('HighScore');
    }

    preload() {
        this.load.bitmapFont('font', 'shortStack.png', 'shortStack.xml');
        this.load.image('menus_bg', 'assets/menus_bg.png');
    }

    create() {
        this.add.image(550, 350, 'menus_bg');
        const highscores = JSON.parse(highScore) ?? [];
        
        if(gameOver) {
            this.saveScore(score, highscores);
            scoreText = this.add.text(400, 650, 'Your Score: ' + score, { fontSize: '32px' });
        }

        let i = 0;
        this.add.bitmapText(250, 50, 'font', "RANK");
        this.add.bitmapText(450, 50, 'font', "NAME");
        this.add.bitmapText(650, 50, 'font', "SCORE");
        highscores.forEach(score => {
            if(i >= totalHighScores) return true;
            this.add.text(300, 60*(i+1) + 50, i+1, { fontSize: '32px' });
            this.add.text(500, 60*(i+1) + 50, score.name, { fontSize: '32px' });
            this.add.text(700, 60*(i+1) + 50, score.score, { fontSize: '32px' });
            i++;
        });

        replayButton = this.add.bitmapText(900, 650, 'font', 'Main Menu', 32);
        replayButton.setInteractive();
        replayButton.on('pointerup', () => { if(telemetry && gameOver) {saveToLocalStorage(); window.location.reload(); } if(!telemetry && gameOver) window.location.reload(); else if (!gameOver) { this.scene.start('Start') } });
    }

    saveScore(score, highscores) {
        const long_name = prompt("Your Name:");
    
        if(long_name != "" && long_name != null) {
            const name = long_name.substring(0,5);
            const newScore = {score, name};
    
            highscores.push(newScore);
            highscores.sort((a,b) => b.score - a.score);
            localStorage.setItem('highscores', JSON.stringify(highscores));
        }
    }
}