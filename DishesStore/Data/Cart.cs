namespace DishesStore.Data
{
    public static class Cart
    {
        public static double Price { get; set; }
        static Cart()
        {
            Price = 0;
        }
        public static void AddPrice(double price) => Price += price;
    }
}
