import { 
AddressParts,
DobParts,
PasswordPolicy,
generateAddress,
generateDateOfBirthParts,
generatePassword,
randomFirstName,
randomLastName,
uniqueEmail } from "../utils/data-generator"
/*Esta clase sirve para construir los modelos que se usan en los tests de e2e presentes en esta demo.
Tiene como función el no tener que generar datos en los tests y aislar la creación de datos en un solo lugar.
Autor=Daniel Castro
Fecha= 22 de Agosto 2025
*/

export type UserLogin={
    email:string
    password:string
}
export type UserSignup={
    name:string
    lastname:string
    email:string
    password:string
    company:string
    phone:string
    DateOfBirth:string
}&AddressParts

export class UserBuilder{
    constructor(
        private cfg: {
          emailDomain?: string;
          emailPrefix?: string;
          passwordPolicy?: Partial<PasswordPolicy>;
        } = {}
      ) {}
    
    
      buildRegistration(overrides: Partial<UserSignup> = {}): UserSignup {
        const name = overrides.name?? randomFirstName();
        const lastname = overrides.lastname?? randomLastName();
        const email =
          overrides.email ?? uniqueEmail(`${name}.${lastname}`.toLowerCase());
        const password = overrides.password ?? generatePassword();
        const company="DanielCastroTesting"
        const phone = "1234567890";
        const dob= generateDateOfBirthParts();
        const address = generateAddress();
        return { name, lastname, email, password , company, phone, DateOfBirth:dob.iso,...address };
      }
    
      buildLogin(overrides: Partial<UserLogin> = {}): UserLogin {
        // Permite usar un usuario fijo desde variables de entorno si no se dan overrides
        const envEmail = process.env.E2E_USER_EMAIL?.trim();
        const envPassword = process.env.E2E_USER_PASSWORD?.trim();
    
        const email =
          overrides.email ?? envEmail ?? uniqueEmail('login');
        const password =
          overrides.password ?? envPassword ?? generatePassword();
    
        return { email, password };
      }
}
