using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FfoeApi.Services
{
        public interface IDapperService
        {
            Task<T> ExecuteFirstAsync<T>(string procedureName, object parameters = null);

            Task<IEnumerable<TModel>> ExecuteListAsync<TModel>(string procedureName, object parameters = null);
        }
 
}
