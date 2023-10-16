export default class Triggers {
    constructor(
        public name: string,

        public matcher: string|RegExp
    ) {}
}