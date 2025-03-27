import { NextApiRequest, NextApiResponse } from 'next';
import { register } from '../../../actions/register';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("Registration endpoint called with method:", req.method);
  if (req.method === 'POST') {
    const formData = req.body; // Assuming body-parser is set up to handle form data
    console.log("Received form data:", formData);
    const result = await register(formData);
    console.log("Registration result:", result);
    
    if (result.success) {
      return res.status(200).json({ message: 'User registered successfully' });
    } else {
      return res.status(400).json({ error: result.error });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
