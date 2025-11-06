export interface ListDoctorDto {
    doctorId: number;
    fullName: string;
    specialization: string;
    qualification: string;
    experienceYear: number;
    profileImagePath: string;
    description: string;
    email: string;
    phone: string;
    departmentName: string;
    hospitals: string[];
    createdAt: string;
    updatedAt: string;
}

 export interface CreateDoctorDto {
    doctorId: number;
    fullName: string;
    specialization: string;
    qualification: string;
    experienceYear: number;
    profileImagePath: string;
    description: string;
    email: string;
    phone: string;
    departmentId: number;
    hospitals: number[];
}