using DishesStore.Db.Model;

namespace DishesStore.Data
{
    public static class Dialog
    {
        public static List<Message> messages;
        static Dialog()
        {
            messages = new List<Message>();
        }

        public static void AddMessage(Message message)
        {
            CheckLimit();
            messages.Insert(0, message);
        }

        private static void CheckLimit()
        {
            if (messages.Count > 30)
                messages.RemoveAt(messages.Count - 1);
        }


    }
}
