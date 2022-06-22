namespace DishesStore.Data.Validation.Model
{
    public static class PassProps
    {
        public static readonly int PassMinLength = 8;
        public static readonly int PassMaxLength = 30;

        public static bool IsValidByMinLength(string Pass) => Pass.Length >= PassMinLength;
        public static bool IsValidByMaxLength(string Pass) => Pass.Length <= PassMaxLength;
    }
}
