using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.Extensions.Options;
using System.Threading.Tasks;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using RestSharp;
using RestSharp.Authenticators;

namespace webapp.Services { 
  public class EmailSender : IEmailSender
  {
        public EmailSender(IOptions<webapp.Data.EmailSenderOptions> optionsAccessor)
        {
            Options = optionsAccessor.Value;
        }

        public webapp.Data.EmailSenderOptions Options { get; set; }
 
        public async Task SendEmailAsync(
            string email, 
            string subject, 
            string message)
        {

		var options = new RestClientOptions("https://api.mailgun.net/v3/")
		{
			Authenticator = new HttpBasicAuthenticator("api", "api:key-" + Options.ApiKey)
		};

		var client = new RestClient(options); 
		RestRequest request = new RestRequest();
		request.AddParameter("domain", "www.nicholasrjohnson.com", ParameterType.UrlSegment);
		request.Resource = "{domain}/messages";
		request.AddParameter("from", Options.SenderEmail);
		request.AddParameter("to", Options.ToEmail);
		var result = await client.ExecuteAsync(request);
	} 
  }

}
