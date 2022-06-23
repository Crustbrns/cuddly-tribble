namespace DishesStore.Db.Model
{
    public class Dish
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Description { get; set; } = null!;
        public string ImageUrl { get; set; } = null!;
        public double Price { get; set; }
        public Category Category { get; set; } = null!;
    }
}
