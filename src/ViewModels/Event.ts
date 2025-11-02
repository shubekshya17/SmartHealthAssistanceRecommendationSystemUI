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