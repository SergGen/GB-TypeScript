// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { renderBlock } from './lib.ts'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function renderUserBlock ( userName: string, avatarLink: string, favoriteItemsAmount: number): void {
  const favoritesCaption = favoriteItemsAmount ? favoriteItemsAmount : 'ничего нет';
  const hasFavoriteItems = !!favoriteItemsAmount;

  renderBlock(
    'user-block',
    `
    <div class="header-container">
      <img class="avatar" src="${avatarLink}" alt="userAvatar" />
      <div class="info">
          <p class="name">${userName}</p>
          <p class="fav">
            <i class="heart-icon${hasFavoriteItems ? ' active' : ''}"></i>${favoritesCaption}
          </p>
      </div>
    </div>
    `
  );
}

export function getUserData ():void {

}

export function getFavoritesAmount ():void {

}
