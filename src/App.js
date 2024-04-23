import React, { useState } from 'react';
import axios from 'axios';

function FileUpload() {
  const [imageFiles, setImageFiles] = useState(null);
  const [regularFiles, setRegularFiles] = useState(null);
  const [regular, setRegular] = useState(null);
  const [message, setMessage] = useState('');

  const handleImageChange = (event) => {
    setImageFiles(event.target.files);
  };

  const handleRegularFileChange = (event) => {
    setRegularFiles(event.target.files);
  };

  const handleRegular = (event) => {
    setRegular(event.target.files);
  };

  const handleUpload = async () => {
    const formData = new FormData();

    if (imageFiles) {
      for (const file of imageFiles) {
        formData.append('imageFiles', file);

      }
    }

    if (regularFiles) {
      for (const file of regularFiles) {
        formData.append('regularFiles', file);
      }
    }

    if (regular) {
      for (const file of regular) {
        formData.append('regular', file);
      }
    }

    try {
      const response = await axios.post('http://localhost:4000/api', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage(response.data.message);
      console.log("data", response.data)
    } catch (error) {
      setMessage('Error uploading files.');
      console.error('Error uploading files:', error);
    }
  };

  return (
    <div>
      <input type="file" multiple onChange={handleImageChange} accept="image/*" />
      <input type="file" multiple onChange={handleRegularFileChange} />
      <input type="file" multiple onChange={handleRegular} />
      <button onClick={handleUpload}>Upload</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default FileUpload;
