namespace webapp.Models
{
    using System;
    using System.ComponentModel.DataAnnotations;

    public class EmailMeModel
    {
       public bool ValidSubmit { get; set; }

       public string Name { get; set; }

       public string Email { get; set; }

       public string Message { get; set; }
    }
}
