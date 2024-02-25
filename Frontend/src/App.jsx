import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  // const [count, setCount] = useState(0)
  const [image, setImage] = useState(null);
  const [response, setResponse] = useState();
  const handlePictureChange = async (event) => {
    setImage(event.target.files[0]);
  };
  async function handleUpload(event) {
    event.preventDefault();
    if (image == null) {
      alert("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", image);
    try {
      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload file");
      }

      const data = await response.json();
      setResponse(data);
      console.log(data);
      // Handle response, update UI with prediction data
    } catch (error) {
      console.error("Error uploading file:", error);
      // Handle error, display error message to user
    }
  }
  function extractLeafInfo(text) {
    // Find the last index of underscore
    const lastIndex = text.lastIndexOf("_");

    if (lastIndex !== -1) {
      const leafName = text.substring(0, lastIndex);
      const healthStatus = text.substring(lastIndex + 1);
      return { leafName, healthStatus };
    } else {
      return { leafName: text, healthStatus: "Healthy" };
    }
  }
  return (
    <>
      <Navbar />
      <div className="main">
        <div className="heading">
          <h1>
            Unlock the world of plants: Instant identification at your
            fingertips.
          </h1>
        </div>
        <div className="sub-main">
          <div className="imagePreview">
            <form action="" onSubmit={handleUpload}>
              {image !== null && (
                <img src={URL.createObjectURL(image)} alt="preview" />
              )}
              {image == null && (
                <img
                  src="https://media.post.rvohealth.io/wp-content/uploads/2021/11/saluyot-jute-leaves-732x549-thumbnail.jpg"
                  alt="default-img"
                />
              )}
              <div className="take">
                <input
                  type="file"
                  name="image"
                  id="image"
                  onChange={handlePictureChange}
                />
              </div>
              <div className="buttons">
                <div className="submit">
                  <button type="submit">Upload Image</button>
                </div>
                <div className="resetImage">
                  <button
                    type="button"
                    onClick={() => {
                      setImage(null);
                      setResponse();
                    }}
                    disabled={image == null}
                  >
                    Remove Image
                  </button>
                </div>
              </div>
            </form>
          </div>
          {response && (
            <div className="info">
              <div className="plant-name">
                <h3>Plant Name : </h3>
                {extractLeafInfo(response.class).leafName}
              </div>
              <div className="plant-condition">
                <h3>Plant Condition :</h3>
                {extractLeafInfo(response.class).healthStatus}
              </div>
              <div className="confidence">
                <h3>Confidence : </h3> {response.confidence}
              </div>
              <div className="use">
                <h3>Uses : </h3>
                <p>{response.uses}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
