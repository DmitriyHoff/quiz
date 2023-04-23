import { el } from "redom";
import ContactForm from "./contact-form";

export default class Quiz {
  _questions;
  userAnswers = {};
  constructor(title, descriptin) {
    // Заголовок опроса
    this._title = title;

    // Текст с описанием
    this._description = descriptin;

    // Текст с вопросом и варианты ответа
    this._question = el(".quiz__question");
    this._answers = el("ul.quiz__answers-list", []);

    // Кнопки `Назад`  и `Далее`
    this._btnPrev = el("button.btn quiz__btn-prev", "Назад");
    this._btnNext = el("button.btn quiz__btn-next", "Далее");
    this._btnPrev.addEventListener("click", () => this.prevStep());
    this._btnNext.addEventListener("click", () => this.nextStep());

    // Текущий шаг
    this.currentStep = 1;

    // Общее количество шагов
    this.stepsCount = 0;
    this.stepCounter = el(
      ".quiz__step-counter",
      `Шаг ${this.currentStep}/${this.stepsCount}`
    );

    // Разметка компонента
    this._html = el(
      ".container",
      el(".quiz", [
        el(".quiz__description", [
          el("h1.quiz__title", this._title),
          el("p.quiz__description-text", this._description),
          el(".quiz__picture", [
            el(".quiz__picture-background"),
            el(".quiz__picture-badge-time", "за 30 секунд"),
            el(".quiz__picture-badge-price", "Бесплатно"),
            el(".quiz__picture-circle"),
          ]),
        ]),
        el(".quiz__steps", [
          el(".quiz__steps-top-panel", [this._question, this.stepCounter]),
          el(".quiz__steps-middle-panel", this._answers),
          el(".quiz__steps-bottom-panel", [this._btnPrev, this._btnNext]),
        ]),
      ])
    );
  }

  /** Возвращает разметку компонента */
  get html() {
    return this._html;
  }

  /** Возвращает список вопросв */
  get questions() {
    return this._questions;
  }
  /** Записывает список вопросов */
  set questions(data) {
    this._questions = data;
    this.stepsCount = data.length + 1;
    this.refresh();
  }

  /** Выполняет переход на предыдущую страницу */
  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep -= 1;
      this.refresh();
    }
  }

  /** Выполняет переход на следующую страницу */
  nextStep() {
    if (this.currentStep <= this.stepsCount) {
      this.currentStep += 1;
      this.refresh();
    }
  }

  /** Выполняет перерисовку формы */
  refresh() {
    // Если последний шаг - добавляем форму
    if (this.currentStep === this.stepsCount) {
      const contactForm = new ContactForm({
        currentStep: this.currentStep,
        stepsCount: this.stepsCount,
        onSubmit: () => {
          alert(this.userAnswers);
        },
      });
      const steps = document.querySelector(".quiz__steps");
      steps.replaceChildren(contactForm.html);
    }
    // В остальных случаях обрабатываем вопросы
    else {
      // проверяем доступность кнопок перехода
      this.setPrevBtnVisibility();
      this.setNextBtnEnaled();

      // Отображвем текст текущего вопроса
      const currentQuestion = this._questions[this.currentStep - 1];
      this._question.innerText = currentQuestion?.question;

      // Устанавливаем текст в счётчике шагов
      this.stepCounter.innerText = `Шаг ${this.currentStep}/${this.stepsCount}`;
      const panel = document.querySelector(".quiz__steps-middle-panel");

      // Если вопрос с несколькими вариантами ответа - добавим чекбоксы
      if (currentQuestion.type === "checkbox") {
        const listItems = el("ul.listreset dropdown__list");
        const dropdownList = el(".dropdown__menu", listItems);
        const dropdownButton = el(
          "button.btn dropdown__button",
          currentQuestion?.placeholder
        );
        const dropdown = el(".dropdown quiz__dropdown", [
          dropdownButton,
          dropdownList,
        ]);

        panel.replaceChild(dropdown, this._answers);

        for (const answer of currentQuestion?.answers) {
          const checkbox = el("input.input", {
            type: "checkbox",
            value: answer.id,
          });

          // добавляем обработчик изменения выбранного элемента
          checkbox.addEventListener("change", () => {
            // записываем выбранные варианты
            this.setUserAnswer(true);

            // Формируем строку в заголовке
            let title = "";
            const selected = this.userAnswers[currentQuestion.id];
            if (selected.length === 0) {
              title = currentQuestion.placeholder;
            } else {
              const answers = currentQuestion.answers
                .filter((x) => selected.includes(x.id.toString()))
                .map((x) => x.value);
              if (selected.length === 1) {
                title = answers[0];
              } else if (selected.length === 2) {
                title = `${answers[0]} и ${answers[1]}`;
              } else {
                title = `${answers[0]}, ${answers[1]} и ещё ${
                  selected.length - 2
                }`;
              }
            }

            dropdownButton.innerText = title;
          });

          const item = el(
            "li.dropdowd__list-item",
            el("label.dropdown__list-item-label", answer.value, [
              checkbox,
              el("span.checkmark"),
            ])
          );
          listItems.append(item);
        }

        this._answers = dropdown;
      }

      // Для остальных вопросов отображаем список с radio-кнопкой
      else {
        const list = el("ul.quiz__answers-list");
        panel.replaceChild(list, this._answers);
        this._answers = list;

        for (const answer of currentQuestion?.answers) {
          const input = el("input.input quiz__input", {
            type: currentQuestion.type,
            value: answer.id,
            name: "quiz",
            id: `quiz${answer.id}`,
          });

          // добавляем обработчик изменения выбранного элемента
          input.addEventListener("change", () => this.setUserAnswer());
          const quizAnswer = el("li.quiz__answer", [
            input,
            el(
              "label.quiz__answer-label",
              { for: `quiz${answer.id}` },
              answer.value
            ),
            el("span.checkmark"),
          ]);
          this._answers.append(quizAnswer);
        }
      }

      // отмечаем ранее выбранные элементы
      this.setCheckedValues();

      // отображаем в одну колонку, если ответов меньше 4-х
      this.setAnswerListColumns();
    }
  }

  /** Сохраняет отмеченные варианты в массиве с ответами */
  setUserAnswer(isCheckbox = false) {
    const currentQuestion = this._questions[this.currentStep - 1];

    let answer;
    if (isCheckbox) {
      answer = [...document.querySelectorAll(".input:checked")].map(
        (e) => e.value
      );
    } else answer = document.querySelector('input[name="quiz"]:checked').value;
    this.userAnswers[currentQuestion.id] = answer;
    this.setNextBtnEnaled();
  }

  /** Изменяет доступность кнопки `Далее` в зависимости от выбранных элементов */
  setNextBtnEnaled() {
    const currentQuestion = this._questions[this.currentStep - 1];
    let state = true;
    const isArray = Array.isArray(this.userAnswers[currentQuestion.id]);
    if (this.userAnswers.hasOwnProperty(currentQuestion.id)) {
      if (isArray && this.userAnswers[currentQuestion.id].length !== 0) {
        state = false;
      } else if (!isArray && this.userAnswers[currentQuestion.id]) {
        state = false;
      }
    }
    this._btnNext.toggleAttribute("disabled", state);
  }

  /** Отмечает выбранные пользователем элементы */
  setCheckedValues() {
    const currentQuestion = this._questions[this.currentStep - 1];
    const value = this.userAnswers[currentQuestion.id];
    if (value) {
      const inputs = [];
      for (const val of value) {
        inputs.push(document.querySelector(`input[value='${val}']`));
      }
      inputs.forEach((x) => (x.checked = true));
    }
  }

  /** Скрывает кнопку `Назад` */
  setPrevBtnVisibility() {
    this._btnPrev.hidden = !(this.currentStep > 1);
  }

  /** Задаёт отображение Grid в одну колонку */
  setAnswerListColumns() {
    const currentQuestion = this._questions[this.currentStep - 1];
    this._answers.classList.toggle(
      "quiz__answers-list--single-column",
      currentQuestion.answers.length < 4
    );
  }
}
