// document.addEventListener('DOMContentLoaded', function() {
//     const noteForm = document.getElementById('note-form');
//     const noteInput = document.getElementById('note-input');
//     const noteList = document.getElementById('note-list');

//     noteForm.addEventListener('submit', function(event) {
//         event.preventDefault();
//         const noteText = noteInput.value.trim();
//         if (noteText !== '') {
//             addNoteToList(noteText);
//             noteInput.value = '';
//         }
//     });

//     function addNoteToList(text) {
//         const note = createNoteElement(text);
//         noteList.appendChild(note);
//     }

//     function createNoteElement(text) {
//         const note = document.createElement('div');
//         note.classList.add('note');
//         note.innerHTML = `
//             <p>${text}</p>
//             <button class="delete-btn">Delete</button>
//         `;
//         const deleteBtn = note.querySelector('.delete-btn');
//         deleteBtn.addEventListener('click', function() {
//             note.remove();
//         });
//         return note;
//     }
// });


document.addEventListener('DOMContentLoaded', function() {
    const noteForm = document.getElementById('note-form');
    const noteInput = document.getElementById('note-input');
    const noteList = document.getElementById('note-list');

    // Load notes from local storage
    let notes = JSON.parse(localStorage.getItem('notes')) || [];

    renderNotes();

    noteForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const noteText = noteInput.value.trim();
        if (noteText !== '') {
            addNoteToList(noteText);
            noteInput.value = '';
        }
    });

    function addNoteToList(text) {
        notes.push(text);
        localStorage.setItem('notes', JSON.stringify(notes));
        renderNotes();
    }

    function renderNotes() {
        noteList.innerHTML = '';
        notes.forEach((note, index) => {
            const noteElement = createNoteElement(note, index);
            noteList.appendChild(noteElement);
        });
    }

    function createNoteElement(text, index) {
        const note = document.createElement('div');
        note.classList.add('note');
        note.innerHTML = `
            <p>${text}</p>
            <button class="delete-btn" data-index="${index}">Delete</button>
        `;
        const deleteBtn = note.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', function() {
            notes.splice(index, 1);
            localStorage.setItem('notes', JSON.stringify(notes));
            renderNotes();
        });
        return note;
    }
});
