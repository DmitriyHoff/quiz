import { el } from 'redom';

export default class ContactForm {
  constructor({ currentStep, stepsCount, onSubmit }) {
    this.submitBtn = el('button.btn form__button', 'Отправить');
    this.submitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (onSubmit) onSubmit();
    });
    this._html = el('form.form quiz__form', [
      el('.form__top-panel', [
        el('h2.form__title', 'Ваша подборка готова! 🥳 Куда нам отправить её?'),
        el('.form__step-counter', `Шаг ${currentStep}/${stepsCount}`),
      ]),
      el('.form__main', [
        el('.form__input-wraper', [
          el('input.input form__input', {
            type: 'text',
            placeholder: 'Как Вас зовут?',
          }),
        ]),
        el('.form__input-wraper', [
          el('input.input form__input', {
            type: 'text',
            placeholder: 'Номер телефона',
          }),
        ]),
        el('.form__input-wraper', [
          el('input.input form__input', {
            type: 'text',
            placeholder: 'E-mail',
          }),
        ]),
        this.submitBtn,
        el(
          'p.form__accept-text',
          'Нажимая на кнопку, вы даете согласие на обработку своих ',
          el('a.form__link', 'Персональных данных', { href: '#' })
        ),
      ]),
    ]);
  }

  get html() {
    return this._html;
  }
}
