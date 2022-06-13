using DishesStore.Db.Model;

namespace DishesStore.Data
{
    public static class Cart
    {
        public static double Price { get; set; }
        public static List<Dish> Dishes { get; set; }
        static Cart()
        {
            Price = 0;
            Dishes = new List<Dish>();
        }
        public static void AddPrice(double price) => Price += price;
        public static void AddItem(Dish dish) => Dishes.Add(dish);
        public static void RemoveItem(Dish dish) => Dishes.Remove(dish);
    }
}
