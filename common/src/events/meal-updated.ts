import { Subjects } from './subjects';

export interface MealUpdatedEvent {
  subject: Subjects.MealUpdated;
  data: {
    dishName: string;
    price: string;
    Description: string;
    userId: string;
    storeId: string;
  };
}
