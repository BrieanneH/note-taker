const $noteTitle = $(".note-title");
const $noteText = $(".note-textarea");
const $saveNoteBtn = $(".save-note");
const $newNoteBtn = $(".new-note");
const $noteList = $(".list-container .list-group");

let activeNote ={};

//let noteID = 1;

//getting note from the db
//change to let to know it'll only be used in this block
let getNotes = function() {
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
  
  // Get data and save it to the db and display the data
  const handleNoteSave = function() {

    var newNote = {
      title: $noteTitle.val(),
      text: $noteText.val(),
      //id: noteID
    };

    
  
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

     var $li = $("<li class='list-group-item>").data( note)
       
     
     var $span = $("<span>").text(note.title);
     var $delBtn = $(
        "<i class='fas fa-trash-alt float-right text-danger delete-note'>"
     );

     $li.append($span, $delBtn);
     noteListItems.push($li);
  }

  $noteList.append(noteListItems);
};


$saveNoteBtn.on("click", handleNoteSave);
$noteList.on("click", ".list-group-item", handleNoteView);
$newNoteBtn.on("click", handleNewNoteView);
$noteList.on("click", ".delete-note", handleNoteDelete);
$noteTitle.on("keyup", handleRenderSaveBtn);
$noteText.on("keyup", handleRenderSaveBtn);


const activeNote={};

// Gets and renders the initial list of notes
var getNotes= function() {
  return $.ajax({
    url: "/api/notes",
    method: "GET"
  });
};

//saving
var saveNote = function(note){
  return$.ajax({
    url: "/api/notes",
    method: "POST"
  });
;}


//delete

var deleteNote=function(id){
  return $.ajax({
    url: "api/notes" + id,
    method: "DELETE"
  });
};

var renderActiveNote = function(){
  $saveNoteBtn.hide();
//show the note if active
  if (activeNote.id){
    $noteTitle.attr("readonly", true);
    $noteText.attr("readonly", true);
    $noteTitle.val(activeNote.title);
    $noteText.val(activeNote.text);
  }else{
    $noteTitle.attr("readonly", false);
    $noteText.attr("readonly", false);
    $noteTitle.val("");
    $noteText.val("");

  }
};

var handleNoteSave = function(){
  var newNote ={
    title: $noteTitle.val();
    text: $noteText.val()

  };

  saveNote(newNote).then(function(){
    getAndRenderNotes();
    renderActiveNote();
  }

  );
};


//delete selected note

var handleNoteDelete = function(){
  var note =$(this)
    .parent(".list-group-item")
    .data();

    if(activeNote.id=== note.id){
      activeNote ={};
    }

    deleteNote(note.id).then(fuction(){
      getAndRenderNotes();
      renderActiveNote();
    });

};




//display active note
var handleNewNoteView = function(){
  activeNote= $(this).data();
  renderActiveNote();
}



//
//change  current note to empty so the user can make a new note
if ($noteTitle.val().trim( || $noteText.val().trim()){
    $saveNoteBtn.show();
}
}


////bring back the note titles
var renderNoteList = function(notes) {
  $noteList.empt();


  var noteListItems = [];

  for (var i = 0; i < notes.length; i ++){
    var note = notes[i];

    var $li= $("<li class='list-group-item'>").data(note);
    var $span =$("<span>").text(note.title);
    var $delBtn = $( "<i class='fas fa-trash-alt float-right text-danger delete-note'>"

    );

    $li.append($span, $delBtn);
    noteListItems.push($li);
  }

  $noteList.append(noteListItems);
};


//bring note tot he sidebar for display

var getAndRenderNotes = function(){
  return getNotes().then(function(data){
    renderNoteList(data);
  });
};
$noteTitle.on("keyup", handleRenderSaveBtn);
$noteText.on("keyup", handleRenderSaveBtn);
$noteList.on("click", ".list-group-item", handleNewNoteView);
$noteList.on("click", ".delete-note", handleNoteDelete);
$newNoteBtn.on("click", handleNewNoteView);



getAndRenderNotes();