class PathFindingScene extends Phaser.Scene {
    /** @type {Phaser.Tilemaps.Tilemap} */
    map
    /** @type {Player} */
    player
    /** @type  {Phaser.Physics.Arcade.Sprite} */
    gun
    /** @type {Array.<Enemy>} */
    enemies = []
    /** @type {Array.<object>} */
    enemySpawnPoints = []
    /** @type {Enemy} */
    activeEnemy
    /** @type {number} */
    minEnemies = 2
    /** @type  {Phaser.Physics.Arcade.Group} */
    bullets
    constructor() {
        super({ key: 'pathFindingScene' })
    }
    preload() {
        // Player Assets
        this.load.image("player", "assets/man.png")
        this.load.image("playerGun", "assets/man-with-gun.png")
        // Tile Assets
        this.load.image("tileset", "assets/tiles100-spacing2.png")
        this.load.tilemapTiledJSON("tilemap", "assets/tilemap.json")
        // Weapon Assets
        this.load.image("gun", "assets/gun.png")
        this.load.image("bullet", "assets/bullet.png")
    }
    create() {
        this.map = this.make.tilemap({key: "tilemap"})
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels)
        this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels)
        const tileset = this.map.addTilesetImage("tileset", "tileset")
        const groundAndWallsLayer = this.map.createLayer("groundAndWallsLayer", tileset, 0, 0)
        groundAndWallsLayer.setCollisionByProperty({valid: false})
        const objectLayer = this.map.getObjectLayer("objectLayer")
        objectLayer.objects.forEach(function(object){
            let dataObject = Utils.RetrieveCustomProperties(object)
            if(dataObject.type === "playerSpawn"){
                this.player = new Player(this, dataObject.x, dataObject.y, "player")
            }else if(dataObject.type === "gunSpawn"){
                // @ts-ignore
                this.gun = this.physics.add.sprite(dataObject.x, dataObject.y, "gun")
            }
        }, this)
        this.physics.add.collider(this.player.sprite, groundAndWallsLayer)
        this.physics.add.overlap(this.player.sprite, this.gun, this.collectGun, null, this)
        // Bullet Group
        this.bullets = this.physics.add.group({
            defaultKey: "bullet",
            maxSize: 5,
            collideWorldBounds: true
        })
        this.physics.world.on("worldbounds", this.worldBoundsBullet, this)
        this.physics.add.collider(this.bullets,groundAndWallsLayer, this.bulletHitWall, null, this)
        this.events.on("firebullet", this.fireBullet, this)
    }
    findPath(point) {
    }
    moveEnemy(path) {
    }
    onEnemySpawn() {
    }
    handleEnemyMove(enemy) {
    }
    collectGun(player, gun) {
        this.gun.destroy()
        this.player.hasGun = true
        this.player.sprite.setTexture("playerGun")
    }
    fireBullet() {
        let bullet = this.bullets.get(this.player.sprite.x, this.player.sprite.y)
        if(bullet){
            bullet.setDepth(3)
            bullet.body.collideWorldBounds = true
            bullet.body.onWorldBounds = true
            bullet.enableBody(false, bullet.x, bullet.y, true, true)
            bullet.rotation = this.player.sprite.rotation
            this.physics.velocityFromRotation(bullet.rotation, 200, bullet.body.velocity)
        }
    }
    worldBoundsBullet(body) {
        // Return bullet to Pool
        body.gameObject.disableBidy(true, true)
    }
    bulletHitWall(bullet, layer) {
        bullet.disableBody(true, true)
    }
    bulletHitEnemy(enemySprite, bullet) {
    }
    collideEnemy(player, sprite) {
    }
    update(time, delta) {
        this.player.update(time, delta)
    }
}