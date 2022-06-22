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
                return Tuple.Create(false, "Incorrect login.");

            if (string.IsNullOrWhiteSpace(Pass))
                return Tuple.Create(false, "Incorrect password.");

            if (string.IsNullOrWhiteSpace(ConfirmPass))
                return Tuple.Create(false, "Incorrect confirmation password.");

            if (!PassProps.IsValidByMaxLength(Pass))
                return Tuple.Create(false, $"Password must be less than or equal to {PassProps.PassMaxLength}.");
            
            if (!PassProps.IsValidByMinLength(Pass))
                return Tuple.Create(false, $"Password must be great than or equal to {PassProps.PassMinLength}.");

            if (!Pass.Equals(ConfirmPass))
                return Tuple.Create(false, "Confirmation password doesn't match password");

            if (!DbService.CheckLoginAvailability(Login))
                return Tuple.Create(false, "Something went wrong. Login has been already taken. Try another one or login if it's yours.");

            if (!DbService.CheckMailAvailability(Mail))
                return Tuple.Create(false, "Something went wrong. Mail has been already registered.");

            return Tuple.Create(true, "Validation successful");
        }

    }
}