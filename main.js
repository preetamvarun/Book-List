const addBook = document.getElementById('submit');

// Create two constructors one for the books and other for the UI

/* CREATE A BOOK CONSTRUCTOR */
function Book(title,author,isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

/* CREATE A UI CONSTRUCTOR */
function userInterface(bookObject){
    this.bookObject = bookObject;
}

userInterface.prototype.addBook = function(){
    const rowElement = document.createElement('tr');
    rowElement.innerHTML = 
    `<td>${this.bookObject.title}</td> 
    <td>${this.bookObject.author}</td> 
    <td>${this.bookObject.isbn}</td>`;
    const tbody = document.querySelector('tbody');
    tbody.appendChild(rowElement);
}

userInterface.prototype.checkStatus = function(){
    let status = false;
    (this.bookObject.title === '' || this.bookObject.author === '' || this.bookObject.isbn === '') ?
    status = false : status = true;
    return status;
}

addBook.addEventListener('click', function(){
    // Get the input field values first 
    const bookTitle = document.getElementById('title')
    const bookAuthor = document.getElementById('author');
    const isbn = document.getElementById('isbn');

    // create a instance of book
    const newBook = new Book(bookTitle.value,bookAuthor.value,isbn.value);
    const ui = new userInterface(newBook);


    ui.checkStatus() ? ui.addBook() : console.log('please fill up all the details');
    // clear the input fields 
    bookTitle.value = ''; 
    bookAuthor.value = '';
    isbn.value = '';
});