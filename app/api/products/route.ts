import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'products.json');

// GET - Obtener todos los productos
export async function GET() {
  try {
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    const data = JSON.parse(fileContents);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading products:', error);
    return NextResponse.json(
      { error: 'Error al leer productos' },
      { status: 500 }
    );
  }
}

// POST - Guardar productos actualizados
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validar estructura básica
    if (!body.products || !Array.isArray(body.products)) {
      return NextResponse.json(
        { error: 'Formato inválido' },
        { status: 400 }
      );
    }

    // Mantener las categorías existentes si no se envían
    const currentData = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
    const dataToSave = {
      categories: body.categories || currentData.categories,
      products: body.products
    };

    fs.writeFileSync(dataFilePath, JSON.stringify(dataToSave, null, 2));
    
    return NextResponse.json({ success: true, data: dataToSave });
  } catch (error) {
    console.error('Error saving products:', error);
    return NextResponse.json(
      { error: 'Error al guardar productos' },
      { status: 500 }
    );
  }
}