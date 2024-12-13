const booksSection = document.querySelector('.books');
const addDialog = document.querySelector('.add-dialog');
const showAddDialogBtn = document.querySelector('.show-add-dialog')
const closeAddDialogBtn = document.querySelector('.add-dialog button');
const addBookForm = document.querySelector('.add-book-form');

const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        if (!this.read) {
            return `${title} by ${author}, ${pages} pages, not read yet.`;
        }
        return `${title} by ${author}, ${pages} pages, has been read.`
    };
}

function addBookToLibrary(title, author, pages, read) {
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

function createBookCard(book) {
    let cardArticle = document.createElement('article');
    cardArticle.classList.add('card');

    //create top of book in article
    let bookTopDiv = document.createElement('div');
    bookTopDiv.classList.add('book-top');

    let readDiv = document.createElement('div');
    readDiv.classList.add('read');

    if (book.read) {
        readDiv.textContent = '✓';
    }
    else {
        readDiv.textContent = '!';
    }

    let pagesDiv = document.createElement('div');
    pagesDiv.classList.add('pages');
    pagesDiv.textContent = book.pages.toString() + ' pp.';

    bookTopDiv.appendChild(readDiv);
    bookTopDiv.appendChild(pagesDiv);

    //create bottom of book
    let bookBottomHeader = document.createElement('header');
    bookBottomHeader.classList.add('book-bottom');

    let titleH3 = document.createElement('h3');
    titleH3.textContent = book.title;

    let authorSpan = document.createElement('span');
    authorSpan.textContent = book.author;

    bookBottomHeader.appendChild(titleH3);
    bookBottomHeader.appendChild(authorSpan);

    //now append top and bottom to article
    cardArticle.appendChild(bookTopDiv);
    cardArticle.appendChild(bookBottomHeader);

    //attach article to books section
    booksSection.appendChild(cardArticle);
}

//gonna have a button that you click to show the form
//it'll show up in the center and then the user fills in the details
//separate button to add the book

function populateBookCards() {

    for (let book of myLibrary) {
        createBookCard(book.title, book.author, book.pages, book.read);
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
    let readValue;
    if (addBookForm.querySelector('#has-read').value) {
        readValue = true;
    }
    else {
        readValue = false;
    }

    addBookToLibrary(titleValue.toString(), authorValue.toString(), pagesValue.toString(), readValue);
    createBookCard(myLibrary[myLibrary.length - 1]);

    addBookForm.reset();
    addDialog.close();
});