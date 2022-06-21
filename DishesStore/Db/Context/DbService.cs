
using DishesStore.Db.Model;

namespace DishesStore.Db.Context
{
    public static class DbService
    {
        public static List<Dish> Dishes { get; set; } = new List<Dish>();
        public static List<Category> Categories { get; set; } = new List<Category>();

        public static void DbInit()
        {
            using (SpicyDbContext db = new SpicyDbContext())
            {
                DbUpdate();
                db.SaveChanges();
            }
        }

        public static void DbUpdate()
        {
            using (SpicyDbContext db = new SpicyDbContext())
            {
                Dishes = db.Dishes.ToList();
                Categories = db.Categories.ToList();
            }
        }

        public static void AddCategory(string CategoryName)
        {
            using (SpicyDbContext db = new SpicyDbContext())
            {
                if (!CheckCategoryExistence(CategoryName))
                {
                    db.Categories.Add(new Category { Name = CategoryName });
                    db.SaveChanges();
                }
            }
            DbUpdate();
        }

        public static void EditCategory(int CategoryId, string NewCategoryName)
        {
            using (SpicyDbContext db = new SpicyDbContext())
            {
                if (!CheckCategoryExistence(CategoryId))
                {
                    db.Categories.First(x => x.Id == CategoryId).Name = NewCategoryName;
                    db.SaveChanges();
                }
            }
            DbUpdate();
        }

        private static bool CheckCategoryExistence(string CategoryName)
        {
            using (SpicyDbContext spicyDbContext = new SpicyDbContext())
            {
                return spicyDbContext.Categories.Any(x => x.Name == CategoryName);
            }
        }
        private static bool CheckCategoryExistence(int CategoryId)
        {
            using (SpicyDbContext spicyDbContext = new SpicyDbContext())
            {
                return spicyDbContext.Categories.Any(x => x.Id == CategoryId);
            }
        }
    }
}
