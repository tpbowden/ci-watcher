import circle from "renderer/platforms/circle";

export interface Platform {
  name: string;
}

const platforms = {
  [circle.name]: circle
};

export const getPlatform = (name: string) => platforms[name];

export default Object.keys(platforms).map((k) => platforms[k]);