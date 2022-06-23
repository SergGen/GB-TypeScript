import { FlatRentSdk } from './flat-rent-sdk';
import { fetching, renderBlock } from './lib';
import { DrawElem, renderSearchResultsBlock } from './search-results';

export function renderSearchFormBlock (arriveDate: string, departDate: string): void {
  const html = `
    <form id="search--form">
      <fieldset class="search-filedset">
        <div class="row">
          <div>
            <label for="city">Город</label>
            <input id="city" name="city" type="text" value="Санкт-Петербург" />
            <input type="text" disabled value="59.9386,30.3141" />
          </div>
          <div class="providers">
            <label><input type="checkbox" name="provider-homy" value="homy" checked /> Homy</label>
            <label><input type="checkbox" name="provider-flat-rent" value="flat-rent" checked /> FlatRent</label>
          </div>
        </div>
        <div class="row">
          <div>
            <label for="check-in-date">Дата заезда</label>
            <input id="check-in-date" name="check-in-date" type="date"
            value="${arriveDate}" name="checkin" />
          </div>
          <div>
            <label for="check-out-date">Дата выезда</label>
            <input id="check-out-date" name="check-out-date" type="date"
            value="${departDate}" name="checkout" />
          </div>
          <div>
            <label for="max-price">Макс. цена суток</label>
            <input id="max-price" type="text" value="" name="price" class="max-price" />
          </div>
          <div>
            <div><button id="search-btn">Найти</button></div>
          </div>
        </div>
      </fieldset>
    </form>
    `;
  renderBlock('search-form-block', html);
}

export async function search(event: Event): Promise<DrawElem[]> {
  event.preventDefault();
  const formLink = document.querySelector('#search--form');
  const searchFormParams = {
    homy: '',
    flatRent: '',
    city: '',
    arriveDate: '',
    departDate: '',
    maxPrice: 0
  };
  let places: DrawElem[] = [];
  if (formLink instanceof HTMLFormElement) {
    const formData = new FormData(formLink);
    searchFormParams.homy = String(formData.get('provider-homy'));
    searchFormParams.flatRent = String(formData.get('provider-flat-rent'));
    searchFormParams.city = String(formData.get('city'));
    searchFormParams.arriveDate = String(formData.get('check-in-date'));
    searchFormParams.departDate = String(formData.get('check-out-date'));
    searchFormParams.maxPrice = Number(formData.get('price'));
  }

  if (searchFormParams.homy === 'homy') {
    await fetching();
    const draftData = localStorage.getItem('places');
    if (draftData) {
       places = JSON.parse(draftData);
       places = places.filter((el) => el.price <= searchFormParams.maxPrice);
    }
  }
  if (searchFormParams.flatRent === 'flat-rent') {
    const flatRent = new FlatRentSdk();
    const prepParamsReq = {
      city: searchFormParams.city,
      checkInDate: new Date(searchFormParams.arriveDate),
      checkOutDate: new Date(searchFormParams.departDate),
      priceLimit: searchFormParams.maxPrice,
    }
    const flatRentList = await flatRent.search(prepParamsReq);
    const prepDrawList = flatRentList.map((el) => {
      return {
        id: el.id,
        image: el.photos[0],
        name: el.title,
        price: el.totalPrice,
        remoteness: Number(el.coordinates[0].toFixed(2)),
        description: el.details
      };
    });
    places = places.concat(prepDrawList);
  }
  renderSearchResultsBlock(places);
  // searchData(searchFormParams);
  return places;
}

// export const searchData = (foundData: SearchFormData): void => {
// console.log(foundData);
// }
