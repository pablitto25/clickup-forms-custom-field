import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface ImageDropzoneProps {
  onImageDrop: (acceptedFiles: File[]) => void;
}

const ImageDropzone: React.FC<ImageDropzoneProps> = ({ onImageDrop }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Llama a la función proporcionada para manejar la caída de la imagen
    if (onImageDrop) {
      onImageDrop(acceptedFiles);
    }
  }, [onImageDrop]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} style={dropzoneStyles}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Suelta la imagen aquí...</p> :
          <p>Arrastra y suelta la imagen aquí, o haz clic para seleccionarla.</p>
      }
    </div>
  );
};

const dropzoneStyles: React.CSSProperties = {
  border: '2px dashed #cccccc',
  borderRadius: '4px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
};

export default ImageDropzone;
