// src/app/models/user.dto.ts
export class UserDto {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
  
    constructor(id: number, firstname: string, lastname: string, email: string, password: string) {
      this.id = id;
      this.firstname = firstname;
      this.lastname = lastname;
      this.email = email;
      this.password = password;
    }
  }
  