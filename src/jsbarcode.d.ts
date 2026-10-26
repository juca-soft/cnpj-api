declare module 'jsbarcode/bin/barcodes/CODE128/CODE128A.js' {
  export default class CODE128A {
    constructor(text: string, options: object)
    encode(): { data: string }
  }
}
