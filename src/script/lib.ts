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
id: number | string;
image: string;
name: string;
description: string;
remoteness: number;
bookedDates: Date[];
price: number;
}

export const fetching = async (
  coordinates:string,
  checkInDate:number,
  checkOutDate:number,
  maxPrice:number): Promise<void> => {

  let places: Place[] = [];
  let res: Response;

  const param = `?coordinates=${coordinates}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&maxPrice=${maxPrice}`;
  const url = new URL(`http://localhost:3030/places${param}`);
  try {
    res = await fetch(url);
  } catch {
    throw new Error('err fetching');
  }
  const data = await res.json();
  places = [...data];
  localStorage.setItem('places', JSON.stringify(places));
}

export const calcDistance = (currentCoordinates: number[], placeCoordinates: number[]): number => {
  const EARTH_RADIUS = 6372795;
  // перевести координаты в радианы
  const lat1 = currentCoordinates[0] * Math.PI / 180;
  const lat2 = currentCoordinates[1] * Math.PI / 180;
  const long1 = placeCoordinates[0] * Math.PI / 180;
  const long2 = placeCoordinates[1] * Math.PI / 180;

// косинусы и синусы широт и разницы долгот
  const cl1 = Math.cos(lat1);
  const cl2 = Math.cos(lat2);
  const sl1 = Math.sin(lat1);
  const sl2 = Math.sin(lat2);
  const delta = long2 - long1;
  const cDelta = Math.cos(delta);
  const sDelta = Math.sin(delta);

// вычисления длины большого круга
  const y = Math.sqrt(Math.pow(cl2 * sDelta, 2) + Math.pow(cl1 * sl2 - sl1 * cl2 * cDelta, 2));
  const x = sl1 * sl2 + cl1 * cl2 * cDelta;

  const ad = Math.atan2(y, x);
  const dist = ad * EARTH_RADIUS / 1000000;
  return Number(dist.toFixed(2));
}
