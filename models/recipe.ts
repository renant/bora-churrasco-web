class Recipe {
  constructor(
    public id: string,
    public name: string,
    public imagePath: string,
    public ingredients: string[],
    public steps: string[],
    public createdAt: Date,
    public active: boolean,
    public createdBy: string,
    public content: string,
    public slug: string
  ) {}
}

export default Recipe;
