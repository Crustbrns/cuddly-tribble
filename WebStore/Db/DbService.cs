using WebStore.Db.Context;
using WebStore.Model;

namespace WebStore.Db
{
    public static class DbService
    {
        static DbService()
        {
        }

        public static void DbEns()
        {
            using (var context = new StoreDbContext())
            {
                context.SaveChanges();
            }
        }

        public static void AddPhone()
        {
            using (var context = new StoreDbContext())
            {
                context.Phones.Add(new Phone()
                {
                    Name = "Apple iPhone 13 Pro",
                    Price = 43899,
                    Color = "Green",
                    RAM = "6Gb",
                    ROM = "256Gb",
                    IsAvailable = true
                });

                context.Phones.Add(new Phone()
                {
                    Name = "Apple iPhone 13 Pro",
                    Price = 40499,
                    Color = "Green",
                    RAM = "4Gb",
                    ROM = "128Gb",
                    IsAvailable = true
                });

                context.Phones.Add(new Phone()
                {
                    Name = "Apple iPhone 13 Pro",
                    Price = 53799,
                    Color = "Blue",
                    RAM = "6Gb",
                    ROM = "1Tb",
                    IsAvailable = true
                });

                context.Phones.Add(new Phone()
                {
                    Name = "Apple iPhone 13 Pro",
                    Price = 44499,
                    Color = "Blue",
                    RAM = "6Gb",
                    ROM = "256Gb",
                    IsAvailable = true
                });

                context.Phones.Add(new Phone()
                {
                    Name = "Apple iPhone 13 Pro",
                    Price = 40599,
                    Color = "Blue",
                    RAM = "4Gb",
                    ROM = "128Gb",
                    IsAvailable = true
                });

                context.Phones.Add(new Phone()
                {
                    Name = "Apple iPhone 13 Pro",
                    Price = 52999,
                    Color = "Silver",
                    RAM = "6Gb",
                    ROM = "1Tb",
                    IsAvailable = true
                });

                context.Phones.Add(new Phone()
                {
                    Name = "Apple iPhone 13 Pro",
                    Price = 49399,
                    Color = "Gold",
                    RAM = "6Gb",
                    ROM = "512Gb",
                    IsAvailable = true
                });

                context.Phones.Add(new Phone()
                {
                    Name = "Apple iPhone 13 Pro",
                    Price = 36399,
                    Color = "Graphite",
                    RAM = "2Gb",
                    ROM = "128Gb",
                    IsAvailable = true
                });

                context.SaveChanges();
            }
        }
    }
}
