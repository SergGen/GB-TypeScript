import { renderBlock } from './lib';
import { getFavoritesAmount, getUserData, renderUserBlock } from './user';

export function renderSearchStubBlock(): void {
  renderBlock(
    'search-results-block',
    `
    <div class="before-results-block">
      <img src="./img/start-search.png"  alt='start-search.png'/>
      <p>Чтобы начать поиск, заполните форму и&nbsp;нажмите "Найти"</p>
    </div>
    `
  );
}

export function renderEmptyOrErrorSearchBlock (reasonMessage: string):void {
  renderBlock(
    'search-results-block',
    `
    <div class="no-results-block">
      <img src="./img/no-results.png"  alt='no-results.png'/>
      <p>${reasonMessage}</p>
    </div>
    `
  )
}

export function renderSearchResultsBlock ():void {
  renderBlock(
    'search-results-block',
    `
    <div class="search-results-header">
        <p>Результаты поиска</p>
        <div class="search-results-filter">
            <span><i class="icon icon-filter"></i> Сортировать:</span>
            <select>
                <option selected="">Сначала дешёвые</option>
                <option selected="">Сначала дорогие</option>
                <option>Сначала ближе</option>
            </select>
        </div>
    </div>
    <ul class="results-list">
      <li class="result">
        <div class="result-container">
          <div class="result-img-container">
            <div class="favorites active" data-id="1"></div>
            <img class="result-img" src="./img/result-1.png" alt="result-1.png">
          </div>
          <div class="result-info">
            <div class="result-info--header">
              <p>YARD Residence Apart-hotel</p>
              <p class="price">13000&#8381;</p>
            </div>
            <div class="result-info--map"><i class="map-icon"></i> 2.5км от вас</div>
            <div class="result-info--descr">Комфортный апарт-отель в самом сердце Санкт-Петербрга.
            К услугам гостей номера с видом на город и бесплатный Wi-Fi.</div>
            <div class="result-info--footer">
              <div>
                <button>Забронировать</button>
              </div>
            </div>
          </div>
        </div>
      </li>
      <li class="result">
        <div class="result-container">
          <div class="result-img-container">
            <div class="favorites" data-id="2"></div>
            <img class="result-img" src="./img/result-2.png" alt="result-2.png">
          </div>
          <div class="result-info">
            <div class="result-info--header">
              <p>Akyan St.Petersburg</p>
              <p class="price">13000&#8381;</p>
            </div>
            <div class="result-info--map"><i class="map-icon"></i> 1.1км от вас</div>
            <div class="result-info--descr">Отель Akyan St-Petersburg с бесплатным Wi-Fi
            на всей территории расположен в историческом здании Санкт-Петербурга.</div>
            <div class="result-info--footer">
              <div>
                <button>Забронировать</button>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
    `
  )
}

export const toggleFavoriteItem = (elem: HTMLElement):void => {
  const strFavorites = localStorage.getItem('favoriteItems');
  if (!strFavorites) {
    return;
  }
  const favorites = new Set(JSON.parse(strFavorites));
  if (favorites.has(elem.dataset.id)) {
    favorites.delete(elem.dataset.id);
  } else {
    favorites.add(elem.dataset.id);
  }
  elem.classList.toggle('active');
  localStorage.setItem('favoriteItems', JSON.stringify(Array.from(favorites)));
}

const checkFavorites = (id:string):string => {
  const strFavorites = localStorage.getItem('favoriteItems');
  if (!strFavorites) {
    return '';
  }
  const favorites = new Set(JSON.parse(strFavorites));
  return favorites.has(id) ? ' active' : '';
}

const updateFavoritesCount = ():void => {
  const strFavorites = localStorage.getItem('favoriteItems');
  if (!strFavorites) {
    return;
  }
  const favorites = new Set(JSON.parse(strFavorites));
  localStorage.setItem('favoritesAmount', String(favorites.size));
  renderUserBlock(getUserData('user'),getFavoritesAmount('favoritesAmount'));
}

export const resultHandler = (e):void => {
  if (e.target.classList.contains('favorites')) {
    toggleFavoriteItem(e.target);
    updateFavoritesCount();
  }
}

export const renderSearchResultsBlock2 = (): void => {
  const draftData = localStorage.getItem('places');
  let places = [];
  if (draftData) {
    places = JSON.parse(draftData);
  }
  if (places.length === 0) {
    renderEmptyOrErrorSearchBlock('No found');
  } else {
    const baseHtml = `<div class="search-results-header">
        <p>Результаты поиска</p>
        <div class="search-results-filter">
            <span><i class="icon icon-filter"></i> Сортировать:</span>
            <select>
                <option selected="">Сначала дешёвые</option>
                <option selected="">Сначала дорогие</option>
                <option>Сначала ближе</option>
            </select>
        </div>
    </div>
    <ul class="results-list" id="results-list"></ul>`;
    renderBlock('search-results-block', baseHtml);
    let elBlank = '';
    places.forEach((el) => {
      const active = checkFavorites(String(el['id']));
      elBlank += `<li class="result">
        <div class="result-container">
          <div class="result-img-container">
            <div class="favorites${active}" data-id="${el['id']}"></div>
            <img class="result-img" src="${el['image']}" alt="${el['image']}">
          </div>
          <div class="result-info">
            <div class="result-info--header">
              <p>${el['name']}</p>
              <p class="price">${el['price']} &#8381;</p>
            </div>
            <div class="result-info--map"><i class="map-icon"></i> ${el['remoteness']} км от вас</div>
            <div class="result-info--descr">${el['description']}</div>
            <div class="result-info--footer">
              <div>
                <button class='get_room'>Забронировать</button>
              </div>
            </div>
          </div>
        </div>
      </li>`;
    });
    renderBlock('results-list', elBlank);
  }
};
