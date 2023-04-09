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

  const brand: IConvert = {
    from: convertFrom("nike", "eu", "men", "43"),
    to: convertTo("adidas", "eu", "men"),
  };

  const system: IConvert = {
    from: convertFrom("nike", "eu", "men", "45"),
    to: convertTo("nike", "us", "men"),
  };

  const brandAndSystem: IConvert = {
    from: convertFrom("adidas", "us", "men", "9"),
    to: convertTo("nike", "eu", "men"),
  };

  const gender: IConvert = {
    from: convertFrom("nike", "us", "women", "11.5"),
    to: convertTo("nike", "us", "men"),
  };

  const genderAndSystem: IConvert = {
    from: convertFrom("nike", "eu", "women", "41"),
    to: convertTo("nike", "us", "men"),
  };

  const genderAndBrand: IConvert = {
    from: convertFrom("adidas", "us", "men", "8"),
    to: convertTo("nike", "us", "women"),
  };

  const genderAndBrandAndSystem: IConvert = {
    from: convertFrom("nike", "uk", "men", "4"),
    to: convertTo("adidas", "us", "women"),
  };

  // TODO: Add errors!

  describe("Successfully convert size across brands", () => {
    test("should return 45 1/3", () => {
      result = "45 1/3";
      expect(convert(brand)).toStrictEqual(result);
    });
  });

  describe("Successfully convert system", () => {
    test("should return 11", () => {
      result = "11";
      expect(convert(system)).toStrictEqual(result);
    });
  });

  describe("Successfully convert size across brands and system", () => {
    test("should return 41", () => {
      result = "41";
      expect(convert(brandAndSystem)).toStrictEqual(result);
    });
  });

  describe("Successfully convert size across genders", () => {
    test("should return 10", () => {
      result = "10";
      expect(convert(gender)).toStrictEqual(result);
    });
  });

  describe("Successfully convert size across genders and systems", () => {
    test("should return 8", () => {
      result = "8";
      expect(convert(genderAndSystem)).toStrictEqual(result);
    });
  });

  describe("Successfully convert size across genders and brands", () => {
    test("should return 8.5", () => {
      result = "8.5";
      expect(convert(genderAndBrand)).toStrictEqual(result);
    });
  });

  describe("Successfully convert size across genders, brands and system", () => {
    test("should return 6.5", () => {
      result = "6.5";
      expect(convert(genderAndBrandAndSystem)).toStrictEqual(result);
    });
  });

  describe("Successfully convert size across genders and brands", () => {
    test("should return 8.5", () => {
      result = "8.5";
      expect(convert(genderAndBrand)).toStrictEqual(result);
    });
  });

  describe("Successfully convert size across genders, brands and system", () => {
    test("should return 6.5", () => {
      result = "6.5";
      expect(convert(genderAndBrandAndSystem)).toStrictEqual(result);
    });
  });
});
