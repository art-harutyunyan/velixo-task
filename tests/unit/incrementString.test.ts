import { incrementString } from "./incrementString";

describe("Unit tests for incrementString function", () => {
  describe("Positive test cases", () => {
    test("Increment by keeping the numbers length", () => {
      expect(incrementString("A0")).toBe("A1");
      expect(incrementString("AB00")).toBe("AB01");
      expect(incrementString("ABC001")).toBe("ABC002");
      expect(incrementString("ABCD0000")).toBe("ABCD0001");
    });

    test("Ensure the string is not case sensitive for the letters", () => {
      expect(incrementString("aBc001")).toBe("aBc002");
      expect(incrementString("aaaa1111")).toBe("aaaa1112");
      expect(incrementString("a12")).toBe("a13");
      expect(incrementString("Ab9999")).toBe("Ab0000");
    });

    test("Putting 0s in case there are all 9", () => {
      expect(incrementString("A9")).toBe("A0");
      expect(incrementString("A99")).toBe("A00");
      expect(incrementString("A999")).toBe("A000");
      expect(incrementString("A9999")).toBe("A0000");

      expect(incrementString("ABCD9")).toBe("ABCD0");
      expect(incrementString("ABC99")).toBe("ABC00");
      expect(incrementString("ABCD999")).toBe("ABCD000");
      expect(incrementString("ABCD9999")).toBe("ABCD0000");
    });

    test("Adding leading 0s if there is a need", () => {
      expect(incrementString("AB009")).toBe("AB010");
      expect(incrementString("AB0099")).toBe("AB0100");
    });

    test("Ensure the string is correct if the 9s are coming after 0", () => {
      expect(incrementString("A09")).toBe("A10");
      expect(incrementString("ABC099")).toBe("ABC100");
      expect(incrementString("ABCD0999")).toBe("ABCD1000");
    });
  });
  describe("Negative cases", () => {
    const invalidCases = [
      "",
      "A",
      "123",
      "1DFV003",
      "ABCDE1",
      "AB12345",
      "A-01",
      "A 01",
      "A01B",
      "ԳB12",
      "_A01",
    ];
    for (let invalid of invalidCases) {
      test(`Returns Error for invalid case: ${invalid}`, () => {
        expect(incrementString(invalid)).toBe("Error");
      });
    }
  });
});
