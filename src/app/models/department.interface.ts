import { IEmployee } from "./employee.interface";

export interface IDepartment {
    id: string;
    name: string;
    employees: IEmployee[];
}