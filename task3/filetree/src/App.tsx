import { useEffect, useState } from "react";

import "./App.css";
import MyBrowser from "./components/Browser";
import { FileType, FolderProps } from "./shared/types";

function App() {
  const [data, setData] = useState<(FolderProps | FileType)[]>([]);
  const [expandedFolders, setExpandedFolders] = useState<string[]>([
    "Common7",
    "DIA SDK/lib",
  ]);

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="App">
      <MyBrowser data={data} expandedFolders={expandedFolders} />
    </div>
  );
}

export default App;
