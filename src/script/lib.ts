import { renderSearchResultsBlock2 } from './search-results';

export function renderBlock (elementId = '', html = ''):void {
  const element = document.getElementById(elementId);
  if(element) {
    element.innerHTML = html;
  }
}

export function renderToast(message: { type: string; text: string } | null,
                            action: { handler: () => void; name: string }): void {
  let messageText = '';
  if (message !== null) {
    messageText = `
      <div id="info-block" class="info-block ${message.type}">
        <p>${message.text}</p>
        <button id="toast-main-action">${action?.name || 'Закрыть'}</button>
      </div>
    `;
  }

  renderBlock('toast-block', messageText);

  const button = document.getElementById('toast-main-action');
  if (button !== null) {

    button.onclick = function(): void {
      if (action !== null && action.handler !== null) {
        action.handler();
      }

      renderToast(null, { handler: () => null, name: '' });
    }
  }
}

interface Place {
id: number;
image: string;
name: string;
description: string;
remoteness: number;
bookedDates: number[];
price: number;
}

export const fetching = async (): Promise<Place[]> => {
  const places: Place[] = [];
  let res: Response;
  let data: Place;
  for (let i = 1; ; i++){
    res = await fetch(new URL(`http://localhost:3030/places/${i}/`));
    if (!res.ok) {
      break;
    }
    data = await res.json();
    places.push(data);
  }
  // console.log(places);
  localStorage.setItem('places', JSON.stringify(places));
  renderSearchResultsBlock2();
  return places;
}
