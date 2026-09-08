export function createRandomProduct() {
  const randomNumber = `${Date.now()}${Math.floor(
    Math.random() * 100000
  )}`;

  return {
    name: `Produto ${randomNumber}`,
    price: 100,
    description: "Produto criado automaticamente pelo teste",
    quantity: 10,
  };
}