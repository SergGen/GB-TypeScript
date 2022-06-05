import { renderToast } from './lib';
import { renderSearchFormBlock } from './search-form';
import { renderSearchStubBlock } from './search-results';
import { renderUserBlock } from './user';

window.addEventListener('DOMContentLoaded', () => {
  renderUserBlock('Vasa', '../img/avatar.png',3);
  renderSearchFormBlock('2021-05-11', '2021-05-13');
  renderSearchStubBlock();
  renderToast(
      {text: 'Это пример уведомления. Используйте его при необходимости', type: 'success'},
      {name: 'Понял', handler: () => {console.log('Уведомление закрыто')}}
  );
});
