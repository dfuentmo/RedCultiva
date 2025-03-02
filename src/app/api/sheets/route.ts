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

    const data = rows.map((row) => {
      const rowData = row.toObject(); // Usamos `toObject` para obtener los valores como un objeto
      return {
        id: rowData['id'],
        usuario: rowData['usuario'] || 'No disponible',  // Asegúrate de que 'Usuario' coincida con el nombre de la columna
        tipo: rowData['tipo'] || 'No disponible',
        nombre: rowData['nombre'] || 'No disponible',
        variedad: rowData['variedad'] || 'Variedad no documentada',
        nombreCientifico: rowData['nombreCientifico'] || 'No disponible',
        agnoRecoleccion: rowData['agnoRecoleccion'] || 'No disponible',
        lugarRecoleccion: rowData['lugarRecoleccion'] || 'No disponible',
        observaciones: rowData['observaciones'] || 'Sin información adicional',
        imagenes: rowData['imagenes'] || 'No disponible',
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
