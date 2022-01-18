using Microsoft.Extensions.Options;
using FfoeApi.Models.MailModels;

namespace FfoeApi.Services.MailService
{
    public class MailService : MailServiceProvider
    {
        public MailService(IOptions<MailSettings> options)
            : base(options.Value.Settings) { }
    }
}
