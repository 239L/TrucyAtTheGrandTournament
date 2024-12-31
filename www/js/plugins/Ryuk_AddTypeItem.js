//=============================================================================
// Ryuk_AddItemType.js
//=============================================================================

/*:
 * @plugindesc Version 1.0.1 
 * You can add between 1-6 new Items Types. You can choose the name and position.
 * Crédit : Ryuk
 *
 * @author Ryuk
 *
 * @help Welcome to AddTypeItem.
 * === Introduction ===
 * Do not like the four types of item? Want more easily to diverse the different types of item ? 
 * You can go through this plugin add between 1-6 new types of objects with this plugin.
 * Easy, you can change the name and activate or desactivate your new category of item.
 *
 * === How use it ===
 * After activate this plugin, to add your new Item Type, go in parameter and in Name of New Item Type,
 * write the type name you want. Then, to activate your new type. In Position of Item Type, choose the 
 * position where you want see your new type.
 * 
 * Now, your new type is created and it appear in your Item Menu. But how put item in this category? 
 * Easy ! If you have choose Slot1, write in Note Item <slot1>
 * So :
 *	Slot1 : <slot1>
 *	Slot2 : <slot2>
 *	Slot3 : <slot3>
 *	Slot4 : <slot4>
 *	Slot5 : <slot5>
 *	Slot6 : <slot6>
 *  
 * For example, I created "Loop" in Slot1 parameter type for item like Wing Bat. I want put Wing Bat in Loop Menu
 * when i got this item. So in note's Wing Bat, I write <slot1>.
 * BUT actually, your item will be in Item AND Loop, so, how do to see it only in Loop Menu? 
 * To do it, in your Item Option, put your Item in Hidden Item A or B. And you Item will be only in Loop Menu.
 * 
 * === How Delete Type ===
 * If you want desactivate some type, write "false" in value in Position Slot<number>.
 * For example, if I don't want Slot1, Position Slot1 Value: false.
 *
 * === More Option ===
 * As you can see, you can change the position of Item Menu. So if you want
 * put Loot Menu before Item, you need all shifted.
 * For example :
 * 		Loot 0
 * 		Item 1
 * 		Weapon 2
 * 		Accessory 3
 * 		Armor 4
 * 		Key Item 5
 *
 * @param =============================
 * @param Name of New Item Type
 * @param =============================
 * @param
 *
 * @param Name Slot1
 * @desc Choose the name of your new Item Type. 
 * @default 
 * 
 * @param Name Slot2
 * @desc Choose the name of your new Item Type. 
 * @default 
 * 
 * @param Name Slot3
 * @desc Choose the name of your new Item Type. 
 * @default 
 *
 * @param Name Slot4
 * @desc Choose the name of your new Item Type. 
 * @default 
 *
 * @param Name Slot5
 * @desc Choose the name of your new Item Type. 
 * @default 
 * 
 * @param Name Slot6
 * @desc Choose the name of your new Item Type. 
 * @default 
 *
 * @param
 * @param =============================
 * @param Position of Item Type
 * @param =============================
 * @param
 *
 * @param Position Item
 * @desc Define position of Item Menu
 * @default 0
 * 
 * @param Position Weapon
 * @desc Define position of Weapon Menu
 * @default 1
 * 
 * @param Position Armor
 * @desc Define position of Armor Menu
 * @default 2
 *
 * @param Position Key
 * @desc Define position of Key Menu 
 * @default 3
 * 
 * @param Position Slot1
 * @desc Define position of your first new Type Item
 * @default false
 * 
 * @param Position Slot2
 * @desc Define position of your second new Type Item
 * @default false
 * 
 * @param Position Slot3
 * @desc Define position of your third new Type Item 
 * @default false
 * 
 * @param Position Slot4
 * @desc Define position of your fourth new Type Item 
 * @default false
 * 
 * @param Position Slot5
 * @desc Define position of your fifth new Type Item 
 * @default false
 * 
 * @param Position Slot6
 * @desc Define position of your sixth new Type Item 
 * @default false
 * 
 */
(function () {
	var parameters = PluginManager.parameters('Ryuk_AddTypeItem');
	// Variable for Name
	var slot1 = String(parameters['Name Slot1']);
	var slot2 = String(parameters['Name Slot2']);
	var slot3 = String(parameters['Name Slot3']);
	var slot4 = String(parameters['Name Slot4']);
	var slot5 = String(parameters['Name Slot5']);
	var slot6 = String(parameters['Name Slot6']);
	
	// Variable for position
	var item = String(parameters['Position Item']);
	var weapon = String(parameters['Position Weapon']);
	var armor = String(parameters['Position Armor']);
	var key = String(parameters['Position Key']);
	var p_slot1 = String(parameters['Position Slot1']);
	var p_slot2 = String(parameters['Position Slot2']);
	var p_slot3 = String(parameters['Position Slot3']);
	var p_slot4 = String(parameters['Position Slot4']);
	var p_slot5 = String(parameters['Position Slot5']);
	var p_slot6 = String(parameters['Position Slot6']);
	

	
	
	Window_ItemCategory.prototype.makeCommandList = function() {
		for (i = 0; i < 10; i++)
		{
			if (item == i)
	    		this.addCommand(TextManager.item, 'item');
	    	else if (weapon == i)
	    		this.addCommand(TextManager.weapon, 'weapon');
	    	else if (armor == i)
	    		this.addCommand(TextManager.armor, 'armor');
	    	else if (key == i)
	    		this.addCommand(TextManager.keyItem, 'keyItem');
			else if (p_slot1 == i)
	    		this.addCommand(slot1, 'p_slot1');
			else if (p_slot2 == i)
	    		this.addCommand(slot2, 'p_slot2');
			else if (p_slot3 == i)
	    		this.addCommand(slot3, 'p_slot3');
			else if (p_slot4 == i)
	    		this.addCommand(slot4, 'p_slot4');
			else if (p_slot5 == i)
	    		this.addCommand(slot5, 'p_slot5');
			else if (p_slot6 == i)
	    		this.addCommand(slot6, 'p_slot6');
		}
	};

	Window_ItemList.prototype.includes = function(item) {
	    switch (this._category) {
	    case 'item':
	        return DataManager.isItem(item) && item.itypeId === 1;
	    case 'weapon':
	        return DataManager.isWeapon(item);
	    case 'armor':
	        return DataManager.isArmor(item);
	    case 'keyItem':
	        return DataManager.isItem(item) && item.itypeId === 2;
	    case 'p_slot1':
	        return item && item.note.match(/<slot1>/m) ? true : false;
		case 'p_slot2':
	        return item && item.note.match(/<slot2>/m) ? true : false;
		case 'p_slot3':
	        return item && item.note.match(/<slot3>/m) ? true : false;
		case 'p_slot4':
	        return item && item.note.match(/<slot4>/m) ? true : false;
		case 'p_slot5':
	        return item && item.note.match(/<slot5>/m) ? true : false;
		case 'p_slot6':
	        return item && item.note.match(/<slot6>/m) ? true : false;
	    default:
	        return false;
	    };
	};
})();