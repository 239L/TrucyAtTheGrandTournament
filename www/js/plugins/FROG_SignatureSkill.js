//=============================================================================
// Frogboy RMMV Plugin
// FROG_SignatureSkill.js
//=============================================================================

/*:
 * @plugindesc v2.1 Adds a signature skill to the battle menu for an actor or class
 * @author Frogboy
 *
 * @help
 * Signature Skill v2.1
 * Author Frogboy
 *
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Just like every good hero needs some theme music, every RPG main character
 * should have a signature skill. Locke had Steal.  Edgar had those cool Tools.
 * Setzer had the very memorable random Slot Machine thing. Signature
 * skills is where it's at. Unfortunately, this plug-in won't help you make
 * super sweet signature skills. You have to do that on your own. What it will
 * do is give you that menu option on the main battle menu that allows you to
 * execute said signature skill.  It gives it a prominent place letting your
 * players know that it's more special and unique than just your average every-
 * day skill.
 *
 * If you couldn't tell already, this plugin was designed to give you that
 * classic Final Fantasy battle menu.  In this case, classic refers to FF4-9,
 * the golden age of the series.  The primary purpose of this plugin is to give
 * you a super easy way to replicate the battle menus that these games provided.
 *
 * As an added bonus, this plugin will allow you to remove any
 * unwanted options from the battle menu that RPG Maker won't let you remove
 * within the editor (Attack, Guard and Item).
 *
 * ============================================================================
 * Parameters
 * ============================================================================
 *
 * Signature Skills
 *
 * This section is where you define the Signature and Limit Break Skills for
 * any actors or classes who possess one.  Actor-based Signature skills
 * supersede any class-based ones if both would apply to the same character.
 *
 * Actor Signature Skills
 *
 * Allows you to configure actor-specific battle menus.  This will override the
 * Class Signature Skill if both would apply to the same actor.
 *    Actor - The actor that the Signature and/or Limit Break Skill belongs to
 *    Signature Skill - The Signature Skill assigned to the designated actor
 *    Limit Break Skill - The Limit Break skill assigned to the designated actor
 *    Replace Attack - Replaces the Attack command of the designated actor
 *    Replace Guard - Replaces the Guard command of the designated actor
 *    Replace Item - Replaces the Item command of the designated actor
 *    Remove Attack - Removes the Attack command for the designated actor
 *    Remove Guard - Removes the Guard command for the designated actor
 *    Remove Item - Removes the Item command for the designated actor
 *
 * Class Signature Skills
 *
 * Allows you to configure class-specific battle menus.
 *    Class - The class that the Signature and/or Limit Break Skill belongs to
 *    Signature Skill - The Signature Skill assigned to the designated class
 *    Limit Break Skill - The Limit Break skill assigned to the designated class
 *    Replace Attack - Replaces the Attack command of the designated class
 *    Replace Guard - Replaces the Guard command of the designated class
 *    Replace Item - Replaces the Item command of the designated class
 *    Remove Attack - Removes the Attack command for the designated class
 *    Remove Guard - Removes the Guard command for the designated class
 *    Remove Item - Removes the Item command for the designated class
 *
 *
 * Extra Commands
 *
 * This section is where you define define any extra battle menu commands that
 * every actor can use.  Say you wanted to re-create the Draw mechanic from
 * Final Fantasy 8 that everyone loves, and when I say everyone, I literally
 * mean everyone.  You could define that here.
 *
 * Extra Command 1
 *
 * An extra skill that is placed in the battle menu for all characters
 *
 * Extra Command 1 Position
 *
 * The position where Extra Command 1 skill will be located.  Your choices are:
 *    After Attack
 *    After Signature Skill
 *    After Skill Groups
 *    After Guard
 *    After Item
 *
 * Extra Command 2
 *
 * This works exactly like Extra Command 1.  It will be placed after Extra
 * Command 1 if both are assigned in the same position.
 *
 *
 * Help Text
 *
 * This plugin can enable the help window for the actors battle commands. These
 * include Attack, Gaurd, Skill Types, Item and any of the skills you set this
 * plugin up to add or swap in.  Typically, the description will be pulled from
 * the skill itself as defined in the database.  Skill Type and Item need to
 * be configured in this plugin as there is no description to pull.
 *
 * Use Battle Help - Enabled the help menu for actor battle commands.
 *
 * Skill Type - Configure text for the Skill Type command.  %1 will be replaced
 *              with the name of the Skill Type.
 *
 * Item - Configure text for the Item command.
 *
 *
 * Skill Upgrades
 *
 * So Locke had steal but later on in the game, he could equip an item and
 * upgrade it to Mug.  How do you do that?  That's simple too.  Just define
 * which weapons, armor or items will upgrade a Signature and/or Limit Break
 * Skill.
 *
 * Weapon Upgrade Skills
 *
 * Contains a list of 3 parameters: Weapon, Original & Replace With.
 *    Weapon - The weapon that will upgrade a Signature and/or Limit Break Skill
 *             if it is equipped by the character
 *    Original - The Signature or Limit Break Skill that will be upgraded
 *    Replace With - The Signature or Limit Break Skill that replaces it
 *
 * Armor Upgrade Skills
 *
 * Contains a list of 3 parameters: Armor, Original & Replace With.
 *    Armor - The armor that will upgrade a Signature and/or Limit Break Skill
 *             if it is equipped by the character
 *    Original - The Signature or Limit Break Skill that will be upgraded
 *    Replace With - The Signature or Limit Break Skill that replaces it
 *
 * Item Upgrade Skills
 *
 * Contains a list of 3 parameters: Item, Original & Replace With.
 *    Item - The item that will upgrade a Signature and/or Limit Break Skill
 *             if it is in the possession of the party
 *    Original - The Signature or Limit Break Skill that will be upgraded
 *    Replace With - The Signature or Limit Break Skill that replaces it
 *
 * Chaining Upgrades
 *
 * If you have a chain of upgrades that can be acquired like say
 * Steal -> Mug -> Murder, this can easily be done by making an upgrade for Mug.
 *
 * Example:
 *   If you set Steal as a Signature Skill for your Thief, sorry I mean
 *   Treasure Hunter, and have an item or equipment defined to upgrade Steal to
 *   Mug, you can also define an upgrade for Mug.  Let's say that your thief
 *   has the Thieves Gloves and that is set to upgrade Steal into Mug.  Later on
 *   in the game, he joins a thieve's guild and upon entry, the party gains a
 *   hidden item called Thieve's Guild Membership which is set to upgrade the
 *   Mug skill to the Murder skill.  As long as your thief has the Thieve's
 *   Gloves equipped, their Steal will be upgraded all the way to Murder.
 *   Chaining doesn't stop at one level.  Murder could be upgraded as well and
 *   so on and so on.
 *
 *
 * TP Limit Breaks
 *
 * Final Fantasy 7 has those sweet Limit Breaks so, of course, this plugin has
 * to at least somewhat recreate that kind of mechanic.  It's more of a
 * stripped down version of the Limit Break system but hopefully it's good
 * enough for most.  If this feature is activated, when a character's TP is
 * completely filled, they will gain a Limit Break skill that replaces the
 * indicated menu option.  You are probably going to want to give each
 * character the Trait -> Other -> Special Flag -> Preserve TP.
 *
 * Activate
 *
 * Set to Yes/true if you want to use this.  Set to No/false if you do not.
 *
 * Limit Break Replaces
 *
 * Select the battle command that the Limit Break replaces or None if you want
 * it to be it's own option at the top of the battle menu.  By default, this is
 * set to replace the Attack command just like FF7 did.
 *
 *
 * Remove Commands
 *
 * This is just a way to get rid of unwanted battle commands that your game
 * doesn't use.
 *    Remove Attack - Removes the Attack command for all characters
 *    Remove Guard - Removes the Guard command for all characters
 *    Remove Item - Removes the Item command for all characters
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * This plugin can be used in commercial or non-commercial projects.
 * Credit Frogboy in your work
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.0 - Initial release
 * Version 1.1 - Upgrade signature skills with item or equipped weapon/armor
 * Version 2.0 - Added Limit Break skill and a host of new customizations.
 *               Replaced use of Note Tags with plugin parameters.
 *               Broke backwards compatibility with version 1 plugin.
 * Version 2.1 - Added help window for actor battle commands.
 *
 * @param Signature Skills
 * @param Extra Commands
 * @param Help Text
 * @param Skill Upgrades
 * @param TP Limit Breaks
 * @param Remove Commands
 *
 * @param Actor Signature Skills
 * @parent Signature Skills
 * @type struct<ActorSigSkillStruct>[]
 * @desc Define Actor-based Signature and Limit Break Skills
 * @default []
 *
 * @param Class Signature Skills
 * @parent Signature Skills
 * @type struct<ClassSigSkillStruct>[]
 * @desc Define Class-based Signature and Limit Break Skills
 * @default []
 *
 * @param Extra Command 1
 * @parent Extra Commands
 * @type skill
 * @desc This is an extra command/skill that all characters have.
 * @default 0
 *
 * @param Extra Command 1 Position
 * @parent Extra Commands
 * @desc Where do you want this extra command to be located in the battle menu?
 * @type select
 * @default After Signature Skill
 * @option After Attack
 * @value After Attack
 * @option After Signature Skill
 * @value After Signature Skill
 * @option After Skill Groups
 * @value After Skill Groups
 * @option After Guard
 * @value After Guard
 * @option After Item
 * @value After Item
 *
 * @param Extra Command 2
 * @parent Extra Commands
 * @type skill
 * @desc This is another extra command/skill that all characters have.
 * @default 0
 *
 * @param Extra Command 2 Position
 * @parent Extra Commands
 * @desc Where do you want this extra command to be located in the battle menu?
 * @type select
 * @default After Skill Groups
 * @option After Attack
 * @value After Attack
 * @option After Signature Skill
 * @value After Signature Skill
 * @option After Skill Groups
 * @value After Skill Groups
 * @option After Guard
 * @value After Guard
 * @option After Item
 * @value After Item
 *
 * @param Use Battle Help
 * @parent Help Text
 * @desc The actor battle commands usually don't have a help window.  This adds one.
 * @type boolean
 * @default true
 * @on Yes
 * @off No
 *
 * @param Skill Type
 * @parent Help Text
 * @type string
 * @desc Help text for Skill Type command.  %1 will be replaced with the name of the Skill Type.
 * @default Use a %1 Skill
 *
 * @param Item
 * @parent Help Text
 * @type string
 * @desc Help text for Item command.
 * @default Use an item
 *
 * @param Weapon Upgrade Skills
 * @parent Skill Upgrades
 * @type struct<WeaponUpgrade>[]
 * @desc Define weapons that upgrade Signature and Limit Break Skills
 * @default []
 *
 * @param Armor Upgrade Skills
 * @parent Skill Upgrades
 * @type struct<ArmorUpgrade>[]
 * @desc Define armors that upgrade Signature and Limit Break Skills
 * @default []
 *
 * @param Item Upgrade Skills
 * @parent Skill Upgrades
 * @type struct<ItemUpgrade>[]
 * @desc Define items that upgrade Signature and Limit Break Skills
 * @default []
 *
 * @param Activate
 * @parent TP Limit Breaks
 * @desc When TP maxes out, a new signature/limit break skill becomes available.
 * @type boolean
 * @default false
 * @on Yes
 * @off No
 *
 * @param Limit Break Replaces
 * @parent TP Limit Breaks
 * @desc Which battle command does Limit Break replace?
 * @type select
 * @default Attack
 * @option None
 * @value None
 * @option Attack
 * @value Attack
 * @option Signature Skill
 * @value Signature Skill
 * @option Extra Command 1
 * @value Extra Command 1
 * @option Skill Groups
 * @value Skill Groups
 * @option Extra Command 2
 * @value Extra Command 2
 * @option Guard
 * @value Guard
 * @option Item
 * @value Item
 *
 * @param Remove Attack
 * @parent Remove Commands
 * @desc Removes the Attack battle menu option for all actors.
 * @type boolean
 * @default false
 * @on Yes
 * @off No
 *
 * @param Remove Guard
 * @parent Remove Commands
 * @desc Removes the Guard battle menu option for all actors.
 * @type boolean
 * @default false
 * @on Yes
 * @off No
 *
 * @param Remove Item
 * @parent Remove Commands
 * @desc Removes the Item battle menu option for all actors.
 * @type boolean
 * @default false
 * @on Yes
 * @off No
*/
/*~struct~ActorSigSkillStruct:
 * @param Actor
 * @type actor
 * @desc The actor that will gain a Signature and/or limit Break Skill
 * @deafult 1
 *
 * @param Signature Skill
 * @type skill
 * @desc This skill will become the selected actor's Signature Skill
 * @deafult 0
 *
 * @param Limit Break Skill
 * @type skill
 * @desc This skill will become the selected actor's Limit Break Skill
 * @deafult 0
 *
 * @param Replace Attack
 * @type skill
 * @desc This skill will replace the Attack command for this actor
 * @deafult 0
 *
 * @param Replace Guard
 * @type skill
 * @desc This skill will replace the Guard command for this actor
 * @deafult 0
 *
 * @param Replace Item
 * @type skill
 * @desc This skill will replace the Item command for this actor
 * @deafult 0
 *
 * @param Remove Attack
 * @type boolean
 * @desc The Attack command will be removed for this actor only
 * @deafult false
 *
 * @param Remove Guard
 * @type boolean
 * @desc The Guard command will be removed for this actor only
 * @deafult false
 *
 * @param Remove Item
 * @type boolean
 * @desc The Item command will be removed for this actor only
 * @deafult false
 */
/*~struct~ClassSigSkillStruct:
 * @param Class
 * @type class
 * @desc The class that will gain a Signature and/or limit Break skill
 * @deafult 1
 *
 * @param Signature Skill
 * @type skill
 * @desc This skill will become the selected class's Signature Skill
 * @deafult 0
 *
 * @param Limit Break Skill
 * @type skill
 * @desc This skill will become the selected class's Limit Break Skill
 * @deafult 0
 *
 * @param Replace Attack
 * @type skill
 * @desc This skill will replace the Attack command for this class
 * @deafult 0
 *
 * @param Replace Guard
 * @type skill
 * @desc This skill will replace the Guard command for this class
 * @deafult 0
 *
 * @param Replace Item
 * @type skill
 * @desc This skill will replace the Item command for this class
 * @deafult 0
 *
 * @param Remove Attack
 * @type boolean
 * @desc The Attack command will be removed for this class only
 * @deafult false
 *
 * @param Remove Guard
 * @type boolean
 * @desc The Guard command will be removed for this class only
 * @deafult false
 *
 * @param Remove Item
 * @type boolean
 * @desc The Item command will be removed for this class only
 * @deafult false
 */
/*~struct~WeaponUpgrade:
 * @param Weapon
 * @type weapon
 * @desc The weapon that will upgrade a Signature or Limit Break skill
 * @deafult 1
 *
 * @param Original
 * @type skill
 * @desc The skill that will be upgraded and replaced
 * @deafult 1
 *
 * @param Replace With
 * @type skill
 * @desc The skill that will replace the original skill
 * @deafult 1
 */
/*~struct~ArmorUpgrade:
 * @param Armor
 * @type armor
 * @desc The armor that will upgrade a Signature or Limit Break skill
 * @deafult 1
 *
 * @param Original
 * @type skill
 * @desc The skill that will be upgraded and replaced
 * @deafult 1
 *
 * @param Replace With
 * @type skill
 * @desc The skill that will replace the original skill
 * @deafult 1
 */
/*~struct~ItemUpgrade:
 * @param Item
 * @type item
 * @desc The item that will upgrade a Signature or Limit Break skill
 * @deafult 1
 *
 * @param Original
 * @type skill
 * @desc The skill that will be upgraded and replaced
 * @deafult 1
 *
 * @param Replace With
 * @type skill
 * @desc The skill that will replace the original skill
 * @deafult 1
 */

(function() {
	var prm = PluginManager.parameters('FROG_SignatureSkill');
	var actorSigSkills = (prm['Actor Signature Skills']) ? JSON.parse(prm['Actor Signature Skills']) : [];
	var classSigSkills = (prm['Class Signature Skills']) ? JSON.parse(prm['Class Signature Skills']) : [];
	var weaponUpgradeSkills = (prm['Weapon Upgrade Skills']) ? JSON.parse(prm['Weapon Upgrade Skills']) : [];
	var armorUpgradeSkills = (prm['Armor Upgrade Skills']) ? JSON.parse(prm['Armor Upgrade Skills']) : [];
	var itemUpgradeSkills = (prm['Item Upgrade Skills']) ? JSON.parse(prm['Item Upgrade Skills']) : [];
	var extraCommand1 = parseInt(prm['Extra Command 1']) || 0;
	var extraCommand1Position = prm['Extra Command 1 Position'] || "After Signature Skill";
	var extraCommand2 = parseInt(prm['Extra Command 2']) || 0;
	var extraCommand2Position = prm['Extra Command 2 Position'] || "After Skill Groups";
    var useHelp = (prm['Use Battle Help'] === "true");
    var skillTypeHelp = prm['Skill Type'].trim();
    var itemHelp = prm['Item'].trim();
	var useLimit = (prm['Activate'] === "true");
	var limitReplace = prm['Limit Break Replaces'] || "Attack";
	var removeAttack = (prm['Remove Attack'] === "true");
	var removeGuard = (prm['Remove Guard'] === "true");
	var removeItem = (prm['Remove Item'] === "true");

	Scene_Battle.prototype.createActorCommandWindow = function() {
		this._actorCommandWindow = new Window_ActorCommand();
		if (removeAttack === false) {
			this._actorCommandWindow.setHandler('attack', this.commandAttack.bind(this));
			this._actorCommandWindow.setHandler('attackReplace', this.commandAttackReplace.bind(this));
		}
		if (useLimit === true) {
			this._actorCommandWindow.setHandler('limit', this.commandLimit.bind(this));
		}
		this._actorCommandWindow.setHandler('signature', this.commandSignatureSkill.bind(this));
		if (extraCommand1) {
			this._actorCommandWindow.setHandler('extra1', this.commandExtra1.bind(this));
		}
		if (extraCommand2) {
			this._actorCommandWindow.setHandler('extra2', this.commandExtra2.bind(this));
		}
		this._actorCommandWindow.setHandler('skill', this.commandSkill.bind(this));
		if (removeGuard === false) {
			this._actorCommandWindow.setHandler('guard', this.commandGuard.bind(this));
			this._actorCommandWindow.setHandler('guardReplace', this.commandGuardReplace.bind(this));
		}
		if (removeItem === false) {
			this._actorCommandWindow.setHandler('item', this.commandItem.bind(this));
			this._actorCommandWindow.setHandler('itemReplace', this.commandItemReplace.bind(this));
		}
		this._actorCommandWindow.setHandler('cancel', this.selectPreviousCommand.bind(this));
		this.addWindow(this._actorCommandWindow);
	};

	Window_ActorCommand.prototype.makeCommandList = function() {
		var actor = this._actor;
		if (actor) {
			var args = {
				limit: {},
				replace: {
					attack: {},
					guard: {},
					item: {}
				},
				remove: {
					attack: removeAttack,
					guard: removeGuard,
					item: removeItem
				}
			};
			args.limit.id = getSignatureSkill(actor, "Limit Break Skill");
			args.limit.skill = (args.limit.id > 0) ? $dataSkills[args.limit.id] : null;
			args.limit.max = (useLimit && args.limit.skill && parseInt(actor._tp) >= 100);
			args.replace.attack.id = getSignatureSkill(actor, "Replace Attack");
			args.replace.attack.skill = (args.replace.attack.id > 0) ? $dataSkills[args.replace.attack.id] : null;
			args.replace.attack.enabled = (args.replace.attack.skill && actor._mp >= args.replace.attack.skill.mpCost && actor._tp >= args.replace.attack.skill.tpCost);
			args.replace.guard.id = getSignatureSkill(actor, "Replace Guard");
			args.replace.guard.skill = (args.replace.guard.id > 0) ? $dataSkills[args.replace.guard.id] : null;
			args.replace.guard.enabled = (args.replace.guard.skill && actor._mp >= args.replace.guard.skill.mpCost && actor._tp >= args.replace.guard.skill.tpCost);
			args.replace.item.id = getSignatureSkill(actor, "Replace Item");
			args.replace.item.skill = (args.replace.item.id > 0) ? $dataSkills[args.replace.item.id] : null;
			args.replace.item.enabled = (args.replace.item.skill && actor._mp >= args.replace.item.skill.mpCost && actor._tp >= args.replace.item.skill.tpCost);

			var bFound = false;
			actorSigSkills.forEach(function(item) {
				var value = JSON.parse(item);
				if (actor._actorId == value["Actor"]) {
					bFound = true;
					if (value["Remove Attack"] == "true") args.remove.attack = true;
					if (value["Remove Guard"] == "true") args.remove.guard = true;
					if (value["Remove Item"] == "true") args.remove.item = true;
				}
			});
			if (bFound === false) {
				classSigSkills.forEach(function(item) {
					var value = JSON.parse(item);
					if (actor._classId == value["Class"]) {
						if (value["Remove Attack"] == "true") args.remove.attack = true;
						if (value["Remove Guard"] == "true") args.remove.guard = true;
						if (value["Remove Item"] == "true") args.remove.item = true;
					}
				});
			}

			// Limit Break with No Replacement
			if (args.limit.max && limitReplace == "None") {
				this.addLimitCommand(limit.skill.name, args.limit.skill.description, true);
			}

			// Attack
			if (args.remove.attack === false) {
				if (args.limit.max && limitReplace == "Attack") {
					this.addLimitCommand(args.limit.skill.name, args.limit.skill.description, true);
				}
				else if (args.replace.attack.skill) {
					this.addAttackReplaceCommand(args.replace.attack.skill.name, args.replace.attack.skill.description, args.replace.attack.enabled);
				}
				else {
					this.addAttackCommand();
				}
			}
			else if (useLimit && actor._tp >= 100) {
				this.addLimitCommand();
			}

			// Extra Commands
			dropExtraCommands(this, "After Attack", args.limit);

			// Signature Skill
			if (args.limit.max && limitReplace == "Signature Skill") {
				this.addLimitCommand(args.limit.skill.name, args.limit.skill.description, true);
			}
			else {
				var skill_id = getSignatureSkill(actor, "Signature Skill");
				if (skill_id > 0) {
					var skill = $dataSkills[skill_id];
					if (skill) {
						var enabled = (actor._mp >= skill.mpCost && actor._tp >= skill.tpCost);
						this.addSignatureCommand(skill.name, skill.description, enabled);
					}
				}
			}

			// Extra Commands
			dropExtraCommands(this, "After Signature Skill", args.limit);

			// Skill Groups
			if (args.limit.max && limitReplace == "Skill Groups") {
				this.addLimitCommand(args.limit.skill.name, args.limit.skill.description, true);
			}
			else {
				this.addSkillCommands();
			}

			// Extra Commands
			dropExtraCommands(this, "After Skill Groups", args.limit);

			// Guard, limit
			if (args.remove.guard === false) {
				if (args.limit.max && limitReplace == "Guard") {
					this.addLimitCommand(args.limit.skill.name, args.limit.skill.description, true);
				}
				else if (args.replace.guard.skill) {
					this.addGuardReplaceCommand(args.replace.guard.skill.name, args.replace.guard.skill.description, args.replace.guard.enabled);
				}
				else {
					this.addGuardCommand();
				}
			}
			else if (useLimit && actor._tp >= 100) {
				this.addLimitCommand();
			}

			// Extra Commands
			dropExtraCommands(this, "After Guard", args.limit);

			// Item
			if (args.remove.item === false) {
				if (args.limit.max && limitReplace == "Item") {
					this.addLimitCommand(args.limit.skill.name, args.limit.skill.description, true);
				}
				else if (args.replace.item.skill) {
					this.addItemReplaceCommand(args.replace.item.skill.name, args.replace.item.skill.description, args.replace.item.enabled);
				}
				else {
					this.addItemCommand();
				}
			}
			else if (useLimit && actor._tp >= 100) {
				this.addLimitCommand();
			}

			// Extra Commands
			dropExtraCommands(this, "After Item", args.limit);
		}
	};

	Window_ActorCommand.prototype.addSignatureCommand = function(name, description, enabled) {
		this.addCommand(name, 'signature', enabled);
        this._list[this._list.length - 1].description = description;
	};

	Window_ActorCommand.prototype.addLimitCommand = function(name, description, enabled) {
		this.addCommand(name, 'limit', enabled);
        this._list[this._list.length - 1].description = description;
	};

	Window_ActorCommand.prototype.addAttackReplaceCommand = function(name, description, enabled) {
		this.addCommand(name, 'attackReplace', enabled);
        this._list[this._list.length - 1].description = description;
	};

	Window_ActorCommand.prototype.addGuardReplaceCommand = function(name, description, enabled) {
		this.addCommand(name, 'guardReplace', enabled);
        this._list[this._list.length - 1].description = description;
	};

	Window_ActorCommand.prototype.addItemReplaceCommand = function(name, description, enabled) {
		this.addCommand(name, 'itemReplace', enabled);
        this._list[this._list.length - 1].description = description;
	};

	Window_ActorCommand.prototype.addExtraCommand1 = function(name, description, enabled) {
		this.addCommand(name, 'extra1', enabled);
        this._list[this._list.length - 1].description = description;
	};

	Window_ActorCommand.prototype.addExtraCommand2 = function(name, description, enabled) {
		this.addCommand(name, 'extra2', enabled);
        this._list[this._list.length - 1].description = description;
	};

	Scene_Battle.prototype.commandSignatureSkill = function() {
	    this._skillWindow.setActor(BattleManager.actor());
	    this._skillWindow.setStypeId(this._actorCommandWindow.currentExt());
		var skill_id = getSignatureSkill(BattleManager.actor(), "Signature Skill");
	    var skill = $dataSkills[skill_id];
	    var action = BattleManager.inputtingAction();
	    action.setSkill(skill.id);
	    BattleManager.actor().setLastBattleSkill(skill);
	    this.onSelectAction();
	};

	Scene_Battle.prototype.commandLimit = function() {
	    this._skillWindow.setActor(BattleManager.actor());
	    this._skillWindow.setStypeId(this._actorCommandWindow.currentExt());
		var limit_id = getSignatureSkill(BattleManager.actor(), "Limit Break Skill");
	    var skill = $dataSkills[limit_id];
	    var action = BattleManager.inputtingAction();
	    action.setSkill(skill.id);
	    BattleManager.actor().setLastBattleSkill(skill);
	    this.onSelectAction();
	};

	Scene_Battle.prototype.commandAttackReplace = function() {
	    this._skillWindow.setActor(BattleManager.actor());
	    this._skillWindow.setStypeId(this._actorCommandWindow.currentExt());
		var skill_id = getSignatureSkill(BattleManager.actor(), "Replace Attack");
	    var skill = $dataSkills[skill_id];
	    var action = BattleManager.inputtingAction();
	    action.setSkill(skill.id);
	    BattleManager.actor().setLastBattleSkill(skill);
	    this.onSelectAction();
	};

	Scene_Battle.prototype.commandGuardReplace = function() {
	    this._skillWindow.setActor(BattleManager.actor());
	    this._skillWindow.setStypeId(this._actorCommandWindow.currentExt());
		var skill_id = getSignatureSkill(BattleManager.actor(), "Replace Guard");
	    var skill = $dataSkills[skill_id];
	    var action = BattleManager.inputtingAction();
	    action.setSkill(skill.id);
	    BattleManager.actor().setLastBattleSkill(skill);
	    this.onSelectAction();
	};

	Scene_Battle.prototype.commandItemReplace = function() {
	    this._skillWindow.setActor(BattleManager.actor());
	    this._skillWindow.setStypeId(this._actorCommandWindow.currentExt());
		var skill_id = getSignatureSkill(BattleManager.actor(), "Replace Item");
	    var skill = $dataSkills[skill_id];
	    var action = BattleManager.inputtingAction();
	    action.setSkill(skill.id);
	    BattleManager.actor().setLastBattleSkill(skill);
	    this.onSelectAction();
	};

	Scene_Battle.prototype.commandExtra1 = function() {
	    this._skillWindow.setActor(BattleManager.actor());
	    this._skillWindow.setStypeId(this._actorCommandWindow.currentExt());
	    var skill = $dataSkills[extraCommand1];
	    var action = BattleManager.inputtingAction();
	    action.setSkill(skill.id);
	    BattleManager.actor().setLastBattleSkill(skill);
	    this.onSelectAction();
	};

	Scene_Battle.prototype.commandExtra2 = function() {
	    this._skillWindow.setActor(BattleManager.actor());
	    this._skillWindow.setStypeId(this._actorCommandWindow.currentExt());
	    var skill = $dataSkills[extraCommand2];
	    var action = BattleManager.inputtingAction();
	    action.setSkill(skill.id);
	    BattleManager.actor().setLastBattleSkill(skill);
	    this.onSelectAction();
	};

    // Help Window
    var aliasStartActorCommandSelection = Scene_Battle.prototype.startActorCommandSelection;
    Scene_Battle.prototype.startActorCommandSelection = function() {
        aliasStartActorCommandSelection.call(this);
        if (useHelp) {
            this._helpWindow.show();
        }
    }

    var aliasprocessCursorMove = Window_ActorCommand.prototype.processCursorMove;
    Window_ActorCommand.prototype.processCursorMove = function() {
        aliasprocessCursorMove.call(this);
        if (this.active) {
            this.updateHelp();
        }
    }

    Window_ActorCommand.prototype.updateHelp = function () {
        var index = this.index();
        var help = "";
        if (this._list[index] && this._list[index].description) {
            help = this._list[index].description;
        }
        this.parent.parent._helpWindow.setText(help);
    }

    var aliasSelectEnemySelection = Scene_Battle.prototype.selectEnemySelection;
    Scene_Battle.prototype.selectEnemySelection = function() {
        aliasSelectEnemySelection.call(this);
        this._helpWindow.hide();
    }

    var aliasOnEnemyCancel = Scene_Battle.prototype.onEnemyCancel;
    Scene_Battle.prototype.onEnemyCancel = function() {
        aliasOnEnemyCancel.call(this);
        this._helpWindow.show();
    }

    var aliasOnSkillCancel = Scene_Battle.prototype.onSkillCancel;
    Scene_Battle.prototype.onSkillCancel = function() {
        aliasOnSkillCancel.call(this);
        this._helpWindow.show();
    }

    var aliasOnItemCancel = Scene_Battle.prototype.onItemCancel;
    Scene_Battle.prototype.onItemCancel = function() {
        aliasOnItemCancel.call(this);
        this._helpWindow.show();
    }

    var aliasAddAttackCommand = Window_ActorCommand.prototype.addAttackCommand;
    Window_ActorCommand.prototype.addAttackCommand = function() {
        aliasAddAttackCommand.call(this);
        var skill = $dataSkills[1];
        this._list[this._list.length - 1].description = skill.description;
    }

    var aliasAddSkillCommands = Window_ActorCommand.prototype.addSkillCommands;
    Window_ActorCommand.prototype.addSkillCommands = function() {
        aliasAddSkillCommands.call(this);
        var self = this;
        var skillTypes = this._actor.addedSkillTypes();
        skillTypes.sort(function(a, b) {
            return a - b;
        });
        var skillTypeCount = skillTypes.length;
        skillTypes.forEach(function(stypeId) {
            var name = $dataSystem.skillTypes[stypeId];
            self._list[self._list.length - skillTypeCount].description = skillTypeHelp.replace('%1', name);
            skillTypeCount--;
        }, this);
    };

    var aliasAddGuardCommand = Window_ActorCommand.prototype.addGuardCommand;
    Window_ActorCommand.prototype.addGuardCommand = function() {
        aliasAddGuardCommand.call(this);
        var skill = $dataSkills[2];
        this._list[this._list.length - 1].description = skill.description;
    }

    var aliasAddItemCommand = Window_ActorCommand.prototype.addItemCommand;
    Window_ActorCommand.prototype.addItemCommand = function() {
        aliasAddItemCommand.call(this);
        this._list[this._list.length - 1].description = itemHelp;
    }

	function dropExtraCommands(self, position, limit) {
		if (extraCommand1 && extraCommand1Position == position) {
			if (limit.max && limitReplace == "Extra Command 1") {
				self.addLimitCommand(limit.skill.name, args.limit.skill.description, true);
			}
			else {
				var skill = $dataSkills[extraCommand1];
				if (skill) {
					var enabled = (self._actor._mp >= skill.mpCost && self._actor._tp >= skill.tpCost);
					self.addExtraCommand1(skill.name, skill.desccription, enabled);
				}
			}
		}

		if (extraCommand2 && extraCommand2Position == position) {
			if (limit.max && limitReplace == "Extra Command 2") {
				self.addLimitCommand(limit.skill.name, args.limit.skill.description, true);
			}
			else {
				var skill = $dataSkills[extraCommand2];
				if (skill) {
					var enabled = (self._actor._mp >= skill.mpCost && self._actor._tp >= skill.tpCost);
					self.addExtraCommand2(skill.name, skill.desccription, enabled);
				}
			}
		}
	}

	function getSignatureSkill(actor, meta_property) {
		var clas = actor.currentClass();
		var skill_id = 0;
		actorSigSkills.forEach(function(item) {
			var value = JSON.parse(item);
			if (actor._actorId == value["Actor"]) skill_id = value[meta_property];
		});
		if (!skill_id) {
			var clas = actor.currentClass();
			classSigSkills.forEach(function(item) {
				var value = JSON.parse(item);
				if (clas.id == value["Class"]) skill_id = value[meta_property];
			});
		}

		if (skill_id > 0) {
			var runLoop = true;
			var runLoopCounter = 0;	// Prevents infinite loop

			while (runLoop === true && runLoopCounter < 30) {
				runLoop = false;

				// See if weapon or armor upgrades the signature skill
				for (var i=0; i<actor._equips.length; i++) {
					switch (actor._equips[i]._dataClass) {
						case "armor":
							var armor_id = actor._equips[i]._itemId;
							armorUpgradeSkills.forEach(function(item) {
								var value = JSON.parse(item);
								if (armor_id == value["Armor"] && skill_id == value["Original"]) {
									skill_id = value["Replace With"];
									runLoop = true;
								}
							});
							break;
						case "weapon":
							var weapon_id = actor._equips[i]._itemId;
							weaponUpgradeSkills.forEach(function(item) {
								var value = JSON.parse(item);
								if (weapon_id == value["Weapon"] && skill_id == value["Original"]) {
									skill_id = value["Replace With"];
									runLoop = true;
								}
							});
							break;
					}
				}

				// See if an item upgrades the signature skill
				if (runLoop === false) {
					itemUpgradeSkills.forEach(function(item) {
						var value = JSON.parse(item);
						if ($gameParty.hasItem($dataItems[value["Item"]]) && skill_id == value["Original"]) {
							skill_id = value["Replace With"];
							runLoop = true;
						}
					});
				}

				runLoopCounter++;
			}
		}

		return skill_id;
	}
})();
