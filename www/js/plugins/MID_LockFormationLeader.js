//-----------------------------------------------------------------------------
//  Midgardsormr's Lock Formation Leader MZ
//-----------------------------------------------------------------------------
//  For: RPGMAKER MZ
//  MID_LockFormationLeader.js
//-----------------------------------------------------------------------------
//  2021-02-02 - Version 1.0 - release
//-----------------------------------------------------------------------------
//  Terms: CC BY 4.0 license -  https://creativecommons.org/licenses/by/4.0/
//-----------------------------------------------------------------------------

var Imported = Imported || {};
Imported.MID_LockFormationLeader = true;

var MID = MID || {};        // MIDGARDSORMR's main object
MID.MID_LockFormationLeader = MID.MID_LockFormationLeader || {};

//-----------------------------------------------------------------------------
/*:
 * @plugindesc (v.1.0) Locks the first Actor in the formation (it cannot be swapped or replaced).
 * @target MZ
 * @author Midgardsormr
 * ----------------------------------------------------------------------------
 */
 
 // ALIAS
 MID.MID_LockFormationLeader.gactor_isFormationChangeOk = Game_Actor.prototype.isFormationChangeOk;
 
 Game_Actor.prototype.isFormationChangeOk = function() {
    return this.index() != 0 && MID.MID_LockFormationLeader.gactor_isFormationChangeOk();
};