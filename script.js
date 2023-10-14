// for storing the inputs by user
const todoobjectlist = []; 

class todo_class{
    constructor(item){
        this.ulElement = item;
    }

    comparePriority(a,b){
        const priorityOrder = ["top","middle","low"];
        if (priorityOrder.indexOf(a.priority) < priorityOrder.indexOf(b.priority)){
            return -1;
        }
        else if (priorityOrder.indexOf(a.priority) > priorityOrder.indexOf(b.priority)){
            return 1;
        }
        else{
            if (a.deadline && b.deadline) {
                const dateA = new Date(a.deadline);
                const dateB = new Date(b.deadline);

                if (dateA < dateB){
                    return -1;
                }
                else if (dateA > dateB){
                    return 1;
                }
            
            }
            else if (!a.deadline && b.deadline){
                return -1;
            }
            else if (a.deadline && !b.deadline){
                return 1;
            }
            return 0;
        }
    }

    add(){
        const todoinput = document.querySelector("#myInput").value;
        const priority = document.querySelector("#priority").value;
        const deadline = document.querySelector("#deadline").value;
        if (todoinput == "" || deadline == ""){
            alert("Either You did not enter any item or the deadline is not selected for the task!")
    }
        else{
            const todoobject = {
                id : todoobjectlist.length,
                todotext : todoinput,
                isdone : false,
                priority : priority,
                deadline : deadline,
            }
        todoobjectlist.unshift(todoobject); // unshift is used instead of push because most recent entries are required on top
        this.display();
        document.querySelector("#myInput").value = ' ';
        document.querySelector("#deadline").value = ' ';
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

        todoobjectlist.sort(this.comparePriority);

        todoobjectlist.forEach((object_item) => {
            const liElement = document.createElement("li");
            const delBtn = document.createElement("i"); // for trash icon
    
            const priorityspan = document.createElement("span");
            const deadlinespan = document.createElement("span");

            liElement.innerText = object_item.todotext;
            liElement.setAttribute("data-id", object_item.id);

            priorityspan.innerText = "\nPriority: " + object_item.priority;
            deadlinespan.innerText = "\nDeadline: " + object_item.deadline;
    
            delBtn.setAttribute("data-id", object_item.id);
            delBtn.classList.add("far","fa-trash-alt");

            liElement.appendChild(priorityspan);
            liElement.appendChild(deadlinespan);
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

