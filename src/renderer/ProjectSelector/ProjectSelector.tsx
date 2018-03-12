import React from "react";
import { compose, lifecycle, StateHandler, withStateHandlers } from "recompose";

import { Platform } from "renderer/platforms";

interface Project {
  name: string;
  owner: string;
  vcs: string;
  branch: string;
}
const ProjectSelector: React.SFC<State & OuterProps> = ({ projects }) => (
  <div>
    {projects.map((project) => (
      <div key={project.name}>
        {project.vcs} : {project.owner} / {project.name} # {project.branch}
      </div>
    ))}
  </div>
);

interface OuterProps {
  platform: Platform;
  token: string;
}

interface State {
  projects: Project[];
}

type InnerProps = State;

// tslint:disable-next-line: interface-over-type-literal
type Handlers = {
  setProjects: StateHandler<State>;
};

interface CircleProjectsResponse {
  default_branch: string;
  reponame: string;
  username: string;
  vcs_type: string;
}

export default compose<InnerProps, OuterProps>(
  withStateHandlers<State, Handlers>(
    { projects: [] },
    { setProjects: () => (projects) => ({ projects }) }
  ),
  lifecycle<Handlers & State & OuterProps, {}>({
    async componentDidMount() {
      const response = await fetch(
        `https://circleci.com/api/v1.1/projects?circle-token=${
          this.props.token
        }`
      );

      const projects = (await response.json()) as CircleProjectsResponse[];
      this.props.setProjects(
        projects.map<Project>((p) => ({
          branch: p.default_branch,
          name: p.reponame,
          owner: p.username,
          vcs: p.vcs_type
        }))
      );
    }
  })
)(ProjectSelector);
