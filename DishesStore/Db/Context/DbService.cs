
using DishesStore.Db.Model;

namespace DishesStore.Db.Context
{
    public static class DbService
    {
        public static List<Dish> Dishes { get; set; } = new List<Dish>();
        public static List<Category> Categories { get; set; } = new List<Category>();
        public static List<User> Users { get; set; } = new List<User>();

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
                //Users = db.Users.ToList();
            }
        }

        public static void AddCategory(string CategoryName)
        {
            if (!CheckCategoryExistence(CategoryName))
            {
                using (SpicyDbContext db = new SpicyDbContext())
                {
                    db.Categories.Add(new Category { Name = CategoryName });
                    db.SaveChanges();
                }
                DbUpdate();
            }
        }

        public static void EditCategory(int CategoryId, string NewCategoryName)
        {
            if (!CheckCategoryExistence(CategoryId))
            {
                using (SpicyDbContext db = new SpicyDbContext())
                {

                    db.Categories.First(x => x.Id == CategoryId).Name = NewCategoryName;
                    db.SaveChanges();
                }
                DbUpdate();
            }
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

        public static Tuple<bool, string> TryAddNewUser(string UserMail, string UserLogin, string UserPass)
        {
            if (!CheckLoginAvailability(UserLogin))
                return Tuple.Create(false, "Something went wrong. Login has been already taken.");

            if (!CheckMailAvailability(UserMail))
                return Tuple.Create(false, "Something went wrong. Mail has been already taken.");

            using (SpicyDbContext db = new SpicyDbContext())
            {
                db.Users.Add(new User() { Mail = UserMail, Login = UserLogin, PassHash = UserPass });
                db.SaveChanges();
            }
            DbUpdate();

            return Tuple.Create(true, "Account created.");
        }
        public static void AddNewUser(string UserMail, string UserLogin, string UserPass)
        {
            using (SpicyDbContext db = new SpicyDbContext())
            {
                db.Users.Add(new User() { Mail = UserMail, Login = UserLogin, PassHash = UserPass });
                db.SaveChanges();
            }
            DbUpdate();
        }
        public static bool CheckMailAvailability(string Mail)
        {
            using (SpicyDbContext db = new SpicyDbContext())
            {
                return !db.Users.Any(x => x.Mail == Mail);
            }
        }
        public static bool CheckLoginAvailability(string Login)
        {
            using (SpicyDbContext db = new SpicyDbContext())
            {
                return !db.Users.Any(x => x.Login == Login);
            }
        }

        public static bool TryLoginUser(string Login, string Pass)
        {
            using (SpicyDbContext db = new SpicyDbContext())
            {
                return (db.Users.FirstOrDefault(x => x.Login == Login)?.PassHash == Pass);
            }
        }
    }
}
