var $noteTitle = $(".note-title");
var $noteText = $(".note-textarea");
var $saveNoteBtn = $(".save-note");
var $newNoteBtn = $(".new-note");
var $noteList = $(".list-container .list-group");

var activeNote ={};

var getNotes = function(){
  return $.ajax({
    url:"/api/notes",
    method: "GET"
  });
};

var saveNote = function(note) {
    return $.ajax({
      url: "/api/notes",
      data: note,
      method: "POST"
    });
  };
  
  // A function for deleting a note from the db
  var deleteNote = function(id) {
    return $.ajax({
      url: "/api/notes/" + id,
      method: "DELETE"
    });
  };
  
  // If there is an activeNote, display it, otherwise render empty inputs
  var renderActiveNote = function() {
    $saveNoteBtn.hide();

    
    if (activeNote.id) {
      $noteTitle.attr("readonly", true);
      $noteText.attr("readonly", true);
      $noteTitle.val(activeNote.title);
      $noteText.val(activeNote.text);
    } else {
      $noteTitle.attr("readonly", false);
      $noteText.attr("readonly", false);
      $noteTitle.val("");
      $noteText.val("");
    }
  };
  
  // Get datasave it to the db and display the data
  var handleNoteSave = function() {
    var newNote = {
      title: $noteTitle.val(),
      text: $noteText.val()
    };
  
    saveNote(newNote).then(function(data) {
      getAndRenderNotes();
      renderActiveNote();
    });
  };
  
  // Delete the clicked note
  var handleNoteDelete = function(event) {
    console.log("I clicked the delete button");
    // prevents the click listener for the list from being called when the button inside of it is clicked
    event.stopPropagation();
  
    var note = $(this)
      .parent(".list-group-item")
      .data();
  
      console.log(note);
    
  
    
  
    deleteNote(note.id).then(function() {
      getAndRenderNotes();
      renderActiveNote();
    });
  };
  
  // Sets the note and displays it
  var handleNoteView = function() {
    activeNote = $(this).data();
    renderActiveNote();
  };
  
  // empty object 
  var handleNewNoteView = function() {
    activeNote = {};
    renderActiveNote();
  };
  
  // If/else for hiding the save button
  
  var handleRenderSaveBtn = function() {
    if (!$noteTitle.val().trim() || !$noteText.val().trim()) {
      $saveNoteBtn.hide();
    } else {
      $saveNoteBtn.show();
    }
  };
  
  // list of note titles
  var renderNoteList = function(notes) {
    $noteList.empty();
  
    var noteListItems = [];
  
    for (var i = 0; i < notes.length; i++) {
      var note = notes[i];
  
      var $li = $("<li class='list-group-item'>").data(note);
      var $span = $("<span>").text(note.title);
      var $delBtn = $(
        "<i class='fas fa-trash-alt float-right text-danger delete-note'>"
      );
  
      $li.append($span, $delBtn);
      noteListItems.push($li);
    }
  
    $noteList.append(noteListItems);
  };
  
  // Gets notes from the db and displayes
  var getAndRenderNotes = function() {
    return getNotes().then(function(data) {
      renderNoteList(data);
    });
  };
  
  $saveNoteBtn.on("click", handleNoteSave);
  $noteList.on("click", ".list-group-item", handleNoteView);
  $newNoteBtn.on("click", handleNewNoteView);
  $noteList.on("click", ".delete-note", handleNoteDelete);
  $noteTitle.on("keyup", handleRenderSaveBtn);
  $noteText.on("keyup", handleRenderSaveBtn);
  
  // Gets and renders notes
  getAndRenderNotes();