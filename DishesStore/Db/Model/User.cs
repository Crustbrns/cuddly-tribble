namespace DishesStore.Db.Model
{
    public class User
    {
        public int Id { get; set; }
        public string Login { get; set; } = null!;
        public string Mail { get; set; } = null!;
        public string PassHash { get; set; } = null!;
        public string SessionHash { get; set; } = null!;
        public int TotalMoneySpent { get; set; }
        public bool AdminRole { get; set; }
    }
}
