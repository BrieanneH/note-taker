const $noteTitle = $(".note-title");
const $noteText = $(".note-textarea");
const $saveNoteBtn = $(".save-note");
const $newNoteBtn = $(".new-note");
const $noteList = $(".list-container .list-group");

let activeNote ={};

let noteID = 1;

function getNotes(){
  return $.ajax({
    url: "/api/notes",
    method: "GET"
  });
}

function saveNote(note) {
    return $.ajax({
      url: "/api/notes",
      data: note,
      method: "POST"
    });
  }
  
  // A function for deleting a note from the db
  var deleteNote = function(id) {
    return $.ajax({
      url: "/api/notes/" + id,
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
  
  // Get datasave it to the db and display the data
  const handleNoteSave = function() {

    var newNote = {
      title: $noteTitle.val(),
      text: $noteText.val(),
      id: noteID
    };

    noteID++;
  
    saveNote(newNote).then(function(data) {
      console.log("saved");
      getAndRenderNotes();
      renderActiveNote();
    });
  };
  
  // Delete the clicked note
  const handleNoteDelete = function(event) {
    console.log("I clicked the delete button");
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
  const handleNoteView = function() {
    activeNote = $(this).data();
    renderActiveNote();
  };
//empty object and enter new not
const handleNewNoteView = function() {
  activeNote = {};
  renderActiveNote();
};

// if notes are empty hide the save button
// Or else display
const handleRenderSaveBtn = function() {
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

     var $li = $(`<li class='list-group-item' data-note='${note.id}'>`).data(
        note
     );
     var $span = $("<span>").text(note.title);
     var $delBtn = $(
        "<i class='fas fa-trash-alt float-right text-danger delete-note'>"
     );

     $li.append($span, $delBtn);
     noteListItems.push($li);
  }

  $noteList.append(noteListItems);
};

// Gets notes from the db display on sidebar
const getAndRenderNotes = function() {
  return getNotes().then(function(data) {
     console.log("rendered data successfully");
     renderNoteList(data);
  });
};

$saveNoteBtn.on("click", handleNoteSave);
$noteList.on("click", ".list-group-item", handleNoteView);
$newNoteBtn.on("click", handleNewNoteView);
$noteList.on("click", ".delete-note", handleNoteDelete);
$noteTitle.on("keyup", handleRenderSaveBtn);
$noteText.on("keyup", handleRenderSaveBtn);

// Gets and renders the initial list of notes
getAndRenderNotes();
