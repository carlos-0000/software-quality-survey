import { sql } from '@vercel/postgres';

export default async function submitSurvey(req, res) {
  console.log(';; req.body', req.body);
  console.log(';; req.method', req.method);
  if (req.method === 'POST') {
    try {
      console.log('sadddddddddd', req.body);
      // Insertar en software_info y obtener el ID
      const softwareInfo = req.body.softwareInfo;
      const softwareResult = await sql`
        INSERT INTO software_info (date, city, company, phone, software_name, general_objectives, specific_objectives)
        VALUES (${softwareInfo.date}, ${softwareInfo.city}, ${softwareInfo.company}, ${softwareInfo.phone}, ${softwareInfo.softwareName}, ${softwareInfo.generalObjectives}, ${softwareInfo.specificObjectives})
        RETURNING id;
      `;
      console.log('softwareResult', softwareResult);
      const softwareInfoId = softwareResult.rows[0].id;

      // Insertar en participants
      for (const participant of req.body.participants) {
        await sql`
          INSERT INTO participants (software_info_id, position, name, signature)
          VALUES (${softwareInfoId}, ${participant.position}, ${participant.name}, ${participant.signature});
        `;
      }

      // Insertar en parametrization
      for (const param of req.body.parametrization) {
        await sql`
          INSERT INTO parametrization (software_info_id, item, description, questions, total_percentage)
          VALUES (${softwareInfoId}, ${param.item}, ${param.description}, ${param.questions}, ${param.totalPercentage});
        `;
      }

      // Insertar en answers_sections y answers_items
      for (const section of req.body.answers.sections) {
        const sectionResult = await sql`
          INSERT INTO answers_sections (software_info_id, title, description)
          VALUES (${softwareInfoId}, ${section.title}, ${section.description})
          RETURNING id;
        `;
        const sectionId = sectionResult.rows[0].id;

        for (const item of section.items) {
          await sql`
            INSERT INTO answers_items (answers_section_id, title_item, description_item, value, observation)
            VALUES (${sectionId}, ${item.title_item}, ${item.description_item}, ${item.value}, ${item.observation});
          `;
        }
      }

      // Insertar en result_data
      for (const result of req.body.resultData) {
        await sql`
          INSERT INTO result_data (software_info_id, value, maximum, percent_result, percent_maximum, percent_global)
          VALUES (${softwareInfoId}, ${result.VALUE}, ${result.MAXIMUM}, ${result.PERCENT_RESULT}, ${result.PERCENT_MAXIMUM}, ${result.PERCENT_GLOBAL});
        `;
      }

      res.status(201).json({ softwareInfoId });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  } else {
    res.status(405).end('Method Not Allowed');
  }
}
