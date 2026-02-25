import { popularityScore } from "../src/api/v1/services/eventServices";

describe("Popularity Calculation Tests", () => {

  test("Popularity calculation - Normal case with registrations", () => {
// Arrange
    const capacity = 200;
    const registrationCount = 185;

    const result = popularityScore(capacity, registrationCount);


    expect(result.afterScore).toBe(92.5);
    expect(result.tier).toBe("Hot");
  });

  test("Popularity calculation - Edge case: 0 capacity returns 0", () => {
    const capacity = 0;
    const registrationCount = 50;

// Act
    const result = popularityScore(capacity, registrationCount);

// Assert
    expect(result.score).toBe(0);
    expect(result.tier).toBe("new");
  });

});
