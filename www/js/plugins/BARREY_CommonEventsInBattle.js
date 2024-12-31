//=============================================================================
// Parallel Common Events in Battle
// by Barreytor
// Date: 13/09/2016  
// License: Free for commercial use, but credit me
//=============================================================================
 

/*:
 * @plugindesc It makes the battle scene load up the parallel process common events.
 * @author Barreytor
 *
 */
		   
(function() {
  var parameters = PluginManager.parameters('BARREY_CommonEventsInBattle');

  var _Scene_Battle_CE_Create = Scene_Battle.prototype.create;

  Scene_Battle.prototype.create = function() { 
    _Scene_Battle_CE_Create.call(this);
    this._commonEvents = [];
  }
  
  var _Scene_Battle_CE_Start = Scene_Battle.prototype.start;

  Scene_Battle.prototype.start = function() { 
    _Scene_Battle_CE_Start.call(this);
    this._commonEvents = this.parallelCommonEvents().map(function(commonEvent) {
        return new Game_CommonEvent(commonEvent.id);
    });
  }
  
  Scene_Battle.prototype.parallelCommonEvents = function() {
	    return $dataCommonEvents.filter(function(commonEvent) {
	        return commonEvent && commonEvent.trigger === 2;
	    });
	};
  
  var _Scene_Battle_CE_Update = Scene_Battle.prototype.update;

  Scene_Battle.prototype.update = function() { 
    this.updateEvents();
    _Scene_Battle_CE_Update.call(this);
  }
  
  Scene_Battle.prototype.updateEvents = function() {
	    this._commonEvents.forEach(function(event) {
	        event.refresh();
	        event.update();
	    });
	};
  
  
  })();