import { IData } from "../interface/interface";
import { Gender, System } from "../constants/constants";

function getGender(gender: string): Gender {
  if (!Object.values(Gender).includes(gender as Gender)) {
    throw new Error(`The gender '${gender}' is not available`);
  }
  return gender as Gender;
}

function getSystem(system: string): System {
  if (!Object.values(System).includes(system as System)) {
    throw new Error(`The system '${system}' is not available`);
  }
  return system as System;
}

function getAvailableBrands(data: IData): string[] {
  return Object.keys(data);
}

function getAvailableGenders(data: IData, brand: string): string[] {
  return Object.keys(data[brand]);
}

function getAvailableSystems(
  data: IData,
  brand: string,
  gender: Gender
): string[] {
  return Object.keys(data[brand][gender]);
}

function getAvailableSizes(
  data: IData,
  brand: string,
  gender: Gender,
  system: System
): string[] {
  return Object.values(data[brand][gender][system][gender]);
}

function getAvailableConvertionSizes(
  data: IData,
  brand: string,
  fromGender: Gender,
  gender: Gender,
  system: System
): string[] {
  return Object.values(data[brand][fromGender][system][gender]);
}

export {
  getGender,
  getSystem,
  getAvailableBrands,
  getAvailableGenders,
  getAvailableSystems,
  getAvailableSizes,
  getAvailableConvertionSizes,
};
