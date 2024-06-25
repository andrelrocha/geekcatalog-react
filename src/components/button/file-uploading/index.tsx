import React from 'react';
import { Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/system';
import { colors } from '../../../utils/colors';

const VisuallyHiddenInput = styled('input')({
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  border: 0,
});

interface FileUploadButtonProps {
  icon?: React.ReactNode;
  title: string;
  mt?: number;
  mb?: number;
  fileExtension?: string;
  onChange?: (file: File) => void; 
}

const FileUploadButton: React.FC<FileUploadButtonProps> = (props: FileUploadButtonProps) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && props.fileExtension) {
      const fileExtension = file.name.split('.').pop();
      if (fileExtension !== props.fileExtension.replace('.', '')) {
        alert(`Please upload a file with the ${props.fileExtension} extension`);
        return;
      }
    }
    if (props.onChange && file) {
      props.onChange(file); 
    }
  };

  return (
    <Button
      component="label"
      variant="contained"
      startIcon={props.icon || <CloudUploadIcon />}
      sx={{
        marginTop: props.mt || 2,
        marginBottom: props.mb || 2,
        backgroundColor: colors.buttonBlue,
        color: colors.whiteSmoke,
        '&:hover': { backgroundColor: colors.buttonBlueDark },
      }}
    >
      {props.title}
      <VisuallyHiddenInput type="file" onChange={handleFileChange} />
    </Button>
  );
};

export default FileUploadButton;
