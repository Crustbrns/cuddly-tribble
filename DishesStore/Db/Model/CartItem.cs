namespace DishesStore.Db.Model
{
    public class CartItem
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int DishId { get; set; }
        public int Count { get; set; }
    }
}
