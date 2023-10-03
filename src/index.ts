import {
  IConvert,
  IConvertionParameters,
  IConvertionResult,
  IData,
} from "./interface/interface";
import * as sizingData from "./data/data.json";
import { Gender, System } from "./constants/constants";
import {
  getAvailableConversionSizes,
  getAvailableSizes,
  validateAndGetBrand,
  validateAndGetGender,
  validateAndGetSize,
  validateAndGetSystem,
} from "./utils/utils";

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
  const cmSizes = getAvailableConversionSizes(
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

  const sizes = getAvailableConversionSizes(
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
    conversionParameters.brand,
    conversionParameters.gender,
    conversionParameters.system
  );

  const cmSizes = getAvailableSizes(
    conversionParameters.brand,
    conversionParameters.gender,
    System.Cm
  );

  const index = sizes.findIndex((s: string) => s === conversionParameters.size);

  return cmSizes[index];
}

function getPropertiesToConvertFrom(
  convertFrom: IConvertionParameters
): IConvertionParameters {
  const brand = validateAndGetBrand(convertFrom.brand);
  const gender: Gender = validateAndGetGender(brand, convertFrom.gender);
  const system: System = validateAndGetSystem(
    brand,
    gender,
    convertFrom.system
  );
  const convertFromSize = validateAndGetSize(
    brand,
    gender,
    system,
    convertFrom.size
  );

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
  const brand = validateAndGetBrand(convertTo.brand);
  const gender = validateAndGetGender(brand, convertTo.gender);
  const system = validateAndGetSystem(brand, gender, convertTo.system);

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
