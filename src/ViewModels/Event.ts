export interface ListEventDto {
    eventId: number;
    eventName: string;
    eventLocation: string;
    description: string;
    eventDate: string;
    startingTime: string | null;
    closingTime: string | null;
    imageUrl: string;
    hospitalName: string;
}
export interface EventDtoForEventPage {
    eventId: number;
    eventName: string;
    eventLocation: string;
    description: string;
    eventDate: string;
    startingTime: string | null;
    closingTime: string | null;
    imageUrl: string;
    hospitalName: string;
}
export interface CreateEventDto {
    eventId: number;
    eventName: string;
    eventLocation: string;
    description: string;
    eventDate: string;
    startingTime: string | null;
    closingTime: string | null;
    imageUrl: string;
    hospitalId: number;
}