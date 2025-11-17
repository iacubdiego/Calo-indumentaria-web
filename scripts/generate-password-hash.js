const bcrypt = require('bcryptjs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('\n🔐 GENERADOR DE HASH PARA CONTRASEÑA ADMIN\n');
console.log('Este script te ayudará a generar el hash para tu contraseña de administrador.\n');

rl.question('Ingresa la contraseña que quieres usar: ', async (password) => {
  if (!password || password.length < 6) {
    console.log('\n❌ La contraseña debe tener al menos 6 caracteres.\n');
    rl.close();
    return;
  }

  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);

  console.log('\n✅ Hash generado exitosamente!\n');
  console.log('Copia este valor en tu archivo .env.local:\n');
  console.log(`ADMIN_PASSWORD_HASH=${hash}\n`);
  console.log('⚠️  IMPORTANTE: Guarda este hash de forma segura y nunca lo compartas.\n');

  rl.close();
});
