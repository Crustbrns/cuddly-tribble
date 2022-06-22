namespace DishesStore.Data.Validation.Model
{
    public static class PassProps
    {
        public static readonly int LoginMinLength = 6;
        public static readonly int LoginMaxLength = 15;

        public static readonly int PassMinLength = 8;
        public static readonly int PassMaxLength = 30;

        public static readonly int DishNameMaxLength = 25;
        public static readonly int DishNameMinLength = 4;

        public static readonly int DishPriceMax = 200;
        public static readonly int DishPriceMin = 1;

        public static readonly int DishDescriptionMaxLength = 255;

        public static bool IsValidByMinLength(string Pass) => Pass.Length >= PassMinLength;
        public static bool IsValidByMaxLength(string Pass) => Pass.Length <= PassMaxLength;

        public static bool IsDishNameValidByMinLength(string DishName) => DishName.Length >= DishNameMinLength;
        public static bool IsDishNameValidByMaxLength(string DishName) => DishName.Length <= DishNameMaxLength;
    }
}
