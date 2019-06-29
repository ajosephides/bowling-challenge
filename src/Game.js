"use strict"

function Game(){
  this._frames = []
  this._lastThreeRoles = []
};


Game.prototype.roll = function(pins){
    this._setFrame();
    this._currentFrame().roll(pins);
    this._lastThreeRoles.push(pins);
    if(this._lastThreeRoles.length === 3){
      this.strikeBonus(pins);
      this._lastThreeRoles.shift();
    }
};

Game.prototype.frameNumber= function(){
  return this._frames.length;
};

Game.prototype.score =  function(){
  let score = 0;
  this._frames.forEach(function(frame){
    score = score + frame.totalScore()
  });
  return score;
};

Game.prototype._currentFrame = function(){
  return this._frames[this._frames.length - 1];
};

Game.prototype._addFrame = function(frame = new Frame()){
  this._frames.push(frame)
};

Game.prototype._setFrame = function(){
  if(this._frames.length === 0 || !this._currentFrame().isInPlay()){
    this._addFrame();
  } 
};

Game.prototype._lastFrame = function(){
  return this._frames[this._frames.length - 2];
}

Game.prototype.strikeBonus= function(pins){
  if(this._lastThreeRoles[0] === 10 & this._lastThreeRoles.length === 3 & this._lastThreeRoles[1] != 10) {
    console.log("Stike Bonus 1 strike")
    this._lastFrame().addBonus(this._currentFrame().score());
  }
  else if(this._lastThreeRoles[0] === 10 & this._lastThreeRoles.length === 3 & this._lastThreeRoles[1] === 10) {
    console.log("Stike Bonus 2 strike")
    this._frames[this._frames.length - 3].addBonus((10 + pins));
  };
    
};