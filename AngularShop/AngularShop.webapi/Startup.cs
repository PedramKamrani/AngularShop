using DataLayer.Repository;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using ServicesLayer.Servicse.Implamtinan;
using ServicesLayer.Servicse.Interface;
using ServicesLayer.Uitelites.Extinsion.Connection;
using System.IO;

namespace AngularShop.webapi
{
  public class Startup
  {
    public Startup(IConfiguration configuration, IWebHostEnvironment webHostEnvironment)
    {
      Configuration = configuration;
      WebHostEnvironment = webHostEnvironment;
    }

    public IConfiguration Configuration { get; }
    public IWebHostEnvironment WebHostEnvironment { get; }
        
        public void ConfigureServices(IServiceCollection services)
    {

      services.AddSingleton<IConfiguration>(
                 new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory())
                     .AddJsonFile($"appsettings.json")
                     .Build()
             );
      #region AddDBContext
      services.AddApplicationDbContext(Configuration);
      services.AddTransient(typeof(IGenericRepository<>),typeof(GenericRepository<>));
      #endregion
      #region Services
      services.AddScoped<IUserService,UserService>();
      services.AddScoped<SliderService, SliderService>();
      #endregion
      services.AddControllers();
      
    }

    
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
       
      }

      app.UseHttpsRedirection();

      app.UseRouting();

      app.UseAuthorization();

      app.UseEndpoints(endpoints =>
      {
        endpoints.MapControllers();
      });
    }
  }
}
