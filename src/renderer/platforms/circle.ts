import { Platform, Project } from "./";

interface CircleProject {
  default_branch: string;
  reponame: string;
  username: string;
  vcs_type: string;
}

const circle: Platform = {
  name: "Circle CI",

  async validateToken(token: string) {
    const response = await get(
      "https://circleci.com/api/v1.1/me?circle-token=" + token
    );

    return response.status === 200;
  },

  async getProjects(token: string) {
    const response = await get(
      `https://circleci.com/api/v1.1/projects?circle-token=${token}`
    );

    const projects = (await response.json()) as CircleProject[];
    return projects.map<Project>((p) => ({
      branch: p.default_branch,
      name: p.reponame,
      owner: p.username,
      vcs: p.vcs_type
    }));
  }
};

async function get(url: string) {
  return await fetch(url);
}

export default circle;
