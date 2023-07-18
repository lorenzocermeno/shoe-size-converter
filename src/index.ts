import {
  IConvert,
  IConvertionParameters,
  IConvertionResult,
  IData,
} from "./interface/interface";
import * as sizingData from "./data/data.json";
import { Gender, System } from "./constants/constants";
import {
  getAvailableBrands,
  getAvailableConvertionSizes,
  getAvailableGenders,
  getAvailableSizes,
  getAvailableSystems,
  getGender,
  getSystem,
  throwErrorIfParameterIsEmpty,
} from "./utils/utils";

function isNotAvailable(input: string) {
  return `'${input}' is not available`;
}

const data: IData = sizingData;

function findClosestSize(sizes: number[], targetSize: number): number {
  let closestNumber = sizes[0];

  for (const size of sizes) {
    const currentNumber = size;
    const currentDifference = Math.abs(targetSize - currentNumber);
    const closestDifference = Math.abs(targetSize - closestNumber);

    if (currentDifference < closestDifference) {
      closestNumber = currentNumber;
    }
  }

  return Number(closestNumber.toFixed(1));
}

function getDesiredSize(
  desiredConvertionData: IConvertionResult,
  fromGender: Gender,
  cmSize: string
): string {
  const cmSizes = getAvailableConvertionSizes(
    data,
    desiredConvertionData.brand,
    fromGender,
    desiredConvertionData.gender,
    System.Cm
  );

  const foundIndex = cmSizes.findIndex((s: string) => s === cmSize);
  if (foundIndex === -1) {
    cmSize = findClosestSize(
      cmSizes.map(Number),
      parseFloat(cmSize)
    ).toString();
  }

  const index = cmSizes.findIndex((s: string) => s === cmSize);
  if (index < 0) {
    throw new Error(
      `The size is not available for ${desiredConvertionData.gender} at ${desiredConvertionData.brand}`
    );
  }

  const sizes = getAvailableConvertionSizes(
    data,
    desiredConvertionData.brand,
    fromGender,
    desiredConvertionData.gender,
    desiredConvertionData.system
  );

  if (!sizes[index]) {
    throw new Error(
      `The size is not available for ${desiredConvertionData.gender} at ${desiredConvertionData.brand}`
    );
  }

  return sizes[index];
}

function getCmSize(conversionParameters: IConvertionParameters): string {
  const sizes = getAvailableSizes(
    data,
    conversionParameters.brand,
    conversionParameters.gender,
    conversionParameters.system
  );

  const cmSizes = getAvailableSizes(
    data,
    conversionParameters.brand,
    conversionParameters.gender,
    System.Cm
  );

  const index = sizes.findIndex((s: string) => s === conversionParameters.size);

  return cmSizes[index];
}

function validateSize(
  brand: string,
  gender: Gender,
  system: System,
  size: string
): string {
  throwErrorIfParameterIsEmpty(size, "Size");

  if (!getAvailableSizes(data, brand, gender, system).includes(size)) {
    throw new Error(`The size ${isNotAvailable(size)}`);
  }

  return size;
}

function validateBrand(brand: string): string {
  throwErrorIfParameterIsEmpty(brand, "Brand");

  if (!getAvailableBrands(data).includes(brand)) {
    throw new Error(`The brand ${isNotAvailable(brand)}`);
  }
  return brand;
}

function validateGender(brand: string, gender: string): Gender {
  throwErrorIfParameterIsEmpty(gender, "Gender");

  if (!getAvailableGenders(data, brand).includes(gender)) {
    throw new Error(`The gender ${isNotAvailable(gender)}`);
  }
  return getGender(gender);
}

function validateSystem(brand: string, gender: Gender, system: string): System {
  throwErrorIfParameterIsEmpty(system, "System");

  if (!getAvailableSystems(data, brand, gender).includes(system)) {
    throw new Error(
      `The system ${isNotAvailable(system)} for ${gender}'s ${brand}`
    );
  }

  return getSystem(system);
}

function getPropertiesToConvertFrom(
  convertFrom: IConvertionParameters
): IConvertionParameters {
  const brand = validateBrand(convertFrom.brand);
  const gender: Gender = validateGender(brand, convertFrom.gender);
  const system: System = validateSystem(brand, gender, convertFrom.system);
  const convertFromSize = validateSize(brand, gender, system, convertFrom.size);

  return {
    brand: brand,
    gender: gender,
    system: system,
    size: convertFromSize,
  };
}

function getPropertiesToConvertTo(
  convertTo: IConvertionResult
): IConvertionResult {
  const brand = validateBrand(convertTo.brand);
  const gender = validateGender(brand, convertTo.gender);
  const system = validateSystem(brand, gender, convertTo.system);

  return {
    brand: brand,
    gender: gender,
    system: system,
  };
}

function convert(convert: IConvert): string {
  const cmSize = getCmSize(getPropertiesToConvertFrom(convert.from));

  return getDesiredSize(
    getPropertiesToConvertTo(convert.to),
    convert.from.gender,
    cmSize
  );
}

function getShoeSizeData(): IData {
  return data;
}

export { convert, getShoeSizeData };

console.log(
  convert({
    from: {
      brand: "nike",
      gender: Gender.Men,
      system: System.Eu,
      size: "43",
    },
    to: {
      brand: "adidas",
      gender: Gender.Men,
      system: System.Eu,
    },
  })
);
