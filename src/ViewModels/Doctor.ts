export interface ListDoctorDto {
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