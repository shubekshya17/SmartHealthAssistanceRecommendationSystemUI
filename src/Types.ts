export interface Hospital {
  id: string;
  name: string;
  address: string;
  city: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  consultationFee: number;
  nextAvailable: string;
}

export interface InsertAppointment {
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  doctorId: string;
  hospitalId: string;
  appointmentDate: string;
  symptoms: string;
  status: string;
}