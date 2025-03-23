import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Typography, Link, Grid, Card, CardMedia, IconButton } from "@mui/material";
import { TaskItems } from "../../types/types";
import { Delete } from "@mui/icons-material";

type FileUploadProps = {
  setFile: (field: keyof TaskItems, value: string | Date | string[]) => void;
  task: TaskItems;
};

const FileUpload: React.FC<FileUploadProps> = ({ setFile, task }) => {
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

  const base64ToBlob = (base64Data: string): Blob => {
    const parts = base64Data.split(",");
    const regex = /:(.*?);/;
    const mimeMatch = regex.exec(parts[0]);
    const mime = mimeMatch ? mimeMatch[1] : "";
    const binary = atob(parts[1]);
    const length = binary.length;
    const u8arr = new Uint8Array(length);
    for (let i = 0; i < length; i++) {
      u8arr[i] = binary.charCodeAt(i);
    }
    return new Blob([u8arr], { type: mime });
  };

  useEffect(() => {
    if (task.files?.length) {
      const blobs = task.files.map((fileStr: string) => base64ToBlob(fileStr));
      const urls = blobs.map((blob) => URL.createObjectURL(blob));
      setPreviewUrls(urls);
      setFileBlobs([...task.files]);
    }
  }, [task]); // Run only on mount

  const onDrop = async (
    acceptedFiles: File[],
  ) => {
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

  useEffect(() => {
    if (fileBlobs.length > 0) {
      setFile("files", [...fileBlobs]);
    }
  }, [fileBlobs, setFile]);

  const removeImage = (index: number) => {
    const newPreviewUrls = [...previewUrls];
    const newFileBlobs = [...fileBlobs];
    newPreviewUrls.splice(index, 1);
    newFileBlobs.splice(index, 1);
    setPreviewUrls(newPreviewUrls);
    setFileBlobs(newFileBlobs);
    setFile("files", newFileBlobs);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: true,
    onDragEnter: () => { },
    onDragLeave: () => { },
    onDragOver: () => { },
  });

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
                <IconButton onClick={() => removeImage(index)} color="error" sx={{ backgroundColor: "white" }}>
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
