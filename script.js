//  All Constants and variables USed in Project 
const addNotebtn = document.querySelector("#addNote");
const note = document.querySelector("#note");
const save = document.querySelector('.save');
const delet = document.querySelector('.delete');
const main = document.querySelector('#main');
const iconBar = document.querySelector('.note_top');


addNotebtn.addEventListener("click", function (event) {
    addNote();
})
//  Save Notes function 
const saveNote = () => {
    const Notes = document.querySelectorAll('.note textarea');
    const data = [];
    Notes.forEach(
        (note) => {
            data.push(note.value);
        }
    )
    if (data.length == 0) {
        localStorage.removeItem("Notes");
    }
    else {
        localStorage.setItem("Notes", JSON.stringify(data));
    }

}
//   Add Notes Function 
const addNote = (text = "") => {
    const newNote = document.createElement('div');
    newNote.classList.toggle('note');
    newNote.innerHTML = `
            <div class="note_top">
                <i class="save fa-regular fa-floppy-disk" style="color: #ffffff;"></i>
                <i class="delete fa-regular fa-trash-can" style="color: #ffffff;"></i>
            </div>
            <textarea>${text}</textarea>   
    `

    newNote.querySelector('.delete').addEventListener("click", function () {
        newNote.remove();
        saveNote();
    })

    newNote.querySelector('.save').addEventListener("click", function () {
        saveNote();
    })
    newNote.querySelector('textarea').addEventListener("focusout", function () {
        saveNote();
    })

    main.appendChild(newNote);
    saveNote();
}
//  Self Calling Function  
(
    function () {
        const lsNotes = JSON.parse(localStorage.getItem("Notes"));
        if (lsNotes == null) {
            addNote();
        }
        else {
            lsNotes.forEach(
                (lsNote) => {
                    addNote(lsNote);
                }
            )

        }

    }
)()