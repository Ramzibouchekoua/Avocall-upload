import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./style.css";

const Fileuploader =  () => {
       const [files, setFiles] = useState([]);
       const onSuccess = (savedFiles) => {
              setFiles(savedFiles)
          };
       const onInputChange = (e) => {
              setFiles(e.target.files);
       };
       const onSubmit = (e) => {
              e.preventDefault();
              const data = new FormData();
              for (let i = 0; i < files.length; i++) {
                     data.append("file", files[i]);
              }
              axios.post("//localhost:8000/uploadfile", data)
                     .then((response) => {
                            toast.success("Share Success");
                            onSuccess(response.data)
                     })
                     .catch((e) => {
                            toast.error("Upload Error");
                     });
       };
return (
    <form method='post' action='#' id='#' onSubmit={onSubmit}>
           <div class='form-group files'>
                  <label >Upload Your File </label>
                  <input type='file' onChange={onInputChange} className='form-control' multiple />
           </div>
           <div
                  style={{
                         display: "flex",
                         justifyContent: "center",
                         alignItems: "center",
                  }}
           >
                  <button>Submit</button>
           </div>
    </form>
);
};
export default Fileuploader; 