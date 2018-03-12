import React from "react";
import { compose, lifecycle, withStateHandlers } from "recompose";

import { Platform, Project } from "renderer/platforms";

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
  setProjects(projects: Project[]): State;
};

export default compose<InnerProps, OuterProps>(
  withStateHandlers<State, Handlers>(
    { projects: [] },
    { setProjects: () => (projects: Project[]) => ({ projects }) }
  ),
  lifecycle<Handlers & State & OuterProps, {}>({
    async componentDidMount() {
      const projects = await this.props.platform.getProjects(this.props.token);
      this.props.setProjects(projects);
    }
  })
)(ProjectSelector);
