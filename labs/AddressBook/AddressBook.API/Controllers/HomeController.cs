using AddressBook.API.DataAccess;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace AddressBook.API.Controllers;

public class HomeController(NorthwindContext db) : Controller
{
    [HttpGet("")]
    public async Task<ActionResult> Index()
    {
        var customers = await db.Customers.ToListAsync();

        return View("Index", customers);
    }
}
