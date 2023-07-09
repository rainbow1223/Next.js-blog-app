import React, {useState} from "react";
import {FileLibrary} from "../../lib/schemas/FileLibrary";
import formatFileSize from "../../lib/utils/formatFileSize";


interface TreeNodeProps {
  node: FileLibrary;
  isChild?: boolean;
  isExpanded: boolean;
  selectedFolder: string;
  setSelectedFolder: (id: string) => void;
  setIsExpanded: (id: boolean) => void;
  dirNode: FileLibrary[];
  onSaveFolderName: (id: string, value: string) => void;
  onDeleteNode: (id: string) => void;
}

const TreeNode: React.FC<TreeNodeProps> = (
  {
    dirNode,
    node,
    isChild = false,
    selectedFolder,
    setSelectedFolder,
    onSaveFolderName,
    onDeleteNode,
    isExpanded,
    setIsExpanded,
  }
) => {
  const hasChildren = dirNode.some((item) => item.parentId === node.id);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [folderName, setFolderName] = useState<string>(node.name);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);

    if (!isExpanded) {
      setSelectedFolder(node.id)
      console.log(node.id)
    } else {
      setSelectedFolder("")
    }

  };

  const handleDelete = () => {
    onDeleteNode(node.id);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFolderName(event.target.value);
  };

  const handleSaveName = () => {
    onSaveFolderName(node.id, folderName);
    setIsEdit(false);
  };

  return (
    <>
      <tr>
        <td
          className="text-secondfsdfsddary d-flex gap-1 align-items-center justify-content-start"
          style={{
            paddingLeft: hasChildren ? "0.7rem" : "0.7rem",
          }}
        >
          <div className="d-flex flex-row align-items-center justify-content-start">
            {!isChild && (
              <div
                className={`line ${
                  hasChildren && isExpanded ? "line-expanded" : ""
                }`}
              ></div>
            )}
            <div className="d-flex align-items-center gap-1">
              <div
                className={`d-flex flex-row align-items-center justify-content-start gap-1 ${
                  node.type === "folder" && "cursor-pointer"
                } node ${selectedFolder === node.id && "selectedFolder"}`}
                onClick={() => {
                  if (node.type === "folder" && !isEdit) {
                    if (node.id === selectedFolder) {
                      console.log(node.id === selectedFolder)
                      setSelectedFolder("");
                    } else {
                      setSelectedFolder(node.id);
                    }
                  }
                }}
                onDoubleClick={toggleExpand}
              >
                <span>
                  {node.type === "folder" ? (
                    <i className="bx bx-folder font-size-16"/>
                  ) : (
                    <i className="bx bx-file font-size-16"/>
                  )}
                </span>
                {isEdit ? (
                  <input value={folderName} onChange={handleNameChange}/>
                ) : (
                  <span>{node.name}</span>
                )}
              </div>
            </div>
          </div>
        </td>
        <td className="text-secondary">{formatFileSize(node.size)}</td>
        <td className="text-secondary">{node.type}</td>
        <td className="text-secondary">
          <div className="d-flex gap-3">
            <div className="cursor-pointer" onClick={handleDelete}>
              <i className="bx bx-trash font-size-16"/>
            </div>

            {isEdit ? (
              <div className="cursor-pointer" onClick={handleSaveName}>
                <i className="bx bx-save font-size-16"/>
              </div>
            ) : (
              <div className="cursor-pointer" onClick={() => setIsEdit(true)}>
                <i className="bx bx-edit font-size-16"/>
              </div>
            )}
          </div>
        </td>
      </tr>
    </>
  );
};

export default TreeNode;
