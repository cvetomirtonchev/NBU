
namespace FfoeApi.Models.MailModels
{
    public class MailSettings 
    {
       public MailSettingsModel Settings;
    }

    public class MailSettingsModel : IMailSettings
    {
        public string Mail { get; set; }
        public string DisplayName { get; set; }
        public string Password { get; set; }
        public string Host { get; set; }
        public int Port { get; set; }
    }
}
