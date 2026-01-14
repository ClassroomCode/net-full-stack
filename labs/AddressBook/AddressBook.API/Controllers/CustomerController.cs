using AddressBook.API.DataAccess;
using AddressBook.API.Entities;
using Microsoft.AspNetCore.Mvc;

namespace AddressBook.API.Controllers;

[ApiController]
public class CustomerController : ControllerBase
{
    [HttpGet("customer")]
    public ActionResult GetAllCustomers()
    {
        using var db = new NorthwindContext();
        var customers = db.Customers.ToList();
        return Ok(customers);
    }

    [HttpGet("customer/{id}")]
    public ActionResult GetCustomer(string id)
    {
        using var db = new NorthwindContext();
        var customer = db.Customers.Find(id);
        if (customer is null) return NotFound();
        return Ok(customer);
    }
}
