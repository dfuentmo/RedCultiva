import { nanoid } from 'nanoid';
import fs from 'fs';

export async function GET() {
  // Generar 134 IDs
  const ids = [];
  for (let i = 0; i < 134; i++) {
    ids.push(nanoid());
  }

  // Guardar los IDs en un archivo dentro de la carpeta public
  const filePath = './public/unique_ids.json';
  fs.writeFileSync(filePath, JSON.stringify(ids, null, 2));

  // Responder con un mensaje de éxito
  return new Response(JSON.stringify({ message: 'IDs generados y guardados correctamente.' }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
