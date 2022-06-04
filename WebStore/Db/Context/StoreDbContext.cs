using Microsoft.EntityFrameworkCore;
using WebStore.Model;

namespace WebStore.Db.Context
{
    public class StoreDbContext : DbContext
    {
        public StoreDbContext()
        {
            //this.Database.EnsureDeleted();
            this.Database.EnsureCreated();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder dbContextOptionsBuilder)
        {
            dbContextOptionsBuilder.UseSqlServer("Data Source=kiridb.cl7x24udak66.eu-central-1.rds.amazonaws.com;Initial Catalog=STORE;Persist Security Info=True;User ID=admin;Password=EgorPrivet123");
        }

        public DbSet<Phone> Phones { get; set; } = null!;
         
        //public void AddPhone()
        //{
        //    using (var context = new StoreDbContext())
        //    {
        //        context.Phones.Add(new Phone() { 
        //        });
        //        context.SaveChanges();
        //    }
        //}
    }
}
