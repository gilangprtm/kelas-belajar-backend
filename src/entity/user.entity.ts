export class User {
  id: number;
  nama: string;
  foto: string;
  role: string;
  id_firebase: string;
  email: string;

  constructor(
    id: number,
    nama: string,
    foto: string,
    role: string,
    id_firebase: string,
    email: string,
  ) {
    this.id = id;
    this.nama = nama;
    this.foto = foto;
    this.role = role;
    this.id_firebase = id_firebase;
    this.email = email;
  }
}
