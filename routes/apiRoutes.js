//linking the route to the JSON data
const router =require("express").Router()
const fs =require("fs")
let notes = []

module.exports = function (app) {


    router.get("/api/notes", (req, res) => {
        fs.readFile("db/db.json", function(err,data){
            notes = JSON.parse(data)
            console.log(notes)
            return res.json(notes);
        })
        
    });

//add new items to api
    router.post("/api/notes", function (req, res) {

        let newNote = req.body;
        console.log("newNote", newNote)
        let id =1
        if(notes.length !==0){
         id = notes[notes.length -1] + 1
         }

         newNote= {id,...newNote}
         notes.push(newNote);

        fs.writeFile('db/db.json', JSON.stringify(notes), (err)=>{
            console.log('note completed!')

            res.json(newNote);
        })
       
    });


//deleting items when icon is pressed
    router.delete("/api/notes/:id", function (req, res) {
        let id =parseInt(req.params.id)
        console.log("deleted id", id);
        let info = notes.filter(element => element.id !==id)

        console.log(temp)
        notes = info
        fs.writeFile('db/db.json',JSON.stringify(notes), (err)=>{
            console.log('success')
            res.json(notes);

        })

        router.put("/api/notes/:id",function(req, res){
            cosole.log(req.params)
            let id = parseInt(req.params.id)

            let info = notes.map(element =>{
                if (element.id === id){
                    element.title = req.body.title;
                    element.text = req.body.text
                }
                return element
            })

            cosole.log(info)
            notes = info

            fs.writeFile('db/db.json', JSON.stringify(notes), (err)=>{
                console.log('note succesfully written')
                res.json(notes);
            })



        });


    });

};

module.exports = router 