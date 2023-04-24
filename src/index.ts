import { System } from "./constants/constants";
import { IConvert, IConvertFrom, IConvertTo } from "./interface/interface";
import { data } from "./data/data";
import {
  convertGenderSynonym,
  isGenderAvailable,
  isGenderManageable,
  isSizeFormatValid,
  isTypeValid,
  isGenderMan,
  getSizes,
  capitalizeFirstLetter,
} from "./utils/utils";

function findClosestSize(sizes: number[], targetSize: number): number {
  let closestNumber = sizes[0];

  for (let i = 0; i < sizes.length; i++) {
    const currentNumber = sizes[i];
    const currentDifference = Math.abs(targetSize - currentNumber);
    const closestDifference = Math.abs(targetSize - closestNumber);

    if (currentDifference < closestDifference) {
      closestNumber = currentNumber;
    }
  }

  return Number(closestNumber.toFixed(1));
}

function getDesiredSize(
  conversionParameters: IConvertTo,
  cmSize: string
): string {
  const isMan = isGenderMan(conversionParameters.gender);
  const cmSizes = getSizes(
    data,
    conversionParameters.brand,
    conversionParameters.gender,
    System.cm,
    isMan
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
      `The size is not available for ${
        conversionParameters.gender
      } at ${capitalizeFirstLetter(conversionParameters.brand)}`
    );
  }
  const sizes = getSizes(
    data,
    conversionParameters.brand,
    conversionParameters.gender,
    conversionParameters.system,
    isMan
  );

  if (!sizes[index]) {
    throw new Error(
      `The size is not available for ${
        conversionParameters.gender
      } at ${capitalizeFirstLetter(conversionParameters.brand)}`
    );
  }

  return sizes[index];
}

function getCmSize(conversionParameters: IConvertFrom): string {
  const isMan = isGenderMan(conversionParameters.gender);
  const sizes = getSizes(
    data,
    conversionParameters.brand,
    conversionParameters.gender,
    conversionParameters.system,
    isMan
  );

  const cmSizes = getSizes(
    data,
    conversionParameters.brand,
    conversionParameters.gender,
    System.cm,
    isMan
  );
  const index = sizes.findIndex((s: string) => s === conversionParameters.size);

  return cmSizes[index];
}

function validateSize(
  brand: string,
  system: string,
  gender: string,
  size: string
): string {
  if (!size) {
    throw new Error(`Size cannot be empty`);
  }

  const isMan = isGenderMan(gender);

  if (!isTypeValid(size)) {
    throw new Error(`The size '${size}' is not a string`);
  }

  if (!isSizeFormatValid(size)) {
    throw new Error(
      `The size '${size}' does not comply with the regex:\n^(?:\d{1,2}(?:\s\d\/\d)?|\d+\.\d+)$`
    );
  }

  const sizes = getSizes(data, brand, gender, system, isMan);

  if (!sizes.some((s: string) => s === size)) {
    throw new Error(`The size '${size}' is not available in ${system}`);
  }

  return size;
}

function validateBrand(brand: string): string {
  if (!brand) {
    throw new Error(`Brand cannot be empty`);
  }

  const lowerCaseBrand = brand.toLowerCase();

  if (!isTypeValid(lowerCaseBrand)) {
    throw new Error(
      `The brand '${capitalizeFirstLetter(lowerCaseBrand)}' is not a string`
    );
  }

  if (data?.[lowerCaseBrand] == null) {
    throw new Error(
      `There is no data available for '${capitalizeFirstLetter(
        lowerCaseBrand
      )}'`
    );
  }

  return lowerCaseBrand;
}

function validateSystem(brand: string, gender: string, system: string): string {
  if (!system) {
    throw new Error(`System cannot be empty`);
  }

  let lowerCaseSystem = system?.toLowerCase();

  if (!isTypeValid(lowerCaseSystem)) {
    throw new Error(`The system '${lowerCaseSystem}' is not a string`);
  }

  if (system === System.jp) {
    lowerCaseSystem = System.cm;
  }

  if (data?.[brand]?.[gender]?.[lowerCaseSystem] == null) {
    throw new Error(
      `The system '${lowerCaseSystem}' is not available for the brand '${capitalizeFirstLetter(
        brand
      )}'`
    );
  }

  return lowerCaseSystem;
}

function validateGender(brand: string, gender: string): string {
  if (!gender) {
    throw new Error(`Gender cannot be empty`);
  }

  const lowerCaseGender = gender.toLowerCase();

  if (!isTypeValid(lowerCaseGender)) {
    throw new Error(`The gender '${lowerCaseGender}' is not a string`);
  }

  const manageableGender = convertGenderSynonym(lowerCaseGender);

  if (!isGenderManageable(manageableGender)) {
    throw new Error(
      `The gender '${manageableGender}' is not a gender used by the available shoe brands`
    );
  }

  if (!isGenderAvailable(data, brand, manageableGender)) {
    throw new Error(
      `The gender '${manageableGender}' is not available for ${capitalizeFirstLetter(
        brand
      )}`
    );
  }

  return manageableGender;
}

function getPropertiesToConvertFrom(convertFrom: IConvertFrom): IConvertFrom {
  const brand = validateBrand(convertFrom.brand);
  const gender = validateGender(brand, convertFrom.gender);
  const system = validateSystem(brand, gender, convertFrom.system);
  const convertFromSize = validateSize(brand, system, gender, convertFrom.size);

  return {
    brand: brand,
    gender: gender,
    system: system,
    size: convertFromSize,
  };
}

function getPropertiesToConvertTo(convertTo: IConvertTo): IConvertTo {
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

  return getDesiredSize(getPropertiesToConvertTo(convert.to), cmSize);
}

function getShoeSizeData(): string {
  return JSON.stringify(data);
}

export { convert, getShoeSizeData };

// console.log(
//   convert({
//     from: {
//       brand: "nike",
//       gender: "men",
//       system: "cm",
//       size: "7",
//     },
//     to: {
//       brand: "adidas",
//       gender: "men",
//       system: "eu",
//     },
//   })
// );
