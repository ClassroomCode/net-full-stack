using AddressBook.API.DataAccess;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddDbContext<NorthwindContext>(options =>
  options.UseSqlServer(@"Server=(localdb)\MSSQLLocalDB;Database=Northwind;Integrated Security=True;TrustServerCertificate=True"));

var app = builder.Build();

app.MapControllers();

/*
app.MapGet("/customer", () =>
{
    using var db = new NorthwindContext();
    var customers = db.Customers.ToList();
    return customers;
});

app.MapGet("/customer/{id}", (string id) =>
{
    using var db = new NorthwindContext();
    var customer = db.Customers.Find(id);
    if (customer is null) return Results.NotFound();
    return Results.Ok(customer);
});
*/

app.Run();