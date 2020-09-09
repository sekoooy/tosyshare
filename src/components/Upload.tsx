import React, { ChangeEvent } from 'react';
import { BsFileDiff } from 'react-icons/bs';
import { Button } from 'react-bootstrap';
import uploadImage from '../utils/upload-image';
import { Connected } from '../types';

type UploadState = {};
type UploadProps = {
  onUploadDone: (obj: { file: File; key: string }) => void;
  connected: Connected;
  onUploadProgress: (progress: number) => void;
  disabled: boolean;
};

class Upload extends React.Component<UploadProps, UploadState> {
  async onChange(e: ChangeEvent<{ files: File[] }>) {
    const file = e.target.files[0];
    const { connected, onUploadDone } = this.props;

    const uploaded = await uploadImage(file, connected, this.progressCallback);
    if (onUploadDone) {
      onUploadDone({ file, ...uploaded });
    }
    // eslint-disable-next-line no-console
    console.log(`File uploaded.`, uploaded);
  }

  progressCallback = (progress: ProgressEvent) => {
    const progresss = (progress.loaded / progress.total) * 100;
    const { onUploadProgress } = this.props;
    if (onUploadProgress) {
      onUploadProgress(progresss);
    }
  };

  render() {
    let fileInputRef: HTMLInputElement;
    const { disabled } = this.props;

    return (
      <>
        <input
          ref={(inp) => {
            fileInputRef = inp;
          }}
          style={{ display: 'none' }}
          type="file"
          accept="image/png"
          onChange={(evt) => this.onChange(evt as any)}
        />
        <Button
          variant="primary"
          onClick={() => fileInputRef.click()}
          disabled={disabled}
        >
          <BsFileDiff style={{ width: '30px', height: '30px' }} />
        </Button>
      </>
    );
  }
}

export default Upload;
