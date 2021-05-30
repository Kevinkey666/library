Display();
function Book(Bname, author, category) {
  this.Bname = Bname;
  this.author = author;
  this.category = category;
}


function Display() {                            // Display
  let storage = localStorage.getItem('book');
  let bookObj;
  if (storage == null) {
      bookObj = [];
  } else {
      bookObj = JSON.parse(storage);
  }
  let addRow = "";
  bookObj.forEach(function (element,index) {
      addRow += `<tr>
                  <td>${element.Bname}</td>
                  <td>${element.author}</td>
                  <td>${element.category}</td>
                </tr>`;
  });
  let tableBody = document.getElementById('tableBody');
  if (bookObj.length == 0) {
      tableBody.innerHTML = "";
  }else{
      tableBody.innerHTML = addRow;
  }
}

Display.prototype.add = function (book) {                  // ADD
  let tableBody = document.getElementById("tableBody");
  let uiString = `<tr>
                        <td>${book.Bname}</td>
                        <td>${book.author}</td>
                        <td>${book.category}</td>
                    </tr>`;
  tableBody.innerHTML += uiString;
  let storage = localStorage.getItem("book");
  let bookObj
  if (storage == null) {
    bookObj = [];
  }
  else {
    bookObj = JSON.parse(storage);
  }
  bookObj.push(book);
  localStorage.setItem('book', JSON.stringify(bookObj));

};


Display.prototype.clear = function () {
  let libraryForm = document.getElementById("libraryForm");
  libraryForm.reset();
};


Display.prototype.validate = function (book) {                // Validate
  if (book.Bname.length<1 || book.author.length < 1) {
    return false;
  } else {
    
    return true;
  }
};


Display.prototype.show = function (category, displayMessage,icon) {
  let message = document.getElementById("message");
  message.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
                          <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                          </symbol>
                          <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                          </symbol>
                        </svg> 
                        <div class="alert alert${category} d-flex alert-dismissible fade show" role="alert">
                        <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success"><use xlink:href="${icon}fill"/></svg>
                            <strong>${ displayMessage}</strong>
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>`;
  setTimeout(function () {
    message.innerHTML = "";
  }, 2000);
};



let libraryForm = document.getElementById("libraryForm");
libraryForm.addEventListener("submit", libraryFormSubmit);

function libraryFormSubmit(e) {
  let Bname, author, category, fiction, programming, spiritual;
  Bname = document.getElementById("bookName").value;
  author = document.getElementById("author").value;
  category = document.getElementById("category").value;

  fiction = document.getElementById("fiction").value;
  programming = document.getElementById("programming").value;
  spiritual = document.getElementById("spiritual").value;

  if (fiction.selected) {
    type = fiction.value;
  }
  if (programming.selected) {
    type = programming.value;
  }
  if (spiritual.selected) {
    type = spiritual.value;
  }

  let book = new Book(Bname, author, category);
  console.log(book);

  let display = new Display();
  if (display.validate(book)) {
    display.add(book);
    display.clear();
    display.show("-success", "  Book was sucessfully added","#check-circle-");
  } else {
    display.show("-danger", "  Something went wrong","#exclamation-triangle-");
  }

  e.preventDefault();
}
