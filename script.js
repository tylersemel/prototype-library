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

addBookToLibrary("The Hobbit", "Guy", 295, true);
console.log(myLibrary[0].info());
