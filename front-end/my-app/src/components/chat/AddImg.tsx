"use client";
import { FaRegFileImage, FaRegFilePdf } from "react-icons/fa";
import { MdOutlineVideoLibrary } from "react-icons/md";

export type AddImgHandle = HTMLDivElement & {
  open: () => void;
  close: () => void;
};

type FileType = "file" | "img" | "vedio";

import React, { forwardRef, useEffect, useRef, useState } from "react";

import { CgMathPlus } from "react-icons/cg";

type AddImgProps = {
  action: File | null;
  setAction: React.Dispatch<React.SetStateAction<File | null>>;
};

// eslint-disable-next-line react/display-name
const AddImg = forwardRef<AddImgHandle, AddImgProps>(
  ({ action, setAction }, ref) => {
    const [active, setActive] = useState(false);
    const [fileType, setFileType] = useState<FileType|null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const chooseFile = (type: FileType) => {
      setFileType(type);
      inputRef.current?.click();
    };

    useEffect(() => {
      const handleClick = (e: MouseEvent) => {
        if (
          (ref as React.RefObject<HTMLDivElement>)?.current &&
          !(ref as React.RefObject<HTMLDivElement>)?.current.contains(
            e.target as Node
          )
        ) {
          setActive(false);
        }
      };

      if (active) {
        document.addEventListener("mousedown", handleClick);
      }
      return () => {
        document.removeEventListener("mousedown", handleClick);
      };
    }, [active, ref]);

    console.log(fileType);

    return (
      <div ref={ref}>
        <button
          type="button"
          className="absolute top-1/2 right-2 -translate-y-1/2 block dark:hover:text-text-dark-username
        dark:text-last-dark cursor-pointer hover:text-last-dark"
          onClick={(e) => {
            e.stopPropagation();
            setActive((pre) => !pre);
          }}
        >
          <CgMathPlus size={24} />
        </button>

        <div className="absolute right-0 bottom-[100%] cursor-pointer rounded-2xl border-1 ">
          {active && (
            <div className="flex flex-col bg-secondry-bg dark:bg-secondry-dark  w-52 h-fit gap-2 p-2 rounded-2xl">
              <button
                type="button"
                className="addFile"
                onClick={() => chooseFile("img")}
              >
                <FaRegFileImage className="" size={18} />
                <span className="text-sm">Image</span>
              </button>
              <button
                type="button"
                className="addFile"
                onClick={() => chooseFile("file")}
              >
                <FaRegFilePdf size={18} />
                <span className="text-sm">PDF File</span>
              </button>
              <button
                type="button"
                className="addFile"
                onClick={() => chooseFile("vedio")}
              >
                <MdOutlineVideoLibrary size={18} />
                <span className="text-sm">Video</span>
              </button>

              <input
                type="file"
                ref={inputRef}
                className="hidden"
                accept={
                  fileType === "img"
                    ? "image/*"
                    : fileType === "file"
                    ? ".pdf"
                    : "video/*"
                }
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setAction(e.target.files[0]);
                  }
                }}
              />
              <button type="submit">submit</button>
            </div>
          )}
        </div>
      </div>
    );
  }
);

export default React.memo(AddImg);
