const booksSection = document.querySelector('.books');

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

function createBookCard(title, author, pages, read) {
    let cardArticle = document.createElement('article');
    cardArticle.classList.add('card');

    //create top of book in article
    let bookTopDiv = document.createElement('div');
    bookTopDiv.classList.add('book-top');

    let readDiv = document.createElement('div');
    readDiv.classList.add('read');

    if (read) {
        readDiv.textContent = '✓';
    }
    else {
        readDiv.textContent = '!';
    }

    let pagesDiv = document.createElement('div');
    pagesDiv.classList.add('pages');
    pagesDiv.textContent = pages.toString() + ' pp.';

    bookTopDiv.appendChild(readDiv);
    bookTopDiv.appendChild(pagesDiv);

    //create bottom of book
    let bookBottomHeader = document.createElement('header');
    bookBottomHeader.classList.add('book-bottom');

    let titleH3 = document.createElement('h3');
    titleH3.textContent = title;

    let authorSpan = document.createElement('span');
    authorSpan.textContent = author;

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

function start() {
    
    addBookToLibrary("The Hobbit", "Guy", 295, true);

    addBookToLibrary("The Hobbit", "Guy", 295, false);
    addBookToLibrary("The Hobbit", "Guy", 295, false);
    addBookToLibrary("The Hobbit", "Guy", 295, false);
    addBookToLibrary("The Hobbit", "Guy", 295, false);
    addBookToLibrary("The Hobbit", "Guy", 295, false);

    // addBookToLibrary("The Hobbit", "Gghgjhgkj hghghjkg jkghgjkhgg hkgjkhkjgghjjkgk ghjkgjkhhjkgkjhg khjgkjg jk g hjuy", 295, false);

    for (let book of myLibrary) {
        console.log(book.title);
        createBookCard(book.title, book.author, book.pages, book.read);
    }
}

start();