import React, { useState } from "react";

export default function GrowthTrack() {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [result, setResult] = useState(null);

  const handleImage1Change = (e) => {
    const file = e.target.files[0];
    setImage1(file);
  };

  const handleImage2Change = (e) => {
    const file = e.target.files[0];
    setImage2(file);
  };

  const validateImages = () => {
    if (!image1 || !image2) {
      alert("Please upload both images before proceeding");
      return false;
    }
    return true;
  };

  const handleBuyService = () => {
    alert("Redirecting to purchase page...");
    // Add your purchase logic here
  };

  const detectGrowth = async () => {
    if (!validateImages()) return;
    
    setResult(null);
    try {
      const formData = new FormData();
      formData.append("file1", image1);
      formData.append("file2", image2);

      const response = await fetch("https://backendd-nnzp.onrender.com/detect_growth", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        setResult(result);
      } else {
        console.log("Failed to detect growth.");
      }
    } catch (error) {
      console.error("Error during growth detection:", error);
    } finally {
      setImage1(null);
      setImage2(null);
    }
  };

  return (
    <div className="container mx-auto space-y-8 px-2 sm:px-4 lg:px-6">
      <div className="max-w-lg p-3 mx-auto bg-white rounded-lg shadow-md">
        <div className="mb-6">
          <label htmlFor="image1" className="block mb-2 font-bold text-gray-700">
            Upload Last Image of Sapling:
          </label>
          <input
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:shadow-outline"
            type="file"
            id="image1"
            accept="image/*"
            onChange={handleImage1Change}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="image2" className="block mb-2 font-bold text-gray-700">
            Upload Current Image of Sapling:
          </label>
          <input
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:shadow-outline"
            type="file"
            id="image2"
            accept="image/*"
            onChange={handleImage2Change}
          />
        </div>
        <div className="flex justify-center mt-6">
          <button 
            onClick={detectGrowth} 
            className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-700 focus:outline-none focus:shadow-outline"
          >
            Detect Growth
          </button>
        </div>
      </div>

      {result && (
        <div className="container py-6 mx-auto space-y-4 px-4 sm:px-6 lg:px-8">
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th className="text-center">Growth Detected</th>
                  <th className="text-center">Growth Score</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-center">
                    {result.growth_detected === "True" ? (
                      <span className="text-green-500">Significant Growth Detected!</span>
                    ) : (
                      <span className="text-red-500">No Significant Growth Detected</span>
                    )}
                  </td>
                  <td className="text-center">{result.mse && result.mse.toFixed(3)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th className="text-center">Mask of Image 1</th>
                  <th className="text-center">Mask of Image 2</th>
                  <th className="text-center">Difference Mask</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-center">
                    {result.maskeda_thresh1 && (
                      <img
                        src={`data:image/png;base64,${result.maskeda_thresh1}`}
                        alt="Masked Image 1"
                        className="border mx-auto block"
                        style={{ maxWidth: '200px', maxHeight: '200px' }}
                      />
                    )}
                  </td>
                  <td className="text-center">
                    {result.maskeda_thresh2 && (
                      <img
                        src={`data:image/png;base64,${result.maskeda_thresh2}`}
                        alt="Masked Image 2"
                        className="border mx-auto block"
                        style={{ maxWidth: '200px', maxHeight: '200px' }}
                      />
                    )}
                  </td>
                  <td className="text-center">
                    {result.diff && (
                      <img
                        src={`data:image/png;base64,${result.diff}`}
                        alt="Difference Image"
                        className="border mx-auto block"
                        style={{ maxWidth: '200px', maxHeight: '200px' }}
                      />
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Updated Buy Product Service Button with green gradient */}
      <div className="flex justify-center items-center py-8">
        <button
          onClick={handleBuyService}
          className="relative px-8 py-4 text-xl font-bold text-white bg-gradient-to-r from-green-400 to-green-600 rounded-xl hover:from-green-500 hover:to-green-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          <span className="relative inline-flex items-center">
            Buy Product Service
            <svg 
              className="ml-2 w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
}