const booksSection = document.querySelector('.books');
const addDialog = document.querySelector('.add-dialog');
const showAddDialogBtn = document.querySelector('.show-add-dialog')
const closeAddDialogBtn = document.querySelector('.add-dialog button');
const addBookForm = document.querySelector('.add-book-form');

const myLibrary = [];

function Book(title, author, pages, read, index) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.index = index;
    this.info = function() {
        if (!this.read) {
            return `${title} by ${author}, ${pages} pages, not read yet.`;
        }
        return `${title} by ${author}, ${pages} pages, has been read.`
    };
}

function addBookToLibrary(title, author, pages, read, index) {
    let newBook = new Book(title, author, pages, read, index);
    myLibrary.push(newBook);
}

// function createBookCard(book) {
//     let cardArticle = document.createElement('article');
//     cardArticle.classList.add('card');

//     //create top of book in article
//     let bookTopDiv = document.createElement('div');
//     bookTopDiv.classList.add('book-top');

//     let readDiv = document.createElement('div');
//     readDiv.classList.add('read');

//     if (book.read) {
//         readDiv.textContent = '✓';
//     }
//     else {
//         readDiv.textContent = '!';
//     }

//     let pagesDiv = document.createElement('div');
//     pagesDiv.classList.add('pages');
//     pagesDiv.textContent = book.pages.toString() + ' pp.';

//     bookTopDiv.appendChild(readDiv);
//     bookTopDiv.appendChild(pagesDiv);

//     //create bottom of book
//     let bookBottomHeader = document.createElement('header');
//     bookBottomHeader.classList.add('book-bottom');

//     let titleH3 = document.createElement('h3');
//     titleH3.textContent = book.title;

//     let authorSpan = document.createElement('span');
//     authorSpan.textContent = book.author;

//     bookBottomHeader.appendChild(titleH3);
//     bookBottomHeader.appendChild(authorSpan);

//     //now append top and bottom to article
//     cardArticle.appendChild(bookTopDiv);
//     cardArticle.appendChild(bookBottomHeader);

//     //attach article to books section
//     booksSection.appendChild(cardArticle);
// }

function createBookCard(book) {
    let cardArticle = document.createElement('article');
    cardArticle.classList.add('card');

    let removeDiv = document.createElement('div');
    removeDiv.classList.add('remove');
    let removeBtn = document.createElement('button');
    removeBtn.textContent = 'X';
    removeDiv.appendChild(removeBtn);

    //create top of book in article
    let bookInfoDiv = document.createElement('div');
    bookInfoDiv.classList.add('book-info');

    bookInfoDiv.textContent = book.info();

    cardArticle.appendChild(removeDiv);
    cardArticle.appendChild(bookInfoDiv);
    booksSection.appendChild(cardArticle);
}

function populateBookCards() {
    addBookToLibrary(new Book("The Hobbit", "J.R.R. Tolkien", 295, true));
    addBookToLibrary(new Book("The Hobbit", "J.R.R. Tolkien", 295, true));
    addBookToLibrary(new Book("The Hobbit", "J.R.R. Tolkien", 295, true));
    addBookToLibrary(new Book("The Hobbit", "J.R.R. Tolkien", 295, false));
    addBookToLibrary(new Book("The Hobbit", "J.R.R. Tolkien", 295, true));

    for (let book of myLibrary) {
        createBookCard(book.title, book.author, book.pages, book.read);
    }

    console.log(myLibrary[3]);
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

    addBookToLibrary(titleValue.toString(), authorValue.toString(), pagesValue.toString(), readValue, myLibrary.length);
    createBookCard(myLibrary[myLibrary.length - 1]);

    addBookForm.reset();
    addDialog.close();
});

populateBookCards();