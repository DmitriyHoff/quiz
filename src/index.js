import "./scss/style.scss";
import { loadQuiz } from "./load-quiz";
import Quiz from "./quiz";

const quizTitle = "Подберём вуз мечты";
const quizDescription =
  "Ответьте на 8 простых вопросов, и мы составим список наболее подходящих для вас вузов";

// Создаём контейнер с заголовком и описанием
const quiz = new Quiz(quizTitle, quizDescription);
document.body.appendChild(quiz.html);

// иммитация асинхронной загрузки
loadQuiz().then((result) => {
  quiz.questions = result;
});
