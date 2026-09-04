export function createRandomUser() {
  const randomNumber = Math.floor(Math.random() * 1000000);

  return {
    name: `Lino${randomNumber}`,
    email: `lino${randomNumber}@test.com`,
    password: "123456"
  };
}