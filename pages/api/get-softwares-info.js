import { sql } from '@vercel/postgres';

export default async function getSoftwareDetailsWithGlobalPercent(req, res) {
  try {
    const { rows } = await sql`
      SELECT s.*, SUM(r.percent_global) AS total_percent_global
      FROM software_info s
      LEFT JOIN result_data r ON s.id = r.software_info_id
      GROUP BY s.id
    `;
    // Devuelve los resultados
    if (rows.length) {
      res.status(200).json(rows);
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
