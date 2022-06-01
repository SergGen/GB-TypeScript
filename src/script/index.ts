// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { renderToast } from './lib.ts';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { renderSearchFormBlock } from './search-form.ts';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { renderSearchStubBlock } from './search-results.ts';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { renderUserBlock } from './user.ts';

window.addEventListener('DOMContentLoaded', () => {
  renderUserBlock('Vasa', '../img/avatar.png',3);
  renderSearchFormBlock('2021-05-11', '2021-05-13');
  renderSearchStubBlock();
  renderToast(
      {text: 'Это пример уведомления. Используйте его при необходимости', type: 'success'},
      {name: 'Понял', handler: () => {console.log('Уведомление закрыто')}}
  );
});
