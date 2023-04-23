import { IData } from "../interface/interface";
import {
  convertGenderSynonym,
  isGenderMan,
  isGenderManageable,
  isSizeFormatValid,
  isTypeValid,
  capitalizeFirstLetter,
  isGenderAvailable,
  getSizes,
} from "../utils/utils";

describe("src/utils/utils.ts", () => {
  const mockData: IData = {
    nike: {
      men: {
        cm: {
          men: ["28", "29", "30"],
          women: ["20", "21", "22"],
        },
      },
      women: {
        cm: {
          men: ["28", "29", "30"],
          women: ["20", "21", "22"],
        },
      },
    },
  };

  const mockBrand: string = "nike";
  const mockSystem: string = "cm";

  const gender = {
    men: "men",
    women: "women",
    male: "male",
    female: "female",
  };

  describe("should capitalize first letter()", () => {
    test("should return the string with the first letter capitalized", () => {
      const string = "asd";
      const result = "Asd";
      expect(capitalizeFirstLetter(string)).toBe(result);
    });
  });

  describe("isTypeValid()", () => {
    test("should return true provided a string", () => {
      const string = "asd";
      expect(isTypeValid(string)).toBe(true);
    });
  });

  describe("isSizeFormatValid()", () => {
    const validShoeSizes = {
      wholeNumber: "10",
      thirds: "42 2/3",
      decimals: "8.5",
    };
    const invalidShoeSizes = {
      longNumber: "101",
      letters: "asd",
      emptyString: "",
    };

    test("should return true provided with a whole number", () => {
      expect(isSizeFormatValid(validShoeSizes.wholeNumber)).toBe(true);
    });

    test("should return true provided with a number of thirds", () => {
      expect(isSizeFormatValid(validShoeSizes.thirds)).toBe(true);
    });

    test("should return true provided with a number with decimals", () => {
      expect(isSizeFormatValid(validShoeSizes.decimals)).toBe(true);
    });

    test("should return false provided with a number > 100", () => {
      expect(isSizeFormatValid(invalidShoeSizes.longNumber)).toBe(false);
    });

    test("should return false provided with letters", () => {
      expect(isSizeFormatValid(invalidShoeSizes.letters)).toBe(false);
    });

    test("should return false provided with an empty string", () => {
      expect(isSizeFormatValid(invalidShoeSizes.emptyString)).toBe(false);
    });
  });

  describe("isGenderManageable()", () => {
    const unManageableGender = {
      kids: "kids",
      infant: "infant",
      questionMark: "?",
    };

    test("should return true when provided with 'men'", () => {
      expect(isGenderManageable(gender.men)).toBe(true);
    });

    test("should return true when provided with 'women'", () => {
      expect(isGenderManageable(gender.women)).toBe(true);
    });

    test("should return true when provided with 'male'", () => {
      expect(isGenderManageable(gender.male)).toBe(true);
    });

    test("should return true when provided with 'female'", () => {
      expect(isGenderManageable(gender.female)).toBe(true);
    });

    test("should return false when provided with 'kids'", () => {
      expect(isGenderManageable(unManageableGender.kids)).toBe(false);
    });

    test("should return false when provided with 'infant'", () => {
      expect(isGenderManageable(unManageableGender.infant)).toBe(false);
    });

    test("should return false when provided with a question mark", () => {
      expect(isGenderManageable(unManageableGender.questionMark)).toBe(false);
    });
  });

  describe("convertGenderSynonym()", () => {
    test("should return 'men' when provided with 'men'", () => {
      expect(convertGenderSynonym(gender.men)).toStrictEqual(gender.men);
    });

    test("should return 'women' when provided with 'women'", () => {
      expect(convertGenderSynonym(gender.women)).toStrictEqual(gender.women);
    });

    test("should return 'men' when provided with 'male'", () => {
      expect(convertGenderSynonym(gender.male)).toStrictEqual(gender.men);
    });

    test("should return 'women' when provided with 'female'", () => {
      expect(convertGenderSynonym(gender.female)).toStrictEqual(gender.women);
    });
  });

  describe("isGenderAvailable()", () => {
    test("should return true when provided with 'men'", () => {
      expect(isGenderAvailable(mockData, mockBrand, gender.men)).toBe(true);
    });

    test("should return true when provided with 'women'", () => {
      expect(isGenderAvailable(mockData, mockBrand, gender.women)).toBe(true);
    });

    test("should return false when provided with 'female'", () => {
      expect(isGenderAvailable(mockData, mockBrand, gender.female)).toBe(false);
    });

    test("should return false when provided with 'male'", () => {
      expect(isGenderAvailable(mockData, mockBrand, gender.male)).toBe(false);
    });
  });

  describe("isGenderMan()", () => {
    const notMen = "notMen";

    test("should return true when provided with 'men'", () => {
      expect(isGenderMan(gender.men)).toBe(true);
    });

    test("should return false when provided with 'notMen'", () => {
      expect(isGenderMan(notMen)).toBe(false);
    });
  });

  describe("getSizes()", () => {
    test("should return '28, 29, 30' for men", () => {
      const isMan: boolean = true;
      const result = ["28", "29", "30"];
      expect(
        getSizes(mockData, mockBrand, gender.men, mockSystem, isMan)
      ).toStrictEqual(result);
    });

    test("should return '20, 21, 22'", () => {
      const isMan: boolean = false;
      const result = ["20", "21", "22"];
      expect(
        getSizes(mockData, mockBrand, gender.women, mockSystem, isMan)
      ).toStrictEqual(result);
    });
  });
});
