import { renderToast } from './lib';
import { renderSearchFormBlock, search } from './search-form';
import {
  defaultElems,
  renderEmptyOrErrorSearchBlock,
  renderSearchResultsBlock,
  renderSearchStubBlock,
  resultHandler
} from './search-results';
import { getFavoritesAmount, getUserData, renderUserBlock } from './user';

localStorage.setItem('user', JSON.stringify({ username: 'Vasa', avatarUrl: './img/avatar.png'}));
localStorage.setItem('favoritesAmount', '1');
localStorage.setItem('favoriteItems', JSON.stringify(['1']));
renderUserBlock(getUserData('user'),getFavoritesAmount('favoritesAmount'));
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();
renderSearchFormBlock(`${year}-0${month}-${day}`, '2022-06-30');
// renderSearchStubBlock();
renderSearchResultsBlock(defaultElems);
// renderEmptyOrErrorSearchBlock('No found !!!!!!');
renderToast({text: 'Это пример уведомления. Используйте его при необходимости', type: 'success'},
    {name: 'Понял', handler: () => {console.log('Уведомление закрыто');}});
document.querySelector('#search--form')?.addEventListener('submit', (e: Event) => { e.preventDefault(); });
document.querySelector('#search-results-block')?.addEventListener('click', resultHandler);
document.querySelector('#search-btn')?.addEventListener('click', search);
