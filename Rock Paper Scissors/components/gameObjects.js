const avatars = [
'ant',
'bear',
'cat',
'chic',
'cow',
'dog',
'dolphin',
'dragon',
'frog',
'hamster',
'hibiscus',
'horse',
'koala',
'lion',
'monkey',
'mouse',
'panda',
'pig',
'rabbit',
'seal',
'tiger',
'turtle',
'unicorn',
'zombie'
]

const compAvatars = [
	'8bit',
	'alien',
	'clown',
	'goblin',
	'ogre',
	'poo',
	'red robot',
	'robot',
	'skull',
]

// Data for the user, to be updated throughout gameplay and reset. 
const userPlayer = {
	id: 'user',
	name: 'Player',
	avatar: '',
	score: 0,
	currentPlay: '',
	lastPlay: '',
	lastPoint: 0,
	rockCount: 0,
	paperCount: 0,
	scissorsCount: 0,
	updatePlayerScore(points, play) {
		this.score = this.score + points;
		this.lastPoint = points;
		switch(play) {
			case 'rock': 
				this.rockCount++;
				break;
			case 'paper': 
				this.paperCount++;
				break;
			case 'scissors':
				this.scissorsCount++;
				break;
			}
		return this.score, this.rockCount, this.paperCount, this.scissorsCount;
	},
	init() {
		this.score = 0;
		this.currentPlay = '';
		this.lastPlay = '';
		this.rockCount = 0;
		this.paperCount = 0;
		this.scissorsCount = 0;
	}
}

//Computer data used during gameplay.
const compPlayer = {
	id: 'comp',
	name: 'Computer',
	avatar: 'robot',
	score: 0,
	currentPlay: '',
	lastPlay: '',
	lastPoint: 0,
	rockCount: 0,
	paperCount: 0,
	scissorsCount: 0,
	updatePlayerScore(points, play) {
		this.score = this.score + points;
		this.lastPoint = points;
		switch(play) {
			case 'rock': 
				this.rockCount++;
				break;
			case 'paper': 
				this.paperCount++;
				break;
			case 'scissors':
				this.scissorsCount++;
				break;
			}
		return this.score, this.rockCount, this.paperCount, this.scissorsCount;
	},
	init() {
		this.score = 0;
		this.currentPlay = '';
		this.lastPlay = '';
		this.rockCount = 0;
		this.paperCount = 0;
		this.scissorsCount = 0;
	}
}

const gameData = {
	round: 1,
	updateRound() {
		this.round++;
		return this.round;
	}
}

// Export for use
export { avatars, compAvatars, userPlayer, compPlayer, gameData };