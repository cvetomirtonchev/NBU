using Dapper;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace FfoeApi.Services.DapperServices
{
    public abstract class DapperServiceProvider : IDapperService
	{
		private readonly string connectionString;

		public DapperServiceProvider(string connectionString)
		{
			this.connectionString = connectionString;
		}
		public async Task<T> ExecuteFirstAsync<T>(string procedureName, object parameters = null)
		{
			using (IDbConnection connection = new SqlConnection(this.connectionString))
			{
				return await connection.QueryFirstOrDefaultAsync<T>
					(
						procedureName,
						parameters,
						null,
						120,
						CommandType.StoredProcedure
					);
			}
		}
		public async Task<IEnumerable<TModel>> ExecuteListAsync<TModel>(string procedureName, object parameters = null)
		{
			IEnumerable<TModel> list = null;

			using (IDbConnection connection = new SqlConnection(this.connectionString))
			{
				list = await connection.QueryAsync<TModel>
					(
						procedureName,
						parameters,
						null,
						120,
						CommandType.StoredProcedure
					);
			}

			return list;
		}
	}
}
