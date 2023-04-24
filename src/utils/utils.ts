import { Gender } from "../constants/constants";
import { IData } from "../interface/interface";

function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function isTypeValid(parameter: unknown): parameter is string {
  return typeof parameter === "string";
}

function isSizeFormatValid(size: string): boolean {
  const regex = /^(?:\d{1,2}(?:\s\d\/\d)?|\d+\.\d+)$/;
  return regex.test(size);
}

function isGenderManageable(providedGender: string): providedGender is Gender {
  return Object.values(Gender).includes(providedGender as Gender);
}

function convertGenderSynonym(gender: string): string {
  if (gender === Gender.Male) {
    return Gender.Men;
  }

  if (gender === Gender.Female) {
    return Gender.Women;
  }
  return gender;
}

function isGenderAvailable(
  data: IData,
  brand: string,
  gender: string
): boolean {
  return gender in data[brand];
}

function isGenderMan(gender: string): boolean {
  return gender === Gender.Men;
}

function getSizes(
  data: IData,
  brand: string,
  gender: string,
  system: string,
  isMan: boolean
): any {
  if (isMan) {
    return data[brand][gender][system][Gender.Men];
  }
  return data[brand][gender][system][Gender.Women];
}

export {
  capitalizeFirstLetter,
  isTypeValid,
  isSizeFormatValid,
  isGenderManageable,
  convertGenderSynonym,
  isGenderAvailable,
  isGenderMan,
  getSizes,
};
