const booksSection = document.querySelector('.books');
const addDialog = document.querySelector('.add-dialog');
const showAddDialogBtn = document.querySelector('.show-add-dialog button')
const closeAddDialogBtn = document.querySelector('.add-dialog button');
const addBookForm = document.querySelector('.add-book-form');
const removeBookBtns = [];

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
    cardArticle.setAttribute('data-index', myLibrary.indexOf(book));

    let removeDiv = document.createElement('div');
    removeDiv.classList.add('remove');
    let removeBtn = document.createElement('button');
    removeBtn.textContent = 'X';
    removeBookBtns.push(removeBtn);
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
    addBookToLibrary("The 0", "J.R.R. Tolkien", 295, true, myLibrary.length);
    addBookToLibrary("The 1", "J.R.R. Tolkien", 295, true, myLibrary.length);
    addBookToLibrary("The 2", "J.R.R. Tolkien", 295, true, myLibrary.length);

    for (let book of myLibrary) {
        createBookCard(book);
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

    addBookToLibrary(titleValue, authorValue, pagesValue, readValue, myLibrary.length);
    createBookCard(myLibrary[myLibrary.length - 1]);

    addBookForm.reset();
    addDialog.close();
});

booksSection.addEventListener('click', (e) => {
    if (e.target.parentNode.classList.value !== 'remove') {
        return;
    }

    if (e.target.parentNode.parentNode.classList.value !== 'card') {
        return;
    }

    const bookChild = e.target.parentNode.parentNode;

    removeBook(bookChild);
});



function removeBook(bookChild) {
    //remove from the library array
    myLibrary.splice(bookChild.getAttribute('data-index'), 1);

    //remove from the DOM
    booksSection.removeChild(bookChild);   

    //reset data-index to match index of myLibrary
    let idx = 0;
    for (const child of booksSection.children) {
        child.setAttribute('data-index', idx)
        idx++;
    }

}
populateBookCards();