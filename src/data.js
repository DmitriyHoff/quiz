export default [
  {
    id: 1,
    type: 'radio',
    question: 'Для кого вы ищете учебное заведение?',
    answers: [
      { id: 1, value: 'Себе' },
      { id: 2, value: 'Супругу/супруге' },
      { id: 3, value: 'Родственнику' },
      { id: 4, value: 'Коллеге' },
      { id: 5, value: 'Ребенку' },
      { id: 6, value: 'Другое' },
    ],
  },
  {
    id: 2,
    type: 'checkbox',
    question: 'В каком городе планируете поступать?',
    answers: [
      { id: 1, value: 'Москва' },
      { id: 2, value: 'Санкт-Петербург' },
      { id: 3, value: 'Новосибирск' },
      { id: 4, value: 'Нижний Новгород' },
      { id: 5, value: 'Ростов-на-Дону' },
      { id: 6, value: 'Другой' },
    ],
    placeholder: 'Город',
  },
  {
    id: 3,
    type: 'radio',
    question: 'Какое образование уже есть?',
    answers: [
      { id: 1, value: '9 классов' },
      { id: 2, value: 'Колледж/техникум' },
      { id: 3, value: '11 классов' },
      { id: 4, value: 'Училище' },
      { id: 5, value: 'Неоконченное высшее' },
      { id: 6, value: 'Высшее' },
    ],
  },
  {
    id: 4,
    type: 'radio',
    question: 'Куда планируете поступать?',
    answers: [
      { id: 1, value: 'Вуз' },
      { id: 2, value: 'Колледж/техникум' },
      { id: 3, value: 'Училище' },
    ],
  },
  {
    id: 5,
    type: 'radio',
    question: 'Какую форму обучения предпочитаете?',
    answers: [
      { id: 1, value: 'Очную' },
      { id: 2, value: 'Заочную' },
      { id: 3, value: 'Дистанционную' },
    ],
  },
  {
    id: 6,
    type: 'radio',
    question: 'Рассматриваете платное обучение?',
    answers: [
      { id: 1, value: 'Нет, только бюджет' },
      { id: 2, value: 'Да, планирую учиться платно' },
      { id: 3, value: 'Возможны оба варианта' },
    ],
  },
  {
    id: 7,
    type: 'checkbox',
    question: 'Какая специальность интересует?',
    answers: [
      { id: 1, value: 'Экономика' },
      { id: 2, value: 'Философия' },
      { id: 3, value: 'Социология' },
      { id: 4, value: 'Менеджмент' },
      { id: 5, value: 'Любая' },
    ],
    placeholder: 'Специальность',
  },
  {
    id: 8,
    type: 'radio',
    question: 'Как скоро планируете поступать?',
    answers: [
      { id: 1, value: 'Как можно быстрее' },
      { id: 2, value: 'Месяц' },
      { id: 3, value: 'Квартал' },
      { id: 4, value: 'Полгода' },
      { id: 5, value: 'Год' },
    ],
  },
];
