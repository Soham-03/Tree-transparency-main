import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Plant, Sprout, AlertTriangle, Leaf, ChevronDown, ChevronUp, BarChart2, Droplets, RefreshCw, Maximize2, ArrowUp, ArrowDown, Info, Sun, Moon, Thermometer } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart, BarChart, Bar, RadialBarChart, RadialBar, PieChart, Pie } from 'recharts';

const Card = ({ children, className, ...props }) => (
  <div className={`rounded-xl shadow-sm transition-all duration-300 ${className}`} {...props}>
    {children}
  </div>
);

const InfoTooltip = ({ text }) => (
  <div className="group relative inline-block ml-2">
    <Info className="h-4 w-4 text-gray-400 cursor-help" />
    <div className="hidden group-hover:block absolute z-10 w-64 p-2 mt-2 text-sm text-white bg-gray-800 rounded-lg shadow-lg -left-1/2 transform -translate-x-1/2">
      {text}
    </div>
  </div>
);

const PlantDashboard = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedView, setExpandedView] = useState(false);
  const [selectedReading, setSelectedReading] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  async function fetchData() {
    setRefreshing(true);
    try {
      const response = await fetch(
        "https://api.thingspeak.com/channels/2314600/feeds.json?results"
      );
      const jsonData = await response.json();
      setData(jsonData.feeds);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 300000); // Refresh every 5 minutes
    return () => clearInterval(interval);
  }, []);

  const getHistoricalData = () => {
    if (!data || data.length === 0) return [];
    return data.map((entry, index) => ({
      date: `Reading ${entry.entry_id}`,
      height: parseFloat(entry.field1),
      status: index === 0 ? "Initial" : parseFloat(entry.field1) - parseFloat(data[index - 1].field1) > 10 ? "Needs Care" : "Growing"
    })).reverse();
  };

  const getGrowthTrend = () => {
    if (data.length < 2) return 0;
    const latest = parseFloat(data[0].field1);
    const previous = parseFloat(data[1].field1);
    return previous-latest;
  };

  // Calculate growth rate per day
  const getGrowthRate = () => {
    if (data.length < 2) return 0;
    const latest = parseFloat(data[0].field1);
    const oldest = parseFloat(data[data.length - 1].field1);
    const days = (new Date(data[0].created_at) - new Date(data[data.length - 1].created_at)) / (1000 * 60 * 60 * 24);
    return ((oldest - latest) / data.length).toFixed(2);
    // return latest;
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="animate-spin text-green-600 mb-4">
          <RefreshCw size={48} />
        </div>
        <p className="text-gray-600 animate-pulse">Loading your plant's data...</p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center gap-2 justify-center min-h-screen bg-gradient-to-br from-red-50 to-orange-50 text-red-600">
        <AlertTriangle size={24} />
        <h2 className="text-xl">No sensor data available for this plant</h2>
      </div>
    );
  }

  const chartData = getHistoricalData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold flex items-center gap-2 text-gray-800">
              <Sprout className="h-8 w-8 text-green-600" />
              Plant Growth Monitoring - ID #{router.query.id}
            </h1>
            <p className="text-gray-600 mt-2">
              Track and analyze your plant's growth journey in real-time
            </p>
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h2 className="font-medium text-blue-800">Understanding Your Dashboard</h2>
              <p className="mt-1 text-blue-600 text-sm">
                This dashboard provides real-time measurements and analysis of your plant's growth. 
                Monitor height changes, track growth patterns, and receive care notifications when needed.
                All measurements are taken automatically by our IoT sensors.
              </p>
            </div>
          </div>

          {/* Refresh Button */}
          <div className="flex justify-end mb-8">
            <button
              onClick={fetchData}
              className={`flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg ${
                refreshing ? 'animate-pulse' : ''
              }`}
              disabled={refreshing}
            >
              <RefreshCw className={`h-5 w-5 ${refreshing ? 'animate-spin' : ''}`} />
              {refreshing ? 'Updating...' : 'Refresh Data'}
            </button>
          </div>

          {/* Main Metrics Cards */}
          <div className="grid gap-6 mb-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <Card className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 transition-all duration-300 hover:shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-gray-600">Current Height
                  <InfoTooltip text="The latest measured height of your plant" />
                </h3>
                <div className={`flex items-center gap-1 ${
                  getGrowthTrend() > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {getGrowthTrend() > 0 ? <ArrowUp size={20} /> : <ArrowDown size={20} />}
                  <span className="font-semibold">{Math.abs(getGrowthTrend()).toFixed(2)} cm</span>
                </div>
              </div>
              <div className="text-3xl font-bold mb-2">{parseFloat(data[30].field1)} cm</div>
              <div className="text-sm text-gray-500">Last updated: {new Date(data[30].created_at).toLocaleString()}</div>
            </Card>

            <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 hover:shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-gray-600">Growth Status
                  <InfoTooltip text="Health status based on recent growth patterns" />
                </h3>
                {chartData[0].status === "Growing" ? 
                  <Sprout className="h-6 w-6 text-green-500" /> : 
                  <AlertTriangle className="h-6 w-6 text-yellow-500" />
                }
              </div>
              <div className="text-2xl font-semibold mb-2">{chartData[0].status}</div>
              <div className="text-sm text-gray-500">Average growth rate: {getGrowthRate()} cm/day</div>
            </Card>

            <Card className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 transition-all duration-300 hover:shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-gray-600">Total Readings
                  <InfoTooltip text="Number of measurements taken by our sensors" />
                </h3>
                <BarChart2 className="h-6 w-6 text-blue-500" />
              </div>
              <div className="text-3xl font-bold mb-2">{data.length}</div>
              <div className="text-sm text-gray-500">Continuous monitoring active</div>
            </Card>
          </div>

          {/* Growth Analysis Chart */}
          <Card className="mb-8 bg-white shadow-lg rounded-xl overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Growth Analysis</h3>
                  <p className="text-sm text-gray-500 mt-1">Track your plant's height changes over time</p>
                </div>
                <button
                  onClick={() => setExpandedView(!expandedView)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  <Maximize2 className="h-5 w-5 text-gray-500" />
                </button>
              </div>
              <div className={`transition-all duration-300 ease-in-out ${
                expandedView ? 'h-[600px]' : 'h-[300px]'
              }`}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorHeight" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-white p-3 rounded-lg shadow-lg border">
                              <p className="font-semibold">{payload[0].payload.date}</p>
                              <p className="text-green-600">Height: {payload[0].value} cm</p>
                              <p className={`text-sm ${
                                payload[0].payload.status === "Growing" ? "text-green-600" : "text-yellow-600"
                              }`}>
                                Status: {payload[0].payload.status}
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="height" 
                      stroke="#22c55e" 
                      fillOpacity={1}
                      fill="url(#colorHeight)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Card>

          {/* Detailed Readings Table */}
          <Card className="bg-white shadow-lg rounded-xl overflow-hidden">
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Detailed Measurements</h3>
              <p className="text-sm text-gray-500 mb-4">Complete history of all readings from our sensors</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Height</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[...data].reverse().map((entry, index) => {
                    const actualIndex = data.length - 1 - index;
                    const heightChange = actualIndex < data.length - 1 
                      ? parseFloat(entry.field1) - parseFloat(data[actualIndex + 1].field1)
                      : 0;
                    
                    return (
                      <tr 
                        key={entry.entry_id}
                        className="hover:bg-gradient-to-r hover:from-gray-50 hover:to-white transition-all duration-150 cursor-pointer"
                        onClick={() => setSelectedReading(selectedReading === actualIndex ? null : actualIndex)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(entry.created_at).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {parseFloat(entry.field1).toFixed(2)} cm
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            index === data.length - 1 ? "bg-gray-100 text-gray-800" :
                            heightChange > 10 ? "bg-yellow-100 text-yellow-800" : 
                            "bg-green-100 text-green-800"
                          }`}>
                            {index === data.length - 1 ? "Initial Reading" : 
                             heightChange > 10 ? "Needs Care" : "Growing Normally"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {index < data.length - 1 && (
                            <span className={`font-medium ${heightChange > 0 ? "text-green-600" : "text-red-600"}`}>
                              {heightChange > 0 ? "+" : ""}{heightChange.toFixed(2)} cm
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Growth Predictions Section */}
          <div className="grid gap-6 mt-8 grid-cols-1 lg:grid-cols-2">
            <Card className="bg-white shadow-lg rounded-xl overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Growth Pattern Analysis</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Understanding your plant's growth patterns and environmental responses
                </p>
                <div className="grid grid-cols-1 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Average Daily Growth</span>
                      <span className="font-semibold text-green-600">{getGrowthRate()} cm/day</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${Math.min(getGrowthRate() * 20, 100)}%` }}
                      />
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Growth Consistency</span>
                      <span className="font-semibold text-blue-600">
                        {data.length > 1 ? "Active Monitoring" : "Insufficient Data"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      Based on {data.length} measurements over 7 days
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="bg-white shadow-lg rounded-xl overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Care Recommendations</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Personalized care suggestions based on growth patterns
                </p>
                <div className="space-y-4">
                  {getGrowthRate() < 0.3 && (
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-yellow-500" />
                        <span className="font-medium text-yellow-800">Growth Rate Alert</span>
                      </div>
                      <p className="mt-1 text-sm text-yellow-600">
                        Growth rate is below average. Consider checking soil nutrients and watering schedule.
                      </p>
                    </div>
                  )}
                  {getGrowthRate() >= 0.2 && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Sprout className="h-5 w-5 text-green-500" />
                        <span className="font-medium text-green-800">Healthy Growth Pattern</span>
                      </div>
                      <p className="mt-1 text-sm text-green-600">
                        Your plant is showing healthy growth patterns. Continue with current care routine.
                      </p>
                    </div>
                  )}
                  <div className="mt-4 text-sm text-gray-600">
                    <h4 className="font-medium mb-2">General Care Tips:</h4>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Maintain consistent watering schedule</li>
                      <li>Ensure adequate sunlight exposure</li>
                      <li>Monitor for any signs of stress</li>
                      <li>Regular check for pest infestations</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantDashboard;