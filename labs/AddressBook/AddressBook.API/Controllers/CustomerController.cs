using AddressBook.API.DataAccess;
using AddressBook.API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AddressBook.API.Controllers;

[ApiController]
//[Authorize]
public class CustomerController(NorthwindContext db, ILogger<CustomerController> logger) : ControllerBase
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
        var customer = db.Customers
            .Include(c => c.Orders)
            .SingleOrDefault(c => c.CustomerID == id);

        if (customer is null) return NotFound();
        return Ok(customer);
    }

    [HttpPost("customer")]
    public ActionResult CreateCustomer(Customer customer)  
    {
        var existingCustomer = db.Customers.Find(customer.CustomerID);
        if (existingCustomer is not null)
        {
            ModelState.AddModelError("CustomerID", "A customer with this ID already exists");
        }
        if (!ModelState.IsValid) return ValidationProblem();

        db.Customers.Add(customer);
        db.SaveChanges();

        return CreatedAtAction("GetCustomer",
            new { id = customer.CustomerID }, customer);
    }

    [HttpPut("customer/{id}")]
    public ActionResult PutCustomer(string id, Customer customer)
    {
        var existingCustomer = db.Customers.Find(id);
        if (existingCustomer is null)
        {
            db.Customers.Add(customer);
            db.SaveChanges();
            return CreatedAtAction("GetCustomer",
              new { id = customer.CustomerID }, customer);
        }
        else
        {
            db.Entry(existingCustomer).CurrentValues.SetValues(customer);
            db.SaveChanges();
            return NoContent();
        }
    }

    [HttpDelete("customer/{id}")]
    public ActionResult DeleteCustomer(string id)
    {
        var existingCustomer = db.Customers.Find(id);
        if (existingCustomer is null)
        {
            return NotFound();
        }
        else
        {
            db.Customers.Remove(existingCustomer);
            db.SaveChanges();
            logger.LogCritical($"Customer DELETED! ({id})");
            return NoContent();
        }
    }
}
