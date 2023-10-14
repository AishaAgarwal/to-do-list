// for storing the inputs by user
// import { initializeApp } from "firebase/app";
// import { getMessaging, getToken } from "firebase/messaging";
import { initializeApp} from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js' ;
import {getMessaging, getToken} from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-messaging.js' ;

const todoobjectlist = []; 


function intializeFirebase() {
    const firebaseConfig = {
        apiKey: 'AIzaSyBvxbFPNM2dtLP5TU5xvkxQZcYgHdowN7I',
        authDomain: 'to-do-list-80eda.firebaseapp.com',
        projectId: 'to-do-list-80eda',
        storageBucket: 'to-do-list-80eda.appspot.com',
        messagingSenderId: '494269479510',
        appId: '1:494269479510:web:dd70b8068ccb277f0819f7',
      };
    
    
    const app = initializeApp(firebaseConfig);
    const messaging = getMessaging(app);

    

  
    // requestPermission(messaging)
    //   .then((currentToken) => {
    //     if (currentToken) {
    //       this.sendTokenToServer(currentToken);
    //     } else {
    //       console.log('No instance ID token available.');
    //     }
    //   })
    //   .catch((err) => {
    //     console.log('An error occurred while retrieving token: ', err);
    //   });

    
        console.log('Requesting permission...');
        Notification.requestPermission().then((permission) => {
          if (permission === 'granted') {
            console.log('Notification permission granted.');
            getToken(messaging, {vapidKey: "BPnh98Rsgc7tJtref_HdhcYZ-UHkQMO-rA8sqmyrU-EnSLCSUWCP7EkDFAsVDpMKzqxNqU0q7EcK83SA535mwUA"}).then((currentToken) => {
                if (currentToken) {
                    sendTokenToServer(currentToken);
                  // Send the token to your server and update the UI if necessary
                  // ...
                } else {
                  // Show permission request UI
                  console.log('No registration token available. Request permission to generate one.');
                  // ...
                }
              }).catch((err) => {
                console.log('An error occurred while retrieving token. ', err);
                // ...
              });
        }})
}

intializeFirebase();

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

function sendTokenToServer(token){
    console.log(token);

    // const serverURL = 'BPnh98Rsgc7tJtref_HdhcYZ-UHkQMO-rA8sqmyrU-EnSLCSUWCP7EkDFAsVDpMKzqxNqU0q7EcK83SA535mwUA';
    // const data = {
    //     token : token,
    // };


    // fetch(serverURL,{
    //     method: 'POST',
    //     headers: {
    //         'Content-Type' : 'application/json',
    //     },
    //     body: JSON.stringify(data),
    // })
    // .then(function(response){
    //     if (response.ok){
    //         console.log('Token sent to server successfully.');

    //     }
    //     else{
    //         console.error('Failed to send token to server.')
    //     }
    // })
    // .catch(function(error){
    //     console.error('Error sending token to server: ',error)
    // });

}

function scheduleNotifications(){
    const now = new Date();

    todoobjectlist.forEach((task) => {
        if (!task.isdone && task.deadline){
            const taskDeadline = new Date(task.deadline);
            const timeDiff = taskDeadline - now;
            const oneHour = 60 * 60 * 1000;

            if (timeDiff <= oneHour && timeDiff > 0){
                const notificationTitle = "Task Reminder";
                const notificationOptions = {
                    body : `The task "${task.todotext}" is due in one hour (${task.deadline}).`,
                };

                new Notification(notificationTitle, notificationOptions);
            }
        }
    });
}

setInterval(scheduleNotifications, 6000)