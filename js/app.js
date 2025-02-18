// Global Variables //
const randomUserUrl = 'https://randomuser.me/api/?results=12&inc=name,email,location,phone,dob,picture';
const container = document.querySelector('.container');
const overlay = document.querySelector('.overlay');
const modalContent = document.querySelector('.modal-content');
const modalClose = document.querySelector('.modal-close');

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
        employees = data.results;
        displayEmployees(data);
        return data;
    } catch (error) {
        console.error(error.message);
    }
}

// Display data
function displayEmployees(data){
    const employeesHTML = employees
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


// Event Listeners

    // Display modal with clicked employee's info
container.addEventListener('click', (event) => {
    const employeeCard = event.target.closest('.card');
    if(!employeeCard) return
    
    const employeeIndex = employeeCard.dataset.index;
    const employee = employees[employeeIndex];

    console.log(employee);
    const birthday = new Date(employee.dob.date);
    const birthdayFormatted = birthday.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });

    modalContent.innerHTML = `
                <img class="modal-img" src="${employee.picture.large}" alt="">
                <h2>${employee.name.first} ${employee.name.last}</h2>
                <p>${employee.email}</p>
                <p>${employee.location.city}</p>
                <div><hr></div>
                <p>${employee.phone}</p>
                <p>${employee.location.street.number} ${employee.location.street.name} ${employee.location.city}, ${employee.location.state} ${employee.location.postcode}</p>
                <p>Birthday: ${birthdayFormatted}</p>
            `;
    overlay.classList.remove('hidden');
});

    // Close button on modal
modalClose.addEventListener('click', (event) => {
    overlay.classList.add('hidden');
});







