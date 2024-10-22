document.addEventListener('DOMContentLoaded', () => {
    loadEntries();
    document.getElementById('cadastroForm').addEventListener('submit', addEntry);
    document.getElementById('mesSelecionado').addEventListener('change', renderHistorico);
    populateMonthSelector();
});

function addEntry(event) {
    event.preventDefault();

    const nomePessoa = document.getElementById('nomePessoa').value;
    const estabelecimento = document.getElementById('estabelecimento').value;
    const cidade = document.getElementById('cidade').value;
    const data = document.getElementById('data').value;
    const pauta = document.getElementById('pauta').value;
    const alimentacao = parseFloat(document.getElementById('alimentacao').value) || 0;
    const uber = parseFloat(document.getElementById('uber').value) || 0;
    const combustivel = parseFloat(document.getElementById('combustivel').value) || 0;
    const hospedagem = parseFloat(document.getElementById('hospedagem').value) || 0;

    const total = alimentacao + uber + combustivel + hospedagem;

    const entry = {
        id: Date.now(),
        nomePessoa,
        estabelecimento,
        cidade,
        data,
        pauta,
        alimentacao,
        uber,
        combustivel,
        hospedagem,
        total,
        diaDaSemana: getDiaDaSemana(data)
    };

    saveEntry(entry);
    clearForm();
    renderHistorico(); // Atualiza a visualização do histórico
}

function saveEntry(entry) {
    let entries = JSON.parse(localStorage.getItem('entries')) || [];
    entries.push(entry);
    localStorage.setItem('entries', JSON.stringify(entries));
}

function loadEntries() {
    renderHistorico(); // Renderiza o histórico ao carregar as entradas
}

function populateMonthSelector() {
    const monthSelector = document.getElementById('mesSelecionado');
    const months = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    const currentYear = new Date().getFullYear();

    for (let i = 0; i < months.length; i++) {
        monthSelector.innerHTML += `<option value="${i + 1}-${currentYear}">${months[i]} ${currentYear}</option>`;
    }
}

function getDiaDaSemana(dataString) {
    const diasDaSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    const dateParts = dataString.split('-'); // 'YYYY-MM-DD'
    const year = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]) - 1; // Mês começa em 0
    const day = parseInt(dateParts[2]);
    const date = new Date(Date.UTC(year, month, day)); // Usando UTC para evitar problemas de fuso horário
    return diasDaSemana[date.getUTCDay()]; // Obtem o dia da semana em UTC
}

function formatDate(dateString) {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
}

function renderHistorico() {
    const entries = JSON.parse(localStorage.getItem('entries')) || [];
    const blocoHistorico = document.getElementById('blocoHistorico');
    const selectedMonth = document.getElementById('mesSelecionado').value;
    blocoHistorico.innerHTML = ''; // Limpa o conteúdo anterior

    // Filtrar entradas para o mês selecionado
    const filteredEntries = entries.filter(entry => {
        const entryDate = new Date(entry.data);
        const mesAno = `${entryDate.getMonth() + 1}-${entryDate.getFullYear()}`;
        return mesAno === selectedMonth; // Compara com o mês selecionado
    });

    if (filteredEntries.length > 0) {
        const mesDiv = document.createElement('div');
        mesDiv.classList.add('mes-bloco');

        filteredEntries.forEach(entry => {
            const bloco = document.createElement('div');
            bloco.classList.add('historico-bloco');
            bloco.innerHTML = `
                <h5><strong>Equipe: </strong> ${entry.nomePessoa}<br>(${entry.diaDaSemana}) - ${formatDate(entry.data)}</h5>
                <p><strong>Estabelecimento:</strong> ${entry.estabelecimento}</p>
                <p><strong>Cidade:</strong> ${entry.cidade}</p>
                <p><strong>Pauta:</strong> ${entry.pauta}</p>
                <p><strong>Alimentação:</strong> R$ ${entry.alimentacao.toFixed(2)}</p>
                <p><strong>Uber:</strong> R$ ${entry.uber.toFixed(2)}</p>
                <p><strong>Combustível:</strong> R$ ${entry.combustivel.toFixed(2)}</p>
                <p><strong>Hospedagem:</strong> R$ ${entry.hospedagem.toFixed(2)}</p>
                <p><strong>Total de Gastos:</strong> R$ ${entry.total.toFixed(2)}</p>
                <button class="btn btn-warning btn-sm" onclick="editEntry(${entry.id})">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="deleteEntry(${entry.id})">Excluir</button>
            `;
            mesDiv.appendChild(bloco);
        });

        blocoHistorico.appendChild(mesDiv);
    } else {
        blocoHistorico.innerHTML = '<p>Nenhuma entrada encontrada para este mês.</p>';
    }
}

function clearForm() {
    document.getElementById('cadastroForm').reset();
}

function editEntry(id) {
    const entries = JSON.parse(localStorage.getItem('entries')) || [];
    const entry = entries.find(e => e.id === id);

    document.getElementById('nomePessoa').value = entry.nomePessoa;
    document.getElementById('estabelecimento').value = entry.estabelecimento;
    document.getElementById('cidade').value = entry.cidade;
    document.getElementById('data').value = entry.data;
    document.getElementById('pauta').value = entry.pauta;
    document.getElementById('alimentacao').value = entry.alimentacao;
    document.getElementById('uber').value = entry.uber;
    document.getElementById('combustivel').value = entry.combustivel;
    document.getElementById('hospedagem').value = entry.hospedagem;

    deleteEntry(id); // Remove a entrada original após editar
}

function deleteEntry(id) {
    let entries = JSON.parse(localStorage.getItem('entries')) || [];
    entries = entries.filter(entry => entry.id !== id);
    localStorage.setItem('entries', JSON.stringify(entries));
    renderHistorico(); // Atualiza o histórico após exclusão
}

