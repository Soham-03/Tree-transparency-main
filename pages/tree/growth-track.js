import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Upload, TreeDeciduous, ArrowRight, Leaf, Maximize, TrendingUp, Info } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar, LineChart, Line } from 'recharts';

const TreeGrowthAnalysis = () => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image1Preview, setImage1Preview] = useState(null);
  const [image2Preview, setImage2Preview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [showExamples, setShowExamples] = useState(false);

  const handleImageUpload = (e, imageNumber) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (imageNumber === 1) {
          setImage1(file);
          setImage1Preview(reader.result);
        } else {
          setImage2(file);
          setImage2Preview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const detectGrowth = async () => {
    if (!image1 || !image2) return;
    
    setLoading(true);
    try {
      // Simulating API call with timeout
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setResults({
        growthDetected: true,
        heightIncrease: "4.5",
        canopyExpansion: "5.2",
        densityChange: "3.8",
        healthScore: 85,
        growthScore: 0.045,
        monthlyGrowth: [
          { month: 'Jan', growth: 2 },
          { month: 'Feb', growth: 3 },
          { month: 'Mar', growth: 4 },
          { month: 'Apr', growth: 4.5 },
        ],
        growthData: [
          { name: 'Height', previous: 100, current: 104.5, increase: 4.5 },
          { name: 'Canopy', previous: 100, current: 105.2, increase: 5.2 },
          { name: 'Density', previous: 100, current: 103.8, increase: 3.8 },
        ]
      });
    } catch (error) {
      console.error('Error processing images:', error);
    } finally {
      setLoading(false);
    }
  };

  const ImageUploadCard = ({ title, preview, onChange }) => (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          {preview ? (
            <div className="relative w-full h-64">
              <img
                src={preview}
                alt={title}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ) : (
            <label className="w-full h-64 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
              <Upload className="w-8 h-8 text-gray-400" />
              <span className="mt-2 text-sm text-gray-500">Upload {title.toLowerCase()}</span>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={onChange}
              />
            </label>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const MetricCard = ({ title, value, icon: Icon }) => (
    <Card className="bg-green-50">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-green-600">{value}%</p>
          </div>
          <Icon className="text-green-500 w-8 h-8" />
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Instructions Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TreeDeciduous className="text-green-500" />
            Track Your Tree's Growth
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-600">
                Upload two images of your tree to see how it has grown:
              </p>
              <ol className="mt-4 space-y-2 text-gray-600">
                <li>1. First, upload an older image of your tree</li>
                <li>2. Then, upload a recent image from a similar angle</li>
                <li>3. Click "Detect Growth" to see the comparison</li>
              </ol>
            </div>
            <button
              onClick={() => setShowExamples(!showExamples)}
              className="flex items-center gap-2 text-green-600 hover:text-green-700"
            >
              <Info className="w-5 h-5" />
              {showExamples ? 'Hide Examples' : 'View Examples'}
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Examples Section */}
      {showExamples && (
        <Card>
          <CardHeader>
            <CardTitle>How It Works - Example Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-gray-600">Our system analyzes tree images using advanced computer vision:</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['Initial Mask', 'Recent Mask', 'Growth Detection'].map((title) => (
                  <div key={title} className="space-y-2">
                    <img 
                      src="/api/placeholder/400/300"
                      alt={title}
                      className="w-full rounded-lg"
                    />
                    <p className="text-sm text-center text-gray-600">{title}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  Note: The system uses computer vision to create masks of your tree images and analyzes 
                  the differences to calculate growth metrics. For best results, take photos from the same 
                  angle and distance.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Upload Section */}
      <div className="grid md:grid-cols-2 gap-6">
        <ImageUploadCard 
          title="Previous Image"
          preview={image1Preview}
          onChange={(e) => handleImageUpload(e, 1)}
        />
        <ImageUploadCard 
          title="Recent Image"
          preview={image2Preview}
          onChange={(e) => handleImageUpload(e, 2)}
        />
      </div>

      {/* Action Button */}
      <div className="flex justify-center">
        <button
          onClick={detectGrowth}
          disabled={!image1 || !image2 || loading}
          className={`px-6 py-3 rounded-lg flex items-center gap-2 ${
            !image1 || !image2 || loading
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-green-500 hover:bg-green-600'
          } text-white font-medium transition-colors`}
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <ArrowRight className="w-5 h-5" />
          )}
          {loading ? 'Analyzing Growth...' : 'Detect Growth'}
        </button>
      </div>

      {results && (
        <>
          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard title="Height Increase" value={results.heightIncrease} icon={TrendingUp} />
            <MetricCard title="Canopy Growth" value={results.canopyExpansion} icon={Maximize} />
            <MetricCard title="Density Change" value={results.densityChange} icon={Leaf} />
            <MetricCard title="Health Score" value={results.healthScore} icon={TreeDeciduous} />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Growth Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={results.growthData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="previous" fill="#94a3b8" name="Previous" />
                      <Bar dataKey="current" fill="#22c55e" name="Current" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Health Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart 
                      innerRadius="60%" 
                      outerRadius="100%" 
                      data={[{ name: 'Health Score', value: results.healthScore }]} 
                      startAngle={180} 
                      endAngle={0}
                    >
                      <RadialBar
                        minAngle={15}
                        background
                        clockWise={true}
                        dataKey="value"
                        fill="#22c55e"
                      />
                    </RadialBarChart>
                  </ResponsiveContainer>
                  <div className="text-center mt-4">
                    <span className="text-3xl font-bold text-green-600">{results.healthScore}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Monthly Growth Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Growth Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={results.monthlyGrowth}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="growth" 
                      stroke="#22c55e" 
                      strokeWidth={2}
                      dot={{ fill: '#22c55e' }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Analysis Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Analysis Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-gray-600">
                <p>Your tree has shown significant growth over the monitored period:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Height has increased by {results.heightIncrease}%, indicating healthy vertical growth</li>
                  <li>Canopy width expanded by {results.canopyExpansion}%, showing good lateral development</li>
                  <li>Foliage density improved by {results.densityChange}%, suggesting healthy leaf production</li>
                  <li>Overall health score of {results.healthScore}% indicates the tree is thriving in its environment</li>
                </ul>
                <p className="mt-4">Recommendations:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Continue current watering schedule</li>
                  <li>Monitor soil nutrition levels during peak growth months</li>
                  <li>Consider light pruning to maintain optimal shape</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default TreeGrowthAnalysis;