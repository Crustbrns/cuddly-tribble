using Microsoft.EntityFrameworkCore;

namespace LoginKiri.Db.AuthDbContext
{
    public class AuthContext : DbContext
    {
        public DbSet<User> Users { get; set; } = null!;

        public AuthContext()
        {
            this.Database.EnsureCreated();
        }


        protected override void OnConfiguring(DbContextOptionsBuilder dbContextOptionsBuilder)
        {
            dbContextOptionsBuilder.UseSqlServer("Data Source=kiridb.cl7x24udak66.eu-central-1.rds.amazonaws.com;Initial Catalog=LOGIN;Persist Security Info=True;User ID=admin;Password=EgorPrivet123");
        }


    }
}
