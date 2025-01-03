const booksSection = document.querySelector('.books');
const addDialog = document.querySelector('.add-dialog');
const showAddDialogBtn = document.querySelector('.show-add-dialog button')
const closeAddDialogBtn = document.querySelector('.add-dialog button');
const addBookForm = document.querySelector('.add-book-form');

const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return this.read ? `${title} by ${author}, ${pages} pages, has been read.` : 
            `${title} by ${author}, ${pages} pages, not read yet.`;
    };
}

Book.prototype.changeReadStatus = function () {
    this.read = !this.read;
}

function addBookToLibrary(title, author, pages, read) {
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

// function createBookCard(book) {
//     const cardArticle = document.createElement('article');
//     cardArticle.classList.add('card');
//     cardArticle.setAttribute('data-index', myLibrary.indexOf(book));

//     //create top with buttons
//     const bookButtonsDiv = document.createElement('div');
//     bookButtonsDiv.classList.add('book-buttons');

//     const readDiv = document.createElement('div');
//     readDiv.classList.add('read');

//     const removeDiv = document.createElement('div');
//     removeDiv.classList.add('remove');
//     const removeBtn = document.createElement('button');
//     removeBtn.textContent = 'X';
//     removeDiv.appendChild(removeBtn);

//     if (book.read) {
//         readDiv.textContent = '✓';
//     }
//     else {
//         readDiv.textContent = '!';
//     }

//     bookButtonsDiv.appendChild(readDiv);
//     bookButtonsDiv.appendChild(removeDiv);

//     //create book info section
//     const bookInfoDiv = document.createElement('div');
//     bookInfoDiv.classList.add('book-info');

//     const titleDiv = document.createElement('div');
//     titleDiv.classList.add('title');
//     titleDiv.textContent = book.title;

//     const authorDiv = document.createElement('div');
//     authorDiv.classList.add('author');
//     authorDiv.textContent = book.author;

//     const pagesDiv = document.createElement('div');
//     pagesDiv.classList.add('pages');
//     pagesDiv.textContent = book.pages.toString() + ' pp.';

//     bookInfoDiv.appendChild(titleDiv);
//     bookInfoDiv.appendChild(authorDiv);
//     bookInfoDiv.appendChild(pagesDiv);

//     //now append top and bottom to article
//     cardArticle.appendChild(bookButtonsDiv);
//     cardArticle.appendChild(bookInfoDiv);

//     //attach article to books section
//     booksSection.appendChild(cardArticle);
// }

function createBookCard(book) {
    let cardArticle = document.createElement('article');
    cardArticle.classList.add('card');
    cardArticle.setAttribute('data-index', myLibrary.indexOf(book));

    let buttonContainerDiv = document.createElement('div');
    buttonContainerDiv.classList.add('buttons');

    let readDiv = document.createElement('div');
    readDiv.classList.add('read-container');
    let readLabel = document.createElement('label');
    let readInput = document.createElement('input');
    readInput.type = 'checkbox';
    readInput.id = 'read';
    readInput.name = 'read';
    let readSpan = document.createElement('span');
    readSpan.classList.add('slider');

    readInput.checked = book.read;
    readInput.addEventListener('change', handleReadStatus);

    readLabel.appendChild(readInput);
    readLabel.appendChild(readSpan);
    readDiv.appendChild(readLabel);

    let removeDiv = document.createElement('div');
    removeDiv.classList.add('remove');
    let removeBtn = document.createElement('button');
    removeBtn.textContent = 'X';
    removeBtn.addEventListener('click', handleRemoveBook);
    removeDiv.appendChild(removeBtn);

    buttonContainerDiv.appendChild(readDiv);
    buttonContainerDiv.appendChild(removeDiv);

    let bookInfoDiv = document.createElement('div');
    bookInfoDiv.classList.add('book-info');

    bookInfoDiv.textContent = book.info();

    cardArticle.appendChild(buttonContainerDiv);
    cardArticle.appendChild(bookInfoDiv);
    booksSection.appendChild(cardArticle);
}

function populateBookCards() {
    addBookToLibrary("The 0", "J.R.R. Tolkien", 295, true);
    addBookToLibrary("The 1", "J.R.R. Tolkien", 295, false);
    addBookToLibrary("The 2", "J.R.R. Tolkien", 295, true);
    addBookToLibrary("The 1", "J.R.R. Tolkien", 295, false);

    for (let book of myLibrary) {
        createBookCard(book);
    }
}

showAddDialogBtn.addEventListener('click', () => {
    addDialog.showModal();
});

closeAddDialogBtn.addEventListener('click', () => {
    addDialog.close();
});

addBookForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const titleValue = addBookForm.querySelector('#title').value;
    const authorValue =addBookForm.querySelector('#author').value;
    const pagesValue =addBookForm.querySelector('#pages').value;
    
    if (addBookForm.querySelector('#has-read').value) {
        addBookToLibrary(titleValue, authorValue, pagesValue, true);
    }
    else {
        addBookToLibrary(titleValue, authorValue, pagesValue, false);
    }

    createBookCard(myLibrary[myLibrary.length - 1]);

    addBookForm.reset();
    addDialog.close();
});

function handleReadStatus(event) {
    console.log(event.target.closest('.card'));

    const book = event.target.closest('.card');
    myLibrary.at(book.getAttribute('data-index')).changeReadStatus();

    updateBookCard(book);
}

function updateBookCard(book) {
    book.lastChild.textContent = myLibrary[book.getAttribute('data-index')].info();
}

function handleRemoveBook(event) {
    const book = event.target.closest('.card');

    //remove from the library array
    myLibrary.splice(book.getAttribute('data-index'), 1);

    //remove from the DOM
    booksSection.removeChild(book);   

    //reset data-index to match index of myLibrary
    let idx = 0;
    for (const child of booksSection.children) {
        child.setAttribute('data-index', idx)
        idx++;
    }
}

populateBookCards();