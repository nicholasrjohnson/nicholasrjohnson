﻿using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.Extensions.Logging;
using webapp.Models;

namespace webapp.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IEmailSender _sender;

        public HomeController(ILogger<HomeController> logger, IEmailSender emailer)
        {
            _sender = emailer;
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        public async Task<IActionResult> EmailMe(EmailMeModel model)
        {
            if (model.ValidSubmit.Equals(true))
            {
                await _sender.SendEmailAsync("", "Message From Nicholas R Johnson website", $"This is the message: <br>{model.Message} <br><br> From {model.Name} with email {model.Email}");
            }

            return this.RedirectToAction("Index", "Home");
        }
    }
}

