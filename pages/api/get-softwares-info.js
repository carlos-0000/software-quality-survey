import { sql } from '@vercel/postgres';

export default async function getSoftwareDetailsWithGlobalPercent(req, res) {
  try {
    const softwareId = req.query.softwareId; // Asumiendo que recibes el ID como parámetro de consulta

    // Verifica que se haya proporcionado un softwareId
    if (!softwareId) {
      return res.status(400).json({ error: 'No se proporcionó softwareId' });
    }

    const result = await sql`
      SELECT s.*, SUM(r.percent_global) AS total_percent_global
      FROM software_info s
      LEFT JOIN result_data r ON s.id = r.software_info_id
      WHERE s.id = ${softwareId}
      GROUP BY s.id
    `;

    // Devuelve los resultados
    if (result.count > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).json({
        error: 'No se encontraron datos para el software especificado',
      });
    }
  } catch (error) {
    console.error('Error al obtener detalles del software:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}
