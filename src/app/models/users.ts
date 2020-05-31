import validator from "https://dev.jspm.io/class-validator@0.8.5";
const { IsNotEmpty, MaxLength, IsEmail, } = validator;
/**
 * User Interface
 */
export interface User {
    _id?: number,
    first_name: string,
    last_name: string,
    email: string,
}

export class UserModel {
  @IsNotEmpty({
        message: "First name is required."
  })
  @MaxLength(100, {
        message: "First name must be shorter than or equal to $constraint1 characters."
   })
  first_name?: string;

  @IsNotEmpty({
    message: "Last Name is required."
  })
  @MaxLength(100, {
    message: "Last Name must be shorter than or equal to $constraint1 characters."
  })
  last_name?: string;

  @IsNotEmpty({
    message: "Email address is required."
  })
  @IsEmail(undefined, {
    message: "Email address must be an email address."
  })
  @MaxLength(100, {
    message: "Email address must be shorter than or equal to $constraint1 characters."
  })
   email?: string;
}