import React, { useEffect, useState } from "react";
import { DropEvent, FileRejection, useDropzone } from "react-dropzone";
import { Box, Typography, Link, Grid, Card, CardMedia, IconButton } from "@mui/material";
import { TaskItems } from "../../types/types";
import { Delete } from "@mui/icons-material";

type fileUploadProps = {
  setFile: (field: keyof TaskItems, value: string | Date | string[]) => void;
};

const FileUpload: React.FC<fileUploadProps> = ({ setFile }) => {
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [fileBlobs, setFileBlobs] = useState<string[]>([]);

  const convertBlobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  /* eslint-disable @typescript-eslint/no-unused-vars */
  const onDrop = async (acceptedFiles: File[], _fileRejections: FileRejection[], _event: DropEvent) => {
    const base64Files: string[] = [];
    const imagePreviews: string[] = [];

    const processFiles = async () => {
      for (const file of acceptedFiles) {
        const fileBlob = new Blob([file], { type: file.type });

        try {
          const base64String = await convertBlobToBase64(fileBlob);
          base64Files.push(base64String);
        } catch (error) {
          console.error("Error converting blob to base64:", error);
        }

        if (file.type.startsWith("image/")) {
          const previewUrl = URL.createObjectURL(file);
          imagePreviews.push(previewUrl);
        }
      }

      setPreviewUrls((prevUrls) => [...prevUrls, ...imagePreviews]);
      setFileBlobs((prevBase64) => [...prevBase64, ...base64Files]);
    };

    await processFiles();
  };
  /* eslint-enable @typescript-eslint/no-unused-vars */

  useEffect(() => {
    if (fileBlobs.length > 0) setFile("files", [...fileBlobs]);

  }, [fileBlobs])

  const removeImage = (index: number) => {
    const newPreviewUrls = [...previewUrls];
    const newFileBlobs = [...fileBlobs];
    newPreviewUrls.splice(index, 1);
    newFileBlobs.splice(index, 1);
    setPreviewUrls(newPreviewUrls);
    setFileBlobs(newFileBlobs);
    setFile("files", newFileBlobs); // Update the file state as well
  };

  /* eslint-disable @typescript-eslint/no-unused-vars */
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: true,
    onDragEnter: () => { },
    onDragLeave: () => { },
    onDragOver: () => { }
  });
  /* eslint-enable @typescript-eslint/no-unused-vars */
  return (
    <Box>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        Attachment
      </Typography>
      <Box
        {...getRootProps()}
        sx={{
          border: "1px solid #ddd",
          borderRadius: "6px",
          padding: "12px",
          textAlign: "center",
          backgroundColor: "#fafafa",
          cursor: "pointer",
          "&:hover": { backgroundColor: "#f0f0f0" },
        }}
      >
        <input {...getInputProps()} style={{ display: "none" }} />
        <Typography variant="body2" color="textSecondary">
          Drop your files here or{" "}
          <Link href="#" underline="hover">
            Update
          </Link>
        </Typography>
      </Box>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        {previewUrls.map((url, index) => (
          <Grid item xs={6} sm={3} key={index} sx={{ position: "relative", top: 0, right: 0 }}>
            <Card>
              <CardMedia
                component="img"
                image={url}
                alt={`File preview ${index}`}
                sx={{ height: 120, objectFit: "cover" }}
              />
              <Box sx={{ position: "absolute", top: 0, right: 0 }}>
                <IconButton
                  onClick={() => removeImage(index)}
                  color="error"
                  sx={{ backgroundColor: "white" }}
                >
                  <Delete />
                </IconButton>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FileUpload;
