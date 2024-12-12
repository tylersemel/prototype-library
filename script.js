const myLibrary = [];

function Book() {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        if (this.read) {
            return `${title} by ${author}, ${pages} pages, not read yet.`;
        }
        return `${title} by ${author}, ${pages} pages, has been read.`
    }
}

function addBookToLibrary() {
  // do stuff here
}
