using AddressBook.API.DataAccess;
using AddressBook.API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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

    [HttpPost("customer")]
    public ActionResult CreateCustomer(Customer customer)  
    {
        db.Customers.Add(customer);
        db.SaveChanges();

        return CreatedAtAction("GetCustomer",
            new { id = customer.CustomerID }, customer);
    }

    [HttpPut("customer/{id}")]
    public ActionResult PutCustomer(string id, Customer customer)
    {
        if (id != customer.CustomerID)
        {
            return BadRequest("BAD!!!");
        }

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
}
