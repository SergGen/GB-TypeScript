import { fetching, renderToast } from './lib';
import { renderSearchFormBlock, search } from './search-form';
import {
  renderEmptyOrErrorSearchBlock,
  renderSearchResultsBlock,
  renderSearchStubBlock,
  resultHandler} from './search-results';
import { getFavoritesAmount, getUserData, renderUserBlock } from './user';


localStorage.setItem('user', JSON.stringify({ username: 'Vasa', avatarUrl: './img/avatar.png'}));
localStorage.setItem('favoritesAmount', '1');
localStorage.setItem('favoriteItems', JSON.stringify(['1']));
renderUserBlock(getUserData('user'),getFavoritesAmount('favoritesAmount'));
renderSearchFormBlock('2021-05-11', '2021-05-13');
// renderSearchStubBlock();
renderSearchResultsBlock();
// renderEmptyOrErrorSearchBlock('No found !!!!!!');
renderToast({text: 'Это пример уведомления. Используйте его при необходимости', type: 'success'},
    {name: 'Понял', handler: () => {console.log('Уведомление закрыто');}});
document.querySelector('#search--form')?.addEventListener('submit', (e: Event) => { e.preventDefault(); });
document.querySelector('#search-results-block')?.addEventListener('click', resultHandler);
document.querySelector('#search-btn')?.addEventListener('click', fetching);
