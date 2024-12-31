//========================================================================================
//=== TSR_SmartTitle === A Plugin by The Northern Frog ===================================
//========================================================================================

var TSR = TSR || {};
TSR.smTitle = TSR.smTitle || {};
TSR.smTitle.version = 2.01;
TSR.smTitle.pluginName = 'TSR_SmartTitle';
var Imported = Imported || {};
Imported[TSR.smTitle.pluginName] = true;

//========================================================================================

/*:
 * @target MZ
 * @plugindesc v2.0.1 Change the title screen music and backgrounds 
 * 
 * @author TSR, The Northern Frog, 2022      
 * @help 
 * =========================================================================================
 * == About this Plugin ====================================================================
 * =========================================================================================
 * Use plugin commands to change the title screen music and
 * backgrounds during the game.
 * 
 * The title screen will play the music and display the
 * backgrounds of the last saved file game.
 * 
 * By default, or if there's no existing saved file, the music
 * and backgrounds will refer the the data base settings.
 * 
 * 
 * Plugin commands
 * ============================================================
 * 
 * Change Title Music
 * ==================
 * Use the 'Change Title Music' plugin command whenever you want to
 * change the title screen music from in game.
 * 
 * The command arguments are the basic BGM object properties:
 * 
 *          -name:   the name of the bgm file stored in audio/bgm folder
 *          -volume: the volume of the title screen music
 *          -pitch:  the pitch of the title music
 *          -pan:    the pan of the title music
 * 
 * 
 * In MV, use the command as such:
 * 
 *          titlemusic name volume pitch pan 
 * 
 *              Example: titlemusic Theme4 100 100 0 
 * 
 * 
 * Change Title Background 1 and 2
 * ===============================
 * Set the name of the background image stored in the 
 * img/titles1 or titles2 folders.
 * 
 *    MV syntax:
 * 
 *        titlebg1 name
 * 
 *          Example: titlebg2 Floral
 * 
 * 
 * 
 * Script Calls
 * ============
 * The script calls equivalent of the above.
 * 
 *      $gameSystem.setTitleMusic({sound object})
 * 
 *      $gameSystem.setTitleBg1(fileName)
 * 
 *      $gameSystem.setTitleBg2(fileName)
 * 
 * 
 *   Example:
 * 
 *      $gameSystem.setTitleMusic(
 *         {name: 'Theme4', volume: 100, pitch: 100, pan: 0}
 *      );
 *      $gameSystem.setTitleBg1('Ruins');
 *      $gameSystem.setTitleBg2('Medieval');
 * 
 * 
 * 
 * 
 * =======================================================================================
 * == Term of Usage ======================================================================
 * =======================================================================================
 * 
 * Use in any independant RPG Maker MZ or MV projects, including commercials.
 *
 * Credit is required for using this Plugin. 
 * For crediting, use 'TSR' along with one of
 * the following terms: 
 *      'The Northern Frog' or 'A frog from the north'
 * 
 * Do not change the Header or the Terms of usage.
 * 
 * Editing of the code is allowed for your personal use.
 *
 * DO NOT REDISTRIBUTE!
 * If you want to share it, share the link to my itch.io account: 
 * https://the-northern-frog.itch.io/
 * 
 *
 * =======================================================================================
 * == Version and compatibility ==========================================================
 * =======================================================================================
 * 16/04/2022 completed plugin as 'TSR_TitleMusic',          v1.0.0
 * 17/04/2022 code revamp and change to 'TSR_SmartTitle',    v2.0.1
 *
 * =======================================================================================
 * == END ================================================================================                                             
 * =======================================================================================
 *
 *                              "Have fun!"
 *                                                  TSR, The Northern Frog
 *
 * =======================================================================================
 *
 * @command titlemusic
 * @text Title Music
 * @desc Change the current title music
 *
 * @arg name
 * @default
 * @text BGM name
 * @desc Enter the name of the music stored in audio/bgm folder.
 * 
 * @arg volume
 * @type number
 * @min 0
 * @max 100
 * @default 100
 * @text Volume
 * @desc Set the volume of the title music.
 * 
 * 
 * @arg pitch
 * @type number
 * @min 50
 * @max 150
 * @default 100
 * @text Pitch
 * @desc Set the pitch of the title music.
 * 
 * @arg pan
 * @type number
 * @min 0
 * @max 100
 * @default 0
 * @text Pan
 * @desc Set the pan of the title music.
 * 
 * 
 * @command titlebg1
 * @text Title Screen Background 1
 * @desc Change the current title screen Background 1
 *
 * @arg name
 * @default
 * @text Background 1 name
 * @desc Enter the name of the image in img/titles1 folder.
 * 
 * 
 * @command titlebg2
 * @text Title Screen Background 2
 * @desc Change the current title screen Background 2
 *
 * @arg name
 * @default
 * @text Background 2 name
 * @desc Enter the name of the image in img/titles2 folder.
 * 
 * 
 */


//== PARAMETERS ============================================================================

TSR.Parameters = PluginManager.parameters(TSR.smTitle.pluginName);


//=== PluginManager ===

if (PluginManager._commands) { /// MZ
    PluginManager.registerCommand(TSR.smTitle.pluginName, 'titlemusic', args => {
        const name = String(args.name);
        const volume = Number(args.volume);
        const pitch = Number(args.pitch);
        const pan = Number(args.pan);
        const bgm = {name: name, volume: volume, pitch: pitch, pan: pan};
        $gameSystem.setTitleMusic(bgm);
    });
    PluginManager.registerCommand(TSR.smTitle.pluginName, 'titlebg1', args => {
        const name = String(args.name);
        $gameSystem.setTitleBg1(name);
    });
    PluginManager.registerCommand(TSR.smTitle.pluginName, 'titlebg2', args => {
        const name = String(args.name);
        $gameSystem.setTitleBg2(name);
    });
} else {  ///MV
    TSR.smTitle._Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        TSR.smTitle._Game_Interpreter_pluginCommand.call(this, command, args)
        const name = String(args[0]).trim();
        const volume = parseInt(args[1]);
        const pitch = parseInt(args[2]);
        const pan = parseInt(args[3]);
        if (command === 'titlemusic') {
            const bgm = {name: name, volume: volume, pitch: pitch, pan: pan};
            $gameSystem.setTitleMusic(bgm);
        } 
        if (command === 'titlebg1') {
            $gameSystem.setTitleBg1(name);
        }
        if (command === 'titlebg2') {
            $gameSystem.setTitleBg2(name);
        }
    };
}


//=== DataManager ===

TSR.smTitle._DataManager_makeSavefileInfo = 
DataManager.makeSavefileInfo;
DataManager.makeSavefileInfo = function() {
    const info = TSR.smTitle._DataManager_makeSavefileInfo.call(this);
    info.titleBg1 = $gameSystem.titleBg1();
    info.titleBg2 = $gameSystem.titleBg2();
    info.titleMusic = $gameSystem.titleMusic();
    return info;
};

DataManager.saveInfoMethod = function() {
    return Utils.RPGMAKER_NAME === 'MV' ? 'loadSavefileInfo' : 'savefileInfo';
};


//=== Game_System ===

TSR.smTitle._Game_System_init = 
Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    TSR.smTitle._Game_System_init.call(this);
    this._titleMusic = $dataSystem.titleBgm;
    this._titleBg1 = $dataSystem.title1Name;
    this._titleBg2 = $dataSystem.title2Name
};

Game_System.prototype.titleBg1 = function() {
    return this._titleBg1;
};

Game_System.prototype.setTitleBg1 = function(name) {
    this._titleBg1 = name;
};

Game_System.prototype.titleBg2 = function() {
    return this._titleBg2;
};

Game_System.prototype.setTitleBg2 = function(name) {
    this._titleBg2 = name;
};

Game_System.prototype.titleMusic = function() {
    return this._titleMusic;
};

Game_System.prototype.setTitleMusic = function(bgm) {
    this._titleMusic = bgm;
};


//=== Scene_Title ===

    TSR.smTitle._createBackground = Scene_Title.prototype.createBackground;
    Scene_Title.prototype.createBackground = function() {
        TSR.smTitle._createBackground.call(this);
        let titleBg1 = $dataSystem.title1Name;
        let titleBg2 = $dataSystem.title2Name;
        if (DataManager.isAnySavefileExists()) {
            const id = DataManager.latestSavefileId();
            const info = DataManager[DataManager.saveInfoMethod()](id);
            titleBg1 = info.titleBg1 || $dataSystem.title1Name;
            titleBg2 = info.titleBg2 || $dataSystem.title2Name;
        }
        this._backSprite1 = new Sprite(
            ImageManager.loadTitle1(titleBg1)
        );
        this._backSprite2 = new Sprite(
            ImageManager.loadTitle2(titleBg2)
        );
        this.addChild(this._backSprite1);
        this.addChild(this._backSprite2);
    };

Scene_Title.prototype.playTitleMusic = function() {
    if (!DataManager.isAnySavefileExists()) {
        AudioManager.playBgm($dataSystem.titleBgm);
    } else {
        const id = DataManager.latestSavefileId();
        const info = DataManager[DataManager.saveInfoMethod()](id);
        const music = info.titleMusic || $dataSystem.titleBgm;
        AudioManager.playBgm(music);
    }
    AudioManager.stopBgs();
    AudioManager.stopMe();
};


//==== END ======================================================================
//===============================================================================