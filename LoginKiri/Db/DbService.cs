using LoginKiri.Db.AuthDbContext;

namespace LoginKiri.Db
{
    public static class DbService
    {
        static DbService()
        {
            using (var context = new AuthContext())
            {
                context.SaveChanges();
            }
        }
    }
}
