"use client";

import { ChangeEvent, useState } from "react";

export function FileFormContent() {
  const [fileName, setFileName] = useState("");

  function handleUpload(event: ChangeEvent) {
    const target = event.target as HTMLInputElement;
    const file = target.files !== null ? target.files[0] : null;
    const fileName = file?.name.split(".")[0] ?? null;

    if (fileName) {
      setFileName(fileName);
    }
  }

  return (
    <>
      <label htmlFor="fileName">
        File Name:{" "}
      </label>
      <input
        name="fileName"
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
        id="fileName"
      />
      
      <br />
      <input type="file" name="fileContent" onChange={handleUpload} />
      <input type="submit" defaultValue="Upload File" />
    </>
  );
}
