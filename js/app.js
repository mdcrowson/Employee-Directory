// Global Variables //
const randomUserUrl = 'https://randomuser.me/api/?results=12&inc=name,email,location,phone,dob,picture';
const container = document.querySelector('.container')
let employees = [];

// Fetch data

async function getUsers(url) {
    try{
        const response = await fetch(url);
        if(!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        employees = data;
        displayEmployees(data);
        return data;
    } catch (error) {
        console.error(error.message);
    }
}

// Display data
function displayEmployees(data){
    const employeesHTML = employees.results
        .map( 
            (employee, index) => `
                <div class="card" data-index="${index}">
                    <div>
                        <img class="card-img"src="${employee.picture.large}" alt="">
                    </div>
                    <div class="card-details">
                        <h2>${employee.name.first} ${employee.name.last}</h2>
                        <p>${employee.email}</p>
                        <p>${employee.location.city}</p>
                    </div>
                </div>
            `
            )
            .join('');
        container.innerHTML = employeesHTML;
}


// Call function
getUsers(randomUserUrl);




