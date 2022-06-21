namespace DishesStore.Data
{
    public static class Configuration
    {
        public static IConfigurationRoot Properties = new ConfigurationBuilder().SetBasePath(AppDomain.CurrentDomain.BaseDirectory).AddJsonFile("appsettings.json").Build();
    }
}
