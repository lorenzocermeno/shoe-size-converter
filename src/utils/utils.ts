import { IData } from "../interface/interface";
import { Gender, System } from "../constants/constants";
import * as sizingData from "../data/data.json";

const data: IData = sizingData;

function validateNotEmpty(input: string, parameterType: string) {
  if (!input) {
    throw new Error(`${parameterType} cannot be empty`);
  }
}

function isBrandAvailable(brand: string) {
  return Object.keys(data).includes(brand);
}

function isGenderAvailable(brand: string, gender: string): boolean {
  return (
    Object.values(Gender).includes(gender as Gender) &&
    data[brand][gender as Gender] !== undefined
  );
}

function isSystemAvailable(
  brand: string,
  gender: Gender,
  system: string
): boolean {
  return (
    Object.values(System).includes(system as System) &&
    data[brand][gender][system as System] !== undefined
  );
}

function isSizeAvailable(
  brand: string,
  gender: Gender,
  system: System,
  size: string
) {
  return getAvailableSizes(brand, gender, system).includes(size);
}

export function getAvailableSizes(
  brand: string,
  gender: Gender,
  system: System
): string[] {
  return Object.values(data[brand]?.[gender]?.[system]?.[gender] || []);
}

export function getAvailableConversionSizes(
  brand: string,
  fromGender: Gender,
  gender: Gender,
  system: System
): string[] {
  return Object.values(data[brand]?.[fromGender]?.[system]?.[gender] || []);
}

export function validateAndGetBrand(brand: string): string {
  validateNotEmpty(brand, "Brand");

  if (!isBrandAvailable(brand)) {
    throw new Error(`The brand '${brand}' is not available`);
  }

  return brand;
}

export function validateAndGetGender(brand: string, gender: string): Gender {
  validateNotEmpty(gender, "Gender");

  if (!isGenderAvailable(brand, gender)) {
    throw new Error(`The gender '${gender}' is not available`);
  }

  return gender as Gender;
}

export function validateAndGetSystem(
  brand: string,
  gender: Gender,
  system: string
): System {
  validateNotEmpty(system, "System");

  if (!isSystemAvailable(brand, gender, system)) {
    throw new Error(
      `The system '${system}' is not available for ${gender}'s ${brand}`
    );
  }

  return system as System;
}

export function validateAndGetSize(
  brand: string,
  gender: Gender,
  system: System,
  size: string
): string {
  validateNotEmpty(size, "Size");

  if (!isSizeAvailable(brand, gender, system, size)) {
    throw new Error(`The size '${size}' is not available`);
  }

  return size;
}
