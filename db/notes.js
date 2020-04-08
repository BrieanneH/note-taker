const util = require("util");
const fs = require("fs");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Notes{
    constructor(){
        this.idDum = 0;
    }
    read(){
        return readFileAsync("db/db.json", "utf8");

    }

    write(note){
        return writeFileAsync("db.db.json", "utf8");
    }
    getNotes(){
        console.log("getting notes")
        return this.read().then(notes =>{
            console.log(notes)
            let notesArray;
            try {
                notesArray = [].contact(JSON.parse(notes));
            }
            catch(err) {
                notesArray =[];
            }
            return notesArray;
            
        })
    }
    //get all notes, add, write, and return back
    addNotes(note) {
        console.log("add notes");
        const {title, text} = note;
        const newNote = {title, text, id: ++thisidDum}
        return this.getNotes()
            .then(notes => [...notes, newNote])
            .then(updateNotes => this.write(updateNotes))
            .then(()=> newNote)
    }
//get all notes and delete the note with specific id
    removeNote(id){
        console.log("remove notes");
        return this.getNotes()
        .then(notes => notes.filter(note => note.id !== parseInt(id)))
        .then(updateNotes=> this.write(updateNotes))
    }
}
    module.exports = new Notes;
