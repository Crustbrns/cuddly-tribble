using DishesStore.Data.Validation.Model;
using DishesStore.Db.Context;
using System.ComponentModel.DataAnnotations;

namespace DishesStore.Data
{
    public static class Validate
    {
        public static Tuple<bool, string> CheckSignupProps(string Mail, string Login, string Pass, string ConfirmPass)
        {
            if (string.IsNullOrWhiteSpace(Mail) || !new EmailAddressAttribute().IsValid(Mail))
                return Tuple.Create(false, "Incorrect mail.");

            if (string.IsNullOrWhiteSpace(Login))
                return Tuple.Create(false, "Incorrect login");

            if (string.IsNullOrWhiteSpace(Pass))
                return Tuple.Create(false, "Incorrect password");

            if (string.IsNullOrWhiteSpace(ConfirmPass))
                return Tuple.Create(false, "Incorrect confirmation password");

            if (!PassProps.IsValidByMaxLength(Pass))
                return Tuple.Create(false, $"Password must be less than or equal to {PassProps.PassMaxLength}");
            
            if (!PassProps.IsValidByMinLength(Pass))
                return Tuple.Create(false, $"Password must be great than or equal to {PassProps.PassMinLength}");

            if (!Pass.Equals(ConfirmPass))
                return Tuple.Create(false, "Confirmation password doesn't match password");

            if (!DbService.CheckLoginAvailability(Login))
                return Tuple.Create(false, "Login has been already taken, try another one or login if it's yours");
            
            if (Login.Length < PassProps.LoginMinLength)
                return Tuple.Create(false, $"Login is too short. It must be great than or equal {PassProps.LoginMinLength}");
            
            if (Login.Length > PassProps.LoginMaxLength)
                return Tuple.Create(false, $"Login is too large. It must be less than or equal {PassProps.LoginMaxLength}");

            if (!DbService.CheckMailAvailability(Mail))
                return Tuple.Create(false, "Something went wrong. Mail has been already registered");

            return Tuple.Create(true, "Validation successful");
        }

        public static Tuple<bool, string> CheckSigninProps(string Login, string Pass)
        {
            if (string.IsNullOrWhiteSpace(Login))
                return Tuple.Create(false, "Incorrect login");

            if (string.IsNullOrWhiteSpace(Pass))
                return Tuple.Create(false, "Incorrect password");

            if (!DbService.IsUserExists(Login, Pass))
                return Tuple.Create(false, "Login or password isn't correct");

            return Tuple.Create(true, "Validation successful");
        }

        public static Tuple<bool, string> CheckCategoryAdd(string CategoryName)
        {
            if (string.IsNullOrWhiteSpace(CategoryName))
                return Tuple.Create(false, "Incorrect Category Name");

            if (CategoryName.Length < 4)
                return Tuple.Create(false, "Category Name too short. It must be great than or equal to 4");

            if (DbService.CheckCategoryExistence(CategoryName))
                return Tuple.Create(false, "Category has been already created");
            
            if (DbService.Categories.Count >= 11)
                return Tuple.Create(false, "Categories' limit count. Remove some categories and try again");

            return Tuple.Create(true, "Category has been successfully added");
        }
        
        public static Tuple<bool, string> CheckCategoryEdit(int CategoryId, string NewCategoryName)
        {
            if (string.IsNullOrWhiteSpace(NewCategoryName))
                return Tuple.Create(false, "Incorrect New Category Name");

            if (DbService.TryGetCategory(CategoryId) == null)
                return Tuple.Create(false, "Category doesn't exist");

            if (DbService.TryGetCategory(CategoryId).Name.Equals(NewCategoryName))
                return Tuple.Create(false, "Category Names match each other");

            if (NewCategoryName.Length < 4)
                return Tuple.Create(false, "New Category Name too short. It must be great than or equal to 4");

            if (DbService.CheckCategoryExistence(NewCategoryName))
                return Tuple.Create(false, "Category with same name has been already created");

            return Tuple.Create(true, "Category has been successfully edited");
        }
        
        public static Tuple<bool, string> CheckCategoryDelete(int CategoryId)
        {
            //if (!DbService.CheckCategoryExistence(CategoryId))
            //    return Tuple.Create(false, "Category doesn't exist yet.");

            if (DbService.IsCategoryInUse(CategoryId))
                return Tuple.Create(false, "Category in use.");

            return Tuple.Create(true, "Category has been removed");
        }


        public static Tuple<bool, string> CheckDishAdding(string DishName, double DishPrice, string DishDescription, int CategoryId)
        {
            if (!DbService.CheckCategoryExistence(CategoryId))
                return Tuple.Create(false, "Category doesn't exist");

            if (DbService.IsDishExist(DishName))
                return Tuple.Create(false, "Dish Name has been already taken.");
            
            if (DishPrice < PassProps.DishPriceMin)
                return Tuple.Create(false, $"Dish Price must be great than or equal ${PassProps.DishPriceMin}");
            
            if (DishPrice > PassProps.DishPriceMax)
                return Tuple.Create(false, $"Dish Price must be less than or equal ${PassProps.DishPriceMax}");

            if(DishDescription == string.Empty)
                return Tuple.Create(false, "Dish Description is empty");
            
            if(DishDescription.Length > PassProps.DishDescriptionMaxLength)
                return Tuple.Create(false, $"Dish Description must be less than or equal {PassProps.DishDescriptionMaxLength}");

            return Tuple.Create(true, "Dish has been created");
        }
    }
}