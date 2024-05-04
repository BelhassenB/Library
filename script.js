const myLibrary = []
let newBook;
const bookBtn = document.querySelector('.addBook')
const bookForm = document.querySelector('.bookForm')
const submitBook = document.querySelector('.submit-book')
const titletVal = document.querySelector('#book-title')
const authorVal = document.querySelector('#author-name')
const pagesVal = document.querySelector('#pages')
const bookReadVal = document.getElementById('book-is-read')
const body = document.querySelector('body')
const allBooks = document.querySelector('.all-books')
const form = document.querySelector('form')
const allInputs = document.querySelectorAll('input')
const allLabels = document.querySelectorAll('label')


function Book(title, author, nbrOfPages, read) {
   this.title = title,
   this.author = author,
   this.nbrOfPages = nbrOfPages,
   this.read = read  
}

bookBtn.addEventListener("click", () => {
   bookForm.showModal()
})

function addBookToLibrary () {
   submitBook.addEventListener("click", (e) => {
      e.preventDefault();

      (bookReadVal.checked)? bookReadVal.value = "Yes": bookReadVal.value =  "No"

      newBook = new Book(titletVal.value, 
         authorVal.value, 
         pagesVal.value,
         bookReadVal.value        
         )

      myLibrary.push(newBook)
      form.reset()  
      bookForm.close() 
      newBook.displayBooks()
      

})


}
addBookToLibrary()

Book.prototype.displayBooks = function () {
   const newBookDiv = document.createElement('div')
   const bookIndex = myLibrary.indexOf(this)
   newBookDiv.dataset.bookref = bookIndex
   newBookDiv.style.display = "grid"
   newBookDiv.style.maxHeight = "300px"
   newBookDiv.style.gap = ".5rem 0"
   newBookDiv.style.boxShadow = "0 0 5px #000"
   newBookDiv.style.fontSize = "22px"
   newBookDiv.style.textAlign = "center"
   // const getNewBookDiv = document.querySelector(`[data-bookref= "${bookIndex}"]`)
   const createBtn = document.createElement('button')
   createBtn.dataset.bookref = bookIndex
   createBtn.textContent = "Delete"
   createBtn.style.padding = ".5rem 1rem"
   createBtn.style.width = "max-content"
   createBtn.style.placeSelf = "center"
   createBtn.style.backgroundColor = "#000"
   createBtn.style.color = "#fff"  
   const readBtn = document.createElement('button')
   readBtn.dataset.bookref = bookIndex
   readBtn.textContent = "Mark as Read/Unread"
   readBtn.className = "bookStatus"
   readBtn.style.fontSize = "22px"
   
   allBooks.append(newBookDiv) 

   const objElements = Object.values(this)
   

   for (let i=0; i < objElements.length; i++) {
      const newEl = document.createElement('div')
      newEl.textContent = `${allLabels[i].textContent} :  ${objElements[i]}`
      newBookDiv.append(newEl)
   }
   
   newBookDiv.append(createBtn)
   newBookDiv.append(readBtn)

   const deleteBtn = document.querySelector(`button[data-bookref= "${bookIndex}"]`)  
   deleteBtn.addEventListener("click", (e) => {
      const indexBook = e.target.dataset.bookref
      myLibrary.splice(indexBook, 1)
      e.target.parentNode.remove()  
   })

   this.changeBookStatus(readBtn, bookIndex)
}

Book.prototype.changeBookStatus = function (btn, index) {
   const slctBookStatus = allBooks.children[index].children[3]
   btn.addEventListener("click", () => {
      if (this.read === "Yes") {
         this.read = "No"
         slctBookStatus.textContent = "This book is read: No"
         btn.textContent = "Mark as Read"
         btn.style.backgroundColor = "red"

      } else if (this.read === "No") {
         this.read = "Yes"
         slctBookStatus.textContent = "This book is read: Yes"
         btn.textContent = "Mark as Unread"
         btn.style.backgroundColor = "green"
      }
   })
}
