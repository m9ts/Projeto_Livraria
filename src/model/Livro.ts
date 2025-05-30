export class Livro {
    constructor(
        public id: number,
        public titulo: string,
        public autor: string,
        public editora: string,
        public edicao: string,
        public ISBN: string,
        public categoria_id: number
    ) {}
}