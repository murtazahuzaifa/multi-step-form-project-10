export type Merge<A, B> = {
    [K in keyof A]: K extends keyof B ? B[K] : A[K]
  } & B

export const calculateAge = (birthday:Date):number => { // birthday is a date
  var ageDifMs = Date.now() - birthday.getTime();
  var ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}
