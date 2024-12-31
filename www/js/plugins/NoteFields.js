//=============================================================================
// NoteFields.js
//=============================================================================

/*:
 * @plugindesc A plugin to hold note field-referenced functions.
 * @author ItsMeJohnC
 * 
 * @help
 * 
 * This is a template plugin to show how you might organize code for use with my
 * NoteFieldsFromJS plugin.
*/

var NoteFields = NoteFields || {};

NoteFields.ExampleNote = function() {
    return `
This is a formatted string. Everything inside including line breaks,
spaces, and special characters will be treated as if you had
written it into the note field.

As long as the referenced function returns a string, you will be able
to replace your notes with whatever you want.

If you wanted to put this text into a note field, you would add a
tag that looked like this:
<JSNote:NoteFields.ExampleNote>
`;

    // To use this text in a note field, use a tag like this:
    // <JSNote:NoteFields.ExampleNote>

}

NoteFields.ExampleNoteWithParams = function(param1, param2) {
    // Formatted strings also let you insert variables or any other Javascript code. 
    return `My dynamic parameter note: ${param1} ${param2.toUpperCase()}`;

    // To use this text in a note field, add tags like this:
    // <JSNote:NoteFields.ExampleNoteWithParams>
    // <JSNoteParams:Hello,World!>
}

// To create new note text functions, simply copy down one of the functions above and replace
// the name after NoteFields, and the text inside the `backticks` as needed.
// Also, be sure to turn on this plugin in your game, or your note fields will not
// be able to load from this file.