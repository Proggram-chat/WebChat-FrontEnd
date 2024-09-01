import { Dialog } from '@radix-ui/react-dialog';
import { DownloadIcon } from '@radix-ui/react-icons';
import { useEffect } from 'react';

import { useUploadFiles } from '@/features/chat/uploadFiles/model';
import { Button } from '@/shared/components/ui/button';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/ui/dialog';
import { Input } from '@/shared/components/ui/input';

export const UploadFiles = () => {
  const { setFiles, files, removeFile, clearFiles } = useUploadFiles();
  // @ts-expect-error
  const handleFileChange = event => {
    const selectedFiles = Array.from(event.target.files);
    // @ts-expect-error
    setFiles([...files, ...selectedFiles]);
  };

  // @ts-expect-error
  const handleRemoveFile = index => {
    removeFile(index);
  };

  const handleClearFiles = () => {
    clearFiles();
  };

  useEffect(() => {
    console.log(files); // Для перевірки, чи файли успішно додаються
  }, [files]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" className="rounded-[50%]" variant="ghost" size="icon">
          <DownloadIcon color="black" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Send Photo</DialogTitle>
          <DialogDescription>Choose a photo to send</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input type="file" onChange={handleFileChange} multiple />
          <div>
            {files.length > 0 && (
              <ul>
                {files.map((file, index) => (
                  <li key={index} className="flex justify-between">
                    <span>{file.name}</span>
                    <Button variant="ghost" size="icon" onClick={() => handleRemoveFile(index)}>
                      Remove
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button className="w-full" type="submit">
            Send Photo
          </Button>
          <Button className="w-full mt-2" variant="ghost" onClick={handleClearFiles}>
            Clear Files
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
