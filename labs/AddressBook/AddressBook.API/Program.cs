using AddressBook.API.DataAccess;

var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();

app.MapGet("/customer", () => {
    using var db = new NorthwindContext();
    var customers = db.Customers.ToList();
    return customers;
});

app.Run();