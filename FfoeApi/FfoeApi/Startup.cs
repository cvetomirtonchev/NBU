using FfoeApi.Authentication;
using FfoeApi.Models.MailModels;
using FfoeApi.Services;
using FfoeApi.Services.DapperServices;
using FfoeApi.Services.MailService;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace FfoeApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.  
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddSingleton<IConfiguration>(Configuration);
            services.AddControllers().AddNewtonsoftJson();
            services.Configure<IdentityOptions>(options =>
            {
                //options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
                //options.Lockout.MaxFailedAccessAttempts = 5;
                //options.Lockout.AllowedForNewUsers = true;

                options.Password.RequireDigit = true;
                options.Password.RequireLowercase = false;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = false;
                options.Password.RequiredLength = 6;
                options.Password.RequiredUniqueChars = 0;
            });
            //var emailConfig = Configuration 
            //                .GetSection("MailSettings")
            //                .Get<MailSettings>();
            //                        services.AddSingleton(emailConfig);

            services.Configure<MailSettings>(Configuration.GetSection("MailSettings"));
            services.AddTransient<IMailService, MailService>();
            services.AddTransient<IDapperService, DapperService>();

            services.AddCors(options => options.AddPolicy("ApiCorsPolicy", builder =>
            {
                builder.WithOrigins("*").AllowAnyMethod().AllowAnyHeader();
                //builder.WithOrigins("http://localhost:4200").AllowAnyMethod().AllowAnyHeader();
                //builder.WithOrigins("http://localhost:8100").AllowAnyMethod().AllowAnyHeader();
            }));
            
            // For Entity Framework  
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("WebApiDatabase")));

            services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            })

            .AddJwtBearer(options =>
            {
                options.SaveToken = true;
                options.RequireHttpsMetadata = false;
                options.TokenValidationParameters = new TokenValidationParameters()
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidAudience = Configuration["JWT:ValidAudience"],
                    ValidIssuer = Configuration["JWT:ValidIssuer"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["JWT:Secret"]))
                };
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.  
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseCors("ApiCorsPolicy");

            //app.UseCors(builder => 
            //    builder.WithOrigins("https://localhost:4200")
            //    .AllowAnyHeader()
            //    .AllowAnyMethod());



            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }

    //public class Startup
    //{
    //    public Startup(IConfiguration configuration) => this.Configuration = configuration;

    //    public IConfiguration Configuration { get; }

    //    public void ConfigureServices(IServiceCollection services)
    //        => services
    //            .AddDatabase(this.Configuration)
    //            .AddIdentity()
    //            .AddJwtAuthentication(services.GetApplicationSettings(this.Configuration))
    //            .AddApplicationServices()
    //            .AddSwagger()
    //            .AddApiControllers();

    //    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    //    {
    //        if (env.IsDevelopment())
    //        {
    //            app.UseDeveloperExceptionPage();
    //        }

    //        app.UseSwaggerUI()
    //            .UseRouting()
    //            .UseCors(options => options
    //                .AllowAnyOrigin()
    //                .AllowAnyHeader()
    //                .AllowAnyMethod())
    //            .UseAuthentication()
    //            .UseAuthorization()
    //            .UseEndpoints(endpoints =>
    //            {
    //                endpoints.MapControllers();
    //            })
    //            .ApplyMigrations();
    //    }
    //}
}
