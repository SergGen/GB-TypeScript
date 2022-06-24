import { renderBlock } from './lib'

export function renderUserBlock ( params: { username: string, avatarUrl: string}, favoriteItemsAmount = 0): void {
  const favoritesCaption = favoriteItemsAmount || 'ничего нет';
  const hasFavoriteItems = favoriteItemsAmount > 0;
  const html = `<div class="header-container">
      <img class="avatar" src="${params.avatarUrl}" alt="userAvatar" />
      <div class="info">
          <p class="name">${params.username}</p>
          <p class="fav">
            <i class="heart-icon${hasFavoriteItems ? ' active' : ''}"></i>${favoritesCaption}
          </p>
      </div>
    </div>`;
  renderBlock('user-block', html);
}

export function getUserData(key: unknown): { username: string, avatarUrl: string } {
  let storageData: string | null;
  if (typeof key === 'string') {
    storageData = localStorage.getItem(key);
  } else {
    return { username: '', avatarUrl: '' };
  }
  let parsedData = { username: '', avatarUrl: '' };
  if(storageData) {
    parsedData = JSON.parse(storageData);
  }
  return parsedData;
}

export function getFavoritesAmount(key: unknown):number {
  let storageData: string | null;
  if (typeof key === 'string') {
    storageData = localStorage.getItem(key);
  } else {
    return 0;
  }
  return Number(storageData);
}
