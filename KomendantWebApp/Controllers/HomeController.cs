using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace KomendantWebApp.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
        
        public ActionResult Rooms()
        {
            return View();
        }

        public ActionResult Persons()
        {
            return View();
        }

        public ActionResult Period()
        {
            return View();
        }
    }
}