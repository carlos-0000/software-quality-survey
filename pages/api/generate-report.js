import { sql } from '@vercel/postgres';
import ExcelJS from 'exceljs';

export default async function generateReport(req, res) {
  if (req.method === 'GET') {
    try {
      const softwareInfoId = req.query.id;

      // Obtener datos de la base de datos
      const softwareInfo =
        await sql`SELECT * FROM software_info WHERE id = ${softwareInfoId}`;
      const participants =
        await sql`SELECT * FROM participants WHERE software_info_id = ${softwareInfoId}`;
      const answers = await sql`
        SELECT s.*, i.* 
        FROM answers_sections s 
        INNER JOIN answers_items i ON s.id = i.answers_section_id 
        WHERE s.software_info_id = ${softwareInfoId}`;
      const parametrization =
        await sql`SELECT * FROM parametrization WHERE software_info_id = ${softwareInfoId}`;
      //const resultData =
      // await sql`SELECT * FROM result_data WHERE software_info_id = ${softwareInfoId}`;
      //  inner join result_data on parametrization.software_info_id = result_data.software_info_id
      // const resultData = await sql`
      //   SELECT
      //   parametrization.software_info_id,
      //   parametrization.item,
      //   parametrization.description,
      //    result_data.value,
      //    result_data.maximum,
      //     result_data.percent_result,
      //      result_data.percent_maximum,
      //       result_data.percent_global
      //   FROM parametrization
      //   INNER JOIN result_data ON parametrization.software_info_id = result_data.software_info_id
      //   WHERE parametrization.software_info_id = ${softwareInfoId}
      // `;

      const parametrizationData = await sql`
  SELECT
  parametrization.software_info_id AS id_software,
  parametrization.item AS item,
  parametrization.description AS description
   FROM parametrization WHERE software_info_id = ${softwareInfoId};
`;

      const { rows } = await sql`
  SELECT * FROM result_data WHERE software_info_id = ${softwareInfoId};
`;

      const combinedData = parametrizationData.rows.map((param, index) => {
        const result = rows[index];
        return {
          ...param,
          value: result.value,
          maximum: result.maximum,
          percent_result: result.percent_result,
          percent_maximum: result.percent_maximum,
          percent_global: result.percent_global,
        };
      });

      // Crear un libro de trabajo Excel
      const workbook = new ExcelJS.Workbook();
      console.log('softwareInfo', softwareInfo);
      console.log('participants', participants);
      console.log('answers', answers);
      console.log('parametrization', parametrization);
      console.log('resultData', combinedData);
      // Agregar datos al libro de trabajo para cada tabla
      addSheetToWorkbook(workbook, 'Software Info', softwareInfo.rows, [
        'ID',
        'Fecha',
        'Ciudad',
        'Empresa',
        'Teléfono',
        'Nombre del Software',
        'Objetivos Generales',
        'Objetivos Específicos',
      ]);
      addSheetToWorkbook(workbook, 'Participantes', participants.rows, [
        'ID',
        'ID Software',
        'Cargo',
        'Nombre',
        'Firma',
      ]);
      addSheetToWorkbook(workbook, 'Respuestas', answers.rows, [
        'ID',
        'ID Software',
        'Título Sección',
        'Descripción Sección',
        'ID Ítem',
        'Título Ítem',
        'Descripción Ítem',
        'Valor',
        'Observación',
      ]);
      addSheetToWorkbook(workbook, 'Parametrización', parametrization.rows, [
        'ID',
        'ID Software',
        'Ítem',
        'Descripción',
        'Preguntas',
        'Porcentaje Total',
      ]);
      addSheetToWorkbook(workbook, 'Resultados', combinedData, [
        'ID Software',
        'Ítem',
        'Descripción',
        'Valor',
        'Máximo',
        'Porcentaje Resultado',
        'Porcentaje Máximo',
        'Porcentaje Global',
      ]);

      // Escribir el archivo Excel en un buffer
      const buffer = await workbook.xlsx.writeBuffer();

      // Configurar la respuesta para descargar el archivo
      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      );
      res.setHeader(
        'Content-Disposition',
        `attachment; filename="Reporte-${softwareInfoId}.xlsx"`,
      );
      res.send(buffer);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).end('Method Not Allowed');
  }
}

function addSheetToWorkbook(workbook, sheetName, data, headers) {
  const sheet = workbook.addWorksheet(sheetName);

  // Estilos para los encabezados
  const headerStyle = {
    type: 'pattern',
    pattern: 'solid',
    font: {
      color: { argb: 'FFFFFFFF' }, // Texto blanco
      bold: true,
    },
    fill: {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF00008B' }, // Fondo azul
    },
  };

  // Añadir encabezados y aplicar estilos
  const headerRow = sheet.addRow(headers);
  headerRow.eachCell((cell) => {
    cell.style = headerStyle;
  });

  // Añadir datos
  data.forEach((row) => {
    sheet.addRow(Object.values(row));
  });

  // Ajustar el ancho de las columnas
  sheet.columns.forEach((column) => {
    column.width = 13; // Ajusta este valor según tus necesidades
  });
}
