export function getCurrentDate(): string {
  let a = new Date();
  let mm = a.getMonth() + 1;
  let dd = a.getDate();
  let yy = a.getFullYear();
  let expectedString = `${yy}-${mm.toString().padStart(2, "0")}-${dd
    .toString()
    .padStart(2, "0")}`;
  return expectedString;
}
