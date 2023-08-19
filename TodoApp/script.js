

const inputBox = document.getElementById("inputBox")

const addBtn = document.getElementById("addBtn")

const todoList = document.getElementById("todoList")



let editTodo = null;

let todos

let editindex





const addTodo = () => {

    const inputText = inputBox.value.trim();

    if (inputText.length <= 0) {

        alert("please type somethig before adding")

        return false

    }



    if (addBtn.value === "Edit") {

        editTodo.target.previousElementSibling.innerHTML = inputText

        editLocalTodos(editTodo.target.previousElementSibling.innerHTML);

        addBtn.value = "Add"

        inputBox.value = ''

    }



    else {



        const li = document.createElement('li');

        const p = document.createElement('p')

        p.innerHTML = inputText;

        li.appendChild(p)

        todoList.appendChild(li)



        //edit button 

        const editButton = document.createElement("button")

        editButton.innerText = "Edit"

        editButton.classList.add("btn", "editBtn");

        li.appendChild(editButton)




        //delete button 

        const delButton = document.createElement("button")

        delButton.innerText = "Remove"

        delButton.classList.add("btn", "deleteBtn");

        li.appendChild(delButton)



        todoList.appendChild(li)

        inputBox.value = ""

        saveLocalTodos(inputText);

    }


}



const updateTodo = (e) => {

    //console.log(e.target);

    if (e.target.innerHTML === "Remove") {

        todoList.removeChild(e.target.parentElement)

        deleteLocalTodos(e.target.parentElement);

        //console.log(e.target.parentElement.getElementByTagName(p),'Yhai hai');

    }



    if (e.target.innerHTML === "Edit") {

        inputBox.value = e.target.previousElementSibling.innerHTML



        let todos

        if (localStorage.getItem("todos") === null) {

            todos = [];

        }

        else {

            todos = JSON.parse(localStorage.getItem("todos"))

        }



        editindex = todos.indexOf(e.target.previousElementSibling.innerHTML)



        console.log(editindex, "editIndex")


        //console.log(e.target.previousElementSibling)

        inputBox.focus()

        addBtn.value = "Edit"

        editTodo = e;

    }

}



const saveLocalTodos = (todo) => {

    let todos

    if (localStorage.getItem("todos") === null) {

        todos = [];

    }

    else {

        todos = JSON.parse(localStorage.getItem("todos"))

    }

    todos.push(todo);

    localStorage.setItem("todos", JSON.stringify(todos));

}



const getLocalTodos = () => {

    let todos

    if (localStorage.getItem("todos") === null) {

        todos = [];

    }

    else {

        todos = JSON.parse(localStorage.getItem("todos"))

        todos.forEach(todo => {

            const li = document.createElement('li');

            const p = document.createElement('p')

            p.innerHTML = todo;

            li.appendChild(p)

            todoList.appendChild(li)



            //edit button 

            const editButton = document.createElement("button")

            editButton.innerText = "Edit"

            editButton.classList.add("btn", "editBtn");

            li.appendChild(editButton)





            //delete button 

            const delButton = document.createElement("button")

            delButton.innerText = "Remove"

            delButton.classList.add("btn", "deleteBtn");

            li.appendChild(delButton)



            todoList.appendChild(li)



        });

    }





}



deleteLocalTodos = (todo) => {


    let todos

    if (localStorage.getItem("todos") === null) {

        todos = [];

    }

    else {

        todos = JSON.parse(localStorage.getItem("todos"))

    }

    let todoText = todo

    console.log(todoText.children[0].innerHTML)

    let todostorageText = todoText.children[0].innerHTML

    let newArr = []

    newArr = todos.filter((x) => x != todostorageText)

    localStorage.setItem("todos", JSON.stringify(newArr))

    //console.log(newArr)

}



editLocalTodos = (todo) => {

    let todos

    if (localStorage.getItem("todos") === null) {

        todos = [];

    }

    else {

        todos = JSON.parse(localStorage.getItem("todos"))

    }

    todos[editindex] = todo;

    localStorage.setItem("todos", JSON.stringify(todos));

}



document.addEventListener("DOMContentLoaded", getLocalTodos)



todoList.addEventListener('click', updateTodo)



addBtn.addEventListener("click", addTodo);