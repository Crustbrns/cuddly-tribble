namespace DishesStore.Db.Model
{
    public class Message
    {
        public DateTime Time { get; set; }
        public string Body { get; set; }
        public string UserName { get; set; }

        public Message(string Body, string UserName)
        {
            this.Time = DateTime.Now;
            this.Body = Body;
            this.UserName = UserName;
        }

        public Message(string Body)
        {
            this.Time = DateTime.Now;
            this.Body = Body;
            this.UserName = "Anonymous";
        }

        public string GetTime() => $"{Time.Day.ToString()} {Time.ToString("MMMM")} {Time.Year}, {Time.ToString("HH: mm: ss")}";
    }
}
