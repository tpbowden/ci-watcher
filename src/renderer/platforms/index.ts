import circle from "renderer/platforms/circle";

export interface Project {
  name: string;
  owner: string;
  vcs: string;
  branch: string;
}

export interface Platform {
  name: string;
  validateToken(token: string): Promise<boolean>;
  getProjects(token: string): Promise<Project[]>;
}

const platforms = {
  [circle.name]: circle
};

export const getPlatform = (name: string) => platforms[name];

export default Object.keys(platforms).map((k) => platforms[k]);
