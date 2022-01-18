using Microsoft.Extensions.Configuration;

namespace FfoeApi.Services.DapperServices
{
    public class DapperService : DapperServiceProvider
    {
        public DapperService(IConfiguration options)
            : base(options.GetConnectionString("WebApiDatabase")) { }
    }
}
