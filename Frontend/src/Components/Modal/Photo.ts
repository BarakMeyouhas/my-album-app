//URL, description, category, current date (disabled), time (disabled)
export class Photo {
    public id: number;
    public URL: string;
    public description: string;
    public category_id: number;
    public date: string;
    public time: string;
    public categoryName: string;
  
    constructor(
      id: number,
      URL: string,
      description: string,
      category_id: number,
      date: string,
      time: string,
      categoryName: string,
    ) {
      this.id = id;
      this.URL = URL;
      this.description = description;
      this.category_id = category_id;
      this.date = date;
      this.time = time;
      this.categoryName = categoryName;
    }
  }