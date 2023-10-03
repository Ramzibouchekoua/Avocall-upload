import React, { useEffect, useState } from 'react';
import axios from 'axios';

function FileAttached() {
  const [downloadLink, setDownloadLink] = useState(null);

  useEffect(() => {
    // Replace with your Google Apps Script API endpoint URL
    const apiEndpoint = 'https://script.google.com/macros/s/1qH1LlasxbW98RXM64ZFT3kspTS_tZX0hP79CW8yoIy6zkhgeVMlgoIVj/exec';

    // Replace with the attachment name you want to find
    const attachmentName = '547GitHub-logo.png';

    // Make a POST request to your API endpoint with the attachmentName parameter
    axios
      .post(apiEndpoint, { attachmentName })
      .then((response) => {
        setDownloadLink(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data from Google Apps Script API:', error);
      });
  }, []);

  return (
    <div className="App">
      <h1>Google Apps Script API Integration</h1>
      {downloadLink ? (
        <a href={downloadLink} target="_blank" rel="noopener noreferrer">
          Download Link
        </a>
      ) : (
        <p>Attachment not found.</p>
      )}
    </div>
  );
}

export default FileAttached;
