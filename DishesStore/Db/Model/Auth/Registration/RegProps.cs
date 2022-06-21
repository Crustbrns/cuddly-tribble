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

        public RegProps()
        {
            Login = string.Empty;
            Mail = string.Empty;
            Pass = string.Empty;
        }
        public RegProps(string Login, string Mail, string Pass) : this()
        {
            this.Login = Login;
            this.Mail = Mail;
            this.Pass = Pass;
        }
        
        public bool IsPassing()
        {
            return Login != null && Mail != null && Pass != null;
        }
    }
}
