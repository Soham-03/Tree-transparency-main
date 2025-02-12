// /pages/api/sensors.js
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const response = await fetch('https://brycegdsc.pythonanywhere.com/getUniqueNodeNames');
    const data = await response.json();
    
    if (data.status === "success") {
      return res.status(200).json(data);
    } else {
      return res.status(500).json({ message: 'Failed to fetch nodes' });
    }
  } catch (error) {
    console.error('Error fetching nodes:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}