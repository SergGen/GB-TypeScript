interface FlatElem {
  id: string | number,
  title: string,
  details: string,
  photos: string[],
  coordinates: number[],
  bookedDates: Date[] | number[],
  totalPrice: number
}

export function cloneDate(date: Date): Date;
export function addDays(date: Date, days: number): Date;

interface ParametersFlatRentSdk {
  city: string,
  checkInDate: Date,
  checkOutDate: Date,
  priceLimit: number,
}

export class FlatRentSdk {
  get(id:string): null | FlatElem
  search(parameters:ParametersFlatRentSdk): FlatElem[]
  book(flatId:string, checkInDate:Date, checkOutDate:Date): Promise<number>;
}
