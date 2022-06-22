﻿
using DishesStore.Db.Model;
using DishesStore.Db.Model.Auth;

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
                Users = db.Users.ToList();
            }
        }

        public static Category TryGetCategory(int CategoryId)
        {
            using (SpicyDbContext db = new SpicyDbContext())
            {
                return db.Categories.FirstOrDefault(x => x.Id == CategoryId);
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
        public static void EditCategory(string CategoryName, string NewCategoryName)
        {
            using (SpicyDbContext db = new SpicyDbContext())
            {
                db.Categories.First(x => x.Name == CategoryName).Name = NewCategoryName;
                db.SaveChanges();
            }
            DbUpdate();
        }
        public async static void TryEditCategory(int CategoryId, string NewCategoryName)
        {
            await Task.Run(() =>
            {
                if (CheckCategoryExistence(CategoryId))
                {
                    using (SpicyDbContext db = new SpicyDbContext())
                    {
                        db.Categories.First(x => x.Id == CategoryId).Name = NewCategoryName;
                        db.SaveChanges();
                    }
                    DbUpdate();
                }
            });
        }
        public static void DeleteCategoryById(int CategoryId)
        {
            using (SpicyDbContext db = new SpicyDbContext())
            {
                db.Categories.Remove(db.Categories.Where(x => x.Id == CategoryId).First());
                db.SaveChanges();
            }
            DbUpdate();
        }

        public static bool IsCategoryInUse(string CategoryName)
        {
            using (SpicyDbContext db = new SpicyDbContext())
            {
                return db.Dishes.Any(x => x.Category.Name == CategoryName);
            }

        }
        public static bool IsCategoryInUse(int CategoryId)
        {
            using (SpicyDbContext db = new SpicyDbContext())
            {
                return db.Dishes.Any(x => x.Category.Id == CategoryId);
            }

        }

        public static void SetUserRoot(string Login, string Pass)
        {
            using (SpicyDbContext db = new SpicyDbContext())
            {
                Root.userId = db.Users.First(x => x.Login == Login && x.PassHash == Pass).Id;
            }
        }
        public static User GetUserData(int UserId)
        {
            using (SpicyDbContext db = new SpicyDbContext())
            {
                if (DbService.IsUserExistsById(UserId))
                {
                    return db.Users.First(x => x.Id == UserId);
                }
            }
            return null;
        }
        public static int ReturnUserId(string Login, string Pass)
        {
            using (SpicyDbContext db = new SpicyDbContext())
            {
                return db.Users.First(x => x.Login == Login && x.PassHash == Pass).Id;
            }
        }
        public static void AddDish(string DishName, double DishPrice, string DishDescription, int CategoryId)
        {
            using (SpicyDbContext db = new SpicyDbContext())
            {
                db.Dishes.Add(new Dish()
                {
                    Name = DishName,
                    Price = Math.Round(DishPrice, 2),
                    Description = DishDescription,
                    Category = db.Categories.First(x => x.Id == CategoryId)
                });
                db.SaveChanges();
            }
            DbService.DbUpdate();
        }


        public static bool IsDishExist(string Name)
        {
            using (SpicyDbContext db = new SpicyDbContext())
            {
                return db.Dishes.Any(x => x.Name == Name);
            }
        }



        public static bool CheckCategoryExistence(string CategoryName)
        {
            using (SpicyDbContext db = new SpicyDbContext())
            {
                return db.Categories.Any(x => x.Name == CategoryName);
            }
        }
        public static bool CheckCategoryExistence(int CategoryId)
        {
            using (SpicyDbContext db = new SpicyDbContext())
            {
                return db.Categories.Any(x => x.Id == CategoryId);
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

        public static bool IsUserExists(string Login, string Pass)
        {
            return IsUserLoginValid(Login) ? IsUserPassValid(Login, Pass) : false;
        }
        public static bool IsUserExistsById(int UserId)
        {
            using (SpicyDbContext db = new SpicyDbContext())
            {
                return db.Users.Any(x => x.Id == UserId);
            }
        }

        private static bool IsUserLoginValid(string Login)
        {
            using (SpicyDbContext db = new SpicyDbContext())
            {
                return db.Users.Any(x => x.Login.ToLower() == Login.ToLower());
            }
        }
        private static bool IsUserPassValid(string Login, string Pass)
        {
            using (SpicyDbContext db = new SpicyDbContext())
            {
                return db.Users.First(x => x.Login == Login).PassHash == Pass;
            }
        }
    }
}
