import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
export async function GET() {
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;
  if (!clientEmail || !privateKey || !spreadsheetId) {
    return new Response(
      JSON.stringify({ error: 'Faltan las variables de entorno necesarias.' }),
      { status: 500 }
    );
  }
  try {
    const auth = new JWT({
      email: clientEmail,
      key: privateKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    const doc = new GoogleSpreadsheet(spreadsheetId, auth);
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows();
    const data = rows.map((row, index) => {
      return {
        usuario: row._rawData[0] || 'No disponible',
        tipo: row._rawData[1] || 'No disponible',
        nombre: row._rawData[2] || 'No disponible',
        variedad: row._rawData[3] || 'No disponible',
        nombreCientifico: row._rawData[4] || 'No disponible',
        agnoRecoleccion: row._rawData[5] || 'No disponible',
        lugarRecoleccion: row._rawData[6] || 'No disponible',
        observaciones: row._rawData[7] || 'No disponible',
        imagenes: row._rawData[8] || 'No disponible',
      };
    });
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error('Error al acceder a la hoja:', error);
    return new Response(
      JSON.stringify({ error: 'Error al obtener datos de la hoja de cálculo', details: error }),
      { status: 500 }
    );
  }
}
