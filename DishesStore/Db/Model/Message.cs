namespace DishesStore.Db.Model
{
    public class Message
    {
        public int Id { get; set; }
        public DateTime Time { get; set; }
        public string Body { get; set; }
        public string UserName { get; set; }

        public Message(string Body, string UserName)
        {
            this.Time = DateTime.Now;
            this.Time = this.Time.AddHours(3);
            this.Body = Body;
            this.UserName = UserName;
        }

        public Message(string Body)
        {
            this.Time = DateTime.Now;
            this.Time = this.Time.AddHours(3);
            this.Body = Body;
            this.UserName = "Anonymous";
        }

        public Message()
        {
        }

        public string GetTime() => $"{Time.Day.ToString()} {Time.ToString("MMMM")} {Time.Year}, {Time.ToString("HH: mm: ss")}";
    }
}
