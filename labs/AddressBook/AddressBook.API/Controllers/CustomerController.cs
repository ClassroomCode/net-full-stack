using AddressBook.API.DataAccess;
using Microsoft.AspNetCore.Mvc;

namespace AddressBook.API.Controllers;

[ApiController]
public class CustomerController(NorthwindContext db) : ControllerBase
{
    [HttpGet("customer")]
    public ActionResult GetAllCustomers()
    {
        var customers = db.Customers.ToList();
        return Ok(customers);
    }

    [HttpGet("customer/{id}")]
    public ActionResult GetCustomer(string id)
    {
        var customer = db.Customers.Find(id);
        if (customer is null) return NotFound();
        return Ok(customer);
    }
}
