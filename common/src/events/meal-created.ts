import { Subjects } from './subjects';

export interface MealCreatedEvent {
  subject: Subjects.MealCreated;
  data: {
    dishName: string;
    price: string;
    Description: string;
    userId: string;
    storeId: string;
  };
}
