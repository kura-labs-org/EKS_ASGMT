import { Subjects } from './subjects';

export interface StoreUpdatedEvent {
  subject: Subjects.StoreUpdated;
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
