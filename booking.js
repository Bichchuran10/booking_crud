function saveToLocalStorage(event)
{
    event.preventDefault()
    const name=event.target.username.value
    const email=event.target.emailId.value
    const phonenumber=event.target.phonenumber.value


    const obj={
        name,
        email,
        phonenumber
    }


    axios.post("https://crudcrud.com/api/975cf5e254d34bac8aaed43fe3a6b7b9/appointmentData",obj)
    .then((respone) => {
        showNewUserOnScreen(respone.data)
        // console.log(respone)
    })
    .catch((err)=> {
       document.body.innerHTML=document.body.innerHTML + "<h2> Something went wrong </h2>"
        console.log(err)
    })




    //localStorage.setItem(obj.email, JSON.stringify(obj))
    //showNewUserOnScreen(obj)
}

window.addEventListener("DOMContentLoaded", () => {
    //let localStorageObj = localStorage;
    //let localstoragekeys  = Object.keys(localStorageObj)

    axios.get("https://crudcrud.com/api/975cf5e254d34bac8aaed43fe3a6b7b9/appointmentData",)
    .then((respone) => {
        for(let i=0;i<respone.data.length;i++)
        {
        showNewUserOnScreen(respone.data[i])
        }
        // console.log(respone)
    })
    .catch((err)=> {
        console.log(err)
    })

    //for(var i =0; i< localstoragekeys.length; i++){
     //   const key = localstoragekeys[i]
     //   const userString = localStorageObj[key];
     //   const userDetailsObj = JSON.parse(userString);
     //   showNewUserOnScreen(userDetailsObj)
})

function showNewUserOnScreen(user){
    const parentNode = document.getElementById('listOfUsers');
    const childHTML = `<li id=${user.email}> ${user.name} - ${user.email} - ${user.phonenumber}
                            <button onclick=deleteUser('${user.email}')> Delete User </button>
                            <button onclick=editUserDetails('${user.name}','${user.email}','${user.phonenumber}')>Edit User </button>
                         </li>`

    parentNode.innerHTML = parentNode.innerHTML + childHTML;
}

function deleteUser(email){
    console.log(email)
    localStorage.removeItem(email);
    removeUserFromScreen(email);

}

function removeUserFromScreen(email){
    const parentNode = document.getElementById('listOfUsers');
    const childNodeToBeDeleted = document.getElementById(email);

    parentNode.removeChild(childNodeToBeDeleted)
}

function editUserDetails(name,email,phonenumber){

    document.getElementById('name').value = name;
    document.getElementById('email').value = email;
    document.getElementById('phone').value =phonenumber;

    deleteUser(email)
 }