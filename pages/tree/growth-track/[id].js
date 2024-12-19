// TreeGrowthVisualizer.js

import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { firestore, storage } from "@/services/firebase";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import Link from "next/link";
import { TreeDeciduous, Info, Upload, ArrowRight, ChartBar, Leaf, TrendingUp, Camera } from "lucide-react";
import Head from "next/head";
import { useState } from "react";

export default function Tree({
  id,
  name,
  imageUrl,
  species,
  isVerified,
  ngo,
  type,
  description,
  adoptedBy,
  verifiedBy,
  prevOwner,
  ipfsHash,
  transactionHash,
}) {
  const [ngoDoc, ngoLoading, ngoError] = useDocumentDataOnce(
    doc(firestore, "Users", ngo)
  );

  const [treeImageUrl, setTreeImageUrl] = useState(imageUrl)
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showExamples, setShowExamples] = useState(false);

  const handleImage2Change = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage1(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage2(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const detectGrowth = async () => {
    setResult(null);
    setIsLoading(true);
    try {
      const formData = new FormData();
      const storageRef = ref(storage, `/planted/${id}`);
      const imageUrl = await getDownloadURL(storageRef);

      formData.append("url", imageUrl);
      formData.append("file2", image1);

      const response = await fetch("https://backendd-nnzp.onrender.com/detect_growth", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();

        const uploadTask = uploadBytesResumable(storageRef, image1);
        uploadTask.on(
          "state_changed",
          (snapshot) => {},
          (err) => console.log(err),
          () => {
            getDownloadURL(uploadTask.snapshot.ref)
              .then(async (url) => {
                setTreeImageUrl(url);
                await updateDoc(doc(firestore, "Trees", id), {
                  imageUrl: url,
                });
                alert("Updated Tree Image");
              })
              .catch((error) => {
                console.error(error);
              });
          }
        );
        
        setResult(result);
      } else {
        console.log("Failed to detect growth.");
      }
    } catch (error) {
      console.error("Error during growth detection:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Head>
        <title>Plant Growth Track</title>
      </Head>
      <div className="max-w-6xl px-4 pt-6 mx-auto">
        <nav className="mb-4">
          <div className="breadcrumbs">
            <ul>
              <li>Growth Track</li>
              <li>{id}</li>
            </ul>
          </div>
        </nav>
        <div className="max-w-full prose prose-lg">
          <h1 className="flex gap-6 items-center">{name}</h1>

          <div className="bg-white rounded-lg border p-6 mb-8">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <TreeDeciduous className="text-green-500" />
                  Track Your Tree's Growth
                </h2>
                <p className="text-gray-600 mt-4">Upload two images of your tree to see how it has grown:</p>
                <ol className="mt-2 space-y-2 text-gray-600 list-decimal ml-4">
                  <li>First, upload an older image of your tree</li>
                  <li>Then, upload a recent image from a similar angle</li>
                  <li>Click "Detect Growth" to see the comparison</li>
                </ol>
              </div>
              <button
                onClick={() => setShowExamples(!showExamples)}
                className="flex items-center gap-2 text-green-600 hover:text-green-700"
              >
                <Info className="w-5 h-5" />
                View Examples
              </button>
            </div>
          </div>

          {showExamples && (
            <div className="bg-white rounded-lg border p-6 mb-8">
              <h3 className="text-xl font-semibold mb-4">How It Works</h3>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <img
                    src="/api/placeholder/400/300"
                    alt="Step 1"
                    className="w-full rounded-lg border"
                  />
                  <p className="text-sm text-center mt-2">1. We analyze your first image</p>
                </div>
                <div>
                  <img
                    src="/api/placeholder/400/300"
                    alt="Step 2"
                    className="w-full rounded-lg border"
                  />
                  <p className="text-sm text-center mt-2">2. Then analyze the recent image</p>
                </div>
                <div>
                  <img
                    src="/api/placeholder/400/300"
                    alt="Step 3"
                    className="w-full rounded-lg border"
                  />
                  <p className="text-sm text-center mt-2">3. Compare for growth changes</p>
                </div>
              </div>
            </div>
          )}

          <table className="mb-8">
            <tbody>
              <tr>
                <td>IPFS Hash</td>
                <td>
                  <Link href={`https://gateway.pinata.cloud/ipfs/${ipfsHash}`}>
                    {ipfsHash}
                  </Link>
                </td>
              </tr>

              {isVerified && (
                <tr>
                  <td>Verified By</td>
                  <td>{verifiedBy}</td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg border p-6">
              <h3 className="text-xl font-bold mb-4">Previous Image</h3>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center min-h-[400px]">
                {treeImageUrl ? (
                  <img 
                    src={treeImageUrl} 
                    alt={name} 
                    className="max-w-full h-auto"
                  />
                ) : (
                  <div className="text-center">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Upload previous image</p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-lg border p-6">
              <h3 className="text-xl font-bold mb-4">Recent Image</h3>
              <label className="cursor-pointer">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center min-h-[400px]">
                  {image2 ? (
                    <img 
                      src={image2} 
                      alt="Recent" 
                      className="max-w-full h-auto"
                    />
                  ) : (
                    <div className="text-center">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">Upload recent image</p>
                    </div>
                  )}
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImage2Change}
                  />
                </div>
              </label>
            </div>
          </div>

          <div className="flex justify-center mb-8">
            <button
              onClick={detectGrowth}
              disabled={!image1 || isLoading}
              className="px-8 py-3 text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none focus:shadow-outline flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Camera className="w-5 h-5 animate-pulse" />
                  Analyzing Images...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <ArrowRight className="w-5 h-5" />
                  Detect Growth
                </div>
              )}
            </button>
          </div>

          {result && (
            <div className="space-y-8 mb-8">
              <div className="bg-white rounded-2xl border p-8 shadow-sm">
                <div className="grid grid-cols-2 gap-8">
                  <div className={`rounded-xl p-6 flex items-center gap-4 ${
                    result.growth_detected === "True" ? 'bg-green-50' : 'bg-red-50'
                  }`}>
                    <div className={`rounded-full p-3 ${
                      result.growth_detected === "True" ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      <TreeDeciduous className={`w-8 h-8 ${
                        result.growth_detected === "True" ? 'text-green-600' : 'text-red-600'
                      }`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Growth Analysis</h3>
                      <p className={`text-sm ${
                        result.growth_detected === "True" ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {result.growth_detected === "True" 
                          ? "Your tree is showing healthy growth! 🌱" 
                          : "No significant changes detected yet"}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-xl bg-blue-50 p-6 flex items-center gap-4">
                    <div className="rounded-full bg-blue-100 p-3">
                      <ChartBar className="w-8 h-8 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Growth Score</h3>
                      <p className="text-sm text-blue-600">
                        {result.mse ? `${result.mse.toFixed(2)}% change detected` : 'Calculating score...'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border p-8 shadow-sm">
                <h3 className="text-xl font-semibold mb-6">Visual Analysis Breakdown</h3>
                <div className="grid grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <div className="aspect-square rounded-lg overflow-hidden border bg-gray-50">
                      {result.maskeda_thresh1 && (
                        <img
                          src={`data:image/png;base64,${result.maskeda_thresh1}`}
                          alt="Previous Image Analysis"
                          className="w-full h-full object-contain"
                        />
                      )}
                    </div>
                    <div className="text-center">
                      <h4 className="font-medium text-gray-900">Previous State</h4>
                      <p className="text-sm text-gray-500">Initial tree structure identified</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="aspect-square rounded-lg overflow-hidden border bg-gray-50">
                      {result.maskeda_thresh2 && (
                        <img
                          src={`data:image/png;base64,${result.maskeda_thresh2}`}
                          alt="Recent Image Analysis"
                          className="w-full h-full object-contain"
                        />
                      )}
                    </div>
                    <div className="text-center">
                      <h4 className="font-medium text-gray-900">Current State</h4>
                      <p className="text-sm text-gray-500">New growth patterns detected</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="aspect-square rounded-lg overflow-hidden border bg-gray-50">
                      {result.diff && (
                        <img
                          src={`data:image/png;base64,${result.diff}`}
                          alt="Growth Difference"
                          className="w-full h-full object-contain"
                        />
                      )}
                    </div>
                    <div className="text-center">
                      <h4 className="font-medium text-gray-900">Growth Areas</h4>
                      <p className="text-sm text-gray-500">Highlighted regions show changes</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">
                    <strong>How to read this:</strong> Our AI analyzes tree structure in both images.
                    Brighter areas in the final image show where growth has occurred. This helps track your tree's progress over time.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const tree = await getDoc(doc(firestore, "Trees", context.params.id));
  const adoptedBy = tree.data()?.adoptedBy?.id || "";
  const ngo = tree.data()?.ngo?.id || "";
  const verifiedBy = tree.data()?.verifiedBy?.id || "";
  const prevOwner =
    tree.data()?.prevOwner?.map((owner) => ({
      id: owner.id,
    })) || [];

  return {
    props: {
      id: tree.id,
      ...tree.data(),
      adoptedBy,
      ngo,
      verifiedBy,
      prevOwner,
      createdAt: tree.data()?.createdAt?.toDate().toISOString() || "Date Not Available",
    },
  };
 }