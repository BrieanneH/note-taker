var $noteTitle = $(".note-title");
var $noteText = $(".note-textarea");
var $saveNoteBtn = $(".save-note");
var $newNoteBtn = $(".new-note");
var $noteList = $(".list-container .list-group");

// activeNote is used to keep track of the note in the textarea
var activeNote = {};

// A function for getting all notes from the db
var getNotes = function() {
    return $.ajax({
        url: "/api/notes",
        method: "GET"
    });
  
};

// A function for saving a note to the db
var saveNote = function(note) {
  return $.ajax({
      url: "/api/notes",
      data: note,
      method: "POST"
  })
};

// A function for deleting a note from the db
var deleteNote = function(title) {
    return $.ajax({
        url: "api/notes/"
    })
  
};

// If there is an activeNote, display it, otherwise render empty inputs
var renderActiveNote = function() {
  
};

// Get the note data from the inputs, save it to the db and update the view
var handleNoteSave = function() {
  
};

// Delete the clicked note
var handleNoteDelete = function(event) {
  
};

// Sets the activeNote and displays it
var handleNoteView = function() {
  
};

// Sets the activeNote to and empty object and allows the user to enter a new note
var handleNewNoteView = function() {
  
};

// If a note's title or text are empty, hide the save button
// Or else show it
var handleRenderSaveBtn = function() {
  
};

// Render's the list of note titles
var renderNoteList = function(notes) {
  
};