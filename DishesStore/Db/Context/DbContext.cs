using DishesStore.Data;
using DishesStore.Db.Model;
using Microsoft.EntityFrameworkCore;

namespace DishesStore.Db.Context
{
    public class SpicyDbContext : DbContext
    {
        public DbSet<Category> Categories { get; set; } = null!;
        public DbSet<Dish> Dishes { get; set; } = null!;
        public DbSet<User> Users { get; set; } = null!;

        public SpicyDbContext()
        {
            //Database.EnsureDeleted();
            Database.EnsureCreated();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(Configuration.Properties.GetConnectionString("MSSQL"));
        }
    }
}
