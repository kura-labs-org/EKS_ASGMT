import { Publisher, Subjects, StoreCreatedEvent } from '@chefapp/common';

export class StoreCreatedPublisher extends Publisher<StoreCreatedEvent> {
  readonly subject = Subjects.StoreCreated;
}
