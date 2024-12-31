//=============================================================================
// NoteFieldsFromJS.js
//=============================================================================

/*:
 * @plugindesc Load note field contents from Javascript.
 * @author ItsMeJohnC
 * @version 1.2
 * @help
 * 
 * Place this in your load order after any plugins that modify how data is 
 * loaded from json files.
 * 
 * Place a metadata tag in a note field in the format: <JSNote:functionName>
 * where functionName is the name of a javascript function that returns a
 * string.
 * 
 * You may also include a parameters tag: <JSNoteParams:param1,param2>
 * where param1,...paramN is a comma-separated list of parameters to pass to
 * the function as strings. For strings with commas, use a slash (\).
 * Ex: Hello\, world! = "Hello, World!" (1 parameter)
 *     Hello, world!  = ["Hello", " world!"] (2 parameters).
 * 
 * When data is loaded, if the JSNote tag is present, the plugin will call
 * the function and pass the parameters if the JSNoteParamS tag is also there.
 * The return value of the function will then be re-parsed as if it were in
 * the notes field originally. This will throw away any other content from the
 * field so don't put other tags and other things your game will need at runtime.
 * All of that should be returned from the referenced Javascript function.
 * 
 * The re-parse will use whatever the default logic is from the base scripts or
 * from the next highest plugin with note field logic above this one. For
 * example if you are using Yanfly scripts, you can include Lunatic Mode tags
 * and so on inyour Javascript-defined notes and they will still work. Also, if
 * for some reason you include another <JSNote> tag it has no chance of
 * re-parsing in an infinite loop.
 * 
 * The original note field as seen in the database UI will be preserved in a
 * note2 property. For example:
 *   // get the original note text of Actor 1
 *   $dataActors[1].note2 
*/

// Compatability support
var Imported = Imported || {};

var NFJS = NFJS || {};
NFJS.Util = NFJS.Util || {};
NFJS.Overrides = NFJS.Overrides || {};

NFJS.JSNotesDone = false;

NFJS.Util.MergeArrOnEscapeEnd = function(arr, end, separator) {
    if (arr.length < 2) {
        return arr;
    }

    var res = [];
    var j;
    for (var i=0; i < arr.length; i++) {
        if (arr[i].endsWith(end) && i < arr.length - 1) {
            res.push(arr[i].slice(0, -1*end.length) + separator + arr[i+1]);

            i++;
            if (i == arr.length - 1) {
                return res;
            }

            j = res.length - 1;
            while(res[j].endsWith(end)) {
                res[j] = res[j].slice(0, -1*end.length) + separator + arr[i+1];
                i++;
                if (i == arr.length - 1) {
                    return res;
                }
            }
        }
        else {
            res.push(arr[i]);
        }
    }
    return res;
}


NFJS.Overrides.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
    var isLoaded = NFJS.Overrides.DataManager_isDatabaseLoaded.apply(this, arguments);
    if (!NFJS.JSNotesDone && isLoaded) {
        if (Imported.Eli_DataBaseOrganizer) {
            // compatability for Eli's database organizer
            // this will construct the global $gameTemp object twice... very gross but probably doesn't matter
            // we can patch Eli's Game_Temp.prototype.initialize function to support an option if we really need to
            $gameTemp = new Game_Temp();
        }
        NFJS.ProcessJSNotes();
        NFJS.JSNotesDone = true;
    }

    return isLoaded;
}

NFJS.ProcessJSNotes = function() {
    var dataFiles = DataManager._databaseFiles
    for (var i = 0; i < dataFiles.length; i++) {
        var dataName = dataFiles[i].name;
        
        // Compatability for yanfly's doodads
        if (dataName === "$dataDoodads") continue;

        for (var j = 1; j < window[dataName].length; j++) {

            if (window[dataName][j].meta && window[dataName][j].meta.JSNote) {
                var noteFunc = eval(window[dataName][j].meta.JSNote);
                if (typeof noteFunc !== "function") {
                    // if we can't call noteFunc, short circuit
                    continue;
                }

                var args = [];
                if (window[dataName][j].meta.JSNoteParams) {
                    args = window[dataName][j].meta.JSNoteParams.split(",");
                    args = NFJS.Util.MergeArrOnEscapeEnd(args, "\\", ",");
                }

                window[dataName][j].note2 = window[dataName][j].note;
                window[dataName][j].note = noteFunc.apply(this, args);
                window[dataName][j].meta = {};
                DataManager.extractMetadata(window[dataName][j]);
            }

        }
    }
}