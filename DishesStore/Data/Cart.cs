using DishesStore.Db.Model;

namespace DishesStore.Data
{
    public static class Cart
    {
        public static double Price { get; set; }
        public static List<DishToOrder> Dishes { get; set; }
        static Cart()
        {
            Price = 0;
            Dishes = new List<DishToOrder>();
        }
        public static void AddPrice(double price) => Price += price;
        public static void AddItem(Dish dishToOrder, int countToOrder)
        {
            if (Dishes.Count < 10) Dishes.Add(new DishToOrder() { dish = dishToOrder, count = countToOrder });
        }
        public static double GetPrice()
        {
            double TotalPrice = 0;
            Dishes.ForEach(x => TotalPrice += x.dish.Price * x.count);
            return TotalPrice;
        }
        public static void RemoveItem(DishToOrder dish) => Dishes.Remove(dish);
    }
}
