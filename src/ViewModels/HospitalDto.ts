import type { HospitalType } from "../Enums/HospitalType";

export interface ListHospitalDto {
    hospitalId: number;
    hospitalName: string;
    address: string;
    latitude: number;
    longitude: number;
    phone: string;
    email: string;
    description: string;
    imagePath: string;
    type: HospitalType;
    openingTime: string;
    closingTime: string;
    specialities: string[];
    departmentName: string[];
}
export interface NearbyHospitalDto {
    hospitalId: number;
    hospitalName: string;
    address: string;
    latitude: number;
    longitude: number;
    phone: string;
    email: string;
    description: string;
    imagePath: string;
    type: HospitalType;
    openingTime: string;
    closingTime: string;
    specialities: string[];
    length: number;
    distance: number;
    isOpen: boolean
}
export interface CreateHospitalDto
{
    hospitalId: number;
    hospitalName: string;
    address: string;
    latitude: number;
    longitude: number;
    phone: string;
    email: string;
    // public DateTime CreatedAt { get; set; } = DateTime.Now;
    // public DateTime UpdatedAt { get; set; } = DateTime.Now;
    description: string;
    imagePath: string;
    type: HospitalType;
    openingTime: string;
    closingTime: string;
    specialities: string[];
}