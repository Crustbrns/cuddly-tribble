namespace LoginKiri.Db
{
    public static class CurrentUser
    {
        public static User user;
        public static bool isLogined { get; set; }

        static CurrentUser()
        {
            user = new User();
        }
    }
}
