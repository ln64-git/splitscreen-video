import { Button } from '@nextui-org/react';
import { Radio, RadioGroup } from '@nextui-org/react';
import React from 'react';

interface PopoverContentProps {
  isRemote: boolean;
  setIsRemote: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: () => void;
  filePath: File | undefined;
  fileInputRef: React.MutableRefObject<HTMLInputElement | null>;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  urlPath: string;
  inputRef: React.MutableRefObject<HTMLInputElement | null>;
  handleUrlChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomPopoverContent: React.FC<PopoverContentProps> = ({
  isRemote,
  setIsRemote,
  handleSubmit,
  filePath,
  fileInputRef,
  handleFileChange,
  urlPath,
  inputRef,
  handleUrlChange,
}) => {
  const FileInput = () => (
    <>
      <label
        htmlFor="fileInput"
        className={
          isRemote
            ? 'pointer-events-none m-2 rounded-md dark p-1 px-2 text-tiny opacity-40'
            : 'm-2 rounded-md dark p-1 px-2 text-tiny'
        }
      >
        Choose File
      </label>
      <input
        type="file"
        id="fileInput"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />
    </>
  );
  const UrlInput = () => (
    <input
      ref={inputRef}
      className={
        isRemote
          ? 'm-1 ml-8 rounded-md bg-zinc-800 p-1 text-tiny'
          : 'pointer-events-none m-1 ml-8 rounded-md bg-zinc-800 p-1 text-tiny opacity-40'
      }
      value={urlPath}
      onChange={handleUrlChange}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          handleSubmit();
        }
      }}
    />
  );

  return (
    <RadioGroup defaultValue={isRemote ? 'remote' : 'local'}>
      <div className="flex flex-col justify-center px-1 py-2 ">
        <div className="flex">
          <Radio
            value="remote"
            onClick={() => setIsRemote(true)}
            className=""
          ></Radio>
          <div className="mx-2">
            <div className="text-xl font-bold">Open from URL</div>
            <div className="text-md">
              Connect to an existing video on the internet
            </div>
          </div>
        </div>
        <UrlInput />
        <div className="flex">
          <Radio
            value="local"
            onClick={() => setIsRemote(false)}
            className=""
          ></Radio>
          <div className="mx-2">
            <div className="text-xl font-bold">Open local file</div>
            <div className="text-md" key="local-label-tiny">
              Upload a video from your device
            </div>
          </div>
        </div>
        <div className="p-2 text-right">
          <FileInput />
        </div>
        <Button
          onClick={handleSubmit}
          className="text-md bg-zinc-800 text-white"
        >
          Add Screen
        </Button>
        {filePath && <p>Selected file: {filePath.name}</p>}
      </div>
    </RadioGroup>
  );
};
export default CustomPopoverContent;
