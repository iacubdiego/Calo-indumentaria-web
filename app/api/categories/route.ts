import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

// GET - Obtener todas las categorías
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('calo');
    
    const categories = await db.collection('categories').find({}).toArray();
    
    // Convertir _id de MongoDB a string
    const cleanCategories = categories.map(cat => ({
      ...cat,
      _id: cat._id.toString()
    }));
    
    return NextResponse.json({ categories: cleanCategories });
  } catch (error) {
    console.error('Error reading categories:', error);
    return NextResponse.json(
      { error: 'Error al leer categorías' },
      { status: 500 }
    );
  }
}

// POST - Crear o actualizar categoría
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const client = await clientPromise;
    const db = client.db('calo');
    
    const { _id, ...categoryData } = body;
    
    // Validar que el id no esté duplicado (si es nueva)
    if (!_id) {
      const existingCategory = await db.collection('categories').findOne({ 
        id: categoryData.id 
      });
      
      if (existingCategory) {
        return NextResponse.json(
          { error: 'Ya existe una categoría con ese ID' },
          { status: 400 }
        );
      }
      
      // Crear nueva categoría
      await db.collection('categories').insertOne(categoryData);
    } else {
      // Actualizar categoría existente
      const { ObjectId } = require('mongodb');
      await db.collection('categories').updateOne(
        { _id: new ObjectId(_id) },
        { $set: categoryData }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving category:', error);
    return NextResponse.json(
      { error: 'Error al guardar categoría' },
      { status: 500 }
    );
  }
}

// DELETE - Eliminar categoría
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'ID no proporcionado' },
        { status: 400 }
      );
    }
    
    const client = await clientPromise;
    const db = client.db('calo');
    
    // Verificar si hay productos asociados
    const productsWithCategory = await db.collection('products').countDocuments({
      category: id
    });
    
    if (productsWithCategory > 0) {
      return NextResponse.json(
        { 
          error: `No se puede eliminar. Hay ${productsWithCategory} producto(s) asociado(s) a esta categoría.`,
          hasProducts: true,
          productCount: productsWithCategory
        },
        { status: 400 }
      );
    }
    
    // Eliminar categoría
    const { ObjectId } = require('mongodb');
    await db.collection('categories').deleteOne({ 
      _id: new ObjectId(id) 
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting category:', error);
    return NextResponse.json(
      { error: 'Error al eliminar categoría' },
      { status: 500 }
    );
  }
}