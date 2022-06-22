namespace DishesStore.Db.Model.Auth
{
    public class AuthProps
    {
        public string Login { get; set; } = null!;
        public string Pass { get; set; } = null!;

        private Tuple<bool, string> Message;
        
        public AuthProps()
        {
            Message = new Tuple<bool, string>(false, string.Empty);
        }

        public void SetMessage(bool IsError, string Message) => this.Message = Tuple.Create(IsError, Message);
        public string DisplayMessage() => this.Message.Item2;
        public bool CheckForErrors() => !this.Message.Item1;
    }
}
