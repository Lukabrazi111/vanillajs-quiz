const quizContainer = document.getElementById('quiz-container');
const questionText = document.getElementById('question');
const currentAnswers = document.getElementById('answers');
const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');

let shuffledQuestions;
let currentQuestionIndex;

function startQuiz() {
    startButton.classList.add('hide');
    quizContainer.classList.remove('hide');
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    setQuestion(shuffledQuestions[currentQuestionIndex]);
}

function setQuestion(question) {
    questionText.innerText = question.question;

    question.answers.forEach((answer) => {
        const button = document.createElement('button');
        button.classList.add('btn');
        button.innerText = answer.text;
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', setAnswer);
        currentAnswers.append(button);
    });
}

function setAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(currentAnswers.children).forEach((button) => {
        setStatusClass(button, button.dataset.correct);
    });

    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        startButton.innerText = 'Restart';
        startButton.classList.remove('hide');
    }
}

function setStatusClass(element, status) {
    clearStatusClass(element);
    if (status) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (currentAnswers.firstElementChild) {
        currentAnswers.removeChild(currentAnswers.firstElementChild);
    }
}

// Events
startButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});
