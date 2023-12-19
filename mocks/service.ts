// import { faker } from "@faker-js/faker";

/*
function createRandomPhoto(): Photo {
  return {
    albumId: faker.datatype.number(),
    id: faker.datatype.number(),
    title: faker.music.songName(),
    url: faker.image.imageUrl(),
    thumbnailUrl: faker.image.imageUrl(),
  };
}

function createRandomUser(): User {
  const sex = faker.name.sexType();
  const firstName = faker.name.firstName(sex);
  const lastName = faker.name.lastName();
  const username = faker.internet.userName(firstName, lastName);
  const email = faker.helpers.unique(faker.internet.email.bind(faker), [
    firstName,
    lastName,
  ]);

  return {
    id: faker.datatype.number(),
    name: `${firstName} ${lastName}`,
    email,
    username,
    phone: faker.phone.number(),
    address: {
      street: faker.address.street(),
      suite: faker.address.direction(),
      city: faker.address.city(),
      zipcode: faker.address.zipCode(),
      geo: {
        lat: faker.address.latitude(),
        lng: faker.address.longitude(),
      },
    },
    website: faker.internet.domainName(),
    company: {
      name: faker.company.name(),
      catchPhrase: faker.company.catchPhrase(),
      bs: faker.company.bs(),
    },
  };
} */

const service = {};

export default service;
