const booksSection = document.querySelector('.books');
const addDialog = document.querySelector('.add-dialog');
const showAddDialogBtn = document.querySelector('.show-add-dialog button')
const closeAddDialogBtn = document.querySelector('.add-dialog button');
const addBookForm = document.querySelector('.add-book-form');

const myLibrary = [];

class Book {
    constructor(title, author, pages, read) {       
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    info = () => {
        return this.read ? `${this.title} by ${this.author}, ${this.pages} pages, has been read.` : 
            `${this.title} by ${this.author}, ${this.pages} pages, not read yet.`;
    }
}

Book.prototype.changeReadStatus = function () {
    this.read = !this.read;
}

function addBookToLibrary(book) {
    if (!(book instanceof Book)) {
        return;
    }
    
    myLibrary.push(book);
}

function createBookCard(book) {
    const cardArticle = document.createElement('article');
    cardArticle.classList.add('card');
    cardArticle.setAttribute('data-index', myLibrary.indexOf(book));

    const buttonContainerDiv = document.createElement('div');
    buttonContainerDiv.classList.add('buttons');

    const readDiv = document.createElement('div');
    readDiv.classList.add('read-container');
    const readLabel = document.createElement('label');
    const readInput = document.createElement('input');
    readInput.type = 'checkbox';
    readInput.id = 'read';
    readInput.name = 'read';
    const readSpan = document.createElement('span');
    readSpan.classList.add('slider');

    readInput.checked = book.read;
    readInput.addEventListener('change', handleReadStatus);

    readLabel.appendChild(readInput);
    readLabel.appendChild(readSpan);
    readDiv.appendChild(readLabel);

    const removeDiv = document.createElement('div');
    removeDiv.classList.add('remove');
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'X';
    removeBtn.addEventListener('click', handleRemoveBook);
    removeDiv.appendChild(removeBtn);

    buttonContainerDiv.appendChild(readDiv);
    buttonContainerDiv.appendChild(removeDiv);

    const bookInfoDiv = document.createElement('div');
    bookInfoDiv.classList.add('book-info');

    bookInfoDiv.textContent = book.info();

    cardArticle.appendChild(buttonContainerDiv);
    cardArticle.appendChild(bookInfoDiv);
    booksSection.appendChild(cardArticle);
}

function populateBookCards() {
    addBookToLibrary(new Book("The 0", "J.R.R. Tolkien", 295, true));
    addBookToLibrary(new Book("The 1", "J.R.R. Tolkien", 295, true));
    addBookToLibrary(new Book("The 2", "J.R.R. Tolkien", 295, false));
    addBookToLibrary(new Book("The 3", "J.R.R. Tolkien", 295, true));

    myLibrary.forEach((book) => {
        console.log(book);
        createBookCard(book);
    });
}

showAddDialogBtn.addEventListener('click', () => {
    addDialog.showModal();
});

closeAddDialogBtn.addEventListener('click', () => {
    addDialog.close();
});


const title = addBookForm.querySelector('#title');
const author = addBookForm.querySelector('#author');
const pages = addBookForm.querySelector('#pages');
const radios = addBookForm.querySelectorAll('input[type=radio]');
const titleError = addBookForm.querySelector('.title-error');
const authorError = addBookForm.querySelector('.author-error');
const pagesError = addBookForm.querySelector('.pages-error');
const readError = addBookForm.querySelector('.read-error');



title.addEventListener("input", () => {
    if (title.validity.valid) {
        titleError.textContent = "";
        titleError.className = "title-error error";
    }
    else {
        showTitleError();
    }
});

author.addEventListener("input", () => {
    if (author.validity.valid) {
        authorError.textContent = "";
        authorError.className = "author-error error";
    }
    else {
        showAuthorError();
    }
});

pages.addEventListener("input", () => {
    if (pages.validity.valid) {
        pagesError.textContent = "";
        pagesError.className = "pages-error error";
    }
    else {
        showPagesError();
    }
});

radios[0].addEventListener("change", () => {
    readError.className = "read-error error";
});

radios[1].addEventListener("change", () => {
    readError.className = "read-error error";
});

function showTitleError() {
    if (title.validity.valueMissing) {
        titleError.textContent = "You need to enter a title.";
    } else if (title.validity.tooLong) {
        titleError.textContent = "Enter a title shorter than 100 characters.";
    }

    titleError.className = `title-error error active`;
}

function showAuthorError() {
    if (author.validity.valueMissing) {
        authorError.textContent = "You need to enter an author.";
    }

    authorError.className = `author-error error active`;
}

function showPagesError() {
    if (pages.validity.valueMissing) {
        pagesError.textContent = "You need to enter a page count.";
    } else if (pages.validity.tooShort) {
        pagesError.textContent = "There must be at least 1 page."
    } 

    pagesError.className = `pages-error error active`;
}

function showReadError () {
    if (radios[0].validity.valueMissing && radios[1].validity.valueMissing) {
        readError.textContent = "You need to select one option.";
    } 

    readError.className = `read-error error active`;
}

addBookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!title.validity.valid) {
        showTitleError();
    }
    else if (!author.validity.valid) {
        showAuthorError();
    }
    else if (!pages.validity.valid) {
        showPagesError();
    }
    else if (!radios[0].validity.valid && !radios[1].validity.valid) {
        showReadError();
    }
    else {
        const book = new Book(  title.value, 
                                author.value,
                                pages.value,
                                radios[0].value == true);
        
        addBookToLibrary(book);
        createBookCard(book);

        addBookForm.reset();
        addDialog.close();
    }
});

function handleReadStatus(event) {
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