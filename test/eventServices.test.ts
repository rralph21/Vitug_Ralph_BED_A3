import { eventSchemas } from "../src/api/v1/validation/eventValidation";
import * as eventService from "../src/api/v1/services/eventServices";
import { db } from "../src/config/firebaseConfig";

describe("Event Create Validation Schema (POST /events)", () => {
  it('should fail when "name" is missing', () => {
    // Arrange
    const body = {
      date: "2027-01-01T12:00:00.000Z",
      capacity: 100,
    };

    // Act
    const { error } = eventSchemas.create.body.validate(body, { abortEarly: true });

    // Assert
    expect(error).toBeTruthy();
    expect(error?.details[0].message).toContain('"name" is required');
  });

  it('should fail when "capacity" is not an integer', () => {
    // Arrange
    const body = {
      name: "Test Event",
      date: "2027-01-01T12:00:00.000Z",
      capacity: 50.5,
    };

    // Act
    const { error } = eventSchemas.create.body.validate(body, { abortEarly: true });

    // Assert
    expect(error).toBeTruthy();
    expect(error?.details[0].message).toContain('"capacity" must be an integer');
  });

  it('should fail when "status" is not in the allowed enum list', () => {
    // Arrange
    const body = {
      name: "Test Event",
      date: "2027-01-01T12:00:00.000Z",
      capacity: 100,
      status: "pending",
    };

    // Act
    const { error } = eventSchemas.create.body.validate(body, { abortEarly: true });

    // Assert
    expect(error).toBeTruthy();
    expect(error?.details[0].message).toContain('"status"');
  });
});

describe("Event Services (Firestore)", () => {
  // Arrange test ids
  const testId = `evt_test_${Date.now()}`;

  beforeAll(async () => {
    // Optional: ensure emulator is being used
    // If you do NOT use emulator, remove this guard.
    if (!process.env.FIRESTORE_EMULATOR_HOST) {
      console.warn("FIRESTORE_EMULATOR_HOST not set. These tests may hit real Firestore.");
    }
  });

  afterAll(async () => {
    // Cleanup: delete test doc if it exists (safe cleanup)
    try {
      await db.collection("events").doc(testId).delete();
    } catch {}
  });

  describe("createEventDb", () => {
    it("should create an event in Firestore", async () => {
      // Arrange
      const name = "Service Test Event";
      const date = "2027-01-01T12:00:00.000Z";
      const capacity = 100;

      // Act
      const created = await eventService.createEventDb(name, date, capacity);

      // Assert
      expect(created).toBeTruthy();
      expect(created.name).toBe(name);
      expect(created.capacity).toBe(capacity);
      expect(created.createdAt).toBeTruthy();
      expect(created.updatedAt).toBeTruthy();
    });
  });

  describe("getAllEventsDb", () => {
    it("should return an array of events", async () => {
      // Arrange
      // (No setup required, but you can create a record if you want deterministic count)

      // Act
      const events = await eventService.getAllEventsDb();

      // Assert
      expect(Array.isArray(events)).toBe(true);
    });
  });

  describe("getEventByIdDb", () => {
    it("should return null when event is not found", async () => {
      // Arrange
      const missingId = "evt_DOES_NOT_EXIST_123";

      // Act
      const result = await eventService.getEventByIdDb(missingId);

      // Assert
      expect(result).toBeNull();
    });
  });

  describe("updateEventDb", () => {
    it("should return null when trying to update a missing event", async () => {
      // Arrange
      const missingId = "evt_DOES_NOT_EXIST_456";

      // Act
      const result = await eventService.updateEventDb(missingId, { name: "New Name" });

      // Assert
      expect(result).toBeNull();
    });
  });

  describe("deleteEventDb", () => {
    it("should return null when trying to delete a missing event", async () => {
      // Arrange
      const missingId = "evt_DOES_NOT_EXIST_789";

      // Act
      const result = await eventService.deleteEventDb(missingId);

      // Assert
      expect(result).toBeNull();
    });
  });
});