// pages/api/createPost.js
export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { title, body } = req.body;
  
      try {
        // Make a POST request to the external API (or any other service)
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, body }),
        });
  
        const data = await response.json();
  
        // Send the result back to the client
        res.status(200).json({ success: true, data });
      } catch (error) {
        // Handle any error that occurred during the request
        res.status(500).json({ success: false, error: 'Internal Server Error' });
      }
    } else {
      // Handle non-POST requests
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  }
  