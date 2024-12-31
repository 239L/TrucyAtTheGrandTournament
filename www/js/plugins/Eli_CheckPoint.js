//============================================================================
// Eli_CheckPoint.js
//============================================================================

/*:
@plugindesc ♦5.0.2♦ Check point system(autosave/load).
@author Hakuen Studio

@help
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
• Rate the plugin! Please, is very important to me ^^
https://hakuenstudio.itch.io/eli-checkpoint-rpg-maker-mv/rate?source=game

• Terms of Use
https://www.hakuenstudio.com/terms-of-use-5-0-0
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
==============================================================================
Requirements
==============================================================================

Need Eli Book.
Order After Eli Book.

==============================================================================
Features
==============================================================================

● Autosave / autoload
● Autoload option after game over
● Run a common event after autoload
● It is not possible to save manually in the auto slot

==============================================================================
How to use
==============================================================================

https://docs.google.com/document/d/1bJvw7uHQE67lDn55qnOsGn2Kk3Odymi_6xA7aYA7qns/edit?usp=sharing

==============================================================================

@param autoSlotName
@text AutoSave slot name
@type text
@desc Choose a name for the auto save slot
@default AutoSave

@param autoSaveHelp
@text Scene_Save - Help Text
@type text
@desc Choose a description for the autosave slot in Scene_Save.
@default You can't overwrite an autosave file.

@param autoLoadHelp
@text Scene_Load - Help Text
@type text
@desc Choose a description for the autosave slot in Scene_Load.
@default Continue from your autosave.

@param autoCommonEvent
@text Auto Load Common Event
@type common_event
@desc Choose a common event to play when the autosave file gets loaded.
@default 0

@param autoLoadInGameOver
@text AutoLoad in GameOver
@type boolean
@desc Choose if you want to load the game when the game is over.
@default true

*/

"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_CheckPoint = true

/* ========================================================================== */
/*                                   PLUGIN                                   */
/* ========================================================================== */
{
Eli.Utils = {
scene() {
return SceneManager._scene;
},
isScene(sceneConstructor) {
return this.scene() instanceof sceneConstructor;
}
};
Eli.CheckPoint = {

    version: 5.02,
    url: "https://hakuenstudio.itch.io/eli-checkpoint-rpg-maker-mv",
    alias: {},
    parameters: {
        autoSlotName: "",
        autoSaveHelp: "",
        autoLoadHelp: "",
        autoCommonEvent: 0,
        autoLoadInGameOver: false,
    },

    initialize(){
        this.initParameters()
        this.initPluginCommands()
    },

    initParameters(){
        const parameters = PluginManager.parameters("Eli_CheckPoint")
        this.parameters.autoLoadHelp = parameters.autoLoadHelp
        this.parameters.autoSlotName = parameters.autoSlotName
        this.parameters.autoSaveHelp = parameters.autoSaveHelp
        this.parameters.autoCommonEvent = Number(parameters.autoCommonEvent)
        this.parameters.autoLoadInGameOver = parameters.autoLoadInGameOver === "true"
    },

    initPluginCommands(){},

    param(){
        return this.parameters
    },

    load() {
        if(DataManager.loadGame(1)) {
            SoundManager.playLoad()
            SceneManager._scene.fadeOutAll()
            $gamePlayer.reserveTransfer($gameMap.mapId(), $gamePlayer.x, $gamePlayer.y)
            $gamePlayer.requestMapReload()
            SceneManager.goto(Scene_Map)
            $gameSystem.onAfterLoad()
        }
    },

    save() {
        $gameSystem.onBeforeSave()

        if(DataManager.saveGame(1)) {
            StorageManager.cleanBackup(1)

            if(Imported.Eli_CheckPointWindow){
                SceneManager._scene.savePointWindow.showWithAnimation()
                SceneManager._scene.loadPointWindow.showWithAnimation()
                $eliData.contents.checkPointWindow.isLoading = false
            }
        }
    },

    checkAfterLoad(){  
        this.loadCommonEvent()

        if(Imported.Eli_CheckPointWindow){
            $eliData.contents.checkPointWindow.isLoading = true
        }
    },

    loadCommonEvent() {
        if(DataManager.lastAccessedSavefileId() === 1){
            $gameTemp.reserveCommonEvent(this.param().autoCommonEvent)
        }
    },

    executePluginCommandMV(command, args){
        const allCommands = {
            AUTOSAVE: 'save',
            AUTOLOAD: 'load',
        }
        const cmd = allCommands[command.toUpperCase()]
        if(this[cmd]) {
            this[cmd](args)
        }
    },

}

const Plugin = Eli.CheckPoint
const Alias = Eli.CheckPoint.alias
window.$checkPoint = Eli.CheckPoint

Plugin.initialize()

/* ------------------------------- GAME SYSTEM ------------------------------ */
{

Alias.Game_System_onAfterLoad = Game_System.prototype.onAfterLoad
Game_System.prototype.onAfterLoad = function() {
    Alias.Game_System_onAfterLoad.call(this)

    if(DataManager.lastAccessedSavefileId() === 1) {
        Plugin.checkAfterLoad()
    }
}

}

/* ---------------------------- GAME INTERPRETER ---------------------------- */
{

Alias.Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function (command, args) {
    Alias.Game_Interpreter_pluginCommand.call(this, command, args)
    Plugin.executePluginCommandMV(command, args)
}

}

/* ------------------------------- SCENE FILE ------------------------------- */
{

Alias.Scene_File_createListWindow = Scene_File.prototype.createListWindow;
Scene_File.prototype.createListWindow = function() {
    Alias.Scene_File_createListWindow.call(this)
    this._listWindow.setHelpWindow(this._helpWindow)
}

}

/* ----------------------------- SCENE GAME OVER ---------------------------- */
{

Alias.Scene_Gameover_gotoTitle = Scene_Gameover.prototype.gotoTitle;
Scene_Gameover.prototype.gotoTitle = function() {
    if(Plugin.param().autoLoadInGameOver) {
        Plugin.load()
    }else{
        Alias.Scene_Gameover_gotoTitle.call(this)
    }
}

}

/* ---------------------------- WINDOW SAVE LIST ---------------------------- */
{

Alias.Window_SavefileList_drawFileId = Window_SavefileList.prototype.drawFileId;
Window_SavefileList.prototype.drawFileId = function(id, x, y) {
    if (id === 1){
        this.drawText(Plugin.param().autoSlotName, x, y, 180)
    } else {
        Alias.Window_SavefileList_drawFileId.call(this, id, x, y)
    }
}

Alias.Window_SavefileList_drawItem = Window_SavefileList.prototype.drawItem
Window_SavefileList.prototype.drawItem = function(index) {
    Alias.Window_SavefileList_drawItem.call(this, index)
    this.changeAutoSlotOpacity(index)
}

Alias.Window_SavefileList_isCurrentItemEnabled = Window_SavefileList.prototype.isCurrentItemEnabled
Window_SavefileList.prototype.isCurrentItemEnabled = function() {
    return this.itemIsAutoSlot() ? false : Alias.Window_SavefileList_isCurrentItemEnabled.call(this)
}

Alias.Window_SavefileList_updateHelp = Window_SavefileList.prototype.updateHelp;
Window_SavefileList.prototype.updateHelp = function(){
    Alias.Window_SavefileList_updateHelp.call(this)
    this.updateSaveHelp()
    this.updateLoadHelp()
}

Window_SavefileList.prototype.changeAutoSlotOpacity = function(index){
    if(DataManager.isThisGameFile(1) && Eli.Utils.isScene(Scene_Save)){
        const id = index + 1
        const valid = DataManager.isThisGameFile(id-1)
        const info = DataManager.loadSavefileInfo(id)
        const rect = this.itemRectForText(index)

        if (info) {
            this.changePaintOpacity(valid)
            if(!Imported.YEP_SaveCore) this.drawContents(info, rect, valid)
            this.changePaintOpacity(true)
        }
    }
}

Window_SavefileList.prototype.itemIsAutoSlot = function(){
    return Eli.Utils.isScene(Scene_Save) && !Eli.Utils.scene()._listWindow._index
}

Window_SavefileList.prototype.updateSaveHelp = function(){
    const help = Eli.Utils.scene()._helpWindow
    const index = Eli.Utils.scene()._listWindow._index

    if(Eli.Utils.isScene(Scene_Save)){
        help.setText(!index ? Plugin.param().autoSaveHelp : TextManager.saveMessage)
    }
}

Window_SavefileList.prototype.updateLoadHelp = function(){
    const help = Eli.Utils.scene()._helpWindow
    const index = Eli.Utils.scene()._listWindow._index

    if(Eli.Utils.isScene(Scene_Load)){
        help.setText(!index ? Plugin.param().autoLoadHelp : TextManager.loadMessage)
    }
}

}

}