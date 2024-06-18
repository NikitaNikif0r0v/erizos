import React, { Component } from "react";
import File from "../File";
import Folder from "../Folder";
import {
  FileType,
  FolderProps,
  FolderType,
  MyBrowserProps,
  MyBrowserState,
} from "../../shared/types";

import s from "./styles.module.scss";

class MyBrowser extends Component<MyBrowserProps, MyBrowserState> {
  constructor(props: MyBrowserProps) {
    super(props);
    this.state = {
      searchTerm: "",
      expandedFolders: props.expandedFolders || [],
    };
  }

  handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  };

  search(
    tree: (FolderType | FileType)[],
    target: string
  ): (FolderType | FileType)[] | undefined {
    const result: (FolderType | FileType)[] = [];
    if (target !== "") {
      for (let i = 0; i < tree.length; i++) {
        if (tree[i].type === "FILE") {
          const file = tree[i] as FileType;
          if (file.name.includes(target)) {
            result.push(file);
          }
        } else if (tree[i].type === "FOLDER") {
          const folder = tree[i] as FolderType;
          const matches = this.search(folder.children, target);

          if (matches && matches.length > 0) {
            result.push({
              ...folder,
              children: matches,
              collapsed: false,
            });
          }
        }
      }
      return result;
    } else {
      return tree;
    }
  }

  resolveExpandedFolders(
    tree: (FolderType | FileType)[],
    expandedFolders: string[][]
  ): (FolderType | FileType)[] {
    expandedFolders.forEach((strArr) => {
      strArr.forEach((str) => {
        const findFolder = (
          tree: (FolderType | FileType)[],
          name: string
        ): FolderType | undefined => {
          for (const item of tree) {
            if (item.type === "FOLDER") {
              if (item.name === name) {
                return item as FolderType;
              } else if ((item as FolderType).children) {
                const found = findFolder((item as FolderType).children, name);
                if (found) {
                  return found;
                }
              }
            }
          }
          return undefined;
        };

        const folder = findFolder(tree, str);
        if (folder) {
          folder.collapsed = false;
        }
      });
    });
    return tree;
  }

  render() {
    const { data } = this.props;
    const { searchTerm, expandedFolders } = this.state;

    const resolvedData = this.resolveExpandedFolders(
      data,
      expandedFolders.map((str) => str.split("/"))
    );

    const filteredData = this.search(resolvedData, searchTerm);

    return (
      <div className={s.browser}>
        <input
          className={s.search}
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={this.handleSearchChange}
        />
        <ul>
          {!filteredData && <li>No results found</li>}
          {filteredData?.map((item, index) => {
            if (item.type === "FILE") {
              const file = item as FileType;
              return (
                <File
                  key={index}
                  name={file.name}
                  mime={file.mime}
                  type={file.type}
                />
              );
            }
            const folder = item as FolderProps;
            return (
              <Folder
                type={folder.type}
                key={index}
                name={folder.name}
                children={folder.children}
                collapsed={folder.collapsed}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}

export default MyBrowser;
