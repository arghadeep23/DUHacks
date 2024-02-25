import { useState } from "react";
import "./App.css";

function App() {
  // const [count, setCount] = useState(0)
  const [image, setImage] = useState(null); 
  const [response,setResponse] = useState({}); 
  const handlePictureChange = async (event) => {
    setImage(event.target.files[0]);
  };
  async function handleUpload(event) {
    event.preventDefault(); 
    if (image==null) {
      alert('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', image);
    try {
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to upload file');
      }

      const data = await response.json();
      console.log(data);
      // Handle response, update UI with prediction data
    } catch (error) {
      console.error('Error uploading file:', error);
      // Handle error, display error message to user
    }
  };
    // send the picture to backend and get response 
  
  return (
    <>
      <div className="main">
        <div className="take">
          <form action="" onSubmit={handleUpload}>
            <div className="take">
              <input type="file" name="image" id="image" onChange={handlePictureChange} />
            </div>
            {
              image!==null && <img src={URL.createObjectURL(image)} alt="preview" />
            }
            <div className="submit">
              <button type="submit">Upload Image</button>
            </div>
            <div className="resetImage">
              <button onClick={()=>setImage(null)}>Remove Image</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
