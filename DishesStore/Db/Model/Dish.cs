namespace DishesStore.Db.Model
{
    public class Dish
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Price { get; set; }
        public bool IsAvailable { get; set; }
    }
}
