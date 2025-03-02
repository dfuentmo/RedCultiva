import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";
import { nanoid } from "nanoid";

const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;

if (!clientEmail || !privateKey || !spreadsheetId) {
  throw new Error("Faltan las variables de entorno necesarias.");
}

async function getSheet() {
  const auth = new JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const doc = new GoogleSpreadsheet(spreadsheetId, auth);
  await doc.loadInfo();
  return doc.sheetsByIndex[0]; // Seleccionamos la primera hoja
}

// **Método POST: Crear una nueva semilla**
export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Generar ID único
    const newSeed = {
      id: nanoid(),
      usuario: body.usuario || "",
      tipo: body.tipo || "",
      nombre: body.nombre || "",
      variedad: body.variedad || "",
      nombreCientifico: body.nombreCientifico || "",
      agnoRecoleccion: body.agnoRecoleccion || "",
      lugarRecoleccion: body.lugarRecoleccion || "",
      observaciones: body.observaciones || "",
      imagenes: body.imagenes || "",
    };
    console.log(newSeed);
    const sheet = await getSheet();
    await sheet.addRow(newSeed);

    return new Response(
      JSON.stringify({ success: true, id: newSeed.id }),
      { status: 201 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Error al crear la semilla", details: error }),
      { status: 500 }
    );
  }
}
