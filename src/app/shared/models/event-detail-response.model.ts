import { EventType } from "./event-type.model";

export interface EventDetail {
    eventId: number;
    title: string;
    description: string;
    location: string;
    eventImage: string | null;
    eventDate: string;
    eventTime: string;
    typeEvent: EventType;
    registration: string;
    exponentId: number;
    exponentName: string;
    exponentDescription: string;
    exponentImage: string | null;
    share: string;
  }