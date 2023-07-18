import { Gender, System } from "../constants/constants";
import { IData } from "../interface/interface";
import {
  getAvailableBrands,
  getAvailableConvertionSizes,
  getAvailableGenders,
  getAvailableSizes,
  getAvailableSystems,
  getGender,
  getSystem,
} from "../utils/utils";

const mockData: IData = {
  nike: {
    men: {
      cm: {
        men: ["28", "29", "30"],
        women: ["20", "21", "22"],
      },
      eu: {
        men: [],
        women: [],
      },
      uk: {
        men: [],
        women: [],
      },
      us: {
        men: [],
        women: [],
      },
    },
    women: {
      cm: {
        men: ["28", "29", "30"],
        women: ["20", "21", "22"],
      },
      eu: {
        men: [],
        women: [],
      },
      uk: {
        men: [],
        women: [],
      },
      us: {
        men: [],
        women: [],
      },
    },
  },
};

const mockBrand: string = "nike";
const mockSystem: System = System.Cm;

describe("src/utils/utils.ts", () => {
  describe("getGender()", () => {
    test("should return enum value of provided gender", () => {
      const validGender = {
        men: "men",
        women: "women",
      };
      expect(getGender(validGender.men)).toEqual(validGender.men as Gender);
      expect(getGender(validGender.women)).toEqual(Gender.Women as Gender);
    });
  });

  describe("getSystem()", () => {
    test("should return enum value of provided system", () => {
      const validSystem = {
        cm: "cm",
        eu: "eu",
        uk: "uk",
        us: "us",
      };
      expect(getSystem(validSystem.cm)).toEqual(validSystem.cm as Gender);
      expect(getSystem(validSystem.eu)).toEqual(validSystem.eu as Gender);
      expect(getSystem(validSystem.uk)).toEqual(validSystem.uk as Gender);
      expect(getSystem(validSystem.us)).toEqual(validSystem.us as Gender);
    });
  });

  describe("getAvailableBrands()", () => {
    test("should return an array of strings", () => {
      const result = ["nike"];
      expect(getAvailableBrands(mockData)).toEqual(result);
    });
  });

  describe("getAvailableGenders()", () => {
    test("should return an array of strings", () => {
      const result = ["men", "women"];
      expect(getAvailableGenders(mockData, mockBrand)).toEqual(result);
    });
  });

  describe("getAvailableSystems()", () => {
    test("should return an array of strings", () => {
      const result = ["cm", "eu", "uk", "us"];
      expect(getAvailableSystems(mockData, mockBrand, Gender.Men)).toEqual(
        result
      );
    });
  });

  describe("getAvailableSizes()", () => {
    test("should return an array of strings", () => {
      const result = mockData.nike.men.cm.men;
      expect(
        getAvailableSizes(mockData, mockBrand, Gender.Men, mockSystem)
      ).toEqual(result);
    });
  });

  describe("getAvailableConvertionSizes()", () => {
    test("should return an array of strings", () => {
      const result = mockData.nike.men.cm.women;
      expect(
        getAvailableConvertionSizes(
          mockData,
          mockBrand,
          Gender.Men,
          Gender.Women,
          mockSystem
        )
      ).toEqual(result);
    });
  });
});
