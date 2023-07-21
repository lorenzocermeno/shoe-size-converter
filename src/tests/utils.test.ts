import { Gender, System } from "../constants/constants";
import { IData } from "../interface/interface";
import {
  getAvailableConversionSizes,
  getAvailableSizes,
  validateAndGetBrand,
  validateAndGetGender,
  validateAndGetSystem,
} from "../utils/utils";
import * as sizingData from "../data/data.json";

const data: IData = sizingData;
const brand: string = "nike";
const system: System = System.Cm;

describe("src/utils/utils.ts", () => {
  describe("validateAndGetGender()", () => {
    const validGender = {
      men: "men",
      women: "women",
    };

    test("should return enum value of provided gender", () => {
      expect(validateAndGetGender(brand, validGender.men)).toEqual(
        validGender.men as Gender
      );
      expect(validateAndGetGender(brand, validGender.women)).toEqual(
        Gender.Women as Gender
      );
    });

    test("should throw error if the provided gender is not an enum", () => {
      const invalidGender = "abc";
      expect(() => {
        validateAndGetGender(brand, invalidGender);
      }).toThrow(Error);
    });
  });

  describe("validateAndGetSystem()", () => {
    const validSystem = {
      cm: "cm",
      eu: "eu",
      uk: "uk",
      us: "us",
    };

    test("should return enum value of provided system", () => {
      expect(validateAndGetSystem(brand, Gender.Women, validSystem.cm)).toEqual(
        validSystem.cm as System
      );
      expect(validateAndGetSystem(brand, Gender.Men, validSystem.eu)).toEqual(
        validSystem.eu as System
      );
      expect(validateAndGetSystem(brand, Gender.Women, validSystem.uk)).toEqual(
        validSystem.uk as System
      );
      expect(validateAndGetSystem(brand, Gender.Men, validSystem.us)).toEqual(
        validSystem.us as System
      );
    });

    test("should throw error if the provided system is not an enum", () => {
      const invalidSystem = "abc";
      expect(() => {
        validateAndGetSystem("adidas", Gender.Men, invalidSystem);
      }).toThrow(Error);
    });
  });

  describe("validateAndGetBrand()", () => {
    test("should return the provided brand if it exists", () => {
      expect(validateAndGetBrand(brand)).toEqual(brand);
    });

    test("should throw error if the provided brand does not exist", () => {
      const notABrand = "notABrand";
      expect(() => {
        validateAndGetBrand(notABrand);
      }).toThrow(Error);
    });
  });

  describe("getAvailableSizes()", () => {
    test("should return an array of strings", () => {
      const result = data.nike.men.cm.men;
      expect(getAvailableSizes(brand, Gender.Men, system)).toEqual(result);
    });
  });

  describe("getAvailableConversionSizes()", () => {
    test("should return an array of strings", () => {
      const result = data.nike.men.cm.women;
      expect(
        getAvailableConversionSizes(brand, Gender.Men, Gender.Women, system)
      ).toEqual(result);
    });
  });
});
