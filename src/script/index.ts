import { renderToast } from './lib';
import { renderSearchFormBlock, search } from './search-form';
// import { renderSearchStubBlock } from './search-results';
import { getFavoritesAmount, getUserData, renderUserBlock } from './user';


localStorage.setItem('user', JSON.stringify({ username: 'Vasa', avatarUrl: './img/avatar.png'}));
localStorage.setItem('favoritesAmount', '3');
renderUserBlock(getUserData('user'),getFavoritesAmount('favoritesAmount'));
renderSearchFormBlock('2021-05-11', '2021-05-13');
// renderSearchStubBlock();
renderToast({text: 'Это пример уведомления. Используйте его при необходимости', type: 'success'},
    {name: 'Понял', handler: () => {console.log('Уведомление закрыто');}});
document.querySelector('#search-btn')?.addEventListener('click', search);
