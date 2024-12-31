/*:
* @plugindesc Allows the creation of layered enemy health bars
* @author LMPGames
*
* @param Number of Layers
* @desc This sets the max number of layers for an enemy. There is no
* maximum limit.  See help for more info.
* @type number
* @min 0
* @default 5
*
* @param Layer Gradient Start Colors
* @desc This is a comma delimited list of string hex codes to set the
* color for each layer.  You MUST add one color for each layer.
* @type note
* @default "[\"#CC0000\", \"#CCCC00\", \"#4D9900\", \"#7CC1FF\", \"#AD8DFE\"]"
*
* @param Layer Gradient End Colors
* @desc This is a comma delimited list of string hex codes to set the
* color for each layer.  You MUST add one color for each layer.
* @type note
* @default "[\"#DB4C4C\", \"#DBDB4C\", \"#82B74C\", \"#B3D7F9\", \"#D2C0FF\"]"
*
* @param Gauge Font Size
* @desc If set, will change the font size HP gauges.
* @type number
* @min 0
* @default 18
*
* @param Gauge Height
* @desc This setting controls the thickness of the gauges.
* @type number
* @min 1
* @default 8
*
* @param Display Item Offset
* @desc The number of pixes to move certain battle screen items down so that
* the do not overlap with HP  gauges.  (log window only for now)  See Help.
* @type number
* @min 0
* @default 10
*
*  @param Only Show Gauges On Note Tag
*  @desc When enabled, allows you to curate which enemies will generate an
*  HP gauge in battle through their note tags. See help for more info.
*  @type boolean
*  @default false
*
* @param HP Display Mode
* @desc Sets which display mode is used for HP in the Gauge.  See help
* for what each option does.
* @type number
* @min 1
* @max 4
* @default 1
*
* @help
* Please visit https://github.com/Geowil/LayeredHPGauges
* for full installation, help, and usage text.
 */

/*
	TODOs: Allow custom fonts w/ YEP plugin integration
*/

//let LMPGames = LMPGames || [];

//Object Definitions
function Window_EnemyHPGauge() { this.initialize.apply(this, arguments); }

//Params
let lmpHpGaugeParams = PluginManager.parameters('LMPGames_LayeredHPGauges');
let numOfLayers = parseInt(lmpHpGaugeParams['Number of Layers']);
let gaugeStartColors = JSON.parse(JSON.parse(lmpHpGaugeParams['Layer Gradient Start Colors']));
let gaugeEndColors = JSON.parse(JSON.parse(lmpHpGaugeParams['Layer Gradient End Colors']));
let gaugeFontSize = parseInt(lmpHpGaugeParams['Gauge Font Size']);
let bShowOnNoteTag = (lmpHpGaugeParams['Only Show Gauges On Note Tag'] === "true");
let screenObjOffset = parseInt(lmpHpGaugeParams['Display Item Offset']);
let hpGaugeHeight = parseInt(lmpHpGaugeParams['Gauge Height']);
let hpDispMode = parseInt(lmpHpGaugeParams['HP Display Mode']);


//Database_Manager Functions
var lmpGamesHPGaugeLayersDataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function(){
	if (lmpGamesHPGaugeLayersDataManager_isDatabaseLoaded.call(this)) {
		this.loadMobTags();
		return true;
	} else { return false; }
}

DataManager.loadMobTags = function(){
	for (let mob of $dataEnemies){
		if (mob && mob.note != undefined && mob.note != null && mob.note.length > 0){
			let tagStart = "<LMPHPGauges>";
			let tagEnd = "</LMPHPGauges>";
			let bIsPluginTag = false;
			let bFoundNoteTag = false;

			let noteData = mob.note.split(/[\r\n]+/);
			for (let line of noteData){
				if (line === tagStart) {
					bIsPluginTag = true;
					bFoundNoteTag = true;
				}
				else if (line === tagEnd) { bIsPluginTab = false; }

				if (bIsPluginTag){
					switch (line){
						case tagStart:
						case tagEnd:
							break;

						default:
							let data = line.split(":");
							if (data[0] == "Layers"){
								mob.layers = parseInt(data[1]);
							} else if (data[0] == "ShowLayers"){
								mob.showLayers = true;
							}
							break;
					}
				}
			}

			if (!bFoundNoteTag){
				mob.layers = 0;
				mob.showLayers = false;
			}
		} else if (mob){
			mob.layers = 0;
			mob.showLayers = false;
		}
	}
}

//Game_Battler Functions
let lmpGamesHPGaugeLayersBattler_Refresh = Game_Battler.prototype.refresh;
Game_Battler.prototype.refresh = function () {
	lmpGamesHPGaugeLayersBattler_Refresh.apply(this, arguments);
	if (this.isEnemy()) {
		this.refreshHpLayers = true;
	}
};


//Game_Enemy Functions
let lmpGamesHPGaugeLayersGameEnemy_Setup = Game_Enemy.prototype.setup;
Game_Enemy.prototype.setup = function(enemyId, x, y){
	lmpGamesHPGaugeLayersGameEnemy_Setup.apply(this, arguments);
	this.layers = $dataEnemies.find(e => e && e.id == this._enemyId).layers;
	this.showLayers = $dataEnemies.find(e => e && e.id == this._enemyId).showLayers;
}

Game_Enemy.prototype.currentGaugeLayer = function(){
	let layers = this.layers;
	if (layers <= 1) { return layers; }

	let mHp = this.mhp;
	let curHp = this.hp;
	let hpPerLayer = mHp / layers;
	let numOfLayers = layers;

	while (numOfLayers > 0){
		mHp = Math.round(mHp - hpPerLayer);
		if (curHp >= mHp) { return numOfLayers; }
		numOfLayers -= 1;
	}

	return 1;
}

Game_Enemy.prototype.currentGaugeLayerRate = function() {
	let layers = this.layers;
	let mHp = this.mhp;
	let curHp = this.hp;
	let hpPerLayer = mHp / layers;
	let numOfLayers = layers;

	while (numOfLayers > 0){
		mHp = Math.round(mHp - hpPerLayer);
		if (curHp >= mHp) { return (curHp - mHp) / hpPerLayer; }
		numOfLayers -= 1;
	}

	return 0;
}

let lmpGamesHPGaugeLayersSceneBattle_createDispObj = Scene_Battle.prototype.createDisplayObjects;
Scene_Battle.prototype.createDisplayObjects = function() {
	lmpGamesHPGaugeLayersSceneBattle_createDispObj.apply(this, arguments);
	this.offsetBattleUIElements();
}

Scene_Battle.prototype.offsetBattleUIElements = function(){
	if (this._logWindow){
		this._logWindow.y += this._layeredGaugeWnd.height + screenObjOffset;
	}
}

let lmpGamesHPGaugeLayersSceneBattle_createSpriteset = Scene_Battle.prototype.createSpriteset;
Scene_Battle.prototype.createSpriteset = function(){
	lmpGamesHPGaugeLayersSceneBattle_createSpriteset.apply(this, arguments);
	this.createEnemyGaugeWindow();
}

Scene_Battle.prototype.createEnemyGaugeWindow = function(){
	let rect = this.enemyGaugeWindowRect();
	this._layeredGaugeWnd = new Window_EnemyHPGauge(rect);
	this.addChild(this._layeredGaugeWnd);
}

Scene_Battle.prototype.enemyGaugeWindowRect = function() {
	let x = 0;
	let y = 0;
	let width = Graphics.width;
	let heightMulti = ($gameTroop.members().length > 4 ? 2 : 1);
	let height = hpGaugeHeight + Window_Base.prototype.lineHeight.call(this) * heightMulti;

	return new Rectangle(x, y, width, height);
}

Window_Base.prototype.getLayerStartColor = function(layerNum){ return (layerNum >= 0 ? gaugeStartColors[layerNum] : this.gaugeBackColor()); }
Window_Base.prototype.getLayerEndColor = function(layerNum){ return (layerNum >= 0 ? gaugeEndColors[layerNum] : this.gaugeBackColor()); }


//Window_EnemyHPGauge Functions
Window_EnemyHPGauge.prototype = Object.create(Window_Base.prototype);
Window_EnemyHPGauge.prototype.constructor = Window_EnemyHPGauge;

Window_EnemyHPGauge.prototype.initialize = function(gaugeRect){
	Window_Base.prototype.initialize.call(this, gaugeRect.x, gaugeRect.y, gaugeRect.width, gaugeRect.height);
	this.setBackgroundType(2);
	this.refresh();
}

Window_EnemyHPGauge.prototype.standardPadding = function() { return 4; }
Window_EnemyHPGauge.prototype.drawActorIcons = function(actor, x, y, width){
	Window_statusBase.prototype.drawActorIcons.apply(this, arguments);
}

Window_EnemyHPGauge.prototype.enemyMembers = function() {
	return $gameTroop.members().filter(e => e.isAppeared && (bShowOnNoteTag ? e.showLayers : true));
}

Window_EnemyHPGauge.prototype.update = function(){
	Window_Base.prototype.update.call(this);
	this.checkRefresh();
}

Window_EnemyHPGauge.prototype.checkRefresh = function(){
	let bRefresh = false;
	for (let e of this.enemyMembers()){
		if (e.refreshHpLayers){
			bRefresh = true;
			e.refreshHpLayers = false;
		}
	}

	if (bRefresh){
		this.refresh();
	}
}

Window_EnemyHPGauge.prototype.refresh = function() {
	this.contents.clear();

	let gaugeRect = this.dataRect();
	for (let e of this.enemyMembers()){
		if (e !== undefined && e !== null){
			this.drawEnemyData(e, gaugeRect);
		}
	}
}

Window_EnemyHPGauge.prototype.dataRect = function(){
	let x = 0;
	let y = 0;
	let width = Math.floor(this.contents.width/Math.min(4, this.enemyMembers().length));
	let height = this.lineHeight() + hpGaugeHeight;

	return new Rectangle(x, y, width, height);
}

Window_EnemyHPGauge.prototype.drawEnemyData = function(enemy, rect){
	let enemyIdx = enemy.index();
	rect.x = rect.width * (enemyIdx % 4);
	rect.y = this.lineHeight() * (enemyIdx >= 4 ? 1 : 0);

	this.drawEnemyHpGauge(enemy, rect);
	if (hpDispMode != 4){
		this.drawEnemyHpRate(enemy, rect);
	}

	this.drawEnemyName(enemy, rect);
}

Window_EnemyHPGauge.prototype.drawEnemyHpGauge = function(enemy, rect){
	let x  = rect.x + 1;
	let y = rect.y + 4;
	let width = rect.width - 2;
	let height = rect.height - 8;

	this.contents.fillRect(x, y, width, height, this.gaugeBackColor());

	let layerNum = enemy.currentGaugeLayer();
	let nextGaugeColorA = this.getLayerStartColor(layerNum - 2);
	let nextGaugeColorB = this.getLayerEndColor(layerNum - 2);
	let curGaugeColorA = this.getLayerStartColor(layerNum - 1);
	let curGaugeColorB = this.getLayerEndColor(layerNum - 1);
	let gaugeFillRate = Math.round(width - 2) * enemy.currentGaugeLayerRate();

	this.contents.gradientFillRect(x + 1, y + 1, width - 2, height - 2, nextGaugeColorA, nextGaugeColorB);
	this.contents.fillRect(x + 1 + gaugeFillRate, y, 1, height, this.gaugeBackColor());
	this.contents.gradientFillRect(x + 1, y + 1, gaugeFillRate, height - 2, curGaugeColorA, curGaugeColorB);
}

Window_EnemyHPGauge.prototype.drawEnemyHpRate = function(enemy, rect){
	this.resetFontSettings();
	this.contents.fontSize = gaugeFontSize;
	let x = rect.x + 8;
	let y = rect.y + (hpGaugeHeight/2);
	let width = rect.width - 16;
	let hpRate = (enemy.hpRate() * 100).toFixed(2) + '%';
	let curHp = String(enemy.hp);
	let maxHp = String(enemy.mhp);

	let hpLabel = "";

	if (hpDispMode == 1){
		hpLabel = hpRate;
	} else if (hpDispMode == 2){
		hpLabel = curHp + " (" + hpRate + ")";
	} else {
		hpLabel = hpRate + " (" + curHp + "/" + maxHp + ")";
	}

	this.drawText(hpLabel, x, y, width, 'right');
}

Window_EnemyHPGauge.prototype.drawEnemyName = function(enemy, rect){
	this.resetFontSettings();
	this.contents.fontSize = gaugeFontSize;
	let x = rect.x + 8;
	let y = rect.y + (hpGaugeHeight/2);
	let width = rect.width - 16;

	this.drawText(enemy.name(), x, y, width, (hpDispMode == 4 ? 'center' : 'left'));
}
