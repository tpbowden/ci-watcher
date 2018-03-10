import { Platform } from "./";

const circle: Platform = {
  name: "Circle CI",

  async validateToken(token: string) {
    const response = await get("https://circleci.com/api/v1.1/me?circle-token=" + token);

    return response.status === 200;
  }
};

async function get(url: string) {
  return await fetch(url);
}

export default circle;
