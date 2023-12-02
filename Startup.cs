using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc.Razor.RuntimeCompilation;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.Identity.UI.Services;
using webapp.Data;
using webapp.Services;
using System.Reflection;

namespace webapp 
{
    public class Startup
    {
        private readonly IConfiguration _configuration;

        public Startup(IConfiguration configuration)
        {
            _configuration = configuration;
            StaticConfig = configuration;
        }

         /// <summary>
        /// Gets the static config.
        /// </summary>
        public static IConfiguration StaticConfig { get; private set; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDistributedMemoryCache();
            services.AddResponseCaching();

            var mvc = services.AddMvc();
            services.AddHttpContextAccessor();
            services.Configure<EmailSenderOptions>(options =>
            {
                options.ApiKey = _configuration["ExternalProviders:MailGun:ApiKey"];
		options.ToEmail = _configuration["ExternalProviders:MailGun:ToEmail"];
                options.SenderEmail = _configuration["ExternalProviders:MailGun:SenderEmail"]; 
                options.SenderName = _configuration["ExternalProviders:MailGun:SenderName"];
            });
            services.AddTransient<IEmailSender, EmailSender>();

#if DEBUG
            mvc.AddRazorRuntimeCompilation();
#endif
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseStaticFiles();
            app.UseRouting();
            app.UseForwardedHeaders(new ForwardedHeadersOptions
            {
                ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
            });
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}
