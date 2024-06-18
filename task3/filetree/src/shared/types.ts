export type FolderType = {
  name: string;
  children: (FolderType | FileType)[];
  type: string;
  collapsed?: boolean;
};

export type FileType = {
  name: string;
  mime: string;
  type: string;
};

type Collapsed = {
  collapsed: boolean;
};

export interface MyBrowserProps {
  data: (FolderType | FileType)[];
  expandedFolders?: string[];
}

export interface MyBrowserState {
  searchTerm: string;
  expandedFolders: string[];
}

export interface FolderProps extends FolderType {}
export interface FolderState extends Collapsed {}
