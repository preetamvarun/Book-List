const addBook = document.getElementById('submit');

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

userInterface.prototype.resultBoard = function(msg,bookStatus){
    const divElement = document.createElement('div');
    divElement.className = 'alert';
    const mainBox = document.getElementById('mainBox');
    msg === 'green' ? divElement.classList.add('success') : 
    divElement.classList.add('failure');
    msg === 'green' ? divElement.textContent = `${bookStatus}` : divElement.textContent = `${bookStatus}`;
    mainBox.prepend(divElement);
    setTimeout(function(){
        document.querySelector('.alert').remove()
    }, 2000)
}

addBook.addEventListener('click', function(){
    // Get the input field values first 
    const bookTitle = document.getElementById('title')
    const bookAuthor = document.getElementById('author');
    const isbn = document.getElementById('isbn');
    let message = '';
    // create a instance of book
    const newBook = new Book(bookTitle.value,bookAuthor.value,isbn.value);
    const ui = new userInterface(newBook);
    if(ui.checkStatus()){
        message = 'green';
        ui.addBook();
        bookStatus = 'Book Added';
    } else{
        message = 'red';
        bookStatus = 'Failed to add';
    }
    ui.resultBoard(message,bookStatus);
    // clear the input fields 
    bookTitle.value = ''; 
    bookAuthor.value = '';
    isbn.value = '';
});