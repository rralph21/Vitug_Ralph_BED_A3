// Always mock firebase in every test
jest.mock("../src/config/firebaseConfig", () => ({
    db: {
        collection: jest.fn(),
    },
}));

// Reset all mocks after each test
afterEach(() => {
    jest.clearAllMocks();
});

afterAll(() => {
    jest.resetModules();
});