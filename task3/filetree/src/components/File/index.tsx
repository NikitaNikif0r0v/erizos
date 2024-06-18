import { Component } from "react";
import { FileType } from "../../shared/types";
import {
  FileIcon,
  defaultStyles,
  DefaultExtensionType,
  FileIconProps,
} from "react-file-icon";
import mime from "mime";

import s from "./styles.module.scss";

interface DefaultStylesWithIndexSignature
  extends Record<DefaultExtensionType, Partial<FileIconProps>> {
  [key: string]: Partial<FileIconProps>;
}

class File extends Component<FileType> {
  render() {
    const { name, mime: fileMime, type } = this.props;

    const mimeType = mime.getExtension(fileMime);
    const style = mimeType
      ? (defaultStyles as DefaultStylesWithIndexSignature)[mimeType]
      : null;

    return (
      <li className={s.file}>
        {mimeType ? <FileIcon extension={mimeType} {...style} /> : <FileIcon />}
        <span>{name}</span>
      </li>
    );
  }
}

export default File;
