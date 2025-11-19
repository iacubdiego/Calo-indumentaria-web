import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Configurar Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  try {
    // Verificar configuración de Cloudinary
    if (!process.env.CLOUDINARY_CLOUD_NAME || 
        !process.env.CLOUDINARY_API_KEY || 
        !process.env.CLOUDINARY_API_SECRET) {
      console.error('Missing Cloudinary environment variables');
      return NextResponse.json(
        { error: 'Cloudinary no está configurado. Verificá las variables de entorno.' },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No se recibió ningún archivo' },
        { status: 400 }
      );
    }

    // Convertir el archivo a base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString('base64');
    const dataURI = `data:${file.type};base64,${base64}`;

    // Subir a Cloudinary
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: 'calo-products',
      resource_type: 'image',
      transformation: [
        { width: 800, height: 800, crop: 'limit' },
        { quality: 'auto' },
        { fetch_format: 'auto' }
      ]
    });

    return NextResponse.json({
      success: true,
      url: result.secure_url,
      public_id: result.public_id
    });

  } catch (error: any) {
    console.error('Error uploading image:', error);
    
    // Mensaje específico según el tipo de error
    let errorMessage = 'Error al subir la imagen';
    
    if (error.message?.includes('Invalid API Key')) {
      errorMessage = 'API Key de Cloudinary inválida';
    } else if (error.message?.includes('cloud_name')) {
      errorMessage = 'Cloud Name de Cloudinary inválido';
    } else if (error.message?.includes('api_secret')) {
      errorMessage = 'API Secret de Cloudinary inválido';
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

// Endpoint para eliminar imágenes
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const publicId = searchParams.get('public_id');

    if (!publicId) {
      return NextResponse.json(
        { error: 'No se especificó el public_id' },
        { status: 400 }
      );
    }

    await cloudinary.uploader.destroy(publicId);

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Error deleting image:', error);
    return NextResponse.json(
      { error: 'Error al eliminar la imagen' },
      { status: 500 }
    );
  }
}
