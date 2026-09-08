export function createRandomUser() {
  const randomNumber = Date.now();

  return {
    nome: `Lino${randomNumber}`,
    email: `lino${randomNumber}@test.com`,
    password: "123456",
    administrador: "false"
  };
}