using FfoeApi.Models.MailModels;
using MimeKit;
using System.Threading.Tasks;

namespace FfoeApi.Services.MailService
{
    public interface IMailService
    {
        Task SendEmailAsync(MailRequest mailRequest);

        MimeEntity BuildMessage(MailRequest mailRequest, string MailText);
    }
}
