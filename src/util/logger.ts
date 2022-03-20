export function  Log<T>(message: T, level?: number): number {
  let status = 0;
  try {
    console.log(`${new Date().getTime()} =${level || '-'}=>`);
    console.log(message)
    status = 1;
  } catch (e) {
    console.error(e);
  }
  return status;
}
