export function calcularEdad(
  fechaNacimiento: Date,
  fechaReferencia: Date = new Date(),
): number {
  const diferenciaMs = fechaReferencia.getTime() - fechaNacimiento.getTime();

  const edadFechaReferencia = new Date(diferenciaMs);
  const edad = Math.abs(edadFechaReferencia.getUTCFullYear() - 1970);

  return edad;
}
