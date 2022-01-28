class Bar {
	// Source Code: https://github.com/stupidzombie/Phaser-3-UI/blob/master/progressbar/progressbar.js
    /**
	 * Create a Progress Bar
	 * @param {Phaser.Scene} game 
	 * @param {Number} x 
	 * @param {Number} y 
	 * @param {Number} width 
	 * @param {Number} height 
	 * @param {Number} maxValue 
	 * @param {string} borderColor Must be of the format '0x123123'
	 * @param {string} barColor Must be of the format '0x123123'
	 */
	constructor(game, x, y, width, height, maxValue, borderColor, barColor) {
		this.game = game
		this.textX = x
		this.textY = y
		this.x = x - width / 2
		this.y = y - height / 2
		this.height = height
		this.width = width
		this.maxValue = maxValue
		this.borderColor = borderColor
		this.barColor = barColor
		this.borderBar = game.add.graphics().setDepth(10)
		// @ts-ignore
        this.borderBar.fillStyle(borderColor, 1)
		this.borderBar.fillRoundedRect(this.x, this.y, width, height, height / 4)
		this.bar = game.add.graphics().setDepth(10)
	}
	/**
	 * Set max value for progress bar
	 * @param {Number} maxValue 
	 */
	setMaximumValue(maxValue) {
		this.maxValue = maxValue
		this.setValue(this.value)
	}
	/**
	 * Set the value of the progress bar
	 * @param {Number} value 
	 */
	setValue(value) {
		this.value = value
		const adjustment = this.height * 0.05
		const maxWidth = this.width - 2 * adjustment
		const maxHeight = this.height - 2 * adjustment
		const displayWidth = maxWidth * value / this.maxValue
		const x = this.x + adjustment
		const y = this.y + adjustment
		this.bar.clear()
		// @ts-ignore
        this.bar.fillStyle(this.barColor, 1)
		this.bar.fillRoundedRect(x, y, displayWidth, maxHeight, maxHeight / 4)
	}
}
