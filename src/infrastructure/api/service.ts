import client from "./client";

const getSomething = async () => {
  const result = await client.get("");
  return result;
};

const service = { getSomething };

export default service;
