/*:
 * @plugindesc [1.0] A set of fixes for Core plugins by Yanfly.
 * Place under YEP_BattleEngineCore.js
 * @author Kemezryp, Caethyril
 *
 * @param Optimize Target Selection
 * @desc [CoreEngine] Use .setBlendColor() instead of .startEffect() when targetting enemies. Improves performance.
 * @type boolean
 * @default true
 *
 * @param Cannot Move States Fix
 * @desc [BattleEngine] Fixes 'Cannot Move' states not counting down if set on Action End.
 * @type boolean
 * @default true
 *
 * @param Front View Delay Fix
 * @desc [BattleEngine] Fixes animation delays caused by the side-view oriented action sequences. Disable if side-view.
 * @type boolean
 * @default true
 *
 * @param Reimplement Enemy Animation
 * @desc [BattleEngine] Enable white blink and attack sound when enemy is attacking, like in default front-view.
 * @type boolean
 * @default true
 *
 * @help
 * ============================================================================
 * Description
 * ============================================================================
 * Battle Engine Core by Yanfly is an amazing, essential tool, but it's been
 * made mostly with the side-view battles in mind. This plugin fixes
 * any shortcomings for front-view enjoyers, as well as (currently one)
 * unintended bugs that were left in the code.
 * 
 * This plugin works by conditional overwritting of existing functions, so it's
 * going to work only under YEP_BattleEngineCore.js and any other plugin that
 * tries to overwrite specific functions. If there's a compabiltiy issue you
 * can't fix, I'll be glad to help! :D
 *
 * ============================================================================
 * Fixes
 * ============================================================================
 *
 *  - Optimize Target Selection -
 * The 'whiten' function is usually used to indicate the enemy is about to make
 * a move; it's a blink. Using it as a constant whitening of an object makes it
 * really laggy, especially if your enemy sprite is big.
 * Updating NW.js reduced this lag to none, but optimization never hurts! :) 
 *
 *  - Cannot Move States Fix -
 * When making a stun state, it's important to make it last a specific amount
 * of turns. Setting it to Turn End would cause it to restrict a battler
 * an additional turn if applied before their move in a turn. This option
 * fixes the Action End timing for movement restriction states!
 *
 * - Front View Delay Fix -
 * Battle Engine Core has built-in action sequences. The default sequences will
 * always take the time to play step animations, even if they're visible only
 * in side-view. Because of that, front-view feels slow. This option Removes
 * the delays and the enemy attack sound because of its bad timing.
 *
 * - Reimplement Enemy Animation -
 * By default, enemies will blink and make a sound before using a skill.
 * Battle Engine removes this for the sake of side-view battles. This option
 * adds them back with fixed, default timing.
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 * These fixes are just simple edits. Credits are nice but not required. :)
 * If you decide to give me credits, remember to include Caethyril as well!
 *
 */

var Keme = Keme || {};
Imported.KEME_BattleEngineFix = true;

Keme.Parameters = PluginManager.parameters('KEME_BattleEngineFix');
Keme.Param = Keme.Param || {};

Keme.Param.OptimizeSelection = eval(Keme.Parameters['Optimize Target Selection']);
Keme.Param.CannotMoveFix = eval(Keme.Parameters['Cannot Move States Fix']);
Keme.Param.FrontViewFix = eval(Keme.Parameters['Front View Delay Fix']);
Keme.Param.EnemyAttackAnimation = eval(Keme.Parameters['Reimplement Enemy Animation']);

// === Optimize Target Selection (by Kemezryp) ===

if(Keme.Param.OptimizeSelection && Imported.YEP_CoreEngine && !Yanfly.Param.FlashTarget) {
Sprite_Battler.prototype.updateSelectionEffect = function() {
    if (this._battler.isActor()) {
      Yanfly.Core.Sprite_Battler_updateSelectionEffect.call(this);
    } else {
      if (this._battler.isSelected()) {
      	this.setBlendColor([255, 255, 255, 64]);
      }	else {
      	this.setBlendColor([0, 0, 0, 0]);
      }
    }
};
};

// === Cannot Move States Fix (by caethyril) ===

if(Keme.Param.CannotMoveFix && Imported.YEP_BattleEngineCore) {
_Game_Battler_onAllActionsEnd = Game_Battler.prototype.onAllActionsEnd;
Game_Battler.prototype.onAllActionsEnd = function() {
    _Game_Battler_onAllActionsEnd.call(this);
    this.updateStateActionEnd();
};
};

// === Front View Delay Fix (by Kemezryp) ===

if(Keme.Param.FrontViewFix && Imported.YEP_BattleEngineCore) {
Yanfly.BEC.DefaultActionSetup = [
    ['CLEAR BATTLE LOG'],
    ['PERFORM START'],
    ['DISPLAY ACTION'],
    ['IMMORTAL', ['TARGETS', 'TRUE']],
    ['CAST ANIMATION'],

];
Yanfly.BEC.DefaultActionWhole = [
    //['PERFORM ACTION'],
];
Yanfly.BEC.DefaultActionTarget = [
    //['PERFORM ACTION'],
];
Yanfly.BEC.DefaultActionWhole.push(['ACTION ANIMATION']);
Yanfly.BEC.DefaultActionWhole.push(['WAIT FOR ANIMATION']);
Yanfly.BEC.DefaultActionTarget.push(['ACTION ANIMATION']);
Yanfly.BEC.DefaultActionTarget.push(['WAIT FOR ANIMATION']);

//sound fix
Window_BattleLog.prototype.showEnemyAttackAnimation =
function(subject, targets) {
    if ($gameSystem.isSideView()) {
      this.showNormalAnimation(targets, subject.attackAnimationId(), false);
    } else {
      this.showNormalAnimation(targets, subject.attackAnimationId(), false);
    }
};
};

// === Reimplement Enemy Animation ===

if(Keme.Param.EnemyAttackAnimation && Imported.YEP_BattleEngineCore) {
Game_Enemy.prototype.performActionStart = function(action) {
    Game_Battler.prototype.performActionStart.call(this, action);
    SoundManager.playEnemyAttack();
    this.requestEffect('whiten');
};
};

//end