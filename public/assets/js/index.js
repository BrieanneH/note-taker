const $noteTitle = $(".note-title");
const $noteText = $(".note-textarea");
const $saveNoteBtn = $(".save-note");
const $newNoteBtn = $(".new-note");
const $noteList = $(".list-container .list-group");

let activeNote ={};

//let noteID = 1;

//getting note from the db

var getNotes = function() {
  return $.ajax({
    url: "/api/notes",
    method: "GET"
  });
}
//saving said note
var saveNote = function(note) {
     
        return $.ajax({
          url: "/api/notes" ,
          data: note,
          method: "POST"


      });
    
};

  
  // A function for deleting a note from the db
  var deleteNote = function(id) {
    return $.ajax({
      url: "api/notes/" + id,
      method: "DELETE"
    });
  };
  
  //display activeNote or render empty inputs
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
  
  // Get data and save it to the db and display the data
  var handleNoteSave = function() {

    var newNote = {
      title: $noteTitle.val(),
      text: $noteText.val()
      //id: noteID
    };

    
  
    saveNote(newNote).then(function(data) {
    
      getAndRenderNotes();
      renderActiveNote();
       console.log("saved");
     
    });
  };
  
  // Delete the clicked note
  var handleNoteDelete = function(event) {
    console.log("delete button clicked");
    // prevents the listener for the list from being called
    event.stopPropagation();
  
    var note = $(this)
      .parent(".list-group-item")
      .data();
  
      console.log(note);


      if (activeNote.id === note.id) {
        activeNote = {};
      }
    
  
    
  
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
//empty object and enter new not
var handleNewNoteView = function() {
  activeNote = {};
  renderActiveNote();
};

// if notes are empty hide the save button
// Or else display
var handleRenderSaveBtn = function() {
  if (!$noteTitle.val().trim() || !$noteText.val().trim()) {
     $saveNoteBtn.hide();
  } else {
     $saveNoteBtn.show();
  }
};

// Render's the list of note titles
const renderNoteList = function(notes) {
  $noteList.empty();

  var noteListItems = [];

  for (var i = 0; i < notes.length; i++) {
     var note = notes[i];

     var $li = $("<li class='list-group-item'>").data( note);
       
     
     var $span = $("<span>").text(note.title);
     var $delBtn = $(
        "<i class='fas fa-trash-alt float-right text-danger delete-note'>");
     

     $li.append($span, $delBtn);
     noteListItems.push($li);
  }

  $noteList.append(noteListItems);
};
 var getAndRenderNotes = function(){
   return getNotes().then(function(data){
     renderNoteList(data);
   });
 };

 $noteTitle.on("keyup", handleRenderSaveBtn);
 $noteText.on("keyup", handleRenderSaveBtn);
 $noteList.on("click", ".list-group-item", handleNoteView);
 $noteList.on("click", ".delete-note", handleNoteDelete);
 $newNoteBtn.on("click", handleNewNoteView);
 $saveNoteBtn.on("click", handleNoteSave);

getAndRenderNotes();