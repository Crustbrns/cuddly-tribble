namespace DishesStore.Data
{
    public static class PanelState
    {
        public static readonly List<Tuple<int, string>> States = new List<Tuple<int, string>>()
        {
            new Tuple<int, string>(0, "Add dish category"),
            new Tuple<int, string>(1, "Edit dish categories"),
            new Tuple<int, string>(2, "Remove dish category"),
            new Tuple<int, string>(3, "Add dish"),
            new Tuple<int, string>(4, "Edit dish"),
            new Tuple<int, string>(5, "Remove dish"),
            new Tuple<int, string>(6, "Set User Roles")
        };
    }
}
