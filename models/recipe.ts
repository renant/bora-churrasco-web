class Recipe {
  constructor(
    public id: string,
    public title: string,
    public name: string,
    public ingredients: string[],
    public steps: string[],
    public date: Date,
    public active: boolean,
    public createdBy: string,
    public content: string,
    public slug: string,
    public formattedDate?: string,
    public blurDataURL?: string,
    public hdWebp?: string,
    public thumbWebp?: string
  ) {}
}

export default Recipe;
