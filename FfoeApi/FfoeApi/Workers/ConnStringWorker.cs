
using System.Configuration;
namespace FfoeApi.Workers
{
    public class ConnStringWorker
    {
        public static string GetConnectionString(string dbName)
        {
            return ConfigurationManager.ConnectionStrings[dbName].ConnectionString;
        }
    }
}
