using AddressBook.API.DataAccess;

var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();

app.MapGet("/customer", () => {
    using var db = new NorthwindContext();
    var customers = db.Customers.ToList();
    return customers;
});

app.MapGet("/customer/{id}", (string id) => {
    using var db = new NorthwindContext();
    var customer = db.Customers.Find(id);
    return customer;
});

app.Run();