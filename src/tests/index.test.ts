import { convert } from "../index";
import { IConvert, IConvertFrom, IConvertTo } from "../interface/interface";

describe("src/index.ts", () => {
  let result: string;

  function convertFrom(
    brand: string,
    system: string,
    gender: string,
    size: string
  ): IConvertFrom {
    return {
      brand: brand,
      system: system,
      gender: gender,
      size: size,
    };
  }

  function convertTo(
    brand: string,
    system: string,
    gender: string
  ): IConvertTo {
    return {
      brand: brand,
      system: system,
      gender: gender,
    };
  }

  // TODO: Add errors?

  describe("Successfully convert size across brands", () => {
    test("should return 44 2/3", () => {
      const brand: IConvert = {
        from: convertFrom("nike", "eu", "men", "43"),
        to: convertTo("adidas", "eu", "men"),
      };

      result = "44 2/3";
      expect(convert(brand)).toStrictEqual(result);
    });
  });

  describe("Successfully convert system", () => {
    test("should return 11", () => {
      const system: IConvert = {
        from: convertFrom("nike", "eu", "men", "45"),
        to: convertTo("nike", "us", "men"),
      };

      result = "11";
      expect(convert(system)).toStrictEqual(result);
    });
  });

  describe("Successfully convert size across brands and system", () => {
    test("should return 42", () => {
      const brandAndSystem: IConvert = {
        from: convertFrom("adidas", "us", "men", "9"),
        to: convertTo("nike", "eu", "men"),
      };

      result = "42";
      expect(convert(brandAndSystem)).toStrictEqual(result);
    });
  });

  describe("Successfully convert size across genders", () => {
    test("should return 10.5", () => {
      const gender: IConvert = {
        from: convertFrom("nike", "us", "women", "11.5"),
        to: convertTo("nike", "us", "men"),
      };

      result = "10.5";
      expect(convert(gender)).toStrictEqual(result);
    });
  });

  describe("Successfully convert size across genders and systems", () => {
    test("should return 8.5", () => {
      const genderAndSystem: IConvert = {
        from: convertFrom("nike", "eu", "women", "41"),
        to: convertTo("nike", "us", "men"),
      };

      result = "8.5";
      expect(convert(genderAndSystem)).toStrictEqual(result);
    });
  });

  describe("Successfully convert size across genders and brands", () => {
    test("should return 8.5", () => {
      const genderAndBrand: IConvert = {
        from: convertFrom("adidas", "us", "men", "8"),
        to: convertTo("nike", "us", "women"),
      };

      result = "8.5";
      expect(convert(genderAndBrand)).toStrictEqual(result);
    });
  });

  describe("Successfully convert size across genders, brands and system", () => {
    test("should return 6.5", () => {
      const genderAndBrandAndSystem: IConvert = {
        from: convertFrom("nike", "uk", "men", "4"),
        to: convertTo("adidas", "us", "women"),
      };

      result = "6.5";
      expect(convert(genderAndBrandAndSystem)).toStrictEqual(result);
    });
  });

  describe("Successfully handle system 'jp' as 'cm'", () => {
    test("should return 30", () => {
      const jpToCm: IConvert = {
        from: convertFrom("nike", "jp", "men", "30"),
        to: convertTo("nike", "cm", "women"),
      };

      result = "30";
      expect(convert(jpToCm)).toStrictEqual(result);
    });
  });
});
