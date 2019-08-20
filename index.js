let myLibrary = [];

//initla test cases
const bookTest1 = new Book('abc','xyz',123,true);
const bookTest2 = new Book('def','xyz',123,true);
const bookTest3 = new Book('ghi','xyz',123,false);
myLibrary.push(bookTest1);
myLibrary.push(bookTest2);
myLibrary.push(bookTest3);


function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.dateAdded = todayDate(); //remember to review what's going on here
    this.isRead = isRead;
    this.info = function() {
      let stringResponse = this.title + ' by ' + this.author + ', ' + this.pages + ' pages, ' + this.isRead;
      return stringResponse;
      console.log(stringResponse);
    }
}

//NEEDS REVIEW - not sure this is the best way to go about it, will it reset every time this runs?
//function that return today's date in the mm/dd/yyyy format
function todayDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    return mm + '/' + dd + '/' + yyyy;
}

function addBookToLibrary(bookObject) {
    myLibrary.push(bookObject);
}

//function to return the index of a book based on title
function findBookIndex(findBookTitle) {
    let myLibraryTitles = [];
    for (let i = 0; i < myLibrary.length; i++) {
        //patching this code together, need to discuss with mentor
        myLibraryTitles.push('Title: ' + myLibrary[i].title);
    };
    return myLibraryTitles.findIndex(function(titles) {
        return titles === findBookTitle;
    });
}

function bookListResults() {
    //empty the book list
    $('.book-list').empty();
    //loop through the array and add books to the library
    for (let i = 0; i < myLibrary.length; i++) {
        const bookCard = 
        '<div class = "book-card">' +
        '<ul>' +
            '<li class = "book-title">Title: ' + myLibrary[i].title + '</li>' +
            '<li>Author: ' + myLibrary[i].author + '</li>' +
            '<li>Pages: ' + myLibrary[i].pages + '</li>' +
            '<li>Date Added: ' + myLibrary[i].dateAdded + '</li>' +
            '<li>Read: ' + myLibrary[i].isRead + '</li>' +
            '<button class="book-read-toggle">Read</button>' +
            '<button class="book-delete">Delete</button>' +
            '</ul>' +
        '</div>';
        $('.book-list').append(bookCard);
    }
}

$('#new-book-form').on('submit', function(event) {
        event.preventDefault();
        let isReadBoolean = true; 
        if(document.querySelector('input[name="new-book-entry-isRead"]:checked').value === 'true') {
            isReadBoolean = true;
        } else {
            isReadBoolean = false;
        };
        const newBookObject = new Book($('#new-book-entry-title').val(),$('#new-book-entry-author').val(),$('#new-book-entry-pages').val(),$('#new-book-entry-isRead').val());
        addBookToLibrary(newBookObject);
        bookListResults();
});

// toggle read for the desired book in library and on page
$('.book-list').on('click', '.book-read-toggle', function(event) {
    let itemIndex = findBookIndex($(this).parents('.book-card').find('.book-title').text());
    let initialIsReadValue = myLibrary[itemIndex].isRead; 
    myLibrary[itemIndex].isRead = !initialIsReadValue;
    bookListResults();
});

// delete the book from library and from page
$('.book-list').on('click', '.book-delete', function(event) {
    //console.log($(this).parents('.book-card').find('.book-title').text());
    //console.log(findBookIndex($(this).parents('.book-card').find('.book-title').text()));
    let itemIndex = findBookIndex($(this).parents('.book-card').find('.book-title').text());
    myLibrary.splice(itemIndex,1);
    bookListResults();
    
    //removes the card from the display, but does not remove the object from the array
    //$(this).parents('.book-card').remove();
});

$(bookListResults());