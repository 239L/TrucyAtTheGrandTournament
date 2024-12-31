/*:
 * @author MrEgg
 * @plugindesc AfterSkillSelection Description
 *
 *
 *
 *@help
 *
 *
 *
 *@param Skill Ids
 *@type String
 *@desc -1 equals to no skill. Put ids split by comma, e.g.:1,2,3,4
 *@min -1
 *@default -1
 *
 *@param CheckForSkill
 *@type Number
 *@desc If you don't need the plugin to check for anything, put 0, otherwise put 1
 *@default 1
 *
 *@param IsItemRemoved
 *@type String
 *@desc 1 - yes, 0 - no, Put booleans split by comma, e.g.:1,0,0,1
 *@default 0
 *
 *@param IsItemAdded
 *@type String
 *@desc 1 - yes, 0 - no, Put booleans split by comma, e.g.:1,0,0,1
 *@default 0
 *
 *@param ItemType
 *@type String
 *@desc 0 - item, 1 - weapon, 2 - armor, 3 - skill, 4 - actor
 *@default 0
 *
 *@param ItemIds
 *@type String
 *@desc -1 equals none, Put ids split by comma, e.g.:1,2,3,4
 *@default -1
 *
 *@param Amount
 *@type String
 *@desc Put amount for each item split by comma, e.g.:1,2,3,4
 *@default 1
 *
 *@param IncludeEquip
 *@type String
 *@desc 0 - no, 1 - yes, Put booleans split by comma, e.g.:1,0,0,1
 *@default 0
 *
 *@param SavedSkillId
 *@type Number
 *@desc Type the Id of the Game Variable that you want to store the last used skill Id in
 *@min -1
 *@default -1
 *
 *@param SavedActor
 *@type Number
 *@desc Type the Id of the Game Variable that you want to store the last actor Id in.
 *@min -1
 *@default -1
 *
 *@param ForgetSkills
 *@type String
 *@desc -1 equals none, Put booleans split by comma, e.g.:1,0,0,0
 *@min 0 
 *@max 1
 *@default -1
 *
 *@param ChangeHP
 *@type Number
 *@desc Will actor lose/gain HP on skill selection, 0 - no, 1 - yes
 *@min 0
 *@max 1
 *
 *@param HPAmount
 *@type Number
 *@desc The amount of HP to lose/gain
 *
 *
 *@param ActorHP
 *@type Number
 *@desc Actor to lose/gain HP
 *@min 1
 
*/


	var Imported = Imported || {};
    Imported.ConsumeItemAfterSkillSelection = true;

	var EGGS = EGGS || {};
	EGGS.ASS = EGGS.ASS || {};

	EGGS.Parameters = PluginManager.parameters('AfterSkillSelection');
	
	EGGS.Param = EGGS.Param || {};

	EGGS.Param.Skill_Ids = String(EGGS.Parameters['Skill Ids']);
	EGGS.Param.CheckForSkill=Number(EGGS.Parameters['CheckForSkill']);
	EGGS.Param.IsItemRemoved=String(EGGS.Parameters['IsItemRemoved']);
	EGGS.Param.IsItemAdded=String(EGGS.Parameters['IsItemAdded']);
	EGGS.Param.ItemType=String(EGGS.Parameters['ItemType']);
	EGGS.Param.Amount=String(EGGS.Parameters['Amount']);
	EGGS.Param.IncludeEquip=String(EGGS.Parameters['IncludeEquip']);
	EGGS.Param.SavedSkillId=Number(EGGS.Parameters['SavedSkillId']);
	EGGS.Param.SavedActor=Number(EGGS.Parameters['SavedActor']);
	EGGS.Param.ItemIds=String(EGGS.Parameters['ItemIds']);
	EGGS.Param.ForgetSkills=String(EGGS.Parameters['ForgetSkills']);
	EGGS.Param.ChangeHP=Number(EGGS.Parameters['ChangeHP']);
	EGGS.Param.HPAmount=Number(EGGS.Parameters['HPAmount']);
	EGGS.Param.ActorHP=Number(EGGS.Parameters['ActorHP']);
	
	EGGS.ASS.ActorDead=false;
	EGGS.ASS.SavedActor=0;
	console.log(EGGS.Param.Skill_Ids.split(","));


function checkSkill(){
	return EGGS.Param.CheckForSkill;
}



EGGS.ASS.onSkillOk=Scene_Battle.prototype.onSkillOk;
Scene_Battle.prototype.onSkillOk = function() {
     if(EGGS.Param.ChangeHP&&BattleManager.actor().actorId()==EGGS.Param.ActorHP){
		EGGS.ASS.SavedActor=BattleManager.actor().actorId();
		if(EGGS.Param.HPAmount<=0&&EGGS.ASS.SavedActor==EGGS.Param.ActorHP){SoundManager.playEnemyDamage();}else{SoundManager.playUseSkill();}
		if(EGGS.Param.HPAmount<0&&BattleManager.actor().hp+EGGS.Param.HPAmount<=0){EGGS.ASS.ActorDead=true;}
			else{BattleManager.actor().gainHp(EGGS.Param.HPAmount); 
		console.log(BattleManager.actor().actorId());EGGS.ASS.ActorDead=false;}
		
		
	}
    EGGS.ASS.onSkillOk.call(this);
	if(checkSkill()){
		if(BattleManager.actor()){
			console.log(BattleManager.actor().lastBattleSkill()); 
			skillRush(BattleManager.actor().lastBattleSkill().id,BattleManager.actor());
			setSkill();
			setActor();
			
		}
	}
	if(EGGS.ASS.ActorDead&&EGGS.Param.ChangeHP&&BattleManager.actor().actorId()==EGGS.Param.ActorHP){
		BattleManager.actor().gainHp(EGGS.Param.HPAmount); 
		SoundManager.playEnemyCollapse();
	}
	
};



Scene_Battle.prototype.onActorOk = function() {
	
    var action = BattleManager.inputtingAction();
	if(!EGGS.ASS.ActorDead){
    action.setTarget(this._actorWindow.index());} 
    this._actorWindow.hide();
    this._skillWindow.hide();
    this._itemWindow.hide();
    this.selectNextCommand();
	
	
};

Scene_Battle.prototype.onEnemyOk = function() {
	
    var action = BattleManager.inputtingAction();
	if(!EGGS.ASS.ActorDead){
    action.setTarget(this._enemyWindow.enemyIndex());} 
    this._enemyWindow.hide();
    this._skillWindow.hide();
    this._itemWindow.hide();
    this.selectNextCommand();
	
};

function ChangeHp(){
	
}

function skillRush(id,actor){
	var arr=EGGS.Param.Skill_Ids.split(",");
	var items = EGGS.Param.ItemIds.split(",");
	var amount = EGGS.Param.Amount.split(",");
	var equipped = EGGS.Param.IncludeEquip.split(",");
	var removed =EGGS.Param.IsItemRemoved.split(",");
	var added = EGGS.Param.IsItemAdded.split(",");
	var type = EGGS.Param.ItemType.split(",");
	var forgets = EGGS.Param.ForgetSkills.split(",");
	for(var i=0;i<arr.length;i++){
		if (arr[i]==id){
			if(items.filter((el)=>el=="-1").length<1){
				removeItem(items[i],amount[i],equipped[i],type[i],removed[i]);
				addItem(items[i],amount[i],equipped[i],type[i],added[i]);
			}
		}
	}
	for(var i=0;i<arr.length;i++){
		if(actor.equips[0]&&equipped[i]){
			if(((actor.equips[0].id==items[i]?1:0)+$gameParty.numItems($dataWeapons[items[i]]))<=0){
				actor.forgetSkill(arr[i]);
			}
		}
		else{
			if($gameParty.numItems($dataWeapons[items[i]])<=0){
				actor.forgetSkill(arr[i]);
			}
		}
	}
}

function removeItem(item,amount,equipped,type,removed){
	
	if(removed){
		switch(Number(type)){
			case 0:$gameParty.loseItem($dataItems[item],Number(amount),equipped);break;
			case 1:$gameParty.loseItem($dataWeapons[item],Number(amount),equipped);break;
			case 2:$gameParty.loseItem($dataArmors[item],Number(amount),equipped);break;
			case 3:$gameParty.removeActor($dataActors[item]);break;
			default:break;
		}
	}
	
}

function addItem(item,amount,equipped,type,added){
	if(added){
		switch(Number(type)){
			case 0:$gameParty.gainItem($dataItems[item],Number(amount),equipped);break;
			case 1:$gameParty.gainItem($dataWeapons[item],Number(amount),equipped);break;
			case 2:$gameParty.gainItem($dataArmors[item],Number(amount),equipped);break;
			case 3:$gameParty.addActor($dataActors[item]);break;
			default:break;
		}
	}
}

function setActor(){
	if(EGGS.Param.SavedActor>-1){
		$gameVariables.setValue(EGGS.Param.SavedActor,BattleManager.actor().actorId());		
		}
}

function setSkill(){
	if(EGGS.Param.SavedSkillId>-1){
		$gameVariables.setValue(EGGS.Param.SavedSkillId,BattleManager.actor().lastBattleSkill().id);		
		}
}
