import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

// GET - Obtener todos los productos
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('calo');
    
    const categories = await db.collection('categories').find({}).toArray();
    const products = await db.collection('products').find({}).toArray();
    
    // Convertir _id de MongoDB a string para evitar errores de serialización
    const cleanCategories = categories.map(cat => ({
      ...cat,
      _id: cat._id.toString()
    }));
    
    const cleanProducts = products.map(prod => ({
      ...prod,
      _id: prod._id.toString()
    }));
    
    return NextResponse.json({ 
      categories: cleanCategories, 
      products: cleanProducts 
    });
  } catch (error) {
    console.error('Error reading products:', error);
    return NextResponse.json(
      { error: 'Error al leer productos' },
      { status: 500 }
    );
  }
}

// POST - Guardar productos
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const client = await clientPromise;
    const db = client.db('calo');
    
    // Reemplazar todos los productos
    await db.collection('products').deleteMany({});
    if (body.products && body.products.length > 0) {
      // Remover _id si existe para evitar conflictos
      const productsToInsert = body.products.map((p: any) => {
        const { _id, ...rest } = p;
        return rest;
      });
      await db.collection('products').insertMany(productsToInsert);
    }
    
    // Actualizar categorías si se envían
    if (body.categories && body.categories.length > 0) {
      await db.collection('categories').deleteMany({});
      const categoriesToInsert = body.categories.map((c: any) => {
        const { _id, ...rest } = c;
        return rest;
      });
      await db.collection('categories').insertMany(categoriesToInsert);
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving products:', error);
    return NextResponse.json(
      { error: 'Error al guardar productos' },
      { status: 500 }
    );
  }
}