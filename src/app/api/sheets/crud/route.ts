import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;

if (!clientEmail || !privateKey || !spreadsheetId) {
  throw new Error('Faltan las variables de entorno necesarias.');
}

async function getSheet() {
  const auth = new JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const doc = new GoogleSpreadsheet(spreadsheetId, auth);
  await doc.loadInfo();
  return doc.sheetsByIndex[0]; // Seleccionamos la primera hoja
}

// **Método GET: Leer todas las semillas**
export async function GET() {
  const sheet = await getSheet();
  const rows = await sheet.getRows();
  const data = rows.map((row) => row.toObject());

  return new Response(JSON.stringify(data), { status: 200 });
}

// **Método POST: Crear una nueva semilla**
export async function POST(req: Request) {
  const body = await req.json();
  const sheet = await getSheet();
  
  try {
    await sheet.addRow(body); // Añadimos una nueva fila con los datos del body
    return new Response(JSON.stringify({ success: true }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error al crear la semilla', details: error }), { status: 500 });
  }
}

// **Método PUT: Actualizar una semilla**
export async function PUT(req: Request) {
  const { id, updates } = await req.json(); // id = índice o criterio único, updates = datos a actualizar
  const sheet = await getSheet();
  const rows = await sheet.getRows();

  const row = rows.find((r) => r.id === id); // Busca la fila por ID o criterio único
  if (!row) {
    return new Response(JSON.stringify({ error: 'Semilla no encontrada' }), { status: 404 });
  }

  Object.keys(updates).forEach((key) => {
    row[key] = updates[key]; // Actualizamos las columnas específicas
  });

  try {
    await row.save(); // Guardamos los cambios
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error al actualizar la semilla', details: error }), { status: 500 });
  }
}

// **Método DELETE: Eliminar una semilla**
export async function DELETE(req: Request) {
  const { id } = await req.json();
  const sheet = await getSheet();
  const rows = await sheet.getRows();

  const row = rows.find((r) => r.id === id); // Busca la fila por ID o criterio único
  if (!row) {
    return new Response(JSON.stringify({ error: 'Semilla no encontrada' }), { status: 404 });
  }

  try {
    await row.delete(); // Eliminamos la fila
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error al eliminar la semilla', details: error }), { status: 500 });
  }
}
