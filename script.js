const mainContainer = document.getElementById("main-container");
const dialogContainer = document.getElementById("dialog-container");
const form = document.getElementById("book-submission-form");

const modalBtn = document.querySelector("#dialog-button");
const cancelBtn = document.querySelector("#form-cancel");
const submitBtn = document.querySelector("#form-submit");

let myLibrary = [
    {
        title: "The Hobbit",
        author: "J. R. R. Tolkien",
        pages: 300,
        progress: true
    },
    {
        title: "The Martian",
        author: "Andy Weir",
        pages: 387,
        progress: false
    },
	{
		title: "The Alchemist",
        author: "Paulo Coelho",
        pages: 163,
        progress: true
	},
	{
		title: "The Way of Shadows",
        author: "Brent Weeks",
        pages: 688,
        progress: true
	},
	{
		title: "World War Z",
        author: "Max Brooks",
        pages: 342,
        progress: false
	},
	{
		title: "The Pragmatic Programmer",
        author: "Andy Hunt, Dave Thomas",
        pages: 320,
        progress: false
	}
];

function Book(title, author, pages, progress) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.progress = progress
};

function libraryIteration() {
    console.log("Lib");
    myLibrary.forEach((book) => {
        const existingBookCard = findBookCardByTitle(book.title);

        if (!existingBookCard) {
            bookCard(book.title, book.author, book.pages);
        } else {
            console.log("Book already exists!");
        }
        bookProgressCheckbox(book.title, book.progress);
    });
};

function findBookCardByTitle(title) {
    const bookCards = document.getElementsByClassName("book-card-title");
    for (let i = 0; i < bookCards.length; i++) {
        if (bookCards[i].textContent === title) {
            return bookCards[i].parentNode;
        }
    }
    return null;
};

function removeBook(title) {
    console.log("remove");
    const cardContainers = document.getElementsByClassName("book-card-container");
    for (let i = 0; i < cardContainers.length; i++) {
      const card = cardContainers[i];
      const cardTitle = card.querySelector(".book-card-title").textContent;
      if (cardTitle === title) {
        card.remove();
        break;
      }
    }
    myLibrary = myLibrary.filter((book) => book.title !== title);
  };

  function bookProgressCheckbox(title, progress) {
    const checkboxId = `progress-${title.replace(/\s+/g, "-").toLowerCase()}`;
    const formCheckbox = document.getElementById(checkboxId);

    if (formCheckbox) {
        formCheckbox.checked = progress === true;
    }
};

function bookCard(title, author, pages, progress) {
    const bookCardDiv = document.createElement("div");
        bookCardDiv.classList.add("book-card-container");
            mainContainer.appendChild(bookCardDiv);

    const bookCardTitleDeleteDiv = document.createElement("div");
        bookCardTitleDeleteDiv.classList.add("book-card-title-delete-div");
            bookCardDiv.appendChild(bookCardTitleDeleteDiv);
    
    const bookTitleElement = document.createElement("h3");
    const bookTitle = document.createTextNode(title);
        bookTitleElement.classList.add("book-card-title");
            bookCardTitleDeleteDiv.appendChild(bookTitleElement);
                bookTitleElement.appendChild(bookTitle);

    const bookCardDeleteBtn = document.createElement("input");
        bookCardDeleteBtn.classList.add("delete-button");
        bookCardDeleteBtn.type = "button";
        bookCardDeleteBtn.addEventListener("click", function () {
            removeBook(title);
        })
        bookCardTitleDeleteDiv.append(bookCardDeleteBtn);
    const bookAuthorElement = document.createElement("h5");
    const bookAuthor = document.createTextNode(author);
        bookAuthorElement.classList.add("book-card-author");
            bookCardDiv.appendChild(bookAuthorElement);
                bookAuthorElement.appendChild(bookAuthor);
    const bookPagesElement = document.createElement("h5");
    const bookPages = document.createTextNode(`Pp. ${pages}`);
            bookPagesElement.classList.add("book-card-pages");
                bookCardDiv.appendChild(bookPagesElement);
                    bookPagesElement.appendChild(bookPages);

    const bookCardProgressDiv = document.createElement("div");
        bookCardProgressDiv.classList.add("book-card-progress");
            bookCardDiv.appendChild(bookCardProgressDiv);
        const bookCardReadSection = document.createElement("h5");
            bookCardReadSection.classList.add("book-card-read");
                bookCardProgressDiv.appendChild(bookCardReadSection);
                    const bookCardRead = document.createTextNode("Read");
                        bookCardReadSection.appendChild(bookCardRead);
                    const bookCardReadCheckbox = document.createElement("input");
                            bookCardReadCheckbox.type = "checkbox";
                             bookCardReadCheckbox.id = `progress-${title.replace(/\s+/g, "-").toLowerCase()}`; // Example ID generation
                            bookCardReadCheckbox.checked = progress;
                            bookCardProgressDiv.appendChild(bookCardReadCheckbox);
};

// Form wrapper

modalBtn.addEventListener("click", showDialogModal);
submitBtn.addEventListener("click", formButtonClick);
cancelBtn.addEventListener("click", removeModal);

function showDialogModal(event) {
    dialogContainer.showModal();
    submitBtn.addEventListener("click", formButtonClick, { once: true });
    cancelBtn.addEventListener("click", removeModal, { once: true });
};

function removeModal(event) {
    event.preventDefault();
    dialogContainer.close();
};

function formButtonClick(event) {
    event.preventDefault();
    addBookToLibrary();
    libraryIteration();
    clearFormData();
    console.log("Dialog should close")
    dialogContainer.close();
};

function clearFormData() {
    document.querySelector("#book-title").value = "";
    document.querySelector("#book-author").value = "";
    document.querySelector("#book-pages").value = "";
    document.querySelector("#book-progress").checked = false;
};

function addBookToLibrary() {
    let title = document.querySelector("#book-title").value;
    let author = document.querySelector("#book-author").value;
    let pages = document.querySelector("#book-pages").value;
    let progress = document.querySelector("input[name='book-progress']").checked;

    
    myLibrary.push(new Book(title, author, pages, progress));
    bookCard(title, author, pages, progress);
    console.log(myLibrary[myLibrary.length - 1]);
};

libraryIteration();