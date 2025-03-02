// app/api/sheets/crud/delete/route.ts
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;

async function getSheet() {
  const auth = new JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const doc = new GoogleSpreadsheet(spreadsheetId, auth);
  await doc.loadInfo();
  return doc.sheetsByIndex[0];
}

export async function DELETE(req: Request) {
    try {
      const { id } = await req.json();
      const sheet = await getSheet();
      const rows = await sheet.getRows();
      
      // Buscar la fila que tenga el ID en la primera posición de _rawData
      const row = rows.find((r) => r._rawData[0] === id);
      
      if (!row) {
        return new Response(JSON.stringify({ error: 'Semilla no encontrada' }), { status: 404 });
      }
  
      await row.delete(); // Eliminar la fila
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({ error: 'Error al eliminar la semilla', details: error.message }), { status: 500 });
    }
  }
  
