module.exports = {
  get: jest.fn(() => {
    return Promise.resolve({
      data: {
        Brastlewark: [
          {
            id: 1,
            name: "John Doe",
            age: 10,
            weight: 20,
            profession: ["A", "B", "C"],
          },
          {
            id: 2,
            name: "Jane Doe",
            age: 20,
            weight: 30,
            profession: ["D", "E", "F"],
          },
        ],
      },
    });
  }),
};
