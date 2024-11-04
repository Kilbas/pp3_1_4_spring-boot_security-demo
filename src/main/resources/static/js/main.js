function loadUserBar(user) {
    const userBar = document.getElementById("userBar")
    userBar.innerHTML = user.login + " your role: " + user.roles.map((role) => `${role.value}`).join(", ")
}

function tableUserUpdate(user) {
    const tableUser = document.getElementById("tableUser")
    tableUser.innerHTML = `<tr>
            <td>${user.id}</td>
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td>${user.age}</td>
            <td>${user.login}</td>
            <td>${user.roles.map((role) => `${role.value}`).join(", ")}</td>            `
}

function tableUsersUpdate(users) {
    const tableUsers = document.getElementById("tableUsers")
    let result = ""
    for (let user of users) {
        result += `<tr>
            <td>${user.id}</td>
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td>${user.age}</td>
            <td>${user.login}</td>
            <td>${user.roles.map((role) => `${role.value}`).join(", ")}</td>
            <td><button type="button" class="btn btn-info text-white" data-bs-toggle="modal" data-bs-target="#editModal" onclick="setPlaceholder('edit'); getUserId(${user.id},'edit')">Edit</button></td>
            <td><button type="button" class="btn btn-danger text-white" data-bs-toggle="modal" data-bs-target="#deleteModal" onclick="getUserId(${user.id},'delete')">Delate</button></td>                     
        `
    }

    tableUsers.innerHTML = result
}

function validation(id, type, oldValidation) {
    let result = true
    switch (type) {
        case "text":
            result = /^[а-яА-Яa-zA-Z]{2,}$/.test(id.value)
            if (!result) {
                id.value = ""
                id.placeholder = "letters only, length > 1 "
            }
            break

        case "login":
            result = /^[а-яА-Яa-zA-Z0-9]{2,}$/.test(id.value);
            if (!result) {
                id.value = "";
                id.placeholder = "only letters and numbers, length> 1";
            }
            break

        case "age":
            result = /^\d+$/.test(id.value)
            if (!result) {
                id.value = ""
                id.placeholder = "age cannot be negative"
            } else {
                if (id.value > 100 || id.value < 0) {
                    id.value = ""
                    id.placeholder = "age cannot be negative"
                }
            }
            break

        case "password":
            if (id.value.length === 0 && id.id !== "password") {
                break
            }
            if (id.value.length < 3) {
                id.value = ""
                id.placeholder = "minimum 3 characters"
                result = false
            }
            break

        case "select":
            if (id.selectedOptions.length < 1) {
                document.getElementById(id.id + "Label").innerHTML = `<b><font color="red">you should choose a role</font></b>`
                result = false
            } else {
                document.getElementById(id.id + "Label").innerHTML = `<b><font color="black">Roll</font></b>`
            }
            break
    }
    return !oldValidation ? false : result
}

function setPlaceholder (formId) {
    document.getElementById(formId + 'firstName').placeholder = "firstName"
    document.getElementById(formId + 'lastName').placeholder = "lastName"
    document.getElementById(formId + 'age').placeholder = "age"
    document.getElementById(formId + 'login').placeholder = "Login"
    document.getElementById(formId + 'password').placeholder = "password"
    document.getElementById(formId + 'rolesLabel').innerHTML = `<b><font color="black">Roll</font></b>`
}

async function newUser() {
    let valid = true
    let options = document.getElementById('roles') //.selectedOptions;

    const firstName = document.getElementById('firstName')
    const lastName = document.getElementById('lastName')
    const age = document.getElementById('age')
    const login = document.getElementById('login')
    const password = document.getElementById('password')

    valid = validation(firstName, firstName.type, valid)
    valid = validation(lastName, lastName.type, valid)
    valid = validation(age, age.type, valid)
    valid = validation(login, login.type, valid)
    valid = validation(password, password.type, valid)
    valid = validation(options, "select",valid)

    options = options.selectedOptions

    let answer = await fetch("js/userLogin/" + login.value)
    if (answer.ok) {
        let result = await answer.json()
        if ((result).login !== null) {
            login.value = ""
            login.placeholder = "login is already in use"
        } else {
            if (valid) {
                const newUser = {
                    firstName: firstName.value,
                    lastName: lastName.value,
                    age: age.value,
                    login: login.value,
                    password: password.value,
                    roles: Array.from(options).map(({value}) => value)
                }
                await saveUser(newUser)
                document.getElementById("users-tab").click()
                //document.querySelector("#users-tab").click()
                document.getElementById("formNewUser").reset()
            }
        }
    }
}

async function notSaveLogin (){
    document.getElementById('login').value = ""
    document.getElementById('password').value = ""
}

async function showUser(User, type){

    document.getElementById(type + 'id').value = User.id
    document.getElementById(type + 'firstName').value = User.firstName
    document.getElementById(type + 'lastName').value = User.lastName
    document.getElementById(type + 'age').value = User.age
    document.getElementById(type + 'login').value = User.login
    document.getElementById(type + 'password').value = ""

    await getRoles(type+"roles")

    for (let option of  document.getElementById(type + 'roles').getElementsByTagName('option')) {
        for (let role of User.roles) {
            if (option.value === role.role) {
                option.selected = true
            }
        }
    }
}

async function editUser() {
    let valid = true
    let options = document.getElementById('editroles') //.selectedOptions;

    const id = document.getElementById('editid')
    const firstName = document.getElementById('editfirstName')
    const lastName = document.getElementById('editlastName')
    const age = document.getElementById('editage')
    const login = document.getElementById('editlogin')
    const password = document.getElementById('editpassword')

    valid = validation(firstName, firstName.type, valid)
    valid = validation(lastName, lastName.type, valid)
    valid = validation(age, age.type, valid)
    valid = validation(login, login.type, valid)
    valid = validation(password, password.type, valid)
    valid = validation(options, "select",valid)

    options = options.selectedOptions

    if (valid) {
        const newUser = {
            id: id.value,
            firstName: firstName.value,
            lastName: lastName.value,
            age: age.value,
            login: login.value,
            password: password.value,
            roles: Array.from(options).map(({ value }) => value)
        }
        await sendEditUser(newUser)
        await getUsers()
        document.getElementById("editModalButtonClose").click()
    }
}

async function deleteUser() {

    const id = document.getElementById('deleteid')
    const newUser = {
        id: id.value,
    }

    await sendDeleteUser(newUser)
    await getUsers()
    document.getElementById("deleteModalButtonClose").click()
}

function setRoles(roles, type){
    const elmRoles = document.getElementById(type)
    let result = ""
    for (let role of roles) {
        result += `<option value="${role.role}">${role.value}</option>`
    }
    elmRoles.innerHTML = result
}