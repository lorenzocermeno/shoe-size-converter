import { Gender, System } from "../constants/constants";
import { convert, getShoeSizeData } from "../index";
import {
  IConvert,
  IConvertionParameters,
  IConvertionResult,
  IData,
} from "../interface/interface";
import * as sizingData from "../data/data.json";

function createConvertFrom(
  brand: string,
  gender: Gender,
  system: System,
  size: string
): IConvertionParameters {
  return {
    brand,
    gender,
    system,
    size,
  };
}

function createConvertTo(
  brand: string,
  gender: Gender,
  system: System
): IConvertionResult {
  return {
    brand,
    gender,
    system,
  };
}

describe("src/index.ts", () => {
  let result: string;

  describe("Successfully convert size across brands", () => {
    it("should return 44 2/3", () => {
      const brand: IConvert = {
        from: createConvertFrom("nike", Gender.Men, System.Eu, "43"),
        to: createConvertTo("adidas", Gender.Men, System.Eu),
      };

      result = "44 2/3";
      expect(convert(brand)).toStrictEqual(result);
    });
  });

  describe("Successfully convert system", () => {
    it("should return 11", () => {
      const system: IConvert = {
        from: createConvertFrom("nike", Gender.Men, System.Eu, "45"),
        to: createConvertTo("nike", Gender.Men, System.Us),
      };

      result = "11";
      expect(convert(system)).toStrictEqual(result);
    });
  });

  describe("Successfully convert size across brands and system", () => {
    it("should return 42", () => {
      const brandAndSystem: IConvert = {
        from: createConvertFrom("adidas", Gender.Men, System.Us, "9"),
        to: createConvertTo("nike", Gender.Men, System.Eu),
      };

      result = "42";
      expect(convert(brandAndSystem)).toStrictEqual(result);
    });
  });

  describe("Successfully convert size across genders", () => {
    it("should return 10", () => {
      const gender: IConvert = {
        from: createConvertFrom("nike", Gender.Women, System.Us, "11.5"),
        to: createConvertTo("nike", Gender.Men, System.Us),
      };

      result = "10";
      expect(convert(gender)).toStrictEqual(result);
    });
  });

  describe("Successfully convert size across genders and systems", () => {
    it("should return 8", () => {
      const genderAndSystem: IConvert = {
        from: createConvertFrom("nike", Gender.Women, System.Eu, "41"),
        to: createConvertTo("nike", Gender.Men, System.Us),
      };

      result = "8";
      expect(convert(genderAndSystem)).toStrictEqual(result);
    });
  });

  describe("Successfully convert size across genders and brands", () => {
    it("should return 9", () => {
      const genderAndBrand: IConvert = {
        from: createConvertFrom("adidas", Gender.Men, System.Us, "8"),
        to: createConvertTo("nike", Gender.Women, System.Us),
      };

      result = "9";
      expect(convert(genderAndBrand)).toStrictEqual(result);
    });
  });

  describe("Successfully convert size across genders, brands, and system", () => {
    it("should return 6.5", () => {
      const genderAndBrandAndSystem: IConvert = {
        from: createConvertFrom("nike", Gender.Men, System.Uk, "4"),
        to: createConvertTo("adidas", Gender.Women, System.Us),
      };

      result = "6.5";
      expect(convert(genderAndBrandAndSystem)).toStrictEqual(result);
    });
  });

  describe("getShoeSizeData()", () => {
    it("should return the shoe size data", () => {
      const data: IData = sizingData;
      expect(getShoeSizeData()).toStrictEqual(data);
    });
  });
});
