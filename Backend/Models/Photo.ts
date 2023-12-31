//URL, description, category, current date (disabled), time (disabled)
export class Photo {
    public photo_id: number;
    public URL: string;
    public description: string;
    public category_id: number;
    public date: string;
  
    constructor(
      photo_id: number,
      URL: string,
      description: string,
      category_id: number,
      date: string,
    ) {
      this.photo_id = photo_id;
      this.URL = URL;
      this.description = description;
      this.category_id = category_id;
      this.date = date;
    }
  }