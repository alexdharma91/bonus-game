function GameModel(radius) {
    this.radius = radius;
    this.xPoint = 20;
    this.yPoint = 20;
}

GameModel.prototype.setCanvas = function (canvas) {
    this.canvas = canvas;
    this.paintContext = canvas.getContext("2d");

    this.xBonusMin = this.radius;
    this.xBonusMax = canvas.width - this.radius;
    this.yBonusMin = this.radius;
    this.yBonusMax = canvas.height - this.radius;
    this.generateBonusPoint();
};

GameModel.prototype.ballMoveTo = function (xPoint, yPoint) {
    this.xPoint = xPoint;
    this.yPoint = yPoint;
};

GameModel.prototype.paint = function () {
    this.paintContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.paintContext.beginPath();
    this.paintContext.arc(this.xPoint, this.yPoint, this.radius, 0, 4 * Math.PI, false);
    this.paintContext.arc(this.xBonusPoint, this.yBonusPoint, this.radius, 0, 4 * Math.PI, false);
    this.paintContext.closePath();
    this.paintContext.fill();
};

GameModel.prototype.getBallXPoint = function () {
    return this.xPoint;
};

GameModel.prototype.getBallYPoint = function () {
    return this.yPoint;
};

GameModel.prototype.generateBonusPoint = function(){
    this.xBonusPoint = this.xBonusMin - 0.5 + Math.random()*(this.xBonusMax - this.xBonusMin + 1);
    this.xBonusPoint = Math.round(this.xBonusPoint);

    this.yBonusPoint = this.yBonusMin - 0.5 + Math.random()*(this.yBonusMax - this.yBonusMin + 1);
    this.yBonusPoint = Math.round(this.yBonusPoint);
}

GameModel.prototype.checkDimension = function (nextXPoint, nextYPoint) {
    if ((nextYPoint + this.radius) > this.canvas.height || (nextYPoint - this.radius) <= 0) {
        return false;
    }
    if ((nextXPoint + this.radius) > this.canvas.width || (nextXPoint - this.radius) <= 0) {
        return false;
    }
    return true;
}

GameModel.prototype.checkHit = function(){
    if(Math.sqrt(Math.pow((this.xPoint - this.xBonusPoint), 2) + Math.pow((this.yPoint - this.yBonusPoint), 2)) <= this.radius){
        this.repaintBonus = true;
    }else{
        this.repaintBonus = false;
    }
}

GameModel.prototype.getRepaintBonus = function(){
    return this.repaintBonus;
}