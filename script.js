// for storing the inputs by user
const todoobjectlist = []; 

class todo_class{
    constructor(item){
        this.ulElement = item;
    }

    add(){
        const todoinput = document.querySelector("#myInput").value;
        if (todoinput == ""){
            alert("You did not enter any item!")
    }
        else{
            const todoobject = {
                id : todoobjectlist.length,
                todotext : todoinput,
                isdone : false,
            }
        todoobjectlist.unshift(todoobject); // unshift is used instead of push because most recent entries are required on top
        this.display();
        document.querySelector("#myInput").value = ' ';
        }
    }

    done_undone(x){
        const selectedtodoindex = todoobjectlist.findIndex((item) => item.id == x);
        console.log(todoobjectlist[selectedtodoindex].isdone);
        todoobjectlist[selectedtodoindex].isdone == false ? todoobjectlist[selectedtodoindex].isdone = true : todoobjectlist[selectedtodoindex].isdone = false;
        this.display();
    }
    deleteElement(z){
        const selectedDelIndex = todoobjectlist.findIndex((item)=> item.id == z);
        todoobjectlist.splice(selectedDelIndex,1);
        this.display();
    }
    display(){
        this.ulElement.innerHTML = ""; // for cleaning the input area in the beginnig
        todoobjectlist.forEach((object_item) => {
            const liElement = document.createElement("li");
            const delBtn = document.createElement("i"); // for trash icon
    
            liElement.innerText = object_item.todotext;
            liElement.setAttribute("data-id", object_item.id);
    
            delBtn.setAttribute("data-id", object_item.id);
            delBtn.classList.add("far","fa-trash-alt");

           
           
    
            liElement.appendChild(delBtn);
    
            delBtn.addEventListener("click",function(e) {
                const deleteId = e.target.getAttribute("data-id");
                mytodolist.deleteElement(deleteId);
            })
    
            liElement.addEventListener("click", function(e) {
                const selectId = e.target.getAttribute("data-id");
                mytodolist.done_undone(selectId);
            })
    
           if (object_item.isdone){
            liElement.classList.add("checked");
           }
    
            this.ulElement.appendChild(liElement);
        })
    }
}

const listSection = document.querySelector("#mytasks");
mytodolist = new todo_class(listSection);

document.querySelector(".addbtn").addEventListener("click", function() {
    mytodolist.add()
})


