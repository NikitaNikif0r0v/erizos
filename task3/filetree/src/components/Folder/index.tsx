import { Component } from "react";
import File from "../File";
import { FolderType, FolderState } from "../../shared/types";

import s from "./styles.module.scss";

class Folder extends Component<FolderType, FolderState> {
  constructor(props: FolderType) {
    super(props);
    const { collapsed } = props;
    this.state = {
      collapsed: collapsed === false ? collapsed : true,
    };
  }

  toggleCollapse = () => {
    this.setState((prevState) => ({ collapsed: !prevState.collapsed }));
  };

  render() {
    const { name, children, collapsed: collapsedProp } = this.props;
    const { collapsed } = this.state;

    return (
      <li className={s.folder}>
        <div onClick={this.toggleCollapse} className={s.collapseIcon}>
          <span className={`${s.icon} ${!collapsed ? s.collapsed : ""}`} />
          <span>{name}</span>
        </div>
        {!collapsed && Array.isArray(children) && (
          <ul>
            {children.map((child, index) => {
              if ("mime" in child) {
                return (
                  <File
                    key={index}
                    name={child.name}
                    mime={child.mime}
                    type={child.type}
                  />
                );
              }
              return <Folder key={index} collapsed {...child} />;
            })}
          </ul>
        )}
      </li>
    );
  }
}

export default Folder;
