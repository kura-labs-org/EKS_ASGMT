import { Publisher, Subjects, StoreUpdatedEvent } from '@chefapp/common';

export class StoreUpdatedPublisher extends Publisher<StoreUpdatedEvent> {
  readonly subject = Subjects.StoreUpdated;
}
