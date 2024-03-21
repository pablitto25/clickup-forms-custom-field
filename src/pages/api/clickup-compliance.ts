import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Lógica para manejar la solicitud POST a ClickUp
    const listId = '901401820025';
    const apiKey = process.env.CLICKUP_API_URL;
    
    try {
      const response = await fetch(
        `https://api.clickup.com/api/v2/list/${listId}/task?custom_task_ids=true&team_id=123`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'pk_67345527_MM90CA72SZNR4QPWA8V75X15FQZO7Y47',
          },
          body: JSON.stringify(req.body),
        }
      );

      const data = await response.json();

      res.status(response.status).json(data);
    } catch (error) {
      console.error('Error al enviar la solicitud a ClickUp:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}