const addBook = document.getElementById('submit');
const tbody = document.querySelector('tbody');

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

    // Add this book to the local storage 
    let books,authors,isbns;

    // Get the arrays from the local storage
    localStorage.getItem('bookNames') === null ? 
    books = [] : books = JSON.parse(localStorage.getItem('bookNames'));

    localStorage.getItem('authorNames') === null ? 
    authors = [] : authors = JSON.parse(localStorage.getItem('authorNames'));

    localStorage.getItem('isbnNumbers') === null ? 
    isbns = [] : isbns = JSON.parse(localStorage.getItem('isbnNumbers'));

    books.push(this.bookObject.title);
    authors.push(this.bookObject.author);
    isbns.push(this.bookObject.isbn);

    // Set the arrays to the local storage
    localStorage.setItem('bookNames',JSON.stringify(books));
    localStorage.setItem('authorNames',JSON.stringify(authors));
    localStorage.setItem('isbnNumbers',JSON.stringify(isbns));

    const rowElement = document.createElement('tr');
    rowElement.innerHTML = 
    `<td>${this.bookObject.title}</td> 
    <td>${this.bookObject.author}</td> 
    <td>${this.bookObject.isbn}</td>
    <td><strong class = 'red'; style = "color : red";>X</strong></td>`;
    const tbody = document.querySelector('tbody');
    tbody.appendChild(rowElement);
}

userInterface.prototype.checkStatus = function(){
    let status = false;
    (this.bookObject.title === '' || this.bookObject.author === '' || this.bookObject.isbn === '') ?
    status = false : status = true;
    return status;
}

userInterface.prototype.resultBoard = function(bookStatus,msg){
    const divElement = document.createElement('div');
    divElement.className = 'alert';
    const mainBox = document.getElementById('mainBox');
    bookStatus === 'green' ? divElement.classList.add('success') : 
    divElement.classList.add('failure');
    bookStatus === 'green' ? divElement.textContent = `${msg}` : divElement.textContent = `${msg}`;
    mainBox.prepend(divElement);
    // making the element disappear after 1.5s
    setTimeout(function(){
        document.querySelector('.alert').remove();
    }, 2000);
}

userInterface.prototype.removeBook = function(e){
    if (e.target.className === 'red'){
        const tableRow = e.target.parentElement.parentElement;   
        const bookTitle = e.target.parentElement.parentElement.firstElementChild.textContent;
        
        // Declare the arrays 
        let books,authors,isbns;

        // GET ALL THE ARRAYS FROM THE LOCAL STORAGE 
        localStorage.getItem('bookNames') === null ? 
        books = [] : books = JSON.parse(localStorage.getItem('bookNames'));
    
        localStorage.getItem('authorNames') === null ? 
        authors = [] : authors = JSON.parse(localStorage.getItem('authorNames'));
    
        localStorage.getItem('isbnNumbers') === null ? 
        isbns = [] : isbns = JSON.parse(localStorage.getItem('isbnNumbers'));

        index = books.indexOf(bookTitle);
        books.splice(index,1);
        authors.splice(index,1);
        isbns.splice(index,1);

        localStorage.setItem('bookNames',JSON.stringify(books));
        localStorage.setItem('authorNames',JSON.stringify(authors));
        localStorage.setItem('isbnNumbers',JSON.stringify(isbns));

        tableRow.remove();
    }
}

userInterface.prototype.updateEntireUI = function(){
    let books,authors,isbns;
    localStorage.getItem('bookNames') === null ? 
    books = [] : books = JSON.parse(localStorage.getItem('bookNames'));
    localStorage.getItem('authorNames') === null ? 
    authors = [] : authors = JSON.parse(localStorage.getItem('authorNames'));
    localStorage.getItem('isbnNumbers') === null ? 
    isbns = [] : isbns = JSON.parse(localStorage.getItem('isbnNumbers'));
    for(let i = 0; i < books.length; i++){
        const rowElement = document.createElement('tr');
        rowElement.innerHTML = 
        `<td>${books[i]}</td> 
        <td>${authors[i]}</td> 
        <td>${isbns[i]}</td>
        <td><strong class = 'red'; style = "color : red";>X</strong></td>`;
        const tbody = document.querySelector('tbody');
        tbody.appendChild(rowElement);
    }
}

// Event listener for adding a book
addBook.addEventListener('click', function(){
    // Get the input field values first 
    const bookTitle = document.getElementById('title')
    const bookAuthor = document.getElementById('author');
    const isbn = document.getElementById('isbn');
    let message = '';

    // create an instance of the book
    const newBook = new Book(bookTitle.value,bookAuthor.value,isbn.value);

    // create an instance of the ui
    const ui = new userInterface(newBook);

    // check the field status 
    if(ui.checkStatus()){
       bookStatus = 'green';
        ui.addBook();
        message = 'Book Added';
    } else{
        bookStatus = 'red';
        message = 'please fill in all the details of the book';
    }

    // display result board
    ui.resultBoard(bookStatus,message);

    // clear the input fields 
    bookTitle.value = ''; 
    bookAuthor.value = '';
    isbn.value = '';
});


// Event listener for deleting a book
tbody.addEventListener('click', function(e){
    // Instantiate the UI
    const  ui = new userInterface();
    // now remove the book 
    ui.removeBook(e);
    ui.resultBoard('removed','book removed');
});

// Event Listener when the site reloads

document.addEventListener('DOMContentLoaded',function(){
    const ui = new userInterface();
    ui.updateEntireUI();
});