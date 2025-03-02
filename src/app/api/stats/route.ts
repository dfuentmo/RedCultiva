import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

export async function GET() {
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;

  if (!clientEmail || !privateKey || !spreadsheetId) {
    return new Response(JSON.stringify({ error: "Faltan las variables de entorno necesarias." }), { status: 500 });
  }

  try {
    const auth = new JWT({
      email: clientEmail,
      key: privateKey,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const doc = new GoogleSpreadsheet(spreadsheetId, auth);
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows();

    const usuarios = new Set();
    let totalSemillas = 0;
    const paises = new Set();
  
    rows.forEach((row) => {
      const usuario = row.get("usuario")?.trim();
      const pais = row.get("lugarRecoleccion")?.trim(); // Asegúrate de que la columna es "lugarRecoleccion"
    
      if (usuario) {
        usuarios.add(usuario); // Añadimos el usuario al Set (los Sets eliminan duplicados automáticamente)
      }
      
      if (pais) {
        paises.add(pais); // Añadimos el país al Set
      }
      
      totalSemillas++; // Contamos cada fila como una semilla aportada
    });
    

    const data = {
      usuariosRegistrados: usuarios.size,
      semillasAportadas: totalSemillas,
      paisesParticipantes: paises.size,
    };
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error("Error al acceder a la hoja:", error);
    return new Response(JSON.stringify({ error: "Error al obtener estadísticas", details: error }), { status: 500 });
  }
}
