using System.ComponentModel.DataAnnotations;

namespace DishesStore.Db.Model.Auth.Registration
{
    public class RegProps
    {
        [Required]
        [StringLength(8)]
        public string Login { get; set; }
        [Required]
        [EmailAddress]
        public string Mail { get; set; }
        [Required]
        [StringLength(8)]
        public string Pass { get; set; }
        [Required]
        [StringLength(8)]
        public string ConfirmPass { get; set; }

        private Tuple<bool, string> Message;

        public RegProps()
        {
            Login = string.Empty;
            Mail = string.Empty;
            Pass = string.Empty;
            ConfirmPass = Pass;

            Message = new Tuple<bool, string>(true, string.Empty);
        }
        public RegProps(string Login, string Mail, string Pass, string ConfirmPass) : this()
        {
            this.Login = Login;
            this.Mail = Mail;
            this.Pass = Pass;
            this.ConfirmPass = ConfirmPass;
        }
        
        public void SetMessage(bool IsError, string Message) => this.Message = Tuple.Create(IsError, Message);
        public string DisplayMessage() => this.Message.Item2;
        public bool CheckForErrors() => !this.Message.Item1;
    }
}
