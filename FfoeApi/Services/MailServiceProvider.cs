using FfoeApi.Models.MailModels;
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using System.IO;
using System.Threading.Tasks;

namespace FfoeApi.Services.MailService
{
    public abstract class MailServiceProvider : IMailService
    {
        private readonly IMailSettings mailSettings;
        public MailServiceProvider(IMailSettings _mailSettings)
        {
            mailSettings = _mailSettings;
        }

        public async Task SendEmailAsync(MailRequest mailRequest)
        {
            string FilePath = Directory.GetCurrentDirectory() + "\\Views\\EmailTemplate.html";

            StreamReader str = new StreamReader(FilePath);

            string MailText = str.ReadToEnd();

            str.Close();

            MailText = MailText.Replace("[username]", mailRequest.UserName)
                .Replace("[email]", mailRequest.ToEmail).Replace("[confirmationLink]", mailRequest.Body);

            MimeMessage email = new MimeMessage
            {
                Sender = MailboxAddress.Parse(mailSettings.Mail)
            };

            email.To.Add(MailboxAddress.Parse(mailRequest.ToEmail));
            email.Subject = $"Welcome {mailRequest.UserName}";
            email.Body = this.BuildMessage(mailRequest, MailText);

            using var smtp = new SmtpClient
            {
                CheckCertificateRevocation = false
            };

            smtp.Connect(mailSettings.Host, mailSettings.Port, SecureSocketOptions.StartTls);
            smtp.Authenticate(mailSettings.Mail, mailSettings.Password);

            await smtp.SendAsync(email);

            smtp.Disconnect(true);
        }
        public MimeEntity BuildMessage(MailRequest mailRequest, string MailText)
        {

            BodyBuilder builder = new BodyBuilder();

            if (mailRequest.Attachments != null)
            {
                byte[] fileBytes;
                foreach (var file in mailRequest.Attachments)
                {
                    if (file.Length > 0)
                    {
                        using (var ms = new MemoryStream())
                        {
                            file.CopyTo(ms);
                            fileBytes = ms.ToArray();
                        }
                        builder.Attachments.Add(file.FileName, fileBytes, ContentType.Parse(file.ContentType));
                    }
                }
            }
            builder.HtmlBody = MailText;

            return builder.ToMessageBody();
        }
    }

 

}
