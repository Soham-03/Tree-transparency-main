export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const response = await fetch(`https://brycegdsc.pythonanywhere.com/getnodejson/${id}`);
    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching node data:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}