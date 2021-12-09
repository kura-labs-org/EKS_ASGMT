import { Subjects } from './subjects';

export interface StoreCreatedEvent {
  subject: Subjects.StoreCreated;
  data: {
    StoreName: string;
    userId: string;
    bio: string;
    careerHighlights: string;
    address: string | undefined;
    location: object;
    operatingHours: string;
    website: string;
  };
}
