import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const taskId = req.body.taskId;
    const file = req.body.file;

    try {
      const formData = new FormData();
      formData.append('attachment', file, file.name); // Proporciona el nombre del archivo

      const response = await axios.post(
        `https://api.clickup.com/api/v2/task/${taskId}/attachment?custom_task_ids=true&team_id=9002029932`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'pk_67345527_67JFLU4GLNKKU4H9YH1SS9FFREQ1Y97U',
          },
        }
      );

      res.status(response.status).json({ success: true, data: response.data });
    } catch (error) {
      console.error('Error al enviar la solicitud a ClickUp:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
