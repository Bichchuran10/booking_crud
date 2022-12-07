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


    axios.post("https://crudcrud.com/api/733018c43f6547e898392aea4196a10c/appointmentData",obj)
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

    axios.get("https://crudcrud.com/api/733018c43f6547e898392aea4196a10c/appointmentData",)
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
    const childHTML = `<li id=${user._id}> ${user.name} - ${user.email} - ${user.phonenumber}
                            <button onclick=deleteUser('${user._id}')> Delete User </button>
                            <button onclick=editUserDetails('${user.name}','${user.email}','${user.phonenumber}')>Edit User </button>
                         </li>`

    parentNode.innerHTML = parentNode.innerHTML + childHTML;
}

function deleteUser(userId){
    console.log(userId)
    axios.delete(`https://crudcrud.com/api/733018c43f6547e898392aea4196a10c/appointmentData/${userId}`)
    .then((response)=> {
        removeUserFromScreen(userId)
    })
    .catch((err)=> {
        console.log(err)
    })


    //localStorage.removeItem(userId);
    //removeUserFromScreen(userId);

}

function removeUserFromScreen(userId){
    const parentNode = document.getElementById('listOfUsers');
    const childNodeToBeDeleted = document.getElementById(userId);
    console.log(`${userId} This user will be deleted`)

    parentNode.removeChild(childNodeToBeDeleted)
}

function editUserDetails(name,email,phonenumber){

    document.getElementById('name').value = name;
    document.getElementById('email').value = email;
    document.getElementById('phone').value =phonenumber;

    deleteUser(email)
 }