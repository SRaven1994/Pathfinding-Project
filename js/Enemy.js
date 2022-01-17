class Enemy{
    /** @type {Phaser.Physics.Arcade.Sprite} */
    sprite
    /** @type {number} */
    speed = 200 // ms between tiles
    /** @type {number} */
    targetX
    /** @type {number} */
    targetY
    /** @type {boolean} */
    pendingMove
    constructor(scene, x, y, texture) {
        this.scene = scene
        this.sprite = scene.physics.add.sprite(x, y, texture)
        this.sprite.body.immovable = true
        
    }
    update(time, delta){
        // Time to Move?
        if(!this.pendingMove && this.sprite.x == this.targetX && this.sprite.y == this.targetY){
            this.pendingMove = true
            this.scene.time.delayedCall(500, this.beginMove, [], this)
        }
    }
    beginMove(){ 
       this.scene.events.emit("enemyready", this)
       this.pendingMove = false 
    }
}