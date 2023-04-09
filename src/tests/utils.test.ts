import {
  convertGenderSynonym,
  isGenderMan,
  isGenderManageable,
  isSizeFormatValid,
  isTypeValid,
  capitalizeFirstLetter,
} from "../utils/utils";

describe("src/utils/utils.ts", () => {
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
    const manageableGender = {
      men: "men",
      women: "women",
      male: "male",
      female: "female",
    };

    const unManageableGender = {
      kids: "kids",
      infant: "infant",
      number: "123",
      questionMark: "?",
    };

    test("should return true when provided with 'men'", () => {
      expect(isGenderManageable(manageableGender.men)).toBe(true);
    });

    test("should return true when provided with 'women'", () => {
      expect(isGenderManageable(manageableGender.women)).toBe(true);
    });

    test("should return true when provided with 'male'", () => {
      expect(isGenderManageable(manageableGender.male)).toBe(true);
    });

    test("should return true when provided with 'female'", () => {
      expect(isGenderManageable(manageableGender.female)).toBe(true);
    });

    test("should return false when provided with 'kids'", () => {
      expect(isGenderManageable(unManageableGender.kids)).toBe(false);
    });

    test("should return false when provided with 'infant'", () => {
      expect(isGenderManageable(unManageableGender.infant)).toBe(false);
    });

    test("should return false when provided with a numbers", () => {
      expect(isGenderManageable(unManageableGender.number)).toBe(false);
    });

    test("should return false when provided with a question mark", () => {
      expect(isGenderManageable(unManageableGender.questionMark)).toBe(false);
    });
  });

  describe("convertGenderSynonym()", () => {
    const gender = {
      men: "men",
      women: "women",
      male: "male",
      female: "female",
    };

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

  //TODO Add tests for isGenderAvailable()
  describe("isGenderMan()", () => {
    const parameter = {
      men: "men",
      notMen: "notMen",
    };

    test("should return true when provided with 'men'", () => {
      expect(isGenderMan(parameter.men)).toBe(true);
    });

    test("should return false when provided with 'notMen'", () => {
      expect(isGenderMan(parameter.notMen)).toBe(false);
    });
  });

  //TODO Add tests for getSizes()
});
