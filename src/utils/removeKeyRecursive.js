const removeKeyRecursive = (obj, keyToRemove) => {
  if (typeof obj !== "object" || obj === null) return obj; // Retornar el objeto si no es válido

  // Si la clave está en el objeto actual, elimínala
  if (Object.prototype.hasOwnProperty.call(obj, keyToRemove)) {
    delete obj[keyToRemove];
  }

  // Recorre las claves del objeto y aplica la función recursivamente
  for (const key in obj) {
    if (typeof obj[key] === "object") {
      obj[key] = removeKeyRecursive(obj[key], keyToRemove);
    }
  }

  return obj; // Devolver el objeto modificado
};

export default removeKeyRecursive;
