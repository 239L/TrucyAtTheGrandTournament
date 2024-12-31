/*:
@plugindesc Shop Stock
@author armornick

@param default-stock
@text Default Stock Size
@type number
@desc The default size of stock for items without note-tag.
@default 99


@help

This plugin adds a limited stock to shops which can be configured via note-tags.
This is an add-on to the Shop Manager plugin by Hime, which can be found here:
http://himeworks.com/2016/04/shop-manager-mv/

===   Usage   ====

Since this plugin is an addon to Hime's Shop Manager plugin, all of the usage
information from that plugin applies as well.

Add the following note-tag to an item, weapon or armor to change the default stock
of the item. If no note-tag is set, the default stock size will be used.

<stock: X>


===   License   ====

Permission is hereby granted, free of charge, to any person obtaining a copy 
of this software and associated documentation files (the "Software"), to deal 
in the Software without restriction, including without limitation the rights 
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies 
of the Software, and to permit persons to whom the Software is furnished to do so.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR 
PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE 
FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR 
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
DEALINGS IN THE SOFTWARE.

*/

if (!Imported || !Imported.ShopManager) {
	var msg = "The Shop Stock plugin requires the Shop Manager plugin by Hime.\n" +
	"That plugin can be found at the following address:\n" +
	"http://himeworks.com/2016/04/shop-manager-mv/";
	console.log(msg);
	require('nw.gui').Window.get().showDevTools();
}

Imported.ShopStock = 1;

var NIA = NIA || {};
NIA.ShopStock = NIA.ShopStock || {};

(function ($) {
	
	$.Params = PluginManager.parameters("NIA_ShopStock");
	$.DefaultStock = parseInt($.Params['default-stock'], 10);

	/***************************************************************************/

	var RE_ITEM_STOCK = /<\s*stock\s*:\s*(\d+)\s*>/i;

	function preloadItemStock (items) {
		var len = items.length;
		for (var i = 0; i < len; i++) {
			var item = items[i];

			// skip the object at index 0
        	if (item === null) continue;

        	var itemStock = RE_ITEM_STOCK.exec(item.note);
        	if (itemStock) {
        		itemStock = parseInt(itemStock[1], 10);
        		item.stock = itemStock;
        	}
		}
	}

	var NIA_ShopStock_DataManager_onLoad = DataManager.onLoad;
	DataManager.onLoad = function(object) {
		NIA_ShopStock_DataManager_onLoad.call(this, object);
		if (object === $dataItems || object === $dataWeapons || object === $dataArmors) {
			preloadItemStock(object);
		}
	};

	/***************************************************************************/

	var NIA_ShopStock_GameShopGood_initialize = Game_ShopGood.prototype.initialize;
	Game_ShopGood.prototype.initialize = function(id, item, price) {
		NIA_ShopStock_GameShopGood_initialize.call(this, id, item, price);
		this._currentStock = item.stock || $.DefaultStock;
	};

	Game_ShopGood.prototype.stock = function () {
		return this._currentStock;
	};

	Game_ShopGood.prototype.changeStock = function (amount) {
		this._currentStock = Math.max(this._currentStock + amount, 0);
	};

	/***************************************************************************/

	var NIA_ShopStock_SceneShop_doBuy = Scene_Shop.prototype.doBuy;
	Scene_Shop.prototype.doBuy = function(number) {
		NIA_ShopStock_SceneShop_doBuy.call(this, number);
		this._shopGood.changeStock(-number);
		this._buyWindow.refresh();
	};

	var NIA_ShopStock_SceneShop_maxBuy = Scene_Shop.prototype.maxBuy;
	Scene_Shop.prototype.maxBuy = function() {
	    var max = NIA_ShopStock_SceneShop_maxBuy.call(this);
	    return Math.min(max, this._shopGood.stock());
	};

	/***************************************************************************/

	var NIA_ShopStock_WindowShopBuy_isEnabled = Window_ShopBuy.prototype.isEnabled;
	Window_ShopBuy.prototype.isEnabled = function(shopGood) {
		return NIA_ShopStock_WindowShopBuy_isEnabled.call(this, shopGood)
			&& shopGood.stock() > 0;
	};

	Window_ShopBuy.prototype.drawItemDetails = function(good, rect) {
		var priceWidth = 96; var stockWidth = 96;
		this.drawItemName(good.item(), rect.x, rect.y, rect.width - priceWidth);
		this.drawText(good.stock(), rect.x + rect.width - priceWidth - stockWidth, rect.y, stockWidth, 'right');
		this.drawText(good.price(), rect.x + rect.width - priceWidth, rect.y, priceWidth, 'right');
	}

	/***************************************************************************/
	/* Bugfix for loading a saved game                                         */

	function isValidItem (good) {
		var item = good._item;
		return DataManager.isItem(item) ||
			DataManager.isWeapon(item) ||
			DataManager.isArmor(item);
	}

	function convertItem (good) {
		var item = good._item;
		if (item.atypeId) {
			var proper = $dataArmors[item.id];
        	good._item = proper;
        }
        else if (item.wtypeId) {
        	var proper = $dataWeapons[item.id];
        	good._item = proper;
        }
        else {
        	var proper = $dataItems[item.id];
        	good._item = proper;
        }
	}

	function checkGoodsForSave (goods) {
		if (goods.length > 0 && !isValidItem(goods[0])) {

			var len = goods.length;
			for (var i = 0; i < len; i++) {
				convertItem(goods[i]);
			}

		}
	}

	Shop.getShop = function(shopId) {  
		var shop = $gameSystem.getShop(shopId);
		checkGoodsForSave(shop._goods);
		return shop;
	};


})(NIA.ShopStock)