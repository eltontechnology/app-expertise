// Atualiza o dia da semana baseado na data escolhida
document.getElementById('date').addEventListener('change', function () {
    const dateValue = this.value;
    if (dateValue) {
        const date = new Date(dateValue + 'T00:00:00'); // Adiciona uma hora para garantir que a data está correta
        const dayOfWeek = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'][date.getUTCDay()]; // Use getUTCDay() para garantir precisão
        document.getElementById('dayOfWeek').value = dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1);
    } else {
        document.getElementById('dayOfWeek').value = '';
    }
});

// Exibir/ocultar o histórico
document.getElementById('toggleHistoryBtn').addEventListener('click', function () {
    const historyContainer = document.getElementById('historyContainer');
    historyContainer.classList.toggle('d-none');
});

// Cadastro de nova pessoa
document.getElementById('addPersonBtn').addEventListener('click', function () {
    document.getElementById('newPersonContainer').classList.toggle('d-none');
});

// Salvar nova pessoa
document.getElementById('saveNewPersonBtn').addEventListener('click', function () {
    const newPerson = document.getElementById('newPerson').value;
    if (newPerson) {
        const peopleField = document.getElementById('people');
        const newOption = document.createElement('option');
        newOption.value = newPerson;
        newOption.textContent = newPerson;
        peopleField.appendChild(newOption);
        peopleField.value = newPerson;  // Selecionar a nova pessoa
        document.getElementById('newPerson').value = '';
        document.getElementById('newPersonContainer').classList.add('d-none');
        saveData();
    }
});

// Remover pessoa
document.getElementById('removePersonBtn').addEventListener('click', function () {
    const peopleField = document.getElementById('people');
    peopleField.remove(peopleField.selectedIndex);
    saveData();
});

// Cadastro de novo estabelecimento
document.getElementById('addPlaceBtn').addEventListener('click', function () {
    document.getElementById('newPlaceContainer').classList.toggle('d-none');
});

// Salvar novo estabelecimento
document.getElementById('saveNewPlaceBtn').addEventListener('click', function () {
    const newPlace = document.getElementById('newPlace').value;
    if (newPlace) {
        const placeField = document.getElementById('place');
        const newOption = document.createElement('option');
        newOption.value = newPlace;
        newOption.textContent = newPlace;
        placeField.appendChild(newOption);
        placeField.value = newPlace;  // Selecionar o novo estabelecimento
        document.getElementById('newPlace').value = '';
        document.getElementById('newPlaceContainer').classList.add('d-none');
        saveData();
    }
});

// Remover estabelecimento
document.getElementById('removePlaceBtn').addEventListener('click', function () {
    const placeField = document.getElementById('place');
    placeField.remove(placeField.selectedIndex);
    saveData();
});

// Cadastro de nova cidade
document.getElementById('addCityBtn').addEventListener('click', function () {
    document.getElementById('newCityContainer').classList.toggle('d-none');
});

// Salvar nova cidade
document.getElementById('saveNewCityBtn').addEventListener('click', function () {
    const newCity = document.getElementById('newCity').value;
    if (newCity) {
        const cityField = document.getElementById('city');
        const newOption = document.createElement('option');
        newOption.value = newCity;
        newOption.textContent = newCity;
        cityField.appendChild(newOption);
        cityField.value = newCity;  // Selecionar a nova cidade
        document.getElementById('newCity').value = '';
        document.getElementById('newCityContainer').classList.add('d-none');
        saveData();
    }
});

// Remover cidade
document.getElementById('removeCityBtn').addEventListener('click', function () {
    const cityField = document.getElementById('city');
    cityField.remove(cityField.selectedIndex);
    saveData();
});

// Lógica para adicionar entradas ao histórico
document.getElementById('organizeForm').addEventListener('submit', function (e) {
    e.preventDefault();
    
    const date = document.getElementById('date').value;
    const dayOfWeek = document.getElementById('dayOfWeek').value;
    const people = document.getElementById('people').value;
    const place = document.getElementById('place').value;
    const city = document.getElementById('city').value;
    const topic = document.getElementById('topic').value;
    const food = parseFloat(document.getElementById('food').value) || 0;
    const uber = parseFloat(document.getElementById('uber').value) || 0;
    const fuel = parseFloat(document.getElementById('fuel').value) || 0;
    const lodging = parseFloat(document.getElementById('lodging').value) || 0;

    const totalBalance = food + uber + fuel + lodging;

    const historyEntry = {
        date: date,
        dayOfWeek: dayOfWeek,
        people: people,
        place: place,
        city: city,
        topic: topic,
        food: food,
        uber: uber,
        fuel: fuel,
        lodging: lodging,
        totalBalance: totalBalance
    };

    addEntryToHistory(historyEntry);
    saveData();
    document.getElementById('organizeForm').reset();
    document.getElementById('dayOfWeek').value = '';
});

// Função para adicionar entrada ao histórico na tabela
function addEntryToHistory(entry) {
    const historyRow = `
        <tr>
            <td>${new Date(entry.date).toLocaleDateString('pt-BR')}</td>
            <td>${entry.dayOfWeek}</td>
            <td>${entry.people}</td>
            <td>${entry.place}</td>
            <td>${entry.city}</td>
            <td>${entry.topic}</td>
            <td>${entry.food.toFixed(2)}</td>
            <td>${entry.uber.toFixed(2)}</td>
            <td>${entry.fuel.toFixed(2)}</td>
            <td>${entry.lodging.toFixed(2)}</td>
            <td>${entry.totalBalance.toFixed(2)}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editEntry(this)">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="removeEntry(this)">Excluir</button>
            </td>
        </tr>
    `;

    document.getElementById('history').insertAdjacentHTML('beforeend', historyRow);
}

// Função para remover uma entrada do histórico
function removeEntry(button) {
    const row = button.parentElement.parentElement;
    row.remove();
    saveData();
}

// Função para editar uma entrada do histórico
function editEntry(button) {
    const row = button.parentElement.parentElement;
    const cells = row.children;

    document.getElementById('date').value = cells[0].innerText;
    document.getElementById('dayOfWeek').value = cells[1].innerText;
    document.getElementById('people').value = cells[2].innerText;
    document.getElementById('place').value = cells[3].innerText;
    document.getElementById('city').value = cells[4].innerText;
    document.getElementById('topic').value = cells[5].innerText;
    document.getElementById('food').value = parseFloat(cells[6].innerText);
    document.getElementById('uber').value = parseFloat(cells[7].innerText);
    document.getElementById('fuel').value = parseFloat(cells[8].innerText);
    document.getElementById('lodging').value = parseFloat(cells[9].innerText);

    // Remover a linha editada
    row.remove();
    saveData();
}

// Função para salvar os dados no localStorage
function saveData() {
    const history = [];
    const people = [];
    const places = [];
    const cities = [];
    
    const rows = document.querySelectorAll('#history tr');
    
    rows.forEach(row => {
        const cells = row.children;
        const entry = {
            date: cells[0].innerText,
            dayOfWeek: cells[1].innerText,
            people: cells[2].innerText,
            place: cells[3].innerText,
            city: cells[4].innerText,
            topic: cells[5].innerText,
            food: parseFloat(cells[6].innerText),
            uber: parseFloat(cells[7].innerText),
            fuel: parseFloat(cells[8].innerText),
            lodging: parseFloat(cells[9].innerText),
            totalBalance: parseFloat(cells[10].innerText)
        };
        history.push(entry);
    });

    // Armazenar pessoas
    const peopleField = document.getElementById('people');
    for (let i = 0; i < peopleField.options.length; i++) {
        people.push(peopleField.options[i].value);
    }

    // Armazenar estabelecimentos
    const placeField = document.getElementById('place');
    for (let i = 0; i < placeField.options.length; i++) {
        places.push(placeField.options[i].value);
    }

    // Armazenar cidades
    const cityField = document.getElementById('city');
    for (let i = 0; i < cityField.options.length; i++) {
        cities.push(cityField.options[i].value);
    }

    localStorage.setItem('weeklyHistory', JSON.stringify(history));
    localStorage.setItem('people', JSON.stringify(people));
    localStorage.setItem('places', JSON.stringify(places));
    localStorage.setItem('cities', JSON.stringify(cities));
}

// Função para carregar os dados do localStorage
function loadData() {
    const storedHistory = JSON.parse(localStorage.getItem('weeklyHistory'));
    const storedPeople = JSON.parse(localStorage.getItem('people'));
    const storedPlaces = JSON.parse(localStorage.getItem('places'));
    const storedCities = JSON.parse(localStorage.getItem('cities'));
    
    if (storedHistory) {
        storedHistory.forEach(entry => addEntryToHistory(entry));
    }

    if (storedPeople) {
        const peopleField = document.getElementById('people');
        storedPeople.forEach(person => {
            const newOption = document.createElement('option');
            newOption.value = person;
            newOption.textContent = person;
            peopleField.appendChild(newOption);
        });
    }

    if (storedPlaces) {
        const placeField = document.getElementById('place');
        storedPlaces.forEach(place => {
            const newOption = document.createElement('option');
            newOption.value = place;
            newOption.textContent = place;
            placeField.appendChild(newOption);
        });
    }

    if (storedCities) {
        const cityField = document.getElementById('city');
        storedCities.forEach(city => {
            const newOption = document.createElement('option');
            newOption.value = city;
            newOption.textContent = city;
            cityField.appendChild(newOption);
        });
    }
}

// Carregar os dados quando a página for carregada
window.onload = loadData;
