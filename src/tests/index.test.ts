import { Gender, System } from "../constants/constants";
import { convert, getShoeSizeData } from "../index";
import {
  IConvert,
  IConvertFrom,
  IConvertTo,
  IData,
} from "../interface/interface";
import * as sizingData from "../data/data.json";

describe("src/index.ts", () => {
  let result: string;

  function convertFrom(
    brand: string,
    gender: Gender,
    system: System,
    size: string
  ): IConvertFrom {
    return {
      brand: brand,
      gender: gender,
      system: system,
      size: size,
    };
  }

  function convertTo(
    brand: string,
    gender: Gender,
    system: System
  ): IConvertTo {
    return {
      brand: brand,
      gender: gender,
      system: system,
    };
  }

  describe("Successfully convert size across brands", () => {
    test("should return 44 2/3", () => {
      const brand: IConvert = {
        from: convertFrom("nike", Gender.Men, System.Eu, "43"),
        to: convertTo("adidas", Gender.Men, System.Eu),
      };

      result = "44 2/3";
      expect(convert(brand)).toStrictEqual(result);
    });
  });

  describe("Successfully convert system", () => {
    test("should return 11", () => {
      const system: IConvert = {
        from: convertFrom("nike", Gender.Men, System.Eu, "45"),
        to: convertTo("nike", Gender.Men, System.Us),
      };

      result = "11";
      expect(convert(system)).toStrictEqual(result);
    });
  });

  describe("Successfully convert size across brands and system", () => {
    test("should return 42", () => {
      const brandAndSystem: IConvert = {
        from: convertFrom("adidas", Gender.Men, System.Us, "9"),
        to: convertTo("nike", Gender.Men, System.Eu),
      };

      result = "42";
      expect(convert(brandAndSystem)).toStrictEqual(result);
    });
  });

  describe("Successfully convert size across genders", () => {
    test("should return 10", () => {
      const gender: IConvert = {
        from: convertFrom("nike", Gender.Women, System.Us, "11.5"),
        to: convertTo("nike", Gender.Men, System.Us),
      };

      result = "10";
      expect(convert(gender)).toStrictEqual(result);
    });
  });

  describe("Successfully convert size across genders and systems", () => {
    test("should return 8", () => {
      const genderAndSystem: IConvert = {
        from: convertFrom("nike", Gender.Women, System.Eu, "41"),
        to: convertTo("nike", Gender.Men, System.Us),
      };

      result = "8";
      expect(convert(genderAndSystem)).toStrictEqual(result);
    });
  });

  describe("Successfully convert size across genders and brands", () => {
    test("should return 9", () => {
      const genderAndBrand: IConvert = {
        from: convertFrom("adidas", Gender.Men, System.Us, "8"),
        to: convertTo("nike", Gender.Women, System.Us),
      };

      result = "9";
      expect(convert(genderAndBrand)).toStrictEqual(result);
    });
  });

  describe("Successfully convert size across genders, brands and system", () => {
    test("should return 6.5", () => {
      const genderAndBrandAndSystem: IConvert = {
        from: convertFrom("nike", Gender.Men, System.Uk, "4"),
        to: convertTo("adidas", Gender.Women, System.Us),
      };

      result = "6.5";
      expect(convert(genderAndBrandAndSystem)).toStrictEqual(result);
    });
  });

  describe("getShoeSizeData()", () => {
    test("should return the shoe size data", () => {
      const data: IData = sizingData;
      const result = data;
      expect(getShoeSizeData()).toStrictEqual(result);
    });
  });
});
