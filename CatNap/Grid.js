class Grid {
    constructor(config) {
        if(!config.scene) {
            console.log("Missing scene.");
            return;
        }
        
        config.width = game.config.width;
        config.height = game.config.height;
        
        this.scene = config.scene;
        this.height = config.height;
        this.width = config.width;
        this.rows = config.rows;
        this.cols = config.cols;
        this.cell_width = this.width / this.cols;
        this.cell_height = this.height / this.cols;
    }

    placeObject(x1, y1, obj) {
        var x2 = this.cell_width * x1 + this.cell_width / 2;
        var y2 = this.cell_height * y1 + this.cell_height / 2;
        obj.x = x2;
        obj.y = y2;
    }
}