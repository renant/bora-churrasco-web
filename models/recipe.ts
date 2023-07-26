class Recipe {
    constructor(
        public id: string,
        public name: string,
        public description: string,
        public imagePath: string,
        public ingredients: string[],
        public steps: string[]
    ) {}
}

export default Recipe;