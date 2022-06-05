import { renderBlock } from './lib';

interface SearchFormData {
  homy: string | null;
  flatRent: string | null;
  city: string | null;
  arriveDate: string | null;
  departDate: string | null;
  maxPrice: number | null;
}

// interface Place {
//
// }

export function renderSearchFormBlock (arriveDate: string, departDate: string): void {
  const html = `
    <form id="search--form">
      <fieldset class="search-filedset">
        <div class="row">
          <div>
            <label for="city">Город</label>
            <input id="city" name="city" type="text" value="Санкт-Петербург" />
            <input type="hidden" disabled value="59.9386,30.3141" />
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
            value="${arriveDate}" min="2021-05-11" max="2021-06-30" name="checkin" />
          </div>
          <div>
            <label for="check-out-date">Дата выезда</label>
            <input id="check-out-date" name="check-out-date" type="date"
            value="${departDate}" min="2021-05-11" max="2021-06-30" name="checkout" />
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

export function search(event: Event): void {
  event.preventDefault();
  const formLink = document.querySelector('#search--form');
  const blank = {
    homy: '',
    flatRent: '',
    city: '',
    arriveDate: '',
    departDate: '',
    maxPrice: 0
  };
  if (formLink instanceof HTMLFormElement) {
    const formData = new FormData(formLink);
    blank.homy = String(formData.get('provider-homy'));
    blank.flatRent = String(formData.get('provider-flat-rent'));
    blank.city = String(formData.get('city'));
    blank.arriveDate = String(formData.get('check-in-date'));
    blank.departDate = String(formData.get('check-out-date'));
    blank.maxPrice = Number(formData.get('price'));
  }
 searchData(blank);
}

export const searchData = (foundData: SearchFormData): void => {
console.log(foundData);
}
