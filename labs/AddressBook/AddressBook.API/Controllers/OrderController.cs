using AddressBook.API.DataAccess;
using AddressBook.API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AddressBook.API.Controllers;

[ApiController]
public class OrderController(NorthwindContext db) : ControllerBase
{
    [HttpGet("order")]
    public ActionResult GetAllOrders()
    {
        var orders = db.Orders
            .Include(o => o.Customer)
            .Select(o => new {
                OrderId = o.OrderID,
                ShippedDate = o.ShippedDate,
                OrderDate = o.OrderDate,
                CustomerName = o.Customer!.CompanyName
                })
            .ToList();

        return Ok(orders);
    }
}
