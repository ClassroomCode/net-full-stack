using AddressBook.API.DataAccess;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

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