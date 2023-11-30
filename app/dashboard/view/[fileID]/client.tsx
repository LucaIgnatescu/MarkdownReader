"use client";
import { useState, createContext, useContext, useRef } from "react";
import { handleSaveAction } from "./actions";
import { useRouter } from "next/navigation";

export const EditingContext = createContext(null as any);

export function ViewManager({
  children,
  markdown,
  fileID,
}: {
  children: React.ReactNode;
  markdown: String;
  fileID: String;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const ref = useRef(null);
  return (
    <EditingContext.Provider
      value={{ isEditing, setIsEditing, ref, markdown, fileID }}
    >
      {children}
    </EditingContext.Provider>
  );
}

export function Content({
  children,
  className,
  id,
}: {
  children?: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const { isEditing } = useContext(EditingContext);
  return (
    <div className={className} id={id}>
      {isEditing ? <EditContent /> : children}
    </div>
  );
}

function EditContent() {
  const { ref, markdown } = useContext(EditingContext);
  return <textarea ref={ref} defaultValue={markdown}></textarea>;
}

export function EditMenu({ className }: { className?: string }) {
  const { isEditing, setIsEditing, ref, fileID } = useContext(EditingContext);
  const router = useRouter();

  const flipEditValue = () => setIsEditing(!isEditing);
  return (
    <div className={className}>
      <button onClick={flipEditValue}>Edit</button>
      <button
        onClick={() => {
          handleSaveAction(ref.current?.value, fileID)
            .then(flipEditValue)
            .then(() => router.refresh());
        }}
      >
        Save
      </button>
    </div>
  );
}
