const questions = [
    {
        question: 'Qual é a capital do Brasil?',
        image: 'brasiliaa.jpg',
        options: ['São Paulo', 'Rio de Janeiro', 'Brasília', 'Belo Horizonte'],
        correctAnswer: 2,
        points: 10
    },

    {
        question: 'Quanto é 51x25/2?',
        image: 'matematica.png',
        options: ['637.5', '1233', '2354.6', '4321'],
        correctAnswer: 0,
        points: 10
    },

    {
        question: 'Sobre o classicismo é correto afirmar:',
        image: 'classicismo.jpg',
        options: ['Movimento que faz referência aos modelos clássicos greco-romanos.', 'Presença de poemas com versos livres e brancos', 'Memorial de Aires é um exemplo de romance classicista.', 'Movimento que surge no século V na Europa.'],
        correctAnswer: 0,
        points: 10
    },

    {
        question: 'Um dos maiores autores de língua portuguesa, Luís Vaz de Camões, escreveu obras no período classicista. Uma delas que se destaca é',
        image: 'luizvaz.jpg',
        options: ['Odisseia', 'Eneida', 'A Guerra de Troia', 'Os Lusíadas'],
        correctAnswer: 3,
        points: 10
    },

    {
        question: 'O número que devemos somar aos termos da fração 9/19, para se obter a fração 3/5 é:',
        image: 'matematica.png',
        options: ['16.', '6.', '10.', '17.'],
        correctAnswer: 1,
        points: 10
    },



    
    


    // Adicione outras perguntas aqui...
];

// Elementos HTML
const questionText = document.getElementById('question-text');
const options = document.querySelectorAll('.option');
const submitAnswerButton = document.getElementById('submit-answer');
const message = document.getElementById('message');
const scoreElement = document.getElementById('score');

// Variáveis de controle
let currentQuestionIndex = 0;
let chances = 2;
let score = 0;

// Função para exibir a pergunta
function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionText.textContent = `Pergunta ${currentQuestionIndex + 1}: ${currentQuestion.question}`;
    
    // Inserir a imagem na pergunta
    const image = document.createElement('img');
    image.src = currentQuestion.image;
    image.alt = currentQuestion.question;
    image.style.maxWidth = '100%';
    image.style.marginTop = '10px';
    const questionContainer = document.querySelector('.question');
    questionContainer.insertBefore(image, questionContainer.firstChild);

    options.forEach((option, index) => {
        option.textContent = currentQuestion.options[index];
    });
}

// Função para verificar a resposta
function checkAnswer(selectedIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedIndex === currentQuestion.correctAnswer) {
        score += currentQuestion.points;
        scoreElement.textContent = `Pontuação: ${score}`;
        message.textContent = 'Resposta correta!';
        currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
            displayQuestion();
        } else {
            questionText.textContent = 'Parabéns, você completou o quizz!';
            options.forEach(option => option.style.display = 'none');
            submitAnswerButton.style.display = 'none';
        }
    } else {
        chances--;

        if (chances === 0) {
            questionText.textContent = 'Você errou todas as chances. Recomece o quizz.';
            options.forEach(option => option.style.display = 'none');
            submitAnswerButton.style.display = 'none';
        } else {
            message.textContent = 'Resposta incorreta. Tente novamente.';
        }
    }
}

// Iniciar o quizz
displayQuestion();

submitAnswerButton.addEventListener('click', () => {
    const selectedOptionIndex = Array.from(options).findIndex(option => option.classList.contains('selected'));
    if (selectedOptionIndex !== -1) {
        checkAnswer(selectedOptionIndex);
    } else {
        message.textContent = 'Selecione uma opção antes de responder.';
    }
});

options.forEach((option, index) => {
    option.addEventListener('click', () => {
        options.forEach(option => option.classList.remove('selected'));
        option.classList.add('selected');
    });
});

// Elemento HTML do botão Recomeçar Quizz
const restartButton = document.getElementById('restart-quiz');

// Função para reiniciar o Quizz
function restartQuiz() {
    currentQuestionIndex = 0;
    chances = 2;
    score = 0;
    message.textContent = '';
    scoreElement.textContent = 'Pontuação: 0';
    displayQuestion();
    options.forEach(option => option.style.display = 'list-item');
    submitAnswerButton.style.display = 'block';
    restartButton.style.display = 'none';
}

// Adicionar evento de clique ao botão Recomeçar Quizz
restartButton.addEventListener('click', restartQuiz);