import { useState } from "react";
import SearchPage from "./components/SearchPage/SearchPage";
import CaptionPage from "./components/CaptionPage/CaptionPage";
import "./index.css";

function App() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="app">
      {selectedImage ? (
        <CaptionPage
          image={selectedImage}
          onBack={() => setSelectedImage(null)}
        />
      ) : (
        <SearchPage onSelectImage={setSelectedImage} />
      )}
    </div>
  );
}

export default App;
