export function Log(message: string, level?: number): number {
  let status = 0;
  try {
    console.log(`${new Date().getTime()} =${level || '-'}=>${message}`);
    status = 1;
  } catch (e) {
    console.error(e);
  }
  return status;
}
