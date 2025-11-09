export interface AppointmentDto {
    id: number;
    doctorId: number;
    hospitalId: number;
    date: string;
    startTime: string;
    endTime: string;
    doctorName: string;
    patientName: string;
    patientEmail: string;
    patientPhone: string;
    createdAt: string;
}