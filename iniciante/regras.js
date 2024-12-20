document.addEventListener('DOMContentLoaded', () => {
    loadProgress4();
    updateGlobalProgress4();
});

function markCompleted4(button) {
    if (button.classList.contains('completed')) {
        button.classList.remove('completed');
        button.textContent = 'Concluir';
    } else {
        button.classList.add('completed');
        button.textContent = 'Concluído';
    }
    // Toca o som de marcação de conclusão
    const markSound = document.getElementById('mark-sound');
    markSound.play();

    saveProgress4();
    updateGlobalProgress4();
}

function saveProgress4() {
    const buttons = document.querySelectorAll('.btn-concluido4'); // Use a nova classe específica da página 4
    const progressData = Array.from(buttons).map(button => button.classList.contains('completed'));
    localStorage.setItem('progress4', JSON.stringify(progressData)); // Salva com uma chave única
}

function loadProgress4() {
    const progressData = JSON.parse(localStorage.getItem('progress4'));

    if (progressData) {
        const buttons = document.querySelectorAll('.btn-concluido4');
        buttons.forEach((button, index) => {
            if (progressData[index]) {
                button.classList.add('completed');
                button.textContent = 'Concluído';
            } else {
                button.classList.remove('completed');
                button.textContent = 'Concluir';
            }
        });
    }
}

function updateGlobalProgress4() {
    const completedButtons = document.querySelectorAll('.btn-concluido4.completed');
    const totalButtons = document.querySelectorAll('.btn-concluido4').length;

    const percentage = Math.round((completedButtons.length / totalButtons) * 100);

    const percentageText = document.getElementById('percentage-text4'); // Novo ID específico
    percentageText.textContent = `${percentage}%`;

    const circle = document.querySelector('.progress-ring4'); // Use a nova classe específica
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    circle.style.strokeDashoffset = offset;

    const circleContainer = document.querySelector('.circle-container4'); // Novo seletor específico
    if (percentage === 100) {
        circleContainer.classList.add('completed-animation');
        showCongratulationsModal4(); // Função específica para a página 4
    } else {
        circleContainer.classList.remove('completed-animation');
    }
}

function showCongratulationsModal4() {
    const modal = document.getElementById('congratulations-modal4'); // Novo ID específico
    modal.style.display = 'flex';
    document.body.classList.add('modal-open');

    showCelebration();
    const sound = document.getElementById("completion-sound");
    sound.play();
}

function closeModal4() {
    const modal = document.getElementById('congratulations-modal4'); // Novo ID específico
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
}
