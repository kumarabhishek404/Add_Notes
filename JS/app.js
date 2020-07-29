console.log('Project 1 APP Notes')
showNotes();
// If user adds a notes, add it to the local storage
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function(e){
    let addText = document.getElementById('addText');
    let notes = localStorage.getItem('notes')
    if(notes ==  null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    notesObj.push(addText.value)
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addText.value = "";
    showNotes();
}) 


// Function to show element from local storage
function showNotes(){
    let notes = localStorage.getItem('notes')
    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function(element, index){
        html += `
        <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
        <div class="card-body">
        <h5 class="card-title"></h5>
        <p class="card-text">${element}</p>
        <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
        </div>
        </div>
        `
    });
    let notesElm = document.getElementById("notes");
    if(notesObj.length != 0){
        notesElm.innerHTML = html;
    }
    else{
        notesElm.innerHTML = `Nothing to show in notes use "Add Notes" to add notes.`
    }
}

// Function to a delete element from local storage
function deleteNote(index){
    let notes = localStorage.getItem('notes')
    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index,1);
    localStorage.setItem("notes", JSON.stringify(notesObj)); // Updating the local storage
    showNotes(); // showing the note

}

// Function for searching note
let search = document.getElementById('searchTxt');
search.addEventListener("input", function(){
    let inputVal = search.value.toLowerCase();
    let cardNote = document.getElementsByClassName("noteCard");
    Array.from(cardNote).forEach(function(element){
        let cardTxt = element.getElementsByTagName('p')[0].innerText; // Taking only inner Text
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }else{
            element.style.display = "none";
        }

    })
})