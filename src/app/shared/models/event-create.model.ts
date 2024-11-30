export interface EventCreate {
  organizerId: number;
  categoryId: number;
  exponentId: number;
  title: string;
  description: string;
  location: string;
  share: string;
  registration: string;
  typeEvent: EventType;
  eventDate: string;
  eventTime: string;
  price: number;
}

export enum EventType {
  CONFERENCE = 'CONFERENCE',
  WORKSHOP = 'WORKSHOP',
  SEMINAR = 'SEMINAR',
  MEETUP = 'MEETUP'
} 