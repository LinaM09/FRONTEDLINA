export const authMock = (username, password) => {
  // Retorna una promesa para simular comportamiento asíncrono
  return new Promise((resolve, reject) => {
    // Simula retraso de red de 1.5 segundos
    setTimeout(() => {
      // Validación de credenciales hardcodeadas
      if (username === "admin" && password === "Admin1234") {
        // Respuesta mock exitosa
        resolve({ 
          user: "admin",       // Nombre de usuario autenticado
          token: "fake-token"  // Token de acceso simulado
          // Nota: En producción, este token sería un JWT real
        });
      } else {
        // Credenciales incorrectas - rechazar con error
        reject(new Error("Credenciales inválidas"));
        // Nota: Mensaje genérico por seguridad (no revelar qué campo falló)
      }
    }, 1500); // 1500ms = 1.5 segundos de delay simulado
  });
};